import React from "react";

const Loading = () => {
  return (
    <div className="text-center py-20">
      <div>
        <span className="loading text-primary loading-ring loading-xs"></span>
        <span className="loading text-primary loading-ring loading-sm"></span>
        <span className="loading text-primary loading-ring loading-md"></span>
        <span className="loading text-primary loading-ring loading-lg"></span>
        <span className="loading text-primary loading-ring loading-xl"></span>
      </div>
      <h1 className="text-xl text-primary mt-5"> Please Wait ...</h1>
    </div>
  );
};

export default Loading;
