import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signInWithGoogle, signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });

        // sweet alert success message
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.message);
        // sweet alert error message
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Login failed!",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Login failed!",
          text: "Login failed! Please check your email and password and try again.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="card my-10 mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-4xl font-bold">Login now!</h1>
        {/* form start */}
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-4 mt-4">
            {" "}
            {/* all fieldset  */}
            {/* email fields */}
            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered"
                placeholder="Email"
                required
              />
            </div>
            {/* password field */}
            <div className="form-control">
              <label className="label font-semibold">Password</label>
              <input
                name="password"
                type="password"
                className="input input-bordered"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Login
            </button>
          </div>
        </form>

        <div className="divider my-[-3px]">Or</div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <p>
          You don't have an account?{" "}
          <Link
            className="text-secondary font-semibold hover:underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
