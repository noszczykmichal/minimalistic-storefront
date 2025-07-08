import { productActions } from "@/store/productsSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { ChangeQuantityVariants } from "@/models/utility-models";

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
