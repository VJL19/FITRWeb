import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "../reducers/route";
import { Box, Container } from "@mui/material";
import {
  ResponsiveContainer,
  Tooltip,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
} from "recharts";
import GroupIcon from "@mui/icons-material/Group";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useGetAllRecentAttendanceQuery } from "src/reducers/attendance";
import RecentAttendeesPage from "./users/RecentAttendeesPage";
import RecentTransactionPage from "./transactions/RecentTransactionPage";
import TotalProgramCreatedPage from "./programs/TotalProgramCreatedPage";
import TotalCreatedUserPage from "./users/TotalCreatedUserPage";
import TotalSessionUsersPage from "./users/TotalSessionUsersPage";
import TotalMonthlyUsersPage from "./users/TotalMonthlyUsersPage";
import TotalFulfilledTransactionPage from "./transactions/TotalFulfilledTransactionPage";
import TotalPendingTransactionPage from "./transactions/TotalPendingTransactionPage";
import TotalAnnouncementCreatedPage from "./dashboard/announcement/TotalAnnouncementCreatedPage";
import TodaySales from "./sales/TodaySales";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoute("Home"));
  }, []);

  return (
    <Container sx={{ height: 450 }}>
      <h1>DASHBOARD</h1>

      <Container
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: 2.5,
        }}
      >
        <TotalProgramCreatedPage />
        <Box
          sx={{
            width: 300,
            height: "100%",
            textAlign: "center",
            boxShadow: "1px 3px 34px -15px rgba(0,0,0,0.75);",
            position: "relative",
          }}
        >
          <MonetizationOnIcon
            style={{
              position: "absolute",
              left: "15%",
              width: "100%",
              height: "100%",
              zIndex: 2,
            }}
            htmlColor="rgba(0,0,0, 0.15)"
          />
          <h2>SALES</h2>
        </Box>
        <TotalAnnouncementCreatedPage />
      </Container>
      <h2>USERS</h2>
      <Container
        sx={{
          display: "flex",
          width: "100%",
          marginTop: 2,
          justifyContent: "center",
          gap: 2.5,
        }}
      >
        <TotalSessionUsersPage />
        <TotalMonthlyUsersPage />
        <TotalCreatedUserPage />
      </Container>
      <h2>SUBSCRIPTIONS</h2>
      <Container
        sx={{
          display: "flex",
          width: "100%",
          marginTop: 2,
          justifyContent: "center",
          gap: 2.5,
        }}
      >
        <TotalPendingTransactionPage />
        <TotalFulfilledTransactionPage />
        <Box
          sx={{
            width: 300,
            height: "100%",
            textAlign: "center",
            boxShadow: "1px 3px 34px -15px rgba(0,0,0,0.75);",
          }}
        >
          <h2>SALES</h2>
          <MonetizationOnIcon fontSize="large" htmlColor="#121212" />
        </Box>
      </Container>

      <TodaySales />
      <Container
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: 2.5,
        }}
      >
        <RecentTransactionPage />
        <RecentAttendeesPage />
      </Container>
    </Container>
  );
};

export default Home;
