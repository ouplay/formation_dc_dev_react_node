import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import Button from "./Button";
import { LoginContext } from "./Login";



const LoginWidget = (props) => {

  const history = useHistory();
  const [authenticated, setAuthenticated] = useContext(LoginContext)

  console.log("authenticated", authenticated)

  if (authenticated === true) {
    return <Button
      onClick={() => {
        axios
          .post("http://localhost:3001/auth/logout", { withCredentials: true })
          .then(() => {
            setAuthenticated(false)
          })
          .catch((err) => {
            if (err.response && err.response.status) {
              setAuthenticated(true)
            }
          });
      }}
    >
      Log out
    </Button>;
  } else {
    history.push("/auth/login");
    return null;
  }
};

export default LoginWidget;
