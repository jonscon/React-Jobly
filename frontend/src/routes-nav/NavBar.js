import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

/** NavBar. 
 * 
 *  Includes navigation to Companies, Jobs, Profile, or Login/Logout. 
 * 
 *  Rendered in Routes.
 * 
 */

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNavBar() {
    return (
      <Nav className="navbar-nav ml-auto">
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/companies">Companies</NavLink>
        </NavItem>
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
        </NavItem>
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </NavItem>
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.first_name || currentUser.username}
          </NavLink>
        </NavItem>
    </Nav>
    )
  }

  function loggedOutNavBar() {
    return (
      <Nav className="navbar-nav ml-auto">
        <NavItem className="nav-item mr-4"> 
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </NavItem>
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </NavItem>
      </Nav>
    )
  }

  return (
    <Navbar className="Navigation navbar navbar-expand-md">
      <NavLink className="navbar-brand" to="/">
        Jobly
      </NavLink>
      {currentUser ? loggedInNavBar() : loggedOutNavBar()}
    </Navbar>
  );
}

export default NavBar;
