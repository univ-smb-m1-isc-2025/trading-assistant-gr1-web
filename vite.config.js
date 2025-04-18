import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Charger les variables d'environnement
export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      allowedHosts: ["localhost", "www.trademate.oups.net"],
    },
  };
});
