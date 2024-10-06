import { Container } from "@mui/material";
import React from "react";

const ServerError = () => {
  return (
    <Container sx={{ height: 450 }}>
      <h2>
        There is a problem within the server side possible maintenance or it
        crash unexpectedly. We apologize for your inconveniency
      </h2>
    </Container>
  );
};

export default ServerError;
