import { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser, logInUser, logInWithGoogle } = use(AuthContext);
  // console.log(user)
  const navigate = useNavigate();
  const location = useLocation();
  const hangleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    logInUser(email, password)
      .then((UserContainer) => {
        const user = UserContainer.user;
        navigate(`${location.state ? location.state : "/"}`);
        // console.log(user);
        toast(`Log In Successfully !!! ${user?.displayName}`);
      })
      .catch((error) => {
        // console.log(error.massage);
        toast(error.code, error.message);
      });
  };
  const handleGoogleLogIn = () => {
    logInWithGoogle()
      .then((userInfo) => {
        const user = userInfo.user;
        // setUser(user);
        navigate(`${location.state ? location.state : "/"}`);
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
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-2xl text-center font-bold uppercase ">
              Log In
            </h1>
            {/* <span className="divider"></span> */}
            <form onSubmit={hangleLogIn}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-primary mt-4">Login</button>
              </fieldset>
            </form>
            {/* ...... resiter page link .....  */}
            <div className="text-accent text-center my-2">
              Don't h Have an account ?{" "}
              <span>
                <Link to={"/auth-layout/register"} className="text-red-500">
                  Resigser
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
