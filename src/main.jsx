import "@/assets/styles/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

function Root() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

const kotan = document.getElementById("kotan");
if (kotan) {
  createRoot(kotan).render(<Root />);
}
