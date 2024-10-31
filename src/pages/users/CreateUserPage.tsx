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
  setOTPToken,
  setUserData,
  useRegisterUserMutation,
  useSendEmailMutation,
} from "src/reducers/users";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "src/components/LoadingIndicator";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useUserOnline } from "src/hooks/useUserOnline";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RFID_STATUS from "src/utils/enums/RFID_CARD";
const CreateUserPage = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    reset,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<TUserSchema>({ resolver: zodResolver(userSchema) });

  const [registerUser, { data, status, error }] = useRegisterUserMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [
    sendOTPEmail,
    { data: emailCode, status: emailStat, isLoading, error: emailErr },
  ] = useSendEmailMutation();
  const dispatch: AppDispatch = useDispatch();

  const { isOnline } = useUserOnline();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showSuccessToast(data?.message, "toast_user");
      };
      sendOTPEmail({ Email: getValues("Email") });
      reset();
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

  useEffect(() => {
    if (emailStat === "fulfilled") {
      dispatch(setOTPToken(emailCode?.code));

      navigate("/users/create_user/confirmation_email", {
        replace: true,
      });
    }
  }, [emailStat]);
  const onSubmit = async (data: TUserSchema) => {
    setValue("ProfilePic", "default_poster.png");

    await new Promise((resolve) => setTimeout(resolve, 1500));
    const arg: TUserSchema = {
      LastName: data.LastName,
      FirstName: data.FirstName,
      MiddleName: data.MiddleName,
      Age: data.Age,
      Gender: data.Gender,
      ContactNumber: data.ContactNumber,
      Birthday: data.Birthday,
      Email: data.Email,
      Address: data.Address,
      Height: data.Height,
      Weight: data.Weight,
      IsRFIDActive: data.IsRFIDActive
        ? RFID_STATUS.RFID_ACTIVE
        : RFID_STATUS.RFID_NOT_ACTIVE,
      RFIDNumber: data.RFIDNumber === "" ? null : data.RFIDNumber,
      Username: data.Username,
      Password: data.Password,
      ConfirmPassword: data.ConfirmPassword,
      SubscriptionType: data.SubscriptionType,
    };
    registerUser(arg);
    dispatch(setUserData(data));
    console.log("admin reg user", data);
    console.log("admin reg status", status);
    console.log("admin reg error", error);
  };

  const handleBack = () => {
    navigate("/users", { replace: true });
  };

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
        <h1>CREATE USER</h1>

        <h3>Personal Information</h3>
        <Stack direction={"row"}>
          <Stack width={"100%"}>
            <TextField
              {...register("LastName")}
              inputMode="text"
              required
              error={errors.LastName ? true : false}
              label="Enter last name"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.LastName} />
          </Stack>

          <Stack width={"100%"}>
            <TextField
              {...register("FirstName")}
              inputMode="text"
              required
              error={errors.FirstName ? true : false}
              label="Enter first name"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.FirstName} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              {...register("MiddleName")}
              inputMode="text"
              required
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
              {...register("Age")}
              inputProps={{ type: "number" }}
              required
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
              defaultValue={undefined}
              rules={{ required: true }}
              render={({ field: { onChange, value, ...restField } }) => (
                <DatePicker
                  {...restField}
                  value={dayjs(value)}
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
              {...register("Height")}
              inputProps={{ type: "number" }}
              required
              error={errors.Height ? true : false}
              label="Enter height in cm"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Height} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              {...register("Weight")}
              inputProps={{ type: "number" }}
              required
              error={errors.Weight ? true : false}
              label="Enter weight in kg"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Weight} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              {...register("RFIDNumber")}
              inputProps={{ type: "number" }}
              error={errors.RFIDNumber ? true : false}
              label="Enter RFID number"
              sx={{ width: "100%" }}
            />
            <FormControlLabel
              control={
                <Checkbox {...register("IsRFIDActive")} defaultChecked />
              }
              label="RFID Active?"
            />
            <DisplayFormError errors={errors.IsRFIDActive} />
            <DisplayFormError errors={errors.RFIDNumber} />
          </Stack>
        </Stack>
        <h3>Contact Information</h3>
        <Stack direction={"row"}>
          <Stack width={"100%"}>
            <TextField
              {...register("ContactNumber")}
              inputProps={{ type: "number" }}
              required
              error={errors.ContactNumber && true}
              label="Enter contact number"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.ContactNumber} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              {...register("Email")}
              required
              error={errors.Email ? true : false}
              label="Enter email"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Email} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              {...register("Address")}
              required
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
              {...register("Username")}
              required
              error={errors.Username && true}
              label="Enter username"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.Username} />
          </Stack>
          <Stack width={"100%"}>
            <TextField
              {...register("Password")}
              required
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
              {...register("ConfirmPassword")}
              required
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

export default CreateUserPage;
