import { FaBars } from 'react-icons/fa';  // Import FaBars for the hamburger icon
import { useAuth } from '../context/AuthContext';  // Import useAuth hook
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { showMessage } from "../services/message.service"

const Header = ({ toggleSidebar }) => {
  const naviagte = useNavigate();
  const { login, logout, user, isLoggedIn } = useAuth();

  const goToLogIn = () => {
    naviagte('/login');
  }

  const doLogOut = () => {
    localStorage.removeItem('jwtToken');
    logout();
    naviagte('/');
    showMessage('Logged out successfully', 'success');
  }

  const goToSignUp = () => {
    naviagte('/register');
  }
  return (
    <header className="bg-black shadow-md w-full top-0 fixed "> {/* Fixed header with z-index */}
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex justify-between items-center py-4">

          <div className='flex flex-row gap-2'>
            {isLoggedIn &&
              <button
                className="text-white mr-4"
                onClick={toggleSidebar}
              >
                <FaBars size={30} />
              </button>}


            <div className="text-2xl font-bold text-white">
              <a href="/">uniTrade</a>
            </div>

          </div>
          {/* Header Buttons (visible on larger screens) */}
          <div className="space-x-4 lg:flex">
            {!isLoggedIn &&
              <Button variant="outlined" onClick={goToLogIn} className='bg-white' >
                Login
              </Button>}
            {!isLoggedIn && <Button variant="outlined" onClick={goToSignUp} className='bg-white'>
              Sign Up
            </Button>}
            {
              isLoggedIn && <Button variant="outlined" onClick={doLogOut} className='bg-red-600 text-white'>
                Logout
              </Button>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
