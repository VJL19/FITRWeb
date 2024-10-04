import { Container } from "@mui/material";
import React from "react";

const NetworkError = () => {
  return (
    <Container sx={{ height: 450 }}>
      <h2>
        Network error occured. Please make sure you are connected to Internet
      </h2>
    </Container>
  );
};

export default NetworkError;
