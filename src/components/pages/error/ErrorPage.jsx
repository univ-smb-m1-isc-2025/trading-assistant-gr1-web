import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPage() {
  return (
    <ErrorPageStyled>
      <div className="error-container">
        <h1>404</h1>
        <p>Oups ! La page que vous recherchez n'existe pas.</p>
        <Link to="/home">
          <button>Retourner à l'accueil</button>
        </Link>
      </div>
    </ErrorPageStyled>
  );
}

const ErrorPageStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #18191f;
  color: #e9ecef;
  font-family: "Poppins", sans-serif;

  .error-container {
    text-align: center;

    h1 {
      font-size: 120px;
      color: #dc3545;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      margin-bottom: 30px;
    }

    a {
      text-decoration: none;

      button {
        padding: 12px 24px;
        font-size: 16px;
        font-weight: bold;
        color: white;
        background-color: #2087f1;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: #0056b3;
        }

        &:active {
          background-color: #003f7f;
        }
      }
    }
  }
`;
