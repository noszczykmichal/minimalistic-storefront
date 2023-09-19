import { validators } from "./config";

const { stringValidator, phoneValidator, emailValidator } = validators;

describe("stringValidator()", () => {
  test("should return false if provided text is blank", () => {
    const testText = "";

    const result = stringValidator(testText);

    expect(result).toBe(false);
  });

  test("should return false if provided text consists of blanks", () => {
    const testText = "   ";

    const result = stringValidator(testText);

    expect(result).toBe(false);
  });

  test("should return true if provided text consists of at least three characters", () => {
    const testText1 = "foo";
    const testText2 = "test";

    const result1 = stringValidator(testText1);
    const result2 = stringValidator(testText2);

    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });
});

describe("phoneValidator()", () => {
  test("should return false if provided text is blank", () => {
    const testText = "";

    const result = phoneValidator(testText);

    expect(result).toBe(false);
  });

  test("should return false if provided text consists of blanks", () => {
    const testText = "   ";

    const result = phoneValidator(testText);

    expect(result).toBe(false);
  });

  test("should return true if provided text consists of at least nine characters", () => {
    const testText1 = "foo foo foo";
    const testText2 = "test test";

    const result1 = phoneValidator(testText1);
    const result2 = phoneValidator(testText2);

    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });
});

describe("emailValidator()", () => {
  test("should return false if provided text is blank", () => {
    const testText = "";

    const result = emailValidator(testText);

    expect(result).toBe(false);
  });

  test("should return false if provided text consists of blanks", () => {
    const testText = "   ";

    const result = emailValidator(testText);

    expect(result).toBe(false);
  });

  test("should return true if provided text includes '@' sign", () => {
    const testText = "test@domain.com";

    const result = emailValidator(testText);

    expect(result).toBe(true);
  });
});
