import React, { useEffect, useState } from "react";
import './prevSetup.css'
import SetupTable from "../setupTable/SetupTable";

function PrevSetup({ prevSetup, history }){
    const [inText, setInText] = useState(localStorage.getItem('inHistory') || '')
    const [outText, setOutText] = useState(localStorage.getItem('outHistory') || '')

    const clearHistory = () => {
        setInText('')
        setOutText('')
        localStorage.setItem('inHistory', '');
        localStorage.setItem('outHistory', '');
    }

    useEffect(() => {
        if (history && history['output'] != null){
            setInText(prev => {
                const next = prev + history['input'];
                localStorage.setItem('inHistory', next);
                return next;
            })
            setOutText(prev => {
                const next = prev + history['output'];
                localStorage.setItem('outHistory', next);
                return next;
            })
        }
    }, [history])

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