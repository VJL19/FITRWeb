import React from "react";
import "../promotional/styles/Feature3.css";
import account from "src/assets/account.png";
const Feature3 = () => {
  return (
    <section className="yellow-section3">
      <div className="container1">
        <div className="text-content">
          <h2>USER PROFILE</h2>
          <p>
            Easily manage your personal details in the User Information Module
            and track your fitness progress with the BMI Calculator, which
            estimates body fat based on your height and weight. Learn more about
            Mjeshter Fitness Gym, its mission, and goals in the About Mjeshter
            Module.
          </p>
        </div>
        <div className="image-content123">
          <img src={account} alt="Join Us" />
        </div>
      </div>
    </section>
  );
};

export default Feature3;
