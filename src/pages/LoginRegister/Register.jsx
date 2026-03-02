import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { googleSignIn, createUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // loging with gmail
  const handleGoogleSignIn = () => {
    googleSignIn
      .signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });

        // sweet alert success message
        Swal.fire({
          position: "top-end",
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
          position: "top-end",
          icon: "error",
          title: "Login failed!",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // register form submit handler email and password
  const handleRegister = (e) => {
    e.preventDefault();

    // form data
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password Validation
    const validatePassword = (password) => {
      if (password.length < 6)
        return "Password must be at least 6 characters long!";
      if (!/[A-Z]/.test(password))
        return "Must include at least one uppercase letter (A-Z)!";
      if (!/[a-z]/.test(password))
        return "Must include at least one lowercase letter (a-z)!";
      return null;
    };

    const errorMessage = validatePassword(password);

    if (errorMessage) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: errorMessage,
        confirmButtonColor: "#E11D48", // তোমার rose-500 থিমের সাথে ম্যাচ করবে
      });
      return;
    }

    // register with email and password
    createUser(email, password, name, photoURL)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your account has been created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };;

  return (
    <div className="card my-10 mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-4xl font-bold">Register now!</h1>

        {/* form start */}
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-4 mt-4">
            {" "}
            {/* all fieldset  */}
            {/* name field */}
            <div className="form-control">
              <label className="label font-semibold">Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered"
                placeholder="Name"
                required
              />
            </div>
            {/* photo URL */}
            <div>
              <label className="label font-semibold">Photo URL</label>
              <input
                name="photoURL"
                type="text"
                className="input input-bordered"
                placeholder="Photo URL"
              />
            </div>
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
            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Register now
            </button>
          </div>
        </form>

        <div className="divider text-xs">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 512 512">
            {/* তোমার গুগল লোগো পাথ... */}
          </svg>
          Login with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            className="text-secondary font-semibold hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
