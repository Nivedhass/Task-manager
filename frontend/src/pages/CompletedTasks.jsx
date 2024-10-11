import React, { useEffect, useState } from 'react';
import Cards from '../components/Home/Cards'; 
import UpdateData from '../components/Home/UpdateData'; 
import axios from 'axios';

const CompletedTasks = () => {
    const [tasks, setTasks] = useState([]); 
    const [editingTask, setEditingTask] = useState(null); 
    const [updateDiv, setUpdateDiv] = useState("hidden"); 
    const [loading, setLoading] = useState(false);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    
    useEffect(() => {
        fetchCompletedTasks();
    }, []);

  
    const fetchCompletedTasks = async () => {
        try {
            const response = await axios.get("http://localhost:1000/api/v2/get-complete-tasks", { headers });
            console.log("Fetched completed tasks:", response.data.data);
            setTasks(response.data.data); 
        } catch (error) {
            console.error("Error fetching completed tasks:", error);
        }
    };

 
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, { headers });
            setTasks((prevTasks) => prevTasks.filter(task => task._id !== id)); 
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

   
    const handleComplete = async (id) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:1000/api/v2/update-task/${id}`, { complete: false }, { headers });
            await fetchCompletedTasks(); 
        } catch (error) {
            console.error("Error completing task:", error);
        } finally {
            setLoading(false);
        }
    };

   
    const handleEdit = (task) => {
        setEditingTask(task);
        setUpdateDiv("fixed");
    };

    
    const handleTaskUpdate = async (updatedTask) => {
        try {
            await axios.put(`http://localhost:1000/api/v2/update-task/${editingTask._id}`, updatedTask, { headers });
            await fetchCompletedTasks(); 
            setEditingTask(null);
            setUpdateDiv("hidden");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div>
            {updateDiv === "fixed" && (
                <UpdateData
                    updateDiv={updateDiv}
                    setUpdateDiv={setUpdateDiv}
                    taskToUpdate={editingTask}
                    onUpdate={handleTaskUpdate} 
                />
            )}

            <div className="task-container" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <Cards 
                    home={"false"} 
                    tasks={tasks} 
                    setTasks={setTasks} 
                    onDelete={handleDelete} 
                    onComplete={handleComplete} 
                    onEdit={handleEdit}
                    loading={loading} 
                />
            </div>
        </div>
    );
};

export default CompletedTasks;






