import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/bookings?email=${user.email}`)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48", // rose-600
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Booking has been deleted.", "success");
            const remaining = bookings.filter((b) => b._id !== id);
            setBookings(remaining);
          }
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 min-h-[60vh]">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-800">My Bookings</h2>
        <p className="text-slate-500 mt-2">
          Manage your scheduled services and appointments
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto shadow-2xl rounded-3xl border border-slate-100">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-rose-600 text-white text-lg">
              <tr>
                <th className="rounded-tl-3xl">Service</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th className="rounded-tr-3xl text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-rose-50/50 transition-colors border-b border-slate-100"
                >
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-14 h-14">
                          <img
                            src={booking.serviceImage}
                            alt={booking.serviceName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">
                          {booking.serviceName}
                        </div>
                        <div className="text-sm opacity-60">
                          Provider: {booking.providerName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold text-rose-600">${booking.price}</td>
                  <td>{booking.createdAt}</td>
                  <td>
                    <span
                      className={`badge badge-ghost font-bold py-3 px-4 ${
                        booking.status === "pending"
                          ? "text-amber-600 bg-amber-50"
                          : "text-green-600 bg-green-50"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <th className="text-center">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-ghost text-rose-600 hover:bg-rose-100 p-3 rounded-xl"
                      title="Cancel Booking"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl shadow-inner border border-dashed border-slate-300">
          <p className="text-2xl text-slate-400 font-medium italic">
            No bookings found!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
