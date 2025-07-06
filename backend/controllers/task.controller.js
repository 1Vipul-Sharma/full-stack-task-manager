import Task from "../model/task.model.js";
export const allTasks = async (req, res) => {
  try {
    console.log("GET request to /api/tasks");
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      alltasks: tasks,
      message: "Tasks fetched successfully.",
    });
  } catch (error) {
    console.log(`Error in /api/tasks: ${error.message}`);
    res
      .status(500)
      .json({ message: "An error occurred while fetching tasks." });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = req.body;
    console.log(newTask);
    const task = await Task.create(newTask);
    res.status(201).json({
      success: true,
      task: task,
      message: "Task created successfully.",
    });
  } catch (error) {
    console.log(`Error in createTask: ${error.message}`);
    res
      .status(500)
      .json({ message: "An error occurred while creating a task." });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    console.log("111", updatedTask);
    const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({
      success: true,
      task: task,
      message: "Task updated successfully.",
    });
  } catch (error) {
    console.log(`Error in updateTask: ${error.message}`);
    res
      .status(500)
      .json({ message: "An error occurred while updating the task." });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({
      success: true,
      task: task,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.log(`Error in deleteTask: ${error.message}`);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the task." });
  }
};
