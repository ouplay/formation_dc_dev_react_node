import React, { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import TodoItem from "./TodoItem";
import axios from "axios";

import "./TodoList.css";

const TodoList = (props) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  console.log(tasks);

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        alert(
          "Une erreur est survenue lors du chargement de vos données, veuillez réessayer ultérieurement."
        );
      });
  }, []);

  const handleAdd = () => {
    let newTask = { title: inputValue, done: false };

    axios
      .post("http://localhost:3001/tasks", newTask)
      .then((response) => {
        newTask._id = response.data;
        let newTasks = [...tasks, newTask];
        setTasks(newTasks);
      })
      .catch(() => {
        alert(
          "Une erreur est survenue lors du l'ajout de votre tâche, veuillez réessayer ultérieurement."
        );
      });

    setInputValue("");
  };

  const handleDelete = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    const taskToDelete = tasks[index];
    const taskId = taskToDelete._id;
    axios
      .delete("http://localhost:3001/tasks/one/" + taskId)
      .then(() => {
        setTasks(newTasks);
      })
      .catch(() => {
        alert("Une erreur est survenue lors de la suppression de cette tâche");
      });
  };

  const handleDone = (index) => {
    let newTasks = [...tasks];
    const taskToUpdate = tasks[index];
    const newStatus = !taskToUpdate.done;
    newTasks[index].done = newStatus;
    axios
      .post("http://localhost:3001/tasks/" + taskToUpdate._id, {
        done: newStatus,
      })
      .then(() => {
        setTasks(newTasks);
      })
      .catch(() => {
        alert("Une erreur est survenue lors de la modification de cette tâche");
      });
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
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
