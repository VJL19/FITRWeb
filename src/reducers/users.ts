import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import IUser from "src/utils/types/users.types";

interface IUserApiState {
  error: string;
  status: number;
  message: string;
  result: IUser[];
}

const config = loadConfig();

export const usersApi = createApi({
  tagTypes: ["users"],
  reducerPath: "user/registered",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserApiState, void>({
      query: () => "/admin/user/all_users",
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
  }),
});

export const { useGetAllUsersQuery, useRegisterUserMutation } = usersApi;
