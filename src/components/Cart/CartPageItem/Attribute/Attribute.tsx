import { AttributeVariantInterface } from "@/models/utility-models";
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
  const labelAttachedClasses = isInMiniView
    ? classes["product-attribute__label--mini-cart"]
    : classes["product-attribute__label"];

  return (
    <div key={name} className={classes["product-attribute"]}>
      <h3 className={labelAttachedClasses}>{name}:</h3>
      <div className={classes["product-attribute__values"]}>
        {items.map((attributeItem) => (
          <AttributeVariant
            key={attributeItem.value}
            variantData={attributeItem}
            variantType={name}
            inMiniView={isInMiniView}
          />
        ))}
      </div>
    </div>
  );
}
