import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-rose-100 rounded-full blur-[100px] opacity-50"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-50"></div>

      <div className="text-center relative z-10">
        {/* 404 Text Animation */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-[150px] md:text-[200px] font-black text-slate-900 leading-none tracking-tighter"
        >
          4<span className="text-rose-600">0</span>4
        </motion.h1>

        {/* Subtitle with Floating Animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4">
            Oops! Page Not Found
          </h2>
          <p className="text-slate-500 mt-4 max-w-md mx-auto text-lg leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost border-slate-200 hover:bg-slate-100 rounded-2xl px-8 h-14 font-bold text-slate-700 flex items-center gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>

          {/* Home Button */}
          <Link
            to="/"
            className="btn bg-rose-600 hover:bg-rose-700 border-none text-white rounded-2xl px-10 h-14 font-bold shadow-lg shadow-rose-200 flex items-center gap-2 transition-all hover:scale-105"
          >
            <FaHome className="text-xl" /> Back to Home
          </Link>
        </motion.div>

        
      </div>
    </div>
  );
};

export default ErrorPage;
