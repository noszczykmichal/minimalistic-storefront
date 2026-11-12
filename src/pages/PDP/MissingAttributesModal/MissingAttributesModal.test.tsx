import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import MissingAttributesModal from "@/pages/PDP/MissingAttributesModal/MissingAttributesModal";

describe("MissingAttributesModal component", () => {
  const testNotSelected = ["size", "colour"];
  let modalsRoot: HTMLDivElement;
  const onCloseModalMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

  it("should not render Modal when isOpen is false", () => {
    render(
      <MissingAttributesModal
        notSelected={testNotSelected}
        isOpen={false}
        onCloseModal={onCloseModalMock}
      />,
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "OK" }),
    ).not.toBeInTheDocument();
  });

  it("should render a list item for every not selected attribute when isOpen is true", () => {
    render(
      <MissingAttributesModal
        notSelected={testNotSelected}
        isOpen
        onCloseModal={onCloseModalMock}
      />,
    );

    const listItems = screen.getAllByRole("listitem");

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(listItems).toHaveLength(testNotSelected.length);
    expect(listItems.map((item) => item.textContent)).toEqual(testNotSelected);
  });

  it("should render the error header and instructions", () => {
    render(
      <MissingAttributesModal
        notSelected={testNotSelected}
        isOpen
        onCloseModal={onCloseModalMock}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 5, name: "Missing Attributes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please select below options:"),
    ).toBeInTheDocument();
  });

  it("should call onCloseModal when OK is clicked", async () => {
    render(
      <MissingAttributesModal
        notSelected={testNotSelected}
        isOpen
        onCloseModal={onCloseModalMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(onCloseModalMock).toHaveBeenCalledTimes(1);
  });

  it("should have no accessibility violations", async () => {
    render(
      <MissingAttributesModal
        notSelected={testNotSelected}
        isOpen
        onCloseModal={onCloseModalMock}
      />,
    );

    const result = await axe(modalsRoot);

    expect(result).toHaveNoViolations();
  });
});
