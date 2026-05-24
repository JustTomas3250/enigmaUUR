import React from "react";
import Drawer from '@mui/material/Drawer';
import { IoMenu } from "react-icons/io5";
import './nav.css'

function Nav({ page, setPage }) {
    const [open, setOpen] = React.useState(false);

    const toggleNav = (newOpen) => {
        setOpen(newOpen);
    }

    const navItems = [
        { id: 'sandBoxSetup', label: 'Sandbox' },
        { id: 'missionsSetup', label: 'Missions' },
        { id: 'about', label: 'About' }
    ];

    return (
        <div className="Nav">
            <button onClick={() => toggleNav(!open)} className="navButton">
                <IoMenu />
            </button>
            <Drawer anchor="left" open={open} onClose={() => toggleNav(false)}>
                <div style={{ width: 250, padding: 15 }}>
                    <h2>Navigation</h2>
                    <ul className="navList">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button onClick={() => setPage(item.id)} style={{fontWeight: page == item.id ? 'bold' : 'normal'}}>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </Drawer>
        </div>
    )
}

export default Nav;