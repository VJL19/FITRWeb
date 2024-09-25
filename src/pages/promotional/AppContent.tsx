import React from "react";
import "../promotional/styles/AppContent.css";
import phone_left from "src/assets/phone-left.png";
import phone_middle from "src/assets/phone-middle.png";
import phone_right from "src/assets/phone-right.png";
import google_play from "src/assets/googleplay.png";
import app_store from "src/assets/appstore.png";
const AppContent = () => {
  return (
    /**APP Section **/
    <section id="app" className="app-section">
      <div className="content-container">
        <div className="text-content">
          <h1>DOWNLOAD THE APP</h1>
          <p>
            Experience fitness at your fingertips with the UFC GYM App!
            Fast-track your access to the club, className schedules, membership
            management, and more.
          </p>
          <div className="buttons">
            <a href="#" className="app-button">
              <img src={app_store} alt="Download on the App Store" />
            </a>
            <a href="#" className="app-button">
              <img src={google_play} alt="Get it on Google Play" />
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
