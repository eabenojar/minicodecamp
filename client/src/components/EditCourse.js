import React, { Component } from "react";
import "../styles/createCourse.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { updateCourse } from "../actions/coursesAction";

class EditCourse extends Component {
  constructor(props) {
    super(props);
    const { state } = this.props.location;
    this.state = {
      courseType: state.course.courseType,
      courseDevType: state.course.courseDevType,
      courseDescription: state.course.courseDescription,
      courseColor: state.course.courseColor
    };
  }
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  componentWillReceiveProps(nextProps) {
    nextProps.state.courseReducer.courses.forEach(type => {
      if (type.courseType === this.state.courseType) {
        this.props.history.push("/admin/dashboard/manage/courses");
      }
    });
  }
  submitForm = event => {
    this.props.updateCourse(this.props.location.state.id, this.state);
    event.preventDefault();
  };
  render() {
    return (
      <div className="course-container">
        {this.props.state.auth.isAuthenticated ? (
          <div>
            <div className="create-course-title-section">
              <h1 className="create-course-form-title">Edit Course</h1>
            </div>
            <div className="course-form">
              <Form onSubmit={this.submitForm}>
                <FormGroup>
                  <Label for="exampleEmail">Course Type</Label>
                  <Input
                    type="text"
                    name="courseType"
                    id="courseType"
                    placeholder="Enter Course Title"
                    onChange={this.handleChange}
                    value={this.state.courseType}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelectMulti">Select Developer Type</Label>
                  <Input
                    type="select"
                    name="courseDevType"
                    id="courseDevType"
                    onChange={this.handleChange}
                    value={this.state.courseDevType}
                  >
                    <option>Front End Development</option>
                    <option>Back End Development</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Course Description</Label>
                  <Input
                    type="textarea"
                    maxLength="100"
                    name="courseDescription"
                    id="courseDescription"
                    onChange={this.handleChange}
                    value={this.state.courseDescription}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Course Color</Label>
                  <Input
                    type="text"
                    name="courseColor"
                    id="courseColor"
                    placeholder="Enter Course Color"
                    onChange={this.handleChange}
                    value={this.state.courseColor}
                  />
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </div>
          </div>
        ) : (
          <div className="dashboard-admin-only">
            <h1>Admin Access Only</h1>
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
  { updateCourse }
)(EditCourse);
