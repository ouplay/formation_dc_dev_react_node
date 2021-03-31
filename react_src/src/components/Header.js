import React from 'react';
import './Header.css';
const Header = (props) => {


    return <div className="header" style={{backgroundColor: props.color}}>{props.title}</div>;
}

export default Header;

