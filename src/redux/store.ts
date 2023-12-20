import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import taskReducer from "./task.reducer";

export const store = configureStore({
  reducer: {
    // Ten thuoc tinh duoi day de dat ten cho state store name
    user: userReducer,
    taskFilter: taskReducer
  },
});

// Lấy RootState và AppDispatch từ store phuc vu cho TS
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
