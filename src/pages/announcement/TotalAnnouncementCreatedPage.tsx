import React from "react";
import { Box } from "@mui/material";
import LoadingIndicator from "src/components/LoadingIndicator";
import {
  announcementApi,
  useGetTotalAnnouncementsQuery,
} from "src/reducers/announcement";
import { useRefetchOnMessage } from "src/hooks/useRefetchOnMessage";
import { AppDispatch } from "src/store/store";
import { useDispatch } from "react-redux";
import CampaignIcon from "@mui/icons-material/Campaign";
const TotalAnnouncementCreatedPage = () => {
  const {
    data: totalAnnouncement,
    isFetching,
    isUninitialized,
  } = useGetTotalAnnouncementsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch: AppDispatch = useDispatch();
  useRefetchOnMessage("refresh_announcement", () => {
    dispatch(announcementApi.util.invalidateTags(["admin_announments"]));
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
        backgroundColor: "lightpink",
        position: "relative",
      }}
    >
      <CampaignIcon
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
        <h2>ANNOUNCEMENTS</h2>
      </div>
      <div>
        <h1 style={{ fontSize: 40 }}>
          {totalAnnouncement?.result[0].TotalAnnouncements} /{" "}
          {totalAnnouncement?.result[0].TotalAnnouncements}
        </h1>
      </div>
    </Box>
  );
};

export default TotalAnnouncementCreatedPage;
