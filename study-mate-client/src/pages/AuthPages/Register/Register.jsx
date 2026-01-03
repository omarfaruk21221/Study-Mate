import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, setUser, updatedUserSet, logInWithGoogle } =
    use(AuthContext);
  // const { setUser, logInUser,  } = use(AuthContext);
  // const location = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log("data in res form", { name, email, photo, password });
    // ==== password Validation ======
    if (!/(?=.*[A-Z])/.test(password)) {
      return toast.warning(
        "Password must contain at least one uppercase letter."
      );
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return toast.warning(
        "Password must contain at least one lowercase letter."
      );
    }
    if (password.length < 6) {
      return toast.warning("Password must be at least 6 characters long.");
    }
    // ===registar ===
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        updatedUserSet({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/auth-layout");
          })
          .catch((error) => {
            toast(error.message);
            // console.log(error.message);
          });
        toast.success("Register Successfully ✅");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // =====  continoue with google ====
  const handleGoogleLogIn = () => {
    logInWithGoogle()
      .then((userInfo) => {
        const user = userInfo.user;
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <h1 className="text-2xl text-center font-bold text-accent">
            Register your account
          </h1>
          <div className="divider"></div>
          <fieldset className="fieldset">
            {/* user Name  */}
            <label className="label">User Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter Your Name"
              name="name"
              required
            />
            {/* photo  */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input"
              placeholder="Enter Your photo url"
              name="photo"
              required
            />
            {/* Email  */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              required
            />
            {/* passeword */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              required
            />
            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </fieldset>
          <div className="text-accent text-center">
            Have an account ?{" "}
            <span>
              <Link to={"/auth-layout"} className="text-green-500">
                Log In
              </Link>
            </span>
          </div>
          {/* ...google log In ... */}
          <div className=" space-y-2">
            <button
              onClick={handleGoogleLogIn}
              className="btn  btn-secondary w-full p-4"
            >
              <FcGoogle className="text-2xl" /> Log In With Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
