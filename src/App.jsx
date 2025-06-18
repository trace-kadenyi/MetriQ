import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./Pages/LandingPage";
import ResultsPage from "./Pages/ResultsPage";
import PreviousReports from "./Pages/PreviousReports";
import "./App.css";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        {/* <Navigation /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/results-page" element={<ResultsPage />} />
          <Route path="/previous-reports" element={<PreviousReports />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
