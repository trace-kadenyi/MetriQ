import { createContext, useContext } from "react";
import useUrlForm from "../hooks/urlForm"; // ← your original hook

// 1️⃣ context object
export const UrlFormContext = createContext(null);

// 2️⃣ provider component
export const UrlFormProvider = ({ children }) => {
  const urlForm = useUrlForm(); // gets the full hook state/handlers
  return (
    <UrlFormContext.Provider value={urlForm}>
      {children}
    </UrlFormContext.Provider>
  );
};

// 3️⃣ consumer hook (feel free to rename)
export const useUrlFormContext = () => {
  const ctx = useContext(UrlFormContext);
  if (!ctx) {
    throw new Error(
      "useUrlFormContext must be used inside a <UrlFormProvider>"
    );
  }
  return ctx;
};
