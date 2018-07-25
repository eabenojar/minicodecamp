import React, { Component } from "react";
import Lesson from "./Lesson";
import "../styles/home.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [1, 2, 3, 4, 5, 6]
    };
  }
  render() {
    return (
      <div className="home-page">
        <h2>Web Developer Lessons</h2>
        <p>These are the current lessons available.</p>
        {this.state.lessons.map(lesson => {
          return <Lesson />;
        })}
      </div>
    );
  }
}

export default HomePage;
