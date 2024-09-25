import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DisplayFormError from "src/components/DisplayFormError";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { setOTPToken, useForgotPasswordMutation } from "src/reducers/auth";
import { AppDispatch, RootState } from "src/store/store";
import { TOTPSchema } from "src/utils/validations/forgotPasswordSchema";
import { TOtpSchema, otpSchema } from "src/utils/validations/userSchema";
import ArrowBack from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer } from "react-toastify";
import LoadingIndicator from "src/components/LoadingIndicator";
import { handleOpen } from "src/reducers/modal";
import CustomModal from "src/components/CustomModal";

const ForgotPasswordConfirmationPage = () => {
  const [timer, setTimer] = useState(60 * 2);
  const [valid, isValid] = useState(true);

  const [forgotPassword, { data, status, error }] = useForgotPasswordMutation();
  const { open } = useSelector((state: RootState) => state.modal);

  const { OTPToken } = useSelector((state: RootState) => state.auth);
  const { Email } = useSelector(
    (state: RootState) => state.auth.forgotPasswordInfo
  );
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const seconds = String(timer % 60).padStart(2, 0);
  const minutes = String(Math.floor(timer / 60)).padStart(2, 0);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm<TOtpSchema>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(setOTPToken(data?.code));
      showSuccessToast(
        "Successfully sent another OTP code, Please check your email!",
        "otp_confirmation"
      );
    }
  }, [status]);

  useEffect(() => {
    if (timer === 0 || timer < 0) {
      setTimer(0);
      isValid(false);
      return;
    }
    const runTimer = setTimeout(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    return () => clearInterval(runTimer);
  }, [timer]);
  window.onpopstate = () => {
    navigate("/login", { replace: true });
  };

  console.log("heys", OTPToken);
  const handlePress = (data: TOTPSchema) => {
    if (!valid) {
      showFailedToast(
        "Your OTP is expired, please generate again!",
        "otp_confirmation"
      );

      return;
    }
    if (+OTPToken === Number(data.OTPCode)) {
      navigate("/change_password", { replace: true });
      showSuccessToast(
        "OTP is valid. You may now proceed on changing your password!",
        "otp_confirmation"
      );
    } else {
      showFailedToast("Entered code does not match!", "otp_confirmation");
    }
  };

  const handleResend = () => {
    forgotPassword({ Email: Email });
    setTimer(60 * 2);
    isValid(true);
  };
  const handleGoBack = () => {
    navigate("/login", { replace: true });
  };
  if (status === "pending") {
    return <LoadingIndicator />;
  }
  return (
    <Container maxWidth="md">
      <h2>
        {minutes}:{seconds}
      </h2>
      <p>
        Enter the valid generated code send to your email, The generated code is
        valid until 2 minutes. If your code doesn't apppear in mail box check
        the spam.
      </p>
      <h2>Please Note:</h2>
      <p>Never share your OTP code to anyone</p>
      <h2>OTP Code</h2>
      <TextField
        {...register("OTPCode")}
        inputProps={{ type: "number" }}
        required
        error={errors.OTPCode ? true : false}
        label="Enter OTP code"
        sx={{ width: "100%" }}
      />
      <DisplayFormError errors={errors.OTPCode} />

      {!valid && (
        <Button
          startIcon={<ArrowBack fontSize="medium" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="warning"
          size="large"
          onClick={handleResend}
        >
          Resend Code
        </Button>
      )}
      <Button
        startIcon={<SendIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
        variant="contained"
        color="success"
        size="large"
        onClick={handleSubmit(handlePress)}
      >
        Proceed
      </Button>
      <CustomModal
        open={open}
        title="Confirm go back?"
        handleDeleteClick={handleGoBack}
      />
      <ToastContainer containerId={"otp_confirmation"} />
    </Container>
  );
};

export default ForgotPasswordConfirmationPage;
