import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "src/store/store";
import DailySales from "./Daily/DailySales";
import WeeklySales from "./Weekly/WeeklySales";
import MonthlySales from "./Monthly/MonthlySales";
import RenderRfidInput from "src/components/RenderRfidInput";
import DailyAttendees from "../reports/attendees/DailyAttendees";
import WeeklyAttendees from "../reports/attendees/WeeklyAttendees";
import MonthlyAttendees from "../reports/attendees/MonthlyAttendees";

const SalePage = () => {
  const dispatch: AppDispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState<string | undefined>("");

  const activeFilter = useMemo(() => {
    if (selectedValue === "Daily") {
      return <DailyAttendees />;
    }
    if (selectedValue === "Weekly") {
      return <WeeklyAttendees />;
    }
    if (selectedValue === "Monthly") {
      return <MonthlyAttendees />;
    }
  }, [selectedValue]);

  useEffect(() => {
    dispatch(setRoute("Sales"));
  }, []);

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <RenderRfidInput />
      <h1>SALES OVERVIEW</h1>
      <Stack width={"100%"}>
        <Box sx={{ width: "35%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Choose between daily, weekly, and monthly
            </InputLabel>
            <Select
              id="demo-simple-select-label"
              label="reportType"
              placeholder="Choose between daily, weekly, and monthly"
              required
              onChange={(event: SelectChangeEvent<string>) =>
                setSelectedValue(event.target.value)
              }
            >
              <MenuItem value="Daily">Daily Report</MenuItem>
              <MenuItem value="Weekly">Weekly Report</MenuItem>
              <MenuItem value="Monthly">Monthly Report</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <br />
      {activeFilter}
    </Box>
  );
};

export default SalePage;
