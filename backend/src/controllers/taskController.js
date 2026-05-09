const Task = require("../models/Task");

/* ===============================
   CREATE TASK
================================ */
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      priority: priority || "medium",
      dueDate: dueDate || null,
      status: "todo",
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL USER TASKS
================================ */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE TASK (Owner Only)
================================ */
exports.updateTask = async (req, res) => {
  try {
    const { status, title, description, priority, dueDate } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update only provided fields
    if (status) task.status = status;
    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE TASK (Owner Only)
================================ */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};