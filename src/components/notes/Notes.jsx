import React, { useEffect } from "react";
import './notes.css'

function Notes({ writeLetter }) {
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
        </div>
    );
}

export default Notes;