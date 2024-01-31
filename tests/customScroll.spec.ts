import { test, expect } from "@playwright/test";
import {
  assertCustomScrollBarVisible,
  getInnerContainer,
  getScrollHandle,
} from "./customScrollDriver";

const APP_URL = "http://localhost:5174/";

test.describe("basic functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test("Custom scrollbar appears when hovering the container", async ({
    page,
  }) => {
    const examplePanel = page.getByTestId("first-example");
    await examplePanel.getByTestId("outer-container").hover();

    await assertCustomScrollBarVisible(examplePanel);
  });

  test("Updates the position of the scroll handle when scrolling", async ({
    page,
  }) => {
    const examplePanel = page.getByTestId("first-example");

    await examplePanel.getByTestId("outer-container").hover();
    await expect(getScrollHandle(examplePanel)).toHaveCSS("top", "0px");

    await page.mouse.wheel(0, 100);

    expect(
      await getInnerContainer(examplePanel).evaluate(
        // @ts-expect-error missing type
        (node) => (node as HTMLElement).scrollTop,
      ),
    ).toBe(100);

    expect(
      await getScrollHandle(examplePanel).evaluate(
        // @ts-expect-error missing type
        (node) => (node as HTMLElement).offsetTop,
      ),
    ).toBe(28);
  });
});
