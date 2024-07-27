import { Container, Button, TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TannouncementSchema,
  announcementSchema,
} from "src/utils/validations/announcementSchema";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import thumbnail from "src/assets/thumbnail_no_img.jpg";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewAnnouncementPage = () => {
  const {
    AnnouncementTitle,
    AnnouncementDescription,
    AnnouncementID,
    AnnouncementImage,
  } = useSelector((state: RootState) => state.announcement.announcementData);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<TannouncementSchema>({
    resolver: zodResolver(announcementSchema),
  });

  useEffect(() => {
    setValue("AnnouncementTitle", AnnouncementTitle);
    setValue("AnnouncementDescription", AnnouncementDescription);
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/announcements", { replace: true });
  };

  return (
    <div style={{ padding: 15 }}>
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowBackIcon fontSize="large" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="warning"
          size="medium"
          onClick={handleBack}
        >
          Back
        </Button>
        <h1>VIEW ANNOUNCEMENT</h1>
        <br />
        <a target="_blank" href={AnnouncementImage}>
          <img
            src={
              AnnouncementImage === "default_poster.png"
                ? thumbnail
                : AnnouncementImage
            }
            height={400}
            style={{ cursor: "pointer" }}
          />
        </a>

        <h2>{AnnouncementTitle}</h2>
        <p>{AnnouncementDescription}</p>
      </Container>
    </div>
  );
};

export default ViewAnnouncementPage;
