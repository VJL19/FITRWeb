import { Container, Button, TextField, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getCurrentDate from "src/utils/functions/date_fns";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import thumbnail from "src/assets/thumbnail_no_img.jpg";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "src/components/LoadingIndicator";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { useCreateSuggestedProgramMutation } from "src/reducers/program";
import {
  TProgramSchema,
  programSchema,
} from "src/utils/validations/programSchema";
import React from "react";
import RichTextEditor from "src/components/RichTextEditor";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import { useUserOnline } from "src/hooks/useUserOnline";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";

const CreateProgramPage = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<TProgramSchema>({
    resolver: zodResolver(programSchema),
  });

  const [createProgram, { data, error, isLoading, status }] =
    useCreateSuggestedProgramMutation();
  const navigate = useNavigate();
  const { isOnline } = useUserOnline();

  const handleBack = () => {
    navigate("/suggested_programs", { replace: true });
  };

  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      showSuccessToast(data?.message, "toast_program");
      reset();
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        handleBack();
      };
      delayRedirect();
    }
    if (status === "rejected" && isSubmitted) {
      showFailedToast(data?.message, "toast_program");
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_program"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_program"
      );
    }
    if (
      error?.status === HTTP_ERROR.UNAUTHORIZED ||
      error?.status === HTTP_ERROR.BAD_REQUEST
    ) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_program"
      );
    }
  }, [status, data?.message]);

  const onSubmit = async (data: TProgramSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const arg = {
      SuggestedProgramTitle: data?.SuggestedProgramTitle,
      SuggestedProgramDescription: data?.SuggestedProgramDescription,
      SuggestedProgramEntryDate: getCurrentDate(),
    };

    createProgram(arg);
  };

  console.log("data program status", status);
  console.log("data program data", data?.message);
  console.log("data program error", error);

  if (status === "pending") {
    return <LoadingIndicator />;
  }
  return (
    <div style={{ padding: 5 }}>
      <Container maxWidth="md" sx={{ padding: { xs: 2, md: 5 } }}>
        <Button
          startIcon={<ArrowBackIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
          disabled={isLoading}
          variant="contained"
          color="warning"
          size="medium"
          onClick={handleBack}
          sx={{
            mb: 3,
            fontSize: { xs: '0.8rem', sm: '1rem' },
          }}
        >
          Back
        </Button>
        <h1 style={{ fontSize: '1.8rem', textAlign: 'center' }}>
          CREATE SUGGESTED PROGRAM
        </h1>
        <h2>Title</h2>
        <TextField
          {...register("SuggestedProgramTitle")}
          inputMode="text"
          required
          error={!!errors.SuggestedProgramTitle}
          label="Enter suggested program title"
          sx={{ width: "100%", mb: 2 }}
        />
        {errors.SuggestedProgramTitle && (
          <h4 style={{ color: "#d9534f" }}>
            {errors.SuggestedProgramTitle?.message}
          </h4>
        )}
        <h2>Description</h2>
        <Box
          component="div"
          sx={{
            height: { xs: 250, md: 350 },
            mb: 2,
          }}
        >
          <Controller
            name="SuggestedProgramDescription"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field: { onChange, value, ...restField } }) => (
              <React.Fragment>
                <RichTextEditor
                  {...restField}
                  value={value}
                  setValue={onChange}
                  style={{ height: "100%" }}
                />
              </React.Fragment>
            )}
          />
        </Box>

        {errors.SuggestedProgramDescription && (
          <h4 style={{ color: "#d9534f" }}>
            {errors.SuggestedProgramDescription?.message}
          </h4>
        )}

        <Button
          disabled={isSubmitting}
          endIcon={<SendIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="success"
          size="large"
          onClick={handleSubmit(onSubmit, (err) => console.log(err))}
          sx={{
            width: "100%",
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          Submit
        </Button>
      </Container>

      <ToastContainer containerId={"toast_program"} />
    </div>
  );
};

export default CreateProgramPage;
