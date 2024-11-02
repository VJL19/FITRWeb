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
import { ToastContainer } from "react-toastify";
import RenderRfidInput from "src/components/RenderRfidInput";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import delayShowToast from "src/utils/functions/delayToast";
import NetworkError from "src/components/NetworkError";
import { useUserOnline } from "src/hooks/useUserOnline";
import ServerError from "src/components/ServerError";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import NotAuthorized from "src/components/NotAuthorized";
import AttendanceReportPdfFile from "src/pages/reports/AttendanceReportPdfFile";
import FinancialReportPdfFile from "src/pages/reports/FinancialReportPdfFile";
const GenerateReport = ({ selectedValue }: { selectedValue: string }) => {
  const dispatch: AppDispatch = useDispatch();

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
  const [filterFinancial, { data: financialRes, error: financialErr }] =
    useGetAllUsersTransactionsByDateMutation();

  const { isOnline } = useUserOnline();

  useEffect(() => {
    const dynamicRoute =
      selectedValue === "Attendance Report"
        ? "Attendance_Reports"
        : "Transaction_Reports";
    dispatch(setRoute(dynamicRoute));
    dispatch(setAttendanceData(data?.result));
  }, []);

  console.log("filter attendance err", error);
  console.log("filter financial err", financialErr);

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

  const handleStartDate = (
    newDateValue: dayjs.Dayjs | null,
    onChange: (...event: any[]) => void
  ) => {
    const formatStartDate = dayjs(newDateValue).format("YYYY-MM-DD");
    onChange(formatStartDate);
  };

  const handleEndDate = (
    newDateValue: dayjs.Dayjs | null,
    onChange: (...event: any[]) => void
  ) => {
    const formatEndDate = dayjs(newDateValue).format("YYYY-MM-DD");
    onChange(formatEndDate);
    if (selectedValue === "Attendance Report") {
      filterAttendance({
        startDate: getValues("startDate"),
        endDate: formatEndDate,
      });

      return;
    }
    filterFinancial({
      startDate: getValues("startDate"),
      endDate: formatEndDate,
    });
  };

  const handleDateChange = (
    newDateValue: dayjs.Dayjs | null,
    onChange: (...event: any[]) => void
  ) => {
    const formatDate = dayjs(newDateValue).format("YYYY-MM-DD");
    onChange(formatDate);
  };

  const handleExcelAttendance = async () => {
    generateExcelAttendanceReport({ data: data });
  };
  const handleExcelFinancial = async () => {
    generateExcelFinancialReport({ data: financialRes });
  };

  if (
    (error?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) ||
    (financialErr?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline)
  ) {
    return <NetworkError />;
  }
  if (
    (error?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) ||
    (financialErr?.status === NETWORK_ERROR.FETCH_ERROR && isOnline)
  ) {
    return <ServerError />;
  }

  if (
    error?.status === HTTP_ERROR.UNAUTHORIZED ||
    financialErr?.status === HTTP_ERROR.UNAUTHORIZED
  ) {
    return <NotAuthorized />;
  }
  if (
    error?.status === HTTP_ERROR.BAD_REQUEST ||
    financialErr?.status === HTTP_ERROR.BAD_REQUEST
  ) {
    return <NotAuthorized />;
  }

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
      }}
      alignItems={"center"}
    >
      <RenderRfidInput />
      {selectedValue === "Attendance Report" ? (
        <h1>ATTENDANCE GENERATE REPORT</h1>
      ) : (
        <h1>FINANCIAL GENERATE REPORT</h1>
      )}

      <Stack
        width={"100%"}
        sx={{ display: "flex", flexDirection: "row", gap: 2.5 }}
      >
        {selectedValue !== "" && (
          <React.Fragment>
            <Box component="div" sx={{ width: "15%" }}>
              <h3>Select start date</h3>
              <Controller
                name="startDate"
                control={control}
                defaultValue={undefined}
                rules={{ required: true }}
                render={({ field: { onChange, value, ...restField } }) => (
                  <DatePicker
                    {...restField}
                    value={dayjs(value)}
                    label="Date"
                    onChange={(newDateValue) =>
                      handleStartDate(newDateValue, onChange)
                    }
                  />
                )}
              />
            </Box>
          </React.Fragment>
        )}
        <DisplayFormError errors={errors.startDate} />
        {selectedValue !== "" && (
          <React.Fragment>
            <Box component="div" sx={{ width: "15%" }}>
              <h3>Select end date</h3>
              <Controller
                name="endDate"
                control={control}
                defaultValue={undefined}
                rules={{ required: true }}
                render={({ field: { onChange, value, ...restField } }) => (
                  <DatePicker
                    {...restField}
                    value={dayjs(value)}
                    label="Date"
                    onChange={(newDateValue) =>
                      handleEndDate(newDateValue, onChange)
                    }
                  />
                )}
              />
            </Box>
          </React.Fragment>
        )}
        <DisplayFormError errors={errors.endDate} />
      </Stack>
      {selectedValue === "Attendance Report" &&
        getValues("startDate") !== undefined &&
        getValues("endDate") !== undefined &&
        error?.status !== NETWORK_ERROR.FETCH_ERROR && (
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
              Download As Excel File
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
                  {loading ? "Loading..." : "Download As PDF File"}
                </Button>
              )}
            </PDFDownloadLink>
          </React.Fragment>
        )}
      {selectedValue === "Financial Report" &&
        getValues("startDate") !== undefined &&
        getValues("endDate") !== undefined &&
        financialErr?.status !== NETWORK_ERROR.FETCH_ERROR && (
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
                  {loading ? "Loading..." : "Download As PDF File"}
                </Button>
              )}
            </PDFDownloadLink>
          </React.Fragment>
        )}
      <ToastContainer containerId={"toast_generateReport"} />
    </Box>
  );
};

export default GenerateReport;
