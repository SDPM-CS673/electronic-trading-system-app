import React from "react";
import { FaBars, FaTimes, FaHome, FaCogs, FaInfoCircle, FaEnvelope } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-black z-50 transition-width duration-500 ease-in-out ${isOpen ? "w-64" : "w-20"} overflow-hidden`}
    >
      <div className="flex flex-col items-start">
        {/* Button to toggle sidebar */}
        <button
          className="text-white p-4"
          onClick={onClose} // Close the sidebar when clicked
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Sidebar navigation links */}
        <nav className="mt-4">
          <ul>
            <li>
              <a href="#home" className="text-white block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span>Home</span> : <FaHome size={20} />}
              </a>
            </li>
            <li>
              <a href="#services" className="text-white block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span>Services</span> : <FaCogs size={20} />}
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
