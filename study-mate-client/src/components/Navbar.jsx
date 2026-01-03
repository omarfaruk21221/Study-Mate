import React, { use } from "react";
import Logo from "../assets/justlogo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";
import User from "./User";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user } = use(AuthContext);
  // ===my Navlinks ===
  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/find-partners"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          Find Partners
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to={"/Create-Partner-Profile"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
              }
            >
              Create Partner Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-connection"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
              }
            >
              My Connections
            </NavLink>
          </li>
        </>
      )}
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
        <div className="btn btn-ghost text-xl">
          <img className=" w-10 h-10" src={Logo} alt="" />
          <h1 className=" text-primary hidden md:block">
            <span className=" font-bold">Study </span>
            <span className="font-semibold text-primary-content">Mate</span>
          </h1>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end flex items-center gap-6">
        <ThemeToggle />
        <div>
          {user ? (
            <User />
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
