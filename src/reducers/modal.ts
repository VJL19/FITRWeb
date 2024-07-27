import { createSlice } from "@reduxjs/toolkit";

interface IModalState {
  open: boolean;
  fileModalOpen: boolean;
}

const initialState: IModalState = {
  open: false,
  fileModalOpen: false,
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
  },
});

export const {
  handleOpen,
  handleFileModalOpen,
  handleClose,
  handleFileModalClose,
} = modalSlice.actions;

export default modalSlice.reducer;
