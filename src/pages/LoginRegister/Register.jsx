import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useContext } from "react";

const Register = () => {
  const { signInWithGoogle, createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // loging with gmail
  const handleGoogleSignIn = () => {
      signInWithGoogle()
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
    const displayName = form.name.value;
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
        confirmButtonColor: "#E11D48", 
      });
      return;
    }
createUser(email, password, displayName, photoURL)
  .then((result) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Account Created Successfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    // রেজিস্ট্রেশন শেষে হোম পেজে নিয়ে যাবে
    navigate("/");
  })
  .catch((error) => {
    console.log(error.code);
    let msg = "Registration failed!";
    if (error.code === "auth/email-already-in-use") {
      msg = "This email is already registered!";
    }
    Swal.fire({ icon: "error", title: "Oops!", text: msg });
  });
  };

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

        <div className="divider text-xs">Or</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline flex items-center gap-2"
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
