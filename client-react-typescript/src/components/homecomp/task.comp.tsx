import React, { useState } from 'react';
import { TaskProps } from '../../types/task-types';
import Input from '../formcomp/input.comp';
import Textarea from '../formcomp/textarea.comp';
import Button from '../formcomp/button.comp';



const Task: React.FC<TaskProps> = ({ id, title, desc, date, status, onUpdate, onDelete, handelComplete, handelunComplete }) => {

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(desc);

  const handleUpdate = () => {
    // Call the onUpdate callback with the updated title and description
    onUpdate(id, updatedTitle, updatedDescription);
    // Exit edit mode after updating
    setIsEditMode(false);
  };



  return (

    <div className="border p-4 mb-4">
      {isEditMode ? (
        // Render form in edit mode
        <div>
          <Input type='text' value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
          <Textarea value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
          <Button name='Save' bg='bg-blue-500' onClick={handleUpdate} />
          <Button name='Cancel' bg='bg-gray-500' onClick={() => setIsEditMode(false)} />
        </div>
      ) : (
        // Render task details
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-2">{desc}</p>
          <p className="text-gray-600 mb-2">{date?.toLocaleString()}</p>
          <span className={`px-2 py-1 text-white rounded ${status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
            {status}
          </span>
          <div className="mt-2">
            <Button name='Update' hoverColor='bg-yellow-600' bg='bg-yellow-500' onClick={() => setIsEditMode(true)} />
            <Button name='Delete' bg='bg-red-500' hoverColor='bg-red-600' onClick={() => onDelete(id)} />
            {status !== 'completed' ? (
              <Button name='Mark as Complete' bg='bg-green-500' hoverColor='bg-green-600' onClick={() => { handelComplete(id) }} />
            ) :
              (
                <Button name='Mark as Complete' bg='bg-green-500' hoverColor='bg-green-600' onClick={() => { handelComplete(id) }} />
              )
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;