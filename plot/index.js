!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=11)}([function(e,t){e.exports=React},function(e,t){e.exports=ReactRouterDOM},function(e,t){e.exports=ReactDOM},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(r(5)),o=a(r(9));function a(e){return e&&e.__esModule?e:{default:e}}var i=(0,n.default)(o.default);t.default=i,e.exports=t.default},function(e,t,r){"use strict";(function(e){var r="object"==typeof e&&e&&e.Object===Object&&e;t.a=r}).call(this,r(10))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();t.default=function(e){var t=function(t){function r(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e));return t.p=Promise.resolve(),t.resizeHandler=null,t.handlers={},t.syncWindowResize=t.syncWindowResize.bind(t),t.syncEventHandlers=t.syncEventHandlers.bind(t),t.attachUpdateEvents=t.attachUpdateEvents.bind(t),t.getRef=t.getRef.bind(t),t.handleUpdate=t.handleUpdate.bind(t),t.figureCallback=t.figureCallback.bind(t),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(r,t),n(r,[{key:"componentDidMount",value:function(){var t=this;this.p=this.p.then(function(){return e.newPlot(t.el,{data:t.props.data,layout:t.props.layout,config:t.props.config,frames:t.props.frames})}).then(function(){return t.syncWindowResize(null,!0)}).then(this.syncEventHandlers).then(this.attachUpdateEvents).then(function(){return t.figureCallback(t.props.onInitialized)}).catch(function(e){return console.error("Error while plotting:",e),t.props.onError&&t.props.onError(e)})}},{key:"componentWillUpdate",value:function(t){var r=this;if(void 0===t.revision||t.revision!==this.props.revision){var n=this.props.frames&&this.props.frames.length?this.props.frames.length:0,o=t.frames&&t.frames.length?t.frames.length:0;t.layout===this.props.layout&&t.data===this.props.data&&t.config===this.props.config&&o===n||(this.p=this.p.then(function(){return e.react(r.el,{data:t.data,layout:t.layout,config:t.config,frames:t.frames})}).then(function(){return r.syncEventHandlers(t)}).then(function(){return r.syncWindowResize(t)}).then(function(){return r.figureCallback(t.onUpdate)}).catch(function(e){console.error("Error while plotting:",e),r.props.onError&&r.props.onError(e)}))}}},{key:"componentWillUnmount",value:function(){this.figureCallback(this.props.onPurge),this.resizeHandler&&c&&(window.removeEventListener("resize",this.resizeHandler),this.resizeHandler=null),this.removeUpdateEvents(),e.purge(this.el)}},{key:"attachUpdateEvents",value:function(){if(this.el&&this.el.removeListener)for(var e=0;e<l.length;e++)this.el.on(l[e],this.handleUpdate)}},{key:"removeUpdateEvents",value:function(){if(this.el&&this.el.removeListener)for(var e=0;e<l.length;e++)this.el.removeListener(l[e],this.handleUpdate)}},{key:"handleUpdate",value:function(){this.figureCallback(this.props.onUpdate)}},{key:"figureCallback",value:function(e){if("function"==typeof e){var t=this.el,r=t.data,n=t.layout,o=this.el._transitionData?this.el._transitionData._frames:null,a={data:r,layout:n,frames:o};e(a,this.el)}}},{key:"syncWindowResize",value:function(t,r){var n=this,o=t||this.props;c&&(o.useResizeHandler&&!this.resizeHandler?(this.resizeHandler=function(){return e.Plots.resize(n.el)},window.addEventListener("resize",this.resizeHandler),r&&this.resizeHandler()):!o.useResizeHandler&&this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),this.resizeHandler=null))}},{key:"getRef",value:function(e){this.el=e,this.props.debug&&c&&(window.gd=this.el)}},{key:"syncEventHandlers",value:function(e){for(var t=e||this.props,r=0;r<u.length;r++){var n=u[r],o=t["on"+n],a=!!this.handlers[n];o&&!a?(this.handlers[n]=o,this.el.on("plotly_"+n.toLowerCase(),this.handlers[n])):!o&&a&&(this.el.removeListener("plotly_"+n.toLowerCase(),this.handlers[n]),delete this.handlers[n])}}},{key:"render",value:function(){return a.default.createElement("div",{id:this.props.divId,style:this.props.style,ref:this.getRef,className:this.props.className})}}]),r}(o.Component);t.propTypes={data:i.default.arrayOf(i.default.object),config:i.default.object,layout:i.default.object,frames:i.default.arrayOf(i.default.object),revision:i.default.number,onInitialized:i.default.func,onPurge:i.default.func,onError:i.default.func,onUpdate:i.default.func,debug:i.default.bool,style:i.default.object,className:i.default.string,useResizeHandler:i.default.bool,divId:i.default.string};for(var r=0;r<u.length;r++)t.propTypes["on"+u[r]]=i.default.func;return t.defaultProps={debug:!1,useResizeHandler:!1,data:[],style:{position:"relative",display:"inline-block"}},t};var o=r(0),a=s(o),i=s(r(6));function s(e){return e&&e.__esModule?e:{default:e}}var u=["AfterExport","AfterPlot","Animated","AnimatingFrame","AnimationInterrupted","AutoSize","BeforeExport","ButtonClicked","Click","ClickAnnotation","Deselect","DoubleClick","Framework","Hover","LegendClick","LegendDoubleClick","Relayout","Restyle","Redraw","Selected","Selecting","SliderChange","SliderEnd","SliderStart","Transitioning","TransitionInterrupted","Unhover"],l=["plotly_restyle","plotly_redraw","plotly_relayout","plotly_doubleclick","plotly_animated"],c="undefined"!=typeof window;e.exports=t.default},function(e,t,r){e.exports=r(7)()},function(e,t,r){"use strict";var n=r(8);function o(){}e.exports=function(){function e(e,t,r,o,a,i){if(i!==n){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return r.checkPropTypes=o,r.PropTypes=r,r}},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t){e.exports=Plotly},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r(2),a=r(3),i=r.n(a),s=r(1),u=r(4),l="object"==typeof self&&self&&self.Object===Object&&self,c=u.a||l||Function("return this")(),f=c.Symbol,p=Object.prototype,d=p.hasOwnProperty,h=p.toString,v=f?f.toStringTag:void 0;var y=function(e){var t=d.call(e,v),r=e[v];try{e[v]=void 0;var n=!0}catch(e){}var o=h.call(e);return n&&(t?e[v]=r:delete e[v]),o},_=Object.prototype.toString;var b=function(e){return _.call(e)},g="[object Null]",m="[object Undefined]",w=f?f.toStringTag:void 0;var O=function(e){return null==e?void 0===e?m:g:w&&w in Object(e)?y(e):b(e)};var j=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)},E="[object AsyncFunction]",z="[object Function]",P="[object GeneratorFunction]",k="[object Proxy]";var R,S=function(e){if(!j(e))return!1;var t=O(e);return t==z||t==P||t==E||t==k},x=c["__core-js_shared__"],C=(R=/[^.]+$/.exec(x&&x.keys&&x.keys.IE_PROTO||""))?"Symbol(src)_1."+R:"";var H=function(e){return!!C&&C in e},U=Function.prototype.toString;var T=function(e){if(null!=e){try{return U.call(e)}catch(e){}try{return e+""}catch(e){}}return""},L=/^\[object .+?Constructor\]$/,A=Function.prototype,M=Object.prototype,I=A.toString,D=M.hasOwnProperty,F=RegExp("^"+I.call(D).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var $=function(e){return!(!j(e)||H(e))&&(S(e)?F:L).test(T(e))};var W=function(e,t){return null==e?void 0:e[t]};var N=function(e,t){var r=W(e,t);return $(r)?r:void 0},B=function(){try{var e=N(Object,"defineProperty");return e({},"",{}),e}catch(e){}}();var q=function(e,t,r){"__proto__"==t&&B?B(e,t,{configurable:!0,enumerable:!0,value:r,writable:!0}):e[t]=r};var G=function(e,t){return e===t||e!=e&&t!=t},V=Object.prototype.hasOwnProperty;var Y=function(e,t,r){var n=e[t];V.call(e,t)&&G(n,r)&&(void 0!==r||t in e)||q(e,t,r)},J=Array.isArray;var K=function(e){return null!=e&&"object"==typeof e},Q="[object Symbol]";var X=function(e){return"symbol"==typeof e||K(e)&&O(e)==Q},Z=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ee=/^\w*$/;var te=function(e,t){if(J(e))return!1;var r=typeof e;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=e&&!X(e))||ee.test(e)||!Z.test(e)||null!=t&&e in Object(t)},re=N(Object,"create");var ne=function(){this.__data__=re?re(null):{},this.size=0};var oe=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},ae="__lodash_hash_undefined__",ie=Object.prototype.hasOwnProperty;var se=function(e){var t=this.__data__;if(re){var r=t[e];return r===ae?void 0:r}return ie.call(t,e)?t[e]:void 0},ue=Object.prototype.hasOwnProperty;var le=function(e){var t=this.__data__;return re?void 0!==t[e]:ue.call(t,e)},ce="__lodash_hash_undefined__";var fe=function(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=re&&void 0===t?ce:t,this};function pe(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}pe.prototype.clear=ne,pe.prototype.delete=oe,pe.prototype.get=se,pe.prototype.has=le,pe.prototype.set=fe;var de=pe;var he=function(){this.__data__=[],this.size=0};var ve=function(e,t){for(var r=e.length;r--;)if(G(e[r][0],t))return r;return-1},ye=Array.prototype.splice;var _e=function(e){var t=this.__data__,r=ve(t,e);return!(r<0||(r==t.length-1?t.pop():ye.call(t,r,1),--this.size,0))};var be=function(e){var t=this.__data__,r=ve(t,e);return r<0?void 0:t[r][1]};var ge=function(e){return ve(this.__data__,e)>-1};var me=function(e,t){var r=this.__data__,n=ve(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this};function we(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}we.prototype.clear=he,we.prototype.delete=_e,we.prototype.get=be,we.prototype.has=ge,we.prototype.set=me;var Oe=we,je=N(c,"Map");var Ee=function(){this.size=0,this.__data__={hash:new de,map:new(je||Oe),string:new de}};var ze=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e};var Pe=function(e,t){var r=e.__data__;return ze(t)?r["string"==typeof t?"string":"hash"]:r.map};var ke=function(e){var t=Pe(this,e).delete(e);return this.size-=t?1:0,t};var Re=function(e){return Pe(this,e).get(e)};var Se=function(e){return Pe(this,e).has(e)};var xe=function(e,t){var r=Pe(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this};function Ce(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}Ce.prototype.clear=Ee,Ce.prototype.delete=ke,Ce.prototype.get=Re,Ce.prototype.has=Se,Ce.prototype.set=xe;var He=Ce,Ue="Expected a function";function Te(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError(Ue);var r=function(){var n=arguments,o=t?t.apply(this,n):n[0],a=r.cache;if(a.has(o))return a.get(o);var i=e.apply(this,n);return r.cache=a.set(o,i)||a,i};return r.cache=new(Te.Cache||He),r}Te.Cache=He;var Le=Te,Ae=500;var Me=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Ie=/\\(\\)?/g,De=function(e){var t=Le(e,function(e){return r.size===Ae&&r.clear(),e}),r=t.cache;return t}(function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(Me,function(e,r,n,o){t.push(n?o.replace(Ie,"$1"):r||e)}),t});var Fe=function(e,t){for(var r=-1,n=null==e?0:e.length,o=Array(n);++r<n;)o[r]=t(e[r],r,e);return o},$e=1/0,We=f?f.prototype:void 0,Ne=We?We.toString:void 0;var Be=function e(t){if("string"==typeof t)return t;if(J(t))return Fe(t,e)+"";if(X(t))return Ne?Ne.call(t):"";var r=t+"";return"0"==r&&1/t==-$e?"-0":r};var qe=function(e){return null==e?"":Be(e)};var Ge=function(e,t){return J(e)?e:te(e,t)?[e]:De(qe(e))},Ve=9007199254740991,Ye=/^(?:0|[1-9]\d*)$/;var Je=function(e,t){var r=typeof e;return!!(t=null==t?Ve:t)&&("number"==r||"symbol"!=r&&Ye.test(e))&&e>-1&&e%1==0&&e<t},Ke=1/0;var Qe=function(e){if("string"==typeof e||X(e))return e;var t=e+"";return"0"==t&&1/e==-Ke?"-0":t};var Xe=function(e,t,r,n){if(!j(e))return e;for(var o=-1,a=(t=Ge(t,e)).length,i=a-1,s=e;null!=s&&++o<a;){var u=Qe(t[o]),l=r;if(o!=i){var c=s[u];void 0===(l=n?n(c,u,s):void 0)&&(l=j(c)?c:Je(t[o+1])?[]:{})}Y(s,u,l),s=s[u]}return e};var Ze=function(e,t,r){return null==e?e:Xe(e,t,r)},et=function(e,t,r,n){return new(r||(r=Promise))(function(o,a){function i(e){try{u(n.next(e))}catch(e){a(e)}}function s(e){try{u(n.throw(e))}catch(e){a(e)}}function u(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(i,s)}u((n=n.apply(e,t||[])).next())})};class tt extends n.Component{constructor(e){super(e),this.state={data:null,error:null}}componentDidMount(){const{match:e,location:t}=this.props,r=e.params[0];(()=>et(this,void 0,void 0,function*(){const e=yield fetch(r,{method:"get",mode:"cors",redirect:"follow"});let n=yield e.json();(t.hash?new URLSearchParams(t.hash.slice(1)):new URLSearchParams).forEach((e,t)=>{let r=t.replace(/^l\./,"layout.").replace(/^c\./,"config.");Ze(n,r,e)}),this.setState({data:n,error:null})}))().catch(e=>this.setState({error:e,data:null}))}render(){return this.state.error?n.createElement("p",null,"Error: ",this.state.error.toString()):null==this.state.data?n.createElement("p",null,"...Loading..."):n.createElement(i.a,Object.assign({},this.state.data))}}o.render(n.createElement(function(){return n.createElement(s.HashRouter,null,n.createElement(s.Route,{path:"/(.*)",component:tt}))},null),document.getElementById("main"))}]);
//# sourceMappingURL=index.js.map