import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface doneDate {
  Task_id: number | undefined;
  Task_doneDate: string | undefined;
}

interface doneDateSlice {
  doneDates: doneDate[];
}

const initialState: doneDateSlice = {
  doneDates: localStorage.getItem("doneDates")
    ? JSON.parse(localStorage.getItem("doneDates") || `[]`)
    : [],
};

export const doneDateSlice = createSlice({
  name: "doneDate",
  initialState,
  reducers: {
    addDoneDate: (state, action) => {
      state.doneDates.push(action.payload);
      localStorage.setItem("doneDates", JSON.stringify(state.doneDates));
    },
    removeDoneDate: (state, action) => {
      const currentTask_id = state.doneDates.filter(
        (date) => date.Task_id !== action.payload.Task_id
      );

      const updatedDoneDatesState = currentTask_id.filter(
        (date: any) => date.Task_doneDate !== dayjs().format("DD-MM-YY")
      );

      state.doneDates = updatedDoneDatesState;

      localStorage.setItem("doneDates", JSON.stringify(updatedDoneDatesState));
    },
  },
});

export default doneDateSlice.reducer;
export const { addDoneDate, removeDoneDate } = doneDateSlice.actions;
