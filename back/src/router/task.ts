import express from "express";
import { getAllTasks, createTask, updateTaskStatus, deleteTask } from "../controller/task";

const task = express.Router();
task.post("/task", createTask);
task.get("/tasks", getAllTasks);
task.patch("/tasks/:taskId", updateTaskStatus);
task.delete('/tasks/:taskId',deleteTask)

export { task };
