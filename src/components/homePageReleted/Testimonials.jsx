import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Khan",
    role: "Home Owner",
    review:
      "Absolutely amazing experience! The electrician was professional, punctual, and solved the issue in no time.",
  },
  {
    name: "John Carter",
    role: "Apartment Manager",
    review:
      "Booking was seamless and the service quality exceeded expectations. Highly recommended!",
  },
  {
    name: "Nusrat Jahan",
    role: "Verified Client",
    review:
      "I love how fast and reliable the team is. My AC repair was handled perfectly within an hour.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-28 px-6 my-28 overflow-hidden max-w-7xl mx-auto rounded-[60px] bg-slate-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-[60px]"></div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 blur-[140px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-black text-white leading-tight"
        >
          Trusted by <span className="text-rose-500">Happy Clients</span>
        </motion.h2>

        <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
          We take pride in delivering premium home services that our customers
          genuinely love and trust.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-rose-500/40 transition-all duration-500"
            >
              {/* Glow Hover */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-rose-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-rose-500 fill-rose-500"
                  />
                ))}
              </div>

              <p className="text-white/80 text-lg leading-relaxed italic">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-indigo-500 rounded-full"></div>
                <div>
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-slate-400 text-sm">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
