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
import DailyGrowthRate from "./DailyGrowthRate";
import { formatDate } from "src/utils/functions/date_fns";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import NetworkError from "src/components/NetworkError";
import { useUserOnline } from "src/hooks/useUserOnline";
import ServerError from "src/components/ServerError";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import NotAuthorized from "src/components/NotAuthorized";

const DailySales = () => {
  const { data: sessionUserSales, error: sessionErr } =
    useGetDailySessionUserSalesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const { data: monthlyUserSales, error: monthlyErr } =
    useGetDailyMonthlyUserSalesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const monthlyUsers = monthlyUserSales?.result?.map(
    (item: IDailySalesAnalytics) => item
  );
  const sessionUsers = sessionUserSales?.result?.map(
    (item: IDailySalesAnalytics) => item
  );
  const { isOnline } = useUserOnline();

  const daily_sales_data: Array<{
    date?: string;
    sessionUserSales?: number;
    monthlyUserSales?: number;
  }> = [];

  for (let i = 0; i < 7; i++) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    let formatD = d.toISOString().split("T")[0];
    daily_sales_data.push({
      date: new Date(formatDate(d)).toDateString(),
      sessionUserSales: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              formatD === mUsers.SubscriptionEntryDate.split(" ")[0]
          )
          .map((e) => e.TotalSales)
      ),
      monthlyUserSales: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              formatD === mUsers.SubscriptionEntryDate.split(" ")[0]
          )
          .map((e) => e.TotalSales)
      ),
    });
  }

  // const newArr =
  //   sessionUserSales?.result.length === 0
  //     ? monthlyUserSales?.result
  //     : sessionUserSales?.result;
  const newArr = sessionUsers?.length === 0 ? monthlyUsers : sessionUsers;

  console.log(daily_sales_data.length);
  const data: IDailySalesData[] | undefined = newArr?.map(
    (item: IDailySalesAnalytics) => ({
      Day: item.Day,
      SubscriptionEntryDate: item.SubscriptionEntryDate,
      sessionUserSales: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              item.Day === mUsers.Day
          )
          .map((e) => e.TotalSales)
      ),
      monthlyUserSales: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              item.Day === mUsers.Day
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
  if (
    sessionErr?.status === HTTP_ERROR.UNAUTHORIZED ||
    monthlyErr?.status === HTTP_ERROR.UNAUTHORIZED
  ) {
    return <NotAuthorized />;
  }
  if (
    sessionErr?.status === HTTP_ERROR.BAD_REQUEST ||
    monthlyErr?.status === HTTP_ERROR.BAD_REQUEST
  ) {
    return <NotAuthorized />;
  }

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
          data={daily_sales_data.reverse()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" allowDuplicatedCategory={false} />
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
          data={daily_sales_data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
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
      <DailyGrowthRate />
    </Container>
  );
};

export default DailySales;
