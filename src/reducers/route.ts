import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IRoute {
  route: string;
  appState: string;
}
const initialState: IRoute = {
  route: "",
  appState: "",
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<string>) => {
      state.route = action.payload;
    },
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
  },
});

export const { setRoute, setAppState } = routeSlice.actions;
export default routeSlice.reducer;
