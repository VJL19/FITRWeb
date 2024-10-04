import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomModal from "src/components/CustomModal";
import { navLinkTextStyle } from "src/components/SideBar";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "src/store/store";
import _columns from "./transactionColumn";
import AddIcon from "@mui/icons-material/Add";
import {
  transactionApi,
  useDeleteTransactionMutation,
  useGetAllUsersTransactionsQuery,
} from "src/reducers/transaction";
import { handleClose } from "src/reducers/modal";
import LoadingIndicator from "src/components/LoadingIndicator";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { useRefetchOnMessage } from "src/hooks/useRefetchOnMessage";
import RenderRfidInput from "src/components/RenderRfidInput";
import { storage } from "src/global/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import RFIDRemover from "src/components/RFIDRemover";
import { useUserOnline } from "src/hooks/useUserOnline";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";

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
    "RowID",
    "FullName",
    "SubscriptionAmount",
    "SubscriptionType",
    "SubscriptionMethod",
    "SubscriptionStatus",
    "SubscriptionEntryDate",
    "Actions",
  ];

  const { SubscriptionID, SubscriptionUploadedImage } = useSelector(
    (state: RootState) => state.transaction.transactionData
  );

  const { isOnline } = useUserOnline();

  const [deleteTransaction, { status: deleteStatus, error }] =
    useDeleteTransactionMutation();

  const { open } = useSelector((state: RootState) => state.modal);

  const columns = React.useMemo(
    () => _columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [_columns]
  );

  const rows = data?.result.map((user) => ({
    ...user,
    id: user.SubscriptionID,
  }));

  useRefetchOnMessage("refresh_transaction", () => {
    dispatch(transactionApi.util.invalidateTags(["transaction"]));
  });

  const handleDeleteTransaction = async () => {
    dispatch(handleClose());
    deleteTransaction({ SubscriptionID: SubscriptionID });
  };

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      showSuccessToast(data?.message, "toast_transaction");
    }
    if (deleteStatus === "rejected") {
      showFailedToast(data?.message, "toast_transaction");
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_transaction"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_transaction"
      );
    }
  }, [deleteStatus, data?.message]);

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      let imageRef = ref(storage, SubscriptionUploadedImage);

      try {
        const deleteImage = async () => {
          await deleteObject(imageRef);
          console.log("success at deleting an image");
        };
        deleteImage();
      } catch (err) {
        console.log("there was an error in deleting an image");
      }
    }
  }, [deleteStatus, data?.message]);

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
          fontSize: 18,
        },
      }}
      alignItems={"center"}
    >
      <RenderRfidInput />
      <h1 style={{ letterSpacing: 1.3, textTransform: "uppercase" }}>
        TRANSACTIONS
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
          to={`/dashboard/transactions/create_subscription/`}
          style={navLinkTextStyle}
        >
          create
        </NavLink>
      </Button>
      <CustomModal
        open={open}
        handleDeleteClick={handleDeleteTransaction}
        title="Delete this transaction?"
      />
      <ToastContainer containerId={"toast_transaction"} />
    </Box>
  );
};

export default TransactionPage;
