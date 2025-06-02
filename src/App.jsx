import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import SiteURL from "./Pages/SiteURL";
import "./App.css";

const App = () => {
  return (
    <>
      <div>
        <h1 style={{ color: "var(--avo-cado-500)" }}>
          Hello, styled with avocado color!
        </h1>
      </div>
      <div class="size-24 rounded-full bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600"></div>
      <div class="size-24 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"></div>
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
