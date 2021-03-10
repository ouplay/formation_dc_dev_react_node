import React, { useState } from "react";
import logo from "./logo.svg";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";

function App() {
  const [color, setColor] = useState();
  const [mode, setMode] = useState("button");

  return (
    <BrowserRouter>
      <Header appName="Todo.io" logo={logo} color={color} />
      {mode === "button" && (
        <div>
          <button onClick={() => setColor("red")}>Red</button>
          <button onClick={() => setColor("green")}>Green</button>
          <button onClick={() => setColor("blue")}>Blue</button>
          <button onClick={() => setMode("libre")}>Passer au mode Libre</button>
        </div>
      )}
      {mode === "libre" && (
        <div>
          <input onChange={(e) => setColor(e.target.value)} />
          <button onClick={() => setMode("button")}>Passer au mode Bouton</button>
        </div>
      )}

      <Switch>
        <Route path="/page1">
          <Page title="Page 1" nextPage="/page2" />
        </Route>
        <Route path="/page2">
          <Page title="Page 2" nextPage="/page3" />
        </Route>
        <Route path="/page3">
          <Page title="Page 3" nextPage="/" />
        </Route>
        <Route path="/">
          <Page title="Accueil" nextPage="/page1" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
