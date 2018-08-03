import React, { Component } from "react";
import "../styles/createCourse.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { postCourse } from "../actions/coursesAction";
import { Link } from "react-router-dom";

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseType: "",
      courseDevType: "Front End Development",
      courseDescription: "",
      courseColor: "",
      created: false
    };
  }
  componentDidUpdate() {
    console.log("DID UPDATE", this.props);
    if (
      this.props.state.courseReducer.courses.length === 1 &&
      this.state.created === false
    ) {
      console.log("CREATE COURSE UPDATE");
      this.setState({
        created: true
      });
    }
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
  resetPage = () => {
    console.log("RESET");
    this.setState({
      created: false
    });
    console.log("RESET STATE", this.state.created);
  };
  render() {
    console.log(this.props, "RENDER CREATE COURSE");
    return (
      <div className="course-container">
        {this.props.state.auth.isAuthenticated &&
        this.state.created === false ? (
          <div>
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
        ) : this.props.state.auth.isAuthenticated &&
        this.state.created === true ? (
          <div className="dashboard-admin-only">
            <h1>Course Created</h1>
            <Button onClick={this.resetPage} color="danger">
              Create Another Course
            </Button>
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
  { postCourse }
)(CreateCourse);
