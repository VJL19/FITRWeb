import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";

import {
  useGetMonthlySessionUserGrowthRateMutation,
  useGetMonthlyMUserGrowthRateMutation,
} from "src/reducers/sales_analytics";
import { SUBSCRIPTIONS } from "src/utils/enums/SUBSCRIPTIONS";
import {
  IMonthlyGrowthRate,
  IMonthlyGrowthRateData,
} from "src/utils/types/sales_analytics.types";
import MonthlyGrowthRateItems from "./MonthlyGrowthRateItems";

const MonthlyGrowthRate = ({ selectedValue }: { selectedValue: string }) => {
  const [getMonthlySession, { data: sessionUsersGrowthRate }] =
    useGetMonthlySessionUserGrowthRateMutation();
  const [getMonthlyM, { data: monthlyUsersGrowthRate }] =
    useGetMonthlyMUserGrowthRateMutation();
  const monthlyUsers = monthlyUsersGrowthRate?.result?.map(
    (item: IMonthlyGrowthRate) => item
  );

  const sessionUsers = sessionUsersGrowthRate?.result?.map(
    (item: IMonthlyGrowthRate) => item
  );
  const newArr =
    sessionUsersGrowthRate?.result.length === 0
      ? monthlyUsersGrowthRate?.result
      : sessionUsersGrowthRate?.result;
  const data: IMonthlyGrowthRateData[] | undefined = newArr?.map(
    (item: IMonthlyGrowthRate, index: number) => ({
      Months: item.Months,
      SubscriptionType: item.SubscriptionType,
      sessionUsersGrowthRate: Number(
        sessionUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.SESSION &&
              mUsers.Months === item.Months
          )
          .map((e) => e.GrowthRate)
      ),
      monthlyUsersGrowthRate: Number(
        monthlyUsers
          ?.filter(
            (mUsers) =>
              mUsers.SubscriptionType === SUBSCRIPTIONS.MONTHLY &&
              mUsers.Months === item.Months
          )
          .map((e) => e.GrowthRate)
      ),
    })
  );
  console.log(sessionUsers);

  useEffect(() => {
    if (selectedValue !== "" || selectedValue !== undefined) {
      getMonthlySession({ selectedYear: selectedValue });
      getMonthlyM({ selectedYear: selectedValue });
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
              <h2>GROWTH RATE FOR SESSION USERS</h2>
              {data?.map((item) => (
                <MonthlyGrowthRateItems
                  Months={item.Months}
                  GrowthRate={item.sessionUsersGrowthRate}
                />
              ))}
            </Box>
            <Box>
              <h2>GROWTH RATE FOR MONTHLY USERS</h2>
              {data?.map((item) => (
                <MonthlyGrowthRateItems
                  Months={item.Months}
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

export default MonthlyGrowthRate;
