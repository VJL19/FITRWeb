import React from "react";

type InputReaderProps = {
  rfidNumber: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  toggleFocus: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInput: () => void;
  onBlur: () => void;
  onFocus: () => void;
};

const InputReader = ({
  handleChange,
  inputRef,
  rfidNumber,
  toggleFocus,
  handleInput,
  onBlur,
  onFocus,
}: InputReaderProps) => {
  return (
    <React.Fragment>
      <label />
      <input
        ref={inputRef}
        value={rfidNumber}
        type="text"
        id="rfidInput"
        onFocus={onFocus}
        onChange={handleChange}
        onInput={handleInput}
        onBlur={onBlur}
        autoComplete="off"
      />
    </React.Fragment>
  );
};

export default InputReader;
