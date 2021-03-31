import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import TodoItem from "./TodoItem";

import './TodoList.css'

const TodoList = (props) => {
  const [tasks, setTasks] = useState([
    { title: "Faire les courses", done: false },
    { title: "Sortir le chien", done: true },
  ]);
  const [inputValue, setInputValue] = useState("");

  console.log("tasks : ", tasks);
  console.log("inputValue : ", inputValue);

  const handleAdd = () => {
    let newTasks = [...tasks, { title: inputValue, done: false }];
    setTasks(newTasks);
    setInputValue("");
  };

  const handleDelete = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleDone = (index) => {
    let newTasks = [...tasks];

    newTasks[index].done = !newTasks[index].done;

    setTasks(newTasks);
  };

  return (
    <div className="todo-list">
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button onClick={handleAdd}>Ajouter la tâche</Button>

      <ul>
        {tasks.map((task, index) => {
          return (
            <TodoItem 
            key={index} 
            item={task} 
            onDelete={() => {
              handleDelete(index);
            }} 
            onDone={() => {
              handleDone(index);
            }}/>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
