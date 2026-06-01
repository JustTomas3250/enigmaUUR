import React, { useEffect, useState } from "react";
import Wheel from "./Wheel";
import RotorPins from "./RotorPins";
import { ROTORS, REFLECTOR } from './rotors'

const ROTORS_FORWARD = ROTORS

const ROTORS_BACKWARD = ROTORS_FORWARD.map(rotor => {
    const invRotor = new Array(26).fill(0); 
    for (let j = 0; j < 26; j++) {
        const vystup = rotor[j];
        invRotor[vystup] = j; 
    }
    return invRotor;
});

const REFLECTOR_B = REFLECTOR 

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