import { FaBars } from 'react-icons/fa';  // Import FaBars for the hamburger icon
import { useAuth } from '../../../context/AuthContext';  // Import useAuth hook
import { Button } from "@material-tailwind/react";

const Header = ({ toggleSidebar }) => {

  const { login, logout, user, isUserLoggedIn } = useAuth();

  return (
    <header className="bg-black shadow-md w-full top-0 fixed "> {/* Fixed header with z-index */}
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex justify-between items-center py-4">

          <div className='flex flex-row gap-2'>
            <button
              className="text-white mr-4"
              onClick={toggleSidebar}
            >
              <FaBars size={30} />
            </button>


            <div className="text-2xl font-bold text-white">
              <a href="/">uniTrade</a>
            </div>

          </div>
          {/* Header Buttons (visible on larger screens) */}
          <div className="space-x-4 lg:flex">
            <Button variant="outlined" className='bg-white' >
              Login
            </Button>
            <Button variant="outlined" className='bg-white'>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
