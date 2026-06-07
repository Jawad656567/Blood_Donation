import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaBullhorn,
  FaEnvelope,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome size={18} />, label: "Home", path: "/" },
    { icon: <FaInfoCircle size={18} />, label: "About", path: "/about" },
    { icon: <FaSearch size={18} />, label: "Find Donors", path: "/find" },
    { icon: <FaBullhorn size={18} />, label: "Campaigns", path: "/campaigns" },
    { icon: <FaEnvelope size={18} />, label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full px-4 py-2 flex items-center justify-between bg-white shadow-md shadow-black/10 relative">
      {/* Logo */}
      <Link to="/home" className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden">
          <img
            src="blood.svg"
            alt="Blood Donation"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900">
          BloodLink
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="flex items-center space-x-8 px-6 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex flex-col items-center group transition-all duration-300"
            >
              <span className="text-gray-500 group-hover:text-red-600 group-hover:scale-110 transition-all">
                {item.icon}
              </span>

              <span className="text-[11px] text-gray-500 group-hover:text-red-600">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center lg:gap-2">
        {/* Dark / Light Icon */}
        <button className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:opacity-70">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <Link
          to="/register-donor"
          className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <FaHeart />
          Register as Donor
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-white shadow"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 p-5 border-b">
          <div className="w-12 h-12 rounded-xl overflow-hidden">
            <img
              src="blood.svg"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="font-bold text-lg text-gray-900">
            BloodLink
          </h2>
        </div>

        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5"
        >
          <FaTimes size={20} />
        </button>

        {/* Sidebar Links */}
        <div className="mt-4">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 w-full px-6 py-4 hover:bg-red-50 transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="px-6 mt-5">
            <Link
              to="/register-donor"
              onClick={() => setMenuOpen(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <FaHeart />
              Register as Donor
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;