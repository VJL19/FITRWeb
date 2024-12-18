import React from "react";
import { Box } from "@mui/material";
import LoadingIndicator from "src/components/LoadingIndicator";
import GroupsIcon from "@mui/icons-material/Groups";
import { useGetUsersTotalAttendanceQuery } from "src/reducers/attendance";

const TotalRecentAttendeesPage = () => {
  const {
    data: totalUsers,
    isFetching,
    isUninitialized,
  } = useGetUsersTotalAttendanceQuery(undefined, {
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
        backgroundColor: "yellow",
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
        <h2>TODAY ATTENDEES</h2>
      </div>
      <div>
        <h1 style={{ fontSize: 40 }}>
          {totalUsers?.result[0].TotalTodaysAttendees} /{" "}
          {totalUsers?.result[0].TotalTodaysAttendees}
        </h1>
      </div>
    </Box>
  );
};

export default TotalRecentAttendeesPage;
