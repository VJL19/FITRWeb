import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import IUser from "src/utils/types/users.types";
import { number } from "zod";

interface IUserApiState {
  error: string;
  status: number;
  message: string;
  result: IUser[];
}

interface IUserSliceState {
  userData: IUser;
  OTPToken: number;
  adminAccountData: IUser;
  adminOTPToken: number;
  userTempRfidNumber: string;
}

interface IEmailState {
  code: number;
  result: { message: string; code: number };
}

interface IAdminChangeAccountState {
  message: string;
  status: number;
  result: IUser[];
  error: string;
}

interface IActivationAccountState {
  error: string;
  message: string;
  status: number;
}

const initialState: IUserSliceState = {
  userData: {
    UserID: 0,
    Birthday: "",
    Address: "",
    SubscriptionType: "",
    LastName: "",
    FirstName: "",
    MiddleName: "",
    Age: "",
    ContactNumber: "",
    Email: "",
    Gender: "",
    Password: "",
    ConfirmPassword: "",
    Height: "",
    Weight: "",
    ProfilePic: "",
    Username: "",
  },
  OTPToken: 0,
  adminAccountData: {
    UserID: 0,
    Birthday: "",
    Address: "",
    SubscriptionType: "",
    LastName: "",
    FirstName: "",
    RFIDNumber: "",
    MiddleName: "",
    Age: "",
    ContactNumber: "",
    Email: "",
    Gender: "",
    Password: "",
    ConfirmPassword: "",
    Height: "",
    Weight: "",
    ProfilePic: "",

    Username: "",
  },
  adminOTPToken: 0,
  userTempRfidNumber: "",
};

const config = loadConfig();

export const usersApi = createApi({
  tagTypes: ["users"],
  reducerPath: "user/registered",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      headers.set("ngrok-skip-browser-warning", "any");
      return headers;
    },
    baseUrl: config.BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserApiState, void>({
      query: () => "/admin/user/all_users",
      providesTags: ["users"],
    }),
    getAllTotalUsers: builder.query<IUserApiState, void>({
      query: () => "/admin/user/all_total_users",
      providesTags: ["users"],
    }),
    getAllTotalSessionUsers: builder.query<IUserApiState, void>({
      query: () => "/admin/user/all_total_session_users",
      providesTags: ["users"],
    }),
    getAllTotalMonthlyUsers: builder.query<IUserApiState, void>({
      query: () => "/admin/user/all_total_monthly_users",
      providesTags: ["users"],
    }),
    registerUser: builder.mutation<IUserApiState, IUser>({
      query: (arg) => ({
        url: "/admin/user/register_user_account",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation<
      IUserApiState,
      {
        UserID: number | undefined;
        SubscriptionType: string;
        RFIDNumber: string | undefined;
        IsRFIDActive: string | undefined;
      }
    >({
      query: (arg) => ({
        url: "/admin/user/update_subscription",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["users"],
    }),
    sendEmail: builder.mutation<IEmailState, { Email: string }>({
      query: (arg) => ({
        url: "/user/send_email",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["users"],
    }),
    sendEmailChangeAccount: builder.mutation<IEmailState, { Email: string }>({
      query: (arg) => ({
        url: "/admin/user/change_account",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["users"],
    }),
    adminChangeAccount: builder.mutation<
      IAdminChangeAccountState,
      {
        ProfilePic: string;
        UserID: number;
        Username: string;
        Email: string;
        RFIDNumber: string;
        ContactNumber: string;
        Password: string;
        ConfirmPassword: string;
      }
    >({
      query: (arg) => ({
        url: "/admin/user/edit_account",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["users"],
    }),
    activateUserAccount: builder.mutation<
      IActivationAccountState,
      { Email: string }
    >({
      query: (arg) => ({
        url: "/user/activate_account",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUserAccount: builder.mutation<
      IUserApiState,
      { UserID: number | undefined }
    >({
      query: ({ UserID }) => ({
        url: `/admin/user/delete_user/:${UserID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.userData = action.payload;
    },
    setOTPToken: (state, { payload }) => {
      state.OTPToken = payload;
    },
    setAdminAccountData: (state, action: PayloadAction<IUser>) => {
      state.adminAccountData = action.payload;
    },
    setAdminOTPToken: (state, { payload }) => {
      state.adminOTPToken = payload;
    },
    setUserTempRfidNumber: (state, action: PayloadAction<string>) => {
      state.userTempRfidNumber = action.payload;
    },
  },
});
export const {
  setUserData,
  setOTPToken,
  setUserTempRfidNumber,
  setAdminAccountData,
  setAdminOTPToken,
} = userSlice.actions;
export const {
  useGetAllUsersQuery,
  useGetAllTotalUsersQuery,
  useAdminChangeAccountMutation,
  useGetAllTotalSessionUsersQuery,
  useGetAllTotalMonthlyUsersQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useSendEmailMutation,
  useSendEmailChangeAccountMutation,
  useDeleteUserAccountMutation,
  useActivateUserAccountMutation,
} = usersApi;
export default userSlice.reducer;
