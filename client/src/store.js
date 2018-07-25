import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/index";
import thunk from "redux-thunk";

const initialState = {};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
