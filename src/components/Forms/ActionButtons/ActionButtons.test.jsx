import * as ReactDOM from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import WithMockStoreAndRouter from "../../../utils/WithMockStoreAndRouter";
import ActionButtons from "./ActionButtons";

describe("ActionButtons component", () => {
  let testIsDisabled = true;
  const testBttnPath = "/cart/review";
  let testButtonText = "Next";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the ActionButtons with the 'Next' button disabled when 'isDisabled' is true", () => {
    render(
      <WithMockStoreAndRouter>
        <ActionButtons
          isNextBttnDisabled={testIsDisabled}
          nextBttnPath={testBttnPath}
          nextBttnCustomText={testButtonText}
        />
      </WithMockStoreAndRouter>,
    );

    const nextButton = screen.getByText(testButtonText);

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveAttribute("disabled");
  });

  it("should render the ActionButtons with the 'Next' button which is enabled when 'isDisabled' is false", () => {
    testIsDisabled = false;

    render(
      <WithMockStoreAndRouter>
        <ActionButtons
          isNextBttnDisabled={testIsDisabled}
          nextBttnPath={testBttnPath}
          nextBttnCustomText={testButtonText}
        />
      </WithMockStoreAndRouter>,
    );

    const nextButton = screen.getByText(testButtonText);

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toHaveAttribute("disabled");
  });

  it("should render the ActionsButton with button containing a custom text", () => {
    testButtonText = "custom text";

    render(
      <WithMockStoreAndRouter>
        <ActionButtons
          isNextBttnDisabled={testIsDisabled}
          nextBttnPath={testBttnPath}
          nextBttnCustomText={testButtonText}
        />
      </WithMockStoreAndRouter>,
    );

    const nextButton = screen.getByText(testButtonText);

    expect(nextButton).toBeInTheDocument();
  });

  it("should render the ActionsButton with a custom class", () => {
    const testCustomClass = "my-custom-class";

    render(
      <WithMockStoreAndRouter>
        <ActionButtons
          isNextBttnDisabled={testIsDisabled}
          nextBttnPath={testBttnPath}
          customClass={testCustomClass}
          nextBttnCustomText={testButtonText}
        />
      </WithMockStoreAndRouter>,
    );

    const nextButton = screen.getByText(testButtonText);
    const { parentElement } = nextButton;

    expect(parentElement).toHaveClass(testCustomClass);
  });

  it("should navigate back to the previous page when 'Back' button is clicked", () => {
    const mockedUseNavigate = jest.fn();

    jest.spyOn(ReactDOM, "useNavigate").mockReturnValue(mockedUseNavigate);

    render(
      <WithMockStoreAndRouter>
        <ActionButtons
          isNextBttnDisabled={testIsDisabled}
          nextBttnPath={testBttnPath}
          nextBttnCustomText={testButtonText}
        />
      </WithMockStoreAndRouter>,
    );

    const backButton = screen.getByText(/Back/);
    userEvent.click(backButton);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  it("should navigate to the page specified in 'nextBttnPath' when 'Next' button is clicked", () => {
    const mockedUseNavigate = jest.fn();
    testButtonText = "Next";

    jest.spyOn(ReactDOM, "useNavigate").mockReturnValue(mockedUseNavigate);

    render(
      <WithMockStoreAndRouter>
        <ActionButtons
          isNextBttnDisabled={testIsDisabled}
          nextBttnPath={testBttnPath}
          nextBttnCustomText={testButtonText}
        />
      </WithMockStoreAndRouter>,
    );

    const nextButton = screen.getByText(testButtonText);
    userEvent.click(nextButton);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith(testBttnPath);
  });
});
