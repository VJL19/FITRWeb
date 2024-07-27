import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import IAttendance from "src/utils/types/attendance.types";

export interface IAttendanceState {
  message: string;
  error: string;
  result: IAttendance[];
  status: number;
}

export interface IAttendanceSliceState {
  attendanceData: IAttendance[] | undefined;
}

const initialState: IAttendanceSliceState = {
  attendanceData: [],
};
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

    getAllRecentAttendance: builder.query<IAttendanceState, void>({
      query: () => "/admin/attendance/all_recent_attendance",
      providesTags: ["attendance"],
    }),
    getAttendanceByDate: builder.mutation<
      IAttendanceState,
      { selectedDate: string }
    >({
      query: ({ selectedDate }) => ({
        url: `/admin/generate_report/attendance/specific_date:${selectedDate}`,
        method: "GET",
      }),
      invalidatesTags: ["attendance"],
    }),
  }),
});

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendanceData: (
      state,
      action: PayloadAction<IAttendance[] | undefined>
    ) => {
      state.attendanceData = action.payload;
    },
  },
});

export const { setAttendanceData } = attendanceSlice.actions;
export const {
  useGetUsersAttendanceQuery,
  useGetAttendanceByDateMutation,
  useGetAllRecentAttendanceQuery,
} = attendanceApi;
export default attendanceSlice.reducer;
