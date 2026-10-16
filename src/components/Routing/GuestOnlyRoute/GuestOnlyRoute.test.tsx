import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Route, Routes } from "react-router";
import configureMockStore from "redux-mock-store";

import GuestOnlyRoute from "@/components/Routing/GuestOnlyRoute/GuestOnlyRoute";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import type { AuthStatus } from "@/store/auth/auth";

const renderLoginRoute = (status: AuthStatus) =>
  render(
    <WithMockStoreAndRouter
      customStore={configureMockStore([])({ auth: { status } })}
      initialPath="/login"
    >
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route element={<GuestOnlyRoute />}>
          <Route path="/login" element={<h1>Login form</h1>} />
        </Route>
      </Routes>
    </WithMockStoreAndRouter>,
  );

describe("GuestOnlyRoute component", () => {
  it("should show the loader while the session is being checked", () => {
    renderLoginRoute("checking");

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Login form" }),
    ).not.toBeInTheDocument();
  });

  it("should render the guarded page for an anonymous user", () => {
    renderLoginRoute("anonymous");

    expect(
      screen.getByRole("heading", { name: "Login form" }),
    ).toBeInTheDocument();
  });

  it("should redirect an authenticated user to the home page", () => {
    renderLoginRoute("authenticated");

    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Login form" }),
    ).not.toBeInTheDocument();
  });

  it.each<AuthStatus>(["checking", "anonymous", "authenticated"])(
    "should have no accessibility violations when %s",
    async (status) => {
      const { container } = renderLoginRoute(status);

      expect(await axe(container)).toHaveNoViolations();
    },
  );
});
