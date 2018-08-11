import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCourses,
  deleteLesson,
  manageOneCourse
} from "../actions/coursesAction";
import "../styles/home.css";
import "../styles/manageCourses.css";

class ManageLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  componentDidMount() {
    // this.props.getCourses();
    this.props.manageOneCourse(this.props.location.state.id);
  }

  deleteLesson = lesson => {
    this.props.deleteLesson(lesson);
    // this.setState({
    //   modal: !this.state.modal
    // });
  };
  editCourse = lesson => {
    this.props.history.push({
      pathname: `/admin/dashboard/manage/lessons/update/${lesson._id}`,
      state: lesson
    });
  };
  viewLessons = lesson => {
    this.props.history.push({
      pathname: "/admin/dashboard/manage/lessons",
      state: lesson.lessons
    });
  };
  render() {
    return (
      <div className="manage-courses-container">
        <div className="manage-intro-section">
          <h2 className="manage-page-title">Manage Lessons</h2>
          <p className="manage-page-description">
            Manage each course or lesson, update or delete any sections needed.
          </p>
        </div>
        <div className="manage-section">
          {this.props.state.courseReducer.lessons &&
          this.props.location.state.lesson.length > 0 ? (
            this.props.state.courseReducer.lessons.map((lesson, i) => {
              return (
                <div className="manage-lesson-container" key={i}>
                  <div
                    className="lesson-header"
                    style={{
                      backgroundColor: !lesson.courseColor
                        ? lesson.courseColor
                        : "#637075"
                    }}
                  />
                  <div className="manage-lesson-body">
                    <h3 className="lesson-type">Lesson</h3>
                    <h2 className="lesson-title">{lesson.lessonTitle}</h2>
                  </div>
                  <div className="manage-lesson-footer">
                    <button
                      className="manage-button-edit"
                      onClick={this.editCourse.bind(this, lesson)}
                    >
                      Edit
                    </button>
                    <button
                      className="manage-button-delete"
                      onClick={this.deleteLesson.bind(this, lesson)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : this.props.location.state.lesson.length === 0 ? (
            <div className="no-lessons-container">
              <h1>No Lessons Available</h1>
            </div>
          ) : (
            <div className="no-lessons-container">
              <h1>Loading...</h1>
            </div>
          )}
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
  { getCourses, deleteLesson, manageOneCourse }
)(ManageLessons);
