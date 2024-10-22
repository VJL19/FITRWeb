import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TUserSchema, userSchema } from "src/utils/validations/userSchema";
import SendIcon from "@mui/icons-material/Send";
import DisplayFormError from "src/components/DisplayFormError";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  useRegisterUserMutation,
  useUpdateUserMutation,
} from "src/reducers/users";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "src/components/LoadingIndicator";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useUserOnline } from "src/hooks/useUserOnline";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
const EditUserPage = () => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<TUserSchema>({ resolver: zodResolver(userSchema) });

  const {
    UserID,
    LastName,
    FirstName,
    MiddleName,
    Age,
    ContactNumber,
    Email,
    Birthday,
    Gender,
    SubscriptionType,
    Password,
    ConfirmPassword,
    Address,
    Username,
    Height,
    Weight,
    RFIDNumber,
  } = useSelector((state: RootState) => state.user.userData);

  const [updateUser, { data, status, isLoading, error }] =
    useUpdateUserMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const { isOnline } = useUserOnline();

  useEffect(() => {
    setValue("LastName", LastName);
    setValue("FirstName", FirstName);
    setValue("MiddleName", MiddleName);
    setValue("Age", Age.toString());
    setValue("Gender", Gender);
    setValue("Height", Height.toString());
    setValue("Weight", Weight.toString());
    setValue("ContactNumber", ContactNumber);
    setValue("Email", Email);
    setValue("Address", Address);
    setValue("Username", Username);
    setValue("Password", Password);
    setValue("ConfirmPassword", ConfirmPassword);
    setValue("SubscriptionType", SubscriptionType);
    setValue("RFIDNumber", RFIDNumber);
  }, []);

  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showSuccessToast(data?.message, "toast_user");
        navigate("/dashboard/users", { replace: true });
      };
      deplayShowToast();
    }
    if (status === "rejected" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showFailedToast(
          error?.data?.message || error?.data?.error,
          "toast_user"
        );
      };
      deplayShowToast();
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_user"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_user"
      );
    }
    if (error?.status === HTTP_ERROR.UNAUTHORIZED) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_user"
      );
    }
  }, [status]);

  const onSubmit = async (data: TUserSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const arg = {
      UserID: UserID,
      SubscriptionType: data.SubscriptionType,
      RFIDNumber: data.RFIDNumber,
    };
    updateUser(arg);
  };

  const handleBack = () => {
    navigate("/dashboard/users", { replace: true });
  };

  console.log("edit user", data);
  console.log("edit error", error);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <div>
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
        <h1>EDIT USER</h1>

        <h3>Personal Information</h3>
        <Stack direction={"row"}>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("LastName")}
              inputMode="text"
              required
              defaultValue={LastName}
              error={errors.LastName ? true : false}
              label="Enter last name"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.LastName} />
          </Stack>

          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("FirstName")}
              inputMode="text"
              required
              defaultValue={FirstName}
              error={errors.FirstName ? true : false}
              label="Enter first name"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.FirstName} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("MiddleName")}
              inputMode="text"
              required
              defaultValue={MiddleName}
              error={errors.MiddleName ? true : false}
              label="Enter middle name"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.MiddleName} />
          </Stack>
        </Stack>
        <br />
        <Stack direction={"row"}>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("Age")}
              inputProps={{ type: "number" }}
              required
              defaultValue={Age}
              error={errors.Age ? true : false}
              label="Enter age"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Age} />
          </Stack>
          <Stack width={"100%"}>
            <Controller
              name="Gender"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    {...field}
                    id="demo-simple-select-label"
                    label="Gender"
                    disabled
                    defaultValue={Gender}
                    placeholder="Gender"
                    required
                    error={errors.Gender && true}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <DisplayFormError errors={errors.Gender} />
          </Stack>
          <Stack width={"100%"}>
            <Controller
              name="Birthday"
              control={control}
              defaultValue={Birthday}
              rules={{ required: true }}
              render={({ field: { onChange, value, ...restField } }) => (
                <DatePicker
                  {...restField}
                  disabled
                  value={dayjs(Birthday)}
                  label="Date of Birth"
                  onChange={(newDateValue) => {
                    onChange(dayjs(newDateValue).format("ddd MMM DD YYYY"));
                  }}
                />
              )}
            />
            <DisplayFormError errors={errors.Birthday} />
          </Stack>
        </Stack>
        <br />
        <Stack direction={"row"}>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("Height")}
              inputProps={{ type: "number" }}
              required
              defaultValue={Height}
              error={errors.Height ? true : false}
              label="Enter height in cm"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Height} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("Weight")}
              inputProps={{ type: "number" }}
              required
              defaultValue={Weight}
              error={errors.Weight ? true : false}
              label="Enter weight in kg"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Weight} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              {...register("RFIDNumber")}
              inputMode="text"
              defaultValue={RFIDNumber}
              error={errors.RFIDNumber ? true : false}
              label="Enter RFID number"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.RFIDNumber} />
          </Stack>
        </Stack>
        <h3>Contact Information</h3>
        <Stack direction={"row"}>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("ContactNumber")}
              inputProps={{ type: "number" }}
              required
              defaultValue={ContactNumber}
              error={errors.ContactNumber && true}
              label="Enter contact number"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.ContactNumber} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("Email")}
              required
              defaultValue={Email}
              error={errors.Email ? true : false}
              label="Enter email"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Email} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("Address")}
              required
              defaultValue={Address}
              error={errors.Address ? true : false}
              label="Enter address"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Address} />
          </Stack>
        </Stack>
        <h3>Account Setup</h3>
        <Stack direction={"row"}>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("Username")}
              required
              defaultValue={Username}
              error={errors.Username && true}
              label="Enter username"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Username} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("Password")}
              required
              defaultValue={Password}
              inputProps={{ type: showPassword ? "text" : "password" }}
              error={errors.Password ? true : false}
              label="Enter password"
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <VisibilityIcon
                        htmlColor="#202020"
                        fontSize="medium"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        htmlColor="#202020"
                        fontSize="medium"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <DisplayFormError errors={errors.Password} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              disabled
              {...register("ConfirmPassword")}
              required
              defaultValue={ConfirmPassword}
              inputProps={{ type: showConfirmPassword ? "text" : "password" }}
              error={errors.ConfirmPassword ? true : false}
              label="Enter confirm password"
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showConfirmPassword ? (
                      <VisibilityIcon
                        htmlColor="#202020"
                        fontSize="medium"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        htmlColor="#202020"
                        fontSize="medium"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <DisplayFormError errors={errors.ConfirmPassword} />
          </Stack>
        </Stack>
        <Stack direction={"row"}>
          <Stack width={"100%"}>
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
                    defaultValue={SubscriptionType}
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
        </Stack>

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
      <ToastContainer containerId={"toast_user"} />
    </div>
  );
};

export default EditUserPage;
