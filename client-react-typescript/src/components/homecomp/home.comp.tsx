import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { retriveToken } from '../../utlitis/token_storage';
import Task from './task.comp';
import {toast} from "react-hot-toast";



const HomePage= () => {

  const [tasks, setTask] = useState([
    {id:1, title: 'Task 1', desc: 'Description for Task 1', date: "MM-DD-YYYY", status: 'pending', catogery: 'personal' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    desc: '',
    date: '',
    catogery: '',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };


  
  const handleCreateTask = async () => {
    const headers = {'Authorization': retriveToken()}
    axios.post("http://localhost:5000/v1/users/create/task", newTask, {headers} )
    .then((res)=>{
        setNewTask({
          title: '',
          desc: '',
          date: '',
          catogery: '',
        });
    })
    .catch((err)=>{
        err.response.data.message.map((mess: any)=>toast(mess))
    })
  };


   const handleCatogery = ((e:any)=>{
       const headers = {'Authorization': retriveToken()};
       const params = {catogery: e.target.value};
      axios.get('http://localhost:5000/v1/users/tasks/',{
        headers,
        params
      }) 
      .then((res)=>{
         setTask(res.data);
      })
      .catch((err)=>{toast.error(err.message)})

      if (e.target.value === 'all')
      {
        axios.get('http://localhost:5000/v1/users/all/tasks',{
        headers
      }) 
      .then((res)=>{
         setTask(res.data);
      })
      .catch((err)=>{toast.error(err.message)})
      }
   })
      


  const handleUpdate = (id: number, updatedTitle: string, updatedDescription: string) => {
     const updatedData = {title: updatedTitle, desc: updatedDescription}
     const headers = {'Authorization': retriveToken()};

      axios.patch(`http://localhost:5000/v1/users/update/task/${id}`, updatedData, {headers})
      .then((res)=>{
          const updatedTasks = tasks.map((task)=> task.id === res.data.id? res.data: task);
          setTask(updatedTasks);
          toast.success("Updated task");
      })
      .catch((err)=>{
         toast.error(err.message);
      })

  };
  
  const handleDelete = (id: number) => {
      console.log(typeof(id));
     const headers = {'Authorization': retriveToken()};
      axios.delete(`http://localhost:5000/v1/users/delete/task/${id}`, { headers})
      .then((res)=>{
        const updatedTasks = tasks.filter((task) => task.id !== res.data.id);
        setTask(updatedTasks);
        toast.success("deleted task");
      })
      .catch((err)=>{toast.error(err.message)});
  };
  
  const handleComplete = (id: number) => {
      const headers = {'Authorization': retriveToken()};
      axios.patch(`http://localhost:5000/v1/users/update/task/${id}`,{status: "complete"},{ headers})
      .then((res)=>{
            const updatedTasks = tasks.map((task)=> task.id === res.data.id? {...task, status: "completed"}:task)
            setTask(updatedTasks);
            toast.success("the task completed");
      })
      .catch((err)=> toast.error(err.message));
  };


  useEffect(()=>{
    axios.get('http://localhost:5000/v1/users/all/tasks', {
      headers: {'Authorization': retriveToken()},
     })
     .then((res)=>{setTask(res.data)})
     .catch((err)=> toast.error(err.message))
  }, [])

  return (
    <div className="container mx-auto p-4">
       <div>
        <h2 className="text-2xl font-semibold mb-4">Create Task</h2>

        {/* Button to toggle the form visibility */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowForm(!showForm)}
        >
          Create Task
        </button>

        {/* Form for creating tasks */}
        {showForm && (
          <div className="mt-4 p-4 border">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="desc"
                value={newTask.desc}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="date"
                value={newTask.date}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catogery">
                catogery
              </label>
              <select
                id="catogery"
                name="catogery"
                value={newTask.catogery}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
              >
                <option value="" disabled>
                  Select a catogery
                </option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
                {/* Add more categories as needed */}
              </select>
            </div>

            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleCreateTask}
            >
              Create Task
            </button>
          </div>
        )}
      </div>

      <div className="mt-8">
        {/* catogery filter dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catogeryFilter">
            Filter by catogery
          </label>
          <select
            id="catogeryFilter"
            name="catogeryFilter"
            onChange={handleCatogery}
            className="border rounded w-full py-2 px-3"
          >
            <option value="all">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
          </select>
        </div>

        {/* Task list */}
        <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>
        {tasks.map((task, index) => (

          <Task key={index} id ={task.id} title={task.title} desc={task.desc} date={task.date} status={task.status}
          onUpdate={(id, updatedTitle, updatedDescription) => handleUpdate(id, updatedTitle, updatedDescription)}
          onDelete={(id) => handleDelete(task.id)}
          onComplete={(id) => handleComplete(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
