import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import {
  IDailyAttendeesAnalytics,
  IMonthlyAttendeesAnalytics,
  IWeeklyAttendeesAnalytics,
} from "src/utils/types/attendees_analytics.types";

const config = loadConfig();

interface IDailyAttendeesAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IDailyAttendeesAnalytics[];
}
interface IWeeklyAttendeesAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IWeeklyAttendeesAnalytics[];
}

interface IMonthlyAttendeesAnalyticsApiState {
  error: string;
  message: string;
  status: number;
  result: IMonthlyAttendeesAnalytics[];
}

export const attendanceAnalyticsApi = createApi({
  reducerPath: "admin/attendance_analytics",
  tagTypes: ["attendance_analytics"],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      headers.set("ngrok-skip-browser-warning", "any");
      return headers;
    },
    baseUrl: config.BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getDailySessionUserAttendees: builder.query<
      IDailyAttendeesAnalyticsApiState,
      void
    >({
      query: () => `/admin/attendance_analytics/daily_sessionUsers/attendees`,
      providesTags: ["attendance_analytics"],
    }),
    getDailyMonthlyUserAttendees: builder.query<
      IDailyAttendeesAnalyticsApiState,
      void
    >({
      query: () => `/admin/attendance_analytics/daily_monthlyUsers/attendees`,
      providesTags: ["attendance_analytics"],
    }),
    getWeeklySessionUserAttendees: builder.mutation<
      IWeeklyAttendeesAnalyticsApiState,
      { selectedMonth: string }
    >({
      query: ({ selectedMonth }) => ({
        url: `/admin/attendance_analytics/weekly_sessionUsers/attendees/:${selectedMonth}`,
        method: "GET",
      }),
      invalidatesTags: ["attendance_analytics"],
    }),
    getWeeklyMonthlyUserAttendees: builder.mutation<
      IWeeklyAttendeesAnalyticsApiState,
      { selectedMonth: string }
    >({
      query: ({ selectedMonth }) => ({
        url: `/admin/attendance_analytics/weekly_monthlyUsers/attendees/:${selectedMonth}`,
        method: "GET",
      }),
      invalidatesTags: ["attendance_analytics"],
    }),
    getMonthlySessionUserAttendees: builder.mutation<
      IMonthlyAttendeesAnalyticsApiState,
      { selectedYear: string }
    >({
      query: ({ selectedYear }) => ({
        url: `/admin/attendance_analytics/monthly_sessionUsers/attendees/:${selectedYear}`,
        method: "GET",
      }),
      invalidatesTags: ["attendance_analytics"],
    }),
    getMonthlyMUserAttendees: builder.mutation<
      IMonthlyAttendeesAnalyticsApiState,
      { selectedYear: string }
    >({
      query: ({ selectedYear }) => ({
        url: `/admin/attendance_analytics/monthly_mUsers/attendees/:${selectedYear}`,
        method: "GET",
      }),
      invalidatesTags: ["attendance_analytics"],
    }),
  }),
});

export const {
  useGetDailySessionUserAttendeesQuery,
  useGetDailyMonthlyUserAttendeesQuery,
  useGetWeeklySessionUserAttendeesMutation,
  useGetWeeklyMonthlyUserAttendeesMutation,
  useGetMonthlySessionUserAttendeesMutation,
  useGetMonthlyMUserAttendeesMutation,
} = attendanceAnalyticsApi;
