import React, { useState } from 'react';

const Login = ({ toggleRegisterModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle the login logic
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.success) {
      setSuccessMessages(result.success);
      // Close modal logic can be here if needed
    } else {
      setErrorMessages(result.error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

      {/* Display error messages */}
      {errorMessages.length > 0 && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          <ul>
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display success messages */}
      {successMessages.length > 0 && (
        <div className="bg-green-500 text-white p-4 rounded mb-4">
          <ul>
            {successMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Login Form */}
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

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <button type="submit" className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>
      </form>

      
    </div>
  );
};

export default Login;
