import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    <LoginFormStyled action="submit" onSubmit={handleSubmit}>
      <div>
        <h1>Bienvenue !</h1>
        <hr />
        <h2>Connexion</h2>
      </div>

      <div>
        <input
          value={inputEmail}
          onChange={handleChange}
          type="text"
          placeholder="Email"
        />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </div>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.form`
  background: green;
  text-align: center;
  max-width: 500px;
  min-width: 400px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;

  hr {
    border: 1.5px solid #2087f1;
    margin: 40px 0;
  }

  h1 {
    color: white;
    font-size: 48px;
  }

  h2 {
    margin: 20px 10px 10px;
    color: white;
    font-size: 36px;
  }
`;
