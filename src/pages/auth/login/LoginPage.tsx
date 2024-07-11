import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../reducers/auth";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import logo from "../../../../public/images/logo_1.png";
import "./styles.css";

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (): void => {
    dispatch(loginUser());
    navigate("/dashboard", { replace: true });
  };
  return (
    <div className="container">
      <div className="bg-background">
        <div className="logo-container">
          <img src={logo} height={300} className="logo-img" />
        </div>
        <div className="login-container">
          <button onClick={handleLogin} className="btn-login">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
