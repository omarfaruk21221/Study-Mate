import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h2 className="text-4xl font-bold text-red-500 mb-2">
        No Partners Found
      </h2>
      <p className="text-accent mb-6 max-w-md">
        We couldn’t find any study partners matching your search or filter.
        Please refresh the page and try adjusting your search terms or reset the
        filters.
      </p>
    </div>
  );
};

export default NotFound;
