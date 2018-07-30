import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends Component {
  state = {
    isOpen: false
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <div className="header-container">
        <div className="header-sub-container">
          <Navbar color="light" light expand="md" navbar>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="d-flex align-items-start" navbar>
                <NavItem>
                  <NavLink href="/course/">Courses</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/course">Quizes</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            <NavbarBrand href="/course">Mini Code Camp</NavbarBrand>
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

export default Header;
