import React, { useEffect, useState } from "react";
import LoginForm from "../LoginForm";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (loginError) {
      setTimeout(() => {
        setLoginError(false);
      }, 2000);
    }
  }, [loginError]);

  const getRequestToken = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new`,
      options
    );

    const data = await response.json();

    return data.request_token;
  };

  const getSessionId = async (requestToken) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/session/new",
      options
    );

    const data = await response.json();

    return data;
  };

  const validateLogin = async (event, username, password) => {
    event.preventDefault();

    const requestToken = await getRequestToken();

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify({
        request_token: requestToken,
        username: username,
        password: password,
      }),
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/token/validate_with_login",
      options
    );

    const data = await response.json();

    if (data.success === true) {
      const sessionData = await getSessionId(data.request_token);
      if (sessionData.success) {
        let sessionObject = {
          username: username,
          sessionId: sessionData.session_id,
        };

        sessionStorage.setItem("session", JSON.stringify(sessionObject));
        setLoginError(false);
        window.location.replace(`http://localhost:3000/`);
      }
    } else {
      setLoginError(true);
    }
  };

  return (
    <div>
      <LoginForm
        setName={setName}
        name={name}
        password={password}
        setPassword={setPassword}
        validateLogin={validateLogin}
      />

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={loginError}
          timeout={200}
          classNames="fade"
          unmountOnExit
          className="list-container"
        >
          <div>
            {loginError && (
              <div className="loginUnsuccess">Log-in Unsuccessfull</div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
