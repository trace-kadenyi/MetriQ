import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import Endevio from "./Pages/Endevio";
import USCampaign from "./Pages/USCampaign";
import UKCampaign from "./Pages/UKCampaign";
import Navigation from "./Pages/Navigation";
import Quivani from "./Pages/Quivani";
import ChineseEng from "./Pages/ChineseEng";
import ChineseZH from "./Pages/ChineseZH";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/endevio/:id" element={<Endevio />} />
        <Route path="/usCampaign/:id" element={<USCampaign />} />
        <Route path="/ukCampaign/:id" element={<UKCampaign />} />
        <Route path="/quivani/:id" element={<Quivani />} />
        <Route path="/chinese-en-campaign/:id" element={<ChineseEng />} />
        <Route path="/chinese-zh-campaign/:id" element={<ChineseZH />} />
      </Routes>
    </Router>
  );
};

export default App;
