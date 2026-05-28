import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import './about.css'

const tableStyle = {
    width: '80%',
    margin: '0 auto',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '1rem'
};

function About() {
    return (
        <div className="about">
            <h2>About this app</h2>
            <p>This application was created as a school project with the goal of making the Enigma machine accessible and understandable to everyone. Rather than just reading about it, you can encrypt and decrypt messages yourself, explore the machine's internals through the Visualizer, and test your knowledge with the Missions.</p>
            <p><strong>Author:</strong> Tomáš Martínek</p>
            <p><strong>Built with:</strong> React, Material-UI, react-xarrows, react-mobile-picker, gridstack</p>
            <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>All rotor and reflector wirings are based on historically accurate Enigma specifications. The simulator uses the standard Wehrmacht/Luftwaffe rotor set (I–V) and Reflector B (UKW-B).</p>

            <hr />

            <h2>How this Enigma works</h2>
            <p>When you press a key, the signal travels through the plugboard, then forward through all three rotors, bounces off the reflector, travels backward through the rotors, and exits through the plugboard again. Because of the reflector, Enigma is self-inverse — encrypting an already encrypted message with the same settings decrypts it. After each keypress, the first rotor advances by one step, and when it completes a full rotation, it triggers the next rotor.</p>

            <h2>Rotors</h2>
            <p>The Enigma machine uses 3 of the 5 available rotors. Each rotor substitutes one letter for another based on its internal wiring and current rotation position. The choice and order of rotors dramatically changes the encryption. The rotors below are from the German military — the first three were introduced with Enigma I, the last two were added in 1938 to increase complexity.</p>

            <Table style={tableStyle}>
                <TableHead>
                    <TableRow>
                        <TableCell>Rotor</TableCell>
                        <TableCell>Wiring (A→Z)</TableCell>
                        <TableCell>Introduced</TableCell>
                        <TableCell>Model</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[
                        ['I',   'EKMFLGDQVZNTOWYHXUSPAIBRCJ', '1930', 'Enigma I'],
                        ['II',  'AJDKSIRUXBLHWTMCQGZNPYFVOE', '1930', 'Enigma I'],
                        ['III', 'bdfhjlcprtxvznyeiwgakmusqo'.toUpperCase(), '1930', 'Enigma I'],
                        ['IV',  'ESOVPZJAYQUIRHXLNFTGKDCMWB', '1938', 'M3 Army'],
                        ['V',   'VZBRGITYUPSDNHLXAWMJQOFECK', '1938', 'M3 Army'],
                    ].map(([num, wiring, year, model]) => (
                        <TableRow key={num}>
                            <TableCell>{num}</TableCell>
                            <TableCell style={{ fontFamily: 'monospace', letterSpacing: '0.1rem' }}>{wiring}</TableCell>
                            <TableCell>{year}</TableCell>
                            <TableCell>{model}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <h2>Reflector</h2>
            <p>The reflector (Umkehrwalze) is a fixed wiring at the end of the rotor stack. It maps each letter to another and sends the signal back through the rotors in reverse. Crucially, it never maps a letter to itself — meaning a plaintext letter can never encrypt to itself. This was a fundamental weakness that helped codebreakers at Bletchley Park. This simulator uses Reflector B (UKW-B), the most commonly used reflector in the German army.</p>

            <Table style={{ ...tableStyle, width: '50%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Wiring (A→Z)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>UKW-B</TableCell>
                        <TableCell style={{ fontFamily: 'monospace', letterSpacing: '0.1rem' }}>YRUHQSLDPXNGOKMIEBFZCWVJAT</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <h2>Plugboard</h2>
            <p>The plugboard (Steckerbrett) sits at the front of the machine and swaps pairs of letters before and after the signal passes through the rotors. For example, if A and Z are connected, every A becomes Z and every Z becomes A — both on the way in and on the way out. The German military typically used between 7 and 10 cable pairs per day. The plugboard alone multiplied the number of possible configurations by over 150 trillion, making Enigma vastly harder to break.</p>

            <h2>Security &amp; Breaking Enigma</h2>
            <p>The total number of possible Enigma configurations (rotor choice, order, starting positions, and plugboard) exceeded 10 quadrillion. Despite this, the machine had inherent weaknesses: a letter could never encrypt to itself, operators often used predictable message keys, and weather reports followed fixed formats. Alan Turing exploited these patterns with the Bombe — an electromechanical device that rapidly tested configurations. By 1941, Bletchley Park was reading German messages within hours of interception.</p>
        </div>
    );
}

export default About;