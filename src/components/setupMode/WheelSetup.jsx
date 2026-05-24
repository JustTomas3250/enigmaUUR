import React, { useState, useRef, useEffect } from "react";
import 'gridstack/dist/gridstack.min.css';
import Picker from "react-mobile-picker";


function WheelSetup({ id, value }) {
    const wheelRef = useRef(null);

    console.log("Renderuji kolo s id: ", id, " a hodnotou: ", value);

    let opt = []

    for (let i = 1; i <= 20; i++) {
        for (let j = 1; j <= 26; j++) {
            opt.push(i * 100 + j);
        }
    }

    const selections = {
        options: opt
    };

    useEffect(() => {
        value !== undefined && setPickerValue({ options: 1000 + value });
    }, [value]);

    const [pickerValue, setPickerValue] = useState({
        options: value || 1001
    });

    const handlePickerChange = (newValue) => {
        setPickerValue(newValue);

        const rotationValue = newValue.options % 100;

        const event = new CustomEvent('wheel-rotated', { 
            detail: { id: id, value: rotationValue } 
        });
        window.dispatchEvent(event);
    };

    return (
        <div 
            className="wheel grid-stack-item-content" 
            data-wheel-id={id} 
            data-wheel-value={pickerValue.options % 100} 
            ref={wheelRef}
        >
            <span className="wheelId">{id}</span>
            <div className="wheelPicker">
                <Picker
                    value={pickerValue}
                    onChange={handlePickerChange}
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
    );
}

export default WheelSetup;