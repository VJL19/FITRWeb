import { Stack, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { navLinkTextStyle } from "src/components/SideBar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { handleOpen } from "src/reducers/modal";
import { IRecords } from "src/utils/types/records.types";
import { setRecordData } from "src/reducers/records";
const _record_files_columns: GridColDef[] = [
  {
    field: "RecordID",
    headerName: "Record ID",

    renderHeader: (params) => {
      return <b>{params.field.split("Record")[1]}</b>;
    },
    flex: 1,
    align: "center",
    width: 100,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "RecordName",
    headerName: "Record Name",
    renderHeader: (params) => {
      return <b>{params.field.split("Record")[1]}</b>;
    },
    width: 150,
    flex: 1,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    flex: 1,
    align: "center",
    field: "RecordDownloadLink",
    headerName: "First Name",
    renderHeader: (params) => {
      return <b>{params.field.split("Record")[1]}</b>;
    },
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const currentRowData: IRecords = params.row;

      if (currentRowData.RecordName.split(".")[1] === "xlsx") {
        <a
          href={`https://view.officeapps.live.com/op/embed.aspx?src=${currentRowData.RecordDownloadLink}`}
          target="_blank"
        >
          Download this file
        </a>;
      }
      return (
        <a href={`${currentRowData.RecordDownloadLink}`} target="_blank">
          Download this file
        </a>
      );
    },
  },
  {
    field: "RecordEntryDate",
    headerName: "Last Name",
    renderHeader: (params) => {
      return <b>{params.field.split("Record")[1]}</b>;
    },
    width: 150,
    flex: 1,
    align: "center",

    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueFormatter: (value) =>
      `${new Date(value).toDateString()} ${new Date(value).toLocaleString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }
      )}`,
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
      const currentRowData: IRecords = params.row;
      const arg: IRecords = {
        RecordID: currentRowData.RecordID,
        RecordName: currentRowData.RecordName,
        RecordDownloadLink: currentRowData.RecordDownloadLink,
        RecordEntryDate: currentRowData.RecordEntryDate,
      };
      const onClick = () => {
        dispatch(setRecordData(arg));
      };

      const handleDelete = () => {
        dispatch(handleOpen());
        dispatch(setRecordData(arg));
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
              to={`/dashboard/records/view_record/:${currentRowData.RecordID}`}
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
              to={`/dashboard/records/edit_record/:${currentRowData.RecordID}`}
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

export default _record_files_columns;
