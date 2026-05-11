import React, { useState } from 'react';
import './App.css'
import Enigma from './components/Enigma';
import WheelHolder from './components/WheelHolder';
import WheelBox from './components/WheelBox';

function App() {
    return (
        <>
            <div className='setupMode'>
                <Enigma />
                <WheelBox />
            </div>
        </>
    )
}

export default App
