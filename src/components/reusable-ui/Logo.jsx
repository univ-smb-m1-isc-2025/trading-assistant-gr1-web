import styled from "styled-components";

export default function Logo() {
  return (
    <LogoStyled>
      <h1>Trade</h1>
      <img src="/images/trademate-logo.png" alt="logo-trade-mate" />
      <h1>Mate</h1>
    </LogoStyled>
  );
}

const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  /* transform: scale(2.5); */

  h1 {
    display: inline;
    text-align: center;
    color: #2087f1;
    font-size: 36px;
    line-height: 1em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-family: "Poppins", sans-serif;
  }

  img {
    object-fit: contain;
    object-position: center;
    height: 80px;
    width: 80px;
    margin: 0 5px;
  }
`;
