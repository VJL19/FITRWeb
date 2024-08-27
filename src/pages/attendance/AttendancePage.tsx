import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "src/store/store";
import _columns from "./attendanceColumn";
import { useGetUsersAttendanceQuery } from "src/reducers/attendance";
import {
  useDeleteFileRecordMutation,
  useGetAllFileRecordsQuery,
  useUploadFileRecordMutation,
} from "src/reducers/records";

import LoadingIndicator from "src/components/LoadingIndicator";
import { showSuccessToast, showFailedToast } from "src/components/showToast";
import RenderRfidInput from "src/components/RenderRfidInput";
const AttendancePage = () => {
  const dispatch: AppDispatch = useDispatch();

  const fileRef = useRef<HTMLInputElement | null | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isFetching, isUninitialized } = useGetUsersAttendanceQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const [uploadRecordFile, { data: uploadFileData, error }] =
    useUploadFileRecordMutation();

  const VISIBLE_FIELDS = [
    "RowID",
    "ProfilePic",
    "FullName",
    "TimeIn",
    "TimeOut",
    "DateTapped",
    "SubscriptionType",
    "IsPaid",
  ];

  const [deleteFile, { status: deleteStatus, data: deleteFileData }] =
    useDeleteFileRecordMutation();
  useEffect(() => {
    dispatch(setRoute("Attendance"));
  }, []);

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      showSuccessToast(deleteFileData?.message);
    }
    if (deleteStatus === "rejected") {
      showFailedToast(deleteFileData?.message);
    }
  }, [deleteStatus]);

  const columns = React.useMemo(
    () => _columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [_columns]
  );

  const rows = data?.result.map((user) => ({ ...user, id: user.AttendanceID }));

  console.log("file state", file);
  if (loading || deleteStatus === "pending") {
    return <LoadingIndicator />;
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
        Attendance
      </h1>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isFetching || isUninitialized}
        pageSizeOptions={[5, 10, 15, 20, 25]}
        disableRowSelectionOnClick
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />

      <ToastContainer />
    </Box>
  );
};

export default AttendancePage;
