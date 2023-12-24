import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Input from '../formcomp/input.comp';
import Button from '../formcomp/button.comp';
import { User } from '../../types/user-types';


const SignupForm = () => {
   
  const navigate =  useNavigate();
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
    linkedinUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5000/v1/auth/signup', formData)
    .then((res)=>{
      if (res.data.statusCode === 200) {
        toast.success(res.data.message);
        console.log(res.data);
        navigate('/')
      }
      toast(res.data.message)
    })
    .catch((err)=>{
        err.response.data.message.map((mess:any)=>toast(mess))
    });
  
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <h2 className="font-bold mb-4 text-lg">Sign Up</h2>
      <form className="flex gap-3 flex-col w-[80vw] md:w-[60vw] lg:w-[30vw] rounded-t-md p-5 bg-white shadow-md">
        <Input type='email' name='email' labelName='email' value={formData.email} onChange={handleInputChange}/>

        <Input type='password' name='password' labelName='password' value={formData.password} onChange={handleInputChange}/>
      <Input type='text' name='linkedinUrl' labelName='linkedinUrl' value={formData.linkedinUrl} onChange={handleInputChange}/>
      <Button name='Sign Up' bg='bg-blue-500' hoverColor='bg-blue-600' onClick={handleSubmit}/>

        <div className='mt-10 flex'>
         <p>You already have account </p>
         <Link className="text-blue-500 px-5 font-bold rounded" to="/">login</Link>
      </div>
      </form>
    </div>
  );
};

export default SignupForm;
