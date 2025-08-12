
import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Header = () => {
    return (
        <header className="header">
            <a href="/" className="header-logo">
                Resume Analyzer
            </a>
            <nav>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Home
                </NavLink>
                <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    History
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;