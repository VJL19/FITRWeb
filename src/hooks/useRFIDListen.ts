import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  IRfidError,
  setCheckRfidMessage,
  useCheckUserRFIDNumberMutation,
  useCheckUserTapRFIDMutation,
  useTapRFIDCardUserMutation,
} from "src/reducers/attendance";
import { AppDispatch } from "src/store/store";
import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import getCurrentDate, { formatTime } from "src/utils/functions/date_fns";
import { advanceMonthlyEnd } from "src/utils/functions/subscription_fns";

const useRFIDListen = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [rfidNumber, setRfidNumber] = useState("");
  const [isTapRfid, setIsTapRfid] = useState(false);
  const [focusable, setFocusable] = useState(false);
  const [rfidData, setRfidData] = useState<IRfidError>({
    data: { message: "", status: "" },
  });
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

  const dispatch: AppDispatch = useDispatch();
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
  }, []);

  const onBlur = () => setFocusable(false);
  const onFocus = () => setFocusable(true);

  useEffect(() => {
    if (!focusable) {
      inputRef?.current?.focus({ preventScroll: true });
    } else {
      inputRef?.current?.focus({ preventScroll: true });
    }
  }, [focusable]);

  console.log("input focus", focusable);

  useEffect(() => {
    if (status === "fulfilled") {
      //fetch to check whether the user is first time tap into the reader.
      checkTapRFID({ UserID: user?.UserID });
      setIsTapRfid((prev) => !prev);
    }
    if (status === "rejected") {
      setRfidData({
        data: { message: error?.data?.message, status: status },
      });
      dispatch(
        setCheckRfidMessage({
          data: { message: error?.data?.message, status: status },
        })
      );
      setIsTapRfid((prev) => !prev);
    }
  }, [status, data?.message]);

  useEffect(() => {
    if (tapStatus === "fulfilled") {
      setRfidData({
        data: {
          message: `User ${data?.user?.FirstName} ${
            data?.user?.LastName
          } ${tapData?.message!}`,
          status: tapStatus,
        },
      });
      dispatch(
        setCheckRfidMessage({
          data: {
            message: `User ${data?.user?.FirstName} ${
              data?.user?.LastName
            } ${tapData?.message!}`,
            status: tapStatus,
          },
        })
      );
    }
  }, [tapStatus, tapData?.message]);

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
        SubscriptionExpectedEnd:
          user?.SubscriptionType === SUBSCRIPTIONS.SESSION
            ? "Expired when timeout"
            : advanceMonthlyEnd(),
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
  function toggleFocus() {
    inputRef?.current?.focus({ preventScroll: true });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
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
    isTapRfid,
    rfidData,
    setRfidData,
    setFocusable,
    onBlur,
    onFocus,
  };
};
export default useRFIDListen;
