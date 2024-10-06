import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "src/styles/BreadCrumbs.css";
const BreadCrumbs = () => {
  const location = useLocation();

  let currentLink = "";

  const navigate = useNavigate();

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <React.Fragment key={crumb}>
          {currentLink === location.pathname ? (
            <Typography sx={{ color: "text.primary" }}>{crumb}</Typography>
          ) : (
            <NavLink
              to={currentLink}
              style={{
                color: currentLink === location.pathname ? "#ccc" : "#ff2e00",
              }}
            >
              {crumb}
            </NavLink>
          )}
        </React.Fragment>
      );
    });
  return (
    <div className="breadcrumbs">
      <Breadcrumbs aria-label="breadcrumb">{crumbs}</Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
