import { Stack, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { navLinkTextStyle } from "src/components/SideBar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import thumbnail from "src/assets/thumbnail_no_img.jpg";
import { handleOpen } from "src/reducers/modal";
import ISubscriptions from "src/utils/types/subscription.types";
import { setTransactionData } from "src/reducers/transaction";
import dayjs from "dayjs";
import { renderDate } from "src/utils/functions/date_fns";

const _columns: GridColDef<ISubscriptions>[] = [
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
    field: "RowID",
    headerName: "Row ID",

    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    align: "center",
    width: 100,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    sortable: true,
    renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    filterable: false,
  },
  {
    field: "ProfilePic",
    headerName: "Profile Pic",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 100,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const currentRow: ISubscriptions = params.row;
      return (
        <Stack
          direction="row"
          sx={{ alignSelf: "center", justifyContent: "center" }}
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
    flex: 1,
    field: "FullName",
    headerName: "Full Name",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 120,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) => `${row.SubscriptionBy}`,
  },

  {
    flex: 1,
    field: "SubscriptionAmount",
    headerName: "Subscription Amount",
    renderHeader: (params) => {
      return <b>{params.field.split("Subscription")[1]}</b>;
    },
    width: 120,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) => `${row.SubscriptionAmount} PHP`,
  },
  {
    flex: 1,
    field: "SubscriptionType",
    headerName: "Subscription Type",
    renderHeader: (params) => {
      return <b>{params.field.split("Subscription")[1]}</b>;
    },
    width: 120,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    type: "singleSelect",
    valueOptions: ["Session", "Monthly"],
  },
  {
    flex: 1,
    field: "SubscriptionMethod",
    headerName: "Subscription Method",
    renderHeader: (params) => {
      return <b>{params.field.split("Subscription")[1]}</b>;
    },
    width: 120,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    type: "singleSelect",
    valueOptions: ["GCash", "Paymaya", "CreditCard", "Cash"],
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
          sx={{ alignSelf: "center", justifyContent: "center" }}
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
    flex: 1,
    field: "SubscriptionEntryDate",
    headerName: "Subscription Entry Date",
    renderHeader: (params) => {
      return <b>{params.field.split("Subscription")[1]}</b>;
    },
    align: "center",
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    type: "date",
    renderCell: (params) => renderDate(params.row?.SubscriptionEntryDate),
    valueFormatter: (params: ISubscriptions) =>
      dayjs(params.SubscriptionEntryDate).format("YYYY/MM/DD"),
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
              currentRow.SubscriptionStatus === "Fulfill"
                ? "#388e3c"
                : currentRow.SubscriptionStatus === "pending"
                ? "#f57c00"
                : "#d32f2f",
          }}
        >
          {currentRow.SubscriptionStatus === "pending"
            ? currentRow.SubscriptionStatus.toUpperCase()
            : currentRow.SubscriptionStatus.concat("ed").toUpperCase()}
        </Stack>
      );
    },
    type: "singleSelect",
    valueOptions: ["pending", "Fulfill", "REJECT"],
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
      const arg: ISubscriptions = {
        ProfilePic: currentRowData.ProfilePic,
        LastName: currentRowData.LastName,
        FirstName: currentRowData.FirstName,
        MiddleName: currentRowData.MiddleName,
        SubscriptionID: currentRowData.SubscriptionID,
        SubscriptionAmount: currentRowData.SubscriptionAmount,
        SubscriptionType: currentRowData.SubscriptionType,
        SubscriptionUploadedImage: currentRowData.SubscriptionUploadedImage,
        SubscriptionEntryDate: currentRowData.SubscriptionEntryDate,
        SubscriptionStatus: currentRowData.SubscriptionStatus,
        SubscriptionMethod: currentRowData.SubscriptionMethod,
        SubscriptionBy: currentRowData.SubscriptionBy,
        No_M_SubscriptionID: 0,
        Birthday: "",
        Age: "",
        ContactNumber: "",
        Email: "",
        Address: "",
        Height: "",
        Weight: "",
        Username: "",
        Password: "",
        ConfirmPassword: "",
        Gender: "",
      };
      const onClick = () => {
        // dispatch(setAnnouncementData(arg));
        dispatch(setTransactionData(arg));
      };

      const handleDelete = () => {
        dispatch(handleOpen());
        dispatch(setTransactionData(arg));
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
            // disabled={}
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
