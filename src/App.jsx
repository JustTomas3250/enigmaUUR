import React, { useState, useRef, useEffect } from 'react';
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
import PrevSetup from './components/prevSetup/PrevSetup';
import Visualizer from './components/visualizer/Visualizer';
import Footer from './components/footer/Footer';
import WheelVisualizer from './components/visualizer/WheelVisualizer';

function App() {
    const [navPage, setNavPage] = useState(() => 
    localStorage.getItem('navPage') || 'introduction'
    );
    const [setup, setSetup] = useState(() => {
        const saved = localStorage.getItem('setup');
        return saved ? JSON.parse(saved) : { wheels: [], plugboard: [] };
    });
    const [alert, setAlert] = useState([]);
    const [prevSetup, setPrevSetup] = useState(setup)
    const [writeToNotes, setWriteToNotes] = useState('')
    const visualizer = useRef(false)
    const [decryptingVals, setdecryptingVals] = useState([])
    const [history, setHistory] = useState({})
    const [wheelVisual, setWheelVisual] = useState(0)

    useEffect(() => {
        localStorage.setItem('navPage', navPage);
    }, [navPage]);

    useEffect(() => {
        localStorage.setItem('setup', JSON.stringify(setup));
    }, [setup]);
    
    const PAGE_TITLES = {
        introduction: 'Introduction',
        sandBoxSetup: 'Sandbox - setup',
        sandBox: 'Sandbox',
        visualizerSetup: 'Visualizer - setup',
        visualizer: 'Visualizer',
        missionsSetup: 'Mission - setup',
        missions: 'Mission',
        about: 'About',
    };

    const renderPage = () => {
        visualizer.current = false
        switch (navPage) {
            case 'introduction':
                return (
                    <Introduction 
                        setup={setup} 
                        setSetup={setSetup} 
                        setAlert={setAlert} 
                        setNavPage={setNavPage} 
                        prevSetup={prevSetup} 
                        setPrevSetup={setPrevSetup}
                        writeToNotes={writeToNotes}
                        setWriteToNotes={setWriteToNotes}
                    />
                )
                break
            case 'sandBoxSetup':
                return (
                    <>
                        <div className='sideComp'></div>
                        <EnigmaSetup setup={setup} setSetup={setSetup} />
                        <div className='sideComp'>
                            <WheelBox setup={setup} />
                            <Button onClick={() => {
                                if (setup.wheels.length < 3) {
                                    setAlert(prev => ([ ...prev, ["To enter the sandbox, please select 3 wheels", 'error'] ]));
                                    return;
                                }
                                setPrevSetup(setup)
                                setNavPage('sandBox');
                            }}
                            >
                                Enter Sandbox
                            </Button>
                        </div>
                    </>
                );
                break;
            case 'sandBox':
                return (
                    <>
                        <div className='sideComp'>
                            <PrevSetup prevSetup={prevSetup} history={history} />
                        </div>
                        <Enigma setup={setup} setSetup={setSetup} setWriteToNotes={setWriteToNotes} setHistory={setHistory} setdecryptingVals={setdecryptingVals} />
                        <div className='sideComp'>
                            <Notes writeLetter={writeToNotes} decryptingVals={decryptingVals} setup={setup} setSetup={setSetup} />
                            <Button onClick={() => {
                                setSetup(prevSetup)
                                setNavPage('sandBoxSetup');
                            }}
                            >
                                Return to setup
                            </Button>
                        </div>
                    </>
                );
                break;
            case 'visualizerSetup':
                return (
                    <>
                        <div className='sideComp'></div>
                        <EnigmaSetup setup={setup} setSetup={setSetup} />
                        <div className='sideComp'>
                            <WheelBox setup={setup} />
                            <Button onClick={() => {
                                if (setup.wheels.length < 3) {
                                    setAlert(prev => ([ ...prev, ["To enter the sandbox, please select 3 wheels", 'error'] ]));
                                    return;
                                }
                                setPrevSetup(setup)
                                setNavPage('visualizer');
                                visualizer.current = true
                                setWheelVisual(0)
                            }}
                            >
                                Enter Visualizer
                            </Button>
                        </div>
                    </>
                );
            case 'visualizer':
                return (
                    <>
                        <Visualizer val={decryptingVals} setVal={setdecryptingVals} setAlert={setAlert} setWheelVisual={setWheelVisual} />
                        <Enigma setup={setup} setSetup={setSetup} setWriteToNotes={setWriteToNotes} visualizer={visualizer} setdecryptingVals={setdecryptingVals} />
                        <div className='sideComp'>
                            <WheelVisualizer val={decryptingVals} stage={wheelVisual} setup={setup} />
                            <Button onClick={() => {
                                setSetup(prevSetup)
                                setNavPage('visualizerSetup');
                            }}
                            >
                                Return to setup
                            </Button>
                        </div>
                    </>
                );
            case 'missionsSetup':
                return (
                    <>
                        <div className='sideComp'>
                            <MissionText setup={setup}/>
                        </div>
                        <EnigmaSetup setup={setup} setSetup={setSetup} />
                        <div className='sideComp'>
                            <WheelBox setup={setup} />
                            <Button onClick={() => {
                                if (setup.wheels.length < 3) {
                                    setAlert(prev => ([ ...prev, ["To enter the mission, please select 3 wheels", 'error'] ]));
                                    return;
                                }
                                setPrevSetup(setup)
                                setNavPage('missions');
                            }}>
                                Try Mission
                            </Button>
                        </div>
                    </>
                );
            case 'missions':
                return (
                    <>
                        <div className='sideComp'>
                            <MissionText setup={setup} />
                        </div>
                        <Enigma setup={setup} setSetup={setSetup} setWriteToNotes={setWriteToNotes} setdecryptingVals={setdecryptingVals} />
                        <div className='sideComp'>
                            <Notes writeLetter={writeToNotes} decryptingVals={decryptingVals} setup={setup} setSetup={setSetup} />
                            <Button onClick={() => {
                                setSetup(prevSetup)
                                setNavPage('missionsSetup');
                            }}>
                                Return to setup
                            </Button>
                        </div>
                    </>
                );
            case 'about':
                return (
                    <About />
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
            <div className='app'>
                {renderAlerts()}
                <h1>{PAGE_TITLES[navPage] ?? ''}</h1>
                <div className='appContent'>
                    {renderPage()}
                </div>
                <Nav page={navPage} setPage={setNavPage} />
                <Footer/>
            </div>
        </>
    )
}

export default App
