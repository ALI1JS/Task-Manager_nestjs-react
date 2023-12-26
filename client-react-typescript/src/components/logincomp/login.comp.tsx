import axios from 'axios';
import React, { createContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { saveTokenInLocalStorage } from '../../utlitis/token_storage';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Input from '../formcomp/input.comp';
import Button from '../formcomp/button.comp';
import { User } from '../../types/user-types';
import { useDispatch} from 'react-redux';
import { RootState } from '../../store/store';
import { setUser } from '../../store/reducers/user-reducer';

export const UserContext = createContext({
  username:'',
  email:'',
  password:'',
  avatar:'',
  linkedinUrl:''
});

const LoginForm:React.FC = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
             dispatch(setUser(res.data.user));
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

        <Input type='email' labelName='email' name='email' value={formData.email} onChange={handleInputChange}/>
        <Input type='password' labelName='password' name='password' value={formData.password} onChange={handleInputChange}/>

        <Button name="Login" bg='bg-blue-500' hoverColor='bg-blue-600' onClick={handleSubmit}/>

        <div className='mt-10 flex'>
         <p>you haven't accoutn you can create one</p>
         <Link className="text-blue-500 px-5 font-bold rounded" to="/signup">sign up</Link>
      </div>
      </form>
      
    </div>
  );
};

export default LoginForm;
