import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { retriveToken } from '../../utlitis/token_storage';
import Task from './task.comp';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addTask, deleteTask, putAllTasks, updateTask, filterTasks, filterByStatus } from '../../store/reducers/task-reducer';


const HomePage = () => {

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.TaskReducer.tasks)

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

    const headers = { 'Authorization': retriveToken() }
    axios.post("http://localhost:5000/v1/users/create/task", newTask, { headers })
      .then((res) => {

        dispatch(addTask(res.data));

        // to reset the inputs 
        setNewTask({
          title: '',
          desc: '',
          date: '',
          catogery: '',
        });
      })
      .catch((err) => {
        err.response.data.message.map((mess: any) => toast(mess))
      })
  };


  const handleCatogery = ((e: any) => {
    const headers = { 'Authorization': retriveToken() };
    const params = { catogery: e.target.value };
    axios.get('http://localhost:5000/v1/users/tasks/', {
      headers,
      params
    })
      .then((res) => {
        dispatch(filterTasks(res.data));
      })
      .catch((err) => { toast.error(err.message) })

    if (e.target.value === 'all') {
      axios.get('http://localhost:5000/v1/users/all/tasks', {
        headers
      })
        .then((res) => {
          dispatch(filterTasks(res.data));
        })
        .catch((err) => { toast.error(err.message) })
    }
  })

  const filterTasksByStatus = ((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterByStatus(e.target.value))
  })

  const handleUpdate = (id: number, updatedTitle: string, updatedDescription: string) => {
    const updatedData = { title: updatedTitle, desc: updatedDescription }
    const headers = { 'Authorization': retriveToken() };

    axios.patch(`http://localhost:5000/v1/users/update/task/${id}`, updatedData, { headers })
      .then((res) => {

        dispatch(updateTask(res.data))
        toast.success("Updated task");
      })
      .catch((err) => {
        toast.error(err.message);
      })

  };

  const handleDelete = (id: number) => {

    const headers = { 'Authorization': retriveToken() };
    axios.delete(`http://localhost:5000/v1/users/delete/task/${id}`, { headers })
      .then((res) => {

        dispatch(deleteTask(res.data));
        toast.success("deleted task");

      })
      .catch((err) => { toast.error(err.message) });
  };

  const handleComplete = (id: number) => {
    const headers = { 'Authorization': retriveToken() };
    axios.patch(`http://localhost:5000/v1/users/update/task/${id}`, { status: 'completed' }, { headers })
      .then((res) => {

        dispatch(updateTask(res.data));
        toast.success(`the task completed`);
      })
      .catch((err) => toast.error(err.message));
  };

  const handleUnComplete = (id: number) => {
    const headers = { 'Authorization': retriveToken() };
    axios.patch(`http://localhost:5000/v1/users/update/task/${id}`, { status: "pending" }, { headers })
      .then((res) => {

        dispatch(updateTask(res.data));
        toast.success(`the task unCompleted`);
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {

    axios.get('http://localhost:5000/v1/users/all/tasks', {
      headers: { 'Authorization': retriveToken() },
    })
      .then((res) => {
        dispatch(putAllTasks(res.data));
      })

      .catch((err) => toast.error(err.message))

  }, [dispatch])

  return (
    <div className="container m-auto p-4">

      <div className='relative flex flex-col items-center'>
        <h2 className="text-2xl font-semibold mb-4">Create Task</h2>

        {/* Button to toggle the form visibility */}
        <button
          className="w-52 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowForm(!showForm)}
        >
          Create Task
        </button>

        {/* Form for creating tasks */}
        {showForm && (
          <div className="mt-4 p-4 border w-[80vw] lg:w-[40vw]">
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

      <div className="mt-8 flex flex-col">
        {/* catogery filter dropdown */}
        <div className='flex gap-2'>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catogeryFilter">
              Filter by Catogery
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
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catogeryFilter">
              Filter by Status
            </label>
            <select
              id="catogeryFilter"
              name="catogeryFilter"
              onChange={filterTasksByStatus}
              className="border rounded w-full py-2 px-3"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Uncompleted</option>
            </select>
          </div>
        </div>

        {/* Task list */}
        <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>
        <div className='grid gap-4 grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {
            tasks.length === 0 &&
            <h2 className='font-bold capitalize text-center text-xl'>No Tasks here you can add one</h2>

          }
          {tasks.map((task, index) => (

            <Task key={index} id={task.id} title={task.title} desc={task.desc} date={task.date} status={task.status}
              onUpdate={(id, updatedTitle, updatedDescription) => handleUpdate(id, updatedTitle, updatedDescription)}
              onDelete={() => handleDelete(task.id)}
              handelComplete={() => handleComplete(task.id)}
              handelunComplete={() => { handleUnComplete(task.id) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
