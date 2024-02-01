import { CustomScroll } from "../customScroll.tsx";
import { demoText } from "./demoText.ts";
import { times, map } from "lodash/fp";
import "./demoComp.css";
import { useState } from "react";

interface DemoCompProps {
  demoType:
    | "compare-with-native"
    | "crazy-designer"
    | "flex"
    | "dynamic-content";
}

export const DemoComp = ({ demoType }: DemoCompProps) => {
  const [dynamicContentCounter, setDynamicContentCounter] = useState<number>(4);
  const addContent = () => {
    setDynamicContentCounter((prev) => prev + 1);
  };
  const removeContent = () => {
    setDynamicContentCounter((prev) => Math.max(prev - 1, 4));
  };
  switch (demoType) {
    case "compare-with-native":
      return (
        <>
          <div key="native-example" className="container native-scroll">
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
          <div key="cool-example" className="container custom-scroll-example">
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
        </>
      );
    case "crazy-designer":
      return (
        <div key="crazy-example" className="container custom-scroll-example">
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
        <div key="flex-example" className="container example-flex-wrapper">
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
        <>
          <div className="example-dynamic-wrapper">
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
        </>
      );
  }
};
