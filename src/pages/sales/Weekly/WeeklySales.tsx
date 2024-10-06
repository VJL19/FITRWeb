import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import {
  useGetWeeklySessionUserSalesMutation,
  useGetWeeklyMonthlyUserSalesMutation,
} from "src/reducers/sales_analytics";
import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import { formatCurrency } from "src/utils/functions/formatCurrency";
import {
  getAverageWeeklyMonthlySales,
  getAverageWeeklySessionSales,
  getTotalWeeklyMonthlySales,
  getTotalWeeklySessionSales,
} from "src/utils/functions/reports";
import {
  IWeeklySalesAnalytics,
  IWeeklySalesData,
} from "src/utils/types/sales_analytics.types";
import WeeklyGrowthRate from "./WeeklyGrowthRate";
import NetworkError from "src/components/NetworkError";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import { useUserOnline } from "src/hooks/useUserOnline";
import ServerError from "src/components/ServerError";

const WeeklySales = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [getWeeklySession, { data: sessionUserSales, error: sessionErr }] =
    useGetWeeklySessionUserSalesMutation();
  const [getWeeklyMonthly, { data: monthlyUserSales, error: monthlyErr }] =
    useGetWeeklyMonthlyUserSalesMutation();
  const monthlyUsers = monthlyUserSales?.result?.map(
    (item: IWeeklySalesAnalytics, index) => ({
      ...item,
      Weeks: `Week ${index + 1}`,
      monthlyUserSales: item.TotalSalesPerWeek,
    })
  );

  const { isOnline } = useUserOnline();

  const sessionUsers = sessionUserSales?.result?.map(
    (item: IWeeklySalesAnalytics, index) => ({
      ...item,
      Weeks: `Week ${index + 1}`,
      sessionUserSales: item.TotalSalesPerWeek,
    })
  );
  const newArr =
    sessionUserSales?.result.length === 0
      ? monthlyUserSales?.result
      : sessionUserSales?.result?.length! > monthlyUserSales?.result.length!
      ? sessionUserSales?.result
      : monthlyUserSales?.result?.length! > sessionUserSales?.result.length!
      ? monthlyUserSales?.result
      : sessionUserSales?.result;

  const data: IWeeklySalesData[] | undefined = newArr?.map(
    (item: IWeeklySalesAnalytics, index: number) => ({
      Week: `Week ${index + 1}`,
      SubscriptionType: item.SubscriptionType,
      sessionUserSales: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              mUsers.Week === item.Week
          )
          .map((e) => e.TotalSalesPerWeek)
      ),

      monthlyUserSales: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              mUsers.Week === item.Week
          )
          .map((e) => e.TotalSalesPerWeek)
      ),
    })
  );

  console.log(newArr?.length);

  const totalWeeklySalesBySession = getTotalWeeklySessionSales(data);
  const averageWeeklySalesBySession = getAverageWeeklySessionSales(data);
  const totalWeeklySalesByMonthly = getTotalWeeklyMonthlySales(data);
  const averageWeeklySalesByMonthly = getAverageWeeklyMonthlySales(data);
  const totalWeeklySales =
    getTotalWeeklySessionSales(data) + getTotalWeeklyMonthlySales(data);
  const averageWeeklySales =
    (getTotalWeeklySessionSales(data) + getTotalWeeklyMonthlySales(data)) / 5;
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (
    (sessionErr?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline) ||
    (monthlyErr?.status === NETWORK_ERROR.FETCH_ERROR && !isOnline)
  ) {
    return <NetworkError />;
  }
  if (
    (sessionErr?.status === NETWORK_ERROR.FETCH_ERROR && isOnline) ||
    (monthlyErr?.status === NETWORK_ERROR.FETCH_ERROR && isOnline)
  ) {
    return <ServerError />;
  }
  return (
    <Container sx={{ height: 450 }}>
      <FormControl sx={{ width: "10%" }}>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          id="demo-simple-select-label"
          label="reportType"
          placeholder="Select month"
          required
          defaultValue={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
            getWeeklySession({ selectedMonth: event.target.value });
            getWeeklyMonthly({ selectedMonth: event.target.value });
          }}
        >
          {MONTHS.map((month: string) => (
            <MenuItem value={month}>{month}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedValue !== "" && (
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box component="div">
              <h2>SESSION</h2>
              Total Sales : {formatCurrency(totalWeeklySalesBySession)} PHP
              <Box component="div">
                Average : {formatCurrency(averageWeeklySalesBySession)} PHP
              </Box>
            </Box>
            <Box component="div">
              <h2>MONTHLY</h2>
              Total Sales : {formatCurrency(totalWeeklySalesByMonthly)} PHP
              <Box component="div">
                Average : {formatCurrency(averageWeeklySalesByMonthly)} PHP
              </Box>
            </Box>
            <Box component="div">
              <h2>TOTAL</h2>
              Total : {formatCurrency(totalWeeklySales)} PHP
              <Box component="div">
                Average Sales Per Week: {formatCurrency(averageWeeklySales)} PHP
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      )}

      {selectedValue !== "" && (
        <React.Fragment>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              width={500}
              height={300}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={"Week"} />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sessionUserSales"
                stroke="#202020"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="monthlyUserSales"
                stroke="#ff2e00"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Week" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar
                dataKey="sessionUserSales"
                fill="#202020"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="monthlyUserSales"
                fill="#ff2e00"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </React.Fragment>
      )}
      <WeeklyGrowthRate selectedValue={selectedValue} />
    </Container>
  );
};

export default WeeklySales;
