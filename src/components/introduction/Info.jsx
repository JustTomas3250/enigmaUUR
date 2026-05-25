import React from "react";
import './introduction.css'

function Info({ buttonClick, children, position }){
    return (
        <div 
            className={(position ? "infoAbs" : "infoRel") + " info"}
        >
            {children}
            <button onClick={buttonClick}>Next</button>
        </div>
    )
}

export default Info