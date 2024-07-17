import React from "react";
import { FieldError } from "react-hook-form";

const DisplayFormError = ({ errors }: { errors: FieldError | undefined }) => {
  return (
    <React.Fragment>
      {errors && (
        <p style={{ color: "#d9534f", fontWeight: "600" }}>{errors?.message}</p>
      )}
    </React.Fragment>
  );
};

export default DisplayFormError;
