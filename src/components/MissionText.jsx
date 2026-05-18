import React from "react";
import './Mission.css';
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function MissionText() {
    return (
        <div className="missionText">
            <h2>Mission 1</h2>
            <p>Decrypt the enemy message with Enigma. The message starts like this: Today's weather...</p>
            <p className="missionImportant">LLGSGU QBCWIZ ZLBP LB KJYPF</p>
            <p>We have successfully obtained a snippet of the enemy's settings:</p>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Wheels</TableCell>
                        <TableCell>Wheels position</TableCell>
                        <TableCell>PlugBoard</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1942-###</TableCell>
                        <TableCell>3 # #</TableCell>
                        <TableCell># 6 #1</TableCell>
                        <TableCell>None</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default MissionText;