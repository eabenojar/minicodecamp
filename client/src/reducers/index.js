import { combineReducers } from "redux";
import auth from "./auth";
import { reducer as formReducer } from "redux-form";
import courseReducer from "./courses";

export default combineReducers({
  auth,
  form: formReducer,
  courseReducer: courseReducer
});
