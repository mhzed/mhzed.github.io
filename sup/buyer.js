!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=136)}({0:function(e,t){e.exports=React},136:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(53),u=n(137);o.render(r.createElement(u.AppBuyer,null),document.getElementById("main"))},137:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(26);t.AppBuyer=class extends r.Component{render(){return r.createElement(r.Fragment,null,r.createElement("h1",null,"App buyer!"),r.createElement(o.LinkButton,{to:"/",buttonProps:{}},"click"))}}},18:function(e,t){e.exports=ReactRouterDOM},2:function(e,t){e.exports=window["material-ui"]},26:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(18),u=n(2);t.LinkButton=function(e){return r.createElement(u.Button,Object.assign({},e.buttonProps,{style:{visibility:e.hide?"hidden":"visible"},onClick:e.onClick?e.onClick:()=>{},component:t=>r.createElement(o.Link,Object.assign({to:e.to},t))}),e.children)},t.FileButton=function(e){return r.createElement(u.Button,Object.assign({},e.buttonProps,{component:"label"}),e.children?e.children:"UPLOAD",r.createElement("input",{name:e.name,onChange:e.onSelect?e.onSelect:e=>console.log("selected files ",e.target.files),style:{display:"none"},type:"file"}))}},53:function(e,t){e.exports=ReactDOM}});
//# sourceMappingURL=buyer.js.map