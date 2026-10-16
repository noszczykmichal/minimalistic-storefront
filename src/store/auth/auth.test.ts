vi.mock("@/api/client", () => ({ refreshSession: vi.fn(), logOut: vi.fn() }));
vi.mock("@/api/sessionHint", () => ({
  hasSessionHint: vi.fn(),
  clearSessionHint: vi.fn(),
}));

import { configureStore } from "@reduxjs/toolkit";

import { logOut, refreshSession } from "@/api/client";
import { clearSessionHint, hasSessionHint } from "@/api/sessionHint";
import authSlice, {
  authActions,
  logOutThunk,
  restoreSession,
} from "@/store/auth/auth";
import type { User } from "@/types/types";

const { saveSessionData, setIsAccessTokenExpiring } = authActions;
const { reducer } = authSlice;

const user: User = { firstName: "Jane", email: "jane@example.com" };
const expiresAt = 1_700_000_000_000;

const loggedOutState = {
  token: "",
  user: null,
  status: "anonymous",
  accessTokenExpiresAt: 0,
  isAccessTokenExpiring: null,
};

const createAuthStore = () => configureStore({ reducer: { auth: reducer } });

describe("auth slice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(hasSessionHint).mockReturnValue(true);
  });

  it("should start with no token, no user and the session being checked", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      token: "",
      user: null,
      status: "checking",
      accessTokenExpiresAt: 0,
      isAccessTokenExpiring: null,
    });
  });

  it("should save the access token, user and expiry on saveSessionData", () => {
    const state = reducer(
      undefined,
      saveSessionData({
        accessToken: "access-token",
        user,
        accessTokenExpiresAt: expiresAt,
      }),
    );

    expect(state).toEqual({
      token: "access-token",
      user,
      status: "authenticated",
      accessTokenExpiresAt: expiresAt,
      isAccessTokenExpiring: null,
    });
  });

  it("should replace the previous session on saveSessionData", () => {
    const previous = reducer(
      undefined,
      saveSessionData({
        accessToken: "old-token",
        user,
        accessTokenExpiresAt: expiresAt,
      }),
    );
    const otherUser: User = { firstName: "John", email: "john@example.com" };

    const state = reducer(
      previous,
      saveSessionData({
        accessToken: "new-token",
        user: otherUser,
        accessTokenExpiresAt: expiresAt + 1000,
      }),
    );

    expect(state).toMatchObject({
      token: "new-token",
      user: otherUser,
      status: "authenticated",
      accessTokenExpiresAt: expiresAt + 1000,
    });
  });

  it("should set the expiring flag on setIsAccessTokenExpiring", () => {
    const state = reducer(undefined, setIsAccessTokenExpiring(true));

    expect(state.isAccessTokenExpiring).toBe(true);
  });

  describe("restoreSession", () => {
    it("should mark the session as being checked while the request is pending", () => {
      vi.mocked(refreshSession).mockReturnValue(new Promise(() => {}));
      const store = createAuthStore();

      store.dispatch(restoreSession());

      expect(store.getState().auth.status).toBe("checking");
    });

    it("should save the new session and reset the expiring flag when the refresh succeeds", async () => {
      vi.mocked(refreshSession).mockResolvedValue({
        accessToken: "fresh-token",
        user,
        accessTokenExpiresAt: expiresAt,
      });
      const store = createAuthStore();
      store.dispatch(setIsAccessTokenExpiring(true));

      await store.dispatch(restoreSession());

      expect(store.getState().auth).toEqual({
        token: "fresh-token",
        user,
        status: "authenticated",
        accessTokenExpiresAt: expiresAt,
        isAccessTokenExpiring: false,
      });
    });

    it("should mark the user as anonymous when the refresh fails", async () => {
      vi.mocked(refreshSession).mockRejectedValue(new Error("Unauthorized"));
      const store = createAuthStore();
      store.dispatch(
        saveSessionData({
          accessToken: "stale-token",
          user,
          accessTokenExpiresAt: expiresAt,
        }),
      );

      await store.dispatch(restoreSession());

      expect(store.getState().auth).toEqual(loggedOutState);
    });

    it("should mark the user as anonymous without a request when no session hint is stored", async () => {
      vi.mocked(hasSessionHint).mockReturnValue(false);
      const store = createAuthStore();

      await store.dispatch(restoreSession());

      expect(refreshSession).not.toHaveBeenCalled();
      expect(store.getState().auth).toEqual(loggedOutState);
    });
  });

  describe("logOutThunk", () => {
    const createLoggedInStore = () => {
      const store = createAuthStore();
      store.dispatch(
        saveSessionData({
          accessToken: "access-token",
          user,
          accessTokenExpiresAt: expiresAt,
        }),
      );
      return store;
    };

    it("should end the session, clear the hint and log the user out", async () => {
      vi.mocked(logOut).mockResolvedValue({ message: "Logout" });
      const store = createLoggedInStore();

      await store.dispatch(logOutThunk());

      expect(logOut).toHaveBeenCalledTimes(1);
      expect(clearSessionHint).toHaveBeenCalledTimes(1);
      expect(store.getState().auth).toEqual(loggedOutState);
    });

    it("should log the user out locally even when the request fails", async () => {
      vi.mocked(logOut).mockRejectedValue(new Error("Network Error"));
      const store = createLoggedInStore();

      await store.dispatch(logOutThunk());

      expect(clearSessionHint).toHaveBeenCalledTimes(1);
      expect(store.getState().auth).toEqual(loggedOutState);
    });
  });
});
