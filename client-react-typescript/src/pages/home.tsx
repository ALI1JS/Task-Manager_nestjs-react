import axios from 'axios';
import React, { useEffect} from 'react';
import { retriveToken } from '../utlitis/token_storage';
import Task from '../components/homecomp/task.comp';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { deleteTask, putAllTasks, updateTask, filterTasks, filterByStatus } from '../store/reducers/task-reducer';
import CreateTask from '../components/homecomp/creat-task.comp';
import Select from '../components/formcomp/select.comp';



const HomePage = () => {

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.TaskReducer.tasks)


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

  const filterTasksByStatus = ((e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
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

      <CreateTask/>
      
      <div className="mt-8 flex flex-col">
        {/* catogery filter dropdown */}
        <div className='flex gap-2'>
          <div className="">
            <Select labelName=' Filter by Catogery' name='catogery' value='' options={['all','personal','work','study']} onChange={handleCatogery}/>
          </div>
          <div className="">
            <Select labelName='Filter by Status' name='catogeryFilter' options={['all','completed','pending']} onChange={filterTasksByStatus}/>
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
