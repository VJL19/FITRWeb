import { ITransactionApiState } from "src/reducers/transaction";
import { SUBSCRIPTIONS } from "../enums/SUBSCRIPTIONS";
import { IAttendanceState } from "src/reducers/attendance";
import {
  IDailySalesData,
  IMonthlySalesData,
  ITodaySalesData,
  IWeeklyMonthlySalesData,
  IWeeklySalesData,
  IWeeklySessionSalesData,
} from "../types/sales_analytics.types";

//sales overview (today (24 hrs))
const getTotalTodaySessionSales = (
  data: ITodaySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.sessionUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  return totalDailySales;
};
const getTotalTodayMonthlySales = (
  data: ITodaySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.monthlyUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  return totalDailySales;
};

const getAverageTodaySessionSales = (
  data: ITodaySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.sessionUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }

  const averageDailySessionSales =
    totalDailySales / getTotalAmountDailySales?.length!;

  return !Number.isNaN(averageDailySessionSales) ? averageDailySessionSales : 0;
};
const getAverageTodayMonthlySales = (
  data: ITodaySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.monthlyUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }

  const averageDailySessionSales =
    totalDailySales / getTotalAmountDailySales?.length!;

  return !Number.isNaN(averageDailySessionSales) ? averageDailySessionSales : 0;
};

//sales overview (daily)
const getTotalDailySessionSales = (
  data: IDailySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.sessionUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  return totalDailySales;
};
const getAverageDailySessionSales = (
  data: IDailySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.sessionUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }

  const averageDailySessionSales =
    totalDailySales / getTotalAmountDailySales?.length!;

  return !Number.isNaN(averageDailySessionSales) ? averageDailySessionSales : 0;
};
const getTotalDailyMonthlySales = (
  data: IDailySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.monthlyUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  return totalDailySales;
};
const getAverageDailyMonthlySales = (
  data: IDailySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.monthlyUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  const averageDailyMonthlySales =
    totalDailySales / getTotalAmountDailySales?.length!;

  return !Number.isNaN(averageDailyMonthlySales) ? averageDailyMonthlySales : 0;
};
//sales overview (weekly)
const getTotalWeeklySessionSales = (
  data: IWeeklySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.sessionUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  return totalDailySales;
};
const getAverageWeeklySessionSales = (
  data: IWeeklySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.sessionUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }

  const averageWeeklySessionSales = totalDailySales / 5;

  return !Number.isNaN(averageWeeklySessionSales)
    ? averageWeeklySessionSales
    : 0;
};
const getTotalWeeklyMonthlySales = (
  data: IWeeklySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.monthlyUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  return totalDailySales;
};
const getAverageWeeklyMonthlySales = (
  data: IWeeklySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.monthlyUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  const averageWeeklyMonthlySales = totalDailySales / 5;

  return !Number.isNaN(averageWeeklyMonthlySales)
    ? averageWeeklyMonthlySales
    : 0;
};
//sales overview (monthly)
const getTotalMonthlySessionSales = (
  data: IMonthlySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.sessionUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  return totalDailySales;
};
const getAverageMonthlySessionSales = (
  data: IMonthlySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.sessionUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }

  const averageWeeklySessionSales = totalDailySales / 12;

  return !Number.isNaN(averageWeeklySessionSales)
    ? averageWeeklySessionSales
    : 0;
};
const getTotalMonthlyMSales = (
  data: IMonthlySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.monthlyUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  return totalDailySales;
};
const getAverageMonthlyMSales = (
  data: IMonthlySalesData[] | undefined
): number => {
  let totalDailySales = 0;
  const getTotalAmountDailySales = data?.map((res) =>
    Number(res.monthlyUserSales)
  );

  for (let i = 0; i < getTotalAmountDailySales?.length!; i++) {
    totalDailySales += getTotalAmountDailySales?.[i]!;
  }
  const averageWeeklyMonthlySales = totalDailySales / 12;

  return !Number.isNaN(averageWeeklyMonthlySales)
    ? averageWeeklyMonthlySales
    : 0;
};

//attendance reports
const getTotalUsersAttendanceByDate = (
  data: IAttendanceState | undefined
): number | undefined => {
  const ids = data?.result?.map(({ UserID }) => UserID);
  const newArr = data?.result?.filter(
    ({ UserID }, index) => !ids!.includes(UserID, index + 1)
  );

  return newArr?.length;
};
const getTotalSessionUsersAttendanceByDate = (
  data: IAttendanceState | undefined
): number | undefined => {
  const ids = data?.result?.map(({ UserID }) => UserID);
  const newArr = data?.result?.filter(
    ({ UserID }, index) => !ids!.includes(UserID, index + 1)
  );

  return newArr?.filter((res) => res.SubscriptionType === SUBSCRIPTIONS.SESSION)
    .length;
};
const getTotalMonthlyUsersAttendanceByDate = (
  data: IAttendanceState | undefined
): number | undefined => {
  const ids = data?.result?.map(({ UserID }) => UserID);
  const newArr = data?.result?.filter(
    ({ UserID }, index) => !ids!.includes(UserID, index + 1)
  );

  return newArr?.filter((res) => res.SubscriptionType === SUBSCRIPTIONS.MONTHLY)
    .length;
};

//financial reports
const getTotalUserSalesByDate = (
  data: ITransactionApiState | undefined
): number => {
  const getTotalUserSalesByDate = data?.result.map(
    (user) => user.SubscriptionAmount
  );
  let totalSalesByDate = 0;
  for (let i = 0; i < data?.result?.length!; i++) {
    totalSalesByDate += getTotalUserSalesByDate?.[i]!;
  }

  return totalSalesByDate;
};
const getTotalUserSessionSalesByDate = (
  data: ITransactionApiState | undefined
): number => {
  const getTotalUserSessionSalesByDate = data?.result
    ?.filter((res) => res.SubscriptionType === SUBSCRIPTIONS.SESSION)
    .map((user) => user.SubscriptionAmount);
  let totalSalesByDate = 0;
  for (let i = 0; i < getTotalUserSessionSalesByDate?.length!; i++) {
    totalSalesByDate += getTotalUserSessionSalesByDate?.[i]!;
  }

  return totalSalesByDate;
};
const getTotalUserMonthlySalesByDate = (
  data: ITransactionApiState | undefined
): number => {
  const getTotalUserMonthlySalesByDate = data?.result
    ?.filter((res) => res.SubscriptionType === SUBSCRIPTIONS.MONTHLY)
    .map((user) => user.SubscriptionAmount);
  let totalSalesByDate = 0;
  for (let i = 0; i < getTotalUserMonthlySalesByDate?.length!; i++) {
    totalSalesByDate += getTotalUserMonthlySalesByDate?.[i]!;
  }

  return totalSalesByDate;
};
const getAverageSalesByDate = (
  data: ITransactionApiState | undefined
): number => {
  const getAverageSalesByDate = data?.result.map(
    (user) => user.SubscriptionAmount
  );
  let totalSalesByDate = 0;
  for (let i = 0; i < getAverageSalesByDate?.length!; i++) {
    totalSalesByDate += getAverageSalesByDate?.[i]!;
  }
  let averageSalesByDate = totalSalesByDate / getAverageSalesByDate?.length!;

  return !Number.isNaN(averageSalesByDate) ? averageSalesByDate : 0;
};
const getAverageSessionSalesByDate = (
  data: ITransactionApiState | undefined
): number => {
  const getAverageSessionSalesByDate = data?.result
    ?.filter((res) => res.SubscriptionType === SUBSCRIPTIONS.SESSION)
    .map((user) => user.SubscriptionAmount);
  let totalSalesByDate = 0;
  for (let i = 0; i < getAverageSessionSalesByDate?.length!; i++) {
    totalSalesByDate += getAverageSessionSalesByDate?.[i]!;
  }
  let averageSalesByDate =
    totalSalesByDate / getAverageSessionSalesByDate?.length!;

  return !Number.isNaN(averageSalesByDate) ? averageSalesByDate : 0;
};
const getAverageMonthlySalesByDate = (
  data: ITransactionApiState | undefined
): number => {
  const getAverageMonthlySalesByDate = data?.result
    ?.filter((res) => res.SubscriptionType === SUBSCRIPTIONS.MONTHLY)
    .map((user) => user.SubscriptionAmount);
  let totalSalesByDate = 0;
  for (let i = 0; i < getAverageMonthlySalesByDate?.length!; i++) {
    totalSalesByDate += getAverageMonthlySalesByDate?.[i]!;
  }
  let averageSalesByDate =
    totalSalesByDate / getAverageMonthlySalesByDate?.length!;

  return !Number.isNaN(averageSalesByDate) ? averageSalesByDate : 0;
};
export {
  getTotalTodaySessionSales,
  getAverageTodaySessionSales,
  getTotalTodayMonthlySales,
  getAverageTodayMonthlySales,
  getTotalUsersAttendanceByDate,
  getTotalDailyMonthlySales,
  getTotalMonthlySessionSales,
  getAverageMonthlySessionSales,
  getTotalMonthlyMSales,
  getAverageMonthlyMSales,
  getAverageDailyMonthlySales,
  getAverageMonthlySalesByDate,
  getTotalWeeklyMonthlySales,
  getAverageWeeklyMonthlySales,
  getTotalWeeklySessionSales,
  getAverageWeeklySessionSales,
  getTotalSessionUsersAttendanceByDate,
  getTotalMonthlyUsersAttendanceByDate,
  getAverageSalesByDate,
  getAverageSessionSalesByDate,
  getTotalUserMonthlySalesByDate,
  getTotalUserSalesByDate,
  getTotalUserSessionSalesByDate,
  getTotalDailySessionSales,
  getAverageDailySessionSales,
};
