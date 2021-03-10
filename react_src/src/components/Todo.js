import React, { useState } from 'react';
import TodoList from './TodoList';

export default function Todo(props) {

    const [newTodoTitle, setNewTodoTitle] = useState("");

    const handleAddTodo = () => {
        props.onAddTodoItem({title: newTodoTitle});
        setNewTodoTitle("");
    } 

    return (
        <div>
            <input value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} />
            <button onClick={handleAddTodo}>Ajouter</button>
            <TodoList list={props.list} onUpdate={props.onUpdate}/>
        </div>
    )
}

export function useTodoState(initialState = {items: []}) {
    const [list, setList] = useState(initialState);
    const [nextId, setNextId] = useState(1);

    const addTodo = (newTodoItem) => {

        newTodoItem = {...newTodoItem, id: nextId};
        const newTodoItems = [...list.items, newTodoItem];
        setList({...list, items: newTodoItems})
        setNextId(nextId+1);
    }

    return [list, addTodo, setList];
}