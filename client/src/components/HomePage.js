import React, { Component } from "react";
import Lesson from "./Lesson";
import "../styles/home.css";
import { connect } from "react-redux";
import { getCourses } from "../actions/coursesAction";

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
          <h2>Web Developer Lessons</h2>
          <p>These are the current lessons available.</p>
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
