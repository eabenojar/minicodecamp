import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/auth/Signup";
import LessonInfo from "./components/LessonInfo";
import CreateCourse from "./components/CreateCourse";
import CreateLesson from "./components/CreateLesson";

export default (
  <Switch>
    <Route component={HomePage} exact path="/course" />
    <Route component={Signup} path="/signup" />
    <Route component={LessonInfo} path="/course/lessons/:id" />
    <Route component={CreateCourse} path="/create/course" />
    <Route component={CreateLesson} path="/create/lesson" />
  </Switch>
);
