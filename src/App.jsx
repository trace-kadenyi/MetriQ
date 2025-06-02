// import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import SiteURL from "./Pages/SiteURL";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="bg-red-500 text-white p-10 text-center text-xl">
        If this is blue with white text, Tailwind is working!
      </div>
      <Router>
        {/* <Navigation /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/siteurl/:id" element={<SiteURL />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
