import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "src/store/store";
import _columns from "./attendanceColumn";
import {
  useDeleteUserRecordMutation,
  useGetUsersAttendanceQuery,
} from "src/reducers/attendance";
import { useUploadFileRecordMutation } from "src/reducers/records";

import LoadingIndicator from "src/components/LoadingIndicator";
import { showSuccessToast, showFailedToast } from "src/components/showToast";
import RenderRfidInput from "src/components/RenderRfidInput";
import RFIDRemover from "src/components/RFIDRemover";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import MIUIDataGrid from "src/components/MIUIDataGrid";
import { useUserOnline } from "src/hooks/useUserOnline";
import NotAuthorized from "src/components/NotAuthorized";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import { NavLink } from "react-router-dom";
import { navLinkTextStyle } from "src/components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "src/components/CustomModal";
import { handleClose } from "src/reducers/modal";
import { setAdminAccountData, setUserTempRfidNumber } from "src/reducers/users";

const AttendancePage = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    data,
    isFetching,
    isUninitialized,
    status,
    error: attendanceErr,
  } = useGetUsersAttendanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { isOnline } = useUserOnline();

  const VISIBLE_FIELDS = [
    "RowID",
    "ProfilePic",
    "FullName",
    "TimeIn",
    "TimeOut",
    "DateTapped",
    "SubscriptionType",
    "Actions",
  ];

  const [deleteRecord, { status: deleteStatus, data: deleteFileData, error }] =
    useDeleteUserRecordMutation();
  const { AttendanceID } = useSelector(
    (state: RootState) => state.attendance.attendanceSelectedData
  );

  const { open } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    dispatch(setRoute("Attendance"));
  }, []);

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      showSuccessToast(deleteFileData?.message, "toast_attendance");
    }
    if (deleteStatus === "rejected") {
      showFailedToast(deleteFileData?.message, "toast_attendance");
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
  }, [deleteStatus]);

  useEffect(() => {
    if (attendanceErr?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_attendance"
      );
    }
    if (attendanceErr?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_attendance"
      );
    }
    if (
      attendanceErr?.status === HTTP_ERROR.UNAUTHORIZED ||
      attendanceErr?.status === HTTP_ERROR.BAD_REQUEST
    ) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_attendance"
      );
    }
  }, [status]);

  const handleDeleteAttendance = () => {
    dispatch(handleClose());
    deleteRecord({ AttendanceID: AttendanceID });
  };

  const columns = React.useMemo(
    () => _columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [_columns]
  );

  const rows = data?.result.map((user) => ({ ...user, id: user.AttendanceID }));

  if (deleteStatus === "pending") {
    return <LoadingIndicator />;
  }

  if (
    attendanceErr?.status === HTTP_ERROR.UNAUTHORIZED ||
    attendanceErr?.status === HTTP_ERROR.BAD_REQUEST
  ) {
    return <NotAuthorized />;
  }

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#ff2e00",
          color: "#f5f5f5",
          fontSize: 20,
        },
      }}
      alignItems={"center"}
    >
      <RenderRfidInput />
      <h1 style={{ letterSpacing: 1.3, textTransform: "uppercase" }}>
        Today's Attendance
      </h1>
      <RFIDRemover
        children={
          <MIUIDataGrid
            rows={rows}
            columns={columns}
            loading={isFetching || isUninitialized}
            variant="skeleton"
            nowRowsVariant="skeleton"
          />
        }
      />

      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<AddIcon fontSize="large" htmlColor="#f5f5f5" />}
      >
        <NavLink to={`/attendance/create_attendance`} style={navLinkTextStyle}>
          create
        </NavLink>
      </Button>
      <Button
        variant="contained"
        color="warning"
        size="medium"
        startIcon={<AddIcon fontSize="large" htmlColor="#f5f5f5" />}
      >
        <NavLink to={`/attendance/guest_tap`} style={navLinkTextStyle}>
          spare card
        </NavLink>
      </Button>
      <CustomModal
        open={open}
        handleDeleteClick={handleDeleteAttendance}
        title="Delete this attendance?"
      />
      <ToastContainer containerId={"toast_attendance"} />
    </Box>
  );
};

export default AttendancePage;
