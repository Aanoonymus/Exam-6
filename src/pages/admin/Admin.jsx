import React, { useLayoutEffect, useState } from "react";
import "./Admin.scss";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { instance } from "../../api";

import Logo from "../../assets/Ellipse 1.png";

const token = localStorage.getItem("token").split(".")[1];
const tokenatob = JSON.parse(atob(token));
const tokenid = tokenatob.id;

const Admin = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigate("/admin/create");

    const renderUserProfile = async () => {
      try {
        const response = await instance.get(`/api/users/${tokenid}`);
        setProfile(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    renderUserProfile();
  }, []);

  const handleLogOut = () => {
    const isUserAgreed = window.confirm("Are you sure you want to sign out?");
    if (isUserAgreed) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="admin">
      <div className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <div className="user-info">
          <img src={Logo} alt="" />
          <div>
            <p className="user-info-name">
              {profile
                ? `${profile.firstname} ${profile.lastname}`
                : "Loading..."}
            </p>
            <p className="sidebar-author">Author</p>
          </div>
        </div>
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar-link side-link-active" : "sidebar-link"
          }
          to="/admin/create"
        >
          Create Post
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar-link side-link-active" : "sidebar-link"
          }
          to="/admin/manage"
        >
          Manage Posts
        </NavLink>
        <p
          onClick={() => handleLogOut()}
          style={{ cursor: "pointer" }}
          className="sidebar-out"
        >
          Sign Out?
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default Admin;
