import { useNavigate } from "react-router";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/uiSlice";

export default function useRedirect() {
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
