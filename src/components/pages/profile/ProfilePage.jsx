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
    const token =
      localStorage.getItem("authToken") || localStorage.getItem("googleToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const userData = jwtDecode(token);
      setUserProfile(userData);
    } catch (error) {
      console.error("Erreur lors du décodage du token : ", error);
      setError("Erreur lors de la récupération des informations du profil.");
      navigate("/login");
    }
  }, [navigate]);

  const handleDeleteProfile = async () => {
    try {
      const token =
        localStorage.getItem("authToken") ||
        localStorage.getItem("googleToken");

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
        const id = userProfile.id;

        const apiURL = import.meta.env.VITE_URL_API;

        const response = await fetch(`/api/api/users/${id}`, {
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
          localStorage.removeItem("googleToken");
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

  // Déterminer si c'est une connexion classique ou via Google
  const isGoogleLogin = userProfile.name && userProfile.given_name;

  return (
    <ProfilePageStyled>
      <Logo />
      <ProfileContainer>
        <ProfileHeader>
          <ProfileTitle>Mon Profil</ProfileTitle>
          {!isGoogleLogin && (
            <DeleteButton onClick={handleDeleteProfile}>
              Supprimer le profil
            </DeleteButton>
          )}
        </ProfileHeader>

        {isGoogleLogin ? (
          // Affichage pour une connexion Google
          <>
            <ProfileSection>
              <ProfileLabel>Nom complet</ProfileLabel>
              <ProfileValue>{userProfile.name}</ProfileValue>
            </ProfileSection>
            <ProfileSection>
              <ProfileLabel>Email</ProfileLabel>
              <ProfileValue>{userProfile.email}</ProfileValue>
            </ProfileSection>
            <ProfileSection>
              <ProfileLabel>Email vérifié</ProfileLabel>
              <ProfileValue>
                {userProfile.email_verified ? "Oui" : "Non"}
              </ProfileValue>
            </ProfileSection>
            <ProfileSection>
              <ProfileLabel>Prénom</ProfileLabel>
              <ProfileValue>{userProfile.given_name}</ProfileValue>
            </ProfileSection>
            <ProfileSection>
              <ProfileLabel>Nom</ProfileLabel>
              <ProfileValue>{userProfile.family_name}</ProfileValue>
            </ProfileSection>
          </>
        ) : (
          // Affichage pour une connexion classique
          <>
            <ProfileSection>
              <ProfileLabel>Prénom</ProfileLabel>
              <ProfileValue>{userProfile.prenom}</ProfileValue>
            </ProfileSection>
            <ProfileSection>
              <ProfileLabel>Nom</ProfileLabel>
              <ProfileValue>{userProfile.nom}</ProfileValue>
            </ProfileSection>
            <ProfileSection>
              <ProfileLabel>Email</ProfileLabel>
              <ProfileValue>{userProfile.email}</ProfileValue>
            </ProfileSection>
            <ProfileSection>
              <ProfileLabel>Téléphone</ProfileLabel>
              <ProfileValue>{userProfile.telephone}</ProfileValue>
            </ProfileSection>
            <ProfileSection>
              <ProfileLabel>Date de création</ProfileLabel>
              <ProfileValue>
                {new Date(userProfile.created_at).toLocaleDateString("fr-FR")}
              </ProfileValue>
            </ProfileSection>
          </>
        )}
      </ProfileContainer>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </ProfilePageStyled>
  );
};

export default ProfilePage;
