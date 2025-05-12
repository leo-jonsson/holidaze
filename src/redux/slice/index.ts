import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/api/types/user";

interface AppState {
  user: User | null;
}

const initialState: AppState = {
  user: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = appSlice.actions;
export default appSlice.reducer;
