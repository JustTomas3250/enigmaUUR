import React, { useEffect, useState } from "react";
import './prevSetup.css'
import SetupTable from "../setupTable/SetupTable";

function PrevSetup({ prevSetup, history }){
    const [inText, setInText] = useState('')
    const [outText, setOutText] = useState('')

    const clearHistory = () => {
        setInText('')
        setOutText('')
    }

    useEffect(() => {
        if (history && history['output'] != null){
            setInText(prev => {
                const next = prev + history['input'];
                return next;
            })
            setOutText(prev => {
                const next = prev + history['output'];
                return next;
            })
        }
    }, [history['output']])

    return (
        <div className="prevSetup">
            <h2>Starting position</h2>
            <SetupTable setup={prevSetup} />
            <hr />
            <h2>History</h2>
            <div className="historyInputHeader">
                <h3>Input</h3>
                <button className="clearHistory" onClick={clearHistory}>clear history</button>
            </div>
            <p className="history">{inText}</p>
            <h3>Output</h3>
            <p className="history">{outText}</p>
        </div>
    )
}

export default PrevSetup