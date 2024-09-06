import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import IAttendance from "src/utils/types/attendance.types";
import IUser from "src/utils/types/users.types";

export interface IAttendanceState {
  message: string;
  error: string;
  result: IAttendance[];
  status: number;
  user: IUser;
}

export interface IRfidError {
  data: {
    message: string;
    status: string;
  };
}

export interface IAttendanceSliceState {
  attendanceData: IAttendance[] | undefined;
  checkRfidStatus: IRfidError;
}

const initialState: IAttendanceSliceState = {
  attendanceData: [],
  checkRfidStatus: { data: { message: "", status: "" } },
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
    getTestConnection: builder.mutation<IAttendanceState, void>({
      query: () => ({
        url: "/user/sample_health",
        method: "GET",
      }),
      invalidatesTags: ["attendance"],
    }),
    checkUserRFIDNumber: builder.mutation<
      IAttendanceState,
      { RFIDNumber: string }
    >({
      query: ({ RFIDNumber }) => ({
        url: `/admin/attendance/checkUserRFID/:${RFIDNumber}`,
        method: "GET",
      }),
      invalidatesTags: ["attendance"],
    }),
    checkUserTapRFID: builder.mutation<
      IAttendanceState,
      { UserID: number | undefined }
    >({
      query: ({ UserID }) => ({
        url: `/admin/attendance/checkUserTapRFID/:${UserID}`,
        method: "GET",
      }),
      invalidatesTags: ["attendance"],
    }),
    tapRFIDCardUser: builder.mutation<
      IAttendanceState,
      {
        UserID: number | undefined;
        ProfilePic: string;
        LastName: string;
        FirstName: string;
        SubscriptionType: string;
        DateTapped: string;
        SubscriptionExpectedEnd: string;
        IsPaid: string;
        TimeIn: string;
        TimeOut: string;
      }
    >({
      query: (arg) => ({
        url: "/admin/attendance/record_user",
        method: "POST",
        body: arg,
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
    setCheckRfidMessage: (state, action: PayloadAction<IRfidError>) => {
      state.checkRfidStatus = action.payload;
    },
  },
});

export const { setAttendanceData, setCheckRfidMessage } =
  attendanceSlice.actions;
export const {
  useGetUsersAttendanceQuery,
  useGetAttendanceByDateMutation,
  useGetAllRecentAttendanceQuery,
  useCheckUserRFIDNumberMutation,
  useTapRFIDCardUserMutation,
  useCheckUserTapRFIDMutation,
  useGetTestConnectionMutation,
} = attendanceApi;
export default attendanceSlice.reducer;
