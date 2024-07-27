import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomModal from "src/components/CustomModal";
import { navLinkTextStyle } from "src/components/SideBar";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "src/store/store";
import _columns from "./recordColumn";
import { useGetUsersAttendanceQuery } from "src/reducers/attendance";
import AddIcon from "@mui/icons-material/Add";
import {
  useGetAllFileRecordsQuery,
  useUploadFileRecordMutation,
} from "src/reducers/records";
import _record_files_columns from "./recordFilesColumn";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileModal from "src/components/FileModal";
import { handleFileModalClose, handleFileModalOpen } from "src/reducers/modal";
import { uploadFile } from "src/utils/functions/uploadFile";
import LoadingIndicator from "src/components/LoadingIndicator";
import getCurrentDate from "src/utils/functions/date_fns";
const RecordPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const fileRef = useRef<HTMLInputElement | null | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isFetching, isUninitialized } = useGetUsersAttendanceQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: records,
    isFetching: recordFetching,
    isUninitialized: recordIsUninitialized,
  } = useGetAllFileRecordsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [uploadRecordFile, { data: uploadFileData, error }] =
    useUploadFileRecordMutation();

  const VISIBLE_FIELDS = [
    "ProfilePic",
    "FullName",
    "TimeIn",
    "TimeOut",
    "DateTapped",
    "SubscriptionType",
    "IsPaid",
  ];
  const VISIBLE_FILES_FIELDS = [
    "RecordID",
    "RecordName",
    "RecordDownloadLink",
    "RecordEntryDate",
    "Actions",
  ];

  const { fileModalOpen } = useSelector((state: RootState) => state.modal);
  useEffect(() => {
    dispatch(setRoute("Records"));
  }, []);

  const columns = React.useMemo(
    () => _columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [_columns]
  );

  const files_columns = React.useMemo(
    () =>
      _record_files_columns.filter((column) =>
        VISIBLE_FILES_FIELDS.includes(column.field)
      ),
    [_columns]
  );

  const rows = data?.result.map((user) => ({ ...user, id: user.AttendanceID }));
  const file_rows = records?.result.map((record) => ({
    ...record,
    id: record.RecordID,
  }));
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event?.target?.files?.[0]);
    console.log(event?.target?.files?.[0]);
    dispatch(handleFileModalOpen());
    event.target.value = "";
  };

  const handleFileUpload = async () => {
    fileRef.current?.click();
  };

  const handleConfirmationUpload = async () => {
    window.scrollTo(0, 0);
    const url = await uploadFile(file, "Records/", "file", loading, setLoading);

    const arg = {
      RecordName: file?.name,
      RecordDownloadLink: url,
      RecordEntryDate: getCurrentDate(),
    };
    uploadRecordFile(arg);
    dispatch(handleFileModalClose());
  };

  // console.log("upload record file data", uploadFileData);
  // console.log("upload record file err", error);

  console.log("file state", file);
  if (loading) {
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
      <h1 style={{ letterSpacing: 1.3, textTransform: "uppercase" }}>
        Records
      </h1>
      <DataGrid
        rows={file_rows}
        columns={files_columns}
        loading={recordFetching || recordIsUninitialized}
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

      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<FileUploadIcon fontSize="large" htmlColor="#f5f5f5" />}
        onClick={handleFileUpload}
      >
        <input
          type="file"
          accept=".pdf,.xlsx"
          hidden
          ref={fileRef}
          onChange={handleFileChange}
        />
        upload
      </Button>
      <FileModal
        open={fileModalOpen}
        title={`Upload this ${file?.name}?`}
        handleConfirmationUpload={handleConfirmationUpload}
      />
      <ToastContainer />
    </Box>
  );
};

export default RecordPage;
