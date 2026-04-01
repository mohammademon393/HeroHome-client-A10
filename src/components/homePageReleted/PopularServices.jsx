import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://homehero-api.vercel.app/services")
      .then((res) => {
        setServices(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const SkeletonCard = () => (
    <div className="flex flex-col gap-4 w-full">
      <div className="skeleton h-52 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );

  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-slate-900"
          >
            Popular <span className="text-rose-600">Services</span>
          </motion.h2>
          <p className="text-slate-500 mt-3">
            Discover the most booked services by our community
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : services.map((service) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card bg-white shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:border-rose-200 transition-all"
                >
                  {/* Image Container with Hover Effect */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-rose-600 font-bold shadow-sm">
                      ${service.price}
                    </div>
                  </div>

                  <div className="card-body p-6">
                    <h3 className="card-title text-slate-800 text-xl group-hover:text-rose-600 transition-colors">
                      {service.serviceName}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mt-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Provider Info */}
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50">
                      <img
                        src={
                          service.providerImage ||
                          "https://i.ibb.co/m9Yhx4n/user-avatar.png"
                        }
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
                        alt={service.providerName}
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          {service.providerName}
                        </p>
                        <p className="text-xs text-slate-400 font-medium tracking-wide">
                          Professional Provider
                        </p>
                      </div>
                    </div>

                    <div className="card-actions mt-6">
                      <Link
                        to={`/service/${service._id}`}
                        className="btn btn-block bg-white hover:bg-rose-600 border-2 border-rose-600 hover:border-rose-600 text-rose-600 hover:text-white font-bold transition-all rounded-xl"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* Show All Services Button */}
        <div className="text-center mt-16">
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-wide bg-slate-900 hover:bg-rose-600 text-white border-none h-14 rounded-2xl text-lg font-bold shadow-lg"
            >
              Explore All Services
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
