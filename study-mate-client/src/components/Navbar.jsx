import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";
import User from "./User";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Share/Logo";
import UserMenu from "./UserMenu";
import { FaCog, FaHeart, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user } = use(AuthContext);

  // ===my Navlinks ===
  const Links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li>
        <NavLink to="/find-partners">Find Partners</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={"/Create-Profile"}>Create Profile</NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-10 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>
        {/* logo */}
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-4">{Links}</ul>
      </div>
      <div className="navbar-end flex items-center gap-6">
        <ThemeToggle />
        <div>
          {user ? (
            <UserMenu />
          ) : (
            <Link to={"/auth-layout"} className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
