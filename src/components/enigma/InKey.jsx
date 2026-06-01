import React from "react";

function InKey({ typeLetter, typeMode, pressedKeys = new Set(), handleMouseDown, handleMouseUp }) {
    const letters = [
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'], 
        ['P', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'L']
    ];

    return (
        <div className="inKey">
            {letters.map((row, rowIndex) => (
                <div key={rowIndex} className="keyRow" style={{
                    marginLeft: rowIndex == 1 ? '1.25rem' : 'auto'
                }}>
                    {row.map(l => (
                        <div key={l} className="keyLetter" style={{
                            backgroundColor: pressedKeys.has(l) ? 'var(--color-alert)' : ''
                        }}>
                            <button
                                id={`key-btn-${l}`}
                                onMouseDown={() => handleMouseDown && typeMode ? handleMouseDown(l) : null}
                                onMouseUp={() => handleMouseUp && typeMode ? handleMouseUp(l) : null}
                                onMouseLeave={() => handleMouseUp && typeMode ? handleMouseUp(l) : null}
                            >
                                {l}
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default InKey;