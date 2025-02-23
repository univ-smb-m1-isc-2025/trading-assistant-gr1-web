import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
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
        <div className="input-with-icon">
          <BsPersonCircle className="icon" />
          <input
            value={inputEmail}
            onChange={handleChange}
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="input-with-icon">
          <RiLockPasswordFill className="icon" />
          <input type="password" placeholder="Password" required />
        </div>

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

  .input-with-icon {
    /* border: 1px solid red; */
    background-color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 18px 24px;
    margin: 18px 0;

    .icon {
      font-size: 15px;
      margin-right: 8px;
      color: #93a2b1;
    }

    input {
      border: none;
      font-size: 15px;
      color: #17161a;
    }

    &::placeholder {
      background: white;
      color: lightgrey;
    }
  }
`;
