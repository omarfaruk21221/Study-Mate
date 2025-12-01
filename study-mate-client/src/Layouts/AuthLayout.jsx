import React from "react";
import Navber from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div>
      <nav>
        <Navber />
      </nav>
      <main className="flex flex-col min-h-screen w-10/12 mx-auto">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLayout;
