import React from 'react';
import WheelHolderSetup from './WheelHolderSetup';
import './setupMode.css';
import OutKey from './OutKey';
import Inkey from './InKey';
import PlugboardSetup from './PlugboardSetup';
import OutLog from './OutLog';

function EnigmaSetup({ setup, setSetup }) {
    return (
        <div className="enigma">
            <WheelHolderSetup setSetup={setSetup} setup={setup} />
            <OutKey />
            <hr />
            <Inkey />
            <hr />
            <PlugboardSetup setSetup={setSetup} setup={setup} />
            {/*
                <hr />
                <OutLog entries={setup} />
            */}
        </div>
    );
}

export default EnigmaSetup;