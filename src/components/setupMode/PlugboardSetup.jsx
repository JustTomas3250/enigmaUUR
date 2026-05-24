import { useState } from "react";
import React from "react";
import Cable from "../enigma/Cable";

function PlugboardSetup({ setSetup, setup }) {
    const [connections, setConnections] = useState(setup.plugboard || []);
    const [activeSocket, setActiveSocket] = useState(null);

    const letters = [
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'], 
        ['P', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'L']
    ];

    const handleSocketClick = (letter) => {
        let jizKabelMáme = false;
        let noveConnections = [];

        if (!activeSocket) {
            const odfiltrovane = connections.filter(conn => conn.from !== letter && conn.to !== letter);
            
            if (odfiltrovane.length !== connections.length) {
                noveConnections = odfiltrovane;
                jizKabelMáme = true;
            } else {
                setActiveSocket(letter);
                return;
            }
        } else {
            if (activeSocket === letter) {
                setActiveSocket(null);
                return;
            }

            const vycistene = connections.filter(conn => 
                conn.from !== activeSocket && 
                conn.to !== activeSocket && 
                conn.from !== letter && 
                conn.to !== letter
            );

            noveConnections = [
                ...vycistene, 
                { from: activeSocket, to: letter, color: Math.floor(Math.random() * 8) }
            ];
            setActiveSocket(null);
        }

        setConnections(noveConnections);

        setSetup(prev => ({ 
            ...prev, 
            plugboard: noveConnections
        }));
    };

    return (
        <div className="plugboard" style={{ position: 'relative' }}>
            <svg className="cables-layer" style={{ zIndex: 100, pointerEvents: 'none' }}>
                {connections.map((conn, i) => (
                    <Cable 
                        key={`${conn.from}-${conn.to}`} // Lepší klíč než index pole
                        start={getCoords(conn.from)} 
                        end={getCoords(conn.to)} 
                        color={conn.color}
                    />
                ))}
            </svg>

            <div className="sockets-grid">
                {letters.map((row, rowIndex) => (
                    <div key={rowIndex} className="plugboardRow" style={{
                        marginLeft: rowIndex === 1 ? '1.25rem' : 'auto'
                    }}>
                        {row.map(letter => (
                            <div 
                                key={letter} 
                                className="plugboardLetter pblHover"
                                style={{
                                    backgroundColor: activeSocket === letter ? 'var(--color-alert)' : 'transparent',
                                }}
                            >
                                <button 
                                    id={`socket-${letter}`} 
                                    onClick={() => handleSocketClick(letter)}
                                >
                                    {letter}
                                </button>
                                <p>.</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlugboardSetup;

function getCoords(letter) {
    const element = document.getElementById(`socket-${letter}`);
    if (!element) return { x: 0, y: 0 };

    const rect = element.getBoundingClientRect();
    const parentRect = element.closest('.plugboard')?.getBoundingClientRect();

    if (!parentRect) return { x: 0, y: 0 };

    return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2 + 23
    };
}