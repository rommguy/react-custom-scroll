import "./App.css";
import { DemoComp } from "./example/demoComp.tsx";
import { CustomScroll } from "./customScroll.tsx";

export const App = () => {
  return (
    <CustomScroll>
      <div data-testid="app-root" className="app-root">
        <div>
          react-custom-scroll lets you design unique scrollbars without
          compromising on performance. It preserves the browser's native
          scrolling mechanism, ensuring a smooth, familiar user experience. Its
          hover design means no content is obscured, offering a consistent look
          across browsers and operating systems.
        </div>
        <div data-testid="first-example">
          <DemoComp demoType="compare-with-native" descriptionSide="left" />
        </div>
        <DemoComp demoType="crazy-designer" descriptionSide="right" />
        <DemoComp demoType="dynamic-content" descriptionSide="left" />
        <DemoComp demoType="allow-outer-scroll" descriptionSide="right" />
        <DemoComp demoType="flex" descriptionSide="left" />
      </div>
    </CustomScroll>
  );
};
