import React, { Component } from "react";
import "../styles/lessonInfo.css";
import { connect } from "react-redux";
import { getOneCourse } from "../actions/coursesAction";
import Prism from "prismjs";

class LessonInfo extends Component {
  state = {
    showLesson: false,
    lessonNum: 0
  };
  componentDidMount() {
    this.props.getOneCourse(this.props.location.state.lesson._id);
    console.log("THIS DID MOUNT LESSON INFO PAGE");

    Prism.highlightAll();
  }
  componentDidUpdate() {
    Prism.highlightAll();
  }

  showLesson = number => {
    this.setState({
      showLesson: true,
      lessonNum: number
    });
  };
  hideLesson = () => {
    this.setState({
      showLesson: false
    });
  };
  loadCode = lesson => (
    <pre>
      <code className="language-javascript">{lesson.lessonCode}</code>
    </pre>
  );
  render() {
    const { location } = this.props;
    const { state } = location;
    return (
      <div>
        {this.props.state.courseReducer.lessons.lessons &&
        this.props.location.state.lessons.length > 0 ? (
          <div className="lessoninfo-container">
            <div className="lesson-page-title-section">
              <h2 className="lesson-page-title">{this.courseType} Lessons</h2>
            </div>
            <div className="lesson-content language-jsx">
              {this.props.state.courseReducer.lessons.lessons.map(
                (lesson, i) => {
                  return (
                    <div
                      className="lesson-section language-jsx"
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
