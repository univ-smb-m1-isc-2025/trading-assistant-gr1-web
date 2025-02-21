import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  // state
  const [inputEmail, setInputEmail] = useState("");

  // comportement
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Bonjour ${inputEmail}`);
    setInputEmail("");
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
      <Link to="/home">Vers HomePage</Link>
    </form>
  );
}
