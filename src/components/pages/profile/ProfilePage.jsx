import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePageStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #131722; /* Couleur de fond de la HomePage */
  color: #d1d4dc; /* Couleur du texte */
  font-family: "Poppins", sans-serif;
  padding-top: 64px; /* Pour compenser un éventuel header fixe */
`;

const ProfileContainer = styled.div`
  max-width: 800px;
  width: 95%;
  margin: 20px auto;
  padding: 20px;
  background-color: #1e222d; /* Fond similaire à la HomePage */
  border-radius: 8px; /* Bordures arrondies */
  border: 1px solid #2a2e39; /* Bordure similaire à la HomePage */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre subtile */
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #2a2e39; /* Ligne de séparation */

  .buttons {
    display: flex;
    gap: 12px; /* Espacement entre les boutons */
  }
`;

const ProfileTitle = styled.h1`
  color: #2087f1; /* Couleur principale */
  margin: 0;
  font-size: 24px; /* Taille similaire aux titres de la HomePage */
  font-weight: 500;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px; /* Bordures arrondies */
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  background-color: #2a2e39; /* Fond des sections */
  border-radius: 4px; /* Bordures arrondies */
  border: 1px solid #2a2e39;
`;

const ProfileLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #2087f1; /* Couleur principale */
  font-size: 14px;
`;

const ProfileValue = styled.div`
  padding: 8px;
  color: #d1d4dc; /* Couleur du texte */
  font-size: 14px;
`;

const HomeButton = styled.button`
  background-color: #2087f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px; /* Bordures arrondies */
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1864ab;
  }
`;

const AlertsSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #1e222d;
  border-radius: 8px;
  border: 1px solid #2a2e39;

  h2 {
    color: #2087f1;
    font-size: 20px;
    margin-bottom: 16px;
  }

  .alert-item {
    padding: 12px;
    margin-bottom: 12px;
    background-color: #2a2e39;
    border-radius: 4px;
    border: 1px solid #2a2e39;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .alert-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .symbol {
        font-weight: bold;
        color: #d1d4dc;
      }

      .details {
        font-size: 14px;
        color: #787b86;
      }
    }

    .delete-button {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.3s ease;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les informations du profil depuis le localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const userData = jwtDecode(token);
      setUserProfile(userData);

      // Récupérer les alertes actives
      fetch(`/api/alerts/${userData.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setAlerts(data))
        .catch((err) => {
          console.error("Erreur lors de la récupération des alertes :", err);
          toast.error("Impossible de récupérer les alertes.");
        });
    } catch (error) {
      console.error("Erreur lors du décodage du token : ", error);
      toast.error("Erreur lors de la récupération des informations du profil.");
      navigate("/login");
    }
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/home");
  };

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");

      // Vérifier si l'utilisateur est connecté
      if (!token) {
        toast.error("Vous devez être connecté pour supprimer votre profil.");
        return;
      }

      if (
        window.confirm(
          "Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible."
        )
      ) {
        const id = userProfile.id;

        const response = await fetch(`/api/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          toast.success("Profil supprimé avec succès !");
          // Supprimer le token du localStorage
          localStorage.removeItem("authToken");
          // Rediriger vers la page de connexion
          navigate("/login");
        } else {
          const errorData = await response.json();
          console.log("Error data: ", errorData);
          toast.error(
            "Une erreur est survenue lors de la suppression du profil."
          );
        }
      }
    } catch (err) {
      toast.error("Erreur réseau. Veuillez réessayer plus tard.");
    }
  };

  const handleDeleteAlert = async (alertId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAlerts(alerts.filter((alert) => alert.id !== alertId));
        toast.success("Alerte supprimée avec succès !");
      } else {
        toast.error("Erreur lors de la suppression de l'alerte.");
      }
    } catch (err) {
      toast.error("Erreur réseau. Veuillez réessayer plus tard.");
    }
  };

  if (!userProfile) {
    return <div>Chargement...</div>;
  }

  return (
    <ProfilePageStyled>
      <ProfileContainer>
        <ProfileHeader>
          <ProfileTitle>Mon Profil</ProfileTitle>
          <div className="buttons">
            <HomeButton onClick={handleGoHome}>Revenir à l'accueil</HomeButton>
            <DeleteButton onClick={handleDeleteProfile}>
              Supprimer le profil
            </DeleteButton>
          </div>
        </ProfileHeader>

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

        <AlertsSection>
          <h2>Alertes Actives</h2>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div key={alert.id} className="alert-item">
                <div className="alert-info">
                  <span className="symbol">{alert.symbol}</span>
                  <span className="details">
                    Type : {alert.alertType}{" "}
                    {alert.threshold && `| Seuil : ${alert.threshold}% `}
                    {alert.priceLevel &&
                      `| Niveau de prix : $${alert.priceLevel}`}
                    {alert.days && `| Jours : ${alert.days}`}
                  </span>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteAlert(alert.id)}
                >
                  Supprimer
                </button>
              </div>
            ))
          ) : (
            <p>Aucune alerte active.</p>
          )}
        </AlertsSection>
      </ProfileContainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ProfilePageStyled>
  );
};

export default ProfilePage;
