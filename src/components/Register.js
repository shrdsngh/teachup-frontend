import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("0");

  const [emptyMessage, setEmptyMessage] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleUsernameChange(e) {
    setEmptyMessage(false);
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setEmptyMessage(false);
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setMailError(false);
    setEmptyMessage(false);
    setEmail(e.target.value);
  }

  function handleContactChange(e) {
    setEmptyMessage(false);
    setContact(e.target.value);
  }

  function handleRegistration(e) {
    e.preventDefault();
    let registerObject = { username, password, email, contact, role };

    if (IsValidate()) {
      axios
        .post("/user/register", registerObject)
        .then((res) => {
          if (res.data.message === "User Created Successfully") {
            alert("User created Successfully");
            navigate("/login");
          } else {
            setMessage(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setEmptyMessage(true);
    }
  }

  const IsValidate = () => {
    let isProceed = true;
    let errorMessage = "Please enter the value in ";
    if (username === "" || username === null) {
      isProceed = false;
      errorMessage += "username ";
    }
    if (password === "" || password === null) {
      isProceed = false;
      errorMessage += "password ";
    }
    if (contact === "" || contact === null) {
      isProceed = false;
      errorMessage += "contact ";
    }
    if (email === "" || email === null) {
      isProceed = false;
      errorMessage += "email ";
    }
    if (!isProceed) {
      console.warn(errorMessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isProceed = false;
        setMailError(true);
        // alert("Please enter valid email");
      }
    }
    return isProceed;
  };

  useEffect(() => {}, [message]);

  return (
    <div>
      {message ? <p>{message}</p> : null}
      {mailError ? (
        <p style={{ color: "red" }}>Please enter valid email!</p>
      ) : null}
      {emptyMessage ? (
        <p style={{ color: "red" }}>
          Please provide all the credentials correctly!
        </p>
      ) : null}
      <form>
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
          value={password}
          onChange={(e) => handlePasswordChange(e)}
        ></input>
        <br />
        <br />
        <br />
        <input
          type="email"
          placeholder="EMAIL ID"
          value={email}
          onChange={(e) => handleEmailChange(e)}
        ></input>
        <br />
        <br />
        <br />
        <input
          type="number"
          placeholder="PHONE NO."
          value={contact}
          onChange={(e) => handleContactChange(e)}
        ></input>
        <br />
        <br />
        <br />
        <select
          placeholder="role"
          defaultValue={0}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value={1}>Admin</option>
          <option value={0}>Instructor</option>
        </select>
        <br />
        <br />
        <br />
        <button type="submit" onClick={handleRegistration}>
          Register
        </button>
        {"  "}
        <Link to={"/login"}>Have an account?</Link>
      </form>
    </div>
  );
}

export default Register;
