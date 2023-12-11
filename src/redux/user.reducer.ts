import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "../models";

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const setCurrentUser = createAction<User | null>("setUser");

const userReducer = createReducer(initialState, (builder) =>
  builder.addCase(setCurrentUser, (state, action) => {
    // immerjs giup mutate 1 state object 1 cach an toan
    state.user = action.payload;
  })
);

export default userReducer;
