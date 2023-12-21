import { createAction, createReducer } from "@reduxjs/toolkit";



export interface TaskFilterState {
  value: string[]
}

const initialState: TaskFilterState = {
  value: ["1", "2", "3", "4"] as string[]
};

export const setTaskFilter = createAction<Array<string>>("setTaskFilter");

const taskReducer = createReducer(initialState, (builder) =>
  builder.addCase(setTaskFilter, (state, action) => {
    // immerjs giup mutate 1 state object 1 cach an toan
    // console.log(action.payload)
    state.value = action.payload;
  })
);

export default taskReducer;
