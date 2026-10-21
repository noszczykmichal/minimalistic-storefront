import { render, screen, waitFor, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import { legacy_configureStore as configureMockStore } from "redux-mock-store";

import Toast from "@/components/UI/Toast/Toast";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";

const createToastStore = (isToastOpen: boolean) =>
  configureMockStore([])({ ui: { isToastOpen } });

const renderToast = (isToastOpen: boolean) =>
  render(
    <WithMockStoreAndRouter customStore={createToastStore(isToastOpen)}>
      <Toast />
    </WithMockStoreAndRouter>,
  );

describe("Toast component", () => {
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

  it("should render the message into #modals-root when open", () => {
    renderToast(true);

    expect(
      within(modalsRoot).getByText("Account has been created"),
    ).toBeInTheDocument();
  });

  it("should render nothing when closed", () => {
    renderToast(false);

    expect(
      screen.queryByText("Account has been created"),
    ).not.toBeInTheDocument();
  });

  it("should unmount the message after it closes", async () => {
    const { rerender } = renderToast(true);

    rerender(
      <WithMockStoreAndRouter customStore={createToastStore(false)}>
        <Toast />
      </WithMockStoreAndRouter>,
    );

    await waitFor(
      () =>
        expect(
          screen.queryByText("Account has been created"),
        ).not.toBeInTheDocument(),
      { timeout: 1000 },
    );
  });

  it("should have no accessibility violations", async () => {
    renderToast(true);

    expect(await axe(modalsRoot)).toHaveNoViolations();
  });
});
