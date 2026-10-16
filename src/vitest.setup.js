// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";
import * as axeMatchers from "vitest-axe/matchers";
import { configureAxe } from "vitest-axe";
import { expect } from "vitest";

expect.extend(axeMatchers);

// jsdom does no layout or painting, so axe can't compute real colour contrast.
// The rule also draws on a <canvas> to detect icon ligatures, which jsdom
// doesn't implement ("Not implemented: HTMLCanvasElement's getContext()").
// Disabling it globally configures the axe-core instance every test shares.
configureAxe({
  globalOptions: { rules: [{ id: "color-contrast", enabled: false }] },
});
