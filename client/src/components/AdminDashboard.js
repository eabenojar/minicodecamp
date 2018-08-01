import React, { Component } from "react";
import "../styles/dashboard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class AdminDashboard extends Component {
  componentDidMount() {
    console.log(this.props, "DASHBOARD PROPS");
  }
  render() {
    console.log(this.props, "RENDER DASH");
    return (
      <div className="dashboard-container">
        {this.props.state.auth.isAuthenticated ? (
          <div>
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
                    Create courses with lessons that describe the topic and
                    provide code examples to facilitate learning.
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
                    Create lessons that guide the user in learning a topic using
                    a step by step approach.
                  </p>
                  <Link to="/create/lesson">
                    <button className="dashboard-button">Create Lesson</button>{" "}
                  </Link>
                </div>
              </div>

              <div className="create-section">
                <div className="create-section-header" />
                <div className="create-section-body">
                  <h1 className="create-section-title">
                    Manage Courses / Lessons
                  </h1>
                  <p className="create-section-description">
                    Update or delete courses and lessons from the main page or
                    lessons page.
                  </p>
                  <Link to="/admin/dashboard/manage/courses">
                    <button className="dashboard-button-manage">
                      Manage Courses
                    </button>{" "}
                  </Link>
                </div>
              </div>
            </div>{" "}
          </div>
        ) : (
          <div className="dashboard-admin-only">
            <h1>Admin Access Only</h1>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(AdminDashboard);
