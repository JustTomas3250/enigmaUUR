import React from "react";
import './setupTable.css'

function SetupTable({ setup }) {
    return (
        <table className="setupTable">
            <thead>
                <tr>
                    <th className="in">Rotors</th>
                    <th className="in">Rot. positions</th>
                    <th>Plugboard</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="in">{
                        setup.wheels.map((wheel, index) => (
                            <React.Fragment key={index}>
                                <span id={wheel.id}>{wheel.id}</span>
                                {index < setup.wheels.length - 1 ? ', ' : ''}
                            </React.Fragment>
                        ))   
                    }</td>
                    <td className="in">{
                        setup.wheels.map((wheel, index) => (
                            <React.Fragment key={index}>
                                <span id={wheel.id}>{wheel.value}</span>
                                {index < setup.wheels.length - 1 ? ', ' : ''}
                            </React.Fragment>
                        ))   
                    }</td>
                    <td>{
                        setup.plugboard.map((conn, index) => (
                            <React.Fragment key={index}>
                                <span id={`${conn.from}-${conn.to}`}>{conn.from + conn.to}</span>
                                {index < setup.plugboard.length - 1 ? ', ' : ''}
                            </React.Fragment>
                        ))   
                    }</td>
                </tr>
            </tbody>
        </table>
    )
}

export default SetupTable