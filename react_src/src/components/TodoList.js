import React, { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import * as todoApi from "../api/todo";

export default function TodoList(props) {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleAddTodo = () => {
    const newTodoItems = [
      ...props.list.items,
      { title: newTodoTitle, done: false },
    ];
    const newList = { ...props.list, items: newTodoItems };
    props.onUpdate(newList);
    setNewTodoTitle("");
  };

  const handleItemUpdate = (index) => (newItem) => {
    if (props.list.items[index] !== undefined) {
      let newItems = [...props.list.items];
      newItems.splice(index, 1, newItem);

      let newList = { ...props.list, items: newItems };

      props.onUpdate(newList);
    }
  };

  const handleDelete = (index) => () => {
    if (props.list.items[index] !== undefined) {
      let newItems = [...props.list.items];
      newItems.splice(index, 1);

      let newList = { ...props.list, items: newItems };

      props.onUpdate(newList);
    }
  };

  return (
    <div className="todo-list">
      <div className="todo-list__add-panel">
        <Input
          className="todo-list__input"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <Button className="todo-list__button" onClick={handleAddTodo} disabled={newTodoTitle === ""}>
          Ajouter
        </Button>
      </div>
      {props.list.items.map((item, index) => (
        <TodoItem
          className="todo-list__item"
          key={index}
          item={item}
          onUpdate={handleItemUpdate(index)}
          onDelete={handleDelete(index)}
        />
      ))}
    </div>
  );
}

export function useTodoState(listId) {
  const [list, setList] = useState({ items: [] });

  useEffect(() => {
    todoApi.get(listId).then((res) => {
      console.log(res.data);
      setList(res.data);
    });
  }, [listId]);

  const update = async (newList) => {
    newList = { ...newList };
    await todoApi.update(listId, newList);
    setList(newList);
  };

  return [list, update];
}
