import React, { Component } from "react";
import "../styles/home.css";
// import Prism from "prismjs";
var beautify = require("js-beautify").js_beautify;

{
  /* <pre className="language-javascript">
          <code className="language-javascript" />
        </pre> */
}
class Lesson extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { lesson } = this.props;
    return (
      <div className="lesson-container">
        <div className="lesson-header" />
        <div className="lesson-body">
          <h3 className="lesson-type">Lesson</h3>
          <h2 className="lesson-title">{lesson.courseType}</h2>
          <p className="lesson-description">{lesson.courseDescription}</p>
          <button className="lesson-button">Start Learning</button>
        </div>
      </div>
    );
  }
}

export default Lesson;
