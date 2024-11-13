import React, { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "../reducers/route";
import { Box, Container, Grid, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RecentAttendeesPage from "./users/RecentAttendeesPage";
import RecentTransactionPage from "./transactions/RecentTransactionPage";
import TotalProgramCreatedPage from "./programs/TotalProgramCreatedPage";
import TotalCreatedUserPage from "./users/TotalCreatedUserPage";
import TotalSessionUsersPage from "./users/TotalSessionUsersPage";
import TotalMonthlyUsersPage from "./users/TotalMonthlyUsersPage";
import TotalFulfilledTransactionPage from "./transactions/TotalFulfilledTransactionPage";
import TotalPendingTransactionPage from "./transactions/TotalPendingTransactionPage";
import TotalAnnouncementCreatedPage from "./announcement/TotalAnnouncementCreatedPage";
import TodaySales from "./sales/TodaySales";
import RenderRfidInput from "src/components/RenderRfidInput";
import { useGetAccessWebTokenQuery } from "src/reducers/login";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import NotAuthorized from "src/components/NotAuthorized";
import TotalRecentAttendeesPage from "./attendance/TotalRecentAttendeesPage";
import TotalTodayTransactionPage from "./transactions/TotalTodayTransactionPage";
import { setAdminAccountData } from "src/reducers/users";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: token, error: tokenErr } = useGetAccessWebTokenQuery();
  
  useEffect(() => {
    dispatch(setRoute("Home"));
    dispatch(setAdminAccountData({ RFIDNumber: token?.user?.RFIDNumber! }));
  }, [dispatch, token]);

  if (
    tokenErr?.status === HTTP_ERROR.UNAUTHORIZED ||
    tokenErr?.status === HTTP_ERROR.BAD_REQUEST
  ) {
    return <NotAuthorized />;
  }

  return (
    <Container sx={{ paddingY: 4 }}>
      <RenderRfidInput />

      <Typography variant="h4"  gutterBottom>
        DASHBOARD
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TotalAnnouncementCreatedPage />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalRecentAttendeesPage />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalProgramCreatedPage />
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ marginTop: 4 }} >
        USERS
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TotalSessionUsersPage />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalMonthlyUsersPage />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalCreatedUserPage />
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ marginTop: 4 }} >
        SUBSCRIPTIONS
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TotalPendingTransactionPage />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalFulfilledTransactionPage />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalTodayTransactionPage />
        </Grid>
      </Grid>

      <TodaySales />
      
      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={6} md={5}>
          <RecentTransactionPage />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <RecentAttendeesPage />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
