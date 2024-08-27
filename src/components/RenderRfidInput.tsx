import React from "react";
import useRFIDListen from "src/hooks/useRFIDListen";
import InputReader from "./InputReader";

const RenderRfidInput = () => {
  const { handleChange, rfidNumber, handleInput, toggleFocus, inputRef } =
    useRFIDListen();

  const props = {
    handleChange,
    rfidNumber,
    handleInput,
    toggleFocus,
    inputRef,
  };

  return <InputReader {...props} />;
};

export default RenderRfidInput;
