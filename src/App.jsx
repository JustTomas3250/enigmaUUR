import React, { useState } from 'react';
import './App.css';
import WheelHolder from './components/WheelHolder';
import WheelBox from './components/WheelBox';
import EnigmaSetup from './components/EnigmaSetup';
import Nav from './components/Nav';

function App() {
    return (
        <>
            <div className='setupMode'>
                <EnigmaSetup />
                <WheelBox />
                <Nav />
            </div>
        </>
    )
}

export default App
