import React, {useState, useEffect} from "react";
import 'gridstack/dist/gridstack.min.css';
import Picker from "react-mobile-picker";
import RotorPins from "./RotorPins";

function Wheel({ id, position, value }) {
    let opt = []
    
    for (let i = 1; i <= 20; i++) {
        for (let j = 1; j <= 26; j++) {
            opt.push(i * 100 + j);
        }
    }

    useEffect(() => {
        setPickerValue({ options: 200 + value });
    }, [value]);

    const selections = {
        options: opt
    };

    const [pickerValue, setPickerValue] = useState({
        options: 1000 + value
    });

    return (
        <div 
            className="wheel"
            data-wheel-id={id} 
            data-wheel-value={pickerValue.options % 100} 
            id={`rotor-${position}`}
        >
            <span className="wheelIdAlign">{id}</span>
            <div style={{ position: 'relative' }}>
                <div className="wheelPicker">
                    <Picker
                        value={pickerValue}
                        onChange={setPickerValue}
                        wheelMode="natural"
                        height={150}
                    >
                        {Object.keys(selections).map(options => (
                            <Picker.Column key={options} name={options}>
                                {selections[options].map(option => (
                                    <Picker.Item key={option} value={option}>
                                        <div className="wheelOptions" style={{
                                            filter: option === pickerValue.options ? 'brightness(0.5)' : 'none',
                                            fontWeight: pickerValue.options === option ? 'bold' : 'normal',
                                            fontSize: pickerValue.options === option ? '1.5em' : '1.2em'
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
            <RotorPins wheelIndex={position} />
        </div>
    );
}

export default Wheel;