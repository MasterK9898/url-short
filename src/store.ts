import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Tier, type User } from "./interface/user";

// currently we ownly need to store login status, therefore we don't need a separated file for reducer

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null as User | null,
    // value: {
    //   email: "tier@gmail.com",
    //   tier: Tier.Silver,
    // } as User | null,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: { user: userSlice.reducer },
});

// for debugging
// @ts-ignore
window.store = store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
