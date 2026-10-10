vi.mock("@/hooks/useReduxHooks", async (importActual) => {
  const actual = await importActual<typeof import("@/hooks/useReduxHooks")>();
  return { ...actual, useAppDispatch: vi.fn() };
});
vi.mock("@/api/client", () => ({ logOut: vi.fn() }));

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import configureMockStore from "redux-mock-store";

import AccountMenu from "@/components/Navigation/Toolbar/AccountMenu/AccountMenu";
import { logOut } from "@/api/client";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { authActions } from "@/store/auth/auth";
import { uiActions } from "@/store/ui/ui";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import type { User } from "@/types/types";

const user: User = { firstName: "Jane", email: "jane@example.com" };

const renderAccountMenu = (isAccountMenuOpen: boolean) =>
  render(
    <WithMockStoreAndRouter
      customStore={configureMockStore([])({ ui: { isAccountMenuOpen } })}
    >
      <AccountMenu user={user} />
    </WithMockStoreAndRouter>,
  );

describe("AccountMenu component", () => {
  const dispatch = vi.fn();
  const {
    accountMenuVisibilityToggle,
    currencySwitcherVisibToggle,
    miniCartVisibilityToggle,
  } = uiActions;
  const { clearCredentials } = authActions;
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);

    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
    vi.restoreAllMocks();
  });

  it("should render a collapsed account button and no menu when closed", () => {
    renderAccountMenu(false);

    expect(
      screen.getByRole("button", { name: "Account menu" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("dialog", { name: "Account" }),
    ).not.toBeInTheDocument();
  });

  it("should open the menu and close the other toolbar dropdowns on click", async () => {
    renderAccountMenu(false);

    await userEvent.click(screen.getByRole("button", { name: "Account menu" }));

    expect(dispatch).toHaveBeenCalledWith(accountMenuVisibilityToggle(true));
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
  });

  it("should render the menu with the user's email into #modals-root when open", () => {
    renderAccountMenu(true);

    const menu = within(modalsRoot).getByRole("dialog", { name: "Account" });

    expect(within(menu).getByText("Signed in as")).toBeInTheDocument();
    expect(within(menu).getByText("jane@example.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Account menu" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("should move focus into the menu when it opens", () => {
    renderAccountMenu(true);

    expect(screen.getByRole("dialog", { name: "Account" })).toHaveFocus();
  });

  it("should align the menu's right edge with the account button", () => {
    vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(
      1000,
    );
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      right: 900,
    } as DOMRect);

    renderAccountMenu(true);

    expect(screen.getByRole("dialog", { name: "Account" })).toHaveStyle({
      right: "100px",
    });
  });

  it("should close the menu on Escape", async () => {
    renderAccountMenu(true);

    await userEvent.keyboard("{Escape}");

    expect(dispatch).toHaveBeenCalledWith(accountMenuVisibilityToggle(false));
  });

  it("should end the session and clear the credentials on Log out", async () => {
    vi.mocked(logOut).mockResolvedValue({ message: "Logout" });
    renderAccountMenu(true);

    await userEvent.click(screen.getByRole("button", { name: "Log out" }));

    expect(dispatch).toHaveBeenCalledWith(accountMenuVisibilityToggle(false));
    expect(logOut).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith(clearCredentials()),
    );
  });

  it("should clear the credentials even when the logout request fails", async () => {
    vi.mocked(logOut).mockRejectedValue(new Error("Network Error"));
    renderAccountMenu(true);

    await userEvent.click(screen.getByRole("button", { name: "Log out" }));

    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith(clearCredentials()),
    );
  });

  it("should have no accessibility violations when open", async () => {
    renderAccountMenu(true);

    expect(await axe(document.body)).toHaveNoViolations();
  });
});
