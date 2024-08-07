import React, { useEffect } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Box } from "@mui/material";
import {
  programApi,
  setSuggestedProgramLength,
  useGetTotalSuggestedProgramQuery,
} from "src/reducers/program";
import LoadingIndicator from "src/components/LoadingIndicator";
import { AppDispatch } from "src/store/store";
import { useDispatch } from "react-redux";
import { useRefetchOnMessage } from "src/hooks/useRefetchOnMessage";

const TotalProgramCreatedPage = () => {
  const {
    data: totalProgramSuggested,
    isFetching,
    isUninitialized,
  } = useGetTotalSuggestedProgramQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch: AppDispatch = useDispatch();
  useRefetchOnMessage("refresh_suggested_programs", () => {
    dispatch(programApi.util.invalidateTags(["suggested_program"]));
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
        backgroundColor: "lightcoral",
        position: "relative",
      }}
    >
      <FitnessCenterIcon
        style={{
          position: "absolute",
          left: "20%",
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
          justifyContent: "flex-start",
          marginLeft: 25,
        }}
      >
        <h2>PROGRAMS</h2>
      </div>
      <div>
        <h1 style={{ fontSize: 40 }}>
          {totalProgramSuggested?.result[0].TotalProgramSuggested} /{" "}
          {totalProgramSuggested?.result[0].TotalProgramSuggested}
        </h1>
      </div>
    </Box>
  );
};

export default TotalProgramCreatedPage;
