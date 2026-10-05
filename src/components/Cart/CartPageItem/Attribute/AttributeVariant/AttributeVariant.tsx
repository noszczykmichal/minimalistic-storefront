import { AttributeVariantInterface } from "@/types/types";
import classes from "@/components/Cart/CartPageItem/Attribute/AttributeVariant/AttributeVariant.module.css";

export default function AttributeVariant({
  variantData,
  variantType,
  inMiniView,
}: {
  variantData: AttributeVariantInterface;
  variantType: string;
  inMiniView: boolean;
}) {
  const { selected, value } = variantData;
  let attachedClasses;
  let inlineStyles;
  let chipText = "";

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

    chipText = value;
  }

  return (
    <span
      className={attachedClasses.join(" ")}
      style={inlineStyles}
      aria-hidden="true"
    >
      {chipText}
    </span>
  );
}
