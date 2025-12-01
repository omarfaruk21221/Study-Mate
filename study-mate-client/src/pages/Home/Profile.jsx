// Profile.jsx
import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Profile = () => {
  const { user } = use(AuthContext);
  const { displayName, photoURL, email } = user;
  return (
    <div className="w-2xl min-h-90 my-auto mx-auto bg-base-100 shadow-lg rounded-2xl overflow-hidden">
        <div className="w-fit mx-auto  text-3xl text-base-200 p-3 px-10 rounded-b-2xl bg-primary shadow-xl uppercase "><h1>Profile</h1></div>
      <div className="flex flex-col justify-center items-center px-6 py-4 mt-10">
        <img
          className="w-40 h-40 object-cover rounded-2xl border-2 border-blue-500"
          src={photoURL}
          alt={`${displayName}'s profile`}
        />
        <div className="mx-4 my-10">
          <h1 className="text-2xl font-semibold text-primary text-center border rounded-xl"><span>Name:</span> {displayName}</h1>
          <p className="text-accent"><span>Email: </span>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
