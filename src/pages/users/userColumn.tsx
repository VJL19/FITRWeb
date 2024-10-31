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
import IAttendance from "src/utils/types/attendance.types";
import IUser from "src/utils/types/users.types";
import { setUserData } from "src/reducers/users";
import Avatar from "@mui/material/Avatar";
import { replaceCharWithAsterisk } from "src/utils/functions/text_fns";

const _columns: GridColDef<IAttendance>[] = [
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
    type: "number",
    align: "center",
    width: 100,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) =>
      Number(params.api.getAllRowIds().indexOf(params.id) + 1),
    valueFormatter: (value) => Number(value),
    filterable: false,
  },
  {
    field: "Username",
    headerName: "User Name",

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
    width: 150,
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
    width: 120,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) => {
      return `${row.FirstName} ${row.MiddleName} ${row.LastName}`;
    },
  },
  {
    field: "Age",
    headerName: "Age",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    flex: 1,
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    flex: 1,
    field: "Birthday",
    headerName: "Birth Day",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    flex: 1,
    field: "ContactNumber",
    headerName: "Contact Number",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (value, row) => replaceCharWithAsterisk(row.ContactNumber),
  },
  {
    field: "Address",
    headerName: "Address",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 220,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    flex: 1,
    field: "Email",
    headerName: "Email",
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
    field: "Height",
    headerName: "Height",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    align: "center",
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) => `${row.Height} cm`,
  },
  {
    flex: 1,
    field: "Weight",
    headerName: "Weight",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    align: "center",
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) => `${row.Weight} kg`,
  },
  {
    field: "Gender",
    headerName: "Gender",
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
    flex: 1,
    field: "SubscriptionType",
    headerName: "Subscription Type",
    renderHeader: (params) => {
      return <b>Type</b>;
    },
    align: "center",
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    type: "singleSelect",
    valueOptions: ["Session", "Monthly"],
  },
  {
    field: "Activation",
    headerName: "Activation",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    align: "center",
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    type: "singleSelect",
    valueOptions: ["activated", "not activated"],
    renderCell: (params) => {
      const currentRow: IUser = params.row;
      return (
        <Stack
          direction="row"
          sx={{
            flex: 0.5,
            alignSelf: "center",
            justifyContent: "center",
            color: "#f5f5f5",
            backgroundColor:
              currentRow.Activation === "activated" ? "#388e3c" : "#d32f2f",
          }}
        >
          {currentRow?.Activation?.toUpperCase()}
        </Stack>
      );
    },
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
      const currentRowData: IUser = params.row;
      const arg: IUser = {
        UserID: currentRowData.UserID,
        Birthday: currentRowData.Birthday,
        Address: currentRowData.Address,
        SubscriptionType: currentRowData.SubscriptionType,
        LastName: currentRowData.LastName,
        FirstName: currentRowData.FirstName,
        MiddleName: currentRowData.MiddleName,
        Age: currentRowData.Age,
        ContactNumber: currentRowData.ContactNumber,
        Email: currentRowData.Email,
        Gender: currentRowData.Gender,
        Password: currentRowData.Password,
        ConfirmPassword: currentRowData.ConfirmPassword,
        Height: currentRowData.Height,
        Weight: currentRowData.Weight,
        ProfilePic: currentRowData.ProfilePic,
        Username: currentRowData.Username,
        RFIDNumber: currentRowData.RFIDNumber,
        IsRFIDActive: currentRowData.IsRFIDActive,
      };
      const onClick = () => {
        dispatch(setUserData(arg));
      };

      const handleDelete = () => {
        dispatch(handleOpen());
        dispatch(setUserData(arg));
      };

      return (
        <Stack direction="row" spacing={2} alignItems={"center"} height="100%">
          <NavLink to={`/users/view_user`} style={navLinkTextStyle}>
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
          <NavLink to={`/users/edit_user`} style={navLinkTextStyle}>
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
