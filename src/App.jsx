import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import ResultsPage from "./Pages/ResultsPage";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        {/* <Navigation /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/results-page" element={<ResultsPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
