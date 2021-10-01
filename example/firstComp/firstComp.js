import React, { Component, Fragment } from 'react'
import { times, map } from 'lodash/fp'
import { demoText } from './demoText'
import CustomScroll from '../../dist/reactCustomScroll'

function getParameterByName(name) {
  const url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) {
    return null
  }
  if (!results[2]) {
    return false
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export class FirstComp extends Component {
  static displayName = 'firstComp'
  constructor() {
    super()
    this.state = {
      dynamicContentCounter: 4
    }
  }
  getText() {
    return demoText.text
  }
  getDynamicContent() {
    return times((index) => `Content #${index}`, this.state.dynamicContentCounter)
  }
  addContent = () => {
    this.setState({
      dynamicContentCounter: this.state.dynamicContentCounter + 1
    })
  }
  removeContent = () => {
    this.setState({
      dynamicContentCounter: Math.max(this.state.dynamicContentCounter - 1, 4)
    })
  }
  getExamplesToDisplay() {
    const isFlex = getParameterByName('flex')
    const isDynamic = getParameterByName('dynamic')

    return {
      flex: isFlex,
      dynamic: isDynamic,
      standard: !isFlex && !isDynamic
    }
  }
  renderStandardExample() {
    return (
      <Fragment>
        <div key="native-example" className="container native-scroll">
          <label className="side-title">Native Scroll</label>

          <div className="panel">
            <div className="panel-header">
              <label className="panel-title">This is boring</label>
            </div>
            <div className="panel-content-native panel-content">
              <div className="content-fill">{this.getText()}</div>
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
                <div className="content-fill">{this.getText()}</div>
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
                <div className="content-fill">{this.getText()}</div>
              </div>
            </CustomScroll>
          </div>
        </div>
      </Fragment>
    )
  }
  render() {
    const exampleTypes = this.getExamplesToDisplay()
    return (
      <div className="example-wrapper">
        {exampleTypes.standard && this.renderStandardExample()}
        {exampleTypes.flex && (
          <div key="flex-example" className="container example-flex-wrapper">
            <label className="side-title">With CSS Flex</label>

            <div className="panel flex-scroll">
              <div className="panel-header">
                <label className="panel-title">Flexbox!!!</label>
              </div>
              <CustomScroll allowOuterScroll={true} flex="1">
                <div className="panel-content-custom panel-content">
                  <div className="content-fill">{this.getText()}</div>
                </div>
              </CustomScroll>
            </div>
          </div>
        )}
        {exampleTypes.dynamic && (
          <div key="dynamic-example" className="container example-dynamic-wrapper">
            <label className="side-title">KeepAtBottom prop</label>

            <div className="panel dynamic-scroll">
              <div className="panel-header">
                <label className="panel-title">DYNAMIC CONTENT!!!</label>
              </div>
              <CustomScroll allowOuterScroll={true} keepAtBottom={true}>
                <div className="panel-content-custom panel-content">
                  <div className="content-fill">
                    {map(
                      (content) => (
                        <div className="dynamic-content" key={content}>
                          {content}
                        </div>
                      ),
                      this.getDynamicContent()
                    )}
                  </div>
                </div>
              </CustomScroll>
            </div>

            <button className="dynamic-content-button" key="addContent" onClick={this.addContent}>
              Add Content
            </button>
            <button className="dynamic-content-button" key="removeContent" onClick={this.removeContent}>
              Remove Content
            </button>
          </div>
        )}
        <div className="scroll-creator" />
      </div>
    )
  }
}
