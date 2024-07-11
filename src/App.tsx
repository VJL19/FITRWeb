import LoginPage from "./pages/auth/login/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [navigate, isAuthenticated]);

  return (
    <div>
      {isAuthenticated && <Dashboard />}
      <Routes>
        {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}
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
