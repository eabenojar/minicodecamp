import {
  GET_COURSES
  // GET_LESSONS,
  // POST_COURSE,
  // POST_LESSON,
  // DELETE_COURSE,
  // DELETE_LESSON
} from "../actions/types";

const initialState = {
  courses: [],
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
    default:
      return state;
  }
}
