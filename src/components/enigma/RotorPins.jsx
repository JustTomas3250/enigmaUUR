import React from "react";

function RotorPins({ wheelIndex }) {
    return (
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 1,
            height: 1,
            pointerEvents: "none",
        }}>
            <div id={`rotor-${wheelIndex}-pin`} style={{ width: 1, height: 1 }} />
        </div>
    );
}

export default RotorPins;