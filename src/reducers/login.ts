import { loadConfig } from "src/global/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IUser from "src/utils/types/users.types";

const config = loadConfig();

interface ILoginAPI {
  status: number;
  details: string;
  user: IUser;
}
interface IAccessWebToken {
  message: string;
  user: IUser;
  isAuthenticated: boolean;
  accessToken: string;
  status: number;
}

export const loginApi = createApi({
  reducerPath: "/admin/user/login",
  tagTypes: ["authenticate"],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      headers.set("ngrok-skip-browser-warning", "any");
      return headers;
    },
    baseUrl: config.BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      ILoginAPI,
      { Username: string; Password: string }
    >({
      query: (arg) => ({
        url: "/admin/user/login_account",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["authenticate"],
    }),
    getAccessWebToken: builder.query<IAccessWebToken, void>({
      query: () => "/admin/user/dashboard",
      providesTags: ["authenticate"],
    }),
    getAccessTokenGuest: builder.query<IAccessWebToken, void>({
      query: () => "/admin/user/guest_dashboard",
      providesTags: ["authenticate"],
    }),
    getAuthToken: builder.query<IAccessWebToken, void>({
      query: () => "/admin/user/auth_dashboard",
      providesTags: ["authenticate"],
    }),
    logoutUserWeb: builder.mutation<IAccessWebToken, void>({
      query: () => ({
        url: "/admin/user/logout_account",
        method: "GET",
      }),
      invalidatesTags: ["authenticate"],
    }),
    loginAsGuest: builder.mutation<IAccessWebToken, void>({
      query: () => ({
        url: "/admin/user/login_as_guest",
        method: "GET",
      }),
      invalidatesTags: ["authenticate"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetAccessWebTokenQuery,
  useGetAccessTokenGuestQuery,
  useGetAuthTokenQuery,
  useLogoutUserWebMutation,
  useLoginAsGuestMutation,
} = loginApi;

export default loginApi.reducer;
