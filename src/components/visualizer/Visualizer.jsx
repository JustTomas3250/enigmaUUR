import React, { useState } from "react";
import Info from "../introduction/Info";
import reactXarrowsObj from 'react-xarrows';

const Xarrow = reactXarrowsObj.default;
const Xwrapper = reactXarrowsObj.Xwrapper;

const STEPS = [
    {
        label: "Press any key on the Enigma machine to begin.",
        description: null,
    },
    {
        label: "Step 1 — Input key",
        description: "You pressed a key on the keyboard. The signal now travels to the plugboard.",
    },
    {
        label: "Step 2 — Plugboard (in)",
        description: "If this letter is connected to another via a cable on the plugboard, the signal is swapped to the connected letter. Otherwise it passes through unchanged.",
    },
    {
        label: "Step 3 — Rotor 1 (forward)",
        description: "The signal enters the first rotor. Each rotor scrambles the letter according to its internal wiring and current rotation position.",
    },
    {
        label: "Step 4 — Rotor 2 (forward)",
        description: "The scrambled signal continues through the second rotor, which applies its own substitution.",
    },
    {
        label: "Step 5 — Rotor 3 (forward)",
        description: "The signal passes through the third rotor. After this, it reaches the reflector.",
    },
    {
        label: "Step 6 — Reflector",
        description: "The reflector maps the signal to a completely different letter and sends it back through the rotors in reverse. This is what makes Enigma self-inverse.",
    },
    {
        label: "Step 7 — Rotor 3 (backward)",
        description: "The signal travels back through rotor 3 in reverse, using the inverse wiring.",
    },
    {
        label: "Step 8 — Rotor 2 (backward)",
        description: "Continuing backward through rotor 2.",
    },
    {
        label: "Step 9 — Rotor 1 (backward)",
        description: "The signal exits rotor 1 and heads to the plugboard for the final substitution.",
    },
    {
        label: "Step 10 — Plugboard (out) & Output",
        description: "The plugboard applies its swap one final time. The resulting letter lights up on the lampboard — that is your encrypted letter!",
    },
    {
        label: "Result — Output letter",
        description: "The final encrypted letter lights up on the lampboard. This is your ciphertext letter!",
    },
];

function Visualizer({ val, setVal, setAlert }) {
    const [stage, setStage] = useState(0);
    const [arrows, setArrows] = useState([]);

    const letterIndex = (l) => l.toUpperCase().charCodeAt(0) - 65;

    const getArrow = (step) => {
        if (!val || val.length < 10) return null;
        const configs = [
            null,
            { start: `key-btn-${val[0].toUpperCase()}`,      end: `socket-${val[0].toUpperCase()}`,       color: "#f1faee" },
            { start: `socket-${val[1].toUpperCase()}`,       end: `rotor-0-pin`,                          color: "#54ebf0" },
            { start: `rotor-0-pin`,                          end: `rotor-1-pin`,                          color: "#ffb703" },
            { start: `rotor-1-pin`,                          end: `rotor-2-pin`,                          color: "#ab18fa" },
            { start: `rotor-2-pin`,                          end: `reflector-pin-${letterIndex(val[4])}`, color: "#e63946" },
            { start: `reflector-pin-${letterIndex(val[5])}`, end: `rotor-2-pin`,                          color: "#9bdd15" },
            { start: `rotor-2-pin`,                          end: `rotor-1-pin`,                          color: "#e765aa" },
            { start: `rotor-1-pin`,                          end: `rotor-0-pin`,                          color: "#0979be" },
            { start: `rotor-0-pin`,                          end: `socket-${val[9].toUpperCase()}`,       color: "#4df116" },
            { start: `socket-${val[9].toUpperCase()}`,       end: `out-${val[9].toUpperCase()}`,          color: "#b254f0" },
        ];
        return configs[step] || null;
    };

    const currentStep = STEPS[Math.min(stage, STEPS.length - 1)];

    const handleNext = () => {
        if (stage === 0) {
            if (!val || val.length < 10) {
                setAlert(prev => [...prev, ["Please press any key first.", 'error']]);
                return;
            }
            setStage(1);
            const arrow = getArrow(1);
            if (arrow) setArrows([arrow]);
            return;
        }

        if (stage >= 10) {
            setArrows([]);
            setStage(0);
            setVal([]);
            return;
        }

        const next = stage + 1;
        setStage(next);
        const arrow = getArrow(next);
        if (arrow) setArrows(prev => [...prev, arrow]);
    };

    const buttonLabel = stage === 0 ? "Next" : stage >= 9 ? "Reset" : "Next";

    const infoContent = (
        <>
            <p><strong>{currentStep.label}</strong></p>
            {currentStep.description && <p>{currentStep.description}</p>}
            {stage > 0 && stage <= 9 && val.length >= 10 && (
                <p>
                    <strong>{val[stage - 1]}</strong> → <strong>{val[stage] ?? '?'}</strong>
                </p>
            )}
        </>
    );

    return (
        <Xwrapper>
            <Info position={true} buttonClick={handleNext}>
                {infoContent}
            </Info>

            {arrows.map((arrow, i) => (
                <Xarrow
                    key={i}
                    start={arrow.start}
                    end={arrow.end}
                    color={arrow.color}
                    strokeWidth={3}
                    headSize={6}
                    curveness={0.3}
                />
            ))}
        </Xwrapper>
    );
}

export default Visualizer;
