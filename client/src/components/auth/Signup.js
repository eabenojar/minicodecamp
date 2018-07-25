import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class Signup extends Component {
  onSubmit = formProps => {
    console.log(formProps);
    //   this.props.signup(formProps, () => {
    //     this.props.history.push("/feature");
    //   });
  };
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            component="input"
            type="text"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            component="input"
            type="password"
            autoComplete="none"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Sign Up!</button>
      </form>
    );
  }
}

export default reduxForm({ form: "signup" })(Signup);
