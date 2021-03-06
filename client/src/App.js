import React, { Component } from "react";

// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import router from "./router";
import "./styles/App.css";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authAction";
import store from "./store";
import Footer from "./components/Footer";
import "prismjs/prism.js";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render() {
    return (
      <div>
        <Header />
        {router}
        <Footer />
      </div>
    );
  }
}

export default App;
