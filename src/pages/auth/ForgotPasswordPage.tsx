import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import DisplayFormError from "src/components/DisplayFormError";
import {
  setForgotPasswordFields,
  setOTPToken,
  useForgotPasswordMutation,
} from "src/reducers/auth";
import { AppDispatch } from "src/store/store";
import {
  TEmailSchema,
  emailSchema,
} from "src/utils/validations/forgotPasswordSchema";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ArrowBack from "@mui/icons-material/ArrowBack";
import LoadingIndicator from "src/components/LoadingIndicator";

const ForgotPasswordPage = () => {
  const {
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
    register,
  } = useForm<TEmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const [forgotPassword, { data, status, error }] = useForgotPasswordMutation();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: TEmailSchema) => {
    forgotPassword({ Email: data.Email });
  };

  const handleBack = () => {
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (status === "rejected" && isSubmitted) {
      showFailedToast(error?.data?.message, "forgot_password");
    }
    if (status === "fulfilled" && isSubmitted) {
      showSuccessToast(data?.message, "forgot_password");
      dispatch(setOTPToken(data?.code));
      dispatch(
        setForgotPasswordFields({
          Username: data?.result?.[0].Username!,
          Email: getValues("Email"),
        })
      );

      navigate("/change_password_confirmation", { replace: true });
      reset();
    }
  }, [status]);
  if (status === "pending") {
    return <LoadingIndicator />;
  }
  return (
    <div>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBack fontSize="medium" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="warning"
          size="large"
          onClick={handleBack}
        >
          Back
        </Button>
        <h1>FORGOT PASSWORD</h1>
        <h2>Enter your associated email registered to your account</h2>
        <Stack width={"100%"}>
          <TextField
            {...register("Email")}
            required
            error={errors.Email ? true : false}
            label="Enter email"
            sx={{ width: "100%" }}
          />
          <DisplayFormError errors={errors.Email} />
        </Stack>

        <br />
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
        <ToastContainer containerId={"forgot_password"} />
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
