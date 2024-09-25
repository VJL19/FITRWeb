import React from "react";
import "../promotional/styles/About.css";
import banner from "src/assets/your-image-path.jpg";
const About = () => {
  return (
    /*  About Section */
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="image-section">
          <img src={banner} alt="Gym with boxing area" />
        </div>
        <div className="text-section">
          <h2 className="heading">STATE-OF-THE-ART FACILITIES</h2>
          <p className="description">
            Our gym is equipped with state-of-the-art facilities, including
            top-of-the-line exercise equipment, spacious workout areas, and
            modern amenities. You'll have everything you need to enjoy a
            comfortable and effective workout experience.
          </p>

          <h2 className="subheading">EXPERT PERSONAL TRAINERS</h2>
          <p className="description">
            Our team of expert personal trainers are highly qualified and
            experienced in helping individuals of all fitness levels. They will
            create customized workout plans and provide ongoing guidance and
            motivation to ensure you get the most out of your training sessions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
