interface DemoCompProps {
    demoType: "compare-with-native" | "crazy-designer" | "flex" | "dynamic-content" | "allow-outer-scroll" | "keep-scroll-visible";
    descriptionSide: "left" | "right";
    testId?: string;
}
export declare const DemoComp: ({ demoType, descriptionSide, testId, }: DemoCompProps) => import("react/jsx-runtime").JSX.Element;
export {};
