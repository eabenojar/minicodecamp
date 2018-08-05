import React, { Component } from "react";
import "../styles/createLesson.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { updateLesson } from "../actions/coursesAction";

class EditLesson extends Component {
  constructor(props) {
    super(props);
    const { state } = this.props.location;
    this.state = {
      lessonNumber: state.lessonNumber,
      lessonTitle: state.lessonTitle,
      lessonDescription: state.lessonDescription,
      lessonCode: state.lessonCode
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
    const result = nextProps.state.courseReducer.lessons[0];
    if (
      result.lessonNumber === this.state.lessonNumber ||
      result.lessonTitle === this.state.lessonTitle ||
      result.lessonDescription === this.state.lessonDescription ||
      result.lessonCode === this.state.lessonCode
    ) {
      this.props.history.goBack();
    }
  }

  submitForm = event => {
    this.props.updateLesson(this.props.location.state._id, this.state);
    event.preventDefault();
  };
  render() {
    return (
      <div className="course-container">
        {this.props.state.auth.isAuthenticated ? (
          <div>
            <div className="create-lesson-title-section">
              <h1 className="create-lesson-form-title">Edit Lesson</h1>
            </div>
            <div className="lesson-form">
              <Form onSubmit={this.submitForm}>
                <FormGroup>
                  <Label for="exampleNumber">Lesson Number</Label>
                  <Input
                    type="number"
                    name="lessonNumber"
                    id="lessonNumber"
                    placeholder="Enter lesson number"
                    onChange={this.handleChange}
                    value={this.state.lessonNumber}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Lesson Title</Label>
                  <Input
                    type="text"
                    name="lessonTitle"
                    id="lessonTitle"
                    onChange={this.handleChange}
                    value={this.state.lessonTitle}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Lesson Description</Label>
                  <Input
                    type="textarea"
                    maxLength="800"
                    name="lessonDescription"
                    id="lessonDescription"
                    onChange={this.handleChange}
                    value={this.state.lessonDescription}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Lesson Code</Label>
                  <Input
                    type="textarea"
                    name="lessonCode"
                    id="lessonCode"
                    onChange={this.handleChange}
                    value={this.state.lessonCode}
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
  { updateLesson }
)(EditLesson);
