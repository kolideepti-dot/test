import React from "react";
import "../css/Header.css"
const Header = ({ user, balance }) => {
    return (
        <header className="header">
            <h1>Trading App</h1>
            <div className="header-info">
                <span>User: {user}</span>
                <span>Balance: {balance}</span>
            </div>
        </header>   
    )
}

export default Header;  