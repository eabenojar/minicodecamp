import React, { Component } from "react";
import Prism from "prismjs";
import "../styles/lessonInfo.css";
const beautify = require("js-beautify").js_beautify;

class LessonInfo extends Component {
  render() {
    const test = `class ShoppingList extends React.Component {
        render() {
          return (
            <div className="shopping-list">
              <h1>Shopping List for {this.props.name}</h1>
              <ul>
                <li>Instagram</li>
                <li>WhatsApp</li>
                <li>Oculus</li>
              </ul>
            </div>
          );
        }
      }
      `;
    const { location } = this.props;
    const { state } = location;
    console.log(this.props, "LESSONINFO PROPS", state.lesson.courseColor);

    return (
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
    );
  }
}

export default LessonInfo;
