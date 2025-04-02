import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../../reusable-ui/Logo";

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

  useEffect(() => {
    // Récupérer les informations du profil depuis le localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserProfile(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleDeleteProfile = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible."
      )
    ) {
      // Supprimer les données du localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // Rediriger vers la page de connexion
      navigate("/login");
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
          <ProfileLabel>Nom</ProfileLabel>
          <ProfileValue>{userProfile.name}</ProfileValue>
        </ProfileSection>

        <ProfileSection>
          <ProfileLabel>Email</ProfileLabel>
          <ProfileValue>{userProfile.email}</ProfileValue>
        </ProfileSection>

        <ProfileSection>
          <ProfileLabel>Date d'inscription</ProfileLabel>
          <ProfileValue>
            {new Date(userProfile.createdAt).toLocaleDateString("fr-FR")}
          </ProfileValue>
        </ProfileSection>

        {userProfile.preferences && (
          <ProfileSection>
            <ProfileLabel>Préférences</ProfileLabel>
            <ProfileValue>
              {Object.entries(userProfile.preferences).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </ProfileValue>
          </ProfileSection>
        )}

        {userProfile.tradingPreferences && (
          <ProfileSection>
            <ProfileLabel>Préférences de Trading</ProfileLabel>
            <ProfileValue>
              {Object.entries(userProfile.tradingPreferences).map(
                ([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong>{" "}
                    {Array.isArray(value) ? value.join(", ") : value}
                  </div>
                )
              )}
            </ProfileValue>
          </ProfileSection>
        )}
      </ProfileContainer>
    </ProfilePageStyled>
  );
};

export default ProfilePage;
