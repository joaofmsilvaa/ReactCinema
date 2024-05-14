import React, { useEffect, useState } from "react";
import NoMatch from "./Pages/NoMatch";
import Navbar from "./Navbar";
import MovieInfos from "./Pages/MovieInfos";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function Root() {
  const [logoutFlag, setLogoutFlag] = useState(false);

  const routes = [
    { path: "/login", Component: Login },
    { path: "/", Component: HomePage },
    { path: "/:id", Component: HomePage },
    { path: "/movies/:id", Component: MovieInfos },
    { path: "*", Component: NoMatch },
  ];

  useEffect(() => {
    if (logoutFlag) {
      setTimeout(() => {
        setLogoutFlag(false);
      }, 2000);
    }
  }, [logoutFlag]);

  return (
    <Router>
      <div className="App">
        <Navbar setLogoutFlag={setLogoutFlag} />

        <SwitchTransition mode="out-in">
          <CSSTransition
            key={logoutFlag}
            timeout={200}
            classNames="fade"
            unmountOnExit
            className="list-container"
          >
            <div>
              {logoutFlag && (
                <div className="logoutMessage">Log-out Successfull</div>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>

        <div className="contentDiv">
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path} Component={Component} />
            ))}
          </Routes>
        </div>

      </div>
    </Router>
  );
}
