import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todo, { useTodoState } from './components/Todo';

function App() {

  const [list, addTodoItem, updateTodoList] = useTodoState();

  return (
    <div className="App">
      <Todo list={list} onAddTodoItem={addTodoItem} onUpdate={updateTodoList}/>
    </div>
  );
}

export default App;
