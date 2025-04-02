export const createVirtualUser = () => {
  const virtualUser = {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    createdAt: new Date().toISOString(),
    preferences: {
      theme: "sombre",
      notifications: "activées",
      langue: "français",
      devise: "EUR",
    },
    tradingPreferences: {
      risque: "modéré",
      stratégie: "long terme",
      instruments: ["actions", "ETF", "crypto"],
    },
  };

  localStorage.setItem("user", JSON.stringify(virtualUser));
  localStorage.setItem(
    "token",
    "virtual-token-" + Math.random().toString(36).substr(2)
  );

  return virtualUser;
};

export const clearVirtualUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getVirtualUser = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};
