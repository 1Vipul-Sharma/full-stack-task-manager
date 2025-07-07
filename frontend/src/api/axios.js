import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/tasks", // adjust port if needed
});

export default instance;
