vi.mock("@/hooks/useReduxHooks", async (importActual) => {
  const actual = await importActual();
  return { ...actual, useAppDispatch: vi.fn() };
});
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import { createTestStore } from "@/utils/testUtils";
import MiniCart from "@/components/Cart/MiniCart/MiniCart";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";

describe("MiniCart component", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useAppDispatch.mockReturnValue(dispatch);
  });

  it("should render a heading containing the word 'item' when 'productsTotal' is 1", () => {
    const mockStore = createTestStore(1);

    render(
      <WithMockStoreAndRouter customStore={mockStore}>
        <MiniCart />
      </WithMockStoreAndRouter>,
    );

    const heading = screen.getByText(/My Bag/);
    const wordPattern = /\bitem\b/;

    expect(wordPattern.test(heading.textContent)).toBe(true);
  });

  it("should render a heading containing the word 'items' when 'productsTotal' is 2 or greater", () => {
    const mockStore = createTestStore(2);

    render(
      <WithMockStoreAndRouter customStore={mockStore}>
        <MiniCart />
      </WithMockStoreAndRouter>,
    );

    const heading = screen.getByText(/My Bag/);
    const wordPattern = /\bitems\b/;

    expect(wordPattern.test(heading.textContent)).toBe(true);
  });

  it("should have no accessibility violations", async () => {
    const mockStore = createTestStore(2);

    const { container } = render(
      <WithMockStoreAndRouter customStore={mockStore}>
        <MiniCart />
      </WithMockStoreAndRouter>,
    );
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
