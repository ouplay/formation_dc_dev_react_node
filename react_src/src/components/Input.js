import React from 'react';
import './Input.css';

const Input = (props) => {
    return <input  {...props} className={`input ${props.className}`}/>
}

export default Input;