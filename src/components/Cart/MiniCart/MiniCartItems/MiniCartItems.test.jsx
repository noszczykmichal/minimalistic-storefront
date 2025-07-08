jest.mock("@/hooks/useReduxHooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));
import { render, screen } from "@testing-library/react";

import MiniCartItems from "@/components/Cart/MiniCart/MiniCartItems/MiniCartItems";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { testItemDetails } from "@/utils/testUtils";

describe("MiniCartItems component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAppSelector.mockReturnValue({
      billingCurrency: "$",
      cart: [testItemDetails],
    });
  });

  it("should render one MiniCartItem", () => {
    const { cart } = useAppSelector();

    render(<MiniCartItems />);
    const miniCartItems = screen.getAllByRole("listitem");

    expect(miniCartItems.length).toBe(cart.length);
  });
});
