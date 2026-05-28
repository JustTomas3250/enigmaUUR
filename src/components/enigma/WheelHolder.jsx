import React, { useEffect, useState } from "react";
import Wheel from "./Wheel";
import RotorPins from "./RotorPins";

const ROTORS_FORWARD = [
    [4, 10, 12, 5, 11, 6, 3, 16, 21, 25, 13, 19, 14, 22, 24, 7, 23, 20, 18, 15, 0, 8, 1, 17, 2, 9],
    [0, 9, 3, 10, 18, 8, 17, 20, 23, 1, 11, 7, 22, 19, 12, 2, 16, 14, 6, 25, 13, 15, 24, 5, 21, 4],
    [1, 3, 5, 7, 9, 11, 2, 15, 17, 19, 23, 25, 24, 13, 22, 4, 8, 21, 18, 6, 0, 10, 12, 20, 16, 14],
    [4, 18, 14, 21, 15, 25, 9, 0, 24, 16, 20, 8, 17, 7, 23, 11, 13, 5, 19, 6, 10, 3, 2, 12, 22, 1],
    [21, 25, 1, 17, 6, 8, 19, 24, 20, 15, 18, 3, 13, 7, 11, 23, 0, 22, 12, 9, 16, 14, 5, 2, 10, 4]
];

const ROTORS_BACKWARD = ROTORS_FORWARD.map(rotor => {
    const invRotor = new Array(26).fill(0); 
    for (let j = 0; j < 26; j++) {
        const vystup = rotor[j];
        invRotor[vystup] = j; 
    }
    return invRotor;
});

const REFLECTOR_B = [24, 17, 20, 7, 16, 18, 11, 3, 15, 23, 13, 6, 14, 10, 12, 8, 4, 1, 5, 25, 2, 22, 21, 9, 0, 19];

function WheelHolder({ setup, setSetup, letterInWheel, onCharCiphered }) {
    let states = []

    const saveState = (i) => {
        states.push(String.fromCharCode(65 + i))
    }

    useEffect(() => {
        if (!letterInWheel || letterInWheel === '') return;

        let aktualniStavKol = setup.wheels.map(w => {
            const el = document.querySelector(`[data-wheel-id="${w.id}"]`);
            const hodnotaZDomu = el ? parseInt(el.getAttribute('data-wheel-value')) : null;
            return {
                ...w,
                value: hodnotaZDomu !== null && !isNaN(hodnotaZDomu) ? hodnotaZDomu : w.value
            };
        });

        setSetup(prev => ({
            ...prev,
            wheels: aktualniStavKol
        }));
        
        let currIndex = letterInWheel.toUpperCase().charCodeAt(0) - 65;

        saveState(currIndex)

        let vstupniPismeno = letterInWheel.toUpperCase();
        for (let i = 0; i < setup.plugboard.length; i++) {
            if (vstupniPismeno === setup.plugboard[i].from) {
                currIndex = setup.plugboard[i].to.charCodeAt(0) - 65;
                break;
            }
            if (vstupniPismeno === setup.plugboard[i].to) {
                currIndex = setup.plugboard[i].from.charCodeAt(0) - 65;
                break;
            }
        }

        saveState(currIndex)

        aktualniStavKol.forEach(wheel => {
            const rotorConfigIndex = (parseInt(wheel.id) - 1) % ROTORS_FORWARD.length; 
            const rotation = (wheel.value - 1) % 26;
            
            const vnitrniVstup = (currIndex + rotation) % 26;
            const vnitrniVystup = ROTORS_FORWARD[rotorConfigIndex][vnitrniVstup];
            currIndex = (vnitrniVystup - rotation + 26) % 26;

            saveState(currIndex)
        });

        currIndex = REFLECTOR_B[currIndex];

        saveState(currIndex)

        for (let i = aktualniStavKol.length - 1; i >= 0; i--) {
            const wheel = aktualniStavKol[i];
            const rotorConfigIndex = (parseInt(wheel.id) - 1) % ROTORS_BACKWARD.length;
            const rotation = (wheel.value - 1) % 26;

            const vnitrniVstupZpet = (currIndex + rotation) % 26;
            const vnitrniVystupZpet = ROTORS_BACKWARD[rotorConfigIndex][vnitrniVstupZpet];
            currIndex = (vnitrniVystupZpet - rotation + 26) % 26;

            saveState(currIndex)
        }

        let letterBeforePlugboard = String.fromCharCode(65 + currIndex);

        for (let i = 0; i < setup.plugboard.length; i++) {
            if (letterBeforePlugboard === setup.plugboard[i].from) {
                currIndex = setup.plugboard[i].to.charCodeAt(0) - 65;
                break;
            }
            if (letterBeforePlugboard === setup.plugboard[i].to) {
                currIndex = setup.plugboard[i].from.charCodeAt(0) - 65;
                break;
            }
        }

        saveState(currIndex)

        const finalLetter = String.fromCharCode(65 + currIndex);

        if (typeof onCharCiphered === 'function') {
            onCharCiphered(finalLetter, states);
        }

    }, [letterInWheel]);

    return (
        <div className="wheelHolder wheelHolderAlign">
            {setup.wheels.map((wheel, index) => (
                <Wheel key={index} id={wheel.id} position={index} value={wheel.value} />
            ))}
            <div id="reflector-container" style={{ position: 'relative', width: 10 }}>
                {Array.from({ length: 26 }, (_, i) => (
                    <div key={i} id={`reflector-pin-${i}`} style={{ height: '3.84%', width: 1, opacity: 0 }} />
                ))}
            </div>
        </div>
    );
}

export default WheelHolder;