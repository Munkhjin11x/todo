import express from "express";
import { getAllTasks, createTask, updateTaskStatus } from "../controller/task";

const task = express.Router();
task.post("/task", createTask);
task.get("/tasks", getAllTasks);
task.patch("/tasks/:taskId", updateTaskStatus);

export { task };
