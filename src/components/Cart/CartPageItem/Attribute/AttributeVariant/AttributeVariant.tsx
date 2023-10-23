import { AttributeVariantInterface } from "../../../../../models/utility-models";
import classes from "./AttributeVariant.module.css";

function AttributeVariant({
  variantData,
  variantType,
  inMiniView,
}: {
  variantData: AttributeVariantInterface;
  variantType: string;
  inMiniView: boolean;
}) {
  const { selected, displayValue, value } = variantData;
  let attachedClasses;
  let inlineStyles;
  let buttonText = "";

  if (variantType === "Color") {
    if (inMiniView) {
      attachedClasses = selected
        ? [
            classes["product-attribute__value--color--mini-cart"],
            classes["product-attribute__value--color-selected--mini-cart"],
          ]
        : [classes["product-attribute__value--color--mini-cart"]];
    } else {
      attachedClasses = selected
        ? [
            classes["product-attribute__value--color"],
            classes["product-attribute__value--color-selected"],
          ]
        : [classes["product-attribute__value--color"]];
    }
    inlineStyles = {
      backgroundColor: value === "#FFFFFF" ? "#F0F0F0" : `${value}`,
    };
  } else {
    if (inMiniView) {
      attachedClasses = selected
        ? [
            classes["product-attribute__value--mini-cart"],
            classes["product-attribute__value--selected--mini-cart"],
          ]
        : [classes["product-attribute__value--mini-cart"]];
    } else {
      attachedClasses = selected
        ? [
            classes["product-attribute__value"],
            classes["product-attribute__value--selected"],
          ]
        : [classes["product-attribute__value"]];
    }

    buttonText = value;
  }

  return (
    <button
      type="button"
      key={displayValue}
      className={attachedClasses.join(" ")}
      style={inlineStyles}
      aria-label={displayValue}
    >
      {buttonText}
    </button>
  );
}

export default AttributeVariant;
