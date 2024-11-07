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
import {
  IDailyAttendeesData,
  IMonthlyAttendeesData,
  IWeeklyAttendeesData,
} from "../types/attendees_analytics.types";

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

  return data?.result?.length!;
};
const getTotalSessionUsersAttendanceByDate = (
  data: IAttendanceState | undefined
): number | undefined => {
  const ids = data?.result?.map(({ UserID }) => UserID);
  const newArr = data?.result?.filter(
    ({ UserID }, index) => !ids!.includes(UserID, index + 1)
  );

  return data?.result?.filter(
    (res) => res.SubscriptionType === SUBSCRIPTIONS.SESSION
  ).length;
};
const getTotalMonthlyUsersAttendanceByDate = (
  data: IAttendanceState | undefined
): number | undefined => {
  const ids = data?.result?.map(({ UserID }) => UserID);
  const newArr = data?.result?.filter(
    ({ UserID }, index) => !ids!.includes(UserID, index + 1)
  );

  return data?.result?.filter(
    (res) => res.SubscriptionType === SUBSCRIPTIONS.MONTHLY
  ).length;
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

//attendance overview (daily)
const getTotalDailySessionAttendees = (
  data: IDailyAttendeesData[] | undefined
): number => {
  let totalDailyAttendees = 0;
  const getTotalDailyAttendees = data?.map((res) =>
    Number(res.sessionUserAttendees)
  );

  for (let i = 0; i < getTotalDailyAttendees?.length!; i++) {
    totalDailyAttendees += getTotalDailyAttendees?.[i]!;
  }
  return totalDailyAttendees;
};
const getAverageDailySessionAttendees = (
  data: IDailyAttendeesData[] | undefined
): number => {
  let totalDailyAttendees = 0;
  const getAverageDailyAttendees = data?.map((res) =>
    Number(res.sessionUserAttendees)
  );

  for (let i = 0; i < getAverageDailyAttendees?.length!; i++) {
    totalDailyAttendees += getAverageDailyAttendees?.[i]!;
  }

  const averageDailySessionAttendees =
    totalDailyAttendees / getAverageDailyAttendees?.length!;

  return !Number.isNaN(averageDailySessionAttendees)
    ? averageDailySessionAttendees
    : 0;
};
const getTotalDailyMonthlyAttendees = (data: any[] | undefined): number => {
  let totalDailyAttendees = 0;
  const getTotalAmountDailyAttendees = data?.map((res) =>
    Number(res.monthlyUserAttendees)
  );

  for (let i = 0; i < getTotalAmountDailyAttendees?.length!; i++) {
    totalDailyAttendees += getTotalAmountDailyAttendees?.[i]!;
  }
  return totalDailyAttendees;
};
const getAverageDailyMonthlyAttendees = (
  data: IDailyAttendeesData[] | undefined
): number => {
  let totalDailyAttendees = 0;
  const getTotalAmountDailyAttendees = data?.map((res) =>
    Number(res.monthlyUserAttendees)
  );

  for (let i = 0; i < getTotalAmountDailyAttendees?.length!; i++) {
    totalDailyAttendees += getTotalAmountDailyAttendees?.[i]!;
  }
  const averageDailyMonthlyAttendees =
    totalDailyAttendees / getTotalAmountDailyAttendees?.length!;

  return !Number.isNaN(averageDailyMonthlyAttendees)
    ? averageDailyMonthlyAttendees
    : 0;
};
//attendance overview (weekly)
const getTotalWeeklySessionAttendees = (
  data: IWeeklyAttendeesData[] | undefined
): number => {
  let totalWeeklyAttendees = 0;
  const getTotalWeeklyAttendees = data?.map((res) =>
    Number(res.sessionUserAttendees)
  );

  for (let i = 0; i < getTotalWeeklyAttendees?.length!; i++) {
    totalWeeklyAttendees += getTotalWeeklyAttendees?.[i]!;
  }
  return totalWeeklyAttendees;
};
const getAverageWeeklySessionAttendees = (
  data: IWeeklyAttendeesData[] | undefined
): number => {
  let totalWeeklyAttendees = 0;
  const getTotalWeeklyAttendees = data?.map((res) =>
    Number(res.sessionUserAttendees)
  );

  for (let i = 0; i < getTotalWeeklyAttendees?.length!; i++) {
    totalWeeklyAttendees += getTotalWeeklyAttendees?.[i]!;
  }

  const averageWeeklySessionAttendees = totalWeeklyAttendees / 5;

  return !Number.isNaN(averageWeeklySessionAttendees)
    ? averageWeeklySessionAttendees
    : 0;
};
const getTotalWeeklyMonthlyAttendees = (
  data: IWeeklyAttendeesData[] | undefined
): number => {
  let totalWeeklyAttendees = 0;
  const getTotalWeeklyAttendees = data?.map((res) =>
    Number(res.monthlyUserAttendees)
  );

  for (let i = 0; i < getTotalWeeklyAttendees?.length!; i++) {
    totalWeeklyAttendees += getTotalWeeklyAttendees?.[i]!;
  }
  return totalWeeklyAttendees;
};
const getAverageWeeklyMonthlyAttendees = (
  data: IWeeklyAttendeesData[] | undefined
): number => {
  let totalWeeklyAttendees = 0;
  const getTotalWeeklyAttendees = data?.map((res) =>
    Number(res.monthlyUserAttendees)
  );

  for (let i = 0; i < getTotalWeeklyAttendees?.length!; i++) {
    totalWeeklyAttendees += getTotalWeeklyAttendees?.[i]!;
  }
  const averageWeeklyMonthlyAttendees = totalWeeklyAttendees / 5;

  return !Number.isNaN(averageWeeklyMonthlyAttendees)
    ? averageWeeklyMonthlyAttendees
    : 0;
};

//attendance overview (monthly)
const getTotalMonthlySessionAttendees = (
  data: IMonthlyAttendeesData[] | undefined
): number => {
  let totalMonthlyAttendees = 0;
  const getTotalMonthlyAttendees = data?.map((res) =>
    Number(res.sessionUserAttendees)
  );

  for (let i = 0; i < getTotalMonthlyAttendees?.length!; i++) {
    totalMonthlyAttendees += getTotalMonthlyAttendees?.[i]!;
  }
  return totalMonthlyAttendees;
};
const getAverageMonthlySessionAttendees = (
  data: IMonthlyAttendeesData[] | undefined
): number => {
  let totalMonthlyAttendees = 0;
  const getTotalMonthlyAttendees = data?.map((res) =>
    Number(res.sessionUserAttendees)
  );

  for (let i = 0; i < getTotalMonthlyAttendees?.length!; i++) {
    totalMonthlyAttendees += getTotalMonthlyAttendees?.[i]!;
  }

  const averageMonthlySessionAttendees = totalMonthlyAttendees / 12;

  return !Number.isNaN(averageMonthlySessionAttendees)
    ? averageMonthlySessionAttendees
    : 0;
};
const getTotalMonthlyMAttendees = (
  data: IMonthlyAttendeesData[] | undefined
): number => {
  let totalMonthlyAttendees = 0;
  const getTotalMonthlyAttendees = data?.map((res) =>
    Number(res.monthlyUserAttendees)
  );

  for (let i = 0; i < getTotalMonthlyAttendees?.length!; i++) {
    totalMonthlyAttendees += getTotalMonthlyAttendees?.[i]!;
  }
  return totalMonthlyAttendees;
};
const getAverageMonthlyMAttendees = (
  data: IMonthlyAttendeesData[] | undefined
): number => {
  let totalMonthlyAttendees = 0;
  const getTotalMonthlyAttendees = data?.map((res) =>
    Number(res.monthlyUserAttendees)
  );

  for (let i = 0; i < getTotalMonthlyAttendees?.length!; i++) {
    totalMonthlyAttendees += getTotalMonthlyAttendees?.[i]!;
  }
  const averageMonthlyMAttendees = totalMonthlyAttendees / 12;

  return !Number.isNaN(averageMonthlyMAttendees) ? averageMonthlyMAttendees : 0;
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
  getTotalDailySessionAttendees,
  getTotalDailyMonthlyAttendees,
  getAverageDailySessionAttendees,
  getAverageDailyMonthlyAttendees,
  getTotalWeeklyMonthlyAttendees,
  getTotalWeeklySessionAttendees,
  getAverageWeeklySessionAttendees,
  getAverageWeeklyMonthlyAttendees,
  getTotalMonthlySessionAttendees,
  getTotalMonthlyMAttendees,
  getAverageMonthlySessionAttendees,
  getAverageMonthlyMAttendees,
};
