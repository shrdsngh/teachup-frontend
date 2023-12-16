import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emptyMessage, setEmptyMessage] = useState(false);
  const [wrongData, setWrongData] = useState(false);

  const navigate = useNavigate();

  function handleUsernameChange(e) {
    setWrongData(false);
    setEmptyMessage(false);
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setWrongData(false);
    setEmptyMessage(false);
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (username && password) {
      axios.post("/user/login", { username, password }).then((res) => {
        if (!res.data.error) {
          localStorage.setItem("user", res.data.userDetail.username);
          console.log(res.data);
          if (res.data.userDetail.role === 1) {
            navigate("/admin");
          } else {
            navigate("/homepage");
          }
        } else if (res.data.error) {
          setWrongData(true);
        }
      });
    } else {
      setEmptyMessage(true);
    }
  }

  return (
    <div>
      {wrongData ? (
        <p style={{ color: "red" }}>Please enter correct credentials</p>
      ) : null}
      {emptyMessage ? (
        <p style={{ color: "red" }}>Please enter the required credentials!</p>
      ) : null}
      <form className="container">
        <br />
        <input
          placeholder="USERNAME"
          value={username}
          onChange={(e) => handleUsernameChange(e)}
        ></input>
        <br />
        <br />
        <br />
        <input
          placeholder="PASSWORD"
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
        ></input>
        <br />
        <br />
        <br />

        <button onClick={handleLogin} type="submit">
          Login
        </button>
        {"  "}
        <Link className="btn btn-success" to={"/register"}>
          New User?
        </Link>
      </form>
    </div>
  );
}

export default Login;
