import React, { useState } from 'react';
import './App.css';
import EnigmaSetup from './components/setupMode/EnigmaSetup';
import Nav from './components/nav/Nav';
import Enigma from './components/enigma/Enigma';
import WheelBox from './components/wheelBox/WheelBox';
import Alert from '@mui/material/Alert';
import CustomAlert from './components/CustomAlert';
import Notes from './components/notes/Notes';
import Button from './components/button/Button';
import MissionText from './components/missions/MissionText';
import About from './components/about/About';

import './components/enigma/enigma.css'
import './components/setupMode/setupMode.css'
import Introduction from './components/introduction/Introduction';

function App() {
    const [navPage, setNavPage] = useState('introduction');
    const [setup, setSetup] = useState({
        wheels: [],
        plugboard: []
    });
    const [alert, setAlert] = useState([]);
    const [letter, setLetter] = useState('');
    const [sandBoxSetup, setSandBoxSetup] = useState(true)

    const renderPage = () => {
        switch (navPage) {
            case 'introduction':
                return (
                    <>
                        <h1>Introduction</h1>
                        <Introduction setup={setup} setSetup={setSetup} setAlert={setAlert} letter={letter} setLetter={setLetter} setNavPage={setNavPage}/>
                    </>
                )
                break
            case 'sandBoxSetup':
                return (
                    <>
                        <h1>Sandbox - setup</h1>
                        <EnigmaSetup setup={setup} setSetup={setSetup} />
                        <WheelBox setup={setup} />
                        <Button onClick={() => {
                            if (setup.wheels.length < 3) {
                                setAlert(prev => ([ ...prev, ["To enter the sandbox, please select 3 wheels", 'error'] ]));
                                return;
                            }
                            setNavPage('sandBox');
                        }}
                        >
                            Enter Sandbox
                        </Button>
                    </>
                );
                break;
            case 'sandBox':
                return (
                    <>
                        <h1>Sandbox</h1>
                        <Enigma setup={setup} setSetup={setSetup} letter={letter} setLetter={setLetter} />
                        <Notes />
                        <Button onClick={() => {
                            setNavPage('sandBoxSetup');
                        }}
                        >
                            Return to setup
                        </Button>
                    </>
                );
                break;
            case 'missionsSetup':
                return (
                    <>
                        <h1>Mission - setup</h1>
                        <EnigmaSetup setup={setup} setSetup={setSetup} />
                        <WheelBox setup={setup} />
                        <Button onClick={() => {
                            if (setup.wheels.length < 3) {
                                setAlert(prev => ([ ...prev, ["To enter the mission, please select 3 wheels", 'error'] ]));
                                return;
                            }
                            setNavPage('missions');
                        }}
                        >
                            Try Mission
                        </Button>
                        <MissionText />
                    </>
                );
            case 'missions':
                return (
                    <>
                        <h1>Mission</h1>
                        <Enigma setup={setup} setSetup={setSetup} letter={letter} setLetter={setLetter} />
                        <Notes />
                        <Button onClick={() => {
                            setNavPage('missionsSetup');
                        }}
                        >
                            Return to setup
                        </Button>
                        <MissionText />
                    </>
                );
                break;
            case 'about':
                return (
                    <>
                        <h1>About</h1>
                        <About />
                    </>
                );
                break;
            default:
                return (<></>);
        }
    };

    const renderAlerts = () => {
        return alert.map((a, index) => (
            <CustomAlert 
                key={index} 
                text={a[0]} 
                severity={a[1]} 
                index={index} 
                onRemove={() => {
                    setAlert(prev => prev.filter((_, i) => i !== index));
                }}
            />
        ));
    };

    return (
        <>
            <div className='setupMode'>
                {renderAlerts()}
                {renderPage()}
                <Nav page={navPage} setPage={setNavPage} />
            </div>
        </>
    )
}

export default App
