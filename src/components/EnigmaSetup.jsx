import React from 'react';
import WheelHolder from './WheelHolder';
import './setupMode.css';
import OutKey from './OutKey';
import Inkey from './InKey';
import Plugboard from './Plugboard';
import OutLog from './OutLog';

function EnigmaSetup() {
    return (
        <div className="enigma">
            <WheelHolder />
            <OutKey />
            <hr />
            <Inkey />
            <hr />
            <Plugboard />
            <hr />
            <OutLog entries={[""]} />
        </div>
    );
}

export default EnigmaSetup;