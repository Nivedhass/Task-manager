import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const UpdateData = ({ updateDiv, setUpdateDiv, taskToUpdate, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (taskToUpdate) {
      setTitle(taskToUpdate.title);
      setDesc(taskToUpdate.desc);
    }
  }, [taskToUpdate]);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      alert("Please fill in all fields.");
      return;
    }

    onUpdate({ title, desc });

  
    setTitle(''); 
    setDesc('');
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full ${updateDiv === "hidden" ? "hidden" : ""}`}
      ></div>

      <div
        className={`fixed top-0 left-0 flex items-center justify-center h-screen w-full ${updateDiv === "hidden" ? "hidden" : ""}`}
      >
        <div className='w-2/6 bg-gray-900 p-4 rounded'>
          <div className='flex justify-end p-2'>
            <button className='text-2xl' onClick={() => setUpdateDiv("hidden")}>
              <RxCross2 />
            </button>
          </div>

          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 rounded w-full bg-gray-700 mb-3"
              required
            />
            <textarea
              placeholder="Description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className='px-3 py-2 rounded w-full bg-gray-700 my-3'
              required
            ></textarea>

            <button
              type="submit"
              className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold w-full'
            >
              Update Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateData;




