import React, { useRef, useEffect } from 'react'; 
import { FaBars, FaTimes, FaHome, FaCogs, FaInfoCircle, FaEnvelope } from 'react-icons/fa'; 

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-19.5 left-0 h-full bg-gray-800 z-30 transition-all duration-300 
        ${isOpen ? "w-64" : "w-20"} overflow-hidden`}  
    >
      <div className="flex flex-col items-start">
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
