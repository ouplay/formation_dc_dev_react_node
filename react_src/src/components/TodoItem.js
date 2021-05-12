import React from "react";
import Button from "./Button";
import "./TodoItem.css";

const TodoItem = (props) => {
  return (
    <li className="todo-item">
      <p
        className="todo-item__text"
        style={{
          textDecoration: props.item.done ? "line-through" : "initial",
        }}
      >
        {props.item.title}
      </p>
      <div className="todo-item__actions">
        <Button
          className="todo-item__button todo-item__button--done"
          onClick={props.onDone}
        >
          {props.item.done ? "←" : "✓"}
        </Button>
        <Button
          className="todo-item__button todo-item__button--delete"
          onClick={props.onDelete}
        >
          ✗
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
