import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { refreshSession } from "@/api/client";
import { hasSessionHint } from "@/api/sessionHint";
import { User } from "@/types/types";

export type AuthStatus = "checking" | "authenticated" | "anonymous";

interface AuthState {
  token: string;
  user: User | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  token: "",
  user: null,
  status: "checking",
};

// Exchanges the httpOnly session cookie for a new access token, e.g. after a
// page reload. The browser stores the rotated cookie from the response.
// Resolves to null without a request when this browser never signed in.
export const restoreSession = createAsyncThunk("auth/restoreSession", () =>
  hasSessionHint() ? refreshSession() : null,
);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveCredentials(
      state,
      action: PayloadAction<{ accessToken: string; user: User }>,
    ): AuthState {
      return {
        ...state,
        token: action.payload.accessToken,
        user: action.payload.user,
        status: "authenticated",
      };
    },
    clearCredentials(): AuthState {
      return { ...initialState, status: "anonymous" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state): AuthState => ({
        ...state,
        status: "checking",
      }))
      .addCase(restoreSession.fulfilled, (state, action): AuthState => {
        if (!action.payload) {
          return { ...initialState, status: "anonymous" };
        }

        return {
          ...state,
          token: action.payload.accessToken,
          user: action.payload.user,
          status: "authenticated",
        };
      })
      .addCase(restoreSession.rejected, (): AuthState => ({
        ...initialState,
        status: "anonymous",
      }));
  },
});

export const authActions = auth.actions;

export default auth;
