import React from 'react';
import './AppName.css';

const AppName = (props) => {
    return (
        <h1 className="app-name">{props.appName}</h1>
    )
}

export default AppName;