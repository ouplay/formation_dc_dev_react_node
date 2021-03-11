import React, { useEffect, useState } from 'react';
import TodoList, {useTodoState} from '../components/TodoList';
import Page from '../components/Page';
import './Todo.css'


export default function Todo(props) {
    const [list, updateTodoList] = useTodoState(
        "60489fc59da4975e9aa09668"
      );
    

    return (
        <Page className="todo">
            <TodoList list={list} onUpdate={updateTodoList}/>
        </Page>
    )
}