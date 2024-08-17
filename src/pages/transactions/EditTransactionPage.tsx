import {
  Container,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import DisplayFormError from "src/components/DisplayFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TSubscriptionSchema,
  subscriptionSchema,
} from "src/utils/validations/subscriptionSchema";
import SendIcon from "@mui/icons-material/Send";
import { useFulfillUserTransactionMutation } from "src/reducers/transaction";
import LoadingIndicator from "src/components/LoadingIndicator";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { ToastContainer } from "react-toastify";

const EditTransactionPage = () => {
  const {
    ProfilePic,
    LastName,
    SubscriptionBy,
    FirstName,
    MiddleName,
    SubscriptionID,
    SubscriptionAmount,
    SubscriptionType,
    SubscriptionUploadedImage,
    SubscriptionEntryDate,
    SubscriptionMethod,
    SubscriptionStatus,
  } = useSelector((state: RootState) => state.transaction.transactionData);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<TSubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
  });

  const [fulfillTransaction, { data, error, status, isLoading }] =
    useFulfillUserTransactionMutation();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard/transactions", { replace: true });
  };

  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showSuccessToast("Successfully fulfilled this transaction");
      };
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/dashboard/transactions", { replace: true });
      };
      deplayShowToast();
      delayRedirect();
    }
    if (status === "rejected" && isSubmitted) {
      showFailedToast("Something went wrong");
    }
  }, [data?.message, status]);

  const onSubmit = async (data: TSubscriptionSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    fulfillTransaction({
      SubscriptionID: SubscriptionID,
      SubscriptionStatus: data.SubscriptionStatus,
    });
  };

  console.log("fulfill sub", data);
  console.log("fulfill sub status", status);

  if (isLoading) {
    return <LoadingIndicator />;
  }
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
        <h1>EDIT TRANSACTION PAGE</h1>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={SubscriptionUploadedImage}
        >
          <img src={SubscriptionUploadedImage} height={500} />
        </a>

        <h4>Amount - {SubscriptionAmount} PHP </h4>
        <h4>Paid By - {SubscriptionBy}</h4>
        <h4>Type - {SubscriptionType}</h4>
        <h4>Method - {SubscriptionMethod}</h4>
        <h3>Status - {SubscriptionStatus}</h3>
        {SubscriptionStatus !== "Fulfill" && (
          <Stack width={"100%"}>
            <Controller
              name="SubscriptionStatus"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Subscription Status
                  </InputLabel>
                  <Select
                    {...field}
                    id="demo-simple-select-label"
                    label="SubscriptionStatus"
                    placeholder="Subscription Status"
                    required
                    error={errors.SubscriptionStatus && true}
                  >
                    <MenuItem value="Reject">Reject</MenuItem>
                    <MenuItem value="Fulfill">Fulfill</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <DisplayFormError errors={errors.SubscriptionStatus} />

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
          </Stack>
        )}
        <ToastContainer />
      </Container>
    </div>
  );
};

export default EditTransactionPage;
