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
import RenderRfidInput from "src/components/RenderRfidInput";
import DailySales from "src/pages/sales/Daily/DailySales";
import MonthlySales from "src/pages/sales/Monthly/MonthlySales";
import WeeklySales from "src/pages/sales/Weekly/WeeklySales";
import DailyAttendees from "src/pages/reports/attendees/DailyAttendees";
import WeeklyAttendees from "src/pages/reports/attendees/WeeklyAttendees";
import MonthlyAttendees from "src/pages/reports/attendees/MonthlyAttendees";

const Analytics = ({ selectedItem }: { selectedItem: string }) => {
  const dispatch: AppDispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState<string | undefined>("");

  const activeFilter = useMemo(() => {
    if (selectedValue === "Daily" && selectedItem === "Sales") {
      return <DailySales />;
    }
    if (selectedValue === "Weekly" && selectedItem === "Sales") {
      return <WeeklySales />;
    }
    if (selectedValue === "Monthly" && selectedItem === "Sales") {
      return <MonthlySales />;
    }
    if (selectedValue === "Daily" && selectedItem === "Attendance") {
      return <DailyAttendees />;
    }
    if (selectedValue === "Weekly" && selectedItem === "Attendance") {
      return <WeeklyAttendees />;
    }
    if (selectedValue === "Monthly" && selectedItem === "Attendance") {
      return <MonthlyAttendees />;
    }
  }, [selectedValue]);

  useEffect(() => {
    const dynamicRoutes =
      selectedItem === "Sales"
        ? "Transaction_Analytics"
        : "Attendance_Analytics";
    dispatch(setRoute(dynamicRoutes));
  }, []);

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <RenderRfidInput />
      {selectedItem === "Sales" && <h1>SALES OVERVIEW</h1>}
      {selectedItem === "Attendance" && <h1>ATTENDANCE OVERVIEW</h1>}
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

export default Analytics;
