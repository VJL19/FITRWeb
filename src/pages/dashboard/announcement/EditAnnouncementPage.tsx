import { Container, Button, TextField, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TannouncementSchema,
  announcementSchema,
} from "src/utils/validations/announcementSchema";
import getCurrentDate from "src/utils/functions/date_fns";
import { useEditAnnouncementMutation } from "src/reducers/announcement";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import thumbnail from "src/assets/thumbnail_no_img.jpg";
import "react-toastify/dist/ReactToastify.css";
import { uploadImage } from "src/utils/functions/uploadImage";
import LoadingIndicator from "src/components/LoadingIndicator";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { IMAGE_VALUES } from "src/utils/enums/IMAGE_VALUES";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import RichTextEditor from "src/components/RichTextEditor";
import { storage } from "src/global/firebaseConfig";
import {
  FIREBASE_VIDEO_FORMATS,
  VIDEO_FORMATS,
} from "src/utils/constants/FILE_EXTENSIONS";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import {
  deleteFirebaseObject,
  firebaseRef,
  getFirebaseMetadata,
} from "src/utils/functions/firebase";
import { useUserOnline } from "src/hooks/useUserOnline";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";

const EditAnnouncementPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<TannouncementSchema>({
    resolver: zodResolver(announcementSchema),
  });

  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null | undefined>(undefined);

  const { isOnline } = useUserOnline();
  const {
    AnnouncementTitle,
    AnnouncementDescription,
    AnnouncementID,
    AnnouncementImage,
  } = useSelector((state: RootState) => state.announcement.announcementData);

  const [imagePreview, setImagePreview] = useState<File | undefined>();
  const [isUserChangeImage, setIsUserChangeImage] = useState(false);
  const [metadata, setMetadata] = useState<string | undefined>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [editAnnouncement, { data, error, isLoading, status }] =
    useEditAnnouncementMutation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/announcements", { replace: true });
  };

  useEffect(() => {
    videoRef?.current?.load();
  }, [imagePreview]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0] == undefined) {
      setImagePreview(undefined);
      return;
    }
    setIsUserChangeImage(true);
    setImagePreview(event?.target?.files?.[0]);
    setMetadata("");
    console.log(event?.target?.files?.[0].name);
  };

  const mediaRef = firebaseRef(storage, AnnouncementImage);
  const toggleImageUpload = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    if (AnnouncementImage.split(".")[0] === "default_poster") {
      return;
    }
    getFirebaseMetadata(mediaRef)
      .then((metaData) => {
        setMetadata(metaData?.contentType);
      })
      .catch((err) => {
        throw new Error(err);
      });
    setImagePreview(AnnouncementImage);
  }, []);

  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      showSuccessToast(data?.message, "toast_announcement");

      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        handleBack();
        setImagePreview(undefined);
        reset();
      };
      delayRedirect();
    }
    if (status === "rejected" && error?.status !== NETWORK_ERROR.FETCH_ERROR) {
      showFailedToast("Something went wrong!", "toast_announcement");
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_announcement"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_announcement"
      );
    }
    if (
      error?.status === HTTP_ERROR.UNAUTHORIZED ||
      error?.status === HTTP_ERROR.BAD_REQUEST
    ) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_announcement"
      );
    }
  }, [status, data?.message]);

  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      try {
        if (!isUserChangeImage) {
          return;
        }
        let imageRef = firebaseRef(storage, AnnouncementImage);

        const deleteImage = async () => {
          await deleteFirebaseObject(imageRef);
          console.log("success deleting an image");
        };
        deleteImage();
      } catch (err) {
        console.log("there was an error in deleting an image", err);
      }
    }
  }, [status, data?.message]);

  const onSubmit = async (data: TannouncementSchema) => {
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

    const arg = {
      AnnouncementID: AnnouncementID,
      AnnouncementImage: isUserChangeImage
        ? url
        : url === IMAGE_VALUES.DEFAULT_VALUE
        ? IMAGE_VALUES.DEFAULT_VALUE
        : AnnouncementImage,
      AnnouncementTitle: data?.AnnouncementTitle,
      AnnouncementDescription: data?.AnnouncementDescription,
      AnnouncementDate: getCurrentDate(),
    };

    if (!isUserChangeImage) {
      editAnnouncement(arg);
      return;
    }

    editAnnouncement(arg);
  };

  console.log("data announce err", error);
  console.log("data announce status", status);
  console.log("data announce data", data?.message);

  console.log(
    imagePreview?.name?.split(".")[imagePreview?.name?.split(".").length - 1]!
  );

  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <div style={{ padding: 15 }}>
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
        <h1>EDIT ANNOUNCEMENT</h1>
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
        ) : FIREBASE_VIDEO_FORMATS.includes(metadata) ? (
          <video width="100%" height={450} controls poster={thumbnail}>
            <source src={AnnouncementImage} />
          </video>
        ) : (
          <img
            onClick={toggleImageUpload}
            src={
              imagePreview === undefined
                ? thumbnail
                : isUserChangeImage
                ? URL.createObjectURL(imagePreview)
                : imagePreview
            }
            height={400}
            style={{ cursor: "pointer" }}
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
        <br />

        <h2>Title</h2>

        <TextField
          {...register("AnnouncementTitle")}
          inputMode="text"
          required
          defaultValue={AnnouncementTitle}
          error={errors.AnnouncementTitle ? true : false}
          label="Enter announcement title"
          style={{ width: "100%" }}
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
            defaultValue={AnnouncementDescription}
            rules={{ required: "Description is required" }}
            render={({ field: { onChange, value, ...restField } }) => (
              <React.Fragment>
                <RichTextEditor
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
          size="medium"
          onClick={handleSubmit(onSubmit, (err) => console.log(err))}
          sx={{ width: "100%" }}
        >
          Submit
        </Button>
      </Container>
      <ToastContainer containerId={"toast_announcement"} />
    </div>
  );
};

export default EditAnnouncementPage;
