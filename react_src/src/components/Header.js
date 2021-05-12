import React from 'react';
import LoginWidget from './LoginWidget';

import './Header.css'

const Header = (props) => {
    return <div className="header">
        <div className="header__section header__section--left"></div>
        <div className="header__section header__section--center">TodoApp</div>
        <div className="header__section header__section--right"><LoginWidget/></div>
    </div>
}

export default Header;