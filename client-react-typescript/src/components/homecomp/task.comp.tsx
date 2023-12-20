import React, { useState } from 'react';

interface TaskProps {
  title: string;
  id:number,
  desc: string;
  date: string;
  status: string;
  onUpdate: (id: number, title: string, description: string) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ id,title, desc, date, status, onUpdate, onDelete, onComplete }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(desc);

  const handleUpdate = () => {
    // Call the onUpdate callback with the updated title and description
    onUpdate(id,updatedTitle, updatedDescription);
    // Exit edit mode after updating
    setIsEditMode(false);
  };

  const handleComplete = () => {
    // Call the onComplete callback
    onComplete(id);
  };

  return (
    <div className="border p-4 mb-4">
      {isEditMode ? (
        // Render form in edit mode
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="border mb-2 w-full p-2"
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="border mb-2 w-full p-2"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 mr-2">
            Save
          </button>
          <button onClick={() => setIsEditMode(false)} className="bg-gray-500 text-white px-4 py-2">
            Cancel
          </button>
        </div>
      ) : (
        // Render task details
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-2">{desc}</p>
          <p className="text-gray-600 mb-2">{date}</p>
          <span className={`px-2 py-1 text-white ${status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
            {status}
          </span> 
          <div className="mt-2">
            <button onClick={() => setIsEditMode(true)} className="bg-yellow-500 text-white px-4 py-2 mr-2">
              Update
            </button>
            <button onClick={() => onDelete(id)} className="bg-red-500 text-white px-4 py-2 mr-2">
              Delete
            </button>
            {status !== 'completed' && (
              <button onClick={handleComplete} className="bg-green-500 text-white px-4 py-2">
                Mark as Complete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;