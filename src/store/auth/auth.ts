import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { refreshSession, logOut } from "@/api/client";
import { hasSessionHint, clearSessionHint } from "@/api/sessionHint";
import type { User, StartSessionResponse } from "@/types/types";

export type AuthStatus = "checking" | "authenticated" | "anonymous";
export const WARNING_SECONDS = 30;

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

const loggedOutState: AuthState = { ...initialState, status: "anonymous" };

// Exchanges the httpOnly session cookie for a new access token, e.g. after a
// page reload. The browser stores the rotated cookie from the response.
// Resolves to null without a request when this browser never signed in.
export const restoreSession = createAsyncThunk("auth/restoreSession", () => {
  if (hasSessionHint()) {
    return refreshSession();
  }
  return null;
});
// Always ends logged out locally, even if the request fails.
export const logOutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await logOut();
  } catch {
    // Log out locally even if the server couldn't end the session.
  } finally {
    clearSessionHint();
  }
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
    setIsAccessTokenExpiring(state, action: PayloadAction<boolean>): AuthState {
      return { ...state, isAccessTokenExpiring: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state): AuthState =>
        state.status === "authenticated"
          ? state
          : { ...state, status: "checking" },
      )
      .addCase(restoreSession.fulfilled, (state, action): AuthState => {
        if (!action.payload) {
          return loggedOutState;
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
      .addCase(restoreSession.rejected, (): AuthState => loggedOutState)
      .addCase(logOutThunk.fulfilled, (): AuthState => loggedOutState);
  },
});

export const authActions = auth.actions;

export default auth;
