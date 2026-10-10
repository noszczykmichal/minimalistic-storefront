import {
  clearSessionHint,
  hasSessionHint,
  setSessionHint,
} from "@/api/sessionHint";

describe("session hint", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should report no session before one is stored", () => {
    expect(hasSessionHint()).toBe(false);
  });

  it("should report a session after setSessionHint", () => {
    setSessionHint();

    expect(hasSessionHint()).toBe(true);
  });

  it("should report no session after clearSessionHint", () => {
    setSessionHint();
    clearSessionHint();

    expect(hasSessionHint()).toBe(false);
  });

  it("should assume a session may exist when storage can't be read", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });

    expect(hasSessionHint()).toBe(true);
  });

  it("should not throw when storage can't be written", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });

    expect(() => setSessionHint()).not.toThrow();
    expect(() => clearSessionHint()).not.toThrow();
  });
});
