import React, { Component } from "react";
import "../styles/lessonInfo.css";
import { connect } from "react-redux";
import { getOneCourse } from "../actions/coursesAction";
import "prismjs/themes/prism.css";
import "prismjs/prism.js";
const beautify = require("js-beautify").js_beautify;

class LessonInfo extends Component {
  state = {
    showLesson: false,
    lessonNum: 0
  };
  componentDidMount() {
    console.log(this.props, "COMP DID MOUNT LESSON INFO");
    this.props.getOneCourse(this.props.location.state.lesson._id);
  }
  componentDidUpdate() {
    console.log("UPDATEEEEEEEE");
  }
  showLesson = number => {
    this.setState({
      showLesson: true,
      lessonNum: number
    });
    console.log(number, this.state.lessonNum);
  };
  hideLesson = () => {
    this.setState({
      showLesson: false
    });
  };
  loadCode = lesson => (
    <pre className="language-javascript">
      <code className="language-javascript">{beautify(lesson.lessonCode)}</code>
    </pre>
  );
  render() {
    const { location } = this.props;
    const { state } = location;
    console.log(
      "RENDER",
      this.props,
      this.props.state.courseReducer.courses.length
    );
    return (
      <div>
        {this.props.state.courseReducer.lessons.lessons &&
        this.props.location.state.lessons.length > 0 ? (
          <div className="lessoninfo-container">
            <div className="lesson-page-title-section">
              <h2 className="lesson-page-title">{this.courseType} Lessons</h2>
            </div>
            <div className="lesson-content language-javascript">
              {this.props.state.courseReducer.lessons.lessons.map(
                (lesson, i) => {
                  return (
                    <div
                      className="lesson-section language-javascript"
                      style={{
                        borderLeft: `${state.lesson.courseColor} `
                          ? `6px solid ${state.lesson.courseColor}`
                          : `none`
                      }}
                      key={i}
                    >
                      <h4 className="lesson-section-title">
                        Lesson {lesson.lessonNumber} - {lesson.lessonTitle}
                      </h4>

                      <div>
                        {this.state.showLesson === true &&
                        this.state.lessonNum === lesson.lessonNumber ? (
                          <div>
                            <p>{lesson.lessonDescription}</p>
                            {this.loadCode(lesson)}
                            <button
                              onClick={this.hideLesson.bind(
                                this,
                                lesson.lessonNumber
                              )}
                              className="lessoninfo-button"
                              style={{
                                border: `${state.lesson.courseColor} `
                                  ? `2px solid ${state.lesson.courseColor}`
                                  : `2px solid #e7e7e7`
                              }}
                            >
                              Hide Lesson
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={this.showLesson.bind(
                              this,
                              lesson.lessonNumber
                            )}
                            className="lessoninfo-button"
                            style={{
                              border: `${state.lesson.courseColor} `
                                ? `2px solid ${state.lesson.courseColor}`
                                : `2px solid #e7e7e7`
                            }}
                          >
                            View Lesson
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ) : this.props.location.state.lessons.length === 0 ? (
          <div className="no-lessons-container">
            <h1>No Lessons Available</h1>
          </div>
        ) : (
          <div className="no-lessons-container">
            <h1>Loading...</h1>
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

export default connect(
  mapStateToProps,
  { getOneCourse }
)(LessonInfo);
