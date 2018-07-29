import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

class Lesson extends Component {
  viewCourse = lesson => {
    console.log("clicked", lesson);
  };
  render() {
    var colors = ["#FF7373", "#73FF86", "#739BFF", "#FFCA73"];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    const { lesson } = this.props;
    return (
      <div className="lesson-container">
        <div
          className="lesson-header"
          style={{
            backgroundColor: lesson.courseColor
              ? lesson.courseColor
              : random_color
          }}
        />
        <div className="lesson-body">
          <h3 className="lesson-type">Lesson</h3>
          <h2 className="lesson-title">{lesson.courseType}</h2>
          <p className="lesson-description">{lesson.courseDescription}</p>
        </div>
        <div className="lesson-footer">
          <Link
            className="lesson-button"
            onClick={this.viewCourse.bind(this, lesson)}
            to={{
              pathname: `/course/lessons/${lesson._id}`,
              state: {
                lessons: lesson.lessons,
                lesson
              }
            }}
          >
            Start Learning
          </Link>
        </div>
      </div>
    );
  }
}

export default Lesson;
