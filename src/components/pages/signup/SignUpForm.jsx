import React, { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Input from "../../reusable-ui/Input";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

export default function SignUpForm() {
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    navigate(`/home`);
  };

  return (
    <SignUpFormStyled action="submit" onSubmit={handleSubmit}>
      <div className="signup-form">
        <div className="header">
          <h3>Trademate</h3>
          <h2>Créer un compte</h2>
        </div>

        <Input
          type={"text"}
          placeholder={"Prénom"}
          required
          Icon={<BsPersonCircle className="icon" />}
        />

        <Input
          type={"text"}
          placeholder={"Nom"}
          required
          Icon={<BsPersonCircle className="icon" />}
        />

        <Input
          type={"email"}
          placeholder={"Email"}
          required
          Icon={<AiOutlineMail className="icon" />}
        />

        <Input
          type={"tel"}
          placeholder={"Téléphone"}
          required
          Icon={<AiOutlinePhone className="icon" />}
        />

        <Input
          type={"password"}
          placeholder={"Mot de passe"}
          required
          Icon={<RiLockPasswordFill className="icon" />}
        />

        <button className="button-with-icon">
          <span type="submit">S'inscrire</span>
          <IoChevronForward className="icon" />
        </button>

        <div className="or">
          <hr />
          <p>ou</p>
          <hr />
        </div>

        <div className="google-button">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              console.log(jwtDecode(credentialResponse.credential));
              navigate(`/home`);
            }}
            onError={() => console.log("Google Sign-Up échoué")}
            auto_select={true}
            theme="filled_black"
            shape="rectangular"
            text="signup_with"
            size="large"
            logo_alignment="left"
            ux_mode="popup"
          />
        </div>
      </div>
      <p className="login">
        <Link to="/login">Connexion</Link>
      </p>
    </SignUpFormStyled>
  );
}

const SignUpFormStyled = styled.form`
  text-align: center;
  font-family: "Poppins", sans-serif;
  padding-bottom: 100px;

  .signup-form {
    text-align: center;
    max-width: 500px;
    min-width: 400px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    border: solid 2px #2b3139;
    border-radius: 20px;

    .header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      h3 {
        color: #2087f1;
        font-size: 28px;
      }
    }

    .or {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      margin: 20px 0;

      p {
        color: #e9ecef;
        margin: 0 10px;
      }

      hr {
        border: 1px solid #2b3139;
        width: 100%;
      }
    }

    h2 {
      margin: 20px 10px 10px 0;
      color: #e9ecef;
      font-size: 36px;
    }

    .google-button {
      margin: 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .button-with-icon {
      width: 100%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      white-space: nowrap;
      text-decoration: none;
      line-height: 1;

      padding: 18px 24px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 800;
      color: white;
      background-color: #2087f1;
      border: 1px solid #2087f1;

      &:hover:not(:disabled) {
        background-color: #18191f;
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
  }

  .login {
    margin-top: 20px;
    color: #e9ecef;
    font-size: 15px;

    a {
      color: #2087f1;
      text-decoration: none;
      font-weight: 800;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
