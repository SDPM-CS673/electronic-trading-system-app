import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/api-call.service"; // Ensure the import path is correct

const Login = ({ messages = {}, username = "", setUser = () => {}, setMessage = () => {} }) => {
  const navigate = useNavigate();
  const [loginMessages, setLoginMessages] = useState(messages);
  const [formData, setFormData] = useState({
    username,
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting form with data:", formData);

    // Use the correct backend API URL for login
    post("/login", formData, "http://localhost:3000", 'json') // Ensure the URL matches your backend API
      .then((response) => {
        setLoading(false);
        if (response.success) {
          // Save the token to localStorage or context for authenticated routes
          localStorage.setItem('authToken', response.token);
          const authToken = localStorage.getItem('authToken', response.token);
          console.log("Token being sent:", authToken);
          // Set user state, navigate to account page
          setUser(response.user);
          navigate("/my_account");
        } else {
          // Set notification message when login fails
          setLoginMessages({
            error: [response.message || "Login failed. Please try again."],
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching user data:", error);
        // Set notification message when there is an error
        setLoginMessages({
          error: ["Error fetching user data. Please try again later."],
        });
      });
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-md bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

      {/* Display error messages */}
      {loginMessages?.error?.length > 0 && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded">
          <ul>
            {loginMessages.error.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display success messages */}
      {loginMessages?.success?.length > 0 && (
        <div className="bg-green-500 text-white p-4 mb-4 rounded">
          <ul>
            {loginMessages.success.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-lg font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading} // Disable the button during loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Register here
        </a>
        .
      </p>
    </div>
  );
};

export default Login;
