import { combineReducers } from "redux";
import auth from "./auth";
import { reducer as formReducer } from "redux-form";
import courseReducer from "./courses";
import errorReducer from "./errors";

export default combineReducers({
  auth,
  form: formReducer,
  courseReducer: courseReducer,
  errorReducer: errorReducer
});
