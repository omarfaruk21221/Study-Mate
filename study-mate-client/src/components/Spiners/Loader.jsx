import React from "react";

export default function Loader() {
  return (
    <div className="max-w-4xl min-h-95 mx-auto ">
      <span className="loading loading-dots loading-xs"></span>
      <span className="loading loading-dots loading-sm"></span>
      <span className="loading loading-dots loading-md"></span>
      <span className="loading loading-dots loading-lg"></span>
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
}
