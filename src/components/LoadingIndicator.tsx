import { Container, Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingIndicator = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: 5,
          gap: 5,
        }}
      >
        <CircularProgress />
        <h3>Loading... Please wait</h3>
      </Box>
    </Container>
  );
};

export default LoadingIndicator;
