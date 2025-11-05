import React, { useEffect, useState } from "react";
import { handleSuccess } from "../utils";
import { handleError } from "../utils";
import { ToastContainer } from "react-toastify";


function Home() {
  const [input, setInput] = useState("");

  const [taskList, setTaskList] = useState([
    {
      id: 1,
      task: "Sample Task",
      completed: false,
    },

    {
      id: 2,
      task: "Another Task",
      completed: false,
    },
  ]);

  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    setLoggedInUser(username);
  }, []);

const addTaskItem = () => {
    if (!input) {
      return handleError("Task input cannot be empty");
    }

    const newTask = {
      id: taskList.length + 1,
      task: input,
      completed: false,
    };

    setTaskList([...taskList, newTask]);
    setInput("");
    handleSuccess("Task added successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  const toggleCompleted = (taskId) => {
    const updatedTasks = taskList.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTasks);
    handleSuccess("Task deleted successfully");
  };


  return (
    <div className="dashboard">
      <h1>Task Manager</h1>
      {loggedInUser && <p>Welcome, {loggedInUser}!</p>}
      <div className="taskinput">
      <input
        type="text"
        className="texty"
        placeholder="Enter Task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="inputask"
      />
      <button className="texty-btn" onClick={addTaskItem}>Add</button>
      </div>
      <br /><br /><br />
      <ul className="listy">
        {taskList.map((task) => (
          <li key={task.id} className="listy-item">
            <input type="checkbox" className="checky" checked={task.completed} onChange={() => toggleCompleted(task.id)}/>
            <span className={task.completed ? "strikeThrough" : ""}>{task.task}</span>
            <button className="checky-btn" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <br />
      <button onClick={handleLogout} className="logout">Logout</button>
      <ToastContainer />
    </div>
  );
}

export default Home;
