import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/api/types/user";
import * as storage from "@/lib/utils";
import { Bookings } from "@/api/types/venues";

interface AppState {
  user: User | null;
}

const storedUser = storage.load("user");

const initialState: AppState = {
  user: storedUser ?? null,
};

interface AvatarPayload {
  url: string;
  alt: string;
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const user = {
        ...action.payload,
        bookings: action.payload.bookings ?? [],
      };
      state.user = user;
      storage.save("user", user);
    },

    clearUser: (state) => {
      state.user = null;
      localStorage.clear();
    },

    setBookings: (state, action: PayloadAction<Bookings[]>) => {
      if (state.user) {
        state.user.bookings = action.payload;
        storage.save("user", state.user);
      }
    },

    updateUserAvatar: (state, action: PayloadAction<AvatarPayload>) => {
      if (state.user) {
        state.user.avatar = action.payload;
        storage.save("user", state.user);
      }
    },
  },
});

export const { setUser, clearUser, setBookings, updateUserAvatar } =
  appSlice.actions;
export default appSlice.reducer;
