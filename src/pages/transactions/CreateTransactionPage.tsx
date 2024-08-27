import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import DisplayFormError from "src/components/DisplayFormError";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "src/components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  TCreateSubscriptionSchema,
  createSubscriptionSchema,
} from "src/utils/validations/subscriptionSchema";
import { useCreateSubscriptionMutation } from "src/reducers/transaction";
import getCurrentDate from "src/utils/functions/date_fns";
const CreateTransactionPage = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<TCreateSubscriptionSchema>({
    resolver: zodResolver(createSubscriptionSchema),
  });

  const dispatch: AppDispatch = useDispatch();

  const [createSubscription, { data, isLoading, error, status }] =
    useCreateSubscriptionMutation();
  const navigate = useNavigate();

  const subscriptionType = watch("SubscriptionType");
  useEffect(() => {
    if (subscriptionType === "Session") {
      setValue("SubscriptionAmount", "90");
    } else {
      setValue("SubscriptionAmount", "900");
    }
  }, [subscriptionType]);
  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showSuccessToast(data?.message);
      };
      const deplayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/dashboard/transactions", { replace: true });
      };
      deplayShowToast();
      deplayRedirect();
    }
    if (status === "rejected" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showFailedToast(error?.data?.message || error?.data?.error);
      };
      deplayShowToast();
    }
  }, [status]);
  const onSubmit = async (data: TCreateSubscriptionSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const {
      SubscriptionMethod,
      SubscriptionBy,
      SubscriptionAmount,
      SubscriptionType,
    } = data;
    const arg = {
      SubscriptionType,
      SubscriptionBy,
      SubscriptionAmount,
      SubscriptionMethod,
    };
    createSubscription(arg);
  };
  console.log("admin reg user", data);
  console.log("admin reg status", status);
  console.log("admin reg error", error);

  const handleBack = () => {
    navigate("/dashboard/transactions", { replace: true });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <div>
      <React.Fragment>
        <Container maxWidth="md">
          <Button
            startIcon={<ArrowBack fontSize="medium" htmlColor={"#f5f5f5"} />}
            variant="contained"
            color="warning"
            size="large"
            onClick={handleBack}
          >
            Back
          </Button>
          <h1>CREATE TRANSACTION</h1>

          <Stack width={"100%"}>
            <Stack width={"100%"}>
              <TextField
                {...register("SubscriptionBy")}
                inputMode="text"
                required
                placeholder="Enter the name who pay the subscription"
                error={errors.SubscriptionBy ? true : false}
                sx={{ width: "100%" }}
              />
              <DisplayFormError errors={errors.SubscriptionBy} />
            </Stack>
            <br />
            <Controller
              name="SubscriptionType"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Subscription Type
                  </InputLabel>

                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="SubscriptionType"
                    placeholder="SubscriptionType"
                    required
                    error={errors.SubscriptionType && true}
                  >
                    <MenuItem value="Session">Session</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <DisplayFormError errors={errors.SubscriptionType} />
          </Stack>
          <br />
          <Stack direction={"row"}>
            <Stack width={"100%"}>
              <TextField
                {...register("SubscriptionAmount")}
                inputProps={{ type: "number" }}
                inputMode="text"
                required
                disabled
                error={errors.SubscriptionAmount ? true : false}
                sx={{ width: "100%" }}
              />
              <DisplayFormError errors={errors.SubscriptionAmount} />
            </Stack>
          </Stack>
          <br />
          <Stack direction={"row"}>
            <Stack width={"100%"}>
              <Controller
                name="SubscriptionMethod"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Subscription Method
                    </InputLabel>
                    <Select
                      {...field}
                      id="demo-simple-select-label"
                      label="SubscriptionMethod"
                      placeholder="SubscriptionMethod"
                      required
                      error={errors.SubscriptionMethod && true}
                    >
                      <MenuItem value="GCash">GCash</MenuItem>
                      <MenuItem value="Paymaya">Paymaya</MenuItem>
                      <MenuItem value="CreditCard">CreditCard</MenuItem>
                      <MenuItem value="Cash">Cash</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <DisplayFormError errors={errors.SubscriptionMethod} />
            </Stack>
          </Stack>
          <br />

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
        </Container>
        <ToastContainer />
      </React.Fragment>
    </div>
  );
};

export default CreateTransactionPage;
