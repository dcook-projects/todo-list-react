import { useState, useEffect } from 'react'
import "./App.css"

const STORAGE_KEY = 'taskList;'

function Input({ tasks, setTasks }) {
  const [text, setText] = useState("");

  function handleAddTask() {
    const newTasks = [
      ...tasks,
      text
    ]

    setTasks(newTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    setText("");
  }

  return (
    <>
      <input placeholder="Enter task..." value={text} onChange={(e) => {setText(e.target.value)}}></input>
      <button onClick={handleAddTask}>Add task</button>
      <button onClick={() => console.log(tasks)}>Show tasks</button>
    </>
  );
}

function TaskItem({ task, tasks, setTasks }) {
  function handleDelete(task) {
    const newTasks = tasks.filter(currTask => currTask !== task);
    setTasks(newTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  }

  return (
    <>
      {task}
      <button onClick={() => handleDelete(task)}>Delete</button>
    </>
  );
}

function TaskList({ tasks, setTasks }) {
  
  return (
    <ul>
      {tasks.map(task => {
        return <li key={task}><TaskItem task={task} tasks={tasks} setTasks={setTasks} /></li>
      })}
    </ul>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const init = JSON.parse(stored);
    return init || [];
  });

  return (
    <>
      <Input tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </>
  );
}
