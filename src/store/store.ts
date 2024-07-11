import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/counter";
import auth from "../reducers/auth";
import route from "../reducers/route";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: auth,
    route: route,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
