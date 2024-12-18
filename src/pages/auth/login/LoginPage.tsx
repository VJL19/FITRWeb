import React, { useEffect, useState } from "react";
import { loginUser, useGetAccessWebTokenQuery } from "src/reducers/login";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "src/assets/logo_1.png";
import "./styles.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginSchema, loginSchema } from "src/utils/validations/loginSchema";
import {
  Stack,
  TextField,
  InputAdornment,
  Button,
  Container,
} from "@mui/material";
import DisplayFormError from "src/components/DisplayFormError";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  useLoginAsGuestMutation,
  useLoginUserMutation,
} from "src/reducers/login";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast, Bounce } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import "react-toastify/dist/ReactToastify.css";
import delayShowToast from "src/utils/functions/delayToast";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import { useUserOnline } from "src/hooks/useUserOnline";
import { setAdminAccountData } from "src/reducers/users";
import { AppDispatch } from "src/store/store";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const { data: accessTokenData, error: tokenErr } = useGetAccessWebTokenQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    handleSubmit,
    register,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const [loginUserr, { data, status, isLoading, error }] =
    useLoginUserMutation();

  const [
    guestLogin,
    { status: guestStatus, data: guestData, error: guestError },
  ] = useLoginAsGuestMutation();
  const { isOnline } = useUserOnline();

  useEffect(() => {
    if (accessTokenData?.isAuthenticated) {
      navigate("/homepage", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (status === "fulfilled") {
      delayShowToast("success", data?.details, "toast_login");
      navigate("/homepage", { replace: true });
      dispatch(
        setAdminAccountData({
          RFIDNumber: accessTokenData?.user?.RFIDNumber!,
          LastName: "",
          FirstName: "",
          MiddleName: "",
          Birthday: "",
          Age: "",
          ContactNumber: "",
          Email: "",
          Address: "",
          Height: "",
          Weight: "",
          Username: "",
          Password: "",
          ConfirmPassword: "",
          SubscriptionType: "",
          Gender: "",
        })
      );
    }
    if (status === "rejected") {
      delayShowToast(
        "failed",
        error?.data?.details || error?.data?.error,
        "toast_login"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occurred. Please check your internet connection and try again.",
        "toast_login"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem with the server. Possible maintenance or an unexpected crash. We apologize for the inconvenience.",
        "toast_login"
      );
    }
  }, [status]);

  useEffect(() => {
    if (guestStatus === "fulfilled") {
      delayShowToast("success", guestData?.details, "toast_login");
    }
    if (guestStatus === "rejected") {
      delayShowToast(
        "failed",
        guestError?.data?.details || guestError?.data?.error,
        "toast_login"
      );
    }
    if (guestError?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occurred. Please check your internet connection and try again.",
        "toast_login"
      );
    }
    if (guestError?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem with the server. Possible maintenance or an unexpected crash. We apologize for the inconvenience.",
        "toast_login"
      );
    }
  }, [guestStatus]);

  const handleLogin = async (data: TLoginSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loginUserr(data);
    console.log(data);
  };

  const handleLoginGuest = async () => {
    // guestLogin();ß
    navigate("/dashboard");
  };

  // Determine if there's an error
  const hasError = Object.keys(errors).length > 0;

  return (
    <div className="container">
      <div className="bg-background">
        <div className="logo-container">
          <img src={logo} height="200" width="80%" className="logo-img" />
        </div>
        <div
          className="login-container"
          style={{
            height: hasError ? "auto" : "60%", // Adjust height dynamically if there's an error
          }}
        >
          <div style={{ padding: 25 }}>
            <h1>GET CONNECTED WITH US</h1>
            <Stack direction={"column"} alignItems={"flex-start"}>
              <Stack width={"100%"} alignItems={"flex-start"}>
                <h2>Username</h2>
                <TextField
                  {...register("Username")}
                  required
                  error={errors.Username && true}
                  label="Enter username"
                  sx={{ width: "100%" }}
                />
                <DisplayFormError errors={errors.Username} />
              </Stack>
              <br />
              <Stack width={"100%"} alignItems={"flex-start"}>
                <h2>Password</h2>
                <TextField
                  {...register("Password")}
                  required
                  inputProps={{ type: showPassword ? "text" : "password" }}
                  error={errors.Password ? true : false}
                  label="Enter password"
                  sx={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword ? (
                          <VisibilityIcon
                            htmlColor="#202020"
                            fontSize="medium"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword((prev) => !prev)}
                          />
                        ) : (
                          <VisibilityOffIcon
                            htmlColor="#202020"
                            fontSize="medium"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword((prev) => !prev)}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <DisplayFormError errors={errors.Password} />
              </Stack>
            </Stack>
            <NavLink to="/reset_password">Forgot Password</NavLink>
          </div>

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Container
              maxWidth="md"
              sx={{
                textAlign: "center",
              }}
            >
              <Button
                disabled={isSubmitting}
                endIcon={<SendIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
                variant="contained"
                sx={{ bgColor: "primary.main" }}
                size="large"
                onClick={handleSubmit(handleLogin, (err) => console.log(err))}
                style={{ width: "100%" }}
              >
                LOGIN
              </Button>
              <h3>OR</h3>
              <NavLink to="/landing_page">
                <Button
                  endIcon={<SendIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
                  variant="outlined"
                  sx={{ bgColor: "primary.main" }}
                  size="large"
                  style={{ width: "100%" }}
                >
                  VIEW LANDING PAGE
                </Button>
              </NavLink>
            </Container>
          )}
        </div>
      </div>
      <ToastContainer containerId={"toast_login"} />
    </div>
  );
};

export default LoginPage;
