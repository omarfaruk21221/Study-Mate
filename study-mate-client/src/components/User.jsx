import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const User = () => {
  const { user, logOut } = use(AuthContext);
  // console.log(user.photoURL)
  const handleLogout = () => {
    logOut()
      .then((UserInfo) => {
        const user = UserInfo.data;
        // console.log(result);
        toast.success("Log Out Successfully", user.displayName);
      })
      .catch((error) => {
        // console.log(error.massage);
        toast.error(error.massage);
      });
  };
  //   ==== user Link ====
  const Links = (
    <>
      <Link
        to={"/profile"}
        className="btn btn-outline border border-primary hover:btn-primary hover:text-white"
      >
        Profile
      </Link>
      <Link
        onClick={handleLogout}
        className="btn btn-outline border border-primary hover:btn-primary hover:text-white "
      >
        Log Out
      </Link>
    </>
  );

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-15 rounded-full border-2 border-primary object-cover">
          <img
            className="object-cover"
            t={user.displayName}
            src={user.photoURL}
          />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-10 mt-3 w-52 p-2 shadow space-y-2"
      >
        {Links}
      </ul>
    </div>
  );
};

export default User;
