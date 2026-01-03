import React from "react";
import logo from "../../assets/justlogo.png";

const Logo = () => {
  return (
    <div className="btn btn-ghost text-xl">
      <img className=" w-10 h-10" src={logo} alt="Logo" />
      <h1 className=" text-primary hidden md:block">
        <span className=" font-bold">Study </span>
        <span className="font-semibold text-primary-content">Mate</span>
      </h1>
    </div>
  );
};

export default Logo;
