import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomModal from "src/components/CustomModal";
import { navLinkTextStyle } from "src/components/SideBar";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "src/store/store";
import _columns from "./transactionHistoryColumn";
import AddIcon from "@mui/icons-material/Add";
import {
  transactionApi,
  useDeleteTransactionMutation,
  useGetAllUsersTransactionsHistoryQuery,
} from "src/reducers/transaction";
import { handleClose } from "src/reducers/modal";
import LoadingIndicator from "src/components/LoadingIndicator";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import { useRefetchOnMessage } from "src/hooks/useRefetchOnMessage";
import RenderRfidInput from "src/components/RenderRfidInput";
import { storage } from "src/global/firebaseConfig";
import RFIDRemover from "src/components/RFIDRemover";
import { useUserOnline } from "src/hooks/useUserOnline";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import MIUIDataGrid from "src/components/MIUIDataGrid";
import {
  deleteFirebaseObject,
  firebaseRef,
} from "src/utils/functions/firebase";
import NotAuthorized from "src/components/NotAuthorized";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";

const TransactionHistoryPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Transaction_History"));
  }, []);

  const {
    data,
    isFetching,
    isUninitialized,
    error: transErr,
  } = useGetAllUsersTransactionsHistoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

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
    if (
      transErr?.status === HTTP_ERROR.UNAUTHORIZED ||
      transErr?.status === HTTP_ERROR.BAD_REQUEST
    ) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_transaction"
      );
    }
  }, [deleteStatus, data?.message]);

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      let imageRef = firebaseRef(storage, SubscriptionUploadedImage);

      try {
        const deleteImage = async () => {
          await deleteFirebaseObject(imageRef);
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
  if (
    transErr?.status === HTTP_ERROR.UNAUTHORIZED ||
    transErr?.status === HTTP_ERROR.BAD_REQUEST
  ) {
    return <NotAuthorized />;
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
        TRANSACTIONS HISTORY
      </h1>
      <RFIDRemover
        children={
          <MIUIDataGrid
            rows={rows}
            columns={columns}
            loading={isFetching || isUninitialized}
            variant="skeleton"
            nowRowsVariant="skeleton"
          />
        }
      />

      <CustomModal
        open={open}
        handleDeleteClick={handleDeleteTransaction}
        title="Delete this transaction?"
      />
      <ToastContainer containerId={"toast_transaction"} />
    </Box>
  );
};

export default TransactionHistoryPage;
