import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import ISubscriptions from "src/utils/types/subscription.types";

export interface ITransactionApiState {
  message: string;
  error: string;
  status: number;
  result: ISubscriptions[];
}

interface ITransactionSliceState {
  transactionData: ISubscriptions;
}

const initialState: ITransactionSliceState = {
  transactionData: {
    UserID: 0,
    Birthday: "",
    Address: "",
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
    SubscriptionID: 0,
    SubscriptionAmount: 0,
    SubscriptionType: "",
    SubscriptionMethod: "",
    SubscriptionStatus: "",
    SubscriptionUploadedImage: "",
    SubscriptionEntryDate: "",
    No_M_SubscriptionID: 0,
  },
};

const config = loadConfig();
export const transactionApi = createApi({
  reducerPath: "admin/transaction",
  tagTypes: ["transaction"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsersTransactions: builder.query<ITransactionApiState, void>({
      query: () => "/user/subscription/all_subscriptions",
      providesTags: ["transaction"],
    }),
    getAllUsersTransactionsHistory: builder.query<ITransactionApiState, void>({
      query: () => "/user/subscription/history/all_subscriptions",
      providesTags: ["transaction"],
    }),
    getAllUsersTransactionsByDate: builder.mutation<
      ITransactionApiState,
      { selectedDate: string }
    >({
      query: ({ selectedDate }) => ({
        url: `/admin/subscription/all_subscriptions_by_date/:${selectedDate}`,
        method: "GET",
      }),
      invalidatesTags: ["transaction"],
    }),
    getAllUserRecentTransactions: builder.query<ITransactionApiState, void>({
      query: () => "/admin/subscription/all_recent_subscriptions",
      providesTags: ["transaction"],
    }),
    getAllPendingTransactions: builder.query<ITransactionApiState, void>({
      query: () => "/admin/subscription/all_pending_subscriptions",
      providesTags: ["transaction"],
    }),
    getAllFulfillTransactions: builder.query<ITransactionApiState, void>({
      query: () => "/admin/subscription/all_fulfill_subscriptions",
      providesTags: ["transaction"],
    }),
    fulfillUserTransaction: builder.mutation<
      ITransactionApiState,
      { SubscriptionID: number | undefined; SubscriptionStatus: string }
    >({
      query: (arg) => ({
        url: "/admin/subscription/fulfill_subscription",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["transaction"],
    }),
    createSubscription: builder.mutation<
      ITransactionApiState,
      {
        SubscriptionAmount: string;
        SubscriptionBy: string;
        SubscriptionType: string;
        SubscriptionMethod: string;
      }
    >({
      query: (arg) => ({
        url: "/admin/subscription/create_subscription",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["transaction"],
    }),
    deleteTransaction: builder.mutation<
      ITransactionApiState,
      { SubscriptionID: number | undefined }
    >({
      query: ({ SubscriptionID }) => ({
        url: `/admin/subscription/delete_subscription:${SubscriptionID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    setTransactionData: (state, action: PayloadAction<ISubscriptions>) => {
      state.transactionData = action.payload;
    },
  },
});

export const { setTransactionData } = transactionSlice.actions;

export const {
  useGetAllUsersTransactionsQuery,
  useGetAllUsersTransactionsHistoryQuery,
  useFulfillUserTransactionMutation,
  useGetAllPendingTransactionsQuery,
  useGetAllFulfillTransactionsQuery,
  useGetAllUsersTransactionsByDateMutation,
  useGetAllUserRecentTransactionsQuery,
  useCreateSubscriptionMutation,
  useDeleteTransactionMutation,
} = transactionApi;

export default transactionSlice.reducer;
