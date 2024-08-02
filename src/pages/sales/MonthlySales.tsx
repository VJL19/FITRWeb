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
  useGetMonthlySessionUserSalesMutation,
  useGetMonthlyMUserSalesMutation,
} from "src/reducers/sales_analytics";
import { IMonthlySalesAnalytics } from "src/utils/types/sales_analytics.types";

const MonthlySales = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [getSessionUsers, { data: sessionUserSales }] =
    useGetMonthlySessionUserSalesMutation();
  const [getMonthlyUsers, { data: monthlyUserSales }] =
    useGetMonthlyMUserSalesMutation();

  const monthlyUsers = monthlyUserSales?.result?.map(
    (item: IMonthlySalesAnalytics) => item
  );
  const data = sessionUserSales?.result?.map(
    (item: IMonthlySalesAnalytics) => ({
      Months: item.Months,
      sessionUserSales: item.TotalSalesPerMonth,
      monthlyUserSales: Number(
        monthlyUsers
          ?.filter((mUsers) => mUsers.Months === item.Months)
          .map((e) => e.TotalSalesPerMonth)
      ),
    })
  );

  let year_items = [];

  for (let i = 2003; i <= 2050; i++) {
    year_items.push(i);
  }

  return (
    <Container sx={{ height: 450 }}>
      <FormControl sx={{ width: "10%" }}>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          id="demo-simple-select-label"
          label="reportType"
          placeholder="Select year"
          required
          defaultValue={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
            getSessionUsers({ selectedYear: event.target.value });
            getMonthlyUsers({ selectedYear: event.target.value });
          }}
        >
          {year_items.map((year_item) => (
            <MenuItem value={year_item}>{year_item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedValue !== "" && (
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
              <XAxis dataKey="Months" />
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
              <XAxis dataKey="Months" />
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
      )}
    </Container>
  );
};

export default MonthlySales;
