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
import { useCreateAnnouncementMutation } from "src/reducers/announcement";
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
const CreateAnnouncementPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<TannouncementSchema>({
    resolver: zodResolver(announcementSchema),
  });

  const [imagePreview, setImagePreview] = useState<File | undefined | string>(
    IMAGE_VALUES.DEFAULT_VALUE
  );
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null | undefined>();

  const [createAnnouncement, { data, error, isLoading, status }] =
    useCreateAnnouncementMutation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/announcements", { replace: true });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview(event?.target?.files?.[0]);
    console.log(event?.target?.files?.[0].name);
  };

  const toggleImageUpload = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      showSuccessToast(data?.message);

      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate("/dashboard/announcements", { replace: true });
        setImagePreview(IMAGE_VALUES.DEFAULT_VALUE);
        reset();
      };
      delayRedirect();
    }
    if (status === "rejected" && isSubmitted) {
      showSuccessToast(data?.message);
    }
  }, [status, data?.message]);

  const onSubmit = async (data: TannouncementSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const url = await uploadImage(
      imagePreview,
      "GymAnnouncements/",
      "image",
      loading,
      setLoading
    );

    console.log("hey", url);
    const arg = {
      AnnouncementImage:
        url === IMAGE_VALUES.DEFAULT_VALUE ? IMAGE_VALUES.DEFAULT_VALUE : url,
      AnnouncementTitle: data?.AnnouncementTitle,
      AnnouncementDescription: data?.AnnouncementDescription,
      AnnouncementDate: getCurrentDate(),
    };

    createAnnouncement(arg);
    reset();
  };

  console.log("data announce status", status);
  console.log("data announce data", data?.message);

  console.log("is loading", isLoading);

  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <div style={{ padding: 5 }}>
      <Container maxWidth="sm">
        <h1>Create Announcement</h1>
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
        <br />
        <img
          onClick={toggleImageUpload}
          src={
            imagePreview === IMAGE_VALUES.DEFAULT_VALUE
              ? thumbnail
              : URL.createObjectURL(imagePreview)
          }
          height={400}
          style={{ cursor: "pointer" }}
        />
        <br />

        <input
          type="file"
          accept=".jpeg,.png"
          hidden
          ref={fileRef}
          onChange={handleImageChange}
        />
        <TextField
          {...register("AnnouncementTitle")}
          inputMode="text"
          required
          error={errors.AnnouncementTitle ? true : false}
          label="Enter announcement title"
          sx={{ width: "100%" }}
        />
        {errors.AnnouncementTitle && (
          <h4 style={{ color: "#d9534f" }}>
            {errors.AnnouncementTitle?.message}
          </h4>
        )}
        <TextField
          {...register("AnnouncementDescription")}
          inputMode="text"
          required
          error={errors.AnnouncementDescription ? true : false}
          rows={10}
          label="Enter announcement description"
          multiline={true}
          style={{ width: "100%" }}
        />
        {errors.AnnouncementDescription && (
          <h4 style={{ color: "#d9534f" }}>
            {errors.AnnouncementDescription?.message}
          </h4>
        )}
        <Button
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

export default CreateAnnouncementPage;
