import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import IAttendance from "src/utils/types/attendance.types";

interface IAttendanceState {
  message: string;
  error: string;
  result: IAttendance[];
  status: number;
}

const config = loadConfig();

export const attendanceApi = createApi({
  tagTypes: ["attendance"],
  reducerPath: "user/attendance",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    getUsersAttendance: builder.query<IAttendanceState, void>({
      query: () => "/admin/attendance/users_attendance",
      providesTags: ["attendance"],
    }),
  }),
});

export const { useGetUsersAttendanceQuery } = attendanceApi;
