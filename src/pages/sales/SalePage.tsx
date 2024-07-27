import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "src/store/store";
import DailySales from "./DailySales";
import WeeklySales from "./WeeklySales";
import MonthlySales from "./MonthlySales";

const SalePage = () => {
  const dispatch: AppDispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");

  const activeFilter = useMemo(() => {
    if (selectedValue === "Daily") {
      return <DailySales />;
    }
    if (selectedValue === "Weekly") {
      return <WeeklySales />;
    }
    if (selectedValue === "Monthly") {
      return <MonthlySales />;
    }
  }, [selectedValue]);

  useEffect(() => {
    dispatch(setRoute("Sales"));
  }, []);

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <h1>SALES OVERVIEW</h1>
      <Stack width={"100%"}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Choose between daily, weekly, and monthly
          </InputLabel>
          <Select
            id="demo-simple-select-label"
            label="reportType"
            placeholder="Choose between daily, weekly, and monthly"
            required
            onChange={(event) => setSelectedValue(event.target.value)}
          >
            <MenuItem value="Daily">Daily Report</MenuItem>
            <MenuItem value="Weekly">Weekly Report</MenuItem>
            <MenuItem value="Monthly">Monthly Report</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <br />
      {activeFilter}
    </Box>
  );
};

export default SalePage;
