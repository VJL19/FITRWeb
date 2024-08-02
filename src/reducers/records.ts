import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import { IRecords } from "src/utils/types/records.types";

interface IRecordApiState {
  message: string;
  result: IRecords[];
  error: string;
  status: number;
}

interface IRecordSliceState {
  recordData: IRecords;
}
const initialState: IRecordSliceState = {
  recordData: {
    RecordID: 0,
    RecordName: "",
    RecordDownloadLink: "",
    RecordEntryDate: "",
  },
};

const config = loadConfig();
export const recordApi = createApi({
  tagTypes: ["records"],
  reducerPath: "/admin/records",
  baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL }),
  endpoints: (builder) => ({
    getAllFileRecords: builder.query<IRecordApiState, void>({
      query: () => "/admin/records/all_records",
      providesTags: ["records"],
    }),
    uploadFileRecord: builder.mutation<
      IRecordApiState,
      {
        RecordName: string;
        RecordDownloadLink: string;
        RecordEntryDate: string;
      }
    >({
      query: (arg) => ({
        url: "/admin/records/upload_record",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["records"],
    }),
    editFileRecord: builder.mutation<
      IRecordApiState,
      {
        RecordID: number;
        RecordName: string;
        RecordDownloadLink: string;
        RecordEntryDate: string;
      }
    >({
      query: (arg) => ({
        url: "/admin/records/edit_record",
        method: "PUT",
        body: arg,
      }),
      invalidatesTags: ["records"],
    }),
    deleteFileRecord: builder.mutation<IRecordApiState, { RecordID: number }>({
      query: ({ RecordID }) => ({
        url: `/admin/records/delete_record/:${RecordID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["records"],
    }),
  }),
});

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setRecordData: (state, action: PayloadAction<IRecords>) => {
      state.recordData = action.payload;
    },
  },
});

export const { setRecordData } = recordSlice.actions;
export const {
  useGetAllFileRecordsQuery,
  useUploadFileRecordMutation,
  useEditFileRecordMutation,
  useDeleteFileRecordMutation,
} = recordApi;

export default recordSlice.reducer;
