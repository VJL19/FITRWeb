import { Box, Button, Container } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useEditFileRecordMutation } from "src/reducers/records";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import getCurrentDate from "src/utils/functions/date_fns";
import { uploadFile } from "src/utils/functions/uploadFile";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { storage } from "src/global/firebaseConfig";
import LoadingIndicator from "src/components/LoadingIndicator";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showFailedToast } from "src/components/showToast";
import { useNavigate } from "react-router-dom";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import {
  deleteFirebaseObject,
  firebaseRef,
} from "src/utils/functions/firebase";
import { useUserOnline } from "src/hooks/useUserOnline";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";

const EditRecordPage = () => {
  const [file, setFile] = useState<File | undefined>();
  const fileRef = useRef<HTMLInputElement | null | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [editRecordFile, { data, status, error }] = useEditFileRecordMutation();

  const { RecordID, RecordDownloadLink } = useSelector(
    (state: RootState) => state.record.recordData
  );

  const { isOnline } = useUserOnline();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "fulfilled") {
      showSuccessToast(data?.message, "toast_record");
      handleBack();
    }
    if (status === "rejected") {
      showFailedToast(data?.message, "toast_record");
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_record"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_record"
      );
    }
    if (error?.status === HTTP_ERROR?.UNAUTHORIZED) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_record"
      );
    }
  }, [status]);

  useEffect(() => {
    if (status === "fulfilled") {
      try {
        let imageRef = firebaseRef(storage, RecordDownloadLink);
        const deleteFile = async () => {
          await deleteFirebaseObject(imageRef);
          console.log("success deleting an file");
        };
        deleteFile();
        console.log("success");
      } catch (err) {
        console.log("there was an error in deleting the file");
      }
    }
  }, [status, data?.message]);
  const handleFileEdit = async () => {
    const url = await uploadFile(file, "Records/", "file", loading, setLoading);

    const arg = {
      RecordID: RecordID,
      RecordName: file?.name,
      RecordDownloadLink: url,
      RecordEntryDate: getCurrentDate(),
    };
    editRecordFile(arg);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event?.target?.files?.[0]);
    event.target.value = "";
  };

  const handleFileUpload = () => {
    fileRef?.current?.click();
  };

  const handleBack = () => {
    navigate("/records", { replace: true });
  };

  // console.log("edit upload file data", data);
  // console.log("edit upload file error", error);
  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <div>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon fontSize="large" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="warning"
          size="medium"
          onClick={handleBack}
        >
          Back
        </Button>
        <h1>EDIT RECORD</h1>

        <Box
          component="div"
          sx={{
            p: 2,
            border: "1px dashed grey",
            cursor: "pointer",
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleFileUpload}
        >
          <p>Select files here</p>
          <input
            type="file"
            accept=".pdf,.xlsx"
            hidden
            ref={fileRef}
            onChange={handleFileChange}
          />
        </Box>

        {file !== undefined && (
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p>{file?.name}</p>
            <CloseIcon
              fontSize="large"
              htmlColor="#202020"
              sx={{ cursor: "pointer" }}
              onClick={() => setFile(undefined)}
            />
          </Box>
        )}

        {file !== undefined && (
          <Button
            variant="contained"
            color="success"
            size="medium"
            startIcon={<FileUploadIcon fontSize="large" htmlColor="#f5f5f5" />}
            onClick={handleFileEdit}
          >
            upload
          </Button>
        )}
        <ToastContainer containerId={"toast_record"} />
      </Container>
    </div>
  );
};

export default EditRecordPage;
