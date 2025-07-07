import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["High", "Medium", "Low"],
    default: "High",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
