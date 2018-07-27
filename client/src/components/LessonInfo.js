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
    // const result = beautify(test);
    console.log(this.props, "LESSONINFO PROPS");
    const { location } = this.props;
    const { state } = location;
    return (
      <div className="lessoninfo-container">
        <div className="lesson-page-title">
          <h2>{this.props.location.state.lessons[0].courseType} lessons</h2>
        </div>
        <div className="lesson-content">
          {state.lessons.map(lesson => {
            return (
              <div className="lesson-section">
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
            );
          })}
        </div>
      </div>
    );
  }
}

export default LessonInfo;
