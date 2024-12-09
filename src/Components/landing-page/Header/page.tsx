import { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../../../pages/Login'; 
import Register from '../../../pages/Register';


const Header = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalOpen(!isLoginModalOpen);
  };

  const toggleRegisterModal = () => {
    setRegisterModalOpen(!isRegisterModalOpen);
  };

  return (
    <header className="bg-black shadow-md w-full top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-300">
            <a href="/">uniTrade</a>
          </div>

          <div className="space-x-4">
            <button
              className="text-white bg-primary px-4 py-2 rounded-md hover:bg-secondary"
              onClick={toggleLoginModal}
            >
              Login
            </button>
            <button
              className="text-primary border border-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white"
              onClick={toggleRegisterModal}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96 relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={toggleLoginModal}
            >
              X
            </button>
            <Login closeModal={toggleLoginModal} />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96 relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={toggleRegisterModal}
            >
              X
            </button>
            <Register closeModal={toggleRegisterModal} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
