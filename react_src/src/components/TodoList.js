import React, { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import TodoItem from "./TodoItem";
import axios from "axios";


import './TodoList.css'

const TodoList = (props) => {





  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    //Ici on va récupérer les taches sur l'api et les insérer dans notre state React.

    console.log("Lancement de la requête");
    axios.get("http://localhost:3001/tasks").then((response) => {
      console.log("Je suis dans le then");
      console.log(response.data);
      setTasks(response.data);
    }).catch((err) => {
      console.log("error", err)
    })

    console.log("Je suis après le then");
    


  }, [])

  console.log("tasks : ", tasks);
  console.log("inputValue : ", inputValue);

  const handleAdd = () => {
    let newTask = { title: inputValue, done: false }
    let newTasks = [...tasks, newTask ];
    setTasks(newTasks);
    //Faire une appel api (axios) en POST sur /tasks avec les infos de la tache
    axios.post('http://localhost:3001/tasks', newTask);
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
