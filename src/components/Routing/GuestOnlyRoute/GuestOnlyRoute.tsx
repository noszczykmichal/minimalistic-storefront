import { Navigate, Outlet } from "react-router";

import Loader from "@/components/UI/Loader/Loader";
import { useAppSelector } from "@/hooks/useReduxHooks";

// Pages meant only for signed-out visitors (login). A signed-in user is sent
// to the home page instead, including right after signing in.
export default function GuestOnlyRoute() {
  const { status } = useAppSelector((state) => state.auth);

  // Wait for the session to be restored so a signed-in user reloading /login
  // doesn't see the form flash before the redirect.
  if (status === "checking") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
