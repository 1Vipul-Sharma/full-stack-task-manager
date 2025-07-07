import { useState } from "react";
import axios from "../api/axios"; // use axios instance or adjust path

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title,
        completed: false,
        priority: "Low", // you can make this dynamic later
      });

      if (res.data.success) {
        setTitle(""); // clear input
        onTaskAdded(); // ask parent to refetch list
      } else {
        console.error("Task creation failed:", res.data.message);
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border px-3 py-2 rounded"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
