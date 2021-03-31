import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

function App() {


  const [title, setTitle] = useState("");
  const [color, setColor] = useState("lightcyan");

  const handleChangeText = (e) => {
    const value = e.target.value;
    setTitle(value);
  }

  const handleChangeColor = (e) => {
    const value = e.target.value;
    setColor(value);
  }

  const handleRed = () => {
    setColor("red")
  } 

  const handleGreen = () => {
    setColor("green")
  } 

  const handleBlue = () => {
    setColor("blue")
  } 

  return (
    <div className="App">
      
      <Header title={title} color={color}/>
      <input onChange={handleChangeText} />
      <input onChange={handleChangeColor}/>
      <button onClick={handleRed}>
        Rouge
      </button>
      <button onClick={handleGreen}>
        Vert
      </button>
      <button onClick={handleBlue}>
        Bleu
      </button>
    </div>
  );
}

export default App;
