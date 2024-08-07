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
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import {
  useGetDailySessionUserSalesQuery,
  useGetDailyMonthlyUserSalesQuery,
} from "src/reducers/sales_analytics";
import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import { formatCurrency } from "src/utils/functions/formatCurrency";
import {
  getAverageDailyMonthlySales,
  getAverageDailySessionSales,
  getTotalDailyMonthlySales,
  getTotalDailySessionSales,
} from "src/utils/functions/reports";
import {
  IDailySalesAnalytics,
  IDailySalesData,
} from "src/utils/types/sales_analytics.types";

const DailySales = () => {
  const { data: sessionUserSales } = useGetDailySessionUserSalesQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const { data: monthlyUserSales } = useGetDailyMonthlyUserSalesQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const monthlyUsers = monthlyUserSales?.result?.map(
    (item: IDailySalesAnalytics) => item
  );
  const sessionUsers = sessionUserSales?.result?.map(
    (item: IDailySalesAnalytics) => item
  );

  const newArr =
    sessionUserSales?.result.length === 0
      ? monthlyUserSales?.result
      : sessionUserSales?.result;
  const data: IDailySalesData[] | undefined = newArr?.map(
    (item: IDailySalesAnalytics) => ({
      Day: item.Day,
      SubscriptionEntryDate: item.SubscriptionEntryDate,
      sessionUserSales: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION && item.Day
          )
          .map((e) => e.TotalSales)
      ),
      monthlyUserSales: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY && item.Day
          )
          .map((e) => e.TotalSales)
      ),
    })
  );

  const totalDailySalesBySession = getTotalDailySessionSales(data);
  const averageDailySalesBySession = getAverageDailySessionSales(data);
  const totalDailySalesByMonthly = getTotalDailyMonthlySales(data);
  const averageDailySalesByMonthly = getAverageDailyMonthlySales(data);
  const totalDailySales =
    getTotalDailySessionSales(data) + getTotalDailyMonthlySales(data);
  const averageDailySales =
    (getTotalDailySessionSales(data) + getTotalDailyMonthlySales(data)) / 2;

  return (
    <Container sx={{ height: 450 }}>
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
          Total Sales : {formatCurrency(totalDailySalesBySession)} PHP
          <Box component="div">
            Average Sales : {formatCurrency(averageDailySalesBySession)} PHP
          </Box>
        </Box>
        <Box component="div">
          <h2>MONTHLY</h2>
          Total Sales : {formatCurrency(totalDailySalesByMonthly)} PHP
          <Box component="div">
            Average Sales : {formatCurrency(averageDailySalesByMonthly)} PHP
          </Box>
        </Box>
        <Box>
          <h2>TOTAL</h2>
          <Box component="div">
            Total : {formatCurrency(totalDailySales)} PHP
          </Box>
          <Box component="div">
            Average : {formatCurrency(averageDailySales)} PHP
          </Box>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="SubscriptionEntryDate" />
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
          <XAxis dataKey="SubscriptionEntryDate" />
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
    </Container>
  );
};

export default DailySales;
