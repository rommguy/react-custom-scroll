# React-Custom-Scroll
An easily designable, cross browser (!!), custom scroll with ReactJS  
Animations and scroll rate **exactly** like native scroll 

##### See a [working Demo](demo.html) ###

### Why do I need this ?  
- Same design on all browsers
- Scrollbar above content instead of floating to the side - same layout on scrolled content as not scrolled content

### How to use ?
wrap your content with the custom scroll component
remove overflow style properties from your content root component - The custom scroll will take care of it


```
<customScroll>
  your content
</customScroll>

```

### Options (react props)

- allowOuterScroll : boolean, default false. Blocks outer scroll while scrolling the content
- heightRelativetoParent : string, default undefined. Content height limit is relative to parent - the value should be the height limit.
- onScroll - function, default undefined. Listener that will be called on each scroll.
- addScrolledClass - boolean, default false. If true, will add a css class 'content-scrolled' while being scrolled.

##### Example for heightRelativetoParent

```
<customScroll heightRelativetoParent="calc(100% - 20px)"">
  your content
</customScroll>  
```

### It doesn't work, please help me

- Check if you forgot to remove 'overflow' properties from the content root element.
- Check if your height limit is relative to parent, and you didn't use heightRelativetoParent prop.
