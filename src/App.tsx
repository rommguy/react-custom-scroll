import "./App.css";
import { DemoComp } from "./example/demoComp.tsx";

export const App = () => {
  return (
    <div data-testid="app-root">
      <div>
        When designing a scrollbar, we don't want to take control on the
        scrolling mechanism. react-custom-scroll uses the existing native
        scrolling mechanism, while only drawing the customized design. The
        results is a smooth and natural scrolling experience. Another advantage
        of react-custom-scroll is that the scrollbar hovers above the layout, so
        it doesn't take up any space. This enables the same results regardless
        of browser or operating system.
      </div>
      <div data-testid="first-example" className="example-wrapper">
        <DemoComp demoType="compare-with-native" />
      </div>
      <div id="with-crazy-design">
        <div>There are no limits on your design.</div>
        <div>
          <DemoComp demoType="crazy-designer" />
        </div>
      </div>
      <div id="with-dynamic-content">
        <div>
          When your content is dynamic, you can use the keepAtBottom prop, to
          make sure that new content doesn't change the scroll position,
          supporting the user experience.
          <br />
          In this example, scrolling the wrapping element is disabled by passing
          false to the prop allowOuterScroll
        </div>
        <div>
          <DemoComp demoType={"dynamic-content"} />
        </div>
      </div>
      <div id="with-flex">
        <DemoComp demoType="flex" />
        <div>
          Custom scroll supports flexible layouts. You can use it on elements
          styled with flex, by passing the "flex" prop to CustomScroll
        </div>
      </div>
    </div>
  );
};
