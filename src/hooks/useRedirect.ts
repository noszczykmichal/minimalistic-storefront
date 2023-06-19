import { useNavigate } from "react-router";

import { useAppDispatch } from "./reduxHooks";
import { uiActions } from "../store/uiSlice";

function useRedirect() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { backdropVisibilityToggle, miniCartVisibilityToggle } = uiActions;

  return (requestedUrl?: string) => {
    dispatch(backdropVisibilityToggle(false));
    dispatch(miniCartVisibilityToggle(false));
    if (requestedUrl) {
      navigate(requestedUrl);
    }
  };
}

export default useRedirect;
