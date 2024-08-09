import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";

import {
  useGetWeeklySessionUserGrowthRateMutation,
  useGetWeeklyMonthlyUserGrowthRateMutation,
} from "src/reducers/sales_analytics";
import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import {
  IWeeklyGrowthRate,
  IWeeklyGrowthRateData,
} from "src/utils/types/sales_analytics.types";
import WeeklyGrowthRateItems from "./WeeklyGrowthRateItems";

const WeeklyGrowthRate = ({ selectedValue }: { selectedValue: string }) => {
  const [getWeeklySession, { data: sessionUsersGrowthRate }] =
    useGetWeeklySessionUserGrowthRateMutation();
  const [getWeeklyMonthly, { data: monthlyUsersGrowthRate }] =
    useGetWeeklyMonthlyUserGrowthRateMutation();
  const monthlyUsers = monthlyUsersGrowthRate?.result?.map(
    (item: IWeeklyGrowthRate) => item
  );

  const sessionUsers = sessionUsersGrowthRate?.result?.map(
    (item: IWeeklyGrowthRate) => item
  );
  const newArr =
    sessionUsersGrowthRate?.result.length === 0
      ? monthlyUsersGrowthRate?.result
      : sessionUsersGrowthRate?.result;
  const data: IWeeklyGrowthRateData[] | undefined = newArr?.map(
    (item: IWeeklyGrowthRate, index: number) => ({
      Week: `Week ${index + 1}`,
      SubscriptionType: item.SubscriptionType,
      sessionUsersGrowthRate: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              mUsers.Week === item.Week
          )
          .map((e) => e.GrowthRate)
      ),
      monthlyUsersGrowthRate: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              mUsers.Week === item.Week
          )
          .map((e) => e.GrowthRate)
      ),
    })
  );
  console.log(data);

  useEffect(() => {
    if (selectedValue !== "" || selectedValue !== undefined) {
      getWeeklySession({ selectedMonth: selectedValue });
      getWeeklyMonthly({ selectedMonth: selectedValue });
    }
  }, [selectedValue]);

  return (
    <Container sx={{ height: 450 }}>
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
            <Box>
              <h2>WEEKLY GROWTH RATE FOR SESSION USERS</h2>
              {data?.map((item) => (
                <WeeklyGrowthRateItems
                  Weeks={item.Week}
                  GrowthRate={item.sessionUsersGrowthRate}
                />
              ))}
            </Box>
            <Box>
              <h2>WEEKLY GROWTH RATE FOR MONTHLY USERS</h2>
              {data?.map((item) => (
                <WeeklyGrowthRateItems
                  Weeks={item.Week}
                  GrowthRate={item.monthlyUsersGrowthRate}
                />
              ))}
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Container>
  );
};

export default WeeklyGrowthRate;
