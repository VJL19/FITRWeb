import React from "react";
import "../promotional/styles/AppContent.css";
import phone_left from "src/assets/favor.png";
import phone_middle from "src/assets/homepage.png";
import phone_right from "src/assets/drawes.png";
const AppContent = () => {
  return (
    /**APP Section **/
    <section id="app" className="app-section">
      <div className="content-container">
        <div className="text-content">
          <h1>GET OUR APP</h1>
          <p>
            Experience fitness at your fingertips with the UFC GYM App!
            Fast-track your access to the club, className schedules, membership
            management, and more.
          </p>
          <div className="buttons">
            <a
              href="https://expo.dev/artifacts/eas/fhJM5LdewzRp7JKkW9nG3p.apk"
              target="_blank"
              className="cta-button"
            >
              DOWNLOAD
            </a>
          </div>
        </div>
        <div className="app-images">
          <img src={phone_left} alt="Phone Left" className="phone phone-left" />
          <img
            src={phone_middle}
            alt="Phone Center"
            className="phone phone-center"
          />
          <img
            src={phone_right}
            alt="Phone Right"
            className="phone phone-right"
          />
        </div>
      </div>
    </section>
  );
};

export default AppContent;
