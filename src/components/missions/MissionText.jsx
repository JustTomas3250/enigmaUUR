import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { MISSIONS } from "./missions";
import './Mission.css';

function MissionText({ setup, onMissionComplete }) {
    const [selected, setSelected] = useState(null);
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState(null); // 'correct' | 'wrong' | null

    const handleSelect = (mission) => {
        setSelected(mission);
        setAnswer('');
        setResult(null);
    };

    const handleCheck = () => {
        const cleaned = answer.replace(/\s/g, '').toUpperCase();
        if (cleaned === selected.solution) {
            setResult('correct');
            if (onMissionComplete) onMissionComplete(selected.id);
        } else {
            setResult('wrong');
        }
    };

    if (!selected) {
        return (
            <div className="missionText missionSelect">
                <h2>Choose a Mission</h2>
                {MISSIONS.map(m => (
                    <button
                        key={m.id}
                        className="missionSelectBtn"
                        onClick={() => handleSelect(m)}
                    >
                        {m.title}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="missionText">
            <button className="missionBack" onClick={() => { setSelected(null); setResult(null); }}>
                ← Back
            </button>
            <h2>{selected.title}</h2>
            <p>{selected.story}</p>

            <p className="missionImportant">{selected.ciphertext}</p>

            <p><strong>Known settings:</strong></p>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Wheels</TableCell>
                        <TableCell>Positions</TableCell>
                        <TableCell>Plugboard</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{selected.hint.wheels}</TableCell>
                        <TableCell>{selected.hint.positions}</TableCell>
                        <TableCell>{selected.hint.plugboard}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
                Note: {selected.hint.note}
            </p>

            <div className="missionAnswer">
                <input
                    type="text"
                    placeholder="Type your message without spaces..."
                    value={answer}
                    onChange={e => { setAnswer(e.target.value); setResult(null); }}
                    onKeyDown={e => e.stopPropagation()}
                />
                <button onClick={handleCheck}>Check</button>
            </div>

            {result === 'correct' && (
                <p className="missionResult correct">✓ Correct! Mission complete.</p>
            )}
            {result === 'wrong' && (
                <p className="missionResult wrong">✗ Not quite. Check your Enigma settings and try again.</p>
            )}
        </div>
    );
}

export default MissionText;
