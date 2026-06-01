import React, { useState, useEffect, useRef } from "react";
import WheelHolder from "./WheelHolder";
import OutKey from "./OutKey";
import Inkey from "./InKey";
import Plugboard from "./Plugboard";

function Enigma({ setup, setSetup, setWriteToNotes, visualizer, setdecryptingVals, setHistory }) {
    const [letterInWheel, setLetterInWheel] = useState('')
    const [letterOutWheel, setLetterOutWheel] = useState('')
    const [pressedKeys, setPressedKeys] = useState(new Set())
    const isProcessing = useRef(false)
    const outClearTimeout = useRef(null)

    const typeLetter = (l) => {
        if (isProcessing.current) return

        isProcessing.current = true
        setLetterInWheel(l)
        setWriteToNotes('')

        if (typeof setHistory === 'function') {
            setHistory(prev => ({ input: l.toUpperCase(), output: null }))
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.target.id == 'textNotes') return
            if (event.repeat) return

            if (/^[a-zA-Z]$/.test(event.key)) {
                setPressedKeys(prev => new Set([...prev, event.key.toUpperCase()]))
                typeLetter(event.key.toLowerCase())
            }

            if (event.key == 'ArrowUp') rotateWheel(-1)
            if (event.key == 'ArrowDown') rotateWheel(1)
        }

        const handleKeyUp = (event) => {
            if (/^[a-zA-Z]$/.test(event.key)) {
                setPressedKeys(prev => {
                    const next = new Set(prev)
                    next.delete(event.key.toUpperCase())
                    return next
                })
                setLetterOutWheel('')
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [letterInWheel])

    const onCharCiphered = (l, states) => {
        setdecryptingVals(states)
        if (visualizer != null) {
            setLetterInWheel('')
            isProcessing.current = false
            return
        }
        
        rotateWheel(1)
        setLetterOutWheel(l)
        setLetterInWheel('')
        isProcessing.current = false

        if (typeof setHistory === 'function') {
            setHistory(prev => ({ ...prev, output: l }))
        }

        const wdm = document.querySelector('#WDM')
        if (wdm && wdm.checked) {
            setWriteToNotes(l)
        }
    }

    const rotateWheel = (num) => {
        setSetup(prev => {
            const wheelsCopy = prev.wheels.map(w => ({ ...w }))
            if (wheelsCopy.length === 0) return prev

            let otocDruhe = false
            let otocTreti = false

            if (wheelsCopy[0].value + num > 26 || wheelsCopy[0].value + num <= 0) {
                otocDruhe = true
            }
            if (otocDruhe && (wheelsCopy[1].value + num > 26 || wheelsCopy[1].value + num <= 0)) {
                otocTreti = true
            }

            wheelsCopy[0].value = (wheelsCopy[0].value + num + 25) % 26 + 1

            if (otocDruhe && wheelsCopy[1]) {
                wheelsCopy[1].value = (wheelsCopy[1].value + num + 25) % 26 + 1
            }
            if (otocTreti && wheelsCopy[2]) {
                wheelsCopy[2].value = (wheelsCopy[2].value + num + 25) % 26 + 1
            }

            return { ...prev, wheels: wheelsCopy }
        })
    }

    const handleMouseDown = (l) => {
        setPressedKeys(prev => new Set([...prev, l.toUpperCase()]))
        typeLetter(l.toLowerCase())
    }

    const handleMouseUp = (l) => {
        setPressedKeys(prev => {
            const next = new Set(prev)
            next.delete(l.toUpperCase())
            return next
        })
        setLetterOutWheel('')
    }

    return (
        <div className="enigma">
            <WheelHolder setup={setup} setSetup={setSetup} letterInWheel={letterInWheel} onCharCiphered={onCharCiphered} />
            <OutKey letterOut={letterOutWheel} />
            <hr />
            <Inkey
                typeLetter={typeLetter}
                typeMode={true}
                pressedKeys={pressedKeys}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
            />
            <hr />
            <Plugboard setup={setup} />
        </div>
    )
}

export default Enigma;