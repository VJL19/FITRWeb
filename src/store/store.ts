import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/counter";
import auth from "../reducers/auth";
import route from "../reducers/route";
import { announcementApi } from "../reducers/announcement";
import announcementSlice from "../reducers/announcement";
import { setupListeners } from "@reduxjs/toolkit/query";
import modal from "src/reducers/modal";
import { attendanceApi, attendanceSlice } from "src/reducers/attendance";
import users, { usersApi } from "src/reducers/users";
import { transactionApi, transactionSlice } from "src/reducers/transaction";
import { programApi, programSlice } from "src/reducers/program";
import { salesAnalyticsApi } from "src/reducers/sales_analytics";
import { recordApi, recordSlice } from "src/reducers/records";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: auth,
    route: route,
    announcement: announcementSlice,
    modal: modal,
    user: users,
    suggested_program: programSlice.reducer,
    transaction: transactionSlice.reducer,
    attendance: attendanceSlice.reducer,
    record: recordSlice.reducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [salesAnalyticsApi.reducerPath]: salesAnalyticsApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      announcementApi.middleware,
      attendanceApi.middleware,
      usersApi.middleware,
      transactionApi.middleware,
      programApi.middleware,
      salesAnalyticsApi.middleware,
      recordApi.middleware,
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
