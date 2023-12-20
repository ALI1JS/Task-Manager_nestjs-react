import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <h2 className="font-bold mb-4 text-lg">Sign Up</h2>
      <form className="flex gap-3 flex-col w-[80vw] md:w-[60vw] lg:w-[30vw] rounded-t-md p-5 bg-white shadow-md">
        <label htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="p-2 text-lg bg-slate-50"
          required
        />

        <label htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="p-2 text-lg bg-slate-50"
          required
        />

        <label htmlFor="linkedinUrl">
          LinkedIn URL:
        </label>
        <input
          type="text"
          id="linkedinUrl"
          name="linkedinUrl"
          value={formData.linkedinUrl}
          onChange={handleInputChange}
          className="p-2 text-lg bg-slate-50"
          required
        />

        <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 font-bold hover:bg-blue-600 rounded">
          Sign Up
        </button>

        <div className='mt-10 flex'>
         <p>You already have account </p>
         <Link className="text-blue-500 px-5 font-bold rounded" to="/">login</Link>
      </div>
      </form>
    </div>
  );
};

export default SignupForm;
