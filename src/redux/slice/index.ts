import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  token: string | null;
}

interface AppState {
  user: User;
}

const initialState: AppState = {
  user: {
    token: null,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
    clearToken: (state) => {
      state.user.token = null;
    },
    // later: setUser, clearUser, etc.
  },
});

export const { setToken, clearToken } = appSlice.actions;
export default appSlice.reducer;
