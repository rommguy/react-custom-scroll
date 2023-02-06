import React from 'react'
import { createRoot } from 'react-dom/client'
import { FirstComp } from './firstComp/firstComp'

debugger
const root = createRoot(document.getElementById('body'))
root.render(React.createElement(FirstComp))
