import { useState } from "react";
import React from "react";
import Cable from "./Cable";
import './setupMode.css';

function Plugboard() {
    const [connections, setConnections] = useState([]);
    const [activeSocket, setActiveSocket] = useState(null);

    const letters = [
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'], 
        ['P', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'L']
    ];

    const handleSocketClick = (letter) => {
        if (!activeSocket) {
            let wasConnected = false;
            for(let i = 0; i < connections.length; i++) {
                const conn = connections[i];
                if (conn.from === letter || conn.to === letter) {
                    let connectionsCopy = [...connections];
                    connectionsCopy.splice(i, 1);
                    setConnections(connectionsCopy);
                    i--;
                    wasConnected = true;
                    break;
                }
            }
            if (!wasConnected)
                setActiveSocket(letter);
        } else {
            if (activeSocket !== letter) {
                for(let i = 0; i < connections.length; i++) {
                    const conn = connections[i];
                    if (conn.from === activeSocket || conn.to === activeSocket || conn.from === letter || conn.to === letter) {
                        connections.splice(i, 1);
                        i--;
                    }
                }
                setConnections([...connections, { from: activeSocket, to: letter }]);
            }
            setActiveSocket(null);
        }
    };

    return (
        <div className="plugboard" style={{ position: 'relative' }}>
            <svg className="cables-layer" style={{zIndex: 100}}>
                {connections.map((conn, i) => (
                    <Cable 
                        key={i}
                        start={getCoords(conn.from)} 
                        end={getCoords(conn.to)} 
                    />
                ))}
            </svg>

            <div className="sockets-grid">
                {
                    letters.map((row, rowIndex) => (
                        <div key={rowIndex} className="plugboardRow" style={{
                            marginLeft: rowIndex == 1 ? '1.25rem' : 'auto'
                        }}>
                            {
                                row.map(letter => (
                                    <div 
                                        key={letter} 
                                        className="plugboardLetter"
                                        style={{
                                            backgroundColor: activeSocket === letter ? 'var(--color-alert)' : 'transparent',
                                        }}
                                    >
                                        <button 
                                            id={`socket-${letter}`} 
                                            key={letter} 
                                            onClick={() => handleSocketClick(letter)}
                                        >
                                                {letter}
                                        </button>
                                        <p>.</p>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Plugboard;

function getCoords(letter) {
    const element = document.getElementById(`socket-${letter}`);
    if (!element) return { x: 0, y: 0 };

    const rect = element.getBoundingClientRect();
    const parentRect = element.closest('.plugboard').getBoundingClientRect();

    return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2 + 23
    };
}