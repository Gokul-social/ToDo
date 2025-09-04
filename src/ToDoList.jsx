import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      // store task as object with completed state
      setTasks(t => [...t, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function toggleComplete(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] =
        [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] =
        [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  // 📊 Progress calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      {/* Progress Tracker */}
      <div className="progress">
        <p>{completedTasks} of {totalTasks} tasks completed ({progress}%)</p>
        <div style={{
          width: "100%",
          background: "#eee",
          borderRadius: "5px",
          overflow: "hidden",
          height: "10px",
          marginBottom: "10px"
        }}>
          <div style={{
            width: `${progress}%`,
            background: "green",
            height: "100%",
            transition: "width 0.3s"
          }} />
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            <span
              style={{ textDecoration: task.completed ? "line-through" : "none" }}
            >
              {task.text}
            </span>
            <button onClick={() => toggleComplete(index)}>
              {task.completed ? "Undo" : "Done"}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => moveTaskUp(index)}>☝</button>
            <button onClick={() => moveTaskDown(index)}>👇</button>
          </li>
        )}
      </ol>
    </div>
  );
}

export default ToDoList;