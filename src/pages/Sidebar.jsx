import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaHome, FaCogs, FaInfoCircle, FaEnvelope } from "react-icons/fa"; // Corrected FaServices to FaCogs

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);

  // Close the sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose(); // Close sidebar when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-gray-800 z-50 transition-all duration-300 ${isOpen ? "w-64" : "w-20"} overflow-hidden`}
    >
      <div className="flex flex-col items-start">
        {/* Sidebar Header: Toggle Button */}
        <button
          className="text-white p-4"
          onClick={onClose}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Navigation Links */}
        <nav className="mt-4">
          <ul>
            <li>
              <a href="#home" className="text-white block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span>Home</span> : <FaHome size={20} />}
              </a>
            </li>
            <li>
              <a href="#services" className="text-white block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span>Services</span> : <FaCogs size={20} />} {/* Changed FaServices to FaCogs */}
              </a>
            </li>
            <li>
              <a href="#about" className="text-white block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span>About</span> : <FaInfoCircle size={20} />}
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span>Contact</span> : <FaEnvelope size={20} />}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
