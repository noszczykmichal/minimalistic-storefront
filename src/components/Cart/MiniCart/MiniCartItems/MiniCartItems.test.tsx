vi.mock("@/hooks/useReduxHooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));
import { render, screen } from "@testing-library/react";

import MiniCartItems from "@/components/Cart/MiniCart/MiniCartItems/MiniCartItems";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { testItemDetails } from "@/utils/testUtils";
import type { RootState } from "@/store/store";

describe("MiniCartItems component", () => {
  const cart = [testItemDetails];

  beforeEach(() => {
    vi.clearAllMocks();
    const state = {
      products: { billingCurrency: "$", cart },
    } as unknown as RootState;

    vi.mocked(useAppSelector).mockImplementation((selector) => selector(state));
  });

  it("should render one MiniCartItem", () => {
    render(<MiniCartItems />);
    const miniCartItems = screen.getAllByRole("listitem");

    expect(miniCartItems.length).toBe(cart.length);
  });
});
