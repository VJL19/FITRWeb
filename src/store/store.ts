import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/counter";
import auth from "../reducers/auth";
import route from "../reducers/route";
import { announcementApi } from "../reducers/announcement";
import announcementSlice from "../reducers/announcement";
import { setupListeners } from "@reduxjs/toolkit/query";
import modal from "src/reducers/modal";
import { attendanceApi } from "src/reducers/attendance";
import { usersApi } from "src/reducers/users";
import { transactionApi } from "src/reducers/transaction";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: auth,
    route: route,
    announcement: announcementSlice,
    modal: modal,
    [announcementApi.reducerPath]: announcementApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      announcementApi.middleware,
      attendanceApi.middleware,
      usersApi.middleware,
      transactionApi.middleware,
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
