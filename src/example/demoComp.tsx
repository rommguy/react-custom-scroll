import { CustomScroll } from "../customScroll.tsx";
import { demoText } from "./demoText.ts";
import "./demoComp.css";

export const DemoComp = () => {
  return (
    <div className="example-wrapper">
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
      <div key="crazy-example" className="container custom-scroll-example">
        <label className="side-title">Crazy Designer</label>

        <div className="panel crazy-scroll">
          <div className="panel-header">
            <label className="panel-title">Who designed this???</label>
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
};
