import {
  Container,
  Button,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TannouncementSchema,
  announcementSchema,
} from "src/utils/validations/announcementSchema";
import getCurrentDate from "src/utils/functions/date_fns";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import thumbnail from "src/assets/thumbnail_no_img.jpg";
import "react-toastify/dist/ReactToastify.css";
import { uploadImage } from "src/utils/functions/uploadImage";
import { IMAGE_VALUES } from "src/utils/enums/IMAGE_VALUES";
import LoadingIndicator from "src/components/LoadingIndicator";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { showSuccessToast } from "src/components/showToast";
import { useCreateSuggestedProgramMutation } from "src/reducers/program";
import {
  TProgramSchema,
  programSchema,
} from "src/utils/validations/programSchema";
const CreateProgramPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<TProgramSchema>({
    resolver: zodResolver(programSchema),
  });

  const [loading, setLoading] = useState(false);

  const [createProgram, { data, error, isLoading, status }] =
    useCreateSuggestedProgramMutation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/suggested_programs", { replace: true });
  };

  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      showSuccessToast(data?.message);

      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate("/dashboard/suggested_programs", { replace: true });
        reset();
      };
      delayRedirect();
    }
    if (status === "rejected" && isSubmitted) {
      showSuccessToast(data?.message);
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
    reset();
  };

  console.log("data program status", status);
  console.log("data program data", data?.message);
  console.log("data program error", error);

  if (status === "pending") {
    return <LoadingIndicator />;
  }
  return (
    <div style={{ padding: 5 }}>
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowBackIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
          disabled={isLoading}
          variant="contained"
          color="warning"
          size="medium"
          onClick={handleBack}
        >
          Back
        </Button>
        <h1>CREATE SUGGESTED PROGRAM</h1>
        <br />
        <br />

        <TextField
          {...register("SuggestedProgramTitle")}
          inputMode="text"
          required
          error={errors.SuggestedProgramTitle ? true : false}
          label="Enter suggested program title"
          sx={{ width: "100%" }}
        />
        {errors.SuggestedProgramTitle && (
          <h4 style={{ color: "#d9534f" }}>
            {errors.SuggestedProgramTitle?.message}
          </h4>
        )}
        <TextField
          {...register("SuggestedProgramDescription")}
          inputMode="text"
          required
          error={errors.SuggestedProgramDescription ? true : false}
          rows={10}
          label="Enter suggested program description"
          multiline={true}
          style={{ width: "100%" }}
        />
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
          style={{ width: "100%" }}
        >
          Submit
        </Button>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default CreateProgramPage;
