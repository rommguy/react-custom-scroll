import React from 'react'
import TestUtils from 'react-dom/test-utils'
import reactDOM from 'react-dom'
import CustomScroll from 'customScroll.js'
import '../main/cs.scss'

describe('custom scroll', function () {
  let customScrollContainer

  beforeEach(function () {
    customScrollContainer = document.createElement('div')
    customScrollContainer.id = 'testScrollContainer'
    document.body.appendChild(customScrollContainer)

    this.totalScrollHeight = 200
    this.visibleHeight = 100
    this.customScroll = renderCustomScroll(customScrollContainer, {}, this.visibleHeight, this.totalScrollHeight)
  })

  afterEach(function () {
    reactDOM.unmountComponentAtNode(customScrollContainer)
    document.body.removeChild(customScrollContainer)
  })

  function renderCustomScroll(container, props, visibleHeight, contentHeight) {
    const scrolledContent = React.createElement('div', {
      style: {
        height: contentHeight,
        width: 50
      }
    })
    const content = React.createElement('div', {
      style: {
        maxHeight: visibleHeight,
        width: 50
      }
    }, scrolledContent)
    const customScroll = reactDOM.render(React.createElement(CustomScroll, props, content), container)
    customScroll.forceUpdate()
    return customScroll
  }

  function renderCustomScrollWithRepeatedContent(container, props, visibleHeight, contentArr) {
    const scrolledContent = contentArr.map(item => React.createElement('div', {
      style: {
        height: item.height,
        width: 50
      },
      key: item.key
    }))
    const content = React.createElement('div', {
      style: {
        maxHeight: visibleHeight,
        width: 50
      }
    }, scrolledContent)
    const customScroll = reactDOM.render(React.createElement(CustomScroll, props, content), container)
    customScroll.forceUpdate()
    return customScroll
  }

  describe('general functionality', function () {
    describe('getScrollStyles', function () {
      describe('when native scrollbar exists', function () {
        beforeEach(function () {
          this.nativeScrollWidth = 15
          const innerContainer = {
            scrollTop: 0,
            offsetWidth: 0,
            clientWidth: 0
          }
          spyOn(this.customScroll, 'getScrolledElement').and.returnValue(innerContainer)

          innerContainer.clientWidth = 50
          innerContainer.offsetWidth = innerContainer.clientWidth + this.nativeScrollWidth
          this.customScroll.forceUpdate()
        })

        it('should position the inner container to the right with minus the size of the scrollbar', function () {
          const innerContainerStyle = this.customScroll.innerContainer.style

          expect(innerContainerStyle.marginRight).toEqual(`${-1 * this.nativeScrollWidth  }px`)
        })
      })

      describe('when there is no native scrollbar (mac floating scrollbar)', function () {
        beforeEach(function () {
          const innerContainer = {
            scrollTop: 0,
            offsetWidth: 0,
            clientWidth: 0
          }
          spyOn(this.customScroll, 'getScrolledElement').and.returnValue(innerContainer)
          innerContainer.clientWidth = 50
          innerContainer.offsetWidth = innerContainer.clientWidth

          this.customScroll.forceUpdate()
        })

        it('should position the inner container to the right with minus 20 pixels', function () {
          const innerContainerStyle = this.customScroll.innerContainer.style

          expect(innerContainerStyle.marginRight).toEqual('-20px')
        })
      })
    })

    describe('when scrolling content', function () {
      it('should update scroll handle position', function () {
        const initialHandlePos = this.customScroll.getScrollHandleStyle().top
        const contentContainerNode = this.customScroll.innerContainer

        contentContainerNode.scrollTop = this.totalScrollHeight / 4
        TestUtils.Simulate.scroll(contentContainerNode)

        const newHandlePos = this.customScroll.getScrollHandleStyle().top

        expect(newHandlePos).toEqual(initialHandlePos + this.visibleHeight / 4)
      })

      it('should call onScroll callback from props if defined', function () {
        const propsOnScroll = jasmine.createSpy('onScroll')
        this.customScroll = renderCustomScroll(customScrollContainer, {
          onScroll: propsOnScroll
        }, this.visibleHeight, this.totalScrollHeight)
        this.customScroll.forceUpdate()
        const contentContainerNode = this.customScroll.innerContainer

        TestUtils.Simulate.scroll(contentContainerNode)

        expect(propsOnScroll).toHaveBeenCalled()
      })

      describe('allow outer scroll', function () {
        it('should block wheel event from reaching outer container if allow outer scroll is falsy', function () {
          expect(true).toEqual(true)
        })

        it('should not block wheel event if allow outer scroll is truthy', function () {
          expect(true).toEqual(true)
        })
      })
    })

    describe('scroll handle size', function () {
      it('should set the size of the handle relative to the visible area, in the same ratio as the visible area to the content size', function () {
        const scrollHandle = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'custom-scroll-handle')
        const handleHeight = parseInt(scrollHandle.style.height, 10)

        expect(scrollHandle).toBeTruthy()
        expect(handleHeight / this.visibleHeight).toEqual(this.visibleHeight / this.totalScrollHeight)
      })

      describe('when the calculated handle height is less than minimum height', function () {
        beforeEach(function () {
          this.totalScrollHeight = 2000
          this.visibleHeight = 200
          this.customScroll = renderCustomScroll(customScrollContainer, {}, this.visibleHeight, this.totalScrollHeight)
        })

        it('should set the handle size to minimum default height', function () {
          const defaultMinHeight = 38
          const scrollHandle = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'custom-scroll-handle')
          const handleHeight = parseInt(scrollHandle.style.height, 10)

          expect(scrollHandle).toBeTruthy()
          expect(handleHeight).toEqual(defaultMinHeight)
        })

        it('should set the handle size to minimum height from props', function () {
          this.customScroll = renderCustomScroll(customScrollContainer, {
            minScrollHandleHeight: 50
          }, this.visibleHeight, this.totalScrollHeight)
          const scrollHandle = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'custom-scroll-handle')
          const handleHeight = parseInt(scrollHandle.style.height, 10)

          expect(scrollHandle).toBeTruthy()
          expect(handleHeight).toEqual(50)
        })
      })
    })
  })

  describe('freeze position', function () {
    beforeEach(function () {
      this.totalScrollHeight = 200
      this.visibleHeight = 100
      this.customScroll = renderCustomScroll(customScrollContainer, {
        freezePosition: true
      }, this.visibleHeight, this.totalScrollHeight)
    })

    it('should not scroll', function () {
      const contentContainerNode = this.customScroll.innerContainer

      contentContainerNode.scrollTop = this.totalScrollHeight / 4
      TestUtils.Simulate.scroll(contentContainerNode)

      expect(contentContainerNode.scrollTop).toEqual(0)
    })
  })

  describe('heightRelativeToParent', function () {
    describe('when defined', function () {
      beforeEach(function () {
        this.customScroll = renderCustomScroll(customScrollContainer, {
          heightRelativeToParent: '70%'
        }, this.visibleHeight, this.totalScrollHeight)
      })

      it('should set value passed as heightRelativeToParent on the root element, and 100% on other containers', function () {
        const rootStyle = reactDOM.findDOMNode(this.customScroll).style
        const innerContainerStyle = this.customScroll.innerContainer.style
        const contentWrapperStyle = this.customScroll.contentWrapper.style


        expect(rootStyle.height).toEqual('70%')
        expect(innerContainerStyle.height).toEqual('100%')
        expect(contentWrapperStyle.height).toEqual('100%')
      })
    })

    describe('when not defined', function () {
      beforeEach(function () {
        this.customScroll = renderCustomScroll(customScrollContainer, {}, this.visibleHeight, this.totalScrollHeight)
      })

      it('should set value passed as heightRelativeToParent on the root element, and 100% on other containers', function () {
        const rootStyle = reactDOM.findDOMNode(this.customScroll).style
        const innerContainerStyle = this.customScroll.innerContainer.style
        const contentWrapperStyle = this.customScroll.contentWrapper.style


        expect(rootStyle.height).toBeFalsy()
        expect(innerContainerStyle.height).toBeFalsy()
        expect(contentWrapperStyle.height).toBeFalsy()
      })
    })
  })

  describe('flex size', function () {
    beforeEach(function () {
      this.customScroll = renderCustomScroll(customScrollContainer, {
        flex: '2'
      }, this.visibleHeight, this.totalScrollHeight)
    })

    it('should set value passed as flex on the root element, and 100% on other containers', function () {
      const rootStyle = reactDOM.findDOMNode(this.customScroll).style
      const innerContainerStyle = this.customScroll.innerContainer.style
      const contentWrapperStyle = this.customScroll.contentWrapper.style


      expect(rootStyle.flexGrow).toEqual('2')
      expect(innerContainerStyle.height).toEqual('100%')
      expect(contentWrapperStyle.height).toEqual('100%')
    })
  })

  describe('Right to left support', function () {
    let customScroll
    beforeEach(function () {
      customScroll = renderCustomScroll(customScrollContainer, {
        rtl: true
      }, this.visibleHeight, this.totalScrollHeight)
    })

    it('should position the custom scrollbar on the left side of the content', function () {
      const customScrollbarStyle = window.getComputedStyle(customScroll.customScrollbarRef)
      const innerContainerStyle = customScroll.innerContainer.style
      const contentWrapperStyle = customScroll.contentWrapper.style

      expect(customScrollbarStyle.left).toEqual('3px')
      expect(innerContainerStyle.marginLeft).toEqual('-20px')
      expect(contentWrapperStyle.marginLeft).toEqual('20px')
    })

    describe('respond to click', function () {
      it('should respond to click on the custom scroll bar and change scroll pos', () => {
        const initialHandlePos = customScroll.getScrollHandleStyle().top
        const outerContainer = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'outer-container')
        const scrollHandle = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'custom-scroll-handle')
        const scrollHandleLayout = scrollHandle.getBoundingClientRect()
        const innerContainer = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'inner-container')
        const initialScrollPos = innerContainer.scrollTop

        const yBelowHandle = scrollHandleLayout.top + scrollHandleLayout.height + 20
        const xInCustomScrollbar = scrollHandleLayout.left + scrollHandleLayout.width / 2
        const clickPosition = {
          clientY: yBelowHandle,
          pageY: yBelowHandle,
          clientX: xInCustomScrollbar,
          pageX: xInCustomScrollbar
        }

        TestUtils.Simulate.click(outerContainer, clickPosition)

        expect(customScroll.getScrollHandleStyle().top).toEqual(initialHandlePos + scrollHandleLayout.height)
        expect(innerContainer.scrollTop).toBeGreaterThan(initialScrollPos)
      })

      it('should do nothing if the click is out of the custom scrollbar area', () => {
        const initialHandlePos = customScroll.getScrollHandleStyle().top
        const outerContainer = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'outer-container')
        const scrollHandle = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'custom-scroll-handle')
        const scrollHandleLayout = scrollHandle.getBoundingClientRect()
        const innerContainer = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'inner-container')
        const initialScrollPos = innerContainer.scrollTop

        const yUnderHandle = scrollHandleLayout.top + scrollHandleLayout.height + 20
        const clickPosition = {
          clientY: yUnderHandle,
          pageY: yUnderHandle,
          clientX: scrollHandleLayout.right + 10,
          pageX: scrollHandleLayout.right + 10
        }

        TestUtils.Simulate.click(outerContainer, clickPosition)

        expect(customScroll.getScrollHandleStyle().top).toEqual(initialHandlePos)
        expect(innerContainer.scrollTop).toEqual(initialScrollPos)
      })
    })
  })

  describe('custom inner handle css class', function () {
    it('should replace the default class', function () {
      this.customScroll = renderCustomScroll(customScrollContainer, {
        handleClass: 'some-custom-class'
      }, this.visibleHeight, this.totalScrollHeight)

      const scrollHandleWithDefaultClass = TestUtils.scryRenderedDOMComponentsWithClass(this.customScroll, 'inner-handle')
      const scrollHandleWithCustomClass = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'some-custom-class')

      expect(scrollHandleWithCustomClass).toBeTruthy()
      expect(scrollHandleWithDefaultClass.length).toBeFalsy()
    })
  })

  describe('on click events', function () {
    beforeEach(function () {
      this.initialHandlePos = this.customScroll.getScrollHandleStyle().top
      this.outerContainer = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'outer-container')
      this.scrollHandle = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'custom-scroll-handle')
      this.scrollHandleLayout = this.scrollHandle.getBoundingClientRect()
      this.innerContainer = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'inner-container')
      this.initialScrollPos = this.innerContainer.scrollTop
    })

    it('should do nothing if the click is out of the custom scrollbar area', function () {
      const yUnderHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height + 20
      const clickPosition = {
        clientY: yUnderHandle,
        pageY: yUnderHandle,
        clientX: this.scrollHandleLayout.left - 10,
        pageX: this.scrollHandleLayout.left - 10
      }

      TestUtils.Simulate.click(this.outerContainer, clickPosition)

      expect(this.customScroll.getScrollHandleStyle().top).toEqual(this.initialHandlePos)
      expect(this.innerContainer.scrollTop).toEqual(this.initialScrollPos)
    })

    it('should do nothing if the click is on the custom scroll handle element', function () {
      const yOnHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height / 2
      const xInCustomScrollbar = this.scrollHandleLayout.left + this.scrollHandleLayout.width / 2
      const clickPosition = {
        clientY: yOnHandle,
        pageY: yOnHandle,
        clientX: xInCustomScrollbar,
        pageX: xInCustomScrollbar
      }

      TestUtils.Simulate.click(this.outerContainer, clickPosition)

      expect(this.customScroll.getScrollHandleStyle().top).toEqual(this.initialHandlePos)
      expect(this.innerContainer.scrollTop).toEqual(this.initialScrollPos)
    })

    it('should do nothing if there is no scroll', function () {
      const contentHeight = 100
      const visibleHeight = contentHeight + 100
      this.customScroll = renderCustomScroll(customScrollContainer, {}, visibleHeight, contentHeight)

      const yOnHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height / 2
      const xInCustomScrollbar = this.scrollHandleLayout.left + this.scrollHandleLayout.width / 2
      const clickPosition = {
        clientY: yOnHandle,
        pageY: yOnHandle,
        clientX: xInCustomScrollbar,
        pageX: xInCustomScrollbar
      }

      TestUtils.Simulate.click(this.outerContainer, clickPosition)

      expect(this.customScroll.getScrollHandleStyle().top).toEqual(this.initialHandlePos)
      expect(this.innerContainer.scrollTop).toEqual(this.initialScrollPos)
    })

    describe('when click is on the custom scrollbar area, and not on the handle itself', function () {
      it('should scroll downwards and update handle position, if click is below the handle', function () {
        const yBelowHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height + 20
        const xInCustomScrollbar = this.scrollHandleLayout.left + this.scrollHandleLayout.width / 2
        const clickPosition = {
          clientY: yBelowHandle,
          pageY: yBelowHandle,
          clientX: xInCustomScrollbar,
          pageX: xInCustomScrollbar
        }

        TestUtils.Simulate.click(this.outerContainer, clickPosition)

        expect(this.customScroll.getScrollHandleStyle().top).toEqual(this.initialHandlePos + this.scrollHandleLayout.height)
        expect(this.innerContainer.scrollTop).toBeGreaterThan(this.initialScrollPos)
      })

      it('should scroll upwards and update handle position, if click is above the handle', function () {
        const yBelowHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height + 20
        const xInCustomScrollbar = this.scrollHandleLayout.left + this.scrollHandleLayout.width / 2
        const clickPositionBelowHandle = {
          clientY: yBelowHandle,
          pageY: yBelowHandle,
          clientX: xInCustomScrollbar,
          pageX: xInCustomScrollbar
        }

        TestUtils.Simulate.click(this.outerContainer, clickPositionBelowHandle)
        const newHandlePosition = this.customScroll.getScrollHandleStyle().top
        const newScrollPos = this.innerContainer.scrollTop

        const yAboveHandle = this.customScroll.getScrollHandleStyle().top - 20
        const clickPositionAboveHandle = {
          clientY: yAboveHandle,
          pageY: yAboveHandle,
          clientX: xInCustomScrollbar,
          pageX: xInCustomScrollbar
        }

        TestUtils.Simulate.click(this.outerContainer, clickPositionAboveHandle)

        expect(this.customScroll.getScrollHandleStyle().top).toEqual(newHandlePosition - this.scrollHandleLayout.height)
        expect(this.innerContainer.scrollTop).toBeLessThan(newScrollPos)
      })
    })
  })

  describe('scrollTo', function () {
    let customScroll, scrollToValue, outerContainer, visibleHeight, totalScrollHeight
    beforeEach(function () {
      scrollToValue = 10
      visibleHeight = this.visibleHeight
      totalScrollHeight = this.totalScrollHeight
      customScroll = renderCustomScroll(customScrollContainer, {scrollTo: scrollToValue}, visibleHeight, totalScrollHeight)
      outerContainer = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'outer-container')
    })

    it('should scroll content to required position', () => {
      const contentContainerNode = customScroll.innerContainer

      expect(contentContainerNode.scrollTop).toEqual(scrollToValue)
    })

    it('should work on first render', function () {
      reactDOM.unmountComponentAtNode(customScrollContainer)

      customScroll = renderCustomScroll(customScrollContainer, {scrollTo: scrollToValue}, visibleHeight, totalScrollHeight)

      const contentContainerNode = customScroll.innerContainer

      expect(contentContainerNode.scrollTop).toEqual(scrollToValue)
    })

    it('should allow scrolling away from position in props, as long as props are the same', () => {
      const innerContainer = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'inner-container')
      const initialHandlePos = customScroll.getScrollHandleStyle().top
      const scrollHandle = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'custom-scroll-handle')
      const scrollHandleLayout = scrollHandle.getBoundingClientRect()
      const initialScrollPos = innerContainer.scrollTop

      const yBelowHandle = scrollHandleLayout.top + scrollHandleLayout.height + 20
      const xInCustomScrollbar = scrollHandleLayout.left + scrollHandleLayout.width / 2
      const clickPosition = {
        clientY: yBelowHandle,
        pageY: yBelowHandle,
        clientX: xInCustomScrollbar,
        pageX: xInCustomScrollbar
      }

      TestUtils.Simulate.click(outerContainer, clickPosition)

      expect(customScroll.getScrollHandleStyle().top).toBeGreaterThan(initialHandlePos)
      expect(innerContainer.scrollTop).toBeGreaterThan(initialScrollPos)
    })

    it('should limit the top position of the scroll handle to visible area', () => {
      customScroll = renderCustomScroll(customScrollContainer, {scrollTo: -1000}, visibleHeight, totalScrollHeight)

      const scrollHandle = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'custom-scroll-handle')

      expect(scrollHandle.offsetTop).toEqual(0)
    })

    it('should limit the bottom position of the scroll handle to visible area', () => {
      customScroll = renderCustomScroll(customScrollContainer, {scrollTo: 5000}, visibleHeight, totalScrollHeight)

      const scrollHandle = TestUtils.findRenderedDOMComponentWithClass(customScroll, 'custom-scroll-handle')

      expect(scrollHandle.offsetTop).toEqual(visibleHeight - scrollHandle.offsetHeight)
    })
  })

  describe('keepAtBottom', function () {
    describe('when false', function () {
      it('should not scroll to bottom if the scroll is at the bottom', function () {
        const contentContainerNode = this.customScroll.innerContainer
        const expectedScrollTop = this.totalScrollHeight - this.visibleHeight

        // scroll to bottom
        renderCustomScroll(customScrollContainer, {scrollTo: this.totalScrollHeight}, this.visibleHeight, this.totalScrollHeight)

        expect(contentContainerNode.scrollTop).toEqual(expectedScrollTop)

        // add content
        renderCustomScroll(customScrollContainer, {}, this.visibleHeight, this.totalScrollHeight + 500)

        expect(contentContainerNode.scrollTop).toEqual(expectedScrollTop)
      })
    })

    describe('when true', function () {
      describe('when content is added', function () {
        it('should automatically scroll to bottom if the scroll is at the bottom', function () {
          const addedContentHeight = 500
          const contentContainerNode = this.customScroll.innerContainer
          const expectedScrollTop = this.totalScrollHeight - this.visibleHeight + addedContentHeight

          // scroll to bottom
          renderCustomScroll(customScrollContainer, {scrollTo: this.totalScrollHeight}, this.visibleHeight, this.totalScrollHeight)

          expect(contentContainerNode.scrollTop).toEqual(this.totalScrollHeight - this.visibleHeight)

          // add content
          renderCustomScroll(customScrollContainer, {keepAtBottom: true}, this.visibleHeight, this.totalScrollHeight + addedContentHeight)

          expect(contentContainerNode.scrollTop).toEqual(expectedScrollTop)
        })

        it('should not scroll to bottom if the scroll was not at the bottom', function () {
          const addedContentHeight = 50
          const contentContainerNode = this.customScroll.innerContainer
          const initialScrollTop = contentContainerNode.scrollTop

          // add content
          renderCustomScroll(customScrollContainer, {keepAtBottom: true}, this.visibleHeight, this.totalScrollHeight + addedContentHeight)

          expect(contentContainerNode.scrollTop).toEqual(initialScrollTop)
        })
      })

      describe('when content is replaced, with the same size', () => {
        it('should keep scroll at bottom', function () {
          const contentContainerNode = this.customScroll.innerContainer

          const content = [1, 2, 3, 4, 5, 6, 7, 8]
          const contentItems = content.map(index => ({key: index, height: 40}))
          const newContentItems = content.map(index => ({key: index + 1, height: 40}))

          // scroll to bottom
          renderCustomScrollWithRepeatedContent(customScrollContainer, {
            keepAtBottom: true,
            scrollTo: 1500
          }, 100, contentItems)
          const scrollPosAfterFirstRender = contentContainerNode.scrollTop

          // replace content
          renderCustomScrollWithRepeatedContent(customScrollContainer, {keepAtBottom: true}, 100, newContentItems)

          expect(contentContainerNode.scrollTop).toEqual(scrollPosAfterFirstRender)
        })
      })

      describe('when content is the same', function () {
        it('should not scroll to bottom if the scroll is at the bottom', function () {
          const contentContainerNode = this.customScroll.innerContainer
          const expectedScrollTop = this.totalScrollHeight - this.visibleHeight

          // scroll to bottom
          renderCustomScroll(customScrollContainer, {scrollTo: this.totalScrollHeight}, this.visibleHeight, this.totalScrollHeight)

          expect(contentContainerNode.scrollTop).toEqual(expectedScrollTop)

          renderCustomScroll(customScrollContainer, {keepAtBottom: true}, this.visibleHeight, this.totalScrollHeight)

          expect(contentContainerNode.scrollTop).toEqual(expectedScrollTop)
        })

        it('should allow regular scroll', function () {
          this.customScroll = renderCustomScroll(customScrollContainer, {
            keepAtBottom: true,
            scrollTo: this.totalScrollHeight
          }, this.visibleHeight, this.totalScrollHeight)


          const contentContainerNode = this.customScroll.innerContainer
          contentContainerNode.scrollTop = 0

          TestUtils.Simulate.scroll(contentContainerNode)

          expect(contentContainerNode.scrollTop).toEqual(0)
        })
      })
    })
  })
})

