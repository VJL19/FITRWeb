import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TAdminSchema,
  TUserSchema,
  adminSchema,
  userSchema,
} from "src/utils/validations/userSchema";
import SendIcon from "@mui/icons-material/Send";
import DisplayFormError from "src/components/DisplayFormError";
import {
  useAdminChangeAccountMutation,
  useRegisterUserMutation,
} from "src/reducers/users";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import { useUserOnline } from "src/hooks/useUserOnline";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import {
  useGetAccessWebTokenQuery,
  useLoginUserMutation,
} from "src/reducers/login";
import { IMAGE_VALUES } from "src/utils/enums/IMAGE_VALUES";
import thumbnail from "src/assets/thumbnail_no_img.jpg";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { uploadImage } from "src/utils/functions/uploadImage";
import LoadingIndicator from "src/components/LoadingIndicator";

const ChangeAccountPage = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    reset,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<TAdminSchema>({ resolver: zodResolver(adminSchema) });

  const [changeAccount, { data, status, error }] =
    useAdminChangeAccountMutation();

  const [
    loginUserr,
    { data: loginData, status: loginStat, isLoading, error: loginErr },
  ] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const { data: tokenData } = useGetAccessWebTokenQuery();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { isOnline } = useUserOnline();
  const navigate = useNavigate();

  useEffect(() => {
    setValue("UserID", tokenData?.user?.UserID!);
  }, []);

  useEffect(() => {
    if (loginStat === "fulfilled") {
      window.location.reload();
      navigate("/dashboard", { replace: true });
    }
    if (loginStat === "rejected") {
      delayShowToast(
        "failed",
        loginErr?.data?.details || loginErr?.data?.error,
        "toast_changeacc"
      );
    }
    if (loginErr?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_changeacc"
      );
    }
    if (loginErr?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_changeacc"
      );
    }
  }, [loginStat]);
  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showSuccessToast(data?.message, "toast_changeacc");

        loginUserr({
          Username: getValues("Username"),
          Password: getValues("Password"),
        });
      };
      reset();
      deplayShowToast();
    }
    if (status === "rejected" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showFailedToast(
          error?.data?.message || error?.data?.error,
          "toast_changeacc"
        );
      };
      deplayShowToast();
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_changeacc"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_changeacc"
      );
    }
    if (error?.status === HTTP_ERROR.UNAUTHORIZED) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_changeacc"
      );
    }
  }, [status]);

  const onSubmit = async (data: TAdminSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const url = await uploadImage(
      imagePreview,
      "ProfilePics/",
      "image",
      loading,
      setLoading
    );
    const arg = {
      UserID: tokenData?.user?.UserID!,
      ProfilePic:
        url === IMAGE_VALUES.DEFAULT_VALUE ? IMAGE_VALUES.DEFAULT_VALUE : url,
      Username: data.Username,
      Email: data.Email,
      ContactNumber: data.ContactNumber,
      Password: data.Password,
      RFIDNumber: data.RFIDNumber,
      ConfirmPassword: data.ConfirmPassword,
    };
    changeAccount(arg);
    console.log("admin reg user", data);
    console.log("admin reg status", status);
    console.log("admin reg error", error);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0] == undefined) {
      setImagePreview(undefined);
      return;
    }
    setImagePreview(event?.target?.files?.[0]);
    console.log(event?.target?.files?.[0].name);
  };

  const toggleImageUpload = () => {
    fileRef.current?.click();
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Container maxWidth="md">
        <h1>CHANGE ACCOUNT</h1>

        <Avatar
          src={
            imagePreview === undefined
              ? thumbnail
              : URL.createObjectURL(imagePreview)
          }
          sx={{ height: 250, width: 250 }}
        />
        <br />

        <Button
          variant="contained"
          color="success"
          size="medium"
          startIcon={<FileUploadIcon fontSize="large" htmlColor="#f5f5f5" />}
          onClick={toggleImageUpload}
        >
          <input
            type="file"
            accept=".jpeg,.png"
            hidden
            ref={fileRef}
            onChange={handleImageChange}
          />
          Profile Pic
        </Button>
        <h3>Personal Information</h3>

        <Stack direction={"row"}>
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
              {...register("RFIDNumber")}
              inputProps={{ type: "number" }}
              required
              error={errors.ContactNumber && true}
              label="Enter your spare rfid card number"
              sx={{ width: "100%" }}
            />
            <DisplayFormError errors={errors.RFIDNumber} />
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
      <ToastContainer containerId={"toast_changeacc"} />
    </div>
  );
};

export default ChangeAccountPage;
