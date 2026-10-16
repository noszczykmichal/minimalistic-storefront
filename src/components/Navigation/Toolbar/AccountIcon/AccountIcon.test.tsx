import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import configureMockStore from "redux-mock-store";

import AccountIcon from "@/components/Navigation/Toolbar/AccountIcon/AccountIcon";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import type { AuthStatus } from "@/store/auth/auth";
import type { User } from "@/types/types";

const user: User = { firstName: "Jane", email: "jane@example.com" };

const renderAccountIcon = (status: AuthStatus, authUser: User | null = null) =>
  render(
    <WithMockStoreAndRouter
      customStore={configureMockStore([])({
        auth: { status, user: authUser, token: authUser ? "token" : "" },
        ui: { isAccountMenuOpen: false },
      })}
    >
      <AccountIcon />
    </WithMockStoreAndRouter>,
  );

describe("AccountIcon component", () => {
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

  it("should render neither the sign-in link nor the account menu while the session is checked", () => {
    renderAccountIcon("checking");

    expect(
      screen.queryByRole("link", { name: "Sign in" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Account menu" }),
    ).not.toBeInTheDocument();
  });

  it("should render a sign-in link to the login page for an anonymous user", () => {
    renderAccountIcon("anonymous");

    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("should render the account menu button for an authenticated user", () => {
    renderAccountIcon("authenticated", user);

    expect(
      screen.getByRole("button", { name: "Account menu" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Sign in" }),
    ).not.toBeInTheDocument();
  });

  it.each<[AuthStatus, User | null]>([
    ["checking", null],
    ["anonymous", null],
    ["authenticated", user],
  ])(
    "should have no accessibility violations when %s",
    async (status, authUser) => {
      const { container } = renderAccountIcon(status, authUser);

      expect(await axe(container)).toHaveNoViolations();
    },
  );
});
