import { useRef, useState, useEffect } from "react";
import {
  useCheckUserRFIDNumberMutation,
  useCheckUserTapRFIDMutation,
  useTapRFIDCardUserMutation,
} from "src/reducers/attendance";
import getCurrentDate, { formatTime } from "src/utils/functions/date_fns";
import { advanceMonthlyEnd } from "src/utils/functions/subscription_fns";

const useRFIDListen = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [rfidNumber, setRfidNumber] = useState("");
  const rfidInput = document.getElementById("rfidInput");
  const mainDiv = document.querySelector(".main--container");
  const [tapRFID, { data: tapData, status: tapStatus, error: tapError }] =
    useTapRFIDCardUserMutation();

  const [checkUserRFID, { data, status, error }] =
    useCheckUserRFIDNumberMutation();
  const user = data?.user!;
  const [
    checkTapRFID,
    { data: checkData, status: checkStatus, error: checkErr },
  ] = useCheckUserTapRFIDMutation();
  function onMousemove() {
    toggleFocus();
  }

  function onKeyUp() {
    console.log("key up event");
  }
  useEffect(() => {
    mainDiv?.addEventListener("mousemove", onMousemove);

    return () => mainDiv?.removeEventListener("mouseMove", onMousemove);
  }, [onMousemove]);
  useEffect(() => {
    rfidInput?.addEventListener("keyup", onKeyUp);

    return () => rfidInput?.removeEventListener("keyup", onKeyUp);
  }, [onKeyUp]);

  useEffect(() => {
    toggleFocus();
    console.log("use effect run for the first render.");
  }, []);

  useEffect(() => {
    if (status === "fulfilled") {
      //fetch to check whether the user is first time tap into the reader.
      checkTapRFID({ UserID: user?.UserID });
    }
  }, [status, data?.message]);

  useEffect(() => {
    if (checkStatus === "fulfilled") {
      const arg = {
        UserID: user?.UserID,
        ProfilePic: user?.ProfilePic,
        LastName: user?.LastName,
        FirstName: user?.FirstName,
        SubscriptionType: user?.SubscriptionType,
        DateTapped: getCurrentDate(),
        SubscriptionExpectedEnd: checkData?.user?.SubscriptionExpectedEnd,
        IsPaid: "false",
        TimeIn: formatTime(new Date()),
        TimeOut: "NULL",
      };

      tapRFID(arg);
    }
    if (checkStatus === "rejected") {
      const arg = {
        UserID: user?.UserID,
        ProfilePic: user?.ProfilePic,
        LastName: user?.LastName,
        FirstName: user?.FirstName,
        SubscriptionType: user?.SubscriptionType,
        DateTapped: getCurrentDate(),
        SubscriptionExpectedEnd: advanceMonthlyEnd(),
        IsPaid: "false",
        TimeIn: formatTime(new Date()),
        TimeOut: "NULL",
      };

      tapRFID(arg);
    }
  }, [checkStatus, checkData?.message]);

  useEffect(() => {
    console.log(rfidNumber.length);
    if (rfidNumber.length === 10) {
      checkUserRFID({ RFIDNumber: rfidNumber });
    }
    setTimeout(() => {
      if (rfidNumber.length === 10) {
        setRfidNumber("");
      }
    }, 1500);
  }, [rfidNumber]);
  const toggleFocus = () => {
    inputRef?.current?.focus();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRfidNumber(event?.target?.value);
  };

  const handleInput = () => {
    //TODO: ADD FETCH FROM API WHEN USER TAPS RFID CARD
  };

  return {
    rfidNumber,
    handleChange,
    handleInput,
    inputRef,
    toggleFocus,
    tapStatus,
  };
};
export default useRFIDListen;
