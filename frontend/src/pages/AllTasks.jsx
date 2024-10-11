import React, { useState, useEffect } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import Cards from '../components/Home/Cards';
import InputData from '../components/Home/InputData';
import UpdateData from '../components/Home/UpdateData';
import axios from 'axios';

const AllTasks = () => {
    const [inputDiv, setInputDiv] = useState("hidden");
    const [updateDiv, setUpdateDiv] = useState("hidden");
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');

    // Function to get headers
    const getHeaders = () => {
        return {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
        };
    };

    // Function to fetch tasks
    const fetchTasks = async () => {
        try {
            const headers = getHeaders();
            const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
            const user = response.data.user;
            setData(user.tasks);
            setUsername(user.username);
            setEmail(user.email);
        } catch (error) {
            console.error("Error fetching tasks:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

 
const handleTaskSubmit = async (task) => {
    const headers = getHeaders();

    
    await fetchTasks();

    const isDuplicate = data.some(existingTask => 
        existingTask.title === task.title && existingTask.desc === task.desc
    );

    if (isDuplicate) {
        alert("Task already exists. Please use a different title or description.");
        return; 
    }


    try {
        const response = await axios.post("http://localhost:1000/api/v2/create-task", task, { headers });
        setData(prevTasks => [...prevTasks, { ...task, _id: response.data._id, complete: false }]);
    } catch (error) {
        console.error("Error creating task:", error.response ? error.response.data : error.message);
    }

    setInputDiv("hidden");
};


  
    const handleTaskDelete = async (taskId) => {
        const headers = getHeaders();

        try {
            await axios.delete(`http://localhost:1000/api/v2/delete-task/${taskId}`, { headers });
            setData(prevTasks => prevTasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error.response ? error.response.data : error.message);
        }
    };

  
    const handleTaskUpdate = async (updatedTask) => {
        const headers = getHeaders();

        try {
            await axios.put(`http://localhost:1000/api/v2/update-task/${taskToUpdate._id}`, updatedTask, { headers });
            setData(prevTasks => prevTasks.map(task =>
                task._id === taskToUpdate._id ? { ...task, title: updatedTask.title, desc: updatedTask.desc } : task
            ));
            setUpdateDiv("hidden");
            setTaskToUpdate(null);
            setTaskTitle('');
            setTaskDesc('');
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error.response ? error.response.data : error.message);
        }
    };

   
    const handleTaskCompletionToggle = async (taskId, currentStatus) => {
        const headers = getHeaders();

        try {
            const response = await axios.put(`http://localhost:1000/api/v2/update-task/${taskId}`, { complete: !currentStatus }, { headers });
            setData(prevTasks => prevTasks.map(task =>
                task._id === taskId ? { ...task, complete: response.data.complete } : task
            ));
        } catch (error) {
            console.error("Error updating task completion status:", error.response ? error.response.data : error.message);
        }
    };

 
    const handleEditTask = (task) => {
        setTaskToUpdate(task);
        setTaskTitle(task.title);
        setTaskDesc(task.desc);
        setUpdateDiv("fixed");
    };

    return (
        <div>
            <div className='w-full flex justify-end px-4 py-2'>
                <button onClick={() => setInputDiv("fixed")}>
                    <IoIosAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
                </button>
            </div>

            {}
            <div
                className="task-container scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                style={{ maxHeight: '70vh', overflowY: 'auto' }}
            >
                <Cards
                    home={"true"}
                    setInputDiv={setInputDiv}
                    tasks={data}
                    onDelete={handleTaskDelete}
                    setTasks={setData}
                    onEdit={handleEditTask}
                />
            </div>

            <InputData InputDiv={inputDiv} setInputDiv={setInputDiv} onSubmit={handleTaskSubmit} />
            <UpdateData updateDiv={updateDiv} setUpdateDiv={setUpdateDiv} taskToUpdate={taskToUpdate} onUpdate={handleTaskUpdate} />

            <style jsx>{`
                /* Custom scrollbar styles */
                .task-container::-webkit-scrollbar {
                    width: 8px;
                }

                .task-container::-webkit-scrollbar-track {
                    background: #f1f5f9;
                }

                .task-container::-webkit-scrollbar-thumb {
                    background-color: #6b7280; /* scrollbar thumb color */
                    border-radius: 10px;
                }

                .task-container::-webkit-scrollbar-thumb:hover {
                    background-color: #4b5563; /* scrollbar thumb hover color */
                }
            `}</style>
        </div>
    );
};

export default AllTasks;

















