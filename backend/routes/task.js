const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const auth = require("./auth");
const mongoose = require('mongoose');

router.post("/create-task", auth, async (req, res) => {
    try {
        const { title, desc } = req.body; 
        const { id } = req.headers; 
        const newTask = new Task({ title: title, desc: desc });
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, { $push: { tasks: taskId } });
        res.status(200).json({ message: "Task Created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/get-all-tasks", auth, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate('tasks');
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ 
            user: {
                _id: userData._id,
                username: userData.username,
                email: userData.email,
                tasks: userData.tasks
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });   
    }
});

router.delete("/delete-task/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
        res.status(200).json({ message: "Task Deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });   
    }
});

router.put("/update-task/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;
        await Task.findByIdAndUpdate(id, { title: title, desc: desc });
        res.status(200).json({ message: "Task Updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });   
    }
});

router.put("/update-imp-task/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const taskData = await Task.findById(id);
        if (!taskData) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { important: !taskData.important },
            { new: true }
        );
        res.status(200).json({ message: "Task Updated successfully", important: updatedTask.important });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });   
    }
});

router.put('/update-complete-task/:id', async (req, res) => {
    const { id } = req.params;
    const { complete } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }
        const task = await Task.findByIdAndUpdate(id, { complete }, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/get-imp-tasks", auth, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { important: true },
            options: { sort: { createAt: -1 } },
        });
        const ImpTaskData = Data.tasks;
        res.status(200).json({ data: ImpTaskData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });   
    }
});

router.get("/get-complete-tasks", auth, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: true },
            options: { sort: { createAt: -1 } },
        });
        const CompTaskData = Data.tasks;
        res.status(200).json({ data: CompTaskData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });   
    }
});

router.get("/get-incomplete-tasks", auth, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: false },
            options: { sort: { createAt: -1 } },
        });
        const CompTaskData = Data.tasks;
        res.status(200).json({ data: CompTaskData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });   
    }
});

module.exports = router;


