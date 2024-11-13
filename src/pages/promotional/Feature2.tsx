import React from "react";
import "../promotional/styles/Feature2.css";
import newsfeed from "src/assets/newsfeed.png";
const Feature2 = () => {
  return (
    <section className="yellow-section2">
      <div className="container1">
        <div className="image-content123">
          <img src={newsfeed} alt="Join Us" />
        </div>
        <div className="text-content">
          <h2>COMMUNITY</h2>
          <p>
            Stay up-to-date with the latest news and promotions through our
            Announcement feature, and engage with the community by liking,
            commenting, and sharing in the interactive News Feed. Plus, create
            and manage your own content in My Posts while receiving real-time
            notifications for likes and subscription updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Feature2;
