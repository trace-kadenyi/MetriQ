import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./Pages/LandingPage";
import Report from "./Pages/Report";
import Reports from "./Pages/Reports";
import Charts from "./Pages/Charts";
import "./App.css";
import { FavouritesProvider } from "./context/FavouritesContext";
import Header from "./Components/Header";

const App = () => {
  return (
    <>
      <FavouritesProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </Router>
      </FavouritesProvider>
    </>
  );
};

export default App;
