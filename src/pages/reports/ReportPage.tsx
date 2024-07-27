import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "src/store/store";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import AttendanceReportPdfFile from "./AttendanceReportPdfFile";
import {
  setAttendanceData,
  useGetAttendanceByDateMutation,
  useGetUsersAttendanceQuery,
} from "src/reducers/attendance";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DisplayFormError from "src/components/DisplayFormError";
import { Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TGenerateSchema,
  filterGenerateByDateSchema,
} from "src/utils/validations/generateReportSchema";
import FinancialReportPdfFile from "./FinancialReportPdfFile";
import { useGetAllUsersTransactionsByDateMutation } from "src/reducers/transaction";
import LoadingIndicator from "src/components/LoadingIndicator";
import DownloadIcon from "@mui/icons-material/Download";
const ReportPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<TGenerateSchema>({
    resolver: zodResolver(filterGenerateByDateSchema),
  });

  const [
    filterAttendance,
    { data, isFetching, isUninitialized, originalArgs, error },
  ] = useGetAttendanceByDateMutation();

  const [filterFinancial, { data: financialRes }] =
    useGetAllUsersTransactionsByDateMutation();
  useEffect(() => {
    dispatch(setRoute("Reports"));
    dispatch(setAttendanceData(data?.result));
  }, []);

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
      }}
      alignItems={"center"}
    >
      <h1>GENERATE REPORTS</h1>
      <h3>Select Report Type</h3>

      <Stack width={"100%"}>
        <Controller
          name="reportType"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Report Type</InputLabel>
              <Select
                {...field}
                id="demo-simple-select-label"
                label="reportType"
                placeholder="Type of report"
                required
                error={errors.reportType && true}
                onChange={(event) => setSelectedValue(event.target.value)}
              >
                <MenuItem value="Attendance Report">Attendance Report</MenuItem>
                <MenuItem value="Financial Report">Financial Report</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <DisplayFormError errors={errors.reportType} />
        {selectedValue !== "" && (
          <React.Fragment>
            <h3>Select date</h3>
            <Controller
              name="selectedDate"
              control={control}
              defaultValue={undefined}
              rules={{ required: true }}
              render={({ field: { onChange, value, ...restField } }) => (
                <DatePicker
                  {...restField}
                  value={dayjs(value)}
                  label="Date"
                  onChange={(newDateValue) => {
                    onChange(dayjs(newDateValue).format("YYYY-MM-DD"));

                    if (selectedValue === "Attendance Report") {
                      filterAttendance({
                        selectedDate: dayjs(newDateValue).format("YYYY-MM-DD"),
                      });
                      return;
                    }
                    filterFinancial({
                      selectedDate: dayjs(newDateValue).format("YYYY-MM-DD"),
                    });

                    console.log("your filtered data", data?.result);
                  }}
                />
              )}
            />
          </React.Fragment>
        )}
        <DisplayFormError errors={errors.selectedDate} />
      </Stack>
      {selectedValue === "Attendance Report" &&
        getValues("selectedDate") !== undefined && (
          <React.Fragment>
            <h2>PDF Document Preview</h2>
            <PDFViewer width="1000" height="550">
              <AttendanceReportPdfFile data={data?.result} />
            </PDFViewer>
            <br />

            <PDFDownloadLink
              document={<AttendanceReportPdfFile data={data?.result} />}
              fileName={`ATTENDANCE_REPORT_FORM_${new Date().getTime()}`}
            >
              {({ loading }) => (
                <Button
                  variant="contained"
                  size="medium"
                  color={loading ? "warning" : "success"}
                >
                  {loading ? "Loading..." : "Download"}
                </Button>
              )}
            </PDFDownloadLink>
          </React.Fragment>
        )}
      {selectedValue === "Financial Report" &&
        getValues("selectedDate") !== undefined && (
          <React.Fragment>
            <h2>PDF Document Preview</h2>
            <PDFViewer width="1000" height="550">
              <FinancialReportPdfFile data={financialRes?.result} />
            </PDFViewer>
            <br />

            <PDFDownloadLink
              document={<FinancialReportPdfFile data={financialRes?.result} />}
              fileName={`FINANCIAL_REPORT_FORM_${new Date().getTime()}`}
            >
              {({ loading }) => (
                <Button
                  variant="contained"
                  size="medium"
                  color={loading ? "warning" : "success"}
                >
                  {loading ? "Loading..." : "Download"}
                </Button>
              )}
            </PDFDownloadLink>
          </React.Fragment>
        )}
    </Box>
  );
};

export default ReportPage;
