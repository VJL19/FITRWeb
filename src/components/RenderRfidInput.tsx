import React, { useEffect } from "react";
import useRFIDListen from "src/hooks/useRFIDListen";
import InputReader from "./InputReader";
import { useSelector } from "react-redux";
import { showFailedToast, showSuccessToast } from "./showToast";
import { RootState } from "src/store/store";
import { ToastContainer } from "react-toastify";

const RenderRfidInput = () => {
  const {
    handleChange,
    rfidNumber,
    handleInput,
    setRfidNumber,
    rfidData,
    setRfidData,
    toggleFocus,
    inputRef,
    setFocusable,
    onBlur,
    onFocus,
  } = useRFIDListen();
  const { data } = useSelector(
    (state: RootState) => state.attendance.checkRfidStatus
  );

  const { RFIDNumber } = useSelector(
    (state: RootState) => state.user.adminAccountData
  );
  const { userTempRfidNumber } = useSelector((state: RootState) => state.user);
  //check if the admin spare rfid is equal to the tap then assign the input payload

  const dynamicRfidNumber =
    rfidNumber === RFIDNumber ? userTempRfidNumber : rfidNumber;

  useEffect(() => {
    if (rfidNumber.length === 10) {
      console.log(data);
      if (data.status === "fulfilled") {
        showSuccessToast(data.message, "toast_rfidNumber");
      }
      if (data.status === "rejected") {
        showFailedToast(data.message, "toast_rfidNumber");
      }
    }
  }, [rfidData, setRfidData]);
  const props = {
    handleChange,
    rfidNumber,
    dynamicRfidNumber,
    handleInput,
    toggleFocus,
    inputRef,
    setFocusable,
    onBlur,
    onFocus,
  };

  return (
    <React.Fragment>
      <InputReader {...props} />
      <ToastContainer containerId={"toast_rfidNumber"} />
    </React.Fragment>
  );
};

export default RenderRfidInput;
