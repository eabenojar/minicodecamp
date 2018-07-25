import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/auth/Signup";

export default (
  <Switch>
    <Route component={HomePage} exact path="/" />
    <Route component={Signup} path="/signup" />
  </Switch>
);
