import { test } from "@playwright/test";
import {
  assertCustomScrollBarVisible,
  assertDomElementProperty,
  getExamplePanel,
  getInnerContainer,
  getScrollHandle,
} from "./customScrollDriver";

const APP_URL = "http://localhost:5174/";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test.describe("basic functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test("Custom scrollbar appears when hovering the container", async ({
    page,
  }) => {
    const examplePanel = getExamplePanel(page);
    await examplePanel.getByTestId("outer-container").hover();

    await assertCustomScrollBarVisible(examplePanel);
  });

  test("Updates the position of the scroll handle when scrolling", async ({
    page,
  }) => {
    const examplePanel = getExamplePanel(page);
    await examplePanel.getByTestId("outer-container").hover();

    await assertDomElementProperty(
      getScrollHandle(examplePanel),
      "offsetTop",
      0,
    );

    await page.mouse.wheel(0, 100);
    await sleep(500);

    await assertDomElementProperty(
      getInnerContainer(examplePanel),
      "scrollTop",
      100,
    );

    await assertDomElementProperty(
      getScrollHandle(examplePanel),
      "offsetTop",
      28,
    );
  });
});

// test.describe("mouse interactions with custom scrollbar", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto(APP_URL);
//   });
//
//   test("Should scroll when clicking on the scrollbar area", async ({
//     page,
//   }) => {
//     const examplePanel = getExamplePanel(page);
//
//     const customHandle = getScrollHandle(examplePanel);
//     await customHandle.hover();
//     // click below the handle
//     page.mouse.click(0, 50);
//
//     // check the scroll moved downwards
//   });
// });

// test.describe("Blocking outer scroll", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto(APP_URL);
//   });
//   test("should block outer scroll when reaching the end of the scroll range", async ({
//     page,
//   }) => {
//     const documentElement = await getDocumentElement(page);
//
//     const examplePanel = page.getByTestId("first-example");
//     await examplePanel.getByTestId("outer-container").click();
//
//     await assertDomElementProperty(documentElement, "scrollTop", 114);
//
//     await page.mouse.wheel(0, 4000);
//     await sleep(500);
//     await page.mouse.wheel(0, -4000);
//
//     await assertDomElementProperty(documentElement, "scrollTop", 200);
//   });
// });
