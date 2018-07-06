import React, {Component} from 'react'
import reactDOM from 'react-dom'
import './cs.scss'

const simpleDebounce = (func, delay) => {
  let timer

  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func()
    }, delay)
  }
}

const ensureWithinLimits = (value, min, max) => {
  min = (!min && min !== 0) ? value : min
  max = (!max && max !== 0) ? value : max
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
  return (event.clientX > layout.left &&
    event.clientX < layout.right &&
    event.clientY > layout.top &&
    event.clientY < layout.top + layout.height)
}

class CustomScroll extends Component {
  constructor(props) {
    super(props)

    this.scrollbarYWidth = 0
    this.state = {
      scrollPos: 0,
      onDrag: false
    }

    this.setRefElement = elmKey => element => {
      if (element && !this[elmKey]) {
        this[elmKey] = element
      }
    }

    this.hideScrollThumb = simpleDebounce(() => {
      this.setState({
        onDrag: false,
      })
    }, 500)
  }

  componentDidMount() {
    if (typeof this.props.scrollTo !== 'undefined') {
      this.updateScrollPosition(this.props.scrollTo)
    } else {
      this.forceUpdate()
    }
  }

  componentWillReceiveProps() {
    this.externalRender = true
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

    if (this.props.freezePosition || prevProps.freezePosition) {
      this.adjustFreezePosition(prevProps)
    }
    if (typeof this.props.scrollTo !== 'undefined' && this.props.scrollTo !== prevProps.scrollTo) {
      this.updateScrollPosition(this.props.scrollTo)
    } else if (
      this.props.keepAtBottom &&
      this.externalRender &&
      reachedBottomOnPrevRender
    ) {
      this.updateScrollPosition(this.contentHeight - this.visibleHeight)
    }
    this.externalRender = false
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onHandleDrag)
    document.removeEventListener('mouseup', this.onHandleDragEnd)
  }

  adjustFreezePosition(prevProps) {
    const innerContainer = this.getScrolledElement()
    const contentWrapper = this.contentWrapper

    if (this.props.freezePosition) {
      contentWrapper.scrollTop = this.state.scrollPos
    }

    if (prevProps.freezePosition) {
      innerContainer.scrollTop = this.state.scrollPos
    }
  }

  toggleScrollIfNeeded() {
    const shouldHaveScroll = this.contentHeight - this.visibleHeight > 1
    if (this.hasScroll !== shouldHaveScroll) {
      this.hasScroll = shouldHaveScroll
      this.forceUpdate()
    }
  }

  getScrollTop() {
    return this.getScrolledElement().scrollTop
  }

  updateScrollPosition(scrollValue) {
    const innerContainer = this.getScrolledElement()
    const updatedScrollTop = ensureWithinLimits(scrollValue, 0, this.contentHeight - this.visibleHeight)
    innerContainer.scrollTop = updatedScrollTop
    this.setState({
      scrollPos: updatedScrollTop
    })
  }

  onClick = event => {
    if (!this.hasScroll || !this.isMouseEventOnCustomScrollbar(event) || this.isMouseEventOnScrollHandle(event)) {
      return
    }
    const newScrollHandleTop = this.calculateNewScrollHandleTop(event)
    const newScrollValue = this.getScrollValueFromHandlePosition(newScrollHandleTop)

    this.updateScrollPosition(newScrollValue)
  }

  isMouseEventOnCustomScrollbar(event) {
    if (!this.customScrollbarRef) {
      return false
    }
    const customScrollElm = reactDOM.findDOMNode(this)
    const boundingRect = customScrollElm.getBoundingClientRect()
    const customScrollbarBoundingRect = this.customScrollbarRef.getBoundingClientRect()
    const horizontalClickArea = this.props.rtl ? {
      left: boundingRect.left,
      right: customScrollbarBoundingRect.right
    } : {
      left: customScrollbarBoundingRect.left,
      width: boundingRect.right
    }
    const customScrollbarLayout = Object.assign({}, {
      left: boundingRect.left,
      right: boundingRect.right,
      top: boundingRect.top,
      height: boundingRect.height
    }, horizontalClickArea)
    return isEventPosOnLayout(event, customScrollbarLayout)
  }

  isMouseEventOnScrollHandle(event) {
    if (!this.scrollHandle) {
      return false
    }
    const scrollHandle = reactDOM.findDOMNode(this.scrollHandle)
    return isEventPosOnDomNode(event, scrollHandle)
  }

  calculateNewScrollHandleTop(clickEvent) {
    const domNode = reactDOM.findDOMNode(this)
    const boundingRect = domNode.getBoundingClientRect()
    const currentTop = boundingRect.top + window.pageYOffset
    const clickYRelativeToScrollbar = clickEvent.pageY - currentTop
    const scrollHandleTop = this.getScrollHandleStyle().top
    let newScrollHandleTop
    const isBelowHandle = clickYRelativeToScrollbar > (scrollHandleTop + this.scrollHandleHeight)
    if (isBelowHandle) {
      newScrollHandleTop = scrollHandleTop + Math.min(this.scrollHandleHeight, this.visibleHeight - this.scrollHandleHeight)
    } else {
      newScrollHandleTop = scrollHandleTop - Math.max(this.scrollHandleHeight, 0)
    }
    return newScrollHandleTop
  }

  getScrollValueFromHandlePosition(handlePosition) {
    return (handlePosition) / this.scrollRatio
  }

  getScrollHandleStyle() {
    const handlePosition = this.state.scrollPos * this.scrollRatio
    this.scrollHandleHeight = this.visibleHeight * this.scrollRatio
    return {
      height: this.scrollHandleHeight,
      top: handlePosition
    }
  }

  adjustCustomScrollPosToContentPos(scrollPosition) {
    this.setState({
      scrollPos: scrollPosition
    })
  }

  onScroll = event => {
    if (this.props.freezePosition) {
      return
    }
    this.hideScrollThumb()
    this.adjustCustomScrollPosToContentPos(event.currentTarget.scrollTop)
    if (this.props.onScroll) {
      this.props.onScroll(event)
    }
  }

  getScrolledElement() {
    return this.innerContainer
  }

  onMouseDown = event => {
    if (!this.hasScroll || !this.isMouseEventOnScrollHandle(event)) {
      return
    }

    this.startDragHandlePos = this.getScrollHandleStyle().top
    this.startDragMousePos = event.pageY
    this.setState({
      onDrag: true
    })
    document.addEventListener('mousemove', this.onHandleDrag)
    document.addEventListener('mouseup', this.onHandleDragEnd)
  }

  onTouchStart = () => {
    this.setState({
      onDrag: true
    })
  }  

  onHandleDrag = event => {
    event.preventDefault()
    const mouseDeltaY = event.pageY - this.startDragMousePos
    const handleTopPosition = ensureWithinLimits(this.startDragHandlePos + mouseDeltaY, 0, this.visibleHeight - this.scrollHandleHeight)
    const newScrollValue = this.getScrollValueFromHandlePosition(handleTopPosition)
    this.updateScrollPosition(newScrollValue)
  }

  onHandleDragEnd = e => {
    this.setState({
      onDrag: false
    })
    e.preventDefault()
    document.removeEventListener('mousemove', this.onHandleDrag)
    document.removeEventListener('mouseup', this.onHandleDragEnd)
  }

  blockOuterScroll = e => {
    if (this.props.allowOuterScroll) {
      return
    }
    const contentNode = e.currentTarget
    const totalHeight = e.currentTarget.scrollHeight
    const maxScroll = totalHeight - e.currentTarget.offsetHeight
    const delta = e.deltaY % 3 ? (e.deltaY) : (e.deltaY * 10)
    if (contentNode.scrollTop + delta <= 0) {
      contentNode.scrollTop = 0
      e.preventDefault()
    } else if (contentNode.scrollTop + delta >= maxScroll) {
      contentNode.scrollTop = maxScroll
      e.preventDefault()
    }
    e.stopPropagation()
  }

  getInnerContainerClasses() {
    let res = 'inner-container'
    if (this.state.scrollPos && this.props.addScrolledClass) {
      res += ' content-scrolled'
    }
    return res
  }

  getScrollStyles() {
    const scrollSize = this.scrollbarYWidth || 20
    const marginKey = this.props.rtl ? 'marginLeft' : 'marginRight'
    const innerContainerStyle = {
      height: (this.props.heightRelativeToParent || this.props.flex) ? '100%' : ''
    }
    innerContainerStyle[marginKey] = -1 * scrollSize
    const contentWrapperStyle = {
      height: (this.props.heightRelativeToParent || this.props.flex) ? '100%' : '',
      overflowY: this.props.freezePosition ? 'hidden' : 'visible'
    }
    contentWrapperStyle[marginKey] = this.scrollbarYWidth ? 0 : scrollSize

    return {
      innerContainer: innerContainerStyle,
      contentWrapper: contentWrapperStyle
    }
  }

  getOuterContainerStyle() {
    return {
      height: (this.props.heightRelativeToParent || this.props.flex) ? '100%' : ''
    }
  }

  getRootStyles() {
    const result = {}

    if (this.props.heightRelativeToParent) {
      result.height = this.props.heightRelativeToParent
    } else if (this.props.flex) {
      result.flex = this.props.flex
    }

    return result
  }

  enforceMinHandleHeight(calculatedStyle) {
    const minHeight = this.props.minScrollHandleHeight
    if (calculatedStyle.height >= minHeight) {
      return calculatedStyle
    }

    const diffHeightBetweenMinAndCalculated = minHeight - calculatedStyle.height
    const scrollPositionToAvailableScrollRatio = this.state.scrollPos / (this.contentHeight - this.visibleHeight)
    const scrollHandlePosAdjustmentForMinHeight = diffHeightBetweenMinAndCalculated * scrollPositionToAvailableScrollRatio
    const handlePosition = calculatedStyle.top - scrollHandlePosAdjustmentForMinHeight

    return {
      height: minHeight,
      top: handlePosition
    }
  }

  setCustomScrollbarRef = elm => {
    if (elm && !this.customScrollbarRef) {
      this.customScrollbarRef = elm
    }
  }

  render() {
    const scrollStyles = this.getScrollStyles()
    const rootStyle = this.getRootStyles()
    const scrollHandleStyle = this.enforceMinHandleHeight(this.getScrollHandleStyle())

    return (
      <div className={`custom-scroll ${ this.state.onDrag ? 'scroll-handle-dragged' : ''}`}
           style={rootStyle}>
        <div className="outer-container"
             style={this.getOuterContainerStyle()}
             onMouseDown={this.onMouseDown}
             onTouchStart={this.onTouchStart}
             onClick={this.onClick}>
          {this.hasScroll ? (
            <div className="positioning">
              <div ref={this.setCustomScrollbarRef}
                   className={`custom-scrollbar${ this.props.rtl ? ' custom-scrollbar-rtl' : ''}`}
                   key="scrollbar">
                <div ref={this.setRefElement('scrollHandle')}
                     className="custom-scroll-handle"
                     style={scrollHandleStyle}>
                  <div className={this.props.handleClass}/>
                </div>
              </div>
            </div>) : null}
          <div ref={this.setRefElement('innerContainer')}
               className={this.getInnerContainerClasses()}
               style={scrollStyles.innerContainer}
               onScroll={this.onScroll}
               onWheel={this.blockOuterScroll}>
            <div className="content-wrapper"
                 ref={this.setRefElement('contentWrapper')}
                 style={scrollStyles.contentWrapper}>
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
    keepAtBottom: PropTypes.bool
  }
} catch (e) {} //eslint-disable-line no-empty

CustomScroll.defaultProps = {
  handleClass: 'inner-handle',
  minScrollHandleHeight: 38
}

module.exports = CustomScroll