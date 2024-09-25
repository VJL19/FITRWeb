import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, useGetAccessWebTokenQuery } from "src/reducers/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "src/store/store";
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
import { showSuccessToast, showFailedToast } from "src/components/showToast";
import { ToastContainer, toast, Bounce } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const navigate = useNavigate();
  const { data: accessTokenData } = useGetAccessWebTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [loginUserr, { data, status, isLoading, error }] =
    useLoginUserMutation();

  const [
    guestLogin,
    { status: guestStatus, data: guestData, error: guestError },
  ] = useLoginAsGuestMutation();
  useEffect(() => {
    if (accessTokenData?.isAuthenticated) {
      navigate("/homepage", { replace: true });
    }
  }, []);
  useEffect(() => {
    if (status === "fulfilled") {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        showSuccessToast(data?.details, "toast_login");
        navigate("/homepage", { replace: true });
      };
      deplayShowToast();
    }
    if (status === "rejected") {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        showFailedToast(
          error?.data?.details || error?.data?.error,
          "toast_login"
        );
      };
      deplayShowToast();
    }
  }, [status]);
  useEffect(() => {
    if (guestStatus === "fulfilled") {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        showSuccessToast(guestData?.details, "toast_login");
        navigate("/homepage", { replace: true });
      };
      deplayShowToast();
    }
    if (guestStatus === "rejected") {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        showFailedToast(
          guestError?.data?.details || guestError?.data?.error,
          "toast_login"
        );
      };
      deplayShowToast();
    }
  }, [guestStatus]);

  const handleLogin = async (data: TLoginSchema) => {
    // dispatch(loginUser());
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loginUserr(data);
    console.log(data);
  };
  const handleLoginGuest = async () => {
    guestLogin();
  };

  console.log("login data", data);
  console.log("login err", error);
  console.log("login status", status);
  return (
    <div className="container">
      <div className="bg-background">
        <div className="logo-container">
          <img src={logo} height={300} width="100%" className="logo-img" />
        </div>
        <div className="login-container">
          <div style={{ padding: 25 }}>
            <h1>GET CONNECTED WITH US</h1>
            <Stack direction={"column"}>
              <Stack width={"100%"}>
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
              <Stack width={"100%"}>
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
                color="error"
                size="large"
                onClick={handleSubmit(handleLogin, (err) => console.log(err))}
                style={{ width: "100%" }}
              >
                LOGIN
              </Button>

              <h3>OR</h3>
              <Button
                disabled={isSubmitting}
                variant="outlined"
                color="error"
                size="large"
                onClick={handleLoginGuest}
                style={{ width: "100%" }}
              >
                LOGIN AS GUEST
              </Button>
            </Container>
          )}
          <br />
        </div>
      </div>
      <ToastContainer containerId={"toast_login"} />
    </div>
  );
};

export default LoginPage;
