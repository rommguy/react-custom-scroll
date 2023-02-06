[![NPM version][npm-image]][npm-url]
![](https://github.com/rommguy/react-custom-scroll/workflows/build/badge.svg)
![](https://img.shields.io/npm/dw/react-custom-scroll)


# React-Custom-Scroll
An easily designable, cross browser (!!), custom scroll with ReactJS  
Animations and scroll rate **exactly** like native scroll 

##### See a [working demo](http://rommguy.github.io/react-custom-scroll/example/demo.html) ###

## Installation
```sh
npm i react-custom-scroll --save
```

### Why do I need this ?  
- Same design on all browsers
- Scrollbar is above the content instead of floating to the side - same layout on scrolled content as not scrolled content

### How to use ?
Custom scroll component is available in commonJS format so you can just require it after installing.  
There is also a UMD version - inside dist directory.           
In both cases **you have to include the customScroll.css** file in your page.  
It is located in /dist directory       
**From unpkg cdn:**      
* [Js file](https://unpkg.com/react-custom-scroll@5.0.0/dist/reactCustomScroll)
* [css file](https://unpkg.com/react-custom-scroll@5.0.0/dist/customScroll.css)

Wrap your content with the custom scroll component  
Remove any overflow style properties from your content root component - The custom scroll will take care of it


```js
import CustomScroll from 'react-custom-scroll';
```

```jsx
<CustomScroll>
  your content
</CustomScroll>
```
  
### How to change the design ?  
Your own custom design can be applied by styling these 2 classes in your css:  

- rcs-custom-scrollbar - this class styles the container of the scroll handle, you can use it if your handle width is greater than the default.  
- rcs-inner-handle - this class styles the handle itself, you can use it to change the color, background, border and such of the handle  

You can see a usage example in example/firstComp/firstComp.scss  

### Options (react props)

- **allowOuterScroll** : boolean, default false. Blocks outer scroll while scrolling the content
- **heightRelativeToParent** : string, default undefined. Content height limit is relative to parent - the value should be the height limit.
- **flex** : number, default undefined. If present will apply to the content wrapped by the custom scroll.  
This prop represents flex size. It is only relevant if the parent of customScroll has display: flex. See example below.  
This prop will override any value given to heightRelativeToParent when setting the height of customScroll.
- **onScroll** - function, default undefined. Listener that will be called on each scroll.
- **addScrolledClass** : boolean, default false. If true, will add a css class 'content-scrolled' while being scrolled.
- **freezePosition** : boolean, default false. When true, will prevent scrolling. 
- **minScrollHandleHeight** : number, sets the mimimum height of the scroll handle. Default is 38, as in Chrome on OSX.
- **rtl** : boolean, default false. Right to left document, will place the custom scrollbar on the left side of the content, and assume the native one is also there.
- **scrollTo**: number, default undefined. Will scroll content to the given value.
- **keepAtBottom**: boolean, default false. For dynamic content, will keep the scroll position at the bottom of the content, when the content changes, if the position was at the bottom before the change. [See example here](http://rommguy.github.io/react-custom-scroll/example/demo.html?dynamic=true)
- **className**: string, default undefined. Allows adding your own class name to the root element.

##### Example for heightRelativeToParent

```jsx
<CustomScroll heightRelativeToParent="calc(100% - 20px)">
  your content
</CustomScroll>  
```

### It doesn't work, please help me

- Check if you forgot to remove 'overflow' properties from the content root element.
- If you're using JSX, make sure you use Pascal case and not camelCase \<CustomScroll\> and not \<customScroll\>.  
starting with lower case causes JSX to treat the tag as a native dom element
- Make sure you have a height limit on the content root element (max-height)
- Check if your height limit is relative to parent, and you didn't use heightRelativeToParent prop.

### Typescript
- You can use CustomScroll types by installing @types/react-custom-scroll from npm

### Usage with flexbox
##### See a [demo with Flex](http://rommguy.github.io/react-custom-scroll/example/demo.html?flex=true) ###
There are some details that apply when using customScroll on elements with size set by css flex.  
Here is an example for an HTML structure before using customScroll:  

```jsx
<SomeParent style="display: flex; height: 500px;">
  <FixedHeightElement style="height: 100px"><FixedHeightElement />
  <FlexibleHeightElement style="flex:1; overflow:scroll">
    your content (with enough height to cause a scroll)
  <FlexibleHeightElement />
</SomeParent>  
```

In this example, a scroll is active on the flexibleHeightElement, where the flex size sets it's height to 400px, after the fixedHeight element took 100px.  

#### Solutions
There are 2 options to use customScroll with this structure:

- Wrapping the content:  
For this solution, the overflow property should be removed from the flex size element, since the customScroll will take care of that. 
Instead, min-height and min-width should be set to 0.

```jsx
<someParent style="display: flex; height: 500px;">
  <fixedHeightElement style="height: 100px"><fixedHeightElement/>
  <flexibleHeightElement style="flex:1; min-height: 0; min-width: 0">
    <CustomScroll heightRelativeToParent="100%">
      your content (with enough height to cause a scroll)
    <CustomScroll/>
  <flexibleHeightElement/>
</someParent>  
```

min-height and min-width are required since flex won't shrink below it's minimum content size ([flex box spec](https://www.w3.org/TR/css-flexbox/#flex-common)).  

- Replacing the flex-size element with customScroll

```jsx
<someParent style="display: flex; height: 500px;">
  <fixedHeightElement style="height: 100px"><fixedHeightElement/>
  <CustomScroll flex="1">
      your content (with enough height to cause a scroll)
  <CustomScroll/>
</someParent>  
```

### Contributing
To build the project in watch mode, run 'npm run develop' or 'yarn develop'.  
For production build - run yarn build .   

### Tests
```sh
npm install
npm test
# Or for continuous run
npx karma start
```

[npm-image]: https://img.shields.io/npm/v/react-custom-scroll.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-custom-scroll
[travis-image]: https://img.shields.io/travis/wix/react-custom-scroll/gh-pages.svg?style=flat-square
[travis-url]: https://travis-ci.org/wix/react-custom-scroll
[coveralls-image]: https://img.shields.io/coveralls/wix/react-custom-scroll/gh-pages.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/wix/react-custom-scroll?branch=gh-pages
[downloads-image]: http://img.shields.io/npm/dm/react-custom-scroll.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-custom-scroll
