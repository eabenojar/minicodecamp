import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <Link to="/">Redux Auth</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/signin">Sign in</Link>
        <Link to="/signout">Signout</Link>
        <Link to="/feature">Feature</Link>
      </div>
    );
  }
}

export default Header;
