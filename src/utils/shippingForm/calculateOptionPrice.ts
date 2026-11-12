import type { Currency, FieldOption } from "@/types/types";

const calculateOptionPrice = <T extends string>(
  optionsArray: FieldOption<T>[],
  selectedOption: string | null | undefined,
  currency: Currency,
) => {
  if (!selectedOption) {
    return 0;
  }
  const chosenOption = optionsArray.find(
    (option) => option.name === selectedOption,
  )?.costs;

  const optionPrice = chosenOption?.find(
    (price) => price.currency.symbol === currency.symbol,
  );

  return optionPrice?.amount ?? 0;
};

export default calculateOptionPrice;
