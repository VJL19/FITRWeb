import React, { useEffect } from "react";
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
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { NavLink, useNavigate } from "react-router-dom";
import dynamicStyles from "src/utils/functions/dynamicStyles";
import { useLogoutUserWebMutation } from "../reducers/login";
import LoadingIndicator from "./LoadingIndicator";

export const navLinkTextStyle = {
  textDecoration: "none",
  color: "#f5f5f5",
  letterSpacing: 1.5,
};
const SideBar = () => {
  const { route } = useSelector((state: RootState) => state.route);

  const [logoutUser, { status, data }] = useLogoutUserWebMutation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  console.log("logout data", data);
  console.log("logout status", status);
  useEffect(() => {
    if (status === "fulfilled") {
      window.location.reload();
    }
  }, [status, data?.message]);
  if (status === "pending") {
    return <LoadingIndicator />;
  }
  return (
    <main className="main--container">
      <aside className="sideNav">
        <div>
          <img src={logo} height={75} width={"100%"} />
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
        <NavLink to="/dashboard/attendance" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Attendance")}>
            <AccessTimeFilledOutlinedIcon
              fontSize="large"
              htmlColor="#f5f5f5"
            />
            <h5 style={{ textTransform: "uppercase" }}>Attendance</h5>
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
            logoutUser();
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
