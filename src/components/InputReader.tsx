import React from "react";

type InputReaderProps = {
  rfidNumber: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  toggleFocus: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInput: () => void;
};

const InputReader = ({
  handleChange,
  inputRef,
  rfidNumber,
  toggleFocus,
  handleInput,
}: InputReaderProps) => {
  return (
    <React.Fragment>
      <label />
      <input
        value={rfidNumber}
        type="text"
        id="rfidInput"
        ref={inputRef}
        onFocus={toggleFocus}
        onChange={handleChange}
        onInput={handleInput}
        onBlur={toggleFocus}
        autoComplete="off"
      />
    </React.Fragment>
  );
};

export default InputReader;
