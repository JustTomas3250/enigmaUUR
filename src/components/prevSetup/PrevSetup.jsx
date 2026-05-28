import React from "react";
import './prevSetup.css'
import SetupTable from "../setupTable/SetupTable";

function PrevSetup({ prevSetup }){
    return (
        <div className="prevSetup">
            <h2>Starting position</h2>
            <SetupTable setup={prevSetup} />
        </div>
    )
}

export default PrevSetup