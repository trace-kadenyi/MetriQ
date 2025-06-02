import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import SiteURL from "./Pages/SiteURL";
import "./App.css";

const App = () => {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/siteurl/:id" element={<SiteURL />} />
      </Routes>
    </Router>
  );
};

export default App;
