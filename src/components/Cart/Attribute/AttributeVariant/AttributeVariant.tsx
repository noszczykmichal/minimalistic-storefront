import { AttributeVariantInterface } from "../../../../models/utility-models";
import classes from "./AttributeVariant.module.css";

function AttributeVariant({
  variantData,
  variantType,
}: {
  variantData: AttributeVariantInterface;
  variantType: string;
}) {
  const { selected, displayValue, value } = variantData;

  let attachedClasses;
  let inlineStyles;
  let buttonText = displayValue;

  if (variantType === "Color") {
    attachedClasses = selected
      ? [
          classes["product-attribute__value--color"],
          classes["product-attribute__value--color-selected"],
        ]
      : [classes["product-attribute__value--color"]];

    inlineStyles = {
      backgroundColor: value === "#FFFFFF" ? "#F0F0F0" : `${value}`,
    };
  } else {
    attachedClasses = selected
      ? [
          classes["product-attribute__value"],
          classes["product-attribute__value--selected"],
        ]
      : [classes["product-attribute__value"]];

    buttonText = value;
  }

  return (
    <button
      type="button"
      key={displayValue}
      className={attachedClasses.join(" ")}
      style={inlineStyles}
    >
      {buttonText}
    </button>
  );
}

export default AttributeVariant;
