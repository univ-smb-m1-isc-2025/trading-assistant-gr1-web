import LoginForm from "./LoginForm.jsx";
import styled from "styled-components";
import Logo from "../../reusable-ui/Logo.jsx";

export default function LoginPage() {
  // state

  // comportement

  // render
  return (
    <LoginPageStyled>
      {/* <Logo /> */}
      <LoginForm />
    </LoginPageStyled>
  );
}

const LoginPageStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 100px;
  background-color: #18191f;
`;
