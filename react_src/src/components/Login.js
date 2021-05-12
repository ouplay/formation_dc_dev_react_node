import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import PageLayout from "./PageLayout";

import "./Login.css";
import { Link } from "react-router-dom";

export const useLogin = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/check", { withCredentials: true })
      .then(() => {
        setAuthenticated(true);
      })
      .catch((err) => {
        if (!(err.response && err.response.status)) {
          alert("An error occured while checking authentication");
        }
        setAuthenticated(false);
      });
  }, []);

  return [authenticated, setAuthenticated];
};

export const LoginContext = React.createContext();

const Login = (props) => {
  const [loginData, setLoginData] = useState({});
  const [authenticated, setAuthenticated] = useContext(LoginContext);

  let { path, url } = useRouteMatch();

  const history = useHistory();

  const handleChange = (id) => (e) => {
    const value = e.target.value;

    const newLoginData = { ...loginData, [id]: value };

    setLoginData(newLoginData);
  };

  const handleLogin = async () => {
    axios
      .post("http://localhost:3001/auth/login", loginData, {
        withCredentials: true,
      })
      .then(() => {
        setAuthenticated(true);
      })
      .catch((err) => {
        setAuthenticated(false);
        if (err.response && err.response.status === 403) {
          alert("Invalid credentials");
        } else {
          alert(
            "An unexpected error happened, we are sorry for the inconvenience"
          );
        }
      });
  };

  const handleSignup = async () => {
    axios
      .post("http://localhost:3001/auth/submit", loginData, {
        withCredentials: true,
      })
      .then(() => {
        history.push("/auth/login");
      })
      .catch((err) => {
        setAuthenticated(false);
        if (err.response && err.response.status === 403) {
          alert("Invalid credentials");
        } else {
          alert(
            "An unexpected error happened, we are sorry for the inconvenience"
          );
        }
      });
  };

  if (authenticated) {
    history.push("/todo");
  }

  return (
    <PageLayout>
      <Switch>
        <Route path={`${path}/login`}>
          <Card className="auth-card login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <Input
                className="auth-card__input"
                placeholder="Username..."
                value={loginData.username}
                onChange={handleChange("username")}
              />
              <Input
                type="password"
                placeholder="Password..."
                className="auth-card__input"
                value={loginData.password}
                onChange={handleChange("password")}
              />
              <Button className="auth-card__button">Log in</Button>
            </form>
            <Link to="/auth/signup">
              <p>I don't have an account, sign me up</p>
            </Link>
          </Card>
        </Route>
        <Route path={`${path}/signup`}>
          <Card className="auth-card signup">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
              <Input
                className="auth-card__input"
                placeholder="Username..."
                value={loginData.username}
                onChange={handleChange("username")}
              />
              <Input
                className="auth-card__input"
                type="password"
                placeholder="Password..."
                value={loginData.password}
                onChange={handleChange("password")}
              />
              <Button className="auth-card__button" onClick={handleSignup}>
                Sign up
              </Button>
              <Link to="/auth/login">
                <p>I already have an account, log me in</p>
              </Link>
            </form>
          </Card>
        </Route>
      </Switch>
    </PageLayout>
  );
};

export default Login;
