import { Container, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewRecordPage = () => {
  const { RecordDownloadLink, RecordName } = useSelector(
    (state: RootState) => state.record.recordData
  );

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/records", { replace: true });
  };
  console.log(RecordName.split(".")[1]);
  if (RecordName.split(".")[1] === "xlsx") {
    return (
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
        <h1>VIEW EXCEL RECORD</h1>
        <iframe
          src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(
            RecordDownloadLink
          )}`}
          style={{ height: "100vh", width: "100%" }}
          frameBorder="0"
        ></iframe>
      </Container>
    );
  }
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
        <h1>VIEW PDF RECORD</h1>
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
