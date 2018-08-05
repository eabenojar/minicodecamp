import {
  GET_COURSES,
  // GET_LESSONS,
  POST_COURSE,
  POST_LESSON,
  GET_ONE_COURSE,
  DELETE_COURSE,
  DELETE_LESSON,
  MANAGE_COURSES,
  UPDATE_COURSE,
  UPDATE_LESSON
} from "../actions/types";

const initialState = {
  courses: [],
  lessons: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
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
    case MANAGE_COURSES:
      return {
        ...state,
        lessons: action.payload
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course._id !== action.payload)
      };
    case DELETE_LESSON:
      return {
        ...state,
        courses: state.courses.map(course => {
          if (course.courseType === action.payload.courseType) {
            const result = course.lessons.filter(
              lessons => lessons._id !== action.id
            );
            course.lessons = result;
          }
          return course;
        }),
        lessons: state.lessons.filter(lesson => lesson._id !== action.id)
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(course => {
          if (course._id === action.payload._id) {
            return (course = action.payload);
          }
          return course;
        })
      };
    case UPDATE_LESSON:
      return {
        ...state,
        lessons: state.lessons.map(lesson => {
          if (lesson._id === action.payload._id) {
            return (lesson = action.payload);
          }
          return lesson;
        })
      };
    default:
      return state;
  }
}
