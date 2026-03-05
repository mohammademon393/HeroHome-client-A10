import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    updateProfile(user, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10"
        >
          <div className="flex flex-col items-center text-center">
            {/* User Image */}
            <img
              src={user?.photoURL || "https://i.ibb.co/m9Yhx4n/user-avatar.png"}
              className="w-32 h-32 rounded-full object-cover border-4 border-rose-200"
              alt="user"
            />

            {/* Name */}
            <h2 className="text-3xl font-bold mt-4">
              {user?.displayName || "User Name"}
            </h2>

            {/* Email */}
            <p className="text-slate-500">{user?.email}</p>

            {/* Last Login */}
            <p className="text-sm text-slate-400 mt-1">
              Last Login: {user?.metadata?.lastSignInTime}
            </p>
          </div>

          {/* Update Profile Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="mt-10 grid md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div>
              <label className="font-semibold">Update Name</label>
              <input
                type="text"
                placeholder="Enter new name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full mt-2"
              />
            </div>

            {/* Photo */}
            <div>
              <label className="font-semibold">Update Photo URL</label>
              <input
                type="text"
                placeholder="Enter image URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="input input-bordered w-full mt-2"
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2 text-center mt-4">
              <button className="btn bg-rose-600 text-white px-10">
                Update Profile
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
