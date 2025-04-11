import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  BsPersonCircle,
  BsSearch,
  BsArrowUpRight,
  BsArrowDownRight,
  BsBell,
  BsStar,
} from "react-icons/bs";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import Logo from "../../reusable-ui/Logo";
import { jwtDecode } from "jwt-decode";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Configuration du graphique
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#1e222d",
      titleColor: "#2962ff",
      bodyColor: "#d1d4dc",
      borderColor: "#2a2e39",
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: function (context) {
          return `Prix: $${context.parsed.y.toFixed(2)}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "#2a2e39",
        drawBorder: false,
      },
      ticks: {
        color: "#787b86",
        font: {
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: "#2a2e39",
        drawBorder: false,
      },
      ticks: {
        color: "#787b86",
        font: {
          size: 11,
        },
      },
    },
  },
};

export default function HomePage() {
  const [symbol, setSymbol] = useState("");
  const [range, setRange] = useState("1mo");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      console.log("Token REQUEST : ", token);

      // `${apiURL}/api/finance/chart/${symbol}?range=${range}`
      const response = await fetch(
        `/api/api/finance/chart/${symbol}?range=${range}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResult(data.chart.result[0]);
      } else {
        setError("Erreur lors de la récupération des données.");
      }
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = result
    ? {
        labels: result.timestamp.map((ts) =>
          new Date(ts * 1000).toLocaleDateString("fr-FR")
        ),
        datasets: [
          {
            label: `Prix de clôture (${result.meta.currency})`,
            data: result.indicators.quote[0].close,
            borderColor: "#2962ff",
            backgroundColor: "rgba(41, 98, 255, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: "#2962ff",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            pointHoverRadius: 6,
            pointStyle: "circle",
            pointBackgroundColor: "#2962ff",
            pointBorderColor: "#2962ff",
          },
        ],
      }
    : null;

  // const userCoded = localStorage.getItem("googleToken");
  // const userUncoded = jwtDecode(userCoded);

  const userToken = localStorage.getItem("authToken");
  const user = jwtDecode(userToken);
  console.log("User : ", user);

  return (
    <HomePageStyled>
      <Navbar>
        <div className="logo">
          <Link to="/home">
            <img src="/images/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/home">Accueil</Link>
          <Link to="/markets">Marchés</Link>
          <Link to="/portfolio">Portefeuille</Link>
          <Link to="/about">À propos</Link>
        </div>
        <div className="account">
          <Link to="/profile">
            <BsPersonCircle className="icon" />
            <span>{user.sub}</span>
            {/* <span>Profil</span> */}
          </Link>
        </div>
      </Navbar>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <BsSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un symbole boursier..."
              value={symbol}
              onChange={(e) => {
                setSymbol(e.target.value);
              }}
              required
              className="search-input"
            />
          </div>

          <div className="range-selector">
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
          </div>

          <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading ? "Recherche..." : "Rechercher"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>

      {result && (
        <div className="content">
          <div className="chart-section">
            <div className="chart-header">
              <h2>{result.meta.longName || result.meta.symbol}</h2>
              <div className="chart-actions">
                <button className="action-button">
                  <BsStar />
                  <span>Surveiller</span>
                </button>
                <button className="action-button">
                  <BsBell />
                  <span>Créer une alerte</span>
                </button>
              </div>
            </div>
            <div className="chart-container">
              {chartData && <Line data={chartData} options={chartOptions} />}
            </div>
          </div>

          <div className="info-section">
            <h3>Informations générales</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Symbole</span>
                <span className="value">{result.meta.symbol}</span>
              </div>
              <div className="info-item">
                <span className="label">Bourse</span>
                <span className="value">{result.meta.fullExchangeName}</span>
              </div>
              <div className="info-item">
                <span className="label">Type</span>
                <span className="value">{result.meta.instrumentType}</span>
              </div>
              <div className="info-item">
                <span className="label">Prix actuel</span>
                <span className="value">${result.meta.regularMarketPrice}</span>
              </div>
              <div className="info-item">
                <span className="label">Volume</span>
                <span className="value">{result.meta.regularMarketVolume}</span>
              </div>
              <div className="info-item">
                <span className="label">52 semaines - Haut</span>
                <span className="value">${result.meta.fiftyTwoWeekHigh}</span>
              </div>
              <div className="info-item">
                <span className="label">52 semaines - Bas</span>
                <span className="value">${result.meta.fiftyTwoWeekLow}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </HomePageStyled>
  );
}

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  background-color: #1e222d;
  color: #d1d4dc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: 64px;
  position: fixed;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #2a2e39;

  .logo {
    display: flex;
    align-items: center;

    img {
      height: 28px;
      margin-right: 8px;
    }
  }

  .nav-links {
    display: flex;
    gap: 24px;
    margin-left: 32px;

    a {
      text-decoration: none;
      color: #d1d4dc;
      font-weight: 500;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 4px;
      transition: all 0.2s ease;

      &:hover {
        color: #2962ff;
        background-color: rgba(41, 98, 255, 0.1);
      }
    }
  }

  .account {
    display: flex;
    align-items: center;
    gap: 16px;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #d1d4dc;
      font-weight: 500;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 4px;
      transition: all 0.2s ease;

      &:hover {
        color: #2962ff;
        background-color: rgba(41, 98, 255, 0.1);
      }

      .icon {
        font-size: 18px;
        margin-right: 8px;
      }
    }
  }
`;

const HomePageStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #131722;
  color: #d1d4dc;
  font-family: "Poppins", sans-serif;
  padding-top: 64px;

  .header {
    margin-top: 20px;
    text-align: center;
    padding: 0 20px;

    h1 {
      color: #d1d4dc;
      font-size: 24px;
      font-weight: 500;
    }
  }

  .search-section {
    width: 95%;
    max-width: 1400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #1e222d;
    border-radius: 8px;
    border: 1px solid #2a2e39;
  }

  .search-form {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .search-input-container {
    position: relative;
    flex: 1;

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #787b86;
      font-size: 14px;
    }

    .search-input {
      width: 100%;
      padding: 10px 12px 10px 36px;
      font-size: 13px;
      border: 1px solid #2a2e39;
      border-radius: 4px;
      outline: none;
      background-color: #2a2e39;
      color: #d1d4dc;
      transition: all 0.2s ease;

      &:focus {
        border-color: #2962ff;
        background-color: #2a2e39;
      }
    }
  }

  .suggestions-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #1e222d;
    border: 1px solid #2a2e39;
    border-radius: 4px;
    margin-top: 4px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .suggestion-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #2a2e39;

    &:hover {
      background-color: #2a2e39;
    }

    .suggestion-info {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .symbol {
        font-weight: 500;
        color: #d1d4dc;
        font-size: 13px;
      }

      .name {
        font-size: 11px;
        color: #787b86;
      }
    }

    .suggestion-price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;

      .price {
        font-weight: 500;
        font-size: 13px;
      }

      .change {
        font-size: 11px;
        display: flex;
        align-items: center;
        gap: 4px;

        &.positive {
          color: #26a69a;
        }

        &.negative {
          color: #ef5350;
        }
      }
    }
  }

  .range-selector {
    select {
      padding: 10px 12px;
      font-size: 13px;
      border: 1px solid #2a2e39;
      border-radius: 4px;
      outline: none;
      background-color: #2a2e39;
      color: #d1d4dc;
      transition: all 0.2s ease;

      &:focus {
        border-color: #2962ff;
      }
    }
  }

  .search-button {
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 500;
    color: #d1d4dc;
    background-color: #2962ff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background-color: #1e4bd8;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .content {
    display: flex;
    gap: 20px;
    width: 95%;
    max-width: 1400px;
    margin: 20px auto;
    padding-bottom: 100px;
  }

  .chart-section {
    flex: 2;
    background-color: #1e222d;
    border-radius: 8px;
    border: 1px solid #2a2e39;
    padding: 20px;

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #2a2e39;

      h2 {
        color: #d1d4dc;
        font-size: 18px;
        font-weight: 500;
      }

      .chart-actions {
        display: flex;
        gap: 12px;

        .action-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #d1d4dc;
          background-color: #2a2e39;
          border: 1px solid #2a2e39;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background-color: #2a2e39;
            border-color: #2962ff;
          }
        }
      }
    }

    .chart-container {
      height: 500px;
      position: relative;
    }
  }

  .info-section {
    flex: 1;
    background-color: #1e222d;
    border-radius: 8px;
    border: 1px solid #2a2e39;
    padding: 20px;

    h3 {
      color: #d1d4dc;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #2a2e39;
    }

    .info-grid {
      display: grid;
      gap: 16px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .label {
        color: #787b86;
        font-size: 12px;
      }

      .value {
        color: #d1d4dc;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .error {
    color: #ef5350;
    font-size: 12px;
    margin-top: 8px;
  }
`;
