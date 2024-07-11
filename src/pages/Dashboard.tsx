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
          <Route element={<ProgramPage />} path="/dashboard/programs" />
          <Route element={<RecordPage />} path="/dashboard/records" />
          <Route element={<ReportPage />} path="/dashboard/reports" />
          <Route element={<SalePage />} path="/dashboard/sales" />
          <Route element={<TransactionPage />} path="/dashboard/transactions" />
          <Route element={<UserPage />} path="/dashboard/users" />
        </Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
