import React, { useContext } from 'react';
import { Link } from 'react-router';
import { NavLink } from "react-router";
import { AuthContext } from '../../context/AuthContext';
import { FaCalendarCheck, FaHome, FaPlusCircle, FaServicestack, FaSignInAlt, FaTasks, FaUserCircle, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  // get user and signOut function
  const { user, signOutUser } = useContext(AuthContext);

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
            <FaHome /> Home
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
            <FaServicestack /> Services
          </NavLink>
        </li>

        {user && (
          <>
            <li>
              <NavLink
                to="/add-service"
                className={({ isActive }) =>
                  isActive
                    ? "text-rose-500 font-bold cursor-default"
                    : "text-gray-700 hover:underline"
                }
              >
                <FaPlusCircle /> Add Service
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-services"
                className={({ isActive }) =>
                  isActive
                    ? "text-rose-500 font-bold cursor-default"
                    : "text-gray-700 hover:underline"
                }
              >
                <FaTasks /> My Services
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
                <FaCalendarCheck /> My Bookings
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
                <FaUserCircle /> Profile
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
          {/* navbar end design */}
          <div className="navbar-end gap-2">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-rose-100"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User"
                      src={
                        user?.photoURL ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-slate-100"
                >
                  <div className="px-4 py-2 border-b mb-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Account
                    </p>
                    <p className="text-sm font-semibold text-rose-600 truncate">
                      {user?.displayName}
                    </p>
                  </div>
                  <li>
                    <Link to="/profile" className="hover:bg-rose-50">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-red-500 hover:bg-red-50 font-semibold"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/register"
                  className="btn btn-outline hover:bg-rose-500 hover:text-white"
                >
                  <FaUserPlus /> Register
                </Link>
                <Link
                  to="/login"
                  className="btn bg-rose-500 hover:bg-rose-600 text-white border-none"
                >
                  <FaSignInAlt /> Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
};

export default Navbar;