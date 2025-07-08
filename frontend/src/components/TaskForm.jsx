import { useState } from "react";
import axios from "axios"; // adjust this path if needed
import { toast } from "react-toastify";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");

  const handleAdd = async () => {
    if (!title.trim() || !priority) {
      toast.warn("Please enter a task title and select a priority.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title,
        completed: false,
        priority,
      });

      if (res.data.success) {
        setTitle("");
        setPriority("");
        onTaskAdded();
        toast.success("Task added successfully!");
      } else {
        toast.error(res.data.message || "Task creation failed.");
        console.error("Task creation failed:", res.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!");
        console.error("Backend error:", error.response.data);
      } else if (error.request) {
        toast.error("No response from server.");
        console.error("No server response:", error.request);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unexpected error:", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full mb-4">
      <input
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full md:flex-1 border border-gray-300 px-3 py-2 rounded"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full md:w-24 border border-gray-300 px-3 py-2 rounded"
      >
        <option value="">Select priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        onClick={handleAdd}
        className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
