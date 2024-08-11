import { Box, Container } from "@mui/material";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import {
  useGetTodayMonthlyUserSalesQuery,
  useGetTodaySessionUserSalesQuery,
} from "src/reducers/sales_analytics";
import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import { formatCurrency } from "src/utils/functions/formatCurrency";
import {
  getAverageTodayMonthlySales,
  getAverageTodaySessionSales,
  getTotalTodayMonthlySales,
  getTotalTodaySessionSales,
} from "src/utils/functions/reports";
import {
  ITodaySalesAnalytics,
  ITodaySalesData,
} from "src/utils/types/sales_analytics.types";

const TodaySales = () => {
  const { data: sessionUserSales } = useGetTodaySessionUserSalesQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const { data: monthlyUserSales } = useGetTodayMonthlyUserSalesQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const sessionUsers = sessionUserSales?.result?.map(
    (item: ITodaySalesAnalytics) => item
  );

  const monthlyUsers = monthlyUserSales?.result?.map(
    (item: ITodaySalesAnalytics) => item
  );

  const newArr =
    sessionUserSales?.result.length === 0
      ? monthlyUserSales?.result
      : sessionUserSales?.result;
  const data: ITodaySalesData[] | undefined = newArr?.map(
    (item: ITodaySalesAnalytics, index: number) => ({
      Hours: `${4 * (index + 1)} hrs ago`,
      TotalSalesPer4Hr: item.TotalSalesPer4Hr,
      SubscriptionEntryDate: item.SubscriptionEntryDate,
      sessionUserSales: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              mUsers.Hours === item.Hours
          )
          .map((e) => e.TotalSalesPer4Hr)
      ),
      monthlyUserSales: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              mUsers.Hours === item.Hours
          )
          .map((e) => e.TotalSalesPer4Hr)
      ),
    })
  );

  const totalTodaySalesBySession = getTotalTodaySessionSales(data);
  const averageTodaySalesBySession = getAverageTodaySessionSales(data);
  const totalTodaySalesByMonthly = getTotalTodayMonthlySales(data);
  const averageTodaySalesByMonthly = getAverageTodayMonthlySales(data);
  const totalTodaySales =
    getTotalTodaySessionSales(data) + getTotalTodayMonthlySales(data);
  const averageTodaySales = totalTodaySales / 2;
  console.log(data);

  return (
    <React.Fragment>
      <h2>TODAYS SALE</h2>

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
          Total Sales : {formatCurrency(totalTodaySalesBySession)} PHP
          <Box component="div">
            Average Sales : {formatCurrency(averageTodaySalesBySession)} PHP
          </Box>
        </Box>
        <Box component="div">
          <h2>MONTHLY</h2>
          <Box component="div">
            Total Sales : {formatCurrency(totalTodaySalesByMonthly)} PHP
          </Box>
          <Box component="div">
            Average Sales : {formatCurrency(averageTodaySalesByMonthly)} PHP
          </Box>
        </Box>
        <Box component="div">
          <h2>TOTAL</h2>
          <Box component="div">
            Total : {formatCurrency(totalTodaySales)} PHP
          </Box>
          <Box component="div">
            Average : {formatCurrency(averageTodaySales)} PHP
          </Box>
        </Box>
      </Box>

      <Container sx={{ display: "flex", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data?.reverse()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Hours" />
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
      </Container>
    </React.Fragment>
  );
};

export default TodaySales;
