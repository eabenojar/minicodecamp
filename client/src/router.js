import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/auth/Signup";
import LessonInfo from "./components/LessonInfo";
import CreateCourse from "./components/CreateCourse";
import CreateLesson from "./components/CreateLesson";
import SignIn from "./components/SignIn";
import AdminDashboard from "./components/AdminDashboard";
import ManageCourses from "./components/ManageCourses";
import ManageLessons from "./components/ManageLessons";

export default (
  <Switch>
    <Route component={HomePage} exact path="/course" />
    <Route component={Signup} path="/signup" />
    <Route component={LessonInfo} path="/course/lessons/:id" />
    <Route component={CreateCourse} path="/create/course" />
    <Route component={CreateLesson} path="/create/lesson" />
    <Route component={SignIn} path="/admin/signin" />
    <Route component={AdminDashboard} exact path="/admin/dashboard" />
    <Route
      component={ManageCourses}
      exact
      path="/admin/dashboard/manage/courses"
    />
    <Route
      component={ManageLessons}
      exact
      path="/admin/dashboard/manage/lessons"
    />
  </Switch>
);
