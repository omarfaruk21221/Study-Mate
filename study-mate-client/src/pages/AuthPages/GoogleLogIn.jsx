import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogIn() {
  const { logInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // =====  continoue with google ====
  const handleGoogleLogIn = () => {
    logInWithGoogle()
      .then((data) => {
        const user = data.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          uid: user.uid,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user create in the database", res.data);
          // console.log("location state", location.state);
        });

        // setUser(user);
        // navigate(location.state || "/");
        navigate(`${location.state ? location.state : "/"}`);
        // navigate(from, { replace: true });
        console.log(user);
        toast(`Log In Successfully !!! ${user?.displayName} Sir`);
      })
      .catch((error) => {
        // console.log(error.massage);
        toast(error.code, error.message);
      });
  };
  return (
    <div className=" space-y-2">
      <button
        onClick={handleGoogleLogIn}
        className="btn  btn-secondary w-full p-4"
      >
        <FcGoogle className="text-2xl" /> Log In With Google
      </button>
    </div>
  );
}
