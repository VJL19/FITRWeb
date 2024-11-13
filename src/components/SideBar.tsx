import React, { useEffect, useState } from "react";
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
import {
  useGetAccessWebTokenQuery,
  useLogoutUserWebMutation,
} from "../reducers/login";
import LoadingIndicator from "./LoadingIndicator";
import { Avatar, Collapse, List } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import HistoryIcon from "@mui/icons-material/History";
import BarChartIcon from "@mui/icons-material/BarChart";
export const navLinkTextStyle = {
  textDecoration: "none",
  color: "#f5f5f5",
  letterSpacing: 1.5,
};
const SideBar = ({
  isDrawerOpen,
  toggleDrawer,
}: {
  isDrawerOpen?: boolean | undefined;
  toggleDrawer: () => void;
}) => {
  const { route } = useSelector((state: RootState) => state.route);
  const [open, setOpen] = useState(false);

  const { data: tokenData } = useGetAccessWebTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
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
  const attendanceChildRoute = [
    "Attendance_History",
    "Attendance_Analytics",
    "Attendance_Reports",
    "Attendance",
  ];
  const transactionChildRoute = [
    "Transaction_History",
    "Transaction_Analytics",
    "Transaction_Reports",
    "Transactions",
  ];

  useEffect(() => {
    if (attendanceChildRoute.includes(route)) {
      setOpen(true);
    }
    if (transactionChildRoute.includes(route)) {
      setOpen(true);
    }
  }, [route]);

  if (status === "pending") {
    return <LoadingIndicator />;
  }
  return (
    <main className="main--container">
      <aside className={`${isDrawerOpen ? "sideNav open" : "sideNav"} `}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <>
            {isDrawerOpen && (
              <button className="menu-button" onClick={toggleDrawer}>
                &#9776; {/* Hamburger icon */}
              </button>
            )}
          </>
          <img src={logo} height={75} width={"100%"} />
          <Avatar
            src={tokenData?.user?.ProfilePic}
            sx={{
              height: 90,
              width: 90,
              borderWidth: 2,
              borderColor: "#ff2e00",
            }}
          />
        </div>
        <br />

        <NavLink to="/dashboard" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Home")}>
            <HomeIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Home</h5>
          </div>
        </NavLink>
        <NavLink to="/announcements" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Announcements")}>
            <CampaignIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Announcements</h5>
          </div>
        </NavLink>
        <NavLink to="/suggested_programs" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Programs")}>
            <FitnessCenterIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Programs</h5>
          </div>
        </NavLink>
        <NavLink
          to="/attendance"
          style={navLinkTextStyle}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className={dynamicStyles(route, "Attendance")}>
            <AccessTimeFilledOutlinedIcon
              fontSize="large"
              htmlColor="#f5f5f5"
            />
            <h5 style={{ textTransform: "uppercase" }}>Attendance</h5>
            {open && attendanceChildRoute.includes(route) ? (
              <ExpandLessOutlinedIcon />
            ) : (
              <ExpandMoreOutlinedIcon />
            )}
          </div>
          <Collapse
            in={open && attendanceChildRoute.includes(route)}
            timeout="auto"
          >
            <List>
              <NavLink
                to="/attendance/attendance_history"
                style={navLinkTextStyle}
              >
                <div
                  className={dynamicStyles(route, "Attendance_History")}
                  style={{ paddingLeft: 15 }}
                >
                  <HistoryIcon fontSize="large" htmlColor="#f5f5f5" />
                  <h5 style={{ textTransform: "uppercase" }}>History</h5>
                </div>
              </NavLink>
              <NavLink
                to="/attendance/attendance_analytics"
                style={navLinkTextStyle}
              >
                <div
                  className={dynamicStyles(route, "Attendance_Analytics")}
                  style={{ paddingLeft: 15 }}
                >
                  <BarChartIcon fontSize="large" htmlColor="#f5f5f5" />
                  <h5 style={{ textTransform: "uppercase" }}>Analytics</h5>
                </div>
              </NavLink>
              <NavLink
                to="/attendance/attendance_reports"
                style={navLinkTextStyle}
              >
                <div
                  className={dynamicStyles(route, "Attendance_Reports")}
                  style={{ paddingLeft: 15 }}
                >
                  <DescriptionIcon fontSize="large" htmlColor="#f5f5f5" />
                  <h5 style={{ textTransform: "uppercase" }}>Reports</h5>
                </div>
              </NavLink>
            </List>
          </Collapse>
        </NavLink>

        <NavLink
          to="/transactions"
          style={navLinkTextStyle}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className={dynamicStyles(route, "Transactions")}>
            <CurrencyExchangeIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Transactions</h5>
            {open && transactionChildRoute.includes(route) ? (
              <ExpandLessOutlinedIcon />
            ) : (
              <ExpandMoreOutlinedIcon />
            )}
          </div>
          <Collapse
            in={open && transactionChildRoute.includes(route)}
            timeout="auto"
          >
            <List>
              <NavLink
                to="/transactions/transaction_history"
                style={navLinkTextStyle}
              >
                <div
                  className={dynamicStyles(route, "Transaction_History")}
                  style={{ paddingLeft: 15 }}
                >
                  <HistoryIcon fontSize="large" htmlColor="#f5f5f5" />
                  <h5 style={{ textTransform: "uppercase" }}>History</h5>
                </div>
              </NavLink>
              <NavLink
                to="/transactions/transaction_analytics"
                style={navLinkTextStyle}
              >
                <div
                  className={dynamicStyles(route, "Transaction_Analytics")}
                  style={{ paddingLeft: 15 }}
                >
                  <BarChartIcon fontSize="large" htmlColor="#f5f5f5" />
                  <h5 style={{ textTransform: "uppercase" }}>Analytics</h5>
                </div>
              </NavLink>

              <NavLink
                to="/transactions/transaction_reports"
                style={navLinkTextStyle}
              >
                <div
                  className={dynamicStyles(route, "Transaction_Reports")}
                  style={{ paddingLeft: 15 }}
                >
                  <DescriptionIcon fontSize="large" htmlColor="#f5f5f5" />
                  <h5 style={{ textTransform: "uppercase" }}>Reports</h5>
                </div>
              </NavLink>
            </List>
          </Collapse>
          <NavLink to="/records" style={navLinkTextStyle}>
            <div className={dynamicStyles(route, "Records")}>
              <ArticleIcon fontSize="large" htmlColor="#f5f5f5" />
              <h5 style={{ textTransform: "uppercase" }}>Records</h5>
            </div>
          </NavLink>
        </NavLink>
        <NavLink to="/users" style={navLinkTextStyle}>
          <div className={dynamicStyles(route, "Users")}>
            <GroupIcon fontSize="large" htmlColor="#f5f5f5" />
            <h5 style={{ textTransform: "uppercase" }}>Users</h5>
          </div>
        </NavLink>

        <hr />
      </aside>
      <article></article>
    </main>
  );
};

export default SideBar;
