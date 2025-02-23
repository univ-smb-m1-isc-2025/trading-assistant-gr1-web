import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { IoChevronForward } from "react-icons/io5";
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

        <button className="button-with-icon">
          <span type="submit">Login</span>
          <IoChevronForward className="icon" />
        </button>
      </div>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.form`
  /* background: green; */
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
      width: 100%;
    }

    &::placeholder {
      background: white;
      color: lightgrey;
    }
  }

  .button-with-icon {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative; //is used in case you want to create interactive icons where an icon replaces the text label.
    white-space: nowrap; //prevents the text label from wrapping to the next line.
    text-decoration: none; //removes the text decoration in case you’re applying the .btn class to a link.
    line-height: 1;

    padding: 18px 24px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 800;
    color: white;
    background-color: #2087f1;
    border: 1px solid #2087f1;

    &:hover:not(:disabled) {
      background-color: white;
      color: #2087f1;
      border: 1px solid #2087f1;
      transition: all 200ms ease-out;
    }

    &:active {
      color: white;
      background-color: #2087f1;
      border: 1px solid #2087f1;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &.with-focus {
      border: 1px solid white;
      background-color: white;
      color: #2087f1;
      :hover {
        color: white;
        background-color: #2087f1;
        border: 1px solid white;
      }
      :active {
        background-color: white;
        color: #2087f1;
      }
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      margin-left: 10px;
    }
  }
`;
