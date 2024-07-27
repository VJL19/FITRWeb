import React, { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
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

const data = [
  {
    name: "24hrs",
    session: 4000,
    monthly: 2400,
    amt: 2400,
  },
  {
    name: "16hrs",
    session: 3000,
    monthly: 1398,
    amt: 2210,
  },
  {
    name: "12hrs",
    session: 2000,
    monthly: 9800,
    amt: 2290,
  },
  {
    name: "8hrs",
    session: 2780,
    monthly: 3908,
    amt: 2000,
  },
  {
    name: "4hrs",
    session: 1890,
    monthly: 4800,
    amt: 2181,
  },
];
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
        </Box>{" "}
      </Container>

      <h2>TODAYS SALE</h2>
      <Container sx={{ display: "flex", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="session"
              stroke="#202020"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="monthly"
              stroke="#ff2e00"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Container>
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
