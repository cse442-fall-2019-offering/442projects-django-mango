

import React from "react";
import ProfileDropButton from '../ProfileDropMenu/ProfileDropButton';
import "./Navbar.css";




const navbar = props => (
    <header className="navbar">
        <nav className="navbar_nav">
            <div className="navbar_title"><a href="/">Django Mango</a></div>
            <div className="navbar_buttons">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/">Groups</a></li>
                    <li><a href="/">Profile</a></li>
                </ul>
            </div>
            <div className="empty" />
            <div>
                <ProfileDropButton />
            </div>
            <div className="navbar_username"><a href="/">Username</a></div>
        </nav>
    </header>
);

export default navbar;
