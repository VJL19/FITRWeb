import { GridColDef } from "@mui/x-data-grid";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadConfig } from "src/global/config";
import { IAnnouncements } from "src/utils/types/announcement.types";

interface IAnnouncementState {
  error: string;
  message: string;
  status: number;
  result: IAnnouncements[];
  data: {
    rows: IAnnouncements[];
    columns: GridColDef[];
  };
}

interface IAnnouncementSliceState {
  announcementData: IAnnouncements;
}

const initialState: IAnnouncementSliceState = {
  announcementData: {
    AnnouncementID: 0,
    AnnouncementImage: "",
    AnnouncementTitle: "",
    AnnouncementDate: "",
    AnnouncementDescription: "",
  },
};

const config = loadConfig();

export const announcementApi = createApi({
  tagTypes: ["admin_announments"],
  reducerPath: "admin/announcements",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    getAnnouncements: builder.query<IAnnouncementState, void>({
      query: () => "/admin/announcement/all_announcements",
    }),
    createAnnouncement: builder.mutation<
      IAnnouncementState,
      {
        AnnouncementImage: string | undefined;
        AnnouncementTitle: string;
        AnnouncementDescription: string;
        AnnouncementDate: string;
      }
    >({
      query: (arg) => ({
        url: "/admin/announcement/create_announcement",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["admin_announments"],
    }),
    editAnnouncement: builder.mutation<
      IAnnouncementState,
      {
        AnnouncementID: number;
        AnnouncementImage: string | undefined;
        AnnouncementTitle: string;
        AnnouncementDescription: string;
        AnnouncementDate: string;
      }
    >({
      query: (arg) => ({
        url: "/admin/announcement/edit_announcement",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["admin_announments"],
    }),
    deleteAnnouncement: builder.mutation<
      IAnnouncementState,
      { AnnouncementID: number }
    >({
      query: ({ AnnouncementID }) => ({
        url: `/admin/announcement/delete_announcement:${AnnouncementID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin_announments"],
    }),
  }),
});

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    setAnnouncementData: (state, action: PayloadAction<IAnnouncements>) => {
      state.announcementData = action.payload;
    },
  },
});

export const { setAnnouncementData } = announcementSlice.actions;
export const {
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useEditAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;

export default announcementSlice.reducer;
