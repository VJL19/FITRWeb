import "../styles/Dashboard.css";
import { Route, Routes } from "react-router-dom";
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
const Dashboard = () => {
  return (
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
          <Route element={<ReportPage />} path="/dashboard/reports" />
          <Route element={<SalePage />} path="/dashboard/sales" />
          <Route element={<TransactionPage />} path="/dashboard/transactions" />
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
  );
};

export default Dashboard;
