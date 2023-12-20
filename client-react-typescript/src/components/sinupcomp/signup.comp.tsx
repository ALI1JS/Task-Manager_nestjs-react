// src/components/SignupForm.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './signup.css';

interface SignupData {
  email: string;
  password: string;
  linkedinUrl: string;
}

const SignupForm = () => {
   
  const navigate =  useNavigate();
  const [formData, setFormData] = useState<SignupData>({
    email: '',
    password: '',
    linkedinUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5000/v1/auth/signup', formData)
    .then((res)=>{
      toast(res.data.message);
       navigate('/')
    })
    .catch((err)=>{
        err.response.data.message.map((mess:any)=>toast(mess))
    });
  
  };

  return (
    <div className="signup-form-container">
      <h2 className="signup-form-title">Sign Up</h2>
      <form className="signup-form">
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

        <label htmlFor="linkedinUrl" className="signup-form-label">
          LinkedIn URL:
        </label>
        <input
          type="text"
          id="linkedinUrl"
          name="linkedinUrl"
          value={formData.linkedinUrl}
          onChange={handleInputChange}
          className="signup-form-input"
          required
        />

        <button onClick={handleSubmit} className="signup-form-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
