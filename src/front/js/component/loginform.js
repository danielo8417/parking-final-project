import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const LoginForm = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { actions, store } = useContext(Context);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    fetch(process.env.BACKEND_URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          actions.setToken(data.token);
          navigate("/privateuser");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login">
      <label htmlFor="username">User:</label>
      <input
        type="text"
        placeholder="E-Mail"
        onChange={handleChange}
        name="email"
        required
      /> <br />
      <label htmlFor="username">Password: </label>
      <input
        type="password"
        placeholder="Password"
        onChange={handleChange}
        name="password"
        required
      /> <br />
      <button className="registerbutton" onClick={handleClick}></button>
    </div>
  );
};
