import React from 'react';

const Header = ({ title, logout }) => (
    <div className='header'>
        <h1>{ title }</h1>
        <button onClick={logout}>Log Out</button>
    </div>
)

export default Header;