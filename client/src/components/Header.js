import React, { Component } from "react";
import "../styles/header.css";
import "../styles/header.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import { logoutCurrentUser } from "../actions/authAction";
import { withRouter } from "react-router-dom";

class Header extends Component {
  state = {
    isOpen: false,
    logout: false
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  logout = () => {
    this.setState(
      {
        logout: true
      },
      () => {
        this.props.logoutCurrentUser();
      }
    );
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.state.auth.isAuthenticated === false &&
      this.state.logout === true
    ) {
      this.props.history.push("/courses");
      this.setState({
        logout: false
      });
    }
  }
  render() {
    return (
      <div className="header-container">
        <div className="header-sub-container">
          <Navbar expand="md" dark>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="d-flex align-items-start" color="dark">
                <NavItem>
                  <NavLink
                    className="navbar-links"
                    style={{
                      padding: 0
                    }}
                    href="/courses"
                  >
                    Courses
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink className="navbar-links" href="/course">
                    Quizes
                  </NavLink>
                </NavItem> */}
              </Nav>
            </Collapse>
            {this.props.state.auth.isAuthenticated ? (
              <Nav>
                <NavLink className="navbar-links" href="/admin/dashboard">
                  Dashboard
                </NavLink>
                <NavLink
                  className="navbar-links"
                  onClick={this.logout}
                  style={{ color: "#FFF" }}
                >
                  Logout
                </NavLink>
              </Nav>
            ) : (
              <NavLink className="navbar-links" href="/courses">
                Mini Code Camp
              </NavLink>
            )}
          </Navbar>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    state
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logoutCurrentUser }
  )(Header)
);
