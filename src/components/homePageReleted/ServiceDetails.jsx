import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaTag, FaUserShield } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const { user } = useContext(AuthContext);
  const service = useLoaderData();
  const isOwner = user && user.email === service?.providerEmail;

  // destructure the service data if needed
  const {
    image,
    serviceName,
    price,
    area,
    category,
    description,
    providerImage,
    providerName,
    providerEmail,
  } = service;

  // handle booking function

  const handleBooking = async (e) => {
    e.preventDefault();

    const form = e.target;
    const date = form.date.value;
    const instruction = form.instruction.value;

    const bookingData = {
      serviceId: service._id,
      serviceName: service.serviceName,
      price: service.price,
      providerEmail: service.providerEmail,
      providerName: service.providerName,
      userEmail: user?.email,
      serviceImage: service.image,
      date,
      instruction,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/bookings",
        bookingData,
      );

      if (res.data.insertedId) {
        // sweet alert or toast notification can be added here
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        document.getElementById("booking_modal").close();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Card Wrapper */}
        <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Side: Image Section (5 columns) */}
            <div className="lg:col-span-5 relative h-[350px] lg:h-auto">
              <img
                src={image}
                alt={serviceName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm text-rose-600 font-bold flex items-center gap-2">
                  <FaTag /> {category}
                </span>
              </div>
            </div>

            {/* Right Side: Content Section (7 columns) */}
            <div className="lg:col-span-7 p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4">
                  <h1 className="text-4xl font-black text-slate-800 leading-tight">
                    {serviceName}
                  </h1>
                  <div>
                    <p className="text-xl mt-4 text-rose-600">
                      Price: {price}$
                    </p>
                    <p className="text-green-500 text-sm font-medium mt-2 flex items-center gap-2 not-visited:">
                      Location: {area} <FaMapMarkerAlt />
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold">Description:</h3>
                <p className="text-slate-600 text-lg mb-8">{description}</p>

                {/* Provider Profile Card */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={providerImage}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                        alt={providerName}
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        {providerName}{" "}
                        <FaUserShield className="text-blue-500 text-sm" />
                      </h3>
                      <p className="text-slate-500 font-medium">
                        {providerEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {isOwner ? (
                    <button disabled className="btn btn-block bg-gray-300">
                      Book Now
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        document.getElementById("booking_modal").showModal()
                      }
                      className="btn btn-block bg-rose-600 text-white"
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Extra Section: Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
          <div className="p-6">
            <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600 font-bold">
              1
            </div>
            <h4 className="font-bold text-slate-800">Secure Payment</h4>
            <p className="text-slate-500 text-sm">
              Safe and encrypted transactions
            </p>
          </div>
          <div className="p-6 border-x border-slate-200">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold">
              2
            </div>
            <h4 className="font-bold text-slate-800">Expert Provider</h4>
            <p className="text-slate-500 text-sm">
              Top-rated professional service
            </p>
          </div>
          <div className="p-6">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 font-bold">
              3
            </div>
            <h4 className="font-bold text-slate-800">24/7 Support</h4>
            <p className="text-slate-500 text-sm">Always here to help you</p>
          </div>
        </div>
      </div>

      {/* Modal placeholder - we will build this next */}
      {/* --- Booking Modal --- */}
      <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 max-w-2xl bg-white overflow-hidden rounded-3xl border-none">
          {/* Modal Header */}
          <div className="bg-rose-600 p-6 text-white relative">
            <h3 className="font-bold text-2xl text-center">
              Confirm Your Booking
            </h3>
            <p className="text-center text-rose-100 text-sm mt-1">
              Please provide the necessary details to proceed
            </p>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white">
                ✕
              </button>
            </form>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleBooking} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Read Only Field: Service Name */}
              <div className="form-control">
                <label className="label text-slate-500 font-bold text-xs uppercase tracking-widest">
                  Service Name
                </label>
                <input
                  type="text"
                  value={service.serviceName}
                  readOnly
                  className="input input-bordered bg-slate-50 font-semibold text-slate-700 focus:outline-none border-slate-200"
                />
              </div>

              {/* Read Only Field: Service ID */}
              <div className="form-control">
                <label className="label text-slate-500 font-bold text-xs uppercase tracking-widest">
                  Service ID
                </label>
                <input
                  type="text"
                  value={service._id}
                  readOnly
                  className="input input-bordered bg-slate-50 font-mono text-xs text-slate-500 focus:outline-none border-slate-200"
                />
              </div>

              {/* Read Only Field: Price */}
              <div className="form-control">
                <label className="label text-slate-500 font-bold text-xs uppercase tracking-widest">
                  Price ($)
                </label>
                <input
                  type="text"
                  value={service.price}
                  readOnly
                  className="input input-bordered bg-slate-50 font-bold text-rose-600 focus:outline-none border-slate-200"
                />
              </div>

              {/* Read Only Field: User Email */}
              <div className="form-control">
                <label className="label text-slate-500 font-bold text-xs uppercase tracking-widest">
                  Your Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered bg-slate-50 text-slate-600 focus:outline-none border-slate-200"
                />
              </div>

              {/* User Input: Date */}
              <div className="form-control md:col-span-2">
                <label className="label text-rose-600 font-bold text-xs uppercase tracking-widest">
                  Service Taking Date
                </label>
                <input
                  name="date"
                  type="date"
                  required
                  className="input input-bordered border-rose-200 focus:border-rose-500 focus:outline-none"
                />
              </div>

              {/* User Input: Special Instruction */}
              <div className="form-control md:col-span-2">
                <label className="label text-rose-600 font-bold text-xs uppercase tracking-widest">
                  Special Instructions / Address
                </label>
                <textarea
                  name="instruction"
                  placeholder="Ex: House #12, Road #4, Dhanmondi. Please come after 4 PM."
                  className="textarea textarea-bordered border-rose-200 focus:border-rose-500 focus:outline-none h-28 leading-relaxed"
                  required
                ></textarea>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="btn flex-1 bg-rose-600 hover:bg-rose-700 text-white border-none h-14 rounded-xl text-lg font-bold shadow-lg shadow-rose-200 transition-all active:scale-95"
              >
                Purchase Service
              </button>
            </div>
          </form>
        </div>

        {/* Click outside to close */}
        <form
          method="dialog"
          className="modal-backdrop bg-slate-900/40 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceDetails;
