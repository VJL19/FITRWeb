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
import { ref, deleteObject } from "firebase/storage";
import { storage } from "src/global/firebaseConfig";
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
  const fileRef = useRef<HTMLInputElement | null | undefined>();

  const {
    AnnouncementTitle,
    AnnouncementDescription,
    AnnouncementID,
    AnnouncementImage,
  } = useSelector((state: RootState) => state.announcement.announcementData);

  const [imagePreview, setImagePreview] = useState<File | undefined>();
  const [isUserChangeImage, setIsUserChangeImage] = useState(false);

  const [editAnnouncement, { data, error, isLoading, status }] =
    useEditAnnouncementMutation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/announcements", { replace: true });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserChangeImage(true);
    setImagePreview(event?.target?.files?.[0]);
    console.log(event?.target?.files?.[0].name);
  };

  const toggleImageUpload = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    setImagePreview(AnnouncementImage);
  }, []);

  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate("/dashboard/announcements", { replace: true });
        setImagePreview(undefined);
        reset();
      };
      delayRedirect();
    }
    if (status === "rejected" && isSubmitted) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [status, data?.message]);

  const onSubmit = async (data: TannouncementSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let imageRef = ref(storage, AnnouncementImage);

    try {
      await deleteObject(imageRef);
      console.log("success");
    } catch (err) {
      console.log("there was an error in deleting an image");
    }
    const url = await uploadImage(
      imagePreview,
      "GymAnnouncements/",
      "image",
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

    editAnnouncement(arg);
    reset();
  };

  console.log("data announce status", status);
  console.log("data announce data", data?.message);

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
        <img
          onClick={toggleImageUpload}
          src={
            imagePreview === IMAGE_VALUES.DEFAULT_VALUE
              ? thumbnail
              : isUserChangeImage
              ? URL.createObjectURL(imagePreview)
              : imagePreview
          }
          height={400}
          style={{ cursor: "pointer" }}
          width={"100%"}
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
      <ToastContainer />
    </div>
  );
};

export default EditAnnouncementPage;
