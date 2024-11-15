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
import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import { formatCurrency } from "src/utils/functions/formatCurrency";
import {
  getAverageDailyMonthlyAttendees,
  getAverageDailyMonthlySales,
  getAverageDailySessionAttendees,
  getAverageDailySessionSales,
  getTotalDailyMonthlyAttendees,
  getTotalDailyMonthlySales,
  getTotalDailySessionAttendees,
  getTotalDailySessionSales,
} from "src/utils/functions/reports";

import { formatDate } from "src/utils/functions/date_fns";
import { NETWORK_ERROR } from "src/utils/constants/Errors";
import NetworkError from "src/components/NetworkError";
import { useUserOnline } from "src/hooks/useUserOnline";
import ServerError from "src/components/ServerError";
import HTTP_ERROR from "src/utils/enums/ERROR_CODES";
import NotAuthorized from "src/components/NotAuthorized";
import {
  IDailyAttendeesAnalytics,
  IDailyAttendeesData,
} from "src/utils/types/attendees_analytics.types";
import {
  useGetDailySessionUserAttendeesQuery,
  useGetDailyMonthlyUserAttendeesQuery,
} from "src/reducers/attendees_analytics";

const DailyAttendees = () => {
  const {
    data: sessionUserAttendees,
    error: sessionErr,
    status,
  } = useGetDailySessionUserAttendeesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: monthlyUserAttendees, error: monthlyErr } =
    useGetDailyMonthlyUserAttendeesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const monthlyUsers = monthlyUserAttendees?.result?.map(
    (item: IDailyAttendeesAnalytics) => item
  );
  const sessionUsers = sessionUserAttendees?.result?.map(
    (item: IDailyAttendeesAnalytics) => item
  );

  const { isOnline } = useUserOnline();

  const daily_attendees_data: Array<{
    date?: string;
    sessionUserAttendees?: number;
    monthlyUserAttendees?: number;
  }> = [];

  for (let i = 0; i <= 7; i++) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    let formatD = d.toISOString().split("T")[0];
    daily_attendees_data.push({
      date: new Date(formatDate(d)).toDateString(),
      sessionUserAttendees: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              formatD === mUsers.DateTapped.split(" ")[0]
          )
          .map((e) => e.TotalAttendees)
      ),
      monthlyUserAttendees: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              formatD === mUsers.DateTapped.split(" ")[0]
          )
          .map((e) => e.TotalAttendees)
      ),
    });
  }

  // const newArr =
  //   sessionUserSales?.result.length === 0
  //     ? monthlyUserSales?.result
  //     : sessionUserSales?.result;
  const newArr = sessionUsers?.length === 0 ? monthlyUsers : sessionUsers;

  const data: IDailyAttendeesData[] | undefined = newArr?.map(
    (item: IDailyAttendeesAnalytics) => ({
      Day: item.Day,
      DateTapped: item.DateTapped,
      sessionUserAttendees: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              item.DateTapped === mUsers.DateTapped
          )
          .map((e) => e.TotalAttendees)
      ),
      monthlyUserAttendees: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              mUsers.DateTapped === item.DateTapped
          )
          .map((e) => e.TotalAttendees)
      ),
    })
  );

  console.log(data);

  const totalDailyAttendeesBySession = getTotalDailySessionAttendees(data);
  const averageDailyAttendeesBySession = getAverageDailySessionAttendees(data);
  const totalDailyAttendeesByMonthly =
    getTotalDailyMonthlyAttendees(daily_attendees_data);
  const averageDailyAttendeesByMonthly = getAverageDailyMonthlyAttendees(data);
  const totalDailyAttendees =
    getTotalDailySessionAttendees(data) + getTotalDailyMonthlyAttendees(data);
  const averageDailyAttendees =
    (getTotalDailySessionAttendees(data) +
      getTotalDailyMonthlyAttendees(data)) /
    2;

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
          Total Attendees : {totalDailyAttendeesBySession}
          <Box component="div">
            Average Attendees : {averageDailyAttendeesBySession.toFixed(2)} %
          </Box>
        </Box>
        <Box component="div">
          <h2>MONTHLY</h2>
          Total Attendees : {totalDailyAttendeesByMonthly}
          <Box component="div">
            Average Attendees : {averageDailyAttendeesByMonthly.toFixed(2)} %
          </Box>
        </Box>
        <Box>
          <h2>TOTAL</h2>
          <Box component="div">Total : {totalDailyAttendees}</Box>
          <Box component="div">
            Average : {averageDailyAttendees.toFixed(2)} %
          </Box>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={daily_attendees_data.reverse()}
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
          data={daily_attendees_data}
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
    </Container>
  );
};

export default DailyAttendees;
