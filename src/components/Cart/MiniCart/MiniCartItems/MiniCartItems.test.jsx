jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));
import { render, screen } from "@testing-library/react";

import MiniCartItems from "./MiniCartItems";
import { useAppSelector } from "../../../../hooks/useReduxHooks";
import { testItemDetails } from "../../../../utils/testData";

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
