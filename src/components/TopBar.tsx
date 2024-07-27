import React from "react";
import "src/styles/TopBar.css";
import MenuIcon from "@mui/icons-material/Menu";
const TopBar = () => {
  return (
    <div className="top--bar--container">
      <div></div>
      <div>
        <MenuIcon fontSize="large" htmlColor="#f5f5f5" />
      </div>
    </div>
  );
};

export default TopBar;
