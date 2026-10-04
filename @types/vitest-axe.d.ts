// vitest-axe/extend-expect augments the legacy global `Vi` namespace, which
// Vitest >= 1 no longer reads, so register the matchers on the `vitest` module.
import "vitest";
import type { AxeMatchers } from "vitest-axe/matchers";

/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars -- augmentation must mirror vitest's generic signature */
declare module "vitest" {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
