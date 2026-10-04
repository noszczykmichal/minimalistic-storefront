import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import TextInput from "@/components/Forms/Inputs/TextInput/TextInput";

const createRegistration = (name = "firstName") => ({
  name,
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
});

describe("TextInput component", () => {
  let registration;

  const renderTextInput = (props = {}) =>
    render(
      <TextInput
        label="First Name:"
        type="text"
        autoComplete="given-name"
        registration={registration}
        {...props}
      />,
    );

  beforeEach(() => {
    registration = createRegistration();
  });

  it("should render an input associated with its label", () => {
    renderTextInput();

    const input = screen.getByLabelText("First Name:");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "firstName");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("autocomplete", "given-name");
  });

  it("should render the input type passed in props", () => {
    renderTextInput({ label: "E-mail:", type: "email", autoComplete: "email" });

    expect(screen.getByLabelText("E-mail:")).toHaveAttribute("type", "email");
  });

  it("should not mark the input as invalid or show a message when there is no error", () => {
    renderTextInput();

    expect(screen.getByLabelText("First Name:")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
    expect(
      screen.queryByText("This field is required."),
    ).not.toBeInTheDocument();
  });

  it("should mark the input as invalid and show the message when an error is passed", () => {
    renderTextInput({ error: "This field is required." });

    expect(screen.getByLabelText("First Name:")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("This field is required.")).toBeInTheDocument();
  });

  it("should call registration.onChange when the user types", async () => {
    renderTextInput();

    await userEvent.type(screen.getByLabelText("First Name:"), "Max");

    expect(registration.onChange).toHaveBeenCalled();
  });

  it("should pass the input element to registration.ref", () => {
    renderTextInput();

    expect(registration.ref).toHaveBeenCalledWith(
      screen.getByLabelText("First Name:"),
    );
  });
});
