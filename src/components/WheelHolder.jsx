import React, { useEffect, useRef } from 'react';
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import './setupMode.css';

function WheelHolder() {
    const gridRef = useRef(null);
    const gridInstance = useRef(null);

    useEffect(() => {
        if (!gridInstance.current) {
            gridInstance.current = GridStack.init({
                column: 3,
                margin: 5,
                resizable: { handles: '' }, 
                disableResize: true,
                maxRow: 1,
                minRow: 1,
                acceptWidgets: true,
                cellHeight: 230,
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
        <div className="wheelHolder">
            <div className="grid-stack" ref={gridRef}>
                
            </div>
        </div>
    );
}

export default WheelHolder;