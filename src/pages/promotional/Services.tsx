import React from "react";
import "../promotional/styles/Services.css";
const Services = () => {
  return (
    /* Services Section */
    <section id="services" className="services-section">
      <div className="service-container">
        <h2 className="services-title">OUR SERVICES</h2>
        <div className="service-items">
          <div className="service-item">
            <h3>Single Session Pass</h3>
            <p>Access to gym facilities for a single session (typically 1-2 hours).</p>
          </div>
          <div className="service-item">
            <h3>Monthly Membership</h3>
            <p>Unlimited gym access during operational hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
