import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import { adminSlice } from "./slices/admin-slice";
import { playerSlice } from "./slices/player-slice";

export const store = configureStore({
  reducer: {
    user : userReducer,
    [playerSlice.reducerPath]: playerSlice.reducer,
    [adminSlice.reducerPath] : adminSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminSlice.middleware)
      .concat(playerSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
