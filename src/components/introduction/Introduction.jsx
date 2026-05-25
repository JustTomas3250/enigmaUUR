import React, { useState } from "react";
import Info from "./Info";
import Button from "../button/Button";
import EnigmaSetup from "../setupMode/EnigmaSetup";
import WheelBox from "../wheelBox/WheelBox";
import reactXarrowsObj from 'react-xarrows';
import Enigma from "../enigma/Enigma";
import Notes from "../notes/Notes";

const Xarrow = reactXarrowsObj.default;

function Introduction({ setup, setSetup, setAlert, letter, setLetter, setNavPage }){
    let [stage, setStage] = useState(0)
    let [prevSetup, setPrevSetup] = useState(setup)

    const renderESstages = [1, 2, 3, 4, 5]
    const renderEstages = [6, 7]

    const renderES = () => {
        return (
            <>
                <EnigmaSetup setup={setup} setSetup={setSetup} />
                <WheelBox setup={setup} />
            </>
        )
    }

    const renderE = () => {
        return (
            <>
                <Enigma setup={setup} setSetup={setSetup} letter={letter} setLetter={setLetter} />
                <Notes />
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
                            <img src="/Images/plugBoard.gif"/>
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
                            <img src="/Images/wheelRot.gif"/>
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
                            <img src="/Images/plugBoard.gif"/>
                            <br />
                        </Info>
                    </>
                )
            case 5:
                return (
                    <>
                        <Info position={true} buttonClick={() => {
                            setStage(stage + 1)
                            setPrevSetup({...setup})
                        }}>
                            <p>Now we move on to the second part, where you can start encoding and decoding! It is important to remember the starting setup of the Enigma for successful decoding of the message you are going to encode. The current setup is:</p>
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
                        </Info>
                    </>
                )
            case 6:
                return (
                    <>
                        <Info position={true} buttonClick={() => {
                            setStage(stage + 1)
                        }}>
                            <p>You can start typing now! Simply press the desired letter on the lower keyboard, and the encrypted letter will briefly light up on the upper lampboard. Heads up, it won't stay lit for long! You can record the resulting letter in the notes on the right. Keep in mind that every keystroke rotates the rotor (or multiple rotors) forward by one step. If you make a mistake, you must manually turn the rotor back by one position.</p>
                            <img src="/Images/typing.gif"/>
                            <br />
                        </Info>
                    </>
                )
            case 7:
                console.log(prevSetup)
                return (
                    <>
                        <Info position={true} buttonClick={() => {
                            setStage(stage + 1)
                        }}>
                            <p>Now you can decrypt your message by resetting the rotors to their initial positions and typing the encrypted message back into the machine. It's that simple! However, if you made a mistake during the encryption process, the message won't decrypt correctly.</p>
                            <p>Your initial rotor positions: {
                                prevSetup.wheels.map((wheel, index) => (
                                    <React.Fragment key={index}>
                                        <span id={wheel.id}>{wheel.value}</span>
                                        {index < setup.wheels.length - 1 ? ', ' : ''}
                                    </React.Fragment>
                                ))   
                            }</p>
                            <br />
                        </Info>
                    </>
                )
            case 8:
                return (
                    <>
                        <Info buttonClick={() => {
                            setNavPage('sandBoxSetup')
                        }}>
                            <p>Congratulations! You can now successfully encrypt and decrypt messages! In the top-left corner, you'll find the menu where you can access the sandbox, missions, or learn more about the Enigma machine in the 'About' and 'Visualizer' tabs.</p>
                        </Info>
                    </>
                )
        }
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