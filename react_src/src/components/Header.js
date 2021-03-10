import React from "react";
import "./Header.css";
import AppName from "./AppName";

const Header = (props) => {
  console.log("Le header se rend");


  let style = {
      backgroundColor: props.color || "lightcoral"
  }
  return (
    <header style={style} className="header">
      <img className="header__logo" src={props.logo} />
      <AppName appName={props.appName} />
      <img className="header__menu-burger" src="/logo192.png" />
    </header>
  );
};

export default Header;
