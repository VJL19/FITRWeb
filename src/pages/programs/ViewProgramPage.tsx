import { Container, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewProgramPage = () => {
  const { SuggestedProgramTitle, SuggestedProgramDescription } = useSelector(
    (state: RootState) => state.suggested_program.programData
  );
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/suggested_programs", { replace: true });
  };
  return (
    <div>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="warning"
          size="medium"
          onClick={handleBack}
        >
          Back
        </Button>
        <h1>VIEW SUGGESTED PROGRAM PAGE</h1>

        <h2>{SuggestedProgramTitle}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: SuggestedProgramDescription }}
        />
      </Container>
    </div>
  );
};

export default ViewProgramPage;
