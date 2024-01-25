"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./Button";
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
const AddCard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<NewTask>({
    name: "",
    description: "",
    status: "todo",
  });
  const [modal,setModal]=useState(false)
  const modalHandle = ()=>{
    setModal(!modal)
  }
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
      const response = await axios.post("http://localhost:8000/task", newTask);
      setTasks([...tasks, response.data]);
      setModal(false)
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleMoveToNextState = async (taskId: string, nextState: string) => {
    console.log(taskId);
    try {
      const response = await axios.patch(
        `http://localhost:8000/tasks/${taskId}`,
        { status: nextState }
      );
      console.log(response);
      if (response.data.success) {
        setTasks(tasks.map((task) => (task._id === taskId ? response.data.task : task)) );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await axios.delete(`http://localhost:8000/tasks/${taskId}`);
      
      if (response.data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error( error);
    }
  };
  return (
    <div>
      <div className="flex justify-around w-[1440px] mt-9">
        <div>
          <div className=" w-[250px] flex flex-col gap-6 border-[2px] border-solid rounded-2xl px-5 py-2">
          <h2 className=" font-semibold text-[20px]">To Do</h2>
            {tasks.filter((task) => task.status === "todo").map((e) => (
                <div key={e._id} className=" bg-gray-600 px-4 text-white py-2 rounded-md">
                 <p>Name:</p>
                 <div className="flex gap-5  items-center">
                  <p> {e.name} </p>
                  <Button
                 onClick={() => handleDeleteTask(e._id)}
                >
                  Del
                </Button>
                  </div>
                  <p>Desc:</p>
                  <p> {e.description}</p>
                  <Button onClick={() => handleMoveToNextState(e._id, "inProgress")}>
                  In Progress
                  </Button>
                </div>
              ))}
              <Button onClick={modalHandle}>Add Task</Button>
          </div>
        </div>
        <div>
          <div className=" w-[250px] flex flex-col gap-6 border-[2px] border-solid rounded-2xl px-5 py-2">
          <h2  className=" font-semibold text-[20px]">In Progress</h2>
            {tasks.filter((task) => task.status === "inProgress").map((e) => (
                <div key={e._id} className=" bg-gray-600 px-4 text-white py-2 rounded-md">
                  <p>Name:</p>
                 <div className="flex gap-5  items-center">
                  <p> {e.name} </p>
                  <Button
                 onClick={() => handleDeleteTask(e._id)}
                >
                  Del
                </Button>
                  </div>
                  <p>Desc:</p>
                  <p> {e.description}</p>
                 
                  <Button className="bg-gray-800 text-white rounded-md w-fit px-3 py-3" onClick={() => handleMoveToNextState(e._id, "completed")}>
                    Complete
                  </Button>
                </div>
              ))}
               <Button onClick={modalHandle}>Add Task</Button>
          </div>
        </div>
        <div>
          <div className=" w-[250px] flex flex-col gap-6 border-[2px] border-solid rounded-2xl px-5 py-2">
          <h2  className=" font-semibold text-[20px]">Completed</h2>
            {tasks.filter((task) => task.status === "completed").map((e) => (
                <div className=" bg-gray-600 px-4 text-white py-2 rounded-md" key={e._id}>
                  <p>Name</p>
                  <div className="flex gap-5  items-center">
                  <p> {e.name} </p>
                  <Button onClick={() => handleDeleteTask(e._id)} >
                  Del
                </Button>
                  </div>
                  <p>Desc:</p>
                  <p> {e.description}</p>
              
                </div>
              ))}
              <Button onClick={modalHandle}>Add Task</Button>
          </div>
        </div>
      </div>
{modal&&(
     <div className="fixed gap-3  bg-zinc-500 rounded-lg flex flex-col border-[2px] top-[30%] left-[42%] border-solid border-gray-700 p-7">
     <label className="flex flex-col text-white">
       Task Name:
       <input className=" rounded-md p-1" type="text"name="name" placeholder="name" value={newTask.name} onChange={handleInputChange}/>
         Task Description:
         <textarea className="rounded-md " placeholder="Description"name="description"value={newTask.description} onChange={handleInputChange}  />
       </label>
       <label>
       <select className="rounded-md " value={newTask.status} onChange={handleSelectChange}>
         <option value="inProgress">In Progress</option>
         <option value="completed">Completed</option>
         <option value="todo">To Do</option>
       </select>
     </label>
     <Button onClick={handleAddTask}>Add Task</Button>
     </div>
)}
   
    </div>
  );
};

export default AddCard;
