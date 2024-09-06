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

const CreateUserConfirmationPage = () => {
  const [timer, setTimer] = useState(60 * 2);
  const [valid, isValid] = useState(true);

  const { OTPToken } = useSelector((state: RootState) => state.user);
  const { Email } = useSelector((state: RootState) => state.user.userData);
  const [
    sendOTPEmail,
    { data: emailCode, status: emailStat, isLoading, error: emailErr },
  ] = useSendEmailMutation();

  const [activateAccount, { status: activateStatus, data }] =
    useActivateUserAccountMutation();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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
    }
  }, [emailStat]);

  useEffect(() => {
    if (activateStatus === "fulfilled") {
      showSuccessToast(
        "Successfully activated this registration!",
        "toast_user"
      );
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate("/dashboard/users", { replace: true });
      };
      delayRedirect();
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
      showSuccessToast("Successfully complete the registration!", "toast_user");
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
    setTimer(60 * 2);
    isValid(true);
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

      <TextField
        {...register("OTPCode")}
        inputProps={{ type: "number" }}
        required
        error={errors.OTPCode ? true : false}
        label="Enter OTP code"
        sx={{ width: "100%" }}
      />
      <DisplayFormError errors={errors.OTPCode} />

      <Button
        disabled={isSubmitting}
        color="success"
        variant="contained"
        size="large"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
      {!valid && (
        <Button
          color="warning"
          variant="contained"
          size="large"
          onClick={handleResend}
        >
          Resend OTP
        </Button>
      )}
      <ToastContainer containerId={"toast_user"} />
    </div>
  );
};

export default CreateUserConfirmationPage;
