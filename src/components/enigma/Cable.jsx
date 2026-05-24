import React from "react";

function Cable({ start, end, color }) {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;

    const controlX = midX;
    const controlY = midY + 80; 

    const d = `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;

    if (color === undefined) color = 8;

    const colors = ['#e63946', '#f1faee', '#54ebf0', '#0979be', '#ffb703', '#ab18fa', '#9bdd15', '#e765aa', '#000000'];

    return (
        <path 
            d={d} 
            fill="none" 
            stroke={colors[color]} 
            opacity={0.75}
            strokeWidth="6" 
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0px 5px 3px rgba(0,0,0,0.3))'}}
        />
    );
}

export default Cable;