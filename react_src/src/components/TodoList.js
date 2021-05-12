import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import TodoItem from "./TodoItem";
import axios from "axios";

import "./TodoList.css";
import { useHistory } from "react-router";
import PageLayout from "./PageLayout";
import { LoginContext } from "./Login";

const TodoList = (props) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [authenticated, setAuthenticated] = useContext(LoginContext);

  console.log(tasks);

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks", { withCredentials: true })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setAuthenticated(false);
        } else {
          alert(
            "Une erreur est survenue lors du chargement de vos données, veuillez réessayer ultérieurement."
          );
        }
      });
  }, []);

  const handleAdd = () => {
    let newTask = { title: inputValue, done: false };

    axios
      .post("http://localhost:3001/tasks", newTask, { withCredentials: true })
      .then((response) => {
        newTask._id = response.data;
        let newTasks = [...tasks, newTask];
        setTasks(newTasks);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setAuthenticated(false);
        } else {
          alert(
            "Une erreur est survenue lors du l'ajout de votre tâche, veuillez réessayer ultérieurement."
          );
        }
      });

    setInputValue("");
  };

  const handleDelete = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    const taskToDelete = tasks[index];
    const taskId = taskToDelete._id;
    axios
      .delete("http://localhost:3001/tasks/one/" + taskId, {
        withCredentials: true,
      })
      .then(() => {
        setTasks(newTasks);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setAuthenticated(false);
        } else {
          alert(
            "Une erreur est survenue lors de la suppression de cette tâche"
          );
        }
      });
  };

  const handleDone = (index) => {
    let newTasks = [...tasks];
    const taskToUpdate = tasks[index];
    const newStatus = !taskToUpdate.done;
    newTasks[index].done = newStatus;
    axios
      .post(
        "http://localhost:3001/tasks/" + taskToUpdate._id,
        {
          done: newStatus,
        },
        { withCredentials: true }
      )
      .then(() => {
        setTasks(newTasks);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setAuthenticated(false);
        } else {
          alert(
            "Une erreur est survenue lors de la modification de cette tâche"
          );
        }
      });
  };

  return (
    <PageLayout>
      <div className="todo-list">
        <div className="todo-list__add-bar">
          <Input
            className="todo-list__add-input"
            placeholder="Task title..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Button onClick={handleAdd}>+</Button>
        </div>

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
    </PageLayout>
  );
};

export default TodoList;
