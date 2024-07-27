import { Box, Button, Container } from "@mui/material";
import LoadingIndicator from "src/components/LoadingIndicator";
import React from "react";
import { useGetAllRecentAttendanceQuery } from "src/reducers/attendance";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

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
    navigate("/dashboard/records");
    window.scrollTo(0, 0);
  };
  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  return (
    <Box
      sx={{
        width: 500,
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
        <Container
          sx={{
            borderBottomWidth: 3,
            borderBottomColor: "gray",
            display: "flex",
            alignItems: "center",
            justfiyContent: "center",
            gap: 3,
          }}
        >
          <img
            style={{
              border: 5,
              borderWidth: 5,
              borderColor: "#ff2e00",
              borderRadius: "50%",
            }}
            src={recentUser.ProfilePic}
            alt="a user profile"
            height={40}
          />
          <h5>
            {recentUser.FirstName} {recentUser.LastName}
          </h5>
          <p>{new Date(recentUser.DateTapped).toLocaleString()}</p>
        </Container>
      ))}
    </Box>
  );
};

export default RecentAttendeesPage;
