vi.mock("@/api/client", () => ({ refreshSession: vi.fn() }));
vi.mock("@/api/sessionHint", () => ({ hasSessionHint: vi.fn() }));

import { configureStore } from "@reduxjs/toolkit";

import { refreshSession } from "@/api/client";
import { hasSessionHint } from "@/api/sessionHint";
import authSlice, { authActions, restoreSession } from "@/store/auth/auth";
import type { User } from "@/types/types";

const { saveCredentials, clearCredentials } = authActions;
const { reducer } = authSlice;

const user: User = { firstName: "Jane", email: "jane@example.com" };

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
    });
  });

  it("should save the access token and user on saveCredentials", () => {
    const state = reducer(
      undefined,
      saveCredentials({ accessToken: "access-token", user }),
    );

    expect(state).toEqual({
      token: "access-token",
      user,
      status: "authenticated",
    });
  });

  it("should replace previous credentials on saveCredentials", () => {
    const previous = reducer(
      undefined,
      saveCredentials({ accessToken: "old-token", user }),
    );
    const otherUser: User = { firstName: "John", email: "john@example.com" };

    const state = reducer(
      previous,
      saveCredentials({ accessToken: "new-token", user: otherUser }),
    );

    expect(state).toEqual({
      token: "new-token",
      user: otherUser,
      status: "authenticated",
    });
  });

  it("should reset the token and user on clearCredentials", () => {
    const loggedIn = reducer(
      undefined,
      saveCredentials({ accessToken: "access-token", user }),
    );

    const state = reducer(loggedIn, clearCredentials());

    expect(state).toEqual({ token: "", user: null, status: "anonymous" });
  });

  describe("restoreSession", () => {
    it("should mark the session as being checked while the request is pending", () => {
      vi.mocked(refreshSession).mockReturnValue(new Promise(() => {}));
      const store = createAuthStore();

      store.dispatch(restoreSession());

      expect(store.getState().auth.status).toBe("checking");
    });

    it("should save the new access token and user when the refresh succeeds", async () => {
      vi.mocked(refreshSession).mockResolvedValue({
        accessToken: "fresh-token",
        user,
      });
      const store = createAuthStore();

      await store.dispatch(restoreSession());

      expect(store.getState().auth).toEqual({
        token: "fresh-token",
        user,
        status: "authenticated",
      });
    });

    it("should mark the user as anonymous when the refresh fails", async () => {
      vi.mocked(refreshSession).mockRejectedValue(new Error("Unauthorized"));
      const store = createAuthStore();
      store.dispatch(saveCredentials({ accessToken: "stale-token", user }));

      await store.dispatch(restoreSession());

      expect(store.getState().auth).toEqual({
        token: "",
        user: null,
        status: "anonymous",
      });
    });

    it("should mark the user as anonymous without a request when no session hint is stored", async () => {
      vi.mocked(hasSessionHint).mockReturnValue(false);
      const store = createAuthStore();

      await store.dispatch(restoreSession());

      expect(refreshSession).not.toHaveBeenCalled();
      expect(store.getState().auth).toEqual({
        token: "",
        user: null,
        status: "anonymous",
      });
    });
  });
});
