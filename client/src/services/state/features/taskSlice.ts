import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface Task {
  Task_id: number | undefined;
  Task_title: string | undefined;
  Task_doneDates: string[];
  Task_isTaskDone: boolean;
  User_id: number;
}

interface tasksState {
  tasks: Task[];
}

const initialState: tasksState = {
  tasks: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks") || `[]`)
    : [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      const updatedCart = state.tasks.filter(
        (task) => task.Task_id !== action.payload.Task_id
      );
      state.tasks = updatedCart;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    doneDate: (state, action) => {
      const currentTask = state.tasks.find(
        (task) => task.Task_id === action.payload.Task_id
      );
      if (
        currentTask?.Task_doneDates.find(
          (date) => date === dayjs().format("DD-MM-YY")
        )
      ) {
      } else {
        currentTask?.Task_doneDates.push(dayjs().format("DD-MM-YY"));
        currentTask!.Task_isTaskDone = true;
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    notDoneTask: (state, action) => {
      const currentTask = state.tasks.find(
        (task) => task.Task_id === action.payload.Task_id
      );

      const dateIndex = currentTask?.Task_doneDates.indexOf(
        dayjs().format("DD-MM-YY")
      );
      currentTask?.Task_doneDates.splice(dateIndex!, 1);
      currentTask!.Task_isTaskDone = false;

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTaskTitle: (state, action) => {
      const currentTask = state.tasks.find(
        (task) => task.Task_id === action.payload.Task_id
      );

      currentTask!.Task_title = action.payload.Task_title;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export default taskSlice.reducer;
export const { addTask, removeTask, doneDate, notDoneTask, updateTaskTitle } =
  taskSlice.actions;
