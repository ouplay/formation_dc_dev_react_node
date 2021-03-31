import React, { useState } from "react";

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
    <div>
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button onClick={handleAdd}>Ajouter la tâche</button>

      <ul>
        {tasks.map((task, index) => {
          console.log(index, task);
          return (
            <li key={index}>
              <p
                style={{
                  textDecoration:
                    task.done ? "line-through" : "initial",
                }}
              >
                {task.title}
              </p>
              <button
                onClick={() => {
                  handleDone(index);
                }}
              >
                {task.done ? "Reprendre" : "Terminer"}
              </button>
              <button
                onClick={() => {
                  handleDelete(index);
                }}
              >
                Supprimer
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
