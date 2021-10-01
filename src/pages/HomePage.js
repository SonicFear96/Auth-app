import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const HomePage = () => {
  const [data, setData] = useState({ login: "", password: "" });
  const history = useHistory();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.auth === "true") {
          localStorage.setItem("auth", data.auth);
          history.push("/profile");
        } else {
          //react toast
          console.log(data);
        }
      })
      .catch((err) => console.log(err)); //react toast
  };

  return (
    <div>
      <input
        type="text"
        name="login"
        placeholder="login"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={(e) => handleChange(e)}
      />
      <button onClick={(e) => handleSubmit(e)}>Войти</button>
    </div>
  );
};
