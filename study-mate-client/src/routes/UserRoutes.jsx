import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loader from "../components/Spiners/Loader";

const UserRoutes = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loader />;
  }
  if (role !== "user") {
    return <p>unKnown rider </p>;
  }
  console.log(role);
  return children;
};

export default UserRoutes;
