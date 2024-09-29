import React from "react";
import "../promotional/styles/Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h1>MJESHTER FITNESS GYM</h1>
          <p>
            <strong>Location:</strong>
            <br />
            Lot 1 Blk 2 Makim Square Tandang Sora Ave., Brgy Culiat ( in front
            of Culiat High School), Quezon City, Philippines
          </p>
          <p>
            <strong>Contact:</strong>
            <br />
            0995 770 8858
            <br />
            <a href="mjeshter.fg@yahoo.com">mjeshter.fg@yahoo.com</a>
          </p>
          <div className="social-icons">
            <a target="_blank" href="https://web.facebook.com/mjeshter.fg">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a target="_blank" href="https://www.instagram.com/mjeshter.fg/">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="right-section">
          <h3>NEED A SOLUTION?</h3>
          <form id="contact-form">
            <input type="text" name="name" placeholder="Your name" required />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
            <textarea
              name="message"
              placeholder="Briefly describe your request"
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MJeshter Gym. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
