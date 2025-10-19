import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isDev = process.env.NODE_ENV === "development";

// https://vite.dev/config/
export default defineConfig({
  base: isDev ? "http://localhost:3000" : "./",
  build: {
    outDir: "dist",
    assetsDir: "static",
  },
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
