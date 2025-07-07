import { useEffect, useState } from "react";
import axios from "axios";
const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      if (res.data.success) {
        setTasks(res.data.alltasks);
      } else {
        console.error("Failed to fetch tasks:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]); // ✅ trigger re-fetch on refresh change

  const toggleCompleted = async (task) => {
    try {
      const updated = { ...task, completed: !task.completed };
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updated);
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="p-4 border rounded flex justify-between items-center bg-white shadow-sm"
        >
          <div
            onClick={() => toggleCompleted(task)}
            className={`flex-1 cursor-pointer ${
              task.priority === "High"
                ? "text-red-600"
                : task.priority === "Medium"
                ? "text-yellow-600"
                : "text-gray-600"
            } ${task.completed ? "line-through text-gray-400" : ""}`}
          >
            {task.priority === "High" && "🔥 "}
            {task.priority === "Medium" && "⚠️ "}
            {task.title}
          </div>

          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-500 hover:text-red-700 ml-4"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
