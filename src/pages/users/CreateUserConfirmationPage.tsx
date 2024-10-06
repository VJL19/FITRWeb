import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DisplayFormError from "src/components/DisplayFormError";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import {
  setOTPToken,
  useActivateUserAccountMutation,
  useSendEmailMutation,
} from "src/reducers/users";
import { AppDispatch, RootState } from "src/store/store";
import { TOtpSchema, otpSchema } from "src/utils/validations/userSchema";
import OtpInput from "react-otp-input";
import { useUserOnline } from "src/hooks/useUserOnline";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";

const CreateUserConfirmationPage = () => {
  const [timer, setTimer] = useState(60 * 2);
  const [valid, isValid] = useState(true);

  const { OTPToken } = useSelector((state: RootState) => state.user);
  const { Email } = useSelector((state: RootState) => state.user.userData);
  const [
    sendOTPEmail,
    { data: emailCode, status: emailStat, isLoading, error: emailErr },
  ] = useSendEmailMutation();

  const [
    activateAccount,
    { status: activateStatus, data, error: activateErr },
  ] = useActivateUserAccountMutation();

  const { isOnline } = useUserOnline();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const seconds = String(timer % 60).padStart(2, 0);
  const minutes = String(Math.floor(timer / 60)).padStart(2, 0);

  console.log("YOUR OTP TOKEN", OTPToken);
  console.log("YOUR EMAIL", Email);
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

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm<TOtpSchema>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (emailStat === "fulfilled") {
      dispatch(setOTPToken(emailCode?.code));
      setTimer(60 * 2);
      isValid(true);
    }
    if (emailErr?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_user"
      );
    }
    if (emailErr?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_user"
      );
    }
  }, [emailStat]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (otp.length === 6) {
        onSubmit({ OTPCode: otp });
      }
    }, 2500);
    return () => clearTimeout(timeOutId);
  }, [otp]);

  useEffect(() => {
    if (activateStatus === "fulfilled") {
      showSuccessToast("Successfully complete the registration!", "toast_user");

      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate("/dashboard/users", { replace: true });
      };
      delayRedirect();
    }
    if (activateErr?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_user"
      );
    }
    if (activateErr?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_user"
      );
    }
  }, [activateStatus]);

  const onSubmit = async (data: TOtpSchema) => {
    if (!valid) {
      showFailedToast(
        "Your OTP is expired, please generate again!",
        "toast_user"
      );

      return;
    }
    if (OTPToken === Number(data.OTPCode)) {
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        activateAccount({ Email: Email });
      };
      delayRedirect();

      reset();
    } else {
      showFailedToast("Entered code does not match!", "toast_user");
    }
  };
  const handleResend = () => {
    sendOTPEmail({ Email: Email });
  };
  return (
    <div>
      <h1>CONFIRM USER EMAIL</h1>
      <h3>
        {minutes}:{seconds}
      </h3>
      <p>
        A generated OTP code is needed to further finish the registration
        process of user email. Note: If the user does not confirm this account,
        it will not be activated
      </p>

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputStyle={{
          height: 75,
          fontSize: 27,
          width: "8%",
          borderRadius: "10%",
        }}
        placeholder="123456"
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />

      {!valid && (
        <Button
          color="warning"
          variant="contained"
          size="large"
          onClick={handleResend}
          disabled={isLoading}
        >
          Resend OTP
        </Button>
      )}
      <ToastContainer containerId={"toast_user"} />
    </div>
  );
};

export default CreateUserConfirmationPage;
