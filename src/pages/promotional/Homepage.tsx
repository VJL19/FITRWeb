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
            It was established in 2018 to satisfy the burning passion for
            improving healthy living standards in the community. It took no time
            before it came to a prime position in the locality respecting
            fitness. It offers excellent facilities and services of high
            standard.
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
