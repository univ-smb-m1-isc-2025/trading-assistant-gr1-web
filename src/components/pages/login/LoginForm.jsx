import React, { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Input from "../../reusable-ui/Input";
import { BsPersonCircle } from "react-icons/bs";
import Logo from "../../reusable-ui/Logo";

export default function LoginForm() {
  // state
  // const [inputEmail, setInputEmail] = useState("");
  const navigate = useNavigate();

  // comportement
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // setInputEmail("");
    navigate(`/home`);
  };

  // const handleChange = (evt) => {
  //   setInputEmail(evt.target.value);
  // };

  // render
  return (
    <LoginFormStyled action="submit" onSubmit={handleSubmit}>
      <div className="login-form">
        <div className="header">
          <Logo />
          {/* <h3>Trademate</h3> */}
          <h2>Connexion</h2>
        </div>
        <Input
          type={"text"}
          placeholder={"Email"}
          required
          Icon={<BsPersonCircle className="icon" />}
        />

        <Input
          type={"password"}
          placeholder={"Password"}
          required
          Icon={<RiLockPasswordFill className="icon" />}
        />

        <button className="button-with-icon">
          <span type="submit">Login</span>
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
            onError={() => console.log("login failed")}
            auto_select={true}
            // type="icon"
            theme="filled_black"
            shape="rectangular"
            text="continue_with"
            size="large"
            logo_alignment="left"
            ux_mode="popup"
          />
        </div>
      </div>
      <p className="signup">
        <Link to="/signup">Créer un compte TradeMate</Link>
      </p>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.form`
  text-align: center;
  font-family: "Poppins", sans-serif;

  .login-form {
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
        /* margin: 0 20px;*/
      }
    }

    h2 {
      margin: 10px 10px 10px 0;
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
      position: relative; //is used in case you want to create interactive icons where an icon replaces the text label.
      white-space: nowrap; //prevents the text label from wrapping to the next line.
      text-decoration: none; //removes the text decoration in case you’re applying the .btn class to a link.
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

  .signup {
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
