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

// Rules that can't run in jsdom, disabled for the axe-core instance every test
// shares:
// - color-contrast: jsdom does no layout or painting (and CSS modules aren't
//   loaded), so there are no real colours to compare.
// - label-content-name-mismatch: draws text on a <canvas> to detect icon-font
//   ligatures. jsdom has no canvas ("Not implemented: HTMLCanvasElement's
//   getContext()"), so the check errors out and never evaluates anyway.
configureAxe({
  globalOptions: {
    rules: [
      { id: "color-contrast", enabled: false },
      { id: "label-content-name-mismatch", enabled: false },
    ],
  },
});
