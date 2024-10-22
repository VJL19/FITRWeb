import { Box, Button, Container } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import CustomModal from "src/components/CustomModal";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "src/store/store";
import _columns from "./recordColumn";
import {
  useDeleteFileRecordMutation,
  useGetAllFileRecordsQuery,
  useUploadFileRecordMutation,
} from "src/reducers/records";
import _record_files_columns from "./recordFilesColumn";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileModal from "src/components/FileModal";
import {
  handleClose,
  handleFileModalClose,
  handleFileModalOpen,
} from "src/reducers/modal";
import { uploadFile } from "src/utils/functions/uploadFile";
import LoadingIndicator from "src/components/LoadingIndicator";
import getCurrentDate from "src/utils/functions/date_fns";
import { showSuccessToast, showFailedToast } from "src/components/showToast";
import { storage } from "src/global/firebaseConfig";
import RenderRfidInput from "src/components/RenderRfidInput";
import RFIDRemover from "src/components/RFIDRemover";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import MIUIDataGrid from "src/components/MIUIDataGrid";
import {
  deleteFirebaseObject,
  firebaseRef,
} from "src/utils/functions/firebase";
import { useUserOnline } from "src/hooks/useUserOnline";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import NotAuthorized from "src/components/NotAuthorized";
const RecordPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const fileRef = useRef<HTMLInputElement | null | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: records,
    isFetching: recordFetching,
    isUninitialized: recordIsUninitialized,
    error: recordErr,
  } = useGetAllFileRecordsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [
    uploadRecordFile,
    { data: uploadFileData, status: uploadStatus, error: uploadError },
  ] = useUploadFileRecordMutation();

  const { isOnline } = useUserOnline();

  const VISIBLE_FILES_FIELDS = [
    "RowID",
    "RecordName",
    "RecordDownloadLink",
    "RecordEntryDate",
    "Actions",
  ];

  const { fileModalOpen, open } = useSelector(
    (state: RootState) => state.modal
  );
  const { RecordID, RecordDownloadLink } = useSelector(
    (state: RootState) => state.record.recordData
  );

  const [
    deleteFile,
    { status: deleteStatus, data: deleteFileData, error: deleteError },
  ] = useDeleteFileRecordMutation();
  useEffect(() => {
    dispatch(setRoute("Records"));
  }, []);

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      let imageRef = firebaseRef(storage, RecordDownloadLink);

      try {
        const deleteFile = async () => {
          await deleteFirebaseObject(imageRef);
        };
        deleteFile();
        console.log("success deleting the file");
      } catch (err) {
        console.log("there was an error in deleting an file");
      }
      showSuccessToast(deleteFileData?.message, "toast_record");
    }
    if (deleteStatus === "rejected") {
      showFailedToast(deleteFileData?.message, "toast_record");
    }
    if (deleteError?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_record"
      );
    }
    if (deleteError?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_record"
      );
    }
    if (deleteError?.status === HTTP_ERROR?.UNAUTHORIZED) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_record"
      );
    }
  }, [deleteStatus]);
  useEffect(() => {
    if (uploadError?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_record"
      );
    }
    if (uploadError?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_record"
      );
    }
    if (uploadError?.status === HTTP_ERROR?.UNAUTHORIZED) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_record"
      );
    }
  }, [uploadStatus]);

  const files_columns = React.useMemo(
    () =>
      _record_files_columns.filter((column) =>
        VISIBLE_FILES_FIELDS.includes(column.field)
      ),
    [_columns]
  );

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
    const url = await uploadFile(file, "Records/", "file", loading, setLoading);

    const arg = {
      RecordName: file?.name,
      RecordDownloadLink: url,
      RecordEntryDate: getCurrentDate(),
    };
    uploadRecordFile(arg);
    dispatch(handleFileModalClose());
  };

  const handleDeleteRecord = async () => {
    const arg = {
      RecordID: RecordID,
    };

    dispatch(handleClose());
    deleteFile(arg);
  };
  // console.log("upload record file data", uploadFileData);
  // console.log("upload record file err", error);

  console.log("file state", file);
  if (loading || deleteStatus === "pending") {
    return <LoadingIndicator />;
  }

  if (recordErr?.status === HTTP_ERROR.UNAUTHORIZED) {
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
        FILE RECORDS
      </h1>

      <RFIDRemover
        children={
          <MIUIDataGrid
            rows={file_rows}
            columns={files_columns}
            loading={recordFetching || recordIsUninitialized}
            variant="skeleton"
            nowRowsVariant="skeleton"
          />
        }
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
          ref={fileRef}
          hidden
          onChange={handleFileChange}
        />
        upload
      </Button>
      <FileModal
        open={fileModalOpen}
        title={`Upload this ${file?.name}?`}
        handleConfirmationUpload={handleConfirmationUpload}
      />
      <CustomModal
        open={open}
        title="Delete this file?"
        handleDeleteClick={handleDeleteRecord}
      />
      <ToastContainer containerId={"toast_record"} />
    </Box>
  );
};

export default RecordPage;
