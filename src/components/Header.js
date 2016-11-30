import React from 'react';
import { Link } from 'react-router';
import defaultThumbnail from '../images/default-thumbnail.png';

import Icon from './Icon'

const Header = ({ loggedIn, logout, business }) => {
    let authComponent;
    if (loggedIn) {
        authComponent = <a onClick={logout}>Log Out</a>
    }

    let businessComponent;
    if (loggedIn && business) {
        let businessThumbnail = business.thumbnail || defaultThumbnail; 
        businessComponent = (
            <Link to={{pagename: "profile"}} className="header--business">
                <img src={businessThumbnail} className="header--thumbnail"/>
                {business.name}
            </Link>
        )
    }
    let accountComponent = (
        <div className="account">
            {businessComponent}
            {authComponent}
        </div>
    );
    let logoLink = loggedIn ? 'dashboard' : 'login'
    return (
        <header className="header">
            <Link to={{pathname: logoLink}} className="header--logo-container">
                <Icon className="header--logo" symbol={Icon.SYMBOLS.LOGO} viewBox='0 35 100 30' />
            </Link>
            {accountComponent}
        </header>
    )
}

export default Header;