import {
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
import { IWeeklySalesAnalytics } from "src/utils/types/sales_analytics.types";

const WeeklySales = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [getWeeklySession, { data: sessionUserSales }] =
    useGetWeeklySessionUserSalesMutation();
  const [getWeeklyMonthly, { data: monthlyUserSales }] =
    useGetWeeklyMonthlyUserSalesMutation();
  const monthlyUsers = monthlyUserSales?.result?.map(
    (item: IWeeklySalesAnalytics) => item
  );
  const data = sessionUserSales?.result?.map(
    (item: IWeeklySalesAnalytics, index: number) => ({
      Week: `Week ${index + 1}`,
      sessionUserSales: item.TotalSalesPerWeek,
      monthlyUserSales: Number(
        monthlyUsers
          ?.filter((mUsers) => mUsers.Week === item.Week)
          .map((e) => e.TotalSalesPerWeek)
      ),
    })
  );

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
            getWeeklySession({ selectedMonth: event.target.value });
            getWeeklyMonthly({ selectedMonth: event.target.value });
          }}
        >
          {MONTHS.map((month: string) => (
            <MenuItem value={month}>{month}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <React.Fragment>
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
            <XAxis dataKey="Week" />
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
            <XAxis dataKey="Week" />
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
      </React.Fragment>
    </Container>
  );
};

export default WeeklySales;
