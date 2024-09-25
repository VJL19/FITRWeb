import React, { useEffect } from "react";
import "../promotional/styles/Header.css";
import { useGetAccessWebTokenQuery } from "src/reducers/login";
import { UserRole } from "src/utils/enums/ROLE";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "src/components/LoadingIndicator";
import { useLogoutUserWebMutation } from "src/reducers/login";

const Header = () => {
  const { data, status, error } = useGetAccessWebTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [logoutUser, { status: logoutStatus, data: logoutData }] =
    useLogoutUserWebMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (logoutStatus === "fulfilled") {
      window.location.reload();
    }
  }, [status, logoutData?.message]);
  if (status === "pending") {
    return <LoadingIndicator />;
  }
  return (
    <header>
      <nav>
        <div className="logo">
          <a href="#homepage">MJESHTER FITNESS GYM</a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#services">SERVICES</a>
          </li>
          <li>
            <a href="#footer">CONTACT US</a>
          </li>
          <li>
            {data?.user?.Role?.toUpperCase() === UserRole.ADMIN ? (
              <React.Fragment>
                <a
                  onClick={() => {
                    navigate("/dashboard", { replace: true });
                    window.location.reload();
                  }}
                  className="login-btn"
                >
                  ADMIN
                </a>
                <a
                  onClick={() => {
                    logoutUser();
                    navigate("/login", { replace: true });
                  }}
                  className="login-btn"
                >
                  LOG OUT
                </a>
              </React.Fragment>
            ) : (
              <a
                onClick={() => {
                  logoutUser();
                  navigate("/login", { replace: true });
                }}
                className="login-btn"
              >
                LOG OUT
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
