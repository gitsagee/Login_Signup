import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../src/App.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/toast";
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return handleError("Both Username and Password are required");
    }
    try {
      const response = await axios.post("https://login-signup-oo8j.onrender.com/login", {
        username,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("email", response.data.email);
        handleSuccess("Successfully logged in");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      handleError(error.response.data);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <a href="/Signup">If you don't have an account, click here</a>
      </form>
    <ToastContainer/>
    </div>
  );
};

export default Login;
