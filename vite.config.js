import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Charger les variables d'environnement
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Charge les variables d'environnement
  const apiURL = env.VITE_URL_API; // Accède à VITE_URL_API

  return {
    plugins: [react()],
    server: {
      allowedHosts: ["localhost", "www.trademate.oups.net"],
      proxy: {
        "/api": {
          target: apiURL, // Utilisation de la variable d'environnement
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
