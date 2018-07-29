import React, { Component } from "react";
import "../styles/createLesson.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
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
      lessonCode: ""
    };
  }
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  submitForm = event => {
    console.log("STATE", this.state);
    this.props.postLesson(this.state);
    event.preventDefault();
  };
  render() {
    return (
      <div className="course-container">
        <div className="create-lesson-title-section">
          <h1 className="create-lesson-form-title">Create a lesson</h1>
        </div>
        <div className="lesson-form">
          <Form onSubmit={this.submitForm}>
            <FormGroup>
              <Label for="exampleEmail">Course Type</Label>
              <Input
                type="text"
                name="courseType"
                id="courseType"
                placeholder="Enter Course Type"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Lesson Number</Label>
              <Input
                type="number"
                name="lessonNumber"
                id="lessonNumber"
                placeholder="Enter lesson number"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Lesson Title</Label>
              <Input
                type="text"
                name="lessonTitle"
                id="lessonTitle"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Lesson Description</Label>
              <Input
                type="textarea"
                maxlength="800"
                name="lessonDescription"
                id="lessonDescription"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Lesson Code</Label>
              <Input
                type="textarea"
                name="lessonCode"
                id="lessonCode"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button color="success">Submit</Button>
          </Form>
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
  { postLesson }
)(CreateLesson);
