import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  token: string | null;
}

// Load from localStorage
const localUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState: UserState = {
  user: localUser ? JSON.parse(localUser) : null,
  token: localToken || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;

      // Clear from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;