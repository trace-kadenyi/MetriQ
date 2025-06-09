import { useNavigate } from "react-router-dom";

import logo from "../assets/endevioLogo.webp";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <img
        src={logo}
        alt="Endevio Logo"
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <a href="https://pagespeed.web.dev/" target="_blank" className="vGOvxc">
        <img
          src="https://www.gstatic.com/pagespeed/insights/ui/logo/favicon_48.png"
          width="24"
          height="24"
          alt="PageSpeed Insights logo"
          data-iml="1084.300000000745"
          data-atf="true"
        />
        <div className="gSBk9c">PageSpeed Insights</div>
      </a>
    </div>
  );
};

export default Navigation;
