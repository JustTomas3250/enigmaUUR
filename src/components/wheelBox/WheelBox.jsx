import React, {useRef, useEffect, useState} from "react";
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import Wheel from "../setupMode/WheelSetup";
import './wheelBox.css'

function WheelBox({ setup}) {
    const gridRef = useRef(null);
    const gridInstance = useRef(null);

    const [pocatecniDostupnaKola] = useState(() => {
        const vsechnaKola = [1, 2, 3, 4, 5];
        
        const pouzitaKolaIds = setup.wheels.map(w => parseInt(w.id));
        
        return vsechnaKola.filter(id => !pouzitaKolaIds.includes(id));
    });

    useEffect(() => {
        if (!gridInstance.current) {
            gridInstance.current = GridStack.init({
                column: 5,
                margin: 5,
                resizable: { handles: '' }, 
                disableResize: true,
                maxRow: 1,
                acceptWidgets: true,
                cellHeight: 160,
            }, gridRef.current);
        }

        return () => {
            if (gridInstance.current) {
                gridInstance.current.destroy(false);
                gridInstance.current = null;
            }
        };
    }, []);

    return (
        <div className="wheelBox grid-stack" ref={gridRef}>
            {
                pocatecniDostupnaKola.map((item) => (
                    <div className="grid-stack-item" gs-w="1" gs-h="1" key={item}>
                        <Wheel key={item} id={item} />
                    </div>
                ))
            }
        </div>
    );
}

export default WheelBox;