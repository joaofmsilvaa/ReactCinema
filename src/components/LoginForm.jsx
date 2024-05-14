import React from "react";

export default function LoginForm({
  name,
  setName,
  password,
  setPassword,
  validateLogin,
}) {

  return (
    <div className="login-container">
      <div className="login-div">
        <img
          className="tmdb-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/1280px-Tmdb.new.logo.svg.png"
          alt="The Movie Database Logo"
        ></img>
        <h1 className="login-title" style={{color: "#fff"}}>Welcome Back</h1>
        <div style={{color: "#fff"}}>
          Please log-in to your <a href="https://www.themoviedb.org/">TMDB</a>{" "}
          account
        </div>
        <form
          className="login-form"
          onSubmit={async (event) => {
            validateLogin(event,name,password)
          }}
        >
          <label style={{color: "#fff"}}>Username</label>
          <input
            autoComplete="false"
            className="login-name-input"
            type="text"
            placeholder="Enter Your Username"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>

          <label style={{color: "#fff"}}>Password</label>
          <input
            autoComplete="false"
            className="login-password-input"
            type="password"
            placeholder="Enter Your Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <button className="login-submit" type="submit">
            SIGN IN
          </button>
        </form>
        <div className="dontHaveAcc-div">
          <span style={{color: "#fff"}}>
            Dont have an account? <a href="/">Sign Up</a>
          </span>
        </div>
      </div>
    </div>
  );
}
