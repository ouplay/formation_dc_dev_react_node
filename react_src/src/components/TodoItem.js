import React from 'react';
import Button from './Button';
import './TodoItem.css'

export default function TodoItem (props) {

    const handleDone = () => {
        let newItem = {...props.item, done: !props.item.done}
        console.log("newItem", newItem)
        props.onUpdate(newItem)
    }

    return (
        <div className={`todo-item ${props.className || ""}`}>
            <p className={`todo-item__title ${props.item.done ? "todo-item__title--done" : ""}`}>{props.item.title}</p>
            <Button className="todo-item__button" onClick={handleDone}>{props.item.done ? "Mark To do" : "Mark as done"}</Button>
            <Button onClick={props.onDelete}>Delete</Button>
        </div>
    )
}