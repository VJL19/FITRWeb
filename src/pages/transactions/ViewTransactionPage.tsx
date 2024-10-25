import { Container, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

const ViewTransactionPage = () => {
  const {
    ProfilePic,
    LastName,
    FirstName,
    MiddleName,
    SubscriptionAmount,
    ContactNumber,
    Email,
    SubscriptionType,
    SubscriptionBy,
    SubscriptionUploadedImage,
    SubscriptionEntryDate,
    SubscriptionMethod,
    SubscriptionStatus,
  } = useSelector((state: RootState) => state.transaction.transactionData);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/transactions", { replace: true });
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowBackIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="warning"
          size="medium"
          onClick={handleBack}
        >
          Back
        </Button>
        <h1>VIEW TRANSACTION PAGE</h1>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={SubscriptionUploadedImage}
        >
          <h3>Billing Details</h3>
        </a>
        <p>Paid By - {SubscriptionBy}</p>
        <p>Email - {Email}</p>
        <p>Contact Number - {ContactNumber}</p>

        <h3>Payment Details</h3>
        <p>Amount - {SubscriptionAmount} PHP </p>
        <p>Type - {SubscriptionType}</p>
        <p>Method - {SubscriptionMethod}</p>
        <p>Status - {SubscriptionStatus}</p>
      </Container>
    </div>
  );
};

export default ViewTransactionPage;
