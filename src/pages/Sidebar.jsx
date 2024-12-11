import { FaBars, FaCogs, FaEnvelope, FaHome, FaInfoCircle, FaTimes } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-black  transition-width duration-500 ease-in-out ${isOpen ? "w-42" : "w-16"} overflow-hidden`}
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
        <nav className="mt-4 w-full">
          <ul>
            <li>
              <a href="/" className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span className="flex flex-row"> <FaHome size={20} /><span className="pl-4">Home</span> </span> : <FaHome size={20} />}
              </a>
            </li>
            <li>
              <a href="/category" className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span className="flex flex-row"> <FaCogs size={20} /><span  className="pl-4">Product</span> </span> : <FaCogs size={20} />}
              </a>
            </li>
            <li>
              <a href="/products" className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span className="flex flex-row"> <FaInfoCircle size={20} /> <span  className="pl-4">Category</span> </span> : <FaInfoCircle size={20} />}
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
                {isOpen ? <span className="flex flex-row"> <FaEnvelope size={20} /><span  className="pl-4">Market Data</span> </span> : <FaEnvelope size={20} />}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;