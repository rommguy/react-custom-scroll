import React, { Component, createRef } from 'react'
import styles from './cs.scss'
import { simpleDebounce } from './simpleDebounce'

const ensureWithinLimits = (value, min, max) => {
  min = !min && min !== 0 ? value : min
  max = !max && max !== 0 ? value : max
  if (min > max) {
    console.error('min limit is greater than max limit')
    return value
  }
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}

function isEventPosOnDomNode(event, domNode) {
  const nodeClientRect = domNode.getBoundingClientRect()
  return isEventPosOnLayout(event, nodeClientRect)
}

function isEventPosOnLayout(event, layout) {
  return (
    event.clientX > layout.left &&
    event.clientX < layout.right &&
    event.clientY > layout.top &&
    event.clientY < layout.top + layout.height
  )
}

class CustomScroll extends Component {
  constructor(props) {
    super(props)

    this.scrollbarYWidth = 0
    this.state = {
      scrollPos: 0,
      onDrag: false
    }

    this.hideScrollThumb = simpleDebounce(() => {
      this.setState({
        onDrag: false
      })
    }, 500)
  }

  componentDidMount() {
    if (typeof this.props.scrollTo !== 'undefined') {
      this.updateScrollPosition(this.props.scrollTo)
    } else {
      this.forceUpdate()
    }
    if (this.innerContainerRef.current) {
      this.innerContainerRef.current.addEventListener('wheel', this.blockOuterScroll, { passive: false })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContentHeight = this.contentHeight
    const prevVisibleHeight = this.visibleHeight
    const innerContainer = this.getScrolledElement()
    const reachedBottomOnPrevRender = prevState.scrollPos >= prevContentHeight - prevVisibleHeight

    this.contentHeight = innerContainer.scrollHeight
    this.scrollbarYWidth = innerContainer.offsetWidth - innerContainer.clientWidth
    this.visibleHeight = innerContainer.clientHeight
    this.scrollRatio = this.contentHeight ? this.visibleHeight / this.contentHeight : 1

    this.toggleScrollIfNeeded()
    const isExternalRender = this.state === prevState
    if (this.props.freezePosition || prevProps.freezePosition) {
      this.adjustFreezePosition(prevProps)
    }
    if (typeof this.props.scrollTo !== 'undefined' && this.props.scrollTo !== prevProps.scrollTo) {
      this.updateScrollPosition(this.props.scrollTo)
    } else if (this.props.keepAtBottom && isExternalRender && reachedBottomOnPrevRender) {
      this.updateScrollPosition(this.contentHeight - this.visibleHeight)
    }
  }

  componentWillUnmount() {
    this.hideScrollThumb.cancel()
    document.removeEventListener('mousemove', this.onHandleDrag)
    document.removeEventListener('mouseup', this.onHandleDragEnd)

    if (this.innerContainerRef.current) {
      this.innerContainerRef.current.removeEventListener('wheel', this.blockOuterScroll)
    }
  }

  customScrollRef = createRef()
  innerContainerRef = createRef()
  customScrollbarRef = createRef()
  scrollHandleRef = createRef()
  contentWrapperRef = createRef()

  adjustFreezePosition = (prevProps) => {
    if (!this.contentWrapperRef.current) {
      return
    }
    const innerContainer = this.getScrolledElement()
    const contentWrapper = this.contentWrapperRef.current

    if (this.props.freezePosition) {
      contentWrapper.scrollTop = this.state.scrollPos
    }

    if (prevProps.freezePosition) {
      innerContainer.scrollTop = this.state.scrollPos
    }
  }

  toggleScrollIfNeeded = () => {
    const shouldHaveScroll = this.contentHeight - this.visibleHeight > 1
    if (this.hasScroll !== shouldHaveScroll) {
      this.hasScroll = shouldHaveScroll
      this.forceUpdate()
    }
  }

  updateScrollPosition = (scrollValue) => {
    const innerContainer = this.getScrolledElement()
    const updatedScrollTop = ensureWithinLimits(scrollValue, 0, this.contentHeight - this.visibleHeight)
    innerContainer.scrollTop = updatedScrollTop
    this.setState({
      scrollPos: updatedScrollTop
    })
  }

  onClick = (event) => {
    if (!this.hasScroll || !this.isMouseEventOnCustomScrollbar(event) || this.isMouseEventOnScrollHandle(event)) {
      return
    }
    const newScrollHandleTop = this.calculateNewScrollHandleTop(event)
    const newScrollValue = this.getScrollValueFromHandlePosition(newScrollHandleTop)

    this.updateScrollPosition(newScrollValue)
  }

  isMouseEventOnCustomScrollbar = (event) => {
    if (!this.customScrollbarRef.current) {
      return false
    }
    const customScrollElm = this.customScrollRef.current
    const boundingRect = customScrollElm.getBoundingClientRect()
    const customScrollbarBoundingRect = this.customScrollbarRef.current.getBoundingClientRect()
    const horizontalClickArea = this.props.rtl
      ? {
          left: boundingRect.left,
          right: customScrollbarBoundingRect.right
        }
      : {
          left: customScrollbarBoundingRect.left,
          width: boundingRect.right
        }
    const customScrollbarLayout = Object.assign(
      {},
      {
        left: boundingRect.left,
        right: boundingRect.right,
        top: boundingRect.top,
        height: boundingRect.height
      },
      horizontalClickArea
    )
    return isEventPosOnLayout(event, customScrollbarLayout)
  }

  isMouseEventOnScrollHandle = (event) => {
    if (!this.scrollHandleRef.current) {
      return false
    }
    const scrollHandle = this.scrollHandleRef.current
    return isEventPosOnDomNode(event, scrollHandle)
  }

  calculateNewScrollHandleTop = (clickEvent) => {
    const domNode = this.customScrollRef.current
    const boundingRect = domNode.getBoundingClientRect()
    const currentTop = boundingRect.top + window.pageYOffset
    const clickYRelativeToScrollbar = clickEvent.pageY - currentTop
    const scrollHandleTop = this.getScrollHandleStyle().top
    let newScrollHandleTop
    const isBelowHandle = clickYRelativeToScrollbar > scrollHandleTop + this.scrollHandleHeight
    if (isBelowHandle) {
      newScrollHandleTop =
        scrollHandleTop + Math.min(this.scrollHandleHeight, this.visibleHeight - this.scrollHandleHeight)
    } else {
      newScrollHandleTop = scrollHandleTop - Math.max(this.scrollHandleHeight, 0)
    }
    return newScrollHandleTop
  }

  getScrollValueFromHandlePosition = (handlePosition) => handlePosition / this.scrollRatio

  getScrollHandleStyle = () => {
    const handlePosition = this.state.scrollPos * this.scrollRatio
    this.scrollHandleHeight = this.visibleHeight * this.scrollRatio
    return {
      height: this.scrollHandleHeight,
      top: handlePosition
    }
  }

  adjustCustomScrollPosToContentPos = (scrollPosition) => {
    this.setState({
      scrollPos: scrollPosition
    })
  }

  onScroll = (event) => {
    if (this.props.freezePosition) {
      return
    }
    this.hideScrollThumb()
    this.adjustCustomScrollPosToContentPos(event.currentTarget.scrollTop)
    if (this.props.onScroll) {
      this.props.onScroll(event)
    }
  }

  getScrolledElement = () => this.innerContainerRef.current

  onMouseDown = (event) => {
    if (!this.hasScroll || !this.isMouseEventOnScrollHandle(event)) {
      return
    }

    this.startDragHandlePos = this.getScrollHandleStyle().top
    this.startDragMousePos = event.pageY
    this.setState({
      onDrag: true
    })
    document.addEventListener('mousemove', this.onHandleDrag, { passive: false })
    document.addEventListener('mouseup', this.onHandleDragEnd, { passive: false })
  }

  onTouchStart = () => {
    this.setState({
      onDrag: true
    })
  }

  onHandleDrag = (event) => {
    event.preventDefault()
    const mouseDeltaY = event.pageY - this.startDragMousePos
    const handleTopPosition = ensureWithinLimits(
      this.startDragHandlePos + mouseDeltaY,
      0,
      this.visibleHeight - this.scrollHandleHeight
    )
    const newScrollValue = this.getScrollValueFromHandlePosition(handleTopPosition)
    this.updateScrollPosition(newScrollValue)
  }

  onHandleDragEnd = (e) => {
    this.setState({
      onDrag: false
    })
    e.preventDefault()
    document.removeEventListener('mousemove', this.onHandleDrag)
    document.removeEventListener('mouseup', this.onHandleDragEnd)
  }

  blockOuterScroll = (e) => {
    if (this.props.allowOuterScroll) {
      return
    }
    const contentNode = e.currentTarget
    const totalHeight = e.currentTarget.scrollHeight
    const maxScroll = totalHeight - e.currentTarget.offsetHeight
    const delta = e.deltaY % 3 ? e.deltaY : e.deltaY * 10
    if (contentNode.scrollTop + delta <= 0) {
      contentNode.scrollTop = 0
      e.preventDefault()
    } else if (contentNode.scrollTop + delta >= maxScroll) {
      contentNode.scrollTop = maxScroll
      e.preventDefault()
    }
    e.stopPropagation()
  }

  getInnerContainerClasses = () => {
    if (this.state.scrollPos && this.props.addScrolledClass) {
      return `${styles.innerContainer} ${styles.contentScrolled}`
    }
    return styles.innerContainer
  }

  getScrollStyles = () => {
    const scrollSize = this.scrollbarYWidth || 20
    const marginKey = this.props.rtl ? 'marginLeft' : 'marginRight'
    const innerContainerStyle = {
      height: this.props.heightRelativeToParent || this.props.flex ? '100%' : ''
    }
    innerContainerStyle[marginKey] = -1 * scrollSize
    const contentWrapperStyle = {
      height: this.props.heightRelativeToParent || this.props.flex ? '100%' : '',
      overflowY: this.props.freezePosition ? 'hidden' : 'visible'
    }
    contentWrapperStyle[marginKey] = this.scrollbarYWidth ? 0 : scrollSize

    return {
      innerContainer: innerContainerStyle,
      contentWrapper: contentWrapperStyle
    }
  }

  getOuterContainerStyle = () => ({
    height: this.props.heightRelativeToParent || this.props.flex ? '100%' : ''
  })

  getRootStyles = () => {
    const result = {}

    if (this.props.heightRelativeToParent) {
      result.height = this.props.heightRelativeToParent
    } else if (this.props.flex) {
      result.flex = this.props.flex
    }

    return result
  }

  enforceMinHandleHeight = (calculatedStyle) => {
    const minHeight = this.props.minScrollHandleHeight
    if (calculatedStyle.height >= minHeight) {
      return calculatedStyle
    }

    const diffHeightBetweenMinAndCalculated = minHeight - calculatedStyle.height
    const scrollPositionToAvailableScrollRatio = this.state.scrollPos / (this.contentHeight - this.visibleHeight)
    const scrollHandlePosAdjustmentForMinHeight =
      diffHeightBetweenMinAndCalculated * scrollPositionToAvailableScrollRatio
    const handlePosition = calculatedStyle.top - scrollHandlePosAdjustmentForMinHeight

    return {
      height: minHeight,
      top: handlePosition
    }
  }

  render() {
    const scrollStyles = this.getScrollStyles()
    const rootStyle = this.getRootStyles()
    const scrollHandleStyle = this.enforceMinHandleHeight(this.getScrollHandleStyle())
    const className = [
      this.props.className || '',
      styles.customScroll,
      this.state.onDrag ? styles.scrollHandleDragged : ''
    ].join(' ')

    return (
      <div className={className} style={rootStyle} ref={this.customScrollRef}>
        <div
          className={styles.outerContainer}
          style={this.getOuterContainerStyle()}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
          onClick={this.onClick}
        >
          {this.hasScroll ? (
            <div className={styles.positioning}>
              <div
                ref={this.customScrollbarRef}
                className={`${styles.customScrollbar} ${this.props.rtl ? styles.customScrollbarRtl : ''}`}
                key="scrollbar"
              >
                <div ref={this.scrollHandleRef} className={styles.customScrollHandle} style={scrollHandleStyle}>
                  <div className={this.props.handleClass} />
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
            <div className={styles.contentWrapper} ref={this.contentWrapperRef} style={scrollStyles.contentWrapper}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

try {
  const PropTypes = require('prop-types')
  CustomScroll.propTypes = {
    children: PropTypes.any,
    allowOuterScroll: PropTypes.bool,
    heightRelativeToParent: PropTypes.string,
    onScroll: PropTypes.func,
    addScrolledClass: PropTypes.bool,
    freezePosition: PropTypes.bool,
    handleClass: PropTypes.string,
    minScrollHandleHeight: PropTypes.number,
    flex: PropTypes.string,
    rtl: PropTypes.bool,
    scrollTo: PropTypes.number,
    keepAtBottom: PropTypes.bool,
    className: PropTypes.string
  }
} catch (e) {} //eslint-disable-line no-empty

CustomScroll.defaultProps = {
  handleClass: styles.innerHandle,
  minScrollHandleHeight: 38
}

export default CustomScroll
