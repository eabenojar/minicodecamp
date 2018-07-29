import React, { Component } from "react";
import "../styles/createCourse.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { postCourse } from "../actions/coursesAction";
// import { Link } from "react-router-dom";

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseType: "",
      courseDevType: "Front End Development",
      courseDescription: "",
      courseColor: ""
    };
  }
  handleChange = event => {
    // console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  submitForm = event => {
    console.log("STATE", this.state);
    this.props.postCourse(this.state);
    event.preventDefault();
  };
  render() {
    return (
      <div className="course-container">
        <div className="create-course-title-section">
          <h1 className="create-course-form-title">Create a course</h1>
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
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelectMulti">Select Developer Type</Label>
              <Input
                type="select"
                name="courseDevType"
                id="courseDevType"
                onChange={this.handleChange}
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
  { postCourse }
)(CreateCourse);
