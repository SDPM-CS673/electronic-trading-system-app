import React, { useState } from 'react';

const Register = ({ toggleLoginModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messages, setMessages] = useState({ error: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">Register</h2>

      {/* Error messages */}
      {messages.error.length > 0 && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          <ul>
            {messages.error.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mt-4">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <button type="submit" className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Register
        </button>
      </form>


    </div>
  );
};

export default Register;
