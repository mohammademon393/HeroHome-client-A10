import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { serviceCategories } from "../../constants/serviceCategories";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // মডাল এবং এডিট ডাটার জন্য স্টেট
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = useCallback(async () => {
    if (!user?.email) {
      setServices([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://homehero-api.vercel.app/services?email=${encodeURIComponent(user.email)}`,
      );
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch {
      setError("Could not load your services. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // ১. মডাল ওপেন করার ফাংশন
  const handleEditClick = (service) => {
    setSelectedService(service);
    document.getElementById("update_modal").showModal();
  };

  // ২. আপডেট সাবমিট করার ফাংশন
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedInfo = {
      serviceName: form.serviceName.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      image: form.image.value,
      description: form.description.value,
      providerName: user?.displayName,
      providerEmail: user?.email,
    };

    try {
      const response = await axios.put(
        `https://homehero-api.vercel.app/services/${selectedService._id}`,
        updatedInfo,
      );
      if (response.data.modifiedCount > 0) {
        document.getElementById("update_modal").close();
        await fetchServices();
        Swal.fire("Updated!", "Service details updated successfully", "success");
      }
    } catch {
      Swal.fire("Update failed", "Could not update this service. Please try again.", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `https://homehero-api.vercel.app/services/${id}`,
          );
          if (response.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Service removed.", "success");
            setServices((currentServices) =>
              currentServices.filter((service) => service._id !== id),
            );
          }
        } catch {
          Swal.fire("Delete failed", "Could not remove this service. Please try again.", "error");
        }
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-bars loading-lg text-rose-600"></span>
      </div>
    );

  if (error) {
    return (
      <div className="max-w-7xl mx-auto my-16 px-4 text-center" role="alert">
        <p className="text-rose-700">{error}</p>
        <button onClick={fetchServices} className="btn mt-4">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font-black text-slate-900">
          My <span className="text-rose-600">Services</span>
        </h2>
        <Link
          to="/add-service"
          className="btn bg-slate-900 text-white rounded-2xl px-8 hover:bg-rose-600 border-none"
        >
          <FaPlus /> Add New Services
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="py-16 text-center text-slate-500">You have not listed any services yet.</p>
      ) : (
      <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100">
        <table className="table w-full">
          <thead className="bg-slate-50">
            <tr className="text-slate-400 uppercase text-xs">
              <th className="py-6 px-10">Service</th>
              <th>Category</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service._id}
                className="hover:bg-rose-50/20 transition-all"
              >
                <td className="py-6 px-10 font-bold text-slate-800 flex items-center gap-4">
                  <img
                    src={service.image}
                    alt={service.serviceName}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  {service.serviceName}
                </td>
                <td>
                  <span className="badge badge-ghost rounded-lg">
                    {service.category}
                  </span>
                </td>
                <td className="font-bold text-lg text-slate-900">
                  ${service.price}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleEditClick(service)}
                    className="btn btn-ghost text-blue-600"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="btn btn-ghost text-rose-600"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* --- UPDATE MODAL --- */}
      <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-2xl rounded-[32px] p-10 bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6">
              <FaTimes />
            </button>
          </form>

          <h3 className="text-3xl font-black text-slate-900 mb-8">
            Update <span className="text-rose-600">Service</span>
          </h3>

          {selectedService && (
            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
            >
              <div className="form-control">
                <label className="label font-bold text-slate-700">
                  Service Name
                </label>
                <input
                  type="text"
                  name="serviceName"
                  defaultValue={selectedService.serviceName}
                  className="input input-bordered rounded-xl focus:border-rose-600"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-slate-700">Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  defaultValue={selectedService.price}
                  className="input input-bordered rounded-xl focus:border-rose-600"
                  required
                />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label font-bold text-slate-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedService.image}
                  className="input input-bordered rounded-xl focus:border-rose-600"
                  required
                />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label font-bold text-slate-700">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={selectedService.category}
                  className="select select-bordered rounded-xl"
                  required
                >
                  {serviceCategories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-control md:col-span-2">
                <label className="label font-bold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedService.description}
                  className="textarea textarea-bordered rounded-xl h-24"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn bg-rose-600 hover:bg-rose-700 text-white border-none rounded-2xl md:col-span-2 mt-4 h-14 text-lg"
              >
                Update Service Information
              </button>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyServices;
