import React, { Component } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import router from "./router";
import "./styles/App.css";
import "prismjs/themes/prism.css";
import "prismjs/prism.js";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {router}
      </div>
    );
  }
}

export default App;
