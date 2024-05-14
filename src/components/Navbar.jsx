import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavigationBar({ setLogoutFlag }) {
  const [showingList, setshowingList] = useState(false);
  const [accDetails, setAccDetails] = useState();

  const apiKey = process.env.REACT_APP_APIKEY;

  useEffect(() => {
    if (sessionStorage.getItem("session")) {
      let session = sessionStorage.getItem("session");
      let request = JSON.parse(session);

      getAccDetails(request.username, request.sessionId);
    }
  }, []);

  const getAccDetails = async (username, session_id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "",
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/account/${username}?session_id=${session_id}&api_key=${apiKey}`,
      options
    );

    const data = await response.json();

    if (JSON.stringify(data) != "{}") {
      setAccDetails(data);
    }
  };

  const deleteSession = async () => {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify({ session_id: sessionStorage.getItem("sessionId") }),
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/session",
      options
    );

    sessionStorage.clear();
    setAccDetails();
    setLogoutFlag(true);
  };

  return (
    <nav>
      <div>
        <NavLink to="/" className="logo">
          ReactCinema
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li
          onMouseEnter={() => {
            setshowingList(true);
          }}
          onMouseLeave={() => {
            setshowingList(false);
          }}
        >
          {accDetails ? (
            <div>
              <div className="userNav">
                <img
                  src={
                    accDetails.avatar.tmdb.avatar_path != null
                      ? `https://image.tmdb.org/t/p/w200${accDetails.avatar.tmdb.avatar_path}}`
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                  }
                ></img>
                <div className="userDiv">
                  <NavLink
                    target="_blank"
                    to={`https://www.themoviedb.org/u/${accDetails.username}`}
                  >
                    {accDetails.username}
                  </NavLink>
                </div>
              </div>
              {showingList ? (
                <ul className="userList">
                  <li>
                    <NavLink
                      to="/"
                      onClick={() => {
                        deleteSession();
                      }}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          ) : (
            <NavLink to="/login">Sign In</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
