import "../styles/Dashboard.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AnnouncementPage from "./dashboard/announcement/AnnouncementPage";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import SideBar from "../components/SideBar";
import ProgramPage from "./programs/ProgramPage";
import RecordPage from "./records/RecordPage";
import ReportPage from "./reports/ReportPage";
import SalePage from "./sales/SalePage";
import TransactionPage from "./transactions/TransactionPage";
import UserPage from "./users/UserPage";
import ViewAnnouncementPage from "./dashboard/announcement/ViewAnnouncementPage";
import EditAnnouncementPage from "./dashboard/announcement/EditAnnouncementPage";
import CreateAnnouncementPage from "./dashboard/announcement/CreateAnnouncementPage";
import CreateTransactionPage from "./transactions/CreateTransactionPage";
import ViewTransactionPage from "./transactions/ViewTransactionPage";
import EditTransactionPage from "./transactions/EditTransactionPage";
import CreateUserPage from "./users/CreateUserPage";
import ViewUserPage from "./users/ViewUserPage";
import EditUserPage from "./users/EditUserPage";
import CreateUserConfirmationPage from "./users/CreateUserConfirmationPage";
import CreateProgramPage from "./programs/CreateProgramPage";
import ViewProgramPage from "./programs/ViewProgramPage";
import EditProgramPage from "./programs/EditProgramPage";
import TopBar from "src/components/TopBar";
import React, { useEffect, useRef, useState } from "react";
import EditRecordPage from "./records/EditRecordPage";
import ViewRecordPage from "./records/ViewRecordPage";
import useRFIDListen from "src/hooks/useRFIDListen";
import InputReader from "src/components/InputReader";
import AttendancePage from "./attendance/AttendancePage";
import { useGetAccessWebTokenQuery } from "src/reducers/login";
import { UserRole } from "src/utils/enums/ROLE";
import LandingPage from "./promotional/LandingPage";
const Dashboard = () => {
  const { data, status, error } = useGetAccessWebTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  const location = useLocation();

  console.log(data?.user?.Role);
  useEffect(() => {
    if (!data?.isAuthenticated) {
      navigate("/login", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [data?.isAuthenticated]);

  useEffect(() => {
    if (data?.isAuthenticated && location.pathname.includes("/login")) {
      navigate("/dashboard", { replace: true });
    }
    if (!data?.isAuthenticated && location.pathname.includes("/dashboard")) {
      navigate("/login", { replace: true });
    }
  }, [data?.isAuthenticated, location.pathname]);

  if (data?.user?.Role?.toUpperCase() === UserRole.USER) {
    return <LandingPage />;
  }
  if (!data?.isAuthenticated) {
    return <h1>You are not authenticated! Please login again</h1>;
  }
  return (
    <React.Fragment>
      <TopBar />
      <div className="main--container">
        <SideBar />
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<Home />} path="/dashboard" index />
            <Route
              element={<AnnouncementPage />}
              path="/dashboard/announcements"
            />
            <Route
              element={<CreateAnnouncementPage />}
              path={"/dashboard/announcements/create_announcement/"}
            />
            <Route
              element={<ViewAnnouncementPage />}
              path={"/dashboard/announcements/view_announcement/:id"}
            />
            <Route
              element={<EditAnnouncementPage />}
              path={"/dashboard/announcements/edit_announcement/:id"}
            />
            <Route
              element={<ProgramPage />}
              path="/dashboard/suggested_programs"
            />

            <Route
              element={<CreateProgramPage />}
              path={"/dashboard/suggested_programs/create_program/"}
            />
            <Route
              element={<ViewProgramPage />}
              path={"/dashboard/suggested_programs/view_program/:id"}
            />
            <Route
              element={<EditProgramPage />}
              path={"/dashboard/suggested_programs/edit_program/:id"}
            />
            <Route element={<RecordPage />} path="/dashboard/records" />
            <Route element={<AttendancePage />} path="/dashboard/attendance" />
            <Route
              element={<EditRecordPage />}
              path="/dashboard/records/edit_record/:id"
            />

            <Route
              element={<ViewRecordPage />}
              path="/dashboard/records/view_record/:id"
            />
            <Route element={<ReportPage />} path="/dashboard/reports" />
            <Route element={<SalePage />} path="/dashboard/sales" />
            <Route
              element={<TransactionPage />}
              path="/dashboard/transactions"
            />
            <Route
              element={<CreateTransactionPage />}
              path={"/dashboard/transactions/create_subscription/"}
            />
            <Route
              element={<ViewTransactionPage />}
              path={"/dashboard/transactions/view_subscription/:id"}
            />
            <Route
              element={<EditTransactionPage />}
              path={"/dashboard/transactions/edit_subscription/:id"}
            />
            <Route element={<UserPage />} path="/dashboard/users" />
            <Route
              element={<CreateUserPage />}
              path={"/dashboard/users/create_user/"}
            />
            <Route
              element={<CreateUserConfirmationPage />}
              path={"/dashboard/users/create_user/confirmation_email"}
            />
            <Route
              element={<ViewUserPage />}
              path={"/dashboard/users/view_user/:id"}
            />
            <Route
              element={<EditUserPage />}
              path={"/dashboard/users/edit_user/:id"}
            />
          </Route>
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
