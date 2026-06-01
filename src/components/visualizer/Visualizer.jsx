import React, { useState } from "react";
import Info from "../introduction/Info";
import reactXarrowsObj from 'react-xarrows';

const Xarrow = reactXarrowsObj.default;
const Xwrapper = reactXarrowsObj.Xwrapper;

const STEPS = [
    {label: "Press any key on the Enigma machine to begin.",    description: null},
    {label: "Step 1 — Input key",                               description: "You pressed a key on the keyboard. The signal now travels to the plugboard."},
    {label: "Step 2 — Plugboard (in)",                          description: "If this letter is connected to another via a cable on the plugboard, the signal is swapped to the connected letter. Otherwise it passes through unchanged."},
    {label: "Step 3 — Rotor 1 (forward)",                       description: "The signal enters the first rotor. Each rotor scrambles the letter according to its internal wiring and current rotation position."},
    {label: "Step 4 — Rotor 2 (forward)",                       description: "The scrambled signal continues through the second rotor, which applies its own substitution."},
    {label: "Step 5 — Rotor 3 (forward)",                       description: "The signal passes through the third rotor. After this, it reaches the reflector."},
    {label: "Step 6 — Reflector",                               description: "The reflector maps the signal to a completely different letter and sends it back through the rotors in reverse. This is what makes Enigma self-inverse."},
    {label: "Step 7 — Rotor 3 (backward)",                      description: "The signal travels back through rotor 3 in reverse, using the inverse wiring."},
    {label: "Step 8 — Rotor 2 (backward)",                      description: "Continuing backward through rotor 2."},
    {label: "Step 9 — Rotor 1 (backward)",                      description: "And finally rotor 1."},
    null,
    {label: "Step 10 — Plugboard (out) & Output",               description: "The signal exits rotor 1 and heads to the plugboard for the final substitution."},
    {label: "Result — Output letter",                           description: "The final encrypted letter lights up on the lampboard. This is your ciphertext letter!"}
];

function Visualizer({ val, setVal, setAlert, setWheelVisual }) {
    const [stage, setStage] = useState(0);

    const letterIndex = (l) => l.toUpperCase().charCodeAt(0) - 65;

    const getPBarrow = (from, to) =>{
        if(from == to)
            return { start: null, end: null, color: "transparent" }
        return { start: `socket-${from.toUpperCase()}`,       end: `socket-${to.toUpperCase()}`,       color: "#1bffe1" }
    }

    const getArrows = (step) => {
        if (!val || val.length < 10) return [];
        const configs = [
            { start: null,                                   end: null,                                   color: "transparent" },
            { start: `key-btn-${val[0].toUpperCase()}`,      end: `socket-${val[0].toUpperCase()}`,       color: "#f1faee" },
            getPBarrow(val[0], val[1]),
            { start: `socket-${val[1].toUpperCase()}`,       end: `rotor-0`,                              color: "#ab18fa" },
            { start: `rotor-0`,                              end: `rotor-1`,                              color: "#ffb703" },
            { start: `rotor-1`,                              end: `rotor-2`,                              color: "#54ebf0" },
            { start: `rotor-2`,                              end: `reflector-pin-${letterIndex(val[4])}`, color: "#e63946" },
            { start: `reflector-pin-${letterIndex(val[5])}`, end: `rotor-2`,                              color: "#9bdd15" },
            { start: `rotor-2`,                              end: `rotor-1`,                              color: "#e765aa" },
            { start: `rotor-1`,                              end: `rotor-0`,                              color: "#0979be" },
            { start: `rotor-0`,                              end: `socket-${val[8].toUpperCase()}`,       color: "#4df116" },
            getPBarrow(val[8], val[9]),
            { start: `socket-${val[9].toUpperCase()}`,       end: `out-${val[9].toUpperCase()}`,          color: "#b254f0" },
        ];
        return configs.slice(0, step + 1) || [];
    };

    const currentStep = STEPS[Math.min(stage, STEPS.length - 1)];

    const handleNext = () => {
        if (stage === 0) {
            if (!val || val.length < 10) {
                setAlert(prev => [...prev, ["Please press any key first.", 'error']]);
                return;
            }
            setStage(1);
            setWheelVisual(1);
            return;
        }

        if (stage >= 12) {
            setStage(0);
            setWheelVisual(0)
            setVal([]);
            return;
        }

        setWheelVisual(stage != 9 ? stage + 1 : stage + 2)
        stage != 9 ? setStage(stage + 1) : setStage(stage + 2)
    };

    const handlePrev = () => {
        setWheelVisual(stage != 11 ? stage - 1 : stage - 2)
        stage != 11 ? setStage(stage - 1) : setStage(stage - 2)
    }

    const buttonLabel = stage === 0 ? "Next" : stage >= 9 ? "Reset" : "Next";

    const infoContent = (
        <>
            <p><strong>{currentStep.label}</strong></p>
            {currentStep.description && <p>{currentStep.description}</p>}
            {stage > 1 && stage <= 10 && val.length >= 10 && (
                <p>
                    <strong>{val[stage - 2]}</strong> → <strong>{val[stage - 1] ?? '?'}</strong>
                </p>
            )}
        </>
    );

    const getLabel = (i, col) => {
        if (col == 'transparent')
            return
        if (i == 1)
            return val[i-1]
        if (i == 10)
            return val[i-2]
        if (i == 11)
            return `${val[i-3]}-${val[i-2]}`
        if (i == 12)
            return val[i-3]
        return `${val[i-2]}→${val[i-1]}`
    }

    const getStartAnchor = (i) => {
        switch (i){
            case 4: return 'bottom'
            case 5: return {position: 'middle', offset: {y: 50}}
            case 6: return {position: 'middle', offset: {y: 25}}
            case 7: return {position: 'middle', offset: {x: 50}}
            case 8: return {position: 'middle', offset: {y: -25}}
            case 9: return {position: 'middle', offset: {y: -50}}
            case 10: return 'top'
            default: return 'auto'
        }
    }

    const getEndAnchor = (i) => {
        switch (i){
            case 4: return {position: 'middle', offset: {y: 50}}
            case 5: return {position: 'middle', offset: {y: 25}}
            case 6: return {position: 'middle', offset: {x: 50}}
            case 7: return {position: 'middle', offset: {y: -25}}
            case 8: return {position: 'middle', offset: {y: -50}}
            case 9: return 'top'
            default: return 'auto'
        }
    }

    return (
        <Xwrapper>
            <Info 
                position={true} 
                buttonClick={handleNext}
                prev={stage > 0}
                prevClick={handlePrev}
            >
                {infoContent}
            </Info>

            {getArrows(stage).map((arrow, i) => (
                <Xarrow
                    key={i}
                    start={arrow.start}
                    end={arrow.end}
                    color={arrow.color}
                    strokeWidth={4}
                    headSize={6}
                    curveness={0.3}
                    zIndex={1000}
                    labels=<div style={{ fontSize: "1.3rem", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "0.2rem" }}>{getLabel(i, arrow.color)}</div>
                    startAnchor={getStartAnchor(i)}
                    endAnchor={getEndAnchor(i)}
                />
            ))}
        </Xwrapper>
    );
}

export default Visualizer;
