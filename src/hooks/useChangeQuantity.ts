import { productActions } from "../store/productsSlice";
import { useAppDispatch } from "./useReduxHooks";
import { ChangeQuantityVariants } from "../models/ui-and-hooks";

function useChangeQuantity(
  internalID: string,
  operationType: ChangeQuantityVariants,
) {
  const dispatch = useAppDispatch();

  return () =>
    dispatch(
      productActions.changeQuantity({
        internalID,
        operationType,
      }),
    );
}

export default useChangeQuantity;
