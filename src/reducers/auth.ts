import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import IUser from "src/utils/types/users.types";

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  message: string;
  OTPToken: string;
  forgotPasswordInfo: {
    Email: string;
    Username: string;
  };
}

interface IAccessWebToken {
  message: string;
  user: IUser;
  isAuthenticated: boolean;
  accessToken: string;
  status: number;
}

interface IForgotPasswordField {
  Email: string;
  Username: string;
}
interface IForgotPasswordState {
  error: string;
  status: number;
  message: string;
  result: IUser[];
}

interface IChangePasswordState {
  error: string;
  status: number;
  message: string;
  result: unknown[];
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoading: false,
  message: "",
  OTPToken: "",
  forgotPasswordInfo: {
    Email: "",
    Username: "",
  },
};

const config = loadConfig();
export const authApi = createApi({
  reducerPath: "user/auth",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    getAccessWebToken: builder.query<IAccessWebToken, void>({
      query: () => "/admin/user/dashboard",
      providesTags: ["auth"],
    }),
    logoutUserWeb: builder.mutation<IAccessWebToken, void>({
      query: () => ({
        url: "/admin/user/logout_account",
        method: "GET",
      }),
      invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation<IForgotPasswordState, { Email: string }>({
      query: (arg) => ({
        url: "/admin/user/forgot_password",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["auth"],
    }),
    changePassword: builder.mutation<
      IChangePasswordState,
      { Email: string; Password: string; ConfirmPassword: string }
    >({
      query: (arg) => ({
        url: "/admin/user/change_password",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isAuthenticated = true;
      state.message = "Successfully login!";
    },
    logutUser: (state) => {
      state.isAuthenticated = false;
      state.message = "Successfully logout!";
    },
    setOTPToken: (state, { payload }) => {
      state.OTPToken = payload;
    },
    setForgotPasswordFields: (
      state,
      action: PayloadAction<IForgotPasswordField>
    ) => {
      state.forgotPasswordInfo = action.payload;
    },
  },
});

export const { loginUser, logutUser, setOTPToken, setForgotPasswordFields } =
  authSlice.actions;
export const {
  useGetAccessWebTokenQuery,
  useLogoutUserWebMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
} = authApi;
export default authSlice.reducer;
