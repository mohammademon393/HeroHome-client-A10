import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "My Services", path: "/my-services" },
    { name: "Profile", path: "/profile" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "#", color: "hover:text-blue-500" },
    { icon: <FaXTwitter />, url: "#", color: "hover:text-white" }, // Updated to X
    { icon: <FaLinkedinIn />, url: "#", color: "hover:text-blue-400" },
    { icon: <FaInstagram />, url: "#", color: "hover:text-pink-500" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Hero<span className="text-rose-500">Home</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Connecting you with top-rated local professionals. Secure, fast, and
            reliable services for your home and office.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>
          <ul className="grid grid-cols-1 gap-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-sm hover:text-rose-500 transition-colors duration-300 ease-in-out"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Support</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <p>
              Email: <span className="text-slate-200">help@herohome.com</span>
            </p>
            <p>
              Phone: <span className="text-slate-200">+880 1234 567 890</span>
            </p>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Stay Connected
          </h3>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className={`w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-lg transition-all duration-300 ${social.color} hover:bg-slate-800 border border-slate-800`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HeroHome. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
