import "../promotional/styles/Feature1.css";
import phone_left from "src/assets/phone-left.png";
const Feature1 = () => {
  return (
    <section className="yellow-section">
      <div className="container1">
        <div className="text-content">
          <h2>WORKOUT PLANNING</h2>
          <p>
            Create and customize your ideal workout routine with our Programs
            Planner...
          </p>
        </div>
        <div className="image-content123">
          <img src={phone_left} alt="Join Us" />
        </div>
      </div>
    </section>
  );
};

export default Feature1;