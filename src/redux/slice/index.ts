import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/api/types/user";
import * as storage from "@/lib/utils";

interface AppState {
  user: User | null;
}

const storedUser = storage.load("user");

const initialState: AppState = {
  user: storedUser ?? null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;

      storage.save("user", action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      storage.remove("user");
    },
  },
});

export const { setUser, clearUser } = appSlice.actions;
export default appSlice.reducer;
