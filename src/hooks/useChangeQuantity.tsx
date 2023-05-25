import { useDispatch } from "react-redux";

import { productActions } from "../store/productsSlice";

function useChangeQuantity(internalID: string, operationType: string) {
  const dispatch = useDispatch();

  return () =>
    dispatch(
      productActions.changeQuantity({
        internalID,
        operationType,
      }),
    );
}

export default useChangeQuantity;
