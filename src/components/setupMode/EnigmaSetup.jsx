import React from 'react';
import WheelHolderSetup from './WheelHolderSetup';
import OutKey from '../enigma/OutKey';
import Inkey from '../enigma/InKey';
import PlugboardSetup from './PlugboardSetup';

function EnigmaSetup({ setup, setSetup }) {
    return (
        <div className="enigma">
            <WheelHolderSetup setSetup={setSetup} setup={setup} />
            <OutKey />
            <hr />
            <Inkey />
            <hr />
            <PlugboardSetup setSetup={setSetup} setup={setup} />
        </div>
    );
}

export default EnigmaSetup;