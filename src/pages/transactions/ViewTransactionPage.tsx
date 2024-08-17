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
    SubscriptionType,
    SubscriptionBy,
    SubscriptionUploadedImage,
    SubscriptionEntryDate,
    SubscriptionMethod,
    SubscriptionStatus,
  } = useSelector((state: RootState) => state.transaction.transactionData);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard/transactions", { replace: true });
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
          <img src={SubscriptionUploadedImage} height={"100%"} />
        </a>
        <h4>Amount - {SubscriptionAmount} PHP </h4>
        <h4>Paid By - {SubscriptionBy}</h4>
        <h4>Type - {SubscriptionType}</h4>
        <h4>Method - {SubscriptionMethod}</h4>
        <h3>Status - {SubscriptionStatus}</h3>
      </Container>
    </div>
  );
};

export default ViewTransactionPage;
