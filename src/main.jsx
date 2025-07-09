import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UrlFormProvider } from "./context/UrlFormContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <UrlFormProvider>
          <App />
        </UrlFormProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
