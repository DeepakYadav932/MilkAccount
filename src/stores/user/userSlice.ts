import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface UserState {
  username: string;
  loading: boolean;
}

export type LoginResponse = {
  success: boolean;
};

// Initial state
const initialState: UserState = {
  username: "deepak",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = UserSlice.actions;
export const selectUsername = (state: RootState) => state.user.username;
export const userReducer = UserSlice.reducer;
