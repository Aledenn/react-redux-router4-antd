import React, { Component } from "react";
import logoImg from "./freedom.png";
import "./logo.css";

class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        <img src={logoImg} alt="自由女神" />
      </div>
    );
  }
}

export default Logo;
