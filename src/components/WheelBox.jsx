import React, {useRef, useEffect} from "react";
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import './setupMode.css';
import Wheel from "./Wheel";

function WheelBox() {
    const gridRef = useRef(null);
    const gridInstance = useRef(null);

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
                [1, 2, 3, 4, 5].map((item) => (
                    <div className="grid-stack-item" gs-w="1" gs-h="1" key={item}>
                        <Wheel key={item} id={item} />
                    </div>
                ))
            }
        </div>
    );
}

export default WheelBox;