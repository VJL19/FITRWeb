import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "store/store";
import _columns from "./programColumn";
import { NavLink } from "react-router-dom";
import { navLinkTextStyle } from "src/components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "src/components/CustomModal";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import LoadingIndicator from "src/components/LoadingIndicator";
import { handleClose } from "src/reducers/modal";
import { ToastContainer } from "react-toastify";
import {
  programApi,
  useDeleteSuggestedProgramMutation,
  useGetSuggestedProgramQuery,
} from "src/reducers/program";
import "react-toastify/dist/ReactToastify.css";
import { useRefetchOnMessage } from "src/hooks/useRefetchOnMessage";
import RenderRfidInput from "src/components/RenderRfidInput";
import RFIDRemover from "src/components/RFIDRemover";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";

const ProgramPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { open } = useSelector((state: RootState) => state.modal);

  const VISIBLE_FIELDS = [
    "RowID",
    "SuggestedProgramTitle",
    "SuggestedProgramEntryDate",
    "SuggestedProgramEntryTime",
    "Actions",
  ];

  const {
    data: suggested_programs,
    isFetching,
    isUninitialized,
    status,
  } = useGetSuggestedProgramQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { SuggestedProgramID } = useSelector(
    (state: RootState) => state.suggested_program.programData
  );

  const [deleteProgram, { data, status: deleteStatus, error }] =
    useDeleteSuggestedProgramMutation();

  useRefetchOnMessage("refresh_suggested_programs", () => {
    dispatch(programApi.util.invalidateTags(["suggested_program"]));
  });
  useEffect(() => {
    dispatch(setRoute("Programs"));
  }, []);

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      showSuccessToast(data?.message, "toast_program");
    }
    if (deleteStatus === "rejected") {
      showFailedToast(data?.message, "toast_program");
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_program"
      );
    }
  }, [deleteStatus, data?.message]);
  const rows = suggested_programs?.result?.map((suggested_program) => ({
    ...suggested_program,
    id: suggested_program.SuggestedProgramID,
  }));

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => _columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [_columns]
  );

  const handleDeleteProgram = async () => {
    const arg = {
      SuggestedProgramID: SuggestedProgramID,
    };
    deleteProgram(arg);
    dispatch(handleClose());
  };

  console.log("delete program status", deleteStatus);
  console.log("delete program data", data?.message);
  console.log("delete program error", error);

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
      <RenderRfidInput />
      <h1 style={{ letterSpacing: 1.3, textTransform: "uppercase" }}>
        SUGGESTED PROGRAMS
      </h1>
      <RFIDRemover
        children={
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
        }
      />

      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<AddIcon fontSize="large" htmlColor="#f5f5f5" />}
      >
        <NavLink
          to={`/dashboard/suggested_programs/create_program/`}
          style={navLinkTextStyle}
        >
          create
        </NavLink>
      </Button>
      <CustomModal
        open={open}
        title="Delete this program?"
        handleDeleteClick={handleDeleteProgram}
      />
      <ToastContainer containerId={"toast_program"} />
    </Box>
  );
};

export default ProgramPage;
