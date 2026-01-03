import React from "react";
import error404Img from "../../../assets/error404.png";
const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <img src={error404Img} alt="error 404" />
      <h1 className="text-6xl text-center font-semibold text-red-500 ">
        Page Not Found
      </h1>
    </div>
  );
};

export default Error404;
