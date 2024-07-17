import { Stack, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { navLinkTextStyle } from "src/components/SideBar";
import { setAnnouncementData } from "src/reducers/announcement";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import thumbnail from "src/assets/thumbnail_no_img.jpg";
import { handleOpen } from "src/reducers/modal";
import ISubscriptions from "src/utils/types/subscription.types";
const _columns: GridColDef[] = [
  {
    field: "UserID",
    headerName: "User ID",

    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    align: "center",
    width: 100,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "ProfilePic",
    headerName: "Profile Pic",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const currentRow: ISubscriptions = params.row;
      return (
        <Stack
          direction="row"
          sx={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <img
            style={{
              borderWidth: 1.5,
              borderRadius: "50%",
              borderColor: "green",
              border: 15,
            }}
            height={65}
            src={
              currentRow.ProfilePic === "default_poster.png"
                ? thumbnail
                : currentRow.ProfilePic
            }
          />
        </Stack>
      );
    },
  },
  {
    align: "center",
    field: "FirstName",
    headerName: "First Name",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "LastName",
    headerName: "Last Name",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    align: "center",

    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "MiddleName",
    headerName: "Middle Name",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    align: "center",

    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "FullName",
    headerName: "Full Name",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) =>
      `${row.FirstName} ${row.MiddleName}. ${row.LastName}`,
  },

  {
    field: "SubscriptionAmount",
    headerName: "Subscription Amount",
    renderHeader: (params) => {
      return <b>{params.field.split("Subscription")[1]}</b>;
    },
    width: 180,
    flex: 1,
    align: "center",

    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) => `${row.SubscriptionAmount} PHP`,
  },
  {
    field: "SubscriptionType",
    headerName: "Subscription Type",
    renderHeader: (params) => {
      return <b>{params.field.split("Subscription")[1]}</b>;
    },
    width: 180,
    align: "center",

    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "SubscriptionUploadedImage",
    headerName: "Subscription Uploaded Image",
    renderHeader: (params) => {
      return <b>{params.field.split("Subscription")[1]}</b>;
    },
    width: 220,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const currentRow: ISubscriptions = params.row;
      return (
        <Stack
          direction="row"
          sx={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <img
            height={65}
            src={
              currentRow.SubscriptionUploadedImage === "default_poster.png"
                ? thumbnail
                : currentRow.SubscriptionUploadedImage
            }
          />
        </Stack>
      );
    },
  },
  {
    field: "SubscriptionStatus",
    headerName: "Subscription Status",
    renderHeader: (params) => {
      return <b>{params.field.split("Subscription")[1]}</b>;
    },
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const currentRow: ISubscriptions = params.row;
      return (
        <Stack
          direction="row"
          sx={{
            flex: 0.5,
            alignSelf: "center",
            justifyContent: "center",
            color: "#f5f5f5",
            backgroundColor:
              currentRow.SubscriptionStatus === "fulfilled"
                ? "#388e3c"
                : currentRow.SubscriptionStatus === "pending"
                ? "#f57c00"
                : "#d32f2f",
          }}
        >
          {currentRow.SubscriptionStatus.toUpperCase()}
        </Stack>
      );
    },
  },
  {
    field: "SubscriptionEntryDate",
    headerName: "Subscription Entry Date",
    renderHeader: (params) => {
      return <b>{params.field.split("Subscription")[1]}</b>;
    },
    align: "center",
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) =>
      `${new Date(row.SubscriptionEntryDate).toDateString()} ${new Date(
        row.SubscriptionEntryDate
      ).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`,
  },

  {
    align: "center",
    field: "Actions",
    headerName: "Actions",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 310,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const dispatch = useDispatch();
      const currentRowData: ISubscriptions = params.row;
      // const arg: IAnnouncements = {
      //   AnnouncementID: currentRowData.AnnouncementID,
      //   AnnouncementTitle: currentRowData.AnnouncementTitle,
      //   AnnouncementDate: currentRowData.AnnouncementDate,
      //   AnnouncementDescription: currentRowData.AnnouncementDescription,
      //   AnnouncementImage: currentRowData.AnnouncementImage,
      // };
      const onClick = () => {
        // dispatch(setAnnouncementData(arg));
      };

      const handleDelete = () => {
        // dispatch(handleOpen());
        // dispatch(setAnnouncementData(arg));
      };

      return (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="info"
            size="medium"
            onClick={onClick}
            startIcon={
              <TextSnippetIcon fontSize="medium" htmlColor={"#f5f5f5"} />
            }
          >
            <NavLink
              to={`/dashboard/transactions/view_subscription/:${currentRowData.SubscriptionID}`}
              style={navLinkTextStyle}
            >
              View
            </NavLink>
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="medium"
            onClick={onClick}
            startIcon={<EditIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
          >
            <NavLink
              to={`/dashboard/transactions/edit_subscription/:${currentRowData.SubscriptionID}`}
              style={navLinkTextStyle}
            >
              Edit
            </NavLink>
          </Button>
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={handleDelete}
            startIcon={<DeleteIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
          >
            Delete
          </Button>
        </Stack>
      );
    },
  },
];

export default _columns;
