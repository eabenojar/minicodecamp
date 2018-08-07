import {
  GET_COURSES,
  GET_LESSONS,
  POST_COURSE,
  POST_LESSON,
  DELETE_COURSE,
  DELETE_LESSON,
  GET_ONE_COURSE,
  MANAGE_COURSES,
  UPDATE_COURSE,
  UPDATE_LESSON,
  GET_ERRORS
} from "./types";

import axios from "axios";

export const getCourses = () => dispatch => {
  axios.get("/api/courses").then(res => {
    console.log("ITS LITT");
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
      dispatch({
        type: POST_COURSE,
        payload: res.data
      });
    })
    .catch(err => {
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
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteLesson = lesson => dispatch => {
  axios.post("/admin/dashboard/manage/lessons", lesson).then(res => {
    dispatch({
      type: DELETE_LESSON,
      payload: res.data,
      id: lesson._id
    });
  });
};
export const deleteCourse = id => dispatch => {
  axios.delete(`/admin/dashboard/manage/courses/${id}`).then(res => {
    dispatch({
      type: DELETE_COURSE,
      payload: id
    });
  });
};
export const getOneCourse = id => dispatch => {
  axios.get(`/api/course/lessons/${id}`).then(res => {
    dispatch({
      type: GET_ONE_COURSE,
      payload: res.data
    });
  });
};

export const manageOneCourse = id => dispatch => {
  axios.get(`/admin/dashboard/manage/courses/${id}`).then(res => {
    dispatch({
      type: MANAGE_COURSES,
      payload: res.data.lessons
    });
  });
};

export const updateCourse = (id, course) => dispatch => {
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
  axios
    .put(`/admin/dashboard/manage/lessons/update/${id}`, lesson)
    .then(res => {
      dispatch({
        type: UPDATE_LESSON,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
