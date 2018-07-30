import React, { Component } from "react";
import Lesson from "./Lesson";
import "../styles/home.css";
import { connect } from "react-redux";
import { getCourses } from "../actions/coursesAction";
import "prismjs/themes/prism.css";
import "prismjs/prism.js";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getCourses();
  }
  render() {
    console.log(this.props, "HOMEPAGE PROPS");
    const { state } = this.props;
    return (
      <div className="home-page">
        <div className="home-container">
          <div className="home-intro-section">
            <h2 className="home-page-title">Front End Development</h2>
            <p className="home-page-description">
              Each course is designed to teach you the fundamentals in
              programming by following an easy step by step guide.
            </p>
          </div>
          <div className="courses-container">
            {state.courseReducer.courses.map((lesson, i) => {
              return <Lesson key={i} lesson={lesson} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  { getCourses }
)(HomePage);
