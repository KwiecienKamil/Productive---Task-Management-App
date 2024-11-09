import { createSlice } from "@reduxjs/toolkit";

export interface Diamond {
  User_id: number | undefined;
  value: number | undefined;
}

interface diamondsState {
  diamonds: Diamond[];
}

const initialState: diamondsState = {
  diamonds: localStorage.getItem("diamonds")
    ? JSON.parse(localStorage.getItem("diamonds") || `[]`)
    : [],
};

export const diamondsSlice = createSlice({
  name: "diamond",
  initialState,
  reducers: {
    addDiamonds: (state, action) => {
      state.diamonds.push(action.payload);
      localStorage.setItem("diamonds", JSON.stringify(state.diamonds));
    },
  },
});

export default diamondsSlice.reducer;
export const { addDiamonds } = diamondsSlice.actions;
