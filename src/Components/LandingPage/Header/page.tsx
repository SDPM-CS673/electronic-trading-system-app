// components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-black shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-300">
            <Link href="/">uniTrade</Link>
          </div>
           
          <nav className="flex space-x-4">
           
          </nav>
          <div className="space-x-4">
            <Link href="/login">
              <button className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
