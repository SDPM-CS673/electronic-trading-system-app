import { useState } from "react";
import { post } from "../services/api-call.service";

const Register = ({ messages, username, email }) => {
    const [formData, setFormData] = useState({
    username: username || "",
    email: email || "",
    password: "",
    confirmPassword: "",
    });

    const [registerMessages, setRegisterMessages] = useState(messages || {});

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For example, send data via POST to the backend
    try {
        // Example: Use your post function to send data
        const response = await post(
        "/register",
        formData,
        "http://localhost:3000"
        );
        setRegisterMessages({ success: [`Welcome, ${response.username}!`] });
    } catch (error) {
        setRegisterMessages({ error: [error.message || "Registration failed"] });
    }
};

return (
<div className="container mx-auto mt-10 p-6 max-w-md bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>

    {/* Display error messages */}
    {registerMessages?.error?.length > 0 && (
    <div className="bg-red-500 text-white p-4 mb-4 rounded">
        <ul>
        {registerMessages.error.map((message, index) => (
            <li key={index}>{message}</li>
        ))}
        </ul>
    </div>
    )}

    {/* Register Form */}
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
        <label
        htmlFor="username"
        className="block text-lg font-medium text-gray-700"
        >
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
    <div className="mb-4">
        <label
        htmlFor="email"
        className="block text-lg font-medium text-gray-700"
        >
        Email
        </label>
        <input
        type="email"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email address"
        required
        />
    </div>
    <div className="mb-4">
        <label
        htmlFor="password"
        className="block text-lg font-medium text-gray-700"
        >
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
    <div className="mb-6">
        <label
        htmlFor="confirmPassword"
        className="block text-lg font-medium text-gray-700"
        >
        Confirm Password
        </label>
        <input
        type="password"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Re-enter your password"
        required
        />
    </div>
    <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        Register
    </button>
    </form>

    <p className="mt-4 text-center">
    Already have an account?{" "}
    <a href="/login" className="text-blue-500 hover:underline">
        Log in here
    </a>
    .
    </p>
</div>
  );
};

export default Register;
