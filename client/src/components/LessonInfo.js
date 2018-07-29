import React, { Component } from "react";
import "../styles/lessonInfo.css";
const beautify = require("js-beautify").js_beautify;

class LessonInfo extends Component {
  componentDidMount() {
    console.log(this.props, "COMP DID MOUNT");
  }
  render() {
    const { location } = this.props;
    const { state } = location;
    console.log(this.props, "LESSONINFO PROPS");

    return (
      <div>
        {this.props.location.state.lessons.length >= 1 ? (
          <div className="lessoninfo-container">
            <div className="lesson-page-title-section">
              <h2 className="lesson-page-title">
                {this.props.location.state.lessons[0].courseType} Lessons
              </h2>
            </div>
            <div className="lesson-content">
              {state.lessons.map(lesson => {
                return (
                  <div>
                    <div
                      className="lesson-section"
                      style={{
                        borderLeft: `${state.lesson.courseColor} `
                          ? `6px solid ${state.lesson.courseColor}`
                          : `none`
                      }}
                    >
                      <h4>Lesson {lesson.lessonNumber}</h4>
                      <h2>{lesson.lessonTitle}</h2>
                      <p>{lesson.lessonDescription}</p>
                      <div>
                        <pre className="language-javascript">
                          <code className="language-javascript">
                            {beautify(lesson.lessonCode)}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="no-lessons-container">
            <h1>No lessons available for this course!</h1>
          </div>
        )}
      </div>
    );
  }
}

export default LessonInfo;
