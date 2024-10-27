import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "src/store/store";
import _columns from "./attendanceColumn";
import { useGetUsersAttendanceHistoryQuery } from "src/reducers/attendance";
import {
  useDeleteFileRecordMutation,
  useGetAllFileRecordsQuery,
  useUploadFileRecordMutation,
} from "src/reducers/records";

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
const AttendanceHistoryPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const fileRef = useRef<HTMLInputElement | null | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data,
    isFetching,
    isUninitialized,
    status,
    error: attendanceErr,
  } = useGetUsersAttendanceHistoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [uploadRecordFile, { data: uploadFileData, error }] =
    useUploadFileRecordMutation();

  const { isOnline } = useUserOnline();

  const VISIBLE_FIELDS = [
    "RowID",
    "ProfilePic",
    "FullName",
    "TimeIn",
    "TimeOut",
    "DateTapped",
    "SubscriptionType",
    "Expiration",
  ];

  const [deleteFile, { status: deleteStatus, data: deleteFileData }] =
    useDeleteFileRecordMutation();
  useEffect(() => {
    dispatch(setRoute("Attendance_History"));
  }, []);

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      showSuccessToast(deleteFileData?.message, "toast_attendance");
    }
    if (deleteStatus === "rejected") {
      showFailedToast(deleteFileData?.message, "toast_attendance");
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

  const columns = React.useMemo(
    () => _columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [_columns]
  );

  const rows = data?.result.map((user) => ({ ...user, id: user.AttendanceID }));

  console.log("file state", file);
  if (loading || deleteStatus === "pending") {
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
        Attendance History
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

      <ToastContainer containerId={"toast_attendance"} />
    </Box>
  );
};

export default AttendanceHistoryPage;
