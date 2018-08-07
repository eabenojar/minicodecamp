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
import EditCourse from "./components/EditCourse";
import EditLesson from "./components/EditLesson";
import MainPage from "./components/MainPage";

export default (
  <Switch>
    <Route component={MainPage} exact path="/" />
    <Route component={HomePage} exact path="/courses" />
    <Route component={Signup} exact path="/signup" />
    <Route component={LessonInfo} exact path="/course/lessons/:id" />
    <Route component={CreateCourse} exact path="/create/course" />
    <Route component={CreateLesson} exact path="/create/lesson" />
    <Route component={SignIn} exact path="/admin/signin" />
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
    <Route
      component={EditCourse}
      exact
      path="/admin/dashboard/manage/courses/update/:id"
    />
    <Route
      component={EditLesson}
      exact
      path="/admin/dashboard/manage/lessons/update/:id"
    />
  </Switch>
);
