import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import { IDailySalesAnalytics } from "src/utils/types/sales_analytics.types";

interface IDailySalesAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IDailySalesAnalytics[];
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
  }),
});

export const {
  useGetDailySessionUserSalesQuery,
  useGetDailyMonthlyUserSalesQuery,
} = salesAnalyticsApi;
