import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function HomePage() {
  const { username } = useParams();

  // States pour la recherche, les résultats et la plage
  const [symbol, setSymbol] = useState("");
  const [range, setRange] = useState("1mo"); // Plage par défaut
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Fonction pour gérer la soumission du formulaire
  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `/api/v8/finance/chart/${symbol}?interval=1d&range=${range}`
      );

      if (response.ok) {
        const data = await response.json();
        setResult(data.chart.result[0]); // Stocke les résultats dans le state
      } else {
        setError("Erreur lors de la récupération des données.");
      }
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer plus tard.");
    }
  };

  // Préparer les données pour le graphique
  const chartData = result
    ? {
        labels: result.timestamp.map((ts) =>
          new Date(ts * 1000).toLocaleDateString("fr-FR")
        ), // Convertir les timestamps en dates lisibles
        datasets: [
          {
            label: `Prix de clôture (${result.meta.currency})`,
            data: result.indicators.quote[0].close, // Données des prix de clôture
            borderColor: "#2087f1",
            backgroundColor: "rgba(32, 135, 241, 0.2)",
            tension: 0.2, // Lissage de la courbe
          },
        ],
      }
    : null;

  return (
    <HomePageStyled>
      <div className="header">
        <h1>Bonjour {username}</h1>
      </div>

      <div className="search-container">
        <h2>Rechercher un symbole boursier</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Entrez un symbole (ex: AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
          <select value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="1d">1 jour</option>
            <option value="5d">5 jours</option>
            <option value="1mo">1 mois</option>
            <option value="3mo">3 mois</option>
            <option value="6mo">6 mois</option>
            <option value="1y">1 an</option>
            <option value="2y">2 ans</option>
            <option value="5y">5 ans</option>
            <option value="10y">10 ans</option>
            <option value="ytd">Depuis le début de l'année</option>
            <option value="max">Maximum</option>
          </select>
          <button type="submit">Rechercher</button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <h3>
              Résultats pour : {result.meta.longName || result.meta.symbol}
            </h3>
            <p>
              <strong>Symbole :</strong> {result.meta.symbol}
            </p>
            <p>
              <strong>Nom complet :</strong> {result.meta.fullExchangeName}
            </p>
            <p>
              <strong>Type d'instrument :</strong> {result.meta.instrumentType}
            </p>
            <p>
              <strong>Fuseau horaire :</strong> {result.meta.timezone}
            </p>
            <p>
              <strong>Prix actuel :</strong> ${result.meta.regularMarketPrice}
            </p>
            <p>
              <strong>Volume :</strong> {result.meta.regularMarketVolume}
            </p>
            <p>
              <strong>52 semaines - Haut :</strong> $
              {result.meta.fiftyTwoWeekHigh}
            </p>
            <p>
              <strong>52 semaines - Bas :</strong> $
              {result.meta.fiftyTwoWeekLow}
            </p>
            <p>
              <strong>Plage valide :</strong>{" "}
              {result.meta.validRanges.join(", ")}
            </p>

            {/* Affichage du graphique */}
            <div className="chart">
              <h4>Historique des prix ({range})</h4>
              <Line data={chartData} />
            </div>
          </div>
        )}
      </div>
      <Link to="/login">
        <button>Déconnexion</button>
      </Link>
    </HomePageStyled>
  );
}

const HomePageStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18191f;
  color: #e9ecef;
  font-family: "Poppins", sans-serif;

  .header {
    margin-top: 20px;
    text-align: center;

    h1 {
      color: #2087f1;
    }
  }

  .search-container {
    margin-top: 40px;
    text-align: center;
    max-width: 600px;
    width: 100%;
    padding: 20px;
    background-color: #2b3139;
    border-radius: 10px;

    h2 {
      margin-bottom: 20px;
      color: #2087f1;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;

      input,
      select {
        padding: 10px;
        font-size: 16px;
        border: 1px solid #2087f1;
        border-radius: 5px;
        outline: none;
      }

      button {
        padding: 10px;
        font-size: 16px;
        font-weight: bold;
        color: white;
        background-color: #2087f1;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #0056b3;
        }
      }
    }

    .error {
      margin-top: 20px;
      color: red;
    }

    .result {
      margin-top: 20px;
      text-align: left;

      h3 {
        color: #2087f1;
      }

      p {
        margin: 5px 0;
      }

      .chart {
        margin-top: 20px;
      }
    }
  }
  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #dc3545;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #a71d2a;
    }
  }
`;
