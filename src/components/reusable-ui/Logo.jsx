import styled from "styled-components";

export default function Logo() {
  return (
    <LogoStyled>
      <h3>Trademate</h3>
      <img src="/images/logo.png" alt="logo-trade-mate" className="logo" />
    </LogoStyled>
  );
}

const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;

  .logo {
    width: 60px;
    height: 60px;
  }

  h3 {
    color: #2087f1;
    font-size: 28px;
  }
`;
