import {
  Container,
  Button,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TannouncementSchema,
  announcementSchema,
} from "src/utils/validations/announcementSchema";
import getCurrentDate from "src/utils/functions/date_fns";
import {
  setPreviewAnnouncementData,
  useCreateAnnouncementMutation,
} from "src/reducers/announcement";
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
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { useRefetchOnMessage } from "src/hooks/useRefetchOnMessage";
import RichTextEditor from "src/components/RichTextEditor";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store/store";
import PreviewModal from "src/components/PreviewModal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { VIDEO_FORMATS } from "src/utils/constants/FILE_EXTENSIONS";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";

const CreateAnnouncementPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<TannouncementSchema>({
    resolver: zodResolver(announcementSchema),
  });

  const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { previewModalOpen } = useSelector((state: RootState) => state.modal);

  const [createAnnouncement, { data, error, isLoading, status }] =
    useCreateAnnouncementMutation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleBack = () => {
    navigate("/dashboard/announcements", { replace: true });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0] == undefined) {
      setImagePreview(undefined);
      return;
    }
    setImagePreview(event?.target?.files?.[0]);
    console.log(event?.target?.files?.[0].name);
  };

  const toggleImageUpload = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    videoRef?.current?.load();
  }, [imagePreview]);
  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      showSuccessToast(data?.message, "toast_announcement");
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate("/dashboard/announcements", { replace: true });
        setImagePreview(undefined);

        reset();
      };
      delayRedirect();
    }
    if (status === "rejected" && isSubmitted) {
      showFailedToast(data?.message, "toast_announcement");
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_announcement"
      );
    }
  }, [status, data?.message]);

  const onSubmit = async (data: TannouncementSchema) => {
    console.log("your md data", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let fileType = VIDEO_FORMATS.includes(
      imagePreview?.name?.split(".")[imagePreview?.name?.split(".").length - 1]!
    )
      ? "video"
      : "image";
    const url = await uploadImage(
      imagePreview,
      "GymAnnouncements/",
      fileType,
      loading,
      setLoading
    );
    // console.log("hey", url);

    const arg = {
      AnnouncementImage:
        url === IMAGE_VALUES.DEFAULT_VALUE ? IMAGE_VALUES.DEFAULT_VALUE : url,
      AnnouncementTitle: data?.AnnouncementTitle,
      AnnouncementDescription: data?.AnnouncementDescription,
      AnnouncementDate: getCurrentDate(),
    };

    createAnnouncement(arg);
  };

  console.log("data announce status", status);
  console.log("data announce data", data?.message);

  console.log("is loading", isLoading);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Container maxWidth="md">
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
        <h1>CREATE ANNOUNCEMENT</h1>
        <br />
        {VIDEO_FORMATS.includes(
          imagePreview?.name?.split(".")[
            imagePreview?.name?.split(".").length - 1
          ]!
        ) ? (
          <video
            ref={videoRef}
            width="100%"
            height={450}
            controls
            poster={thumbnail}
          >
            <source src={URL.createObjectURL(imagePreview)} />
          </video>
        ) : (
          <img
            defaultValue={IMAGE_VALUES.DEFAULT_VALUE}
            src={
              imagePreview === undefined
                ? thumbnail
                : URL.createObjectURL(imagePreview)
            }
            height={450}
            width={"100%"}
          />
        )}
        <br />

        <Button
          variant="contained"
          color="success"
          size="medium"
          startIcon={<FileUploadIcon fontSize="large" htmlColor="#f5f5f5" />}
          onClick={toggleImageUpload}
        >
          <input
            type="file"
            accept=".jpeg,.png, .mp4, .mov"
            hidden
            ref={fileRef}
            onChange={handleImageChange}
          />
          add image or video
        </Button>

        <h2>Title</h2>
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

        <h2>Description</h2>
        <Box component="div" sx={{ height: 350 }}>
          <Controller
            name="AnnouncementDescription"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field: { onChange, value, ...restField } }) => (
              <React.Fragment>
                <RichTextEditor
                  {...register("AnnouncementDescription")}
                  {...restField}
                  value={value}
                  setValue={onChange}
                  style={{ height: "100%" }}
                />
                {/* <MDEditor.Markdown
                  source={value}
                  style={{ whiteSpace: "pre-wrap" }}
                /> */}
              </React.Fragment>
            )}
          />
        </Box>

        {/* <TextField
          {...register("AnnouncementDescription")}
          inputMode="text"
          required
          error={errors.AnnouncementDescription ? true : false}
          rows={10}
          label="Enter announcement description"
          multiline={true}
          style={{ width: "100%" }}
        /> */}
        <br />
        {errors.AnnouncementDescription && (
          <h4 style={{ color: "#d9534f" }}>
            {errors.AnnouncementDescription?.message}
          </h4>
        )}

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
      </Container>

      <PreviewModal open={previewModalOpen} title="Preview announcement" />

      <ToastContainer containerId={"toast_announcement"} />
    </div>
  );
};

export default CreateAnnouncementPage;
