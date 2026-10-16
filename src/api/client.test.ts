const { post } = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock("axios", () => ({
  default: { create: () => ({ post }) },
}));

import { logOut, refreshSession, signIn } from "@/api/client";
import { hasSessionHint, setSessionHint } from "@/api/sessionHint";

describe("api client", () => {
  const session = {
    accessToken: "fresh-token",
    user: { firstName: "Jane", email: "jane@example.com" },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe("signIn", () => {
    it("should store the session hint after a successful login", async () => {
      post.mockResolvedValue({ data: { ...session, message: "Logged in" } });

      await signIn({ email: "jane@example.com", password: "Secret1!" });

      expect(hasSessionHint()).toBe(true);
    });

    it("should not store the session hint when the login fails", async () => {
      post.mockRejectedValue(new Error("Unauthorized"));

      await expect(
        signIn({ email: "jane@example.com", password: "wrong" }),
      ).rejects.toThrow("Unauthorized");

      expect(hasSessionHint()).toBe(false);
    });
  });

  describe("logOut", () => {
    it("should POST to /auth/logout without a payload", async () => {
      post.mockResolvedValue({ data: { message: "Logout" } });

      await logOut();

      expect(post).toHaveBeenCalledWith("/auth/logout");
    });

    it("should return the response body", async () => {
      post.mockResolvedValue({ data: { message: "Logout" } });

      expect(await logOut()).toEqual({ message: "Logout" });
    });

    it("should reject when the request fails", async () => {
      post.mockRejectedValue(new Error("Network Error"));

      await expect(logOut()).rejects.toThrow("Network Error");
    });

    it("should clear the session hint even when the request fails", async () => {
      setSessionHint();
      post.mockRejectedValue(new Error("Network Error"));

      await expect(logOut()).rejects.toThrow("Network Error");

      expect(hasSessionHint()).toBe(false);
    });
  });

  describe("refreshSession", () => {
    it("should POST to /auth/refresh and return the response body", async () => {
      post.mockResolvedValue({ data: session });

      expect(await refreshSession()).toEqual(session);
      expect(post).toHaveBeenCalledWith("/auth/refresh");
    });

    it("should share one request between concurrent calls", async () => {
      post.mockResolvedValue({ data: session });

      const results = await Promise.all([refreshSession(), refreshSession()]);

      expect(post).toHaveBeenCalledTimes(1);
      expect(results).toEqual([session, session]);
    });

    it("should send a new request once the previous one has settled", async () => {
      post.mockResolvedValue({ data: session });

      await refreshSession();
      await refreshSession();

      expect(post).toHaveBeenCalledTimes(2);
    });

    it("should send a new request after a failed one", async () => {
      post.mockRejectedValueOnce(new Error("Unauthorized"));
      post.mockResolvedValueOnce({ data: session });

      await expect(refreshSession()).rejects.toThrow("Unauthorized");

      expect(await refreshSession()).toEqual(session);
      expect(post).toHaveBeenCalledTimes(2);
    });

    it("should keep the session hint when the refresh succeeds", async () => {
      setSessionHint();
      post.mockResolvedValue({ data: session });

      await refreshSession();

      expect(hasSessionHint()).toBe(true);
    });

    it("should clear the session hint when the refresh fails", async () => {
      setSessionHint();
      post.mockRejectedValue(new Error("Unauthorized"));

      await expect(refreshSession()).rejects.toThrow("Unauthorized");

      expect(hasSessionHint()).toBe(false);
    });
  });
});
