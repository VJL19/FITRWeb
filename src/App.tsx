import LoginPage from "./pages/auth/login/LoginPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { useGetAccessWebTokenQuery } from "./reducers/login";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ForgotPasswordConfirmationPage from "./pages/auth/ForgotPasswordConfirmationPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import LandingPage from "./pages/promotional/LandingPage";
function App() {
  const { data, status, error } = useGetAccessWebTokenQuery();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!data?.isAuthenticated) {
      navigate("/login", { replace: true });
    }
    if (!error?.data?.isAuthenticated) {
      navigate("/login", { replace: true });
    }
    if (data?.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [data?.isAuthenticated, status]);

  useEffect(() => {
    if (!data?.isAuthenticated && location.pathname.includes("/dashboard")) {
      navigate("/login", { replace: true });
    }
  }, [data?.isAuthenticated, location.pathname]);

  if (data?.isAuthenticated) {
    return <Dashboard />;
  }
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<LandingPage />} />
        <Route path="/reset_password" element={<ForgotPasswordPage />} />
        <Route
          path="/change_password_confirmation"
          element={<ForgotPasswordConfirmationPage />}
        />
        <Route path="/change_password" element={<ChangePasswordPage />} />
      </Routes>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>count is {value}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
  </p>*/}
    </div>
  );
}

export default App;
