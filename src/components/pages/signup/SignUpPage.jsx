import SignUpForm from "./SignUpForm.jsx";
import styled from "styled-components";
import Logo from "../../reusable-ui/Logo.jsx";

export default function SignUpPage() {
  // state

  // comportement

  // render
  return (
    <SignUpPageStyled>
      <Logo />
      <SignUpForm />
    </SignUpPageStyled>
  );
}

const SignUpPageStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    background: url("/images/chart-background.jpg") rgba(0, 0, 0, 0.7);
    background-size: cover;
    background-position: center;
    background-blend-mode: darken;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
