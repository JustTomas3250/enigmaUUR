import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function About() {
    return (
        <div className="about">
            <p>This is a simple Enigma machine simulator.</p>
            <p>It is built using React and Material-UI.</p>

            <h2>Wheels</h2>
            <p>The Enigma machine has 5 wheels that can be configured in different ways. Each wheel has 26 positions, and the letters are mapped to these positions. The wheels can be rotated to change the mapping. The wheels are from the German military. First two where made for Enigma I machine and the last two were made for German army to decrease the probability of breaking the code. Below you can see the configuration for each wheel:</p>

            <Table style={{width: '50%', margin: '0 auto', backgroundColor: 'var(--color-primary)', borderRadius: '1rem'}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Wheel number</TableCell>
                        <TableCell>ABCDEFGHIJKLMNOPQRSTUVWXYZ</TableCell>
                        <TableCell>Date introduced</TableCell>
                        <TableCell>Model name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>I</TableCell>
                        <TableCell>EKMFLGDQVZNTOWYHXUSPAIBRCJ</TableCell>
                        <TableCell>1930</TableCell>
                        <TableCell>Enigma I</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>II</TableCell>
                        <TableCell>AJDKSIRUXBLHWTMCQGZNPYFVOE</TableCell>
                        <TableCell>1930</TableCell>
                        <TableCell>Enigma I</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>III</TableCell>
                        <TableCell>BDFHJLCPRTXVZNYEIWGAKMUSQO</TableCell>
                        <TableCell>1930</TableCell>
                        <TableCell>Enigma I</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>IV</TableCell>
                        <TableCell>ESOVPZJAYQUIRHXLNFTGKDCMWB</TableCell>
                        <TableCell>1938</TableCell>
                        <TableCell>M3 Army</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>V</TableCell>
                        <TableCell>VZBRGITYUPSDNHLXAWMJQOFECK</TableCell>
                        <TableCell>1938</TableCell>
                        <TableCell>M3 Army</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default About;