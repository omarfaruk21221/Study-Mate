import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loader from "../components/Spiners/Loader";

const AdminRoutes = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loader />;
  }
  if (role !== "admin") {
    return <p>unKnown admin </p>;
  }

  return children;
};

export default AdminRoutes;
