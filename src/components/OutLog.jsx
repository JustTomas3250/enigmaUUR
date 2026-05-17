import React from "react";

function OutLog({ entries }) {
    return (
        <div className="outLog">
            {entries.map((entry, index) => (
                <div key={index} className="outLogEntry">
                    {entry.split('').map((char, i) => (
                        <span key={i}>{char}</span>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default OutLog;