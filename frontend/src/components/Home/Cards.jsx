import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';

const Cards = ({ home, setInputDiv, tasks, setTasks, onDelete, onEdit }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Function to handle task importance toggle
    const handleToggleImportant = async (id) => {
        try {
            const response = await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`, {}, { headers });
            // Update the local state optimistically
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, important: response.data.important } : task
                )
            );
        } catch (error) {
            console.error("Error updating task importance status", error);
        }
    };

    // Function to handle task completion
    const handleCompleteTask = async (id, complete) => {
        try {
            const response = await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`, {
                complete: !complete,
            }, { headers });

            // Update the local state optimistically
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, complete: response.data.complete } : task
                )
            );
        } catch (error) {
            console.error("Error updating task completion status", error);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {tasks && tasks.length > 0 ? (
                tasks.map((item) => (
                    <div key={item._id} className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
                        <div>
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-gray-300 my-2">{item.desc}</p>
                        </div>
                        <div className="mt-4 w-full flex items-center">
                            <button
                                className={`p-2 rounded w-3/6 ${item.complete ? "bg-green-700" : "bg-red-400"}`}
                                onClick={() => handleCompleteTask(item._id, item.complete)}
                            >
                                {item.complete ? "Complete" : "Incomplete"}
                            </button>
                            <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                                <button onClick={() => handleToggleImportant(item._id)}>
                                    <CiHeart className={`${item.important ? "text-red-500" : "text-gray-300"}`} />
                                </button>
                                <button onClick={() => onEdit(item)}>
                                    <FaRegEdit />
                                </button>
                                <button onClick={() => onDelete(item._id)}><MdDeleteOutline /></button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-gray-300 text-center col-span-3">No tasks available</div>
            )}

            {home === "true" && (
                <div
                    className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
                    onClick={() => setInputDiv("fixed")}
                >
                    <IoIosAddCircle className="text-5xl" />
                    <h2 className="text-2xl mt-4">Add Task</h2>
                </div>
            )}
        </div>
    );
};

export default Cards;














