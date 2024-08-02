import { createSlice } from "@reduxjs/toolkit";

interface IModalState {
  open: boolean;
  fileModalOpen: boolean;
  previewModalOpen: boolean;
}

const initialState: IModalState = {
  open: false,
  fileModalOpen: false,
  previewModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.open = true;
    },
    handleClose: (state) => {
      state.open = false;
    },
    handleFileModalOpen: (state) => {
      state.fileModalOpen = true;
    },
    handleFileModalClose: (state) => {
      state.fileModalOpen = false;
    },
    handlePreviewModalOpen: (state) => {
      state.previewModalOpen = true;
    },
    handlePreviewModalClose: (state) => {
      state.previewModalOpen = false;
    },
  },
});

export const {
  handleOpen,
  handleFileModalOpen,
  handleClose,
  handleFileModalClose,
  handlePreviewModalOpen,
  handlePreviewModalClose,
} = modalSlice.actions;

export default modalSlice.reducer;
