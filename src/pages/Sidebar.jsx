import {
  FaBars,
  FaChartBar,
  FaExchangeAlt,
  FaHome,
  FaShoppingCart,
  FaTags,
  FaTimes,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-black transition-width duration-300 ease-in-out ${isOpen ? "w-42" : "w-16"} overflow-hidden`}
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
              <Link
                to="/product/list"
                className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700"
              >
                {isOpen ? (
                  <span className="flex flex-row">
                    <FaHome size={20} />
                    <span className="pl-4">Home</span>
                  </span>
                ) : (
                  <FaHome size={20} />
                )}
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link
                  to="/category"
                  className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700"
                >
                  {isOpen ? (
                    <span className="flex flex-row">
                      <FaTags size={20} />
                      <span className="pl-4">Category</span>
                    </span>
                  ) : (
                    <FaTags size={20} />
                  )}
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link
                  to="/product"
                  className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700"
                >
                  {isOpen ? (
                    <span className="flex flex-row">
                      <FaShoppingCart size={20} />
                      <span className="pl-4">Product</span>
                    </span>
                  ) : (
                    <FaShoppingCart size={20} />
                  )}
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/marketdata"
                className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700"
              >
                {isOpen ? (
                  <span className="flex flex-row">
                    <FaChartBar size={20} />
                    <span className="pl-4">Market Data</span>
                  </span>
                ) : (
                  <FaChartBar size={20} />
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/wallet"
                className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700"
              >
                {isOpen ? (
                  <span className="flex flex-row">
                    <FaWallet size={20} />
                    <span className="pl-4">Wallet</span>
                  </span>
                ) : (
                  <FaWallet size={20} />
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/trades/settle"
                className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700"
              >
                {isOpen ? (
                  <span className="flex flex-row">
                    <FaExchangeAlt size={20} />
                    <span className="pl-4">Settle Trade</span>
                  </span>
                ) : (
                  <FaExchangeAlt size={20} />
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/my_account"
                className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700"
              >
                {isOpen ? (
                  <span className="flex flex-row">
                    <FaUser size={20} />
                    <span className="pl-4">Your Account</span>
                  </span>
                ) : (
                  <FaUser size={20} />
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;