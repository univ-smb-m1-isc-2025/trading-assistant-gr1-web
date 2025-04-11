import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../../reusable-ui/Logo";
import { jwtDecode } from "jwt-decode";

const ProfilePageStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 100px;
  background-color: #18191f;
  color: #e9ecef;
  font-family: "Poppins", sans-serif;

  .error {
    color: red;
    margin-top: 10px;
  }

  .success {
    color: green;
    margin-top: 10px;
  }
`;

const ProfileContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #2b3139;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileTitle = styled.h1`
  color: #2087f1;
  margin: 0;
  font-size: 36px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 800;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #18191f;
  border-radius: 10px;
`;

const ProfileLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #2087f1;
`;

const ProfileValue = styled.div`
  padding: 0.5rem;
  color: #e9ecef;
`;

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Récupérer les informations du profil depuis le localStorage
    const token = localStorage.getItem("authToken");
    const userData = jwtDecode(token);

    if (userData) {
      setUserProfile(userData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleDeleteProfile = async () => {
    try {
      const apiURL = import.meta.env.VITE_URL_API;

      const token = localStorage.getItem("authToken");

      console.log("Token REQUEST : ", token);

      // Vérifier si l'utilisateur est connecté
      if (!token) {
        setError("Vous devez être connecté pour supprimer votre profil.");
        return;
      }

      if (
        window.confirm(
          "Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible."
        )
      ) {
        // `${apiURL}/api/finance/chart/${symbol}?range=${range}`
        const id = 8;

        const response = await fetch(`/api/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setSuccess("Profil supprimé avec succès !");
          // Supprimer le token du localStorage
          localStorage.removeItem("authToken");
          // Rediriger vers la page de connexion
          navigate("/login");
        } else {
          const errorData = await response.json();
          console.log("Error data: ", errorData);
          setError("Une erreur est survenue lors de la suppression du profil.");
        }
      }
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer plus tard.");
    }
  };

  if (!userProfile) {
    return <div>Chargement...</div>;
  }

  return (
    <ProfilePageStyled>
      <Logo />
      <ProfileContainer>
        <ProfileHeader>
          <ProfileTitle>Mon Profil</ProfileTitle>
          <DeleteButton onClick={handleDeleteProfile}>
            Supprimer le profil
          </DeleteButton>
        </ProfileHeader>

        <ProfileSection>
          <ProfileLabel>Email</ProfileLabel>
          <ProfileValue>{userProfile.sub}</ProfileValue>
        </ProfileSection>

        <ProfileSection>
          <ProfileLabel>IAT</ProfileLabel>
          <ProfileValue>{userProfile.iat}</ProfileValue>
        </ProfileSection>

        <ProfileSection>
          <ProfileLabel>EXP</ProfileLabel>
          <ProfileValue>{userProfile.exp}</ProfileValue>
        </ProfileSection>
      </ProfileContainer>
      {/* Affichage des messages d'erreur ou de succès */}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </ProfilePageStyled>
  );
};

export default ProfilePage;
