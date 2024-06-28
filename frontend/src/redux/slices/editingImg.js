import { createSlice } from "@reduxjs/toolkit";

const imgSlice = createSlice({
  name: "editingImg",
  initialState: {
    img: "",
  },
  reducers: {
    setImg(state, action) {
      state.img = String(action.payload);
    },
    clearImg(state) {
      state.img = null;
    },
  },
});

export const { setImg, clearImg } = imgSlice.actions;
export const imgReducer = imgSlice.reducer;
