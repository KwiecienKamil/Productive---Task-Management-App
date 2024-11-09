import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { doneDateSlice } from "./features/doneDateSlice";
import { diamondsSlice } from "./features/diamondsSlice";
import { taskSlice } from "./features/taskSlice";

export const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
    doneDate: doneDateSlice.reducer,
    diamonds: diamondsSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
