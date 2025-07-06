import express from "express";

const router = express.Router();
import {
  allTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";
router.get("/", allTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
