import { productActions } from "../store/productsSlice";
import { useAppDispatch } from "./reduxHooks";

function useChangeQuantity(internalID: string, operationType: string) {
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
