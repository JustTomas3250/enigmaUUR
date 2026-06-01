import React, { useState } from "react";
import Info from "./Info";
import Button from "../button/Button";
import EnigmaSetup from "../setupMode/EnigmaSetup";
import WheelBox from "../wheelBox/WheelBox";
import Enigma from "../enigma/Enigma";
import Notes from "../notes/Notes";
import wheelDrop from "../../../public/Images/wheelDrop.gif"
import wheelRot from "../../../public/Images/wheelRot.gif"
import plugBoard from "../../../public/Images/plugBoard.gif"
import typing from "../../../public/Images/typing.gif"

function Introduction({ setup, setSetup, setAlert, setNavPage, prevSetup, setPrevSetup, writeToNotes, setWriteToNotes }){
    let [stage, setStage] = useState(0)

    const renderESstages = [1, 2, 3, 4, 5]
    const renderEstages = [6, 7]

    const renderES = () => {
        return (
            <>
                <EnigmaSetup setup={setup} setSetup={setSetup} />
                <WheelBox className='sideComp' setup={setup} />
            </>
        )
    }

    const renderE = () => {
        return (
            <>
                <Enigma setup={setup} setSetup={setSetup} setWriteToNotes={setWriteToNotes} />
                <div className='sideComp'>
                    <Notes writeLetter={writeToNotes} />
                </div>
            </>
        )
    }

    const texts = [
        "Welcome to the Enigma Emulator page. Here, you can learn how to encrypt and decrypt messages using the Enigma machine, and discover how this amazing device works.",
        "Here you can see the Enigma setup mode. You can select the appropriate rotors, set their starting positions, and connect the letters on the plugboard.",
        "First, you can choose three of the five rotors and place them into the three designated slots in the Enigma. Keep in mind that the choice and order of the rotors will ultimately result in a completely different encryption.",
        "Now you can set the starting position of each rotor to a number from 1 to 26 (representing the 26 letters of the alphabet). Choosing different starting positions creates a wider variety of encryption combinations. You can spin the rotors using your mouse wheel or by clicking on the next numbers.",
        "Now you can swap letters on the plugboard. Each letter can be connected to only one other letter. Simply click on the first letter (it will turn orange) and then click on the second letter. To remove a connection, just click on either of the connected letters.",
        "Now we move on to the second part, where you can start encoding and decoding! It is important to remember the starting setup of the Enigma for successful decoding of the message you are going to encode. The current setup is:",
        "You can start typing now! Simply press the desired letter on the lower keyboard, and the encrypted letter will briefly light up on the upper lampboard. Heads up, it won't stay lit for long! You can record the resulting letter in the notes on the right. Keep in mind that every keystroke rotates the rotor (or multiple rotors) forward by one step. If you make a mistake, you must manually turn the rotor back by one position.",
        "Now you can decrypt your message by resetting the rotors to their initial positions and typing the encrypted message back into the machine. It's that simple! However, if you made a mistake during the encryption process, the message won't decrypt correctly.",
        "Congratulations! You can now successfully encrypt and decrypt messages! In the top-left corner, you'll find the menu where you can access the sandbox, missions, or learn more about the Enigma machine in the 'About' and 'Visualizer' tabs."
    ]

    const images = {
        2: wheelDrop,
        3: wheelRot,
        4: plugBoard,
        6: typing
    }

    const renderIntro = () => {
        return (
            <Info 
                buttonClick={() => {
                    if (stage == 2 && setup.wheels.length != 3){
                        setAlert(prev => ([ ...prev, ["Please insert 3 rotors into the Enigma to proceed.", 'error'] ]));
                        return;
                    }

                    stage != 8 ? setStage(stage + 1) : setNavPage('sandBoxSetup')

                    if (stage == 5){
                        setPrevSetup({...setup})
                    }
                }}
                position={stage >= 1 && stage <= 7}
                prev={stage > 0}
                prevClick={() => {
                    setStage(stage - 1)
                }}
            >
                <p>{texts[stage]}</p>
                {images[stage] && (
                    <>
                        <br />
                        <img src={images[stage]} />
                    </>
                )}
                {stage == 5 && (
                    <>
                        <p>Wheels id: {
                            setup.wheels.map((wheel, index) => (
                                <React.Fragment key={index}>
                                    <span id={wheel.id}>{wheel.id}</span>
                                    {index < setup.wheels.length - 1 ? ', ' : ''}
                                </React.Fragment>
                            ))   
                        }</p>
                        <p>Wheels position: {
                            setup.wheels.map((wheel, index) => (
                                <React.Fragment key={index}>
                                    <span id={wheel.id}>{wheel.value}</span>
                                    {index < setup.wheels.length - 1 ? ', ' : ''}
                                </React.Fragment>
                            ))   
                        }</p>
                        <p>Plugboard connections: {
                            setup.plugboard.map((conn, index) => (
                                <React.Fragment key={index}>
                                    <span id={`${conn.from}-${conn.to}`}>{conn.from + conn.to}</span>
                                    {index < setup.plugboard.length - 1 ? ', ' : ''}
                                </React.Fragment>
                            ))   
                        }</p>
                    </>
                )}

                {stage == 7 &&(
                    <p>Your initial rotor positions: {
                        prevSetup.wheels.map((wheel, index) => (
                            <React.Fragment key={index}>
                                <span id={wheel.id}>{wheel.value}</span>
                                {index < setup.wheels.length - 1 ? ', ' : ''}
                            </React.Fragment>
                        ))   
                    }</p>
                )}
            </Info>
        )
    }

    return (
        <>
            {renderIntro()}
            {renderESstages.includes(stage) ? renderES() : ''}
            {renderEstages.includes(stage) ? renderE() : ''}
        </>
    )
}

export default Introduction