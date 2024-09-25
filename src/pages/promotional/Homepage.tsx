import React from "react";
import "../promotional/styles/Homepage.css";
const Homepage = () => {
  return (
    <section id="homepage" className="hero">
      <div className="overlay">
        <div className="text-container">
          <h1>
            MARTIAL ARTS.
            <br />
            FROM .<br />
            WITH LOVE.
          </h1>
          <p>
            Komm vorbei und trainiere mit uns im Herzen von Berlin. Dich
            erwartet eine tolle Community mit erfahrenen Trainer:innen.
            Gemeinsam holen wir das Beste aus dir raus.
          </p>
          <a href="#app" className="cta-button">
            DOWNLOAD NOW
          </a>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
