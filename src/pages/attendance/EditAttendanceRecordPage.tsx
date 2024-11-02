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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store/store";
import ArrowBack from "@mui/icons-material/ArrowBack";
import getCurrentDate from "src/utils/functions/date_fns";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import { useUserOnline } from "src/hooks/useUserOnline";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import {
  TEditAttendanceSchema,
  editAttendanceSchema,
} from "src/utils/validations/attendanceSchema";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import {
  useCreateUserRecordMutation,
  useUpdateUserRecordMutation,
} from "src/reducers/attendance";

const EditAttendanceRecordPage = () => {
  const {
    handleSubmit,
    getValues,
    register,
    control,
    setValue,
    watch,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<TEditAttendanceSchema>({
    resolver: zodResolver(editAttendanceSchema),
  });

  const dispatch: AppDispatch = useDispatch();

  const {
    AttendanceID,
    LastName,
    FirstName,
    SubscriptionType,
    TimeIn,
    TimeOut,
  } = useSelector(
    (state: RootState) => state.attendance.attendanceSelectedData
  );
  const [editUserRecordAttendance, { data, isLoading, error, status }] =
    useUpdateUserRecordMutation();
  const navigate = useNavigate();

  const { isOnline } = useUserOnline();

  useEffect(() => {
    if (status === "fulfilled" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showSuccessToast(data?.message, "toast_attendance");
      };
      const deplayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        handleBack();
      };
      deplayShowToast();
      deplayRedirect();
    }
    if (status === "rejected" && isSubmitted) {
      const deplayShowToast = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showFailedToast(
          error?.data?.message || error?.data?.error,
          "toast_attendance"
        );
      };
      deplayShowToast();
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_attendance"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_attendance"
      );
    }
    if (
      error?.status === HTTP_ERROR.UNAUTHORIZED ||
      error?.status === HTTP_ERROR.BAD_REQUEST
    ) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_attendance"
      );
    }
  }, [status]);

  const handleTimeInChange = (
    newDateValue: dayjs.Dayjs | null,
    onChange: (...event: any[]) => void
  ) => {
    onChange(newDateValue);
  };
  const handleTimeOutChange = (
    newDateValue: dayjs.Dayjs | null,
    onChange: (...event: any[]) => void
  ) => {
    onChange(newDateValue);
  };

  const onSubmit = async (data: TEditAttendanceSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("attendacnce edit record", data);

    const arg = {
      AttendanceID: AttendanceID,
      LastName: LastName,
      FirstName: FirstName,
      SubscriptionType: SubscriptionType,
      TimeIn: dayjs(data.TimeIn.$d).format("hh:mm A"),
      TimeOut: dayjs(data.TimeOut.$d).format("hh:mm A"),
    };
    editUserRecordAttendance(arg);
  };
  console.log("admin reg user", data);
  console.log("admin reg status", status);
  console.log("admin reg error", error);

  const handleBack = () => {
    navigate("/attendance", { replace: true });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const getTimeInHours = TimeIn.slice(0, 2);
  const getTimeInMinutes = TimeIn.slice(3, 5);
  const getTimeOutHours = TimeOut.slice(0, 2);
  const getTimeOutMinutes = TimeOut.slice(3, 5);
  const defaultTimeIn = new Date();
  const defaultTimeOut = new Date();
  defaultTimeIn.setHours(getTimeInHours);
  defaultTimeIn.setMinutes(getTimeInMinutes);
  defaultTimeOut.setHours(getTimeOutHours);
  defaultTimeOut.setMinutes(getTimeOutMinutes);

  return (
    <div>
      <React.Fragment>
        <Container maxWidth="md">
          <br />
          <Button
            startIcon={<ArrowBack fontSize="medium" htmlColor={"#f5f5f5"} />}
            variant="contained"
            color="warning"
            size="large"
            onClick={handleBack}
          >
            Back
          </Button>
          <h1>EDIT ATTENDANCE RECORD</h1>

          <Stack width={"100%"}>
            <Stack width={"100%"}>
              <p>LastName - {LastName}</p>
              <p>FirstName - {FirstName}</p>
              <p>SubscriptionType - {SubscriptionType}</p>
            </Stack>
          </Stack>
          <br />
          <Stack direction={"row"}>
            <Stack width={"100%"}>
              <Controller
                name="TimeIn"
                control={control}
                defaultValue={{
                  $d: defaultTimeIn,
                }}
                rules={{ required: true }}
                render={({ field: { onChange, value, ...restField } }) => (
                  <TimePicker
                    {...restField}
                    value={dayjs(value?.$d)}
                    onChange={(value) => {
                      handleTimeInChange(value, onChange);
                    }}
                    label="Time in"
                  />
                )}
              />

              <DisplayFormError errors={errors.TimeIn?.$d} />
            </Stack>
            <Stack width={"100%"}>
              <Controller
                name="TimeOut"
                defaultValue={{
                  $d: defaultTimeOut,
                }}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, ...restField } }) => (
                  <TimePicker
                    {...restField}
                    value={dayjs(value?.$d)}
                    onChange={(value) => {
                      handleTimeOutChange(value, onChange);
                    }}
                    label="Time Out"
                  />
                )}
              />
              <DisplayFormError errors={errors.TimeOut?.$d} />
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
        <ToastContainer containerId={"toast_attendance"} />
      </React.Fragment>
    </div>
  );
};

export default EditAttendanceRecordPage;
