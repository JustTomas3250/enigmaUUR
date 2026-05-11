import React from 'react';
import WheelHolder from './WheelHolder';
import './setupMode.css';
import OutKey from './OutKey';

function Enigma() {
    return (
        <div className="enigma">
            <WheelHolder />
            <OutKey />
            <hr />
        </div>
    );
}

export default Enigma;