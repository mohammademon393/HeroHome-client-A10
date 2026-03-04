import React from "react";
// Swiper Components & Styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070",
      title: "Expert Home Cleaning Services",
      description:
        "Experience a spotless home with our professional cleaners. Trusted by thousands of families.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069",
      title: "Reliable Electrical Solutions",
      description:
        "From wiring to appliance repair, our certified electricians are ready to help 24/7.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070",
      title: "Professional Plumbing Support",
      description:
        "Fast and efficient plumbing services to fix leaks and install new fixtures in no time.",
    },
  ];

  return (
    <div className="relative h-[500px] md:h-[650px] w-full overflow-hidden max-w-7xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black/50 flex items-center px-6 md:px-20">
                <div className="max-w-2xl text-white">
                  {/* Framer Motion for Text Animation */}
                  <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-200 mb-8"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Link
                      to="/services"
                      className="btn bg-rose-600 hover:bg-rose-700 border-none text-white px-8 h-14 rounded-lg text-lg font-bold shadow-xl transition-all"
                    >
                      Explore Services
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper Pagination (Optional) */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #E11D48 !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          transform: scale(0.6);
        }
      `}</style>
    </div>
  );
};

export default Hero;
