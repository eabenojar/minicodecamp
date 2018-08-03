import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCourses,
  deleteLesson,
  manageOneCourse
} from "../actions/coursesAction";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/manageCourses.css";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

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
    console.log("THIS COMP DID MOUNT", this.props.location);
    this.props.manageOneCourse(this.props.location.state.id);
  }
  componentWillUpdate() {
    console.log("this will update", this.props);
  }
  componentDidUpdate() {
    console.log("UPDATEEEEEEEE", this.props);
  }
  deleteLesson = lesson => {
    console.log("DELETED", lesson);
    this.props.deleteLesson(lesson);
    // this.setState({
    //   modal: !this.state.modal
    // });
  };
  editCourse = lesson => {
    console.log("EDIT", lesson);
    this.props.history.push({
      pathname: `/admin/dashboard/manage/lessons/update/${lesson._id}`,
      state: lesson
    });
  };
  viewLessons = lesson => {
    console.log("LESSONS", lesson);
    this.props.history.push({
      pathname: "/admin/dashboard/manage/lessons",
      state: lesson.lessons
    });
  };
  render() {
    console.log("RENDER MANAGE PROPS", this.props);
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
                      // onClick={this.toggle}
                    >
                      Delete
                    </button>
                    {/* <Modal
                      isOpen={this.state.modal}
                      toggle={this.toggle}
                      className={this.props.className}
                    >
                      <ModalBody>
                        Are you sure you want to delete this?
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={this.deleteLesson.bind(this, lesson)}
                        >
                          Delete
                        </Button>{" "}
                        <Button color="secondary" onClick={this.toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal> */}
                  </div>
                </div>
              );
            })
          ) : this.props.location.state.length === 0 ? (
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
