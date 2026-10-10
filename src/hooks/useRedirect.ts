import { useNavigate } from "react-router";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/ui/ui";

export default function useRedirect() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { miniCartVisibilityToggle } = uiActions;

  return (requestedUrl?: string) => {
    dispatch(miniCartVisibilityToggle(false));
    if (requestedUrl) {
      navigate(requestedUrl);
    }
  };
}
