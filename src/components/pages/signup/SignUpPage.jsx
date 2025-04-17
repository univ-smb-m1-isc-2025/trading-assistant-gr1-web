import SignUpForm from "./SignUpForm.jsx";
import styled from "styled-components";

export default function SignUpPage() {
  return (
    <SignUpPageStyled>
      <SignUpForm />
    </SignUpPageStyled>
  );
}

const SignUpPageStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 100px;
  background-color: #18191f;
`;
