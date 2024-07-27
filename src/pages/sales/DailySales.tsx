import { Container } from "@mui/material";
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
import { IDailySalesAnalytics } from "src/utils/types/sales_analytics.types";

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
  const data = sessionUserSales?.result?.map((item: IDailySalesAnalytics) => ({
    Day: item.Day,
    SubscriptionEntryDate: item.SubscriptionEntryDate,
    sessionUserSales: item.TotalSales,
    monthlyUserSales: Number(
      monthlyUsers
        ?.filter(
          (mUsers) =>
            mUsers.SubscriptionEntryDate === item.SubscriptionEntryDate
        )
        .map((e) => e.TotalSales)
    ),
  }));
  return (
    <Container sx={{ height: 450 }}>
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
          <YAxis />
          <Tooltip />
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
          <YAxis />
          <Tooltip />
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
