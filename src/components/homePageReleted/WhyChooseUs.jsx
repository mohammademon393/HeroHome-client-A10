import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaUserCheck } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Secure Service",
      desc: "Your safety is our priority with verified heroes.",
    },
    {
      icon: <FaClock />,
      title: "24/7 Support",
      desc: "We are always here to help you with any issues.",
    },
    {
      icon: <FaUserCheck />,
      title: "Expert Professionals",
      desc: "Top-rated experts for every home need.",
    },
  ];

  return (
    <section className="my-24 px-4">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-slate-800"
        >
          Why Choose <span className="text-rose-600">HomeHero?</span>
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="p-10 bg-white rounded-[32px] shadow-xl shadow-slate-100 border border-slate-50 text-center space-y-4"
          >
            <div className="text-5xl text-rose-600 flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;