import { FaBars } from 'react-icons/fa';  // Import FaBars for the hamburger icon

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-black shadow-md w-full top-0 fixed z-50"> {/* Fixed header with z-index */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Hamburger Menu (always visible and leftmost) */}
          <button 
            className="text-white mr-4" 
            onClick={toggleSidebar}  
          >
            <FaBars size={30} />
          </button>

          {/* Logo - Moves to the right of the hamburger */}
          <div className="text-2xl font-bold text-gray-300">
            <a href="/">uniTrade</a>
          </div>

          {/* Header Buttons (visible on larger screens) */}
          <div className="space-x-4 hidden lg:flex">
            <button className="text-white bg-primary px-4 py-2 rounded-md hover:bg-secondary">
              Login
            </button>
            <button className="text-primary border border-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
