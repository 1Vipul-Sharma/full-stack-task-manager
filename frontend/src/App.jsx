import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const reloadTasks = () => setRefresh((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">📝 Task Tracker</h1>
        <TaskForm onTaskAdded={reloadTasks} />
        <TaskList refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
