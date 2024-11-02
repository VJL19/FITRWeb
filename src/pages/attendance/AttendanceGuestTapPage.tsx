import { Container, Stack, TextField } from "@mui/material";
import { gridVirtualizationColumnEnabledSelector } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderRfidInput from "src/components/RenderRfidInput";
import useRFIDListen from "src/hooks/useRFIDListen";
import { useGetAccessWebTokenQuery } from "src/reducers/login";
import { setUserTempRfidNumber } from "src/reducers/users";
import { AppDispatch, RootState } from "src/store/store";

const AttendanceGuestTapPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(true);

  const { RFIDNumber } = useSelector(
    (state: RootState) => state.user.adminAccountData
  );

  useEffect(() => {
    if (value.length === 0 || value.length < 10) {
      setIsFocus(false);
    }
  }, [value, isFocus]);

  return (
    <Container maxWidth="md">
      <h1>GUEST TAP USING SPARE ADMIN CARD</h1>
      <p>
        Please input below the forgotten RFID card. Users can see their assigned
        RFID Number in mobile through attendance module
      </p>
      {isFocus && <RenderRfidInput />}
      <Stack width={"100%"}>
        <Stack
          width={"100%"}
          onMouseOver={() => {
            setIsFocus(false);
            const input = document.querySelector("#rfidInput");
            input?.setAttribute("disabled", "true");
          }}
          onMouseOut={() => {
            setIsFocus(true);
            const input = document.querySelector("#rfidInput");
            input?.removeAttribute("disabled");
          }}
        >
          <TextField
            inputProps={{ type: "number" }}
            required
            autoFocus
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              const inputRfidNumber = event.target.value;
              setValue(inputRfidNumber);
              if (inputRfidNumber.length === 10) {
                if (inputRfidNumber === RFIDNumber) {
                  dispatch(setUserTempRfidNumber(RFIDNumber));
                } else {
                  dispatch(setUserTempRfidNumber(inputRfidNumber));
                }
                console.log("rfid in the input", inputRfidNumber);
              }
              if (inputRfidNumber.length === 0) {
                const input = document.querySelector("#rfidInput");
                input?.setAttribute("disabled", "true");
              }
              dispatch(setUserTempRfidNumber(inputRfidNumber));
            }}
            label="RFID Card Number"
            placeholder="Enter the rfid number of the user who forgot the card"
            sx={{ width: "100%" }}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default AttendanceGuestTapPage;
