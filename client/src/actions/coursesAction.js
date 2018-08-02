import {
  GET_COURSES,
  GET_LESSONS,
  POST_COURSE,
  POST_LESSON,
  DELETE_COURSE,
  DELETE_LESSON,
  GET_ONE_COURSE,
  SIGN_IN,
  MANAGE_COURSES
} from "./types";

import axios from "axios";

export const getCourses = () => dispatch => {
  console.log("INSIDE ACTIOn");
  axios.get("/course").then(res => {
    console.log(res, "INSIDE AXIOS");
    dispatch({
      type: GET_COURSES,
      payload: res.data
    });
  });
};

export const getLessons = () => {
  return {
    type: GET_LESSONS
  };
};

export const postCourse = course => dispatch => {
  axios.post("/create/course", course).then(res => {
    console.log("INSIDE POST COURSE", course);
    dispatch({
      type: POST_COURSE,
      payload: res.data
    });
  });
};
export const postLesson = lesson => dispatch => {
  axios.post("/create/lesson", lesson).then(res => {
    dispatch({
      type: POST_LESSON,
      payload: res.data
    });
  });
};
export const deleteLesson = lesson => dispatch => {
  console.log("DELETE LESSON ACTION", lesson);
  axios.post("/admin/dashboard/manage/lessons", lesson).then(res => {
    console.log("RESSS", res);
    dispatch({
      type: DELETE_LESSON,
      payload: res.data,
      id: lesson._id
    });
  });
};
export const deleteCourse = id => dispatch => {
  console.log("THIS DELETE COURSE ", id);
  axios.delete(`/admin/dashboard/manage/courses/${id}`).then(res => {
    console.log("RESSS", res);
    dispatch({
      type: DELETE_COURSE,
      payload: id
    });
  });
};
export const getOneCourse = id => dispatch => {
  console.log("INSIDE GET ONE COURSE ACTION");
  axios.get(`/course/lessons/${id}`).then(res => {
    dispatch({
      type: GET_ONE_COURSE,
      payload: res.data
    });
  });
};

export const manageOneCourse = id => dispatch => {
  console.log("INSIDE GET ONE COURSE ACTION");
  axios.get(`/admin/dashboard/manage/courses/${id}`).then(res => {
    console.log("MANAGE ACTION", res.data);
    dispatch({
      type: MANAGE_COURSES,
      payload: res.data.lessons
    });
  });
};

export const userLogin = user => dispatch => {
  axios.post("/login", user).then(res => {
    dispatch({
      type: SIGN_IN,
      payload: res.data
    });
  });
};
