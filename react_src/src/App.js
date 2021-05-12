import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth, { LoginContext, useLogin } from "./components/Login";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <LoginContext.Provider value={useLogin()}>
          <Header/>
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/todo">
              <TodoList />
            </Route>
            <Route path="/">
              <p>Home</p>
            </Route>
          </Switch>
        </LoginContext.Provider>
      </Router>
    </div>
  );
}

export default App;
