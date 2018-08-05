import { AUTH_USER, SET_CURRENT_USER, GET_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const signup = ({ email, password }) => {
  return function(dispatch) {
    dispatch({
      type: AUTH_USER,
      payload: email
    });
  };
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/admin/signin", userData)
    .then(res => {
      console.log("SUCESSS SIGNED IN");
      // Save to localstorage
      const { token } = res.data;
      // Set token to localstorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
export const logoutCurrentUser = () => dispatch => {
  // Remove token from localstorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  // return {
  //   type: LOGOUT_CURRENT_USER,
  //   payload: false
  // };
};
