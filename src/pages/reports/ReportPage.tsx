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
import {
  getAverageMonthlySalesByDate,
  getAverageSalesByDate,
  getAverageSessionSalesByDate,
  getTotalMonthlyUsersAttendanceByDate,
  getTotalSessionUsersAttendanceByDate,
  getTotalUserMonthlySalesByDate,
  getTotalUserSalesByDate,
  getTotalUserSessionSalesByDate,
  getTotalUsersAttendanceByDate,
} from "src/utils/functions/reports";
import {
  generateExcelAttendanceReport,
  generateExcelFinancialReport,
} from "src/utils/functions/generateFile";
import RenderRfidInput from "src/components/RenderRfidInput";
const ReportPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TGenerateSchema>({
    resolver: zodResolver(filterGenerateByDateSchema),
  });

  //generate reports - attendance
  const [
    filterAttendance,
    { data, isFetching, isUninitialized, originalArgs, error },
  ] = useGetAttendanceByDateMutation();

  //generate reports - financial
  const [filterFinancial, { data: financialRes }] =
    useGetAllUsersTransactionsByDateMutation();

  useEffect(() => {
    dispatch(setRoute("Reports"));
    dispatch(setAttendanceData(data?.result));
  }, []);

  //generate reports - attendance
  const totalUsers = getTotalUsersAttendanceByDate(data);
  const totalSessionUsers = getTotalSessionUsersAttendanceByDate(data);
  const totalMonthlyUsers = getTotalMonthlyUsersAttendanceByDate(data);

  //generate reports - financial
  const totalUserSalesByDate = getTotalUserSalesByDate(financialRes);
  const totalSessionUserSalesByDate =
    getTotalUserSessionSalesByDate(financialRes);
  const totalMonthlyUserSalesByDate =
    getTotalUserMonthlySalesByDate(financialRes);

  const averageSalesByDate = getAverageSalesByDate(financialRes);
  const averageSessionSalesByDate = getAverageSessionSalesByDate(financialRes);
  const averageMonthlySalesByDate = getAverageMonthlySalesByDate(financialRes);

  const attendanceArgs = {
    totalUsers: totalUsers,
    totalSessionUsers: totalSessionUsers,
    totalMonthlyUsers: totalMonthlyUsers,
  };
  const financialArgs = {
    totalSales: totalUserSalesByDate.toFixed(2),
    totalSessionSales: totalSessionUserSalesByDate.toFixed(2),
    totalMonthlySales: totalMonthlyUserSalesByDate.toFixed(2),
    averageSales: averageSalesByDate.toFixed(2),
    averageSessionSales: averageSessionSalesByDate.toFixed(2),
    averageMonthlySales: averageMonthlySalesByDate.toFixed(2),
  };

  const handleDateChange = (
    newDateValue: dayjs.Dayjs | null,
    onChange: (...event: any[]) => void
  ) => {
    const formatDate = dayjs(newDateValue).format("YYYY-MM-DD");
    onChange(formatDate);
    if (selectedValue === "Attendance Report") {
      filterAttendance({
        selectedDate: formatDate,
      });

      return;
    }
    filterFinancial({
      selectedDate: formatDate,
    });
  };

  const handleExcelAttendance = async () => {
    generateExcelAttendanceReport({ data: data });
  };
  const handleExcelFinancial = async () => {
    generateExcelFinancialReport({ data: financialRes });
  };

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
      }}
      alignItems={"center"}
    >
      <RenderRfidInput />
      <h1>GENERATE REPORTS</h1>
      <h3>Select Report Type</h3>

      <Stack width={"100%"}>
        <Controller
          name="reportType"
          control={control}
          render={({ field }) => (
            <Box component="div" sx={{ width: "15%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Report Type
                </InputLabel>
                <Select
                  {...field}
                  id="demo-simple-select-label"
                  label="reportType"
                  placeholder="Type of report"
                  required
                  error={errors.reportType && true}
                  onChange={(event) => {
                    setSelectedValue(event.target.value);
                    setValue("selectedDate", undefined);
                  }}
                >
                  <MenuItem value="Attendance Report">
                    Attendance Report
                  </MenuItem>
                  <MenuItem value="Financial Report">Financial Report</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        />

        <DisplayFormError errors={errors.reportType} />
        {selectedValue !== "" && (
          <React.Fragment>
            <Box component="div" sx={{ width: "15%" }}>
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
                    onChange={(newDateValue) =>
                      handleDateChange(newDateValue, onChange)
                    }
                  />
                )}
              />
            </Box>
          </React.Fragment>
        )}
        <DisplayFormError errors={errors.selectedDate} />
      </Stack>
      {selectedValue === "Attendance Report" &&
        getValues("selectedDate") !== undefined && (
          <React.Fragment>
            <h2>Preview</h2>
            <PDFViewer width="1000" height="550">
              <AttendanceReportPdfFile
                data={data?.result}
                {...attendanceArgs}
              />
            </PDFViewer>
            <br />

            <Button
              variant="contained"
              size="medium"
              color="success"
              onClick={handleExcelAttendance}
            >
              Download Excel File Attendance
            </Button>

            <PDFDownloadLink
              document={
                <AttendanceReportPdfFile
                  data={data?.result}
                  {...attendanceArgs}
                />
              }
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
            <h2>Preview</h2>
            <PDFViewer width="1000" height="550">
              <FinancialReportPdfFile
                data={financialRes?.result}
                {...financialArgs}
              />
            </PDFViewer>
            <br />
            <Button
              variant="contained"
              size="medium"
              color="success"
              onClick={handleExcelFinancial}
            >
              Download As Excel File
            </Button>

            <PDFDownloadLink
              document={
                <FinancialReportPdfFile
                  data={financialRes?.result}
                  {...financialArgs}
                />
              }
              fileName={`FINANCIAL_REPORT_FORM_${new Date().getTime()}`}
            >
              {({ loading }) => (
                <Button
                  variant="contained"
                  size="medium"
                  color={loading ? "warning" : "success"}
                >
                  {loading ? "Loading..." : "Download As Pdf File"}
                </Button>
              )}
            </PDFDownloadLink>
          </React.Fragment>
        )}
    </Box>
  );
};

export default ReportPage;
