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
import { handleOpen } from "src/reducers/modal";
import IProgramSuggested from "src/utils/types/program_suggested.types";
import { setSuggestedProgramData } from "src/reducers/program";
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
    field: "SuggestedProgramTitle",
    headerName: "Suggested Program Title",

    renderHeader: (params) => {
      return <b>{params.field.split("SuggestedProgram")[1]}</b>;
    },
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    flex: 1,
    field: "SuggestedProgramDescription",
    headerName: "Suggested Program Description",
    renderHeader: (params) => {
      return <b>{params.field.split("SuggestedProgram")[1]}</b>;
    },
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: params.row.SuggestedProgramDescription,
          }}
        />
      );
    },
  },
  {
    field: "SuggestedProgramEntryDate",
    headerName: "Suggested Program EntryDate",
    renderHeader: (params) => {
      return <b>Date Added</b>;
    },
    type: "date",
    flex: 1,
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueFormatter: (value) => `${new Date(value).toDateString()}`,
  },
  {
    field: "SuggestedProgramEntryTime",
    headerName: "Suggested Program EntryTime",
    renderHeader: (params) => {
      return <b>Time Added</b>;
    },
    flex: 1,
    width: 180,
    align: "center",
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (value, row: IProgramSuggested) =>
      `${new Date(row.SuggestedProgramEntryDate).toLocaleString("en-US", {
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
      const currentRowData: IProgramSuggested = params.row;
      const arg: IProgramSuggested = {
        SuggestedProgramID: currentRowData.SuggestedProgramID,
        SuggestedProgramTitle: currentRowData.SuggestedProgramTitle,
        SuggestedProgramDescription: currentRowData.SuggestedProgramDescription,
        SuggestedProgramEntryDate: currentRowData.SuggestedProgramEntryDate,
      };
      const onClick = () => {
        dispatch(setSuggestedProgramData(arg));
      };

      const handleDelete = () => {
        dispatch(handleOpen());
        dispatch(setSuggestedProgramData(arg));
      };

      return (
        <Stack direction="row" spacing={2} alignItems={"center"} height="100%">
          <NavLink
            to={`/suggested_programs/view_program`}
            style={navLinkTextStyle}
          >
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
          <NavLink
            to={`/suggested_programs/edit_program`}
            style={navLinkTextStyle}
          >
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
