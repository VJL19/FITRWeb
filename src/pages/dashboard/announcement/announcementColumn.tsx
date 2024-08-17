import { Stack, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { navLinkTextStyle } from "src/components/SideBar";
import { setAnnouncementData } from "src/reducers/announcement";
import { IAnnouncements } from "src/utils/types/announcement.types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import thumbnail from "src/assets/thumbnail_no_img.jpg";
import { handleOpen } from "src/reducers/modal";
const _columns: GridColDef[] = [
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
    flex: 1,
    field: "AnnouncementTitle",
    headerName: "Announcement Title",

    renderHeader: (params) => {
      return <b>{params.field.split("Announcement")[1]}</b>;
    },
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    flex: 1,
    field: "AnnouncementImage",
    headerName: "Announcement Image",
    renderHeader: (params) => {
      return <b>{params.field.split("Announcement")[1]}</b>;
    },
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const currentRow: IAnnouncements = params.row;
      return (
        <Stack direction="column">
          <img
            src={
              currentRow.AnnouncementImage === "default_poster.png"
                ? thumbnail
                : currentRow.AnnouncementImage
            }
          />
        </Stack>
      );
    },
  },
  {
    field: "AnnouncementDescription",
    headerName: "Announcement Description",
    renderHeader: (params) => {
      return <b>{params.field.split("Announcement")[1]}</b>;
    },
    flex: 1,
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    flex: 1,
    field: "AnnouncementDate",
    headerName: "Announcement Date",
    renderHeader: (params) => {
      return <b>{params.field.split("Announcement")[1]}</b>;
    },
    type: "date",
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueFormatter: (value) => `${new Date(value).toDateString()}`,
  },
  {
    flex: 1,
    field: "AnnouncementTime",
    headerName: "AnnouncementTime",
    renderHeader: (params) => {
      return <b>{params.field.split("Announcement")[1]}</b>;
    },
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",

    valueGetter: (value, row: IAnnouncements) =>
      `${new Date(row.AnnouncementDate).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`,
  },

  {
    field: "Actions",
    headerName: "Actions",
    renderHeader: (params) => {
      return <b>{params.field}</b>;
    },
    width: 310,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const dispatch = useDispatch();
      const currentRowData: IAnnouncements = params.row;
      const arg: IAnnouncements = {
        AnnouncementID: currentRowData.AnnouncementID,
        AnnouncementTitle: currentRowData.AnnouncementTitle,
        AnnouncementDate: currentRowData.AnnouncementDate,
        AnnouncementDescription: currentRowData.AnnouncementDescription,
        AnnouncementImage: currentRowData.AnnouncementImage,
      };
      const onClick = () => {
        dispatch(setAnnouncementData(arg));
      };

      const handleDelete = () => {
        dispatch(handleOpen());
        dispatch(setAnnouncementData(arg));
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
              to={`/dashboard/announcements/view_announcement/:${currentRowData.AnnouncementID}`}
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
              to={`/dashboard/announcements/edit_announcement/:${currentRowData.AnnouncementID}`}
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
