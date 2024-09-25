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
    logoutUserWeb: builder.mutation<IAccessWebToken, void>({
      query: () => ({
        url: "/admin/user/logout_account",
        method: "GET",
      }),
      invalidatesTags: ["authenticate"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetAccessWebTokenQuery,
  useLogoutUserWebMutation,
} = loginApi;

export default loginApi.reducer;
