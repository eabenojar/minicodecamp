import React, { Component } from "react";
import { connect } from "react-redux";
import { getCourses, deleteCourse } from "../actions/coursesAction";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/manageCourses.css";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

class ManageCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  componentDidMount() {
    this.props.getCourses();
  }
  deleteCourse = lesson => {
    console.log("DELETED", lesson);
    this.props.deleteCourse(lesson._id);
    this.setState({
      modal: !this.state.modal
    });
  };
  editCourse = lesson => {
    console.log("EDIT", lesson);
    this.props.history.push({
      pathname: `/admin/dashboard/manage/courses/update/${lesson._id}`,
      state: {
        course: lesson,
        id: lesson._id
      }
    });
  };
  viewLessons = lesson => {
    console.log("LESSONS", lesson);
    this.props.history.push({
      pathname: "/admin/dashboard/manage/lessons",
      state: {
        lesson: lesson.lessons,
        id: lesson._id
      }
    });
  };
  toggle = lesson => {
    console.log(lesson);
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    console.log("THIS PROPS MANAGE COURSES", this.props);
    return (
      <div className="manage-courses-container">
        <div className="manage-intro-section">
          <h2 className="manage-page-title">Manage Courses & Lessons</h2>
          <p className="manage-page-description">
            Manage each course or lesson, update or delete any sections needed.
          </p>
        </div>
        <div className="manage-section">
          {this.props.state.courseReducer.courses.map((lesson, i) => {
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
                  <h2 className="lesson-title">{lesson.courseType}</h2>
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
                    onClick={this.toggle.bind(this, lesson)}
                  >
                    Delete
                  </button>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                  >
                    <ModalBody>Are you sure you want to delete this?</ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={this.deleteCourse.bind(this, lesson)}
                      >
                        Delete
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <button
                    className="manage-button-lessons"
                    onClick={this.viewLessons.bind(this, lesson)}
                  >
                    View Lessons
                  </button>
                </div>
              </div>
            );
          })}
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
  { getCourses, deleteCourse }
)(ManageCourses);
