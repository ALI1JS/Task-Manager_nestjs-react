import React, { useState } from "react"
import { NewTask } from "../../types/task-types";
import axios from "axios";
import { retriveToken } from "../../utlitis/token_storage";
import toast from "react-hot-toast";
import { useDispatch} from "react-redux";
import { addTask } from "../../store/reducers/task-reducer";
import Input from "../formcomp/input.comp";
import Textarea from "../formcomp/textarea.comp";
import Select from "../formcomp/select.comp";
import Button from "../formcomp/button.comp";



const CreateTask: React.FC = () => {
    
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState<boolean>(false);

    const [newTask, setNewTask] = useState<NewTask>({
        title: '',
        desc: '',
        date: '',
        catogery:''
    });


   const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
     setNewTask({...newTask, [e.target.name]: e.target.value});
     console.log(newTask);
   }
   

   const handleCreateTask = (e: any)=>{

    axios.post('http://localhost:5000/v1/users/create/task', newTask, {
        headers: {'Authorization': retriveToken()}
    })
    .then((res)=>{
            
        if (res.data.statusCode === 200)
        {
            dispatch(addTask(res.data.taskSaved));
            toast(res.data.message);
            setNewTask({
                title:'',
                desc:'',
                date:'',
                catogery:''
            })
        }
         
      else
        toast(res.data.message);
    })
    .catch((err)=>{
        console.log(err);
        err.response.data.message.map((mess:string)=> toast.error(mess));
    })
   }

    return (

        <div className='relative flex flex-col items-center mt-10'>
            <h2 className="text-2xl font-semibold mb-4">Create</h2>

            {/* Button to toggle the form visibility */}
            <Button bg="bg-blue-500" hoverColor="hover:bg-blue-600" name="Create Task" onClick={()=>{setShowForm(!showForm)}}/>

            {/* Form for creating tasks */}
            {showForm && (
                <div className="mt-4 p-4 border w-[80vw] lg:w-[40vw]">

                    <div className="mb-4">
                        <Input labelName="Title" type="text" name= "title" value= {newTask.title} onChange={handleInputChange}/>
                    </div>
                    
                    <div className="mb-4">
                       <Textarea labelName="Descrption" name="desc" value={newTask.desc} onChange={handleInputChange}/>
                    </div>

                    <div className="mb-4">
                      <Input labelName="Due Date" type="date" name= "date" value= {newTask.date} onChange={handleInputChange}/>
                    </div>

                    <div className="mb-4">
                        <Select labelName="Catogery" name="catogery" options={['personal','work','study']} value={newTask.catogery} onChange={handleInputChange}/>
                    </div>

                   <Button bg="bg-green-500" hoverColor="hover:bg-green-600" name="Creat Task" onClick={handleCreateTask}/>
                </div>
            )}
        </div>
    )
}



export default CreateTask;