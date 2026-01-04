import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import FindParters from "../pages/Home/FindPartners/FindParters";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/AuthPages/Login/Login";
import Register from "../pages/AuthPages/Register/Register";
import PrivetRoutes from "./PrivetRoutes";
// import CreateProfile from "../pages/CreatePartnerProfile/CreatePartnerProfile";
import Profile from "../pages/Home/Profile";
import PartnerDetails from "../pages/PartnerDetails/PartnerDetails";
import CreatePartnerProfile from "../pages/Home/CreatePartnerProfile/CreatePartnerProfile";
import MyConnection from "../pages/Home/MyConnections/MyConnection";
import Error404 from "../components/Share/ErrorPages/Error404";
import Contact from "../pages/Home/Contact";
import Blog from "../pages/Home/Blog/Blog";
import BlogDetail from "../pages/Home/Blog/BlogDetail";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashBoard from "../pages/DashboardPages/DashBoard";
import ProfilePage from "../pages/DashboardPages/ProfilePage";
import UserRoutes from "./UserRoutes";
import ManageUsers from "../pages/DashboardPages/ManageUsers";
import AdminRoutes from "./AdminRoutes";
import ManageBlogs from "../pages/DashboardPages/ManageBlogs";
// import Profile from "../pages/DashboardPages/Profile ";

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
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "/find-partners",
        element: <FindParters />,
      },
      {
        path: "/Create-Profile",
        element: (
          <UserRoutes>
            <CreatePartnerProfile />
          </UserRoutes>
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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivetRoutes>
            <DashboardLayout />
          </PrivetRoutes>
        ),
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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "my-profile",
        element: <ProfilePage />,
      },
      {
        path: "Create-Profile",
        element: (
          <UserRoutes>
            <CreatePartnerProfile />
          </UserRoutes>
        ),
      },
      {
        path: "my-connection",
        element: (
          <UserRoutes>
            <MyConnection />
          </UserRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoutes>
            <ManageUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-blogs",
        element: (
          <AdminRoutes>
            <ManageBlogs />
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <Error404 />,
  },
]);
export default router;
