import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-section">
          <div className="header-section-left">
            <Link className="header-link" to="/course">
              Courses
            </Link>
            <Link className="header-link" to="/course">
              Quizes
            </Link>
            <Link className="header-link" to="/course">
              Projects
            </Link>
          </div>
          <div className="header-section-right">
            <Link className="header-link" to="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
