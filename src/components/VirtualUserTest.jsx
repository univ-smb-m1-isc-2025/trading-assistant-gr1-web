import React from "react";
import styled from "styled-components";
import {
  createVirtualUser,
  clearVirtualUser,
  getVirtualUser,
} from "../utils/userUtils";
import Logo from "./reusable-ui/Logo";

const TestPageStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 100px;
  background-color: #18191f;
  color: #e9ecef;
  font-family: "Poppins", sans-serif;
`;

const TestContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #2b3139;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TestTitle = styled.h2`
  color: #2087f1;
  margin-bottom: 2rem;
  font-size: 36px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 800;
  color: white;
  background-color: ${(props) => (props.danger ? "#dc3545" : "#2087f1")};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c82333" : "#0056b3")};
  }
`;

const VirtualUserTest = () => {
  const handleCreateUser = () => {
    createVirtualUser();
    alert("Utilisateur virtuel créé avec succès !");
  };

  const handleClearUser = () => {
    clearVirtualUser();
    alert("Utilisateur virtuel supprimé !");
  };

  const handleCheckUser = () => {
    const user = getVirtualUser();
    if (user) {
      alert("Utilisateur virtuel trouvé :\n" + JSON.stringify(user, null, 2));
    } else {
      alert("Aucun utilisateur virtuel trouvé");
    }
  };

  return (
    <TestPageStyled>
      <Logo />
      <TestContainer>
        <TestTitle>Test Utilisateur Virtuel</TestTitle>
        <ButtonContainer>
          <Button onClick={handleCreateUser}>
            Créer un utilisateur virtuel
          </Button>
          <Button onClick={handleCheckUser}>Vérifier l'utilisateur</Button>
          <Button danger onClick={handleClearUser}>
            Supprimer l'utilisateur
          </Button>
        </ButtonContainer>
      </TestContainer>
    </TestPageStyled>
  );
};

export default VirtualUserTest;
