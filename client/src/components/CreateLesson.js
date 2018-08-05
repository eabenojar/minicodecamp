import React, { Component } from "react";
import "../styles/createLesson.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import { connect } from "react-redux";
import { postLesson } from "../actions/coursesAction";

class CreateLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseType: "",
      lessonNumber: "",
      lessonTitle: "",
      lessonDescription: "",
      lessonCode: "",
      errors: {}
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
    if (Object.keys(nextProps.state.errorReducer).length !== 0) {
      this.setState({ errors: nextProps.state.errorReducer });
    }
    if (nextProps.state.courseReducer.courses.length === 1) {
      this.props.history.push("/course");
    }
  }
  submitForm = event => {
    this.props.postLesson(this.state);
    event.preventDefault();
  };
  render() {
    return (
      <div className="course-container">
        {this.props.state.auth.isAuthenticated ? (
          <div>
            <div className="create-lesson-title-section">
              <h1 className="create-lesson-form-title">Create a lesson</h1>
            </div>
            <div className="lesson-form">
              <Form onSubmit={this.submitForm}>
                <FormGroup>
                  <Label for="exampleEmail">Course Type</Label>
                  {Object.keys(this.state.errors).length !== 0 &&
                  this.state.errors.courseType ? (
                    <div>
                      <Input
                        invalid
                        type="text"
                        name="courseType"
                        id="courseType"
                        placeholder="Enter Course Title"
                        onChange={this.handleChange}
                      />
                      <FormFeedback>
                        {this.state.errors.courseType}
                      </FormFeedback>
                    </div>
                  ) : (
                    <Input
                      type="text"
                      name="courseType"
                      id="courseType"
                      placeholder="Enter Course Title"
                      onChange={this.handleChange}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleNumber">Lesson Number</Label>

                  {Object.keys(this.state.errors).length !== 0 &&
                  this.state.errors.lessonNumber ? (
                    <div>
                      <Input
                        invalid
                        type="number"
                        name="lessonNumber"
                        id="lessonNumber"
                        placeholder="Enter lesson number"
                        onChange={this.handleChange}
                      />
                      <FormFeedback>
                        {this.state.errors.lessonNumber}
                      </FormFeedback>
                    </div>
                  ) : (
                    <Input
                      type="number"
                      name="lessonNumber"
                      id="lessonNumber"
                      placeholder="Enter lesson number"
                      onChange={this.handleChange}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Lesson Title</Label>

                  {Object.keys(this.state.errors).length !== 0 &&
                  this.state.errors.lessonTitle ? (
                    <div>
                      <Input
                        invalid
                        type="text"
                        name="lessonTitle"
                        id="lessonTitle"
                        onChange={this.handleChange}
                      />
                      <FormFeedback>
                        {this.state.errors.lessonTitle}
                      </FormFeedback>
                    </div>
                  ) : (
                    <Input
                      type="text"
                      name="lessonTitle"
                      id="lessonTitle"
                      onChange={this.handleChange}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Lesson Description</Label>
                  {Object.keys(this.state.errors).length !== 0 &&
                  this.state.errors.lessonDescription ? (
                    <div>
                      <Input
                        invalid
                        type="textarea"
                        maxLength="800"
                        name="lessonDescription"
                        id="lessonDescription"
                        onChange={this.handleChange}
                      />
                      <FormFeedback>
                        {this.state.errors.lessonDescription}
                      </FormFeedback>
                    </div>
                  ) : (
                    <Input
                      type="textarea"
                      maxLength="800"
                      name="lessonDescription"
                      id="lessonDescription"
                      onChange={this.handleChange}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Lesson Code</Label>
                  {Object.keys(this.state.errors).length !== 0 &&
                  this.state.errors.lessonCode ? (
                    <div>
                      <Input
                        invalid
                        type="textarea"
                        name="lessonCode"
                        id="lessonCode"
                        onChange={this.handleChange}
                      />
                      <FormFeedback>
                        {this.state.errors.lessonCode}
                      </FormFeedback>
                    </div>
                  ) : (
                    <Input
                      type="textarea"
                      name="lessonCode"
                      id="lessonCode"
                      onChange={this.handleChange}
                    />
                  )}
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
  { postLesson }
)(CreateLesson);
