import React, { useEffect } from "react";
import '../Enigma.css';

function OutKey({ letterOut, setLetter }) {
    const letters = [
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'], 
        ['P', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'L']
    ];

    useEffect(() => {
        if (!letterOut) return;

        const timeout = setTimeout(() => {
            setLetter('0');
        }, 750);

        return () => clearTimeout(timeout);
    }, [letterOut]);

    return (
        <div className="outKey">
            {
                letters.map((row, rowIndex) => (
                    <div key={rowIndex} className="outKeyRow" style={{
                        marginLeft: rowIndex == 1 ? '1.25rem' : 'auto'
                    }}>
                        {
                            row.map(letter => (
                                <div key={letter} className="outKeyLetter" style={{backgroundColor: letterOut == letter ? 'var(--color-alert)' : 'transparent'}}>
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