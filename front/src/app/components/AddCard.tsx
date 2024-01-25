"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Task {
  _id: string;
  name: string;
  description: string;
  status: string;
}
interface NewTask {
  name: string;
  description: string;
  status: string;
}
const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<NewTask>({ name: "", description: "", status: "todo",});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Task[]>("http://localhost:8000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTask({ ...newTask, status: e.target.value });
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/task",
        newTask,
      );
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleMoveToNextState = async (taskId: string, nextState: string) => {
    console.log(taskId);
    try {
      const response = await axios.patch(
        `http://localhost:8000/tasks/:${taskId}`,
        { status: nextState },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setTasks(tasks.map((task) => (task._id === taskId ? response.data.task : task))
        );
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Todo List</h1>
      <div className="flex gap-10">
        <div>
          <h2>To Do</h2>
          <div className="flex flex-col gap-6">
            {tasks
              .filter((task) => task.status === "todo")
              .map((e) => (
                <div key={e._id} className="flex gap-3 flex-col">
                    <p>  {e.name}</p>
                 <p>{e.description}</p>
                  <button className="bg-gray-800 text-white rounded-md w-fit px-3 py-3" onClick={() => handleMoveToNextState(e._id, "inProgress")  }>
                    Move to In Progress
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2>In Progress</h2>
          <div className="flex flex-col gap-6">
            {tasks.filter((task) => task.status === "inProgress").map((e) => (
                <div key={e._id} className="flex gap-3 flex-col">
                 <p> {e.name}</p>
                 <p> {e.description}</p>
                  <button className="bg-gray-800 text-white rounded-md w-fit px-3 py-3"onClick={() => handleMoveToNextState(e._id, "completed")}>
                    Complete
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2>Completed</h2>
          <div>
            {tasks.filter((task) => task.status === "completed").map((e) => (
                <div key={e._id}>
                    <p> {e.name} </p>
                 <p> {e.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
     
        <label>
          Task Status:
          <select value={newTask.status} onChange={handleSelectChange}>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="todo">To Do</option>
          </select>
        </label>
        <label>
          Task Name:
          <input  type="text"name="name"  value={newTask.name}  onChange={handleInputChange}/>
        </label>
    
      <div>
        <label>
          Task Description:
          <textarea name="description" value={newTask.description} onChange={handleInputChange}
          />
        </label>
      </div>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TodoList;
