!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t=n();for(var r in t)("object"==typeof exports?exports:e)[r]=t[r]}}(this,(function(){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="dist/",t(t.s=0)}([function(e,n,t){"use strict";function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}t.r(n),t.d(n,"prodViewer",(function(){return o}));var o=new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,t;return n=e,(t=[{key:"init",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=Object.assign({frames:[],ratio:1,dir:"",vert_init:0,horiz_init:0,hint:null},n);if(e&&e.getContext){e.oncontextmenu=function(e){return e.preventDefault(),e.stopPropagation()};var r=new createjs.Stage(e);r.enableMouseOver(20),r.mouseMoveOutside=!0,createjs.Touch.enable(r);var o,i,a=t.frames,u=t.ratio,c=t.dir,f=t.vert_init,s=t.horiz_init,l=t.hint,d=Array.from(a,(function(e){return[]})),p=0,v=a.length,b=v>0?a[0].length:0,g=v*b,h=new createjs.Shape,y=new createjs.Bitmap(e);r.addChild(h),y.scaleX=u,y.scaleY=u,r.addChild(y),m(),createjs.Ticker.addEventListener("tick",L),createjs.Ticker.framerate=90}function m(){T("progress"),a.forEach((function(e,n){e.forEach((function(e,t){var r=new Image;r.src="".concat(c,"/").concat(e),r.onload=w,d[n][t]=r}))})),j()}function w(e){p<g&&p++;var n=r.canvas;h.graphics.clear(),h.graphics.beginFill("rgba(255,255,255,1)").drawRect(0,0,n.width,n.height),h.graphics.endFill()}function j(){x("x",0),O()}function x(e,n){"x"==e&&(s+=n),"y"==e&&(f+=n),s<0?s=b-1:s>b-1&&(s=0),f<0?f=0:f>v-1&&(f=v-1),y.image=d[f][s]}function O(){r.addEventListener("mouseover",E),r.addEventListener("mousedown",M),r.addEventListener("pressmove",P),r.addEventListener("pressup",k),r.addEventListener("mouseleave",_)}function E(e){T("grab")}function _(e){}function M(e){o=e.rawX,i=e.rawY,T("w-resize"),S(!1)}function P(e){var n=e.rawX-o,t=e.rawY-i,r=Math.abs(n),a=Math.abs(t);r>5&&(x("x",n/r),o=e.rawX,i=e.rawY),a>10&&(x("y",t/a),i=e.rawY)}function S(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],n=e?"block":"none";l&&(l.style.display=n)}function k(e){T("grab"),S()}function L(){r.update()}function T(n){e.parentElement.style.cursor=n}}}])&&r(n.prototype,t),e}())}])}));