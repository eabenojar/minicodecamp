import React, { Component } from "react";
import "../styles/createCourse.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { postCourse } from "../actions/coursesAction";
import { loginUser } from "../actions/authAction";
import { Link } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }

    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
  }
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  submitForm = event => {
    this.props.loginUser(this.state);
    event.preventDefault();
  };
  render() {
    return (
      <div className="course-container">
        <div className="create-course-title-section">
          <h1 className="create-course-form-title">Login to MiniCodeCamp</h1>
        </div>
        <div className="course-form">
          <Form onSubmit={this.submitForm}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Password</Label>
              <Input
                type="password"
                maxLength="20"
                name="password"
                id="password"
                placeholder="Enter Password"
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
  { postCourse, loginUser }
)(SignIn);
