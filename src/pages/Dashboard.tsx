import "../styles/Dashboard.css";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AnnouncementPage from "./announcement/AnnouncementPage";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import ProgramPage from "./programs/ProgramPage";
import RecordPage from "./records/RecordPage";
import ReportPage from "./reports/ReportPage";
import TransactionPage from "./transactions/TransactionPage";
import UserPage from "./users/UserPage";
import ViewAnnouncementPage from "./announcement/ViewAnnouncementPage";
import EditAnnouncementPage from "./announcement/EditAnnouncementPage";
import CreateAnnouncementPage from "./announcement/CreateAnnouncementPage";
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
import {
  useGetAccessWebTokenQuery,
  useGetAuthTokenQuery,
} from "src/reducers/login";
import { UserRole } from "src/utils/enums/ROLE";
import LandingPage from "./promotional/LandingPage";
import BreadCrumbs from "src/components/BreadCrumbs";
import SideBar from "src/components/SideBar";
import MainLayout from "src/components/layout/MainLayout";
import { routes } from "src/routes";
import AttendanceHistoryPage from "./attendance/AttendanceHistoryPage";
import GenerateReport from "src/components/GenerateReport";
import TransactionHistoryPage from "./transactions/TransactionHistoryPage";
import Analytics from "src/components/Analytics";
import ManageAccountPage from "./auth/ManageAccountPage";
import ChangeAccountPage from "./auth/ChangeAccountPage";
import ChangeAccountConfirmationPage from "./auth/ChangeAccountConfirmationPage";
import CreateAttendanceRecordPage from "./attendance/CreateAttendanceRecordPage";
import ViewAttendanceRecordPage from "./attendance/ViewAttendanceRecordPage";
import EditAttendanceRecordPage from "./attendance/EditAttendanceRecordPage";
import AttendanceGuestTapPage from "./attendance/AttendanceGuestTapPage";

const Dashboard = () => {
  const { data, status, error } = useGetAuthTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();
  const location = useLocation();

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
              <Route element={<AnnouncementPage />} path="/announcements" />
              <Route
                element={<CreateAnnouncementPage />}
                path={"/announcements/create_announcement"}
              />
              <Route
                element={<ViewAnnouncementPage />}
                path={"/announcements/view_announcement"}
              />
              <Route
                element={<EditAnnouncementPage />}
                path={"/announcements/edit_announcement"}
              />
              <Route element={<Home />} path="/dashboard" index />
              <Route element={<ProgramPage />} path="/suggested_programs" />

              <Route
                element={<CreateProgramPage />}
                path={"/suggested_programs/create_program"}
              />
              <Route
                element={<ViewProgramPage />}
                path={"/suggested_programs/view_program"}
              />
              <Route
                element={<EditProgramPage />}
                path={"/suggested_programs/edit_program"}
              />
              <Route element={<RecordPage />} path="/records" />
              <Route element={<EditRecordPage />} path="/records/edit_record" />

              <Route element={<ViewRecordPage />} path="/records/view_record" />
              <Route element={<ReportPage />} path="/reports" />

              <Route element={<AttendancePage />} path="/attendance" />
              <Route
                element={<CreateAttendanceRecordPage />}
                path="/attendance/create_attendance"
              />
              <Route
                element={<AttendanceGuestTapPage />}
                path="/attendance/guest_tap"
              />
              <Route
                element={<ViewAttendanceRecordPage />}
                path="/attendance/view_attendance"
              />
              <Route
                element={<EditAttendanceRecordPage />}
                path="/attendance/edit_attendance"
              />
              <Route
                element={<GenerateReport selectedValue="Attendance Report" />}
                path="/attendance/attendance_reports"
              />
              <Route
                element={<AttendanceHistoryPage />}
                path="/attendance/attendance_history"
              />
              <Route
                element={<Analytics selectedItem="Attendance" />}
                path="/attendance/attendance_analytics"
              />
              <Route element={<TransactionPage />} path="/transactions" />
              <Route
                element={<TransactionHistoryPage />}
                path="/transactions/transaction_history"
              />
              <Route
                element={<Analytics selectedItem="Sales" />}
                path="/transactions/transaction_analytics"
              />
              <Route
                element={<GenerateReport selectedValue="Financial Report" />}
                path="/transactions/transaction_reports"
              />
              <Route
                element={<CreateTransactionPage />}
                path={"/transactions/create_subscription"}
              />
              <Route
                element={<ViewTransactionPage />}
                path={"/transactions/view_subscription"}
              />
              <Route
                element={<EditTransactionPage />}
                path={"/transactions/edit_subscription"}
              />
              <Route element={<UserPage />} path="/users" />
              <Route element={<CreateUserPage />} path={"/users/create_user"} />
              <Route
                element={<CreateUserConfirmationPage />}
                path={"/users/create_user/confirmation_email"}
              />
              <Route
                element={<ManageAccountPage />}
                path={"/dashboard/manage_account"}
              />
              <Route
                element={<ChangeAccountConfirmationPage />}
                path={"/dashboard/manage_account/confirmation_email"}
              />
              <Route
                element={<ChangeAccountPage />}
                path={"/dashboard/manage_account/change_account"}
              />
              <Route element={<ViewUserPage />} path={"/users/view_user"} />
              <Route element={<EditUserPage />} path={"/users/edit_user"} />
            </Route>
            {/* <Route path="/" element={<MainLayout />}>
              {routes}
            </Route> */}
          </Routes>
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
