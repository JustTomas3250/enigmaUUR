import React from "react";
import Drawer from '@mui/material/Drawer';
import { IoMenu } from "react-icons/io5";
import './Enigma.css'

function Nav() {
    const [open, setOpen] = React.useState(false);

    const toggleNav = (newOpen) => {
        setOpen(newOpen);
    }

    return (
        <div className="Nav">
            <button onClick={() => toggleNav(!open)} className="navButton">
                <IoMenu />
            </button>
            <Drawer anchor="left" open={open} onClose={() => toggleNav(false)}>
                <div style={{ width: 250, padding: 15 }}>
                    <h2>Navigation</h2>
                    <ul className="navList">
                        <li><a href="#home">SetupMode</a></li>
                    </ul>
                </div>
            </Drawer>
        </div>
    )
}

export default Nav;