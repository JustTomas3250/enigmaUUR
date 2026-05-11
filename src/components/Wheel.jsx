import React, { useState } from "react";
import './setupMode.css';
import 'gridstack/dist/gridstack.min.css';
import Picker from "react-mobile-picker";


function Wheel({ id }) {
    let opt = []

    for (let i = 1; i <= 20; i++) {
        for (let j = 1; j <= 26; j++) {
            opt.push(i * 100 + j);
        }
    }

    const selections = {
        options: opt
    };

    // State pro vybranou hodnotu
    const [pickerValue, setPickerValue] = useState({
        options: 1001
    });

    return (
        <div className="wheel grid-stack-item-content">
            <span className="wheelId">{id}</span>
            <div className="wheelPicker">
                <Picker
                    value={pickerValue}
                    onChange={setPickerValue}
                    wheelMode="natural"
                >
                    {Object.keys(selections).map(name => (
                        <Picker.Column key={name} name={name}>
                            {selections[name].map(option => (
                                <Picker.Item key={option} value={option}>
                                    <div className="wheelOptions" style={{
                                        filter: option === pickerValue.options ? 'brightness(0.5)' : 'none',
                                        fontWeight: pickerValue.options === option ? 'bold' : 'normal'
                                    }}>
                                        {option % 100}
                                    </div>
                                </Picker.Item>
                            ))}
                        </Picker.Column>
                    ))}
                </Picker>
            </div>
        </div>
    );
}

export default Wheel;