import React, { Component } from "react";
import "../styles/dashboard.css";
import { Link } from "react-router-dom";

class AdminDashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-description">
            Welcome back! Start creating new content for learning{" "}
          </p>
        </div>
        <div className="dashboard-section">
          <div className="create-section">
            <div className="create-section-header" />
            <div className="create-section-body">
              <h1 className="create-section-title">Create Course</h1>
              <p className="create-section-description">
                Create courses with lessons that describe the topic and provide
                code examples to facilitate learning.
              </p>
              <Link to="/create/course">
                <button className="dashboard-button">Create Course</button>{" "}
              </Link>
            </div>
          </div>
          <div className="create-section">
            <div className="create-section-header" />
            <div className="create-section-body">
              <h1 className="create-section-title">Create Lesson</h1>
              <p className="create-section-description">
                Create lessons that guide the user in learning a topic using a
                step by step approach.
              </p>
              <Link to="/create/lesson">
                <button className="dashboard-button">Create Lesson</button>{" "}
              </Link>
            </div>
          </div>
          <div className="create-section">
            <div className="create-section-header" />
            <div className="create-section-body">
              <h1 className="create-section-title">Create Quiz</h1>
              <p className="create-section-description">
                Create quiz questions to help test your skill level in a
                specific topic for front end or back end.
              </p>
              <Link to="#">
                <button className="dashboard-button">Create Quiz</button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
