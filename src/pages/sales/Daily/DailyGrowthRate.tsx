import { Box, Container } from "@mui/material";
import {
  useGetDailySessionUserGrowthRateQuery,
  useGetDailyMonthlyUserGrowthRateQuery,
} from "src/reducers/sales_analytics";
import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import {
  IDailyGrowthRate,
  IDailyGrowthRateData,
} from "src/utils/types/sales_analytics.types";
import DailyGrowthRateItems from "./DailyGrowthRateItems";
import { formatDate } from "src/utils/functions/date_fns";

const DailyGrowthRate = () => {
  const { data: sessionUsersGrowthRate } =
    useGetDailySessionUserGrowthRateQuery();
  const { data: monthlyUsersGrowthRate } =
    useGetDailyMonthlyUserGrowthRateQuery();
  const monthlyUsers = monthlyUsersGrowthRate?.result?.map(
    (item: IDailyGrowthRate) => item
  );

  const sessionUsers = sessionUsersGrowthRate?.result?.map(
    (item: IDailyGrowthRate) => item
  );
  const newArr =
    sessionUsersGrowthRate?.result.length === 0
      ? monthlyUsersGrowthRate?.result
      : sessionUsersGrowthRate?.result;
  const data: IDailyGrowthRateData[] | undefined = newArr?.map(
    (item: IDailyGrowthRate, index: number) => ({
      Day: item.Day,
      SubscriptionEntryDate: item.SubscriptionEntryDate,
      SubscriptionType: item.SubscriptionType,
      sessionUsersGrowthRate: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              mUsers.SubscriptionEntryDate === item.SubscriptionEntryDate
          )
          .map((e) => e.GrowthRate)
      ),
      monthlyUsersGrowthRate: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              mUsers.SubscriptionEntryDate === item.SubscriptionEntryDate
          )
          .map((e) => e.GrowthRate)
      ),
    })
  );
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
          .map((e) => e.GrowthRate)
      ),
      monthlyUserSales: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              formatD === mUsers.SubscriptionEntryDate.split(" ")[0]
          )
          .map((e) => e.GrowthRate)
      ),
    });
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
        <Box>
          <h2>GROWTH RATE FOR SESSION USERS</h2>
          {daily_sales_data?.map((item) => (
            <DailyGrowthRateItems
              Day={item.date}
              GrowthRate={item.sessionUserSales}
            />
          ))}
        </Box>
        <Box>
          <h2>GROWTH RATE FOR MONTHLY USERS</h2>
          {daily_sales_data?.map((item) => (
            <DailyGrowthRateItems
              Day={item.date}
              GrowthRate={item.monthlyUserSales}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default DailyGrowthRate;
