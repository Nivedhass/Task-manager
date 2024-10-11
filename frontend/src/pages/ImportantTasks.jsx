import React, { useEffect, useState } from 'react';
import Cards from '../components/Home/Cards'; 
import UpdateData from '../components/Home/UpdateData'; 
import axios from 'axios';

const ImportantTasks = () => {
    const [tasks, setTasks] =  useState([]); 
    const [editingTask, setEditingTask] = useState(null); 
    const [inputDiv, setInputDiv] = useState(null); 
    const [updateDiv, setUpdateDiv] = useState("hidden"); 
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchImportantTasks = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v2/get-imp-tasks", { headers });
                setTasks(response.data.data); 
            } catch (error) {
                console.error("Error fetching important tasks:", error.response ? error.response.data : error.message);
            }
        };

        fetchImportantTasks();
    }, []);

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, { headers });
            setTasks((prevTasks) => prevTasks.filter(task => task._id !== id)); 
        } catch (error) {
            console.error("Error deleting task:", error.response ? error.response.data : error.message);
        }
    };

   
    const handleComplete = async (id, currentComplete) => {
        const updatedTask = { complete: !currentComplete }; 

        try {
            await axios.put(`http://localhost:1000/api/v2/update-task/${id}`, updatedTask, { headers });
            setTasks(prevTasks =>
                prevTasks.map(task => 
                    task._id === id ? { ...task, complete: !currentComplete } : task 
                )
            );
        } catch (error) {
            console.error("Error completing task:", error.response ? error.response.data : error.message);
        }
    };

    
    const handleEdit = (task) => {
        setEditingTask(task);
        setTaskTitle(task.title);
        setTaskDesc(task.desc);
        setUpdateDiv("fixed"); 
    };

    
    const handleTaskUpdate = async (updatedTask) => {
        try {
            await axios.put(`http://localhost:1000/api/v2/update-task/${editingTask._id}`, updatedTask, { headers });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === editingTask._id ? { ...task, title: updatedTask.title, desc: updatedTask.desc } : task
                )
            );
            setEditingTask(null); 
            setUpdateDiv("hidden"); 
            setTaskTitle(''); 
            setTaskDesc(''); 
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    
    const handleToggleImportant = async (id, currentImportance) => {
        const updatedTask = { important: !currentImportance }; 

        try {
            await axios.put(`http://localhost:1000/api/v2/update-task/${id}`, updatedTask, { headers });
            setTasks(prevTasks =>
                prevTasks.map(task => 
                    task._id === id ? { ...task, important: !currentImportance } : task 
                )
            );
        } catch (error) {
            console.error("Error toggling task importance:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div style={{ backgroundColor: 'transparent', minHeight: '100vh', padding: '20px' }}>
            <style jsx>{`
                .scrollable-container {
                    overflow-y: auto;
                    max-height: 80vh;
                    padding: 10px;
                    background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
                }

                /* Style the scrollbar */
                ::-webkit-scrollbar {
                    width: 12px; /* Width of the scrollbar */
                }

                ::-webkit-scrollbar-track {
                    background: transparent; /* Background of the scrollbar track */
                }

                ::-webkit-scrollbar-thumb {
                    background: rgba(100, 100, 100, 0.6); /* Color of the scrollbar handle */
                    border-radius: 10px; /* Rounded corners */
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(100, 100, 100, 0.8); /* Darker on hover */
                }
            `}</style>
            {updateDiv === "fixed" && (
                <UpdateData
                    updateDiv={updateDiv}
                    setUpdateDiv={setUpdateDiv}
                    taskToUpdate={{ title: taskTitle, desc: taskDesc }} 
                    onUpdate={handleTaskUpdate}
                />
            )}
            <div className="scrollable-container">
                <Cards 
                    home={"false"} 
                    tasks={tasks} 
                    setTasks={setTasks} 
                    onDelete={handleDelete} 
                    onComplete={handleComplete} 
                    onToggleImportant={handleToggleImportant} 
                    onEdit={handleEdit} 
                />
            </div>
        </div>
    );
}

export default ImportantTasks;








