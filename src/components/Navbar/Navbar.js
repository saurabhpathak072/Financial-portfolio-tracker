import React from 'react'
import './Navbar.scss'

const Navbar = (props) =>{
    return (
        <div className="Navbar">
            <span className="NavbarTitle">{props.title}</span>
        </div>
    )
}

export default Navbar;
