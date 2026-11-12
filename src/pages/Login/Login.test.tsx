vi.mock("@/api/auth/auth", () => ({ signIn: vi.fn(), signUp: vi.fn() }));

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import Login from "@/pages/Login/Login";
import auth from "@/store/auth/auth";
import { signIn } from "@/api/auth/auth";
import { renderWithProviders } from "@/utils/testUtils";
import type { StartSessionResponse } from "@/types/types";

const sessionResponse: StartSessionResponse = {
  accessToken: "access-token",
  user: { firstName: "Jane", email: "jane@example.com" },
  accessTokenExpiresAt: 1_900_000_000_000,
};

const renderLogin = () =>
  renderWithProviders(<Login />, {
    preloadedState: {
      auth: { ...auth.getInitialState(), status: "anonymous" },
    },
  });

const fillAndSubmit = async (email: string, password: string) => {
  await userEvent.type(screen.getByLabelText("E-mail:"), email);
  await userEvent.type(screen.getByLabelText("Password"), password);
  await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
};

describe("Login page", () => {
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    vi.clearAllMocks();

    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

  it("should render the sign-in form with the sign-up modal closed", () => {
    renderLogin();

    expect(screen.getByLabelText("E-mail:")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register now" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Sign up" }),
    ).not.toBeInTheDocument();
  });

  it("should show validation errors and not call the API when the form is empty", async () => {
    renderLogin();

    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Please enter a valid email address."),
    ).toBeInTheDocument();
    expect(screen.getByText("This field is required.")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail:")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(signIn).not.toHaveBeenCalled();
  });

  it("should sign in and save the session in the store", async () => {
    vi.mocked(signIn).mockResolvedValue(sessionResponse);
    const { store } = renderLogin();

    await fillAndSubmit("jane@example.com", "secret");

    expect(signIn).toHaveBeenCalledTimes(1);
    expect(signIn).toHaveBeenCalledWith({
      email: "jane@example.com",
      password: "secret",
    });
    await waitFor(() =>
      expect(store.getState().auth.status).toBe("authenticated"),
    );
    expect(store.getState().auth.token).toBe("access-token");
    expect(store.getState().auth.user).toEqual(sessionResponse.user);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should show an error and stay anonymous when sign-in fails", async () => {
    vi.mocked(signIn).mockRejectedValue(new Error("401"));
    const { store } = renderLogin();

    await fillAndSubmit("jane@example.com", "wrong");

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid email or password",
    );
    expect(store.getState().auth.status).toBe("anonymous");
    expect(store.getState().auth.token).toBe("");
  });

  it("should clear the sign-in error when the user edits a field", async () => {
    vi.mocked(signIn).mockRejectedValue(new Error("401"));
    renderLogin();

    await fillAndSubmit("jane@example.com", "wrong");
    await screen.findByRole("alert");

    await userEvent.type(screen.getByLabelText("Password"), "1");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should open the sign-up modal and close it with 'Cancel'", async () => {
    renderLogin();

    await userEvent.click(screen.getByRole("button", { name: "Register now" }));

    expect(
      screen.getByRole("heading", { name: "Sign up" }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: "Sign up" }),
      ).not.toBeInTheDocument(),
    );
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderLogin();

    expect(await axe(container)).toHaveNoViolations();
  });
});
