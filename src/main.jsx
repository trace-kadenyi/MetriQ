import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UrlFormProvider } from "./context/UrlFormContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UrlFormProvider>
        <App />
      </UrlFormProvider>
    </ThemeProvider>
  </StrictMode>
);
