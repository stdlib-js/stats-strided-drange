"use strict";var s=function(e,r){return function(){try{return r||e((r={exports:{}}).exports,r),r.exports}catch(a){throw (r=0, a)}};};var q=s(function(A,c){
var d=require('@stdlib/math-base-assert-is-nan/dist');function l(e,r,a,o){var t,n,u,i,v;if(e<=0)return NaN;if(e===1||a===0)return d(r[o])?NaN:0;for(u=o,n=r[u],t=n,v=1;v<e;v++){if(u+=a,i=r[u],d(i))return i;i<n?n=i:i>t&&(t=i)}return t-n}c.exports=l
});var p=s(function(B,m){
var R=require('@stdlib/strided-base-stride2offset/dist'),_=q();function E(e,r,a){return _(e,r,a,R(e,a))}m.exports=E
});var x=s(function(C,g){
var N=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),y=p(),O=q();N(y,"ndarray",O);g.exports=y
});var b=require("path").join,h=require('@stdlib/utils-try-require/dist'),k=require('@stdlib/assert-is-error/dist'),w=x(),f,j=h(b(__dirname,"./native.js"));k(j)?f=w:f=j;module.exports=f;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
