import { Container, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

const ViewAttendanceRecordPage = () => {
  const {
    ProfilePic,
    LastName,
    FirstName,
    TimeIn,
    TimeOut,
    DateTapped,
    SubscriptionType,
  } = useSelector(
    (state: RootState) => state.attendance.attendanceSelectedData
  );

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/attendance", { replace: true });
  };
  return (
    <div>
      <Container maxWidth="sm">
        <br />
        <Button
          startIcon={<ArrowBackIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="warning"
          size="medium"
          onClick={handleBack}
        >
          Back
        </Button>
        <h1>VIEW USER ATTENDANCE PAGE</h1>
        <h3>Personal Details</h3>

        <p>LastName - {LastName}</p>
        <p>FirstName - {FirstName}</p>
        <p>SubscriptionType - {SubscriptionType}</p>
        <h3>Attendance Details</h3>

        <p>TimeIn - {TimeIn}</p>
        <p>TimeOut - {TimeOut}</p>
        <p>DateTapped - {new Date(DateTapped).toDateString()}</p>
      </Container>
    </div>
  );
};

export default ViewAttendanceRecordPage;
