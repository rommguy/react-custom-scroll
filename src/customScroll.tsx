import {
  Component,
  CSSProperties,
  createRef,
  UIEvent,
  MouseEvent,
  PropsWithChildren,
} from "react";
import styled from "styled-components";
import {
  ElementLayout,
  ensureWithinLimits,
  isEventPosOnDomNode,
  isEventPosOnLayout,
  simpleDebounce,
} from "./utils.ts";

const CustomScrollbar = styled.div`
  position: absolute;
  height: 100%;
  width: 6px;
  right: 3px;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.4s ease-out;
  padding: 6px 0;
  box-sizing: border-box;
  will-change: opacity;
  pointer-events: none;

  &.rcs-custom-scrollbar-rtl {
    right: auto;
    left: 3px;
  }
`;

const ScrollHandle = styled.div`
  height: calc(100% - 12px);
  margin-top: 6px;
  background-color: rgba(78, 183, 245, 0.7);
  border-radius: 3px;
`;

const CustomScrollRoot = styled.div`
  min-height: 0;
  min-width: 0;

  & .rcs-outer-container {
    overflow: hidden;

    & .rcs-positioning {
      position: relative;
    }

    &:hover ${CustomScrollbar} {
      opacity: 1;
      transition-duration: 0.2s;
    }
  }

  & .rcs-inner-container {
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 0;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.05) 60%,
        rgba(0, 0, 0, 0) 100%
      );
      pointer-events: none;
      transition: height 0.1s ease-in;
      will-change: height;
    }

    &.rcs-content-scrolled:after {
      height: 5px;
      transition: height 0.15s ease-out;
    }
  }

  &.rcs-scroll-handle-dragged .rcs-inner-container {
    user-select: none;
  }

  &.rcs-scroll-handle-dragged ${CustomScrollbar} {
    opacity: 1;
  }

  & .rcs-custom-scroll-handle {
    position: absolute;
    width: 100%;
    top: 0;
  }
`;

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
      overscrollBehavior: this.props.allowOuterScroll ? "auto" : "none",
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
      <CustomScrollRoot
        className={className}
        style={rootStyle}
        ref={this.customScrollRef}
      >
        <div
          data-testid="outer-container"
          className="rcs-outer-container"
          style={this.getOuterContainerStyle()}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
          onClick={this.onClick}
        >
          {this.hasScroll ? (
            <div className="rcs-positioning">
              <CustomScrollbar
                data-testid="custom-scrollbar"
                ref={this.customScrollbarRef}
                className={`rcs-custom-scrollbar ${this.props.rtl ? "rcs-custom-scrollbar-rtl" : ""}`}
                key="scrollbar"
              >
                <div
                  data-testid="custom-scroll-handle"
                  ref={this.scrollHandleRef}
                  className="rcs-custom-scroll-handle"
                  style={scrollHandleStyle}
                >
                  <ScrollHandle className={this.props.handleClass || ""} />
                </div>
              </CustomScrollbar>
            </div>
          ) : null}
          <div
            data-testid="inner-container"
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
      </CustomScrollRoot>
    );
  }
}
