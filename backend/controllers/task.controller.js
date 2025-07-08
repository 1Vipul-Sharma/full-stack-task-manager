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
    const { title, completed = false, priority } = req.body;

    // 🔍 Validation: Check required fields
    if (!title || typeof title !== "string" || !title.trim()) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Title is required and must be a non-empty string.",
        });
    }

    if (!priority || !["Low", "Medium", "High"].includes(priority)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Priority must be one of: Low, Medium, or High.",
        });
    }

    if (typeof completed !== "boolean") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Completed must be a boolean value.",
        });
    }

    // ✅ Create Task
    const task = await Task.create({
      title: title.trim(),
      completed,
      priority,
    });

    return res.status(201).json({
      success: true,
      task,
      message: "Task created successfully.",
    });
  } catch (error) {
    console.error("❌ Error in createTask:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error: Could not create task. Please try again later.",
    });
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
