import { Price } from "./productSlice.models";

export type ChangeQuantityVariants = "addition" | "subtraction";

export type ThumbnailArrowVariant = "right" | "left";

export interface RadioInputProps {
  label: string;
  name: string;
  costs: Price[];
}

export type ValidationFn = (length: string) => boolean;

export interface AttributeVariantInterface {
  displayValue: string;
  selected?: boolean;
  value: string;
}
