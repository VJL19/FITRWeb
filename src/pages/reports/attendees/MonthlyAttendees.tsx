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
  useGetMonthlySessionUserAttendeesMutation,
  useGetMonthlyMUserAttendeesMutation,
} from "src/reducers/attendees_analytics";
import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import { formatCurrency } from "src/utils/functions/formatCurrency";
import {
  getAverageMonthlyMAttendees,
  getAverageMonthlyMSales,
  getAverageMonthlySessionAttendees,
  getAverageMonthlySessionSales,
  getTotalMonthlyMAttendees,
  getTotalMonthlyMSales,
  getTotalMonthlySessionAttendees,
  getTotalMonthlySessionSales,
} from "src/utils/functions/reports";

import NetworkError from "src/components/NetworkError";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import { useUserOnline } from "src/hooks/useUserOnline";
import ServerError from "src/components/ServerError";
import NotAuthorized from "src/components/NotAuthorized";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import {
  IMonthlyAttendeesAnalytics,
  IMonthlyAttendeesData,
} from "src/utils/types/attendees_analytics.types";

const MonthlyAttendees = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [getSessionUsers, { data: sessionUserAttendees, error: sessionErr }] =
    useGetMonthlySessionUserAttendeesMutation();
  const [getMonthlyUsers, { data: monthlyUserAttendees, error: monthlyErr }] =
    useGetMonthlyMUserAttendeesMutation();

  const { isOnline } = useUserOnline();

  const monthlyUsers = monthlyUserAttendees?.result?.map(
    (item: IMonthlyAttendeesAnalytics) => item
  );
  const sessionUsers = sessionUserAttendees?.result?.map(
    (item: IMonthlyAttendeesAnalytics) => item
  );
  let year_items = [];

  const newArr = sessionUsers?.length === 0 ? monthlyUsers : sessionUsers;

  const data: IMonthlyAttendeesData[] | undefined = newArr?.map(
    (item: IMonthlyAttendeesAnalytics) => ({
      Months: item.Months,
      sessionUserAttendees: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              mUsers.Months === item.Months
          )
          .map((e) => e.TotalAttendees)
      ),
      monthlyUserAttendees: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              mUsers.Months === item.Months
          )
          .map((e) => e.TotalAttendees)
      ),
    })
  );

  for (let i = 2003; i <= 2050; i++) {
    year_items.push(i);
  }

  const totalMonthlyAttendeesBySession = getTotalMonthlySessionAttendees(data);
  const averageMonthlyAttendeesBySession =
    getAverageMonthlySessionAttendees(data);
  const totalMonthlyAttendeesByMonthly = getTotalMonthlyMAttendees(data);
  const averageMonthlyAttendeesByMonthly = getAverageMonthlyMAttendees(data);
  const totalMonthlyAttendees =
    getTotalMonthlySessionAttendees(data) + getTotalMonthlyMAttendees(data);
  const averageMonthlyAttendees =
    (getTotalMonthlySessionAttendees(data) + getTotalMonthlyMAttendees(data)) /
    12;

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
              Total Attendees : {totalMonthlyAttendeesBySession}
              <Box component="div">
                Average: {averageMonthlyAttendeesBySession} %
              </Box>
            </Box>
            <Box component="div">
              <h2>MONTHLY</h2>
              Total Attendees : {totalMonthlyAttendeesByMonthly}
              <Box component="div">
                Average: {averageMonthlyAttendeesByMonthly} %
              </Box>
            </Box>
            <Box component="div">
              <h2>TOTAL</h2>
              Total : {totalMonthlyAttendees}
              <Box component="div">
                Average Attendees Per Month:
                {averageMonthlyAttendees} %
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      )}

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
              <XAxis dataKey="Months" />
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

export default MonthlyAttendees;
