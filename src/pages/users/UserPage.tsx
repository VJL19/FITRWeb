import { Container, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomModal from "src/components/CustomModal";
import { navLinkTextStyle } from "src/components/SideBar";
import { setRoute } from "src/reducers/route";
import { AppDispatch, RootState } from "src/store/store";
import _columns from "./userColumn";
import { useGetUsersAttendanceQuery } from "src/reducers/attendance";
import AddIcon from "@mui/icons-material/Add";
import {
  useDeleteUserAccountMutation,
  useGetAllUsersQuery,
  usersApi,
} from "src/reducers/users";
import { handleClose } from "src/reducers/modal";
import LoadingIndicator from "src/components/LoadingIndicator";
import { storage } from "src/global/firebaseConfig";
import RenderRfidInput from "src/components/RenderRfidInput";
import { showFailedToast, showSuccessToast } from "src/components/showToast";
import RFIDRemover from "src/components/RFIDRemover";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import { useUserOnline } from "src/hooks/useUserOnline";
import MIUIDataGrid from "src/components/MIUIDataGrid";
import {
  deleteFirebaseObject,
  firebaseRef,
} from "src/utils/functions/firebase";
import NotAuthorized from "src/components/NotAuthorized";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import { useRefetchOnMessage } from "src/hooks/useRefetchOnMessage";

const UserPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Users"));
  }, []);

  const { UserID, ProfilePic } = useSelector(
    (state: RootState) => state.user.userData
  );

  const { isOnline } = useUserOnline();
  const [deleteUser, { status: deleteStatus, error }] =
    useDeleteUserAccountMutation();
  useRefetchOnMessage("refresh_userLists", () => {
    dispatch(usersApi.util.invalidateTags(["users"]));
  });
  const {
    data,
    isFetching,
    isUninitialized,
    error: allUserErr,
  } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const VISIBLE_FIELDS = [
    "RowID",
    "ProfilePic",
    "FullName",
    "ContactNumber",
    "SubscriptionType",
    "Activation",
    "Actions",
  ];

  const columns = React.useMemo(
    () => _columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [_columns]
  );

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      showSuccessToast(data?.message, "toast_user");
    }
    if (deleteStatus === "rejected") {
      showFailedToast(data?.message, "toast_user");
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) {
      delayShowToast(
        "failed",
        "Network error has occured. Please check your internet connection and try again this action",
        "toast_user"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) {
      delayShowToast(
        "failed",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency",
        "toast_user"
      );
    }
    if (
      allUserErr?.status === HTTP_ERROR.UNAUTHORIZED ||
      allUserErr?.status === HTTP_ERROR.BAD_REQUEST
    ) {
      delayShowToast(
        "failed",
        "You are not authenticated please login again!",
        "toast_user"
      );
    }
  }, [deleteStatus, data?.message]);
  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      let imageRef = firebaseRef(storage, ProfilePic);

      try {
        const deleteImage = async () => {
          await deleteFirebaseObject(imageRef);
          console.log("success at deleting an image.");
        };
        deleteImage();
      } catch (err) {
        console.log("there was an error in deleting an image");
      }
    }
  }, [deleteStatus, data?.message]);
  const handleDeleteUser = async () => {
    dispatch(handleClose());
    deleteUser({ UserID: UserID });
  };

  const { open } = useSelector((state: RootState) => state.modal);

  const rows = data?.result.map((user) => ({ ...user, id: user.UserID }));

  if (deleteStatus === "pending") {
    return <LoadingIndicator />;
  }
  if (
    allUserErr?.status === HTTP_ERROR.UNAUTHORIZED ||
    allUserErr?.status === HTTP_ERROR.BAD_REQUEST
  ) {
    return <NotAuthorized />;
  }
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: 500,
        alignItems: "center",
        "& .super-app-theme--header": {
          backgroundColor: "#ff2e00",
          color: "#f5f5f5",
          fontSize: 18,
        },
      }}
    >
      <RenderRfidInput />
      <h1 style={{ letterSpacing: 1.3, textTransform: "uppercase" }}>
        GYM MEMBERS
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

      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<AddIcon fontSize="large" htmlColor="#f5f5f5" />}
      >
        <NavLink to={`/users/create_user`} style={navLinkTextStyle}>
          create
        </NavLink>
      </Button>
      <CustomModal
        open={open}
        title="Delete this user?"
        handleDeleteClick={handleDeleteUser}
      />
      <ToastContainer containerId={"toast_user"} />
    </Container>
  );
};

export default UserPage;
