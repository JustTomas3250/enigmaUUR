import React, { useEffect, useRef, useState } from 'react';
import { GridStack } from 'gridstack';
import Wheel from './WheelSetup';

function WheelHolderSetup({ setup, setSetup }) {
    const gridRef = useRef(null);
    const gridInstance = useRef(null);

    const [pocatecniDostupnaKola] = useState(() => {
        return setup.wheels;
    });

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
                cellHeight: 160
            }, gridRef.current);

            const aktualizovatKola = (e) => {
                if (!gridInstance.current) return;
                
                let wheels = [];
                const items = gridInstance.current.getGridItems();

                const rotatedWheelId = e?.detail?.id;
                const rotatedWheelValue = e?.detail?.value;

                items.forEach(el => {
                    const node = el.gridstackNode;
                    if (node && el.children[0]) {
                        const wheelId = el.children[0].getAttribute('data-wheel-id');
                        const position = node.x;
                        let wheelValue;

                        if (wheelId == rotatedWheelId && rotatedWheelValue !== undefined) {
                            wheelValue = rotatedWheelValue;
                        } else {
                            wheelValue = parseInt(el.children[0].getAttribute('data-wheel-value')) || 1;
                        }

                        if (wheelId !== null && position !== undefined) {
                            wheels.push({ id: wheelId, position, value: wheelValue });
                        }
                    }
                });

                wheels.sort((a, b) => a.position - b.position)

                setSetup(prev => ({ 
                    ...prev, 
                    wheels
                }));
            };

            gridInstance.current.on('change added dropped removed', function() {
                setTimeout(() => { aktualizovatKola(); }, 0);
            });

            window.addEventListener('wheel-rotated', aktualizovatKola);
        }

        return () => {
            if (gridInstance.current) {
                gridInstance.current.destroy(false);
                gridInstance.current = null;
            }
        };
    }, [setSetup]);

    return (
        <div className="wheelHolder" id="wheelHolderSetup">
            <div className="grid-stack" ref={gridRef}>
                {
                    pocatecniDostupnaKola.map((wheel, index) => (
                        <div className="grid-stack-item" gs-w="1" gs-h="1" key={wheel.id}>
                            <Wheel key={index} id={wheel.id} value={wheel.value} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default WheelHolderSetup;