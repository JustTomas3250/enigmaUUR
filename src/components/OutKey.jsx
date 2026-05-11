import React from "react";
import './Enigma.css';

function OutKey() {
    const letters = [
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'], 
        ['P', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'L']
    ];

    return (
        <div className="outKey">
            {
                letters.map((row, rowIndex) => (
                    <div key={rowIndex} className="outKeyRow" style={{
                        marginLeft: rowIndex == 1 ? '1.25rem' : 'auto'
                    }}>
                        {
                            row.map(letter => (
                                <div key={letter} className="outKeyLetter">
                                    <span>{letter}</span>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default OutKey;