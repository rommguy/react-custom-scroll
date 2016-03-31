'use strict';
var context = require.context('./src', true, /(spec\.js$|\.css$)/);
context.keys().forEach(context);