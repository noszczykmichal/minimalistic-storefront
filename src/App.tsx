import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";

import Layout from "@/components/Layout/Layout";
import Loader from "@/components/UI/Loader/Loader";
import { uiActions } from "@/store/uiSlice";
import PLP from "@/pages/PLP/PLP";
import { Currency } from "@/models/productSlice.models";

const PDP = lazy(() => import("@/pages/PDP/PDP"));
const Cart = lazy(() => import("@/pages/Cart/Cart"));
const Address = lazy(() => import("@/pages/Address/Address"));
const ShippingAndPayment = lazy(
  () => import("@/pages/ShippingAndPayment/ShippingAndPayment"),
);
const Review = lazy(() => import("@/pages/Review/Review"));
const Confirm = lazy(() => import("@/pages/Confirm/Confirm"));

export default function App({
  categories,
  currencies,
}: {
  categories: string[];
  currencies: Currency[];
}) {
  const dispatch = useDispatch();
  const { saveCategoriesAndCurrencies } = uiActions;

  dispatch(saveCategoriesAndCurrencies({ categories, currencies }));

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
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/address" element={<Address />} />
          <Route
            path="/cart/shipping&payment"
            element={<ShippingAndPayment />}
          />
          <Route path="/cart/review" element={<Review />} />
          <Route path="/cart/confirm" element={<Confirm />} />
          <Route path="*" element={<PDP />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
