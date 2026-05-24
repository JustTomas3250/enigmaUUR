import React from "react";

function InKey({ letter, typeLetter, typeMode }) {
    const letters = [
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'], 
        ['P', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'L']
    ];

    const type = (l) => {
        if (!typeMode) return;

        typeLetter(l);
    }

    return (
        <div className="inKey">
            {
                letters.map((row, rowIndex) => (
                    <div key={rowIndex} className="keyRow" style={{
                        marginLeft: rowIndex == 1 ? '1.25rem' : 'auto'
                    }}>
                        {
                            row.map(l => (
                                <div key={l} className="keyLetter">
                                    <button onClick={() => type(l)}>{l}</button>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default InKey;