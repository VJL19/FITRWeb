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
            <h3>Web Development</h3>
            <p>High-performance and scalable web development.</p>
          </div>
          <div className="service-item">
            <h3>UI/UX Design</h3>
            <p>Beautiful and user-friendly interfaces.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
