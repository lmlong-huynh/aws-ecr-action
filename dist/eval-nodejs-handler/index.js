"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handler=void 0;function escapeRegex(x){return x.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}async function handler(event){console.log("Event: %j",{...event,ResponseURL:"..."});const expression=Object.entries(event.expressionAttributeValues).reduce((exp,[k,v])=>exp.replace(new RegExp(escapeRegex(k),"g"),JSON.stringify(v)),event.expression);return console.log(`Expression: ${expression}`),eval(expression)}exports.handler=handler;