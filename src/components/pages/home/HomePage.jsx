import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsPersonCircle, BsSearch, BsBell } from "react-icons/bs";
import Logo from "../../reusable-ui/Logo";
import { jwtDecode } from "jwt-decode";
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import AlertPopup from "./AlertPopup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const ChartComponent = ({
  data,
  colors: { backgroundColor = "#1e222d", textColor = "white" } = {},
}) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      console.error("Aucune donnée à afficher dans le graphique.");
      return;
    }

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });
    chart.timeScale().fitContent();

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, backgroundColor, textColor]);

  return (
    <div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default function HomePage() {
  const [symbol, setSymbol] = useState("");
  const [range, setRange] = useState("1mo");
  const [result, setResult] = useState(null);
  const [resultTrading, setResultTrading] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setResult(null);
    setResultTrading(null);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Token non trouvé. Veuillez vous connecter.");
        return;
      }

      const response = await fetch(
        `https://api.trademate.oups.net/api/finance/combined/${symbol}?range=${range}`,
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
        setResult(data.chart.chart.result[0]); // Données pour le graphique
        setResultTrading(data.patterns.candles); // Données des patterns
      } else {
        toast.error("Erreur lors de la récupération des données.");
        console.error("Erreur response :", await response.text());
      }
    } catch (err) {
      toast.error("Erreur réseau. Veuillez réessayer plus tard.");
      console.error("Erreur réseau :", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("authToken");
  };

  const handleSaveAlert = (alertData) => {
    toast.success("Alerte enregistrée avec succès !");
  };

  const userToken = localStorage.getItem("authToken");

  let user = null;

  if (userToken) {
    try {
      user = jwtDecode(userToken);
    } catch (error) {
      console.error("Erreur lors du décodage du token : ", error);
    }
  }

  return (
    <HomePageStyled>
      <Navbar>
        <div className="logo">
          <Link to="/home">
            <Logo />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/home">Accueil</Link>
          <Link to="/markets">Marchés</Link>
          <Link to="/portfolio">Portefeuille</Link>
          <Link to="/about">À propos</Link>
        </div>
        <div
          className="account"
          onMouseEnter={() => setIsAccountPopupOpen(true)}
          onMouseLeave={() => setIsAccountPopupOpen(false)}
        >
          <Link to="/profile">
            <BsPersonCircle className="icon" />
            <span>{`${user.prenom} ${user.nom}`}</span>
          </Link>
          {isAccountPopupOpen && (
            <div className="account-popup">
              <Link to="/profile" className="popup-item">
                Voir le profil
              </Link>
              <button
                onClick={handleLogout}
                className="popup-item logout-button"
              >
                Se déconnecter
              </button>
            </div>
          )}
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
                <button
                  className="action-button"
                  onClick={() => setIsPopupOpen(true)}
                >
                  <BsBell />
                  <span>Créer une alerte</span>
                </button>
              </div>

              {isPopupOpen && (
                <AlertPopup
                  symbol={result.meta.symbol}
                  onClose={() => setIsPopupOpen(false)}
                  onSave={handleSaveAlert}
                />
              )}
            </div>
            <div className="chart-container">
              {resultTrading &&
                // Formatage des données avant de les passer au ChartComponent
                (() => {
                  const formattedData = resultTrading.map((item) => ({
                    time: item.date.split("T")[0], // Extrait uniquement la partie "YYYY-MM-DD" de la date
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    close: item.close,
                  }));

                  return (
                    <ChartComponent
                      data={formattedData}
                      colors={{
                        backgroundColor: "#1e222d",
                        textColor: "white",
                      }}
                    />
                  );
                })()}
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

    a {
      text-decoration: none;
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
    position: relative;
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

    .account-popup {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #1e222d;
      border: 1px solid #2a2e39;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      padding: 8px 0;
      z-index: 1000;

      .popup-item {
        display: block;
        padding: 8px 16px;
        font-size: 13px;
        color: #d1d4dc;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background-color: rgba(41, 98, 255, 0.1);
          color: #2962ff;
        }

        &:last-child {
          border-top: 1px solid #2a2e39;
        }
      }

      button {
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        padding: 8px 16px;
        font-size: 13px;
        color: #d1d4dc;
        cursor: pointer;

        &:hover {
          background-color: rgba(41, 98, 255, 0.1);
          color: #2962ff;
        }
      }

      .logout-button {
        color: #ef5350;
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
      height: 400px;
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
