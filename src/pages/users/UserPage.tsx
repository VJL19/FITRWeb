import { Container, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
} from "src/reducers/users";
import { handleClose } from "src/reducers/modal";
import LoadingIndicator from "src/components/LoadingIndicator";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { storage } from "src/global/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

const UserPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Users"));
  }, []);

  const { UserID, ProfilePic } = useSelector(
    (state: RootState) => state.user.userData
  );
  const [deleteUser, { status: deleteStatus }] = useDeleteUserAccountMutation();

  const { data, isFetching, isUninitialized } = useGetAllUsersQuery(undefined, {
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

  const handleDeleteUser = async () => {
    let imageRef = ref(storage, ProfilePic);

    try {
      await deleteObject(imageRef);
      console.log("success");
    } catch (err) {
      console.log("there was an error in deleting an image");
    }

    dispatch(handleClose());
    deleteUser({ UserID: UserID });
  };

  const { open } = useSelector((state: RootState) => state.modal);

  const rows = data?.result.map((user) => ({ ...user, id: user.UserID }));

  if (deleteStatus === "pending") {
    return <LoadingIndicator />;
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
      <h1 style={{ letterSpacing: 1.3, textTransform: "uppercase" }}>
        GYM MEMBERS
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
          noResultsOverlay: () => (
            <Stack
              height="100%"
              alignItems="center"
              justifyContent="center"
              flex={1}
              flexDirection={"row"}
              gap={1.5}
            >
              <PlaylistRemoveIcon fontSize="large" htmlColor="#202020" />
              No results found
            </Stack>
          ),
        }}
      />

      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<AddIcon fontSize="large" htmlColor="#f5f5f5" />}
      >
        <NavLink to={`/dashboard/users/create_user/`} style={navLinkTextStyle}>
          create
        </NavLink>
      </Button>
      <CustomModal
        open={open}
        title="Delete this user?"
        handleDeleteClick={handleDeleteUser}
      />
      <ToastContainer />
    </Container>
  );
};

export default UserPage;
