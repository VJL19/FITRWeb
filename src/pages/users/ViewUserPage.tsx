import { Container, Button } from "@mui/material";
import React, { Profiler } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/store/store";
import ArrowBack from "@mui/icons-material/ArrowBack";

const ViewUserPage = () => {
  const {
    LastName,
    FirstName,
    MiddleName,
    Age,
    Gender,
    Birthday,
    Height,
    ProfilePic,
    Weight,
    ContactNumber,
    Email,
    Address,
    Username,
    SubscriptionType,
    Activation,
  } = useSelector((state: RootState) => state.user.userData);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/users", { replace: true });
  };
  console.log(Birthday);
  return (
    <Container maxWidth="sm">
      <Button
        startIcon={<ArrowBack fontSize="medium" htmlColor={"#f5f5f5"} />}
        variant="contained"
        color="warning"
        size="large"
        onClick={handleBack}
      >
        Back
      </Button>
      <h1>VIEW USER PAGE</h1>
      <img
        src={ProfilePic}
        height={250}
        width={"50%"}
        style={{ borderRadius: "50%", borderWidth: 10, borderColor: "blue" }}
      />
      <h2>Personal Information</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h3>LastName:</h3>
        <p>{LastName}</p>
        <h3>FirstName:</h3>
        <p>{FirstName}</p>
        <h3>MiddleName:</h3>
        <p>{MiddleName}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h3>Age:</h3>
        <p>{Age}</p>
        <h3>Gender:</h3>
        <p>{Gender}</p>
        <h3>Birthday:</h3>
        <p>{Birthday}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h3>Height:</h3>
        <p>{Height} cm</p>
        <h3>Weight:</h3>
        <p>{Weight} kg</p>
      </div>
      <h2>Contact Information</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <h3>Contact Number:</h3>
        <p>{ContactNumber}</p>
        <h3>Email:</h3>
        <p>{Email}</p>
        <h3>Address:</h3>
        <p>{Address}</p>
      </div>
      <h2>Account Information</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <h3>Username:</h3>
        <p>{Username}</p>
        <h3>Subscription Type:</h3>
        <p>{SubscriptionType}</p>
      </div>
    </Container>
  );
};

export default ViewUserPage;
