import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DisplayFormError from "src/components/DisplayFormError";
import LoadingIndicator from "src/components/LoadingIndicator";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { useChangePasswordMutation } from "src/reducers/auth";
import { RootState } from "src/store/store";
import {
  TForgotPasswordSchema,
  forgotPasswordSchema,
} from "src/utils/validations/forgotPasswordSchema";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ChangePasswordPage = () => {
  const {
    control,
    register,
    formState: { errors, isSubmitted, isSubmitting },
    handleSubmit,
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>();
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>();

  const [changePassword, { data, status, error }] = useChangePasswordMutation();

  const { Email, Username } = useSelector(
    (state: RootState) => state.auth.forgotPasswordInfo
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "rejected" && isSubmitted) {
      showFailedToast("Something went wrong", "change_password");
    }
    if (status === "fulfilled" && isSubmitted) {
      showSuccessToast(data?.message, "change_password");

      navigate("/login", { replace: true });
    }
  }, [status]);

  window.onpopstate = () => {
    navigate("/login", { replace: true });
  };

  const onSubmit = async (data: TForgotPasswordSchema) => {
    const arg = {
      Email: Email,
      Password: data.Password,
      ConfirmPassword: data.ConfirmPassword,
    };
    changePassword(arg);
  };

  if (status === "pending") {
    return <LoadingIndicator />;
  }

  return (
    <Container maxWidth="md">
      <h2>Username</h2>
      <p>{Username}</p>
      <h2>Password</h2>
      <Stack width={"100%"}>
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
      <Stack width={"100%"}>
        <TextField
          {...register("ConfirmPassword")}
          required
          inputProps={{ type: showConfirmPassword ? "text" : "password" }}
          error={errors.ConfirmPassword ? true : false}
          label="Enter confirm password"
          sx={{ width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showConfirmPassword ? (
                  <VisibilityIcon
                    htmlColor="#202020"
                    fontSize="medium"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  />
                ) : (
                  <VisibilityOffIcon
                    htmlColor="#202020"
                    fontSize="medium"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <DisplayFormError errors={errors.ConfirmPassword} />
      </Stack>

      <Button
        disabled={isSubmitting}
        endIcon={<SendIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
        variant="contained"
        color="success"
        size="large"
        onClick={handleSubmit(onSubmit, (err) => console.log(err))}
        style={{ width: "100%" }}
      >
        Submit
      </Button>
      <ToastContainer containerId={"change_password"} />
    </Container>
  );
};

export default ChangePasswordPage;
