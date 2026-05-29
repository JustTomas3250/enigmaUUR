import React from "react";
import './introduction.css'

function Info({ buttonClick, children, position, prev, prevClick }){
    return (
        <div 
            className={(position ? "infoAbs" : "infoRel") + " info"}
        >
            {children}
            <div className="Ibtn">          
                <button
                    onClick={prevClick}
                    style={{display: !prev ? 'none' : 'block'}}
                >
                    Previous
                </button>
                <button onClick={buttonClick}>Next</button>
            </div>
        </div>
    )
}

export default Info