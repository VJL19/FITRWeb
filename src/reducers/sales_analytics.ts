import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import {
  IDailySalesAnalytics,
  IMonthlySalesAnalytics,
  ITodaySalesAnalytics,
  IWeeklySalesAnalytics,
} from "src/utils/types/sales_analytics.types";

interface IDailySalesAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IDailySalesAnalytics[];
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
        query: () => `/admin/sales_analytics/daily_sessionUsers_sales`,
        providesTags: ["sales_analytics"],
      }
    ),
    getDailyMonthlyUserSales: builder.query<IDailySalesAnalyticsApiState, void>(
      {
        query: () => `/admin/sales_analytics/daily_monthlyUsers_sales`,
        providesTags: ["sales_analytics"],
      }
    ),
    getTodaySessionUserSales: builder.query<ITodaySalesAnalyticsApiState, void>(
      {
        query: () => `/admin/sales_analytics/today_sessionUsers_sales`,
        providesTags: ["sales_analytics"],
      }
    ),
    getTodayMonthlyUserSales: builder.query<ITodaySalesAnalyticsApiState, void>(
      {
        query: () => `/admin/sales_analytics/today_monthlyUsers_sales`,
        providesTags: ["sales_analytics"],
      }
    ),
    getWeeklySessionUserSales: builder.mutation<
      IWeeklySalesAnalyticsApiState,
      { selectedMonth: string }
    >({
      query: ({ selectedMonth }) => ({
        url: `/admin/sales_analytics/weekly_sessionUsers_sales/:${selectedMonth}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getWeeklyMonthlyUserSales: builder.mutation<
      IWeeklySalesAnalyticsApiState,
      { selectedMonth: string }
    >({
      query: ({ selectedMonth }) => ({
        url: `/admin/sales_analytics/weekly_monthlyUsers_sales/:${selectedMonth}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getMonthlySessionUserSales: builder.mutation<
      IMonthlySalesAnalyticsApiState,
      { selectedYear: string }
    >({
      query: ({ selectedYear }) => ({
        url: `/admin/sales_analytics/monthly_sessionUsers_sales/:${selectedYear}`,
        method: "GET",
      }),
      invalidatesTags: ["sales_analytics"],
    }),
    getMonthlyMUserSales: builder.mutation<
      IMonthlySalesAnalyticsApiState,
      { selectedYear: string }
    >({
      query: ({ selectedYear }) => ({
        url: `/admin/sales_analytics/monthly_mUsers_sales/:${selectedYear}`,
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
  useGetWeeklySessionUserSalesMutation,
  useGetWeeklyMonthlyUserSalesMutation,
  useGetMonthlySessionUserSalesMutation,
  useGetMonthlyMUserSalesMutation,
} = salesAnalyticsApi;
