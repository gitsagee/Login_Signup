import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../src/App.css'
import { handleError, handleSuccess } from '../utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    gender: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirm_password, gender, email } = formData;

    if (password !== confirm_password) {
      handleError("Passwords do not match");
      console.log('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://login-signup-oo8j.onrender.com/signup', { username, password, confirm_password, gender, email });
      console.log(response.data);
      if (response.status === 201) {
        handleSuccess("Account established Successfully  ")
        setTimeout(()=>{navigate('/login');},1000); 
      }
    } catch (error) {
      if(error.response.status==500){handleError("Invalid Credentials , Username and email must be unique")};
      console.error(error);
      
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Signup</button>
        <a href="/">If you already have an account, click here</a>
      </form>
    <ToastContainer/>
    </div>
  );
};

export default Signup;
