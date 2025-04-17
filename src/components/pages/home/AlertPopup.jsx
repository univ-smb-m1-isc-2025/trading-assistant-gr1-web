import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import styled from "styled-components";

export default function AlertPopup({ symbol, onClose }) {
  const [alertType, setAlertType] = useState("");
  const [threshold, setThreshold] = useState("");
  const [days, setDays] = useState("");
  const [pattern, setPattern] = useState("");
  const [priceLevel, setPriceLevel] = useState("");

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    const userId = jwtDecode(token)?.id;

    if (!userId) {
      console.error("ID utilisateur introuvable.");
      return;
    }

    // Construisez les paramètres de requête en excluant les valeurs null ou undefined
    const queryParams = new URLSearchParams();
    if (symbol) queryParams.append("symbol", symbol);
    if (alertType) queryParams.append("alertType", alertType);
    if (threshold) queryParams.append("threshold", threshold);
    if (days) queryParams.append("days", days);
    if (pattern) queryParams.append("pattern", pattern);
    if (priceLevel) queryParams.append("priceLevel", priceLevel);

    try {
      const response = await fetch(
        `/api/alerts/${userId}?${queryParams.toString()}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Ajoutez le token dans l'en-tête
          },
        }
      );

      if (response.ok) {
        console.log("Alerte enregistrée avec succès !");
        onClose(); // Fermez la popup
      } else {
        console.error(
          "Erreur lors de l'enregistrement de l'alerte :",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <PopupOverlay>
      <PopupContainer>
        <h2>Créer une alerte</h2>
        <form>
          <div className="form-group">
            <label>Type d'alerte</label>
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              required
            >
              <option value="">Sélectionnez un type</option>
              <option value="moving_average_cross">
                Croisement de moyennes mobiles
              </option>
              <option value="price_variation">Variation de prix</option>
              <option value="volume_spike">Pic de volume</option>
              <option value="pattern_detection">Détection de motif</option>
              <option value="price_breakout">Cassure de prix</option>
            </select>
          </div>

          {alertType === "moving_average_cross" && (
            <div className="form-group">
              <label>Nombre de jours</label>
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                required
              >
                <option value="">Sélectionnez un nombre de jours</option>
                <option value="10">10 jours</option>
                <option value="50">50 jours</option>
                <option value="200">200 jours</option>
              </select>
            </div>
          )}

          {alertType === "price_variation" && (
            <div className="form-group">
              <label>Seuil (%)</label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
              />
            </div>
          )}

          {alertType === "volume_spike" && (
            <>
              <div className="form-group">
                <label>Seuil (%)</label>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Jours</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {alertType === "pattern_detection" && (
            <div className="form-group">
              <label>Motif</label>
              <select
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                required
              >
                <option value="">Sélectionnez un motif</option>
                <option value="Bullish Engulfing">Bullish Engulfing</option>
                <option value="Bearish Engulfing">Bearish Engulfing</option>
                <option value="Morning Star">Morning Star</option>
                <option value="Evening Star">Evening Star</option>
                <option value="Hammer">Hammer</option>
                <option value="Shooting Star">Shooting Star</option>
                <option value="Dragonfly Doji">Dragonfly Doji</option>
                <option value="Gravestone Doji">Gravestone Doji</option>
              </select>
            </div>
          )}

          {alertType === "price_breakout" && (
            <div className="form-group">
              <label>Niveau de prix</label>
              <input
                type="number"
                value={priceLevel}
                onChange={(e) => setPriceLevel(e.target.value)}
              />
            </div>
          )}
        </form>
        <div className="actions">
          <button onClick={onClose}>Annuler</button>
          <button onClick={handleSave}>Enregistrer</button>
        </div>
      </PopupContainer>
    </PopupOverlay>
  );
}

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: #1e222d;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  color: #d1d4dc;

  h2 {
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 16px;

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
    }

    input,
    select {
      width: 100%;
      padding: 8px;
      border: 1px solid #2a2e39;
      border-radius: 4px;
      background: #2a2e39;
      color: #d1d4dc;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:first-child {
      background: #ef5350;
      color: white;
    }

    button:last-child {
      background: #2962ff;
      color: white;
    }
  }
`;
