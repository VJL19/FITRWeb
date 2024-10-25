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

import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import { formatCurrency } from "src/utils/functions/formatCurrency";
import {
  getAverageWeeklyMonthlyAttendees,
  getAverageWeeklyMonthlySales,
  getAverageWeeklySessionAttendees,
  getAverageWeeklySessionSales,
  getTotalWeeklyMonthlyAttendees,
  getTotalWeeklyMonthlySales,
  getTotalWeeklySessionAttendees,
  getTotalWeeklySessionSales,
} from "src/utils/functions/reports";
import {
  IWeeklyAttendeesAnalytics,
  IWeeklyAttendeesData,
} from "src/utils/types/attendees_analytics.types";
import NetworkError from "src/components/NetworkError";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import { useUserOnline } from "src/hooks/useUserOnline";
import ServerError from "src/components/ServerError";
import NotAuthorized from "src/components/NotAuthorized";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import {
  useGetWeeklyMonthlyUserAttendeesMutation,
  useGetWeeklySessionUserAttendeesMutation,
} from "src/reducers/attendees_analytics";

const WeeklyAttendees = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [getWeeklySession, { data: sessionUserAttendees, error: sessionErr }] =
    useGetWeeklySessionUserAttendeesMutation();
  const [getWeeklyMonthly, { data: monthlyUserAttendees, error: monthlyErr }] =
    useGetWeeklyMonthlyUserAttendeesMutation();

  const { isOnline } = useUserOnline();

  const sessionUsers = sessionUserAttendees?.result?.map(
    (item: IWeeklyAttendeesAnalytics, index) => ({
      ...item,
      Week: `Week ${index + 1}`,
      sessionUserAttendees: item.TotalAttendees,
    })
  );
  const monthlyUsers = monthlyUserAttendees?.result?.map(
    (item: IWeeklyAttendeesAnalytics, index) => ({
      ...item,
      Week: `Week ${index + 1}`,
      monthlyUserAttendees: item.TotalAttendees,
    })
  );

  const newArr =
    sessionUsers?.length === 0
      ? monthlyUsers
      : sessionUsers?.length! > monthlyUsers?.length!
      ? sessionUsers
      : monthlyUsers?.length! > sessionUsers?.length!
      ? monthlyUsers
      : sessionUsers;

  const data: IWeeklyAttendeesData[] | undefined = newArr?.map(
    (item: IWeeklyAttendeesAnalytics, index: number) => ({
      SubscriptionType: item.SubscriptionType,
      Week: `Week ${index + 1}`,
      sessionUserAttendees: Number(
        sessionUsers
          ?.filter(
            (sessUsers) =>
              sessUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              sessUsers.Week === item.Week
          )
          .map((e) => e.TotalAttendees)
      ),

      monthlyUserAttendees: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              mUsers.Week === item.Week
          )
          .map((e) => e.TotalAttendees)
      ),
    })
  );

  console.log("hey", newArr);

  const totalWeeklyAttendeesBySession = getTotalWeeklySessionAttendees(data);
  const averageWeeklyAttendeesBySession =
    getAverageWeeklySessionAttendees(data);
  const totalWeeklyAttendeesByMonthly = getTotalWeeklyMonthlyAttendees(data);
  const averageWeeklyAttendeesByMonthly =
    getAverageWeeklyMonthlyAttendees(data);
  const totalWeeklyAttendees =
    getTotalWeeklySessionAttendees(data) + getTotalWeeklyMonthlyAttendees(data);
  const averageWeeklyAttendees =
    (getTotalWeeklySessionAttendees(data) +
      getTotalWeeklyMonthlyAttendees(data)) /
    5;
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
              Total Attendees : {totalWeeklyAttendeesBySession}
              <Box component="div">
                Average Attendees: {averageWeeklyAttendeesBySession} %
              </Box>
            </Box>
            <Box component="div">
              <h2>MONTHLY</h2>
              Total Attendees : {totalWeeklyAttendeesByMonthly}
              <Box component="div">
                Average Attendees: {averageWeeklyAttendeesByMonthly} %
              </Box>
            </Box>
            <Box component="div">
              <h2>TOTAL</h2>
              Total : {totalWeeklyAttendees}
              <Box component="div">
                Average Attendees Per Week: {averageWeeklyAttendees} %
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
                dataKey="sessionUserAttendees"
                stroke="#202020"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="monthlyUserAttendees"
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
                dataKey="sessionUserAttendees"
                fill="#202020"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="monthlyUserAttendees"
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

export default WeeklyAttendees;
