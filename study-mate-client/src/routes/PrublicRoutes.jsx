import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import FindParters from "../pages/FindPartners/FindParters";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivetRoutes from "./PrivetRoutes";
import CreateProfile from "../pages/CreatePartnerProfile/CreatePartnerProfile";
import Profile from "../pages/Home/Profile";
import PartnerDetails from "../pages/PartnerDetails/PartnerDetails";
import CreatePartnerProfile from "../pages/CreatePartnerProfile/CreatePartnerProfile";
import MyConnection from "../pages/MyConnections/MyConnection";
import Error404 from "../pages/ErrorPages/error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        // path:'/home',
        element: <Home />,
      },
      {
        path: "/find-partners",
        element: <FindParters />,
      },
      {
        path: "/my-connection",
        element: (
          <PrivetRoutes>
            <MyConnection />
          </PrivetRoutes>
        ),
      },
      {
        path: "/partner-details/:id",
        element: (
          <PrivetRoutes>
            <PartnerDetails />
          </PrivetRoutes>
        ),
      },
      {
        path: "/Create-Partner-Profile",
        element: (
          <PrivetRoutes>
            <CreatePartnerProfile />
          </PrivetRoutes>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/auth-layout",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        // path: "/auth-layout/login",
        element: <Login />,
      },
      {
        path: "/auth-layout/register",
        element: <Register />,
      },
    ],
  },
  {
    path:'/*',
    element:<Error404/>
  }
]);
export default router;
