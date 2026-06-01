import React, { useEffect, useState } from "react";
import './notes.css'
import Tooltip from "./Tooltip";
import { rotateWheel } from '../enigma/rotateWheel.js'

function Notes({ writeLetter, decryptingVals, setup, setSetup }) {
    const [transformationList, setTransformationList] = useState([])

    useEffect(() => {
        if(decryptingVals.length == 0) return

        setTransformationList(prev => [{
            letters: decryptingVals, 
            setup: rotateWheel(-1, setup)
        }, ...prev].slice(0, 20))
    }, [decryptingVals])

    useEffect(() => {
        const savedText = localStorage.getItem('notesText');
        const savedCheckbox = localStorage.getItem('notesWDM');
        if (savedText) document.querySelector("#textNotes").value = savedText;
        if (savedCheckbox) document.querySelector("#WDM").checked = savedCheckbox === 'true';
    }, []);

    useEffect(() => {
        if (!writeLetter) return;
        const el = document.querySelector("#textNotes");
        el.value += writeLetter;
        localStorage.setItem('notesText', el.value);
    }, [writeLetter]);

    const handleTextChange = (e) => {
        localStorage.setItem('notesText', e.target.value);
    };

    const handleCheckboxChange = (e) => {
        localStorage.setItem('notesWDM', e.target.checked);
    };

    return (
        <div className="notes">
            <h2>Notes</h2>
            <textarea id="textNotes" onChange={handleTextChange}></textarea>
            <label className="checkbox">
                <input type="checkbox" id="WDM" onChange={handleCheckboxChange}/>
                <span className="toggle"></span>
                <span>Write decrypt message</span>
            </label>
            <h2>Transformation</h2>
            <div className="transformation">
                {
                    transformationList.map((tr, i) => (
                        <Tooltip 
                            text={'Wheel positions: ' + tr['setup'].wheels.map((w) => {return w.value})} 
                            key={i}
                        >
                            <p 
                                style={{
                                    color: i != 0 ? '#afafaf' : '',
                                    borderColor: i != 0 ? 'var(--color-primary-dark)' : ''
                                }}
                                onClick={() => {
                                    setSetup(tr['setup'])
                                    setTransformationList(prev => prev.slice(i + 1))
                                }}
                            >
                                {
                                    tr['letters'] && tr['letters'].map((l, j) => (
                                        <React.Fragment key={j}>
                                            <span
                                                style={{
                                                    fontSize: j == 0 || j == tr['letters'].length - 1 ? '1.4rem' : '.9rem'
                                                }}
                                            >{l}</span>
                                            {j < tr['letters'].length - 1 ? '→' : ''}
                                        </React.Fragment>
                                    ))   
                                }
                            </p>
                        </Tooltip>
                    ))
                }
            </div>
        </div>
    );
}

export default Notes;