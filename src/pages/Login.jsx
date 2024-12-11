import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/api-call.service"; // Ensure the import path is correct
import { Input, Button } from "@material-tailwind/react";
import { useAuth } from "../context/AuthContext";  // Import useAuth hook
import { showMessage } from "../services/message.service";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const doLogin = () => {
    post("/auth/login", formData, process.env.TEAM3_API_URL).then((result) => {
      // Save the token in localStorage
      localStorage.setItem("jwtToken", JSON.stringify(result.token));
      delete result.token;
      login(result);
      showMessage("Login successful!", "success");
      navigate("/home");
    }).catch((error) => {
      console.error(error);
      showMessage("Login failed! Please check your credentials.", "error");
    });
  }

  return (
    <div className="container mx-auto mt-20 p-6 max-w-lg bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
      {/* Login Form */}
      {/* <form onSubmit={doLogin}> */}
        <div className="mb-4">
          <Input variant="standard" label="Email" placeholder="Email" size="lg" value={formData.email} id="email" name="email" onChange={handleChange} />
        </div>
        <div className="mb-6">
          <Input type="password" variant="standard" label="Password" placeholder="Password" size="lg" value={formData.password} id="password" name="password" onChange={handleChange} />
        </div>
        <Button type="submit" size="lg" className="w-full" onClick={doLogin} disabled={!formData.email || !formData.password}>LogIn</Button>
      {/* </form> */}

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
