import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { saveTokenInLocalStorage } from '../../utlitis/token_storage';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
        else
          toast.error(res.data.message)
    })
    .catch((err)=>{
        toast(err.message);
    })
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <h2 className="font-bold mb-4 text-lg">Login</h2>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col w-[80vw] md:w-[60vw] lg:w-[30vw] rounded-t-md p-5 bg-white shadow-md">
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
        <button type="submit" className="bg-blue-500 text-white py-2 font-bold hover:bg-blue-600 rounded">
          Login
        </button>

        <div className='mt-10 flex'>
         <p>you haven't accoutn</p>
         <Link className="text-blue-500 px-5 font-bold rounded" to="/signup">sign up</Link>
      </div>
      </form>
      
    </div>
  );
};

export default LoginForm;
