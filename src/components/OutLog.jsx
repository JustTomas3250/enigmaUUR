import React from "react";

function OutLog({ entries }) {
    return (
        <div className="outLog">
            {entries.wheels.map((entry, index) => (
                <div key={index} className="outLogEntry">
                    <span key={index}>{`id: ${entry.id}, pos: ${entry.position}, value: ${entry.value}`}</span>
                </div>
            ))}
            {entries.plugboard && entries.plugboard.map((conn, index) => (
                <div key={index} className="outLogEntry">
                    <span>{`from: ${conn.from}, to: ${conn.to}`}</span>
                </div>
            ))}
        </div>
    );
}

export default OutLog;