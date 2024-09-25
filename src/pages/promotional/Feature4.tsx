import React from "react";
import "../promotional/styles/Feature4.css";
import phone_left from "src/assets/phone-left.png";
const Feature4 = () => {
  return (
    /* New Yellow Section 4 **/
    <section className="yellow-section4">
      <div className="container1">
        <div className="image-content123">
          <img src={phone_left} alt="Join Us" />
        </div>
        <div className="text-content">
          <h2>SUBSCRIPTION AND PAYMENT</h2>
          <p>
            Conveniently manage your gym sessions or monthly memberships with
            our Subscription Module, offering flexible payment options including
            cash, GCash, PayMaya, and credit card. Stay committed to your
            fitness journey with seamless, secure transactions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Feature4;
