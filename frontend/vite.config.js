import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { version } from "./package.json" with { type: 'json'};

export default defineConfig(({ mode }) => {
  // Manual override for build
  const DOMAIN = mode === "development" ? "http://localhost:3000" : "https://oykus.ovh";
  const API = mode === "development" ? "/api" : "https://oykus.ovh/api";

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_DOMAIN": JSON.stringify(DOMAIN),
      "import.meta.env.VITE_API": JSON.stringify(API),
      "import.meta.env.VITE_VERSION": JSON.stringify(version),
    },
    build: {
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      port: 8000,
      host: true,
      watch: { usePolling: true },
      proxy: {
        "/api": {
          target: "http://backend:3000",
          changeOrigin: true,
          secure: false,
        },
        "/uploads": {
          target: "http://backend:3000",
          changeOrigin: true,
          secure: false,
        },
      },
      allowedHosts: true,
    },
  };
});
