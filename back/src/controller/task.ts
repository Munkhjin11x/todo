
import { Request, Response } from 'express';
import { taskModel } from '../model/Task';


const getAllTasks = async (req:Request, res:Response) => {
  try {
    const tasks = await taskModel.find();
    res.json(tasks);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req:Request, res:Response) => {
    const { name, description, status } = req.body;
  
    try {
      const newTask = new taskModel({ name, description, status });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  };
  const updateTaskStatus = async (req:Request, res:Response) => {
    const { taskId } = req.params;
    const { status } = req.body;
  
    try {
      const updatedTask = await taskModel.findByIdAndUpdate(
        taskId,
        { status },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(updatedTask);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
export {createTask , getAllTasks, updateTaskStatus}

