import { createAction, createReducer } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const setNewObjectCounter = createAction<number>("setNewObjectCounter");

const counterReducer = createReducer(initialState, (builder) =>
  builder.addCase(setNewObjectCounter, (state, action) => {
    // immerjs giup mutate 1 state object 1 cach an toan
    // console.log(action.payload)
    state.value += action.payload;
  })
);

export default counterReducer;
