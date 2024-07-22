import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "src/store/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  Rectangle,
} from "recharts";
import {
  useGetDailySessionUserSalesQuery,
  useGetDailyMonthlyUserSalesQuery,
} from "src/reducers/sales_analytics";
import { IDailySalesAnalytics } from "src/utils/types/sales_analytics.types";

const weekly_data = [
  {
    name: "Sunday",
    session: 2000,
    monthly: 4000,
    amt: 2400,
  },
  {
    name: "Monday",
    session: 2000,
    monthly: 3000,
    amt: 2210,
  },
  {
    name: "Tuesday",
    session: 2000,
    monthly: 2000,
    amt: 2290,
  },
  {
    name: "Wednesday",
    session: 2000,
    monthly: 2780,
    amt: 2000,
  },
  {
    name: "Thursday",
    session: 2000,
    monthly: 1890,
    amt: 2181,
  },
  {
    name: "Friday",
    session: 2000,
    monthly: 2390,
    amt: 2500,
  },
  {
    name: "Saturday",

    session: 2000,
    monthly: 3490,
    amt: 2100,
  },
];
const SalePage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: sessionUserSales } = useGetDailySessionUserSalesQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const { data: monthlyUserSales } = useGetDailyMonthlyUserSalesQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispatch(setRoute("Sales"));
  }, []);

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

  console.log(data);
  return (
    <Container sx={{ height: 450 }}>
      <h1>SALES OVERVIEW</h1>
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
          <XAxis dataKey="Day" />
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
          <XAxis dataKey="name" />
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

export default SalePage;
