import { Avatar, Box, Button, Container } from "@mui/material";
import LoadingIndicator from "src/components/LoadingIndicator";
import React from "react";
import { useGetAllRecentAttendanceQuery } from "src/reducers/attendance";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import thumbnail from "src/assets/thumbnail_no_img.jpg";

const RecentAttendeesPage = () => {
  const {
    data: recentAttendees,
    isFetching,
    isUninitialized,
  } = useGetAllRecentAttendanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/attendance");
    window.scrollTo(0, 0);
  };
  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  return (
    <Box
      sx={{
        height: 450,
        maxHeight: 450,
        overflowY: "scroll",
        textAlign: "center",
        boxShadow: "1px 3px 34px -15px rgba(0,0,0,0.75);",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h2>Recent Attendees</h2>
        <div>
          <Button
            variant="contained"
            size="large"
            color="warning"
            onClick={handleClick}
            endIcon={<ArrowForwardIcon htmlColor="#f5f5f5" fontSize="large" />}
          >
            SEE ALL
          </Button>
        </div>
      </div>{" "}
      {recentAttendees?.result?.map((recentUser) => (
        <React.Fragment key={recentUser.AttendanceID}>
          <Container
            sx={{
              borderBottomWidth: 3,
              borderBottomColor: "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Avatar
              alt={`${recentUser.ProfilePic}`}
              src={`${
                recentUser.ProfilePic === "default_poster.png"
                  ? thumbnail
                  : recentUser.ProfilePic
              }`}
              sx={{ width: 56, height: 56 }}
            />
            <h5>
              {recentUser.FirstName} {recentUser.LastName}
            </h5>
            <p>{new Date(recentUser.DateTapped).toLocaleString()}</p>
          </Container>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default RecentAttendeesPage;
