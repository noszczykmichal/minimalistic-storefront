import { AttributeVariantInterface } from "@/types/types";
import AttributeVariant from "@/components/Cart/CartPageItem/Attribute/AttributeVariant/AttributeVariant";
import classes from "@/components/Cart/CartPageItem/Attribute/Attribute.module.css";

interface AttributeInterface {
  name: string;
  items: AttributeVariantInterface[];
}

export default function Attribute({
  attributeDetails,
  isInMiniView,
}: {
  attributeDetails: AttributeInterface;
  isInMiniView: boolean;
}) {
  const { name, items } = attributeDetails;
  const selectedItem = items.find((item) => item.selected);
  const labelAttachedClasses = isInMiniView
    ? classes["product-attribute__label--mini-cart"]
    : classes["product-attribute__label"];

  return (
    <dl className={classes["product-attribute"]}>
      <dt className={labelAttachedClasses}>{name}:</dt>
      <dd className={classes["product-attribute__values"]}>
        <span className={classes["visually-hidden"]}>
          {selectedItem ? selectedItem.displayValue : "Not selected"}
        </span>
        {items.map((attributeItem) => (
          <AttributeVariant
            key={attributeItem.value}
            variantData={attributeItem}
            variantType={name}
            inMiniView={isInMiniView}
          />
        ))}
      </dd>
    </dl>
  );
}
