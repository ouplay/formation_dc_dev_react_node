import React from 'react';
import "./Button.css";

export default function Button(props) {
    return(
        <button className={`button ${props.className || ""}`} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>
    )
}