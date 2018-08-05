import React, { Component } from "react";
import "../styles/createCourse.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import { connect } from "react-redux";
import { postCourse } from "../actions/coursesAction";

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseType: "",
      courseDevType: "Front End Development",
      courseDescription: "",
      courseColor: "",
      created: false,
      errors: {}
    };
  }
  componentDidUpdate() {
    if (
      this.props.state.courseReducer.courses.length === 1 &&
      this.state.created === false
    ) {
      this.setState({
        created: true
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.state.errorReducer).length !== 0) {
      this.setState({ errors: nextProps.state.errorReducer });
    }
    if (nextProps.state.courseReducer.courses.length === 1) {
      this.props.history.push("/course");
    }
  }
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  submitForm = event => {
    this.props.postCourse(this.state);

    event.preventDefault();
  };
  resetPage = () => {
    this.setState({
      created: false
    });
  };
  render() {
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

                  {Object.keys(this.state.errors).length !== 0 &&
                  this.state.errors.courseDescription ? (
                    <div>
                      <Input
                        invalid
                        type="textarea"
                        maxLength="100"
                        name="courseDescription"
                        id="courseDescription"
                        onChange={this.handleChange}
                      />
                      <FormFeedback>
                        {this.state.errors.courseDescription}
                      </FormFeedback>
                    </div>
                  ) : (
                    <Input
                      type="textarea"
                      maxLength="100"
                      name="courseDescription"
                      id="courseDescription"
                      onChange={this.handleChange}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Course Color</Label>
                  {Object.keys(this.state.errors).length !== 0 &&
                  this.state.errors.courseColor ? (
                    <div>
                      <Input
                        invalid
                        type="text"
                        name="courseColor"
                        id="courseColor"
                        placeholder="Enter Course Color"
                        onChange={this.handleChange}
                      />
                      <FormFeedback>
                        {this.state.errors.courseColor}
                      </FormFeedback>
                    </div>
                  ) : (
                    <Input
                      type="text"
                      name="courseColor"
                      id="courseColor"
                      placeholder="Enter Course Color"
                      onChange={this.handleChange}
                    />
                  )}
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </div>
          </div>
        ) : (
          // ) : this.props.state.auth.isAuthenticated &&
          // this.state.created === true ? (
          //   <div className="dashboard-admin-only">
          //     <h1>Course Created</h1>
          //     <Button onClick={this.resetPage} color="danger">
          //       Create Another Course
          //     </Button>
          //   </div>
          // ) : (
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
