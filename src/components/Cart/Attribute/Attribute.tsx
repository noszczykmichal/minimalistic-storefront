import { AttributeVariantInterface } from "../../../models/utility-models";
import AttributeVariant from "./AttributeVariant/AttributeVariant";
import classes from "./Attribute.module.css";

interface AttributeInterface {
  name: string;
  items: AttributeVariantInterface[];
}

function Attribute({
  attributeDetails,
}: {
  attributeDetails: AttributeInterface;
}) {
  const { name, items } = attributeDetails;

  return (
    <div key={name} className={classes["product-attribute"]}>
      <h3 className={classes["product-attribute__label"]}>{name}:</h3>
      <div className={classes["product-attribute__values"]}>
        {items.map((attributeItem) => (
          <AttributeVariant
            key={attributeItem.value}
            variantData={attributeItem}
            variantType={name}
          />
        ))}
      </div>
    </div>
  );
}

export default Attribute;
