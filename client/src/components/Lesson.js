import React, { Component } from "react";
import "../styles/home.css";
// import Prism from "prismjs";
var beautify = require("js-beautify").js_beautify;

class Lesson extends Component {
  render() {
    var text = { a: 1, b: 2 };
    var text2 = `class Hello extends React.Component {render() {
            return <h1>Hello world!</h1>;
        }
    }`;
    var res = beautify(text2);
    return (
      <div className="lesson-container">
        <div className="lesson-header" />
        <div className="lesson-body">
          <h3 className="lesson-type">Lesson</h3>
          <h2 className="lesson-title">Basic Javascript</h2>
          <p className="lesson-description">
            Learn the basics of Javascript. The programming language that runs
            the web.
          </p>
          <button className="lesson-button">Start Learning</button>
        </div>
        <pre class="language-javascript">
          <code class="language-javascript">{res}</code>
        </pre>
      </div>
    );
  }
}

export default Lesson;
