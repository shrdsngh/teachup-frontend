import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const usenavigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    usenavigate("/login");
  }
  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
