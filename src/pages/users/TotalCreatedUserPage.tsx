import React from "react";
import { Box } from "@mui/material";
import LoadingIndicator from "src/components/LoadingIndicator";
import { useGetAllTotalUsersQuery } from "src/reducers/users";
import GroupsIcon from "@mui/icons-material/Groups";
const TotalCreatedUserPage = () => {
  const {
    data: totalUsers,
    isFetching,
    isUninitialized,
  } = useGetAllTotalUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{
        width: 300,
        height: "100%",
        textAlign: "center",
        boxShadow: "1px 3px 34px -15px rgba(0,0,0,0.75);",
        position: "relative",
      }}
    >
      <GroupsIcon
        style={{
          position: "absolute",
          left: "15%",
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
        htmlColor="rgba(0,0,0, 0.15)"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <h2>TOTAL</h2>
      </div>
      <div>
        <h1 style={{ fontSize: 40 }}>
          {totalUsers?.result[0].TotalUser} / {totalUsers?.result[0].TotalUser}
        </h1>
      </div>
    </Box>
  );
};

export default TotalCreatedUserPage;
