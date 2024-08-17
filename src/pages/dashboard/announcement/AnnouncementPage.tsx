import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
import { ref, deleteObject } from "firebase/storage";
const AnnouncementPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { open } = useSelector((state: RootState) => state.modal);

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
      showSuccessToast(data?.message);
    }
    if (deleteStatus === "rejected") {
      showFailedToast(data?.message);
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
    let imageRef = ref(storage, AnnouncementImage);

    try {
      await deleteObject(imageRef);
      console.log("success");
    } catch (err) {
      console.log("there was an error in deleting an image");
    }
    deleteAnnouncement(arg);
    dispatch(handleClose());
  };

  // console.log("delete announcements status", deleteStatus);
  // console.log("delete announcements data", data?.message);
  // console.log("delete announcements error", error);

  if (deleteStatus === "pending") {
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
        All Announcementss
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

      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<AddIcon fontSize="large" htmlColor="#f5f5f5" />}
      >
        <NavLink
          to={`/dashboard/announcements/create_announcement/`}
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
      <ToastContainer />
    </Box>
  );
};

export default AnnouncementPage;
