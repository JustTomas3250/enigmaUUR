import React, { useState, useEffect, useRef } from "react";
import WheelHolder from "./WheelHolder";
import OutKey from "./OutKey";
import Inkey from "./InKey";
import Plugboard from "./Plugboard";

function Enigma({ setup, setSetup, letter, setLetter, setWriteToNotes, visualizer, setVisualizerValues }) {
    const [letterInWheel, setLetterInWheel] = useState('')
    const [letterOutWheel, setLetterOutWheel] = useState('')
    const isProcessing = useRef(false)

    const typeLetter = (l) => {
        if(isProcessing.current)
            return

        isProcessing.current = true
        setLetterInWheel(l);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.target.id == 'textNotes')
                return

            if (/^[a-zA-Z]$/.test(event.key)) {
                typeLetter(event.key.toLowerCase())
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [letterInWheel]);

    const onCharCiphered = (l, states) => {
        if (visualizer != null) {
            setVisualizerValues(states);
            setLetterInWheel('');
            isProcessing.current = false;
            return;
        }

        setLetterOutWheel(l);

        const wdm = document.querySelector('#WDM');
        if (wdm && wdm.checked) {
            setWriteToNotes(l);
        }
    }

    useEffect(() => {
        if (letterOutWheel == '0') {
            setSetup(prev => {
                const wheelsCopy = prev.wheels.map(w => ({ ...w }));

                if (wheelsCopy.length === 0) return prev;

                let otocDruhe = false;
                let otocTreti = false;

                if (wheelsCopy[0].value === 26) {
                    otocDruhe = true;
                }

                if (otocDruhe && wheelsCopy[1] && wheelsCopy[1].value === 26) {
                    otocTreti = true;
                }

                wheelsCopy[0].value = (wheelsCopy[0].value % 26) + 1;

                if (otocDruhe && wheelsCopy[1]) {
                    wheelsCopy[1].value = (wheelsCopy[1].value % 26) + 1;
                }

                if (otocTreti && wheelsCopy[2]) {
                    wheelsCopy[2].value = (wheelsCopy[2].value % 26) + 1;
                }

                return {
                    ...prev,
                    wheels: wheelsCopy
                };
            });
            isProcessing.current = false;
            setLetterOutWheel('');
            setLetterInWheel('');
            setWriteToNotes('');
        }
    }, [letterOutWheel]);

    return (
        <div className="enigma">
            <WheelHolder setup={setup} setSetup={setSetup} letterInWheel={letterInWheel} onCharCiphered={onCharCiphered} />
            <OutKey letterOut={letterOutWheel} setLetter={setLetterOutWheel}/>
            <hr />
            <Inkey letter={letter} typeLetter={typeLetter} typeMode={true} />
            <hr />
            <Plugboard setup={setup} />
        </div>
    );
}

export default Enigma;