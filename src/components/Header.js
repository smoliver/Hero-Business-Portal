import React from 'react';
import { Link } from 'react-router';
import defaultThumbnail from '../images/default-thumbnail.png';

import Icon from './Icon'

const Header = ({ className, toggleActive, loggedIn, logout, business }) => {
    const ZENDESK_HELP_LINK = 'https://heroapp.zendesk.com/hc/en-us/sections/207248267-FAQ-for-Businesses-';


    let authComponent;
    if (loggedIn) {
        authComponent = <a onClick={logout} className="header--option">Log Out</a>
    }

    let businessComponent;
    if (loggedIn && business) {
        let businessThumbnail = business.thumbnail || defaultThumbnail; 
        businessComponent = (
            <Link to="/profile" className="header--option">
                <img src={businessThumbnail} className="header--thumbnail"/>
                Settings
            </Link>
        )
    }
    let accountComponent = (
        <div className="header--options">
            {businessComponent}
            {authComponent}
            <a className="header--option" href={ZENDESK_HELP_LINK}>
                Help
            </a>
        </div>
    );
    let logoLink = loggedIn ? 'dashboard' : 'login'
    return (
        <header className={`header ${className || ''}`}>
            <Link to={{pathname: logoLink}} className="header--logo-container">
                <Icon className="header--logo" symbol={Icon.SYMBOLS.LOGO} viewBox='0 35 100 30' />
            </Link>
            <Icon className="header--hamburger" symbol={Icon.SYMBOLS.MENU} onClick={toggleActive} />
            {accountComponent}
        </header>
    )
}

export default Header;