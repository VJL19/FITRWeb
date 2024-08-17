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
import dayjs from "dayjs";
import { renderDate } from "src/utils/functions/date_fns";
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
    field: "SubscriptionExpectedEnd",
    headerName: "Subscription Expected End",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 180,
    flex: 1,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params, row) =>
      new Date(row.SubscriptionExpectedEnd).toDateString(),
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

  //   {
  //     field: "Actions",
  //     headerName: "Actions",
  //     renderHeader: (params) => {
  //       return <b>{params.field}</b>;
  //     },
  //     width: 310,
  //     headerAlign: "center",
  //     headerClassName: "super-app-theme--header",
  //     renderCell: (params) => {
  //       const dispatch = useDispatch();
  //       const currentRowData: IAnnouncements = params.row;
  //       const arg: IAnnouncements = {
  //         AnnouncementID: currentRowData.AnnouncementID,
  //         AnnouncementTitle: currentRowData.AnnouncementTitle,
  //         AnnouncementDate: currentRowData.AnnouncementDate,
  //         AnnouncementDescription: currentRowData.AnnouncementDescription,
  //         AnnouncementImage: currentRowData.AnnouncementImage,
  //       };
  //       const onClick = () => {
  //         dispatch(setAnnouncementData(arg));
  //       };

  //       const handleDelete = () => {
  //         dispatch(handleOpen());
  //         dispatch(setAnnouncementData(arg));
  //       };

  //       return (
  //         <Stack direction="row" spacing={2}>
  //           <Button
  //             variant="contained"
  //             color="info"
  //             size="medium"
  //             onClick={onClick}
  //             startIcon={
  //               <TextSnippetIcon fontSize="medium" htmlColor={"#f5f5f5"} />
  //             }
  //           >
  //             <NavLink
  //               to={`/dashboard/announcements/view_announcement/:${currentRowData.AnnouncementID}`}
  //               style={navLinkTextStyle}
  //             >
  //               View
  //             </NavLink>
  //           </Button>
  //           <Button
  //             variant="contained"
  //             color="warning"
  //             size="medium"
  //             onClick={onClick}
  //             startIcon={<EditIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
  //           >
  //             <NavLink
  //               to={`/dashboard/announcements/edit_announcement/:${currentRowData.AnnouncementID}`}
  //               style={navLinkTextStyle}
  //             >
  //               Edit
  //             </NavLink>
  //           </Button>
  //           <Button
  //             variant="contained"
  //             color="error"
  //             size="medium"
  //             onClick={handleDelete}
  //             startIcon={<DeleteIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
  //           >
  //             Delete
  //           </Button>
  //         </Stack>
  //       );
  // },
  //   },
];

export default _columns;
