import {
  Component,
  CSSProperties,
  createRef,
  UIEvent,
  MouseEvent,
  WheelEvent,
  PropsWithChildren,
} from "react";
import "./customScroll.css";

import { ensureWithinLimits, simpleDebounce } from "./utils.ts";

interface ElementLayout {
  top: number;
  right: number;
  height: number;
  left: number;
  width?: number;
}

function isEventPosOnDomNode(event: MouseEvent, domNode: HTMLElement) {
  const nodeClientRect = domNode.getBoundingClientRect();
  return isEventPosOnLayout(event, nodeClientRect);
}

function isEventPosOnLayout(event: MouseEvent, layout: ElementLayout) {
  return (
    event.clientX > layout.left &&
    event.clientX < layout.right &&
    event.clientY > layout.top &&
    event.clientY < layout.top + layout.height
  );
}

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
}

export class CustomScroll extends Component<
  CustomScrollProps,
  CustomScrollState
> {
  scrollbarYWidth: number;
  hideScrollThumb: ReturnType<typeof simpleDebounce>;
  contentHeight: number = 0;
  visibleHeight: number = 0;
  scrollHandleHeight: number = 0;
  scrollRatio: number = 1;
  hasScroll: boolean = false;
  startDragHandlePos: number = 0;
  startDragMousePos: number = 0;

  constructor(props: CustomScrollProps) {
    super(props);

    this.scrollbarYWidth = 0;
    this.state = {
      scrollPos: 0,
      onDrag: false,
    };

    this.hideScrollThumb = simpleDebounce(() => {
      this.setState({
        onDrag: false,
      });
    }, 500);
  }

  componentDidMount() {
    if (typeof this.props.scrollTo !== "undefined") {
      this.updateScrollPosition(this.props.scrollTo);
    } else {
      this.forceUpdate();
    }
    if (this.innerContainerRef.current) {
      this.innerContainerRef.current.addEventListener(
        "wheel",
        // @ts-expect-error problem typing event handlers
        this.blockOuterScroll,
        { passive: false },
      );
    }
  }

  componentDidUpdate(
    prevProps: CustomScrollProps,
    prevState: CustomScrollState,
  ) {
    const prevContentHeight = this.contentHeight;
    const prevVisibleHeight = this.visibleHeight;
    const innerContainer = this.getScrolledElement();
    const reachedBottomOnPrevRender =
      prevState.scrollPos >= prevContentHeight - prevVisibleHeight;

    this.contentHeight = innerContainer.scrollHeight;
    this.scrollbarYWidth =
      innerContainer.offsetWidth - innerContainer.clientWidth;
    this.visibleHeight = innerContainer.clientHeight;
    this.scrollRatio = this.contentHeight
      ? this.visibleHeight / this.contentHeight
      : 1;

    this.toggleScrollIfNeeded();
    const isExternalRender = this.state === prevState;
    if (this.props.freezePosition || prevProps.freezePosition) {
      this.adjustFreezePosition(prevProps);
    }
    if (
      typeof this.props.scrollTo !== "undefined" &&
      this.props.scrollTo !== prevProps.scrollTo
    ) {
      this.updateScrollPosition(this.props.scrollTo);
    } else if (
      this.props.keepAtBottom &&
      isExternalRender &&
      reachedBottomOnPrevRender
    ) {
      this.updateScrollPosition(this.contentHeight - this.visibleHeight);
    }
  }

  componentWillUnmount() {
    this.hideScrollThumb.cancel();
    // @ts-expect-error problem typing event handlers
    document.removeEventListener("mousemove", this.onHandleDrag);
    // @ts-expect-error problem typing event handlers
    document.removeEventListener("mouseup", this.onHandleDragEnd);

    if (this.innerContainerRef.current) {
      this.innerContainerRef.current.removeEventListener(
        "wheel",
        // @ts-expect-error problem typing event handlers
        this.blockOuterScroll,
      );
    }
  }

  customScrollRef = createRef<HTMLDivElement>();
  innerContainerRef = createRef<HTMLDivElement>();
  customScrollbarRef = createRef<HTMLDivElement>();
  scrollHandleRef = createRef<HTMLDivElement>();
  contentWrapperRef = createRef<HTMLDivElement>();

  adjustFreezePosition = (prevProps: CustomScrollProps) => {
    if (!this.contentWrapperRef.current) {
      return;
    }
    const innerContainer = this.getScrolledElement();
    const contentWrapper = this.contentWrapperRef.current;

    if (this.props.freezePosition) {
      contentWrapper.scrollTop = this.state.scrollPos;
    }

    if (prevProps.freezePosition) {
      innerContainer.scrollTop = this.state.scrollPos;
    }
  };

  toggleScrollIfNeeded = () => {
    const shouldHaveScroll = this.contentHeight - this.visibleHeight > 1;
    if (this.hasScroll !== shouldHaveScroll) {
      this.hasScroll = shouldHaveScroll;
      this.forceUpdate();
    }
  };

  updateScrollPosition = (scrollValue: number) => {
    const innerContainer = this.getScrolledElement();
    const updatedScrollTop = ensureWithinLimits(
      scrollValue,
      0,
      this.contentHeight - this.visibleHeight,
    );
    innerContainer.scrollTop = updatedScrollTop;
    this.setState({
      scrollPos: updatedScrollTop,
    });
  };

  onClick = (event: MouseEvent) => {
    if (
      !this.hasScroll ||
      !this.isMouseEventOnCustomScrollbar(event) ||
      this.isMouseEventOnScrollHandle(event)
    ) {
      return;
    }
    const newScrollHandleTop = this.calculateNewScrollHandleTop(event);
    const newScrollValue =
      this.getScrollValueFromHandlePosition(newScrollHandleTop);

    this.updateScrollPosition(newScrollValue);
  };

  isMouseEventOnCustomScrollbar = (event: MouseEvent) => {
    if (!this.customScrollbarRef.current) {
      return false;
    }
    const customScrollElm = this.customScrollRef.current as HTMLElement;
    const boundingRect = customScrollElm.getBoundingClientRect();
    const customScrollbarBoundingRect =
      this.customScrollbarRef.current.getBoundingClientRect();
    const horizontalClickArea = this.props.rtl
      ? {
          left: boundingRect.left,
          right: customScrollbarBoundingRect.right,
        }
      : {
          left: customScrollbarBoundingRect.left,
          width: boundingRect.right,
        };
    const customScrollbarLayout: ElementLayout = {
      right: boundingRect.right,
      top: boundingRect.top,
      height: boundingRect.height,
      ...horizontalClickArea,
    };

    return isEventPosOnLayout(event, customScrollbarLayout);
  };

  isMouseEventOnScrollHandle = (event: MouseEvent) => {
    if (!this.scrollHandleRef.current) {
      return false;
    }
    const scrollHandle = this.scrollHandleRef.current;
    return isEventPosOnDomNode(event, scrollHandle);
  };

  calculateNewScrollHandleTop = (clickEvent: MouseEvent) => {
    const domNode = this.customScrollRef.current as HTMLElement;
    const boundingRect = domNode.getBoundingClientRect();
    const currentTop = boundingRect.top + window.pageYOffset;
    const clickYRelativeToScrollbar = clickEvent.pageY - currentTop;
    const scrollHandleTop = this.getScrollHandleStyle().top;
    let newScrollHandleTop;
    const isBelowHandle =
      clickYRelativeToScrollbar > scrollHandleTop + this.scrollHandleHeight;
    if (isBelowHandle) {
      newScrollHandleTop =
        scrollHandleTop +
        Math.min(
          this.scrollHandleHeight,
          this.visibleHeight - this.scrollHandleHeight,
        );
    } else {
      newScrollHandleTop =
        scrollHandleTop - Math.max(this.scrollHandleHeight, 0);
    }
    return newScrollHandleTop;
  };

  getScrollValueFromHandlePosition = (handlePosition: number) =>
    handlePosition / this.scrollRatio;

  getScrollHandleStyle = (): { height: number; top: number } => {
    const handlePosition = this.state.scrollPos * this.scrollRatio;
    this.scrollHandleHeight = this.visibleHeight * this.scrollRatio;
    return {
      height: this.scrollHandleHeight,
      top: handlePosition,
    };
  };

  adjustCustomScrollPosToContentPos = (scrollPosition: number) => {
    this.setState({
      scrollPos: scrollPosition,
    });
  };

  onScroll = (event: UIEvent) => {
    if (this.props.freezePosition) {
      return;
    }
    this.hideScrollThumb();
    this.adjustCustomScrollPosToContentPos(event.currentTarget.scrollTop);
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }
  };

  getScrolledElement = () => this.innerContainerRef.current as HTMLElement;

  onMouseDown = (event: MouseEvent) => {
    if (!this.hasScroll || !this.isMouseEventOnScrollHandle(event)) {
      return;
    }

    this.startDragHandlePos = this.getScrollHandleStyle().top;
    this.startDragMousePos = event.pageY;
    this.setState({
      onDrag: true,
    });

    // @ts-expect-error problem typing event handlers
    document.addEventListener("mousemove", this.onHandleDrag, {
      passive: false,
    });
    // @ts-expect-error problem typing event handlers
    document.addEventListener("mouseup", this.onHandleDragEnd, {
      passive: false,
    });
  };

  onTouchStart = () => {
    this.setState({
      onDrag: true,
    });
  };

  onHandleDrag = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const mouseDeltaY = event.pageY - this.startDragMousePos;
    const handleTopPosition = ensureWithinLimits(
      this.startDragHandlePos + mouseDeltaY,
      0,
      this.visibleHeight - this.scrollHandleHeight,
    );
    const newScrollValue =
      this.getScrollValueFromHandlePosition(handleTopPosition);
    this.updateScrollPosition(newScrollValue);
  };

  onHandleDragEnd = (e: MouseEvent<HTMLElement>) => {
    this.setState({
      onDrag: false,
    });
    e.preventDefault();
    // @ts-expect-error problem typing event handlers
    document.removeEventListener("mousemove", this.onHandleDrag);
    // @ts-expect-error problem typing event handlers
    document.removeEventListener("mouseup", this.onHandleDragEnd);
  };

  blockOuterScroll = (e: WheelEvent<HTMLElement>) => {
    if (this.props.allowOuterScroll) {
      return;
    }
    const contentNode = e.currentTarget as HTMLElement;
    const totalHeight = contentNode.scrollHeight;
    const maxScroll = totalHeight - contentNode.offsetHeight;
    const delta = e.deltaY % 3 ? e.deltaY : e.deltaY * 10;
    if (contentNode.scrollTop + delta <= 0) {
      contentNode.scrollTop = 0;
      e.preventDefault();
    } else if (contentNode.scrollTop + delta >= maxScroll) {
      contentNode.scrollTop = maxScroll;
      e.preventDefault();
    }
    e.stopPropagation();
  };

  getInnerContainerClasses = () => {
    if (this.state.scrollPos && this.props.addScrolledClass) {
      return "rcs-inner-container rcs-content-scrolled";
    }
    return "rcs-inner-container";
  };

  getScrollStyles = () => {
    const scrollSize = this.scrollbarYWidth || 20;
    const marginKey = this.props.rtl ? "marginLeft" : "marginRight";
    const innerContainerStyle: CSSProperties = {
      height:
        this.props.heightRelativeToParent || this.props.flex ? "100%" : "",
    };
    innerContainerStyle[marginKey] = -1 * scrollSize;
    const contentWrapperStyle: CSSProperties = {
      height:
        this.props.heightRelativeToParent || this.props.flex ? "100%" : "",
      overflowY: this.props.freezePosition ? "hidden" : "visible",
    };
    contentWrapperStyle[marginKey] = this.scrollbarYWidth ? 0 : scrollSize;

    return {
      innerContainer: innerContainerStyle,
      contentWrapper: contentWrapperStyle,
    };
  };

  getOuterContainerStyle = () => ({
    height: this.props.heightRelativeToParent || this.props.flex ? "100%" : "",
  });

  getRootStyles = () => {
    const result: CSSProperties = {};

    if (this.props.heightRelativeToParent) {
      result.height = this.props.heightRelativeToParent;
    } else if (this.props.flex) {
      result.flex = this.props.flex;
    }

    return result;
  };

  enforceMinHandleHeight = (calculatedStyle: {
    height: number;
    top: number;
  }) => {
    const minHeight = this.props.minScrollHandleHeight || 38;
    if (calculatedStyle.height >= minHeight) {
      return calculatedStyle;
    }

    const diffHeightBetweenMinAndCalculated =
      minHeight - calculatedStyle.height;
    const scrollPositionToAvailableScrollRatio =
      this.state.scrollPos / (this.contentHeight - this.visibleHeight);
    const scrollHandlePosAdjustmentForMinHeight =
      diffHeightBetweenMinAndCalculated * scrollPositionToAvailableScrollRatio;
    const handlePosition =
      calculatedStyle.top - scrollHandlePosAdjustmentForMinHeight;

    return {
      height: minHeight,
      top: handlePosition,
    };
  };

  render() {
    const scrollStyles = this.getScrollStyles();
    const rootStyle = this.getRootStyles();
    const scrollHandleStyle = this.enforceMinHandleHeight(
      this.getScrollHandleStyle(),
    );
    const className = [
      this.props.className || "",
      "rcs-custom-scroll",
      this.state.onDrag ? "rcs-scroll-handle-dragged" : "",
    ].join(" ");

    return (
      <div className={className} style={rootStyle} ref={this.customScrollRef}>
        <div
          className="rcs-outer-container"
          style={this.getOuterContainerStyle()}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
          onClick={this.onClick}
        >
          {this.hasScroll ? (
            <div className="rcs-positioning">
              <div
                ref={this.customScrollbarRef}
                className={`rcs-custom-scrollbar ${this.props.rtl ? "rcs-custom-scrollbar-rtl" : ""}`}
                key="scrollbar"
              >
                <div
                  ref={this.scrollHandleRef}
                  className="rcs-custom-scroll-handle"
                  style={scrollHandleStyle}
                >
                  <div
                    className={this.props.handleClass || "rcs-inner-handle"}
                  />
                </div>
              </div>
            </div>
          ) : null}
          <div
            ref={this.innerContainerRef}
            className={this.getInnerContainerClasses()}
            style={scrollStyles.innerContainer}
            onScroll={this.onScroll}
          >
            <div
              ref={this.contentWrapperRef}
              style={scrollStyles.contentWrapper}
            >
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
