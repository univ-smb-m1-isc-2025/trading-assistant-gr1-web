import LoginForm from "./LoginForm.jsx";
import styled from "styled-components";

export default function LoginPage() {
  // state

  // comportement

  // render
  return (
    <LoginPageStyled>
      <LoginForm />
    </LoginPageStyled>
  );
}

const LoginPageStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 100px;
  background-color: #18191f;
`;
