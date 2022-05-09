import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './css/Navbar.css';
import logo from "../images/logo-x.png"

function Navbar() {
    return (
    <>
        <nav className="navbar">
            <div className="navbar-container"> 
                <div className="navbar-extras">
                    <div className="navbar-logo-container">
                    <NavLink to="/">
                    <picture style={{maxWidth: "100%"}}>                   
                        <img src={logo} alt="Logo"/>
                    </picture>
                    </NavLink>
                    </div>        
                </div>
                <ul className="navbar-content">
                    <li className="nav-item">
                        <NavLink to = '/login' className='nav-links-blue'>
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to = '/signup' className='nav-links-blue'>
                            Sign Up
                        </NavLink>
                    </li>
                
                </ul>
            </div>
        </nav>
    </>    
    )
}

export default Navbar
