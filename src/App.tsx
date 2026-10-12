import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

import Layout from "@/components/Layout/Layout";
import Loader from "@/components/UI/Loader/Loader";
import GuestOnlyRoute from "@/components/Routing/GuestOnlyRoute/GuestOnlyRoute";
import { uiActions } from "@/store/ui/ui";
import { authActions, WARNING_SECONDS } from "@/store/auth/auth";
import PLP from "@/pages/PLP/PLP";
import { Currency } from "@/types/types";

const PDP = lazy(() => import("@/pages/PDP/PDP"));
const Cart = lazy(() => import("@/pages/Cart/Cart"));
const ShippingForm = lazy(() => import("@/pages/ShippingForm/ShippingForm"));
const Review = lazy(() => import("@/pages/Review/Review"));
const Confirm = lazy(() => import("@/pages/Confirm/Confirm"));
const Login = lazy(() => import("@/pages/Login/Login"));

export default function App({
  categories,
  currencies,
}: {
  categories: string[];
  currencies: Currency[];
}) {
  const dispatch = useAppDispatch();
  const { saveCategoriesAndCurrencies } = uiActions;
  const { setIsAccessTokenExpiring } = authActions;
  const status = useAppSelector((state) => state.auth.status);
  const accessTokenExpiresAt = useAppSelector(
    (state) => state.auth.accessTokenExpiresAt,
  );

  useEffect(() => {
    if (status !== "authenticated" || !accessTokenExpiresAt) {
      return undefined;
    }

    const msUntilWarning =
      accessTokenExpiresAt - Date.now() - WARNING_SECONDS * 1000;

    const accessTokenExpireTracker = setTimeout(
      () => {
        dispatch(setIsAccessTokenExpiring(true));
      },
      Math.max(0, msUntilWarning),
    );

    return () => clearTimeout(accessTokenExpireTracker);
  }, [accessTokenExpiresAt, dispatch, setIsAccessTokenExpiring, status]);

  useEffect(() => {
    dispatch(saveCategoriesAndCurrencies({ categories, currencies }));
  }, [categories, dispatch, currencies, saveCategoriesAndCurrencies]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          {categories.map((category) => (
            <Route
              key={category}
              path={category === "all" ? "/" : `/${category}`}
              element={<PLP />}
            />
          ))}
          <Route element={<GuestOnlyRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/cart/shipping/address&payment"
            element={<ShippingForm />}
          />
          <Route path="/cart/review" element={<Review />} />
          <Route path="/cart/confirm" element={<Confirm />} />
          <Route path="*" element={<PDP />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
