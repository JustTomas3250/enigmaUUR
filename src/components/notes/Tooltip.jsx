import React, { useState } from "react";
import './notes.css'

function Tooltip({ children, text }){
    const [pos, setPos] = useState(null)

    const handleMouseEnter = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPos({ x: rect.left + rect.width / 2, y: rect.top })
    }

    const handleMouseLeave = () => setPos(null)

    return(
         <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {pos && (
                <div
                    className="tooltip"
                    style={{
                        left: pos.x,
                        top: pos.y
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    )
}

export default Tooltip