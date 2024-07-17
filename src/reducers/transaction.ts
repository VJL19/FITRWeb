import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import ISubscriptions from "src/utils/types/subscription.types";

interface ITransactionApiState {
  message: string;
  error: string;
  status: number;
  result: ISubscriptions[];
}

const config = loadConfig();
export const transactionApi = createApi({
  reducerPath: "admin/transaction",
  tagTypes: ["transaction"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUsersTransactions: builder.query<ITransactionApiState, void>({
      query: () => "/user/subscription/all_subscriptions",
      providesTags: ["transaction"],
    }),
  }),
});

export const { useGetAllUsersTransactionsQuery } = transactionApi;
