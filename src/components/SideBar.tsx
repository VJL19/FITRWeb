import React from "react";
import "../styles/SideBar.css";
import logo from "src/assets/logo_1.png";
import CampaignIcon from "@mui/icons-material/Campaign";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PaymentsIcon from "@mui/icons-material/Payments";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { NavLink } from "react-router-dom";
import dynamicStyles from "src/utils/functions/dynamicStyles";
import { logutUser } from "../reducers/auth";

export const navLinkTextStyle = {
  textDecoration: "none",
  color: "#f5f5f5",
  letterSpacing: 1.5,
};
const SideBar = () => {
  const { route } = useSelector((state: RootState) => state.route);

  const dispatch: AppDispatch = useDispatch();

  return (
    <main className="main--container">
      <aside className="sideNav">
        <div>
          <img src={logo} height={80} width={"100%"} />
        </div>
        <NavLink to="/dashboard" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Home")}>
            <HomeIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Home</h5>
          </div>
        </NavLink>
        <NavLink to="/dashboard/announcements" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Announcements")}>
            <CampaignIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Announcements</h5>
          </div>
        </NavLink>
        <NavLink to="/dashboard/suggested_programs" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Programs")}>
            <FitnessCenterIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Programs</h5>
          </div>
        </NavLink>
        <NavLink to="/dashboard/records" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Records")}>
            <ArticleIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Records</h5>
          </div>
        </NavLink>
        <NavLink to="/dashboard/reports" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Reports")}>
            <DescriptionIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Reports</h5>
          </div>
        </NavLink>
        <NavLink to="/dashboard/sales" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Sales")}>
            <PaymentsIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Sales</h5>
          </div>
        </NavLink>
        <NavLink to="/dashboard/transactions" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Transactions")}>
            <CurrencyExchangeIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Transactions</h5>
          </div>
        </NavLink>
        <NavLink to="/dashboard/users" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Users")}>
            <GroupIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Users</h5>
          </div>
        </NavLink>

        <hr />
        <NavLink
          to="/login"
          style={navLinkTextStyle}
          onClick={() => {
            dispatch(logutUser());
          }}
        >
          <div className="icon--block">
            <LogoutIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Log Out</h5>
          </div>
        </NavLink>
      </aside>
      <article></article>
    </main>
  );
};

export default SideBar;
