import React, { useState, useEffect } from "react";
import "../promotional/styles/Header.css";
import { useGetAuthTokenQuery } from "src/reducers/login";
import { UserRole } from "src/utils/enums/ROLE";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "src/components/LoadingIndicator";
import { useLogoutUserWebMutation } from "src/reducers/login";

const Header = () => {
  const [logoutUser, { status: logoutStatus, data: logoutData }] =
    useLogoutUserWebMutation();

  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutStatus === "fulfilled") {
      window.location.reload();
    }
  }, [status, logoutData?.message]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <a href="#homepage">MJESHTER FITNESS GYM</a>
        </div>

        {/* Button to toggle the menu on smaller screens */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`nav-links ${menuActive ? "active" : ""}`}>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#services">SERVICES</a>
          </li>
          <li>
            <a href="#footer">CONTACT US</a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/login", { replace: true });
              }}
              className="login-btn"
            >
              BACK
            </a>
            Í{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
