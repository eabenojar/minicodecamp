import React, { Component } from "react";
import "../styles/header.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { connect } from "react-redux";
import { logoutCurrentUser } from "../actions/authAction";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    isOpen: false
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  logout = () => {
    this.props.logoutCurrentUser();
    this.props.history.push("/course");
  };
  render() {
    return (
      <div className="header-container">
        <div className="header-sub-container">
          <Navbar expand="md" dark>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="d-flex align-items-start" color="dark">
                <NavItem>
                  <Link
                    className="navbar-links"
                    style={{
                      padding: 0
                    }}
                    to="/courses"
                  >
                    Courses
                  </Link>
                </NavItem>
                {/* <NavItem>
                  <NavLink className="navbar-links" to="/course">
                    Quizes
                  </NavLink>
                </NavItem> */}
              </Nav>
            </Collapse>
            {this.props.state.auth.isAuthenticated ? (
              <Nav>
                <Link className="navbar-links" to="/admin/dashboard">
                  Dashboard
                </Link>
                <Link
                  className="navbar-links"
                  onClick={this.logout}
                  style={{ color: "#FFF" }}
                >
                  Logout
                </Link>
              </Nav>
            ) : (
              <Link className="navbar-links" to="/courses">
                Mini Code Camp
              </Link>
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

export default connect(
  mapStateToProps,
  { logoutCurrentUser }
)(Header);
