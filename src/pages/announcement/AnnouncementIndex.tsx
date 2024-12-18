import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  announcementApi,
  useDeleteAnnouncementMutation,
  useGetAnnouncementsQuery,
} from "src/reducers/announcement";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "store/store";
import _columns from "./announcementColumn";
import { NavLink } from "react-router-dom";
import { navLinkTextStyle } from "src/components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "src/components/CustomModal";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import LoadingIndicator from "src/components/LoadingIndicator";
import { handleClose } from "src/reducers/modal";
import { ToastContainer } from "react-toastify";
import { useRefetchOnMessage } from "src/hooks/useRefetchOnMessage";
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
import NotAuthorized from "src/components/NotAuthorized";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
const AnnouncementIndex = () => {
  const dispatch: AppDispatch = useDispatch();

  const { open } = useSelector((state: RootState) => state.modal);

  const { isOnline } = useUserOnline();
  const VISIBLE_FIELDS = [
    "RowID",
    "AnnouncementID",
    "AnnouncementTitle",
    "AnnouncementDate",
    "AnnouncementTime",
    "Actions",
  ];

  const {
    data: announcements,
    isFetching,
    error: announcementErr,
    isUninitialized,
  } = useGetAnnouncementsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useRefetchOnMessage("refresh_announcement", () => {
    dispatch(announcementApi.util.invalidateTags(["admin_announments"]));
  });

  const { AnnouncementID, AnnouncementImage } = useSelector(
    (state: RootState) => state.announcement.announcementData
  );
  const [deleteAnnouncement, { data, status: deleteStatus, error }] =
    useDeleteAnnouncementMutation();

  useEffect(() => {
    dispatch(setRoute("Announcements"));
  }, []);

  // useEffect(() => {
  //   const handleMessage = () => {
  //     dispatch(announcementApi.util.invalidateTags(["admin_announments"]));
  //     console.log("run");
  //     refetch();
  //   };
  //   //listens to any event emitted by the server and refetch the data
  //   socket?.on("refresh_announcement", handleMessage);

  //   return () => {
  //     socket?.off("refresh_announcement", handleMessage);
  //   };
  // }, [socket]);

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      showSuccessToast(data?.message, "toast_announcement");
    }
    if (deleteStatus === "rejected") {
      showFailedToast(data?.message, "toast_announcement");
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_announcement"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_announcement"
      );
    }
    if (
      error?.status === HTTP_ERROR.UNAUTHORIZED ||
      error?.status === HTTP_ERROR.BAD_REQUEST
    ) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_announcement"
      );
    }
  }, [deleteStatus, data?.message]);
  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      // let imageRef = ref(storage, AnnouncementImage);
      let imageRef = firebaseRef(storage, AnnouncementImage);

      try {
        const deleteImage = async () => {
          await deleteFirebaseObject(imageRef);
          console.log("success");
        };
        deleteImage();
      } catch (err) {
        console.log("there was an error in deleting an image", err);
      }
    }
  }, [deleteStatus, data?.message]);
  const rows = announcements?.result?.map((announcement) => ({
    ...announcement,
    id: announcement.AnnouncementID,
  }));

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => _columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [_columns]
  );

  const handleDeleteAnnouncement = async () => {
    const arg = {
      AnnouncementID: AnnouncementID,
    };

    deleteAnnouncement(arg);
    dispatch(handleClose());
  };

  // console.log("delete announcements status", deleteStatus);
  // console.log("delete announcements data", data?.message);
  // console.log("delete announcements error", error);

  if (deleteStatus === "pending") {
    return <LoadingIndicator />;
  }

  if (
    announcementErr?.status === HTTP_ERROR.UNAUTHORIZED ||
    announcementErr?.status === HTTP_ERROR.BAD_REQUEST
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
        All Announcements
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
        <NavLink
          to={`/announcements/create_announcement`}
          style={navLinkTextStyle}
        >
          create
        </NavLink>
      </Button>
      <CustomModal
        open={open}
        title="Delete this announcement?"
        handleDeleteClick={handleDeleteAnnouncement}
      />
      <ToastContainer containerId={"toast_announcement"} />
    </Box>
  );
};

export default AnnouncementIndex;
