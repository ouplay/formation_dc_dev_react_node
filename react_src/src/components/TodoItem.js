import React from 'react';
import './TodoItem.css'

export default function TodoItem (props) {

    const handleDone = () => {
        props.onUpdate({...props.item, done: !props.item.done})
    }

    return (
        <div className="todo-item">
            <p className={`todo-item__title ${props.item.done ? "todo-item__title--done" : ""}`}>{props.item.title}</p>
            <button onClick={handleDone}>{props.item.done ? "Mark To do" : "Mark as done"}</button>
            <button onClick={props.onDelete}>Delete</button>
        </div>
    )
}