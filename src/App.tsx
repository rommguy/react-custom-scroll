import "./App.css";
import { DemoComp } from "./example/demoComp.tsx";

export const App = () => {
  return (
    <div data-testid="app-root" className="app-root">
      <div className="demo-title">React-Custom-Scroll Demo page</div>
      <div className="demo-subtitle">
        react-custom-scroll lets you design unique scrollbars without
        compromising on performance. It preserves the browser's native scrolling
        mechanism, ensuring a smooth, familiar user experience. Its hover design
        means no content is obscured, offering a consistent look across browsers
        and operating systems.
      </div>
      <DemoComp demoType="compare-with-native" descriptionSide="left" />
      <DemoComp demoType="crazy-designer" descriptionSide="right" />
      <DemoComp demoType="dynamic-content" descriptionSide="left" />
      <DemoComp demoType="allow-outer-scroll" descriptionSide="right" />
      <DemoComp demoType="flex" descriptionSide="left" />
    </div>
  );
};
