import React from "react";
import Cable from "./Cable";

function Plugboard({ setup }) {
    const letters = [
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'], 
        ['P', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'L']
    ];

    return (
        <div className="plugboard" style={{ position: 'relative' }}>
            <svg className="cables-layer" style={{ zIndex: 100, pointerEvents: 'none' }}>
                {setup.plugboard.map((conn, i) => (
                    <Cable 
                        key={`${conn.from}-${conn.to}`}
                        start={getCoords(conn.from)} 
                        end={getCoords(conn.to)}
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
                                className="plugboardLetter"
                            >
                                <button id={`socket-${letter}`}>
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

export default Plugboard;

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