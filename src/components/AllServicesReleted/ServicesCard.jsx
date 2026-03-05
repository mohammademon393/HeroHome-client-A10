import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ServicesCard = ({ servicesPromise }) => {
  const allServices = use(servicesPromise);
  const [searchText, setSearchText] = useState("");

  // filter services
  const filteredServices = allServices.filter((service) =>
    service.serviceName.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (!allServices || allServices.length === 0) {
    return <p className="text-center text-slate-500">No services found.</p>;
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center mb-16">
        <div className="relative w-full max-w-xl group">
          <input
            type="text"
            placeholder="Search for services (e.g. cleaning, repair)..."
            className="w-full h-16 pl-8 pr-16 rounded-[24px] border-2 border-slate-100 focus:border-rose-600 outline-none transition-all shadow-lg shadow-slate-100 text-lg font-medium"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-rose-600 rounded-2xl text-white shadow-lg shadow-rose-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card bg-white shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:border-rose-200 transition-all rounded-[32px]"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-60">
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-rose-600 font-black shadow-sm border border-rose-50">
                  ${service.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body p-7">
                <h3 className="text-slate-800 text-2xl font-bold group-hover:text-rose-600 transition-colors line-clamp-1">
                  {service.serviceName}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-2 mt-2 leading-relaxed h-10">
                  {service.description}
                </p>

                {/* Provider */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-50">
                  <img
                    src={
                      service.providerImage ||
                      "https://i.ibb.co/m9Yhx4n/user-avatar.png"
                    }
                    className="w-11 h-11 rounded-full object-cover ring ring-rose-50"
                    alt={service.providerName}
                  />

                  <div>
                    <p className="text-sm font-bold text-slate-700 leading-none">
                      {service.providerName}
                    </p>

                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
                      Verified Provider
                    </p>
                  </div>
                </div>

                {/* Button */}
                <div className="card-actions mt-8">
                  <Link
                    to={`/service/${service._id}`}
                    className="btn btn-block bg-white hover:bg-rose-600 border-2 border-rose-600 hover:border-rose-600 text-rose-600 hover:text-white font-black transition-all duration-300 rounded-2xl h-14"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-slate-400 italic">
            No services found for "{searchText}"
          </h3>
        </div>
      )}
    </div>
  );
};

export default ServicesCard;
