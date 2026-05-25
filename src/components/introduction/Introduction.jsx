import React, { useState } from "react";
import Info from "./Info";
import Button from "../button/Button";
import EnigmaSetup from "../setupMode/enigmaSetup";
import WheelBox from "../wheelBox/WheelBox";
import reactXarrowsObj from 'react-xarrows';

const Xarrow = reactXarrowsObj.default;

function Introduction({ setup, setSetup, setAlert }){
    let [stage, setStage] = useState(0)

    const renderESstages = [1, 2, 3, 4]

    const renderES = () => {
        return (
            <>
                <EnigmaSetup setup={setup} setSetup={setSetup} />
                <WheelBox setup={setup} />
            </>
        )
    }

    const renderIntro = () => {
        switch (stage){
            case 0:
                return (
                    <>
                        <Info buttonClick={() => {
                            setStage(stage + 1)
                        }}>
                            <p>Welcome to the Enigma Emulator page. Here, you can learn how to encrypt and decrypt messages using the Enigma machine, and discover how this amazing device works.</p>
                        </Info>
                    </>
                )
            case 1:
                return (
                    <>
                        <Info position={true} buttonClick={() => {
                            setStage(stage + 1)
                        }}>
                            <p>Here you can see the Enigma setup mode. You can select the appropriate rotors, set their starting positions, and connect the letters on the plugboard.</p>
                        </Info>
                    </>
                )
            case 2:
                return (
                    <>
                        <Info position={true} buttonClick={() => {
                            if (setup.wheels.length != 3){
                                setAlert(prev => ([ ...prev, ["Please insert 3 rotors into the Enigma to proceed.", 'error'] ]));
                                return;
                            }
                            setStage(stage + 1)
                        }}>
                            <p>First, you can choose three of the five rotors and place them into the three designated slots in the Enigma. Keep in mind that the choice and order of the rotors will ultimately result in a completely different encryption.</p>
                            <img src="./Images/wheelDrop.gif"/>
                            <br />
                        </Info>
                        <Xarrow
                            className='xarrow'
                            start='wheelBox'
                            end='wheelHolderSetup'
                            color="red"
                            path="straight"
                        />
                    </>
                )
            case 3:
                return (
                    <>
                        <Info position={true} buttonClick={() => {
                            setStage(stage + 1)
                        }}>
                            <p>Now you can set the starting position of each rotor to a number from 1 to 26 (representing the 26 letters of the alphabet). Choosing different starting positions creates a wider variety of encryption combinations. You can spin the rotors using your mouse wheel or by clicking on the next numbers.</p>
                            <img src="./Images/wheelRot.gif"/>
                            <br />
                        </Info>
                    </>
                )
            case 4:
                return (
                    <>
                        <Info position={true} buttonClick={() => {
                            setStage(stage + 1)
                        }}>
                            <p>Now you can swap letters on the plugboard. Each letter can be connected to only one other letter. Simply click on the first letter (it will turn orange) and then click on the second letter. To remove a connection, just click on either of the connected letters.</p>
                            <img src="./Images/plugBoard.gif"/>
                            <br />
                        </Info>
                    </>
                )
        }
    }

    return (
        <>
            {renderIntro()}
            {renderESstages.includes(stage) ? renderES() : ''}
        </>
    )
}

export default Introduction