import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import {
  IDailyGrowthRate,
  IDailySalesAnalytics,
  IMonthlyGrowthRate,
  IMonthlySalesAnalytics,
  ITodaySalesAnalytics,
  IWeeklyGrowthRate,
  IWeeklySalesAnalytics,
} from "src/utils/types/sales_analytics.types";

interface IDailySalesAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IDailySalesAnalytics[];
}
interface IDailyGrowthRateAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IDailyGrowthRate[];
}
interface ITodaySalesAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: ITodaySalesAnalytics[];
}
interface IWeeklySalesAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IWeeklySalesAnalytics[];
}
interface IWeeklyGrowthRateAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IWeeklyGrowthRate[];
}
interface IMonthlyGrowthRateAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IMonthlyGrowthRate[];
}
interface IMonthlySalesAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IMonthlySalesAnalytics[];
}

const config = loadConfig();

export const salesAnalyticsApi = createApi({
  tagTypes: ["sales_analytics"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    getDailySessionUserSales: builder.query<IDailySalesAnalyticsApiState, void>(
      {
        query: () => `/admin/sales_analytics/daily_sessionUsers/sales`,
        providesTags: ["sales_analytics"],
      }
    ),
    getDailyMonthlyUserSales: builder.query<IDailySalesAnalyticsApiState, void>(
      {
        query: () => `/admin/sales_analytics/daily_monthlyUsers/sales`,
        providesTags: ["sales_analytics"],
      }
    ),
    getDailySessionUserGrowthRate: builder.query<
      IDailyGrowthRateAnalyticsApiState,
      void
    >({
      query: () => `/admin/sales_analytics/daily_sessionUsers/growth_rate`,
      providesTags: ["sales_analytics"],
    }),
    getDailyMonthlyUserGrowthRate: builder.query<
      IDailyGrowthRateAnalyticsApiState,
      void
    >({
      query: () => `/admin/sales_analytics/daily_monthlyUsers/growth_rate`,
      providesTags: ["sales_analytics"],
    }),
    getTodaySessionUserSales: builder.query<ITodaySalesAnalyticsApiState, void>(
      {
        query: () => `/admin/sales_analytics/today_sessionUsers/sales`,
        providesTags: ["sales_analytics"],
      }
    ),
    getTodayMonthlyUserSales: builder.query<ITodaySalesAnalyticsApiState, void>(
      {
        query: () => `/admin/sales_analytics/today_monthlyUsers/sales`,
        providesTags: ["sales_analytics"],
      }
    ),
    getWeeklySessionUserSales: builder.mutation<
      IWeeklySalesAnalyticsApiState,
      { selectedMonth: string }
    >({
      query: ({ selectedMonth }) => ({
        url: `/admin/sales_analytics/weekly_sessionUsers/sales/:${selectedMonth}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getWeeklySessionUserGrowthRate: builder.mutation<
      IWeeklyGrowthRateAnalyticsApiState,
      { selectedMonth: string }
    >({
      query: ({ selectedMonth }) => ({
        url: `/admin/sales_analytics/weekly_sessionUsers/growth_rate/:${selectedMonth}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getWeeklyMonthlyUserGrowthRate: builder.mutation<
      IWeeklyGrowthRateAnalyticsApiState,
      { selectedMonth: string }
    >({
      query: ({ selectedMonth }) => ({
        url: `/admin/sales_analytics/weekly_monthlyUsers/growth_rate/:${selectedMonth}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getMonthlySessionUserGrowthRate: builder.mutation<
      IMonthlyGrowthRateAnalyticsApiState,
      { selectedYear: string }
    >({
      query: ({ selectedYear }) => ({
        url: `/admin/sales_analytics/monthly_sessionUsers/growth_rate/:${selectedYear}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getMonthlyMUserGrowthRate: builder.mutation<
      IMonthlyGrowthRateAnalyticsApiState,
      { selectedYear: string }
    >({
      query: ({ selectedYear }) => ({
        url: `/admin/sales_analytics/monthly_mUsers/growth_rate/:${selectedYear}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getWeeklyMonthlyUserSales: builder.mutation<
      IWeeklySalesAnalyticsApiState,
      { selectedMonth: string }
    >({
      query: ({ selectedMonth }) => ({
        url: `/admin/sales_analytics/weekly_monthlyUsers/sales/:${selectedMonth}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getMonthlySessionUserSales: builder.mutation<
      IMonthlySalesAnalyticsApiState,
      { selectedYear: string }
    >({
      query: ({ selectedYear }) => ({
        url: `/admin/sales_analytics/monthly_sessionUsers/sales/:${selectedYear}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getMonthlyMUserSales: builder.mutation<
      IMonthlySalesAnalyticsApiState,
      { selectedYear: string }
    >({
      query: ({ selectedYear }) => ({
        url: `/admin/sales_analytics/monthly_mUsers/sales/:${selectedYear}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
  }),
});

export const {
  useGetDailySessionUserSalesQuery,
  useGetDailyMonthlyUserSalesQuery,
  useGetTodaySessionUserSalesQuery,
  useGetTodayMonthlyUserSalesQuery,
  useGetDailySessionUserGrowthRateQuery,
  useGetDailyMonthlyUserGrowthRateQuery,
  useGetWeeklySessionUserGrowthRateMutation,
  useGetWeeklyMonthlyUserGrowthRateMutation,
  useGetWeeklySessionUserSalesMutation,
  useGetWeeklyMonthlyUserSalesMutation,
  useGetMonthlySessionUserSalesMutation,
  useGetMonthlyMUserSalesMutation,
  useGetMonthlySessionUserGrowthRateMutation,
  useGetMonthlyMUserGrowthRateMutation,
} = salesAnalyticsApi;
