const validators = {
  stringValidator: (text: string) => {
    return text.length >= 4;
  },
  emailValidator: (text: string) => {
    return text.includes("@");
  },
};

const errorMessages = {
  lengthErrorMessage: "Enter at least for 4 characters.",
  telErrorMessage: "Enter a correct phone number.",
  emailErrorMessage:
    "Invalid value in the field. Please enter a value in the format: example@domain.com",
};

const formInputs = [
  {
    label: "First Name:",
    name: "fName",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Last Name:",
    name: "lName",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Address Line 1:",
    name: "address_1",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Address Line 2:",
    name: "address_2",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "City:",
    name: "city",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Postal Code:",
    name: "postal_code",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Country:",
    name: "country",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Phone:",
    name: "phone",
    type: "tel",
    errorMessage: errorMessages.telErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "E-mail:",
    name: "email",
    type: "email",
    errorMessage: errorMessages.emailErrorMessage,
    validator: validators.emailValidator,
  },
];

export default formInputs;
