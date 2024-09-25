import React from "react";
import Header from "./Header";
import Homepage from "./Homepage";
import Services from "./Services";
import Feature1 from "./Feature1";
import Feature3 from "./Feature3";
import Feature2 from "./Feature2";
import Feature4 from "./Feature4";
import About from "./About";
import AppContent from "./AppContent";
import Footer from "./Footer";
import "../promotional/styles/global.css";
const LandingPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Homepage />
      <About />
      <Services />
      <Feature1 />
      <Feature2 />
      <Feature3 />
      <Feature4 />
      <AppContent />
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
