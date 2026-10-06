vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/uiSlice";
import type { RootState } from "@/store/store";
import MissingAttributesModal from "@/pages/PDP/MissingAttributesModal/MissingAttributesModal";

const mockModalState = (isModalOpen: boolean) => {
  const state = { ui: { isModalOpen } } as unknown as RootState;

  vi.mocked(useAppSelector).mockImplementation((selector) => selector(state));
};

describe("MissingAttributesModal component", () => {
  const dispatch = vi.fn();
  const { modalToggle, backdropVisibilityToggle } = uiActions;
  const testNotSelected = ["size", "colour"];
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
    mockModalState(true);

    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

  it("should not render Modal when isModalOpen is false", () => {
    mockModalState(false);

    render(<MissingAttributesModal notSelected={testNotSelected} />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "OK" }),
    ).not.toBeInTheDocument();
  });

  it("should render a list item for every not selected attribute when isModalOpen is true", () => {
    render(<MissingAttributesModal notSelected={testNotSelected} />);

    const listItems = screen.getAllByRole("listitem");

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(listItems).toHaveLength(testNotSelected.length);
    expect(listItems.map((item) => item.textContent)).toEqual(testNotSelected);
  });

  it("should render the error header and instructions", () => {
    render(<MissingAttributesModal notSelected={testNotSelected} />);

    expect(
      screen.getByRole("heading", { level: 5, name: "Error" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please select below options:"),
    ).toBeInTheDocument();
  });

  it("should dispatch 2 actions after button click", async () => {
    render(<MissingAttributesModal notSelected={testNotSelected} />);

    await userEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, modalToggle(false));
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      backdropVisibilityToggle(false),
    );
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <MissingAttributesModal notSelected={testNotSelected} />,
    );

    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
