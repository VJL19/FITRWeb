import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomModal from "src/components/CustomModal";
import { navLinkTextStyle } from "src/components/SideBar";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "src/store/store";
import _columns from "./transactionColumn";
import { useGetUsersAttendanceQuery } from "src/reducers/attendance";
import AddIcon from "@mui/icons-material/Add";
import { useGetAllUsersQuery } from "src/reducers/users";
import { useGetAllUsersTransactionsQuery } from "src/reducers/transaction";

const TransactionPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Transactions"));
  }, []);

  const { data, isFetching, isUninitialized } = useGetAllUsersTransactionsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const VISIBLE_FIELDS = [
    "ProfilePic",
    "FullName",
    "SubscriptionAmount",
    "SubscriptionType",
    "SubscriptionUploadedImage",
    "SubscriptionStatus",
    "SubscriptionEntryDate",
    "Actions",
  ];

  const columns = React.useMemo(
    () => _columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [_columns]
  );

  const rows = data?.result.map((user) => ({
    ...user,
    id: user.SubscriptionID,
  }));
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#ff2e00",
          color: "#f5f5f5",
          fontSize: 18,
        },
      }}
      alignItems={"center"}
    >
      <h1 style={{ letterSpacing: 1.3, textTransform: "uppercase" }}>
        TRANSACTIONS
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
          to={`/dashboard/transactions/create_subscription/`}
          style={navLinkTextStyle}
        >
          create
        </NavLink>
      </Button>
      {/* <CustomModal open={open} handleDeleteClick={handleDeleteAnnouncement} /> */}
      <ToastContainer />
    </Box>
  );
};

export default TransactionPage;
