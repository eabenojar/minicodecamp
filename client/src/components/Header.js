import React, { Component } from "react";
import "../styles/header.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import { logoutCurrentUser } from "../actions/authAction";

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
    console.log("LOGOUT FAM");
    this.props.logoutCurrentUser();
    this.props.history.push("/course");
  };
  render() {
    return (
      <div className="header-container">
        <div className="header-sub-container">
          <Navbar expand="md">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="d-flex align-items-start" navbar>
                <NavItem>
                  <NavLink className="navbar-links" href="/course">
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
                <NavbarBrand href="/admin/dashboard">Dashboard</NavbarBrand>
                <NavbarBrand onClick={this.logout}>Logout</NavbarBrand>
              </Nav>
            ) : (
              <NavbarBrand href="/course">Mini Code Camp</NavbarBrand>
            )}
          </Navbar>
        </div>

        {/* <div className="header-section">
          <div className="header-section-left">
            <Link className="header-link" to="/course">
              Courses
            </Link>
            <Link className="header-link" to="/course">
              Quizes
            </Link>
            <Link className="header-link" to="/course">
              Projects
            </Link>
          </div>
          <div className="header-section-right">
            <Link className="header-link" to="/signin">
              Sign in
            </Link>
          </div>
        </div> */}
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
