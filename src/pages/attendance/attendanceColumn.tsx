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
import IAttendance from "src/utils/types/attendance.types";
import dayjs from "dayjs";
import { renderDate } from "src/utils/functions/date_fns";
import Avatar from "@mui/material/Avatar";
import { setAttendanceSelectedData } from "src/reducers/attendance";

const _columns: GridColDef[] = [
  {
    field: "UserID",
    headerName: "User ID",

    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    flex: 1,
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
    width: 180,
    flex: 1,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const currentRow: IAttendance = params.row;
      return (
        <Stack
          direction="row"
          sx={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <Avatar
            alt={`${currentRow.ProfilePic}`}
            src={`${
              currentRow.ProfilePic === "default_poster.png"
                ? thumbnail
                : currentRow.ProfilePic
            }`}
            sx={{ width: 56, height: 56 }}
          />
        </Stack>
      );
    },
  },
  {
    flex: 1,
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
    flex: 1,
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
    flex: 1,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) => `${row.FirstName} ${row.LastName}`,
  },

  {
    field: "SubscriptionType",
    headerName: "Subscription Type",
    renderHeader: (params) => {
      return <b>Type</b>;
    },
    width: 180,
    flex: 1,
    align: "center",

    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    type: "singleSelect",
    valueOptions: ["Session", "Monthly"],
  },
  {
    field: "TimeIn",
    headerName: "Time In",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    flex: 1,
    align: "center",

    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "TimeOut",
    headerName: "Time Out",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    flex: 1,
    align: "center",

    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "DateTapped",
    headerName: "Date Tapped",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 220,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    type: "date",
    renderCell: (params) => renderDate(params.row?.DateTapped),
    valueFormatter: (params: IAttendance) =>
      dayjs(params.DateTapped).format("YYYY/MM/DD"),
  },
  {
    field: "Expiration",
    headerName: "Expiration",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    flex: 1,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) =>
      row.SubscriptionExpectedEnd !== "Expired when timeout"
        ? new Date(row.SubscriptionExpectedEnd).toDateString()
        : row.SubscriptionExpectedEnd,
  },
  {
    field: "IsPaid",
    headerName: "Is Paid",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    flex: 1,
    align: "center",
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },

  {
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
      const currentRowData: IAttendance = params.row;
      const arg: IAttendance = {
        AttendanceID: currentRowData.AttendanceID,
        LastName: currentRowData.LastName,
        FirstName: currentRowData.FirstName,
        TimeIn:
          +currentRowData.TimeIn.split(":")[0] < 10
            ? currentRowData.TimeIn.split(":")[0].toString().padStart(2, "0") +
              ":" +
              currentRowData.TimeIn.split(":")[1]
            : currentRowData.TimeIn,
        TimeOut:
          +currentRowData.TimeOut.split(":")[0] < 10
            ? currentRowData.TimeOut.split(":")[0].toString().padStart(2, "0") +
              ":" +
              currentRowData.TimeOut.split(":")[1]
            : currentRowData.TimeOut,
        DateTapped: currentRowData.DateTapped,
        SubscriptionType: currentRowData.SubscriptionType,
        SubscriptionExpectedEnd: "",
        IsPaid: "",
        MiddleName: "",
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
        dispatch(setAttendanceSelectedData(arg));
      };

      const handleDelete = () => {
        dispatch(handleOpen());
        dispatch(setAttendanceSelectedData(arg));
      };

      return (
        <Stack direction="row" spacing={2} alignItems={"center"} height="100%">
          <NavLink to={`/attendance/view_attendance`} style={navLinkTextStyle}>
            <Button
              variant="contained"
              color="info"
              size="small"
              style={{ height: 40 }}
              onClick={onClick}
              startIcon={
                <TextSnippetIcon fontSize="medium" htmlColor={"#f5f5f5"} />
              }
            >
              View
            </Button>
          </NavLink>
          <NavLink to={`/attendance/edit_attendance`} style={navLinkTextStyle}>
            <Button
              variant="contained"
              color="warning"
              size="small"
              style={{ height: 40 }}
              onClick={onClick}
              startIcon={<EditIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
            >
              Edit
            </Button>
          </NavLink>
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
