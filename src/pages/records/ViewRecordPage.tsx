import { Container, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewRecordPage = () => {
  const { RecordDownloadLink } = useSelector(
    (state: RootState) => state.record.recordData
  );

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard/records", { replace: true });
  };
  return (
    <div>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon fontSize="large" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="warning"
          size="medium"
          onClick={handleBack}
        >
          Back
        </Button>
        <h1>VIEW RECORD</h1>
        <iframe
          src={RecordDownloadLink}
          style={{ height: "100vh", width: "100%" }}
          frameBorder="0"
        ></iframe>
      </Container>
    </div>
  );
};

export default ViewRecordPage;
