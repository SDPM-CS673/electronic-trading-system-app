import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { post } from "../services/api-call.service";
import { showMessage } from '../services/message.service';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [messages, setMessages] = useState({ error: [] });

  const handleSubmit = (e) => {
    e.preventDefault();;
    if (password !== confirmPassword) {
      showMessage("Passwords do not match", "info");
    } else {
      const data= {
        "name": username,
        "email": email,
        "password": password
      }
      post("/auth/register", data, "team3").then((result) => {
        showMessage("Registration successful!", "success");
        navigate("/login");
      }, (error) => {
        console.error(error.data);
        showMessage(error.data?.message ? error.data.message : "Registration failed!", "error");
      })
    }
    
  };

  return (
    <div className="container mx-auto mt-20 p-6 max-w-lg bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>
      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            variant="standard"
            label="Username"
            placeholder="Enter your username"
            size="lg"
            value={username}
            id="username"
            name="username"
            autofill="off"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            type="email"
            variant="standard"
            label="Email"
            placeholder="Enter your email"
            size="lg"
            value={email}
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            type="password"
            variant="standard"
            label="Password"
            placeholder="Enter your password"
            size="lg"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <Input
            type="password"
            variant="standard"
            label="Confirm Password"
            placeholder="Confirm your password"
            size="lg"
            value={confirmPassword}
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!username || !email || !password || password !== confirmPassword}
        >
          Register
        </Button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in here
        </Link>
        .
      </p>
    </div>

  );
};

export default Register;
