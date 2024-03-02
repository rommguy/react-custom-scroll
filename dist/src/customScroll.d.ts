import { Component, CSSProperties, UIEvent, MouseEvent, PropsWithChildren } from "react";
import { simpleDebounce } from "./utils.ts";
interface CustomScrollProps extends PropsWithChildren {
    allowOuterScroll?: boolean;
    heightRelativeToParent?: string;
    onScroll?: (event: UIEvent) => void;
    addScrolledClass?: boolean;
    freezePosition?: boolean;
    handleClass?: string;
    minScrollHandleHeight?: number;
    flex?: string;
    rtl?: boolean;
    scrollTo?: number;
    keepAtBottom?: boolean;
    className?: string;
}
interface CustomScrollState {
    scrollPos: number;
    onDrag: boolean;
    visible: boolean;
}
export declare class CustomScroll extends Component<CustomScrollProps, CustomScrollState> {
    scrollbarYWidth: number;
    hideScrollThumb: ReturnType<typeof simpleDebounce>;
    contentHeight: number;
    visibleHeight: number;
    scrollHandleHeight: number;
    scrollRatio: number;
    hasScroll: boolean;
    startDragHandlePos: number;
    startDragMousePos: number;
    constructor(props: CustomScrollProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: CustomScrollProps, prevState: CustomScrollState): void;
    componentWillUnmount(): void;
    customScrollRef: import("react").RefObject<HTMLDivElement>;
    innerContainerRef: import("react").RefObject<HTMLDivElement>;
    customScrollbarRef: import("react").RefObject<HTMLDivElement>;
    scrollHandleRef: import("react").RefObject<HTMLDivElement>;
    contentWrapperRef: import("react").RefObject<HTMLDivElement>;
    adjustFreezePosition: (prevProps: CustomScrollProps) => void;
    toggleScrollIfNeeded: () => void;
    updateScrollPosition: (scrollValue: number) => void;
    onClick: (event: MouseEvent) => void;
    isMouseEventOnCustomScrollbar: (event: MouseEvent) => boolean;
    isMouseEventOnScrollHandle: (event: MouseEvent) => boolean;
    calculateNewScrollHandleTop: (clickEvent: MouseEvent) => number;
    getScrollValueFromHandlePosition: (handlePosition: number) => number;
    getScrollHandleStyle: () => {
        height: number;
        top: number;
    };
    adjustCustomScrollPosToContentPos: (scrollPosition: number) => void;
    onScroll: (event: UIEvent) => void;
    getScrolledElement: () => HTMLElement;
    onMouseDown: (event: MouseEvent) => void;
    onTouchStart: () => void;
    onHandleDrag: (event: MouseEvent<HTMLElement>) => void;
    onHandleDragEnd: (e: MouseEvent<HTMLElement>) => void;
    getInnerContainerClasses: () => "rcs-inner-container rcs-content-scrolled" | "rcs-inner-container";
    getScrollStyles: () => {
        innerContainer: CSSProperties;
        contentWrapper: CSSProperties;
    };
    getOuterContainerStyle: () => {
        height: string;
    };
    getRootStyles: () => CSSProperties;
    enforceMinHandleHeight: (calculatedStyle: {
        height: number;
        top: number;
    }) => {
        height: number;
        top: number;
    };
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
