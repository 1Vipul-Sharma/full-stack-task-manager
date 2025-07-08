import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const reloadTasks = () => setRefresh((prev) => !prev);
  console.log(`reload`, refresh);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">📝 Task Tracker</h1>
        <TaskForm onTaskAdded={reloadTasks} />
        <TaskList refresh={refresh} />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
