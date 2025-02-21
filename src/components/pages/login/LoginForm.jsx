import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  // state
  const [inputEmail, setInputEmail] = useState("");
  const navigate = useNavigate();

  // comportement
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setInputEmail("");
    navigate(`/home/${inputEmail}`);
  };

  const handleChange = (evt) => {
    setInputEmail(evt.target.value);
  };

  // render
  return (
    <form action="submit" onSubmit={handleSubmit}>
      <h1>Connexion</h1>

      <input
        value={inputEmail}
        onChange={handleChange}
        type="text"
        placeholder="Email"
      />

      <input type="password" placeholder="Password" required />

      <button type="submit">Login</button>
    </form>
  );
}
