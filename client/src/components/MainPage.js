import React, { Component } from "react";
import "../styles/main.css";
import { Link } from "react-router-dom";

class MainPage extends Component {
  render() {
    return (
      <div className="main-container">
        <h1 className="main-title">Welcome to Mini Code Camp</h1>
        <Link className="main-link" to="/course">
          Start Learning
        </Link>
      </div>
    );
  }
}

export default MainPage;
