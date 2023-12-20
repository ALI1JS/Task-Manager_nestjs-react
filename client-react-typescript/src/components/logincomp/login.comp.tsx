// src/components/SignupForm.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { saveTokenInLocalStorage } from '../../utlitis/token_storage';
import { useNavigate } from 'react-router-dom';
import './login.css';


interface LoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://localhost:5000/v1/auth/login", formData)
    .then((res)=>{

        if (res.data.statusCode === 200){
            toast.success(res.data.message);
            saveTokenInLocalStorage(res.data.access_token);
            navigate('/tasks')
        }
        toast.custom(res.data.message)
    })
    .catch((err)=>{
        toast(err.message);
    })
  };

  return (
    <div className="signup-form-container">
      <h2 className="signup-form-title">Login</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="email" className="signup-form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="signup-form-input"
          required
        />

        <label htmlFor="password" className="signup-form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="signup-form-input"
          required
        />
        <button type="submit" className="signup-form-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
