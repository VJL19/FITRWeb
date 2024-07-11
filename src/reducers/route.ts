import { createSlice } from "@reduxjs/toolkit";

interface IRoute {
  route: string;
}
const initialState: IRoute = {
  route: "",
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoute: (state, action) => {
      state.route = action.payload;
    },
  },
});

export const { setRoute } = routeSlice.actions;
export default routeSlice.reducer;
