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
  const name = variantType;

  const textAttributeClasses = selected
    ? [
        classes["product-attribute__value"],
        classes["product-attribute__value--selected"],
      ]
    : [classes["product-attribute__value"]];

  let content = (
    <button
      type="button"
      key={displayValue}
      className={textAttributeClasses.join(" ")}
    >
      {value}
    </button>
  );

  if (name === "Color") {
    const colourAttributeClasses = selected
      ? [
          classes["product-attribute__value--color"],
          classes["product-attribute__value--color-selected"],
        ]
      : [classes["product-attribute__value--color"]];
    content = (
      <button
        type="button"
        key={displayValue}
        className={colourAttributeClasses.join(" ")}
        style={{
          backgroundColor: value === "#FFFFFF" ? "#F0F0F0" : `${value}`,
        }}
      >
        {displayValue}
      </button>
    );
  }

  return content;
}

export default AttributeVariant;
