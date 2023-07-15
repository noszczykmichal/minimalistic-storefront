import { Price } from "./productSlice.models";

export type ChangeQuantityVariants = "addition" | "subtraction";

export type ThumbnailArrowVariant = "right" | "left";

export interface RadioInputProps {
  label: string;
  name: string;
  costs: Price[];
}
