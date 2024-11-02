import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

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
  const { userTempRfidNumber } = useSelector((state: RootState) => state.user);

  const { RFIDNumber } = useSelector(
    (state: RootState) => state.user.adminAccountData
  );

  const dynamicRfidNumber =
    rfidNumber === RFIDNumber ? userTempRfidNumber : rfidNumber;

  return (
    <React.Fragment>
      <label />
      <input
        ref={inputRef}
        value={dynamicRfidNumber}
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
