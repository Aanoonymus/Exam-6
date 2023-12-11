import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import "./Nav.scss";

const RESTRICTED_ROUTES_FOR_NAV = [
  "/login",
  "/signin",
  "/admin",
  "/admin/create",
  "/admin/manage",
];

const Nav = () => {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

  return RESTRICTED_ROUTES_FOR_NAV.includes(pathname) ? null : (
    <nav className="navbar">
      <img className="navbar-logo" src={Logo} alt="" />
      <ul className="nav-list">
        {!token ? (
          <>
            <li className="nav-list-item">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="nav-list-item">
              <NavLink to="/signin">Signin</NavLink>
            </li>
          </>
        ) : (
          <li className="nav-list-item">
            <NavLink to="/admin">Admin</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
