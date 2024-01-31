import { expect, Locator } from "@playwright/test";

export const getCustomScrollbar = (container: Locator) =>
  container.getByTestId("custom-scrollbar");

export const assertCustomScrollBarVisible = async (container: Locator) => {
  await expect(getCustomScrollbar(container)).toBeVisible();
  await expect(getCustomScrollbar(container)).toHaveCSS("opacity", "1");
};

export const getInnerContainer = (container: Locator) =>
  container.getByTestId("inner-container");

export const getScrollHandle = (container: Locator) =>
  container.getByTestId("custom-scroll-handle");
