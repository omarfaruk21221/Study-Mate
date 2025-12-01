import  { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";
import Loading from "../components/Loading";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  // console.log(user);
  const location = useLocation();
  if (loading) {
    return <Loading/>;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate state={location.pathname} to={"/auth-layout"}>
      {children}
    </Navigate>
  );
};

export default PrivetRoutes;
