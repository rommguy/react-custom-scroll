import { expect, Locator, Page } from "@playwright/test";

export const getCustomScrollbar = (container: Locator) =>
  container.getByTestId("custom-scrollbar");

export const assertCustomScrollBarVisible = async (container: Locator) => {
  await expect(getCustomScrollbar(container)).toBeVisible();
  await expect(getCustomScrollbar(container)).toHaveCSS("opacity", "1");
};

export const getAppBody = (page: Page) => page.content();

export const getInnerContainer = (container: Locator) =>
  container.getByTestId("inner-container");

export const getScrollHandle = (container: Locator) =>
  container.getByTestId("custom-scroll-handle");

export const assertDomElementProperty = async (
  element: Locator,
  elmProperty: "scrollTop" | "offsetTop",
  expectedValue: number,
) => {
  expect(
    await element.evaluate(
      // @ts-expect-error missing type
      (node, elmProperty) => node[elmProperty],
      elmProperty,
    ),
  ).toBe(expectedValue);
};

export const getDocumentElement = (page: Page) =>
  // @ts-expect-error missing type
  page.evaluateHandle(() => document.documentElement);
