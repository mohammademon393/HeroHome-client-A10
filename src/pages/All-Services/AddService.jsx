import React, { use } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AddService = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const handleAddService = async (e) => {
    e.preventDefault();
    const form = e.target;

    const serviceData = {
      serviceName: form.serviceName.value,
      image: form.image.value,
      price: parseFloat(form.price.value),
      area: form.area.value,
      category: form.category.value,
      description: form.description.value,
      providerName: user?.displayName,
      providerEmail: user?.email,
      providerImage: user?.photoURL,
    };

    try {
      const response = await axios.post(
        "https://homehero-api.vercel.app/services",
        serviceData,
      );

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Successfully Listed!",
          text: "Your new service is now live for customers.",
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
        navigate("/my-services"); // অ্যাড করার পর মাই সার্ভিস পেজে নিয়ে যাবে
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Could not add service. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Add <span className="text-rose-600">New Service</span>
          </h2>
          <p className="text-slate-500 mt-3 text-lg">
            Provide the details below to reach thousands of local customers.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <form onSubmit={handleAddService} className="p-8 md:p-12 space-y-8">
            {/* Grid Layout for Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Service Name */}
              <div className="form-control">
                <label className="label text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Service Name
                </label>
                <input
                  name="serviceName"
                  type="text"
                  placeholder="e.g. Deep Home Cleaning"
                  className="input input-bordered bg-slate-50 border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-300 h-12"
                  required
                />
              </div>

              {/* Service Image URL */}
              <div className="form-control">
                <label className="label text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Service Image URL
                </label>
                <input
                  name="image"
                  type="url"
                  placeholder="Paste high-quality image link"
                  className="input input-bordered bg-slate-50 border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-300 h-12"
                  required
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  placeholder="Set your price"
                  className="input input-bordered bg-slate-50 border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-300 h-12"
                  required
                />
              </div>

              {/* Service Area */}
              <div className="form-control">
                <label className="label text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Service Area
                </label>
                <input
                  name="area"
                  type="text"
                  placeholder="e.g. Dhaka, Gulshan"
                  className="input input-bordered bg-slate-50 border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-300 h-12"
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="form-control md:col-span-2">
                <label className="label text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Category
                </label>
                <select
                  name="category"
                  className="select select-bordered bg-slate-50 border-slate-200 focus:bg-white focus:border-rose-500 transition-all h-12 w-full"
                >
                  <option disabled selected>
                    Select the best category
                  </option>
                  <option>Home Cleaning</option>
                  <option>Electrical Support</option>
                  <option>Plumbing Service</option>
                  <option>Packing & Shifting</option>
                  <option>AC Repair</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-control md:col-span-2">
                <label className="label text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Service Description
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered bg-slate-50 border-slate-200 focus:bg-white focus:border-rose-500 transition-all h-32 leading-relaxed"
                  placeholder="Briefly explain what you offer and what's included..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Provider Preview Card (Visual Only) */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-center gap-4">
              <img
                src={user?.photoURL}
                alt="Provider"
                className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover"
              />
              <div>
                <h4 className="font-bold text-slate-900">
                  {user?.displayName}
                </h4>
                <p className="text-sm text-slate-500">
                  Service Provider (Verified)
                </p>
                <p className="text-xs text-slate-400 mt-1 italic">
                  Listing as: {user?.email}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="btn bg-rose-600 hover:bg-rose-700 border-none text-white px-10 h-14 rounded-xl text-lg font-bold shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-1 active:scale-95 w-full md:w-auto"
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
