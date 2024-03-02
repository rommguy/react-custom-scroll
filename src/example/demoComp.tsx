import { CustomScroll } from "../customScroll.tsx";
import { demoText } from "./demoText.ts";
import { times, map } from "lodash/fp";
import "./demoComp.css";
import { CSSProperties, useState } from "react";
import Giraffe from "./giraffe-icon.png";

interface DemoCompProps {
  demoType:
    | "compare-with-native"
    | "crazy-designer"
    | "flex"
    | "dynamic-content"
    | "allow-outer-scroll";
  descriptionSide: "left" | "right";
  testId?: string;
}

export const DemoComp = ({
  demoType,
  descriptionSide,
  testId,
}: DemoCompProps) => {
  const [dynamicContentCounter, setDynamicContentCounter] = useState<number>(4);
  const addContent = () => {
    setDynamicContentCounter((prev) => prev + 1);
  };
  const removeContent = () => {
    setDynamicContentCounter((prev) => Math.max(prev - 1, 4));
  };
  const descriptionStyle: CSSProperties = {
    flexDirection: descriptionSide === "left" ? "row" : "row-reverse",
  };
  switch (demoType) {
    case "compare-with-native":
      return (
        <div
          data-testid={testId || ""}
          className="example-wrapper"
          style={descriptionStyle}
        >
          <div className="container native-scroll">
            <label className="side-title">Native Scroll</label>
            <div className="panel">
              <div className="panel-header">
                <label className="panel-title">This is boring</label>
              </div>
              <div className="panel-content-native panel-content">
                <div className="content-fill">{demoText.text}</div>
              </div>
            </div>
          </div>
          <div className="container">
            <label className="side-title">Custom Scroll</label>

            <div className="panel">
              <div className="panel-header">
                <label className="panel-title">Cool Scrollbar!</label>
              </div>
              <CustomScroll allowOuterScroll={true}>
                <div className="panel-content-custom panel-content">
                  <div className="content-fill">{demoText.text}</div>
                </div>
              </CustomScroll>
            </div>
          </div>
        </div>
      );
    case "crazy-designer":
      return (
        <div
          data-testid={testId || ""}
          className="container example-wrapper"
          style={descriptionStyle}
        >
          <div className="example-description">
            <img src={Giraffe} />
            There are no limits for your design.
          </div>
          <div className="panel crazy-scroll">
            <div className="panel-header">
              <label className="panel-title">Who designed this???</label>
            </div>
            <CustomScroll
              allowOuterScroll={true}
              handleClass="scroll-handle-override"
            >
              <div className="panel-content-custom panel-content">
                <div className="content-fill">{demoText.text}</div>
              </div>
            </CustomScroll>
          </div>
        </div>
      );
    case "flex":
      return (
        <div
          key="flex-example"
          className="container example-flex-wrapper example-wrapper"
          style={descriptionStyle}
          id="flex-example"
          data-testid={testId || ""}
        >
          <div className="example-description">
            Custom scroll supports flexible layouts. You can use it on elements
            styled with flex, by passing the <b>flex</b> prop to CustomScroll
          </div>
          <div className="panel flex-scroll">
            <div className="panel-header">
              <label className="panel-title">Flexbox!!!</label>
            </div>
            <CustomScroll allowOuterScroll={true} flex="1">
              <div className="panel-content-custom panel-content">
                <div className="content-fill">{demoText.text}</div>
              </div>
            </CustomScroll>
          </div>
        </div>
      );
    case "dynamic-content":
      return (
        <div
          data-testid={testId || ""}
          className="example-dynamic-wrapper example-wrapper"
          style={descriptionStyle}
          id="dynamic-content-example"
        >
          <div className="example-description">
            When your content is dynamic, you can use the <b>keepAtBottom</b>{" "}
            prop, to make sure new content doesn't change the scroll position,
            supporting the user experience.
          </div>
          <div>
            <div className="panel dynamic-scroll">
              <div className="panel-header">
                <label className="panel-title">DYNAMIC CONTENT!!!</label>
              </div>
              <CustomScroll allowOuterScroll={false} keepAtBottom={true}>
                <div className="panel-content-custom panel-content">
                  <div className="content-fill">
                    {map(
                      (content: string) => (
                        <div className="dynamic-content" key={content}>
                          {content}
                        </div>
                      ),
                      times(
                        (index) => `Content #${index}`,
                        dynamicContentCounter,
                      ),
                    )}
                  </div>
                </div>
              </CustomScroll>
            </div>
            <button
              className="dynamic-content-button"
              key="addContent"
              onClick={addContent}
            >
              Add Content
            </button>
            <button
              className="dynamic-content-button"
              key="removeContent"
              onClick={removeContent}
            >
              Remove Content
            </button>
          </div>
        </div>
      );
    case "allow-outer-scroll":
      return (
        <div
          data-testid={testId || ""}
          className="example-wrapper"
          style={descriptionStyle}
          id="allow-outer-scroll-example"
        >
          <div className="example-description">
            In this example, scrolling the wrapping element is enabled with
            <b> {`allowOuterScroll`}</b>
          </div>
          <div key="cool-example" className="container">
            <div className="panel">
              <div className="panel-header">
                <label className="panel-title">Allowing external scroll</label>
              </div>
              <CustomScroll allowOuterScroll={true}>
                <div
                  className="panel-content-custom panel-content"
                  style={{ maxHeight: 300 }}
                >
                  <div className="content-fill">{demoText.shortText}</div>
                </div>
              </CustomScroll>
            </div>
          </div>
        </div>
      );
  }
};
