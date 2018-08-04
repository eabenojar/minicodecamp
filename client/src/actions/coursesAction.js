import {
  GET_COURSES,
  GET_LESSONS,
  POST_COURSE,
  POST_LESSON,
  DELETE_COURSE,
  DELETE_LESSON,
  GET_ONE_COURSE,
  SIGN_IN,
  MANAGE_COURSES,
  UPDATE_COURSE,
  UPDATE_LESSON,
  GET_ERRORS
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
  axios
    .post("/create/course", course)
    .then(res => {
      console.log("INSIDE POST COURSE", res);
      dispatch({
        type: POST_COURSE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("INSIDE POST COURSE ERRORS", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const postLesson = lesson => dispatch => {
  axios
    .post("/create/lesson", lesson)
    .then(res => {
      dispatch({
        type: POST_LESSON,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("INSIDE POST LESSON ERRORS", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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

export const updateCourse = (id, course) => dispatch => {
  console.log("INSIDE UPDATE COURSE", id, course);
  axios
    .put(`/admin/dashboard/manage/courses/update/${id}`, course)
    .then(res => {
      dispatch({
        type: UPDATE_COURSE,
        payload: res.data
      });
    });
};

export const updateLesson = (id, lesson) => dispatch => {
  console.log("INSIDE UPDATE LESSONS ACTION", id, lesson);
  axios
    .put(`/admin/dashboard/manage/lessons/update/${id}`, lesson)
    .then(res => {
      console.log("RES", res);
      dispatch({
        type: UPDATE_LESSON,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
