import "../styles/Dashboard.css";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AnnouncementPage from "./dashboard/announcement/AnnouncementPage";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
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
import useListen from "src/hooks/useListen";
import InputReader from "src/components/InputReader";
import AttendancePage from "./attendance/AttendancePage";
import { useGetAccessWebTokenQuery } from "src/reducers/login";
import { UserRole } from "src/utils/enums/ROLE";
import LandingPage from "./promotional/LandingPage";
import BreadCrumbs from "src/components/BreadCrumbs";
import SideBar from "src/components/SideBar";
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
      <BreadCrumbs />
      <div className="main--container">
        <SideBar />
        <React.Fragment>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route element={<Home />} path="/dashboard" index />
              <Route
                element={<AnnouncementPage />}
                path="/dashboard/announcements"
              />
              <Route
                element={<CreateAnnouncementPage />}
                path={"/dashboard/announcements/create_announcement"}
              />
              <Route
                element={<ViewAnnouncementPage />}
                path={"/dashboard/announcements/view_announcement"}
              />
              <Route
                element={<EditAnnouncementPage />}
                path={"/dashboard/announcements/edit_announcement"}
              />
              <Route
                element={<ProgramPage />}
                path="/dashboard/suggested_programs"
              />

              <Route
                element={<CreateProgramPage />}
                path={"/dashboard/suggested_programs/create_program"}
              />
              <Route
                element={<ViewProgramPage />}
                path={"/dashboard/suggested_programs/view_program"}
              />
              <Route
                element={<EditProgramPage />}
                path={"/dashboard/suggested_programs/edit_program"}
              />
              <Route element={<RecordPage />} path="/dashboard/records" />
              <Route
                element={<AttendancePage />}
                path="/dashboard/attendance"
              />
              <Route
                element={<EditRecordPage />}
                path="/dashboard/records/edit_record"
              />

              <Route
                element={<ViewRecordPage />}
                path="/dashboard/records/view_record"
              />
              <Route element={<ReportPage />} path="/dashboard/reports" />
              <Route element={<SalePage />} path="/dashboard/sales" />
              <Route
                element={<TransactionPage />}
                path="/dashboard/transactions"
              />
              <Route
                element={<CreateTransactionPage />}
                path={"/dashboard/transactions/create_subscription"}
              />
              <Route
                element={<ViewTransactionPage />}
                path={"/dashboard/transactions/view_subscription"}
              />
              <Route
                element={<EditTransactionPage />}
                path={"/dashboard/transactions/edit_subscription"}
              />
              <Route element={<UserPage />} path="/dashboard/users" />
              <Route
                element={<CreateUserPage />}
                path={"/dashboard/users/create_user"}
              />
              <Route
                element={<CreateUserConfirmationPage />}
                path={"/dashboard/users/create_user/confirmation_email"}
              />
              <Route
                element={<ViewUserPage />}
                path={"/dashboard/users/view_user"}
              />
              <Route
                element={<EditUserPage />}
                path={"/dashboard/users/edit_user"}
              />
            </Route>
          </Routes>
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
