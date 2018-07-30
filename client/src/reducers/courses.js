import {
  GET_COURSES,
  // GET_LESSONS,
  POST_COURSE,
  POST_LESSON,
  GET_ONE_COURSE
  // POST_LESSON,
  // DELETE_COURSE,
  // DELETE_LESSON
} from "../actions/types";

const initialState = {
  courses: [],
  lessons: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      console.log("GET COURCES", action.payload);
      return {
        ...state,
        courses: action.payload
      };
    case POST_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload]
      };
    case POST_LESSON:
      return {
        ...state,
        courses: [...state.courses, action.payload]
      };
    case GET_ONE_COURSE:
      return {
        ...state,
        lessons: action.payload
      };
    default:
      return state;
  }
}
