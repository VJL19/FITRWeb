import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import IProgramSuggested from "src/utils/types/program_suggested.types";

interface IProgramApiState {
  error: string;
  message: string;
  status: number;
  result: IProgramSuggested[];
}

interface IProgramSliceState {
  programData: IProgramSuggested;
}

const initialState: IProgramSliceState = {
  programData: {
    SuggestedProgramID: 0,
    SuggestedProgramTitle: "",
    SuggestedProgramDescription: "",
    SuggestedProgramEntryDate: "",
  },
};

const config = loadConfig();

export const programApi = createApi({
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      headers.set("ngrok-skip-browser-warning", "any");
      return headers;
    },
    baseUrl: config.BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["suggested_program"],
  reducerPath: "admin/suggested_program",
  endpoints: (builder) => ({
    getSuggestedProgram: builder.query<IProgramApiState, void>({
      query: () => "/admin/program/program_suggested",
      providesTags: ["suggested_program"],
    }),
    getTotalSuggestedProgram: builder.query<IProgramApiState, void>({
      query: () => "/admin/program/total_program_suggested",
      providesTags: ["suggested_program"],
    }),
    createSuggestedProgram: builder.mutation<
      IProgramApiState,
      {
        SuggestedProgramTitle: string;
        SuggestedProgramDescription: string;
        SuggestedProgramEntryDate: string;
      }
    >({
      query: (arg) => ({
        url: "/admin/program/create_program_suggested",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["suggested_program"],
    }),
    editProgramController: builder.mutation<
      IProgramApiState,
      {
        SuggestedProgramID: number;
        SuggestedProgramTitle: string;
        SuggestedProgramDescription: string;
        SuggestedProgramEntryDate: string;
      }
    >({
      query: (arg) => ({
        url: "/admin/program/edit_program_suggested",
        method: "PUT",
        body: arg,
      }),
      invalidatesTags: ["suggested_program"],
    }),
    deleteSuggestedProgram: builder.mutation<
      IProgramApiState,
      { SuggestedProgramID: number }
    >({
      query: ({ SuggestedProgramID }) => ({
        url: `/admin/program/program_suggested:${SuggestedProgramID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["suggested_program"],
    }),
  }),
});

export const programSlice = createSlice({
  name: "suggested_program",
  initialState,
  reducers: {
    setSuggestedProgramData: (
      state,
      action: PayloadAction<IProgramSuggested>
    ) => {
      state.programData = action.payload;
    },
  },
});
export const { setSuggestedProgramData } = programSlice.actions;
export const {
  useCreateSuggestedProgramMutation,
  useEditProgramControllerMutation,
  useGetSuggestedProgramQuery,
  useGetTotalSuggestedProgramQuery,
  useDeleteSuggestedProgramMutation,
} = programApi;
export default programSlice.reducer;
