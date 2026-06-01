import React, { useEffect } from "react";
import './visualizer.css'
import reactXarrowsObj from 'react-xarrows';
import { ROTORS } from '../enigma/rotors.js'

const Xarrow = reactXarrowsObj.default;
const Xwrapper = reactXarrowsObj.Xwrapper;

const ROTORS_BACKWARD = ROTORS.map(rotor => {
    const invRotor = new Array(26).fill(0); 
    for (let j = 0; j < 26; j++) {
        const vystup = rotor[j];
        invRotor[vystup] = j; 
    }
    return invRotor;
});

function WheelVisualizer({ val, wheelVisual, setup }) {
    const stageIDs = [3, 4, 5, 7, 8, 9]
    const wheelNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    const getArrows = () => {
        if(!stageIDs.includes(wheelVisual))
            return []
        
        let arrows = []
        let rotorID = 0
        if (wheelVisual < 6){
            rotorID = wheelVisual - 3
            
            let wheelID = setup.wheels[rotorID].id - 1

            for(let i = 0; i < ROTORS[0].length; i++){
                const offset = (setup.wheels[rotorID].value - 1) % 26
                const incomingIndex = alphabet.indexOf(val[wheelVisual - 2])
                const highlightIndex = (incomingIndex + offset) % 26

                arrows.push({
                    start: `wd-start-${i}`,
                    end: `wd-end-${ROTORS[rotorID][i]}`,
                    highlight: i === highlightIndex,
                    startLetter: alphabet[(i - offset + 26) % 26],
                    endLetter: alphabet[(ROTORS[wheelID][i] - offset + 26) % 26]
                })
            }

            return arrows
        }
        
        rotorID = 9 - wheelVisual
        
        let wheelID = setup.wheels[rotorID].id - 1

        for(let i = 0; i < ROTORS_BACKWARD[0].length; i++){
            const offset = (setup.wheels[rotorID].value - 1) % 26
            const incomingIndex = alphabet.indexOf(val[wheelVisual - 2])
            const highlightIndex = ROTORS_BACKWARD[wheelID].indexOf((incomingIndex + offset) % 26)

            arrows.push({
                start: `wd-start-${ROTORS_BACKWARD[wheelID][i]}`,
                end: `wd-end-${i}`,
                highlight: i === (incomingIndex + offset) % 26,
                startLetter: alphabet[(ROTORS_BACKWARD[wheelID][i] - offset + 26) % 26],
                endLetter: alphabet[(i - offset + 26) % 26]
            })
        }

        return arrows
    }

    return (
        <div
            className="wheelVisualizer"
            id="test"
            style={{
                'display': stageIDs.includes(wheelVisual) ? 'block' : 'none'
            }}
        >
            <h2>Wheel Visualizer</h2>
            <div className="wheelDiagram">
            {
                wheelNumbers.map(w => (
                    <React.Fragment key={w}>
                        <div className="WDstart" id={`wd-start-${w}`}/>
                        <div/>
                        <div className="WDend" id={`wd-end-${w}`}/>
                    </React.Fragment>
                ))
            }
            </div>



            <Xwrapper>
                {getArrows().map((arrow, i) => (
                    <Xarrow
                        key={i}
                        start={arrow.start}
                        end={arrow.end}
                        strokeWidth={arrow.highlight ? 2 : 1}
                        headSize={6}
                        curveness={0.3}
                        zIndex={1000}
                        color={arrow.highlight ? 'red' : 'black'}
                        headSize='0'
                        path='straight'
                        labels={{
                            start: <div style={{marginTop: '1rem', marginLeft: '-2.9rem' , color: arrow.highlight ? 'red' : 'black'}} >{arrow.startLetter}</div>,
                            end: <div style={{marginTop: '-1rem', marginRight: '-2.7rem' , color: arrow.highlight ? 'red' : 'black'}} >{arrow.endLetter}</div>
                        }}
                    />
                ))}
            </Xwrapper>
        </div>
    )
}

export default WheelVisualizer