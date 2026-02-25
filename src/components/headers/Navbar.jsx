import React, { use } from 'react';
import { Link } from 'react-router';
import { NavLink } from "react-router";
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  // get user and signOut function
  const { user, signOutUser } = use(AuthContext);

  // handle sign out function
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };  

    // links route
    const Links = (
      <>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-rose-500 font-bold cursor-default" // active → no hover/focus
                : "text-gray-700 hover:underline"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-rose-500 font-bold cursor-default"
                : "text-gray-700 hover:underline"
            }
          >
            Services
          </NavLink>
        </li>

        {user && (
          <>
        <li>
          <NavLink
            to="/my-services"
            className={({ isActive }) =>
              isActive
                ? "text-rose-500 font-bold cursor-default"
                : "text-gray-700 hover:underline"
            }
          >
            My Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-service"
            className={({ isActive }) =>
              isActive
                ? "text-rose-500 font-bold cursor-default"
                : "text-gray-700 hover:underline"
            }
          >
            Add Service
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              isActive
                ? "text-rose-500 font-bold cursor-default"
                : "text-gray-700 hover:underline"
            }
          >
            My Bookings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-rose-500 font-bold cursor-default"
                : "text-gray-700 hover:underline"
            }
          >
            Profile
          </NavLink>
        </li>
          </>
        )}

      </>
    );

    return (
      <nav className="bg-base-100 shadow-sm">
        <div className="navbar max-w-7xl mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {Links}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">HeroHome</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{Links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="User avatar" src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn btn-primary btn-outline mr-2"
                >
                  Register
                </Link>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
};

export default Navbar;