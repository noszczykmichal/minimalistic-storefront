import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { refreshSession } from "@/api/client";
import { hasSessionHint } from "@/api/sessionHint";
import type { User, StartSessionResponse } from "@/types/types";

export type AuthStatus = "checking" | "authenticated" | "anonymous";

interface AuthState {
  token: string;
  user: User | null;
  status: AuthStatus;
  accessTokenExpiresAt: number;
  isAccessTokenExpiring: boolean | null;
}

const initialState: AuthState = {
  token: "",
  user: null,
  status: "checking",
  accessTokenExpiresAt: 0,
  isAccessTokenExpiring: null,
};

// Exchanges the httpOnly session cookie for a new access token, e.g. after a
// page reload. The browser stores the rotated cookie from the response.
// Resolves to null without a request when this browser never signed in.
export const restoreSession = createAsyncThunk("auth/restoreSession", () => {
  if (hasSessionHint()) {
    return refreshSession();
  }
  return null;
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveSessionData(
      state,
      action: PayloadAction<StartSessionResponse>,
    ): AuthState {
      return {
        ...state,
        token: action.payload.accessToken,
        user: action.payload.user,
        status: "authenticated",
        accessTokenExpiresAt: action.payload.accessTokenExpiresAt,
      };
    },
    clearSessionData(): AuthState {
      return { ...initialState, status: "anonymous" };
    },
    setIsAccessTokenExpiring(state, action) {
      return { ...state, isAccessTokenExpiring: action.payload };
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
          accessTokenExpiresAt: action.payload.accessTokenExpiresAt,
          isAccessTokenExpiring: false,
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
