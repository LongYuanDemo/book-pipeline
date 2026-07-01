(function(){const M=document.createElement("link").relList;if(M&&M.supports&&M.supports("modulepreload"))return;for(const R of document.querySelectorAll('link[rel="modulepreload"]'))sn(R);new MutationObserver(R=>{for(const z of R)if(z.type==="childList")for(const an of z.addedNodes)an.tagName==="LINK"&&an.rel==="modulepreload"&&sn(an)}).observe(document,{childList:!0,subtree:!0});function d(R){const z={};return R.integrity&&(z.integrity=R.integrity),R.referrerPolicy&&(z.referrerPolicy=R.referrerPolicy),R.crossOrigin==="use-credentials"?z.credentials="include":R.crossOrigin==="anonymous"?z.credentials="omit":z.credentials="same-origin",z}function sn(R){if(R.ep)return;R.ep=!0;const z=d(R);fetch(R.href,z)}})();var xl={exports:{}},wr={},Pl={exports:{}},T={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ps;function Tu(){if(Ps)return T;Ps=1;var b=Symbol.for("react.element"),M=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),sn=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),z=Symbol.for("react.provider"),an=Symbol.for("react.context"),un=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),kn=Symbol.for("react.memo"),hn=Symbol.for("react.lazy"),en=Symbol.iterator;function J(a){return a===null||typeof a!="object"?null:(a=en&&a[en]||a["@@iterator"],typeof a=="function"?a:null)}var Fn={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Wn=Object.assign,Y={};function Q(a,g,O){this.props=a,this.context=g,this.refs=Y,this.updater=O||Fn}Q.prototype.isReactComponent={},Q.prototype.setState=function(a,g){if(typeof a!="object"&&typeof a!="function"&&a!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,g,"setState")},Q.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function we(){}we.prototype=Q.prototype;function ae(a,g,O){this.props=a,this.context=g,this.refs=Y,this.updater=O||Fn}var Zn=ae.prototype=new we;Zn.constructor=ae,Wn(Zn,Q.prototype),Zn.isPureReactComponent=!0;var Sn=Array.isArray,ne=Object.prototype.hasOwnProperty,Dn={current:null},Ln={key:!0,ref:!0,__self:!0,__source:!0};function Qn(a,g,O){var H,V={},j=null,$=null;if(g!=null)for(H in g.ref!==void 0&&($=g.ref),g.key!==void 0&&(j=""+g.key),g)ne.call(g,H)&&!Ln.hasOwnProperty(H)&&(V[H]=g[H]);var F=arguments.length-2;if(F===1)V.children=O;else if(1<F){for(var Z=Array(F),Vn=0;Vn<F;Vn++)Z[Vn]=arguments[Vn+2];V.children=Z}if(a&&a.defaultProps)for(H in F=a.defaultProps,F)V[H]===void 0&&(V[H]=F[H]);return{$$typeof:b,type:a,key:j,ref:$,props:V,_owner:Dn.current}}function be(a,g){return{$$typeof:b,type:a.type,key:g,ref:a.ref,props:a.props,_owner:a._owner}}function ke(a){return typeof a=="object"&&a!==null&&a.$$typeof===b}function Xe(a){var g={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(O){return g[O]})}var ue=/\/+/g;function Un(a,g){return typeof a=="object"&&a!==null&&a.key!=null?Xe(""+a.key):g.toString(36)}function ee(a,g,O,H,V){var j=typeof a;(j==="undefined"||j==="boolean")&&(a=null);var $=!1;if(a===null)$=!0;else switch(j){case"string":case"number":$=!0;break;case"object":switch(a.$$typeof){case b:case M:$=!0}}if($)return $=a,V=V($),a=H===""?"."+Un($,0):H,Sn(V)?(O="",a!=null&&(O=a.replace(ue,"$&/")+"/"),ee(V,g,O,"",function(Vn){return Vn})):V!=null&&(ke(V)&&(V=be(V,O+(!V.key||$&&$.key===V.key?"":(""+V.key).replace(ue,"$&/")+"/")+a)),g.push(V)),1;if($=0,H=H===""?".":H+":",Sn(a))for(var F=0;F<a.length;F++){j=a[F];var Z=H+Un(j,F);$+=ee(j,g,O,Z,V)}else if(Z=J(a),typeof Z=="function")for(a=Z.call(a),F=0;!(j=a.next()).done;)j=j.value,Z=H+Un(j,F++),$+=ee(j,g,O,Z,V);else if(j==="object")throw g=String(a),Error("Objects are not valid as a React child (found: "+(g==="[object Object]"?"object with keys {"+Object.keys(a).join(", ")+"}":g)+"). If you meant to render a collection of children, use an array instead.");return $}function fe(a,g,O){if(a==null)return a;var H=[],V=0;return ee(a,H,"","",function(j){return g.call(O,j,V++)}),H}function Nn(a){if(a._status===-1){var g=a._result;g=g(),g.then(function(O){(a._status===0||a._status===-1)&&(a._status=1,a._result=O)},function(O){(a._status===0||a._status===-1)&&(a._status=2,a._result=O)}),a._status===-1&&(a._status=0,a._result=g)}if(a._status===1)return a._result.default;throw a._result}var pn={current:null},C={transition:null},N={ReactCurrentDispatcher:pn,ReactCurrentBatchConfig:C,ReactCurrentOwner:Dn};function A(){throw Error("act(...) is not supported in production builds of React.")}return T.Children={map:fe,forEach:function(a,g,O){fe(a,function(){g.apply(this,arguments)},O)},count:function(a){var g=0;return fe(a,function(){g++}),g},toArray:function(a){return fe(a,function(g){return g})||[]},only:function(a){if(!ke(a))throw Error("React.Children.only expected to receive a single React element child.");return a}},T.Component=Q,T.Fragment=d,T.Profiler=R,T.PureComponent=ae,T.StrictMode=sn,T.Suspense=q,T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=N,T.act=A,T.cloneElement=function(a,g,O){if(a==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var H=Wn({},a.props),V=a.key,j=a.ref,$=a._owner;if(g!=null){if(g.ref!==void 0&&(j=g.ref,$=Dn.current),g.key!==void 0&&(V=""+g.key),a.type&&a.type.defaultProps)var F=a.type.defaultProps;for(Z in g)ne.call(g,Z)&&!Ln.hasOwnProperty(Z)&&(H[Z]=g[Z]===void 0&&F!==void 0?F[Z]:g[Z])}var Z=arguments.length-2;if(Z===1)H.children=O;else if(1<Z){F=Array(Z);for(var Vn=0;Vn<Z;Vn++)F[Vn]=arguments[Vn+2];H.children=F}return{$$typeof:b,type:a.type,key:V,ref:j,props:H,_owner:$}},T.createContext=function(a){return a={$$typeof:an,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},a.Provider={$$typeof:z,_context:a},a.Consumer=a},T.createElement=Qn,T.createFactory=function(a){var g=Qn.bind(null,a);return g.type=a,g},T.createRef=function(){return{current:null}},T.forwardRef=function(a){return{$$typeof:un,render:a}},T.isValidElement=ke,T.lazy=function(a){return{$$typeof:hn,_payload:{_status:-1,_result:a},_init:Nn}},T.memo=function(a,g){return{$$typeof:kn,type:a,compare:g===void 0?null:g}},T.startTransition=function(a){var g=C.transition;C.transition={};try{a()}finally{C.transition=g}},T.unstable_act=A,T.useCallback=function(a,g){return pn.current.useCallback(a,g)},T.useContext=function(a){return pn.current.useContext(a)},T.useDebugValue=function(){},T.useDeferredValue=function(a){return pn.current.useDeferredValue(a)},T.useEffect=function(a,g){return pn.current.useEffect(a,g)},T.useId=function(){return pn.current.useId()},T.useImperativeHandle=function(a,g,O){return pn.current.useImperativeHandle(a,g,O)},T.useInsertionEffect=function(a,g){return pn.current.useInsertionEffect(a,g)},T.useLayoutEffect=function(a,g){return pn.current.useLayoutEffect(a,g)},T.useMemo=function(a,g){return pn.current.useMemo(a,g)},T.useReducer=function(a,g,O){return pn.current.useReducer(a,g,O)},T.useRef=function(a){return pn.current.useRef(a)},T.useState=function(a){return pn.current.useState(a)},T.useSyncExternalStore=function(a,g,O){return pn.current.useSyncExternalStore(a,g,O)},T.useTransition=function(){return pn.current.useTransition()},T.version="18.3.1",T}var Es;function Il(){return Es||(Es=1,Pl.exports=Tu()),Pl.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ds;function Mu(){if(Ds)return wr;Ds=1;var b=Il(),M=Symbol.for("react.element"),d=Symbol.for("react.fragment"),sn=Object.prototype.hasOwnProperty,R=b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,z={key:!0,ref:!0,__self:!0,__source:!0};function an(un,q,kn){var hn,en={},J=null,Fn=null;kn!==void 0&&(J=""+kn),q.key!==void 0&&(J=""+q.key),q.ref!==void 0&&(Fn=q.ref);for(hn in q)sn.call(q,hn)&&!z.hasOwnProperty(hn)&&(en[hn]=q[hn]);if(un&&un.defaultProps)for(hn in q=un.defaultProps,q)en[hn]===void 0&&(en[hn]=q[hn]);return{$$typeof:M,type:un,key:J,ref:Fn,props:en,_owner:R.current}}return wr.Fragment=d,wr.jsx=an,wr.jsxs=an,wr}var bs;function Hu(){return bs||(bs=1,xl.exports=Mu()),xl.exports}var Yu=Hu(),kr=Il(),Lp={},El={exports:{}},Rn={},Dl={exports:{}},bl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Is;function Ru(){return Is||(Is=1,(function(b){function M(C,N){var A=C.length;C.push(N);n:for(;0<A;){var a=A-1>>>1,g=C[a];if(0<R(g,N))C[a]=N,C[A]=g,A=a;else break n}}function d(C){return C.length===0?null:C[0]}function sn(C){if(C.length===0)return null;var N=C[0],A=C.pop();if(A!==N){C[0]=A;n:for(var a=0,g=C.length,O=g>>>1;a<O;){var H=2*(a+1)-1,V=C[H],j=H+1,$=C[j];if(0>R(V,A))j<g&&0>R($,V)?(C[a]=$,C[j]=A,a=j):(C[a]=V,C[H]=A,a=H);else if(j<g&&0>R($,A))C[a]=$,C[j]=A,a=j;else break n}}return N}function R(C,N){var A=C.sortIndex-N.sortIndex;return A!==0?A:C.id-N.id}if(typeof performance=="object"&&typeof performance.now=="function"){var z=performance;b.unstable_now=function(){return z.now()}}else{var an=Date,un=an.now();b.unstable_now=function(){return an.now()-un}}var q=[],kn=[],hn=1,en=null,J=3,Fn=!1,Wn=!1,Y=!1,Q=typeof setTimeout=="function"?setTimeout:null,we=typeof clearTimeout=="function"?clearTimeout:null,ae=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Zn(C){for(var N=d(kn);N!==null;){if(N.callback===null)sn(kn);else if(N.startTime<=C)sn(kn),N.sortIndex=N.expirationTime,M(q,N);else break;N=d(kn)}}function Sn(C){if(Y=!1,Zn(C),!Wn)if(d(q)!==null)Wn=!0,Nn(ne);else{var N=d(kn);N!==null&&pn(Sn,N.startTime-C)}}function ne(C,N){Wn=!1,Y&&(Y=!1,we(Qn),Qn=-1),Fn=!0;var A=J;try{for(Zn(N),en=d(q);en!==null&&(!(en.expirationTime>N)||C&&!Xe());){var a=en.callback;if(typeof a=="function"){en.callback=null,J=en.priorityLevel;var g=a(en.expirationTime<=N);N=b.unstable_now(),typeof g=="function"?en.callback=g:en===d(q)&&sn(q),Zn(N)}else sn(q);en=d(q)}if(en!==null)var O=!0;else{var H=d(kn);H!==null&&pn(Sn,H.startTime-N),O=!1}return O}finally{en=null,J=A,Fn=!1}}var Dn=!1,Ln=null,Qn=-1,be=5,ke=-1;function Xe(){return!(b.unstable_now()-ke<be)}function ue(){if(Ln!==null){var C=b.unstable_now();ke=C;var N=!0;try{N=Ln(!0,C)}finally{N?Un():(Dn=!1,Ln=null)}}else Dn=!1}var Un;if(typeof ae=="function")Un=function(){ae(ue)};else if(typeof MessageChannel<"u"){var ee=new MessageChannel,fe=ee.port2;ee.port1.onmessage=ue,Un=function(){fe.postMessage(null)}}else Un=function(){Q(ue,0)};function Nn(C){Ln=C,Dn||(Dn=!0,Un())}function pn(C,N){Qn=Q(function(){C(b.unstable_now())},N)}b.unstable_IdlePriority=5,b.unstable_ImmediatePriority=1,b.unstable_LowPriority=4,b.unstable_NormalPriority=3,b.unstable_Profiling=null,b.unstable_UserBlockingPriority=2,b.unstable_cancelCallback=function(C){C.callback=null},b.unstable_continueExecution=function(){Wn||Fn||(Wn=!0,Nn(ne))},b.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):be=0<C?Math.floor(1e3/C):5},b.unstable_getCurrentPriorityLevel=function(){return J},b.unstable_getFirstCallbackNode=function(){return d(q)},b.unstable_next=function(C){switch(J){case 1:case 2:case 3:var N=3;break;default:N=J}var A=J;J=N;try{return C()}finally{J=A}},b.unstable_pauseExecution=function(){},b.unstable_requestPaint=function(){},b.unstable_runWithPriority=function(C,N){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var A=J;J=C;try{return N()}finally{J=A}},b.unstable_scheduleCallback=function(C,N,A){var a=b.unstable_now();switch(typeof A=="object"&&A!==null?(A=A.delay,A=typeof A=="number"&&0<A?a+A:a):A=a,C){case 1:var g=-1;break;case 2:g=250;break;case 5:g=1073741823;break;case 4:g=1e4;break;default:g=5e3}return g=A+g,C={id:hn++,callback:N,priorityLevel:C,startTime:A,expirationTime:g,sortIndex:-1},A>a?(C.sortIndex=A,M(kn,C),d(q)===null&&C===d(kn)&&(Y?(we(Qn),Qn=-1):Y=!0,pn(Sn,A-a))):(C.sortIndex=g,M(q,C),Wn||Fn||(Wn=!0,Nn(ne))),C},b.unstable_shouldYield=Xe,b.unstable_wrapCallback=function(C){var N=J;return function(){var A=J;J=N;try{return C.apply(this,arguments)}finally{J=A}}}})(bl)),bl}var Ls;function Uu(){return Ls||(Ls=1,Dl.exports=Ru()),Dl.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ns;function Vu(){if(Ns)return Rn;Ns=1;var b=Il(),M=Uu();function d(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sn=new Set,R={};function z(n,e){an(n,e),an(n+"Capture",e)}function an(n,e){for(R[n]=e,n=0;n<e.length;n++)sn.add(e[n])}var un=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),q=Object.prototype.hasOwnProperty,kn=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,hn={},en={};function J(n){return q.call(en,n)?!0:q.call(hn,n)?!1:kn.test(n)?en[n]=!0:(hn[n]=!0,!1)}function Fn(n,e,t,r){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function Wn(n,e,t,r){if(e===null||typeof e>"u"||Fn(n,e,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Y(n,e,t,r,p,i,l){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=p,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=i,this.removeEmptyString=l}var Q={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){Q[n]=new Y(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];Q[e]=new Y(e,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){Q[n]=new Y(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){Q[n]=new Y(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){Q[n]=new Y(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){Q[n]=new Y(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){Q[n]=new Y(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){Q[n]=new Y(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){Q[n]=new Y(n,5,!1,n.toLowerCase(),null,!1,!1)});var we=/[\-:]([a-z])/g;function ae(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(we,ae);Q[e]=new Y(e,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(we,ae);Q[e]=new Y(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(we,ae);Q[e]=new Y(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){Q[n]=new Y(n,1,!1,n.toLowerCase(),null,!1,!1)}),Q.xlinkHref=new Y("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){Q[n]=new Y(n,1,!1,n.toLowerCase(),null,!0,!0)});function Zn(n,e,t,r){var p=Q.hasOwnProperty(e)?Q[e]:null;(p!==null?p.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Wn(e,t,p,r)&&(t=null),r||p===null?J(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):p.mustUseProperty?n[p.propertyName]=t===null?p.type===3?!1:"":t:(e=p.attributeName,r=p.attributeNamespace,t===null?n.removeAttribute(e):(p=p.type,t=p===3||p===4&&t===!0?"":""+t,r?n.setAttributeNS(r,e,t):n.setAttribute(e,t))))}var Sn=b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ne=Symbol.for("react.element"),Dn=Symbol.for("react.portal"),Ln=Symbol.for("react.fragment"),Qn=Symbol.for("react.strict_mode"),be=Symbol.for("react.profiler"),ke=Symbol.for("react.provider"),Xe=Symbol.for("react.context"),ue=Symbol.for("react.forward_ref"),Un=Symbol.for("react.suspense"),ee=Symbol.for("react.suspense_list"),fe=Symbol.for("react.memo"),Nn=Symbol.for("react.lazy"),pn=Symbol.for("react.offscreen"),C=Symbol.iterator;function N(n){return n===null||typeof n!="object"?null:(n=C&&n[C]||n["@@iterator"],typeof n=="function"?n:null)}var A=Object.assign,a;function g(n){if(a===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);a=e&&e[1]||""}return`
`+a+n}var O=!1;function H(n,e){if(!n||O)return"";O=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(m){var r=m}Reflect.construct(n,[],e)}else{try{e.call()}catch(m){r=m}n.call(e.prototype)}else{try{throw Error()}catch(m){r=m}n()}}catch(m){if(m&&r&&typeof m.stack=="string"){for(var p=m.stack.split(`
`),i=r.stack.split(`
`),l=p.length-1,o=i.length-1;1<=l&&0<=o&&p[l]!==i[o];)o--;for(;1<=l&&0<=o;l--,o--)if(p[l]!==i[o]){if(l!==1||o!==1)do if(l--,o--,0>o||p[l]!==i[o]){var c=`
`+p[l].replace(" at new "," at ");return n.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",n.displayName)),c}while(1<=l&&0<=o);break}}}finally{O=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?g(n):""}function V(n){switch(n.tag){case 5:return g(n.type);case 16:return g("Lazy");case 13:return g("Suspense");case 19:return g("SuspenseList");case 0:case 2:case 15:return n=H(n.type,!1),n;case 11:return n=H(n.type.render,!1),n;case 1:return n=H(n.type,!0),n;default:return""}}function j(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case Ln:return"Fragment";case Dn:return"Portal";case be:return"Profiler";case Qn:return"StrictMode";case Un:return"Suspense";case ee:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case Xe:return(n.displayName||"Context")+".Consumer";case ke:return(n._context.displayName||"Context")+".Provider";case ue:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case fe:return e=n.displayName||null,e!==null?e:j(n.type)||"Memo";case Nn:e=n._payload,n=n._init;try{return j(n(e))}catch{}}return null}function $(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return j(e);case 8:return e===Qn?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function F(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Z(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Vn(n){var e=Z(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),r=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var p=t.get,i=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return p.call(this)},set:function(l){r=""+l,i.call(this,l)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Cr(n){n._valueTracker||(n._valueTracker=Vn(n))}function Ll(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),r="";return n&&(r=Z(n)?n.checked?"true":"false":n.value),n=r,n!==t?(e.setValue(n),!0):!1}function vr(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Np(n,e){var t=e.checked;return A({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function Nl(n,e){var t=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;t=F(e.value!=null?e.value:t),n._wrapperState={initialChecked:r,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Bl(n,e){e=e.checked,e!=null&&Zn(n,"checked",e,!1)}function Bp(n,e){Bl(n,e);var t=F(e.value),r=e.type;if(t!=null)r==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(r==="submit"||r==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?Op(n,e.type,t):e.hasOwnProperty("defaultValue")&&Op(n,e.type,F(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function Ol(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function Op(n,e,t){(e!=="number"||vr(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var Ot=Array.isArray;function ct(n,e,t,r){if(n=n.options,e){e={};for(var p=0;p<t.length;p++)e["$"+t[p]]=!0;for(t=0;t<n.length;t++)p=e.hasOwnProperty("$"+n[t].value),n[t].selected!==p&&(n[t].selected=p),p&&r&&(n[t].defaultSelected=!0)}else{for(t=""+F(t),e=null,p=0;p<n.length;p++){if(n[p].value===t){n[p].selected=!0,r&&(n[p].defaultSelected=!0);return}e!==null||n[p].disabled||(e=n[p])}e!==null&&(e.selected=!0)}}function Tp(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(d(91));return A({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Tl(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(d(92));if(Ot(t)){if(1<t.length)throw Error(d(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:F(t)}}function Ml(n,e){var t=F(e.value),r=F(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),r!=null&&(n.defaultValue=""+r)}function Hl(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function Rl(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Mp(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?Rl(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Sr,Ul=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,r,p){MSApp.execUnsafeLocalFunction(function(){return n(e,t,r,p)})}:n})(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(Sr=Sr||document.createElement("div"),Sr.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Sr.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Tt(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var Mt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Us=["Webkit","ms","Moz","O"];Object.keys(Mt).forEach(function(n){Us.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),Mt[e]=Mt[n]})});function Vl(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||Mt.hasOwnProperty(n)&&Mt[n]?(""+e).trim():e+"px"}function jl(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var r=t.indexOf("--")===0,p=Vl(t,e[t],r);t==="float"&&(t="cssFloat"),r?n.setProperty(t,p):n[t]=p}}var Vs=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Hp(n,e){if(e){if(Vs[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(d(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(d(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(d(61))}if(e.style!=null&&typeof e.style!="object")throw Error(d(62))}}function Rp(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Up=null;function Vp(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var jp=null,st=null,at=null;function _l(n){if(n=rr(n)){if(typeof jp!="function")throw Error(d(280));var e=n.stateNode;e&&(e=Wr(e),jp(n.stateNode,n.type,e))}}function zl(n){st?at?at.push(n):at=[n]:st=n}function ql(){if(st){var n=st,e=at;if(at=st=null,_l(n),e)for(n=0;n<e.length;n++)_l(e[n])}}function Fl(n,e){return n(e)}function Wl(){}var _p=!1;function Ql(n,e,t){if(_p)return n(e,t);_p=!0;try{return Fl(n,e,t)}finally{_p=!1,(st!==null||at!==null)&&(Wl(),ql())}}function Ht(n,e){var t=n.stateNode;if(t===null)return null;var r=Wr(t);if(r===null)return null;t=r[e];n:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(n=n.type,r=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!r;break n;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(d(231,e,typeof t));return t}var zp=!1;if(un)try{var Rt={};Object.defineProperty(Rt,"passive",{get:function(){zp=!0}}),window.addEventListener("test",Rt,Rt),window.removeEventListener("test",Rt,Rt)}catch{zp=!1}function js(n,e,t,r,p,i,l,o,c){var m=Array.prototype.slice.call(arguments,3);try{e.apply(t,m)}catch(y){this.onError(y)}}var Ut=!1,Ar=null,xr=!1,qp=null,_s={onError:function(n){Ut=!0,Ar=n}};function zs(n,e,t,r,p,i,l,o,c){Ut=!1,Ar=null,js.apply(_s,arguments)}function qs(n,e,t,r,p,i,l,o,c){if(zs.apply(this,arguments),Ut){if(Ut){var m=Ar;Ut=!1,Ar=null}else throw Error(d(198));xr||(xr=!0,qp=m)}}function Ge(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,(e.flags&4098)!==0&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function $l(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function Xl(n){if(Ge(n)!==n)throw Error(d(188))}function Fs(n){var e=n.alternate;if(!e){if(e=Ge(n),e===null)throw Error(d(188));return e!==n?null:n}for(var t=n,r=e;;){var p=t.return;if(p===null)break;var i=p.alternate;if(i===null){if(r=p.return,r!==null){t=r;continue}break}if(p.child===i.child){for(i=p.child;i;){if(i===t)return Xl(p),n;if(i===r)return Xl(p),e;i=i.sibling}throw Error(d(188))}if(t.return!==r.return)t=p,r=i;else{for(var l=!1,o=p.child;o;){if(o===t){l=!0,t=p,r=i;break}if(o===r){l=!0,r=p,t=i;break}o=o.sibling}if(!l){for(o=i.child;o;){if(o===t){l=!0,t=i,r=p;break}if(o===r){l=!0,r=i,t=p;break}o=o.sibling}if(!l)throw Error(d(189))}}if(t.alternate!==r)throw Error(d(190))}if(t.tag!==3)throw Error(d(188));return t.stateNode.current===t?n:e}function Gl(n){return n=Fs(n),n!==null?Kl(n):null}function Kl(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=Kl(n);if(e!==null)return e;n=n.sibling}return null}var Jl=M.unstable_scheduleCallback,Yl=M.unstable_cancelCallback,Ws=M.unstable_shouldYield,Qs=M.unstable_requestPaint,on=M.unstable_now,$s=M.unstable_getCurrentPriorityLevel,Fp=M.unstable_ImmediatePriority,Zl=M.unstable_UserBlockingPriority,Pr=M.unstable_NormalPriority,Xs=M.unstable_LowPriority,no=M.unstable_IdlePriority,Er=null,me=null;function Gs(n){if(me&&typeof me.onCommitFiberRoot=="function")try{me.onCommitFiberRoot(Er,n,void 0,(n.current.flags&128)===128)}catch{}}var te=Math.clz32?Math.clz32:Ys,Ks=Math.log,Js=Math.LN2;function Ys(n){return n>>>=0,n===0?32:31-(Ks(n)/Js|0)|0}var Dr=64,br=4194304;function Vt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Ir(n,e){var t=n.pendingLanes;if(t===0)return 0;var r=0,p=n.suspendedLanes,i=n.pingedLanes,l=t&268435455;if(l!==0){var o=l&~p;o!==0?r=Vt(o):(i&=l,i!==0&&(r=Vt(i)))}else l=t&~p,l!==0?r=Vt(l):i!==0&&(r=Vt(i));if(r===0)return 0;if(e!==0&&e!==r&&(e&p)===0&&(p=r&-r,i=e&-e,p>=i||p===16&&(i&4194240)!==0))return e;if((r&4)!==0&&(r|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=r;0<e;)t=31-te(e),p=1<<t,r|=n[t],e&=~p;return r}function Zs(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function na(n,e){for(var t=n.suspendedLanes,r=n.pingedLanes,p=n.expirationTimes,i=n.pendingLanes;0<i;){var l=31-te(i),o=1<<l,c=p[l];c===-1?((o&t)===0||(o&r)!==0)&&(p[l]=Zs(o,e)):c<=e&&(n.expiredLanes|=o),i&=~o}}function Wp(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function eo(){var n=Dr;return Dr<<=1,(Dr&4194240)===0&&(Dr=64),n}function Qp(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function jt(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-te(e),n[e]=t}function ea(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var r=n.eventTimes;for(n=n.expirationTimes;0<t;){var p=31-te(t),i=1<<p;e[p]=0,r[p]=-1,n[p]=-1,t&=~i}}function $p(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var r=31-te(t),p=1<<r;p&e|n[r]&e&&(n[r]|=e),t&=~p}}var W=0;function to(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var ro,Xp,po,io,lo,Gp=!1,Lr=[],Ie=null,Le=null,Ne=null,_t=new Map,zt=new Map,Be=[],ta="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function oo(n,e){switch(n){case"focusin":case"focusout":Ie=null;break;case"dragenter":case"dragleave":Le=null;break;case"mouseover":case"mouseout":Ne=null;break;case"pointerover":case"pointerout":_t.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":zt.delete(e.pointerId)}}function qt(n,e,t,r,p,i){return n===null||n.nativeEvent!==i?(n={blockedOn:e,domEventName:t,eventSystemFlags:r,nativeEvent:i,targetContainers:[p]},e!==null&&(e=rr(e),e!==null&&Xp(e)),n):(n.eventSystemFlags|=r,e=n.targetContainers,p!==null&&e.indexOf(p)===-1&&e.push(p),n)}function ra(n,e,t,r,p){switch(e){case"focusin":return Ie=qt(Ie,n,e,t,r,p),!0;case"dragenter":return Le=qt(Le,n,e,t,r,p),!0;case"mouseover":return Ne=qt(Ne,n,e,t,r,p),!0;case"pointerover":var i=p.pointerId;return _t.set(i,qt(_t.get(i)||null,n,e,t,r,p)),!0;case"gotpointercapture":return i=p.pointerId,zt.set(i,qt(zt.get(i)||null,n,e,t,r,p)),!0}return!1}function co(n){var e=Ke(n.target);if(e!==null){var t=Ge(e);if(t!==null){if(e=t.tag,e===13){if(e=$l(t),e!==null){n.blockedOn=e,lo(n.priority,function(){po(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Nr(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=Jp(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var r=new t.constructor(t.type,t);Up=r,t.target.dispatchEvent(r),Up=null}else return e=rr(t),e!==null&&Xp(e),n.blockedOn=t,!1;e.shift()}return!0}function so(n,e,t){Nr(n)&&t.delete(e)}function pa(){Gp=!1,Ie!==null&&Nr(Ie)&&(Ie=null),Le!==null&&Nr(Le)&&(Le=null),Ne!==null&&Nr(Ne)&&(Ne=null),_t.forEach(so),zt.forEach(so)}function Ft(n,e){n.blockedOn===e&&(n.blockedOn=null,Gp||(Gp=!0,M.unstable_scheduleCallback(M.unstable_NormalPriority,pa)))}function Wt(n){function e(p){return Ft(p,n)}if(0<Lr.length){Ft(Lr[0],n);for(var t=1;t<Lr.length;t++){var r=Lr[t];r.blockedOn===n&&(r.blockedOn=null)}}for(Ie!==null&&Ft(Ie,n),Le!==null&&Ft(Le,n),Ne!==null&&Ft(Ne,n),_t.forEach(e),zt.forEach(e),t=0;t<Be.length;t++)r=Be[t],r.blockedOn===n&&(r.blockedOn=null);for(;0<Be.length&&(t=Be[0],t.blockedOn===null);)co(t),t.blockedOn===null&&Be.shift()}var ut=Sn.ReactCurrentBatchConfig,Br=!0;function ia(n,e,t,r){var p=W,i=ut.transition;ut.transition=null;try{W=1,Kp(n,e,t,r)}finally{W=p,ut.transition=i}}function la(n,e,t,r){var p=W,i=ut.transition;ut.transition=null;try{W=4,Kp(n,e,t,r)}finally{W=p,ut.transition=i}}function Kp(n,e,t,r){if(Br){var p=Jp(n,e,t,r);if(p===null)di(n,e,r,Or,t),oo(n,r);else if(ra(p,n,e,t,r))r.stopPropagation();else if(oo(n,r),e&4&&-1<ta.indexOf(n)){for(;p!==null;){var i=rr(p);if(i!==null&&ro(i),i=Jp(n,e,t,r),i===null&&di(n,e,r,Or,t),i===p)break;p=i}p!==null&&r.stopPropagation()}else di(n,e,r,null,t)}}var Or=null;function Jp(n,e,t,r){if(Or=null,n=Vp(r),n=Ke(n),n!==null)if(e=Ge(n),e===null)n=null;else if(t=e.tag,t===13){if(n=$l(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Or=n,null}function ao(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch($s()){case Fp:return 1;case Zl:return 4;case Pr:case Xs:return 16;case no:return 536870912;default:return 16}default:return 16}}var Oe=null,Yp=null,Tr=null;function uo(){if(Tr)return Tr;var n,e=Yp,t=e.length,r,p="value"in Oe?Oe.value:Oe.textContent,i=p.length;for(n=0;n<t&&e[n]===p[n];n++);var l=t-n;for(r=1;r<=l&&e[t-r]===p[i-r];r++);return Tr=p.slice(n,1<r?1-r:void 0)}function Mr(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function Hr(){return!0}function fo(){return!1}function jn(n){function e(t,r,p,i,l){this._reactName=t,this._targetInst=p,this.type=r,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var o in n)n.hasOwnProperty(o)&&(t=n[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Hr:fo,this.isPropagationStopped=fo,this}return A(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Hr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Hr)},persist:function(){},isPersistent:Hr}),e}var ft={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Zp=jn(ft),Qt=A({},ft,{view:0,detail:0}),oa=jn(Qt),ni,ei,$t,Rr=A({},Qt,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ri,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==$t&&($t&&n.type==="mousemove"?(ni=n.screenX-$t.screenX,ei=n.screenY-$t.screenY):ei=ni=0,$t=n),ni)},movementY:function(n){return"movementY"in n?n.movementY:ei}}),mo=jn(Rr),ca=A({},Rr,{dataTransfer:0}),sa=jn(ca),aa=A({},Qt,{relatedTarget:0}),ti=jn(aa),ua=A({},ft,{animationName:0,elapsedTime:0,pseudoElement:0}),fa=jn(ua),ma=A({},ft,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),da=jn(ma),ha=A({},ft,{data:0}),ho=jn(ha),ga={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ya={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},wa={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ka(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=wa[n])?!!e[n]:!1}function ri(){return ka}var Ca=A({},Qt,{key:function(n){if(n.key){var e=ga[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Mr(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?ya[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ri,charCode:function(n){return n.type==="keypress"?Mr(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Mr(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),va=jn(Ca),Sa=A({},Rr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),go=jn(Sa),Aa=A({},Qt,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ri}),xa=jn(Aa),Pa=A({},ft,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ea=jn(Pa),Da=A({},Rr,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),ba=jn(Da),Ia=[9,13,27,32],pi=un&&"CompositionEvent"in window,Xt=null;un&&"documentMode"in document&&(Xt=document.documentMode);var La=un&&"TextEvent"in window&&!Xt,yo=un&&(!pi||Xt&&8<Xt&&11>=Xt),wo=" ",ko=!1;function Co(n,e){switch(n){case"keyup":return Ia.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vo(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var mt=!1;function Na(n,e){switch(n){case"compositionend":return vo(e);case"keypress":return e.which!==32?null:(ko=!0,wo);case"textInput":return n=e.data,n===wo&&ko?null:n;default:return null}}function Ba(n,e){if(mt)return n==="compositionend"||!pi&&Co(n,e)?(n=uo(),Tr=Yp=Oe=null,mt=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return yo&&e.locale!=="ko"?null:e.data;default:return null}}var Oa={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function So(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!Oa[n.type]:e==="textarea"}function Ao(n,e,t,r){zl(r),e=zr(e,"onChange"),0<e.length&&(t=new Zp("onChange","change",null,t,r),n.push({event:t,listeners:e}))}var Gt=null,Kt=null;function Ta(n){_o(n,0)}function Ur(n){var e=wt(n);if(Ll(e))return n}function Ma(n,e){if(n==="change")return e}var xo=!1;if(un){var ii;if(un){var li="oninput"in document;if(!li){var Po=document.createElement("div");Po.setAttribute("oninput","return;"),li=typeof Po.oninput=="function"}ii=li}else ii=!1;xo=ii&&(!document.documentMode||9<document.documentMode)}function Eo(){Gt&&(Gt.detachEvent("onpropertychange",Do),Kt=Gt=null)}function Do(n){if(n.propertyName==="value"&&Ur(Kt)){var e=[];Ao(e,Kt,n,Vp(n)),Ql(Ta,e)}}function Ha(n,e,t){n==="focusin"?(Eo(),Gt=e,Kt=t,Gt.attachEvent("onpropertychange",Do)):n==="focusout"&&Eo()}function Ra(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ur(Kt)}function Ua(n,e){if(n==="click")return Ur(e)}function Va(n,e){if(n==="input"||n==="change")return Ur(e)}function ja(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var re=typeof Object.is=="function"?Object.is:ja;function Jt(n,e){if(re(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),r=Object.keys(e);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var p=t[r];if(!q.call(e,p)||!re(n[p],e[p]))return!1}return!0}function bo(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Io(n,e){var t=bo(n);n=0;for(var r;t;){if(t.nodeType===3){if(r=n+t.textContent.length,n<=e&&r>=e)return{node:t,offset:e-n};n=r}n:{for(;t;){if(t.nextSibling){t=t.nextSibling;break n}t=t.parentNode}t=void 0}t=bo(t)}}function Lo(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?Lo(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function No(){for(var n=window,e=vr();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=vr(n.document)}return e}function oi(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function _a(n){var e=No(),t=n.focusedElem,r=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&Lo(t.ownerDocument.documentElement,t)){if(r!==null&&oi(t)){if(e=r.start,n=r.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var p=t.textContent.length,i=Math.min(r.start,p);r=r.end===void 0?i:Math.min(r.end,p),!n.extend&&i>r&&(p=r,r=i,i=p),p=Io(t,i);var l=Io(t,r);p&&l&&(n.rangeCount!==1||n.anchorNode!==p.node||n.anchorOffset!==p.offset||n.focusNode!==l.node||n.focusOffset!==l.offset)&&(e=e.createRange(),e.setStart(p.node,p.offset),n.removeAllRanges(),i>r?(n.addRange(e),n.extend(l.node,l.offset)):(e.setEnd(l.node,l.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var za=un&&"documentMode"in document&&11>=document.documentMode,dt=null,ci=null,Yt=null,si=!1;function Bo(n,e,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;si||dt==null||dt!==vr(r)||(r=dt,"selectionStart"in r&&oi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Yt&&Jt(Yt,r)||(Yt=r,r=zr(ci,"onSelect"),0<r.length&&(e=new Zp("onSelect","select",null,e,t),n.push({event:e,listeners:r}),e.target=dt)))}function Vr(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var ht={animationend:Vr("Animation","AnimationEnd"),animationiteration:Vr("Animation","AnimationIteration"),animationstart:Vr("Animation","AnimationStart"),transitionend:Vr("Transition","TransitionEnd")},ai={},Oo={};un&&(Oo=document.createElement("div").style,"AnimationEvent"in window||(delete ht.animationend.animation,delete ht.animationiteration.animation,delete ht.animationstart.animation),"TransitionEvent"in window||delete ht.transitionend.transition);function jr(n){if(ai[n])return ai[n];if(!ht[n])return n;var e=ht[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in Oo)return ai[n]=e[t];return n}var To=jr("animationend"),Mo=jr("animationiteration"),Ho=jr("animationstart"),Ro=jr("transitionend"),Uo=new Map,Vo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Te(n,e){Uo.set(n,e),z(e,[n])}for(var ui=0;ui<Vo.length;ui++){var fi=Vo[ui],qa=fi.toLowerCase(),Fa=fi[0].toUpperCase()+fi.slice(1);Te(qa,"on"+Fa)}Te(To,"onAnimationEnd"),Te(Mo,"onAnimationIteration"),Te(Ho,"onAnimationStart"),Te("dblclick","onDoubleClick"),Te("focusin","onFocus"),Te("focusout","onBlur"),Te(Ro,"onTransitionEnd"),an("onMouseEnter",["mouseout","mouseover"]),an("onMouseLeave",["mouseout","mouseover"]),an("onPointerEnter",["pointerout","pointerover"]),an("onPointerLeave",["pointerout","pointerover"]),z("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),z("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),z("onBeforeInput",["compositionend","keypress","textInput","paste"]),z("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),z("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),z("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Wa=new Set("cancel close invalid load scroll toggle".split(" ").concat(Zt));function jo(n,e,t){var r=n.type||"unknown-event";n.currentTarget=t,qs(r,e,void 0,n),n.currentTarget=null}function _o(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var r=n[t],p=r.event;r=r.listeners;n:{var i=void 0;if(e)for(var l=r.length-1;0<=l;l--){var o=r[l],c=o.instance,m=o.currentTarget;if(o=o.listener,c!==i&&p.isPropagationStopped())break n;jo(p,o,m),i=c}else for(l=0;l<r.length;l++){if(o=r[l],c=o.instance,m=o.currentTarget,o=o.listener,c!==i&&p.isPropagationStopped())break n;jo(p,o,m),i=c}}}if(xr)throw n=qp,xr=!1,qp=null,n}function G(n,e){var t=e[Ci];t===void 0&&(t=e[Ci]=new Set);var r=n+"__bubble";t.has(r)||(zo(e,n,2,!1),t.add(r))}function mi(n,e,t){var r=0;e&&(r|=4),zo(t,n,r,e)}var _r="_reactListening"+Math.random().toString(36).slice(2);function nr(n){if(!n[_r]){n[_r]=!0,sn.forEach(function(t){t!=="selectionchange"&&(Wa.has(t)||mi(t,!1,n),mi(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[_r]||(e[_r]=!0,mi("selectionchange",!1,e))}}function zo(n,e,t,r){switch(ao(e)){case 1:var p=ia;break;case 4:p=la;break;default:p=Kp}t=p.bind(null,e,t,n),p=void 0,!zp||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(p=!0),r?p!==void 0?n.addEventListener(e,t,{capture:!0,passive:p}):n.addEventListener(e,t,!0):p!==void 0?n.addEventListener(e,t,{passive:p}):n.addEventListener(e,t,!1)}function di(n,e,t,r,p){var i=r;if((e&1)===0&&(e&2)===0&&r!==null)n:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var o=r.stateNode.containerInfo;if(o===p||o.nodeType===8&&o.parentNode===p)break;if(l===4)for(l=r.return;l!==null;){var c=l.tag;if((c===3||c===4)&&(c=l.stateNode.containerInfo,c===p||c.nodeType===8&&c.parentNode===p))return;l=l.return}for(;o!==null;){if(l=Ke(o),l===null)return;if(c=l.tag,c===5||c===6){r=i=l;continue n}o=o.parentNode}}r=r.return}Ql(function(){var m=i,y=Vp(t),w=[];n:{var h=Uo.get(n);if(h!==void 0){var v=Zp,x=n;switch(n){case"keypress":if(Mr(t)===0)break n;case"keydown":case"keyup":v=va;break;case"focusin":x="focus",v=ti;break;case"focusout":x="blur",v=ti;break;case"beforeblur":case"afterblur":v=ti;break;case"click":if(t.button===2)break n;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=mo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=sa;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=xa;break;case To:case Mo:case Ho:v=fa;break;case Ro:v=Ea;break;case"scroll":v=oa;break;case"wheel":v=ba;break;case"copy":case"cut":case"paste":v=da;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=go}var E=(e&4)!==0,cn=!E&&n==="scroll",u=E?h!==null?h+"Capture":null:h;E=[];for(var s=m,f;s!==null;){f=s;var k=f.stateNode;if(f.tag===5&&k!==null&&(f=k,u!==null&&(k=Ht(s,u),k!=null&&E.push(er(s,k,f)))),cn)break;s=s.return}0<E.length&&(h=new v(h,x,null,t,y),w.push({event:h,listeners:E}))}}if((e&7)===0){n:{if(h=n==="mouseover"||n==="pointerover",v=n==="mouseout"||n==="pointerout",h&&t!==Up&&(x=t.relatedTarget||t.fromElement)&&(Ke(x)||x[Ce]))break n;if((v||h)&&(h=y.window===y?y:(h=y.ownerDocument)?h.defaultView||h.parentWindow:window,v?(x=t.relatedTarget||t.toElement,v=m,x=x?Ke(x):null,x!==null&&(cn=Ge(x),x!==cn||x.tag!==5&&x.tag!==6)&&(x=null)):(v=null,x=m),v!==x)){if(E=mo,k="onMouseLeave",u="onMouseEnter",s="mouse",(n==="pointerout"||n==="pointerover")&&(E=go,k="onPointerLeave",u="onPointerEnter",s="pointer"),cn=v==null?h:wt(v),f=x==null?h:wt(x),h=new E(k,s+"leave",v,t,y),h.target=cn,h.relatedTarget=f,k=null,Ke(y)===m&&(E=new E(u,s+"enter",x,t,y),E.target=f,E.relatedTarget=cn,k=E),cn=k,v&&x)e:{for(E=v,u=x,s=0,f=E;f;f=gt(f))s++;for(f=0,k=u;k;k=gt(k))f++;for(;0<s-f;)E=gt(E),s--;for(;0<f-s;)u=gt(u),f--;for(;s--;){if(E===u||u!==null&&E===u.alternate)break e;E=gt(E),u=gt(u)}E=null}else E=null;v!==null&&qo(w,h,v,E,!1),x!==null&&cn!==null&&qo(w,cn,x,E,!0)}}n:{if(h=m?wt(m):window,v=h.nodeName&&h.nodeName.toLowerCase(),v==="select"||v==="input"&&h.type==="file")var D=Ma;else if(So(h))if(xo)D=Va;else{D=Ra;var I=Ha}else(v=h.nodeName)&&v.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(D=Ua);if(D&&(D=D(n,m))){Ao(w,D,t,y);break n}I&&I(n,h,m),n==="focusout"&&(I=h._wrapperState)&&I.controlled&&h.type==="number"&&Op(h,"number",h.value)}switch(I=m?wt(m):window,n){case"focusin":(So(I)||I.contentEditable==="true")&&(dt=I,ci=m,Yt=null);break;case"focusout":Yt=ci=dt=null;break;case"mousedown":si=!0;break;case"contextmenu":case"mouseup":case"dragend":si=!1,Bo(w,t,y);break;case"selectionchange":if(za)break;case"keydown":case"keyup":Bo(w,t,y)}var L;if(pi)n:{switch(n){case"compositionstart":var B="onCompositionStart";break n;case"compositionend":B="onCompositionEnd";break n;case"compositionupdate":B="onCompositionUpdate";break n}B=void 0}else mt?Co(n,t)&&(B="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(B="onCompositionStart");B&&(yo&&t.locale!=="ko"&&(mt||B!=="onCompositionStart"?B==="onCompositionEnd"&&mt&&(L=uo()):(Oe=y,Yp="value"in Oe?Oe.value:Oe.textContent,mt=!0)),I=zr(m,B),0<I.length&&(B=new ho(B,n,null,t,y),w.push({event:B,listeners:I}),L?B.data=L:(L=vo(t),L!==null&&(B.data=L)))),(L=La?Na(n,t):Ba(n,t))&&(m=zr(m,"onBeforeInput"),0<m.length&&(y=new ho("onBeforeInput","beforeinput",null,t,y),w.push({event:y,listeners:m}),y.data=L))}_o(w,e)})}function er(n,e,t){return{instance:n,listener:e,currentTarget:t}}function zr(n,e){for(var t=e+"Capture",r=[];n!==null;){var p=n,i=p.stateNode;p.tag===5&&i!==null&&(p=i,i=Ht(n,t),i!=null&&r.unshift(er(n,i,p)),i=Ht(n,e),i!=null&&r.push(er(n,i,p))),n=n.return}return r}function gt(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function qo(n,e,t,r,p){for(var i=e._reactName,l=[];t!==null&&t!==r;){var o=t,c=o.alternate,m=o.stateNode;if(c!==null&&c===r)break;o.tag===5&&m!==null&&(o=m,p?(c=Ht(t,i),c!=null&&l.unshift(er(t,c,o))):p||(c=Ht(t,i),c!=null&&l.push(er(t,c,o)))),t=t.return}l.length!==0&&n.push({event:e,listeners:l})}var Qa=/\r\n?/g,$a=/\u0000|\uFFFD/g;function Fo(n){return(typeof n=="string"?n:""+n).replace(Qa,`
`).replace($a,"")}function qr(n,e,t){if(e=Fo(e),Fo(n)!==e&&t)throw Error(d(425))}function Fr(){}var hi=null,gi=null;function yi(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var wi=typeof setTimeout=="function"?setTimeout:void 0,Xa=typeof clearTimeout=="function"?clearTimeout:void 0,Wo=typeof Promise=="function"?Promise:void 0,Ga=typeof queueMicrotask=="function"?queueMicrotask:typeof Wo<"u"?function(n){return Wo.resolve(null).then(n).catch(Ka)}:wi;function Ka(n){setTimeout(function(){throw n})}function ki(n,e){var t=e,r=0;do{var p=t.nextSibling;if(n.removeChild(t),p&&p.nodeType===8)if(t=p.data,t==="/$"){if(r===0){n.removeChild(p),Wt(e);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=p}while(t);Wt(e)}function Me(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function Qo(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var yt=Math.random().toString(36).slice(2),de="__reactFiber$"+yt,tr="__reactProps$"+yt,Ce="__reactContainer$"+yt,Ci="__reactEvents$"+yt,Ja="__reactListeners$"+yt,Ya="__reactHandles$"+yt;function Ke(n){var e=n[de];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Ce]||t[de]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=Qo(n);n!==null;){if(t=n[de])return t;n=Qo(n)}return e}n=t,t=n.parentNode}return null}function rr(n){return n=n[de]||n[Ce],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function wt(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(d(33))}function Wr(n){return n[tr]||null}var vi=[],kt=-1;function He(n){return{current:n}}function K(n){0>kt||(n.current=vi[kt],vi[kt]=null,kt--)}function X(n,e){kt++,vi[kt]=n.current,n.current=e}var Re={},An=He(Re),Bn=He(!1),Je=Re;function Ct(n,e){var t=n.type.contextTypes;if(!t)return Re;var r=n.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var p={},i;for(i in t)p[i]=e[i];return r&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=p),p}function On(n){return n=n.childContextTypes,n!=null}function Qr(){K(Bn),K(An)}function $o(n,e,t){if(An.current!==Re)throw Error(d(168));X(An,e),X(Bn,t)}function Xo(n,e,t){var r=n.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var p in r)if(!(p in e))throw Error(d(108,$(n)||"Unknown",p));return A({},t,r)}function $r(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Re,Je=An.current,X(An,n),X(Bn,Bn.current),!0}function Go(n,e,t){var r=n.stateNode;if(!r)throw Error(d(169));t?(n=Xo(n,e,Je),r.__reactInternalMemoizedMergedChildContext=n,K(Bn),K(An),X(An,n)):K(Bn),X(Bn,t)}var ve=null,Xr=!1,Si=!1;function Ko(n){ve===null?ve=[n]:ve.push(n)}function Za(n){Xr=!0,Ko(n)}function Ue(){if(!Si&&ve!==null){Si=!0;var n=0,e=W;try{var t=ve;for(W=1;n<t.length;n++){var r=t[n];do r=r(!0);while(r!==null)}ve=null,Xr=!1}catch(p){throw ve!==null&&(ve=ve.slice(n+1)),Jl(Fp,Ue),p}finally{W=e,Si=!1}}return null}var vt=[],St=0,Gr=null,Kr=0,$n=[],Xn=0,Ye=null,Se=1,Ae="";function Ze(n,e){vt[St++]=Kr,vt[St++]=Gr,Gr=n,Kr=e}function Jo(n,e,t){$n[Xn++]=Se,$n[Xn++]=Ae,$n[Xn++]=Ye,Ye=n;var r=Se;n=Ae;var p=32-te(r)-1;r&=~(1<<p),t+=1;var i=32-te(e)+p;if(30<i){var l=p-p%5;i=(r&(1<<l)-1).toString(32),r>>=l,p-=l,Se=1<<32-te(e)+p|t<<p|r,Ae=i+n}else Se=1<<i|t<<p|r,Ae=n}function Ai(n){n.return!==null&&(Ze(n,1),Jo(n,1,0))}function xi(n){for(;n===Gr;)Gr=vt[--St],vt[St]=null,Kr=vt[--St],vt[St]=null;for(;n===Ye;)Ye=$n[--Xn],$n[Xn]=null,Ae=$n[--Xn],$n[Xn]=null,Se=$n[--Xn],$n[Xn]=null}var _n=null,zn=null,nn=!1,pe=null;function Yo(n,e){var t=Yn(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Zo(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,_n=n,zn=Me(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,_n=n,zn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Ye!==null?{id:Se,overflow:Ae}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=Yn(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,_n=n,zn=null,!0):!1;default:return!1}}function Pi(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Ei(n){if(nn){var e=zn;if(e){var t=e;if(!Zo(n,e)){if(Pi(n))throw Error(d(418));e=Me(t.nextSibling);var r=_n;e&&Zo(n,e)?Yo(r,t):(n.flags=n.flags&-4097|2,nn=!1,_n=n)}}else{if(Pi(n))throw Error(d(418));n.flags=n.flags&-4097|2,nn=!1,_n=n}}}function nc(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;_n=n}function Jr(n){if(n!==_n)return!1;if(!nn)return nc(n),nn=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!yi(n.type,n.memoizedProps)),e&&(e=zn)){if(Pi(n))throw ec(),Error(d(418));for(;e;)Yo(n,e),e=Me(e.nextSibling)}if(nc(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(d(317));n:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){zn=Me(n.nextSibling);break n}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}zn=null}}else zn=_n?Me(n.stateNode.nextSibling):null;return!0}function ec(){for(var n=zn;n;)n=Me(n.nextSibling)}function At(){zn=_n=null,nn=!1}function Di(n){pe===null?pe=[n]:pe.push(n)}var nu=Sn.ReactCurrentBatchConfig;function pr(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(d(309));var r=t.stateNode}if(!r)throw Error(d(147,n));var p=r,i=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(l){var o=p.refs;l===null?delete o[i]:o[i]=l},e._stringRef=i,e)}if(typeof n!="string")throw Error(d(284));if(!t._owner)throw Error(d(290,n))}return n}function Yr(n,e){throw n=Object.prototype.toString.call(e),Error(d(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function tc(n){var e=n._init;return e(n._payload)}function rc(n){function e(u,s){if(n){var f=u.deletions;f===null?(u.deletions=[s],u.flags|=16):f.push(s)}}function t(u,s){if(!n)return null;for(;s!==null;)e(u,s),s=s.sibling;return null}function r(u,s){for(u=new Map;s!==null;)s.key!==null?u.set(s.key,s):u.set(s.index,s),s=s.sibling;return u}function p(u,s){return u=Qe(u,s),u.index=0,u.sibling=null,u}function i(u,s,f){return u.index=f,n?(f=u.alternate,f!==null?(f=f.index,f<s?(u.flags|=2,s):f):(u.flags|=2,s)):(u.flags|=1048576,s)}function l(u){return n&&u.alternate===null&&(u.flags|=2),u}function o(u,s,f,k){return s===null||s.tag!==6?(s=wl(f,u.mode,k),s.return=u,s):(s=p(s,f),s.return=u,s)}function c(u,s,f,k){var D=f.type;return D===Ln?y(u,s,f.props.children,k,f.key):s!==null&&(s.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===Nn&&tc(D)===s.type)?(k=p(s,f.props),k.ref=pr(u,s,f),k.return=u,k):(k=Sp(f.type,f.key,f.props,null,u.mode,k),k.ref=pr(u,s,f),k.return=u,k)}function m(u,s,f,k){return s===null||s.tag!==4||s.stateNode.containerInfo!==f.containerInfo||s.stateNode.implementation!==f.implementation?(s=kl(f,u.mode,k),s.return=u,s):(s=p(s,f.children||[]),s.return=u,s)}function y(u,s,f,k,D){return s===null||s.tag!==7?(s=ot(f,u.mode,k,D),s.return=u,s):(s=p(s,f),s.return=u,s)}function w(u,s,f){if(typeof s=="string"&&s!==""||typeof s=="number")return s=wl(""+s,u.mode,f),s.return=u,s;if(typeof s=="object"&&s!==null){switch(s.$$typeof){case ne:return f=Sp(s.type,s.key,s.props,null,u.mode,f),f.ref=pr(u,null,s),f.return=u,f;case Dn:return s=kl(s,u.mode,f),s.return=u,s;case Nn:var k=s._init;return w(u,k(s._payload),f)}if(Ot(s)||N(s))return s=ot(s,u.mode,f,null),s.return=u,s;Yr(u,s)}return null}function h(u,s,f,k){var D=s!==null?s.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return D!==null?null:o(u,s,""+f,k);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ne:return f.key===D?c(u,s,f,k):null;case Dn:return f.key===D?m(u,s,f,k):null;case Nn:return D=f._init,h(u,s,D(f._payload),k)}if(Ot(f)||N(f))return D!==null?null:y(u,s,f,k,null);Yr(u,f)}return null}function v(u,s,f,k,D){if(typeof k=="string"&&k!==""||typeof k=="number")return u=u.get(f)||null,o(s,u,""+k,D);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case ne:return u=u.get(k.key===null?f:k.key)||null,c(s,u,k,D);case Dn:return u=u.get(k.key===null?f:k.key)||null,m(s,u,k,D);case Nn:var I=k._init;return v(u,s,f,I(k._payload),D)}if(Ot(k)||N(k))return u=u.get(f)||null,y(s,u,k,D,null);Yr(s,k)}return null}function x(u,s,f,k){for(var D=null,I=null,L=s,B=s=0,wn=null;L!==null&&B<f.length;B++){L.index>B?(wn=L,L=null):wn=L.sibling;var _=h(u,L,f[B],k);if(_===null){L===null&&(L=wn);break}n&&L&&_.alternate===null&&e(u,L),s=i(_,s,B),I===null?D=_:I.sibling=_,I=_,L=wn}if(B===f.length)return t(u,L),nn&&Ze(u,B),D;if(L===null){for(;B<f.length;B++)L=w(u,f[B],k),L!==null&&(s=i(L,s,B),I===null?D=L:I.sibling=L,I=L);return nn&&Ze(u,B),D}for(L=r(u,L);B<f.length;B++)wn=v(L,u,B,f[B],k),wn!==null&&(n&&wn.alternate!==null&&L.delete(wn.key===null?B:wn.key),s=i(wn,s,B),I===null?D=wn:I.sibling=wn,I=wn);return n&&L.forEach(function($e){return e(u,$e)}),nn&&Ze(u,B),D}function E(u,s,f,k){var D=N(f);if(typeof D!="function")throw Error(d(150));if(f=D.call(f),f==null)throw Error(d(151));for(var I=D=null,L=s,B=s=0,wn=null,_=f.next();L!==null&&!_.done;B++,_=f.next()){L.index>B?(wn=L,L=null):wn=L.sibling;var $e=h(u,L,_.value,k);if($e===null){L===null&&(L=wn);break}n&&L&&$e.alternate===null&&e(u,L),s=i($e,s,B),I===null?D=$e:I.sibling=$e,I=$e,L=wn}if(_.done)return t(u,L),nn&&Ze(u,B),D;if(L===null){for(;!_.done;B++,_=f.next())_=w(u,_.value,k),_!==null&&(s=i(_,s,B),I===null?D=_:I.sibling=_,I=_);return nn&&Ze(u,B),D}for(L=r(u,L);!_.done;B++,_=f.next())_=v(L,u,B,_.value,k),_!==null&&(n&&_.alternate!==null&&L.delete(_.key===null?B:_.key),s=i(_,s,B),I===null?D=_:I.sibling=_,I=_);return n&&L.forEach(function(Ou){return e(u,Ou)}),nn&&Ze(u,B),D}function cn(u,s,f,k){if(typeof f=="object"&&f!==null&&f.type===Ln&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case ne:n:{for(var D=f.key,I=s;I!==null;){if(I.key===D){if(D=f.type,D===Ln){if(I.tag===7){t(u,I.sibling),s=p(I,f.props.children),s.return=u,u=s;break n}}else if(I.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===Nn&&tc(D)===I.type){t(u,I.sibling),s=p(I,f.props),s.ref=pr(u,I,f),s.return=u,u=s;break n}t(u,I);break}else e(u,I);I=I.sibling}f.type===Ln?(s=ot(f.props.children,u.mode,k,f.key),s.return=u,u=s):(k=Sp(f.type,f.key,f.props,null,u.mode,k),k.ref=pr(u,s,f),k.return=u,u=k)}return l(u);case Dn:n:{for(I=f.key;s!==null;){if(s.key===I)if(s.tag===4&&s.stateNode.containerInfo===f.containerInfo&&s.stateNode.implementation===f.implementation){t(u,s.sibling),s=p(s,f.children||[]),s.return=u,u=s;break n}else{t(u,s);break}else e(u,s);s=s.sibling}s=kl(f,u.mode,k),s.return=u,u=s}return l(u);case Nn:return I=f._init,cn(u,s,I(f._payload),k)}if(Ot(f))return x(u,s,f,k);if(N(f))return E(u,s,f,k);Yr(u,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,s!==null&&s.tag===6?(t(u,s.sibling),s=p(s,f),s.return=u,u=s):(t(u,s),s=wl(f,u.mode,k),s.return=u,u=s),l(u)):t(u,s)}return cn}var xt=rc(!0),pc=rc(!1),Zr=He(null),np=null,Pt=null,bi=null;function Ii(){bi=Pt=np=null}function Li(n){var e=Zr.current;K(Zr),n._currentValue=e}function Ni(n,e,t){for(;n!==null;){var r=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),n===t)break;n=n.return}}function Et(n,e){np=n,bi=Pt=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&e)!==0&&(Tn=!0),n.firstContext=null)}function Gn(n){var e=n._currentValue;if(bi!==n)if(n={context:n,memoizedValue:e,next:null},Pt===null){if(np===null)throw Error(d(308));Pt=n,np.dependencies={lanes:0,firstContext:n}}else Pt=Pt.next=n;return e}var nt=null;function Bi(n){nt===null?nt=[n]:nt.push(n)}function ic(n,e,t,r){var p=e.interleaved;return p===null?(t.next=t,Bi(e)):(t.next=p.next,p.next=t),e.interleaved=t,xe(n,r)}function xe(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var Ve=!1;function Oi(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function lc(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Pe(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function je(n,e,t){var r=n.updateQueue;if(r===null)return null;if(r=r.shared,(U&2)!==0){var p=r.pending;return p===null?e.next=e:(e.next=p.next,p.next=e),r.pending=e,xe(n,t)}return p=r.interleaved,p===null?(e.next=e,Bi(r)):(e.next=p.next,p.next=e),r.interleaved=e,xe(n,t)}function ep(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var r=e.lanes;r&=n.pendingLanes,t|=r,e.lanes=t,$p(n,t)}}function oc(n,e){var t=n.updateQueue,r=n.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var p=null,i=null;if(t=t.firstBaseUpdate,t!==null){do{var l={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};i===null?p=i=l:i=i.next=l,t=t.next}while(t!==null);i===null?p=i=e:i=i.next=e}else p=i=e;t={baseState:r.baseState,firstBaseUpdate:p,lastBaseUpdate:i,shared:r.shared,effects:r.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function tp(n,e,t,r){var p=n.updateQueue;Ve=!1;var i=p.firstBaseUpdate,l=p.lastBaseUpdate,o=p.shared.pending;if(o!==null){p.shared.pending=null;var c=o,m=c.next;c.next=null,l===null?i=m:l.next=m,l=c;var y=n.alternate;y!==null&&(y=y.updateQueue,o=y.lastBaseUpdate,o!==l&&(o===null?y.firstBaseUpdate=m:o.next=m,y.lastBaseUpdate=c))}if(i!==null){var w=p.baseState;l=0,y=m=c=null,o=i;do{var h=o.lane,v=o.eventTime;if((r&h)===h){y!==null&&(y=y.next={eventTime:v,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});n:{var x=n,E=o;switch(h=e,v=t,E.tag){case 1:if(x=E.payload,typeof x=="function"){w=x.call(v,w,h);break n}w=x;break n;case 3:x.flags=x.flags&-65537|128;case 0:if(x=E.payload,h=typeof x=="function"?x.call(v,w,h):x,h==null)break n;w=A({},w,h);break n;case 2:Ve=!0}}o.callback!==null&&o.lane!==0&&(n.flags|=64,h=p.effects,h===null?p.effects=[o]:h.push(o))}else v={eventTime:v,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},y===null?(m=y=v,c=w):y=y.next=v,l|=h;if(o=o.next,o===null){if(o=p.shared.pending,o===null)break;h=o,o=h.next,h.next=null,p.lastBaseUpdate=h,p.shared.pending=null}}while(!0);if(y===null&&(c=w),p.baseState=c,p.firstBaseUpdate=m,p.lastBaseUpdate=y,e=p.shared.interleaved,e!==null){p=e;do l|=p.lane,p=p.next;while(p!==e)}else i===null&&(p.shared.lanes=0);rt|=l,n.lanes=l,n.memoizedState=w}}function cc(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var r=n[e],p=r.callback;if(p!==null){if(r.callback=null,r=t,typeof p!="function")throw Error(d(191,p));p.call(r)}}}var ir={},he=He(ir),lr=He(ir),or=He(ir);function et(n){if(n===ir)throw Error(d(174));return n}function Ti(n,e){switch(X(or,e),X(lr,n),X(he,ir),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Mp(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=Mp(e,n)}K(he),X(he,e)}function Dt(){K(he),K(lr),K(or)}function sc(n){et(or.current);var e=et(he.current),t=Mp(e,n.type);e!==t&&(X(lr,n),X(he,t))}function Mi(n){lr.current===n&&(K(he),K(lr))}var tn=He(0);function rp(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Hi=[];function Ri(){for(var n=0;n<Hi.length;n++)Hi[n]._workInProgressVersionPrimary=null;Hi.length=0}var pp=Sn.ReactCurrentDispatcher,Ui=Sn.ReactCurrentBatchConfig,tt=0,rn=null,mn=null,gn=null,ip=!1,cr=!1,sr=0,eu=0;function xn(){throw Error(d(321))}function Vi(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!re(n[t],e[t]))return!1;return!0}function ji(n,e,t,r,p,i){if(tt=i,rn=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,pp.current=n===null||n.memoizedState===null?iu:lu,n=t(r,p),cr){i=0;do{if(cr=!1,sr=0,25<=i)throw Error(d(301));i+=1,gn=mn=null,e.updateQueue=null,pp.current=ou,n=t(r,p)}while(cr)}if(pp.current=cp,e=mn!==null&&mn.next!==null,tt=0,gn=mn=rn=null,ip=!1,e)throw Error(d(300));return n}function _i(){var n=sr!==0;return sr=0,n}function ge(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return gn===null?rn.memoizedState=gn=n:gn=gn.next=n,gn}function Kn(){if(mn===null){var n=rn.alternate;n=n!==null?n.memoizedState:null}else n=mn.next;var e=gn===null?rn.memoizedState:gn.next;if(e!==null)gn=e,mn=n;else{if(n===null)throw Error(d(310));mn=n,n={memoizedState:mn.memoizedState,baseState:mn.baseState,baseQueue:mn.baseQueue,queue:mn.queue,next:null},gn===null?rn.memoizedState=gn=n:gn=gn.next=n}return gn}function ar(n,e){return typeof e=="function"?e(n):e}function zi(n){var e=Kn(),t=e.queue;if(t===null)throw Error(d(311));t.lastRenderedReducer=n;var r=mn,p=r.baseQueue,i=t.pending;if(i!==null){if(p!==null){var l=p.next;p.next=i.next,i.next=l}r.baseQueue=p=i,t.pending=null}if(p!==null){i=p.next,r=r.baseState;var o=l=null,c=null,m=i;do{var y=m.lane;if((tt&y)===y)c!==null&&(c=c.next={lane:0,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null}),r=m.hasEagerState?m.eagerState:n(r,m.action);else{var w={lane:y,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null};c===null?(o=c=w,l=r):c=c.next=w,rn.lanes|=y,rt|=y}m=m.next}while(m!==null&&m!==i);c===null?l=r:c.next=o,re(r,e.memoizedState)||(Tn=!0),e.memoizedState=r,e.baseState=l,e.baseQueue=c,t.lastRenderedState=r}if(n=t.interleaved,n!==null){p=n;do i=p.lane,rn.lanes|=i,rt|=i,p=p.next;while(p!==n)}else p===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function qi(n){var e=Kn(),t=e.queue;if(t===null)throw Error(d(311));t.lastRenderedReducer=n;var r=t.dispatch,p=t.pending,i=e.memoizedState;if(p!==null){t.pending=null;var l=p=p.next;do i=n(i,l.action),l=l.next;while(l!==p);re(i,e.memoizedState)||(Tn=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),t.lastRenderedState=i}return[i,r]}function ac(){}function uc(n,e){var t=rn,r=Kn(),p=e(),i=!re(r.memoizedState,p);if(i&&(r.memoizedState=p,Tn=!0),r=r.queue,Fi(dc.bind(null,t,r,n),[n]),r.getSnapshot!==e||i||gn!==null&&gn.memoizedState.tag&1){if(t.flags|=2048,ur(9,mc.bind(null,t,r,p,e),void 0,null),yn===null)throw Error(d(349));(tt&30)!==0||fc(t,e,p)}return p}function fc(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=rn.updateQueue,e===null?(e={lastEffect:null,stores:null},rn.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function mc(n,e,t,r){e.value=t,e.getSnapshot=r,hc(e)&&gc(n)}function dc(n,e,t){return t(function(){hc(e)&&gc(n)})}function hc(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!re(n,t)}catch{return!0}}function gc(n){var e=xe(n,1);e!==null&&ce(e,n,1,-1)}function yc(n){var e=ge();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ar,lastRenderedState:n},e.queue=n,n=n.dispatch=pu.bind(null,rn,n),[e.memoizedState,n]}function ur(n,e,t,r){return n={tag:n,create:e,destroy:t,deps:r,next:null},e=rn.updateQueue,e===null?(e={lastEffect:null,stores:null},rn.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(r=t.next,t.next=n,n.next=r,e.lastEffect=n)),n}function wc(){return Kn().memoizedState}function lp(n,e,t,r){var p=ge();rn.flags|=n,p.memoizedState=ur(1|e,t,void 0,r===void 0?null:r)}function op(n,e,t,r){var p=Kn();r=r===void 0?null:r;var i=void 0;if(mn!==null){var l=mn.memoizedState;if(i=l.destroy,r!==null&&Vi(r,l.deps)){p.memoizedState=ur(e,t,i,r);return}}rn.flags|=n,p.memoizedState=ur(1|e,t,i,r)}function kc(n,e){return lp(8390656,8,n,e)}function Fi(n,e){return op(2048,8,n,e)}function Cc(n,e){return op(4,2,n,e)}function vc(n,e){return op(4,4,n,e)}function Sc(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function Ac(n,e,t){return t=t!=null?t.concat([n]):null,op(4,4,Sc.bind(null,e,n),t)}function Wi(){}function xc(n,e){var t=Kn();e=e===void 0?null:e;var r=t.memoizedState;return r!==null&&e!==null&&Vi(e,r[1])?r[0]:(t.memoizedState=[n,e],n)}function Pc(n,e){var t=Kn();e=e===void 0?null:e;var r=t.memoizedState;return r!==null&&e!==null&&Vi(e,r[1])?r[0]:(n=n(),t.memoizedState=[n,e],n)}function Ec(n,e,t){return(tt&21)===0?(n.baseState&&(n.baseState=!1,Tn=!0),n.memoizedState=t):(re(t,e)||(t=eo(),rn.lanes|=t,rt|=t,n.baseState=!0),e)}function tu(n,e){var t=W;W=t!==0&&4>t?t:4,n(!0);var r=Ui.transition;Ui.transition={};try{n(!1),e()}finally{W=t,Ui.transition=r}}function Dc(){return Kn().memoizedState}function ru(n,e,t){var r=Fe(n);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},bc(n))Ic(e,t);else if(t=ic(n,e,t,r),t!==null){var p=In();ce(t,n,r,p),Lc(t,e,r)}}function pu(n,e,t){var r=Fe(n),p={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(bc(n))Ic(e,p);else{var i=n.alternate;if(n.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var l=e.lastRenderedState,o=i(l,t);if(p.hasEagerState=!0,p.eagerState=o,re(o,l)){var c=e.interleaved;c===null?(p.next=p,Bi(e)):(p.next=c.next,c.next=p),e.interleaved=p;return}}catch{}finally{}t=ic(n,e,p,r),t!==null&&(p=In(),ce(t,n,r,p),Lc(t,e,r))}}function bc(n){var e=n.alternate;return n===rn||e!==null&&e===rn}function Ic(n,e){cr=ip=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function Lc(n,e,t){if((t&4194240)!==0){var r=e.lanes;r&=n.pendingLanes,t|=r,e.lanes=t,$p(n,t)}}var cp={readContext:Gn,useCallback:xn,useContext:xn,useEffect:xn,useImperativeHandle:xn,useInsertionEffect:xn,useLayoutEffect:xn,useMemo:xn,useReducer:xn,useRef:xn,useState:xn,useDebugValue:xn,useDeferredValue:xn,useTransition:xn,useMutableSource:xn,useSyncExternalStore:xn,useId:xn,unstable_isNewReconciler:!1},iu={readContext:Gn,useCallback:function(n,e){return ge().memoizedState=[n,e===void 0?null:e],n},useContext:Gn,useEffect:kc,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,lp(4194308,4,Sc.bind(null,e,n),t)},useLayoutEffect:function(n,e){return lp(4194308,4,n,e)},useInsertionEffect:function(n,e){return lp(4,2,n,e)},useMemo:function(n,e){var t=ge();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var r=ge();return e=t!==void 0?t(e):e,r.memoizedState=r.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},r.queue=n,n=n.dispatch=ru.bind(null,rn,n),[r.memoizedState,n]},useRef:function(n){var e=ge();return n={current:n},e.memoizedState=n},useState:yc,useDebugValue:Wi,useDeferredValue:function(n){return ge().memoizedState=n},useTransition:function(){var n=yc(!1),e=n[0];return n=tu.bind(null,n[1]),ge().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var r=rn,p=ge();if(nn){if(t===void 0)throw Error(d(407));t=t()}else{if(t=e(),yn===null)throw Error(d(349));(tt&30)!==0||fc(r,e,t)}p.memoizedState=t;var i={value:t,getSnapshot:e};return p.queue=i,kc(dc.bind(null,r,i,n),[n]),r.flags|=2048,ur(9,mc.bind(null,r,i,t,e),void 0,null),t},useId:function(){var n=ge(),e=yn.identifierPrefix;if(nn){var t=Ae,r=Se;t=(r&~(1<<32-te(r)-1)).toString(32)+t,e=":"+e+"R"+t,t=sr++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=eu++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},lu={readContext:Gn,useCallback:xc,useContext:Gn,useEffect:Fi,useImperativeHandle:Ac,useInsertionEffect:Cc,useLayoutEffect:vc,useMemo:Pc,useReducer:zi,useRef:wc,useState:function(){return zi(ar)},useDebugValue:Wi,useDeferredValue:function(n){var e=Kn();return Ec(e,mn.memoizedState,n)},useTransition:function(){var n=zi(ar)[0],e=Kn().memoizedState;return[n,e]},useMutableSource:ac,useSyncExternalStore:uc,useId:Dc,unstable_isNewReconciler:!1},ou={readContext:Gn,useCallback:xc,useContext:Gn,useEffect:Fi,useImperativeHandle:Ac,useInsertionEffect:Cc,useLayoutEffect:vc,useMemo:Pc,useReducer:qi,useRef:wc,useState:function(){return qi(ar)},useDebugValue:Wi,useDeferredValue:function(n){var e=Kn();return mn===null?e.memoizedState=n:Ec(e,mn.memoizedState,n)},useTransition:function(){var n=qi(ar)[0],e=Kn().memoizedState;return[n,e]},useMutableSource:ac,useSyncExternalStore:uc,useId:Dc,unstable_isNewReconciler:!1};function ie(n,e){if(n&&n.defaultProps){e=A({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Qi(n,e,t,r){e=n.memoizedState,t=t(r,e),t=t==null?e:A({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var sp={isMounted:function(n){return(n=n._reactInternals)?Ge(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var r=In(),p=Fe(n),i=Pe(r,p);i.payload=e,t!=null&&(i.callback=t),e=je(n,i,p),e!==null&&(ce(e,n,p,r),ep(e,n,p))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var r=In(),p=Fe(n),i=Pe(r,p);i.tag=1,i.payload=e,t!=null&&(i.callback=t),e=je(n,i,p),e!==null&&(ce(e,n,p,r),ep(e,n,p))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=In(),r=Fe(n),p=Pe(t,r);p.tag=2,e!=null&&(p.callback=e),e=je(n,p,r),e!==null&&(ce(e,n,r,t),ep(e,n,r))}};function Nc(n,e,t,r,p,i,l){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(r,i,l):e.prototype&&e.prototype.isPureReactComponent?!Jt(t,r)||!Jt(p,i):!0}function Bc(n,e,t){var r=!1,p=Re,i=e.contextType;return typeof i=="object"&&i!==null?i=Gn(i):(p=On(e)?Je:An.current,r=e.contextTypes,i=(r=r!=null)?Ct(n,p):Re),e=new e(t,i),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=sp,n.stateNode=e,e._reactInternals=n,r&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=p,n.__reactInternalMemoizedMaskedChildContext=i),e}function Oc(n,e,t,r){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,r),e.state!==n&&sp.enqueueReplaceState(e,e.state,null)}function $i(n,e,t,r){var p=n.stateNode;p.props=t,p.state=n.memoizedState,p.refs={},Oi(n);var i=e.contextType;typeof i=="object"&&i!==null?p.context=Gn(i):(i=On(e)?Je:An.current,p.context=Ct(n,i)),p.state=n.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(Qi(n,e,i,t),p.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(e=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),e!==p.state&&sp.enqueueReplaceState(p,p.state,null),tp(n,t,p,r),p.state=n.memoizedState),typeof p.componentDidMount=="function"&&(n.flags|=4194308)}function bt(n,e){try{var t="",r=e;do t+=V(r),r=r.return;while(r);var p=t}catch(i){p=`
Error generating stack: `+i.message+`
`+i.stack}return{value:n,source:e,stack:p,digest:null}}function Xi(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Gi(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var cu=typeof WeakMap=="function"?WeakMap:Map;function Tc(n,e,t){t=Pe(-1,t),t.tag=3,t.payload={element:null};var r=e.value;return t.callback=function(){gp||(gp=!0,al=r),Gi(n,e)},t}function Mc(n,e,t){t=Pe(-1,t),t.tag=3;var r=n.type.getDerivedStateFromError;if(typeof r=="function"){var p=e.value;t.payload=function(){return r(p)},t.callback=function(){Gi(n,e)}}var i=n.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(t.callback=function(){Gi(n,e),typeof r!="function"&&(ze===null?ze=new Set([this]):ze.add(this));var l=e.stack;this.componentDidCatch(e.value,{componentStack:l!==null?l:""})}),t}function Hc(n,e,t){var r=n.pingCache;if(r===null){r=n.pingCache=new cu;var p=new Set;r.set(e,p)}else p=r.get(e),p===void 0&&(p=new Set,r.set(e,p));p.has(t)||(p.add(t),n=Su.bind(null,n,e,t),e.then(n,n))}function Rc(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Uc(n,e,t,r,p){return(n.mode&1)===0?(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Pe(-1,1),e.tag=2,je(t,e,1))),t.lanes|=1),n):(n.flags|=65536,n.lanes=p,n)}var su=Sn.ReactCurrentOwner,Tn=!1;function bn(n,e,t,r){e.child=n===null?pc(e,null,t,r):xt(e,n.child,t,r)}function Vc(n,e,t,r,p){t=t.render;var i=e.ref;return Et(e,p),r=ji(n,e,t,r,i,p),t=_i(),n!==null&&!Tn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~p,Ee(n,e,p)):(nn&&t&&Ai(e),e.flags|=1,bn(n,e,r,p),e.child)}function jc(n,e,t,r,p){if(n===null){var i=t.type;return typeof i=="function"&&!yl(i)&&i.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=i,_c(n,e,i,r,p)):(n=Sp(t.type,null,r,e,e.mode,p),n.ref=e.ref,n.return=e,e.child=n)}if(i=n.child,(n.lanes&p)===0){var l=i.memoizedProps;if(t=t.compare,t=t!==null?t:Jt,t(l,r)&&n.ref===e.ref)return Ee(n,e,p)}return e.flags|=1,n=Qe(i,r),n.ref=e.ref,n.return=e,e.child=n}function _c(n,e,t,r,p){if(n!==null){var i=n.memoizedProps;if(Jt(i,r)&&n.ref===e.ref)if(Tn=!1,e.pendingProps=r=i,(n.lanes&p)!==0)(n.flags&131072)!==0&&(Tn=!0);else return e.lanes=n.lanes,Ee(n,e,p)}return Ki(n,e,t,r,p)}function zc(n,e,t){var r=e.pendingProps,p=r.children,i=n!==null?n.memoizedState:null;if(r.mode==="hidden")if((e.mode&1)===0)e.memoizedState={baseLanes:0,cachePool:null,transitions:null},X(Lt,qn),qn|=t;else{if((t&1073741824)===0)return n=i!==null?i.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,X(Lt,qn),qn|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:t,X(Lt,qn),qn|=r}else i!==null?(r=i.baseLanes|t,e.memoizedState=null):r=t,X(Lt,qn),qn|=r;return bn(n,e,p,t),e.child}function qc(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Ki(n,e,t,r,p){var i=On(t)?Je:An.current;return i=Ct(e,i),Et(e,p),t=ji(n,e,t,r,i,p),r=_i(),n!==null&&!Tn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~p,Ee(n,e,p)):(nn&&r&&Ai(e),e.flags|=1,bn(n,e,t,p),e.child)}function Fc(n,e,t,r,p){if(On(t)){var i=!0;$r(e)}else i=!1;if(Et(e,p),e.stateNode===null)up(n,e),Bc(e,t,r),$i(e,t,r,p),r=!0;else if(n===null){var l=e.stateNode,o=e.memoizedProps;l.props=o;var c=l.context,m=t.contextType;typeof m=="object"&&m!==null?m=Gn(m):(m=On(t)?Je:An.current,m=Ct(e,m));var y=t.getDerivedStateFromProps,w=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function";w||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(o!==r||c!==m)&&Oc(e,l,r,m),Ve=!1;var h=e.memoizedState;l.state=h,tp(e,r,l,p),c=e.memoizedState,o!==r||h!==c||Bn.current||Ve?(typeof y=="function"&&(Qi(e,t,y,r),c=e.memoizedState),(o=Ve||Nc(e,t,o,r,h,c,m))?(w||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(e.flags|=4194308)):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=c),l.props=r,l.state=c,l.context=m,r=o):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{l=e.stateNode,lc(n,e),o=e.memoizedProps,m=e.type===e.elementType?o:ie(e.type,o),l.props=m,w=e.pendingProps,h=l.context,c=t.contextType,typeof c=="object"&&c!==null?c=Gn(c):(c=On(t)?Je:An.current,c=Ct(e,c));var v=t.getDerivedStateFromProps;(y=typeof v=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(o!==w||h!==c)&&Oc(e,l,r,c),Ve=!1,h=e.memoizedState,l.state=h,tp(e,r,l,p);var x=e.memoizedState;o!==w||h!==x||Bn.current||Ve?(typeof v=="function"&&(Qi(e,t,v,r),x=e.memoizedState),(m=Ve||Nc(e,t,m,r,h,x,c)||!1)?(y||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,x,c),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,x,c)),typeof l.componentDidUpdate=="function"&&(e.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof l.componentDidUpdate!="function"||o===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||o===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=x),l.props=r,l.state=x,l.context=c,r=m):(typeof l.componentDidUpdate!="function"||o===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||o===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),r=!1)}return Ji(n,e,t,r,i,p)}function Ji(n,e,t,r,p,i){qc(n,e);var l=(e.flags&128)!==0;if(!r&&!l)return p&&Go(e,t,!1),Ee(n,e,i);r=e.stateNode,su.current=e;var o=l&&typeof t.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,n!==null&&l?(e.child=xt(e,n.child,null,i),e.child=xt(e,null,o,i)):bn(n,e,o,i),e.memoizedState=r.state,p&&Go(e,t,!0),e.child}function Wc(n){var e=n.stateNode;e.pendingContext?$o(n,e.pendingContext,e.pendingContext!==e.context):e.context&&$o(n,e.context,!1),Ti(n,e.containerInfo)}function Qc(n,e,t,r,p){return At(),Di(p),e.flags|=256,bn(n,e,t,r),e.child}var Yi={dehydrated:null,treeContext:null,retryLane:0};function Zi(n){return{baseLanes:n,cachePool:null,transitions:null}}function $c(n,e,t){var r=e.pendingProps,p=tn.current,i=!1,l=(e.flags&128)!==0,o;if((o=l)||(o=n!==null&&n.memoizedState===null?!1:(p&2)!==0),o?(i=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(p|=1),X(tn,p&1),n===null)return Ei(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((e.mode&1)===0?e.lanes=1:n.data==="$!"?e.lanes=8:e.lanes=1073741824,null):(l=r.children,n=r.fallback,i?(r=e.mode,i=e.child,l={mode:"hidden",children:l},(r&1)===0&&i!==null?(i.childLanes=0,i.pendingProps=l):i=Ap(l,r,0,null),n=ot(n,r,t,null),i.return=e,n.return=e,i.sibling=n,e.child=i,e.child.memoizedState=Zi(t),e.memoizedState=Yi,n):nl(e,l));if(p=n.memoizedState,p!==null&&(o=p.dehydrated,o!==null))return au(n,e,l,r,o,p,t);if(i){i=r.fallback,l=e.mode,p=n.child,o=p.sibling;var c={mode:"hidden",children:r.children};return(l&1)===0&&e.child!==p?(r=e.child,r.childLanes=0,r.pendingProps=c,e.deletions=null):(r=Qe(p,c),r.subtreeFlags=p.subtreeFlags&14680064),o!==null?i=Qe(o,i):(i=ot(i,l,t,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,l=n.child.memoizedState,l=l===null?Zi(t):{baseLanes:l.baseLanes|t,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=n.childLanes&~t,e.memoizedState=Yi,r}return i=n.child,n=i.sibling,r=Qe(i,{mode:"visible",children:r.children}),(e.mode&1)===0&&(r.lanes=t),r.return=e,r.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=r,e.memoizedState=null,r}function nl(n,e){return e=Ap({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function ap(n,e,t,r){return r!==null&&Di(r),xt(e,n.child,null,t),n=nl(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function au(n,e,t,r,p,i,l){if(t)return e.flags&256?(e.flags&=-257,r=Xi(Error(d(422))),ap(n,e,l,r)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(i=r.fallback,p=e.mode,r=Ap({mode:"visible",children:r.children},p,0,null),i=ot(i,p,l,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,(e.mode&1)!==0&&xt(e,n.child,null,l),e.child.memoizedState=Zi(l),e.memoizedState=Yi,i);if((e.mode&1)===0)return ap(n,e,l,null);if(p.data==="$!"){if(r=p.nextSibling&&p.nextSibling.dataset,r)var o=r.dgst;return r=o,i=Error(d(419)),r=Xi(i,r,void 0),ap(n,e,l,r)}if(o=(l&n.childLanes)!==0,Tn||o){if(r=yn,r!==null){switch(l&-l){case 4:p=2;break;case 16:p=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:p=32;break;case 536870912:p=268435456;break;default:p=0}p=(p&(r.suspendedLanes|l))!==0?0:p,p!==0&&p!==i.retryLane&&(i.retryLane=p,xe(n,p),ce(r,n,p,-1))}return gl(),r=Xi(Error(d(421))),ap(n,e,l,r)}return p.data==="$?"?(e.flags|=128,e.child=n.child,e=Au.bind(null,n),p._reactRetry=e,null):(n=i.treeContext,zn=Me(p.nextSibling),_n=e,nn=!0,pe=null,n!==null&&($n[Xn++]=Se,$n[Xn++]=Ae,$n[Xn++]=Ye,Se=n.id,Ae=n.overflow,Ye=e),e=nl(e,r.children),e.flags|=4096,e)}function Xc(n,e,t){n.lanes|=e;var r=n.alternate;r!==null&&(r.lanes|=e),Ni(n.return,e,t)}function el(n,e,t,r,p){var i=n.memoizedState;i===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:p}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=t,i.tailMode=p)}function Gc(n,e,t){var r=e.pendingProps,p=r.revealOrder,i=r.tail;if(bn(n,e,r.children,t),r=tn.current,(r&2)!==0)r=r&1|2,e.flags|=128;else{if(n!==null&&(n.flags&128)!==0)n:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Xc(n,t,e);else if(n.tag===19)Xc(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break n;for(;n.sibling===null;){if(n.return===null||n.return===e)break n;n=n.return}n.sibling.return=n.return,n=n.sibling}r&=1}if(X(tn,r),(e.mode&1)===0)e.memoizedState=null;else switch(p){case"forwards":for(t=e.child,p=null;t!==null;)n=t.alternate,n!==null&&rp(n)===null&&(p=t),t=t.sibling;t=p,t===null?(p=e.child,e.child=null):(p=t.sibling,t.sibling=null),el(e,!1,p,t,i);break;case"backwards":for(t=null,p=e.child,e.child=null;p!==null;){if(n=p.alternate,n!==null&&rp(n)===null){e.child=p;break}n=p.sibling,p.sibling=t,t=p,p=n}el(e,!0,t,null,i);break;case"together":el(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function up(n,e){(e.mode&1)===0&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Ee(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),rt|=e.lanes,(t&e.childLanes)===0)return null;if(n!==null&&e.child!==n.child)throw Error(d(153));if(e.child!==null){for(n=e.child,t=Qe(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=Qe(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function uu(n,e,t){switch(e.tag){case 3:Wc(e),At();break;case 5:sc(e);break;case 1:On(e.type)&&$r(e);break;case 4:Ti(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,p=e.memoizedProps.value;X(Zr,r._currentValue),r._currentValue=p;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(X(tn,tn.current&1),e.flags|=128,null):(t&e.child.childLanes)!==0?$c(n,e,t):(X(tn,tn.current&1),n=Ee(n,e,t),n!==null?n.sibling:null);X(tn,tn.current&1);break;case 19:if(r=(t&e.childLanes)!==0,(n.flags&128)!==0){if(r)return Gc(n,e,t);e.flags|=128}if(p=e.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),X(tn,tn.current),r)break;return null;case 22:case 23:return e.lanes=0,zc(n,e,t)}return Ee(n,e,t)}var Kc,tl,Jc,Yc;Kc=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}},tl=function(){},Jc=function(n,e,t,r){var p=n.memoizedProps;if(p!==r){n=e.stateNode,et(he.current);var i=null;switch(t){case"input":p=Np(n,p),r=Np(n,r),i=[];break;case"select":p=A({},p,{value:void 0}),r=A({},r,{value:void 0}),i=[];break;case"textarea":p=Tp(n,p),r=Tp(n,r),i=[];break;default:typeof p.onClick!="function"&&typeof r.onClick=="function"&&(n.onclick=Fr)}Hp(t,r);var l;t=null;for(m in p)if(!r.hasOwnProperty(m)&&p.hasOwnProperty(m)&&p[m]!=null)if(m==="style"){var o=p[m];for(l in o)o.hasOwnProperty(l)&&(t||(t={}),t[l]="")}else m!=="dangerouslySetInnerHTML"&&m!=="children"&&m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(R.hasOwnProperty(m)?i||(i=[]):(i=i||[]).push(m,null));for(m in r){var c=r[m];if(o=p!=null?p[m]:void 0,r.hasOwnProperty(m)&&c!==o&&(c!=null||o!=null))if(m==="style")if(o){for(l in o)!o.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(t||(t={}),t[l]="");for(l in c)c.hasOwnProperty(l)&&o[l]!==c[l]&&(t||(t={}),t[l]=c[l])}else t||(i||(i=[]),i.push(m,t)),t=c;else m==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,o=o?o.__html:void 0,c!=null&&o!==c&&(i=i||[]).push(m,c)):m==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(m,""+c):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&(R.hasOwnProperty(m)?(c!=null&&m==="onScroll"&&G("scroll",n),i||o===c||(i=[])):(i=i||[]).push(m,c))}t&&(i=i||[]).push("style",t);var m=i;(e.updateQueue=m)&&(e.flags|=4)}},Yc=function(n,e,t,r){t!==r&&(e.flags|=4)};function fr(n,e){if(!nn)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:r.sibling=null}}function Pn(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,r=0;if(e)for(var p=n.child;p!==null;)t|=p.lanes|p.childLanes,r|=p.subtreeFlags&14680064,r|=p.flags&14680064,p.return=n,p=p.sibling;else for(p=n.child;p!==null;)t|=p.lanes|p.childLanes,r|=p.subtreeFlags,r|=p.flags,p.return=n,p=p.sibling;return n.subtreeFlags|=r,n.childLanes=t,e}function fu(n,e,t){var r=e.pendingProps;switch(xi(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pn(e),null;case 1:return On(e.type)&&Qr(),Pn(e),null;case 3:return r=e.stateNode,Dt(),K(Bn),K(An),Ri(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(n===null||n.child===null)&&(Jr(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,pe!==null&&(ml(pe),pe=null))),tl(n,e),Pn(e),null;case 5:Mi(e);var p=et(or.current);if(t=e.type,n!==null&&e.stateNode!=null)Jc(n,e,t,r,p),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(d(166));return Pn(e),null}if(n=et(he.current),Jr(e)){r=e.stateNode,t=e.type;var i=e.memoizedProps;switch(r[de]=e,r[tr]=i,n=(e.mode&1)!==0,t){case"dialog":G("cancel",r),G("close",r);break;case"iframe":case"object":case"embed":G("load",r);break;case"video":case"audio":for(p=0;p<Zt.length;p++)G(Zt[p],r);break;case"source":G("error",r);break;case"img":case"image":case"link":G("error",r),G("load",r);break;case"details":G("toggle",r);break;case"input":Nl(r,i),G("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},G("invalid",r);break;case"textarea":Tl(r,i),G("invalid",r)}Hp(t,i),p=null;for(var l in i)if(i.hasOwnProperty(l)){var o=i[l];l==="children"?typeof o=="string"?r.textContent!==o&&(i.suppressHydrationWarning!==!0&&qr(r.textContent,o,n),p=["children",o]):typeof o=="number"&&r.textContent!==""+o&&(i.suppressHydrationWarning!==!0&&qr(r.textContent,o,n),p=["children",""+o]):R.hasOwnProperty(l)&&o!=null&&l==="onScroll"&&G("scroll",r)}switch(t){case"input":Cr(r),Ol(r,i,!0);break;case"textarea":Cr(r),Hl(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Fr)}r=p,e.updateQueue=r,r!==null&&(e.flags|=4)}else{l=p.nodeType===9?p:p.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Rl(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=l.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof r.is=="string"?n=l.createElement(t,{is:r.is}):(n=l.createElement(t),t==="select"&&(l=n,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):n=l.createElementNS(n,t),n[de]=e,n[tr]=r,Kc(n,e,!1,!1),e.stateNode=n;n:{switch(l=Rp(t,r),t){case"dialog":G("cancel",n),G("close",n),p=r;break;case"iframe":case"object":case"embed":G("load",n),p=r;break;case"video":case"audio":for(p=0;p<Zt.length;p++)G(Zt[p],n);p=r;break;case"source":G("error",n),p=r;break;case"img":case"image":case"link":G("error",n),G("load",n),p=r;break;case"details":G("toggle",n),p=r;break;case"input":Nl(n,r),p=Np(n,r),G("invalid",n);break;case"option":p=r;break;case"select":n._wrapperState={wasMultiple:!!r.multiple},p=A({},r,{value:void 0}),G("invalid",n);break;case"textarea":Tl(n,r),p=Tp(n,r),G("invalid",n);break;default:p=r}Hp(t,p),o=p;for(i in o)if(o.hasOwnProperty(i)){var c=o[i];i==="style"?jl(n,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Ul(n,c)):i==="children"?typeof c=="string"?(t!=="textarea"||c!=="")&&Tt(n,c):typeof c=="number"&&Tt(n,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(R.hasOwnProperty(i)?c!=null&&i==="onScroll"&&G("scroll",n):c!=null&&Zn(n,i,c,l))}switch(t){case"input":Cr(n),Ol(n,r,!1);break;case"textarea":Cr(n),Hl(n);break;case"option":r.value!=null&&n.setAttribute("value",""+F(r.value));break;case"select":n.multiple=!!r.multiple,i=r.value,i!=null?ct(n,!!r.multiple,i,!1):r.defaultValue!=null&&ct(n,!!r.multiple,r.defaultValue,!0);break;default:typeof p.onClick=="function"&&(n.onclick=Fr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break n;case"img":r=!0;break n;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Pn(e),null;case 6:if(n&&e.stateNode!=null)Yc(n,e,n.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(d(166));if(t=et(or.current),et(he.current),Jr(e)){if(r=e.stateNode,t=e.memoizedProps,r[de]=e,(i=r.nodeValue!==t)&&(n=_n,n!==null))switch(n.tag){case 3:qr(r.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&qr(r.nodeValue,t,(n.mode&1)!==0)}i&&(e.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[de]=e,e.stateNode=r}return Pn(e),null;case 13:if(K(tn),r=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(nn&&zn!==null&&(e.mode&1)!==0&&(e.flags&128)===0)ec(),At(),e.flags|=98560,i=!1;else if(i=Jr(e),r!==null&&r.dehydrated!==null){if(n===null){if(!i)throw Error(d(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(d(317));i[de]=e}else At(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Pn(e),i=!1}else pe!==null&&(ml(pe),pe=null),i=!0;if(!i)return e.flags&65536?e:null}return(e.flags&128)!==0?(e.lanes=t,e):(r=r!==null,r!==(n!==null&&n.memoizedState!==null)&&r&&(e.child.flags|=8192,(e.mode&1)!==0&&(n===null||(tn.current&1)!==0?dn===0&&(dn=3):gl())),e.updateQueue!==null&&(e.flags|=4),Pn(e),null);case 4:return Dt(),tl(n,e),n===null&&nr(e.stateNode.containerInfo),Pn(e),null;case 10:return Li(e.type._context),Pn(e),null;case 17:return On(e.type)&&Qr(),Pn(e),null;case 19:if(K(tn),i=e.memoizedState,i===null)return Pn(e),null;if(r=(e.flags&128)!==0,l=i.rendering,l===null)if(r)fr(i,!1);else{if(dn!==0||n!==null&&(n.flags&128)!==0)for(n=e.child;n!==null;){if(l=rp(n),l!==null){for(e.flags|=128,fr(i,!1),r=l.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=t,t=e.child;t!==null;)i=t,n=r,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=n,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,n=l.dependencies,i.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return X(tn,tn.current&1|2),e.child}n=n.sibling}i.tail!==null&&on()>Nt&&(e.flags|=128,r=!0,fr(i,!1),e.lanes=4194304)}else{if(!r)if(n=rp(l),n!==null){if(e.flags|=128,r=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),fr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!nn)return Pn(e),null}else 2*on()-i.renderingStartTime>Nt&&t!==1073741824&&(e.flags|=128,r=!0,fr(i,!1),e.lanes=4194304);i.isBackwards?(l.sibling=e.child,e.child=l):(t=i.last,t!==null?t.sibling=l:e.child=l,i.last=l)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=on(),e.sibling=null,t=tn.current,X(tn,r?t&1|2:t&1),e):(Pn(e),null);case 22:case 23:return hl(),r=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==r&&(e.flags|=8192),r&&(e.mode&1)!==0?(qn&1073741824)!==0&&(Pn(e),e.subtreeFlags&6&&(e.flags|=8192)):Pn(e),null;case 24:return null;case 25:return null}throw Error(d(156,e.tag))}function mu(n,e){switch(xi(e),e.tag){case 1:return On(e.type)&&Qr(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return Dt(),K(Bn),K(An),Ri(),n=e.flags,(n&65536)!==0&&(n&128)===0?(e.flags=n&-65537|128,e):null;case 5:return Mi(e),null;case 13:if(K(tn),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(d(340));At()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return K(tn),null;case 4:return Dt(),null;case 10:return Li(e.type._context),null;case 22:case 23:return hl(),null;case 24:return null;default:return null}}var fp=!1,En=!1,du=typeof WeakSet=="function"?WeakSet:Set,S=null;function It(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){ln(n,e,r)}else t.current=null}function rl(n,e,t){try{t()}catch(r){ln(n,e,r)}}var Zc=!1;function hu(n,e){if(hi=Br,n=No(),oi(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else n:{t=(t=n.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var p=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{t.nodeType,i.nodeType}catch{t=null;break n}var l=0,o=-1,c=-1,m=0,y=0,w=n,h=null;e:for(;;){for(var v;w!==t||p!==0&&w.nodeType!==3||(o=l+p),w!==i||r!==0&&w.nodeType!==3||(c=l+r),w.nodeType===3&&(l+=w.nodeValue.length),(v=w.firstChild)!==null;)h=w,w=v;for(;;){if(w===n)break e;if(h===t&&++m===p&&(o=l),h===i&&++y===r&&(c=l),(v=w.nextSibling)!==null)break;w=h,h=w.parentNode}w=v}t=o===-1||c===-1?null:{start:o,end:c}}else t=null}t=t||{start:0,end:0}}else t=null;for(gi={focusedElem:n,selectionRange:t},Br=!1,S=e;S!==null;)if(e=S,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,S=n;else for(;S!==null;){e=S;try{var x=e.alternate;if((e.flags&1024)!==0)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var E=x.memoizedProps,cn=x.memoizedState,u=e.stateNode,s=u.getSnapshotBeforeUpdate(e.elementType===e.type?E:ie(e.type,E),cn);u.__reactInternalSnapshotBeforeUpdate=s}break;case 3:var f=e.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(d(163))}}catch(k){ln(e,e.return,k)}if(n=e.sibling,n!==null){n.return=e.return,S=n;break}S=e.return}return x=Zc,Zc=!1,x}function mr(n,e,t){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var p=r=r.next;do{if((p.tag&n)===n){var i=p.destroy;p.destroy=void 0,i!==void 0&&rl(e,t,i)}p=p.next}while(p!==r)}}function mp(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var r=t.create;t.destroy=r()}t=t.next}while(t!==e)}}function pl(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function ns(n){var e=n.alternate;e!==null&&(n.alternate=null,ns(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[de],delete e[tr],delete e[Ci],delete e[Ja],delete e[Ya])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function es(n){return n.tag===5||n.tag===3||n.tag===4}function ts(n){n:for(;;){for(;n.sibling===null;){if(n.return===null||es(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue n;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function il(n,e,t){var r=n.tag;if(r===5||r===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Fr));else if(r!==4&&(n=n.child,n!==null))for(il(n,e,t),n=n.sibling;n!==null;)il(n,e,t),n=n.sibling}function ll(n,e,t){var r=n.tag;if(r===5||r===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(r!==4&&(n=n.child,n!==null))for(ll(n,e,t),n=n.sibling;n!==null;)ll(n,e,t),n=n.sibling}var Cn=null,le=!1;function _e(n,e,t){for(t=t.child;t!==null;)rs(n,e,t),t=t.sibling}function rs(n,e,t){if(me&&typeof me.onCommitFiberUnmount=="function")try{me.onCommitFiberUnmount(Er,t)}catch{}switch(t.tag){case 5:En||It(t,e);case 6:var r=Cn,p=le;Cn=null,_e(n,e,t),Cn=r,le=p,Cn!==null&&(le?(n=Cn,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):Cn.removeChild(t.stateNode));break;case 18:Cn!==null&&(le?(n=Cn,t=t.stateNode,n.nodeType===8?ki(n.parentNode,t):n.nodeType===1&&ki(n,t),Wt(n)):ki(Cn,t.stateNode));break;case 4:r=Cn,p=le,Cn=t.stateNode.containerInfo,le=!0,_e(n,e,t),Cn=r,le=p;break;case 0:case 11:case 14:case 15:if(!En&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){p=r=r.next;do{var i=p,l=i.destroy;i=i.tag,l!==void 0&&((i&2)!==0||(i&4)!==0)&&rl(t,e,l),p=p.next}while(p!==r)}_e(n,e,t);break;case 1:if(!En&&(It(t,e),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(o){ln(t,e,o)}_e(n,e,t);break;case 21:_e(n,e,t);break;case 22:t.mode&1?(En=(r=En)||t.memoizedState!==null,_e(n,e,t),En=r):_e(n,e,t);break;default:_e(n,e,t)}}function ps(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new du),e.forEach(function(r){var p=xu.bind(null,n,r);t.has(r)||(t.add(r),r.then(p,p))})}}function oe(n,e){var t=e.deletions;if(t!==null)for(var r=0;r<t.length;r++){var p=t[r];try{var i=n,l=e,o=l;n:for(;o!==null;){switch(o.tag){case 5:Cn=o.stateNode,le=!1;break n;case 3:Cn=o.stateNode.containerInfo,le=!0;break n;case 4:Cn=o.stateNode.containerInfo,le=!0;break n}o=o.return}if(Cn===null)throw Error(d(160));rs(i,l,p),Cn=null,le=!1;var c=p.alternate;c!==null&&(c.return=null),p.return=null}catch(m){ln(p,e,m)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)is(e,n),e=e.sibling}function is(n,e){var t=n.alternate,r=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(oe(e,n),ye(n),r&4){try{mr(3,n,n.return),mp(3,n)}catch(E){ln(n,n.return,E)}try{mr(5,n,n.return)}catch(E){ln(n,n.return,E)}}break;case 1:oe(e,n),ye(n),r&512&&t!==null&&It(t,t.return);break;case 5:if(oe(e,n),ye(n),r&512&&t!==null&&It(t,t.return),n.flags&32){var p=n.stateNode;try{Tt(p,"")}catch(E){ln(n,n.return,E)}}if(r&4&&(p=n.stateNode,p!=null)){var i=n.memoizedProps,l=t!==null?t.memoizedProps:i,o=n.type,c=n.updateQueue;if(n.updateQueue=null,c!==null)try{o==="input"&&i.type==="radio"&&i.name!=null&&Bl(p,i),Rp(o,l);var m=Rp(o,i);for(l=0;l<c.length;l+=2){var y=c[l],w=c[l+1];y==="style"?jl(p,w):y==="dangerouslySetInnerHTML"?Ul(p,w):y==="children"?Tt(p,w):Zn(p,y,w,m)}switch(o){case"input":Bp(p,i);break;case"textarea":Ml(p,i);break;case"select":var h=p._wrapperState.wasMultiple;p._wrapperState.wasMultiple=!!i.multiple;var v=i.value;v!=null?ct(p,!!i.multiple,v,!1):h!==!!i.multiple&&(i.defaultValue!=null?ct(p,!!i.multiple,i.defaultValue,!0):ct(p,!!i.multiple,i.multiple?[]:"",!1))}p[tr]=i}catch(E){ln(n,n.return,E)}}break;case 6:if(oe(e,n),ye(n),r&4){if(n.stateNode===null)throw Error(d(162));p=n.stateNode,i=n.memoizedProps;try{p.nodeValue=i}catch(E){ln(n,n.return,E)}}break;case 3:if(oe(e,n),ye(n),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Wt(e.containerInfo)}catch(E){ln(n,n.return,E)}break;case 4:oe(e,n),ye(n);break;case 13:oe(e,n),ye(n),p=n.child,p.flags&8192&&(i=p.memoizedState!==null,p.stateNode.isHidden=i,!i||p.alternate!==null&&p.alternate.memoizedState!==null||(sl=on())),r&4&&ps(n);break;case 22:if(y=t!==null&&t.memoizedState!==null,n.mode&1?(En=(m=En)||y,oe(e,n),En=m):oe(e,n),ye(n),r&8192){if(m=n.memoizedState!==null,(n.stateNode.isHidden=m)&&!y&&(n.mode&1)!==0)for(S=n,y=n.child;y!==null;){for(w=S=y;S!==null;){switch(h=S,v=h.child,h.tag){case 0:case 11:case 14:case 15:mr(4,h,h.return);break;case 1:It(h,h.return);var x=h.stateNode;if(typeof x.componentWillUnmount=="function"){r=h,t=h.return;try{e=r,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(E){ln(r,t,E)}}break;case 5:It(h,h.return);break;case 22:if(h.memoizedState!==null){cs(w);continue}}v!==null?(v.return=h,S=v):cs(w)}y=y.sibling}n:for(y=null,w=n;;){if(w.tag===5){if(y===null){y=w;try{p=w.stateNode,m?(i=p.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(o=w.stateNode,c=w.memoizedProps.style,l=c!=null&&c.hasOwnProperty("display")?c.display:null,o.style.display=Vl("display",l))}catch(E){ln(n,n.return,E)}}}else if(w.tag===6){if(y===null)try{w.stateNode.nodeValue=m?"":w.memoizedProps}catch(E){ln(n,n.return,E)}}else if((w.tag!==22&&w.tag!==23||w.memoizedState===null||w===n)&&w.child!==null){w.child.return=w,w=w.child;continue}if(w===n)break n;for(;w.sibling===null;){if(w.return===null||w.return===n)break n;y===w&&(y=null),w=w.return}y===w&&(y=null),w.sibling.return=w.return,w=w.sibling}}break;case 19:oe(e,n),ye(n),r&4&&ps(n);break;case 21:break;default:oe(e,n),ye(n)}}function ye(n){var e=n.flags;if(e&2){try{n:{for(var t=n.return;t!==null;){if(es(t)){var r=t;break n}t=t.return}throw Error(d(160))}switch(r.tag){case 5:var p=r.stateNode;r.flags&32&&(Tt(p,""),r.flags&=-33);var i=ts(n);ll(n,i,p);break;case 3:case 4:var l=r.stateNode.containerInfo,o=ts(n);il(n,o,l);break;default:throw Error(d(161))}}catch(c){ln(n,n.return,c)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function gu(n,e,t){S=n,ls(n)}function ls(n,e,t){for(var r=(n.mode&1)!==0;S!==null;){var p=S,i=p.child;if(p.tag===22&&r){var l=p.memoizedState!==null||fp;if(!l){var o=p.alternate,c=o!==null&&o.memoizedState!==null||En;o=fp;var m=En;if(fp=l,(En=c)&&!m)for(S=p;S!==null;)l=S,c=l.child,l.tag===22&&l.memoizedState!==null?ss(p):c!==null?(c.return=l,S=c):ss(p);for(;i!==null;)S=i,ls(i),i=i.sibling;S=p,fp=o,En=m}os(n)}else(p.subtreeFlags&8772)!==0&&i!==null?(i.return=p,S=i):os(n)}}function os(n){for(;S!==null;){var e=S;if((e.flags&8772)!==0){var t=e.alternate;try{if((e.flags&8772)!==0)switch(e.tag){case 0:case 11:case 15:En||mp(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!En)if(t===null)r.componentDidMount();else{var p=e.elementType===e.type?t.memoizedProps:ie(e.type,t.memoizedProps);r.componentDidUpdate(p,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&cc(e,i,r);break;case 3:var l=e.updateQueue;if(l!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}cc(e,l,t)}break;case 5:var o=e.stateNode;if(t===null&&e.flags&4){t=o;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&t.focus();break;case"img":c.src&&(t.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var m=e.alternate;if(m!==null){var y=m.memoizedState;if(y!==null){var w=y.dehydrated;w!==null&&Wt(w)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(d(163))}En||e.flags&512&&pl(e)}catch(h){ln(e,e.return,h)}}if(e===n){S=null;break}if(t=e.sibling,t!==null){t.return=e.return,S=t;break}S=e.return}}function cs(n){for(;S!==null;){var e=S;if(e===n){S=null;break}var t=e.sibling;if(t!==null){t.return=e.return,S=t;break}S=e.return}}function ss(n){for(;S!==null;){var e=S;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{mp(4,e)}catch(c){ln(e,t,c)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var p=e.return;try{r.componentDidMount()}catch(c){ln(e,p,c)}}var i=e.return;try{pl(e)}catch(c){ln(e,i,c)}break;case 5:var l=e.return;try{pl(e)}catch(c){ln(e,l,c)}}}catch(c){ln(e,e.return,c)}if(e===n){S=null;break}var o=e.sibling;if(o!==null){o.return=e.return,S=o;break}S=e.return}}var yu=Math.ceil,dp=Sn.ReactCurrentDispatcher,ol=Sn.ReactCurrentOwner,Jn=Sn.ReactCurrentBatchConfig,U=0,yn=null,fn=null,vn=0,qn=0,Lt=He(0),dn=0,dr=null,rt=0,hp=0,cl=0,hr=null,Mn=null,sl=0,Nt=1/0,De=null,gp=!1,al=null,ze=null,yp=!1,qe=null,wp=0,gr=0,ul=null,kp=-1,Cp=0;function In(){return(U&6)!==0?on():kp!==-1?kp:kp=on()}function Fe(n){return(n.mode&1)===0?1:(U&2)!==0&&vn!==0?vn&-vn:nu.transition!==null?(Cp===0&&(Cp=eo()),Cp):(n=W,n!==0||(n=window.event,n=n===void 0?16:ao(n.type)),n)}function ce(n,e,t,r){if(50<gr)throw gr=0,ul=null,Error(d(185));jt(n,t,r),((U&2)===0||n!==yn)&&(n===yn&&((U&2)===0&&(hp|=t),dn===4&&We(n,vn)),Hn(n,r),t===1&&U===0&&(e.mode&1)===0&&(Nt=on()+500,Xr&&Ue()))}function Hn(n,e){var t=n.callbackNode;na(n,e);var r=Ir(n,n===yn?vn:0);if(r===0)t!==null&&Yl(t),n.callbackNode=null,n.callbackPriority=0;else if(e=r&-r,n.callbackPriority!==e){if(t!=null&&Yl(t),e===1)n.tag===0?Za(us.bind(null,n)):Ko(us.bind(null,n)),Ga(function(){(U&6)===0&&Ue()}),t=null;else{switch(to(r)){case 1:t=Fp;break;case 4:t=Zl;break;case 16:t=Pr;break;case 536870912:t=no;break;default:t=Pr}t=ks(t,as.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function as(n,e){if(kp=-1,Cp=0,(U&6)!==0)throw Error(d(327));var t=n.callbackNode;if(Bt()&&n.callbackNode!==t)return null;var r=Ir(n,n===yn?vn:0);if(r===0)return null;if((r&30)!==0||(r&n.expiredLanes)!==0||e)e=vp(n,r);else{e=r;var p=U;U|=2;var i=ms();(yn!==n||vn!==e)&&(De=null,Nt=on()+500,it(n,e));do try{Cu();break}catch(o){fs(n,o)}while(!0);Ii(),dp.current=i,U=p,fn!==null?e=0:(yn=null,vn=0,e=dn)}if(e!==0){if(e===2&&(p=Wp(n),p!==0&&(r=p,e=fl(n,p))),e===1)throw t=dr,it(n,0),We(n,r),Hn(n,on()),t;if(e===6)We(n,r);else{if(p=n.current.alternate,(r&30)===0&&!wu(p)&&(e=vp(n,r),e===2&&(i=Wp(n),i!==0&&(r=i,e=fl(n,i))),e===1))throw t=dr,it(n,0),We(n,r),Hn(n,on()),t;switch(n.finishedWork=p,n.finishedLanes=r,e){case 0:case 1:throw Error(d(345));case 2:lt(n,Mn,De);break;case 3:if(We(n,r),(r&130023424)===r&&(e=sl+500-on(),10<e)){if(Ir(n,0)!==0)break;if(p=n.suspendedLanes,(p&r)!==r){In(),n.pingedLanes|=n.suspendedLanes&p;break}n.timeoutHandle=wi(lt.bind(null,n,Mn,De),e);break}lt(n,Mn,De);break;case 4:if(We(n,r),(r&4194240)===r)break;for(e=n.eventTimes,p=-1;0<r;){var l=31-te(r);i=1<<l,l=e[l],l>p&&(p=l),r&=~i}if(r=p,r=on()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*yu(r/1960))-r,10<r){n.timeoutHandle=wi(lt.bind(null,n,Mn,De),r);break}lt(n,Mn,De);break;case 5:lt(n,Mn,De);break;default:throw Error(d(329))}}}return Hn(n,on()),n.callbackNode===t?as.bind(null,n):null}function fl(n,e){var t=hr;return n.current.memoizedState.isDehydrated&&(it(n,e).flags|=256),n=vp(n,e),n!==2&&(e=Mn,Mn=t,e!==null&&ml(e)),n}function ml(n){Mn===null?Mn=n:Mn.push.apply(Mn,n)}function wu(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var p=t[r],i=p.getSnapshot;p=p.value;try{if(!re(i(),p))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function We(n,e){for(e&=~cl,e&=~hp,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-te(e),r=1<<t;n[t]=-1,e&=~r}}function us(n){if((U&6)!==0)throw Error(d(327));Bt();var e=Ir(n,0);if((e&1)===0)return Hn(n,on()),null;var t=vp(n,e);if(n.tag!==0&&t===2){var r=Wp(n);r!==0&&(e=r,t=fl(n,r))}if(t===1)throw t=dr,it(n,0),We(n,e),Hn(n,on()),t;if(t===6)throw Error(d(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,lt(n,Mn,De),Hn(n,on()),null}function dl(n,e){var t=U;U|=1;try{return n(e)}finally{U=t,U===0&&(Nt=on()+500,Xr&&Ue())}}function pt(n){qe!==null&&qe.tag===0&&(U&6)===0&&Bt();var e=U;U|=1;var t=Jn.transition,r=W;try{if(Jn.transition=null,W=1,n)return n()}finally{W=r,Jn.transition=t,U=e,(U&6)===0&&Ue()}}function hl(){qn=Lt.current,K(Lt)}function it(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,Xa(t)),fn!==null)for(t=fn.return;t!==null;){var r=t;switch(xi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Qr();break;case 3:Dt(),K(Bn),K(An),Ri();break;case 5:Mi(r);break;case 4:Dt();break;case 13:K(tn);break;case 19:K(tn);break;case 10:Li(r.type._context);break;case 22:case 23:hl()}t=t.return}if(yn=n,fn=n=Qe(n.current,null),vn=qn=e,dn=0,dr=null,cl=hp=rt=0,Mn=hr=null,nt!==null){for(e=0;e<nt.length;e++)if(t=nt[e],r=t.interleaved,r!==null){t.interleaved=null;var p=r.next,i=t.pending;if(i!==null){var l=i.next;i.next=p,r.next=l}t.pending=r}nt=null}return n}function fs(n,e){do{var t=fn;try{if(Ii(),pp.current=cp,ip){for(var r=rn.memoizedState;r!==null;){var p=r.queue;p!==null&&(p.pending=null),r=r.next}ip=!1}if(tt=0,gn=mn=rn=null,cr=!1,sr=0,ol.current=null,t===null||t.return===null){dn=1,dr=e,fn=null;break}n:{var i=n,l=t.return,o=t,c=e;if(e=vn,o.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var m=c,y=o,w=y.tag;if((y.mode&1)===0&&(w===0||w===11||w===15)){var h=y.alternate;h?(y.updateQueue=h.updateQueue,y.memoizedState=h.memoizedState,y.lanes=h.lanes):(y.updateQueue=null,y.memoizedState=null)}var v=Rc(l);if(v!==null){v.flags&=-257,Uc(v,l,o,i,e),v.mode&1&&Hc(i,m,e),e=v,c=m;var x=e.updateQueue;if(x===null){var E=new Set;E.add(c),e.updateQueue=E}else x.add(c);break n}else{if((e&1)===0){Hc(i,m,e),gl();break n}c=Error(d(426))}}else if(nn&&o.mode&1){var cn=Rc(l);if(cn!==null){(cn.flags&65536)===0&&(cn.flags|=256),Uc(cn,l,o,i,e),Di(bt(c,o));break n}}i=c=bt(c,o),dn!==4&&(dn=2),hr===null?hr=[i]:hr.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var u=Tc(i,c,e);oc(i,u);break n;case 1:o=c;var s=i.type,f=i.stateNode;if((i.flags&128)===0&&(typeof s.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(ze===null||!ze.has(f)))){i.flags|=65536,e&=-e,i.lanes|=e;var k=Mc(i,o,e);oc(i,k);break n}}i=i.return}while(i!==null)}hs(t)}catch(D){e=D,fn===t&&t!==null&&(fn=t=t.return);continue}break}while(!0)}function ms(){var n=dp.current;return dp.current=cp,n===null?cp:n}function gl(){(dn===0||dn===3||dn===2)&&(dn=4),yn===null||(rt&268435455)===0&&(hp&268435455)===0||We(yn,vn)}function vp(n,e){var t=U;U|=2;var r=ms();(yn!==n||vn!==e)&&(De=null,it(n,e));do try{ku();break}catch(p){fs(n,p)}while(!0);if(Ii(),U=t,dp.current=r,fn!==null)throw Error(d(261));return yn=null,vn=0,dn}function ku(){for(;fn!==null;)ds(fn)}function Cu(){for(;fn!==null&&!Ws();)ds(fn)}function ds(n){var e=ws(n.alternate,n,qn);n.memoizedProps=n.pendingProps,e===null?hs(n):fn=e,ol.current=null}function hs(n){var e=n;do{var t=e.alternate;if(n=e.return,(e.flags&32768)===0){if(t=fu(t,e,qn),t!==null){fn=t;return}}else{if(t=mu(t,e),t!==null){t.flags&=32767,fn=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{dn=6,fn=null;return}}if(e=e.sibling,e!==null){fn=e;return}fn=e=n}while(e!==null);dn===0&&(dn=5)}function lt(n,e,t){var r=W,p=Jn.transition;try{Jn.transition=null,W=1,vu(n,e,t,r)}finally{Jn.transition=p,W=r}return null}function vu(n,e,t,r){do Bt();while(qe!==null);if((U&6)!==0)throw Error(d(327));t=n.finishedWork;var p=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(d(177));n.callbackNode=null,n.callbackPriority=0;var i=t.lanes|t.childLanes;if(ea(n,i),n===yn&&(fn=yn=null,vn=0),(t.subtreeFlags&2064)===0&&(t.flags&2064)===0||yp||(yp=!0,ks(Pr,function(){return Bt(),null})),i=(t.flags&15990)!==0,(t.subtreeFlags&15990)!==0||i){i=Jn.transition,Jn.transition=null;var l=W;W=1;var o=U;U|=4,ol.current=null,hu(n,t),is(t,n),_a(gi),Br=!!hi,gi=hi=null,n.current=t,gu(t),Qs(),U=o,W=l,Jn.transition=i}else n.current=t;if(yp&&(yp=!1,qe=n,wp=p),i=n.pendingLanes,i===0&&(ze=null),Gs(t.stateNode),Hn(n,on()),e!==null)for(r=n.onRecoverableError,t=0;t<e.length;t++)p=e[t],r(p.value,{componentStack:p.stack,digest:p.digest});if(gp)throw gp=!1,n=al,al=null,n;return(wp&1)!==0&&n.tag!==0&&Bt(),i=n.pendingLanes,(i&1)!==0?n===ul?gr++:(gr=0,ul=n):gr=0,Ue(),null}function Bt(){if(qe!==null){var n=to(wp),e=Jn.transition,t=W;try{if(Jn.transition=null,W=16>n?16:n,qe===null)var r=!1;else{if(n=qe,qe=null,wp=0,(U&6)!==0)throw Error(d(331));var p=U;for(U|=4,S=n.current;S!==null;){var i=S,l=i.child;if((S.flags&16)!==0){var o=i.deletions;if(o!==null){for(var c=0;c<o.length;c++){var m=o[c];for(S=m;S!==null;){var y=S;switch(y.tag){case 0:case 11:case 15:mr(8,y,i)}var w=y.child;if(w!==null)w.return=y,S=w;else for(;S!==null;){y=S;var h=y.sibling,v=y.return;if(ns(y),y===m){S=null;break}if(h!==null){h.return=v,S=h;break}S=v}}}var x=i.alternate;if(x!==null){var E=x.child;if(E!==null){x.child=null;do{var cn=E.sibling;E.sibling=null,E=cn}while(E!==null)}}S=i}}if((i.subtreeFlags&2064)!==0&&l!==null)l.return=i,S=l;else n:for(;S!==null;){if(i=S,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:mr(9,i,i.return)}var u=i.sibling;if(u!==null){u.return=i.return,S=u;break n}S=i.return}}var s=n.current;for(S=s;S!==null;){l=S;var f=l.child;if((l.subtreeFlags&2064)!==0&&f!==null)f.return=l,S=f;else n:for(l=s;S!==null;){if(o=S,(o.flags&2048)!==0)try{switch(o.tag){case 0:case 11:case 15:mp(9,o)}}catch(D){ln(o,o.return,D)}if(o===l){S=null;break n}var k=o.sibling;if(k!==null){k.return=o.return,S=k;break n}S=o.return}}if(U=p,Ue(),me&&typeof me.onPostCommitFiberRoot=="function")try{me.onPostCommitFiberRoot(Er,n)}catch{}r=!0}return r}finally{W=t,Jn.transition=e}}return!1}function gs(n,e,t){e=bt(t,e),e=Tc(n,e,1),n=je(n,e,1),e=In(),n!==null&&(jt(n,1,e),Hn(n,e))}function ln(n,e,t){if(n.tag===3)gs(n,n,t);else for(;e!==null;){if(e.tag===3){gs(e,n,t);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ze===null||!ze.has(r))){n=bt(t,n),n=Mc(e,n,1),e=je(e,n,1),n=In(),e!==null&&(jt(e,1,n),Hn(e,n));break}}e=e.return}}function Su(n,e,t){var r=n.pingCache;r!==null&&r.delete(e),e=In(),n.pingedLanes|=n.suspendedLanes&t,yn===n&&(vn&t)===t&&(dn===4||dn===3&&(vn&130023424)===vn&&500>on()-sl?it(n,0):cl|=t),Hn(n,e)}function ys(n,e){e===0&&((n.mode&1)===0?e=1:(e=br,br<<=1,(br&130023424)===0&&(br=4194304)));var t=In();n=xe(n,e),n!==null&&(jt(n,e,t),Hn(n,t))}function Au(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),ys(n,t)}function xu(n,e){var t=0;switch(n.tag){case 13:var r=n.stateNode,p=n.memoizedState;p!==null&&(t=p.retryLane);break;case 19:r=n.stateNode;break;default:throw Error(d(314))}r!==null&&r.delete(e),ys(n,t)}var ws;ws=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||Bn.current)Tn=!0;else{if((n.lanes&t)===0&&(e.flags&128)===0)return Tn=!1,uu(n,e,t);Tn=(n.flags&131072)!==0}else Tn=!1,nn&&(e.flags&1048576)!==0&&Jo(e,Kr,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;up(n,e),n=e.pendingProps;var p=Ct(e,An.current);Et(e,t),p=ji(null,e,r,n,p,t);var i=_i();return e.flags|=1,typeof p=="object"&&p!==null&&typeof p.render=="function"&&p.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,On(r)?(i=!0,$r(e)):i=!1,e.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,Oi(e),p.updater=sp,e.stateNode=p,p._reactInternals=e,$i(e,r,n,t),e=Ji(null,e,r,!0,i,t)):(e.tag=0,nn&&i&&Ai(e),bn(null,e,p,t),e=e.child),e;case 16:r=e.elementType;n:{switch(up(n,e),n=e.pendingProps,p=r._init,r=p(r._payload),e.type=r,p=e.tag=Eu(r),n=ie(r,n),p){case 0:e=Ki(null,e,r,n,t);break n;case 1:e=Fc(null,e,r,n,t);break n;case 11:e=Vc(null,e,r,n,t);break n;case 14:e=jc(null,e,r,ie(r.type,n),t);break n}throw Error(d(306,r,""))}return e;case 0:return r=e.type,p=e.pendingProps,p=e.elementType===r?p:ie(r,p),Ki(n,e,r,p,t);case 1:return r=e.type,p=e.pendingProps,p=e.elementType===r?p:ie(r,p),Fc(n,e,r,p,t);case 3:n:{if(Wc(e),n===null)throw Error(d(387));r=e.pendingProps,i=e.memoizedState,p=i.element,lc(n,e),tp(e,r,null,t);var l=e.memoizedState;if(r=l.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){p=bt(Error(d(423)),e),e=Qc(n,e,r,t,p);break n}else if(r!==p){p=bt(Error(d(424)),e),e=Qc(n,e,r,t,p);break n}else for(zn=Me(e.stateNode.containerInfo.firstChild),_n=e,nn=!0,pe=null,t=pc(e,null,r,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(At(),r===p){e=Ee(n,e,t);break n}bn(n,e,r,t)}e=e.child}return e;case 5:return sc(e),n===null&&Ei(e),r=e.type,p=e.pendingProps,i=n!==null?n.memoizedProps:null,l=p.children,yi(r,p)?l=null:i!==null&&yi(r,i)&&(e.flags|=32),qc(n,e),bn(n,e,l,t),e.child;case 6:return n===null&&Ei(e),null;case 13:return $c(n,e,t);case 4:return Ti(e,e.stateNode.containerInfo),r=e.pendingProps,n===null?e.child=xt(e,null,r,t):bn(n,e,r,t),e.child;case 11:return r=e.type,p=e.pendingProps,p=e.elementType===r?p:ie(r,p),Vc(n,e,r,p,t);case 7:return bn(n,e,e.pendingProps,t),e.child;case 8:return bn(n,e,e.pendingProps.children,t),e.child;case 12:return bn(n,e,e.pendingProps.children,t),e.child;case 10:n:{if(r=e.type._context,p=e.pendingProps,i=e.memoizedProps,l=p.value,X(Zr,r._currentValue),r._currentValue=l,i!==null)if(re(i.value,l)){if(i.children===p.children&&!Bn.current){e=Ee(n,e,t);break n}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var o=i.dependencies;if(o!==null){l=i.child;for(var c=o.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=Pe(-1,t&-t),c.tag=2;var m=i.updateQueue;if(m!==null){m=m.shared;var y=m.pending;y===null?c.next=c:(c.next=y.next,y.next=c),m.pending=c}}i.lanes|=t,c=i.alternate,c!==null&&(c.lanes|=t),Ni(i.return,t,e),o.lanes|=t;break}c=c.next}}else if(i.tag===10)l=i.type===e.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(d(341));l.lanes|=t,o=l.alternate,o!==null&&(o.lanes|=t),Ni(l,t,e),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===e){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}bn(n,e,p.children,t),e=e.child}return e;case 9:return p=e.type,r=e.pendingProps.children,Et(e,t),p=Gn(p),r=r(p),e.flags|=1,bn(n,e,r,t),e.child;case 14:return r=e.type,p=ie(r,e.pendingProps),p=ie(r.type,p),jc(n,e,r,p,t);case 15:return _c(n,e,e.type,e.pendingProps,t);case 17:return r=e.type,p=e.pendingProps,p=e.elementType===r?p:ie(r,p),up(n,e),e.tag=1,On(r)?(n=!0,$r(e)):n=!1,Et(e,t),Bc(e,r,p),$i(e,r,p,t),Ji(null,e,r,!0,n,t);case 19:return Gc(n,e,t);case 22:return zc(n,e,t)}throw Error(d(156,e.tag))};function ks(n,e){return Jl(n,e)}function Pu(n,e,t,r){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(n,e,t,r){return new Pu(n,e,t,r)}function yl(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Eu(n){if(typeof n=="function")return yl(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ue)return 11;if(n===fe)return 14}return 2}function Qe(n,e){var t=n.alternate;return t===null?(t=Yn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function Sp(n,e,t,r,p,i){var l=2;if(r=n,typeof n=="function")yl(n)&&(l=1);else if(typeof n=="string")l=5;else n:switch(n){case Ln:return ot(t.children,p,i,e);case Qn:l=8,p|=8;break;case be:return n=Yn(12,t,e,p|2),n.elementType=be,n.lanes=i,n;case Un:return n=Yn(13,t,e,p),n.elementType=Un,n.lanes=i,n;case ee:return n=Yn(19,t,e,p),n.elementType=ee,n.lanes=i,n;case pn:return Ap(t,p,i,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case ke:l=10;break n;case Xe:l=9;break n;case ue:l=11;break n;case fe:l=14;break n;case Nn:l=16,r=null;break n}throw Error(d(130,n==null?n:typeof n,""))}return e=Yn(l,t,e,p),e.elementType=n,e.type=r,e.lanes=i,e}function ot(n,e,t,r){return n=Yn(7,n,r,e),n.lanes=t,n}function Ap(n,e,t,r){return n=Yn(22,n,r,e),n.elementType=pn,n.lanes=t,n.stateNode={isHidden:!1},n}function wl(n,e,t){return n=Yn(6,n,null,e),n.lanes=t,n}function kl(n,e,t){return e=Yn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function Du(n,e,t,r,p){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Qp(0),this.expirationTimes=Qp(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qp(0),this.identifierPrefix=r,this.onRecoverableError=p,this.mutableSourceEagerHydrationData=null}function Cl(n,e,t,r,p,i,l,o,c){return n=new Du(n,e,t,o,c),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Yn(3,null,null,e),n.current=i,i.stateNode=n,i.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Oi(i),n}function bu(n,e,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Dn,key:r==null?null:""+r,children:n,containerInfo:e,implementation:t}}function Cs(n){if(!n)return Re;n=n._reactInternals;n:{if(Ge(n)!==n||n.tag!==1)throw Error(d(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break n;case 1:if(On(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break n}}e=e.return}while(e!==null);throw Error(d(171))}if(n.tag===1){var t=n.type;if(On(t))return Xo(n,t,e)}return e}function vs(n,e,t,r,p,i,l,o,c){return n=Cl(t,r,!0,n,p,i,l,o,c),n.context=Cs(null),t=n.current,r=In(),p=Fe(t),i=Pe(r,p),i.callback=e??null,je(t,i,p),n.current.lanes=p,jt(n,p,r),Hn(n,r),n}function xp(n,e,t,r){var p=e.current,i=In(),l=Fe(p);return t=Cs(t),e.context===null?e.context=t:e.pendingContext=t,e=Pe(i,l),e.payload={element:n},r=r===void 0?null:r,r!==null&&(e.callback=r),n=je(p,e,l),n!==null&&(ce(n,p,l,i),ep(n,p,l)),l}function Pp(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Ss(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function vl(n,e){Ss(n,e),(n=n.alternate)&&Ss(n,e)}function Iu(){return null}var As=typeof reportError=="function"?reportError:function(n){console.error(n)};function Sl(n){this._internalRoot=n}Ep.prototype.render=Sl.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(d(409));xp(n,e,null,null)},Ep.prototype.unmount=Sl.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;pt(function(){xp(null,n,null,null)}),e[Ce]=null}};function Ep(n){this._internalRoot=n}Ep.prototype.unstable_scheduleHydration=function(n){if(n){var e=io();n={blockedOn:null,target:n,priority:e};for(var t=0;t<Be.length&&e!==0&&e<Be[t].priority;t++);Be.splice(t,0,n),t===0&&co(n)}};function Al(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Dp(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function xs(){}function Lu(n,e,t,r,p){if(p){if(typeof r=="function"){var i=r;r=function(){var m=Pp(l);i.call(m)}}var l=vs(e,r,n,0,null,!1,!1,"",xs);return n._reactRootContainer=l,n[Ce]=l.current,nr(n.nodeType===8?n.parentNode:n),pt(),l}for(;p=n.lastChild;)n.removeChild(p);if(typeof r=="function"){var o=r;r=function(){var m=Pp(c);o.call(m)}}var c=Cl(n,0,!1,null,null,!1,!1,"",xs);return n._reactRootContainer=c,n[Ce]=c.current,nr(n.nodeType===8?n.parentNode:n),pt(function(){xp(e,c,t,r)}),c}function bp(n,e,t,r,p){var i=t._reactRootContainer;if(i){var l=i;if(typeof p=="function"){var o=p;p=function(){var c=Pp(l);o.call(c)}}xp(e,l,n,p)}else l=Lu(t,e,n,p,r);return Pp(l)}ro=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=Vt(e.pendingLanes);t!==0&&($p(e,t|1),Hn(e,on()),(U&6)===0&&(Nt=on()+500,Ue()))}break;case 13:pt(function(){var r=xe(n,1);if(r!==null){var p=In();ce(r,n,1,p)}}),vl(n,1)}},Xp=function(n){if(n.tag===13){var e=xe(n,134217728);if(e!==null){var t=In();ce(e,n,134217728,t)}vl(n,134217728)}},po=function(n){if(n.tag===13){var e=Fe(n),t=xe(n,e);if(t!==null){var r=In();ce(t,n,e,r)}vl(n,e)}},io=function(){return W},lo=function(n,e){var t=W;try{return W=n,e()}finally{W=t}},jp=function(n,e,t){switch(e){case"input":if(Bp(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var r=t[e];if(r!==n&&r.form===n.form){var p=Wr(r);if(!p)throw Error(d(90));Ll(r),Bp(r,p)}}}break;case"textarea":Ml(n,t);break;case"select":e=t.value,e!=null&&ct(n,!!t.multiple,e,!1)}},Fl=dl,Wl=pt;var Nu={usingClientEntryPoint:!1,Events:[rr,wt,Wr,zl,ql,dl]},yr={findFiberByHostInstance:Ke,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Bu={bundleType:yr.bundleType,version:yr.version,rendererPackageName:yr.rendererPackageName,rendererConfig:yr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sn.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Gl(n),n===null?null:n.stateNode},findFiberByHostInstance:yr.findFiberByHostInstance||Iu,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ip=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ip.isDisabled&&Ip.supportsFiber)try{Er=Ip.inject(Bu),me=Ip}catch{}}return Rn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Nu,Rn.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Al(e))throw Error(d(200));return bu(n,e,null,t)},Rn.createRoot=function(n,e){if(!Al(n))throw Error(d(299));var t=!1,r="",p=As;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(p=e.onRecoverableError)),e=Cl(n,1,!1,null,null,t,!1,r,p),n[Ce]=e.current,nr(n.nodeType===8?n.parentNode:n),new Sl(e)},Rn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(d(188)):(n=Object.keys(n).join(","),Error(d(268,n)));return n=Gl(e),n=n===null?null:n.stateNode,n},Rn.flushSync=function(n){return pt(n)},Rn.hydrate=function(n,e,t){if(!Dp(e))throw Error(d(200));return bp(null,n,e,!0,t)},Rn.hydrateRoot=function(n,e,t){if(!Al(n))throw Error(d(405));var r=t!=null&&t.hydratedSources||null,p=!1,i="",l=As;if(t!=null&&(t.unstable_strictMode===!0&&(p=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),e=vs(e,null,n,1,t??null,p,!1,i,l),n[Ce]=e.current,nr(n),r)for(n=0;n<r.length;n++)t=r[n],p=t._getVersion,p=p(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,p]:e.mutableSourceEagerHydrationData.push(t,p);return new Ep(e)},Rn.render=function(n,e,t){if(!Dp(e))throw Error(d(200));return bp(null,n,e,!1,t)},Rn.unmountComponentAtNode=function(n){if(!Dp(n))throw Error(d(40));return n._reactRootContainer?(pt(function(){bp(null,null,n,!1,function(){n._reactRootContainer=null,n[Ce]=null})}),!0):!1},Rn.unstable_batchedUpdates=dl,Rn.unstable_renderSubtreeIntoContainer=function(n,e,t,r){if(!Dp(t))throw Error(d(200));if(n==null||n._reactInternals===void 0)throw Error(d(38));return bp(n,e,t,!1,r)},Rn.version="18.3.1-next-f1338f8080-20240426",Rn}var Bs;function ju(){if(Bs)return El.exports;Bs=1;function b(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b)}catch(M){console.error(M)}}return b(),El.exports=Vu(),El.exports}var Os;function _u(){if(Os)return Lp;Os=1;var b=ju();return Lp.createRoot=b.createRoot,Lp.hydrateRoot=b.hydrateRoot,Lp}var Zu=_u();/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zu=b=>b.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Hs=(...b)=>b.filter((M,d,sn)=>!!M&&M.trim()!==""&&sn.indexOf(M)===d).join(" ").trim();/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var qu={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fu=kr.forwardRef(({color:b="currentColor",size:M=24,strokeWidth:d=2,absoluteStrokeWidth:sn,className:R="",children:z,iconNode:an,...un},q)=>kr.createElement("svg",{ref:q,...qu,width:M,height:M,stroke:b,strokeWidth:sn?Number(d)*24/Number(M):d,className:Hs("lucide",R),...un},[...an.map(([kn,hn])=>kr.createElement(kn,hn)),...Array.isArray(z)?z:[z]]));/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=(b,M)=>{const d=kr.forwardRef(({className:sn,...R},z)=>kr.createElement(Fu,{ref:z,iconNode:M,className:Hs(`lucide-${zu(b)}`,sn),...R}));return d.displayName=`${b}`,d};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nf=se("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ef=se("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tf=se("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rf=se("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=se("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=se("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const of=se("Headphones",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=se("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sf=se("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const af=se("Network",[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=se("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]),Ts={title:"急危重症护理学",publisher:"",author:"",isbn:"",totalChapters:4,completedChapters:0,readMinutes:0,totalMinutes:72,streakDays:0,chapters:[{id:"ch1",title:"第一章 急危重症护理学基础知识",section:"模块一",status:"learning",summary:"急危重症护理学基础以急救医疗服务体系为框架，涵盖院前急救、急诊科救护与重症监护，如院前心肺复苏。未涉及具体操作细节。",sourceModuleId:"module2",subSections:[{id:"ch1-1",title:"第一节 急危重症护理学概况",completed:!1},{id:"ch1-2",title:"第二节 急救医疗服务体系",completed:!1},{id:"ch1-3",title:"第三节 院前急救",completed:!1},{id:"ch1-4",title:"第四节 急诊科救护",completed:!1},{id:"ch1-5",title:"第五节 重症监护",completed:!1}]},{id:"ch2",title:"第二章 常用救护技术",section:"模块二",status:"not-started",summary:"常用救护技术是急救核心技能，涵盖心肺复苏、气道管理、创伤处理等要点。例如胸外按压。未涉及具体药物使用。",sourceModuleId:"module3",subSections:[{id:"ch2-1",title:"第一节 心肺脑复苏术",completed:!1},{id:"ch2-2",title:"第二节 通畅气道术",completed:!1},{id:"ch2-3",title:"第三节 创伤急救技术",completed:!1},{id:"ch2-4",title:"第四节 呼吸支持技术",completed:!1},{id:"ch2-5",title:"第五节 洗胃术",completed:!1},{id:"ch2-6",title:"第六节 常用的重症监护技术",completed:!1}]},{id:"ch3",title:"第三章 常见急危重症患者的救护",section:"模块三",status:"not-started",summary:"本章聚焦常见急危重症的救护原则与方法，涵盖急性中毒、环境损伤及常见急症的现场处理，如一氧化碳中毒的急救，未涉及心脑血管急症的详细诊疗。",sourceModuleId:"module4",subSections:[{id:"ch3-1",title:"第一节 急性中毒患者的救护",completed:!1},{id:"ch3-2",title:"第二节 环境及理化因素损伤患者的救护",completed:!1},{id:"ch3-3",title:"第三节 常见急症患者的救护",completed:!1}]},{id:"ch4",title:"第四章 灾害事故的现场救护",section:"模块四",status:"not-started",summary:"灾害现场救护核心是快速检伤分类与精准施救，包括概述灾害特点、检伤分类原则、常见灾害现场救护方法。例如地震中按红黄绿黑分级处理。未涉及心理干预。",sourceModuleId:"module5",subSections:[{id:"ch4-1",title:"第一节 概述",completed:!1},{id:"ch4-2",title:"第二节 灾害现场检伤分类",completed:!1},{id:"ch4-3",title:"第三节 常见灾害事故的现场救护",completed:!1}]}],ankiCards:[],audioLessons:[],checklists:[],mindMapNodes:[{id:"ch1",label:"第一章 急危重症护理学基础知识",status:"learning",angle:0},{id:"ch2",label:"第二章 常用救护技术",status:"not-started",angle:90},{id:"ch3",label:"第三章 常见急危重症患者的救护",status:"not-started",angle:180},{id:"ch4",label:"第四章 灾害事故的现场救护",status:"not-started",angle:270}]},Rs={audioCourse:!0,video:!1,knowledgeMap:!0,anki:!0,chapterContent:!0,agent:!0},Wu=[{key:"anki",label:"Anki卡片",icon:"🗂️"},{key:"audio",label:"音频课",icon:"🎧"},{key:"mindmap",label:"知识地图",icon:"🗺️"},...Rs.video?[{key:"checklist",label:"视频清单",icon:"🎬"}]:[]],ff=Object.freeze(Object.defineProperty({__proto__:null,MODULES:Rs,TOOLS:Wu,bookData:Ts,default:Ts},Symbol.toStringTag,{value:"Module"})),Qu={flashcards:[{id:"ch1-f1",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"急救医疗服务体系（EMSS）的概念是什么？",answer:"集院前急救、院内急诊科救护、重症监护室救治和各专科治疗的“生命绿色通道”为一体的急救网络。",keyPoint:"EMSS定义",explanation:"EMSS强调院前、院内、ICU各环节紧密衔接，形成科学高效的急救体系。"},{id:"ch1-f2",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"EMSS在概念上强调急诊的哪四个特性？",answer:"即刻性、连续性、层次性和系统性。",keyPoint:"EMSS特性",explanation:"这些特性保障了急诊医疗的及时、连贯、分级和整体协调。"},{id:"ch1-f3",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"EMSS的主要目标是什么？",answer:"建立一个组织结构严密、行动迅速并能实施有效救治的医疗组织，提供快速、合理、及时的处理，安全转送患者到医院并进一步有效救治。",keyPoint:"EMSS目标",explanation:"核心是快速、有效、安全地救治伤病员。"},{id:"ch1-f4",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"哪个国家最早组建EMSS？",answer:"法国。",keyPoint:"EMSS起源",explanation:"法国是第一个系统化建立EMSS的国家。"},{id:"ch1-f5",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"美国颁布EMSS法案是在哪一年？",answer:"1973年。",keyPoint:"美国EMSS立法",explanation:"美国总统颁布EMSS法案标志着美国急救服务进入规范化阶段。"},{id:"ch1-f6",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"我国EMSS起源于什么时候？",answer:"抗日战争和解放战争时期的战地初级救护和快速转运。",keyPoint:"我国EMSS起源",explanation:"早期经验为后来城市急救体系建设奠定了基础。"},{id:"ch1-f7",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"我国EMSS进入快速发展阶段是在什么时候？",answer:"20世纪80年代（1980年卫生部颁发第一个急救文件后）。",keyPoint:"我国EMSS发展阶段",explanation:"1980年《关于加强城市急救工作的意见》标志着我国EMSS正式迈入快速发展期。"},{id:"ch1-f8",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"我国院前医疗急救标识的核心元素是什么？",answer:"生命之星，蛇杖，6个功能方向，长城，橄榄枝。",keyPoint:"急救标识",explanation:"生命之星是国际标志，我国加入长城和橄榄枝体现中国特色与生命希望。"},{id:"ch1-f9",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"生命之星6个方向分别代表什么？",answer:"发现、报告、反应、现场抢救、运输途中监护、转至院内救治。",keyPoint:"生命之星六功能",explanation:"完整概括了EMSS从现场到医院的六个关键步骤。"},{id:"ch1-f10",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"院前急救的定义是什么？",answer:"在医院之外的环境中对各种遭受危及生命的急症、创伤、中毒、灾难事故等伤病员进行的现场救护、转运及途中监护的总称。",keyPoint:"院前急救定义",explanation:"从发病或受伤到进入医院之前的阶段。"},{id:"ch1-f11",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"院前急救的特点有哪些？",answer:"社会性强、随机性强、时间紧迫、复杂性、现场条件受限（艰难性）。",keyPoint:"院前急救特点",explanation:"这些特点要求急救人员具备应变能力和综合技能。"},{id:"ch1-f12",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"院前急救的主要任务包括哪些？",answer:"承担平时呼救患者急救、灾害或战争伤员急救、特殊任务救护、通信网络枢纽任务、普及急救知识和技能。",keyPoint:"院前急救任务",explanation:"日常急救是最主要任务，灾害和特殊任务体现应急能力。"},{id:"ch1-f13",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"院前急救的总原则是什么？",answer:"先救命后治病。",keyPoint:"总原则",explanation:"所有原则围绕保护生命、降低死亡率和致残率。"},{id:"ch1-f14",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"院前急救的具体原则有哪些？（列举至少4条）",answer:"先排险后救治、先复苏后治伤、先重伤后轻伤、先止血后包扎、先救治后运送、急救与呼救并重。",keyPoint:"具体原则",explanation:"这些原则指导现场急救的优先顺序和操作步骤。"},{id:"ch1-f15",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"急救半径的定义是什么？城市建成区急救半径要求为多少？",answer:"急救单元所执行院前急救服务区域的半径；城市建成区≤5km。",keyPoint:"急救半径",explanation:"半径越小，患者获得救治越快。"},{id:"ch1-f16",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"急救反应时间的定义及市区要求是多少？",answer:"急救中心接到电话至急救车到达现场所需时间；市区要求15min以内，条件好区域10min以内。",keyPoint:"反应时间",explanation:"反应时间直接影响急救效果。"},{id:"ch1-f17",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"院前急救组织的必备条件有哪些？",answer:"通信指挥系统、运输工具、急救医疗队伍。",keyPoint:"组织必备条件",explanation:"三要素缺一不可，是高效运转的基础。"},{id:"ch1-f18",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"我国目前最常用的院前急救运输工具是什么？",answer:"救护车。",keyPoint:"运输工具",explanation:"救护车是陆地急救主要载体，航空和水上工具逐步发展。"},{id:"ch1-f19",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"英美模式与欧洲模式的核心区别是什么？",answer:"英美模式强调快速转运（急），欧洲模式强调现场救治（救），类似移动ICU。",keyPoint:"模式区别",explanation:"英美模式重视速度，欧洲模式重视院前深度救治。"},{id:"ch1-f20",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"我国院前急救模式中具有代表性的四种模式是哪四种？",answer:"独立型、依托型、行政型、院前型。",keyPoint:"中国模式分类",explanation:"各地区根据自身医疗基础选择不同模式，目前互相学习完善。"},{id:"ch1-f21",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"现场评估时首先要评估什么？",answer:"现场环境安全。",keyPoint:"现场评估顺序",explanation:"确保救援者、伤员和旁观者安全后再进行病情评估。"},{id:"ch1-f22",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"快速评估病情包括哪几个方面？",answer:"意识、气道、呼吸、脉搏（循环）。",keyPoint:"病情评估要点",explanation:"按照ABC原则（Airway, Breathing, Circulation）快速判断。"},{id:"ch1-f23",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"判断呼吸是否存在的方法是什么？",answer:"将面颊靠近患者口鼻，“一听”有无呼吸音，“二看”胸廓起伏，“三感觉”有无气体逸出，判断5～10秒。",keyPoint:"呼吸判断",explanation:"简洁有效，适合现场快速评估。"},{id:"ch1-f24",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"对危重症患者保持呼吸道通畅的最佳体位是什么？",answer:"去枕平卧、头偏向一侧。",keyPoint:"体位管理",explanation:"防止舌后坠和误吸。"},{id:"ch1-f25",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"国际上通用的应急电话号码（英美模式）是什么？",answer:"统一的应急电话号码，集消防、警察和医疗急救为一体（如911）。",keyPoint:"应急号码",explanation:"统一号码便于公众记忆和快速响应。"},{id:"ch1-f26",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"法国紧急医疗救助体系（SAMU）的特点是什么？",answer:"对消防部门等救助机构具有调度指挥和协同权力，私人救护车、红十字协会等为辅助。",keyPoint:"法国模式特点",explanation:"高度协调和集中指挥。"},{id:"ch1-f27",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"院前急救原则中“先排险后救治”的典型例子是什么？",answer:"气体中毒者先脱离危险环境，确保安全后再急救。",keyPoint:"排险示例",explanation:"防止二次伤亡。"},{id:"ch1-f28",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"普及社会急救的目的是什么？",answer:"使群众掌握现场急救知识和基本技术，能在专业队伍到达前进行自救和互救。",keyPoint:"社会急救意义",explanation:"提高早期存活率，弥补院前急救空窗期。"},{id:"ch1-f29",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"我国EMSS运行示意图中包括哪三个主要部分？",answer:"院前急救中心（站）、医院急诊科、重症或专科监护室。",keyPoint:"我国EMSS组成",explanation:"三者有机联系，形成完整急救网络。"},{id:"ch1-f30",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"1995年4月卫生部发布的灾害事故医疗救援管理办法名称是什么？",answer:"《灾害事故医疗救援工作管理办法》。",keyPoint:"管理办法",explanation:"进一步规范了灾害医疗救援工作。"},{id:"ch2-f1",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心搏骤停的概念是什么？",answer:"心脏因急性原因突然丧失有效的排血功能，导致循环和呼吸功能停止，全身血液循环停滞，组织缺血、缺氧。",keyPoint:"心脏丧失排血功能，循环呼吸停止",explanation:"心搏骤停患者处于临床死亡期，及时救治可存活，否则迅速发生不可逆生物学死亡。"},{id:"ch2-f2",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心脏性猝死与心搏骤停的根本区别是什么？",answer:"心搏骤停通过紧急治疗有逆转的可能，而心脏性猝死是生物学功能不可逆转的停止。",keyPoint:"心搏骤停可逆转，心脏性猝死不可逆",explanation:"早期识别心搏骤停是实施CPR的前提，可减少生物学死亡。"},{id:"ch2-f3",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"成人心搏骤停最常见的心源性原因是什么？",answer:"冠心病，尤其是急性冠脉综合征（如急性心肌梗死或不稳定型心绞痛）常引发心室颤动或心室停搏。",keyPoint:"冠心病是成人心搏骤停最主要原因"},{id:"ch2-f4",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"列举至少三种非心源性心搏骤停的原因。",answer:"溺水、窒息、电击、中毒、麻醉或手术意外、严重的电解质与酸碱平衡失调等。",keyPoint:"非心源性原因包括溺水、窒息、电击等"},{id:"ch2-f5",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心搏骤停的三种心电图类型是什么？",answer:"心室颤动、心脏停搏、心脏电机械分离。",keyPoint:"室颤、停搏、电机械分离",explanation:"其中室颤最常见，早期除颤复苏成功率高。"},{id:"ch2-f6",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心室颤动的心电图特征是什么？",answer:"QRS波群消失，代之以大小不等、形态各异的颤动波，频率200~400次/分。",keyPoint:"QRS消失，颤动波，频率200-400",explanation:"波幅高频率快易复律，波幅低频率慢多为心脏停搏先兆。"},{id:"ch2-f7",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心脏停搏的心电图表现是什么？",answer:"多呈一条直线，或偶见P波。",keyPoint:"直线或偶见P波"},{id:"ch2-f8",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心脏电机械分离的心电图特点是什么？",answer:"间断出现宽而畸形、波幅较低的QRS波群，频率多在30次/分以下。",keyPoint:"宽畸形QRS，波幅低，频率<30次/分",explanation:"心肌有电活动但无有效机械收缩。"},{id:"ch2-f9",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心搏骤停最可靠且出现较早的临床征象是什么？",answer:"意识丧失伴大动脉搏动消失。",keyPoint:"意识丧失+大动脉搏动消失",explanation:"触摸颈动脉判断，时间不超过10秒。"},{id:"ch2-f10",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"2020年AHA指南中，非专业人员如何判断是否需要开始心肺复苏？",answer:"患者无意识、无呼吸或呼吸不正常（喘息），即可立即进行心肺复苏。",keyPoint:"无意识+无呼吸/喘息即开始CPR",explanation:"非专业人员不要求判断脉搏。"},{id:"ch2-f11",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心肺脑复苏（CPCR）包括哪三部分？",answer:"基础生命支持（BLS）、进一步生命支持（ACLS）、延续生命支持（PLS）。",keyPoint:"BLS、ACLS、PLS"},{id:"ch2-f12",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"基础生命支持（BLS）的CABD四步分别指什么？",answer:"C胸外心脏按压，A开放气道，B人工呼吸，D除颤。",keyPoint:"CABD：按压、气道、呼吸、除颤",explanation:"2020年指南强调先按压后通气（C-A-B）。"},{id:"ch2-f13",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"胸外心脏按压的成人按压部位在哪里？",answer:"胸部正中，胸骨下半部，相当于男性两乳头连线中点处的胸骨。",keyPoint:"胸骨下半部，两乳头连线中点"},{id:"ch2-f14",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"成人胸外心脏按压的推荐深度和频率是多少？",answer:"深度至少5cm（通常5~6cm），频率100~120次/分。",keyPoint:"深度5-6cm，频率100-120次/分",explanation:"按压与放松时间相等，放松时掌根不离开胸壁。"},{id:"ch2-f15",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"成人单人心肺复苏时，按压与通气的比例是多少？",answer:"30:2，即每30次胸外按压后给予2次人工呼吸。",keyPoint:"30:2",explanation:"5个循环（约2分钟）为一个周期。"},{id:"ch2-f16",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"开放气道最常用的方法是什么？适用于何种情况？",answer:"仰头举颏法，适用于没有头或颈部创伤的患者。",keyPoint:"仰头举颏法，无颈椎损伤",explanation:"颈椎损伤患者应使用双手托颌法。"},{id:"ch2-f17",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"双手托颌法的适用对象是什么？",answer:"怀疑有颈部损伤的患者。",keyPoint:"怀疑颈椎损伤时使用"},{id:"ch2-f18",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"口对口人工呼吸时，每次吹气时间、吹气量及频率是多少？",answer:"吹气时间>1秒，吹气量500~600mL，频率10~12次/分。",keyPoint:"吹气>1秒，500-600mL，10-12次/分",explanation:"以胸廓抬起为有效标志。"},{id:"ch2-f19",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"口对鼻人工呼吸适用于哪些情况？",answer:"牙关紧闭、口不能张开、口对口封闭困难、口腔严重外伤等。",keyPoint:"不能经口吹气时使用",explanation:"鼻出血或鼻阻塞时禁用。"},{id:"ch2-f20",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"早期除颤对心室颤动的意义是什么？",answer:"治疗心室颤动最有效的方法是电除颤，心搏骤停后应力争在3分钟内进行首次电除颤。",keyPoint:"电除颤是室颤最有效治疗，争取3分钟内除颤",explanation:"CPR可延长室颤时间，与除颤联合使用。"},{id:"ch2-f21",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心肺复苏有效的表现有哪些？（至少列出4点）",answer:"①出现自主呼吸；②可触及大动脉搏动；③颜面口唇转为红润；④瞳孔缩小，对光反射恢复；⑤收缩压≥60mmHg。",keyPoint:"自主呼吸、大动脉搏动、面色红润、瞳孔缩小、收缩压≥60"},{id:"ch2-f22",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心肺复苏终止的指标有哪些？",answer:"①心肺复苏成功；②抢救持续1小时仍无心搏和脉搏；③脑死亡。",keyPoint:"成功、1小时无效、脑死亡"},{id:"ch2-f23",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心搏骤停后，脑组织对缺血缺氧最敏感，多长时间内进行BLS可提高存活率？",answer:"4分钟内进行BLS，8分钟内进行心脏除颤，存活率可达40%。",keyPoint:"4分钟BLS，8分钟除颤",explanation:"抢救越早成功率越高。"},{id:"ch2-f24",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"判断颈动脉搏动时，触摸位置在哪里？时间不超过多少秒？",answer:"平喉结向靠近救护者近侧的颈部滑行2~3cm，至胸锁乳突肌内侧凹陷处；时间不超过10秒。",keyPoint:"喉结旁滑2-3cm，胸锁乳突肌内侧，<10秒",explanation:"不可用力过猛，两侧不能同时触摸。"},{id:"ch2-f25",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"除颤时，目击到成人心搏骤停且AED可立即取得时，应如何操作？",answer:"应尽快使用AED；若未受监控或不能立即取得AED，则先开始CPR，待AED可用后尽快除颤。",keyPoint:"目击时尽快用AED，否则先CPR后除颤"},{id:"ch2-f26",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"2010年AHA指南将A-B-C改为C-A-B的主要目的是什么？",answer:"尽快开始胸外心脏按压，减少因开放气道和人工呼吸造成的按压延误，鼓励更多施救者立即实施CPR。",keyPoint:"减少按压延误，鼓励施救",explanation:"室颤/无脉性VT患者关键操作是按压和早期除颤。"},{id:"ch2-f27",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"洗胃的适应证和禁忌证（仅从章节目标中提取，原文未详述，但章节目标要求掌握）",answer:"章节目标要求掌握洗胃的方法、适应证和禁忌证，但本章正文未具体列出。请参考其他资料。",keyPoint:"按目标需掌握",explanation:"此知识点需结合教材其他章节或临床实践。"},{id:"ch2-f28",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"重症监护常用监测指标的正常值和临床意义（章节目标要求掌握，但正文未详述）",answer:"属于章节知识目标，但本章正文未展开。需结合其他教材内容。",keyPoint:"按目标需掌握",explanation:"请参考重症监护相关章节。"},{id:"ch3-f1",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"什么是急性中毒？",answer:"机体一次接触大量毒物或24h内多次暴露于某种或某些毒物所致的中毒。",keyPoint:"大量毒物或24h内多次暴露",explanation:"与慢性中毒相对，后者是长时间暴露、毒物蓄积所致。"},{id:"ch3-f2",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"毒物进入人体的主要途径有哪些？",answer:"呼吸道、皮肤黏膜和消化道。",keyPoint:"三种途径：呼吸道、皮肤黏膜、消化道",explanation:"不同途径对应不同清除措施。"},{id:"ch3-f3",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"急性中毒救护的五大原则是什么？",answer:"立即终止接触毒物、清除尚未吸收的毒物、促进已吸收毒物的排出、应用特殊解毒剂、紧急复苏和对症支持治疗。",keyPoint:"终止接触、清除、促进排出、解毒剂、对症支持",explanation:"这是急救处理的核心框架。"},{id:"ch3-f4",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"清除尚未吸收的毒物时，针对食入性中毒常用哪些方法？",answer:"催吐、洗胃、导泻、灌肠和使用吸附剂。",keyPoint:"催吐、洗胃、导泻、灌肠、吸附剂",explanation:"催吐用于神志清醒配合者；洗胃可配合吸附剂；导泻常用硫酸钠或硫酸镁；灌肠用于口服中毒6h以上。"},{id:"ch3-f5",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"哪些情况下不宜用硫酸镁导泻？",answer:"昏迷患者或中毒者心、肾功能不全时不宜用硫酸镁导泻。",keyPoint:"昏迷、心肾功能不全禁用",explanation:"硫酸镁可致高镁血症，抑制中枢和心肌。"},{id:"ch3-f6",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"促进已吸收毒物排出的常用方法有哪些？",answer:"利尿、吸氧和血液净化。",keyPoint:"利尿、吸氧、血液净化",explanation:"利尿使用呋塞米并改变尿液酸碱度；吸氧对气体中毒有效；血液净化包括透析、灌流等。"},{id:"ch3-f7",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"哪些毒物中毒可用阿托品作为特殊解毒剂？",answer:"有机磷农药中毒。",keyPoint:"有机磷农药中毒用阿托品",explanation:"阿托品可拮抗毒蕈碱样症状，但需与胆碱酯酶复活剂联用。"},{id:"ch3-f8",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒的主要机制是什么？",answer:"抑制体内胆碱酯酶的活性，使乙酰胆碱积聚，引起胆碱能神经先兴奋后抑制。",keyPoint:"抑制胆碱酯酶→乙酰胆碱积聚",explanation:"形成磷酰化胆碱酯酶，无分解乙酰胆碱能力。"},{id:"ch3-f9",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒的毒蕈碱样症状（M样症状）有哪些表现？",answer:"平滑肌痉挛（瞳孔缩小、腹痛、腹泻、大小便失禁）和腺体分泌增加（大汗、流泪、流涎），气道分泌物增多可致肺水肿。",keyPoint:"平滑肌痉挛+腺体分泌增加",explanation:"出现最早，由副交感神经过度兴奋所致。"},{id:"ch3-f10",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒的烟碱样症状（N样症状）有哪些表现？",answer:"肌纤维颤动、全身强直性痉挛、肌力减退、瘫痪，呼吸肌麻痹可致呼吸衰竭；交感神经兴奋致血压升高、心律失常。",keyPoint:"肌束颤动、瘫痪、呼吸肌麻痹",explanation:"由乙酰胆碱在横纹肌神经肌肉接头处蓄积所致。"},{id:"ch3-f11",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒的中枢神经系统症状有哪些？",answer:"头晕、头痛、疲乏、共济失调、烦躁不安，严重者谵妄、抽搐、昏迷、中枢性呼吸衰竭。",keyPoint:"从头晕到昏迷、呼吸衰竭",explanation:"乙酰胆碱刺激中枢神经所致。"},{id:"ch3-f12",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"什么是有机磷农药中毒后的“反跳现象”？",answer:"经急救后临床症状好转，在2天至1周内突然急剧恶化，重新出现急性中毒症状，甚至发生肺水肿或死亡。",keyPoint:"症状好转后突然恶化",explanation:"可能与毒物残留或解毒剂用量不足有关。"},{id:"ch3-f13",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"什么是有机磷农药中毒的“中间型综合征”？",answer:"在急性症状缓解后1~4天突然发生以呼吸肌麻痹为主的症状群，包括肢体近端肌肉、脑神经支配的肌肉及呼吸肌麻痹。",keyPoint:"缓解后1~4天呼吸肌麻痹",explanation:"发病机制为胆碱酯酶长期受抑制影响神经肌肉接头功能。"},{id:"ch3-f14",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"什么是有机磷农药中毒的“迟发性神经病变”？",answer:"重度中毒症状消失后2~3周发生的多发性周围神经病变，表现为感觉、运动型多发性神经病变，可致下肢瘫痪、四肢肌肉萎缩。",keyPoint:"2~3周后周围神经病变",explanation:"可能与有机磷抑制神经靶酯酶并使其老化有关。"},{id:"ch3-f15",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒患者呼出气体有何特殊气味？",answer:"大蒜味。",keyPoint:"大蒜味",explanation:"其他毒物也有特殊气味，如氰化物有苦杏仁味。"},{id:"ch3-f16",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒时瞳孔有何变化？",answer:"瞳孔缩小。",keyPoint:"瞳孔缩小",explanation:"阿托品中毒则瞳孔扩大。"},{id:"ch3-f17",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒实验室检查最关键的指标是什么？",answer:"全血胆碱酯酶活力降低。",keyPoint:"全血胆碱酯酶活力",explanation:"案例中患者全血胆碱酯酶活力25%，显著降低。"},{id:"ch3-f18",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"口服有机磷农药中毒后多长时间发病？",answer:"口服后10分钟至2小时发病。",keyPoint:"10分钟至2小时",explanation:"经皮肤吸收需2~6小时，吸入约30分钟。"},{id:"ch3-f19",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"皮肤接触有机磷农药后应如何清除？",answer:"立即用大量清水冲洗皮肤、毛发、指甲，强腐蚀性毒物冲洗15~30分钟后可用中和剂。",keyPoint:"大量清水冲洗",explanation:"需除去污染衣物。"},{id:"ch3-f20",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"中毒患者出现肺水肿时应如何处理？",answer:"保持呼吸道通畅，给予氧气吸入，必要时使用呼吸机，应用阿托品等药物。",keyPoint:"保持通畅、吸氧、对症治疗",explanation:"有机磷中毒的肺水肿主要由毒蕈碱样症状引起。"},{id:"ch3-f21",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"常用的吸附剂有哪些？",answer:"活性炭和万能解毒剂（活性炭:鞣酸:氧化镁=2:1:1）。",keyPoint:"活性炭、万能解毒剂",explanation:"洗胃时配合使用可吸附、氧化、中和毒物。"},{id:"ch3-f22",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"什么是血液灌流？适用于哪些情况？",answer:"将患者血液引出体外，通过吸附材料清除有害物质后再回输体内，适用于药物中毒等情况。",keyPoint:"吸附材料清除毒物",explanation:"血液净化方法之一，与血液透析原理不同。"},{id:"ch3-f23",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药在体内主要如何代谢？",answer:"主要在肝脏进行氧化和分解，氧化后毒性增强，分解后毒性降低。大部分由肾脏排出。",keyPoint:"肝脏代谢，氧化增毒，分解减毒，肾排泄",explanation:"如对硫磷氧化成对氧磷，毒性增强300倍。"},{id:"ch3-f24",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒患者出现肌纤维颤动属于哪一类症状？",answer:"烟碱样症状（N样症状）。",keyPoint:"烟碱样症状",explanation:"肌纤维颤动是N样症状的典型表现。"},{id:"ch3-f25",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"急性中毒时，皮肤黏膜樱桃红色提示何种毒物中毒？",answer:"一氧化碳、氰化物中毒。",keyPoint:"一氧化碳、氰化物",explanation:"其他如亚硝酸盐中毒引起发绀。"},{id:"ch3-f26",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"中毒后反跳现象通常发生在什么时间？",answer:"有机磷农药中毒经急救后2天至1周内。",keyPoint:"2天至1周",explanation:"需密切观察，预防反跳。"},{id:"ch3-f27",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"急性口服中毒者洗胃后，导泻常用药物有哪些？",answer:"番泻叶、聚乙二醇、硫酸钠或硫酸镁。",keyPoint:"番泻叶、聚乙二醇、硫酸钠、硫酸镁",explanation:"昏迷者不宜用硫酸镁。"},{id:"ch3-f28",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒的特殊解毒剂包括哪些？",answer:"阿托品（抗胆碱药）和胆碱酯酶复活剂（如解磷定、氯磷定）。",keyPoint:"阿托品+胆碱酯酶复活剂",explanation:"阿托品缓解M样症状，复活剂恢复胆碱酯酶活性。"},{id:"ch3-f29",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"一氧化碳中毒时，吸氧的作用是什么？",answer:"使碳氧血红蛋白分离，加速一氧化碳排出。",keyPoint:"分离碳氧血红蛋白",explanation:"高压氧效果更好。"},{id:"ch4-f1",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"什么是灾害？世界卫生组织如何定义？",answer:"灾害是指自然或人为因素导致环境突然发生巨变，造成人员伤亡、财产损失和生态破坏的现象。WHO定义为对一个社区或社会功能的严重破坏，其影响超过该社区或社会应用自身资源应对的能力。",keyPoint:"灾害定义：自然/人为因素导致严重破坏，超出本地应对能力"},{id:"ch4-f2",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"灾害按发生原因分为哪两类？",answer:"自然灾害（如地震、洪水、台风）和人为灾害（如火灾、交通事故、战争）。",keyPoint:"分类：自然灾害、人为灾害"},{id:"ch4-f3",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"什么是原生灾害、次生灾害和衍生灾害？",answer:"原生灾害：灾害链中最早发生的起主导作用的灾害（如地震）。次生灾害：由原生灾害引发的灾害（如地震引起的泥石流）。衍生灾害：灾害发生后破坏人类生存和谐条件引发的一系列其他灾害（如地震后停产、社会恐慌）。",keyPoint:"原生灾害→次生灾害→衍生灾害"},{id:"ch4-f4",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"突发灾害与渐变灾害的区别是什么？",answer:"突发灾害：突然发生、难以预测、危害巨大（如地震、火山爆发）。渐变灾害：发生缓慢、影响时间长、范围大、具有隐蔽性（如土地沙漠化、水土流失）。",keyPoint:"突发：突然、难预测；渐变：缓慢、隐蔽"},{id:"ch4-f5",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"灾害事故现场救护有哪些特点？",answer:"紧迫性（时间就是生命）、艰难性（条件复杂、物资匮乏）、繁重性（伤员多、伤情复杂）、涉及部门广（需多部门协作）。",keyPoint:"4特点：紧迫、艰难、繁重、多部门协作"},{id:"ch4-f6",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"灾害医疗救援人员的职业安全防护包括哪些措施？",answer:"免疫预防（主动/被动免疫）、标准预防（正确使用防护物品、手卫生、消毒隔离、预防锐器伤）、职业暴露应急处理（局部处理、全身防疫、及时报告）。",keyPoint:"三类防护：免疫预防、标准预防、职业暴露处理"},{id:"ch4-f7",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"灾害现场检伤分类的原则有哪些？",answer:"简单快速（≤1分钟/人）、分类分级（先重后轻）、救命优先（可先抢救后分类）、自主决策（根据资源决定流向）、重复检伤（动态评估）、公平有效（挽救更多伤员）。",keyPoint:"6原则：简单快速、分类分级、救命优先、自主决策、重复检伤、公平有效"},{id:"ch4-f8",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"检伤分类的三种类型分别是什么？",answer:"收容分类（快速识别需优先抢救伤员，脱离危险环境）、救治分类（区分轻中重伤确定救治顺序）、后送分类（根据紧迫性、耐受性等决定转运顺序和工具）。",keyPoint:"三类型：收容、救治、后送"},{id:"ch4-f9",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"START检伤分类方法如何分组？",answer:"基于呼吸、心跳及意识状况，将伤员分为红（紧急）、黄（延迟）、绿（轻伤）、黑（死亡）四组。评估和处置时间不超过30秒。",keyPoint:"START：红黄绿黑，30秒/人"},{id:"ch4-f10",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"Jump START适用于什么人群？与START有何不同？",answer:"适用于1~8岁儿童。分组方法和分类依据与START相似，但根据儿童生理特点调整了相关生理参数。",keyPoint:"Jump START：1-8岁儿童，参数调整"},{id:"ch4-f11",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"SALT检伤分类系统的全称及含义？",answer:"SALT：Sort（分类）、Assessment（评估）、Life-saving intervention（挽救生命的干预）、Treatment/Transport（处置/转运）。适用于大规模伤亡事件。",keyPoint:"SALT：分类-评估-救命干预-处置/转运"},{id:"ch4-f12",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"检伤分类中红色、黄色、绿色、黑色分别代表什么？",answer:"红色：紧急，需优先抢救；黄色：延迟，伤情较重但稳定；绿色：轻伤，可暂缓处理；黑色：死亡或濒死无存活希望。",keyPoint:"色标：红紧急、黄延迟、绿轻伤、黑死亡"},{id:"ch4-f13",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"地震造成的主要伤情有哪些？",answer:"机械性损伤（四肢骨折最常见）、坠落伤、完全性饥饿、挤压综合征、次生灾害致伤（烧伤、淹溺、中毒等）。",keyPoint:"5种伤情：机械伤、坠落伤、饥饿、挤压综合征、次生伤害"},{id:"ch4-f14",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"地震现场救护的原则是什么？",answer:"先近后远，先易后难，先挖后救，先救命后治伤，先救幸存者后处置遗体。",keyPoint:"原则：先近/易/挖/救命/幸存者"},{id:"ch4-f15",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"什么是挤压综合征？",answer:"长时间受坍塌重物挤压，引起肌肉组织缺血性坏死并释放大量有害物质入血，导致休克和肾衰竭。",keyPoint:"挤压综合征：肌肉坏死、毒素入血、休克肾衰"},{id:"ch4-f16",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"火灾吸入性损伤轻度的表现是什么？",answer:"损伤在声门以上（鼻、咽、声门），表现为黏膜充血肿胀、水疱、糜烂，伤员出现喘息、声音嘶哑、吞咽困难，小儿可窒息死亡。",keyPoint:"轻度：声门以上，喘息、嘶哑、吞咽困难"},{id:"ch4-f17",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"火灾吸入性损伤中度的损伤范围？",answer:"气管隆嵴水平以上（包括喉和气管），伤员出现喘息及支气管痉挛。",keyPoint:"中度：喉和气管，喘息+支气管痉挛"},{id:"ch4-f18",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"火灾吸入性损伤重度的特点？",answer:"支气管和肺泡水平以上损伤，伤员立即或短期内出现严重呼吸困难，很快因呼吸衰竭死亡。",keyPoint:"重度：支气管肺泡，严重呼吸困难→呼衰死亡"},{id:"ch4-f19",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"烧伤面积新九分法中头颈部、双上肢、躯干、双下肢各占多少？",answer:"头颈部9%，双上肢18%，躯干前后（含会阴）27%，双下肢（含臀部）46%。",keyPoint:"新九分法：头9、上肢18、躯干27、下肢46"},{id:"ch4-f20",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"烧伤现场救护的首要步骤是什么？",answer:"迅速脱离热源，除去燃烧衣物，用冷水冲洗或浸泡伤处降温，同时紧急呼救启动EMSS。",keyPoint:"首要：脱离热源、冷水降温、呼救"},{id:"ch4-f21",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"水灾后常见的人员伤情有哪几种？",answer:"淹溺、机械性损伤、触电、虫蛇咬伤、传染性疾病。",keyPoint:"5种伤情：淹溺、机械伤、触电、虫蛇咬伤、传染病"},{id:"ch4-f22",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"淹溺抢救的黄金时间是多少？为什么？",answer:"1~2分钟内正确救护，成功率几乎100%；超过4~6分钟可引起呼吸心跳停止，6~9分钟死亡率达65%。",keyPoint:"黄金时间：1-2分钟，争分夺秒"},{id:"ch4-f23",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"水灾后传染病防控应从哪三个环节入手？",answer:"管理传染源、切断传播途径、保护易感人群。",keyPoint:"三环节：传染源、传播途径、易感人群"},{id:"ch4-f24",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"道路交通事故的伤情特点是什么？",answer:"通常瞬间发生，严重时现场车毁人亡，伤亡人员伤情复杂且多伴随多发伤。",keyPoint:"特点：瞬间发生、车毁人亡、伤情复杂"},{id:"ch4-f25",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"哪些情况应暂缓转运伤员？",answer:"休克未纠正、血流动力学不稳定；颅脑外伤疑有颅内高压可能脑疝；颈髓损伤有呼吸功能障碍；心脏等脏器衰竭；胸腹部损伤不稳定；伤员或家属依从性差。",keyPoint:"6种暂缓：休克、颅高压、颈髓伤、脏器衰、胸腹不稳、不依从"}],quizQuestions:[{id:"ch1-q1",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"急救医疗服务体系在概念上强调急诊的哪四个特性？",options:[{id:"a",text:"即刻性、连续性、层次性和系统性",correct:!0},{id:"b",text:"紧急性、连续性、层次性和系统性",correct:!1},{id:"c",text:"即刻性、分段性、层次性和系统性",correct:!1},{id:"d",text:"即刻性、连续性、整体性和系统性",correct:!1}],explanation:"原文明确指出EMSS强调即刻性、连续性、层次性和系统性，其他选项如“紧急性”虽相关但非原文用词，“分段性”、“整体性”不准确。",hint:"注意原文的精确表述。"},{id:"ch1-q2",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"以下哪项不属于院前急救的主要任务？",options:[{id:"a",text:"承担平时呼救患者的急救",correct:!1},{id:"b",text:"承担灾害或战争时伤员的急救",correct:!1},{id:"c",text:"承担特殊任务时的救护",correct:!1},{id:"d",text:"承担医院病区的常规护理工作",correct:!0}],explanation:"院前急救任务包括平时呼救、灾害战争、特殊任务、通信枢纽和普及急救知识，不包括医院病区常规护理。",hint:"区分院外与院内任务。"},{id:"ch1-q3",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"院前急救的总原则是？",options:[{id:"a",text:"先治病后救命",correct:!1},{id:"b",text:"先救命后治病",correct:!0},{id:"c",text:"先转运后救治",correct:!1},{id:"d",text:"先包扎后止血",correct:!1}],explanation:"总原则是“先救命后治病”，优先保障生命，其他原则都是此总原则的具体体现。",hint:"思考急救的优先级。"},{id:"ch1-q4",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"城市建成区急救半径应不超过多少公里？",options:[{id:"a",text:"3km",correct:!1},{id:"b",text:"5km",correct:!0},{id:"c",text:"8km",correct:!1},{id:"d",text:"10km",correct:!1}],explanation:"原文规定城市建成区急救半径≤5km。",hint:"记住关键数字5km。"},{id:"ch1-q5",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"我国院前急救模式中哪种模式的特点是“独立于医院，拥有自己的急救队伍和车辆”？",options:[{id:"a",text:"独立型",correct:!0},{id:"b",text:"依托型",correct:!1},{id:"c",text:"行政型",correct:!1},{id:"d",text:"院前型",correct:!1}],explanation:"独立型模式是指独立的急救中心，不依附于医院，拥有自己的队伍和车辆。",hint:"回顾四种模式的典型特征。"},{id:"ch1-q6",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"英美模式与欧洲模式的核心区别在于：",options:[{id:"a",text:"英美模式强调现场深入救治，欧洲模式强调快速转运",correct:!1},{id:"b",text:"英美模式强调快速转运，欧洲模式强调现场深入救治",correct:!0},{id:"c",text:"英美模式使用救护车，欧洲模式使用直升机",correct:!1},{id:"d",text:"英美模式由警察负责，欧洲模式由医生负责",correct:!1}],explanation:"英美模式突出“急”，快速转运；欧洲模式突出“救”，现场救治如移动ICU。",hint:"理解“急”与“救”的不同侧重。"},{id:"ch1-q7",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"判断呼吸是否存在时，评估时间应为：",options:[{id:"a",text:"3～5秒",correct:!1},{id:"b",text:"5～10秒",correct:!0},{id:"c",text:"10～15秒",correct:!1},{id:"d",text:"15～20秒",correct:!1}],explanation:"原文规定判断时间为5～10秒，过短易漏诊，过长延误抢救。",hint:"记住标准时间窗口。"},{id:"ch1-q8",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"以下哪一项不属于现场快速评估的内容？",options:[{id:"a",text:"意识",correct:!1},{id:"b",text:"气道",correct:!1},{id:"c",text:"血糖值",correct:!0},{id:"d",text:"呼吸和脉搏",correct:!1}],explanation:"现场快速评估重点为意识、气道、呼吸、脉搏（循环），血糖值不是初始评估必须项。",hint:"区分快速评估与后续详细检查。"},{id:"ch2-q1",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心搏骤停最可靠且出现较早的临床征象是？",options:[{id:"a",text:"心音消失",correct:!1},{id:"b",text:"意识丧失伴大动脉搏动消失",correct:!0},{id:"c",text:"双侧瞳孔散大",correct:!1},{id:"d",text:"呼吸停止",correct:!1}],explanation:"意识丧失伴大动脉搏动消失是心搏骤停最早且最可靠的征象，瞳孔散大和呼吸停止出现较晚，心音消失虽典型但不如大动脉搏动判断快速。",hint:"注意最早且最可靠的征象。"},{id:"ch2-q2",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"根据2020年AHA指南，非专业人员判断是否需要开始心肺复苏的依据是？",options:[{id:"a",text:"患者无意识且无脉搏",correct:!1},{id:"b",text:"患者无意识、无呼吸或仅有喘息",correct:!0},{id:"c",text:"患者瞳孔散大固定",correct:!1},{id:"d",text:"患者心电图呈直线",correct:!1}],explanation:"2020指南强调非专业人员不要求判断脉搏，只要患者无反应、无呼吸或呼吸不正常（喘息）即可开始CPR。",hint:"非专业人员简化判断。"},{id:"ch2-q3",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"成人胸外心脏按压的推荐深度和频率分别是多少？",options:[{id:"a",text:"至少3cm，80~100次/分",correct:!1},{id:"b",text:"至少5cm，100~120次/分",correct:!0},{id:"c",text:"至少6cm，120~140次/分",correct:!1},{id:"d",text:"至少4cm，60~80次/分",correct:!1}],explanation:"2020指南推荐成人按压深度至少5cm（通常5~6cm），频率100~120次/分。",hint:"注意深度和频率的具体数值。"},{id:"ch2-q4",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"开放气道时，对于怀疑有颈椎损伤的患者应首选哪种方法？",options:[{id:"a",text:"仰头举颏法",correct:!1},{id:"b",text:"仰头抬颈法",correct:!1},{id:"c",text:"双手托颌法",correct:!0},{id:"d",text:"压额抬颌法",correct:!1}],explanation:"双手托颌法不涉及颈部后仰，可减少颈椎损伤风险，适用于怀疑颈椎损伤的患者。",hint:"颈椎损伤时避免颈部活动。"},{id:"ch2-q5",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心室颤动的心电图特征中，颤动波的频率范围是？",options:[{id:"a",text:"100~200次/分",correct:!1},{id:"b",text:"200~400次/分",correct:!0},{id:"c",text:"400~600次/分",correct:!1},{id:"d",text:"30次/分以下",correct:!1}],explanation:"室颤时心电图表现为大小不等、形态各异的颤动波，频率200~400次/分。",hint:"注意与心脏电机械分离的频率区分。"},{id:"ch2-q6",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"心肺复苏时，每5个循环（约2分钟）应检查一次脉搏，检查时间不应超过多久？",options:[{id:"a",text:"5秒",correct:!1},{id:"b",text:"10秒",correct:!0},{id:"c",text:"15秒",correct:!1},{id:"d",text:"20秒",correct:!1}],explanation:"为了尽量减少按压中断，检查脉搏时间不应超过10秒。",hint:"中断时间应尽可能短。"},{id:"ch2-q7",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"下列哪项不属于心搏骤停的非心源性原因？",options:[{id:"a",text:"溺水",correct:!1},{id:"b",text:"电击",correct:!1},{id:"c",text:"急性心肌梗死",correct:!0},{id:"d",text:"中毒",correct:!1}],explanation:"急性心肌梗死属于心源性原因，是冠心病的一种表现，而非心源性原因包括溺水、电击、中毒等。",hint:"区分心源性与非心源性。"},{id:"ch2-q8",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"关于心脏电机械分离，下列描述正确的是？",options:[{id:"a",text:"心电图呈一条直线",correct:!1},{id:"b",text:"心电图表现为宽而畸形、波幅较低的QRS波群，频率<30次/分",correct:!0},{id:"c",text:"是最常见的心搏骤停类型",correct:!1},{id:"d",text:"除颤效果最好",correct:!1}],explanation:"心脏电机械分离时心肌有电活动但无有效收缩，心电图呈宽而畸形的QRS波群，频率慢。室颤最常见，除颤效果最好。",hint:"注意电机械分离的特点：有电无收缩。"},{id:"ch3-q1",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒患者出现瞳孔缩小、大汗淋漓、流涎、肺部湿啰音，主要属于哪一类症状？",options:[{id:"a",text:"烟碱样症状",correct:!1},{id:"b",text:"毒蕈碱样症状",correct:!0},{id:"c",text:"中枢神经系统症状",correct:!1},{id:"d",text:"迟发性神经病变",correct:!1}],explanation:"瞳孔缩小、大汗、流涎、肺水肿等是副交感神经兴奋的表现，属于毒蕈碱样症状（M样症状）。烟碱样症状主要表现为肌束颤动、肌力减退等。",hint:"注意区分M样和N样症状的表现特点。"},{id:"ch3-q2",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"下列哪项不是急性中毒救护的原则？",options:[{id:"a",text:"立即终止接触毒物",correct:!1},{id:"b",text:"清除尚未吸收的毒物",correct:!1},{id:"c",text:"促进已吸收毒物的排出",correct:!1},{id:"d",text:"立即使用抗生素预防感染",correct:!0}],explanation:"急性中毒救护五大原则不包括抗生素预防感染。抗生素只用于特定感染，不是常规急救原则。",hint:"回顾急性中毒救护五大原则。"},{id:"ch3-q3",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒的反跳现象通常发生在中毒后多长时间？",options:[{id:"a",text:"2～6小时",correct:!1},{id:"b",text:"6～12小时",correct:!1},{id:"c",text:"2天至1周内",correct:!0},{id:"d",text:"2～3周后",correct:!1}],explanation:"反跳现象发生在急性症状好转后2天至1周内，表现为症状突然恶化。2～3周后出现的是迟发性神经病变。",hint:"区分反跳现象与迟发性神经病变的时间点。"},{id:"ch3-q4",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"急性中毒患者，呼出气体有大蒜味，最可能是什么中毒？",options:[{id:"a",text:"氰化物中毒",correct:!1},{id:"b",text:"酒精中毒",correct:!1},{id:"c",text:"有机磷农药中毒",correct:!0},{id:"d",text:"一氧化碳中毒",correct:!1}],explanation:"有机磷农药中毒呼出气有大蒜味；氰化物为苦杏仁味；酒精为酒味；一氧化碳无特殊气味。",hint:"记住各种毒物的特征性气味。"},{id:"ch3-q5",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"关于有机磷农药中毒的中间型综合征，下列描述正确的是？",options:[{id:"a",text:"发生在中毒后立即出现",correct:!1},{id:"b",text:"主要表现为呼吸肌麻痹",correct:!0},{id:"c",text:"属于毒蕈碱样症状",correct:!1},{id:"d",text:"通常2～3周后发生",correct:!1}],explanation:"中间型综合征在急性症状缓解后1～4天突然发生，以呼吸肌麻痹为主。不属于毒蕈碱样症状，也不是立即出现或2～3周后。",hint:"注意中间型综合征与反跳、迟发性神经病变的区别。"},{id:"ch3-q6",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"下列哪种毒物中毒时，皮肤黏膜可呈樱桃红色？",options:[{id:"a",text:"亚硝酸盐",correct:!1},{id:"b",text:"一氧化碳",correct:!0},{id:"c",text:"有机磷农药",correct:!1},{id:"d",text:"吗啡",correct:!1}],explanation:"一氧化碳中毒时形成碳氧血红蛋白，使皮肤黏膜呈樱桃红色。亚硝酸盐中毒引起发绀；有机磷和吗啡中毒无此特征。",hint:"樱桃红色是一氧化碳中毒的典型体征。"},{id:"ch3-q7",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"急性中毒患者洗胃时，常用的吸附剂是？",options:[{id:"a",text:"硫酸镁",correct:!1},{id:"b",text:"活性炭",correct:!0},{id:"c",text:"碳酸氢钠",correct:!1},{id:"d",text:"甘露醇",correct:!1}],explanation:"活性炭是常用的吸附剂，可吸附多种毒物。硫酸镁是导泻药，碳酸氢钠用于碱化尿液，甘露醇用于脑水肿。",hint:"区分吸附剂与其他治疗用药。"},{id:"ch3-q8",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"有机磷农药中毒患者出现肌纤维颤动，属于哪一类症状？",options:[{id:"a",text:"毒蕈碱样症状",correct:!1},{id:"b",text:"烟碱样症状",correct:!0},{id:"c",text:"中枢神经系统症状",correct:!1},{id:"d",text:"局部损伤",correct:!1}],explanation:"肌纤维颤动是乙酰胆碱在横纹肌神经肌肉接头处过度蓄积所致，属于烟碱样症状（N样症状）。",hint:"肌束颤动是N样症状的典型表现。"},{id:"ch4-q1",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"下列哪项属于灾害按发生顺序分类中的“次生灾害”？",options:[{id:"a",text:"地震引起的泥石流",correct:!0},{id:"b",text:"地震本身",correct:!1},{id:"c",text:"地震后的社会恐慌",correct:!1},{id:"d",text:"人为火灾",correct:!1}],explanation:"次生灾害是由原生灾害（如地震）引发的灾害，泥石流是常见次生灾害；社会恐慌属于衍生灾害；地震本身是原生灾害；人为火灾属于按原因分类。",hint:"注意区分原生、次生、衍生"},{id:"ch4-q2",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"关于灾害事故现场救护的特点，哪一项描述不正确？",options:[{id:"a",text:"紧迫性要求迅速反应",correct:!1},{id:"b",text:"艰难性源于交通、物资匮乏",correct:!1},{id:"c",text:"繁重性表现为伤员多、伤情复杂",correct:!1},{id:"d",text:"可预测性使救援可以提前规划",correct:!0}],explanation:"灾害事故现场救护具有紧迫性、艰难性、繁重性和涉及部门广的特点，但灾害通常难以预测，并非可预测。"},{id:"ch4-q3",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"START检伤分类中，每位伤员的评估与处置时间应控制在多少秒内？",options:[{id:"a",text:"10秒",correct:!1},{id:"b",text:"30秒",correct:!0},{id:"c",text:"1分钟",correct:!1},{id:"d",text:"2分钟",correct:!1}],explanation:"START方法强调快速，规定每位伤员评估和处置时间不超过30秒。",hint:"注意区分检伤分类原则中平均1分钟与START的30秒"},{id:"ch4-q4",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"火灾中导致死亡的最主要原因是？",options:[{id:"a",text:"火焰直接烧伤",correct:!1},{id:"b",text:"吸入浓烟致一氧化碳中毒",correct:!0},{id:"c",text:"跳楼逃生",correct:!1},{id:"d",text:"建筑物坍塌砸压",correct:!1}],explanation:"原文指出“火灾中因吸入浓烟而致死者是被火烧死者的数倍，浓烟致死的主要原因是一氧化碳中毒”。"},{id:"ch4-q5",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"烧伤面积新九分法中，双上肢占体表总面积的百分比是？",options:[{id:"a",text:"9%",correct:!1},{id:"b",text:"18%",correct:!0},{id:"c",text:"27%",correct:!1},{id:"d",text:"46%",correct:!1}],explanation:"双上肢占18%，头颈9%，躯干27%，双下肢46%。",hint:"记忆口诀：头9、手18、躯27、腿46"},{id:"ch4-q6",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"水灾中淹溺者抢救的黄金时间一般是多少分钟内？",options:[{id:"a",text:"1-2分钟",correct:!0},{id:"b",text:"4-6分钟",correct:!1},{id:"c",text:"10分钟",correct:!1},{id:"d",text:"30分钟",correct:!1}],explanation:"原文指出：若在1~2分钟内得到正确救护，抢救成功率几乎接近100%。",hint:"淹溺抢救必须争分夺秒，2分钟内最佳"},{id:"ch4-q7",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"下列哪项属于暂缓转运的指征？",options:[{id:"a",text:"股骨开放性骨折",correct:!1},{id:"b",text:"休克未纠正、血流动力学不稳定",correct:!0},{id:"c",text:"左手掌离断伤",correct:!1},{id:"d",text:"皮肤擦伤及裂伤",correct:!1}],explanation:"休克未纠正、血流动力学不稳定是暂缓转运的明确指征；其他选项经现场处置后通常可转运。",hint:"暂缓转运前提是转运可能加重病情或危及生命"},{id:"ch4-q8",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"灾害现场检伤分类的“救命优先”原则是指？",options:[{id:"a",text:"先治疗所有重伤员再分类",correct:!1},{id:"b",text:"直接跳过检伤分类进行救治",correct:!1},{id:"c",text:"先抢救危及生命的情况，再分类或同时进行",correct:!0},{id:"d",text:"优先抢救轻伤员以加快速度",correct:!1}],explanation:"原则明确：一般不包括治疗，但遇气道梗阻等可先抢救后分类或边抢救边分类。",hint:"救命优先不是放弃分类，而是灵活处理"}],feynmanCards:[{id:"ch1-fm1",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"请用自己的话完整解释急救医疗服务体系（EMSS）的含义、组成部分及其功能特点。",answer:"急救医疗服务体系（EMSS）是一个由院前急救、院内急诊科救护和重症监护室救治紧密结合的急救网络，三者通过通信指挥系统、运输工具和专业急救队伍有机衔接，形成一个科学高效的“生命绿色通道”。其功能特点是强调即刻性、连续性、层次性和系统性，既能应对日常急诊，也能处理大型灾害和群体伤亡事件。EMSS的核心目标是在最短时间内提供有效救治，并安全转运患者，降低死亡率和伤残率。",keyPoint:"院前急救，院内急诊科，ICU，生命绿色通道，即刻性，连续性，层次性，系统性，目标",explanation:"EMSS是现代急救医学的基石，理解其整体架构有助于把握急救工作的全局逻辑。"},{id:"ch1-fm2",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"请用自己的话解释院前急救的特点、主要任务和基本原则。",answer:"院前急救的特点包括社会性强、随机性强、时间紧迫、病情复杂以及现场条件受限。其任务主要包括承担日常呼救患者急救、灾害战争伤员急救、特殊任务救护、通信网络枢纽以及普及社会急救知识。基本原则的总纲是“先救命后治病”，具体包括先排险后救治、先复苏后治伤、先重伤后轻伤、先止血后包扎、先救治后运送、急救与呼救并重。这些原则确保现场救护有序高效，最大程度挽救生命。",keyPoint:"社会性强，随机性强，时间紧迫，复杂性，艰难性，任务，原则，先救命后治病",explanation:"院前急救是EMSS的第一个环节，掌握这些特点、任务和原则是从事急救工作的基本要求。"},{id:"ch1-fm3",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"请用自己的话比较英美模式与欧洲模式在院前急救理念上的差异，并说明我国院前急救模式的特点。",answer:"英美模式突出“急”字，核心是快速将伤病员转运到医院，救护车配备简单，强调最短时间内送达急诊；欧洲模式突出“救”字，强调现场深入救治，救护车配备医生和先进设备，类似于移动ICU，待生命体征稳定后再转运。我国院前急救模式介于两者之间，各地区形成了独立型、依托型、行政型和院前型等不同模式，目前正互相借鉴逐步完善，总体趋势是提升现场救治能力与转运效率的平衡。",keyPoint:"英美模式快速转运，欧洲模式现场救治，中国模式多元，独立型，依托型，行政型，院前型",explanation:"不同模式反映了各国医疗资源、地理条件和急救理念的差异，理解这些有助于选择适合国情的急救体系建设方案。"},{id:"ch1-fm4",chapterId:"ch1",chapter:"模块一 · 第一章 急危重症护理学基础知识",question:"请用自己的话描述现场评估与呼救的步骤和要点，并说明为什么个人防护在院前急救中至关重要。",answer:"现场评估首先快速检查环境安全，排除险情，确保救援者、伤员和旁观者不受二次伤害；然后评估病情，重点检查意识、气道、呼吸、脉搏，按照“一听二看三感觉”判断呼吸，5～10秒内完成。呼救时应立即拨打急救电话，准确报告地点、人数和伤情。个人防护至关重要，因为现场可能存在有毒气体、传染病、辐射等潜在危险，防护不到位会导致救援者感染或中毒，不仅无法救人反而增加伤亡。标准防护措施包括隔离衣、手套、口罩、护目镜等。",keyPoint:"环境评估，安全第一，病情评估ABC，呼吸判断，呼救，个人防护，传染/毒物/辐射",explanation:"现场评估和防护是急救安全的基础，忽视任何一个环节都可能造成严重后果。"},{id:"ch2-fm1",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"请用自己的话完整解释：什么是心搏骤停？它与心脏性猝死有何区别？为什么早期识别心搏骤停至关重要？",answer:"心搏骤停是指心脏因急性原因突然丧失有效的排血功能，导致循环和呼吸停止，全身组织缺血缺氧。此时患者处于临床死亡期，但通过及时的心肺复苏和除颤等救治措施，有可能逆转并恢复自主循环。而心脏性猝死是指由心脏原因引起的、在症状发作后1小时内发生的生物学死亡，是不可逆的。两者的关键区别在于心搏骤停有逆转的可能。早期识别心搏骤停（主要依靠意识丧失和大动脉搏动消失）能立即启动CPR，为脑和其他重要器官争取血氧供应，显著提高存活率，减少生物学死亡的发生。",keyPoint:"心搏骤停可逆转，心脏性猝死不可逆，早期识别是CPR前提",explanation:"理解这一区别有助于急救人员果断采取行动，避免延误救治时机。"},{id:"ch2-fm2",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"请用自己的话完整解释：基础生命支持（BLS）中的C-A-B-D四步分别是什么？为什么2010年指南将顺序从A-B-C改为C-A-B？",answer:"BLS的C-A-B-D四步是：C（Circulation）即胸外心脏按压，通过按压维持心脏输出和重要器官供血；A（Airway）即开放气道，常用仰头举颏法或双手托颌法确保气道通畅；B（Breathing）即人工呼吸，通过口对口或口对鼻等方法给予通气；D（Defibrillation）即早期除颤，对心室颤动患者使用AED或除颤仪电击复律。2010年将顺序从A-B-C改为C-A-B，主要原因是：绝大多数成人心搏骤停初始心律是室颤或无脉性室速，最关键的操作是胸外按压和早期除颤。原顺序中施救者先开放气道和人工呼吸容易导致按压延迟，而新顺序先做按压，只需约18秒即可开始30次按压，缩短了通气延误，同时降低了施救者因畏惧人工呼吸而不敢施救的心理门槛，鼓励更多旁观者立即实施CPR。",keyPoint:"C-A-B-D顺序，先按压后通气，减少按压延误，鼓励施救",explanation:"这一变化是基于大量临床证据，旨在提高CPR的启动率和质量。"},{id:"ch2-fm3",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"请用自己的话完整解释：如何判断心搏骤停？在院外和院内分别应启动哪些急救反应步骤？",answer:"判断心搏骤停首先确保现场环境安全，然后轻拍患者双肩并大声呼叫判断意识。若患者无反应，专业人员应同时检查呼吸和脉搏：触摸颈动脉（不超过10秒），观察胸廓有无起伏。若患者无意识、无呼吸或仅有喘息、无大动脉搏动，即可诊断心搏骤停。非专业人员仅需判断无意识和无呼吸/喘息，无需判断脉搏。在院外，应立即寻求帮助，拨打急救电话（如120），并请旁人获取自动体外除颤器（AED），同时立即开始CPR，按压与通气比例30:2，直至AED到达或专业急救人员接手。在院内，一旦判断心搏骤停，应立即呼叫紧急反应小组或医护团队，同时获取除颤器等急救设备，开始CPR，并尽早电除颤。整个过程中，团队协作、分工明确，尽量减少按压中断。",keyPoint:"判断：无意识+无呼吸/无脉搏；院外：呼救+CPR+取AED；院内：呼叫团队+CPR+除颤",explanation:"正确判断和快速启动应急系统是提高复苏成功率的关键。"},{id:"ch2-fm4",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"请用自己的话完整解释：什么是心室颤动？为什么早期除颤是治疗室颤最有效的方法？CPR与除颤如何协同发挥作用？",answer:"心室颤动是心搏骤停最常见的心电图类型，表现为心室肌发生极不规则的、快速的、不协调的颤动，心电图上QRS波群消失，代之以大小不等、形态各异的颤动波，频率200~400次/分。此时心脏虽有心电活动但无有效机械收缩，无法泵血。电除颤通过向心脏释放一定强度的电流，使所有心肌细胞同时除极，从而终止混乱的电活动，让窦房结重新主导心脏节律，恢复有效搏动。早期除颤（力争3分钟内）的时机非常关键，因为室颤若持续数分钟就会恶化为心脏停搏，复苏成功率急剧下降。CPR通过胸外按压产生人工循环，为脑和心脏提供少量血氧，可以延长室颤的可除颤时间窗，推迟其转为停搏。因此，CPR与除颤联合使用：先进行CPR维持血流，同时准备除颤器，一旦可用立即除颤。两者协同作用，能最大程度提高心搏骤停患者的存活率。",keyPoint:"室颤是无有效收缩的混乱电活动，除颤终止混乱电活动，CPR延长除颤时间窗",explanation:"理解协同机制有助于优化急救流程，避免只重除颤而忽略按压质量。"},{id:"ch2-fm5",chapterId:"ch2",chapter:"模块二 · 第二章 常用救护技术",question:"请用自己的话完整解释：心肺复苏有效的表现有哪些？在什么情况下可以终止心肺复苏？",answer:"心肺复苏有效的表现包括：①患者出现自主呼吸；②可触及大动脉搏动（如颈动脉、股动脉）；③颜面、口唇及皮肤颜色由苍白发绀转为红润；④瞳孔由散大逐渐缩小，对光反射恢复；⑤收缩压可测到并达到60mmHg以上。这些都是复苏成功的临床征象，提示循环和呼吸功能正在恢复。终止心肺复苏的指标有三条：一是复苏成功，患者恢复自主循环和呼吸，可转为进一步生命支持；二是经过充分的CPR（通常持续1小时）后，患者仍然无任何心搏和脉搏，且没有恢复迹象；三是已确定脑死亡，即大脑功能不可逆丧失。需要注意的是，终止决定应由经验丰富的医师根据指南和临床情况做出，不能轻易放弃，尤其是在低温、溺水等特殊情况下，复苏时间可适当延长。",keyPoint:"有效表现：自主呼吸、大动脉搏动、面色转红、瞳孔缩小、收缩压>60；终止指标：成功、1小时无效、脑死亡",explanation:"掌握这些标准能帮助施救者客观评估复苏效果，避免过早终止或无效延长。"},{id:"ch3-fm1",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"请用自己的话完整解释急性中毒的救护原则，并说明为什么这些原则的顺序是重要的。",answer:"急性中毒的救护原则包括五个步骤：首先立即终止接触毒物，比如把患者搬离有毒环境或脱去污染衣物，这是为了避免毒物继续进入体内。第二步是清除尚未吸收的毒物，例如对口服中毒者进行催吐、洗胃、导泻，对皮肤接触者彻底清洗，目的是减少毒物的吸收量。第三步是促进已吸收毒物的排出，可以通过利尿、吸氧、血液净化等方法加速毒物从体内清除。第四步是应用特殊解毒剂，如有机磷中毒用阿托品和解磷定，针对性地对抗毒物作用。最后是紧急复苏和对症支持治疗，比如保持呼吸道通畅、处理休克、惊厥等，维持生命体征。这个顺序是基于“先阻断来源、再清除、后促进排泄、然后特异性解毒、最后全身支持”的逻辑，每一步都是在前一步基础上进一步减少毒物危害，如果顺序颠倒，比如先解毒而不清除残留毒物，毒物仍会持续吸收，影响疗效。",keyPoint:"终止接触, 清除未吸收, 促进排出, 特殊解毒剂, 对症支持",explanation:"理解这个顺序有助于在急救中有条不紊地实施措施，避免遗漏关键环节。"},{id:"ch3-fm2",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"请用你自己的话解释有机磷农药中毒的发病机制，以及为什么会出现毒蕈碱样症状、烟碱样症状和中枢神经系统症状。",answer:"有机磷农药中毒的核心机制是抑制了体内胆碱酯酶的活性。正常情况下，胆碱能神经释放的乙酰胆碱会被胆碱酯酶迅速分解而失活，但有机磷与胆碱酯酶结合形成稳定的磷酰化胆碱酯酶，导致胆碱酯酶失去分解乙酰胆碱的能力。于是乙酰胆碱在突触间隙大量积聚，持续刺激胆碱能受体，引起一系列症状。毒蕈碱样症状是因为乙酰胆碱过度刺激了副交感神经末梢的M受体，导致平滑肌痉挛（如瞳孔缩小、腹痛、腹泻）和腺体分泌增加（如大汗、流涎、肺水肿）。烟碱样症状是因为乙酰胆碱在骨骼肌神经肌肉接头处过度刺激N受体，引起肌纤维颤动、痉挛，甚至瘫痪；同时在交感神经节兴奋，导致血压升高和心律失常。中枢神经系统症状则是乙酰胆碱刺激脑内受体，引起头晕、烦躁、昏迷甚至呼吸中枢麻痹。这些症状反映了乙酰胆碱在体内不同部位过度蓄积的后果。",keyPoint:"抑制胆碱酯酶, 乙酰胆碱积聚, M样症状, N样症状, 中枢症状",explanation:"理解机制有助于解释临床表现和选择解毒剂（阿托品拮抗M样症状，复活剂恢复胆碱酯酶活性）。"},{id:"ch3-fm3",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"请用自己的话解释有机磷农药中毒的“反跳现象”、“中间型综合征”和“迟发性神经病变”的区别，包括各自的发生时间、主要表现和可能机制。",answer:"反跳现象发生在有机磷农药中毒经急救后临床症状好转的2天至1周内，患者突然再次出现急性中毒症状，如面色苍白、大汗、肌颤、瞳孔缩小、肺水肿甚至死亡。可能原因是毒物残留重新吸收或解毒剂用量不足。中间型综合征发生在急性症状缓解后1～4天，主要表现为呼吸肌麻痹，以及肢体近端肌肉和脑神经支配的肌肉无力，可迅速导致呼吸衰竭。其机制是胆碱酯酶长期受抑制，影响神经肌肉接头功能。迟发性神经病变则在重度中毒症状消失后2～3周出现，表现为感觉和运动型多发性周围神经病变，累及肢体远端，可导致下肢瘫痪和肌肉萎缩，机制可能与有机磷抑制神经靶酯酶并使其老化有关。三者时间点不同：反跳在早期（2天至1周），中间型在1～4天，迟发性在2～3周；表现也不同：反跳是急性症状复发，中间型是呼吸肌麻痹，迟发性是周围神经病变。",keyPoint:"反跳:2天-1周急性症状复发, 中间型:1-4天呼吸肌麻痹, 迟发性:2-3周周围神经病变",explanation:"区分三者对于临床观察和预防并发症至关重要。"},{id:"ch3-fm4",chapterId:"ch3",chapter:"模块三 · 第三章 常见急危重症患者的救护",question:"请用自己的话解释急性中毒时清除尚未吸收的毒物的各种方法及其适用条件，并说明为什么导泻时昏迷患者不宜用硫酸镁。",answer:"清除尚未吸收的毒物的方法包括催吐、洗胃、导泻、灌肠和使用吸附剂。催吐适用于神志清醒且配合的患者，通过刺激咽部或药物引起呕吐，排出胃内毒物。洗胃是常用的方法，尤其用于口服中毒后早期，可通过胃管注入液体反复冲洗，并可加入吸附剂（如活性炭）增强效果。导泻用于清除进入肠道的毒物，常用药物有硫酸钠、硫酸镁、番泻叶等，通过促进肠蠕动使毒物随粪便排出。灌肠用于口服中毒超过6小时、导泻无效或抑制肠蠕动毒物中毒者（如巴比妥类），用温水或肥皂水多次灌肠。吸附剂如活性炭可在洗胃时或口服后使用，吸附多种毒物。关于硫酸镁，虽然它有效，但昏迷患者或心肾功能不全者不宜使用，因为镁离子吸收过多可引起高镁血症，抑制中枢神经和心肌，导致昏迷加重或心律失常。因此这类患者应选用硫酸钠等更安全的导泻药。",keyPoint:"催吐:神志清醒, 洗胃:常用, 导泻:昏迷用硫酸钠, 灌肠:6h后, 吸附剂:活性炭",explanation:"选择方法需根据患者意识状态、中毒时间和毒物性质，安全第一。"},{id:"ch4-fm1",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"请用自己的话解释灾害现场检伤分类的目的、原则和常用方法，并说明为什么快速有效的检伤分类是救援成功的第一步。",answer:"检伤分类的目的是在大量伤员中快速识别出需要优先救治的危重伤员，合理分配有限的医疗资源，提高整体生存率。其原则包括简单快速、分类分级、救命优先、自主决策、重复检伤和公平有效。常用方法有START（适用于成人，30秒内基于呼吸、心跳、意识分四色）、Jump START（适用于1-8岁儿童）和SALT（融分类、评估、救命干预、处置转运于一体）。因为灾害现场伤员多、资源有限，正确分类能确保危重者优先得到救治，避免轻伤员占用资源导致死亡增加，所以是救援成功的第一步。",keyPoint:"目的：识别优先伤员、分配资源、提高生存率；原则：6条；方法：START/Jump START/SALT；重要性：优化资源、降低死亡率"},{id:"ch4-fm2",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"请阐述地震灾害现场救护的主要伤情类型及救援要点，并解释在检伤分类中如何应用START方法。",answer:"地震伤情主要包括机械性损伤（四肢骨折最常见）、坠落伤、完全性饥饿、挤压综合征以及次生灾害所致烧伤、淹溺、中毒等。救援要点：先近后远、先易后难、先挖后救、先救命后治伤；保持呼吸道通畅，固定骨折，止血包扎，补液，监测挤压伤伤员血压尿量。检伤分类中应用START：快速评估呼吸（有无自主呼吸，>30次/分或<10次/分为红色）、循环（桡动脉搏动或毛细血管再充盈）、意识（能否遵指令），根据结果迅速分入红（需立即处置）、黄（可稍后）、绿（轻伤）、黑（死亡）四组，并动态重复评估。",keyPoint:"伤情类型：机械伤、坠落伤、饥饿、挤压伤、次生伤；救援要点：顺序、气道、固定、止血、补液、监测；START应用：呼吸-循环-意识评估分色"},{id:"ch4-fm3",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"请详细说明火灾中吸入性损伤的判断分级及对应的现场救护措施，并解释为什么火灾现场烟雾比火焰更危险。",answer:"吸入性损伤分为三度：轻度（声门以上，咽、喉损伤，表现喘息、嘶哑、吞咽困难）；中度（气管隆嵴以上，喉和气管损伤，伴支气管痉挛）；重度（支气管和肺泡水平，立即严重呼吸困难、呼衰死亡）。救护措施：观察生命体征，呼吸心跳骤停则心肺复苏；脱去燃烧衣服，脱离现场，吸氧；静脉注射地塞米松20mg；支气管痉挛用氨茶碱；雾化（地塞米松+沐舒坦+庆大霉素）；有条件行气管内插管；重伤者迅速转运。烟雾比火焰更危险是因为烟雾蔓延速度是火焰的4-6倍，含一氧化碳及有毒气体，导致中毒和窒息，致死人数远超过火焰烧伤。",keyPoint:"三度：轻（声门上）、中（气管隆嵴上）、重（支气管肺泡）；救护：心肺复苏、脱离、吸氧、药物、雾化、插管、转运；烟雾危险：速度快、含CO和毒气、致死为主因"},{id:"ch4-fm4",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"请描述水灾后常见的人员伤情类型，并说明针对淹溺、触电、毒蛇咬伤及传染病的现场救援要点。",answer:"水灾常见伤情有淹溺、机械性损伤、触电、虫蛇咬伤、传染性疾病。淹溺救援：争分夺秒，1-2分钟内进行心肺复苏和通气血流支持。触电救援：先脱离电源，评估心跳呼吸，必要时心肺复苏。毒蛇咬伤：保持安静，绑扎近心端，冲洗伤口，尽快就医（具体参照第三章）。传染病防控：管理传染源（隔离患者、处理尸体）、切断传播途径（消毒水源、灭蚊蝇）、保护易感人群（疫苗接种、卫生宣教）。",keyPoint:"伤情：淹溺、机械伤、触电、虫蛇咬、传染病；淹溺：尽早心肺复苏；触电：断电后复苏；毒蛇：绑扎冲洗就医；传染病：三环节防控"},{id:"ch4-fm5",chapterId:"ch4",chapter:"模块四 · 第四章 灾害事故的现场救护",question:"请解释烧伤面积的新九分法计算规则，并结合烧伤现场救护步骤，说明如何对烧伤伤员进行初步评估和处理。",answer:"新九分法：头颈部9%，双上肢18%，躯干前后含会阴27%，双下肢含臀部46%。小面积烧伤可用伤者手掌（约1%）估算。现场救护：①迅速脱离热源，冷水冲洗降温；②评估有无致命性损伤（心跳骤停、窒息、大出血等），有则先处理；③保护创面，避免刺破水疱，用干净敷料包扎，禁用有色物涂抹；④严重口渴可口服淡盐水或烧伤饮料；⑤保持气道通畅，一氧化碳中毒者吸氧；⑥大面积烧伤或休克者建立静脉通道补液；⑦尽快转运。初步评估时通过新九分法估算面积，结合深度（教材未详述但可提及）决定液体复苏和转运优先级。",keyPoint:"新九分法：头9、上肢18、躯干27、下肢46；手掌法1%；现场救护：脱离热源、评估致命伤、保护创面、口服补液、气道管理、静脉补液、转运"}]},mf=Object.freeze(Object.defineProperty({__proto__:null,ankiDeck:Qu},Symbol.toStringTag,{value:"Module"})),$u=`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

`,Xu=`
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`;function P(b){return $u+b+Xu}const Gu=[{id:"audio-l1",title:"第一章 急危重症护理学基础知识",moduleTitle:"模块一：第一章 急危重症护理学基础知识",durationSeconds:350,audioUrl:"/audio/audio-l1.mp3",visualSequence:{audioUrl:"/audio/audio-l1.mp3",dialog:{id:"audio-l1"},frames:[{start:0,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]

 class A new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:2,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> T0["急危重症护理学概况"]
 A --> T1["急救医疗服务体系"]
 A --> T2["院前急救"]
 A --> T3["急诊科救护"]
 A --> T4["重症监护"]

 class A new
 class T0 new
 class T1 new
 class T2 new
 class T3 new
 class T4 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:28,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["大家注意"]
 A --> N1["这里有一个非常关键的区分点"]
 A --> N2["所谓急危重症"]
 A --> N3["顾名思义"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:54,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["那么它涵盖的范围有多广呢"]
 A --> N1["我给大家举一个例子"]
 A --> N2["让大家更容易理解"]
 A --> N3["假设今天下午三点"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:79,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["但实际上"]
 A --> N1["这门学科的内涵远不止于此"]
 A --> N2["它还包含了大量的预防性护理"]
 A --> N3["如何预防长期卧床患者发生深静脉血栓"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:109,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["在这个体系中"]
 A --> N1["有一个至关重要的环节叫做“急救医疗调度”"]
 A --> N2["大家可能觉得没什么"]
 A --> N3["不就是接电话吗"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:135,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["一个高效的EMSS体系"]
 A --> N1["核心就是“空窗期”的最小化"]
 A --> N2["每一个环节的衔接越紧密"]
 A --> N3["中间没有浪费的地方"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:160,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["在这些极端环境下进行高难度的急救操作"]
 A --> N1["对护理人员的心理素质和动手能力要求极其高"]
 A --> N2["院前急救的原则可以用几个字来总结"]
 A --> N3["叫作“先救命后治病”"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:186,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["差距就是这么大"]
 A --> N1["这就说明"]
 A --> N2["院前急救不仅仅是急救医生的责任"]
 A --> N3["也是每一个人的公共卫生使命"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:213,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["院前急救的重要性"]
 A --> N1["不仅在于开始的处置"]
 A --> N2["更在于和下一环节的无缝衔接"]
 A --> N3["接下来我们进入第四个任务"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:238,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["急诊科救护不仅仅是对病情的判断"]
 A --> N1["还包括大量的急救操作和协调工作"]
 A --> N2["比如抢救室里突发心电风暴的患者"]
 A --> N3["需要马上进行电除颤"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:264,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["这一点是很多初学者容易忽略的"]
 A --> N1["大家一定要提前有心理准备"]
 A --> N2["现在我们讲最后一个任务"]
 A --> N3["重症监护"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:291,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["这种“诊断性”的护理能力"]
 A --> N1["在ICU里是必备的"]
 A --> N2["重症监护中最常见的操作是呼吸机管理"]
 A --> N3["呼吸机能够帮助重症患者维持足够的氧气供应"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:317,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["讲到这里"]
 A --> N1["五个任务都讲完了"]
 A --> N2["接下来我们进行一个知识串联与总结"]
 A --> N3["不知道大家有没有感觉到"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:342,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> N0["哪些环节是院前急救"]
 A --> N1["哪些环节是急诊科分诊"]
 A --> N2["哪些环节属于病房护士的观察预警"]
 A --> N3["标注完之后"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:347,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第一章 急危重症护理学基础知识"]
 A --> B["知识回顾"]
 A --> C["课后复习"]

 class B new
 class C new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}}]}},{id:"audio-l2",title:"第二章 常用救护技术",moduleTitle:"模块二：第二章 常用救护技术",durationSeconds:413,audioUrl:"/audio/audio-l2.mp3",visualSequence:{audioUrl:"/audio/audio-l2.mp3",dialog:{id:"audio-l2"},frames:[{start:0,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]

 class A new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:1,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> T0["心肺脑复苏术"]
 A --> T1["通畅气道术"]
 A --> T2["创伤急救技术"]
 A --> T3["呼吸支持技术"]
 A --> T4["洗胃术"]

 class A new
 class T0 new
 class T1 new
 class T2 new
 class T3 new
 class T4 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:27,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["因为大脑对缺氧的耐受度非常低"]
 A --> N1["如果缺血缺氧超过四到六分钟"]
 A --> N2["就会造成不可逆的损伤"]
 A --> N3["我们的急救不仅要“救心”"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:53,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["说到这里"]
 A --> N1["我们再来看看临床表现和诊断"]
 A --> N2["一个心搏骤停的患者"]
 A --> N3["通常表现为意识突然丧失"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:79,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["我们来详解“CABD”"]
 A --> N1["首先是C"]
 A --> N2["胸外心脏按压"]
 A --> N3["患者必须仰卧在硬板或地面上"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:104,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["自愿实施紧急救助行为造成受助人损害的"]
 A --> N1["救助人不承担民事责任"]
 A --> N2["这给大家见义勇为吃了一颗定心丸"]
 A --> N3["我们刚才讲了基础生命支持"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:129,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["掌握正确的气道通畅术"]
 A --> N1["对于挽救生命至关重要"]
 A --> N2["我们要能快速识别气道梗阻"]
 A --> N3["如果患者突然不能说话"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:154,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["口咽通气管适用于昏迷但有自主呼吸的患者"]
 A --> N1["可以防止舌后坠"]
 A --> N2["让气道保持通畅"]
 A --> N3["它的放置方法有一定的技巧"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:180,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["如果是动脉出血"]
 A --> N1["血液呈喷射状"]
 A --> N2["非常危险"]
 A --> N3["静脉出血则呈涌出状"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:206,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["螺旋形包扎法"]
 A --> N1["用于前臂"]
 A --> N2["上臂等粗细不均的部位"]
 A --> N3["还有“8”字形包扎法"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:233,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["搬运过程中要平稳"]
 A --> N1["密切观察伤员的病情变化"]
 A --> N2["创伤急救的四项基础技术"]
 A --> N3["每一个步骤都凝聚着无数前人的经验和教训"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:260,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["使用时要做到“快"]
 A --> N1["我们要谈到更高级的呼吸支持——呼吸机"]
 A --> N2["当患者病情严重"]
 A --> N3["需要进行长时间或精确控制的呼吸支持时"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:287,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["气道压力过低报警"]
 A --> N1["可能提示管道漏气"]
 A --> N2["脱管或者患者呼吸抑制"]
 A --> N3["呼吸支持技术"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:313,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["洗胃的方法有两种"]
 A --> N1["电动洗胃法和注射器洗胃法"]
 A --> N2["电动洗胃法是利用电动洗胃机"]
 A --> N3["通过负压吸引和正压冲洗"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:340,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["我们进入第六个任务"]
 A --> N1["常用的重症监护技术"]
 A --> N2["刚才我们所学的所有急救技术"]
 A --> N3["最终的目标都是将患者从生死线上拉回来"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:366,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["如果血氧饱和度持续下降"]
 A --> N1["说明呼吸或循环功能出现了问题"]
 A --> N2["需要及时处理"]
 A --> N3["对于危重患者"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:392,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> N0["在创伤急救中"]
 A --> N1["一个错误的搬运动作"]
 A --> N2["就可能让患者终身瘫痪"]
 A --> N3["我们的素质目标第一条"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:406.2,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第二章 常用救护技术"]
 A --> B["知识回顾"]
 A --> C["课后复习"]

 class B new
 class C new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}}]}},{id:"audio-l3",title:"第三章 常见急危重症患者的救护",moduleTitle:"模块三：第三章 常见急危重症患者的救护",durationSeconds:242,audioUrl:"/audio/audio-l3.mp3",visualSequence:{audioUrl:"/audio/audio-l3.mp3",dialog:{id:"audio-l3"},frames:[{start:0,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]

 class A new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:1,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> T0["急性中毒患者的救护"]
 A --> T1["环境及理化因素损伤患者的救护"]
 A --> T2["常见急症患者的救护"]

 class A new
 class T0 new
 class T1 new
 class T2 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:26,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> N0["生活中毒可能源于误食"]
 A --> N1["用药过量"]
 A --> N2["甚至是自杀行为"]
 A --> N3["而职业中毒则与工作环境有关"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:51,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> N0["大家注意"]
 A --> N1["洗胃时用的液体很有讲究"]
 A --> N2["比如对硫磷中毒不能用高锰酸钾溶液"]
 A --> N3["因为它会把毒性更强的对氧磷氧化出来"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:77,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> N0["意识水平是判断中毒严重程度的金标准之一"]
 A --> N1["阿托品化与阿托品中毒的鉴别"]
 A --> N2["几乎是考试的必考点"]
 A --> N3["阿托品化表现为瞳孔较前扩大"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:104,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> N0["中毒的原因多种多样"]
 A --> N1["冬天在密闭的房间里烧煤取暖"]
 A --> N2["夏天在车里开着空调睡觉"]
 A --> N3["或者是在浴室里用燃气热水器洗澡"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:130,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> N0["重度中毒时"]
 A --> N1["浓度超过50%"]
 A --> N2["患者会深昏迷"]
 A --> N3["甚至引起迟发性脑病"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:156,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> N0["重症中暑"]
 A --> N1["特别是热射病"]
 A --> N2["是最凶险的"]
 A --> N3["它的特点是核心体温超过40摄氏度"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:183,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> N0["如果患者有活动性疼痛"]
 A --> N1["比如心绞痛"]
 A --> N2["可以舌下含服硝酸甘油"]
 A --> N3["但要注意"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:209,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> N0["无论是急性中毒"]
 A --> N1["环境损伤还是常见急症"]
 A --> N2["它们的核心都是威胁生命"]
 A --> N3["我们的救护思维一定是先救命再治伤"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:234,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> N0["我们今天学习的所有知识"]
 A --> N1["都是为了将来在某个紧急关头"]
 A --> N2["能够冷静"]
 A --> N3["精确地出手"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:239,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第三章 常见急危重症患者的救护"]
 A --> B["知识回顾"]
 A --> C["课后复习"]

 class B new
 class C new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}}]}},{id:"audio-l4",title:"第四章 灾害事故的现场救护",moduleTitle:"模块四：第四章 灾害事故的现场救护",durationSeconds:387,audioUrl:"/audio/audio-l4.mp3",visualSequence:{audioUrl:"/audio/audio-l4.mp3",dialog:{id:"audio-l4"},frames:[{start:0,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]

 class A new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:2,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> T0["概述"]
 A --> T1["灾害现场检伤分类"]
 A --> T2["常见灾害事故的现场救护"]

 class A new
 class T0 new
 class T1 new
 class T2 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:27,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["是先给那个腿骨折的打石膏"]
 A --> N1["还是先给那个胸部穿透伤的通气"]
 A --> N2["这就是灾害事故现场救护要解决的核心问题"]
 A --> N3["在资源极度有限"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:54,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["灾害的分类有很多种"]
 A --> N1["我们看原文"]
 A --> N2["可以按原因分"]
 A --> N3["分为自然灾害和人为灾害"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:81,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["第二个是艰难性"]
 A --> N1["大家想想"]
 A --> N2["灾区现场是什么样子的"]
 A --> N3["可能道路中断"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:106,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["防护包括三个层面"]
 A --> N1["第一个是免疫预防"]
 A --> N2["比如在出发前接种针对性的疫苗"]
 A --> N3["这是主动免疫"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:132,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["最后还强调了救援前的各项准备"]
 A --> N1["尤其是个人职业安全防护"]
 A --> N2["这些知识"]
 A --> N3["让我们进入第二个任务"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:158,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["这类伤员的伤情极其严重"]
 A --> N1["生命体征极不稳定"]
 A --> N2["随时可能死亡"]
 A --> N3["出现了严重的呼吸困难"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:183,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["对于这类伤员"]
 A --> N1["简单的包扎止血之后"]
 A --> N2["可以让他们在指定区域等待"]
 A --> N3["或者由非专业人员进行后续照看"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:208,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["他同时存在两个问题"]
 A --> N1["开放性气胸会导致呼吸循环障碍"]
 A --> N2["是致命的"]
 A --> N3["必须立即处理"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:233,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["我们不是贴一个标签就万事大吉了"]
 A --> N1["而是要对伤员进行持续的"]
 A --> N2["反复的评估和重新分类"]
 A --> N3["这就是为什么在救援现场"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:259,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["首先来看地震"]
 A --> N1["地震具有突发性强"]
 A --> N2["破坏性大"]
 A --> N3["伤亡人数多"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:284,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["对于黄色伤员"]
 A --> N1["比如下肢骨折"]
 A --> N2["脊柱损伤的伤员"]
 A --> N3["要特别注意"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:309,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["对于被救出的伤员"]
 A --> N1["首先要判定的不是他有没有烧伤"]
 A --> N2["而是他的气道有没有问题"]
 A --> N3["如果伤员有声音嘶哑"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:339,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["另外还有碾压伤"]
 A --> N1["切割伤等"]
 A --> N2["对于交通事故的救护"]
 A --> N3["首要原则是安全"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:365,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> N0["这些知识是一个整体"]
 A --> N1["需要大家融会贯通"]
 A --> N2["我要给大家布置课后学习建议"]
 A --> N3["请大家一定不要只是死记硬背"]

 class A new
 class N0 new
 class N1 new
 class N2 new
 class N3 new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}},{start:381.3,element:{diagram:{content:P(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

flowchart TD
 A["第四章 灾害事故的现场救护"]
 A --> B["知识回顾"]
 A --> C["课后复习"]

 class B new
 class C new
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`)}}}]}}],df=Object.freeze(Object.defineProperty({__proto__:null,audioCourseLessons:Gu},Symbol.toStringTag,{value:"Module"})),Ku={paradigm:"process-flow",rationale:"医学/护理关键词密度 599.75，流程/操作关键词密度 44.50，判定为医学实训类教材，使用 process-flow 布局。",nodes:[{id:"ch1-group",type:"group",x:-400,y:-240,width:280,height:480,label:"模块一",color:"1"},{id:"ch1",type:"text",x:-360,y:-200,width:200,height:50,text:"**第一章 急危重症护理学基础知识**",color:"1"},{id:"ch1-t1",type:"text",x:-360,y:-130,width:200,height:50,text:"第一节 急危重症护理学概况",taskId:"ch1-1"},{id:"ch1-t2",type:"text",x:-360,y:-60,width:200,height:50,text:"第二节 急救医疗服务体系",taskId:"ch1-2"},{id:"ch1-t3",type:"text",x:-360,y:10,width:200,height:50,text:"第三节 院前急救",taskId:"ch1-3"},{id:"ch1-t4",type:"text",x:-360,y:80,width:200,height:50,text:"第四节 急诊科救护",taskId:"ch1-4"},{id:"ch1-t5",type:"text",x:-360,y:150,width:200,height:50,text:"第五节 重症监护",taskId:"ch1-5"},{id:"ch2-group",type:"group",x:0,y:-275,width:280,height:550,label:"模块二",color:"2"},{id:"ch2",type:"text",x:40,y:-235,width:200,height:50,text:"**第二章 常用救护技术**",color:"2"},{id:"ch2-t1",type:"text",x:40,y:-165,width:200,height:50,text:"第一节 心肺脑复苏术",taskId:"ch2-1"},{id:"ch2-t2",type:"text",x:40,y:-95,width:200,height:50,text:"第二节 通畅气道术",taskId:"ch2-2"},{id:"ch2-t3",type:"text",x:40,y:-25,width:200,height:50,text:"第三节 创伤急救技术",taskId:"ch2-3"},{id:"ch2-t4",type:"text",x:40,y:45,width:200,height:50,text:"第四节 呼吸支持技术",taskId:"ch2-4"},{id:"ch2-t5",type:"text",x:40,y:115,width:200,height:50,text:"第五节 洗胃术",taskId:"ch2-5"},{id:"ch2-t6",type:"text",x:40,y:185,width:200,height:50,text:"第六节 常用的重症监护技术",taskId:"ch2-6"},{id:"ch3-group",type:"group",x:400,y:-170,width:280,height:340,label:"模块三",color:"3"},{id:"ch3",type:"text",x:440,y:-130,width:200,height:50,text:"**第三章 常见急危重症患者的救护**",color:"3"},{id:"ch3-t1",type:"text",x:440,y:-60,width:200,height:50,text:"第一节 急性中毒患者的救护",taskId:"ch3-1"},{id:"ch3-t2",type:"text",x:440,y:10,width:200,height:50,text:"第二节 环境及理化因素损伤患者的救护",taskId:"ch3-2"},{id:"ch3-t3",type:"text",x:440,y:80,width:200,height:50,text:"第三节 常见急症患者的救护",taskId:"ch3-3"},{id:"ch4-group",type:"group",x:800,y:-170,width:280,height:340,label:"模块四",color:"4"},{id:"ch4",type:"text",x:840,y:-130,width:200,height:50,text:"**第四章 灾害事故的现场救护**",color:"4"},{id:"ch4-t1",type:"text",x:840,y:-60,width:200,height:50,text:"第一节 概述",taskId:"ch4-1"},{id:"ch4-t2",type:"text",x:840,y:10,width:200,height:50,text:"第二节 灾害现场检伤分类",taskId:"ch4-2"},{id:"ch4-t3",type:"text",x:840,y:80,width:200,height:50,text:"第三节 常见灾害事故的现场救护",taskId:"ch4-3"}],edges:[{id:"e-ch1-ch1-t1",fromNode:"ch1",toNode:"ch1-t1",fromSide:"bottom",toSide:"top"},{id:"e-ch1-ch1-t2",fromNode:"ch1",toNode:"ch1-t2",fromSide:"bottom",toSide:"top"},{id:"e-ch1-ch1-t3",fromNode:"ch1",toNode:"ch1-t3",fromSide:"bottom",toSide:"top"},{id:"e-ch1-ch1-t4",fromNode:"ch1",toNode:"ch1-t4",fromSide:"bottom",toSide:"top"},{id:"e-ch1-ch1-t5",fromNode:"ch1",toNode:"ch1-t5",fromSide:"bottom",toSide:"top"},{id:"e-ch1-ch2",fromNode:"ch1",toNode:"ch2",fromSide:"right",toSide:"left",label:"流程",color:"4"},{id:"e-ch2-ch2-t1",fromNode:"ch2",toNode:"ch2-t1",fromSide:"bottom",toSide:"top"},{id:"e-ch2-ch2-t2",fromNode:"ch2",toNode:"ch2-t2",fromSide:"bottom",toSide:"top"},{id:"e-ch2-ch2-t3",fromNode:"ch2",toNode:"ch2-t3",fromSide:"bottom",toSide:"top"},{id:"e-ch2-ch2-t4",fromNode:"ch2",toNode:"ch2-t4",fromSide:"bottom",toSide:"top"},{id:"e-ch2-ch2-t5",fromNode:"ch2",toNode:"ch2-t5",fromSide:"bottom",toSide:"top"},{id:"e-ch2-ch2-t6",fromNode:"ch2",toNode:"ch2-t6",fromSide:"bottom",toSide:"top"},{id:"e-ch2-ch3",fromNode:"ch2",toNode:"ch3",fromSide:"right",toSide:"left",label:"流程",color:"4"},{id:"e-ch3-ch3-t1",fromNode:"ch3",toNode:"ch3-t1",fromSide:"bottom",toSide:"top"},{id:"e-ch3-ch3-t2",fromNode:"ch3",toNode:"ch3-t2",fromSide:"bottom",toSide:"top"},{id:"e-ch3-ch3-t3",fromNode:"ch3",toNode:"ch3-t3",fromSide:"bottom",toSide:"top"},{id:"e-ch3-ch4",fromNode:"ch3",toNode:"ch4",fromSide:"right",toSide:"left",label:"流程",color:"4"},{id:"e-ch4-ch4-t1",fromNode:"ch4",toNode:"ch4-t1",fromSide:"bottom",toSide:"top"},{id:"e-ch4-ch4-t2",fromNode:"ch4",toNode:"ch4-t2",fromSide:"bottom",toSide:"top"},{id:"e-ch4-ch4-t3",fromNode:"ch4",toNode:"ch4-t3",fromSide:"bottom",toSide:"top"}],enrichedEntities:[{id:"center-work",title:"教材主题",type:"concept",summary:"跨文化文本旅行核心主题",culture:"源起",medium:"教材主题"},{id:"concept-1",title:"急危重症护理学",type:"concept",gloss:"研究急危重症患者抢救与护理的学科",desc:"护理专业核心课程之一",summary:"急危重症护理学是一门研究各类急性病、急性创伤、慢性病急性发作及危重患者抢救与护理的综合性应用学科，是护理专业的专业核心课程，旨在培养临床护理人员的核心岗位胜任力。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"module1",title:"前言",pn:"pn-3"}]},{id:"concept-2",title:"护理专业",type:"concept",gloss:"培养护理人才的学科专业",desc:"教材面向的主要专业方向",summary:"护理专业是医疗卫生事业的重要组成部分，急危重症护理学是其专业核心课程，教材围绕护理专业人才培养目标编写，兼顾多元化发展趋势。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"module1",title:"前言",pn:"pn-3"},{chapter:"module1",title:"前言",pn:"pn-4"},{chapter:"module1",title:"前言",pn:"pn-5"}]},{id:"work-1",title:"党的二十大报告",type:"work",gloss:"中国共产党第二十次全国代表大会的报告",desc:"强调教材建设与管理的重要政策文件",summary:"党的二十大报告提出加强教材建设和管理，将教材建设作为深化教育领域综合改革的重要环节，为新时代教材建设和管理提供了根本遵循。",count:1,culture:"政策文件",medium:"报告",refs:[{chapter:"module1",title:"前言",pn:"pn-2"}]},{id:"concept-3",title:"教材建设和管理",type:"concept",gloss:"教材的编写、审核、使用等管理工作",desc:"教材工作的核心内容",summary:"教材建设和管理是教学活动的基础和保障，党的二十大报告将其作为教育领域综合改革的重要环节，凸显了教材工作在教育事业发展中的重要地位。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"module1",title:"前言",pn:"pn-2"}]},{id:"concept-4",title:"三基",type:"concept",gloss:"基本理论、基本知识、基本技能的简称",desc:"教材重视的基础教学内容",summary:"三基指基本理论、基本知识、基本技能，是教材编写中重视的基础内容，同时融入专业认同感及职业素养培养，突出体现“以人为本”的护理理念。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"module1",title:"前言",pn:"pn-4"}]},{id:"culture-1",title:"以人为本",type:"culture",gloss:"以患者为中心的人本护理理念",desc:"教材编写的核心理念",summary:"以人为本是教材编写坚持的护理理念，突出体现对患者的关怀和人本精神，融入对学习者专业认同感及职业素养的培养，构建知识、技能、态度三位一体的教科书模式。",count:1,culture:"文化理念",medium:"概念",refs:[{chapter:"module1",title:"前言",pn:"pn-4"}]},{id:"concept-5",title:"核心岗位胜任力",type:"concept",gloss:"临床护理必备的核心能力",desc:"急危重症护理学培养目标",summary:"核心岗位胜任力指临床护理人员对急危重症患者进行抢救、病情监测等关键能力，已成为临床护理人员的核心要求，也是急危重症护理学培养的主要目标。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module1",title:"前言",pn:"pn-3"}]},{id:"concept-6",title:"问题导向",type:"concept",gloss:"以问题为导向的教学方法",desc:"教材强调的学习策略",summary:"问题导向是教材强调的教学方法，通过典型案例导入并提出问题，引导学习者情景引入学习，培养主动学习能力，构建主动学习路径。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module1",title:"前言",pn:"pn-1"}]},{id:"medium-1",title:"微课",type:"medium",gloss:"微型视频课程",desc:"教材增加的新型教学资源",summary:"微课是教材增设的教学模块，以短视频形式呈现知识点，帮助学习者灵活学习，提高学习效率，属于构建知识、技能、态度三位一体教科书模式的一部分。",count:1,culture:"拓展延伸",medium:"教学视频",refs:[{chapter:"module1",title:"前言",pn:"pn-4"}]},{id:"medium-2",title:"思维导图",type:"medium",gloss:"可视化思维工具",desc:"教材增加的知识整理工具",summary:"思维导图是教材增设的教学模块，以图形化方式整理知识结构，促进学习者的逻辑思维和系统认知，属于构建知识、技能、态度三位一体教科书模式的一部分。",count:1,culture:"拓展延伸",medium:"图形工具",refs:[{chapter:"module1",title:"前言",pn:"pn-4"}]},{id:"medium-3",title:"知识链接",type:"medium",gloss:"相关知识点链接",desc:"教材增加的拓展资源",summary:"知识链接是教材增设的教学模块，提供相关拓展阅读或参考资料，延伸学习深度，帮助学习者深化对课程内容的理解。",count:1,culture:"拓展延伸",medium:"文本链接",refs:[{chapter:"module1",title:"前言",pn:"pn-4"}]},{id:"medium-4",title:"素质拓展",type:"medium",gloss:"职业素养拓展活动",desc:"教材增加的素质培养模块",summary:"素质拓展是教材增设的教学模块，注重培养学习者的职业素养和人文精神，构建知识、技能、态度三位一体的教科书模式，提升学习者专业认同感。",count:1,culture:"拓展延伸",medium:"教学模块",refs:[{chapter:"module1",title:"前言",pn:"pn-4"}]},{id:"concept-emss",title:"急救医疗服务体系 (EMSS)",type:"concept",gloss:"EMSS是急救医疗服务体系的英文缩写，包括院前急救、院内急诊和ICU等环节。",desc:"一个科学、高效、严密的组织和统一指挥的急救网络。",summary:"集院前急救、院内急诊科救护、重症监护室救治和各专科治疗的“生命绿色通道”为一体的急救网络，强调即刻性、连续性、层次性和系统性。",count:12,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-3"}]},{id:"concept-prehospital",title:"院前急救",type:"concept",gloss:"院前急救指伤病员发病或受伤后，在到达医院前进行的紧急医疗救治。",desc:"EMSS的起始环节，强调即刻性。",summary:"负责现场急救和途中救护，是EMSS的第一个环节，包括现场急救人员到达前的自救互救和专业人员到达后的现场处理。",count:8,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-3"}]},{id:"concept-emergency-department",title:"急诊科",type:"concept",gloss:"急诊科是医院内对急危重症患者进行初步诊断和救治的场所。",desc:"EMSS中院内急救的第一站。",summary:"医院内负责急诊患者接诊、抢救和治疗的部门，是EMSS院内急救的核心组成部分。",count:5,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-3"}]},{id:"concept-icu",title:"重症监护室 (ICU)",type:"concept",gloss:"ICU是Intensive Care Unit的缩写，即重症监护病房。",desc:"EMSS中患者生命体征稳定后的进一步支持治疗场所。",summary:"为危重症患者提供连续监护和加强治疗的专门病房，是EMSS院内救护的高级阶段。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-3"}]},{id:"concept-star-of-life",title:"生命之星",type:"concept",gloss:"生命之星是国际通用的EMS标志。",desc:"象征EMSS功能的六角星徽章。",summary:"急救医疗服务体系的国际标志，由蛇杖和六个方向组成，分别代表EMSS的发现、报告、反应、现场抢救、运输途中监护和转至院内救治。",count:3,culture:"拓展延伸",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-18"}]},{id:"work-1980-opinion",title:"《关于加强城市急救工作的意见》",type:"work",gloss:"1980年卫生部发布的急救工作指导性文件。",desc:"我国EMSS发展的里程碑文件。",summary:"中华人民共和国成立后第一个关于急救的文件，于1980年10月由卫生部颁发，标志着我国EMSS进入快速发展阶段。",count:1,culture:"基础理论",medium:"文件",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-9"}]},{id:"work-1995-disaster",title:"《灾害事故医疗救援工作管理办法》",type:"work",gloss:"我国灾害医疗救援的管理办法。",desc:"EMSS相关法规文件。",summary:"1995年4月由卫生部发布，促进了我国EMSS的发展，规范了灾害事故医疗救援工作。",count:1,culture:"基础理论",medium:"文件",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-9"}]},{id:"concept-communication-network",title:"急救通信网络",type:"concept",gloss:"急救通信网络是EMSS的信息化支撑系统。",desc:"健全灵敏的通信网络。",summary:"包括指挥调度系统、对讲系统、急救视频记录系统、现场定位系统等，是提高急救应急能力的基础。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-11"}]},{id:"concept-aeromedical-evacuation",title:"航空医疗救护",type:"concept",gloss:"航空医疗救护即空中急救服务。",desc:"EMSS的空中急救模式。",summary:"利用直升机等空中运载工具进行快速医疗救援，响应速度快、覆盖范围广，是立体急救网络的重要组成部分。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-11"}]},{id:"concept-green-channel",title:"生命绿色通道",type:"concept",gloss:"为急危重症患者提供的无阻碍快速救治通道。",desc:"EMSS中强调的快速救治路径。",summary:"指院前急救、院内急诊科、重症监护室和各专科治疗紧密衔接形成的快速救治路径，确保患者获得及时连续救治。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-3"}]},{id:"person-zhang",title:"张某",type:"person",gloss:"案例中的人物，引出医院急诊科编号的问题。",desc:"实习医学生。",summary:"案例导学中的实习医学生，2024年7月12日到实习医院急诊科报到，该医院属于该市第15号急救站。",count:1,culture:"临床应用",medium:"人物",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-1"}]},{id:"concept-station-no15",title:"第15号急救站",type:"concept",gloss:"急救站的编号标识。",desc:"医院急诊科对应的急救站编号。",summary:"案例中张某实习医院所属的急救站编号，反映急救站统一编号管理的实践。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-1"}]},{id:"location-france",title:"法国",type:"location",gloss:"法国是EMSS发源地之一。",desc:"最早建立EMSS的国家。",summary:"最早组建EMSS的国家，为全球急救医疗服务体系的发展奠定了基础。",count:1,culture:"拓展延伸",medium:"国家",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-7"}]},{id:"location-usa",title:"美国",type:"location",gloss:"美国在EMSS立法和标准化方面有重要贡献。",desc:"EMSS发展的重要国家。",summary:"1968年麻省理工学院提议建立“急症医疗系”，1973年颁布EMSS法案，推动全球EMSS发展。",count:2,culture:"拓展延伸",medium:"国家",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-7"}]},{id:"concept-self-aid",title:"群众自救互救",type:"concept",gloss:"社会急救的一部分，强调公众参与。",desc:"EMSS的初始环节。",summary:"在专业急救人员到达前，由第一目击者或群众进行的初步急救措施，如心肺复苏、止血包扎等。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-4"}]},{id:"concept-emss-legislation",title:"EMSS法案",type:"work",gloss:"美国EMSS的立法文件。",desc:"美国EMSS发展的关键法律。",summary:"1973年美国总统颁布的关于急救医疗服务体系的法案，标志着美国EMSS正式立法。",count:1,culture:"基础理论",medium:"法律",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-7"}]},{id:"concept-ambulance-standard",title:"急救车标准",type:"concept",gloss:"日本对急救车辆的技术要求。",desc:"EMSS运输工具标准化。",summary:"日本于1970年规定的救护车标准，推动了急救运输工具的规范化。",count:1,culture:"基础理论",medium:"标准",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-7"}]},{id:"medium-china-emblem",title:"我国院前医疗急救标识",type:"medium",gloss:"中国院前急救系统的唯一视觉识别标识。",desc:"带有中国特色的生命之星衍生标识。",summary:"以生命之星为核心，添加长城、橄榄枝等中国元素，蓝色和黄色为主色，象征生命守护和希望。",count:2,culture:"拓展延伸",medium:"视觉标识",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-19"}]},{id:"concept-snake-staff",title:"蛇杖",type:"concept",gloss:"蛇杖是国际通用的医学标志。",desc:"生命之星的核心符号。",summary:"医学与健康的象征，位于生命之星的中心位置，代表医学救护。",count:1,culture:"拓展延伸",medium:"符号",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-18"}]},{id:"concept-international-sos",title:"国际SOS救援中心",type:"concept",gloss:"提供国际医疗救援服务的组织。",desc:"全球性急救医疗服务网络。",summary:"全球性医疗救援机构，在多个国家设有办事机构和急救中心，以专业工作方式和全球网络支持EMSS。",count:1,culture:"拓展延伸",medium:"机构",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第二节 急救医疗服务体系",pn:"pn-8"}]},{id:"concept-2",title:"急救医疗服务体系",type:"concept",gloss:"包含院前急救、急诊科和重症监护的完整医疗救援体系。",desc:"EMSS是院前急救的重要组织基础。",summary:"急救医疗服务体系（EMSS）是集院前急救、院内急诊和重症监护于一体的综合系统，旨在实现快速响应、高效救治。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-3",title:"现场评估",type:"concept",gloss:"对事故现场及患者伤情的快速评估。",desc:"现场评估为后续救护提供依据。",summary:"现场评估是院前急救的第一步，包括环境安全评估和病情快速评估，评估意识、气道、呼吸、脉搏等生命体征。",count:10,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-3"}]},{id:"concept-4",title:"现场救护",type:"concept",gloss:"在事故现场进行的紧急医疗处置。",desc:"现场救护是院前急救的核心环节。",summary:"现场救护是在院前环境中对伤病员实施紧急医疗处置，包括体位安置、检伤分类、维持呼吸循环、止血包扎固定等。",count:12,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-3"}]},{id:"concept-5",title:"转运护理",type:"concept",gloss:"将伤病员从现场安全转运至医院的护理过程。",desc:"转运护理是院前急救的重要环节。",summary:"转运护理包括选择合适的转运工具、搬运技术、途中监护及病情交接，确保伤病员安全送达医院。",count:8,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-3"}]},{id:"concept-6",title:"急救半径",type:"concept",gloss:"急救服务覆盖的地理范围半径。",desc:"急救半径是衡量院前急救可及性的指标。",summary:"急救半径是指急救单元所执行院前急救服务区域的半径，城市建成区急救半径应≤5km。",count:2,culture:"基础理论",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-7",title:"反应时间",type:"concept",gloss:"从接到呼救到抵达现场的时间。",desc:"反应时间越短对抢救越有利。",summary:"急救反应时间是急救中心接到电话至急救车到达现场所需时间，市区要求15分钟以内，郊区30分钟以内。",count:2,culture:"基础理论",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-8",title:"伤情分类",type:"concept",gloss:"根据伤情严重程度对伤员进行分拣分类。",desc:"伤情分类用于合理分配急救资源。",summary:"重大灾害现场将伤员分为危重伤（红色）、中重伤（黄色）、轻伤（绿色）、致命伤（黑色）四类，按优先顺序救治。",count:6,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-3"}]},{id:"concept-9",title:"先救命后治病",type:"concept",gloss:"以维持生命为首要目标的救治原则。",desc:"是院前急救的基本原则之一。",summary:"院前急救的总原则，优先处理危及生命的伤情，再处理次要问题。",count:2,culture:"基础理论",medium:"原则",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-10",title:"心肺复苏",type:"concept",gloss:"恢复心跳和呼吸的急救技术。",desc:"心肺复苏是挽救心搏骤停患者生命的关键技术。",summary:"心肺复苏是针对心跳呼吸骤停患者采取的人工呼吸和胸外心脏按压等紧急救治措施，是院前急救的核心技术。",count:5,culture:"临床应用",medium:"技术",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-3"}]},{id:"concept-11",title:"止血",type:"concept",gloss:"控制出血的方法。",desc:"院前急救中常用的止血技术。",summary:"止血是控制出血的急救技术，包括指压止血法、止血带止血法等，用于大出血伤员的现场处理。",count:4,culture:"临床应用",medium:"技术",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-12",title:"包扎",type:"concept",gloss:"对伤口进行覆盖和固定的技术。",desc:"包扎是现场救护的基本技术。",summary:"包扎是用敷料和绷带对伤口进行覆盖和固定，防止感染和进一步损伤的急救技术。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-13",title:"固定",type:"concept",gloss:"骨折或损伤部位的制动技术。",desc:"固定是院前急救中保护伤员的重要措施。",summary:"固定是对骨折或脊柱损伤部位进行制动，防止搬运中加重损伤的急救技术。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-3"}]},{id:"concept-14",title:"搬运",type:"concept",gloss:"转移伤员体位的技术。",desc:"正确搬运可避免二次损伤。",summary:"搬运是将伤员从现场转移到担架或救护车上的技术，包括双人搬运法、四人搬运法等，需注意脊柱保护。",count:5,culture:"临床应用",medium:"技术",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-3"}]},{id:"concept-15",title:"英美模式",type:"concept",gloss:"院前急救的一种模式，注重快速转运。",desc:"英美模式采用统一应急号码，集消防、警察和医疗急救为一体。",summary:"英美模式突出“急”字，强调以医院急诊为中心，快速将伤病员转运至医院，救护车仅配备简单器械和药品。",count:2,culture:"拓展延伸",medium:"模式",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-16",title:"欧洲模式",type:"concept",gloss:"院前急救的一种模式，注重现场救治。",desc:"欧洲模式将医院送到患者身边。",summary:"欧洲模式突出“救”字，强调院前救治，救护车配备经验丰富的医生和齐全设备，相当于移动ICU。",count:2,culture:"拓展延伸",medium:"模式",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-17",title:"中国模式",type:"concept",gloss:"中国特色的院前急救模式体系。",desc:"中国模式各地区各具特色，逐步完善。",summary:"中国院前急救模式介于英美和欧洲模式之间，包括独立型、依托型、行政型和院前型四种代表性形式。",count:2,culture:"拓展延伸",medium:"模式",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-18",title:"生存链",type:"concept",gloss:"抢救危重症患者的关键环节序列。",desc:"生存链中第一环是紧急呼救。",summary:"生存链是抢救危重症患者的系列关键环节，呼救系统畅通被列为第一环，强调早期呼救的重要性。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-3"}]},{id:"concept-19",title:"急救电话120",type:"concept",gloss:"中国医疗急救电话号码。",desc:"拨打120是启动院前急救的重要方式。",summary:"120是中国大陆统一的医疗急救电话号码，用于呼叫院前急救服务。",count:2,culture:"基础理论",medium:"工具",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-3"}]},{id:"concept-20",title:"救护车",type:"concept",gloss:"急救专用车辆。",desc:"救护车是院前急救的移动平台。",summary:"救护车是院前急救中最为常用的专用运输工具，用于转运伤病员并实施途中救护。",count:5,culture:"基础理论",medium:"工具",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第三节 院前急救",pn:"pn-2"}]},{id:"concept-triage",title:"预检分诊",type:"concept",gloss:"对急诊患者进行快速评估和分类，确定就诊优先级。",desc:"分诊护士由有多年急诊工作经验的护士担任，使用分级制度安排就诊。",summary:"预检分诊是急诊科护士根据患者病情轻重缓急进行分级、登记并联系诊室医生救治的过程，是急诊患者就诊的第一站。",count:10,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-2"}]},{id:"concept-green-channel",title:"急救绿色通道",type:"concept",gloss:"为危重症患者提供的快速生命安全通道。",desc:"能有效缩短救治时间，降低伤残率和病死率。",summary:"急救绿色通道是对急危重症患者在分诊、诊疗、检查、治疗、手术及住院等环节上实施快速、有序、安全、有效急救服务的机制。",count:8,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-3"}]},{id:"concept-first-diagnosis-responsibility",title:"首诊负责制",type:"concept",gloss:"第一接诊医生对患者全程负责的制度。",desc:"包括医院、科室、医生三级。",summary:"首诊负责制是指第一位接诊医生对其接诊患者，特别是急危重症患者的检查、诊断、治疗、会诊、转诊、转科、转院等工作负责到底的制度。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-4"}]},{id:"concept-three-zone-four-level",title:"三区四级",type:"concept",gloss:"急诊分区分级标准，包括红/黄/绿三区和Ⅰ/Ⅱ/Ⅲ/Ⅳ四级。",desc:"根据病情严重程度分配医疗资源。",summary:"三区四级是急诊科分区救治和病情分级体系，红区（抢救监护区）适用于Ⅰ级和Ⅱ级患者，黄区（密切观察诊疗区）适用于Ⅲ级患者，绿区（快速处置区）适用于Ⅳ级患者。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-5"}]},{id:"concept-ample-formula",title:"AMPLE公式",type:"concept",gloss:"创伤患者病史采集的速记公式。",desc:"用于创伤患者创伤机制的评估。",summary:"AMPLE公式是创伤患者问诊的标准化方法，包括过敏史（A）、当前用药（M）、相关病史（P）、最后进食时间（L）和创伤相关事件/环境（E）。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-6"}]},{id:"concept-oldcart-formula",title:"OLDCART公式",type:"concept",gloss:"症状评估的标准化问诊公式。",desc:"用于系统收集患者症状信息。",summary:"OLDCART公式用于评估各种不适症状，包括发病时间（O）、部位（L）、持续时间（D）、不适特点（C）、加重因素（A）、缓解因素（R）和来诊前治疗（T）。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-7"}]},{id:"concept-pqrst-formula",title:"PQRST公式",type:"concept",gloss:"疼痛评估的标准化问诊公式。",desc:"帮助护士全面了解疼痛特征。",summary:"PQRST公式适用于疼痛患者的评估，包括诱因（P）、性质（Q）、放射（R）、程度（S）和时间（T）。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-8"}]},{id:"concept-level-i-patient",title:"Ⅰ级患者（濒危患者）",type:"concept",gloss:"病情最危急的一级，需要即刻抢救。",desc:"分诊分级中的最高级别。",summary:"Ⅰ级为濒危患者，指正在或即将发生生命威胁或病情恶化的患者，如心搏呼吸骤停、急性意识障碍、气道不能维持、明确心肌梗死、重度创伤大出血等，响应时间为即刻。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-9"}]},{id:"concept-level-ii-patient",title:"Ⅱ级患者（危重患者）",type:"concept",gloss:"次危急级别，需快速处置。",desc:"分诊分级中的第二级别。",summary:"Ⅱ级为危重患者，指病情危重或有可能急剧恶化，短时间内有可能进展至Ⅰ级，如急性脑卒中、严重骨折、主动脉夹层等，响应时间小于10分钟。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-10"}]},{id:"concept-level-iii-patient",title:"Ⅲ级患者（急症患者）",type:"concept",gloss:"普通急症级别。",desc:"分诊分级中的第三级别。",summary:"Ⅲ级为急症患者，有急性症状和急诊问题，但生命体征尚稳定，目前明确没有危及生命或致残危险，如高热、呕吐、轻度外伤等，响应时间小于30分钟。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-11"}]},{id:"concept-level-iv-patient",title:"Ⅳ级患者（非急症患者）",type:"concept",gloss:"最轻级别，可等待较长时间。",desc:"分诊分级中的最低级别。",summary:"Ⅳ级为非急症患者，目前无急性发病症状，如轻、中度发热，响应时间小于240分钟。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-12"}]},{id:"concept-resuscitation-room",title:"抢救室",type:"concept",gloss:"急诊科中专门进行紧急抢救的区域。",desc:"每床净使用面积不少于15m²。",summary:"抢救室是急诊科内用于抢救危重患者的专用房间，应邻近预检分诊台，配备旋转式无影灯、抢救床、各种抢救仪器设备和药品。",count:6,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-13"}]},{id:"concept-eicu",title:"急诊重症监护室（EICU）",type:"concept",gloss:"急诊科内的重症监护单元。",desc:"配备监护仪、除颤起搏器、呼吸机等设备。",summary:"急诊重症监护室主要收治中毒、休克、严重创伤、急性心力衰竭、急性呼吸衰竭等急危重症患者，位置最好邻近急诊抢救室。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-14"}]},{id:"concept-gastric-lavage-room",title:"洗胃室",type:"concept",gloss:"专门进行洗胃操作的区域。",desc:"应配备两台自动洗胃机以备故障替换。",summary:"洗胃室是急诊科内用于中毒患者洗胃急救的专门房间，配备自动洗胃机、胃管、压舌板等用品。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-15"}]},{id:"concept-isolation-room",title:"隔离室",type:"concept",gloss:"用于隔离疑似传染病患者的专用房间。",desc:"防止交叉感染。",summary:"隔离室用于对有疑似传染病的患者进行隔离诊治，配有专用卫生间和隔离用品，确诊后转入传染病科或传染病院。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-16"}]},{id:"concept-six-fix",title:"六定管理",type:"concept",gloss:"急救药品和物品的规范化管理制度。",desc:"确保设备药品完好率100%。",summary:"六定管理是急诊科急救物品管理的基本制度，包括定点放置、定人保管、定时保养和维修、定时检查、定量供应、定期消毒。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-17"}]},{id:"concept-emergency-nursing-competence",title:"急诊护理人员素质要求",type:"concept",gloss:"对急诊护士职业道德、心理、业务、管理和身体素质的综合要求。",desc:"包括保护患者隐私、慎独精神等。",summary:"急诊科护理人员应具备高尚职业道德、坚强毅力、扎实业务基础、一定管理能力和良好身体素质，经规范化培训合格。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-18"}]},{id:"concept-documentation-after-resuscitation",title:"抢救后6小时内补记",type:"concept",gloss:"抢救记录的补记时限规定。",desc:"确保医疗文书的完整性和及时性。",summary:"因抢救未能及时记录的，有关医务人员应当在抢救结束后6小时内据实补记，记录包括就诊时间、抢救时间、用药时间、药物名称、剂量及病情变化等。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第四节 急诊科救护",pn:"pn-19"}]},{id:"concept-icu",title:"重症监护病房(ICU)",type:"concept",gloss:"ICU是重症医学的临床基地，配备专职医护人员和监护治疗设备，收治各科危重患者。",desc:"现代化医院的重要组成部分，衡量急救医疗水平的重要指标。",summary:"重症监护病房是集中专业医护人员和先进设备，对危重患者进行连续性监测和积极治疗的专门管理单元，旨在提高抢救成功率、降低病死率。",count:45,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-1"}]},{id:"concept-comprehensive-icu",title:"综合重症监护病房",type:"concept",gloss:"与专科ICU相对，任务更广泛。",desc:"收治多学科危重患者的ICU类型。",summary:"在专科ICU基础上发展起来的跨学科、面向全院的监护病房，收治多学科危重患者，监护和支持各脏器功能。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-2"}]},{id:"concept-specialized-icu",title:"专科重症监护病房",type:"concept",gloss:"针对单一专科的ICU。",desc:"如冠心病监护病房(CCU)、呼吸监护病房(RICU)。",summary:"在某一专科范围内建立的加强监护病房，专门收治该专业范围内的危重患者，如CCU、RICU等。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-3"}]},{id:"concept-partial-comprehensive-icu",title:"部分综合重症监护病房",type:"concept",gloss:"介于专科和综合之间的ICU类型。",desc:"收治多个邻近专科的重症患者。",summary:"多个邻近专科联合建立的重症监护病房，如外科重症监护病房，收治外科各专科术后危重患者。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-4"}]},{id:"concept-ccu",title:"冠心病监护病房(CCU)",type:"concept",gloss:"Cardiac Care Unit的缩写。",desc:"冠心病专科ICU。",summary:"专门收治冠心病患者的专科重症监护病房，是专科ICU的一种。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-3"}]},{id:"concept-ricu",title:"呼吸监护病房(RICU)",type:"concept",gloss:"Respiratory Care Unit的缩写。",desc:"呼吸专科ICU。",summary:"专门收治呼吸系统危重患者的专科重症监护病房。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-3"}]},{id:"concept-central-monitoring-station",title:"中心监护站",type:"concept",gloss:"ICU内护士对患者进行集中观察的场所。",desc:"通常置于护士中心监护站。",summary:"位于护士站，可直接观察到所有病床，配备中心监测显示仪、电子计算机等，便于集中监护。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-5"}]},{id:"concept-computer-network-monitoring-system",title:"计算机网络监护系统",type:"concept",gloss:"ICU常见的监护技术架构。",desc:"6～10台床边监护仪组成网络。",summary:"由多台床边监护仪组成的网络系统，中心监护台可同时监护多个患者，实现数据共享。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-6"}]},{id:"concept-closed-circuit-tv-monitoring-system",title:"闭路电视监控系统",type:"concept",gloss:"用于ICU患者监控的电视系统。",desc:"各病室安装转式搜寻器。",summary:"通过摄像机和大屏幕显示器，在中心监护站同时监控多个患者，辅助全面观察。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-7"}]},{id:"concept-multifunction-monitor",title:"多功能监护仪",type:"concept",gloss:"ICU必备监护设备。",desc:"每床配备床旁监护系统的基础设备。",summary:"可连续监测心电、血压、脉搏、血氧饱和度等基本生命体征的医疗设备。",count:2,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-8"}]},{id:"concept-ventilator",title:"呼吸机",type:"concept",gloss:"机械通气设备。",desc:"ICU必备治疗设备。",summary:"用于支持或替代患者呼吸功能的医疗设备，ICU每床至少配备一台。",count:6,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-9"}]},{id:"concept-defibrillator",title:"除颤器",type:"concept",gloss:"心脏骤停抢救设备。",desc:"ICU必备抢救设备。",summary:"用于电击除颤、恢复心脏正常节律的急救设备。",count:1,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-10"}]},{id:"concept-pacemaker",title:"起搏器",type:"concept",gloss:"心脏起搏设备。",desc:"ICU抢救设备之一。",summary:"用于产生电脉冲刺激心脏，维持正常心律的医疗装置。",count:1,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-10"}]},{id:"concept-cardiopulmonary-resuscitation-machine",title:"心肺复苏机",type:"concept",gloss:"机械CPR设备。",desc:"ICU必备抢救设备。",summary:"自动进行胸外按压、辅助通气的急救设备，提高心肺复苏质量。",count:1,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-10"}]},{id:"concept-infusion-pump",title:"输液泵",type:"concept",gloss:"静脉输液控制设备。",desc:"每床配备，用于输液管理。",summary:"用于精确控制输液速度和量的医疗设备。",count:3,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-11"}]},{id:"concept-micro-injection-pump",title:"微量注射泵",type:"concept",gloss:"小容量精确注射泵。",desc:"ICU常用设备。",summary:"用于微量药物精确输注的泵装置，每床配备2套以上。",count:2,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-11"}]},{id:"concept-ecg-machine",title:"心电图机",type:"concept",gloss:"心电图记录设备。",desc:"ICU配置设备之一。",summary:"记录心脏电活动波形的医疗仪器，用于诊断心律失常等。",count:2,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-10"}]},{id:"concept-bedside-x-ray-machine",title:"床边X线机",type:"concept",gloss:"移动X光机。",desc:"ICU辅助诊断设备。",summary:"可在床旁进行X线检查的移动式设备，便于危重患者影像学检查。",count:1,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-10"}]},{id:"concept-blood-gas-analyzer",title:"血气分析仪",type:"concept",gloss:"血气分析设备。",desc:"ICU必备检验设备。",summary:"用于检测动脉血中氧分压、二氧化碳分压、pH等指标的仪器。",count:1,culture:"核心概念",medium:"设备",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-10"}]},{id:"concept-level-1-monitoring",title:"一级监护",type:"concept",gloss:"最严密监护级别。",desc:"每2-4h测CVP，每4-6h动脉血气等。",summary:"适用于重要器官功能衰竭、随时有生命危险患者的最高级别监护，包括连续心电、频繁血气分析等。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-12"}]},{id:"concept-level-2-monitoring",title:"二级监护",type:"concept",gloss:"中度监护级别。",desc:"每1-2h测血压，每8h动脉血气等。",summary:"适用于两个以上重要器官功能不全、生命体征相对稳定者的监护级别，监测频率低于一级。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-13"}]},{id:"concept-level-3-monitoring",title:"三级监护",type:"concept",gloss:"最低监护级别。",desc:"每1-2h测血压，每日动脉血气等。",summary:"适用于单个重要器官功能不全、生命体征稳定者的最低级别监护，监测项目较少。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-14"}]},{id:"concept-endogenous-infection",title:"内源性感染",type:"concept",gloss:"感染来源为患者自身。",desc:"ICU医院内感染类型之一。",summary:"又称自身感染，由患者自身正常菌群或定植菌引起的感染。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-15"}]},{id:"concept-exogenous-infection",title:"外源性感染",type:"concept",gloss:"感染来源为外部环境。",desc:"ICU医院内感染类型之一。",summary:"又称交叉感染，病原体来自患者体外，如其他患者、工作人员、环境或污染医疗器械。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-16"}]},{id:"concept-maternal-neonatal-infection",title:"母婴感染",type:"concept",gloss:"垂直传播感染。",desc:"ICU医院内感染类型之一。",summary:"分娩过程中胎儿经胎盘或产道发生的感染。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-17"}]},{id:"concept-mrsa",title:"抗甲氧西林金黄色葡萄球菌(MRSA)",type:"concept",gloss:"Methicillin-resistant Staphylococcus aureus。",desc:"ICU重点防控的耐药菌。",summary:"耐甲氧西林的金黄色葡萄球菌，是ICU常见的多重耐药菌，需要隔离管理。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-18"}]},{id:"concept-non-invasive-ventilation",title:"无创通气",type:"concept",gloss:"无创呼吸支持技术。",desc:"使用呼吸机辅助呼吸时优先考虑。",summary:"通过面罩等无创方式给予呼吸支持，避免气管插管或切开。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-19"}]},{id:"concept-tracheal-intubation",title:"气管插管",type:"concept",gloss:"建立人工气道技术。",desc:"ICU常用操作，需严格掌握适应证。",summary:"将导管经口或鼻插入气管，建立人工气道的方法。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-19"}]},{id:"concept-tracheotomy",title:"气管切开",type:"concept",gloss:"外科建立人工气道。",desc:"用于需要长期呼吸支持的患者。",summary:"在颈部气管前壁切开并置入导管，建立长期人工气道的方法。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-19"}]},{id:"concept-central-venous-catheter",title:"深静脉导管",type:"concept",gloss:"中心静脉通路。",desc:"置管时需最大无菌屏障。",summary:"置入中心静脉的导管，用于监测CVP、输注药物和营养液等。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-20"}]},{id:"concept-hand-hygiene",title:"手卫生",type:"concept",gloss:"感染控制基本措施。",desc:"ICU每床旁须放置手部消毒装置。",summary:"通过洗手、使用手消毒剂等方式减少手部微生物的措施，是感染控制基础。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-21"}]},{id:"concept-isolation-gown",title:"隔离衣",type:"concept",gloss:"个人防护装备。",desc:"接触MRSA等需穿隔离衣。",summary:"用于接触特殊感染患者或可能发生体液喷溅时穿着的防护服装。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-18"}]},{id:"concept-n95-mask",title:"N95口罩",type:"concept",gloss:"高效防护口罩。",desc:"接触禽流感、SARS等时佩戴。",summary:"可过滤95%以上非油性颗粒物的防护口罩，用于高传染性呼吸道感染防护。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-18"}]},{id:"concept-icu-admission-criteria",title:"ICU收治对象",type:"concept",gloss:"ICU收治标准。",desc:"包括10类患者，如创伤、休克、严重心梗等。",summary:"指适宜收入ICU治疗的患者类型，包括MODS、心肺复苏后、严重多发性复合伤等。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-22"}]},{id:"concept-icu-transfer-assessment",title:"危重患者安全转运评估标准",type:"concept",gloss:"转运风险评估工具。",desc:"转出前10分钟完成。",summary:"用于评估危重患者转出ICU时转运安全性的标准，决定是否携带抢救物品。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-23"}]},{id:"person-yang-ping",title:"杨萍",type:"person",gloss:"教材编者。",desc:"本模块目标检测后署名作者。",summary:"教材《急危重症护理学》模块作者之一，参与编写重症监护章节。",count:1,culture:"拓展延伸",medium:"书籍",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-24"}]},{id:"person-wang-ya-ni",title:"王亚妮",type:"person",gloss:"教材编者。",desc:"本模块目标检测后署名作者。",summary:"教材《急危重症护理学》模块作者之一，参与编写重症监护章节。",count:1,culture:"拓展延伸",medium:"书籍",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-24"}]},{id:"person-qin-kang-hong",title:"秦抗洪",type:"person",gloss:"教材编者。",desc:"本模块目标检测后署名作者。",summary:"教材《急危重症护理学》模块作者之一，参与编写重症监护章节。",count:1,culture:"拓展延伸",medium:"书籍",refs:[{chapter:"ch1",title:"第一章 急危重症护理学基础知识 / 第五节 重症监护",pn:"pn-24"}]},{id:"concept-1",title:"心搏骤停",type:"concept",gloss:"心脏突然停止有效收缩和排血，引起循环和呼吸功能丧失。",desc:"心搏骤停是临床上最危重的急症，需立即进行心肺复苏。",summary:"心脏因急性原因突然丧失有效排血功能，导致循环和呼吸停止，全身组织缺血、缺氧。",count:15,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-1"},{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-2"}]},{id:"concept-2",title:"心脏性猝死",type:"concept",gloss:"心脏原因导致的不可逆生物学死亡。",desc:"心搏骤停通过紧急治疗有逆转可能，而心脏性猝死是生物学功能不可逆停止。",summary:"急性症状发作后1h内发生的以意识骤然丧失为特征、由心脏原因引起的生物学死亡。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-3"}]},{id:"concept-4",title:"心肺脑复苏",type:"concept",gloss:"扩展的心肺复苏，注重脑复苏。",desc:"心肺脑复苏是心搏骤停后恢复自主循环、呼吸并施加脑保护的紧急救治措施。",summary:"包括心、肺、脑复苏三个主要环节，在CPR基础上增加脑保护措施。",count:7,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-6"}]},{id:"concept-5",title:"基础生命支持",type:"concept",gloss:"初期心肺复苏，即CABD四步。",desc:"BLS是心搏骤停后挽救生命的最关键措施。",summary:"通过徒手操作保持心脏输出量，供应重要脏器已氧合的血液，包括胸外心脏按压、开放气道、人工呼吸和除颤。",count:5,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-7"}]},{id:"concept-6",title:"进一步生命支持",type:"concept",gloss:"高级生命支持，在BLS基础上进行。",desc:"ACLS由专业人员在医疗单位进行，改善并保持心肺功能。",summary:"应用辅助设备及特殊技术建立和维持有效通气与血液循环，包括静脉通路、药物、电除颤、气管插管等。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-8"}]},{id:"concept-7",title:"持续生命支持",type:"concept",gloss:"复苏后期的生命支持。",desc:"PLS包括脑复苏和并发症防治。",summary:"复苏后对生命持续维护，重点在脑保护、脑复苏及多器官功能监测与治疗。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-9"}]},{id:"concept-8",title:"胸外心脏按压",type:"concept",gloss:"人工循环的核心技术。",desc:"按压部位在胸骨下半部，深度5-6cm，频率100-120次/分。",summary:"通过按压胸骨推动血液流动，维持重要脏器供血、供氧。",count:10,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-10"},{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-11"}]},{id:"concept-9",title:"开放气道",type:"concept",gloss:"确保人工呼吸有效的气道管理技术。",desc:"开放气道是心肺复苏的关键步骤之一。",summary:"通过手法清除呼吸道异物并保持气道通畅，常用仰头举颏法、双手托颌法等。",count:6,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-12"}]},{id:"concept-10",title:"人工呼吸",type:"concept",gloss:"呼吸支持技术。",desc:"常用口对口、口对鼻、口对口鼻人工呼吸法。",summary:"用人工方法使气体进入和排出肺，保障氧供给和二氧化碳排出。",count:8,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-13"}]},{id:"concept-11",title:"电除颤",type:"concept",gloss:"治疗心室颤动最有效的方法。",desc:"早期除颤联合CPR可提高心搏骤停存活率。",summary:"借用除颤器向心脏放电以终止心室颤动，恢复有效心律。",count:6,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-14"}]},{id:"concept-12",title:"自动体外除颤器",type:"concept",gloss:"公共场所配置的急救设备。",desc:"AED可提高院外心搏骤停患者的存活率。",summary:"便携式除颤设备，具有自动识别心电节律、充电、放电和自检功能，易于非专业人员操作。",count:4,culture:"临床应用",medium:"设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-15"}]},{id:"concept-13",title:"心室颤动",type:"concept",gloss:"心搏骤停最常见类型。",desc:"室颤是冠心病猝死的最常见原因，早期除颤复苏成功率高。",summary:"心室肌发生极不规则、快速的颤动，ECG显示QRS波群消失，代之以大小不等、形态各异的颤动波，频率200-400次/分。",count:6,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-16"}]},{id:"concept-14",title:"心脏停搏",type:"concept",gloss:"心搏停止的一种类型。",desc:"心脏停搏是心搏骤停的类型之一。",summary:"心房、心室肌完全失去电活动能力，心电图呈一条直线或偶见P波。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-17"}]},{id:"concept-15",title:"心脏电机械分离",type:"concept",gloss:"无脉性电活动。",desc:"心肌有电活动但不能产生有效泵血。",summary:"心肌存在生物电活动但无有效机械收缩，ECG出现宽而畸形的QRS波群，频率低于30次/分。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-18"}]},{id:"concept-16",title:"急性冠脉综合征",type:"concept",gloss:"冠心病急性发作的表现。",desc:"急性冠脉综合征是导致心搏骤停的常见心源性疾病。",summary:"包括急性心肌梗死和不稳定型心绞痛等，常引发心室颤动或心室停搏，是成人心搏骤停的主要原因。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-19"}]},{id:"concept-17",title:"肾上腺素",type:"concept",gloss:"心肺复苏首选药物。",desc:"肾上腺素可提高主动脉舒张压，改善冠脉和脑血流。",summary:"α和β受体兴奋剂，是治疗心搏骤停的首选药物，能加速心率、增强心肌收缩、提高电除颤成功率。",count:4,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-20"}]},{id:"concept-18",title:"胺碘酮",type:"concept",gloss:"心肺复苏中抗心律失常药。",desc:"胺碘酮用于难治性室颤或无脉性室速。",summary:"抗心律失常药物，用于电除颤和血管加压药物无效时，可提高除颤成功率。",count:2,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-21"}]},{id:"concept-19",title:"利多卡因",type:"concept",gloss:"抗室性心律失常药。",desc:"利多卡因用于预防和终止心室颤动。",summary:"治疗急性心肌梗死并发多发性室性期前收缩的首选药物，可提高心室颤动阈值。",count:2,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-22"}]},{id:"concept-20",title:"阿托品",type:"concept",gloss:"抗胆碱药，用于心动过缓。",desc:"阿托品也用于抑制腺体分泌和缓解支气管痉挛。",summary:"M胆碱能受体阻断药，适用于迷走神经反射所致心搏骤停，可提高窦房结和房室结自律性。",count:2,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-23"}]},{id:"concept-21",title:"碳酸氢钠",type:"concept",gloss:"纠正酸中毒的药物。",desc:"不宜常规使用，应以改善通气为主。",summary:"用于纠正代谢性酸中毒，在心肺复苏中仅在长时间心搏骤停或严重酸中毒时使用。",count:3,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-24"}]},{id:"concept-22",title:"仰头举颏法",type:"concept",gloss:"无颈椎损伤时的气道开放手法。",desc:"适用于无头颈部创伤表现的患者。",summary:"一手压前额使头后仰，另一手抬下颏，使口微张，是开放气道最常用的方法。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-25"}]},{id:"concept-23",title:"双手托颌法",type:"concept",gloss:"安全的气道开放手法。",desc:"避免颈部过度活动。",summary:"双手抓住下颌骨向上提起，使头后仰，适用于怀疑颈椎损伤的患者。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-26"}]},{id:"concept-24",title:"口对口人工呼吸",type:"concept",gloss:"最常用的人工呼吸方法。",desc:"每次吹气时间1秒以上，潮气量500-600mL。",summary:"救护者捏住患者鼻孔，口对口吹气，以胸廓抬起为有效标志。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-27"}]},{id:"concept-25",title:"简易呼吸器",type:"concept",gloss:"手动呼吸支持设备。",desc:"节省人力，提高供氧效率。",summary:"球囊-面罩通气装置，供氧效果优于徒手人工呼吸，适用于转运和气管插管前的呼吸支持。",count:2,culture:"临床应用",medium:"设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-28"}]},{id:"concept-27",title:"气管切开术",type:"concept",gloss:"长期人工气道建立方法。",desc:"可减少无效腔，便于气道管理。",summary:"适用于需要较长时间控制气道者，如心肺复苏后长期昏迷患者。",count:1,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-30"}]},{id:"concept-28",title:"胸外心脏按压与人工呼吸比",type:"concept",gloss:"CPR操作中的比例关系。",desc:"5个循环（约2分钟）为一个周期。",summary:"成人按压-通气比为30:2，即连续30次按压后给予2次人工呼吸。",count:2,culture:"临床应用",medium:"技术参数",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-31"}]},{id:"concept-29",title:"脑复苏",type:"concept",gloss:"心肺脑复苏的重要组成部分。",desc:"脑复苏决定存活质量。",summary:"复苏后对脑功能进行保护与恢复，包括维持血压、控制颅内压、脑保护药物等。",count:4,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-32"}]},{id:"person-1",title:"Peter Safar",type:"person",gloss:"CPR先驱。",desc:"Safar贡献了人工呼吸方法。",summary:"1958年明确口对口人工呼吸优于其他方法，是现代心肺复苏术奠基人之一。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-34"}]},{id:"person-2",title:"William Kouwenhoven",type:"person",gloss:"胸外心脏按压创始人。",desc:"Kouwenhoven奠定了现代CPR的基础。",summary:'1960年首次倡导"不开胸心脏按压术"，开创胸外心脏按压为基础的心肺复苏术。',count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-35"}]},{id:"organization-1",title:"美国心脏协会",type:"organization",gloss:"AHA",desc:"AHA发布心肺复苏及心血管急救指南。",summary:"从1974年开始制订心肺复苏指南，并定期更新，是全球CPR标准的重要制定机构。",count:4,culture:"拓展延伸",medium:"机构",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-36"}]},{id:"concept-31",title:"C-A-B程序",type:"concept",gloss:"CPR操作顺序优化。",desc:"减少按压延误，提高复苏成功率。",summary:"2010年AHA指南将传统A-B-C改为C-A-B，即先胸外心脏按压、再开放气道、后人工呼吸，以尽快开始按压。",count:3,culture:"临床应用",medium:"流程",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-37"}]},{id:"concept-32",title:"口咽通气管",type:"concept",gloss:"辅助气道管理工具。",desc:"常用于进一步生命支持。",summary:"置于口咽部，防止舌后坠，保持气道通畅，可配合人工通气。",count:1,culture:"临床应用",medium:"设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-38"}]},{id:"concept-33",title:"鼻咽通气管",type:"concept",gloss:"经鼻气道辅助工具。",desc:"同口咽通气管一起用于气道管理。",summary:"经鼻腔插入咽部，防止舌后坠，适用于清醒或半清醒患者。",count:1,culture:"临床应用",medium:"设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-39"}]},{id:"concept-34",title:"复苏体位",type:"concept",gloss:"心肺复苏体位。",desc:"确保按压有效并避免继发损伤。",summary:"患者仰卧于硬板或地面，头颈躯干平直无扭曲，双手放于身体两侧。",count:1,culture:"临床应用",medium:"操作规范",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-40"}]},{id:"concept-35",title:"颈动脉搏动判断",type:"concept",gloss:"判断心搏骤停的可靠方法。",desc:"专业救护者需掌握此技术。",summary:"触摸患者喉结旁胸锁乳突肌内侧凹陷处，检查时间不超过10秒。",count:2,culture:"临床应用",medium:"操作技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-41"}]},{id:"concept-36",title:"除颤能量",type:"concept",gloss:"电除颤能量设定。",desc:"能量选择影响除颤效果。",summary:"成人双向波除颤常用150J，儿童首次2J/kg，后续4J/kg。",count:2,culture:"临床应用",medium:"技术参数",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-42"}]},{id:"concept-37",title:"骨髓给药",type:"concept",gloss:"替代静脉给药途径。",desc:"骨髓给药效果相当于中心静脉。",summary:"当静脉通路无法建立时，通过骨髓腔内不塌陷的血管丛进行给药和液体复苏。",count:1,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-43"}]},{id:"concept-38",title:"心肺复苏有效表现",type:"concept",gloss:"复苏成功的判定标准。",desc:"这些征象提示心肺复苏有效。",summary:"患者出现自主呼吸、可触及大动脉搏动、颜面转红、瞳孔缩小、对光反射恢复、收缩压≥60mmHg。",count:1,culture:"临床应用",medium:"评估指标",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-44"}]},{id:"concept-39",title:"心肺复苏终止指标",type:"concept",gloss:"停止CPR的医学依据。",desc:"需专业判断。",summary:"复苏成功、持续抢救1小时仍无心跳脉搏、脑死亡。",count:1,culture:"临床应用",medium:"评估标准",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-45"}]},{id:"concept-40",title:"婴儿心肺复苏",type:"concept",gloss:"针对婴儿的CPR技术。",desc:"婴儿按压深度约4cm，频率100-120次/分。",summary:"婴儿CPR与成人基本相同，但按压部位在乳头连线中点下1横指，可采用环抱法或双手拇指重叠按压。",count:2,culture:"临床应用",medium:"操作流程",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-46"}]},{id:"concept-41",title:"阿托品用于心脏停搏",type:"concept",gloss:"阿托品特异性应用场景。",desc:"适用于迷走神经反射引起的心搏停止。",summary:"心脏停搏和无脉性电活动时，阿托品剂量为0.5mg静脉注射，3-5分钟可重复至总剂量3mg。",count:1,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-47"}]},{id:"concept-42",title:"2020年AHA心肺复苏指南",type:"concept",gloss:"最新CPR国际标准。",desc:"指南内容涉及CABD、AED使用等。",summary:"美国心脏协会2020年发布的最新心肺复苏及心血管急救指南，强调深呼吸按压、早期除颤等更新。",count:3,culture:"拓展延伸",medium:"指南",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第一节 心肺脑复苏术",pn:"pn-48"}]},{id:"concept-1",title:"通畅气道术",type:"concept",gloss:"通过开放气道解除梗阻的急救技术总称。",desc:"抢救危重症患者的基本条件，核心是保持呼吸道通畅。",summary:"通畅气道术是指当患者由于各种原因出现气道梗阻时，为保证呼吸道通畅、确保氧气顺利进入肺部而采取的抢救措施，包括海姆立克急救法、口咽通气管、喉罩、气管插管和气管切开等。",count:15,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-2",title:"气道梗阻",type:"concept",gloss:"各种原因导致的呼吸道部分或完全阻塞。",desc:"需要立即解除的危急状态。",summary:"气道梗阻是临床危重症患者死亡的原因之一，常见原因包括呼吸道异物阻塞、舌后坠、气道黏膜肿胀和痉挛等，需及时发现并有效处理。",count:8,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-3",title:"呼吸道异物阻塞",type:"concept",gloss:"异物进入呼吸道导致阻塞。",desc:"常引发剧烈咳嗽、呼吸困难，严重时可致死。",summary:"呼吸道异物阻塞是气道梗阻的常见原因，多由食物、异物等阻塞气管或咽喉部引起，海姆立克急救法是主要解除方法。",count:6,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-4",title:"舌后坠",type:"concept",gloss:"昏迷患者常见的上气道阻塞原因。",desc:"需通过放置口咽通气管或气管插管来解除。",summary:"舌后坠是指昏迷患者舌根松弛向后坠入咽部，导致气道阻塞，口咽通气管可有效防止舌后坠。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-5",title:"海姆立克急救法",type:"concept",gloss:"利用肺部残留气流冲出异物的急救技术。",desc:"适用于清醒或昏迷的呼吸道异物梗阻患者。",summary:"海姆立克急救法由亨利·海姆立克发明，通过冲击腹部膈肌下软组织产生向上气流，驱除气管异物，是解除呼吸道异物梗阻的主要方法。",count:12,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"person-1",title:"亨利·海姆立克",type:"person",gloss:"海姆立克急救法的发明者。",desc:"1974年首次报告腹部冲击法，1975年美国医学会以他的名字命名该法。",summary:"亨利·海姆立克（Henry Heimlich）是美国外科医生，发明了海姆立克急救法（腹部冲击法），成功挽救了数以万计呼吸道异物梗阻患者的生命。",count:3,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"culture-1",title:"美国医学会",type:"culture",gloss:"以海姆立克命名急救法的权威医学组织。",desc:"推动海姆立克急救法普及的重要机构。",summary:"美国医学会（American Medical Association）于1975年10月以亨利·海姆立克的名字命名了海姆立克急救法，并推荐在媒体上宣传推广。",count:1,culture:"拓展延伸",medium:"组织机构",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-6",title:"自救腹部冲击法",type:"concept",gloss:"患者自我施救的腹部冲击技术。",desc:"可用于独自一人时解除呼吸道异物。",summary:"自救腹部冲击法适用于气道不完全梗阻且意识清醒、无他人在场的患者，患者用空心拳置于脐上两横指处，向内向上快速冲击5次，可重复操作。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-7",title:"立位腹部冲击法",type:"concept",gloss:"对清醒患者实施的站立位腹部冲击。",desc:"患者需弯腰低头张口配合。",summary:"立位腹部冲击法适用于意识清醒的气道不完全或完全梗阻患者，救护者站于患者背后，双臂环腰，拳眼置于脐上两横指，向内向上冲击5次。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-8",title:"仰卧位腹部冲击法",type:"concept",gloss:"对昏迷患者实施的仰卧腹部冲击。",desc:"操作后需检查口腔并取出异物。",summary:"仰卧位腹部冲击法适用于意识不清的气道梗阻患者，患者仰卧位，救护者骑跨于髋部，掌根置于脐上两横指，快速向内向上冲击5次，重复直至异物排出。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-9",title:"胸部冲击法",type:"concept",gloss:"替代腹部冲击法的特殊人群技术。",desc:"注意避免肋骨骨折。",summary:"胸部冲击法适用于肥胖者和孕妇的呼吸道异物梗阻，双手置于患者胸骨中下部，快速冲击，避免使用腹部冲击法。",count:1,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-10",title:"背部叩击",type:"concept",gloss:"用于婴儿的背部叩击法。",desc:"配合胸部冲击性按压解除婴儿气道异物。",summary:"背部叩击是婴儿呼吸道异物梗阻的急救方法之一，救护者用掌根在患儿背部肩胛之间用力叩击5次，常与胸部冲击性按压交替进行。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-11",title:"胸部冲击性按压",type:"concept",gloss:"婴儿胸外按压式急救技术。",desc:"注意保持头低位并检查口腔。",summary:"胸部冲击性按压用于婴儿呼吸道异物梗阻，两指在胸骨上两乳头连线下一横指处快速向下冲击5次，与背部叩击交替进行。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-2",title:"喉罩",type:"medium",gloss:"操作简单的声门上气道设备。",desc:"禁忌用于喉部以下气道梗阻者。",summary:"喉罩由通气管和椭圆形罩体组成，置入后覆盖喉部，气囊充气形成密封圈，可连接呼吸机或氧气，适用于手术或呼吸困难患者。",count:5,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-13",title:"经口明视插管法",type:"concept",gloss:"直视下经口气管插管技术。",desc:"需配合使用喉镜、导管芯等用物。",summary:"经口明视插管法是临床应用最广泛的气管插管方法，使用喉镜暴露声门，在直视下将气管导管插入气管，操作简单、迅速。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-15",title:"经皮气管切开",type:"concept",gloss:"微创气管切开技术。",desc:"需准备一次性气管切开包等用物。",summary:"经皮气管切开是一种微创气管切开方式，使用穿刺、导丝和旋转扩张器置入气管切开套管，操作简便、创伤小，是临床常用方式。",count:3,culture:"临床应用",medium:"手术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-3",title:"气囊",type:"medium",gloss:"导管上的封闭装置。",desc:"需定时放气以防黏膜损伤。",summary:"气囊是气管导管或气管切开套管上的充气装置，注入空气后封闭气道与导管之间的间隙，防止漏气和误吸，压力需维持在25-30 cmH2O。",count:5,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-4",title:"喉镜",type:"medium",gloss:"暴露声门的插管器械。",desc:"需与气管导管配合使用。",summary:"喉镜是气管插管时用于暴露声门的器械，有成人、儿童和幼儿三种规格，镜片分弯型和直型，弯喉镜用于成人及年长儿，直喉镜用于新生儿或幼儿。",count:3,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-5",title:"气管导管",type:"medium",gloss:"插入气管的管道。",desc:"导管末端不居中时不能使用。",summary:"气管导管是带气囊的硅胶管，用于插入气管内建立人工气道，需根据患者情况选择合适型号，使用前检查气囊膨胀均匀性和导管末端是否居中。",count:4,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-6",title:"导管管芯",type:"medium",gloss:"辅助插管的金属芯。",desc:"插入后需在导管通过声门后退出。",summary:"导管管芯是铜质或铝质的细金属条，插入气管导管内以增加硬度和弯曲度，便于插入声门，其远端距导管开口0.5-1 cm。",count:2,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-7",title:"牙垫",type:"medium",gloss:"防止咬闭导管的保护装置。",desc:"固定时与导管一并胶布固定。",summary:"牙垫是经口气管插管时放置在患者牙齿之间的硬质物品，用于防止患者咬闭导管，保障气道通畅, 常与导管一起固定。",count:2,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-8",title:"负压吸引器",type:"medium",gloss:"清除分泌物的负压设备。",desc:"需配合吸痰管使用。",summary:"负压吸引器用于吸除呼吸道分泌物，保持气道通畅，在气管插管、气管切开及吸痰操作中均需使用，负压不可过大以避免损伤黏膜。",count:3,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-9",title:"吸痰管",type:"medium",gloss:"负压吸痰的管路。",desc:"操作前需湿润，动作轻柔。",summary:"吸痰管是一次性使用的细软管，连接负压吸引器用于经气管导管或气管切开套管吸除分泌物，需严格无菌操作，每次更换。",count:3,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-10",title:"简易呼吸气囊",type:"medium",gloss:"手动正压通气装置。",desc:"常用于插管前预氧合。",summary:"简易呼吸气囊（又称球囊-面罩）是手动通气装置，在气管插管前用于给予患者辅助通气1-2分钟，迅速提高组织器官含氧量。",count:2,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-11",title:"气管切开套管",type:"medium",gloss:"气管切开术后的人工气道。",desc:"需妥善固定，防止滑脱。",summary:"气管切开套管是置入气管切开部位的套管，用于维持新建立的气道，成人男性通常选用7.5-9.5mm，成人女性7-9mm，需充气固定。",count:3,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"device-12",title:"金属内套管",type:"medium",gloss:"金属套管的可替换内芯。",desc:"保持清洁以防气道阻塞。",summary:"金属内套管是金属气管切开套管的可拆卸内层管，需定期更换消毒，取出时间不超过30分钟，以防分泌物结痂阻塞。",count:1,culture:"临床应用",medium:"医疗设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第二节 通畅气道术",pn:"pn-1"}]},{id:"concept-1",title:"创伤",type:"concept",gloss:"机体遭受外力作用所造成的组织损伤或功能障碍。",desc:"创伤是本章救护技术的核心对象。",summary:"常见意外伤害，指机体受到外力作用导致的组织损伤，需要迅速评估生命体征并施行清创、止血、包扎、固定、搬运等技术。",count:5,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-1"}]},{id:"concept-2",title:"清创术",type:"concept",gloss:"清除开放伤口内异物和失活组织的手术方法。",desc:"创伤急救的第一项基本技术。",summary:"外科手术方法清除开放伤口内异物、坏死组织，使之成为清洁伤口，达到一期愈合，有利于功能和形态恢复。",count:12,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-2"}]},{id:"concept-3",title:"止血术",type:"concept",gloss:"控制出血的技术方法。",desc:"危重患者抢救的重要急救技术之一。",summary:"针对出血采取的各种止血方法，包括指压、加压包扎、填塞、加垫屈曲关节、止血带等，快速控制出血以挽救生命。",count:8,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-3"}]},{id:"concept-4",title:"包扎术",type:"concept",gloss:"用敷料和包扎材料处理伤口的技术。",desc:"创伤急救基本技术之一。",summary:"用绷带、三角巾等物品覆盖创面、固定敷料和骨折位置，达到保护伤口、压迫止血、减轻疼痛的目的。",count:8,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-4"}]},{id:"concept-7",title:"指压止血法",type:"concept",gloss:"用手指压迫动脉止血的方法。",desc:"无需器械的临时止血措施。",summary:"用手指压迫出血伤口近心端的动脉，临时阻断血流，适用于头、颈、四肢动脉出血，简便有效。",count:5,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-7"}]},{id:"concept-8",title:"加压包扎法",type:"concept",gloss:"通过加压包扎止血的方法。",desc:"常用且有效的止血方法。",summary:"用消毒敷料覆盖伤口后加压包扎，适用于体表四肢小动脉、静脉及毛细血管出血，是急救中最常用的止血方法之一。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-8"}]},{id:"concept-9",title:"填塞止血法",type:"concept",gloss:"用敷料填塞伤口止血的方法。",desc:"紧急止血方法，需尽快行手术止血。",summary:"用无菌敷料填入伤口内压紧，外加敷料加压包扎，适用于广泛深层软组织损伤出血，如腹股沟、腋窝、子宫等。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-9"}]},{id:"concept-10",title:"加垫屈曲关节止血法",type:"concept",gloss:"屈曲关节加垫止血的方法。",desc:"不便于搬动，不宜首选。",summary:"在肘窝或腘窝放置绷带卷后强屈关节并包扎，适用于肘或膝关节以下出血，无骨关节损伤时使用。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-10"}]},{id:"concept-11",title:"止血带止血法",type:"concept",gloss:"用止血带阻断血流的方法。",desc:"需严格掌握适应证和注意事项。",summary:"用橡皮止血带、充气止血带或临时替代物在肢体近心端扎紧以阻断血流，适用于四肢大出血且其他方法无效时。",count:9,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-11"}]},{id:"concept-12",title:"绷带包扎法",type:"concept",gloss:"绷带包扎的各种技术。",desc:"常用包扎方法之一。",summary:"使用绷带进行包扎的多种方法，包括环形、蛇形、螺旋形、螺旋反折、“8”字形、回返包扎等，适用于不同部位和伤口。",count:6,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-12"}]},{id:"concept-13",title:"三角巾包扎法",type:"concept",gloss:"三角巾包扎技术。",desc:"灵活方便，应用广泛。",summary:"使用三角巾进行包扎的多种方法，如头顶部、风帽式、面具式、眼部、肩胸背部、腹部臀部、四肢等部位的包扎。",count:6,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-13"}]},{id:"concept-14",title:"环形包扎法",type:"concept",gloss:"绷带环形缠绕的方法。",desc:"基础包扎方法之一。",summary:"在包扎部位做环形重叠缠绕，用于绷带包扎开始与结束时，以及颈、腕、胸、腹等周径相近部位的小伤口。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-14"}]},{id:"concept-15",title:"蛇形包扎法",type:"concept",gloss:"绷带斜行不重叠的包扎方法。",desc:"适用于简单固定。",summary:"以绷带宽度为间隔斜行上缠互不遮盖，用于夹板固定或从一处迅速延伸到另一处做简单固定。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-15"}]},{id:"concept-16",title:"螺旋形包扎法",type:"concept",gloss:"螺旋向上缠绕的包扎方法。",desc:"常用包扎方法之一。",summary:"稍微倾斜螺旋向上缠绕，后一周遮盖上一周1/3~1/2，适用于上臂、手指、躯干、大腿等周径基本相同的部位。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-16"}]},{id:"concept-17",title:"螺旋反折包扎法",type:"concept",gloss:"螺旋缠绕并反折的包扎方法。",desc:"适用于粗细不等部位。",summary:"螺旋缠绕时每周向下反折一定角度，遮盖上一周1/3~1/2，反折部位相同呈直线，适用于前臂、小腿等粗细不等的部位。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-17"}]},{id:"concept-18",title:"“8”字形包扎法",type:"concept",gloss:"关节部位的“8”字形缠绕包扎方法。",desc:"适用于屈曲关节。",summary:"先屈曲关节，以“8”字形缠绕绷带，每一周覆盖上一周1/3~1/2，适用于肘、肩、髋、膝等屈曲关节部位。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-18"}]},{id:"concept-19",title:"回返包扎法",type:"concept",gloss:"残端或顶端的绷带回返包扎方法。",desc:"适用于有顶端的部位。",summary:"先环形包扎，再将绷带向上反折交替覆盖残端中央和左右，每周覆盖上一周1/3~1/2，适用于指端、头部或截肢残端。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-19"}]},{id:"concept-20",title:"锁骨骨折固定法",type:"concept",gloss:"锁骨骨折的临时固定方法。",desc:"常见骨折固定方法之一。",summary:"用三角巾呈“8”字形绕两肩后拉紧在背后打结，或使用T形夹板固定锁骨骨折。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-20"}]},{id:"concept-21",title:"上臂骨折固定法",type:"concept",gloss:"上臂骨折的临时固定方法。",desc:"常见骨折固定方法之一。",summary:"用长、短两块夹板分别置于上臂后外侧和前内侧，骨折上下端固定，然后用三角巾悬吊于肘关节屈曲90°位。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-21"}]},{id:"concept-22",title:"前臂骨折固定法",type:"concept",gloss:"前臂骨折的临时固定方法。",desc:"常见骨折固定方法之一。",summary:"屈肘90°，拇指向上，两块夹板置于前臂内外两侧，用绷带固定后用三角巾悬吊于胸前呈功能位。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-22"}]},{id:"concept-23",title:"大腿骨折固定法",type:"concept",gloss:"大腿骨折的临时固定方法。",desc:"常见骨折固定方法之一。",summary:"两块夹板分别置于下肢内外侧，外侧从腋下至足跟下3cm，内侧从腹股沟至足跟下3cm，关节处加棉垫，绷带分段固定。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-23"}]},{id:"concept-24",title:"小腿骨折固定法",type:"concept",gloss:"小腿骨折的临时固定方法。",desc:"常见骨折固定方法之一。",summary:"两块夹板分别置于小腿内外侧，从足跟至大腿，绷带分段固定；无夹板时可借助健肢固定。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-24"}]},{id:"concept-25",title:"颈椎骨折固定法",type:"concept",gloss:"颈椎骨折的临时固定方法。",desc:"常见骨折固定方法之一。",summary:"仰卧位枕后垫软枕，头部两侧用软枕固定并用绷带固定在担架上，或使用颈托固定，限制头部晃动。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-25"}]},{id:"concept-26",title:"胸腰椎骨折固定法",type:"concept",gloss:"胸腰椎骨折的临时固定方法。",desc:"常见骨折固定方法之一。",summary:"俯卧于硬质担架或木板上，伤处垫软垫，绷带固定使躯体不得转动。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-26"}]},{id:"concept-27",title:"单人搬运法",type:"concept",gloss:"一人搬运伤员的方法。",desc:"搬运方法之一。",summary:"由一名救护者实施的搬运方法，包括扶持法、抱持法、背负法，适用于病情轻、路程近的伤员。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-27"}]},{id:"concept-28",title:"双人搬运法",type:"concept",gloss:"两人搬运伤员的方法。",desc:"搬运方法之一。",summary:"由两名救护者配合的搬运方法，包括轿式搬运法、椅托式搬运法、拉车式搬运法，适用于不同意识状态的伤员。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-28"}]},{id:"concept-29",title:"多人搬运法",type:"concept",gloss:"多人协作搬运伤员的方法。",desc:"搬运方法之一。",summary:"三人或六人同时托持伤员颈肩、腰臀、下肢等部位，齐步搬运，适用于胸腰椎骨折或伤势较重者。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-29"}]},{id:"concept-30",title:"担架搬运法",type:"concept",gloss:"使用担架搬运伤员的方法。",desc:"最常用的搬运工具和方法。",summary:"使用四轮担架、帆布担架、铲式担架等工具搬运伤员，头后脚前，保持水平，适用于病情重、运送距离远的伤员。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-30"}]},{id:"concept-31",title:"特殊伤员搬运法",type:"concept",gloss:"特殊伤员的搬运技术。",desc:"需根据伤情选择特殊体位和固定方法。",summary:"针对腹部内脏脱出、昏迷、骨盆损伤等特殊伤员的搬运方法，如屈腿、侧卧、三角巾包扎骨盆等。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-31"}]},{id:"person-1",title:"董奉",type:"person",gloss:"东汉医家，杏林文化的创始人。",desc:"教材素质拓展部分引用的人物。",summary:"东汉著名医家，与华佗、张仲景并称“建安三神医”，以不取报酬、令病愈者种杏树闻名，后世以“杏林”喻指中医界。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-32"}]},{id:"culture-1",title:"杏林",type:"culture",gloss:"中医界的代称。",desc:"教材素质拓展部分介绍的文化概念。",summary:"源于董奉治病种杏的故事，后世以“杏林”喻指中医界，以“杏林春暖”形容医生的仁心仁术。",count:1,culture:"拓展延伸",medium:"文化符号",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第三节 创伤急救技术",pn:"pn-32"}]},{id:"concept-1",title:"呼吸支持技术",type:"concept",gloss:"改善、维持或替代自主呼吸的技术总称",desc:"包括氧疗、气道维护、机械通气和体外生命支持等",summary:"呼吸支持技术是指一系列改善、维持、替代自主呼吸作用的技术手段的总称，主要包括氧疗、气道维护、机械通气和体外生命支持等技术。本节重点介绍了简易呼吸器和呼吸机的应用。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-1"}]},{id:"concept-4",title:"机械通气",type:"concept",gloss:"利用呼吸机辅助或替代呼吸的技术",desc:"包括有创和无创正压通气",summary:"机械通气是指使用呼吸机辅助或替代危重患者的呼吸，使患者恢复有效通气并改善氧合的技术。分为有创正压通气和无创正压通气两种方式，是临床常用的呼吸支持技术。",count:6,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-14"}]},{id:"concept-5",title:"氧疗",type:"concept",gloss:"通过供氧纠正低氧血症的治疗方法",desc:"呼吸支持技术的基础手段之一",summary:"氧疗是呼吸支持技术的重要组成部分，通过提供高于空气氧浓度的气体来纠正低氧血症。本节中简易呼吸器和呼吸机均涉及氧疗功能，如连接氧源调节吸氧浓度。",count:2,culture:"基础理论",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-1"}]},{id:"concept-6",title:"气道维护",type:"concept",gloss:"保持呼吸道通畅的措施",desc:"包括开放气道、清除异物、人工气道建立等",summary:"气道维护是呼吸支持技术的关键环节，包括保持气道通畅、清除异物、使用口咽通气管、建立人工气道等。在本节中，简易呼吸器使用前需保持气道开放，呼吸机可通过气管插管等维持气道。",count:3,culture:"基础理论",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-1"}]},{id:"concept-7",title:"体外生命支持",type:"concept",gloss:"通过体外装置替代心肺功能的技术",desc:"用于严重呼吸衰竭或心肺功能衰竭",summary:"体外生命支持是呼吸支持技术的高阶手段，包括体外膜肺氧合等技术，用于严重呼吸衰竭或心肺功能衰竭的患者。本节仅提及，未展开论述。",count:1,culture:"拓展延伸",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-1"}]},{id:"person-1",title:"Henning Ruben",type:"person",gloss:"简易呼吸器发明者，丹麦麻醉学家",desc:"发明自充气球囊和呼吸阀，奠定简易呼吸器基础",summary:"Henning Ruben是丹麦哥本哈根大学麻醉学教授，被称为“简易呼吸器之父”。他发明了自充气球囊，并与无再吸入呼吸阀结合，创造了现代简易呼吸器的雏形，后与Ambu公司合作推广。",count:2,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-4"}]},{id:"person-2",title:"Holger Hesse",type:"person",gloss:"Ambu公司创始人，推动简易呼吸器商业化",desc:"与Ruben合作，创建Ambu公司并推广Ambubag",summary:"Holger Hesse是Ambu公司的创始人，与Henning Ruben合作，将简易呼吸器商业化并推广至院前急救和转运领域，使Ambu公司成为呼吸球囊的代名词。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-4"}]},{id:"person-3",title:"Andreas Vesalius",type:"person",gloss:"人工通气的先驱，16世纪解剖学家",desc:"首次描述气管插管鼓风维持生命的方法",summary:"16世纪的解剖学家，第一次提出通过气管插管向动物肺内鼓风维持生命的方法，被认为是人工通气的先驱。在呼吸机历史演变中占有重要地位。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-15"}]},{id:"person-4",title:"Alfred Jones",type:"person",gloss:"第一台呼吸机的发明者",desc:"发明负压呼吸机，开创机械通气时代",summary:"美国人，1864年发明了世界上第一台呼吸机——负压呼吸机，让患者坐进密闭箱中，头部暴露，身体周围制造高低气压以辅助呼吸。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-15"}]},{id:"person-5",title:"Drinker",type:"person",gloss:"铁肺的发明者之一",desc:"与Shaw合作发明铁肺，推动负压通气发展",summary:"1928年与Shaw共同发明了“铁肺”，成功抢救了脊髓灰质炎患儿，开创机械通气里程碑，使负压呼吸机流行。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-15"}]},{id:"person-6",title:"Shaw",type:"person",gloss:"铁肺的共同发明者",desc:"与Drinker共同发明铁肺",summary:"与Drinker合作发明“铁肺”，成功用于脊髓灰质炎患儿的救治，是机械通气历史中的重要人物。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-15"}]},{id:"person-7",title:"Frenkner",type:"person",gloss:"第一台气动限压呼吸机研制者",desc:"发明Spiropulsator，改进为麻醉呼吸机",summary:"1934年研制出第一台气动限压呼吸机“Spiropulsator”，1940年与Crafoord合作改进，成为第一台麻醉呼吸机。",count:2,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-15"}]},{id:"person-8",title:"Crafoord",type:"person",gloss:"麻醉呼吸机合作改进者",desc:"与Frenkner合作开发第一台麻醉呼吸机",summary:"与Frenkner合作改进Spiropulsator呼吸机，使其能与环丙烷同时使用，成为第一台麻醉呼吸机。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-15"}]},{id:"person-9",title:"Emerson",type:"person",gloss:"电动控制呼吸机改良者",desc:"改良术后呼吸机，推动呼吸机电子化",summary:"1964年改良的术后呼吸机是一台电动控制呼吸机，配备压缩空气泵，各种功能由电子调节，使呼吸机进入精密的电子时代。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-15"}]},{id:"concept-8",title:"E-C手法",type:"concept",gloss:"固定面罩并开放气道的手法",desc:"C形按压面罩，E形托举下颌",summary:"E-C手法是使用简易呼吸器时固定面罩的标准手法。单手操作时，拇指和示指呈C形按压面罩，中指、环指和小指呈E形托举下颌骨，保持气道开放。双人操作时由一人双手执行E-C手法。",count:3,culture:"核心概念",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-9"}]},{id:"concept-9",title:"有创正压通气",type:"concept",gloss:"通过人工气道进行的正压通气",desc:"需气管插管或气管切开等有创操作",summary:"有创正压通气（IPPV）是经气管插管、喉罩、气管切开导管等建立人工气道后进行的正压通气，主要用于改善氧合和通气，缓解呼吸耗能，支持呼吸循环系统。",count:5,culture:"核心概念",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-16"}]},{id:"concept-10",title:"无创正压通气",type:"concept",gloss:"无需人工气道的正压通气方式",desc:"通过面罩等无创接口进行通气",summary:"无创正压通气（NIPPV）通过口鼻面罩、鼻罩等连接进行正压通气，不需建立人工气道，避免了相关并发症，但缺乏气管引流和密封性。适用于意识清楚、血流动力学稳定的患者。",count:4,culture:"核心概念",medium:"技术",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-16"}]},{id:"concept-11",title:"控制通气",type:"concept",gloss:"呼吸机完全控制患者的呼吸",desc:"适用于无自主呼吸的患者",summary:"控制通气（CMV）是一种完全由呼吸机控制通气的模式，患者无自主呼吸时使用。包括容积控制通气（VCV）和压力控制通气（PCV）两种基本类型。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-19"}]},{id:"concept-12",title:"辅助通气",type:"concept",gloss:"患者自主呼吸触发呼吸机辅助",desc:"需患者触发，呼吸机同步辅助",summary:"辅助通气（AV）是指患者存在自主呼吸时，吸气负压或气流触发呼吸机同步送气，用于自主呼吸规则但较弱的患者。可与控制通气结合形成辅助/控制通气模式。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-20"}]},{id:"concept-13",title:"辅助/控制通气",type:"concept",gloss:"辅助与控制相结合的通气模式",desc:"自动切换辅助与控制通气",summary:"辅助/控制通气（A/C）是辅助通气和控制通气的结合。当患者自主呼吸低于预设频率或不能触发时，呼吸机提供控制通气；当患者触发时，提供辅助通气。是常用模式之一。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-21"}]},{id:"concept-14",title:"同步间歇强制通气",type:"concept",gloss:"与自主呼吸同步的间歇强制通气",desc:"在自主呼吸基础上提供同步指令通气",summary:"同步间歇强制通气（SIMV）是改良的间歇指令通气，能根据患者自主呼吸触发同步送气，既保证通气又锻炼呼吸肌，是术后短期呼吸支持和撤机常用模式。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-22"}]},{id:"concept-15",title:"压力支持通气",type:"concept",gloss:"自主呼吸时给予压力辅助的通气模式",desc:"增强自主呼吸，减少呼吸做功",summary:"压力支持通气（PSV）是部分通气支持模式，在自主呼吸时给予一定压力辅助，提高潮气量和每分通气量，呼吸频率和吸气呼气时间由患者控制，人机协调性好，利于撤机。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-23"}]},{id:"concept-16",title:"持续气道正压通气",type:"concept",gloss:"整个呼吸周期提供持续正压的通气模式",desc:"用于自主呼吸患者，减少呼吸功",summary:"持续气道正压通气（CPAP）是在患者自主呼吸的整个呼吸周期内持续提供一定正压，使吸气省力、呼吸做功减少，主要用于脱机前的过渡阶段或无创通气。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-24"}]},{id:"concept-17",title:"双水平气道正压通气",type:"concept",gloss:"高低压力水平交替的定压通气模式",desc:"可模拟多种通气模式，支持自主呼吸",summary:"双水平气道正压通气（BPAP）是定压呼吸模式，在高低两个压力水平之间定时切换，允许自主呼吸存在，可通过调节参数模拟多种通气模式，对气道损伤小，应用广泛。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-25"}]},{id:"concept-18",title:"潮气量",type:"concept",gloss:"每次呼吸吸入或呼出的气体容积",desc:"机械通气的重要参数之一",summary:"潮气量（VT）指平静呼吸时每次吸入或呼出的气量。机械通气中需根据患者呼吸系统顺应性和阻力调节，成人一般为5-15mL/kg，注意气道平台压不超过30-35cmH2O。",count:4,culture:"临床应用",medium:"参数",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-27"}]},{id:"concept-19",title:"每分通气量",type:"concept",gloss:"每分钟通气总量",desc:"MV = VT × 呼吸频率",summary:"每分通气量（MV）是潮气量与通气频率的乘积，反映每分钟通气总量。一般按10-12mL/kg调节，需依据血气分析调整潮气量和频率。",count:2,culture:"临床应用",medium:"参数",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-27"}]},{id:"concept-20",title:"吸呼比",type:"concept",gloss:"吸气时间与呼气时间的比值",desc:"影响通气效率和血流动力学",summary:"吸呼比（I:E）是吸气时间与呼气时间的比例，是重要机械通气参数。通常设置为1:1.5-2.0，特殊情况下可设为反比呼吸（4:1-2:1），用于改善氧合。",count:3,culture:"临床应用",medium:"参数",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-27"}]},{id:"concept-21",title:"触发灵敏度",type:"concept",gloss:"触发呼吸机送气的感知阈值",desc:"影响患者呼吸做功和人机同步",summary:"触发灵敏度是辅助通气模式下，患者自主吸气使管路中产生负压或流量变化被传感器感知从而触发呼吸机送气的阈值。通常压力触发为-2至-0.5 cmH2O，流量触发为1-5 L/min。",count:2,culture:"临床应用",medium:"参数",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-27"}]},{id:"concept-22",title:"吸氧浓度",type:"concept",gloss:"呼吸机输出的氧气百分浓度",desc:"调节氧合的重要参数",summary:"吸氧浓度（FiO2）是呼吸机输出的氧浓度，可调范围21%-100%。初始阶段可用高浓度氧纠正缺氧，之后根据PaO2和SaO2等指标调整至50%以下以避免氧中毒。",count:3,culture:"临床应用",medium:"参数",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-27"}]},{id:"concept-23",title:"呼气末正压",type:"concept",gloss:"呼气末维持的正压",desc:"改善氧合，防止肺泡萎陷",summary:"呼气末正压（PEEP）指呼气终末使气道压力高于大气压，能复张萎陷肺泡、增加平均气道压、改善氧合。适用于肺水肿、ARDS等肺顺应性减退的疾患。",count:4,culture:"临床应用",medium:"参数",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-27"}]},{id:"concept-24",title:"容积控制通气",type:"concept",gloss:"以预设潮气量送气的控制通气模式",desc:"确保每次呼吸潮气量恒定",summary:"容积控制通气（VCV）是控制通气的一种，呼吸机以预设潮气量送气，达预定潮气量后停止，依靠肺弹性回缩被动呼气。优点是潮气量恒定，缺点是肺顺应性差时易致气压伤。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-19"}]},{id:"concept-25",title:"压力控制通气",type:"concept",gloss:"以预设压力送气的控制通气模式",desc:"气道压力不超过预设水平",summary:"压力控制通气（PCV）是以预设吸气压力管理通气的模式，送气达预设压力即中止吸气并开始呼气。优点是避免压力伤，缺点是可能通气不足，适用于ARDS等。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-19"}]},{id:"concept-26",title:"Ambu公司",type:"concept",gloss:"简易呼吸器制造商",desc:"生产Ambubag，推广至全球急救领域",summary:"Ambu公司由Holger Hesse创办，与Henning Ruben合作将简易呼吸器商业化，其产品Ambubag几乎成为呼吸球囊的代名词，广泛应用于院前急救和转运。",count:1,culture:"拓展延伸",medium:"机构",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-4"}]},{id:"concept-27",title:"铁肺",type:"concept",gloss:"早期负压呼吸机",desc:"通过箱体负压辅助呼吸的设备",summary:"铁肺是1928年Drinker和Shaw发明的负压呼吸机，通过密闭箱体在患者身体周围制造高低气压辅助呼吸，成功用于脊髓灰质炎患儿的救治，是机械通气史上的里程碑。",count:1,culture:"拓展延伸",medium:"设备",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第四节 呼吸支持技术",pn:"pn-15"}]},{id:"concept-1",title:"洗胃术",type:"concept",gloss:"一种将胃管置入胃内，灌注液体后吸出，以排出胃内容物的方法。",desc:"清除未吸收毒物、减轻胃黏膜水肿、便于胃镜检查或手术的常用救护技术。",summary:"通过插入胃管反复注入和吸出溶液，清除胃内毒物或内容物，用于急救、检查或手术准备的胃灌洗技术。",count:10,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-1"}]},{id:"concept-2",title:"催吐法",type:"concept",gloss:"口服液体后用压舌板刺激咽部催吐，反复进行直到吐出液澄清无味。",desc:"无需插胃管的简易洗胃方法，用于口服毒物中毒的清醒患者。",summary:"患者口服催吐溶液后自行呕出的方法，适用于清醒能主动配合的患者。",count:5,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-2"}]},{id:"concept-3",title:"自动洗胃机法",type:"concept",gloss:"通过自动控制程序实现冲洗与吸出的电动洗胃技术。",desc:"现代常用的自动洗胃设备，操作简便，冲洗效率高。",summary:"利用电磁泵和自控电路自动完成向胃内注入和吸出液体的洗胃方法，能快速彻底清除胃内容物。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-3"}]},{id:"concept-4",title:"漏斗胃管法",type:"concept",gloss:"利用虹吸原理进行胃灌洗的简易方法。",desc:"传统洗胃技术，无需电动设备，操作简单但费时。",summary:"经鼻或口插入漏斗胃管，利用虹吸原理注入溶液并引流出来，是最传统的洗胃方法。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-4"}]},{id:"concept-5",title:"电动吸引器法",type:"concept",gloss:"利用负压吸引原理，电动驱动迅速清除胃内毒物。",desc:"节省人力、能准确计算灌洗液量的现代洗胃技术。",summary:"通过电动吸引器产生负压，连接胃管快速吸出胃内容物的洗胃方法。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-5"}]},{id:"concept-6",title:"胃管",type:"concept",gloss:"由硅胶或橡胶制成的软管，前端圆滑，侧孔便于液体进出。",desc:"洗胃术的核心器械，选择口径和硬度需适宜。",summary:"经鼻腔或口腔插入胃内的管道，用于洗胃、灌食或抽吸胃液。",count:14,culture:"核心概念",medium:"器械",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-6"}]},{id:"concept-7",title:"生理盐水",type:"concept",gloss:"等渗溶液，对胃黏膜刺激小，可稀释毒物。",desc:"最常用的洗胃溶液，适用于多数急性中毒。",summary:"0.9%氯化钠溶液，用于不明毒物或中毒时作为洗胃液的基础选择。",count:3,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-7"}]},{id:"concept-8",title:"碳酸氢钠溶液",type:"concept",gloss:"弱碱性溶液，可中和某些毒物并促进排泄。",desc:"敌百虫和强酸中毒禁用，因产生毒性更强的物质。",summary:"2%~4%碳酸氢钠溶液，用于有机磷农药、拟除虫菊酯等中毒的洗胃液。",count:2,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-8"}]},{id:"concept-9",title:"高锰酸钾溶液",type:"concept",gloss:"强氧化剂溶液，可氧化毒物降低毒性。",desc:"使用浓度需准确，过高可损伤黏膜。",summary:"1:5000高锰酸钾溶液，用于镇静催眠药、有机磷农药、氰化物等中毒。",count:2,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-9"}]},{id:"concept-10",title:"蛋清水",type:"concept",gloss:"蛋白质与毒物结合，覆盖胃壁减少损伤。",desc:"常与牛奶、植物油同属保护性洗胃液。",summary:"蛋清与水混合的液体，用于腐蚀性毒物中毒时保护胃黏膜。",count:1,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-10"}]},{id:"concept-11",title:"活性炭悬液",type:"concept",gloss:"通过吸附作用减少毒物吸收。",desc:"广谱解毒剂，需在毒物进入肠道前使用。",summary:"10%活性炭混悬液，用于河豚毒素、生物碱等多种毒物中毒的吸附剂。",count:1,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-11"}]},{id:"concept-12",title:"硫代硫酸钠溶液",type:"concept",gloss:"与毒物结合形成无毒硫化物。",desc:"常用于重金属和氰化物中毒的辅助洗胃。",summary:"5%~10%硫代硫酸钠，用于氰化物、汞、砷等中毒的洗胃液。",count:1,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-12"}]},{id:"concept-13",title:"有机磷农药",type:"concept",gloss:"常见中毒毒物，具有剧毒，洗胃可用碳酸氢钠或高锰酸钾。",desc:"敌百虫禁用碱性液，因产生毒性更强的敌敌畏。",summary:"一类含磷的有机化合物农药，可通过皮肤、呼吸道、消化道吸收，引起胆碱能危象。",count:2,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-13"}]},{id:"concept-14",title:"拟除虫菊酯",type:"concept",gloss:"神经毒剂，大剂量可致中毒。",desc:"与有机磷农药不同，拟除虫菊酯中毒处理相对简单。",summary:"一类模拟天然除虫菊酯的合成杀虫剂，中毒后可用碳酸氢钠溶液洗胃。",count:1,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-14"}]},{id:"concept-15",title:"强酸",type:"concept",gloss:"强酸可造成胃壁灼伤、穿孔，洗胃风险极大。",desc:"禁用碳酸氢钠溶液，因其产生气体加剧穿孔风险。",summary:"如硫酸、盐酸等强腐蚀性酸，误服后禁忌洗胃，应给予牛奶、蛋清保护胃黏膜。",count:3,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-15"}]},{id:"concept-16",title:"强碱",type:"concept",gloss:"强碱与蛋白质结合造成组织液化坏死，洗胃易致穿孔。",desc:"同强酸，属于洗胃禁忌证。",summary:"如氢氧化钠、氢氧化钾等强碱性腐蚀剂，禁忌洗胃。",count:2,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-16"}]},{id:"concept-17",title:"幽门梗阻",type:"concept",gloss:"胃出口梗阻，洗胃用于减压和清除残留物。",desc:"洗胃时注意灌入量不宜过大，避免加重梗阻。",summary:"幽门部狭窄导致胃内容物排空障碍，洗胃可在饭后4~6小时进行，需记录潴留量。",count:2,culture:"临床应用",medium:"疾病",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-17"}]},{id:"concept-18",title:"左侧卧位",type:"concept",gloss:"利用重力使胃液流向胃底，便于引流。",desc:"昏迷患者尤其重要，需头偏向一侧。",summary:"洗胃时患者采用左侧卧位，有助于保持呼吸道通畅，减少误吸风险。",count:1,culture:"核心概念",medium:"操作体位",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-18"}]},{id:"concept-19",title:"灌洗量",type:"concept",gloss:"过少冲洗不彻底，过多可致胃扩张或促进毒物入肠。",desc:"洗胃操作的关键参数之一。",summary:"每次注入胃内的液体量，成人300~500mL，小儿50~200mL，需与吸出量平衡。",count:5,culture:"核心概念",medium:"剂量",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-19"}]},{id:"concept-20",title:"洗胃液温度",type:"concept",gloss:"温度适宜可减少不良反应，提高安全性。",desc:"护士配液时必须使用水温计测量。",summary:"洗胃液宜控制在35~38℃，过高加速毒物吸收，过低刺激胃肠蠕动推动毒物向下。",count:2,culture:"核心概念",medium:"参数",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-20"}]},{id:"concept-21",title:"敌百虫",type:"concept",gloss:"特殊毒理：碱解生成敌敌畏。",desc:"敌百虫中毒应选用清水或高锰酸钾液。",summary:"一种有机磷农药，中毒后禁用碳酸氢钠溶液洗胃，因在碱性环境中转化为毒性更强的敌敌畏。",count:1,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-21"}]},{id:"concept-22",title:"巴比妥类药",type:"concept",gloss:"中枢神经系统抑制剂，过量可致死。",desc:"高锰酸钾可氧化该类物质，降低毒性。",summary:"一类镇静催眠药，中毒后常用1:5000高锰酸钾溶液洗胃。",count:1,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-22"}]},{id:"concept-23",title:"阿片类",type:"concept",gloss:"强效镇痛药，易成瘾，过量抑制呼吸。",desc:"洗胃可减少吸收，但需注意呼吸支持。",summary:"从阿片中提取的生物碱及半合成衍生物，中毒后可用高锰酸钾洗胃。",count:1,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-23"}]},{id:"concept-24",title:"苯二氮䓬类",type:"concept",gloss:"γ-氨基丁酸受体激动剂，过量可致昏迷。",desc:"苯二氮䓬类中毒洗胃有效，常需辅助解毒剂。",summary:"常用镇静催眠药，中毒时可用高锰酸钾洗胃。",count:1,culture:"临床应用",medium:"药物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-24"}]},{id:"concept-25",title:"氰化物",type:"concept",gloss:"抑制细胞色素氧化酶，导致组织缺氧。",desc:"洗胃后需立即使用特效解毒剂亚硝酸钠-硫代硫酸钠。",summary:"剧毒化学品，中毒后可用高锰酸钾或硫代硫酸钠溶液洗胃。",count:2,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-25"}]},{id:"concept-26",title:"河豚毒素",type:"concept",gloss:"非蛋白神经毒素，毒性极强。",desc:"洗胃结合活性炭可减少毒素吸收。",summary:"河豚体内含有的神经毒素，中毒后可用活性炭悬液洗胃吸附。",count:1,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-26"}]},{id:"concept-27",title:"生物碱",type:"concept",gloss:"多数具有强烈药理作用，过量中毒常见。",desc:"活性炭悬液是广谱吸附解毒剂。",summary:"植物中提取的含氮碱性有机物，如吗啡、士的宁等，中毒可用活性炭吸附。",count:1,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-27"}]},{id:"concept-28",title:"汞",type:"concept",gloss:"汞蒸气或化合物吸入可致全身中毒。",desc:"洗胃后需综合解毒治疗。",summary:"重金属元素，汞中毒可用碳酸氢钠或硫代硫酸钠溶液洗胃。",count:1,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-28"}]},{id:"concept-29",title:"砷",type:"concept",gloss:"砷化合物如砒霜具有剧毒。",desc:"洗胃后需配合巯基类解毒剂。",summary:"重金属类毒物，砷中毒可用硫代硫酸钠或碳酸氢钠溶液洗胃。",count:1,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-29"}]},{id:"concept-30",title:"香蕉水",type:"concept",gloss:"含有苯类、酯类等化学物质，吸入或食入有害。",desc:"洗胃注意避免吸入性肺炎。",summary:"一种有机溶剂，用于油漆稀释，中毒后可用碳酸氢钠溶液洗胃。",count:1,culture:"临床应用",medium:"毒物",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-30"}]},{id:"concept-31",title:"胃扩张",type:"concept",gloss:"急、慢性胃扩张均可通过洗胃缓解症状。",desc:"洗胃时注意控制灌入量，避免加重扩张。",summary:"胃壁过度膨胀，可因机械性梗阻或神经肌肉功能障碍引起，洗胃可用于减压。",count:1,culture:"临床应用",medium:"疾病",refs:[{chapter:"ch2",title:"第二章 常用救护技术 / 第五节 洗胃术",pn:"pn-31"}]},{id:"concept-1",title:"重症监护室",type:"location",gloss:"ICU",desc:"收治危重症患者的特殊病房。",summary:"对危重症患者进行集中全面的动态监测、强化治疗和护理的特殊医疗场所，配备先进监护设备和专业医护人员。",count:5,culture:"核心概念",medium:"医疗场所",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"概述"}]},{id:"concept-2",title:"心率",type:"concept",gloss:"HR",desc:"心脏跳动的频率。",summary:"心脏每分钟跳动的次数，正常成人安静时60~100次/分，是反映心血管功能的重要指标。心率变化影响心排血量和心肌耗氧。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"心率监测"}]},{id:"concept-3",title:"心排血量",type:"concept",gloss:"CO",desc:"每分钟心脏泵出的血量。",summary:"每搏输出量乘以心率，反映心脏泵血功能。在一定范围内随心率增加而增加，但过快或过慢都会减少。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"心率监测"}]},{id:"concept-4",title:"休克指数",type:"concept",gloss:"SI",desc:"评估失血性休克的指标。",summary:"心率与收缩压的比值（HR/SBP），正常值约0.5。用于快速评估失血性休克失血量，指数增高提示失血量增加。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"心率监测"}]},{id:"concept-5",title:"心肌耗氧量",type:"concept",gloss:"MVO2",desc:"心肌氧消耗的量。",summary:"心肌消耗氧气的量，与心率正相关。心率越快，心肌耗氧越多，可通过RPP（心率×收缩压）评估。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"心率监测"}]},{id:"concept-6",title:"心率与收缩压乘积",type:"concept",gloss:"RPP",desc:"评估心肌耗氧的指标。",summary:"心率×收缩压，正常小于12000。大于12000提示心肌耗氧增加和心肌缺血。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"心率监测"}]},{id:"concept-7",title:"心电监测",type:"concept",gloss:"心电监护",desc:"连续监测心脏电活动的技术。",summary:"通过显示屏连续观察心脏电活动的一种无创监测方法，用于监测心率、心律、心肌缺血及电解质紊乱等。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"心电监测"}]},{id:"concept-8",title:"心电图",type:"concept",gloss:"ECG",desc:"心脏电活动的图形记录。",summary:"记录心脏电活动的图形，包括12导联和18导联，用于诊断心律失常、心肌缺血、电解质紊乱等。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"心电监测"}]},{id:"concept-9",title:"动态心电图",type:"concept",gloss:"动态心电图",desc:"长时间连续记录心电图的方法。",summary:"24~48小时连续心电监测，用于心律失常及心肌缺血诊断与评估，尤其适用于无症状性心肌缺血。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"心电监测"}]},{id:"concept-10",title:"心电示波监测",type:"concept",gloss:"心电示波监测",desc:"实时显示心电图波形的监测方法。",summary:"通过心电监护仪连续、动态显示心电图变化，是ICU最常用的心电监测方法，由多台床旁监护仪等构成系统。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"心电监测"}]},{id:"concept-11",title:"无创血压监测",type:"concept",gloss:"无创血压监测",desc:"非侵入性血压测量方法。",summary:"通过袖带加压间接测量血压的方法，常用振荡加压法，可自动显示收缩压、舒张压、平均动脉压和脉率，无创伤但易受干扰。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"血压监测"}]},{id:"concept-12",title:"有创血压监测",type:"concept",gloss:"有创血压监测",desc:"侵入性动脉血压测量方法。",summary:"经动脉穿刺插入导管直接测量血压，最准确，可反映每一心动周期的血压变化，但并发症风险较高，如血栓形成。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"血压监测"}]},{id:"concept-13",title:"收缩压",type:"concept",gloss:"收缩压",desc:"心脏收缩期的动脉血压峰值。",summary:"心脏收缩时动脉内的最高压力，主要由心肌收缩力和心排血量决定，其重要性在于克服脏器临界关闭压保证供血。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"血压监测"}]},{id:"concept-14",title:"舒张压",type:"concept",gloss:"舒张压",desc:"心脏舒张期的动脉血压谷值。",summary:"心脏舒张时动脉内的最低压力，主要由外周血管阻力决定，其重要性在于维持冠状动脉灌注压。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"血压监测"}]},{id:"concept-15",title:"平均动脉压",type:"concept",gloss:"MAP",desc:"反映组织灌注的血压指标。",summary:"心动周期每一瞬间动脉血压的平均值，计算公式为舒张压+1/3脉压，是反映脏器组织灌注的良好指标。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"血压监测"}]},{id:"concept-16",title:"中心静脉压",type:"concept",gloss:"CVP",desc:"中心静脉的压力指标。",summary:"胸腔内上、下腔静脉的压力，正常值5~12cmH2O，主要反映右心前负荷和血容量，用于指导输液和评估右心功能。",count:5,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"中心静脉压监测"}]},{id:"concept-17",title:"血肌酐",type:"concept",gloss:"Scr",desc:"评估肾功能的生化指标。",summary:"血液中肌酐的浓度，正常男性0.6~1.2mg/dL，女性0.5~1.1mg/dL，是反映肾小球滤过功能的重要指标。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"泌尿系统功能监测"}]},{id:"concept-18",title:"血尿素氮",type:"concept",gloss:"BUN",desc:"评估肾功能的生化指标。",summary:"血液中尿素氮的浓度，成人为9~20mg/dL，反映肾小球滤过功能，但不能作为早期肾功能指标，对尿毒症诊断有价值。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"泌尿系统功能监测"}]},{id:"concept-19",title:"肾脏浓缩和稀释功能试验",type:"concept",gloss:"浓缩稀释试验",desc:"评估肾小管功能的检查。",summary:"通过测量昼尿量与夜尿量及其比重，评价肾小管重吸收功能，正常昼/夜尿量比(3~4):1，夜尿量<750mL，最高与最低尿比重差>0.009。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"泌尿系统功能监测"}]},{id:"concept-20",title:"血清钠",type:"concept",gloss:"血钠",desc:"血液中的钠离子水平。",summary:"血液中钠离子的浓度，正常值135~145mmol/L，反映水钠平衡，低钠血症和高钠血症各有临床意义。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"体液平衡监测"}]},{id:"concept-21",title:"低钠血症",type:"concept",gloss:"低钠血症",desc:"血钠过低导致的病理状态。",summary:"血清钠<135mmol/L，常见于消化液丢失、创面渗液等，分为轻、中、重度，严重时可出现神经症状甚至死亡。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"体液平衡监测"}]},{id:"concept-22",title:"高钠血症",type:"concept",gloss:"高钠血症",desc:"血钠过高导致的病理状态。",summary:"血清钠>145mmol/L，常见于水分摄入不足或丧失过多，表现为神经系统症状，严重时可致昏迷。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"体液平衡监测"}]},{id:"concept-23",title:"血清钾",type:"concept",gloss:"血钾",desc:"血液中的钾离子水平。",summary:"血液中钾离子的浓度，正常值3.5~5.5mmol/L，对神经肌肉和心脏功能至关重要，异常可致心律失常。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"体液平衡监测"}]},{id:"concept-24",title:"低钾血症",type:"concept",gloss:"低钾血症",desc:"血钾过低导致的病理状态。",summary:"血清钾<3.5mmol/L，常见于钾摄入不足或丢失，可致代谢性碱中毒，补钾需遵循浓度和速度限制。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"体液平衡监测"}]},{id:"concept-25",title:"高钾血症",type:"concept",gloss:"高钾血症",desc:"血钾过高导致的病理状态。",summary:"血清钾>5.5mmol/L，常见于酸中毒、肾功能受损等，可致心搏骤停，需紧急处理如输注碳酸氢钠、胰岛素等。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"体液平衡监测"}]},{id:"concept-26",title:"酸碱度",type:"concept",gloss:"pH",desc:"血液的酸碱平衡指标。",summary:"血液的酸碱度，正常值7.35~7.45，pH<7.35为酸中毒，>7.45为碱中毒，受代谢和呼吸因素双重影响。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"酸碱平衡监测"}]},{id:"concept-27",title:"动脉血二氧化碳分压",type:"concept",gloss:"PaCO2",desc:"评估呼吸功能的血气指标。",summary:"血液中物理溶解的二氧化碳分子产生的压力，正常35~45mmHg，反映呼吸性因素，≥50mmHg可诊断Ⅱ型呼吸衰竭。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"酸碱平衡监测"}]},{id:"concept-28",title:"动脉血氧分压",type:"concept",gloss:"PaO2",desc:"评估氧合功能的血气指标。",summary:"血液中物理溶解的氧分子产生的压力，正常80~100mmHg，用于判断缺氧程度：轻度60~80，中度40~60，重度<40。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"酸碱平衡监测"}]},{id:"concept-29",title:"碳酸氢根",type:"concept",gloss:"HCO3-",desc:"评估代谢性酸碱平衡的指标。",summary:"血液中的碳酸氢根离子浓度，正常22~27mmol/L，反映代谢性因素，包括标准碳酸氢盐（SB）和实际碳酸氢盐（AB）。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"酸碱平衡监测"}]},{id:"concept-30",title:"碱剩余",type:"concept",gloss:"BE",desc:"评估代谢性酸碱失衡的指标。",summary:"标准条件下将血浆或全血滴定至pH7.4所需的酸或碱量，正常±3mmol/L，是判断代谢性酸碱失衡的定量指标。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch2-6",title:"第六节 常用的重症监护技术",pn:"酸碱平衡监测"}]},{id:"concept-poisoning",title:"中毒",type:"concept",gloss:"毒物进入人体导致生理功能障碍的病理过程。",desc:"中毒是毒物与机体相互作用引起的疾病状态。",summary:"某些物质接触或进入人体后损害组织、破坏神经和体液调节功能，引起一系列症状和体征的病理状态。分为急性中毒和慢性中毒。",count:45,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-1"}]},{id:"concept-acute-poisoning",title:"急性中毒",type:"concept",gloss:"短时间内接触大量毒物引起的中毒类型。",desc:"急性中毒是临床常见的急危重症之一。",summary:"机体一次接触大量毒物或24小时内多次暴露于某种或某些毒物所致的中毒。具有起病急、病情重、变化快的特点。",count:18,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-2"}]},{id:"concept-chronic-poisoning",title:"慢性中毒",type:"concept",gloss:"长期接触毒物导致蓄积性中毒的类型。",desc:"慢性中毒多因职业暴露或环境因素所致。",summary:"长时间暴露于毒物，毒物在体内蓄积而出现的临床表现。起病缓慢，病程较长。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-3"}]},{id:"concept-toxic-substance",title:"毒物",type:"concept",gloss:"能够损害机体健康的化学物质。",desc:"毒物是导致中毒的病因物质。",summary:"在一定条件下能引起中毒的化学物质。根据来源和用途分为工业性毒物、药物、农药、有毒动植物等。",count:20,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-3"}]},{id:"concept-cholinesterase",title:"胆碱酯酶",type:"concept",gloss:"分解乙酰胆碱的酶，其活性抑制是有机磷中毒的核心机制。",desc:"胆碱酯酶活力测定是诊断有机磷农药中毒的特异性指标。",summary:"水解乙酰胆碱的酶类，对神经递质乙酰胆碱的代谢起关键作用。有机磷农药通过抑制其活性导致乙酰胆碱蓄积。",count:12,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-12"}]},{id:"concept-carbon-monoxide",title:"一氧化碳",type:"concept",gloss:"导致煤气中毒的有毒气体。",desc:"一氧化碳中毒是常见的生活和职业中毒。",summary:"无色、无味、无刺激性气体，吸入过量可引起急性中毒。主要通过与血红蛋白结合形成碳氧血红蛋白导致组织缺氧。",count:18,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-19"}]},{id:"concept-carboxyhemoglobin",title:"碳氧血红蛋白",type:"concept",gloss:"一氧化碳中毒的指标性物质。",desc:"血液碳氧血红蛋白浓度是评估一氧化碳中毒程度的重要依据。",summary:"一氧化碳与血红蛋白结合形成的稳定复合物，不能携带氧，且影响氧合血红蛋白解离，导致组织缺氧。",count:8,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-20"}]},{id:"concept-gastric-lavage",title:"洗胃",type:"concept",gloss:"清除胃内未吸收毒物的常用方法。",desc:"洗胃是急性中毒急救的重要措施之一。",summary:"将胃管插入胃内反复注入和吸出液体以清除胃内毒物的急救技术。常用于口服中毒者的救治。",count:6,culture:"临床应用",medium:"技术",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-6"}]},{id:"concept-emesis",title:"催吐",type:"concept",gloss:"促进胃内容物排出的急救手段。",desc:"催吐是清除尚未吸收毒物的方法之一。",summary:"通过物理或药物方法诱发呕吐，以排出胃内毒物的急救措施。适用于神志清醒且合作的口服中毒患者。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-6"}]},{id:"concept-blood-purification",title:"血液净化",type:"concept",gloss:"清除已吸收毒物的重要治疗手段。",desc:"血液净化常用于重症中毒患者的救治。",summary:"利用体外循环装置清除血液中有害物质的治疗方法。包括血液透析、腹膜透析、血液滤过、血浆置换、血液灌流等。",count:5,culture:"临床应用",medium:"技术",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-7"}]},{id:"concept-hemodialysis",title:"血液透析",type:"concept",gloss:"常用的血液净化方式之一。",desc:"血液透析适用于急性肾衰竭及某些中毒。",summary:"利用半透膜两侧压力差原理，将患者血液引出体外，通过人工肾清除废物和多余水分的治疗方法。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-8"}]},{id:"concept-plasmapheresis",title:"血浆置换",type:"concept",gloss:"清除大分子毒物或免疫复合物的血液净化技术。",desc:"血浆置换用于免疫介导性疾病及某些中毒。",summary:"将患者血液分离，去除致病因子后重新输入体内的治疗方法。能快速清除特定蛋白质类药物或异源蛋白成分。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-8"}]},{id:"concept-hemoperfusion",title:"血液灌流",type:"concept",gloss:"利用吸附剂清除毒物的血液净化技术。",desc:"血液灌流对脂溶性毒物清除效果好。",summary:"将患者血液引出体外，通过吸附材料清除有害物质后再回输体内的治疗方法。常用于药物中毒等。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-8"}]},{id:"concept-antidote",title:"解毒剂",type:"concept",gloss:"针对特定毒物有解毒作用的药物。",desc:"解毒剂是急性中毒治疗的重要武器。",summary:"用于治疗特定中毒的药物，能中和、拮抗或加速毒物排出。包括金属解毒剂、高铁血红蛋白解毒剂、有机磷解毒剂等。",count:8,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-9"}]},{id:"concept-muscarinic-symptoms",title:"毒蕈碱样症状",type:"concept",gloss:"有机磷中毒的M样症状。",desc:"毒蕈碱样症状反映乙酰胆碱在副交感神经的蓄积。",summary:"副交感神经末梢兴奋引起的平滑肌痉挛和腺体分泌增加表现，如瞳孔缩小、大汗、流涎、肺水肿等。是有机磷中毒最早出现的症状。",count:6,culture:"核心概念",medium:"症状",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-14"}]},{id:"concept-nicotinic-symptoms",title:"烟碱样症状",type:"concept",gloss:"有机磷中毒的N样症状。",desc:"烟碱样症状主要涉及骨骼肌和交感神经节。",summary:"乙酰胆碱在横纹肌神经肌肉接头处蓄积引起的肌纤维颤动、肌痉挛甚至瘫痪，以及对交感神经节的作用导致血压升高、心律失常等。",count:5,culture:"核心概念",medium:"症状",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-14"}]},{id:"concept-intermediate-syndrome",title:"中间型综合征",type:"concept",gloss:"有机磷中毒后出现的迟发性呼吸肌麻痹。",desc:"中间型综合征若不及时救治可迅速致死。",summary:"有机磷中毒患者在急性症状缓解后1~4天突然发生以呼吸肌麻痹为主的症状群，如肢体近端肌肉、脑神经支配肌肉及呼吸肌麻痹。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-15"}]},{id:"concept-delayed-neuropathy",title:"迟发性神经病变",type:"concept",gloss:"有机磷中毒远期并发症之一。",desc:"迟发性神经病变可能与神经靶酯酶抑制有关。",summary:"有机磷中毒患者在重度中毒症状消失后2~3周发生的多发性周围神经病变，表现为感觉运动型神经病变，可致下肢瘫痪、肌肉萎缩。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-15"}]},{id:"concept-atropinization",title:"阿托品化",type:"concept",gloss:"阿托品治疗有效的标志。",desc:"阿托品化需与阿托品中毒鉴别。",summary:"阿托品使用后达到的临床状态：瞳孔较前扩大、颜面潮红、皮肤干燥、腺体分泌物减少、肺部啰音减少、心率增快。是调整阿托品剂量的指征。",count:4,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-16"}]},{id:"concept-cholinesterase-reactivator",title:"胆碱酯酶复能剂",type:"concept",gloss:"恢复胆碱酯酶功能的解毒药物。",desc:"胆碱酯酶复能剂常与阿托品联合使用。",summary:"能使被有机磷抑制的胆碱酯酶恢复活性的药物，常用有碘解磷定、氯解磷定、双复磷等。对烟碱样症状作用明显。",count:4,culture:"临床应用",medium:"药物",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-16"}]},{id:"concept-penehyclidine",title:"盐酸戊乙奎醚",type:"concept",gloss:"新型抗胆碱药，用于有机磷中毒。",desc:"盐酸戊乙奎醚商品名长托宁。",summary:"抗胆碱药，有较强的中枢和外周抗胆碱作用，使用简便、安全、长效，与胆碱酯酶复能剂合用对重度中毒有显著效果。",count:2,culture:"临床应用",medium:"药物",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-16"}]},{id:"concept-jielin-injection",title:"解磷注射液",type:"concept",gloss:"有机磷中毒的复方解毒制剂。",desc:"解磷注射液起效快，作用时间长。",summary:"含有抗胆碱药和胆碱酯酶复能剂的复方注射液，适用于有机磷农药中毒现场急救，对毒蕈碱样、烟碱样和中枢神经系统症状均有对抗作用。",count:1,culture:"临床应用",medium:"药物",refs:[{chapter:"ch3-1",title:"第一节 急性中毒患者的救护",pn:"pn-16"}]},{id:"concept-1",title:"中暑",type:"concept",gloss:"又称急性热致疾患，是热平衡功能紊乱导致的急症。",desc:"常见环境性急诊之一，包括先兆中暑、轻症中暑和重症中暑三种类型。",summary:"高温或热辐射等环境引起机体体温调节中枢功能障碍，导致热平衡失调、水电解质代谢紊乱及神经系统和心血管系统功能障碍的一组临床综合征。",count:25,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-1"}]},{id:"concept-2",title:"热痉挛",type:"concept",gloss:"又称中暑痉挛，是热射病的早期表现之一。",desc:"常见于健康青壮年，体温无明显升高。",summary:"重症中暑的一种类型，因高温下大量出汗、钠盐严重缺失导致骨骼肌对称性或阵发性疼痛性痉挛，多见于腓肠肌。",count:8,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-2"}]},{id:"concept-3",title:"热衰竭",type:"concept",gloss:"又称中暑衰竭，是热痉挛和热射病的中介过程。",desc:"多见于老年人、儿童和慢性疾病患者。",summary:"严重热应激时，因体液和钠离子丢失过多引起循环容量不足，表现为多汗、疲乏、心动过速、直立性低血压等，体温轻度升高。",count:7,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-3"}]},{id:"concept-4",title:"热射病",type:"concept",gloss:"又称中暑高热，是致命性急症。",desc:"早期受影响器官依次为脑、肝、肾和心脏。",summary:"重症中暑最严重类型，以高热（直肠温度≥41℃）和神志障碍为主要特征，病死率高，可分为劳力性和非劳力性两种。",count:12,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-4"}]},{id:"concept-5",title:"劳力性热射病",type:"concept",gloss:"约50%患者大量出汗，心率可达160-180次/分，可发生多器官功能衰竭。",desc:"病死率较高。",summary:"热射病的一种，多发生在高温、湿度大和无风天气进行重体力劳动或剧烈运动时，内源性产热过多，多见于平素健康的年轻人。",count:4,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-5"}]},{id:"concept-6",title:"非劳力性热射病",type:"concept",gloss:"又称典型性热射病，常在发病后24h左右死亡。",desc:"84%-100%患者无汗。",summary:"热射病的一种，主要因体温调节功能障碍引起散热减少，多见于城市老年体衰居民、精神分裂症等患者，表现为皮肤干热、无汗、直肠温度极高。",count:4,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-6"}]},{id:"concept-7",title:"淹溺",type:"concept",gloss:"又称溺水，是意外死亡的常见原因之一。",desc:"包括湿性淹溺和干性淹溺，以及淡水淹溺和海水淹溺。",summary:"人淹没于水或其他液体中，因呼吸道被阻塞或反射性喉痉挛导致换气障碍、缺氧和窒息的危急状态，严重者可致呼吸心跳停止。",count:15,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-7"}]},{id:"concept-8",title:"湿性淹溺",type:"concept",gloss:"数秒钟后即发生神志丧失，最终呼吸心跳停止。",desc:"与干性淹溺相对。",summary:"喉部肌肉松弛，吸入大量水分（22mL/kg）充塞呼吸道和肺泡引起窒息，占淹溺的约90%。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-8"}]},{id:"concept-9",title:"干性淹溺",type:"concept",gloss:"与湿性淹溺相对。",desc:"可导致反射性心跳停止。",summary:"主要由喉痉挛导致窒息，呼吸道和肺泡很少或无水进入，约占淹溺的10%。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-9"}]},{id:"concept-10",title:"淡水淹溺",type:"concept",gloss:"可引起肺泡表面活性物质灭活，肺顺应性下降。",desc:"与海水淹溺特征对比见教材表3-5。",summary:"浸没于淡水后的淹溺，淡水经呼吸道或胃肠道迅速吸收入血，导致血容量增加、溶血、高钾血症和肺损伤。",count:5,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-10"}]},{id:"concept-11",title:"海水淹溺",type:"concept",gloss:"海水对肺泡上皮有化学损伤作用，易发生肺水肿。",desc:"与淡水淹溺特征对比见教材表3-5。",summary:"浸没于海水后的淹溺，海水含钠量高，吸入后使血液中水分进入肺泡，产生肺水肿和低氧血症。",count:5,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-11"}]},{id:"concept-12",title:"触电",type:"concept",gloss:"可引发电击伤。",desc:"常见原因包括缺乏安全用电知识、电线意外折断、雷击等。",summary:"人体直接触及电源或高压电通过介质传递引起组织损伤和功能障碍，严重者可发生心搏骤停。",count:10,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-12"}]},{id:"concept-13",title:"电击伤",type:"concept",gloss:"触电的直接后果。",desc:"严重者发生心室颤动或心跳停止。",summary:"电流通过人体引起的组织损伤和功能障碍，包括电性昏迷、电灼伤及并发症。",count:6,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-13"}]},{id:"concept-14",title:"电性昏迷",type:"concept",gloss:"CT检查可发现局部脑水肿。",desc:"一般无后遗症。",summary:"触电后发生的短暂昏迷，占20%-50%，意识多能恢复。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-14"}]},{id:"concept-15",title:"电灼伤",type:"concept",gloss:"电流通路上软组织灼伤常较严重。",desc:"可导致远端组织缺血坏死。",summary:"电流在皮肤入口处造成的灼伤，较出口处重，皮肤呈灰黄色焦皮，中心低陷，周围无炎症反应。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-15"}]},{id:"concept-18",title:"膝顶法",type:"concept",gloss:"操作时间不宜超过1分钟。",desc:"适用于一般淹溺者。",summary:"淹溺急救中倒水处理的一种方法，施救者取半蹲位，将淹溺者腹部置于大腿上，头部下垂，按压背部排出积水。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-18"}]},{id:"concept-19",title:"肩顶法",type:"concept",gloss:"操作时间不宜超过1分钟。",desc:"需保持头胸下垂。",summary:"淹溺急救中倒水处理的方法，施救者将淹溺者扛在肩上，抖动肩部使积水排出，主要适用于儿童或体型偏瘦者。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-19"}]},{id:"concept-20",title:"抱腹法",type:"concept",gloss:"操作时间不宜超过1分钟。",desc:"需保证腹部高于头胸。",summary:"淹溺急救中倒水处理的方法，使淹溺者俯卧，施救者双手抱其腹部摇晃，排出积水。",count:1,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-20"}]},{id:"concept-21",title:"医用冰毯机",type:"concept",gloss:"分为单纯降温法和亚低温治疗法。",desc:"需严密监测体温以防降温过快。",summary:"利用半导体制冷原理进行全身降温的医疗设备，广泛用于颅脑疾病及顽固性高热患者的亚低温治疗。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-21"}]},{id:"concept-22",title:"冬眠合剂",type:"concept",gloss:"人工冬眠合剂的简称。",desc:"使用中需观察呼吸和血压。",summary:"由氯丙嗪、哌替啶、异丙嗪按比例配制的药物组合，用于药物降温，具有调节体温中枢、扩张血管、降低氧耗的作用。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-22"}]},{id:"concept-23",title:"DIC",type:"concept",gloss:"可导致多器官功能衰竭。",desc:"热射病和非劳力性热射病中可发生轻中度DIC。",summary:"弥散性血管内凝血，是中暑、淹溺、触电等严重损伤时可能发生的并发症，表现为凝血功能异常。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-23"}]},{id:"concept-24",title:"ARDS",type:"concept",gloss:"表现为急性肺损伤。",desc:"溺水者易发生。",summary:"急性呼吸窘迫综合征，淹溺后常见严重并发症，需送ICU监护24-48小时预防。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-24"}]},{id:"concept-25",title:"安全电压",type:"concept",gloss:"低于36V的电压通常不会造成电击伤害。",desc:"是电气安全中的重要概念。",summary:"一般情况下对人无害的电压，规定为36V及以下。",count:2,culture:"基础理论",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-25"}]},{id:"concept-26",title:"跨步电压",type:"concept",gloss:"野外高压线触电时需注意避免跨步电压。",desc:"触电急救中需考虑的危险因素。",summary:"当高压电线落地时，在周围地面形成电势差，人两脚之间可能产生危险电压，安全距离为20m以外。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-26"}]},{id:"concept-27",title:"动脉血气分析",type:"concept",gloss:"中暑和淹溺患者均需紧急检查。",desc:"有助于判断病情严重程度。",summary:"检测动脉血中pH、PaO2、PaCO2等指标，用于评估中暑、淹溺等患者的缺氧和酸碱失衡状况。",count:3,culture:"临床应用",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-27"}]},{id:"person-1",title:"赵黎村",type:"person",gloss:"体现了医者责任心。",desc:"《随园诗话》中记载其医案。",summary:"清代医学家，曾诊断袁枚为中暑并使用白虎汤（石膏粉）成功救治。",count:2,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-28"}]},{id:"person-2",title:"袁枚",type:"person",gloss:"医案中的患者。",desc:"体现医者责任心的故事主人公。",summary:"清代诗人，因中暑被赵黎村救治，记载于《随园诗话》。",count:2,culture:"拓展延伸",medium:"人物",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-29"}]},{id:"work-1",title:"随园诗话",type:"work",gloss:"作为医家轶史来源。",desc:"教材中引用其内容作为素质拓展案例。",summary:"清代袁枚所著的诗歌理论著作，其中记载了赵黎村救治中暑的医案。",count:1,culture:"拓展延伸",medium:"书籍",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-30"}]},{id:"concept-28",title:"急性高原病",type:"concept",gloss:"文中提及作为环境性急诊的相关介绍。",desc:"本节虽未详述，但属于相关环境损伤。",summary:"快速上升到高海拔地区的人群中发生的常见病，是高原地区独有的疾病。",count:1,culture:"拓展延伸",medium:"概念",refs:[{chapter:"ch3",title:"第三章 常见急危重症患者的救护 / 第二节 环境及理化因素损伤患者的救护",pn:"pn-31"}]},{id:"concept-consciousness-disorder",title:"意识障碍",type:"concept",gloss:"指患者对刺激的反应能力降低或缺失，可分为嗜睡、昏睡、昏迷等不同程度。",desc:"常见于颅内疾病、全身性疾病等，需紧急评估和救治。",summary:"意识障碍是多种原因引起的机体对自身和外界环境刺激的反应能力减弱或丧失，包括意识水平受损和意识内容的改变，是大脑功能紊乱的严重症状之一。",count:10,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-1"}]},{id:"concept-fever",title:"高热",type:"concept",gloss:"体温在39.1℃至41℃之间，常伴有寒战、皮肤潮红、呼吸心率加快等症状。",desc:"高热需及时降温，防止并发症。",summary:"高热是指腋窝温度39.1~41℃的发热状态，是多种疾病的常见表现，感染性和非感染性因素均可引起。",count:8,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-2"}]},{id:"concept-acute-chest-pain",title:"急性胸痛",type:"concept",gloss:"突发性胸部疼痛，可能源于心脏、肺、胸膜、食管等病变。",desc:"急性胸痛需快速识别致命性病因如急性冠脉综合征、主动脉夹层等。",summary:"急性胸痛是各种因素刺激胸部感觉神经纤维引起的胸前区不适，是致命性疾病的重要临床表现，需紧急鉴别病因。",count:6,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-3"}]},{id:"concept-acute-abdominal-pain",title:"急性腹痛",type:"concept",gloss:"突发性腹部疼痛，常见于炎症、穿孔、梗阻、出血等腹部病变或全身性疾病。",desc:"需快速评估病因并采取相应救护措施。",summary:"急性腹痛是指各种原因引起的腹部突发性疼痛，起病急、病因复杂，延误诊治可危及生命。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-4"}]},{id:"concept-glasgow-coma-scale",title:"格拉斯哥昏迷评分法",type:"concept",gloss:"通过睁眼、语言、运动三方面反应评分。",desc:"是临床常用意识评估工具。",summary:"格拉斯哥昏迷评分法用于评估意识障碍程度，总分3~15分，分数越低昏迷越深，8分以下为昏迷。",count:2,culture:"核心概念",medium:"量表",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-5"}]},{id:"concept-decorcicate-syndrome",title:"去皮质综合征",type:"concept",gloss:"又称“瞪目昏迷”或“醒状昏迷”。",desc:"常见于缺氧缺血性脑病、严重颅脑外伤后。",summary:"去皮质综合征是一种特殊类型的意识障碍，大脑皮质广泛受损而皮质下及脑干功能保存，患者有觉醒周期但无意识活动。",count:2,culture:"拓展延伸",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-6"}]},{id:"concept-infectious-fever",title:"感染性发热",type:"concept",gloss:"病原体或其毒素激活致热原导致体温升高。",desc:"常见于各种感染性疾病。",summary:"感染性发热是由细菌、病毒、真菌、寄生虫等病原体感染引起的发热，是临床上最常见的发热病因。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-7"}]},{id:"concept-noninfectious-fever",title:"非感染性发热",type:"concept",gloss:"无病原体直接参与，由炎症、组织损伤或免疫反应等引起。",desc:"需与感染性发热鉴别。",summary:"非感染性发热是非病原体引起的发热，包括自身免疫性疾病、肿瘤、药物热等。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-8"}]},{id:"concept-sustained-fever",title:"稽留热",type:"concept",gloss:"高热持续，波动小。",desc:"常见热型之一。",summary:"稽留热是指体温持续在39~40℃数天或数周，24小时内波动范围不超过1℃，常见于肺炎球菌性肺炎、伤寒高热期等。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-9"}]},{id:"concept-remittent-fever",title:"弛张热",type:"concept",gloss:"高热且波动大。",desc:"常见热型之一。",summary:"弛张热是指体温达39℃以上，24小时内体温波动范围超过2℃，常见于化脓性炎症、重症肺结核等。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-10"}]},{id:"concept-intermittent-fever",title:"间歇热",type:"concept",gloss:"发热与无热交替出现。",desc:"常见热型之一。",summary:"间歇热是指体温骤升达高峰后持续数小时，又迅速降至正常，无热期持续1天至数天，反复交替，常见于疟疾、急性肾盂肾炎等。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-11"}]},{id:"concept-undulant-fever",title:"波状热",type:"concept",gloss:"体温呈波浪形变化。",desc:"常见热型之一。",summary:"波状热是指体温逐渐升高达39℃或以上，持续数天后逐渐下降至正常，数天后再度升高，反复多次，常见于布鲁氏菌病。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-12"}]},{id:"concept-relapsing-fever",title:"回归热",type:"concept",gloss:"发热期与无热期交替，周期较长。",desc:"常见热型之一。",summary:"回归热是指体温骤升至39℃或以上，持续数天后又逐渐下降至正常，数天后再逐渐升高，反复多次，常见于回归热、霍奇金病等。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-13"}]},{id:"concept-irregular-fever",title:"不规则热",type:"concept",gloss:"发热曲线无规律可循。",desc:"常见热型之一。",summary:"不规则热是指发热无任何规律，常见于结核病、风湿热、支气管肺炎等。",count:1,culture:"基础理论",medium:"概念",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-14"}]},{id:"concept-physical-cooling",title:"物理降温",type:"concept",gloss:"通过传导、对流、蒸发等方式降低体温。",desc:"是急救中控制高热的常用方法。",summary:"物理降温是首选降温措施，适用于高热且循环良好的患者，包括冰敷、温水擦浴、酒精擦浴、冰盐水灌肠等方法。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-15"}]},{id:"concept-drug-cooling",title:"药物降温",type:"concept",gloss:"使用解热镇痛药或激素抑制致热原。",desc:"需谨慎使用，监测生命体征。",summary:"药物降温是物理降温效果不理想时采用的降温措施，常用药物有吲哚美辛、肾上腺皮质激素、冬眠合剂等。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-16"}]},{id:"concept-hibernation-therapy",title:"冬眠疗法",type:"concept",gloss:"人工诱导类似冬眠状态以降低代谢。",desc:"常用于高热伴烦躁、惊厥的患者。",summary:"冬眠疗法是在物理降温基础上使用异丙嗪、氯丙嗪、哌替啶等药物，使患者处于镇静、低温状态，用于防治惊厥和脑水肿。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-17"}]},{id:"concept-chest-pain-center",title:"胸痛中心",type:"concept",gloss:"多学科协作的胸痛急救体系。",desc:"全球第一家胸痛中心1981年建于美国，我国2010年启动建设。",summary:"胸痛中心是整合医院内外多学科资源、采用标准化流程的胸痛救治平台，旨在早期评估、危险分层和合理救治急性胸痛患者。",count:2,culture:"拓展延伸",medium:"机构",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-18"}]},{id:"drug-mannitol",title:"甘露醇",type:"concept",gloss:"高渗溶液，通过脱水作用减轻脑水肿。",desc:"需注意心肾功能，合并心脏病或肾功能不全者改用呋塞米。",summary:"甘露醇是一种渗透性利尿药，临床常用20%甘露醇250mL快速静脉滴注以降低颅内压、减轻脑水肿。",count:1,culture:"临床应用",medium:"药物",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-19"}]},{id:"drug-diazepam",title:"地西泮",type:"concept",gloss:"镇静、抗焦虑、抗惊厥。",desc:"在意识障碍和高热患者中用于控制抽搐。",summary:"地西泮（安定）是一种苯二氮䓬类镇静抗惊厥药，常用于控制抽搐和高热惊厥，常用剂量10~20mg静脉注射。",count:2,culture:"临床应用",medium:"药物",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-20"}]},{id:"drug-nitroglycerin",title:"硝酸甘油",type:"concept",gloss:"扩张冠脉和外周血管，减轻心脏负荷。",desc:"急性胸痛患者常用急救药物。",summary:"硝酸甘油是一种血管扩张药，用于缓解心绞痛和心肌梗死引起的胸痛，可舌下含服或静脉给药。",count:2,culture:"临床应用",medium:"药物",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-21"}]},{id:"disease-acute-coronary-syndrome",title:"急性冠状动脉综合征",type:"concept",gloss:"心肌缺血急症，常表现为胸痛、心电图改变、心肌酶升高。",desc:"是致命性胸痛的主要病因之一。",summary:"急性冠状动脉综合征（ACS）是一组由冠状动脉粥样硬化斑块破裂或侵袭引起的急性心肌缺血综合征，包括ST段抬高型心肌梗死、非ST段抬高型心肌梗死和不稳定型心绞痛。",count:2,culture:"核心概念",medium:"疾病",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-22"}]},{id:"disease-aortic-dissection",title:"主动脉夹层",type:"concept",gloss:"主动脉壁分层，可导致破裂。",desc:"需紧急降压、手术或介入治疗。",summary:"主动脉夹层是指主动脉内膜撕裂，血液进入血管壁中层形成假腔，表现为剧烈胸痛、血压升高等，是致命性胸痛。",count:2,culture:"核心概念",medium:"疾病",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-23"}]},{id:"disease-pulmonary-embolism",title:"肺栓塞",type:"concept",gloss:"肺动脉阻塞导致缺氧和右心负荷增加。",desc:"急性肺栓塞是急性胸痛的重要鉴别诊断。",summary:"肺栓塞是指内源性或外源性栓子堵塞肺动脉或其分支，引起肺循环障碍，表现为呼吸困难、胸痛、咯血等，严重时可致命。",count:3,culture:"核心概念",medium:"疾病",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-24"}]},{id:"disease-pneumothorax",title:"气胸",type:"concept",gloss:"胸膜腔内异常气体积聚。",desc:"需紧急胸腔穿刺或闭式引流。",summary:"气胸是指气体进入胸膜腔造成积气，导致肺萎陷，表现为突发胸痛、呼吸困难，张力性气胸可危及生命。",count:2,culture:"核心概念",medium:"疾病",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-25"}]},{id:"concept-ecmo",title:"体外膜氧合器",type:"concept",gloss:"人工心肺机，提供氧合和循环支持。",desc:"在急性胸痛诊疗流程中用于极危重患者。",summary:"体外膜氧合器（ECMO）是一种体外生命支持技术，可暂时替代心肺功能，用于严重心肺衰竭患者的救治。",count:1,culture:"拓展延伸",medium:"设备",refs:[{chapter:"ch3-3",title:"第三节 常见急症患者的救护",pn:"pn-26"}]},{id:"concept-1",title:"灾害",type:"concept",gloss:"自然或人为原因引起的严重破坏事件",desc:"灾害是灾害事故现场救护的核心对象",summary:"灾害是指自然或人为因素导致环境突然发生巨变，造成人员伤亡、财产损失和生态破坏的现象。世界卫生组织将其定义为对社区或社会功能的严重破坏，超出其应对能力。",count:15,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-1"}]},{id:"concept-2",title:"自然灾害",type:"concept",gloss:"自然原因导致的灾害",desc:"按发生原因分类的一种灾害类型",summary:"由自然因素引发的灾害，如地震、火山活动、滑坡、海啸、飓风、龙卷风、台风、洪水、森林火灾、干旱、沙尘暴等。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-2"}]},{id:"concept-3",title:"人为灾害",type:"concept",gloss:"人为原因导致的灾害",desc:"按发生原因分类的一种灾害类型",summary:"由人类活动引发的灾害，如火灾、爆炸、交通事故、工伤事故、卫生灾害、矿难、科技事故、战争和恐怖袭击等。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-3"}]},{id:"concept-4",title:"灾害链",type:"concept",gloss:"灾害引发的连锁反应",desc:"按发生顺序分类的灾害现象",summary:"等级高、强度大的自然灾害发生后常引发一系列其他灾害接连发生的现象，包括原生灾害、次生灾害和衍生灾害。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-4"}]},{id:"concept-5",title:"原生灾害",type:"concept",gloss:"最早发生的起主导作用的灾害",desc:"灾害链中的初始灾害",summary:"灾害链中最早发生的起主导作用的灾害，如地震、火山爆发等。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-5"}]},{id:"concept-6",title:"次生灾害",type:"concept",gloss:"原生灾害引发的后续灾害",desc:"灾害链中的二次灾害",summary:"由原生灾害所引发的灾害，如地震引起的泥石流、有毒气体泄漏等。",count:3,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-6"}]},{id:"concept-7",title:"衍生灾害",type:"concept",gloss:"灾害导致的次生社会性危害",desc:"灾害链中的间接灾害",summary:"灾害发生后破坏人类生存和谐条件，引发的一系列其他灾害，如地震后停产、通信及交通破坏、社会恐慌等。",count:2,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-7"}]},{id:"concept-8",title:"突发灾害",type:"concept",gloss:"突然发生的灾害",desc:"按发生方式分类的一种灾害",summary:"突然发生、难以预测，造成巨大危害的灾害，如地震、火山爆发等。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-8"}]},{id:"concept-9",title:"渐变灾害",type:"concept",gloss:"缓慢发生的灾害",desc:"按发生方式分类的一种灾害",summary:"发生缓慢但影响时间长、范围大，具有一定隐蔽性的灾害，如土地沙漠化、水土流失等。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-9"}]},{id:"concept-10",title:"灾害事故现场救护特点",type:"concept",gloss:"灾害救护的四个特点",desc:"现场救护的典型特征",summary:"灾害现场救护具有紧迫性、艰难性、繁重性、涉及部门广等特点，要求医护人员快速反应、适应复杂条件、多部门协作。",count:4,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-10"}]},{id:"concept-11",title:"灾害医疗救援准备",type:"concept",gloss:"灾害救援的组织与防护准备",desc:"灾害医疗救援的前提工作",summary:"包括国家组织体系建设和人员职业安全防护。组织体系由领导小组、专家组、救援机构及现场指挥部组成。防护包括免疫预防、标准预防和职业暴露应急处理。",count:3,culture:"基础理论",medium:"概念",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-11"}]},{id:"concept-12",title:"标准预防",type:"concept",gloss:"通用防护措施",desc:"灾害现场人员防护的基本要求",summary:"包括正确使用防护物品、手卫生、消毒隔离措施、预防医疗锐器损伤等，是灾害现场职业安全防护的核心措施。",count:2,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-12"}]},{id:"concept-13",title:"职业暴露应急处理",type:"concept",gloss:"职业暴露后的紧急处置程序",desc:"灾害救援人员的安全保障措施",summary:"包括局部处理（冲洗消毒）、全身防疫（药物预防）、及时报告三个步骤，针对血液体液暴露时的紧急措施。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-1",title:"第一节 概述",pn:"pn-13"}]},{id:"concept-14",title:"检伤分类",type:"concept",gloss:"现场伤员分级方法",desc:"灾害救援的关键环节",summary:"灾害现场根据伤情严重程度将伤员分为红黄绿黑四类，以决定救治优先顺序。原则包括简单快速、分类分级、救命优先等。常用方法有START、Jump START、SALT。",count:18,culture:"核心概念",medium:"技术",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-1"}]},{id:"concept-15",title:"检伤分类原则",type:"concept",gloss:"分类操作的基本准则",desc:"指导检伤分类实施的规则",summary:"包括简单快速、分类分级、救命优先、自主决策、重复检伤、公平有效六大原则。其中平均每名伤员检伤时间不超过1分钟。",count:7,culture:"基础理论",medium:"原则",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-2"}]},{id:"concept-16",title:"START分类法",type:"concept",gloss:"成人快速检伤分类方法",desc:"最常用的检伤分类系统",summary:"基于呼吸、心跳及意识状况的检伤分类方法，将伤员分为红、黄、绿、黑四组，每位伤员评估和处置时间不超过30秒。",count:4,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-3"}]},{id:"concept-17",title:"Jump START分类法",type:"concept",gloss:"儿童专用检伤分类方法",desc:"适用于儿童的检伤分类系统",summary:"对START修正后用于1~8岁儿童检伤分类的方法，分组和分类依据与START相似，但基于儿童生理特点调整。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-4"}]},{id:"concept-18",title:"SALT分类法",type:"concept",gloss:"大规模伤亡事件分诊系统",desc:"综合性的检伤分类方法",summary:"融分类、评估、挽救生命及处置转运为一体的预检分诊系统，适用于大规模伤亡事件，包括sort、assessment、life-saving intervention、treatment/transport。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-5"}]},{id:"concept-19",title:"收容分类",type:"concept",gloss:"伤员接收时的初步分类",desc:"检伤分类的类型之一",summary:"接收伤员的第一步，快速识别需要优先抢救的伤员，帮助其脱离危险环境，安排前往相应区域接受进一步检查和治疗。",count:2,culture:"基础理论",medium:"概念",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-6"}]},{id:"concept-20",title:"救治分类",type:"concept",gloss:"确定救治顺序的分类",desc:"检伤分类的类型之一",summary:"决定救治顺序的伤情分类，将轻、中、重伤员分开，结合伤员数量和资源确定救治优先顺序。",count:2,culture:"基础理论",medium:"概念",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-7"}]},{id:"concept-21",title:"后送分类",type:"concept",gloss:"决定转运优先级的分类",desc:"检伤分类的类型之一",summary:"确定伤员转运到确定性医疗机构顺序的分类，根据伤情紧迫性、耐受性、救护措施和可用的后送工具决定。",count:2,culture:"基础理论",medium:"概念",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-8"}]},{id:"concept-22",title:"地震伤员的救护",type:"concept",gloss:"地震灾害的现场急救措施",desc:"常见灾害事故现场救护之一",summary:"针对地震造成的机械性损伤、坠落伤、完全性饥饿、挤压综合征等伤情的现场救护，包括检伤分类、保持气道通畅、固定骨折、止血包扎、补液等。",count:6,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-1"}]},{id:"concept-23",title:"挤压综合征",type:"concept",gloss:"挤压伤导致的全身性并发症",desc:"地震现场需重点监测的伤情",summary:"长时间受坍塌重物挤压引起肌肉组织缺血性坏死并释放有害物质入血，可导致休克和肾衰竭，是地震常见伤情。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-2"}]},{id:"concept-24",title:"完全性饥饿",type:"concept",gloss:"长期被困导致的营养耗竭状态",desc:"地震伤情之一",summary:"受灾人员长时间被困废墟中断食断饮，体内营养耗竭，导致代谢紊乱、虚脱而濒临死亡的状态。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-3"}]},{id:"concept-25",title:"火灾伤员的救护",type:"concept",gloss:"火灾现场的急救措施",desc:"常见灾害事故现场救护之一",summary:"针对火灾导致的热力/烟雾吸入性损伤和烧伤的现场救护，包括脱离火源、心肺复苏、补液、保护创面、转运等。",count:8,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-4"}]},{id:"concept-26",title:"吸入性损伤",type:"concept",gloss:"火灾导致的呼吸道损伤",desc:"火灾现场常见致命伤情",summary:"由火焰热力或烟雾引起的呼吸道甚至肺实质损伤，分为轻中重度。轻度限于声门以上，中度达气管隆嵴，重度至支气管肺泡。",count:6,culture:"临床应用",medium:"概念",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-5"}]},{id:"concept-27",title:"新九分法",type:"concept",gloss:"烧伤面积估算方法",desc:"评估烧伤严重程度的常用工具",summary:"估算烧伤面积的方法：头颈部9%，双上肢18%，躯干前后27%，双下肢46%。简便法以患者手掌面积为1%。",count:3,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-6"}]},{id:"concept-28",title:"烧伤性休克",type:"concept",gloss:"烧伤引起的休克状态",desc:"严重烧伤的常见并发症",summary:"烧伤后因剧痛和皮肤渗出导致的休克，表现为烦渴、烦躁、尿少、脉快、血压下降、四肢厥冷等。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-7"}]},{id:"concept-29",title:"水灾伤员的救护",type:"concept",gloss:"水灾现场的急救措施",desc:"常见灾害事故现场救护之一",summary:"针对水灾造成的淹溺、机械性损伤、触电、虫蛇咬伤、传染性疾病等的现场救护，重点包括快速检伤分类、淹溺急救、传染病防控。",count:5,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-8"}]},{id:"concept-31",title:"道路交通事故伤员的救护",type:"concept",gloss:"交通事故现场的急救措施",desc:"常见灾害事故现场救护之一",summary:"针对交通事故造成的多种损伤（撞击伤、碾压伤等），遵循边抢边救、先重后轻原则，包括报警、统一指挥、检伤分类、基本步骤等。",count:8,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-10"}]},{id:"concept-32",title:"矿难伤员的救护",type:"concept",gloss:"矿难现场的急救措施",desc:"常见灾害事故现场救护之一",summary:"针对瓦斯爆炸、煤尘爆炸、透水事故等矿难造成的爆炸伤、烧伤、窒息、中毒、淹溺、机械性损伤的现场救护。",count:5,culture:"临床应用",medium:"技术",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-11"}]},{id:"concept-33",title:"瓦斯爆炸",type:"concept",gloss:"矿井瓦斯引发的爆炸",desc:"矿难主要致伤原因",summary:"矿难常见类型，瞬间温度可达1850～2650℃，压力可达初压9倍，冲击波速度快，可导致严重爆炸伤和烧伤。",count:2,culture:"临床应用",medium:"概念",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-12"}]},{id:"concept-34",title:"突发公共卫生事件",type:"concept",gloss:"影响公众健康的突发事件",desc:"灾害救护的特殊类型",summary:"造成或可能造成社会公众健康严重损害的重大传染病疫情、群体不明原因疾病、重大食物和职业中毒以及其他严重影响公众健康的突发事件。",count:6,culture:"核心概念",medium:"概念",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-13"}]},{id:"concept-35",title:"应急处理指挥部",type:"concept",gloss:"突发事件指挥机构",desc:"灾害救援的组织核心",summary:"突发公共卫生事件发生后成立的统一领导、统一指挥机构，负责组织协调救援工作。",count:2,culture:"基础理论",medium:"机构",refs:[{chapter:"ch4-3",title:"第三节 常见灾害事故的现场救护",pn:"pn-14"}]},{id:"concept-36",title:"红色标识",type:"concept",gloss:"危重伤员的分类标识",desc:"检伤分类的颜色标识之一",summary:"检伤分类中代表危重伤员，需优先紧急处置和转运，如严重颅脑损伤、休克、大出血等。",count:4,culture:"临床应用",medium:"符号",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-9"}]},{id:"concept-37",title:"黄色标识",type:"concept",gloss:"中重伤员的分类标识",desc:"检伤分类的颜色标识之一",summary:"检伤分类中代表中重伤员，有潜在生命危险，需优先后送，如开放性骨折、小面积烧伤等。",count:3,culture:"临床应用",medium:"符号",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-10"}]},{id:"concept-38",title:"绿色标识",type:"concept",gloss:"轻伤员的分类标识",desc:"检伤分类的颜色标识之一",summary:"检伤分类中代表轻伤员，可暂缓后送，如皮肤擦伤、裂伤等。",count:3,culture:"临床应用",medium:"符号",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-11"}]},{id:"concept-39",title:"黑色标识",type:"concept",gloss:"死亡或濒死伤员的标识",desc:"检伤分类的颜色标识之一",summary:"检伤分类中代表死亡或致命伤，无生命迹象或不可逆转的伤员，如呼吸心跳停止且抢救无效者。",count:2,culture:"临床应用",medium:"符号",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-12"}]},{id:"concept-40",title:"暂缓转运指征",type:"concept",gloss:"不宜立即转运的条件",desc:"灾害现场转运决策依据",summary:"包括休克未纠正、颅内高压可能脑疝、颈髓损伤呼吸功能障碍、脏器衰竭、胸腹部伤情不稳定、依从性差等。",count:3,culture:"临床应用",medium:"原则",refs:[{chapter:"ch4-2",title:"第二节 灾害现场检伤分类",pn:"pn-13"}]},{id:"concept-1",title:"实训操作项目",type:"concept",gloss:"课程实践教学中的实训操作项目集合。",desc:"急危重症护理学课程实践环节的实训项目总称。",summary:"《急危重症护理学》附录一中的实训操作项目是课程实践核心环节，涵盖典型任务、技能训练与评估标准，包括心肺复苏、简易呼吸器使用等八大实训项目。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module6",title:"附录一 实训操作项目",pn:"pn-1"}]},{id:"concept-2",title:"单人徒手心肺复苏(成人)",type:"concept",gloss:"成人单人徒手心肺复苏操作技能。",desc:"实训项目一：单人徒手心肺复苏（成人）。",summary:"实训项目一，针对成人的单人徒手心肺复苏技能训练，是急救基本技能，主要包括胸外按压和人工呼吸操作。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module6",title:"附录一 实训操作项目",pn:"pn-1"}]},{id:"concept-3",title:"简易呼吸器的使用",type:"concept",gloss:"简易呼吸器操作技能训练。",desc:"实训项目二：简易呼吸器的使用。",summary:"实训项目二，训练使用简易呼吸器（球囊-面罩-单向阀装置）为患者提供正压通气，是气道管理基础技能。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module6",title:"附录一 实训操作项目",pn:"pn-1"}]},{id:"concept-4",title:"心电监护",type:"concept",gloss:"心电监护技能训练。",desc:"实训项目三：心电监护。",summary:"实训项目三，训练心电监护仪的使用和心电图识别，用于持续监测患者心脏电活动，及时发现心律失常。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module6",title:"附录一 实训操作项目",pn:"pn-1"}]},{id:"concept-8",title:"气管插管的配合",type:"concept",gloss:"气管插管配合技能训练。",desc:"实训项目七：气管插管的配合。",summary:"实训项目七，训练护士协助医生进行气管插管操作，包括物品准备、患者体位、插管配合、确认位置等。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module6",title:"附录一 实训操作项目",pn:"pn-1"}]},{id:"concept-9",title:"气管切开置管的护理(气道湿化、翻身、拍背和吸痰)",type:"concept",gloss:"气管切开置管护理技能训练。",desc:"实训项目八：气管切开置管的护理（含气道湿化、翻身、拍背和吸痰）。",summary:"实训项目八，训练气管切开术后置管的护理技术，包括气道湿化、翻身、拍背和吸痰，以保持气道通畅、预防并发症。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module6",title:"附录一 实训操作项目",pn:"pn-1"}]},{id:"concept-1",title:"护士执业资格",type:"concept",gloss:"护士上岗的法定准入资格",desc:"护士执业资格是护士从事临床护理工作的法定前提",summary:"护士执业资格是指国家规定的从事护理工作所必须具备的法定资格，通过护士执业资格考试获得。本文中作为附录二的核心考点之一，强调护理评估、无菌操作等高频知识。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module7",title:"附录二 护士执业资格/1+X职业技能等级证书考试相关考点",pn:"pn-1"}]},{id:"concept-2",title:"1+X职业技能等级证书",type:"concept",gloss:"学历证书+若干职业技能等级证书",desc:"1+X证书制度旨在提升学生的职业技能水平",summary:"1+X职业技能等级证书是职业教育改革中的证书制度，其中“1”为学历证书，“X”为若干职业技能等级证书。本文将其与护士执业资格并列作为考点整合内容。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module7",title:"附录二 护士执业资格/1+X职业技能等级证书考试相关考点",pn:"pn-1"}]},{id:"concept-3",title:"护理评估",type:"concept",gloss:"护理程序的首要环节",desc:"护理评估是护士对患者健康状况进行系统收集和分析的过程",summary:"护理评估是护理程序的第一步，通过系统收集患者资料来识别健康问题。本文将其列为高频考点之一，与无菌操作、药物管理并列。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module7",title:"附录二 护士执业资格/1+X职业技能等级证书考试相关考点",pn:"pn-1"}]},{id:"concept-4",title:"无菌操作",type:"concept",gloss:"防止微生物污染的规范操作",desc:"无菌操作是保障患者安全、预防感染的关键技术",summary:"无菌操作是指在医疗护理过程中防止微生物污染的操作技术，包括无菌手套、无菌铺盘等。本文将其作为护士执业资格和1+X证书考试的高频考点。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module7",title:"附录二 护士执业资格/1+X职业技能等级证书考试相关考点",pn:"pn-1"}]},{id:"concept-5",title:"药物管理",type:"concept",gloss:"药品使用全过程的规范化管理",desc:"药物管理是护理工作中确保用药安全的重要环节",summary:"药物管理涉及药物的储存、配置、给药及不良反应监测等环节。本文将其作为考试高频知识整合的要点之一，与护理评估、无菌操作并列。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module7",title:"附录二 护士执业资格/1+X职业技能等级证书考试相关考点",pn:"pn-1"}]},{id:"concept-6",title:"七步洗手法",type:"concept",gloss:"标准手卫生操作步骤",desc:"七步洗手法是预防医院感染的基本洗手方法",summary:"七步洗手法是医务人员手卫生的标准操作流程，通过内、外、夹、弓、大、立、腕七个步骤彻底清洁双手。本文将其作为无菌操作的具体示例提及。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module7",title:"附录二 护士执业资格/1+X职业技能等级证书考试相关考点",pn:"pn-1"}]},{id:"concept-1",title:"参考文献",type:"concept",gloss:"学术写作中引用来源的规范性条目列表",desc:"用于保障知识溯源与学术诚信的文献引用规范",summary:"参考文献是学术写作的基础，通过规范引用保障知识溯源与诚信，标注来源避免剽窃，格式遵循统一标准如APA，著录信息完整可供查证。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"concept-2",title:"学术写作",type:"concept",gloss:"以学术规范为基础的书面创作过程",desc:"参考文献是学术写作的基础组成部分",summary:"学术写作是围绕研究问题或论点进行逻辑论证和知识传播的书面表达形式，强调规范性、客观性和可追溯性。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"concept-3",title:"知识溯源",type:"concept",gloss:"追溯知识原始出处的方法",desc:"参考文献保障知识溯源与诚信",summary:"知识溯源是指追踪知识来源、验证信息真实性的过程，通过参考文献实现学术传承与创新。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"concept-4",title:"学术诚信",type:"concept",gloss:"学术活动中的道德准则",desc:"参考文献通过规范引用保障学术诚信",summary:"学术诚信指在学术活动中遵守道德规范，尊重他人成果，通过规范引用避免剽窃，维护学术公信力。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"concept-5",title:"剽窃",type:"concept",gloss:"未经注明使用他人成果的学术不端行为",desc:"标注来源避免剽窃是参考文献的基本功能",summary:"剽窃是指未经授权使用他人作品或思想而不注明来源的行为，违反学术道德，通过规范引用可避免。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"concept-6",title:"格式规范",type:"concept",gloss:"参考文献著录的标准化规则",desc:"格式遵循统一标准如APA，著录信息完整可供查证",summary:"格式规范是参考文献著录时遵循的统一标准，如APA格式，确保信息完整、一致，便于查证与交流。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"concept-7",title:"APA格式",type:"concept",gloss:"美国心理学会制定的学术格式标准",desc:"参考文献格式遵循统一标准如APA",summary:"APA格式是美国心理学会制定的学术出版规范，广泛用于社会科学领域，规定引用格式、参考文献著录等细节。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"concept-8",title:"著录信息",type:"concept",gloss:"参考文献中必须包含的完整信息要素",desc:"引用期刊文章需注明作者、年份、标题、刊名、卷期页码",summary:"著录信息指参考文献中需完整列出的要素，如作者、年份、标题、刊名、卷期页码等，确保可查证。",count:1,culture:"核心概念",medium:"概念",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-1",title:"急危重症护理学 (3版, 西安: 第四军医大学出版社, 2014)",type:"work",gloss:"急危重症护理学教材第三版",desc:"参考文献[1]所列图书",summary:"急危重症护理学教材第三版，由第四军医大学出版社出版，供护理学专业使用，内容涵盖急危重症护理理论与实践。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-2",title:"临床急诊护理学 (天津: 天津科学技术出版社, 2009)",type:"work",gloss:"临床急诊护理学教材",desc:"参考文献[2]所列图书",summary:"临床急诊护理学教材，由天津科学技术出版社出版，系统介绍急诊护理的理论与技术。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-3",title:"急危重症护理学 (2版, 北京: 人民卫生出版社, 2009)",type:"work",gloss:"急危重症护理学第二版（2009）",desc:"参考文献[3]所列图书",summary:"急危重症护理学教材第二版，人民卫生出版社出版，2009年发行，为护理专业核心教材。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-4",title:"急危重症护理学 (2版, 北京: 人民卫生出版社, 2013)",type:"work",gloss:"急危重症护理学第二版（2013）",desc:"参考文献[4]所列图书",summary:"急危重症护理学教材第二版，人民卫生出版社出版，2013年发行，内容更新与临床实践结合。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-5",title:"急危重症护理 (北京: 北京出版社, 2011)",type:"work",gloss:"急危重症护理教材",desc:"参考文献[5]所列图书",summary:"急危重症护理教材，北京出版社2011年出版，侧重于临床护理操作与急救技术。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-6",title:"急危重症护理学 (2版, 西安: 第四军医大学出版社, 2011)",type:"work",gloss:"急危重症护理学第二版（2011，第四军医大学）",desc:"参考文献[6]所列图书",summary:"急危重症护理学第二版，第四军医大学出版社2011年出版，注重理论与临床结合。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-7",title:"急危重症护理学 (3版, 上海: 同济大学出版社, 2019)",type:"work",gloss:"急危重症护理学第三版（2019）",desc:"参考文献[7]所列图书，作者张继娜、李涛",summary:"急危重症护理学第三版，张继娜、李涛主编，同济大学出版社2019年出版，系统阐述急危重症护理知识。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-8",title:"危重症监护 (北京: 人民卫生出版社, 2012)",type:"work",gloss:"危重症监护教材",desc:"参考文献[8]所列图书，作者方芳",summary:"危重症监护教材，方芳主编，人民卫生出版社2012年出版，重点介绍危重症患者的监测与护理技术。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-9",title:"急危重症护理学 (3版, 北京: 人民卫生出版社, 2014)",type:"work",gloss:"急危重症护理学第三版（2014，人民卫生）",desc:"参考文献[9]所列图书，作者王慧珍",summary:"急危重症护理学第三版，王慧珍主编，人民卫生出版社2014年出版，为护理专业规划教材。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-10",title:"急危重症护理学 (4版, 北京: 人民卫生出版社, 2017)",type:"work",gloss:"急危重症护理学第四版（2017）",desc:"参考文献[10]所列图书，作者张波、桂莉",summary:"急危重症护理学第四版，张波、桂莉主编，人民卫生出版社2017年出版，融入最新急救指南与实践。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-11",title:"急危重症护理学 (4版, 北京: 人民卫生出版社, 2018)",type:"work",gloss:"急危重症护理学第四版（2018）",desc:"参考文献[11]所列图书，作者胡爱招、王明弘",summary:"急危重症护理学第四版，胡爱招、王明弘主编，人民卫生出版社2018年出版，系统全面。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-12",title:"中国1996—2015年城市院前急救反应时间分析",type:"work",gloss:"院前急救反应时间研究论文",desc:"参考文献[12]所列期刊文章",summary:"刊载于《中国公共卫生》2017年33卷10期的研究论文，分析中国城市院前急救反应时间的长期变化趋势。",count:1,culture:"拓展延伸",medium:"期刊",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-13",title:"《重症监护病房医院感染预防与控制规范》解读",type:"work",gloss:"ICU感染防控规范解读",desc:"参考文献[13]所列期刊文章",summary:"刊载于《中华医院感染学杂志》2017年27卷15期的规范解读文章，详细阐述ICU感染防控要点。",count:1,culture:"拓展延伸",medium:"期刊",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-14",title:"《2019美国心脏协会心肺复苏与心血管急救指南: 高级心血管生命支持重点更新》解读",type:"work",gloss:"2019 AHA指南解读",desc:"参考文献[14]所列期刊文章",summary:"刊载于《中国临床医生杂志》2021年49卷1期的指南解读文章，聚焦高级心血管生命支持更新要点。",count:1,culture:"拓展延伸",medium:"期刊",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-15",title:"《2020年美国心脏协会心肺复苏及心血管急救指南》十大亮点",type:"work",gloss:"2020 AHA指南亮点总结",desc:"参考文献[15]所列期刊文章",summary:"刊载于《实用心脑肺血管病杂志》2020年28卷12期的简要报道，总结2020 AHA指南的十大核心亮点。",count:1,culture:"拓展延伸",medium:"期刊",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-16",title:"2020年美国心脏协会心肺复苏和心血管急救指南解读——成人基础/高级生命支持",type:"work",gloss:"2020 AHA指南解读（华西医学）",desc:"参考文献[16]所列期刊文章",summary:"刊载于《华西医学》2020年35卷11期的指南解读文章，系统解读成人基础与高级生命支持部分。",count:1,culture:"拓展延伸",medium:"期刊",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-17",title:"中华医学百科全书(临床医学·急诊医学)",type:"work",gloss:"中华医学百科全书·急诊医学",desc:"参考文献[17]所列图书",summary:"中华医学百科全书临床医学卷中的急诊医学分册，于学忠、周荣斌主编，中国协和医科大学出版社2018年出版。",count:1,culture:"核心文献",medium:"图书",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"work-18",title:"国家突发公共事件医疗卫生救援应急预案",type:"work",gloss:"国家突发公共事件医疗救援预案",desc:"参考文献[18]所列网页资源",summary:"由中华人民共和国中央人民政府发布的国家级应急预案，规范突发公共事件医疗卫生救援工作，2006年公布。",count:1,culture:"拓展延伸",medium:"网页",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-1",title:"张继娜",type:"person",gloss:"急危重症护理学主编",desc:"参考文献[7]的作者",summary:"急危重症护理学教材主编之一，参与编写《急危重症护理学》第三版（同济大学出版社，2019）。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-2",title:"李涛",type:"person",gloss:"急危重症护理学主编",desc:"参考文献[7]的作者",summary:"急危重症护理学教材主编之一，与张继娜合编《急危重症护理学》第三版（同济大学出版社，2019）。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-3",title:"方芳",type:"person",gloss:"危重症监护主编",desc:"参考文献[8]的作者",summary:"危重症监护教材主编，编写《危重症监护》（人民卫生出版社，2012）。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-4",title:"王慧珍",type:"person",gloss:"急危重症护理学主编",desc:"参考文献[9]的作者",summary:"急危重症护理学教材主编，编写《急危重症护理学》第三版（人民卫生出版社，2014）。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-5",title:"张波",type:"person",gloss:"急危重症护理学主编",desc:"参考文献[10]的作者",summary:"急危重症护理学教材主编之一，与桂莉合编《急危重症护理学》第四版（人民卫生出版社，2017）。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-6",title:"桂莉",type:"person",gloss:"急危重症护理学主编",desc:"参考文献[10]的作者",summary:"急危重症护理学教材主编之一，与张波合编《急危重症护理学》第四版（人民卫生出版社，2017）。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-7",title:"胡爱招",type:"person",gloss:"急危重症护理学主编",desc:"参考文献[11]的作者",summary:"急危重症护理学教材主编之一，与王明弘合编《急危重症护理学》第四版（人民卫生出版社，2018）。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-8",title:"王明弘",type:"person",gloss:"急危重症护理学主编",desc:"参考文献[11]的作者",summary:"急危重症护理学教材主编之一，与胡爱招合编《急危重症护理学》第四版（人民卫生出版社，2018）。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-9",title:"齐腾飞",type:"person",gloss:"院前急救研究论文作者",desc:"参考文献[12]的作者",summary:"论文《中国1996—2015年城市院前急救反应时间分析》的第一作者，研究中国急救响应时间。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-10",title:"景军",type:"person",gloss:"院前急救研究论文作者",desc:"参考文献[12]的作者",summary:"论文《中国1996—2015年城市院前急救反应时间分析》的作者之一，合作完成院前急救研究。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-11",title:"王力红",type:"person",gloss:"ICU感控规范解读作者",desc:"参考文献[13]的作者",summary:"《重症监护病房医院感染预防与控制规范》解读文章的第一作者，从事医院感染管理研究。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-12",title:"赵霞",type:"person",gloss:"ICU感控规范解读作者",desc:"参考文献[13]的作者",summary:"《重症监护病房医院感染预防与控制规范》解读文章的作者之一，参与感控规范解读。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-13",title:"张京利",type:"person",gloss:"ICU感控规范解读作者",desc:"参考文献[13]的作者",summary:"《重症监护病房医院感染预防与控制规范》解读文章的作者之一，参与ICU感控规范解读。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-14",title:"李艳兵",type:"person",gloss:"AHA指南解读作者",desc:"参考文献[14]的作者",summary:"《2019美国心脏协会心肺复苏与心血管急救指南：高级心血管生命支持重点更新》解读文章的第一作者。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-15",title:"张建军",type:"person",gloss:"AHA指南解读作者",desc:"参考文献[14]的作者",summary:"《2019美国心脏协会心肺复苏与心血管急救指南：高级心血管生命支持重点更新》解读文章的作者之一。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-16",title:"何亚荣",type:"person",gloss:"AHA指南解读作者",desc:"参考文献[16]的作者",summary:"《2020年美国心脏协会心肺复苏和心血管急救指南解读——成人基础/高级生命支持》的第一作者。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-17",title:"郑玥",type:"person",gloss:"AHA指南解读作者",desc:"参考文献[16]的作者",summary:"《2020年美国心脏协会心肺复苏和心血管急救指南解读》的作者之一。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-18",title:"周法庭",type:"person",gloss:"AHA指南解读作者",desc:"参考文献[16]的作者",summary:"《2020年美国心脏协会心肺复苏和心血管急救指南解读》的作者之一。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-19",title:"于学忠",type:"person",gloss:"急诊医学百科全书主编",desc:"参考文献[17]的作者",summary:"中华医学百科全书（临床医学·急诊医学）的主编之一，急诊医学领域专家。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-20",title:"周荣斌",type:"person",gloss:"急诊医学百科全书主编",desc:"参考文献[17]的作者",summary:"中华医学百科全书（临床医学·急诊医学）的主编之一，急诊医学领域专家。",count:1,culture:"拓展延伸",medium:"人物",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"person-21",title:"中华人民共和国中央人民政府",type:"person",gloss:"中国政府机构",desc:"参考文献[18]的作者（发布机构）",summary:"国家最高行政机关，发布《国家突发公共事件医疗卫生救援应急预案》，作为政府应急管理文件。",count:1,culture:"拓展延伸",medium:"机构",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"location-1",title:"北京",type:"location",gloss:"中国首都",desc:"参考文献[3][4][5][8][9][10][11][17]的出版地",summary:"中华人民共和国首都，参考文献中多个图书的出版地，如人民卫生出版社、北京出版社等所在地。",count:8,culture:"拓展延伸",medium:"地点",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"location-2",title:"西安",type:"location",gloss:"陕西省省会",desc:"参考文献[1][6]的出版地",summary:"陕西省省会，第四军医大学出版社所在地，参考文献[1][6]的出版地。",count:2,culture:"拓展延伸",medium:"地点",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"location-3",title:"天津",type:"location",gloss:"直辖市",desc:"参考文献[2]的出版地",summary:"天津市，天津科学技术出版社所在地，参考文献[2]的出版地。",count:1,culture:"拓展延伸",medium:"地点",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"location-4",title:"上海",type:"location",gloss:"直辖市",desc:"参考文献[7]的出版地",summary:"上海市，同济大学出版社所在地，参考文献[7]的出版地。",count:1,culture:"拓展延伸",medium:"地点",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]},{id:"location-5",title:"中国",type:"location",gloss:"国家名称",desc:"参考文献[12]的研究区域和[18]的发布国",summary:"中华人民共和国，参考文献[12]研究范围涵盖中国城市院前急救，[18]发布主体为中华人民共和国中央人民政府。",count:2,culture:"拓展延伸",medium:"地点",refs:[{chapter:"module8",title:"参考文献",pn:"pn-1"}]}],enrichedRelations:[{from:"concept-star-of-life",to:"medium-china-emblem",type:"adaptation",label:"改编为",reason:"中国在生命之星基础上添加长城、橄榄枝等中国元素，形成我国院前医疗急救标识"},{from:"location-france",to:"concept-16",type:"influence",label:"影响",reason:"法国最早组建EMSS，欧洲模式以法国为代表，强调院前救治"},{from:"location-usa",to:"concept-15",type:"influence",label:"影响",reason:"美国1968年提议建立急症医疗系，1973年颁布EMSS法案，推动英美模式"},{from:"concept-15",to:"concept-17",type:"influence",label:"影响",reason:"中国院前急救模式借鉴英美模式快速转运理念"},{from:"concept-16",to:"concept-17",type:"influence",label:"影响",reason:"中国院前急救模式借鉴欧洲模式院前救治理念"},{from:"organization-1",to:"concept-42",type:"influence",label:"制定",reason:"美国心脏协会从1974年开始制定并定期更新心肺复苏指南，2020版是其最新版本"},{from:"person-3",to:"concept-tracheal-intubation",type:"influence",label:"提出",reason:"Andreas Vesalius首次提出通过气管插管向肺内鼓气，是人工通气的先驱"},{from:"concept-27",to:"concept-ventilator",type:"influence",label:"影响",reason:"铁肺（负压呼吸机）是机械通气的里程碑，为现代呼吸机发展奠定基础"},{from:"person-1",to:"device-10",type:"influence",label:"发明",reason:"Henning Ruben发明了自充气球囊，创造了现代简易呼吸器的雏形"},{from:"person-2",to:"concept-26",type:"influence",label:"创办",reason:"Holger Hesse创办Ambu公司，将简易呼吸器商业化并推广"},{from:"concept-42",to:"work-16",type:"citation",label:"引用",reason:"中国学者何亚荣等对2020年AHA指南进行中文解读，发表于华西医学"},{from:"culture-1",to:"concept-5",type:"influence",label:"命名推广",reason:"美国医学会于1975年以亨利·海姆立克的名字命名该急救法并推广"},{from:"center-work",to:"concept-1",type:"influence",label:"包含",reason:"急危重症护理学属于本书知识体系"},{from:"center-work",to:"concept-2",type:"influence",label:"包含",reason:"护理专业属于本书知识体系"},{from:"center-work",to:"work-1",type:"influence",label:"包含",reason:"党的二十大报告属于本书知识体系"},{from:"center-work",to:"concept-3",type:"influence",label:"包含",reason:"教材建设和管理属于本书知识体系"},{from:"center-work",to:"concept-4",type:"influence",label:"包含",reason:"三基属于本书知识体系"},{from:"center-work",to:"concept-6",type:"influence",label:"包含",reason:"问题导向属于本书知识体系"},{from:"center-work",to:"medium-1",type:"influence",label:"包含",reason:"微课属于本书知识体系"},{from:"center-work",to:"medium-2",type:"influence",label:"包含",reason:"思维导图属于本书知识体系"},{from:"center-work",to:"medium-3",type:"influence",label:"包含",reason:"知识链接属于本书知识体系"},{from:"center-work",to:"medium-4",type:"influence",label:"包含",reason:"素质拓展属于本书知识体系"},{from:"center-work",to:"concept-emss",type:"influence",label:"包含",reason:"急救医疗服务体系 (EMSS)属于本书知识体系"},{from:"center-work",to:"concept-prehospital",type:"influence",label:"包含",reason:"院前急救属于本书知识体系"},{from:"center-work",to:"concept-emergency-department",type:"influence",label:"包含",reason:"急诊科属于本书知识体系"},{from:"center-work",to:"concept-icu",type:"influence",label:"包含",reason:"重症监护室 (ICU)属于本书知识体系"},{from:"center-work",to:"work-1980-opinion",type:"influence",label:"包含",reason:"《关于加强城市急救工作的意见》属于本书知识体系"},{from:"center-work",to:"work-1995-disaster",type:"influence",label:"包含",reason:"《灾害事故医疗救援工作管理办法》属于本书知识体系"},{from:"center-work",to:"concept-communication-network",type:"influence",label:"包含",reason:"急救通信网络属于本书知识体系"},{from:"center-work",to:"concept-aeromedical-evacuation",type:"influence",label:"包含",reason:"航空医疗救护属于本书知识体系"},{from:"center-work",to:"concept-green-channel",type:"influence",label:"包含",reason:"生命绿色通道属于本书知识体系"},{from:"center-work",to:"person-zhang",type:"influence",label:"包含",reason:"张某属于本书知识体系"},{from:"center-work",to:"concept-station-no15",type:"influence",label:"包含",reason:"第15号急救站属于本书知识体系"},{from:"center-work",to:"concept-self-aid",type:"influence",label:"包含",reason:"群众自救互救属于本书知识体系"},{from:"center-work",to:"concept-emss-legislation",type:"influence",label:"包含",reason:"EMSS法案属于本书知识体系"},{from:"center-work",to:"concept-ambulance-standard",type:"influence",label:"包含",reason:"急救车标准属于本书知识体系"},{from:"center-work",to:"concept-snake-staff",type:"influence",label:"包含",reason:"蛇杖属于本书知识体系"},{from:"center-work",to:"concept-international-sos",type:"influence",label:"包含",reason:"国际SOS救援中心属于本书知识体系"},{from:"center-work",to:"concept-7",type:"influence",label:"包含",reason:"反应时间属于本书知识体系"},{from:"center-work",to:"concept-8",type:"influence",label:"包含",reason:"伤情分类属于本书知识体系"},{from:"center-work",to:"concept-9",type:"influence",label:"包含",reason:"先救命后治病属于本书知识体系"},{from:"center-work",to:"concept-10",type:"influence",label:"包含",reason:"心肺复苏属于本书知识体系"},{from:"center-work",to:"concept-11",type:"influence",label:"包含",reason:"止血属于本书知识体系"},{from:"center-work",to:"concept-12",type:"influence",label:"包含",reason:"包扎属于本书知识体系"},{from:"center-work",to:"concept-13",type:"influence",label:"包含",reason:"固定属于本书知识体系"},{from:"center-work",to:"concept-14",type:"influence",label:"包含",reason:"搬运属于本书知识体系"},{from:"center-work",to:"concept-18",type:"influence",label:"包含",reason:"生存链属于本书知识体系"},{from:"center-work",to:"concept-19",type:"influence",label:"包含",reason:"急救电话120属于本书知识体系"},{from:"center-work",to:"concept-20",type:"influence",label:"包含",reason:"救护车属于本书知识体系"},{from:"center-work",to:"concept-triage",type:"influence",label:"包含",reason:"预检分诊属于本书知识体系"},{from:"center-work",to:"concept-first-diagnosis-responsibility",type:"influence",label:"包含",reason:"首诊负责制属于本书知识体系"},{from:"center-work",to:"concept-three-zone-four-level",type:"influence",label:"包含",reason:"三区四级属于本书知识体系"},{from:"center-work",to:"concept-ample-formula",type:"influence",label:"包含",reason:"AMPLE公式属于本书知识体系"},{from:"center-work",to:"concept-oldcart-formula",type:"influence",label:"包含",reason:"OLDCART公式属于本书知识体系"},{from:"center-work",to:"concept-pqrst-formula",type:"influence",label:"包含",reason:"PQRST公式属于本书知识体系"},{from:"center-work",to:"concept-level-i-patient",type:"influence",label:"包含",reason:"Ⅰ级患者（濒危患者）属于本书知识体系"},{from:"center-work",to:"concept-level-ii-patient",type:"influence",label:"包含",reason:"Ⅱ级患者（危重患者）属于本书知识体系"},{from:"center-work",to:"concept-level-iii-patient",type:"influence",label:"包含",reason:"Ⅲ级患者（急症患者）属于本书知识体系"},{from:"center-work",to:"concept-level-iv-patient",type:"influence",label:"包含",reason:"Ⅳ级患者（非急症患者）属于本书知识体系"},{from:"center-work",to:"concept-resuscitation-room",type:"influence",label:"包含",reason:"抢救室属于本书知识体系"},{from:"center-work",to:"concept-eicu",type:"influence",label:"包含",reason:"急诊重症监护室（EICU）属于本书知识体系"},{from:"center-work",to:"concept-gastric-lavage-room",type:"influence",label:"包含",reason:"洗胃室属于本书知识体系"},{from:"center-work",to:"concept-isolation-room",type:"influence",label:"包含",reason:"隔离室属于本书知识体系"},{from:"center-work",to:"concept-six-fix",type:"influence",label:"包含",reason:"六定管理属于本书知识体系"},{from:"center-work",to:"concept-emergency-nursing-competence",type:"influence",label:"包含",reason:"急诊护理人员素质要求属于本书知识体系"},{from:"center-work",to:"concept-documentation-after-resuscitation",type:"influence",label:"包含",reason:"抢救后6小时内补记属于本书知识体系"},{from:"center-work",to:"concept-comprehensive-icu",type:"influence",label:"包含",reason:"综合重症监护病房属于本书知识体系"},{from:"center-work",to:"concept-specialized-icu",type:"influence",label:"包含",reason:"专科重症监护病房属于本书知识体系"},{from:"center-work",to:"concept-partial-comprehensive-icu",type:"influence",label:"包含",reason:"部分综合重症监护病房属于本书知识体系"},{from:"center-work",to:"concept-ccu",type:"influence",label:"包含",reason:"冠心病监护病房(CCU)属于本书知识体系"},{from:"center-work",to:"concept-ricu",type:"influence",label:"包含",reason:"呼吸监护病房(RICU)属于本书知识体系"},{from:"center-work",to:"concept-central-monitoring-station",type:"influence",label:"包含",reason:"中心监护站属于本书知识体系"},{from:"center-work",to:"concept-computer-network-monitoring-system",type:"influence",label:"包含",reason:"计算机网络监护系统属于本书知识体系"},{from:"center-work",to:"concept-closed-circuit-tv-monitoring-system",type:"influence",label:"包含",reason:"闭路电视监控系统属于本书知识体系"},{from:"center-work",to:"concept-multifunction-monitor",type:"influence",label:"包含",reason:"多功能监护仪属于本书知识体系"},{from:"center-work",to:"concept-defibrillator",type:"influence",label:"包含",reason:"除颤器属于本书知识体系"},{from:"center-work",to:"concept-pacemaker",type:"influence",label:"包含",reason:"起搏器属于本书知识体系"},{from:"center-work",to:"concept-cardiopulmonary-resuscitation-machine",type:"influence",label:"包含",reason:"心肺复苏机属于本书知识体系"},{from:"center-work",to:"concept-infusion-pump",type:"influence",label:"包含",reason:"输液泵属于本书知识体系"},{from:"center-work",to:"concept-micro-injection-pump",type:"influence",label:"包含",reason:"微量注射泵属于本书知识体系"},{from:"center-work",to:"concept-ecg-machine",type:"influence",label:"包含",reason:"心电图机属于本书知识体系"},{from:"center-work",to:"concept-bedside-x-ray-machine",type:"influence",label:"包含",reason:"床边X线机属于本书知识体系"},{from:"center-work",to:"concept-blood-gas-analyzer",type:"influence",label:"包含",reason:"血气分析仪属于本书知识体系"},{from:"center-work",to:"concept-level-1-monitoring",type:"influence",label:"包含",reason:"一级监护属于本书知识体系"},{from:"center-work",to:"concept-level-2-monitoring",type:"influence",label:"包含",reason:"二级监护属于本书知识体系"},{from:"center-work",to:"concept-level-3-monitoring",type:"influence",label:"包含",reason:"三级监护属于本书知识体系"},{from:"center-work",to:"concept-endogenous-infection",type:"influence",label:"包含",reason:"内源性感染属于本书知识体系"},{from:"center-work",to:"concept-exogenous-infection",type:"influence",label:"包含",reason:"外源性感染属于本书知识体系"},{from:"center-work",to:"concept-maternal-neonatal-infection",type:"influence",label:"包含",reason:"母婴感染属于本书知识体系"},{from:"center-work",to:"concept-mrsa",type:"influence",label:"包含",reason:"抗甲氧西林金黄色葡萄球菌(MRSA)属于本书知识体系"},{from:"center-work",to:"concept-non-invasive-ventilation",type:"influence",label:"包含",reason:"无创通气属于本书知识体系"},{from:"center-work",to:"concept-tracheotomy",type:"influence",label:"包含",reason:"气管切开属于本书知识体系"},{from:"center-work",to:"concept-central-venous-catheter",type:"influence",label:"包含",reason:"深静脉导管属于本书知识体系"},{from:"center-work",to:"concept-hand-hygiene",type:"influence",label:"包含",reason:"手卫生属于本书知识体系"},{from:"center-work",to:"concept-isolation-gown",type:"influence",label:"包含",reason:"隔离衣属于本书知识体系"},{from:"center-work",to:"concept-n95-mask",type:"influence",label:"包含",reason:"N95口罩属于本书知识体系"},{from:"center-work",to:"concept-icu-admission-criteria",type:"influence",label:"包含",reason:"ICU收治对象属于本书知识体系"},{from:"center-work",to:"concept-icu-transfer-assessment",type:"influence",label:"包含",reason:"危重患者安全转运评估标准属于本书知识体系"},{from:"center-work",to:"person-yang-ping",type:"influence",label:"包含",reason:"杨萍属于本书知识体系"},{from:"center-work",to:"person-wang-ya-ni",type:"influence",label:"包含",reason:"王亚妮属于本书知识体系"},{from:"center-work",to:"person-qin-kang-hong",type:"influence",label:"包含",reason:"秦抗洪属于本书知识体系"},{from:"center-work",to:"concept-21",type:"influence",label:"包含",reason:"碳酸氢钠属于本书知识体系"},{from:"center-work",to:"concept-22",type:"influence",label:"包含",reason:"仰头举颏法属于本书知识体系"},{from:"center-work",to:"concept-23",type:"influence",label:"包含",reason:"双手托颌法属于本书知识体系"},{from:"center-work",to:"concept-24",type:"influence",label:"包含",reason:"口对口人工呼吸属于本书知识体系"},{from:"center-work",to:"concept-25",type:"influence",label:"包含",reason:"简易呼吸器属于本书知识体系"},{from:"center-work",to:"concept-28",type:"influence",label:"包含",reason:"胸外心脏按压与人工呼吸比属于本书知识体系"},{from:"center-work",to:"concept-29",type:"influence",label:"包含",reason:"脑复苏属于本书知识体系"},{from:"center-work",to:"concept-31",type:"influence",label:"包含",reason:"C-A-B程序属于本书知识体系"},{from:"center-work",to:"concept-32",type:"influence",label:"包含",reason:"口咽通气管属于本书知识体系"},{from:"center-work",to:"concept-33",type:"influence",label:"包含",reason:"鼻咽通气管属于本书知识体系"},{from:"center-work",to:"concept-34",type:"influence",label:"包含",reason:"复苏体位属于本书知识体系"},{from:"center-work",to:"concept-35",type:"influence",label:"包含",reason:"颈动脉搏动判断属于本书知识体系"},{from:"center-work",to:"concept-36",type:"influence",label:"包含",reason:"除颤能量属于本书知识体系"},{from:"center-work",to:"concept-37",type:"influence",label:"包含",reason:"骨髓给药属于本书知识体系"},{from:"center-work",to:"concept-38",type:"influence",label:"包含",reason:"心肺复苏有效表现属于本书知识体系"},{from:"center-work",to:"concept-39",type:"influence",label:"包含",reason:"心肺复苏终止指标属于本书知识体系"},{from:"center-work",to:"concept-40",type:"influence",label:"包含",reason:"婴儿心肺复苏属于本书知识体系"},{from:"center-work",to:"concept-41",type:"influence",label:"包含",reason:"阿托品用于心脏停搏属于本书知识体系"},{from:"center-work",to:"device-2",type:"influence",label:"包含",reason:"喉罩属于本书知识体系"},{from:"center-work",to:"device-3",type:"influence",label:"包含",reason:"气囊属于本书知识体系"},{from:"center-work",to:"device-4",type:"influence",label:"包含",reason:"喉镜属于本书知识体系"},{from:"center-work",to:"device-5",type:"influence",label:"包含",reason:"气管导管属于本书知识体系"},{from:"center-work",to:"device-6",type:"influence",label:"包含",reason:"导管管芯属于本书知识体系"},{from:"center-work",to:"device-7",type:"influence",label:"包含",reason:"牙垫属于本书知识体系"},{from:"center-work",to:"device-8",type:"influence",label:"包含",reason:"负压吸引器属于本书知识体系"},{from:"center-work",to:"device-9",type:"influence",label:"包含",reason:"吸痰管属于本书知识体系"},{from:"center-work",to:"device-11",type:"influence",label:"包含",reason:"气管切开套管属于本书知识体系"},{from:"center-work",to:"device-12",type:"influence",label:"包含",reason:"金属内套管属于本书知识体系"},{from:"center-work",to:"concept-30",type:"influence",label:"包含",reason:"担架搬运法属于本书知识体系"},{from:"center-work",to:"person-4",type:"influence",label:"包含",reason:"Alfred Jones属于本书知识体系"},{from:"center-work",to:"person-5",type:"influence",label:"包含",reason:"Drinker属于本书知识体系"},{from:"center-work",to:"person-6",type:"influence",label:"包含",reason:"Shaw属于本书知识体系"},{from:"center-work",to:"person-7",type:"influence",label:"包含",reason:"Frenkner属于本书知识体系"},{from:"center-work",to:"person-8",type:"influence",label:"包含",reason:"Crafoord属于本书知识体系"},{from:"center-work",to:"person-9",type:"influence",label:"包含",reason:"Emerson属于本书知识体系"},{from:"center-work",to:"concept-poisoning",type:"influence",label:"包含",reason:"中毒属于本书知识体系"},{from:"center-work",to:"concept-acute-poisoning",type:"influence",label:"包含",reason:"急性中毒属于本书知识体系"},{from:"center-work",to:"concept-chronic-poisoning",type:"influence",label:"包含",reason:"慢性中毒属于本书知识体系"},{from:"center-work",to:"concept-toxic-substance",type:"influence",label:"包含",reason:"毒物属于本书知识体系"},{from:"center-work",to:"concept-cholinesterase",type:"influence",label:"包含",reason:"胆碱酯酶属于本书知识体系"},{from:"center-work",to:"concept-carbon-monoxide",type:"influence",label:"包含",reason:"一氧化碳属于本书知识体系"},{from:"center-work",to:"concept-carboxyhemoglobin",type:"influence",label:"包含",reason:"碳氧血红蛋白属于本书知识体系"},{from:"center-work",to:"concept-gastric-lavage",type:"influence",label:"包含",reason:"洗胃属于本书知识体系"},{from:"center-work",to:"concept-emesis",type:"influence",label:"包含",reason:"催吐属于本书知识体系"},{from:"center-work",to:"concept-blood-purification",type:"influence",label:"包含",reason:"血液净化属于本书知识体系"},{from:"center-work",to:"concept-hemodialysis",type:"influence",label:"包含",reason:"血液透析属于本书知识体系"},{from:"center-work",to:"concept-plasmapheresis",type:"influence",label:"包含",reason:"血浆置换属于本书知识体系"},{from:"center-work",to:"concept-hemoperfusion",type:"influence",label:"包含",reason:"血液灌流属于本书知识体系"},{from:"center-work",to:"concept-antidote",type:"influence",label:"包含",reason:"解毒剂属于本书知识体系"},{from:"center-work",to:"concept-muscarinic-symptoms",type:"influence",label:"包含",reason:"毒蕈碱样症状属于本书知识体系"},{from:"center-work",to:"concept-nicotinic-symptoms",type:"influence",label:"包含",reason:"烟碱样症状属于本书知识体系"},{from:"center-work",to:"concept-intermediate-syndrome",type:"influence",label:"包含",reason:"中间型综合征属于本书知识体系"},{from:"center-work",to:"concept-delayed-neuropathy",type:"influence",label:"包含",reason:"迟发性神经病变属于本书知识体系"},{from:"center-work",to:"concept-atropinization",type:"influence",label:"包含",reason:"阿托品化属于本书知识体系"},{from:"center-work",to:"concept-cholinesterase-reactivator",type:"influence",label:"包含",reason:"胆碱酯酶复能剂属于本书知识体系"},{from:"center-work",to:"concept-penehyclidine",type:"influence",label:"包含",reason:"盐酸戊乙奎醚属于本书知识体系"},{from:"center-work",to:"concept-jielin-injection",type:"influence",label:"包含",reason:"解磷注射液属于本书知识体系"},{from:"center-work",to:"concept-consciousness-disorder",type:"influence",label:"包含",reason:"意识障碍属于本书知识体系"},{from:"center-work",to:"concept-fever",type:"influence",label:"包含",reason:"高热属于本书知识体系"},{from:"center-work",to:"concept-acute-chest-pain",type:"influence",label:"包含",reason:"急性胸痛属于本书知识体系"},{from:"center-work",to:"concept-acute-abdominal-pain",type:"influence",label:"包含",reason:"急性腹痛属于本书知识体系"},{from:"center-work",to:"concept-glasgow-coma-scale",type:"influence",label:"包含",reason:"格拉斯哥昏迷评分法属于本书知识体系"},{from:"center-work",to:"concept-decorcicate-syndrome",type:"influence",label:"包含",reason:"去皮质综合征属于本书知识体系"},{from:"center-work",to:"concept-infectious-fever",type:"influence",label:"包含",reason:"感染性发热属于本书知识体系"},{from:"center-work",to:"concept-noninfectious-fever",type:"influence",label:"包含",reason:"非感染性发热属于本书知识体系"},{from:"center-work",to:"concept-sustained-fever",type:"influence",label:"包含",reason:"稽留热属于本书知识体系"},{from:"center-work",to:"concept-remittent-fever",type:"influence",label:"包含",reason:"弛张热属于本书知识体系"},{from:"center-work",to:"concept-intermittent-fever",type:"influence",label:"包含",reason:"间歇热属于本书知识体系"},{from:"center-work",to:"concept-undulant-fever",type:"influence",label:"包含",reason:"波状热属于本书知识体系"},{from:"center-work",to:"concept-relapsing-fever",type:"influence",label:"包含",reason:"回归热属于本书知识体系"},{from:"center-work",to:"concept-irregular-fever",type:"influence",label:"包含",reason:"不规则热属于本书知识体系"},{from:"center-work",to:"concept-physical-cooling",type:"influence",label:"包含",reason:"物理降温属于本书知识体系"},{from:"center-work",to:"concept-drug-cooling",type:"influence",label:"包含",reason:"药物降温属于本书知识体系"},{from:"center-work",to:"concept-hibernation-therapy",type:"influence",label:"包含",reason:"冬眠疗法属于本书知识体系"},{from:"center-work",to:"concept-chest-pain-center",type:"influence",label:"包含",reason:"胸痛中心属于本书知识体系"},{from:"center-work",to:"drug-mannitol",type:"influence",label:"包含",reason:"甘露醇属于本书知识体系"},{from:"center-work",to:"drug-diazepam",type:"influence",label:"包含",reason:"地西泮属于本书知识体系"},{from:"center-work",to:"drug-nitroglycerin",type:"influence",label:"包含",reason:"硝酸甘油属于本书知识体系"},{from:"center-work",to:"disease-acute-coronary-syndrome",type:"influence",label:"包含",reason:"急性冠状动脉综合征属于本书知识体系"},{from:"center-work",to:"disease-aortic-dissection",type:"influence",label:"包含",reason:"主动脉夹层属于本书知识体系"},{from:"center-work",to:"disease-pulmonary-embolism",type:"influence",label:"包含",reason:"肺栓塞属于本书知识体系"},{from:"center-work",to:"disease-pneumothorax",type:"influence",label:"包含",reason:"气胸属于本书知识体系"},{from:"center-work",to:"concept-ecmo",type:"influence",label:"包含",reason:"体外膜氧合器属于本书知识体系"},{from:"center-work",to:"work-2",type:"influence",label:"包含",reason:"临床急诊护理学 (天津: 天津科学技术出版社, 2009)属于本书知识体系"},{from:"center-work",to:"work-3",type:"influence",label:"包含",reason:"急危重症护理学 (2版, 北京: 人民卫生出版社, 2009)属于本书知识体系"},{from:"center-work",to:"work-4",type:"influence",label:"包含",reason:"急危重症护理学 (2版, 北京: 人民卫生出版社, 2013)属于本书知识体系"},{from:"center-work",to:"work-5",type:"influence",label:"包含",reason:"急危重症护理 (北京: 北京出版社, 2011)属于本书知识体系"},{from:"center-work",to:"work-6",type:"influence",label:"包含",reason:"急危重症护理学 (2版, 西安: 第四军医大学出版社, 2011)属于本书知识体系"},{from:"center-work",to:"work-7",type:"influence",label:"包含",reason:"急危重症护理学 (3版, 上海: 同济大学出版社, 2019)属于本书知识体系"},{from:"center-work",to:"work-8",type:"influence",label:"包含",reason:"危重症监护 (北京: 人民卫生出版社, 2012)属于本书知识体系"},{from:"center-work",to:"work-9",type:"influence",label:"包含",reason:"急危重症护理学 (3版, 北京: 人民卫生出版社, 2014)属于本书知识体系"},{from:"center-work",to:"work-10",type:"influence",label:"包含",reason:"急危重症护理学 (4版, 北京: 人民卫生出版社, 2017)属于本书知识体系"},{from:"center-work",to:"work-11",type:"influence",label:"包含",reason:"急危重症护理学 (4版, 北京: 人民卫生出版社, 2018)属于本书知识体系"},{from:"center-work",to:"work-12",type:"influence",label:"包含",reason:"中国1996—2015年城市院前急救反应时间分析属于本书知识体系"},{from:"center-work",to:"work-13",type:"influence",label:"包含",reason:"《重症监护病房医院感染预防与控制规范》解读属于本书知识体系"},{from:"center-work",to:"work-14",type:"influence",label:"包含",reason:"《2019美国心脏协会心肺复苏与心血管急救指南: 高级心血管生命支持重点更新》解读属于本书知识体系"},{from:"center-work",to:"work-15",type:"influence",label:"包含",reason:"《2020年美国心脏协会心肺复苏及心血管急救指南》十大亮点属于本书知识体系"},{from:"center-work",to:"work-17",type:"influence",label:"包含",reason:"中华医学百科全书(临床医学·急诊医学)属于本书知识体系"},{from:"center-work",to:"work-18",type:"influence",label:"包含",reason:"国家突发公共事件医疗卫生救援应急预案属于本书知识体系"},{from:"center-work",to:"person-10",type:"influence",label:"包含",reason:"景军属于本书知识体系"},{from:"center-work",to:"person-11",type:"influence",label:"包含",reason:"王力红属于本书知识体系"},{from:"center-work",to:"person-12",type:"influence",label:"包含",reason:"赵霞属于本书知识体系"},{from:"center-work",to:"person-13",type:"influence",label:"包含",reason:"张京利属于本书知识体系"},{from:"center-work",to:"person-14",type:"influence",label:"包含",reason:"李艳兵属于本书知识体系"},{from:"center-work",to:"person-15",type:"influence",label:"包含",reason:"张建军属于本书知识体系"},{from:"center-work",to:"person-16",type:"influence",label:"包含",reason:"何亚荣属于本书知识体系"},{from:"center-work",to:"person-17",type:"influence",label:"包含",reason:"郑玥属于本书知识体系"},{from:"center-work",to:"person-18",type:"influence",label:"包含",reason:"周法庭属于本书知识体系"},{from:"center-work",to:"person-19",type:"influence",label:"包含",reason:"于学忠属于本书知识体系"},{from:"center-work",to:"person-20",type:"influence",label:"包含",reason:"周荣斌属于本书知识体系"},{from:"center-work",to:"person-21",type:"influence",label:"包含",reason:"中华人民共和国中央人民政府属于本书知识体系"},{from:"center-work",to:"location-1",type:"influence",label:"包含",reason:"北京属于本书知识体系"},{from:"center-work",to:"location-2",type:"influence",label:"包含",reason:"西安属于本书知识体系"},{from:"center-work",to:"location-3",type:"influence",label:"包含",reason:"天津属于本书知识体系"},{from:"center-work",to:"location-4",type:"influence",label:"包含",reason:"上海属于本书知识体系"},{from:"center-work",to:"location-5",type:"influence",label:"包含",reason:"中国属于本书知识体系"}]},hf=Object.freeze(Object.defineProperty({__proto__:null,knowledgeMapData:Ku},Symbol.toStringTag,{value:"Module"})),Ju=[],gf=Object.freeze(Object.defineProperty({__proto__:null,videoList:Ju},Symbol.toStringTag,{value:"Module"})),Ms={bookMeta:{title:"急危重症护理学",authors:[],publisher:""},modules:[{id:"module1",title:"前言",summary:"本模块阐述教材编写理念与学习指南。核心论点：明确学习目标与路径。关键要点：强调问题导向；概述章节逻辑；推荐主动学习。例子：用城市规划案例串联知识点。未涉及：具体学科知识细节。",tasks:[{id:"module1-task1",title:"前言",order:1,rawContent:`教材是教学活动的基础和保障,是教学中不可或缺的一环。党的二十大报告提出要加强教材建设和管理,将教材建设作为深化教育领域综合改革的重要环节。这一系列重要部署既凸显了教材工作在党和国家教育事业发展全局中的重要地位,也为新时代教材建设和管理提供了根本遵循。

护理工作是医疗卫生事业的重要组成部分,与人民群众的健康和生命安全密切相关,也直接影响着临床医疗服务的质量。急危重症护理学是一门研究各类急性病、急性创伤、慢性病急性发作及危重患者抢救与护理的综合性应用学科。对急危重症患者的抢救、病情监测能力已成为临床护理人员的核心岗位胜任力。急危重症护理学是护理专业的专业核心课程之一。

本教材紧紧围绕护理专业人才培养目标，充分体现护理多元化的发展趋势。教材内容与时俱进，紧贴急救和危重症护理工作临床实践，在重视“三基”（基本理论、基本知识、基本技能）的同时，融入了对学习者专业认同感及职业素养的培养，突出体现“以人为本”的护理理念。本教材在编写时以典型案例导入并提出问题，通过情景引入学习；与传统教材相比，增加与课程相关的临床新观点、新技术，从而保证了教材内容的新颖性，使教材能更好地反映急救护理专业的前沿知识和护理学科发展的新动向。此外，根据学习内容增设“微课”“思维导图”“知识链接”和“素质拓展”等模块，从而构建知识、技能、态度三位一体的教科书模式。

本教材在体系设计和内容安排上,在考虑了读者的基本情况及要求的同时,兼顾了急危重症护理学的专业性和应用性。本教材既可供高职高专护理、助产、ICU专业学生使用,也可作为护理专业教师、临床医务工作者及社会学习者的参考书。

本教材在编写过程中参考了多位专家学者的相关文献,在编写、审定和出版过程中得到了各参编单位和出版社的支持和帮助,在此一并表示谢意!由于编者水平有限,疏漏和不当之处在所难免,恳请同行及广大读者批评指正。

主编

2024年9月`,rawHtml:`<p>教材是教学活动的基础和保障,是教学中不可或缺的一环。党的二十大报告提出要加强教材建设和管理,将教材建设作为深化教育领域综合改革的重要环节。这一系列重要部署既凸显了教材工作在党和国家教育事业发展全局中的重要地位,也为新时代教材建设和管理提供了根本遵循。</p>\r
<p>护理工作是医疗卫生事业的重要组成部分,与人民群众的健康和生命安全密切相关,也直接影响着临床医疗服务的质量。急危重症护理学是一门研究各类急性病、急性创伤、慢性病急性发作及危重患者抢救与护理的综合性应用学科。对急危重症患者的抢救、病情监测能力已成为临床护理人员的核心岗位胜任力。急危重症护理学是护理专业的专业核心课程之一。</p>\r
<p>本教材紧紧围绕护理专业人才培养目标，充分体现护理多元化的发展趋势。教材内容与时俱进，紧贴急救和危重症护理工作临床实践，在重视“三基”（基本理论、基本知识、基本技能）的同时，融入了对学习者专业认同感及职业素养的培养，突出体现“以人为本”的护理理念。本教材在编写时以典型案例导入并提出问题，通过情景引入学习；与传统教材相比，增加与课程相关的临床新观点、新技术，从而保证了教材内容的新颖性，使教材能更好地反映急救护理专业的前沿知识和护理学科发展的新动向。此外，根据学习内容增设“微课”“思维导图”“知识链接”和“素质拓展”等模块，从而构建知识、技能、态度三位一体的教科书模式。</p>\r
<p>本教材在体系设计和内容安排上,在考虑了读者的基本情况及要求的同时,兼顾了急危重症护理学的专业性和应用性。本教材既可供高职高专护理、助产、ICU专业学生使用,也可作为护理专业教师、临床医务工作者及社会学习者的参考书。</p>\r
<p>本教材在编写过程中参考了多位专家学者的相关文献,在编写、审定和出版过程中得到了各参编单位和出版社的支持和帮助,在此一并表示谢意!由于编者水平有限,疏漏和不当之处在所难免,恳请同行及广大读者批评指正。</p>\r
<p>主编</p>\r
<p>2024年9月</p>\r
`}]},{id:"module2",title:"第一章 急危重症护理学基础知识",summary:"急危重症护理学概述了从院前到重症监护的全流程护理体系，核心要点包括急救医疗服务体系、院前急救与急诊科救护流程，例如院前心肺复苏，未涉及具体技术操作细节。",tasks:[{id:"module2-task1",title:"第一节 急危重症护理学概况",order:1,rawContent:"本书由 JSON 教材数据自动转换生成。",rawHtml:`<p>学习目标</p>\r
<p>素质目标:具备认真、科学、严谨、求实的态度及高度的责任心,培养紧密协作的团队精神,树立“敬佑生命、救死扶伤、甘于奉献、大爱无疆”的急救理念。</p>\r
<p>知识目标: 掌握急救医疗服务体系、院前急救、急救绿色通道、ICU 的概念; 掌握院前急救的任务、原则和基本程序; 掌握急诊科的护理工作、病情分级及急诊处理; 掌握 ICU 的护理工作程序、ICU 的监护内容、分级护理。熟悉院前急救的特点、设置和模式; 熟悉急诊科的任务和布局; 熟悉 ICU 感染的预防与控制。了解急救医疗服务体系管理机制、我国院前急救的设置与模
式、急诊科的护理管理制度, 以及 ICU 的设置与管理。</p>\r
<p>能力目标:能够根据院前急救工作程序开展急救工作,具备急诊分诊的能力;能够运用急救知识和技能,对院前急救患者迅速展开评估和实施急救;能够按照接诊、监护和转出流程完成 ICU 的常规工作。</p>\r
<p>案例导学</p>\r
<p>新学期伊始，某医学院校大二学生李丽和王红领到了本学期的教材。李丽拿着《急危重症护理学》叹了口气说：“急危重症？我以后不准备去急诊科，学这门课程有啥用？”王红却说：“不一定是只有去急诊科、重症医学科才需要学的吧？”</p>\r
<p>请思考：</p>\r
<p>1. 你同意谁的观点？为什么要学习急危重症护理学这门课呢？</p>\r
<p>2. 急诊科护士的职能和具体工作有哪些？</p>\r
<p>急危重症护理学是以挽救患者生命、提高抢救成功率、促进患者康复、降低伤残率、提高生命质量为目的，以现代医学和护理学理论为基础，研究急危重症患者抢救、护理和科学管理的一门综合性应用性学科。</p>\r
<p>急危重症护理学既是护理学的重要组成部分,也是急诊医学和重症医学的重要组成部分。急危重症部分。随着社会经济的高速发展,疾病谱的变化,各种自然灾害和突发公共卫生事件多。护理学概况发,急危重症护理工作的重要性日益凸显。急危重症护理专业发展迅速,日趋完善,并在社会医疗保健工作中发挥着越来越重要的作用。</p>\r
<p>一、急危重症护理学的发展背景</p>\r
<p>急危重症护理学始于19世纪南丁格尔时代。1854—1856年克里米亚战争期间，前线战伤的英国士兵死亡率高达42%，南丁格尔率领38名护士前往战地实施救护，使死亡率下降到2%，这充分说明了急危重症护理工作在救治伤病员中的重要作用。在救护过程中，南丁格尔还首次提出应在医院手术室旁设立术后患者恢复病房。</p>\r
<p>20 世纪 50 年代初期,急危重症护理真正得到发展。当时北欧发生了脊髓灰质炎大流行,许多患者因呼吸肌麻痹而出现呼吸衰竭,将患者集中辅以“铁肺”治疗,取得了良好的效果,这是世界上最早的用于监护呼吸衰竭患者的“监护病房”。20 世纪 60 年代,急危重症护理工作进入了有抢救设备的新阶段。各种监护和急救设备(如心电示波装置、电除颤器、人工呼吸机、血液透析机)相继应用于临床,使急救护理学的理论与技术得到相应发展。60 年代后期,现代监护仪器设备的集中使用,促进了重症监护病房(intensive care unit,ICU)的建立。20 世纪 70 年代,急危重症护理学得到进一步发展。1972 年,美国医学会正式承认急诊医学为一门独立的学科。1973 年,美国正式颁布了急救医疗服务体系(emergency medical service system,EMSS)法案。1975 年,国际红十字会在联邦德国召开了急救医疗会议,提出了急救事业国际化、国际互助和标准化的方针,要求急救车装备必要的仪器,国际上统一紧急呼救电话号码及交流急救经验等。1979 年,国际上正式承认急诊医学为医学科学中的第 23 个专业学科。到 20 世纪 90 年代,急救医疗服务体系迅速发展,涵盖了院前急救、急诊科救治、危重病救治、灾害医学等多项内容,急诊医学和危重病医学展现出广阔的发展前景。急危重症护理学也成为护理学中的一门重要学科。</p>\r
<p>知识链接</p>\r
<p>国务院学位委员会批准护理学为一级学科</p>\r
<p>2011年2月，国务院学位委员会新修订学科目录，护理学获准为一级学科，新的学科代码为1011。长期以来，护理学一直作为临床医学一级学科下的二级学科发展，在生物医学模式及国内护理教育体系不健全的背景下，这种模式在一定时期内推动了护理学科的进步，但随着社会的发展以及护理实践内容的不断扩大，护理学科的内涵也不断扩展，护理学作为临床医学二级学科的现状已对我国护理学科发展特别是高等护理教育的发展（如学生培养定位、学位授予和培养类型确定等）造成限制。从英、美、德、澳等发达国家经验看，护理的发展需要成为医学门类下的一级学科。经过全国护理同仁的不懈努力，护理学终于被列入国务院学位办新修订学科目录。</p>\r
<p>我国急危重症护理事业经历了从简单到逐步完善并形成新学科的发展过程。我国急危重症护理实践早期，急诊只是医院门诊的一个部门。20世纪50年代，我国各医院普遍将危重症患者集中在靠近护士站的危重病房或抢救室，便于护士密切观察与护理。1980—1983年，卫生部先后颁发了“加强城市急救工作”“城市医院急诊科(室)建立方案”等文件后，北京、上海等地相继成立了急诊室、急诊科和急救中心。20世纪80年代，国内相继成立专科或综合监护病房。1983年，急诊医学被卫生部和教育部正式确认为独立学科。1986年
，“中华医学会急诊分会”正式成立，同年颁布了《中华人民共和国急救医疗法》，设立全国统一的急救电话号码“120”，从此我国的急危重症医疗、急危重症护理工作有法可依，步入正轨。教育部将急危重症护理学确立为护理学科的必修课程，中华护理学会及护理教育中心积极开展专科培训及学术活动，为急危重症及重症监护护理工作培养了一大批急需人才。</p>\r
<p>近年来,我国急危重症护理学发展迅速,以急救中心和急救站为主体的急救网络逐步形成,一些城市实现了海、陆、空立体救援新模式,全民急救意识普遍提高,社区医疗服务出现,使得急危重症护理学的内容和范畴不断扩展,急危重症护理学在急救医疗服务体系中已显示出举足轻重的地位和作用。</p>\r

<p>素质拓展</p>\r
<p>中国“南丁格尔奖”第一人——王琇瑛</p>\r
<p>王琇瑛就读于北京协和医学院护士学校，获得美国哥伦比亚大学护理系理学硕士学位，创办北京市第三护士学校并兼任校长，任职北京市第二医学院护理系主任。抗美援朝期间，她亲率第一支护士教学队奔赴沈阳后方医院，克服重重困难，累计培训50余名护士长，并赴鸭绿江边实地考察战场救护工作，为前方志愿军战场救治护理工作做出了卓越贡献。“患者无医，将陷于无望；患者无护，将陷于无助。”王琇瑛用一生的行动诠释了她对护理工作的热爱，她不仅自己身体力行，不让患者陷入无助的境地，而且还激励着医护人员勤奋工作，为振兴我国护理事业奉献了毕生努力。</p>\r
<p>王琇瑛作为中国“南丁格尔奖”首位获得者，从事护理工作50余年，一直奉行医护人员救死扶伤的职业使命，是推动医护事业发展的先驱，是“生命卫士”的杰出代表。</p>\r
<p>二、急危重症护理学的范畴</p>\r
<p>随着急危重症医学的发展,急危重症护理学的范畴不断扩大,内容更加丰富。</p>\r
<p>(一)院前急救</p>\r
<p>院前急救是指急危重症患者到达医院之前的医疗救护，主要包括现场评估与呼救、伤病员检伤分类、现场救护，以及伤员搬运与转运等环节。院前急救是EMSS的第一个环节，也是急危重症救治的关键环节，及时有效的院前急救对维护伤患的生命、防止再损伤、减轻伤患的痛苦、为进一步诊治创造条件、提高抢救成功率、减少病残率均具有极其重要的意义，因此，院前急救工作的开展需要得到政府和社会各界的重视与支持以及全民的参与，以做好急救知识和初步急救技能的普及工作，提高民众的自救和互救能力。在救护车赶到前，现场的第一目击者如能先给患者实施必要的初步的急救措施，就能缩短救治时间，改善伤患预后。</p>\r
<p>(二)急诊科救护</p>\r
<p>急诊科是医院医疗和护理工作的前哨，也是院前救护的延续，承担着急症患者急诊接诊、急危重症患者抢救、突发公共卫生事件救援等多项工作。急诊科工作质量的优劣直接关系到伤患的生命安危，可反映一所医院管理和医疗技术水平的高低。因此，急诊科应配备医术精湛的医务人员、完善的急救仪器设备和畅通无阻的绿色通道，能够对各类危重患者进行有效的抢救和必要的监护。</p>\r
<p>(三)重症监护</p>\r
<p>重症监护是指专业医护人员对因各种原因导致一个或多个器官功能障碍、危及生命或具有潜在高危因素的患者，提供全面连续动态的监护与治疗。目的是通过精密的医疗设备和医疗技术维持、改善或逆转患者的器官功能，挽救患者生命，降低致残率和死亡率。</p>\r
<p>(四) 灾难救援</p>\r
<p>灾难救援是指对自然灾害和人为灾难所造成的人员伤害提供迅速有效的紧急救护与援助。它以“挽救生命、减轻伤残”为目的，通过动员社会各界的力量，统筹合理安排人力、物力、财力，实施科学合理的医学救援措施，力求将突发事件对人类健康的损害程度控制在最低水平。</p>\r
<p>(五)急危重症护理人才培训和科研工作</p>\r
<p>随着急危重症医学的快速发展、各类先进医疗技术在临床工作中的广泛应用，护士在急危重症团队中起着至关重要的作用。急危重症护理岗位要求护士必须具备更高的专业素质、更扎实的理论基础和更精准的技术技能，因此，急危重症护理人员需要不断加强专业学习、培训。相关部门应根据急危重症医学的发展,及时调整并完善相应的急危重症护理人才培养方案及内容,明确人才培养目标,制订专科护士准入标准,完善急危重症护理相关培训课程体系,有计
划地组织和举办急危重症护理知识讲座与培训,加强急危重症护理科学研究及信息交流,促使急危重症护理学的教学、科研与实践紧密结合,以提高急危重症护理人员的专业技术水平。</p>\r
<p>目标检测</p>\r
<p>1. 下列不属于急危重症护理学目的的是( )。</p>\r
<p>A. 挽救患者生命</p>\r
<p>B. 加速患者康复</p>\r
<p>C. 减少伤残率</p>\r
<p>D. 提高患者生命质量</p>\r
<p>E. 提高抢救成功率</p>\r
<p>2. 国际上正式承认急危重症医学为一门独立学科是在( )。</p>\r
<p>A. 1972 年 B. 1973 年 C. 1979 年</p>\r
<p>D. 1986 年 E. 1983 年</p>\r
<p>3. 急危重症护理工作进入了有抢救设备的新阶段是在( )。</p>\r
<p>A. 20 世纪 40 年代 B. 20 世纪 50 年代 C. 20 世纪 60 年代</p>\r
<p>D. 20 世纪 70 年代 E. 20 世纪 80 年代</p>\r
<p>4. 急危重症护理学始于( )。</p>\r
<p>A. 19 世纪 50 年代 B. 19 世纪 60 年代 C. 19 世纪 70 年代</p>\r
<p>D. 19 世纪 80 年代 E. 20 世纪 50 年代</p>\r
<p>5. 急危重症护理学的范畴包括( )。</p>\r
<p>A. 院前急救</p>\r
<p>B. 急诊科救护</p>\r
<p>C. 重症监护</p>\r
<p>D. 灾难救援</p>\r
<p>E. 以上均正确</p>\r
<p>(王春美 黄全华 张继娜)</p>\r
`},{id:"module2-task2",title:"第二节 急救医疗服务体系",order:2,rawContent:`案例导学

2024 年 7 月 12 日, 张某到实习医院报到, 被分到急诊科。在熟悉医院环境时他发现这家实习医院属于该市第 15 号急救站。

请思考：

1. 为什么要给医院急诊科进行编号？

2. 是否不同医院的急诊科都有不同的编号呢？

急救医疗服务体系是集院前急救、院内急诊科救护、重症监护室救治和各专科治疗的“生命绿色通道”为一体的急救网络，即院前急救负责现场急救和途中救护，医院急诊科和ICU负责院内救护。它们既有各自独立的工作职责和任务，又相互紧密联系，构成一个科学、高效、严密的组织和统一指挥的急救网络。一个完整的EMSS应包括完善的通信指挥系统、现场急救组织、有监护和急救装置的运输工具、高水平的医院内急救服务机构和重症监护室。

考点提示:急救医疗服务体系的概念。

EMSS 在概念上强调急诊的即刻性、连续性、层次性和系统性，既适用于日常急诊医疗工作，又适用于大型灾害或意外事故（如地震、水灾、火灾、重大交通事故、楼房倒塌、爆炸等）造成的群体伤员的紧急医疗救治。首先，在事故现场或发病之初对伤病员进行初步急救，即人群自救互救；随后，由携带抢救设备的急救人员和救护组来到现场参加救护，即现场急救；然后，用配备急救装置的运输工具快速安全地将患者转运至医院急诊科，使其接受进一步抢救和治疗，即医院急救；待其生命体征稳定后再转运至重症或专科监护室，接受进一步支持治疗。

近年来，EMSS 在国内外迅速发展，受到各级卫生机构和患者的关注。EMSS 的主要目标是建立一个组织结构严密、行动迅速并能实施有效救治的医疗组织来提供快速、合理、及时的处理，将患者安全地转送到医院，使其在医院内得到进一步有效的救治。各国政府机构也逐渐认识到发展 EMSS 的迫切性和重要性，发达国家尤其重视发展和完善 EMSS。法国是最早组建 EMSS 的国家，美国、日本、德国等国家都先后完善了本国的 EMSS。1968 年美国麻省理工学院提议建立“急症医疗系”，1970 年日本规定急救车标准，1973 年美国总统颁布了 EMSS 法案，1980 年德国运用直升机运送伤病员等。目前，急救医疗服务已向国际化、全球化方向发展。国际 SOS 救援中心现已在多个国家及地区设有办事机构和急救中心，其专业的工作方式、应对突发事件的快速反应能力、全球网络化的密切配合等优
势对 EMSS 发挥了重要的支持作用。全球性的医疗服务网络已经形成。

我国 EMSS 起源于抗日战争和解放战争时对伤员的战地初级救护和快速转运。20 世纪 50 年代，我国部分大、中城市成立了院前急救的专业机构，即“救护站”，其功能只是简单的初级救护和单纯转运患者。1980 年 10 月，卫生部颁发了中华人民共和国成立后第一个关于急救的文件——《关于加强城市急救工作的意见》。随后，我国的 EMSS 进入快速发展阶段，逐渐建立了日益完善的城乡急救组织。它是由院前急救中心（站）、医院急诊科、重症或专科监护室三部分有机联系起来的一个完整的现代化医疗机构。目前，我国二级以上的医院设有急诊科，地市级城市设有急救中心或急救站，综合性大医院都建立了 ICU，并配备一定的专业医护队伍。1995 年 4 月，卫生部发布了《灾害事故医疗救援工作管理办法》，有力地促进了我国 EMSS 的发展。我国急救医疗服务体系运行示意图见图 1-1。

图1-1 我国急救医疗服务体系运行示意图

\r
二、急救医疗服务体系的管理

1. 完善急救通信网络 建立健全灵敏的通信网络, 是提高急救应急能力的基础。运用指挥调度系统、对讲系统、急救视频记录系统、现场定位系统等，提升急救信息化水平，同时加强院前急救系统与院内急救系统的衔接。有条件的地区要积极开展航空医疗救护，探索完善航空医疗救护管理标准和服务规范，构建陆、空立体急救网络和空、地协同机制。

2. 改善急救运输工具 我国的院前急救已由单一的陆地急救模式逐步向水陆空三位一体、转运兼救治一体的立体化模式转变。目前急救运输工具以救护车为主。有条件的地区可根据需要购置或采取签订服务协议的方式配备水上、空中急救运载工具。空中医疗急救是应急体系的重要组成部分，空中医疗急救响应速度快、救护范围广、处置机动灵活，可以应对多种复杂环境，是提高救援效果最有效的手段。现阶段我国逐渐在沿海地区、边远地区、牧区以及有条件的城市，因地制宜，根据急救需要发展直升机、快艇等救援方式，并取得了良好成效。

3. 加强急救专业人员培训 使用统一并不断更新的适合我国急救工作实际情况的培训教材, 对急救专业人员进行理论知识和操作技能的培训。建立急救人员准入制度, 确保急救人员都经过专业培训并具备相应的业务水平。建立急救专业人员复训和考试制度, 促进急救专业人员的业务水平不断提高。EMSS 的管理人员需要具有医学资质, 并接受管理培训。

4. 普及社会急救 广泛利用各种宣传媒体,普及急救知识,使广大群众掌握现场急救知识和最基本的急救技术,如正确的电话呼救、徒手心肺复苏、骨折固定、止血包扎、搬运等简单的现场处理方法。一旦遇到危重患者或意外伤害事故时,在专业队伍尚未到达现场之前,群众能第一时间进行自救和互救。

5. 完善法律法规 目前我国的急救医疗规范、装备配备标准、急救人员培训、院前急救服务标准还不统一,因此需要完善相关卫生法律法规,稳定急救队伍,加快学科发展,提高服务质量。

知识链接

生命之星与我国院前医疗急救标识

生命之星(star of life)是急救医疗服务体系的国际标志。蛇杖是医学与健康的象征，6个方向分别代表EMSS的6个功能：发现、报告、反应、现场抢救、运输途中监护和转至院内救治。我国院前医疗急救系统的唯一视觉识别标识也是以“生命之星”为核心，又添加了中国元素，其中底部的长城作为中国象征性元素，寓意院前医疗急救体系守护生命的意志和能力，外围的橄榄枝则代表万物复苏，象征生命的希望和活力。标识以蓝色和黄色为主色，蓝色意味着宁静、祥和、严谨，表达了院前急救医疗对生命的呵护、尊重与敬业精神；黄色意味着希望、活力、向上，表达了院前急救医疗不断进取、积极向上的风貌，具有深刻的象征
意义(图1-2)。

\r
\r
图1-2 生命之星与我国院前医疗急救标识

\r
生命之星与我国院前医疗急救标识

目标检测

1. 急救医疗服务体系在概念上强调急诊的。

A. 即刻性、连续性、层次性和系统性

B. 紧急性、连续性、层次性和系统性

C. 即刻性、分段性、层次性和系统性

D. 即刻性、连续性、整体性和系统性

E. 即刻性、连续性、层次性和多学科性

2.急救医疗服务体系的主要作用为( )。

A. 及时有效的院前救治

B. 科学地管理急诊科工作, 组织急救技术培训

C. 对突发性的重大事故组织及时抢救

D. 战地救护

E. 以上都是

3.急救医疗服务体系不包括( )。

A.院前急救 B.急诊诊治 C.重症监护

D.门诊医疗 E.生命绿色通道

4. EMSS 的第一个环节是( )。

A. 院前急救 B. 院内急诊 C. 重症监护

D. 各专科的“生命绿色通道” E. 以上均不正确

5. 我国的 EMSS 进入快速发展阶段是在( )。

A. 20 世纪 50 年代 B. 20 世纪 60 年代 C. 20 世纪 70 年代

D. 20 世纪 80 年代 E. 20 世纪 90 年代

(黄全华 王春美 张继娜)`,rawHtml:`<p>案例导学</p>\r
<p>2024 年 7 月 12 日, 张某到实习医院报到, 被分到急诊科。在熟悉医院环境时他发现这家实习医院属于该市第 15 号急救站。</p>\r
<p>请思考：</p>\r
<p>1. 为什么要给医院急诊科进行编号？</p>\r
<p>2. 是否不同医院的急诊科都有不同的编号呢？</p>\r
<p>急救医疗服务体系是集院前急救、院内急诊科救护、重症监护室救治和各专科治疗的“生命绿色通道”为一体的急救网络，即院前急救负责现场急救和途中救护，医院急诊科和ICU负责院内救护。它们既有各自独立的工作职责和任务，又相互紧密联系，构成一个科学、高效、严密的组织和统一指挥的急救网络。一个完整的EMSS应包括完善的通信指挥系统、现场急救组织、有监护和急救装置的运输工具、高水平的医院内急救服务机构和重症监护室。</p>\r
<p>考点提示:急救医疗服务体系的概念。</p>\r
<p>EMSS 在概念上强调急诊的即刻性、连续性、层次性和系统性，既适用于日常急诊医疗工作，又适用于大型灾害或意外事故（如地震、水灾、火灾、重大交通事故、楼房倒塌、爆炸等）造成的群体伤员的紧急医疗救治。首先，在事故现场或发病之初对伤病员进行初步急救，即人群自救互救；随后，由携带抢救设备的急救人员和救护组来到现场参加救护，即现场急救；然后，用配备急救装置的运输工具快速安全地将患者转运至医院急诊科，使其接受进一步抢救和治疗，即医院急救；待其生命体征稳定后再转运至重症或专科监护室，接受进一步支持治疗。</p>\r
<p>近年来，EMSS 在国内外迅速发展，受到各级卫生机构和患者的关注。EMSS 的主要目标是建立一个组织结构严密、行动迅速并能实施有效救治的医疗组织来提供快速、合理、及时的处理，将患者安全地转送到医院，使其在医院内得到进一步有效的救治。各国政府机构也逐渐认识到发展 EMSS 的迫切性和重要性，发达国家尤其重视发展和完善 EMSS。法国是最早组建 EMSS 的国家，美国、日本、德国等国家都先后完善了本国的 EMSS。1968 年美国麻省理工学院提议建立“急症医疗系”，1970 年日本规定急救车标准，1973 年美国总统颁布了 EMSS 法案，1980 年德国运用直升机运送伤病员等。目前，急救医疗服务已向国际化、全球化方向发展。国际 SOS 救援中心现已在多个国家及地区设有办事机构和急救中心，其专业的工作方式、应对突发事件的快速反应能力、全球网络化的密切配合等优
势对 EMSS 发挥了重要的支持作用。全球性的医疗服务网络已经形成。</p>\r
<p>我国 EMSS 起源于抗日战争和解放战争时对伤员的战地初级救护和快速转运。20 世纪 50 年代，我国部分大、中城市成立了院前急救的专业机构，即“救护站”，其功能只是简单的初级救护和单纯转运患者。1980 年 10 月，卫生部颁发了中华人民共和国成立后第一个关于急救的文件——《关于加强城市急救工作的意见》。随后，我国的 EMSS 进入快速发展阶段，逐渐建立了日益完善的城乡急救组织。它是由院前急救中心（站）、医院急诊科、重症或专科监护室三部分有机联系起来的一个完整的现代化医疗机构。目前，我国二级以上的医院设有急诊科，地市级城市设有急救中心或急救站，综合性大医院都建立了 ICU，并配备一定的专业医护队伍。1995 年 4 月，卫生部发布了《灾害事故医疗救援工作管理办法》，有力地促进了我国 EMSS 的发展。我国急救医疗服务体系运行示意图见图 1-1。</p>\r
<p style="text-align: center;">图1-1 我国急救医疗服务体系运行示意图</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540003-1-l.jpg" /><figcaption></figcaption></figure>\r
<p>二、急救医疗服务体系的管理</p>\r
<p>1. 完善急救通信网络 建立健全灵敏的通信网络, 是提高急救应急能力的基础。运用指挥调度系统、对讲系统、急救视频记录系统、现场定位系统等，提升急救信息化水平，同时加强院前急救系统与院内急救系统的衔接。有条件的地区要积极开展航空医疗救护，探索完善航空医疗救护管理标准和服务规范，构建陆、空立体急救网络和空、地协同机制。</p>\r
<p>2. 改善急救运输工具 我国的院前急救已由单一的陆地急救模式逐步向水陆空三位一体、转运兼救治一体的立体化模式转变。目前急救运输工具以救护车为主。有条件的地区可根据需要购置或采取签订服务协议的方式配备水上、空中急救运载工具。空中医疗急救是应急体系的重要组成部分，空中医疗急救响应速度快、救护范围广、处置机动灵活，可以应对多种复杂环境，是提高救援效果最有效的手段。现阶段我国逐渐在沿海地区、边远地区、牧区以及有条件的城市，因地制宜，根据急救需要发展直升机、快艇等救援方式，并取得了良好成效。</p>\r
<p>3. 加强急救专业人员培训 使用统一并不断更新的适合我国急救工作实际情况的培训教材, 对急救专业人员进行理论知识和操作技能的培训。建立急救人员准入制度, 确保急救人员都经过专业培训并具备相应的业务水平。建立急救专业人员复训和考试制度, 促进急救专业人员的业务水平不断提高。EMSS 的管理人员需要具有医学资质, 并接受管理培训。</p>\r
<p>4. 普及社会急救 广泛利用各种宣传媒体,普及急救知识,使广大群众掌握现场急救知识和最基本的急救技术,如正确的电话呼救、徒手心肺复苏、骨折固定、止血包扎、搬运等简单的现场处理方法。一旦遇到危重患者或意外伤害事故时,在专业队伍尚未到达现场之前,群众能第一时间进行自救和互救。</p>\r
<p>5. 完善法律法规 目前我国的急救医疗规范、装备配备标准、急救人员培训、院前急救服务标准还不统一,因此需要完善相关卫生法律法规,稳定急救队伍,加快学科发展,提高服务质量。</p>\r
<p>知识链接</p>\r

<p>生命之星与我国院前医疗急救标识</p>\r
<p>生命之星(star of life)是急救医疗服务体系的国际标志。蛇杖是医学与健康的象征，6个方向分别代表EMSS的6个功能：发现、报告、反应、现场抢救、运输途中监护和转至院内救治。我国院前医疗急救系统的唯一视觉识别标识也是以“生命之星”为核心，又添加了中国元素，其中底部的长城作为中国象征性元素，寓意院前医疗急救体系守护生命的意志和能力，外围的橄榄枝则代表万物复苏，象征生命的希望和活力。标识以蓝色和黄色为主色，蓝色意味着宁静、祥和、严谨，表达了院前急救医疗对生命的呵护、尊重与敬业精神；黄色意味着希望、活力、向上，表达了院前急救医疗不断进取、积极向上的风貌，具有深刻的象征
意义(图1-2)。</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540003-3-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540003-4-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图1-2 生命之星与我国院前医疗急救标识</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540003-5-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">生命之星与我国院前医疗急救标识</p>\r
<p>目标检测</p>\r
<p>1. 急救医疗服务体系在概念上强调急诊的。</p>\r
<p>A. 即刻性、连续性、层次性和系统性</p>\r
<p>B. 紧急性、连续性、层次性和系统性</p>\r
<p>C. 即刻性、分段性、层次性和系统性</p>\r
<p>D. 即刻性、连续性、整体性和系统性</p>\r
<p>E. 即刻性、连续性、层次性和多学科性</p>\r
<p>2.急救医疗服务体系的主要作用为( )。</p>\r
<p>A. 及时有效的院前救治</p>\r
<p>B. 科学地管理急诊科工作, 组织急救技术培训</p>\r
<p>C. 对突发性的重大事故组织及时抢救</p>\r
<p>D. 战地救护</p>\r
<p>E. 以上都是</p>\r
<p>3.急救医疗服务体系不包括( )。</p>\r
<p>A.院前急救 B.急诊诊治 C.重症监护</p>\r
<p>D.门诊医疗 E.生命绿色通道</p>\r
<p>4. EMSS 的第一个环节是( )。</p>\r
<p>A. 院前急救 B. 院内急诊 C. 重症监护</p>\r
<p>D. 各专科的“生命绿色通道” E. 以上均不正确</p>\r
<p>5. 我国的 EMSS 进入快速发展阶段是在( )。</p>\r
<p>A. 20 世纪 50 年代 B. 20 世纪 60 年代 C. 20 世纪 70 年代</p>\r
<p>D. 20 世纪 80 年代 E. 20 世纪 90 年代</p>\r
<p>(黄全华 王春美 张继娜)</p>\r
`},{id:"module2-task3",title:"第三节 院前急救",order:3,rawContent:`案例导学

患者，男，57岁，以“树上跌下、全身多处肿痛7h”为主诉拨打急救电话求助。患者7h前从2m高的树上跌落，随即又从坡坎上滚下，患者当时昏迷约半小时，醒后即感全身疼痛难忍，不能站立行走，左小腿出血不止，立即拨打急救电话求救。

请思考：

1. 急救人员赶赴现场后应立即进行哪些方面的评估？

2. 现场救护中应遵循哪些原则？

一、概述

院前急救(prehospital care)也称院外急救,是指在医院之外的环境中对各种遭受危及生命的急症、创伤、中毒、灾难事故等伤病员进行的现场救护、转运及途中监护的总称,是从患者发病或受伤开始到进入医院之前这一阶段的紧急救护。院前急救是急诊医疗服务体系的重要环节,它对于维持患者生命、防止再损伤、减轻患者痛苦、提高抢救成功率及降低伤残率和死亡率有着极其重要的意义,同时也是衡量一个地区急救工作能力与水平的指标。

(一)院前急救的特点

院前急救的对象、环境、条件与医院急诊室的情况大不相同，由于院前急救具有社会性强、随机性强、时间紧迫、流动性大等特点，特别是现场救治条件差、病种复杂，因此现场指挥与应急处理十分

1. 社会性强 院前急救过程涉及社会
的各个方面,如公路上、马路边、工厂内或居民的家中,由于事件往往是突然发生,只有全民参与、及时救护,才能将伤害减少到最低程度。

2. 随机性强 院前急救的对象往往是预想不到的、突然发生各种危及生命情况的患者，有时是单人发病，有时是多人受伤，事发随机性强，令人措手不及。急救通常是在不同的地点和场所进行，这需要因地制宜、灵活机动地在现场寻找代用品，就地取材，为患者赢得抢救时间。因此，要求救护者保持各种物资与设备处于完好应急状态，确保抢救的实效性。

3. 时间紧迫 不管是危重还是急症患者,几乎都是急性或慢性病急性发作,要求急救人员迅速到达现场,紧急处理、不容迟缓。院前急救应充分体现“时间就是生命”,快速评估后立即行止血、建立静脉通路、给药等急救措施,随后根据病情立即转送至医院或就地监护和治疗。

4. 复杂性 院前急救的病种涉及面广、病情程度各异,有常见病急性发作,有伤残、自杀等突发性意外,常出现多种疾病症状或多种损伤并存的状况,这就要求救护者具有综合评估、判断和处理问题的能力,在确保患者安全的前提下迅速组织抢救,为后期治疗赢得时间。院前急救因无充足时间和良好条件做鉴别诊断,要做出明确的医疗诊断非常困难,只能以对症治疗为主。

5. 现场急救条件受限(艰难性) 现场急救条件受限的主要原因有病史不详、缺乏客观资料、非医疗环境中急救人员及设备仪器受限制、现场环境恶劣,如院前急救有时在患者家中,有时在灾害现场,有时在运送途中的车上,有时在狭窄的空间,光线暗淡、人员拥挤、嘈杂声大等,甚至事故现场的险情还未排除,可能会造成人员再损伤,给急救增加一定的难度。因此,救护者不仅要具备熟练的急救技术,而且要具备良好的心理素质和身体素质,才能很好地完成急救任务。

(二)院前急救的主要任务

1. 承担平时呼救患者的急救 是最主要和经常性的任务,要求救护者接到呼救信息后,救护车立即出动,医护人员随车前往。呼救患者约90%是急诊患者,需要救护者给予现场处理以减轻患者在运送过程中的痛苦和避免并发症的发生;此外,还有需要给予现场急救的、短时间内有生命危险的危重患者,需要救护车提供转运服务的慢性病患者。

2. 承担灾害或战争时对伤员的急救 灾害来临时,院前急救除了做好急救处理外,还要与现场的其他救灾系统(如消防、公安、交通等部门)密切配合,并要注意自身的安全。若遇特大灾害或因战争有大批伤员时,应结合实际情况执行有关抢救预案。无预案时须加强现场指挥、现场伤员分类和现场救护,应区别不同情况,做到合理分流、运送。

3. 承担特殊任务时的救护 特殊任务指当地的大型集会、重要会议、国际比赛、外国元首来访等。执行此项任务要求加强责任心，严防擅离职守。执行现场任务的应急救援人员应时刻处于备战状态，随时能够应对可能发生的各种意外伤害事件。

4. 承担通信网络中心的枢纽任务 院前急救的通信网络在整个急救过程中不但承担着急救信息的接收任务, 而且还承担着传递信息、指挥调度及与上级领导、救灾急救指挥中心、急救现场、急救车、医院急诊科的联络任务, 起着承上启下、信息沟通的枢纽作用。

5. 普及急救知识和技能 普及公民急救知识、增强应急能力是全社会共同的责任。急救知识的普及教育可提高急救的成功率，平时可通过媒体、电视、宣传栏等对公众普及急救知识，开展有关现场急救及心肺复苏的教育。实施院前急救时，患者家属和目击者对急救知识掌握及运用的程度直接关系到患者的后期抢救成功率。

(三)院前急救的原则

院前急救的主要目的是最大限度地降低死亡率,减少致残率,并减少伤病员的痛苦,为医院的抢救工作打好基础,故而应优先遵守“先救命后治病”的总原则,并遵守以下原则。

1. 先排险后救治 在进行救护前,先进行环境评估,保证伤病员脱离危险的环境,必要时排险后再实施救护。如对气体中毒者,先使其脱离危险环境,确保救护者和中毒者的安全,然后再急救。

2. 先复苏后治伤 遇有心跳、呼吸骤停并有其他损伤者,应先用口对口人工呼吸和胸外心脏按压等技术使心跳、呼吸恢复,再对其他伤情进行救治。

3. 先重伤后轻伤 有大批伤病员出现时,在有限的时间、人力、物力的状况下,应优先抢救危重者,后抢救较轻的伤病员。

4. 先止血后包扎 有大出血、创伤较大者，先用指压、止血带等方法止血，然后再对伤口进行消毒、包扎等处理。

5. 先救治后运送 对于重伤病员, 先进行紧急的救治, 最大可能地保证伤病员的生命体征在暂时稳定的前提下再进行转运。运送过程中不
可停止抢救措施, 继续观察病情变化, 注意保暖。

6. 急救与呼救并重 有大批伤病员时,要及时呼救,以便尽快得到外援;在意外事故现场指挥部的统一领导下,有计划、有步骤、有组织地进行抢救、分类、转运伤员等工作。

考点提示:院前急救的特点、主要任务及原则。

二、院前急救的设置与模式

(一)院前急救服务系统的设置

1. 院前急救服务系统设置原则 见表 1-1。

表 1-1 院前急救服务系统设置原则

\r
2. 急救半径与反应时间要求 急救半径是指急救单元所执行院前急救服务区域的半径, 城市建成区急救半径应 ⩽5km 。急救反应时间是急救中心接到电话至急救车到达现场所需时间, 市区要求在 15min 以内, 条件好的区域要在 10min 以内, 郊区要求在 30min 以内。急救反应时间越短, 对抢救患者越有利。

3. 院前急救组织的必备条件

(1)通信指挥系统:是院前急救中心受理院前急危重症患者呼救、应对灾害事件的重要工具,是EMSS 实现统一指挥、调度、协调功能以及提高应急反应能力的基础。随着“互联网 +”、大数据、移动通信技术等的快速发展，通信指挥系统具备了救护车定位追踪、呼叫号码和位置显示、计算机辅助指挥、移动数据传输等诸多信息化、智慧化功能，使院前急救更加快捷、高效、精准。

(2) 运输工具: 随着我国汽车、火车、轮船、飞机等交通工具的数量、种类、性能逐步提升, 我国的院前急救已由单一的陆地急救模式逐步向水陆空三位一体、转运兼救治一体的立体化模式转变。实施院前急救的运输工具分为陆地、航空及水上救护工具三类。救护车是目前我国最为常用的院前急救专用运输工具。

(3)急救医疗队伍:是实施院前急救措施、提升院前急救质量的关键力量。我国的院前急救人员主要包括医生、护士、担架员、驾驶员等。根据院前急救模式和救护工具的不同,各地院前急救医疗队伍的组成有一定的差异。由于院前急救患者具有病情复杂、情况紧急、意外情况多变等特点,因此要求急救人员熟练掌握基本急救技术,在执行急救任务时,能凭借过硬的急救业务能力,迅速投入到紧急救援状态,对患者实施及时有效的救治。

(二)院前急救的模式

1. 英美模式 英美模式突出“急”字，强调以医院急诊为中心，主张伤病员的院前快速转运。救护车一般只配备救护者和简单的器械、药品。救护车平时就在街道上行驶，救护者负责出诊，一旦接到呼救，立即直接奔赴现场，进行现场简单的医疗处置后将伤病员迅速转送至医院，即强调在最短的时间内将伤病员送至医院。该模式采用统一的应急电话号码，集消防、警察和医疗急救为一体。采用这种院前急救工作模式的国家主要有美国、英国、澳大利亚等。

2. 欧洲模式 欧洲模式突出“救”字，强调伤病员的院前救治，救护车上一般配有经验丰富的医生和齐全的检查工具、救护设备及药品，类似一个移动的ICU。救护者现场给予危重伤病员有效的救治，待其生命体征平稳后，再直接转入有能力救治的相关医院，即强调在最短的时间里把“医院”送到伤病员的身边。该急救系统模式一般有专用的医疗急救电话号码。法国和俄罗斯等欧洲国家采用这种急救工作模式。此外，法国紧急医疗救助体系(SAMU)对消防部门等救助机构具有调度指挥和协同的权力，私人救护车公司、红十字协会、公民保护协会、家庭医生等也是法国院前急救系统的辅助组成部分。

3. 中国模式 我国院前急救模式总体上位于美英模式和欧洲模式之间,救护者是具有执业资格的医护人员,但现场救治深度又不及欧洲模式,因此各地区在原有医疗体系的基础上,早期形成了各具特色的院前急救模式,其中具有代表性的有独立型、依托型、行政型和院前型四种(表1-2)。目前我国各个城
市院前急救模式互相学习和借鉴,处于逐步完善和成熟阶段。

表 1-2 我国主要的院前急救模式

\r
考点提示:我国主要的院前急救模式。

三、院前急救的基本程序

院前急救工作的核心是现场急救，现场急救的目的是保护生命，防止病情恶化或再损伤。现场急救的护理原则是立即让患者脱离危险，先救命后治病，争分夺秒，就地取材，保留标本及离断组织。其护理工作内容包括现场评估与呼救、现场救护、转送护理三个方面。

(一)现场评估与呼救

1. 快速评估现场环境 现场评估时要注意以下几点。

(1) 检查现场: 包括现场的安全、引起的原因、受伤人数等, 以及救护者自身、伤员及旁观者是否身处险境, 伤员是否仍有生命危险。

(2) 安全保护: 在进行现场救护时, 可能存在潜在环境危险和疾病传播等风险, 会对救

护者造成伤害,所以,应首先确保救护者自身安全。如对触电者现场救护,必须切断电源后采取救护措施以保障自身安全。

(3)个人防护:是指为了保护突发公共事件处置现场工作人员免受化学、生物与放射性污染危害而采取的措施,以防范现场环境中有害物质对人体健康的影响。当突发公共事件被确认为有毒污染、辐射、传染病或疑似传染病时,采取有效措施切实做到个人的隔离防护工作至关重要,也是控制疾病传播与继续发生的关键。

2. 快速评估病情 快速评估危重病情,主要是对意识、气道、呼吸、脉搏等方面的评估,具体内容如下。

(1) 意识: 对意识状态的评估, 应根据患者的语言反应了解其思维、情感活动、定向力等, 必要时观察瞳孔对光反应、角膜反射、对强刺激(如疼痛)反应、肢体活动等, 判断其有无意识障碍及其程度。

(2)气道:保持气道通畅是呼吸的必要条件,急救现场一定要分清呼吸停止的原因,是因梗阻、阻塞、扭曲所致,还是因病情严重致呼吸功能丧失,要进行综合判断。如患者有反应但不能说话、咳嗽,出现呼吸困难,可能存在气道梗阻,必须立即检查原因并予以清除。现场急救对危重症患者保持呼吸道通畅的最佳体位是去枕平卧、头偏向一侧。

(3)呼吸:主要是监测呼吸的频率、深浅度和节律有无改变,有无呼吸困难、被动呼吸体位、发绀及“三凹征”。急救情况下重点是判断呼吸是否存在，其方法是将自己面颊部靠近患者口鼻处，“一听”有无呼吸音存在，“二看”有无胸廓起伏，“三感觉”有无气体逸出，判断时间为5～10s。若患者呼吸停止，立即畅通呼吸道，若有呼吸道梗阻应立即解除，必要时行人工呼吸。

(4) 脉搏: 大动脉搏动消失是判断心搏骤停的一个主要依据。急救现场首先判断有无脉搏, 其次判断脉搏是否正常。快速触摸颈动脉是判断有无脉搏的有效方法, 因颈动脉位置靠近心脏, 容易反映心搏的情况, 最简洁的方法是用示指和中指指腹触及患者气管正中部(男性相当于喉结的部位), 旁开两指, 至胸锁乳突肌前凹陷处。对婴幼儿触摸肱动脉, 若触摸不清或触不到搏动感, 表明有循环障碍或心搏骤停, 立即进行胸外心脏按压, 重建循环。如触不到桡动脉搏动, 提示收缩压降至 80mmHg 以下; 如触不到颈动脉搏动, 提示收缩压降至 70mmHg 以下。

3. 紧急呼救 是指在事故发生现场,经过现场评估和病情判断后需要立即救护,同时立即向专业急救机构拨打急救电话(常用的急救电话为“120”),然后急救机构立即派出专业救护者、救护车至现场抢救的过程。紧急呼救包括以下几点。

(1) 救护启动: 又称呼救系统开始。呼救系统的畅通, 在国际上被列为抢救危重症患者的“生存链”中的“第一环”。

(
2) 呼救电话须知: 使用呼救电话时必须要用最精练、准确、清楚的语言说明患者目前的情况及严重程度、患者人数及存在的危险。呼救电话应简要清晰说明以下几点: ① 救护者的(报告)电话号码与姓名, 患者姓名、性别、年龄和联系电话; ② 患者所在的确切地点, 尽量详细到附近街道的交汇处或其他显著标志; ③ 患者目前最危重的情况, 如晕倒、呼吸困难、大出血等; ④ 发生灾害事故、突发事件时, 说明伤害性质、严重程度、伤员人数; ⑤ 现场所采取的救护措施。

(二) 现场救护

1. 安置体位 急救现场正确的体位可以使伤病员舒适,减少再损伤。现场体位安置应注意以下几点。

(1) 正确的体位应保持稳定, 不要随意移动, 以免造成伤害。如不要搬动和摇动已确定有头部或颈部外伤者。若伤者伴有颈部外伤, 翻身时, 为防止颈椎再次损伤引起截瘫, 应采取轴线翻身法, 保持头、颈部与身体一致。

(2) 对无呼吸、心跳者，取仰卧位，并置于平地上，或在软垫上放一硬板，解开衣领、裤带，进行现场心肺复苏。

(3) 对神志不清但有呼吸及心跳者, 放置安全舒适的体位, 如平卧位、头偏向一侧或屈膝侧卧位, 此体位可以使患者放松, 并且可以保持呼吸道通畅, 防止发生误吸。

(4) 对清醒的伤病员, 根据受伤、病变的部位不同摆好正确的体位。如对腹痛者, 令其屈膝腹前, 以放松腹肌; 对咯血者, 嘱其取患侧卧位, 以防血流入健侧支气管和肺内。

(5)对头部外伤者,取水平仰卧位,头部稍抬高。

2. 检伤与分类 重大灾害现场,成批伤员出现时,可将伤员分为危重伤、中重伤、轻伤、致命伤,即Ⅰ、Ⅱ、Ⅲ、Ⅳ四类,分别按红、黄、绿、黑四色标注(表1-3)。

(1) 红色: 代表危重伤, 第一优先。伤员伤情非常紧急, 危及生命(即危及意识、呼吸、循环, 生命体征不稳定), 需立即给予基础生命支持, 并在 1h 内转运到医疗机构救治。如颈椎损伤、大出血、休克、心室颤动、50% ~ 60% 的Ⅱ度烧伤。

(2) 黄色: 代表中重伤, 第二优先。伤员存在生命体征稳定的严重损伤, 有潜在生命危险。此类伤员应急救后优先后送, 在 4~6h 内得到有效治疗。如不伴有呼吸困难的胸、腹部损伤。

(3) 绿色: 代表轻伤, 第三优先。伤员能行走, 损伤较小, 可能不需要立即入院治疗。如一般的挫伤、擦伤。

(4) 黑色: 代表致命伤。伤员意识丧失、颈动脉搏动消失、心跳及呼吸停止、瞳孔散大, 没有生还的可能性, 治疗为时已晚。

表 1-3 伤情分类

\r
3. 现场救护要点 现场救护原则是先复苏后治伤,先重伤后轻伤,先抢后救,尽快脱离事故现场,先分类后运送。一般先处理最危及患者生命的情况,不能因诊断不明而耽误有效的治疗。在医务人员有能力处理的范围内,优先处理病情危重、多发创伤者。救护要点主要包括以下几方面的内容。

(1) 维持呼吸系统功能: 包括吸氧、清除痰液及分泌物, 保持呼吸道通畅; 应用呼吸兴奋剂和扩张支气管药物; 对呼吸停止者要进行口对口人工呼吸, 或使用面罩 - 气囊通气、气管插管通气等; 对重度气胸的患者进行穿刺排气。

(2) 维持循环系统功能: 包括急性心肌梗死、心力衰竭、高血压危象、急性肺水肿和各类休克的处理; 严重心律失常的药物治疗; 心电监测, 电除颤仪和心脏起搏器的使用; 心搏骤停时进行心肺复苏等。

(3) 维持中枢神经系统功能: 包括对急性脑血管疾病、急性脑水肿及癫痫发作的急救护理。

(4) 对症救护措施, 如解痉、止痛、止吐、止喘等。

(5)颅脑
、脊柱等外伤的止血、包扎、固定及搬运。

(6)灾害、意外事故及各种创伤的现场救护。

考点提示:现场评估和现场救护的要点。

(三) 转送护理

首先根据伤情选择要转送的地点,通知对方做好迎接和抢救准备,同时根据伤情结合运送工具的特点做好搬运工作。

1. 把握转运时间 呼吸、心搏骤停者需立即就地实施心肺复苏术。重伤患者只要病情稳定、距送达医院较近、20～30min内即可到达的，可以缩短现场急救时间，或边转送边急救。伤情不稳定者、距送达医院较远、在30min内不能到达的，应先在现场积极救治，待伤情稳定后再考虑转运。按先重后轻的顺序快速、安全地转运，这样有利于现场人员的疏散，更有利于对中、重度患者进一步救治。

2. 通报病情与联络 转运前要通知相关部门做好转运途中的配合工作,如车辆来源、定点医院、急救人力和物资的准备,以及通知电梯等相关部门进行等候,以便在转运途中节省等候时间,确保患者在运送途中的安全。

3. 搬运 根据转运路途选择合适的转运工具。

(1) 担架法: 若伤员伤情严重且存在多发性骨折时, 在保持伤员体位不变的情况下, 将伤员抬上担架, 通常采取双人搬运法和四人搬运法。

1) 双人搬运法: 适用于病情较轻、无脊柱骨折者, 局部骨折已经固定但自己不能活动且体重较重的伤员。其方法是两名救护者站在伤员的同侧, 一名救护者一手臂托住伤员的头、颈、肩部, 另一手臂托住伤员的腰部, 另一名救护者一手臂托住伤员的臀部, 另一手臂托住伤员的腘窝处, 两人同时托起伤员，并使其身体向救护者倾斜，同时移步向平车，将其轻放于平车中央。

2) 四人搬运法: 适用于颈椎、腰椎骨折和病情较重者。其方法是两名救护者分别站于伤员的头端和脚端, 另两名救护者分别站于担架的一侧, 并将双手分别插入伤员的肩、胸、臀下, 使伤员身体保持在同一水平线上, 四人听统一口令, 将伤员一同抬起, 平移放在担架上。

(2) 上、下救护车法: 多数救护车上安置有轨道滑行装置, 将躺着患者的担架头端在前, 放入救护车内轨道上, 平行滑入车内。如救护车内无轨道, 救护者合力将担架抬起, 保持患者头部稍高位而抬入救护车内。下救护车时, 尽可能保持担架平稳。

(3) 特殊患者搬运: 动作要轻稳、协调。

1) 颅脑外伤: 搬运时应取侧卧位, 有利于呼吸道分泌物的排出, 从而保持呼吸道通畅。如有脑组织膨出, 用清洁敷料包扎后固定, 减少振动。如伴有颈椎损伤, 应用颈托固定, 如无颈托, 可用沙袋置于颈部两侧加以固定, 以免头部晃动。

2) 开放性气胸: 先就地取材将开放伤口包扎, 再用“座椅式”搬运法, 如使用折叠椅或靠背椅, 使患者保持坐位或半卧位。

3) 腹部损伤: 取仰卧位, 下肢屈曲, 以减轻腹壁压力, 防止器官突出。如果腹部伤口较大, 有腹腔内容物脱出时, 不应立即还纳, 以防污染腹腔, 可先用清洁敷料包裹, 固定后再搬运。

4) 休克: 取中凹卧位, 头部和下肢抬高, 用担架搬运。

4. 途中监护注意事项

(1) 运送途中要正确实施院外急救护理技术, 如输液、吸氧、吸痰、气管插管、气管切开、心肺复苏、深静脉穿刺等技术, 注意保持各种管道固定、畅通, 不因运送而有所影响。

(2) 运送途中要保持患者生命体征的相对稳定,用先进的监测、治疗手段加强生命维护,要随时观察、监测患者的呼吸、脉搏、血压、体温等生命体征,以及意识、面色变化、出血等情况。使用仪器(如心电监护仪)监护时,要确保仪器的完好并在通电状态下进行,一旦出现病情突变,首先检查患者情况,再检查仪器设备情况,采取必要的措施进行紧急救护。

(3) 运送特殊患者需要保持固定的体位, 防止再次损伤。若遇脊柱受伤者, 应保持脊柱轴线稳定, 将其身体固定在硬板担架上搬运, 观察生命体征变化, 预防并发症的发生。对已确定或疑有颈椎创伤者, 要尽可能用颈托保护, 运送时尽可能避免颠簸, 不摇动患者的身体。

(4) 做好抢救、观察、监护等有关医疗文件的记录, 将患者安全运送到指定的医院后, 要做好相互衔接与交接工作, 陪送人员应向医务人员详细交代病情及急救处理经过, 做好书面记录与口头交接, 保证全程救护效果。

考点提示: 安全转运患者与转运照护。

目标检测

1. 院前急救是指( )。

A. 专业救护者到来之前的抢救

B. 急危重症患者的现场救护

C. 急危重症伤病员进入医院前的医疗救护

D. 途中救护

E. 现场自救、互救

2. 院前急救护理程序为( )。

A. 现场救护、现场评估与呼救、转运与途中监护

B. 现场评估与呼救、现场救护、转运与途中监护

C. 现场评估与呼救、转运与途中监护、现场救护

D. 现场救护、转运与途中监护、现场评估与呼救

E. 转运与途中监护、现场评估与呼救、现场救护

3. 现场伤病员分类中重伤(一级急救)的标记颜色为( )。

A. 黄色 B. 红色 C. 白色

D. 绿色 E. 黑色

4. 关于我国院前急救主要的组织形式及特点,下列描述错误的是( )。

A. 独立型有独立的急救中心,独立地完成“院前—急诊科—急诊重症监护病房”急救服务

B. 依托型依托于一家综合医院完成急救任务

C. 行政型具有统一的城市急救通信指挥中心,由各医院分区出诊

D. 院前型以院前急救为主要任务,不设床位,出诊时随车人员为急救人员

E. 院前型有统一的指挥和调度,在派遣救护车辆时,更易于从患者角度考虑和解决问题

5. 患者, 男, 30 岁。车祸外伤骨折并在初步处理后准备转运, 突然出现下列病情, 应优先抢救的是( )。

A. 窒息

B. 昏迷

C. 骨折

D. 心律失常

E. 伤口出血

6. 患者, 男, 35 岁, 建筑工。在施工中不小心从高处坠落, 医务人员在现场对其全面体检时发现桡动脉触摸不清, 则说明收缩压( )。

A. <80mmHg B. <70mmHg C. <60mmHg

D. <50mmHg E. <40mmHg

7. 某患者户外活动时右下肢被毒蛇咬伤,周围没有其他人员且患者口腔黏膜有破损,患者自行拨打“120”求救电话。在医务人员赶来之前,患者正确的做法是( )。

A. 尽可能地抬高右下肢

B. 迅速奔跑,及早到医院

C. 自行吸吮伤口

D. 用布条在伤口近心端结扎,定时松开

E. 头低脚高仰卧于地面

(8 ~ 10 题共用题干)

游客李某和家人一起在外地旅游,游玩时突然晕倒在地,口腔内有大量分泌物,口唇发绀。

8. 家属应该首先判断的是( )。

A. 意识状态 B. 瞳孔大小 C. 体温

D. 脉搏强弱 E. 血压

9. 家属应拨打的求救号码是( )。

A. 119 B. 120 C. 999

D. 911 E. 110

10. 家属在现场首先要做的急救措施是( )。

A. 清理口腔里的分泌物

B. 检查有没有摔伤

C. 不做任何处理,等待救护者

D. 不需要将患者转移到安全的地方

E. 若患者肢体有抽搐,应强行按压

（黄全华 王春美 秦抗洪）`,rawHtml:`<p>案例导学</p>\r
<p>患者，男，57岁，以“树上跌下、全身多处肿痛7h”为主诉拨打急救电话求助。患者7h前从2m高的树上跌落，随即又从坡坎上滚下，患者当时昏迷约半小时，醒后即感全身疼痛难忍，不能站立行走，左小腿出血不止，立即拨打急救电话求救。</p>\r
<p>请思考：</p>\r
<p>1. 急救人员赶赴现场后应立即进行哪些方面的评估？</p>\r
<p>2. 现场救护中应遵循哪些原则？</p>\r
<p>一、概述</p>\r
<p>院前急救(prehospital care)也称院外急救,是指在医院之外的环境中对各种遭受危及生命的急症、创伤、中毒、灾难事故等伤病员进行的现场救护、转运及途中监护的总称,是从患者发病或受伤开始到进入医院之前这一阶段的紧急救护。院前急救是急诊医疗服务体系的重要环节,它对于维持患者生命、防止再损伤、减轻患者痛苦、提高抢救成功率及降低伤残率和死亡率有着极其重要的意义,同时也是衡量一个地区急救工作能力与水平的指标。</p>\r
<p>(一)院前急救的特点</p>\r
<p>院前急救的对象、环境、条件与医院急诊室的情况大不相同，由于院前急救具有社会性强、随机性强、时间紧迫、流动性大等特点，特别是现场救治条件差、病种复杂，因此现场指挥与应急处理十分</p>\r
<p>1. 社会性强 院前急救过程涉及社会
的各个方面,如公路上、马路边、工厂内或居民的家中,由于事件往往是突然发生,只有全民参与、及时救护,才能将伤害减少到最低程度。</p>\r
<p>2. 随机性强 院前急救的对象往往是预想不到的、突然发生各种危及生命情况的患者，有时是单人发病，有时是多人受伤，事发随机性强，令人措手不及。急救通常是在不同的地点和场所进行，这需要因地制宜、灵活机动地在现场寻找代用品，就地取材，为患者赢得抢救时间。因此，要求救护者保持各种物资与设备处于完好应急状态，确保抢救的实效性。</p>\r
<p>3. 时间紧迫 不管是危重还是急症患者,几乎都是急性或慢性病急性发作,要求急救人员迅速到达现场,紧急处理、不容迟缓。院前急救应充分体现“时间就是生命”,快速评估后立即行止血、建立静脉通路、给药等急救措施,随后根据病情立即转送至医院或就地监护和治疗。</p>\r
<p>4. 复杂性 院前急救的病种涉及面广、病情程度各异,有常见病急性发作,有伤残、自杀等突发性意外,常出现多种疾病症状或多种损伤并存的状况,这就要求救护者具有综合评估、判断和处理问题的能力,在确保患者安全的前提下迅速组织抢救,为后期治疗赢得时间。院前急救因无充足时间和良好条件做鉴别诊断,要做出明确的医疗诊断非常困难,只能以对症治疗为主。</p>\r
<p>5. 现场急救条件受限(艰难性) 现场急救条件受限的主要原因有病史不详、缺乏客观资料、非医疗环境中急救人员及设备仪器受限制、现场环境恶劣,如院前急救有时在患者家中,有时在灾害现场,有时在运送途中的车上,有时在狭窄的空间,光线暗淡、人员拥挤、嘈杂声大等,甚至事故现场的险情还未排除,可能会造成人员再损伤,给急救增加一定的难度。因此,救护者不仅要具备熟练的急救技术,而且要具备良好的心理素质和身体素质,才能很好地完成急救任务。</p>\r
<p>(二)院前急救的主要任务</p>\r
<p>1. 承担平时呼救患者的急救 是最主要和经常性的任务,要求救护者接到呼救信息后,救护车立即出动,医护人员随车前往。呼救患者约90%是急诊患者,需要救护者给予现场处理以减轻患者在运送过程中的痛苦和避免并发症的发生;此外,还有需要给予现场急救的、短时间内有生命危险的危重患者,需要救护车提供转运服务的慢性病患者。</p>\r
<p>2. 承担灾害或战争时对伤员的急救 灾害来临时,院前急救除了做好急救处理外,还要与现场的其他救灾系统(如消防、公安、交通等部门)密切配合,并要注意自身的安全。若遇特大灾害或因战争有大批伤员时,应结合实际情况执行有关抢救预案。无预案时须加强现场指挥、现场伤员分类和现场救护,应区别不同情况,做到合理分流、运送。</p>\r
<p>3. 承担特殊任务时的救护 特殊任务指当地的大型集会、重要会议、国际比赛、外国元首来访等。执行此项任务要求加强责任心，严防擅离职守。执行现场任务的应急救援人员应时刻处于备战状态，随时能够应对可能发生的各种意外伤害事件。</p>\r
<p>4. 承担通信网络中心的枢纽任务 院前急救的通信网络在整个急救过程中不但承担着急救信息的接收任务, 而且还承担着传递信息、指挥调度及与上级领导、救灾急救指挥中心、急救现场、急救车、医院急诊科的联络任务, 起着承上启下、信息沟通的枢纽作用。</p>\r
<p>5. 普及急救知识和技能 普及公民急救知识、增强应急能力是全社会共同的责任。急救知识的普及教育可提高急救的成功率，平时可通过媒体、电视、宣传栏等对公众普及急救知识，开展有关现场急救及心肺复苏的教育。实施院前急救时，患者家属和目击者对急救知识掌握及运用的程度直接关系到患者的后期抢救成功率。</p>\r
<p>(三)院前急救的原则</p>\r
<p>院前急救的主要目的是最大限度地降低死亡率,减少致残率,并减少伤病员的痛苦,为医院的抢救工作打好基础,故而应优先遵守“先救命后治病”的总原则,并遵守以下原则。</p>\r
<p>1. 先排险后救治 在进行救护前,先进行环境评估,保证伤病员脱离危险的环境,必要时排险后再实施救护。如对气体中毒者,先使其脱离危险环境,确保救护者和中毒者的安全,然后再急救。</p>\r
<p>2. 先复苏后治伤 遇有心跳、呼吸骤停并有其他损伤者,应先用口对口人工呼吸和胸外心脏按压等技术使心跳、呼吸恢复,再对其他伤情进行救治。</p>\r
<p>3. 先重伤后轻伤 有大批伤病员出现时,在有限的时间、人力、物力的状况下,应优先抢救危重者,后抢救较轻的伤病员。</p>\r
<p>4. 先止血后包扎 有大出血、创伤较大者，先用指压、止血带等方法止血，然后再对伤口进行消毒、包扎等处理。</p>\r
<p>5. 先救治后运送 对于重伤病员, 先进行紧急的救治, 最大可能地保证伤病员的生命体征在暂时稳定的前提下再进行转运。运送过程中不
可停止抢救措施, 继续观察病情变化, 注意保暖。</p>\r

<p>6. 急救与呼救并重 有大批伤病员时,要及时呼救,以便尽快得到外援;在意外事故现场指挥部的统一领导下,有计划、有步骤、有组织地进行抢救、分类、转运伤员等工作。</p>\r
<p>考点提示:院前急救的特点、主要任务及原则。</p>\r
<p>二、院前急救的设置与模式</p>\r
<p>(一)院前急救服务系统的设置</p>\r
<p>1. 院前急救服务系统设置原则 见表 1-1。</p>\r
<p style="text-align: center;">表 1-1 院前急救服务系统设置原则</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540004-1-l.jpg" /><figcaption></figcaption></figure>\r
<p>2. 急救半径与反应时间要求 急救半径是指急救单元所执行院前急救服务区域的半径, 城市建成区急救半径应 ⩽5km 。急救反应时间是急救中心接到电话至急救车到达现场所需时间, 市区要求在 15min 以内, 条件好的区域要在 10min 以内, 郊区要求在 30min 以内。急救反应时间越短, 对抢救患者越有利。</p>\r
<p>3. 院前急救组织的必备条件</p>\r
<p>(1)通信指挥系统:是院前急救中心受理院前急危重症患者呼救、应对灾害事件的重要工具,是EMSS 实现统一指挥、调度、协调功能以及提高应急反应能力的基础。随着“互联网 +”、大数据、移动通信技术等的快速发展，通信指挥系统具备了救护车定位追踪、呼叫号码和位置显示、计算机辅助指挥、移动数据传输等诸多信息化、智慧化功能，使院前急救更加快捷、高效、精准。</p>\r
<p>(2) 运输工具: 随着我国汽车、火车、轮船、飞机等交通工具的数量、种类、性能逐步提升, 我国的院前急救已由单一的陆地急救模式逐步向水陆空三位一体、转运兼救治一体的立体化模式转变。实施院前急救的运输工具分为陆地、航空及水上救护工具三类。救护车是目前我国最为常用的院前急救专用运输工具。</p>\r
<p>(3)急救医疗队伍:是实施院前急救措施、提升院前急救质量的关键力量。我国的院前急救人员主要包括医生、护士、担架员、驾驶员等。根据院前急救模式和救护工具的不同,各地院前急救医疗队伍的组成有一定的差异。由于院前急救患者具有病情复杂、情况紧急、意外情况多变等特点,因此要求急救人员熟练掌握基本急救技术,在执行急救任务时,能凭借过硬的急救业务能力,迅速投入到紧急救援状态,对患者实施及时有效的救治。</p>\r
<p>(二)院前急救的模式</p>\r
<p>1. 英美模式 英美模式突出“急”字，强调以医院急诊为中心，主张伤病员的院前快速转运。救护车一般只配备救护者和简单的器械、药品。救护车平时就在街道上行驶，救护者负责出诊，一旦接到呼救，立即直接奔赴现场，进行现场简单的医疗处置后将伤病员迅速转送至医院，即强调在最短的时间内将伤病员送至医院。该模式采用统一的应急电话号码，集消防、警察和医疗急救为一体。采用这种院前急救工作模式的国家主要有美国、英国、澳大利亚等。</p>\r
<p>2. 欧洲模式 欧洲模式突出“救”字，强调伤病员的院前救治，救护车上一般配有经验丰富的医生和齐全的检查工具、救护设备及药品，类似一个移动的ICU。救护者现场给予危重伤病员有效的救治，待其生命体征平稳后，再直接转入有能力救治的相关医院，即强调在最短的时间里把“医院”送到伤病员的身边。该急救系统模式一般有专用的医疗急救电话号码。法国和俄罗斯等欧洲国家采用这种急救工作模式。此外，法国紧急医疗救助体系(SAMU)对消防部门等救助机构具有调度指挥和协同的权力，私人救护车公司、红十字协会、公民保护协会、家庭医生等也是法国院前急救系统的辅助组成部分。</p>\r
<p>3. 中国模式 我国院前急救模式总体上位于美英模式和欧洲模式之间,救护者是具有执业资格的医护人员,但现场救治深度又不及欧洲模式,因此各地区在原有医疗体系的基础上,早期形成了各具特色的院前急救模式,其中具有代表性的有独立型、依托型、行政型和院前型四种(表1-2)。目前我国各个城
市院前急救模式互相学习和借鉴,处于逐步完善和成熟阶段。</p>\r
<p style="text-align: center;">表 1-2 我国主要的院前急救模式</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540004-2-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">考点提示:我国主要的院前急救模式。</p>\r
<p>三、院前急救的基本程序</p>\r
<p>院前急救工作的核心是现场急救，现场急救的目的是保护生命，防止病情恶化或再损伤。现场急救的护理原则是立即让患者脱离危险，先救命后治病，争分夺秒，就地取材，保留标本及离断组织。其护理工作内容包括现场评估与呼救、现场救护、转送护理三个方面。</p>\r
<p>(一)现场评估与呼救</p>\r
<p>1. 快速评估现场环境 现场评估时要注意以下几点。</p>\r
<p>(1) 检查现场: 包括现场的安全、引起的原因、受伤人数等, 以及救护者自身、伤员及旁观者是否身处险境, 伤员是否仍有生命危险。</p>\r
<p>(2) 安全保护: 在进行现场救护时, 可能存在潜在环境危险和疾病传播等风险, 会对救</p>\r
<p>护者造成伤害,所以,应首先确保救护者自身安全。如对触电者现场救护,必须切断电源后采取救护措施以保障自身安全。</p>\r
<p>(3)个人防护:是指为了保护突发公共事件处置现场工作人员免受化学、生物与放射性污染危害而采取的措施,以防范现场环境中有害物质对人体健康的影响。当突发公共事件被确认为有毒污染、辐射、传染病或疑似传染病时,采取有效措施切实做到个人的隔离防护工作至关重要,也是控制疾病传播与继续发生的关键。</p>\r

<p>2. 快速评估病情 快速评估危重病情,主要是对意识、气道、呼吸、脉搏等方面的评估,具体内容如下。</p>\r
<p>(1) 意识: 对意识状态的评估, 应根据患者的语言反应了解其思维、情感活动、定向力等, 必要时观察瞳孔对光反应、角膜反射、对强刺激(如疼痛)反应、肢体活动等, 判断其有无意识障碍及其程度。</p>\r
<p>(2)气道:保持气道通畅是呼吸的必要条件,急救现场一定要分清呼吸停止的原因,是因梗阻、阻塞、扭曲所致,还是因病情严重致呼吸功能丧失,要进行综合判断。如患者有反应但不能说话、咳嗽,出现呼吸困难,可能存在气道梗阻,必须立即检查原因并予以清除。现场急救对危重症患者保持呼吸道通畅的最佳体位是去枕平卧、头偏向一侧。</p>\r
<p>(3)呼吸:主要是监测呼吸的频率、深浅度和节律有无改变,有无呼吸困难、被动呼吸体位、发绀及“三凹征”。急救情况下重点是判断呼吸是否存在，其方法是将自己面颊部靠近患者口鼻处，“一听”有无呼吸音存在，“二看”有无胸廓起伏，“三感觉”有无气体逸出，判断时间为5～10s。若患者呼吸停止，立即畅通呼吸道，若有呼吸道梗阻应立即解除，必要时行人工呼吸。</p>\r
<p>(4) 脉搏: 大动脉搏动消失是判断心搏骤停的一个主要依据。急救现场首先判断有无脉搏, 其次判断脉搏是否正常。快速触摸颈动脉是判断有无脉搏的有效方法, 因颈动脉位置靠近心脏, 容易反映心搏的情况, 最简洁的方法是用示指和中指指腹触及患者气管正中部(男性相当于喉结的部位), 旁开两指, 至胸锁乳突肌前凹陷处。对婴幼儿触摸肱动脉, 若触摸不清或触不到搏动感, 表明有循环障碍或心搏骤停, 立即进行胸外心脏按压, 重建循环。如触不到桡动脉搏动, 提示收缩压降至 80mmHg 以下; 如触不到颈动脉搏动, 提示收缩压降至 70mmHg 以下。</p>\r
<p>3. 紧急呼救 是指在事故发生现场,经过现场评估和病情判断后需要立即救护,同时立即向专业急救机构拨打急救电话(常用的急救电话为“120”),然后急救机构立即派出专业救护者、救护车至现场抢救的过程。紧急呼救包括以下几点。</p>\r
<p>(1) 救护启动: 又称呼救系统开始。呼救系统的畅通, 在国际上被列为抢救危重症患者的“生存链”中的“第一环”。</p>\r
<p>(
2) 呼救电话须知: 使用呼救电话时必须要用最精练、准确、清楚的语言说明患者目前的情况及严重程度、患者人数及存在的危险。呼救电话应简要清晰说明以下几点: ① 救护者的(报告)电话号码与姓名, 患者姓名、性别、年龄和联系电话; ② 患者所在的确切地点, 尽量详细到附近街道的交汇处或其他显著标志; ③ 患者目前最危重的情况, 如晕倒、呼吸困难、大出血等; ④ 发生灾害事故、突发事件时, 说明伤害性质、严重程度、伤员人数; ⑤ 现场所采取的救护措施。</p>\r
<p>(二) 现场救护</p>\r
<p>1. 安置体位 急救现场正确的体位可以使伤病员舒适,减少再损伤。现场体位安置应注意以下几点。</p>\r
<p>(1) 正确的体位应保持稳定, 不要随意移动, 以免造成伤害。如不要搬动和摇动已确定有头部或颈部外伤者。若伤者伴有颈部外伤, 翻身时, 为防止颈椎再次损伤引起截瘫, 应采取轴线翻身法, 保持头、颈部与身体一致。</p>\r
<p>(2) 对无呼吸、心跳者，取仰卧位，并置于平地上，或在软垫上放一硬板，解开衣领、裤带，进行现场心肺复苏。</p>\r
<p>(3) 对神志不清但有呼吸及心跳者, 放置安全舒适的体位, 如平卧位、头偏向一侧或屈膝侧卧位, 此体位可以使患者放松, 并且可以保持呼吸道通畅, 防止发生误吸。</p>\r
<p>(4) 对清醒的伤病员, 根据受伤、病变的部位不同摆好正确的体位。如对腹痛者, 令其屈膝腹前, 以放松腹肌; 对咯血者, 嘱其取患侧卧位, 以防血流入健侧支气管和肺内。</p>\r
<p>(5)对头部外伤者,取水平仰卧位,头部稍抬高。</p>\r
<p>2. 检伤与分类 重大灾害现场,成批伤员出现时,可将伤员分为危重伤、中重伤、轻伤、致命伤,即Ⅰ、Ⅱ、Ⅲ、Ⅳ四类,分别按红、黄、绿、黑四色标注(表1-3)。</p>\r
<p>(1) 红色: 代表危重伤, 第一优先。伤员伤情非常紧急, 危及生命(即危及意识、呼吸、循环, 生命体征不稳定), 需立即给予基础生命支持, 并在 1h 内转运到医疗机构救治。如颈椎损伤、大出血、休克、心室颤动、50% ~ 60% 的Ⅱ度烧伤。</p>\r
<p>(2) 黄色: 代表中重伤, 第二优先。伤员存在生命体征稳定的严重损伤, 有潜在生命危险。此类伤员应急救后优先后送, 在 4~6h 内得到有效治疗。如不伴有呼吸困难的胸、腹部损伤。</p>\r
<p>(3) 绿色: 代表轻伤, 第三优先。伤员能行走, 损伤较小, 可能不需要立即入院治疗。如一般的挫伤、擦伤。</p>\r
<p>(4) 黑色: 代表致命伤。伤员意识丧失、颈动脉搏动消失、心跳及呼吸停止、瞳孔散大, 没有生还的可能性, 治疗为时已晚。</p>\r
<p style="text-align: center;">表 1-3 伤情分类</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540004-5-l.jpg" /><figcaption></figcaption></figure>\r
<p>3. 现场救护要点 现场救护原则是先复苏后治伤,先重伤后轻伤,先抢后救,尽快脱离事故现场,先分类后运送。一般先处理最危及患者生命的情况,不能因诊断不明而耽误有效的治疗。在医务人员有能力处理的范围内,优先处理病情危重、多发创伤者。救护要点主要包括以下几方面的内容。</p>\r
<p>(1) 维持呼吸系统功能: 包括吸氧、清除痰液及分泌物, 保持呼吸道通畅; 应用呼吸兴奋剂和扩张支气管药物; 对呼吸停止者要进行口对口人工呼吸, 或使用面罩 - 气囊通气、气管插管通气等; 对重度气胸的患者进行穿刺排气。</p>\r

<p>(2) 维持循环系统功能: 包括急性心肌梗死、心力衰竭、高血压危象、急性肺水肿和各类休克的处理; 严重心律失常的药物治疗; 心电监测, 电除颤仪和心脏起搏器的使用; 心搏骤停时进行心肺复苏等。</p>\r
<p>(3) 维持中枢神经系统功能: 包括对急性脑血管疾病、急性脑水肿及癫痫发作的急救护理。</p>\r
<p>(4) 对症救护措施, 如解痉、止痛、止吐、止喘等。</p>\r
<p>(5)颅脑
、脊柱等外伤的止血、包扎、固定及搬运。</p>\r
<p>(6)灾害、意外事故及各种创伤的现场救护。</p>\r
<p>考点提示:现场评估和现场救护的要点。</p>\r
<p>(三) 转送护理</p>\r
<p>首先根据伤情选择要转送的地点,通知对方做好迎接和抢救准备,同时根据伤情结合运送工具的特点做好搬运工作。</p>\r
<p>1. 把握转运时间 呼吸、心搏骤停者需立即就地实施心肺复苏术。重伤患者只要病情稳定、距送达医院较近、20～30min内即可到达的，可以缩短现场急救时间，或边转送边急救。伤情不稳定者、距送达医院较远、在30min内不能到达的，应先在现场积极救治，待伤情稳定后再考虑转运。按先重后轻的顺序快速、安全地转运，这样有利于现场人员的疏散，更有利于对中、重度患者进一步救治。</p>\r
<p>2. 通报病情与联络 转运前要通知相关部门做好转运途中的配合工作,如车辆来源、定点医院、急救人力和物资的准备,以及通知电梯等相关部门进行等候,以便在转运途中节省等候时间,确保患者在运送途中的安全。</p>\r
<p>3. 搬运 根据转运路途选择合适的转运工具。</p>\r
<p>(1) 担架法: 若伤员伤情严重且存在多发性骨折时, 在保持伤员体位不变的情况下, 将伤员抬上担架, 通常采取双人搬运法和四人搬运法。</p>\r
<p>1) 双人搬运法: 适用于病情较轻、无脊柱骨折者, 局部骨折已经固定但自己不能活动且体重较重的伤员。其方法是两名救护者站在伤员的同侧, 一名救护者一手臂托住伤员的头、颈、肩部, 另一手臂托住伤员的腰部, 另一名救护者一手臂托住伤员的臀部, 另一手臂托住伤员的腘窝处, 两人同时托起伤员，并使其身体向救护者倾斜，同时移步向平车，将其轻放于平车中央。</p>\r
<p>2) 四人搬运法: 适用于颈椎、腰椎骨折和病情较重者。其方法是两名救护者分别站于伤员的头端和脚端, 另两名救护者分别站于担架的一侧, 并将双手分别插入伤员的肩、胸、臀下, 使伤员身体保持在同一水平线上, 四人听统一口令, 将伤员一同抬起, 平移放在担架上。</p>\r
<p>(2) 上、下救护车法: 多数救护车上安置有轨道滑行装置, 将躺着患者的担架头端在前, 放入救护车内轨道上, 平行滑入车内。如救护车内无轨道, 救护者合力将担架抬起, 保持患者头部稍高位而抬入救护车内。下救护车时, 尽可能保持担架平稳。</p>\r
<p>(3) 特殊患者搬运: 动作要轻稳、协调。</p>\r
<p>1) 颅脑外伤: 搬运时应取侧卧位, 有利于呼吸道分泌物的排出, 从而保持呼吸道通畅。如有脑组织膨出, 用清洁敷料包扎后固定, 减少振动。如伴有颈椎损伤, 应用颈托固定, 如无颈托, 可用沙袋置于颈部两侧加以固定, 以免头部晃动。</p>\r
<p>2) 开放性气胸: 先就地取材将开放伤口包扎, 再用“座椅式”搬运法, 如使用折叠椅或靠背椅, 使患者保持坐位或半卧位。</p>\r
<p>3) 腹部损伤: 取仰卧位, 下肢屈曲, 以减轻腹壁压力, 防止器官突出。如果腹部伤口较大, 有腹腔内容物脱出时, 不应立即还纳, 以防污染腹腔, 可先用清洁敷料包裹, 固定后再搬运。</p>\r
<p>4) 休克: 取中凹卧位, 头部和下肢抬高, 用担架搬运。</p>\r
<p>4. 途中监护注意事项</p>\r
<p>(1) 运送途中要正确实施院外急救护理技术, 如输液、吸氧、吸痰、气管插管、气管切开、心肺复苏、深静脉穿刺等技术, 注意保持各种管道固定、畅通, 不因运送而有所影响。</p>\r
<p>(2) 运送途中要保持患者生命体征的相对稳定,用先进的监测、治疗手段加强生命维护,要随时观察、监测患者的呼吸、脉搏、血压、体温等生命体征,以及意识、面色变化、出血等情况。使用仪器(如心电监护仪)监护时,要确保仪器的完好并在通电状态下进行,一旦出现病情突变,首先检查患者情况,再检查仪器设备情况,采取必要的措施进行紧急救护。</p>\r
<p>(3) 运送特殊患者需要保持固定的体位, 防止再次损伤。若遇脊柱受伤者, 应保持脊柱轴线稳定, 将其身体固定在硬板担架上搬运, 观察生命体征变化, 预防并发症的发生。对已确定或疑有颈椎创伤者, 要尽可能用颈托保护, 运送时尽可能避免颠簸, 不摇动患者的身体。</p>\r
<p>(4) 做好抢救、观察、监护等有关医疗文件的记录, 将患者安全运送到指定的医院后, 要做好相互衔接与交接工作, 陪送人员应向医务人员详细交代病情及急救处理经过, 做好书面记录与口头交接, 保证全程救护效果。</p>\r
<p>考点提示: 安全转运患者与转运照护。</p>\r
<p>目标检测</p>\r
<p>1. 院前急救是指( )。</p>\r
<p>A. 专业救护者到来之前的抢救</p>\r
<p>B. 急危重症患者的现场救护</p>\r
<p>C. 急危重症伤病员进入医院前的医疗救护</p>\r
<p>D. 途中救护</p>\r
<p>E. 现场自救、互救</p>\r
<p>2. 院前急救护理程序为( )。</p>\r
<p>A. 现场救护、现场评估与呼救、转运与途中监护</p>\r
<p>B. 现场评估与呼救、现场救护、转运与途中监护</p>\r
<p>C. 现场评估与呼救、转运与途中监护、现场救护</p>\r
<p>D. 现场救护、转运与途中监护、现场评估与呼救</p>\r
<p>E. 转运与途中监护、现场评估与呼救、现场救护</p>\r
<p>3. 现场伤病员分类中重伤(一级急救)的标记颜色为( )。</p>\r
<p>A. 黄色 B. 红色 C. 白色</p>\r

<p>D. 绿色 E. 黑色</p>\r
<p>4. 关于我国院前急救主要的组织形式及特点,下列描述错误的是( )。</p>\r
<p>A. 独立型有独立的急救中心,独立地完成“院前—急诊科—急诊重症监护病房”急救服务</p>\r
<p>B. 依托型依托于一家综合医院完成急救任务</p>\r
<p>C. 行政型具有统一的城市急救通信指挥中心,由各医院分区出诊</p>\r
<p>D. 院前型以院前急救为主要任务,不设床位,出诊时随车人员为急救人员</p>\r
<p>E. 院前型有统一的指挥和调度,在派遣救护车辆时,更易于从患者角度考虑和解决问题</p>\r
<p>5. 患者, 男, 30 岁。车祸外伤骨折并在初步处理后准备转运, 突然出现下列病情, 应优先抢救的是( )。</p>\r
<p>A. 窒息</p>\r
<p>B. 昏迷</p>\r
<p>C. 骨折</p>\r
<p>D. 心律失常</p>\r
<p>E. 伤口出血</p>\r
<p>6. 患者, 男, 35 岁, 建筑工。在施工中不小心从高处坠落, 医务人员在现场对其全面体检时发现桡动脉触摸不清, 则说明收缩压( )。</p>\r
<p>A. &lt;80mmHg B. &lt;70mmHg C. &lt;60mmHg</p>\r
<p>D. &lt;50mmHg E. &lt;40mmHg</p>\r
<p>7. 某患者户外活动时右下肢被毒蛇咬伤,周围没有其他人员且患者口腔黏膜有破损,患者自行拨打“120”求救电话。在医务人员赶来之前,患者正确的做法是( )。</p>\r
<p>A. 尽可能地抬高右下肢</p>\r
<p>B. 迅速奔跑,及早到医院</p>\r
<p>C. 自行吸吮伤口</p>\r
<p>D. 用布条在伤口近心端结扎,定时松开</p>\r
<p>E. 头低脚高仰卧于地面</p>\r
<p>(8 ~ 10 题共用题干)</p>\r
<p>游客李某和家人一起在外地旅游,游玩时突然晕倒在地,口腔内有大量分泌物,口唇发绀。</p>\r
<p>8. 家属应该首先判断的是( )。</p>\r
<p>A. 意识状态 B. 瞳孔大小 C. 体温</p>\r
<p>D. 脉搏强弱 E. 血压</p>\r
<p>9. 家属应拨打的求救号码是( )。</p>\r
<p>A. 119 B. 120 C. 999</p>\r
<p>D. 911 E. 110</p>\r
<p>10. 家属在现场首先要做的急救措施是( )。</p>\r
<p>A. 清理口腔里的分泌物</p>\r
<p>B. 检查有没有摔伤</p>\r
<p>C. 不做任何处理,等待救护者</p>\r
<p>D. 不需要将患者转移到安全的地方</p>\r
<p>E. 若患者肢体有抽搐,应强行按压</p>\r
<p>（黄全华 王春美 秦抗洪）</p>\r
`},{id:"module2-task4",title:"第四节 急诊科救护",order:4,rawContent:`患者，男，62岁。30min前突然出现剧烈的心前区不适，由家人送至急诊科。自述胸口就像压了块大石头一样喘不过气，含服了硝酸甘油片，但没什么效果。患者既往有冠心病病史，无过敏史。查体：体温36.5℃，心率102次/分，呼吸20次/分，血压125/88mmHg，  95%。

请思考：

1. 作为急诊护士,对该患者从进入急诊科开始应如何处理?

2. 该患者预检分诊为几级？

一、急诊科的任务与布局

急诊科是医院提供急诊医疗服务的场所,是急救医疗服务体系的重要组成部分,是急危重症患者最集中、病种最多、抢救和管理任务最重的科室。急诊科不仅承担着组织抢救有生命危险的急诊患者,还承担着院前急救、突发公共事件患者的抢救工作,充分体现“时间就是生命”。急诊科工作可反映医院总体科学管理水平,直接体现了医院的医疗护理质量和人员的综合素质水平。

(一)急诊科的任务

1. 急诊 急诊科须 24h 应诊, 对前来就诊的病情紧急或遭受痛苦的各类患者及时诊治和处理。

2. 急救 组织人力、物力对急诊就诊和急救中心、基层医院等转送来的重症患者实施抢救工作。

3. 教学与培训 承担实习生、进修人员的教学任务,医院全体员工的急救技能培训工作以及大众急救知识的宣传和教育工作;建立和健全各级各类急诊人员的岗位职责、规章制度和技术操作规范。

4. 科研 积极开展有关急危重症救护方面的科研工作, 研究生命器官救治的新方法、新技术, 不断提高医疗救护水平。

5. 灾害事故的医疗救护 在自然灾害、事故灾难或突发公共卫生事件、社会安全事件等重大灾害事件发生时,做好充分的准备,有组织地进行意外灾害事故的医疗救护工作。

(二)急诊科的布局

急诊科应合理设置就诊区域,以方便患者就诊和抢救为原则,最大限度地利用急诊医疗资源,提高急诊工作效率和抢救成功率。

1. 急诊科总体布局

(1) 急诊科的位置及标志: 急诊科应设置在医院最显著的位置, 便于患者迅速到达, 且邻近各类辅助检查科室, 其区域面积应达到医院总面积的 3% 及以上。急诊科应设置白天和夜间都醒目的路标和标识, 以方便和引导患者就诊, 与手术室、重症医学科等院内紧急救治的绿色通道标识均应清楚明显。在急诊大厅设有急诊科各楼层的平面图。

(2)急诊科的平面布局:急诊科入口应通畅,设有无障碍通道,方便轮椅、平车出入,并设有救护车通道和专用停靠处。急诊科大厅应宽敞明亮,方便患者和家属做短暂候诊和停留。急诊科的各功能部门的布局应以减少交叉穿行、减少院内感染和节省时间为原则,预检分诊台、候诊室、各科诊室、抢救室、急诊重症监护室(EICU)、清创手术室、检验室、X线检查室、心电图室、药房以及挂号收费室等以一楼平面展开为宜。在规模较大的急诊科,可将输液室、观察室、隔离室、急诊病房、EICU、手术室以及其他功能检查部门设置在最邻近的楼层面。

2. 急诊科布局

(1) 医疗区: 包括预检分诊处(台)、抢救室、专科诊室、急诊观察室、急诊手术室、急诊清创室、洗胃室、急诊重症监护室、隔离室、治疗室和处置室等区域。

1)预检分诊处(台):是急诊患者就诊的第一站,应设在急诊科入口明显的位置。预检分诊护士一般由有多年急诊工作经验的护士担任,根据患者病情轻重缓急进行分级、登记并联系诊室医生救治,就诊记录可使用急诊临床信息系统。分诊处(台)应设有电话、对讲机、呼叫设备,以便及时与相关人员、科室取得联系;备齐常用的医疗检查器械,如血压计、听诊器、体温计、手电筒、压舌板等,以及患者就诊登记本等。另外,为方便患者,还应准备轮椅、平车、饮水设施及公用电话等,并配有导诊员。

2) 抢救室: 应邻近预检分诊台, 有足够的空间和充足的照明, 最好配备旋转式无影灯。设置一定数量的抢救床, 每床净使用面积不少于 15m2 。抢救室墙壁上应有心肺复苏、休克、创伤、中毒等重点病种的抢救流程。抢救室内应备有必需的仪器设备、药品和物品。①抢救仪器设备: 中心吸引装置、给氧设备、心电图机、除颤仪、心肺复苏仪、呼吸机、电动洗胃机、生命体征监测仪等。根据医院需求, 还可配备
血液净化、体外膜肺氧合和快速床旁检测设备。②常用的急救药品: 中枢神经兴奋药、拟肾上腺素药、强心药、抗心律失常药、血管扩张药、利尿药、止血药及常用的液体等。③必备抢救物品: 气管插管包、简易呼吸器、静脉切开包、胸穿包、腹穿包、导尿包、各种型号的无菌注射器、无菌手套、氧气装置、备皮用物、胃肠减压器、血压计、体温计、各种导管、开口器、压舌板等。

3) 专科急诊诊室: 一般综合性医院急诊科应设有内科、外科、妇产科、儿科、眼科、口腔科、耳鼻喉科等分科急诊诊室。外科诊室应设在靠近大门处, 以减少血迹污染; 小儿科应有独立急诊接诊区。传染病和肠道急诊均应有隔离区。在诊室内应根据各专科特点备齐急诊需用的各种器械和抢救用品。

4) 急诊观察室: 用于收治需要在急诊临时观察的患者, 如暂时不能确诊、病情有危险的患者。观察室床位数按照医院承担的医疗任务和急诊量设置。室内设备、护理工作程序与普通病房相似。患者留观时间原则上不超过 72h。

5) 急诊手术室: 位置应与抢救室、外科诊室相邻, 室内应设置手术床、手术包、手术器械及必要的麻醉、消毒、抢救设备。

6) 急诊清创室: 位置靠近外科诊室或与外科诊室成套间, 外伤患者可在清创室进行清创、缝合、换药等处理。应配备无菌物品柜, 柜内放置开展外伤清创缝合及急诊小手术的器械及物品。

7) 洗胃室: 有条件的医院应设有单独的洗胃室, 用于中毒患者洗胃、急救。配备常用的洗胃用品, 如胃管、听诊器、压舌板、开口器、洗胃液等, 还应配备自动洗胃机 2 台, 以备发生故障时能替换使用。

8) 急诊重症监护室: 主要收治中毒、休克、严重创伤、急性心力衰竭、急性呼吸衰竭等急危重症患者, 位置最好邻近急诊抢救室。室内配备监护仪、除颤起搏器、呼吸机、心电图机、供氧装置和负压吸引装置等设备, 以随时掌握患者的病情及生命体征变化。

9) 隔离室: 对有疑似传染病的患者, 预检分诊护士应安排其到隔离室进行诊治。室内配有专用卫生间以及必要的隔离用品与物品。凡确诊为传染病的患者, 应就地隔离, 及时转入传染病科或传染病院诊治。

10) 治疗室和处置室: 急诊科应有独立的治疗室和处置室, 治疗室应在各科诊室的中央, 室内应有治疗桌、配液台、无菌物品柜、消毒用品、洗手池及照明设备等, 用于各项治疗前以及输液前的准备。处置室主要用于对使用后的医疗物品的集中处理。

(2) 支持区: 包括急诊医技部门、辅助及支持部门等, 做到在急诊科即可完成基本的辅助检查与处置。

1) 急诊医技部门: 包括急诊药房、急诊检验室、急诊放射科、心电图室、急诊超声室、急诊 CT 室等，有条件的医院可设置心肺功能检查室、胃镜检查室等部门。

2）辅助及支持部门：包括急诊挂号处、急诊收费处、保安室等部门。

(三)急救绿色通道

急救绿色通道即急救绿色生命安全通道,是指对急危重症患者在分诊、诊疗、检查、治疗、手术及住院等环节上,实施快速、有序、安全、有效的急救服务。急救绿色通道的建立是救治危重症患者最有效的机制,能有效缩短救治时间,降低伤残率和病死率,提高救治成功率和生存质量。

1. 进入急救绿色通道的患者范围 原则上所有生命体征不稳定和可能危及生命的各类急危重症患者均应纳入急救绿色通道,包括但不限于以下急诊患者:①心搏骤停、休克、昏迷、严重心律失常、急性器官功能衰竭的患者等。②批量患者,如外伤、中毒等患者。

考点提示:急救绿色通道的概念。

2. 急救绿色通道的管理

(1)标志醒目:急诊科各部门应有明显标志,在药房、收费窗口、化验室等部门应设有绿色通道患者专用窗口。

(2) 合理配置: 合理配置急诊人力资源, 各环节 24h 有值班人员。定期开展急救技术培训, 实行合格上岗制度。急救设备和药品的配置应符合《急诊科建设与管理指南(试行)》的基本要求。

(3) 正确分诊: 加强急诊预检分诊, 及时救治急危重症患者, 有效分流非急危重症患者。

(4)首诊负责制:包括医院、科室、医生三级。首诊负责制是指第一位接诊医生对其接诊患者,特别是急危重症患者的检查、诊断、治疗、会诊、转诊、转科、转院等工作负责到底的制度。

(5)分区救治:实施急诊分区救治,建立住院和手术的“急救绿色通道”,建立创伤、急性心肌梗死、脑卒中、急性呼吸衰竭等重点病种的急诊服务流程与规范,需紧急抢救的危重患者可先抢救后付费,保障患者获得连贯医疗服务。

(6) 定期评价: 定期评价对紧急事件处理的反应性, 急危重症患者在“急救绿色通道”停留的时间, 做好持续的质量改进。

(7) 规范运行: 急诊医生根据患者的病情或符合急救绿色通道范围的患者, 决定启动急救绿色通道服务, 可在患者的处方、检查申请单等医学文件上标明“急救绿色通道”的标志, 执行先抢救后付费的原则。急诊服务流程体系中的每一个责任部门(包括急诊科、各专科诊室、各医技检查部门、药剂科以及挂号与收费等)各司其职, 确保患者能够获得连贯、及时、有效的救治。

二、急诊护理管理

(一)急诊科的护理人员管理

1. 急诊科护理人员配备 急诊科应有固定的人员编制，且不少于在岗护士的 80% ，护士结构梯队合理，有3年以上临床护理工作经验，具有本科及以上学历的护士比例应达到 30% 以上。三级综合医院急诊科护士长应当由具备主管护师以上任职资格和2年以上急诊临床护理工作经验的护士担任。二级综合医院急诊科护士长应当由具备护师以上任职资格和1年以上急诊临床护理工作经验的护士担任。

2. 急诊科护理人员的素质要求

(1) 具有高尚的职业道德: 对患者应具有高度的责任感和同情心, 急患者之所急, 全力以赴地抢救患者的生命; 应尊重患者自尊、保守秘密, 在抢救中涉及特殊的病史与病症(如自杀史、传染病史), 应注意保护患者隐私, 不可四处宣扬; 遵循慎独精神, 严于律己, 主动做好消毒、隔离, 预防医源性交叉感染。

(2)具备坚强的毅力、稳定的心理素质:能沉着冷静、准确迅速地完成抢救工作。

(3) 具有扎实的业务基础: 经规范化培训合格, 掌握急危重症患者的急救护理技术、常见急救操作技术的配合及急诊护理工作内涵与流程。

(4)具备一定的管理能力:遇有重大抢救任务时,能组织、协调好各有关科室部门之间的关系,保证参与的人员、设备及药物准确无误地投入抢救实施中。

(5) 具有良好的身体素质: 急救护士只有拥有强健的体魄, 能吃苦耐劳, 才能胜任急诊科繁忙而紧张的急救护理工作。

(二)急诊科的护理管理制度

急诊科应严格执行《全国医院工作条例》中有关急诊方面的各项规章制度，并根据其中有关制度的要求结合急诊科工作实际制订适合本部门急诊工作的制度及有关规定。同时，制订切实可行的急救程序，各项急诊技术操作规程、质量标准和相关急救预案，制订各项急诊工作制度、急诊值班制度、出诊抢救制度、急诊查房制度、疑难与死亡病例讨论制度、消毒隔离制度、医疗设备仪器管理制度、出诊抢救和重大突发事件呈报制度等，使工作规范、有章可循。

(三)急诊护理工作质量管理

1. 提高分诊符合率 分诊护士一般由受过专业培训或有3年以上急诊临床护理工作经验的护士担任。分诊时间为2~5min，分诊符合率大于90%，能够有预见性地发现问题，能发现危及生命的指征，使危重患者能够得到优先处置。合理安排就诊顺序，及时化解、处理护理纠纷。

2. 提高危重患者抢救成功率 护理人员应严格落实各项救护规章制度,尤其是首诊负责制,使急诊服务及时、安全、便捷、有效。熟练掌握创伤、急性心肌梗死、心力衰竭、脑卒中、中毒等常规抢救流程,能熟练操作开放气道、心肺脑复苏术、心脏电复律术、机械通气术、洗胃术等急诊专科技术,在医生未到达前,能按照抢救流程及时、正确地抢救患者,提高危重症患者抢救成功率。在抢救过程中能有意识地做好感染预防及控制,一旦发生职业暴露,及时正确处理。

3. 完善急救物品管理 各种抢救药品、物品要实行“六定”，即
定点放置、定人保管、定时保养和维修、定时检查、定量供应、定期消毒，随时处于备用状态。设备、药品完好率100%且在有效期内，保证足够电量，用后立即补充、补齐用物和药物。每周检查仪器设备功能及保养清洁，并记录在册。仪器设备需配有清晰明确的操作流程标示牌。急诊医护人员能够熟练掌握、正确使用各种抢救设备。原则上急救仪器不得轻易外借，以备急需。

4. 规范文书记录 护理文件书写要求规范、及时、完整、准确，护理记录要与医嘱、病程记录相符。抢救患者需要详细记录就诊时间、抢救时间、每次用药时间、药物名称、用药剂量、患者病情变化情况。未能及时记录的，有关医务人员应当在抢救结束后6h内据实补记。

三、急诊护理工作

(一)急诊护理工作流程

科学、高效的急诊护理工作流程是提高急诊护理工作质量和工作效率的重要保障，主要包括接诊、分诊、急诊处理、记录等环节，这些环节紧密衔接，构成了急诊护理工作流程的基本程序。

1. 接诊 是指医护人员以最短的时间、最熟练的健康评估技巧,对到达医院的急诊患者的病情作出较为准确的判断。预检分诊护理人员对到达急诊科的患者要热情接待,将患者快速接诊到位。一般急诊患者可直接到分诊台,当危重症患者就诊时,分诊护士需根据患者病情需要准备轮椅或平车,到门口或救护车前接诊,并协助患者取合适体位。

2.分诊 是指对到达急诊科的患者，分诊护士迅速对患者的病情作出一个较明确的判断，得出分诊级别，按照不同等级安排患者就诊先后顺序及就诊区域的过程，目的是合理分配医疗资源,使危重症患者能够得到优先救治。自患者进入急诊科开始到完成分诊,时间应控制在2~5min。分诊主要包括接诊问诊、分诊评估、分区分级与分流、分诊记录等程序。

(1) 接诊问诊: 通过问诊得到患者的主诉, 了解患者就诊的主要原因, 围绕主诉有针对性地询问相关问题, 并注意识别倾向性的表述, 使收集的资料真实全面。临床上常用以下公式进行问诊。

1) AMPLE 公式: 主要用于创伤患者创伤机制的评估。5 个字母各代表一项问诊内容, 其中, A (allergies) 为过敏史; M (medications currently used) 指当前用药情况; P (past illness) 指相关病史; L (last meal) 是最后进食时间; E (event/environment related to the injury) 指与创伤相关的事件或环境。

2) OLDCART 公式: 用于评估各种不适症状。其中, O(onset) 指发病时间, 即“何时感到不舒服”; L(location) 为部位, 即“哪儿感到不舒服”; D(duration) 是持续时间, 即“不舒服多长时间了”; C(characteristic) 是不适特点, 即“怎样不舒服”; A(aggravating factor) 为加重因素, 即“是什么引起不舒服的”; R(relieving factor) 指缓解因素, 即“有什么可减轻不舒服”; T(treatment prior) 指来诊前治疗, 即“有没有服过药或接受过治疗”。

3) PQRST 公式: 适用于疼痛患者的评估。PQRST 的 5 个字母刚好与心电图波形字母顺序相符, 其中, P(provoke) 指疼痛发生的诱因及加重与缓解的因素; Q(quality) 是疼痛的性质, 如绞痛、钝痛、电击样痛、刀割样痛、针刺样痛、烧灼样痛等; R(radiation) 指有无放射痛, 疼痛向哪些部位放射; S(severity) 指疼痛的程度如何, 若把从无痛到不能忍受的疼痛用 1~10 的数字来分级, 相当于哪个数的程度; T(time) 指疼痛开始、持续、终止的时间。

(2) 分诊评估: 一般与问诊同步进行, 护士用眼、耳、鼻、手感官或借助于简单的检查工具和仪器来检查患者的体征, 包括用眼睛观察患者的一般情况, 如意识、神态、面容表情、步态行为、语言、肤色、体位、瞳孔有无特殊改变; 观察排泄物、呕吐物和分泌物有无异常。用耳朵听患者身体的不同部位发出的声音, 如呼吸音、肠鸣音、咳嗽音等的变化。用鼻辨别患者身体发出的特殊气味, 如大蒜味、烂苹果味、氨味等。用手触摸脉搏了解心律、心率及血管充盈情况, 触摸疼痛部位了解疼痛范围、程度、皮肤温度以及触摸时是否有不舒服。借助听诊器、血压计、体温计、心电监护仪等工具或仪器获取患者的生命体征, 包括血压、脉搏、体温、呼吸、血氧饱和度、意识程度等。

(3) 分区分级与分流: 根据患者的主观和客观资料, 进行分诊分级, 按
照分诊分级结果, 安排患者到相应区域或专科就诊。

按照患者病情的严重程度,患者可分成四级:①Ⅰ级为濒危患者,指正在或即将发生生命威胁或病情恶化的患者,如心搏呼吸骤停患者、急性意识障碍患者、气道不能维持患者、明确心肌梗死患者、重度创伤大出血患者。该级别响应时间为即刻。②Ⅱ级为危重患者,指病情危重或有可能急剧恶化,短时间内有可能进展至Ⅰ级,如急性脑卒中患者、严重骨折患者、主动脉夹层患者等。该级别响应时间为小于10min。③Ⅲ级为急症患者,有急性症状和急诊问题,但生命体征尚稳定,目前明确没有危及生命或致残危险,如高热、呕吐、轻度外伤、轻度腹痛等。该级别响应时间为小于30min。④Ⅳ级为非急症患者,目前无急性发病症状,如轻、中度发热。该级别响应时间为小于240min。

从功能结构上,急诊科分成三大区域:①红区,即抢救监护区,配备完善的紧急抢救资源,适用于Ⅰ级和Ⅱ级患者诊治。②黄区,即密切观察诊疗区,配备常规的生命体征检查以及基本诊疗器械设备,适用于Ⅲ级患者诊治。处置后还需定时巡视,一旦病情恶化,立即送入红区。③绿区,即快速处置区,适用于Ⅳ级患者诊治。

急诊实行“三区四级”，按照病情轻重缓急确定优先就诊顺序，以保障急诊患者医疗安全（图1-3）。

(4) 分诊记录: 目前大部分医院均采用了智能化预检分诊系统进行登记, 登记内容包括患者到达急诊的日期与时间、入院方式、分诊时间、年龄、性别、主诉、生命体征、过敏史、病情严重程度分级、分诊科室等。

图1-3 急诊分诊流程图

\r
考点提示:急诊分诊的方法和分诊分级内容。

3. 急诊处理 患者分诊之后应由分诊护士根据分诊结果,引导其到相关专科科室给予及时、合理的处置。对病情复杂难以确定科别者,按照首诊负责制处理。分诊级别并非一成不变,急诊处理过程中,随时注意患者病情变化,及时调整分级分区。

(1)危重患者:直接送入抢救室,根据情况启动急救绿色通道,先抢救后补办手续。在医生未到达前,护士可根据患者情况按抢救程序给予紧急处理,如给氧、吸痰、止血、建立静脉通道、气管插管、心肺复苏、除颤等,并随时观察病情变化。医生到达后,立即汇报处理情况,积极配合抢救。需要手术者,应通知手术室做好手术准备。

(2)一般患者:由专科急诊就诊处理,根据病情分别将患者送入专科病房、急诊留观室或带药离院。

(3) 传染病患者: 对于疑似患传染病患者, 应送入隔离室就诊, 确诊后转入传染科或传染病医院进一步治疗。严格实施隔离及终末消毒措施。

(4) 成批伤病员: 遇成批伤病员时, 应立即启动应急预案, 对患者进行快速检伤、分类, 合理分流, 并报告上级及有关部门。

(5) 涉及法律问题的患者: 预检分诊护士应及时通知急诊科主任、护士长、保卫科及医务处, 无论患者涉及何种法律问题, 均应一视同仁, 发挥人道主义精神积极抢救, 同时要做好保护工作。服毒患者, 需将其呕吐物、排泄物做毒物鉴定。神志不清者, 如有家属陪同, 则交给家属(在第三人见证下), 无家属陪同的患者, 应由两名以上工作人员清点清楚, 双人均需签字, 交由值班护士代为保管, 患者清醒或家属到来后归还。精神疾病或自杀患者, 应将其安排在设有软质墙面的防暴间, 防止患者自伤或伤害他人。

(6) 患者转运: 需辅助检查、急诊住院、转 ICU、急诊手术或转院者, 应至少有 1 名护士陪同, 转运前准备好转运途中必要的急救物资, 提前通知专业科室做好准备, 电梯处于备用状态。转运过程中护士应全程密切监测患者的生命体征、意识等, 协助患者取安全舒适体位, 有管道的患者需做好转运途中的管道护理。转运到达后与接收科室医护人员详细交接病情、安置患者, 交接无误后签字。\r
4. 记录 不同的医疗单位可能有不同的记录要求和格式,但基本要求是清晰、简单、客观。所有患者均应有分诊记录,经抢救的患者还应有详细的病历和抢救记录,包括进入抢救室的时间、抢救开始的时间、每次用药时间、药物名称、用药剂量、患者生命体征、病情变化情况、抢救结束时间等。因抢救未能及时记录的,应当在抢救结束后6h内补记。

(二)急诊护理应急预案

急诊护理应急预案是指为应对急危重症患者、批量伤(病)员等突发事件时,迅速、有序地开展及时有效的救治而预先制订的实施方案。应急预案的制订和有效实施能够最大限度保障患者的安全,把负面影响降到最低程度,保证急诊工作正常运行。

1. 常见类型 ①常见急症的应急预案,内容包括病情评估、急救处理措施以及处理流程,如心搏骤停、不稳定型心绞痛、休克、急性中毒、严重创伤的应急预案等。②突发事件(如停水、停电、患者跌倒、地震、消防紧急疏散患者等)的应急预案,内容包括请示报告、患者安全处理措施、评价与反馈等。③批量伤(病)员的应急预案,内容包括急救组织体系、人员与物资增援方案、检伤分流、急救绿色通道实施、各级各类人员的职责,以及应急预案的启动、运行、总结、反馈等,如重大交通事故、自然灾害、突发公共卫生事件等出现批量伤员的应急预案。

2. 应急准备 ①人员准备:根据应急预案的不同类型,合理调配人力资源,启动人员紧急替代机制,建立应急梯队;做好团队协作,特别是对批量伤(病)员,应根据人数及病情成立数个抢救小组,明确分工,各负其责。②物资准备:除急诊科正常使用的抢救物品、药品、器材外,另增备有隔离衣、手术衣、无菌手套、消毒剂等,由护士长负责检查保管,定期检查使其处于良好的备用状态。大量使用抢救药品、器材时,由医院突发性卫生事件指挥小组调配。③区域准备:区域的有效保障及合理划分,是应急预案顺利实施的保证。个体区域的准备,有利于重症患者监测及急救措施及时应用。整体区域的准备,可用颜色鲜艳的标识明确不同保护区的位置,按照患者病情的轻重缓急分区域安置,使相对有限的医疗资源得以最大化地有效应用,同时使应急工作有序、有效地进行。

3. 启动与运行 由院领导及各职能部门负责人、急诊科主任、科护士长、护士长以及各相关临床专科的专家等共同组成急救应急组织体系，各部门统一指挥，统筹安排，各司其职，密切协作，确保急救工作有序进行。

考点提示:急诊患者的护理。

目标检测

1. 急诊患者病情分级原则中,Ⅲ级患者为( )。

A. 急症 B. 危重 C. 亚急症

D. 濒危 E. 非急症

2. 一辆公交车行驶至某大桥时突然发生爆炸, 其中 29 位伤病员被送至急诊科, 值班护士应立即( )。

A. 准备外伤固定的器材

B. 为休克患者开放静脉通道

C. 将患者安置至抢救室

D. 分诊分区就诊

E. 报告护士长或总值班, 启动灾难批量伤(病)员的应急预案

3. PQRST 中的 Q 指的是( )。

A. 疼痛的诱因 B. 疼痛的性质 C. 疼痛放射情况

D. 疼痛的程度 E. 疼痛持续的时间

4. 下列有关急诊科布局的描述, 错误的是( )。

A. 急诊科要设置白天和夜间都醒目的标志

B. 急诊科各功能部门的布局应以减少交叉穿行、减少院内感染和节省时间为原则

C. 预检分诊台设在急诊科入口最醒目的位置

D. 急诊科抢救室应邻近急诊分诊台, 每张抢救床净使用面积 ⩾12m2

E. 创伤处置室应该紧靠外科诊室或与诊室成套间

(王春美 黄全华 秦抗洪)`,rawHtml:`<p>患者，男，62岁。30min前突然出现剧烈的心前区不适，由家人送至急诊科。自述胸口就像压了块大石头一样喘不过气，含服了硝酸甘油片，但没什么效果。患者既往有冠心病病史，无过敏史。查体：体温36.5℃，心率102次/分，呼吸20次/分，血压125/88mmHg， <img alt="" src="bookpicture/ds066854/ds0668540005-2-l.jpg" /> 95%。</p>\r
<p>请思考：</p>\r
<p>1. 作为急诊护士,对该患者从进入急诊科开始应如何处理?</p>\r
<p>2. 该患者预检分诊为几级？</p>\r
<p>一、急诊科的任务与布局</p>\r
<p>急诊科是医院提供急诊医疗服务的场所,是急救医疗服务体系的重要组成部分,是急危重症患者最集中、病种最多、抢救和管理任务最重的科室。急诊科不仅承担着组织抢救有生命危险的急诊患者,还承担着院前急救、突发公共事件患者的抢救工作,充分体现“时间就是生命”。急诊科工作可反映医院总体科学管理水平,直接体现了医院的医疗护理质量和人员的综合素质水平。</p>\r
<p>(一)急诊科的任务</p>\r
<p>1. 急诊 急诊科须 24h 应诊, 对前来就诊的病情紧急或遭受痛苦的各类患者及时诊治和处理。</p>\r
<p>2. 急救 组织人力、物力对急诊就诊和急救中心、基层医院等转送来的重症患者实施抢救工作。</p>\r
<p>3. 教学与培训 承担实习生、进修人员的教学任务,医院全体员工的急救技能培训工作以及大众急救知识的宣传和教育工作;建立和健全各级各类急诊人员的岗位职责、规章制度和技术操作规范。</p>\r
<p>4. 科研 积极开展有关急危重症救护方面的科研工作, 研究生命器官救治的新方法、新技术, 不断提高医疗救护水平。</p>\r
<p>5. 灾害事故的医疗救护 在自然灾害、事故灾难或突发公共卫生事件、社会安全事件等重大灾害事件发生时,做好充分的准备,有组织地进行意外灾害事故的医疗救护工作。</p>\r
<p>(二)急诊科的布局</p>\r
<p>急诊科应合理设置就诊区域,以方便患者就诊和抢救为原则,最大限度地利用急诊医疗资源,提高急诊工作效率和抢救成功率。</p>\r
<p>1. 急诊科总体布局</p>\r
<p>(1) 急诊科的位置及标志: 急诊科应设置在医院最显著的位置, 便于患者迅速到达, 且邻近各类辅助检查科室, 其区域面积应达到医院总面积的 3% 及以上。急诊科应设置白天和夜间都醒目的路标和标识, 以方便和引导患者就诊, 与手术室、重症医学科等院内紧急救治的绿色通道标识均应清楚明显。在急诊大厅设有急诊科各楼层的平面图。</p>\r
<p>(2)急诊科的平面布局:急诊科入口应通畅,设有无障碍通道,方便轮椅、平车出入,并设有救护车通道和专用停靠处。急诊科大厅应宽敞明亮,方便患者和家属做短暂候诊和停留。急诊科的各功能部门的布局应以减少交叉穿行、减少院内感染和节省时间为原则,预检分诊台、候诊室、各科诊室、抢救室、急诊重症监护室(EICU)、清创手术室、检验室、X线检查室、心电图室、药房以及挂号收费室等以一楼平面展开为宜。在规模较大的急诊科,可将输液室、观察室、隔离室、急诊病房、EICU、手术室以及其他功能检查部门设置在最邻近的楼层面。</p>\r
<p>2. 急诊科布局</p>\r
<p>(1) 医疗区: 包括预检分诊处(台)、抢救室、专科诊室、急诊观察室、急诊手术室、急诊清创室、洗胃室、急诊重症监护室、隔离室、治疗室和处置室等区域。</p>\r
<p>1)预检分诊处(台):是急诊患者就诊的第一站,应设在急诊科入口明显的位置。预检分诊护士一般由有多年急诊工作经验的护士担任,根据患者病情轻重缓急进行分级、登记并联系诊室医生救治,就诊记录可使用急诊临床信息系统。分诊处(台)应设有电话、对讲机、呼叫设备,以便及时与相关人员、科室取得联系;备齐常用的医疗检查器械,如血压计、听诊器、体温计、手电筒、压舌板等,以及患者就诊登记本等。另外,为方便患者,还应准备轮椅、平车、饮水设施及公用电话等,并配有导诊员。</p>\r
<p>2) 抢救室: 应邻近预检分诊台, 有足够的空间和充足的照明, 最好配备旋转式无影灯。设置一定数量的抢救床, 每床净使用面积不少于 15m<sup>2</sup> 。抢救室墙壁上应有心肺复苏、休克、创伤、中毒等重点病种的抢救流程。抢救室内应备有必需的仪器设备、药品和物品。①抢救仪器设备: 中心吸引装置、给氧设备、心电图机、除颤仪、心肺复苏仪、呼吸机、电动洗胃机、生命体征监测仪等。根据医院需求, 还可配备
血液净化、体外膜肺氧合和快速床旁检测设备。②常用的急救药品: 中枢神经兴奋药、拟肾上腺素药、强心药、抗心律失常药、血管扩张药、利尿药、止血药及常用的液体等。③必备抢救物品: 气管插管包、简易呼吸器、静脉切开包、胸穿包、腹穿包、导尿包、各种型号的无菌注射器、无菌手套、氧气装置、备皮用物、胃肠减压器、血压计、体温计、各种导管、开口器、压舌板等。</p>\r
<p>3) 专科急诊诊室: 一般综合性医院急诊科应设有内科、外科、妇产科、儿科、眼科、口腔科、耳鼻喉科等分科急诊诊室。外科诊室应设在靠近大门处, 以减少血迹污染; 小儿科应有独立急诊接诊区。传染病和肠道急诊均应有隔离区。在诊室内应根据各专科特点备齐急诊需用的各种器械和抢救用品。</p>\r
<p>4) 急诊观察室: 用于收治需要在急诊临时观察的患者, 如暂时不能确诊、病情有危险的患者。观察室床位数按照医院承担的医疗任务和急诊量设置。室内设备、护理工作程序与普通病房相似。患者留观时间原则上不超过 72h。</p>\r
<p>5) 急诊手术室: 位置应与抢救室、外科诊室相邻, 室内应设置手术床、手术包、手术器械及必要的麻醉、消毒、抢救设备。</p>\r
<p>6) 急诊清创室: 位置靠近外科诊室或与外科诊室成套间, 外伤患者可在清创室进行清创、缝合、换药等处理。应配备无菌物品柜, 柜内放置开展外伤清创缝合及急诊小手术的器械及物品。</p>\r

<p>7) 洗胃室: 有条件的医院应设有单独的洗胃室, 用于中毒患者洗胃、急救。配备常用的洗胃用品, 如胃管、听诊器、压舌板、开口器、洗胃液等, 还应配备自动洗胃机 2 台, 以备发生故障时能替换使用。</p>\r
<p>8) 急诊重症监护室: 主要收治中毒、休克、严重创伤、急性心力衰竭、急性呼吸衰竭等急危重症患者, 位置最好邻近急诊抢救室。室内配备监护仪、除颤起搏器、呼吸机、心电图机、供氧装置和负压吸引装置等设备, 以随时掌握患者的病情及生命体征变化。</p>\r
<p>9) 隔离室: 对有疑似传染病的患者, 预检分诊护士应安排其到隔离室进行诊治。室内配有专用卫生间以及必要的隔离用品与物品。凡确诊为传染病的患者, 应就地隔离, 及时转入传染病科或传染病院诊治。</p>\r
<p>10) 治疗室和处置室: 急诊科应有独立的治疗室和处置室, 治疗室应在各科诊室的中央, 室内应有治疗桌、配液台、无菌物品柜、消毒用品、洗手池及照明设备等, 用于各项治疗前以及输液前的准备。处置室主要用于对使用后的医疗物品的集中处理。</p>\r
<p>(2) 支持区: 包括急诊医技部门、辅助及支持部门等, 做到在急诊科即可完成基本的辅助检查与处置。</p>\r
<p>1) 急诊医技部门: 包括急诊药房、急诊检验室、急诊放射科、心电图室、急诊超声室、急诊 CT 室等，有条件的医院可设置心肺功能检查室、胃镜检查室等部门。</p>\r
<p>2）辅助及支持部门：包括急诊挂号处、急诊收费处、保安室等部门。</p>\r
<p>(三)急救绿色通道</p>\r
<p>急救绿色通道即急救绿色生命安全通道,是指对急危重症患者在分诊、诊疗、检查、治疗、手术及住院等环节上,实施快速、有序、安全、有效的急救服务。急救绿色通道的建立是救治危重症患者最有效的机制,能有效缩短救治时间,降低伤残率和病死率,提高救治成功率和生存质量。</p>\r
<p>1. 进入急救绿色通道的患者范围 原则上所有生命体征不稳定和可能危及生命的各类急危重症患者均应纳入急救绿色通道,包括但不限于以下急诊患者:①心搏骤停、休克、昏迷、严重心律失常、急性器官功能衰竭的患者等。②批量患者,如外伤、中毒等患者。</p>\r
<p>考点提示:急救绿色通道的概念。</p>\r
<p>2. 急救绿色通道的管理</p>\r
<p>(1)标志醒目:急诊科各部门应有明显标志,在药房、收费窗口、化验室等部门应设有绿色通道患者专用窗口。</p>\r
<p>(2) 合理配置: 合理配置急诊人力资源, 各环节 24h 有值班人员。定期开展急救技术培训, 实行合格上岗制度。急救设备和药品的配置应符合《急诊科建设与管理指南(试行)》的基本要求。</p>\r
<p>(3) 正确分诊: 加强急诊预检分诊, 及时救治急危重症患者, 有效分流非急危重症患者。</p>\r
<p>(4)首诊负责制:包括医院、科室、医生三级。首诊负责制是指第一位接诊医生对其接诊患者,特别是急危重症患者的检查、诊断、治疗、会诊、转诊、转科、转院等工作负责到底的制度。</p>\r
<p>(5)分区救治:实施急诊分区救治,建立住院和手术的“急救绿色通道”,建立创伤、急性心肌梗死、脑卒中、急性呼吸衰竭等重点病种的急诊服务流程与规范,需紧急抢救的危重患者可先抢救后付费,保障患者获得连贯医疗服务。</p>\r
<p>(6) 定期评价: 定期评价对紧急事件处理的反应性, 急危重症患者在“急救绿色通道”停留的时间, 做好持续的质量改进。</p>\r
<p>(7) 规范运行: 急诊医生根据患者的病情或符合急救绿色通道范围的患者, 决定启动急救绿色通道服务, 可在患者的处方、检查申请单等医学文件上标明“急救绿色通道”的标志, 执行先抢救后付费的原则。急诊服务流程体系中的每一个责任部门(包括急诊科、各专科诊室、各医技检查部门、药剂科以及挂号与收费等)各司其职, 确保患者能够获得连贯、及时、有效的救治。</p>\r
<p>二、急诊护理管理</p>\r
<p>(一)急诊科的护理人员管理</p>\r
<p>1. 急诊科护理人员配备 急诊科应有固定的人员编制，且不少于在岗护士的 80% ，护士结构梯队合理，有3年以上临床护理工作经验，具有本科及以上学历的护士比例应达到 30% 以上。三级综合医院急诊科护士长应当由具备主管护师以上任职资格和2年以上急诊临床护理工作经验的护士担任。二级综合医院急诊科护士长应当由具备护师以上任职资格和1年以上急诊临床护理工作经验的护士担任。</p>\r
<p>2. 急诊科护理人员的素质要求</p>\r
<p>(1) 具有高尚的职业道德: 对患者应具有高度的责任感和同情心, 急患者之所急, 全力以赴地抢救患者的生命; 应尊重患者自尊、保守秘密, 在抢救中涉及特殊的病史与病症(如自杀史、传染病史), 应注意保护患者隐私, 不可四处宣扬; 遵循慎独精神, 严于律己, 主动做好消毒、隔离, 预防医源性交叉感染。</p>\r
<p>(2)具备坚强的毅力、稳定的心理素质:能沉着冷静、准确迅速地完成抢救工作。</p>\r
<p>(3) 具有扎实的业务基础: 经规范化培训合格, 掌握急危重症患者的急救护理技术、常见急救操作技术的配合及急诊护理工作内涵与流程。</p>\r
<p>(4)具备一定的管理能力:遇有重大抢救任务时,能组织、协调好各有关科室部门之间的关系,保证参与的人员、设备及药物准确无误地投入抢救实施中。</p>\r
<p>(5) 具有良好的身体素质: 急救护士只有拥有强健的体魄, 能吃苦耐劳, 才能胜任急诊科繁忙而紧张的急救护理工作。</p>\r
<p>(二)急诊科的护理管理制度</p>\r
<p>急诊科应严格执行《全国医院工作条例》中有关急诊方面的各项规章制度，并根据其中有关制度的要求结合急诊科工作实际制订适合本部门急诊工作的制度及有关规定。同时，制订切实可行的急救程序，各项急诊技术操作规程、质量标准和相关急救预案，制订各项急诊工作制度、急诊值班制度、出诊抢救制度、急诊查房制度、疑难与死亡病例讨论制度、消毒隔离制度、医疗设备仪器管理制度、出诊抢救和重大突发事件呈报制度等，使工作规范、有章可循。</p>\r

<p>(三)急诊护理工作质量管理</p>\r
<p>1. 提高分诊符合率 分诊护士一般由受过专业培训或有3年以上急诊临床护理工作经验的护士担任。分诊时间为2~5min，分诊符合率大于90%，能够有预见性地发现问题，能发现危及生命的指征，使危重患者能够得到优先处置。合理安排就诊顺序，及时化解、处理护理纠纷。</p>\r
<p>2. 提高危重患者抢救成功率 护理人员应严格落实各项救护规章制度,尤其是首诊负责制,使急诊服务及时、安全、便捷、有效。熟练掌握创伤、急性心肌梗死、心力衰竭、脑卒中、中毒等常规抢救流程,能熟练操作开放气道、心肺脑复苏术、心脏电复律术、机械通气术、洗胃术等急诊专科技术,在医生未到达前,能按照抢救流程及时、正确地抢救患者,提高危重症患者抢救成功率。在抢救过程中能有意识地做好感染预防及控制,一旦发生职业暴露,及时正确处理。</p>\r
<p>3. 完善急救物品管理 各种抢救药品、物品要实行“六定”，即
定点放置、定人保管、定时保养和维修、定时检查、定量供应、定期消毒，随时处于备用状态。设备、药品完好率100%且在有效期内，保证足够电量，用后立即补充、补齐用物和药物。每周检查仪器设备功能及保养清洁，并记录在册。仪器设备需配有清晰明确的操作流程标示牌。急诊医护人员能够熟练掌握、正确使用各种抢救设备。原则上急救仪器不得轻易外借，以备急需。</p>\r
<p>4. 规范文书记录 护理文件书写要求规范、及时、完整、准确，护理记录要与医嘱、病程记录相符。抢救患者需要详细记录就诊时间、抢救时间、每次用药时间、药物名称、用药剂量、患者病情变化情况。未能及时记录的，有关医务人员应当在抢救结束后6h内据实补记。</p>\r
<p>三、急诊护理工作</p>\r
<p>(一)急诊护理工作流程</p>\r
<p>科学、高效的急诊护理工作流程是提高急诊护理工作质量和工作效率的重要保障，主要包括接诊、分诊、急诊处理、记录等环节，这些环节紧密衔接，构成了急诊护理工作流程的基本程序。</p>\r
<p>1. 接诊 是指医护人员以最短的时间、最熟练的健康评估技巧,对到达医院的急诊患者的病情作出较为准确的判断。预检分诊护理人员对到达急诊科的患者要热情接待,将患者快速接诊到位。一般急诊患者可直接到分诊台,当危重症患者就诊时,分诊护士需根据患者病情需要准备轮椅或平车,到门口或救护车前接诊,并协助患者取合适体位。</p>\r
<p>2.分诊 是指对到达急诊科的患者，分诊护士迅速对患者的病情作出一个较明确的判断，得出分诊级别，按照不同等级安排患者就诊先后顺序及就诊区域的过程，目的是合理分配医疗资源,使危重症患者能够得到优先救治。自患者进入急诊科开始到完成分诊,时间应控制在2~5min。分诊主要包括接诊问诊、分诊评估、分区分级与分流、分诊记录等程序。</p>\r
<p>(1) 接诊问诊: 通过问诊得到患者的主诉, 了解患者就诊的主要原因, 围绕主诉有针对性地询问相关问题, 并注意识别倾向性的表述, 使收集的资料真实全面。临床上常用以下公式进行问诊。</p>\r
<p>1) AMPLE 公式: 主要用于创伤患者创伤机制的评估。5 个字母各代表一项问诊内容, 其中, A (allergies) 为过敏史; M (medications currently used) 指当前用药情况; P (past illness) 指相关病史; L (last meal) 是最后进食时间; E (event/environment related to the injury) 指与创伤相关的事件或环境。</p>\r
<p>2) OLDCART 公式: 用于评估各种不适症状。其中, O(onset) 指发病时间, 即“何时感到不舒服”; L(location) 为部位, 即“哪儿感到不舒服”; D(duration) 是持续时间, 即“不舒服多长时间了”; C(characteristic) 是不适特点, 即“怎样不舒服”; A(aggravating factor) 为加重因素, 即“是什么引起不舒服的”; R(relieving factor) 指缓解因素, 即“有什么可减轻不舒服”; T(treatment prior) 指来诊前治疗, 即“有没有服过药或接受过治疗”。</p>\r
<p>3) PQRST 公式: 适用于疼痛患者的评估。PQRST 的 5 个字母刚好与心电图波形字母顺序相符, 其中, P(provoke) 指疼痛发生的诱因及加重与缓解的因素; Q(quality) 是疼痛的性质, 如绞痛、钝痛、电击样痛、刀割样痛、针刺样痛、烧灼样痛等; R(radiation) 指有无放射痛, 疼痛向哪些部位放射; S(severity) 指疼痛的程度如何, 若把从无痛到不能忍受的疼痛用 1~10 的数字来分级, 相当于哪个数的程度; T(time) 指疼痛开始、持续、终止的时间。</p>\r
<p>(2) 分诊评估: 一般与问诊同步进行, 护士用眼、耳、鼻、手感官或借助于简单的检查工具和仪器来检查患者的体征, 包括用眼睛观察患者的一般情况, 如意识、神态、面容表情、步态行为、语言、肤色、体位、瞳孔有无特殊改变; 观察排泄物、呕吐物和分泌物有无异常。用耳朵听患者身体的不同部位发出的声音, 如呼吸音、肠鸣音、咳嗽音等的变化。用鼻辨别患者身体发出的特殊气味, 如大蒜味、烂苹果味、氨味等。用手触摸脉搏了解心律、心率及血管充盈情况, 触摸疼痛部位了解疼痛范围、程度、皮肤温度以及触摸时是否有不舒服。借助听诊器、血压计、体温计、心电监护仪等工具或仪器获取患者的生命体征, 包括血压、脉搏、体温、呼吸、血氧饱和度、意识程度等。</p>\r
<p>(3) 分区分级与分流: 根据患者的主观和客观资料, 进行分诊分级, 按
照分诊分级结果, 安排患者到相应区域或专科就诊。</p>\r
<p>按照患者病情的严重程度,患者可分成四级:①Ⅰ级为濒危患者,指正在或即将发生生命威胁或病情恶化的患者,如心搏呼吸骤停患者、急性意识障碍患者、气道不能维持患者、明确心肌梗死患者、重度创伤大出血患者。该级别响应时间为即刻。②Ⅱ级为危重患者,指病情危重或有可能急剧恶化,短时间内有可能进展至Ⅰ级,如急性脑卒中患者、严重骨折患者、主动脉夹层患者等。该级别响应时间为小于10min。③Ⅲ级为急症患者,有急性症状和急诊问题,但生命体征尚稳定,目前明确没有危及生命或致残危险,如高热、呕吐、轻度外伤、轻度腹痛等。该级别响应时间为小于30min。④Ⅳ级为非急症患者,目前无急性发病症状,如轻、中度发热。该级别响应时间为小于240min。</p>\r

<p>从功能结构上,急诊科分成三大区域:①红区,即抢救监护区,配备完善的紧急抢救资源,适用于Ⅰ级和Ⅱ级患者诊治。②黄区,即密切观察诊疗区,配备常规的生命体征检查以及基本诊疗器械设备,适用于Ⅲ级患者诊治。处置后还需定时巡视,一旦病情恶化,立即送入红区。③绿区,即快速处置区,适用于Ⅳ级患者诊治。</p>\r
<p>急诊实行“三区四级”，按照病情轻重缓急确定优先就诊顺序，以保障急诊患者医疗安全（图1-3）。</p>\r
<p>(4) 分诊记录: 目前大部分医院均采用了智能化预检分诊系统进行登记, 登记内容包括患者到达急诊的日期与时间、入院方式、分诊时间、年龄、性别、主诉、生命体征、过敏史、病情严重程度分级、分诊科室等。</p>\r
<p style="text-align: center;">图1-3 急诊分诊流程图</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540005-4-l.jpg" /><figcaption></figcaption></figure>\r
<p>考点提示:急诊分诊的方法和分诊分级内容。</p>\r
<p>3. 急诊处理 患者分诊之后应由分诊护士根据分诊结果,引导其到相关专科科室给予及时、合理的处置。对病情复杂难以确定科别者,按照首诊负责制处理。分诊级别并非一成不变,急诊处理过程中,随时注意患者病情变化,及时调整分级分区。</p>\r
<p>(1)危重患者:直接送入抢救室,根据情况启动急救绿色通道,先抢救后补办手续。在医生未到达前,护士可根据患者情况按抢救程序给予紧急处理,如给氧、吸痰、止血、建立静脉通道、气管插管、心肺复苏、除颤等,并随时观察病情变化。医生到达后,立即汇报处理情况,积极配合抢救。需要手术者,应通知手术室做好手术准备。</p>\r
<p>(2)一般患者:由专科急诊就诊处理,根据病情分别将患者送入专科病房、急诊留观室或带药离院。</p>\r
<p>(3) 传染病患者: 对于疑似患传染病患者, 应送入隔离室就诊, 确诊后转入传染科或传染病医院进一步治疗。严格实施隔离及终末消毒措施。</p>\r
<p>(4) 成批伤病员: 遇成批伤病员时, 应立即启动应急预案, 对患者进行快速检伤、分类, 合理分流, 并报告上级及有关部门。</p>\r
<p>(5) 涉及法律问题的患者: 预检分诊护士应及时通知急诊科主任、护士长、保卫科及医务处, 无论患者涉及何种法律问题, 均应一视同仁, 发挥人道主义精神积极抢救, 同时要做好保护工作。服毒患者, 需将其呕吐物、排泄物做毒物鉴定。神志不清者, 如有家属陪同, 则交给家属(在第三人见证下), 无家属陪同的患者, 应由两名以上工作人员清点清楚, 双人均需签字, 交由值班护士代为保管, 患者清醒或家属到来后归还。精神疾病或自杀患者, 应将其安排在设有软质墙面的防暴间, 防止患者自伤或伤害他人。</p>\r
<p>(6) 患者转运: 需辅助检查、急诊住院、转 ICU、急诊手术或转院者, 应至少有 1 名护士陪同, 转运前准备好转运途中必要的急救物资, 提前通知专业科室做好准备, 电梯处于备用状态。转运过程中护士应全程密切监测患者的生命体征、意识等, 协助患者取安全舒适体位, 有管道的患者需做好转运途中的管道护理。转运到达后与接收科室医护人员详细交接病情、安置患者, 交接无误后签字。<
/p>\r
<p>4. 记录 不同的医疗单位可能有不同的记录要求和格式,但基本要求是清晰、简单、客观。所有患者均应有分诊记录,经抢救的患者还应有详细的病历和抢救记录,包括进入抢救室的时间、抢救开始的时间、每次用药时间、药物名称、用药剂量、患者生命体征、病情变化情况、抢救结束时间等。因抢救未能及时记录的,应当在抢救结束后6h内补记。</p>\r
<p>(二)急诊护理应急预案</p>\r
<p>急诊护理应急预案是指为应对急危重症患者、批量伤(病)员等突发事件时,迅速、有序地开展及时有效的救治而预先制订的实施方案。应急预案的制订和有效实施能够最大限度保障患者的安全,把负面影响降到最低程度,保证急诊工作正常运行。</p>\r
<p>1. 常见类型 ①常见急症的应急预案,内容包括病情评估、急救处理措施以及处理流程,如心搏骤停、不稳定型心绞痛、休克、急性中毒、严重创伤的应急预案等。②突发事件(如停水、停电、患者跌倒、地震、消防紧急疏散患者等)的应急预案,内容包括请示报告、患者安全处理措施、评价与反馈等。③批量伤(病)员的应急预案,内容包括急救组织体系、人员与物资增援方案、检伤分流、急救绿色通道实施、各级各类人员的职责,以及应急预案的启动、运行、总结、反馈等,如重大交通事故、自然灾害、突发公共卫生事件等出现批量伤员的应急预案。</p>\r
<p>2. 应急准备 ①人员准备:根据应急预案的不同类型,合理调配人力资源,启动人员紧急替代机制,建立应急梯队;做好团队协作,特别是对批量伤(病)员,应根据人数及病情成立数个抢救小组,明确分工,各负其责。②物资准备:除急诊科正常使用的抢救物品、药品、器材外,另增备有隔离衣、手术衣、无菌手套、消毒剂等,由护士长负责检查保管,定期检查使其处于良好的备用状态。大量使用抢救药品、器材时,由医院突发性卫生事件指挥小组调配。③区域准备:区域的有效保障及合理划分,是应急预案顺利实施的保证。个体区域的准备,有利于重症患者监测及急救措施及时应用。整体区域的准备,可用颜色鲜艳的标识明确不同保护区的位置,按照患者病情的轻重缓急分区域安置,使相对有限的医疗资源得以最大化地有效应用,同时使应急工作有序、有效地进行。</p>\r
<p>3. 启动与运行 由院领导及各职能部门负责人、急诊科主任、科护士长、护士长以及各相关临床专科的专家等共同组成急救应急组织体系，各部门统一指挥，统筹安排，各司其职，密切协作，确保急救工作有序进行。</p>\r
<p>考点提示:急诊患者的护理。</p>\r
<p>目标检测</p>\r
<p>1. 急诊患者病情分级原则中,Ⅲ级患者为( )。</p>\r
<p>A. 急症 B. 危重 C. 亚急症</p>\r
<p>D. 濒危 E. 非急症</p>\r
<p>2. 一辆公交车行驶至某大桥时突然发生爆炸, 其中 29 位伤病员被送至急诊科, 值班护士应立即( )。</p>\r
<p>A. 准备外伤固定的器材</p>\r
<p>B. 为休克患者开放静脉通道</p>\r
<p>C. 将患者安置至抢救室</p>\r
<p>D. 分诊分区就诊</p>\r
<p>E. 报告护士长或总值班, 启动灾难批量伤(病)员的应急预案</p>\r
<p>3. PQRST 中的 Q 指的是( )。</p>\r
<p>A. 疼痛的诱因 B. 疼痛的性质 C. 疼痛放射情况</p>\r
<p>D. 疼痛的程度 E. 疼痛持续的时间</p>\r
<p>4. 下列有关急诊科布局的描述, 错误的是( )。</p>\r
<p>A. 急诊科要设置白天和夜间都醒目的标志</p>\r
<p>B. 急诊科各功能部门的布局应以减少交叉穿行、减少院内感染和节省时间为原则</p>\r
<p>C. 预检分诊台设在急诊科入口最醒目的位置</p>\r
<p>D. 急诊科抢救室应邻近急诊分诊台, 每张抢救床净使用面积 ⩾12m<sup>2</sup></p>\r
<p>E. 创伤处置室应该紧靠外科诊室或与诊室成套间</p>\r
<p>(王春美 黄全华 秦抗洪)</p>\r
`},{id:"module2-task5",title:"第五节 重症监护",order:5,rawContent:`案例导学

陈某，男，45岁。电击伤后2日，由急诊科转入ICU。患者右手掌有大面积电灼伤伤口，渗液严重，患者呈昏迷状态。

请思
考：

1. 什么是 ICU?

2. 作为 ICU 护士, 如何接收该患者? 如何对该患者进行监护?

重症监护病房是集中各有关专业知识、技术的医护人员和先进医疗仪器设备，运用现代医疗护理技术对危重患者的生理功能进行连续性监测和积极治疗，以及提高危重患者的抢救成功率，降低病死率或伤残率的专门单位或管理单元。重症监护病房集中诊疗与管理危重患者，具有设备和技术先进、监测全面细致、治疗及时、针对性强、医疗护理水平和工作效率高等特点。重症监护病房是现代化医院的重要组成部分。近年来，重症医学迅猛发展，ICU精密的监护仪器设备、医护人员的专业水平及临床科学实践，已成为衡量一个国家或地区医院现代化急救医疗水平的重要指标。

一、重症监护病房

(一)ICU 设置的基本要求

(1)我国三级医院和有条件的二级医院均应设立重症医学科。重症医学科属于临床独立学科，由直属医院职能部门直接领导。ICU是重症医学学科的临床基地。

(2) ICU 必须配备足够数量受过专门训练、掌握重症医学基础知识和基本操作技术、具备独立工作能力的专职医护人员。

(3) ICU 必须配置必要的监护和治疗设备, 接收医院各科的重症患者。

(二)ICU 的分类

重症监护病房根据收治患者专业范围不同,可分为专科重症监护病房、综合重症监护病房、部分综合重症监护病房三种类型。

1. 专科重症监护病房 是指某专科范围内建立的加强监护病房,专门收治某一专业范围内的危重患者。如冠心病监护病房(cardiac care unit, CCU)、呼吸监护病房(respiratory care unit, RICU)等。

2. 综合重症监护病房 是在专科重症监护病房基础上发展起来的一种跨学科、面向全院的监护病房,其任务是收治多学科危重患者,监护和支持各脏器功能为其主要工作内容。

3. 部分综合重症监护病房 是指多个邻近专科联合建立的重症监护病房,如外科重症监护病房,主要收治外科各专科术后的危重患者,这些患者除了专科的特点外,还具有外科手术后的共性。

国内 ICU 的发展仍以综合 ICU 和专科 ICU 为主,但 ICU 的专业化已成为发展趋势。

(三)ICU 的位置

综合 ICU 因患者来源于各大专科,跨科病种十分多见,ICU 的位置应与患者来源最多的科室相邻近,以缩短危重患者的转运时间。专科 ICU 则应设立在各个专科病区内。另外,ICU 还应与化验室、血库、手术室、急诊室、放射科和电梯相邻近。ICU 应具备良好的通风、采光条件,有条件者最好装配气流方向从上到下的空气净化系统,能独立控制室内的温度和湿度,一般室温要求保持在 22 ~ 24℃,湿度以 60% ~ 70% 为宜。每个单间的空气调节系统应独立控制。安装足够的感应式洗手设施和手部消毒装置，单间每床1套，开放式病床至少每2床1套。

(四) 床位要求

(1) ICU 内应配备适合 ICU 使用的病床, 以及防压疮床垫。每张床的占地面积比普通病室要大, 每张床占地不小于 15m2 , 床位间隔大于 1m, 保证能容下各种监护仪, 便于医生、护士床旁操作。病床应易于推动, 以能使患者有多种卧位的多功能病床为佳。床位使用率为 75%, ICU 床位数要根据医院总的床位数或某一部分或病区有多少患者需要监护来确定。一般综合医院 ICU 病床数应占医院总床位数的 2%~8%。

(2) 每床配备完善的功能设备带或功能架, 提供电、氧气、压缩空气和负压吸引等功能支持。每张监护病床装配电源插座 12 个以上、氧气接口 2 个以上、压缩空气接口 2 个和负压吸引接口 2 个以上。医疗用电和生活照明用电线路分开, 每个 ICU 床位的电源应由独立的反馈电路供应。ICU 最好有备用的不间断供电系统 (UPS) 和漏电保护装置, 最好每个电路插座都在主面板上有独立的电路短路器。

(3) 每床配备床旁监护系统, 进行心电、血压、脉搏、血氧饱和度、有创压力等基本生命体征监护。为便于安全转运患者, 每个 ICU 单元至少配备便携式监护仪 1 台。

(4) 三级医院的 ICU 应每床配备 1 台呼吸机, 二级医院的 ICU 可根据实际需要配备适当数量的呼吸机。每床应配备简易呼吸器。为便于安全转运患者, 每个 ICU 单元至少应配备便携式呼吸机 1 台。

(5) 每床均应配备输液泵和微量注射泵, 其中微量注射泵每床 2 套以上, 另配备一定数量的肠内营养输注泵。

(五) 监护设备

1. 中心监护站 要求在护士站就能直接观察到所有病床,护士站应有中心监测显示仪、电子计算机、病历柜(内有各种监护记录本)、药物储存柜、联系电话等。

2. 计算机网络监护系统 根据情况选择由 6～10 台床边监护仪组成的网络监护系统, 中心监护台通常置于护士中心监护站, 床边监护仪应安装在墙壁的适当位置, 既利于护士操作、观察, 又保证患者不易碰及。

3. 闭路电视监控系统 中心监护站尽可能安装较大的屏幕显示器,各病室内安装转式搜寻器,可同时监控多个患者,以利于全面观察、护理。

4. 仪器设备 除上述普通病室所备仪器之外, ICU 尚需配备多功能监护仪、呼吸机、除颤器、起搏器、心肺复苏机、输液泵、心电图机、床边 X 线机、血气分析仪, 以保证顺利完成各种监护及抢救任务。

(六)辅助区域

ICU 的基本辅助用房包括医生办公室、主任办公室、工作人员休息室、中央工作站、治疗室、配药室、仪器室、更衣室、清洁室、污废物处理室、值班室、盥洗室等。有条件的 ICU 可配置其他辅助用房，包括示教室、家属接待室、实验室、营养准备室等。辅助用房面积与病房面积之比应达到 1.5:1 以上。

(七) 设计原则

ICU 要有合理的包括人员流动和物流在内的医疗流向,最好通过不同的进、出通道实现,以最大限度减少各种干扰和交叉感染。ICU 的设计要求应该满足提供医护人员便利的观察条件和在必要时尽快接触患者的通道。ICU 建筑装饰必须遵循不产尘、不积尘、耐腐蚀、防潮防霉、防静电、容易清洁和符合防火要求的总原则。

(八) 噪声

除了患者的呼叫信号、监护仪器的报警声外，电话铃声、打印机等仪器发出的声音等均属于ICU的噪声。在不影响正常工作的情况下，这些声音应尽可能减少到最低水平。根据国际噪音协会的建议，ICU的噪声最好不要超过白天45dB、傍晚40dB、夜晚20dB。地面覆盖物、墙壁和天花板应尽量采用高吸音的建筑材料。

(九)ICU 的人员配备

(1) ICU 专科医生的固定编制人数与床位数之比为(1 ~ 2):1以上。ICU 日常工作中可有部分轮科、进修医生。ICU 医生组成应包括高级、中级和初级医生,每个管理单元必须至少配备一名具有高级职称的医生全面负责医疗工作。

(2) ICU 专科护士的固定编制人数与床位数之比为(3~4):1。

(3) ICU 可以根据需要配备适当数量的医疗辅助人员,有条件的医院可配备相关的技术与维修人员。

(4) ICU 护士必须经过严格的专业培训,熟练掌握重症护理基本理论和技能,经过专科考核合格后,才能独立上岗。

(十)ICU 的工作制度

制订各种规章制度是保证 ICU 工作正常、有序进行的基本保障。除一般病房的护理常规和工作制度外，还应包括 ICU 护理常规、ICU 出入制度、ICU 护理管理制度、突发事件的应急预案、人员紧急召集制度、岗位人才培养制度等。

(十一) 监护的分级制度

监护的实施应根据患者的具体情况有选择性地进行,否则会造成不必要的浪费,甚至给患者带来不利影响。临床上根据病情危重程度不同,监护的级别分为三级。

1. 一级监护 适用于重要器官功能衰竭,随时有生命危险者。一级监护内容包括连续心电监护,每2~4h检测CVP,每8h检测心排血量,每小时检测呼吸频率,每4~6h检测动脉血气分析,记录每小时、每12h、每24h尿量,每日检测尿比重,每4~6h总结出入量,每12h检测血糖、血浆渗透压、血细胞比容,每日查血、尿常规,每4~6h测体温。

2. 二级监护 适用于两个以上重要器官功能不全,生命体征相对稳定者。二级监护内容包括连续心电监护,每1~2h测血压,每2~4h测CVP,每小时测呼吸频率,每8h检
测动脉血气分析,记录每小时及24h尿量,每日检测尿比重,每8h总结出入量,每8h测体温,每日查血常规、尿常规、血糖、血浆渗透压、血细胞比容。

3. 三级监护 适用于单个重要器官功能不全,生命体征稳定者。三级监护内容包括连续心电监护,每1~2h测血压,每1~2h测呼吸频率,每日检测动脉血气分析,记录24h尿量、24h出入量,每8h测体温,每日查血常规、尿常规、血糖、血浆渗透压、血细胞比容。

考点提示:ICU 设置和三级监护。

二、ICU 感染的预防与控制

(一) 感染部位

ICU 医院内感染一般以下呼吸道、泌尿道和腹部感染最常见。不同的 ICU 其发病率可不同，感染部位也可不同。如外科 ICU 感染率高于内科 ICU，以泌尿道、手术部位、呼吸系统、血液感染居多，而内科 ICU 中以呼吸系统、泌尿道、血液感染最常见。

(二)ICU 医院内感染的类型和危险因素

1. ICU 医院内感染的类型

(1) 内源性感染: 又称自身感染, 是 ICU 患者自身存在的细菌引起的感染。这些细菌包括患者本身存在的正常菌群及定植菌。

(2) 外源性感染: 又称交叉感染, 通常是指病原体来自患者体外, 如其他患者或医院中工作人员、医院环境中存在的细菌，以及未彻底消毒灭菌或污染的医疗器械、血液、血液制品及生物制品等。

(3)母婴感染:是指在分娩过程中胎儿经胎盘或产道所发生的感染。

2. ICU 医院内感染的危险因素 主要危险因素是机体免疫功能低下者、高龄患者和婴幼儿、介入性诊疗操作、抗菌药物的不合理应用、空气、医护人员手及物体表面被污染，血、血制品、药品污染，医用器材被污染等。

(三)ICU 医院内感染的控制措施

根据《中国重症监护病房(ICU)医院感染管理指南》,ICU感染控制措施包括以下几个方面。

1. 工作人员管理 接触特殊患者如抗甲氧西林金黄色葡萄球菌(MRSA)感染或携带者,或处置患者可能有血液、体液、分泌物、排泄物喷溅时,应穿隔离衣或防护围裙。接触有或可能有传染性的呼吸道感染患者时,或有体液喷溅可能时,应戴一次性外科口罩;接触疑似为高传染性的感染(如禽流感、SARS等)患者,应戴N95口罩。当口罩潮湿或有污染时应立即更换。无菌操作或可能会有体液喷溅时,须戴帽子。接触黏膜和非完整皮肤或进行无菌操作时,须戴无菌手套。

2. 患者管理 应将感染与非感染患者分开安置。对疑似有传染性的特殊感染或重症感染患者，应隔离于单独房间；对于空气传播的感染，如开放性肺结核，应隔离于负压病房；对 MRSA、泛耐药鲍曼不动杆菌等感染或携带者，尽量隔离于单独房间，并有醒目的标识，如房间不足，可以将同类耐药菌感染或携带者集中安置；接受器官移植等免疫功能明显受损患者，应安置于正压病房。医务人员不可同时照顾正、负压隔离室内的患者。

3. 探视管理 ICU 内无家属陪住。患者进入 ICU 后, 家属可留下电话号码, 以便于有情况时随时可与家属联系。设计现代化的 ICU, 其外常有一圈玻璃窗与走廊, 在家属休息室有闭路电视可以观察 ICU 内患者情况, 因而可减少因探视给 ICU 带来污染及对正常医护工作的干扰。

4. 建筑布局和相关设施的管理 放置病床的医疗区域、医疗辅助用房区域、污物处理区域和医务人员生活辅助用房区域等，应相对独立；配备足够的手卫生消毒设施。医疗区域包括单人房间，必须设置洗手池。采用脚踏式、“肘式”或感应式等非手接触式水龙头开关，并配备擦手纸和手套。每张病床旁须放置手部消毒装置1套。

5. 医疗操作流程管理 留置深静脉导管置管时遵守最大限度的无菌操作要求。更换穿刺点敷料的间隔时间，建议无菌纱布为2天、专用贴膜可达5~7天，但敷料出现潮湿、松动时应更换。尽量避免不必要的留置导尿管，插管时应严格无菌操作，动作轻柔，减少黏膜损伤。严格掌握气管插管或气管切开的适应证。使用呼吸机辅助呼吸的患者应优先考虑无创通气。对气管插管者，吸痰时应严格执行无菌操作。呼吸机螺纹
管每周更换2次，有明显分泌物污染时应及时更换。湿化器添加的水须使用无菌水并每天更换。

6. 物品管理 诊疗、护理患者过程中所使用的非一次性物品（如监护仪、输液泵、微量注射泵、听诊器、血压计、氧气流量表、心电图机等），尤其是频繁接触的物体表面（如仪器的按钮、操作面板），应每天仔细消毒擦拭，建议用75%酒精消毒。床上用品（如床单、被服）应勤换，如有血迹、体液或排泄物等污染，应及时更换。枕芯、被褥等使用时应防止体液浸湿污染；便盆、尿壶等应专人专用，每天消毒。

7. 环境管理 开窗通风、机械通风是保持 ICU 内空气流通、降低空气微生物密度的最好方法；禁止在室内摆放干花、鲜花或盆栽植物；不宜在室内及走廊铺设地毯。

8. 抗菌药物管理 安全、合理使用抗生素及消毒剂, 慎用广谱抗生素, 防止菌群失调, 必须要用时, 应行细菌培养及药物敏感试验以指导用药。

9. 废物与排泄物管理 处理废物与排泄物时医务人员应做好自我防护,防止体液接触暴露和锐器伤;应有完善的污水处理系统;垃圾分类处理;患者的尿液、粪便、分泌物和排泄物应倒入患者的厕所或专门的洗涤池内。

三、ICU的护理工作程序

(一)接诊

ICU 患者多来自临床各科室,必须经过 ICU 医生确诊后方可转入。转入时,应由 ICU 医生陪同,ICU 护士要了解患者的诊断、治疗、病情及转入的目的,准备相应的床单元和物品。

ICU 的组织与管理

1. ICU 收治对象 ①创伤、休克、感染等引起多器官功能障碍综合征(MODS)者。②心肺脑复苏后继续支持者。③严重的多发性复合伤者。④理化因素所致危急重症者。⑤严重心梗、心律失常、心力衰竭、不稳定型心绞痛者。⑥术后重症患者或高龄术后意外高危者。⑦严重水、电解质、酸碱、渗透压失衡患者。⑧严重代谢障碍性疾病(如甲状腺、肾上腺、胰腺、垂体疾病)患者。⑨大出血、昏迷、抽搐、呼吸衰竭需支持者。⑩器官移植术后监测。

2. 不适宜 ICU 收治对象 急性传染病、明确为脑死亡的患者、无急性恶化的慢性病患者、恶性肿瘤晚期患者、精神障碍患者及自然死亡过程中的老年人。

3. 护理交接检查内容 ①患者意识状态:神志、瞳孔大小、对光反应及肢体活动情况。②测量生命体征:体温、脉搏、呼吸、血压、血氧饱和度、心电图等。③观察周围循环情况:皮肤色泽、温度、湿度,有无皮肤破损、压疮等。④了解最近一次的检查结果:血糖、血气分析、电解质及血细胞分析等。⑤检查用药情况:液体管路是否通畅,输入液体种类、速度、浓度、药物,并做好标志及记录。⑥检查各种引流管道:是否通畅,引流液的量、色、形状,及时记录。

4. 基础监护 凡收入 ICU 患者,均应给予以下基础监护措施。①翔实记录:准备各种记录单,准确记录患者入室情况。②持续心电监测:连接胸前综合导联心电图示波。③吸氧:保持呼吸道通畅及氧供。④建立可靠的静脉通路。⑤通畅、固定各种管道:尿管、引流管、胃管等。⑥取血标本:留取动、静脉血液及其他标本,及时送检。⑦心理护理:与清醒患者沟通,了解其心理状态,做好心理护理。

考点提示: ICU 收治对象、交接内容及要求。

(二) 监护

1. 一般监护

(1) 稳定情绪: 对清醒患者, 医护人员应通过观察了解患者心情, 向患者解释每次监测的目的及对患者的有利作用, 以消除其紧张和恐惧情绪。

(2) 进一步了解病情: 通过必要的病史询问和体格检查, 迅速全面地了解病情, 对患者存在的主要问题和重要脏器功能状态作出初步判断, 明确护理诊断, 制订、实施护理计划, 完成护理记录, 书写护理病历。

(3) 监测: 根据病情决定常规的生命体征和特殊监测项目及监测频度, 按时监测, 准确记录。

(4) 基础护理: 由于监护病房无陪人且危重患者需卧床或绝对卧床休息, 因此, 基础护理、生活护理(如口腔护理、皮肤护理、雾化吸入、饮食、大小便) 一定要及时到位, 并根据情况适当鼓励患者和协助其翻身、拍背、做四肢活动, 以防止并发症发生。

(5)饮食:根据病情需要确定饮食方式和饮食种类,不能进食者适当选择肠外营养。

(6) 记录出入量: 准确记录出入量, 保持体液平衡, 每 6~8h 总结一次, 计算 24h 总量并及时调整。

(7) 完成各种检查: 包括血、尿、粪常规检查, 血电解质、肝功能、肾功能、血糖、血脂等实验室检查, 
并根据病情需要进行必要的心电图检查和床边 X 线等检查。

(8)根据病情需要决定给氧方式、浓度、氧流量,决定输液方式,包括静脉通路情况、输液量和速度。危重患者最好使用静脉留置针输液或静脉三通管建立多通道输液,既可避免因反复穿刺影响抢救效率，又可减轻患者痛苦和紧张情绪，还可减轻医护人员工作负担。

(9)严密观察病情变化,判断、分析病变原因,及时采取处理措施。

2. 加强监护

(1) 体温监测: 危重患者要定时测量体温(腋温或肛温), 持续监测中心温度和四肢皮肤温度并适当对比, 可协助观察病情危重程度、并发症的发生和外周循环情况。

(2) 循环系统: 包括心电监护及血流动力学监护。心电监护是能反映心电活动的指标, 为危重患者常规的监测手段。

(3)呼吸系统:正常的呼吸是维持生命及机体内外环境稳定的重要生理活动之一。其功能障碍将不同程度地影响患者的生命状况,使其趋于恶化和病死率增高。为危重患者行呼吸监护是判断其呼吸功能状况、防治并发症和评估预后的必要手段。

(4) 神经系统: 包括意识状态、瞳孔大小及对光反射、对疼痛刺激的反应、脑电图及颅内压监测等。应用肌肉松弛剂的患者, 应监测肌张力的恢复情况。

(5)消化系统:胃液 pH 值测定及大便潜血试验等检查,包括肝、胆、胰腺功能。

(6) 血液系统: 以血红蛋白、红细胞压积、白细胞计数和分类、血小板计数等血常规为基本监测项目。出凝血功能监测包括试管法测凝血时间、血栓弹力图、3P试验、血浆纤维蛋白原定量和优球蛋白溶解时间等。

(7) 肝功能: 血清胆红素、白蛋白、球蛋白、白蛋白/球蛋白比值、转氨酶等检查。

(8) 肾功能: 确定危重患者的肾功能, 对维持液体平衡及循环功能都有密切的关系。为估计肾功能、液体平衡及循环功能状态, 监测尿液率是一项十分重要的资料, 故需留置导管连续观察、分析尿量及尿质的变化, 包括血生化、尿生化、血肌酐和尿素氮的测定、尿比重、尿酸碱度、尿蛋白定量分析、代谢废物清除率、每小时及 24h 尿量的监测等。

(9) 水电解质平衡与代谢: 包括血生化、 K+ 、 Na+ 、 Cl- 、24h 水和电解质出入平衡的计算、监测摄入热量、氮平衡、血糖、血浆蛋白、血清乳酸及胶体渗透压等。

(10)细菌学监测:包括各种可能感染部位的细菌学检查,有指征时及时送检。

(三)转出

医生决定转出患者后，当班护士电话通知接收科室准备，并联系患者家属。转出前对患者按“危重患者安全转运评估标准”进行评估，依据评估结果转运患者，决定是否需携带抢救物品，此评估要求在转运前10min完成。完善护理记录单、“三测单”。清点患者生活用品、病历、X线片、CT、MRI片及特殊物品。转运者与患者家属一起送患者至接收科室。与病房工作人员交接患者姓名、性别、年龄、住院号、诊断、生命体征、皮肤情况、伤口情况、静脉输液情况、特殊药物带入情况、患者治疗情况。做好相关记录，双方在“院内患者交接单”上签名认可。

目标检测

1. 关于 ICU 通道设置,以下正确的是( )。

A. 设置单一通道供人员出入

B. 人员流动通道与物流通道可共同使用

C. 所有人员使用同一通道

D. 所有物流使用同一通道

E. 人员流动通道与物流通道分开

2. ICU 医疗辅助区域与医疗区域面积之比应达到( )。

A. 1:1以上

B. 0.5:1以上

C. 1:1.5 以上

D. 1.5:1以上

E. 5:1以上

3. ICU 中央工作站设置于( )。

A. 通道一端 B. 医疗区域中央 C. 医疗区域一端\r
D. 病室中央 E. 辅助区域中央

4. 下列疾病不属于 ICU 收治对象的是( )。

A. MODS B. 严重心肌梗死 C. 严重低钾血症

D. 甲状腺危象 E. 肺癌晚期

5. ICU 收治病种不包括( )。

A. 恶性肿瘤晚期 B. 多器官功能衰竭 C. 急性中毒、毒蛇咬伤

D. 大面积烧伤 E. 各类休克

6. ICU 病房的温度应保持在( )。

A. 16 ~ 20℃ B. 18 ~ 22℃ C. 20 ~ 25℃

D. 25 ~ 28℃ E. 26 ~ 30℃

7. ICU 中比较合理的护士与床位数之比为( )。

A. 1:2 B. 1:1 C. (1~2):1

D. (2~3):1 E. (3~4):1

8. 综合性医院 ICU 床位占总床位数的百分比为( )。

A. 0.5%~1%

B. 2%~8%

C. 1%~2%

D. 3%~5%

E. 5%~10%

9. ICU 护理工作的核心为( )。

A. 患者饮食管理

B. 患者生命体征监测

C. 患者心理护理

D. 患者康复训练

E. 患者生活护理

10. 下列不属于 ICU 护理人员必须掌握的基本技能是( )。

A. 心肺复苏 B. 静脉输液 C. 伤口缝合

D. 呼吸机操作 E. 手术

(杨 萍 王亚妮 秦抗洪)`,rawHtml:`<p>案例导学</p>\r
<p>陈某，男，45岁。电击伤后2日，由急诊科转入ICU。患者右手掌有大面积电灼伤伤口，渗液严重，患者呈昏迷状态。</p>\r
<p>请思
考：</p>\r
<p>1. 什么是 ICU?</p>\r
<p>2. 作为 ICU 护士, 如何接收该患者? 如何对该患者进行监护?</p>\r
<p>重症监护病房是集中各有关专业知识、技术的医护人员和先进医疗仪器设备，运用现代医疗护理技术对危重患者的生理功能进行连续性监测和积极治疗，以及提高危重患者的抢救成功率，降低病死率或伤残率的专门单位或管理单元。重症监护病房集中诊疗与管理危重患者，具有设备和技术先进、监测全面细致、治疗及时、针对性强、医疗护理水平和工作效率高等特点。重症监护病房是现代化医院的重要组成部分。近年来，重症医学迅猛发展，ICU精密的监护仪器设备、医护人员的专业水平及临床科学实践，已成为衡量一个国家或地区医院现代化急救医疗水平的重要指标。</p>\r
<p>一、重症监护病房</p>\r
<p>(一)ICU 设置的基本要求</p>\r
<p>(1)我国三级医院和有条件的二级医院均应设立重症医学科。重症医学科属于临床独立学科，由直属医院职能部门直接领导。ICU是重症医学学科的临床基地。</p>\r
<p>(2) ICU 必须配备足够数量受过专门训练、掌握重症医学基础知识和基本操作技术、具备独立工作能力的专职医护人员。</p>\r
<p>(3) ICU 必须配置必要的监护和治疗设备, 接收医院各科的重症患者。</p>\r
<p>(二)ICU 的分类</p>\r
<p>重症监护病房根据收治患者专业范围不同,可分为专科重症监护病房、综合重症监护病房、部分综合重症监护病房三种类型。</p>\r
<p>1. 专科重症监护病房 是指某专科范围内建立的加强监护病房,专门收治某一专业范围内的危重患者。如冠心病监护病房(cardiac care unit, CCU)、呼吸监护病房(respiratory care unit, RICU)等。</p>\r
<p>2. 综合重症监护病房 是在专科重症监护病房基础上发展起来的一种跨学科、面向全院的监护病房,其任务是收治多学科危重患者,监护和支持各脏器功能为其主要工作内容。</p>\r
<p>3. 部分综合重症监护病房 是指多个邻近专科联合建立的重症监护病房,如外科重症监护病房,主要收治外科各专科术后的危重患者,这些患者除了专科的特点外,还具有外科手术后的共性。</p>\r
<p>国内 ICU 的发展仍以综合 ICU 和专科 ICU 为主,但 ICU 的专业化已成为发展趋势。</p>\r
<p>(三)ICU 的位置</p>\r
<p>综合 ICU 因患者来源于各大专科,跨科病种十分多见,ICU 的位置应与患者来源最多的科室相邻近,以缩短危重患者的转运时间。专科 ICU 则应设立在各个专科病区内。另外,ICU 还应与化验室、血库、手术室、急诊室、放射科和电梯相邻近。ICU 应具备良好的通风、采光条件,有条件者最好装配气流方向从上到下的空气净化系统,能独立控制室内的温度和湿度,一般室温要求保持在 22 ~ 24℃,湿度以 60% ~ 70% 为宜。每个单间的空气调节系统应独立控制。安装足够的感应式洗手设施和手部消毒装置，单间每床1套，开放式病床至少每2床1套。</p>\r
<p>(四) 床位要求</p>\r
<p>(1) ICU 内应配备适合 ICU 使用的病床, 以及防压疮床垫。每张床的占地面积比普通病室要大, 每张床占地不小于 15m<sup>2</sup> , 床位间隔大于 1m, 保证能容下各种监护仪, 便于医生、护士床旁操作。病床应易于推动, 以能使患者有多种卧位的多功能病床为佳。床位使用率为 75%, ICU 床位数要根据医院总的床位数或某一部分或病区有多少患者需要监护来确定。一般综合医院 ICU 病床数应占医院总床位数的 2%~8%。</p>\r
<p>(2) 每床配备完善的功能设备带或功能架, 提供电、氧气、压缩空气和负压吸引等功能支持。每张监护病床装配电源插座 12 个以上、氧气接口 2 个以上、压缩空气接口 2 个和负压吸引接口 2 个以上。医疗用电和生活照明用电线路分开, 每个 ICU 床位的电源应由独立的反馈电路供应。ICU 最好有备用的不间断供电系统 (UPS) 和漏电保护装置, 最好每个电路插座都在主面板上有独立的电路短路器。</p>\r
<p>(3) 每床配备床旁监护系统, 进行心电、血压、脉搏、血氧饱和度、有创压力等基本生命体征监护。为便于安全转运患者, 每个 ICU 单元至少配备便携式监护仪 1 台。</p>\r
<p>(4) 三级医院的 ICU 应每床配备 1 台呼吸机, 二级医院的 ICU 可根据实际需要配备适当数量的呼吸机。每床应配备简易呼吸器。为便于安全转运患者, 每个 ICU 单元至少应配备便携式呼吸机 1 台。</p>\r

<p>(5) 每床均应配备输液泵和微量注射泵, 其中微量注射泵每床 2 套以上, 另配备一定数量的肠内营养输注泵。</p>\r
<p>(五) 监护设备</p>\r
<p>1. 中心监护站 要求在护士站就能直接观察到所有病床,护士站应有中心监测显示仪、电子计算机、病历柜(内有各种监护记录本)、药物储存柜、联系电话等。</p>\r
<p>2. 计算机网络监护系统 根据情况选择由 6～10 台床边监护仪组成的网络监护系统, 中心监护台通常置于护士中心监护站, 床边监护仪应安装在墙壁的适当位置, 既利于护士操作、观察, 又保证患者不易碰及。</p>\r
<p>3. 闭路电视监控系统 中心监护站尽可能安装较大的屏幕显示器,各病室内安装转式搜寻器,可同时监控多个患者,以利于全面观察、护理。</p>\r
<p>4. 仪器设备 除上述普通病室所备仪器之外, ICU 尚需配备多功能监护仪、呼吸机、除颤器、起搏器、心肺复苏机、输液泵、心电图机、床边 X 线机、血气分析仪, 以保证顺利完成各种监护及抢救任务。</p>\r
<p>(六)辅助区域</p>\r

<p>ICU 的基本辅助用房包括医生办公室、主任办公室、工作人员休息室、中央工作站、治疗室、配药室、仪器室、更衣室、清洁室、污废物处理室、值班室、盥洗室等。有条件的 ICU 可配置其他辅助用房，包括示教室、家属接待室、实验室、营养准备室等。辅助用房面积与病房面积之比应达到 1.5:1 以上。</p>\r
<p>(七) 设计原则</p>\r
<p>ICU 要有合理的包括人员流动和物流在内的医疗流向,最好通过不同的进、出通道实现,以最大限度减少各种干扰和交叉感染。ICU 的设计要求应该满足提供医护人员便利的观察条件和在必要时尽快接触患者的通道。ICU 建筑装饰必须遵循不产尘、不积尘、耐腐蚀、防潮防霉、防静电、容易清洁和符合防火要求的总原则。</p>\r
<p>(八) 噪声</p>\r
<p>除了患者的呼叫信号、监护仪器的报警声外，电话铃声、打印机等仪器发出的声音等均属于ICU的噪声。在不影响正常工作的情况下，这些声音应尽可能减少到最低水平。根据国际噪音协会的建议，ICU的噪声最好不要超过白天45dB、傍晚40dB、夜晚20dB。地面覆盖物、墙壁和天花板应尽量采用高吸音的建筑材料。</p>\r
<p>(九)ICU 的人员配备</p>\r
<p>(1) ICU 专科医生的固定编制人数与床位数之比为(1 ~ 2):1以上。ICU 日常工作中可有部分轮科、进修医生。ICU 医生组成应包括高级、中级和初级医生,每个管理单元必须至少配备一名具有高级职称的医生全面负责医疗工作。</p>\r
<p>(2) ICU 专科护士的固定编制人数与床位数之比为(3~4):1。</p>\r
<p>(3) ICU 可以根据需要配备适当数量的医疗辅助人员,有条件的医院可配备相关的技术与维修人员。</p>\r
<p>(4) ICU 护士必须经过严格的专业培训,熟练掌握重症护理基本理论和技能,经过专科考核合格后,才能独立上岗。</p>\r
<p>(十)ICU 的工作制度</p>\r
<p>制订各种规章制度是保证 ICU 工作正常、有序进行的基本保障。除一般病房的护理常规和工作制度外，还应包括 ICU 护理常规、ICU 出入制度、ICU 护理管理制度、突发事件的应急预案、人员紧急召集制度、岗位人才培养制度等。</p>\r
<p>(十一) 监护的分级制度</p>\r
<p>监护的实施应根据患者的具体情况有选择性地进行,否则会造成不必要的浪费,甚至给患者带来不利影响。临床上根据病情危重程度不同,监护的级别分为三级。</p>\r
<p>1. 一级监护 适用于重要器官功能衰竭,随时有生命危险者。一级监护内容包括连续心电监护,每2~4h检测CVP,每8h检测心排血量,每小时检测呼吸频率,每4~6h检测动脉血气分析,记录每小时、每12h、每24h尿量,每日检测尿比重,每4~6h总结出入量,每12h检测血糖、血浆渗透压、血细胞比容,每日查血、尿常规,每4~6h测体温。</p>\r
<p>2. 二级监护 适用于两个以上重要器官功能不全,生命体征相对稳定者。二级监护内容包括连续心电监护,每1~2h测血压,每2~4h测CVP,每小时测呼吸频率,每8h检
测动脉血气分析,记录每小时及24h尿量,每日检测尿比重,每8h总结出入量,每8h测体温,每日查血常规、尿常规、血糖、血浆渗透压、血细胞比容。</p>\r
<p>3. 三级监护 适用于单个重要器官功能不全,生命体征稳定者。三级监护内容包括连续心电监护,每1~2h测血压,每1~2h测呼吸频率,每日检测动脉血气分析,记录24h尿量、24h出入量,每8h测体温,每日查血常规、尿常规、血糖、血浆渗透压、血细胞比容。</p>\r
<p>考点提示:ICU 设置和三级监护。</p>\r
<p>二、ICU 感染的预防与控制</p>\r
<p>(一) 感染部位</p>\r
<p>ICU 医院内感染一般以下呼吸道、泌尿道和腹部感染最常见。不同的 ICU 其发病率可不同，感染部位也可不同。如外科 ICU 感染率高于内科 ICU，以泌尿道、手术部位、呼吸系统、血液感染居多，而内科 ICU 中以呼吸系统、泌尿道、血液感染最常见。</p>\r
<p>(二)ICU 医院内感染的类型和危险因素</p>\r
<p>1. ICU 医院内感染的类型</p>\r
<p>(1) 内源性感染: 又称自身感染, 是 ICU 患者自身存在的细菌引起的感染。这些细菌包括患者本身存在的正常菌群及定植菌。</p>\r
<p>(2) 外源性感染: 又称交叉感染, 通常是指病原体来自患者体外, 如其他患者或医院中工作人员、医院环境中存在的细菌，以及未彻底消毒灭菌或污染的医疗器械、血液、血液制品及生物制品等。</p>\r
<p>(3)母婴感染:是指在分娩过程中胎儿经胎盘或产道所发生的感染。</p>\r
<p>2. ICU 医院内感染的危险因素 主要危险因素是机体免疫功能低下者、高龄患者和婴幼儿、介入性诊疗操作、抗菌药物的不合理应用、空气、医护人员手及物体表面被污染，血、血制品、药品污染，医用器材被污染等。</p>\r
<p>(三)ICU 医院内感染的控制措施</p>\r
<p>根据《中国重症监护病房(ICU)医院感染管理指南》,ICU感染控制措施包括以下几个方面。</p>\r
<p>1. 工作人员管理 接触特殊患者如抗甲氧西林金黄色葡萄球菌(MRSA)感染或携带者,或处置患者可能有血液、体液、分泌物、排泄物喷溅时,应穿隔离衣或防护围裙。接触有或可能有传染性的呼吸道感染患者时,或有体液喷溅可能时,应戴一次性外科口罩;接触疑似为高传染性的感染(如禽流感、SARS等)患者,应戴N95口罩。当口罩潮湿或有污染时应立即更换。无菌操作或可能会有体液喷溅时,须戴帽子。接触黏膜和非完整皮肤或进行无菌操作时,须戴无菌手套。</p>\r
<p>2. 患者管理 应将感染与非感染患者分开安置。对疑似有传染性的特殊感染或重症感染患者，应隔离于单独房间；对于空气传播的感染，如开放性肺结核，应隔离于负压病房；对 MRSA、泛耐药鲍曼不动杆菌等感染或携带者，尽量隔离于单独房间，并有醒目的标识，如房间不足，可以将同类耐药菌感染或携带者集中安置；接受器官移植等免疫功能明显受损患者，应安置于正压病房。医务人员不可同时照顾正、负压隔离室内的患者。</p>\r

<p>3. 探视管理 ICU 内无家属陪住。患者进入 ICU 后, 家属可留下电话号码, 以便于有情况时随时可与家属联系。设计现代化的 ICU, 其外常有一圈玻璃窗与走廊, 在家属休息室有闭路电视可以观察 ICU 内患者情况, 因而可减少因探视给 ICU 带来污染及对正常医护工作的干扰。</p>\r
<p>4. 建筑布局和相关设施的管理 放置病床的医疗区域、医疗辅助用房区域、污物处理区域和医务人员生活辅助用房区域等，应相对独立；配备足够的手卫生消毒设施。医疗区域包括单人房间，必须设置洗手池。采用脚踏式、“肘式”或感应式等非手接触式水龙头开关，并配备擦手纸和手套。每张病床旁须放置手部消毒装置1套。</p>\r
<p>5. 医疗操作流程管理 留置深静脉导管置管时遵守最大限度的无菌操作要求。更换穿刺点敷料的间隔时间，建议无菌纱布为2天、专用贴膜可达5~7天，但敷料出现潮湿、松动时应更换。尽量避免不必要的留置导尿管，插管时应严格无菌操作，动作轻柔，减少黏膜损伤。严格掌握气管插管或气管切开的适应证。使用呼吸机辅助呼吸的患者应优先考虑无创通气。对气管插管者，吸痰时应严格执行无菌操作。呼吸机螺纹
管每周更换2次，有明显分泌物污染时应及时更换。湿化器添加的水须使用无菌水并每天更换。</p>\r
<p>6. 物品管理 诊疗、护理患者过程中所使用的非一次性物品（如监护仪、输液泵、微量注射泵、听诊器、血压计、氧气流量表、心电图机等），尤其是频繁接触的物体表面（如仪器的按钮、操作面板），应每天仔细消毒擦拭，建议用75%酒精消毒。床上用品（如床单、被服）应勤换，如有血迹、体液或排泄物等污染，应及时更换。枕芯、被褥等使用时应防止体液浸湿污染；便盆、尿壶等应专人专用，每天消毒。</p>\r
<p>7. 环境管理 开窗通风、机械通风是保持 ICU 内空气流通、降低空气微生物密度的最好方法；禁止在室内摆放干花、鲜花或盆栽植物；不宜在室内及走廊铺设地毯。</p>\r
<p>8. 抗菌药物管理 安全、合理使用抗生素及消毒剂, 慎用广谱抗生素, 防止菌群失调, 必须要用时, 应行细菌培养及药物敏感试验以指导用药。</p>\r
<p>9. 废物与排泄物管理 处理废物与排泄物时医务人员应做好自我防护,防止体液接触暴露和锐器伤;应有完善的污水处理系统;垃圾分类处理;患者的尿液、粪便、分泌物和排泄物应倒入患者的厕所或专门的洗涤池内。</p>\r
<p>三、ICU的护理工作程序</p>\r
<p>(一)接诊</p>\r
<p>ICU 患者多来自临床各科室,必须经过 ICU 医生确诊后方可转入。转入时,应由 ICU 医生陪同,ICU 护士要了解患者的诊断、治疗、病情及转入的目的,准备相应的床单元和物品。</p>\r
<p>ICU 的组织与管理</p>\r
<p>1. ICU 收治对象 ①创伤、休克、感染等引起多器官功能障碍综合征(MODS)者。②心肺脑复苏后继续支持者。③严重的多发性复合伤者。④理化因素所致危急重症者。⑤严重心梗、心律失常、心力衰竭、不稳定型心绞痛者。⑥术后重症患者或高龄术后意外高危者。⑦严重水、电解质、酸碱、渗透压失衡患者。⑧严重代谢障碍性疾病(如甲状腺、肾上腺、胰腺、垂体疾病)患者。⑨大出血、昏迷、抽搐、呼吸衰竭需支持者。⑩器官移植术后监测。</p>\r
<p>2. 不适宜 ICU 收治对象 急性传染病、明确为脑死亡的患者、无急性恶化的慢性病患者、恶性肿瘤晚期患者、精神障碍患者及自然死亡过程中的老年人。</p>\r
<p>3. 护理交接检查内容 ①患者意识状态:神志、瞳孔大小、对光反应及肢体活动情况。②测量生命体征:体温、脉搏、呼吸、血压、血氧饱和度、心电图等。③观察周围循环情况:皮肤色泽、温度、湿度,有无皮肤破损、压疮等。④了解最近一次的检查结果:血糖、血气分析、电解质及血细胞分析等。⑤检查用药情况:液体管路是否通畅,输入液体种类、速度、浓度、药物,并做好标志及记录。⑥检查各种引流管道:是否通畅,引流液的量、色、形状,及时记录。</p>\r
<p>4. 基础监护 凡收入 ICU 患者,均应给予以下基础监护措施。①翔实记录:准备各种记录单,准确记录患者入室情况。②持续心电监测:连接胸前综合导联心电图示波。③吸氧:保持呼吸道通畅及氧供。④建立可靠的静脉通路。⑤通畅、固定各种管道:尿管、引流管、胃管等。⑥取血标本:留取动、静脉血液及其他标本,及时送检。⑦心理护理:与清醒患者沟通,了解其心理状态,做好心理护理。</p>\r
<p>考点提示: ICU 收治对象、交接内容及要求。</p>\r
<p>(二) 监护</p>\r
<p>1. 一般监护</p>\r
<p>(1) 稳定情绪: 对清醒患者, 医护人员应通过观察了解患者心情, 向患者解释每次监测的目的及对患者的有利作用, 以消除其紧张和恐惧情绪。</p>\r
<p>(2) 进一步了解病情: 通过必要的病史询问和体格检查, 迅速全面地了解病情, 对患者存在的主要问题和重要脏器功能状态作出初步判断, 明确护理诊断, 制订、实施护理计划, 完成护理记录, 书写护理病历。</p>\r
<p>(3) 监测: 根据病情决定常规的生命体征和特殊监测项目及监测频度, 按时监测, 准确记录。</p>\r
<p>(4) 基础护理: 由于监护病房无陪人且危重患者需卧床或绝对卧床休息, 因此, 基础护理、生活护理(如口腔护理、皮肤护理、雾化吸入、饮食、大小便) 一定要及时到位, 并根据情况适当鼓励患者和协助其翻身、拍背、做四肢活动, 以防止并发症发生。</p>\r
<p>(5)饮食:根据病情需要确定饮食方式和饮食种类,不能进食者适当选择肠外营养。</p>\r
<p>(6) 记录出入量: 准确记录出入量, 保持体液平衡, 每 6~8h 总结一次, 计算 24h 总量并及时调整。</p>\r
<p>(7) 完成各种检查: 包括血、尿、粪常规检查, 血电解质、肝功能、肾功能、血糖、血脂等实验室检查, 
并根据病情需要进行必要的心电图检查和床边 X 线等检查。</p>\r
<p>(8)根据病情需要决定给氧方式、浓度、氧流量,决定输液方式,包括静脉通路情况、输液量和速度。危重患者最好使用静脉留置针输液或静脉三通管建立多通道输液,既可避免因反复穿刺影响抢救效率，又可减轻患者痛苦和紧张情绪，还可减轻医护人员工作负担。</p>\r

<p>(9)严密观察病情变化,判断、分析病变原因,及时采取处理措施。</p>\r
<p>2. 加强监护</p>\r
<p>(1) 体温监测: 危重患者要定时测量体温(腋温或肛温), 持续监测中心温度和四肢皮肤温度并适当对比, 可协助观察病情危重程度、并发症的发生和外周循环情况。</p>\r
<p>(2) 循环系统: 包括心电监护及血流动力学监护。心电监护是能反映心电活动的指标, 为危重患者常规的监测手段。</p>\r
<p>(3)呼吸系统:正常的呼吸是维持生命及机体内外环境稳定的重要生理活动之一。其功能障碍将不同程度地影响患者的生命状况,使其趋于恶化和病死率增高。为危重患者行呼吸监护是判断其呼吸功能状况、防治并发症和评估预后的必要手段。</p>\r
<p>(4) 神经系统: 包括意识状态、瞳孔大小及对光反射、对疼痛刺激的反应、脑电图及颅内压监测等。应用肌肉松弛剂的患者, 应监测肌张力的恢复情况。</p>\r
<p>(5)消化系统:胃液 pH 值测定及大便潜血试验等检查,包括肝、胆、胰腺功能。</p>\r
<p>(6) 血液系统: 以血红蛋白、红细胞压积、白细胞计数和分类、血小板计数等血常规为基本监测项目。出凝血功能监测包括试管法测凝血时间、血栓弹力图、3P试验、血浆纤维蛋白原定量和优球蛋白溶解时间等。</p>\r
<p>(7) 肝功能: 血清胆红素、白蛋白、球蛋白、白蛋白/球蛋白比值、转氨酶等检查。</p>\r
<p>(8) 肾功能: 确定危重患者的肾功能, 对维持液体平衡及循环功能都有密切的关系。为估计肾功能、液体平衡及循环功能状态, 监测尿液率是一项十分重要的资料, 故需留置导管连续观察、分析尿量及尿质的变化, 包括血生化、尿生化、血肌酐和尿素氮的测定、尿比重、尿酸碱度、尿蛋白定量分析、代谢废物清除率、每小时及 24h 尿量的监测等。</p>\r
<p>(9) 水电解质平衡与代谢: 包括血生化、 K<sup>+</sup> 、 Na<sup>+</sup> 、 Cl<sup>-</sup> 、24h 水和电解质出入平衡的计算、监测摄入热量、氮平衡、血糖、血浆蛋白、血清乳酸及胶体渗透压等。</p>\r
<p>(10)细菌学监测:包括各种可能感染部位的细菌学检查,有指征时及时送检。</p>\r
<p>(三)转出</p>\r
<p>医生决定转出患者后，当班护士电话通知接收科室准备，并联系患者家属。转出前对患者按“危重患者安全转运评估标准”进行评估，依据评估结果转运患者，决定是否需携带抢救物品，此评估要求在转运前10min完成。完善护理记录单、“三测单”。清点患者生活用品、病历、X线片、CT、MRI片及特殊物品。转运者与患者家属一起送患者至接收科室。与病房工作人员交接患者姓名、性别、年龄、住院号、诊断、生命体征、皮肤情况、伤口情况、静脉输液情况、特殊药物带入情况、患者治疗情况。做好相关记录，双方在“院内患者交接单”上签名认可。</p>\r
<p>目标检测</p>\r
<p>1. 关于 ICU 通道设置,以下正确的是( )。</p>\r
<p>A. 设置单一通道供人员出入</p>\r
<p>B. 人员流动通道与物流通道可共同使用</p>\r
<p>C. 所有人员使用同一通道</p>\r
<p>D. 所有物流使用同一通道</p>\r
<p>E. 人员流动通道与物流通道分开</p>\r
<p>2. ICU 医疗辅助区域与医疗区域面积之比应达到( )。</p>\r
<p>A. 1:1以上</p>\r
<p>B. 0.5:1以上</p>\r
<p>C. 1:1.5 以上</p>\r
<p>D. 1.5:1以上</p>\r
<p>E. 5:1以上</p>\r
<p>3. ICU 中央工作站设置于( )。</p>\r
<p>A. 通道一端 B. 医疗区域中央 C. 医疗区域一端<
/p>\r
<p>D. 病室中央 E. 辅助区域中央</p>\r
<p>4. 下列疾病不属于 ICU 收治对象的是( )。</p>\r
<p>A. MODS B. 严重心肌梗死 C. 严重低钾血症</p>\r
<p>D. 甲状腺危象 E. 肺癌晚期</p>\r
<p>5. ICU 收治病种不包括( )。</p>\r
<p>A. 恶性肿瘤晚期 B. 多器官功能衰竭 C. 急性中毒、毒蛇咬伤</p>\r
<p>D. 大面积烧伤 E. 各类休克</p>\r
<p>6. ICU 病房的温度应保持在( )。</p>\r
<p>A. 16 ~ 20℃ B. 18 ~ 22℃ C. 20 ~ 25℃</p>\r
<p>D. 25 ~ 28℃ E. 26 ~ 30℃</p>\r
<p>7. ICU 中比较合理的护士与床位数之比为( )。</p>\r
<p>A. 1:2 B. 1:1 C. (1~2):1</p>\r
<p>D. (2~3):1 E. (3~4):1</p>\r
<p>8. 综合性医院 ICU 床位占总床位数的百分比为( )。</p>\r
<p>A. 0.5%~1%</p>\r
<p>B. 2%~8%</p>\r
<p>C. 1%~2%</p>\r
<p>D. 3%~5%</p>\r
<p>E. 5%~10%</p>\r
<p>9. ICU 护理工作的核心为( )。</p>\r
<p>A. 患者饮食管理</p>\r
<p>B. 患者生命体征监测</p>\r
<p>C. 患者心理护理</p>\r
<p>D. 患者康复训练</p>\r
<p>E. 患者生活护理</p>\r
<p>10. 下列不属于 ICU 护理人员必须掌握的基本技能是( )。</p>\r
<p>A. 心肺复苏 B. 静脉输液 C. 伤口缝合</p>\r
<p>D. 呼吸机操作 E. 手术</p>\r
<p>(杨 萍 王亚妮 秦抗洪)</p>\r
`}]},{id:"module3",title:"第二章 常用救护技术",summary:"常用救护技术是急救核心技能，关键包括心肺脑复苏、通畅气道与创伤急救。例如心肺复苏强调胸外按压与人工呼吸。未涉及中毒急救的细节。",tasks:[{id:"module3-task1",title:"第一节 心肺脑复苏术",order:1,rawContent:`学习目标

素质目标:具备认真、科学、严谨、求实的态度及高度的责任心,培养紧密协作的团队协作精神,树立“敬佑生命、救死扶伤、甘于奉献、大爱无疆”的急救理念。

知识目标: 掌握心搏骤停的原因、类型及诊断, 心肺脑复苏三阶段的生命支持、电除颤方法及监测要点; 掌握常见的气道通畅术、创伤急救技术, 简易呼吸器的使用方法, 正确识别呼吸机的常见模式、参数和报警原因; 掌握洗胃的方法、适应证和禁忌证; 掌握重症监护常用监测方法、监测指标的正常值和临床意义。熟悉心搏骤停不同类型波形、气道梗阻的原因、气管插管和气管切开的方法、清创的方法及配合、出血的判断、简易呼吸器和呼吸机的结构、呼吸机的并发症。了解 CPCR 发展史、简易呼吸器和呼吸机的分类、工作原理。

能力目标:具备敏感的急救意识和应急应变能力,能够对心搏骤停者迅速作出判断,并正确实施心肺脑复苏术;能够应用除颤仪、简易呼吸器对患者正确实施救护;能够熟练运用气道通畅术对气道梗阻患者进行急救;能够对常见外伤患者进行快速评估,并进行紧急处理;能够熟练运用洗胃技术对中毒患者进行规范催吐和洗胃;能够熟练运用各项重症监护技术对急危重症患者进行生命体征及系统功能监测。

案例导学

患者,女,56岁。昏倒在路边被路人发现,约10min救护车到达现场。患者意识丧失,呈临终呼吸状态。查体:双侧瞳孔散大,对光反应迟钝,颈动脉搏动、心音、呼吸音均消失。ECG显示QRS波群消失,代之以大小不等、形态各异的颤动波,频率为290次/分。在其包内发现有治疗哮喘的药物。

请思考：

1. 该患者出现了什么情况？

2. 如何开展急救护理工作？

心搏骤停为临床上最危重的急症，针对心搏骤停者的抢救性医疗措施称为心肺复苏（cardiopulmonary resuscitation, CPR），它挽救了众多心跳、呼吸骤停者的生命。据报道，10%~40%接受CPR且存活者遗留明显的永久性脑损害。这一事实引起了人们对脑保护及脑复苏的重视，推动了脑复苏的研究和实施，将CPR扩展为心肺脑复苏（cardio-pulm
onary-cerebral resuscitation, CPCR），即包括心、肺、脑复苏三个主要环节（图2-1）。

图2-1 心肺脑复苏流程

\r
一、心搏骤停

(一)心搏骤停的概念

心搏骤停(sudden cardiac arrest,SCA)是指心脏因急性原因突然丧失其有效的排血功能而导致循环和呼吸功能停止，全身血液循环停滞，组织缺血、缺氧。心搏骤停患者处于“临床死亡期”，如果能够得到及时、有效的救治，患者可以存活；反之，将迅速发生不可逆转的生物学死亡。心搏骤停常为心脏性猝死的直接原因。

心脏性猝死(sudden cardiac death, SCD)是指急性症状发作后1h内发生的以意识骤然丧失为特征、由心脏原因引起的生物学死亡。心搏骤停与心脏性猝死的区别在于前者通过紧急治疗有逆转的可能，而后者是生物学功能不可逆转的停止。因此，早期识别心搏骤停是实施CPR的前提条件，可减少生物学死亡的发生率。

(二)心搏骤停的原因

1. 心源性心搏骤停 因心脏本身的病变所致。冠心病是导致成人心搏骤停的最主要原因，其中急性冠脉综合征（如急性心肌梗死或不稳定型心绞痛等）常引发心室颤动或心室停搏，造成成人心搏骤停。其他病因还包括心肌受损、主动脉瓣狭窄、心肌炎、风湿性瓣膜病、严重心律失常等。

2. 非心源性心搏骤停 因其他疾患或因素影响心脏所致,如溺水、窒息、电击、中毒、麻醉或手术意外、严重的电解质与酸碱平衡失调等均可引起呼吸、心跳停止。

(三)心搏骤停的类型

根据心脏生物电活动情况及心电图表现,心搏骤停可表现为心室颤动、心脏停搏和心脏电机械分离。

1. 心室颤动 简称室颤。心室肌发生极不规则的、快速的、不协调的颤动；心电图表现为 QRS 波群消失，代之以大小不等、形态各异的颤动波，频率为 200～400 次/分。若颤动波波幅高并且频率快，则较容易复律；若波幅低并且频率慢，则复律的可能性小，多为心脏停搏的先兆(图 2-2)。

图2-2 心室颤动

\r
2. 心脏停搏 又称心搏停止。心房、心室肌完全失去电活动能力，心电图多呈一条直线，或偶见P波(图2-3)。

图2-3 心脏停搏

\r
3. 心脏电机械分离 又称无脉性电活动, 心肌存在生物电活动, 而无有效的机械收缩功能, 继续出现慢而极微弱且不完整的“收缩”情况。ECG 表现为间断出现宽而畸形、波幅较低的 QRS 波群, 频率多在 30 次/分以下(图 2-4)。

图2-4 心脏电机械分离

\r
以上三种类型虽在心电和心脏活动方面各有其特点,但共同的结果是心脏丧失有效收缩和排血功能,使血液循环停止而引起相同的临床表现,其中以室颤最为常见。室颤多发生于急性心肌梗死早期或严重心肌缺血时,是冠心病猝死的最常见原因,也见于外科心脏手术后,如果早期给予CPR、快速除颤,其复苏成功率较高。

(四)心搏骤停的临床表现与诊断

1. 心搏骤停的临床表现 心搏骤停后, 血流运行立即停止。由于脑组织对缺血、缺氧最敏感, 临床上以神经系统和循环系统的表现最为明显, 具体表现如下: ①意识突然丧失或伴有短暂性抽搐; ②脉搏无法扪及, 血压测不出; ③呼吸停止, 或先呈叹息样, 后即停止, 多发生在心搏骤停后 30s 内; ④心音消失; ⑤双侧瞳孔散大或固定; ⑥面色苍白且发绀。

2. 心搏骤停的诊断 意识丧失伴大动脉搏动消失是心搏骤停出现较早且最可靠的临床征象。大动脉搏动通常通过触摸颈动脉进行判断，亦可触摸股动脉搏动，时间不超过10s。不可因心脏听诊、测血压或描记心电图而延误时间。因为心搏骤停后，复苏术开始的迟早是抢救成功与否的关键，必须分秒必争。意识丧失和大动脉搏动消失这两个征象存在，即可诊断为心搏骤停，应立即进行心肺复苏。

依据 2020 年《美国心脏协会心肺复苏及心血管急救指南》，鉴于脉搏判断的难度，强调非专业人员不要求判断脉搏，一旦患者出现无意识、无呼吸或呼吸不正常，就可以立即进行心肺复苏。

考点提示:心搏骤停的类型及诊断依据。

二、心肺脑复苏

心肺复苏是针对心搏骤停的有效抢救措施,于二十世纪五六十年代逐步形成,其出现挽救了众多呼吸、心跳停止者的生命。

1956年，除颤器的应用首次被记载，电除颤重新转复心脏的正常节律掀开了医学史上崭新的篇章。1958年，Safar明确了口对口人工呼吸优于“压胸抬臂通气法”。1960年，William Kouwenhoven首次倡导“不开胸心脏按压术”，开创了以胸外心脏按压为基础的心肺复苏术。口对口人工呼吸法和胸外心脏按压的结合，配以体外电击除颤法等，构成了现代心肺复苏术的三大要素。此后，各国先后制订了内容大致相同的成人心肺复苏标准和指南。1966年，全美复苏会议对CPR技术加以标准化；美国心脏协会(American Heart Association, AHA)于1974年开始制订心肺复苏指南，并于1979年和1985年制订和完善了小儿心肺复苏术；1985年，第四届全美复苏会议对CPR标准进行了评价和修改，提出心肺复苏不仅可恢复患者的呼吸和心搏，还强调了脑的复苏，将CPR扩展到CPCR，并分别于1980年、1986年、1992年、2000年、2005年、2010年、2015年和2020年修订再版，不断修改和完善。其目的是把复苏理论和临床实践相结合，提高CPR的效果。重点关注如何改进、简化复苏培训程序和提高复苏成功率，强调胸外心脏按压和团队抢救的重要性。

知识链接

从 A—B—C 更改为 C—A—B

绝大多数心搏骤停发生在成人身上，而在各年龄段患者中，心搏骤停存活率最高的为有目击者的心搏骤停者，而且初始心律是心室颤动(VF)或无脉性室性心动过速(VT)。在这些患者中，基础生命支持的关键操作是胸外心脏按压和早期除颤。在A—B—C程序中，当施救者开放气道以进行口对口人工呼吸、寻找防护装置或者收集并装配通气设备的过程中，胸外心脏按压往往会被延误。更改为C—A—B程序，可以尽快开始胸外心脏按压，同时能尽量缩短通气延误时间(也就是说，只需进行第一轮30次胸外心脏按压的时间，大约为18s；如果有2名施救者为婴儿或儿童进行复苏，延误时间会更短)。

大多数院外心搏骤停患者没有由目击者进行心肺复苏,这可能是多种原因造成的,其中一个可能的原因是A—B—C程序。该程序的第一步是施救者认为最困难的步骤,即开放气道并进行人工呼吸。如果先进行胸外心脏按压,可能会鼓励更多施救者立即开始实施心肺复苏。因此,2010年AHA心血管急救指南将A—B—C改为C—A—B,并一直沿用至今。

完整的心肺脑复苏是指对心搏骤停患者采取的使其恢复自主循环和自主呼吸，并尽早施加脑保护措施的紧急医疗救治措施。CPCR包括基础生命支持(basic life support, BLS)、进一步生命支持(advanced life support, ACLS)和延续生命支持(prolonged life support, PLS)三部分。

心肺脑复苏的成功率与抢救是否及时、有效有关。
若能在心搏骤停4min内进行BLS,8min内进行心脏除颤,则存活率可达40%。抢救越早,复苏成功率越高。

(一) 基础生命支持

基础生命支持又称初期心肺复苏,是通过徒手操作,保持心脏有一定的输出量,供应重要脏器(特别是心脏和脑)已氧合的血液。初期心肺复苏被归纳为胸外心脏按压(circulation,C)、开放气道(airway,A)、人工呼吸(breathing,B)和除颤(defibrillation,D)四部分,常简称为“CABD”四步(图2-5)。BLS是心搏骤停后挽救生命的最关键措施,其目的是迅速恢复循环和呼吸,维持生命重要器官的供血、供氧,为进一步复苏争取有利时机。

1. 诊断 首先在安全环境下,快速识别和判断心脏停搏。

(1) 意识丧失: 轻拍患者肩部并向其耳部大声呼叫, 若无反应, 即可判断为意识丧失。

(2)心脏停搏:专业救护者触摸颈动脉搏动(检查时间不超过10s),如无搏动则为心脏停搏,即使在该时限内未触及脉搏,也应开始胸外心脏按压。检查方法:救护者站在患者一侧,一只手放在患者前额,另一只手的示指和中指并拢,先触摸到患者喉结,然后平喉结向靠近救护者近侧的颈部滑行2~3cm,至胸锁乳突肌内侧凹陷处,轻轻触摸颈动脉搏动。触摸时不可用力过猛,且两侧不能同时进行,以防阻断脑血流,影响脑供血。

(3)呼吸停止或喘息:依据2020年《美国心脏协会心肺复苏及心血管急救指南》,专业人员应在评估患者意识后同时评估患者呼吸和脉搏,如患者无反应且没有呼吸或仅仅是喘息,应尽早启动应急反应系统(请求支援),并立即进行现场心肺复苏。

2. 启动急救反应系统 在院外,如果患者无反应,应立即寻求帮助,请他人或通过手机拨打急救电话,启动急救反应系统,有条件时获取自动体外除颤器(automated external defibrillator, AED)。在院内,判断患者无反应、无呼吸、无大动脉搏动时,应立即呼叫医护团队或紧急快速反应小组,获取除颤器等急救设备与物品。

3. 体位安置 患者于复苏体位,仰卧于地面或硬板床上,若患者在软床上,应在其身下垫以木板或特制木垫。头、颈、躯干平卧无扭曲,呈一条直线,双手放于身体两侧。若患者俯卧、面部朝下且怀疑颈椎有损伤时，应注意头颈部保护，使头、颈、肩以及躯干于同一水平翻转，避免扭曲，防止进一步加剧脊柱损伤。救护者站或跪于患者肩颈侧旁，解开患者衣扣和腰带，暴露胸部，便于实施救护。

图2-5 现场复苏流程

\r
4. 胸外心脏按压(circulation, C) 又称人工循环, 是指通过按压推动血液在血管内流动, 使携有新鲜氧气的血液从肺部血管流向心脏, 再从心脏流经动脉到全身组织, 以维持重要脏器的供血、供氧。有效的胸外心脏按压可产生 60 ~ 80mmHg 收缩期动脉峰压。

(1) 按压部位: 成人按压部位在胸部正中, 胸骨的下半部, 相当于男性两乳头间连线之 CPR: 胸外间的胸骨处(图 2-6)。救护者也可用示指和中指确定患者一侧肋弓下缘, 然后沿肋弓下心脏按压缘向上滑行至两侧肋弓的会合点(即胸骨下切迹处), 将示指及中指两横指放在胸骨下切迹上方, 示指上方的胸骨正中区为按压区。

图2-6 按压部位

\r
(2) 按压方法与姿势: 救护者站或跪在患者一侧身旁, 将一只手掌的
根部置于胸骨两乳头连线处, 掌根部与患者胸骨纵轴方向一致, 另一只手掌根部重叠在该手背上, 十指交叉, 手指尽量向上翘起, 避免触及胸壁和肋骨。救护者身体稍前倾, 双肩在患者胸骨正上方, 腕、肘、肩关节伸直, 以髋关节为支点, 利用上半身重量垂直向下按压, 随后放松, 使胸廓自行复位, 但掌根不能离开胸壁, 以确保按压位置准确。按压应平稳、有规律地进行, 不能间断, 不能冲击式猛压(图 2-7)。

图2-7 按压姿势

\r
(3) 按压深度: 成年人至少 5cm (根据 2020 年《美国心脏协会心肺复苏及心血管急救指南》, 通常认为 5~6cm 较为合适)。

(4) 按压频率: 成年人 100 ~ 120 次/分 (15 ~ 18s 完成 30 次按压), 按压与放松时间相等, 连续按压 30 次后进行人工呼吸。

(5) 按压与呼吸比: 成功的胸外心脏按压应同时配合人工呼吸, 按压 - 通气比为 30:2。

(6)注意事项:①患者体位不正确,未躺在坚硬的平面上,则按压不能产生足够的心排血量。②按压时肘部不能弯曲,双肩位于双手正上方,放松时手掌不离开胸骨的按压部位,以防按压部位不准确,影响按压效果。救护者应避免在按压间隙倚靠在患者胸上,以便每次按压后胸廓能充分回弹。③按压力量不足,则按压深度达不到标准;冲击式按压、猛压会导致肋骨骨折、气胸、血胸或内脏损伤等并发症。

5. 开放气道(airway, A) 开放气道的操作应迅速有效, 以尽可能减少胸外心脏按压的中断。

(1) 清除呼吸道异物: 在开放气道之前, 首先检查患者口腔是否有异物(如呕吐物、血液、黏液、义齿等), 如有异物, 可用纱布将其清除。

(2) 常用手法: 开放气道的方法有仰头举颏法、仰头抬颈法、双手托颌法 3 种, 救护者可根据患者的伤情选择开放气道的方法。一般没有头或颈部创伤表现的患者, 应采用仰头举颏法开放气道; 如怀疑患者有颈部损伤, 可采用双手托颌法。

1) 仰头举颏法: 患者取仰卧位, 双手放于身体两侧, 头、颈、躯干在同一直线上。救护者在患者一侧,一手掌根放于患者前额处,用力下压使头部后仰,另一手示指与中指并拢置于下颏处,向上抬起下颏,使口微张,注意手指不要压迫颈前软组织,以免压迫气管(图2-8A)。此法为开放气道最常用的方法,但不适用于颈椎损伤患者。

2) 仰头抬颈法: 患者取仰卧位, 救护者在患者一侧, 一手掌根放于患者前额处, 用力下压使头部后仰, 另一手置于患者颈后向上用力, 双手一上一下用力配合, 使头后仰、口微张(图 2-8B)。

3) 双手托颌法: 患者体位同前, 救护者在患者头顶侧, 肘部支撑在患者躺的平面上, 用双手第 2~5 指从耳垂前抓住患者下颌骨向上提起, 使头部后仰, 同时, 拇指压在患者下唇处, 保持口微张。对怀疑有头、颈部损伤者, 此法更安全(图 2-8C)。

A. 仰头举颏法

\r
B. 仰头抬颈法

\r
C. 双手托颌法

\r
图2-8 开放气道

6. 人工呼吸(breathing, B) 开放气道后,须立即施行人工呼吸,使气体被动进入和排出肺,以保障氧的供给和二氧化碳的排出。救护者吸气后呼出的气体含氧量可达18%,潮气量>400mL,连续人工呼吸,可使患者肺中氧浓度接近正常水平。常用的人工呼吸方法有口对口人工呼吸、口对鼻人工呼吸、口对口鼻人工呼吸。

(1) 口对口人工呼吸: 救护者用开放气道时压住患者前额手的拇指、示指捏紧患者的鼻孔(防止吹气时气体从鼻孔逸出), 另一手将嘴唇分开, 救护者的嘴完全包住患者口部, 给予一次均匀吹气, 同时双眼斜视胸廓, 以胸廓抬起为有效标志; 然后, 松开患者口鼻, 使患者借胸廓和肺的弹性回缩被动地完成呼气(图 2-9)。连续吹气 2 次, 每次吹气时间要在 1s 以上, 保证足够的潮气量使胸廓抬起。为防止交叉感染, 有条件者可将单层纱布覆盖在患者口部进行人工呼吸。呼吸频率为 10~12 次/分, 每次吹气量为 500~600mL。

图2-9 口对口人工呼吸

\r
(2) 口对鼻人工呼吸: 适用于不能经口吹气的患者, 如牙关紧闭、口不能张开、口对口封闭困难、口腔周围严重外伤或其他原因不适宜口对口吹气者。口对鼻人工呼吸时, 救护者以一手的小鱼际侧压住患者前额, 使其头后仰, 另一手托起下颌, 使口完全闭合, 然后救护者用双唇包绕患者鼻部, 用力向患者鼻孔内吹气。若患者鼻出血或鼻阻塞时, 禁用口对鼻吹气, 防止把血或异物吹入气管深处。

(3) 口对口鼻人工呼吸: 适用于婴幼儿。患儿平卧, 头略后仰, 下颌轻轻向上抬起, 使患儿的口、鼻孔充分开放, 然后救护者深吸一口气, 用口包住患儿口、鼻进行吹气。吹气时注意观察患儿胸部起伏情况, 防止吹气过大、过猛损伤患儿肺部, 吹气适量的标志是患儿胸部抬起。

吹气后,救护者迅速移到患儿胸侧,确定按压部位,做连续30次的胸外心脏按压,胸外心脏按压与人工呼吸之比为30:2,如此反复进行,5个循环(大约2min)为一个周期。每5个循环应检查一次脉搏,但时间不应超过10s。如果有高级气道支持的情况下,医务人员每5~6s给予一次呼吸(10~12次/分),并以100~120次/分的频率同时进行持续胸部按压。

7. 早期除颤 除颤是借用体外除颤器向患者胸廓放电或直接作用于心脏，以达到有效抢救心搏骤停患者为目的的一种方法。由于心源性心搏骤停最常见的心电图表现是心室颤动，而治疗心室颤动最有效的方法就是电除颤。如不能及时进行电除颤，数分钟后就可能转为心脏停搏，因此，心搏骤停后要力争在3min内进行首次电除颤。CPR可以延长心室颤动，推迟心室骤停的发生，延长除颤的时间窗，所以CPR与除颤应联合使用。依据2020年《美国心脏协会心肺复苏及心血管急救指南》，当可以立即取得AED时，目击到成人心搏骤停，救护者应尽快使用AED；若成人在未受监控的情况下发生心搏骤停，或不能立即取得AED时，应在他人前往取得AED及准备AED时开始心肺复苏，当设备可以使用后，应尽快尝试除颤。

8. 复苏有效和终止指标

(1) 心肺复苏有效的表现: ①患者出现自主呼吸; ②可触及大动脉搏动; ③颜面、口唇转为红润; ④瞳孔缩小, 对光反射恢复; ⑤收缩压≥60mmHg。

(2)心肺复苏终止的指标:①心肺复苏成功;②心肺复苏抢救持续1h,仍无心搏和脉搏;③脑死亡。

考点提示:心肺复苏有效的判断标准。

知识链接

救助人该不该承担民事责任？

在院外,因见义勇为实施心肺复苏术造成患者损伤,救助者是否要承担法律责任?如果没有施救成功,家属要求赔偿怎么办?这些可能是我们
对需救助者施以援手时会一闪而过的想法。

2021 年 1 月 1 日《中华人民共和国民法典》的实施解决了大家的顾虑,其第一百八十四条规定:“因自愿实施紧急救助行为造成受助人损害的,救助人不承担民事责任。”

9. 婴儿和儿童心肺复苏术 与成人做法基本相同。成人、儿童和婴儿实施 CPR 的比较见表 2-1。

(1) 意识判定: 对无语言表达能力的婴幼儿, 可以弹足底、拍打足跟部或捏掐其合谷穴, 如无反应, 则为意识丧失。

(2) 脉搏判定: 因婴儿颈部短粗且一般较胖, 复苏时触摸颈动脉较困难, 可用触摸肱动脉或股动脉来判断心搏是否存在。方法是救护者将拇指放在患儿上臂外侧, 示指与中指轻轻压在上臂内侧肘和肩之间, 可触及肱动脉搏动。

(3)胸外心脏按压:婴儿的胸外心脏按压部位是两乳头连线中点与胸骨正中线交叉点下方一横指处,采用环抱法用单手按压或双手拇指重叠按压(图2-10)。对儿童则用一只手掌根做胸外心脏按压,部位为两乳头连线的胸骨处。按压深度,婴幼儿大约为4cm,儿童大约为5cm。

(4)除颤:儿童除颤的目的、操作方法和要求基本与成年人相同,但儿童除颤能量的选择第一次为2J/kg,以后按4J/kg计算。

表 2-1 成人、儿童和婴儿实施 CPR 比较

\r
单手按压(1名救护者)

\r
双手拇指重叠按压(2名以上救护者)

\r
图2-10 婴儿按压法

知识链接

自动体外电除颤

自动体外除颤器是一种便携、易于操作、配置在公共场所、专为心搏骤停患者现场急救设计的除颤设备，具有自动识别、鉴别和分析心电节律，自动充电、放电和自检功能。

操作者在使用 AED 时,首先将所附 2 个电极板按指示分别贴于患者右锁骨下及心尖处,打开开关后按照声音和屏幕文字提示完成简易操作。根据自动心电分析系统提示,确认为可电击的心律后,即可按下电击/放电 (shock) 键。此后系统立即进入心律再分析阶段,以决定是否再次除颤。常规采用双向波能量,成人常以 150J 为宜,小儿可按每千克体重 2J。2020 年《美国心脏协会心肺复苏及心血管急救指南》建议在发生有目击者心搏骤停概率相对较高的公共区域(如机场、体育场馆等)推广 AED 项目,以提高心搏骤停患者的存活率。

考点提示: BLS 的核心步骤。

(二) 进一步生命支持

进一步生命支持是在 BLS 基础上,应用辅助设备及特殊技术,建立和维持有效的通气和血液循环,识别及治疗心律失常,建立有效的静脉通路,改善并保持心肺功能及治疗原发疾病。它是心搏骤停后 5~10min 的第二个处理阶段,一般在医疗单位由专业人员进行,包括建立静脉输液通道、药物治疗、电除颤、心电监护、气管插管、机械呼吸等一系列维持和监测心肺功能的措施。ACLS 应尽可能早地开始,如 BLS 与 ACLS 同时进行,可
取得较高的疗效。

1. 明确诊断 尽可能迅速地进行心电监护和必要的血流动力学监测, 明确引起心搏骤停的病因和心律失常的类型, 以便及时采取相应的救治措施。

2. 呼吸支持 心肺复苏时,急救人员可采用口咽气道、鼻咽气道以及其他可选择的辅助气道保证人工呼吸。

(1) 口咽/鼻咽通气管: 可使舌与咽喉壁分开, 防止舌后坠, 为进一步生命支持创造条件。置入通气管后, 可通过通气管人工通气, 也可通过面罩给氧或经呼吸机加压给氧, 以提供呼吸支持。

(2) 球囊－面罩通气: 又称简易呼吸器, 其供氧效果较徒手人工呼吸效果更佳, 并节省人力, 尤其适用于有气管内插管和转运途中患者的呼吸支持(具体内容详见本章第四节)。

(3)气管插管及气管切开术:是控制气道最有效的方法,可及时清除气道分泌物和异物,增加肺泡有效通气量,减少气道阻力及无效腔,提高呼吸道气体交换效率,并可与简易呼吸器或呼吸机相接供氧。有条件时,应及早进行气管插管。气管切开术适用于需要较长时间控制气道者,如心肺复苏后仍然长期昏迷的患者。

(4) 呼吸机的应用: 应用呼吸机加压给氧是最有效的供氧方法, 可减少呼吸道无效腔, 保证足够供氧, 且呼吸参数易于控制。呼吸机供氧时, 可从给予纯氧开始, 以后根据血气分析结果调整吸入氧浓度, 满足患者对氧的需求(具体内容详见本章第四节)。

3. 药物治疗

(1)用药目的:①激发心脏复跳,增强心肌收缩力,防止心律失常;增加心肌血流灌注,增加脑血流量。②纠正水、电解质及酸碱平衡失调,使其他血管活性药物更能发挥效应。③提高室颤域,为除颤做好准备。

(2) 给药途径: 心搏骤停时, 在不中断 CPR 和快速除颤的前提下, 应迅速建立静脉、气管内、骨髓或心内注射给药途径。

1) 静脉给药(IV): 常选择经肘静脉插管到中心静脉给药, 效果可靠, 作用迅速。因锁骨下静脉或颈静脉插管对CPR操作有一定影响，故不常用。因外周静脉给药效果相对较差，故尽量避免使用。

2)气管内给药(ET):建立静脉通道有困难时,可通过气管内给药,肾上腺素、利多卡因、阿托品、纳洛酮等都可经气管内给药。其剂量应为静脉给药的2~2.5倍,使用5~10mL生理盐水或蒸馏水稀释后,由气管导管远端匀速推注,并接通正压通气,使药物迅速弥散到两侧支气管。气管内给药的吸收速度与静脉给药的吸收速度基本相似,而作用维持时间为静脉给药的2~5倍。但因药物被气管内分泌物稀释或因气管黏膜血液循环不佳而减慢吸收,用药剂量相对较大,而作为选择给药的第二途径。

3) 骨髓给药(IO): 由于骨髓腔内有不会塌陷的血管丛, 是可供选择的另外一种给药途径, 其给药效果相当于中心静脉通道。如果无法建立静脉通路, 可建立骨髓通路进行液体复苏、给药和采集血液标本。

4) 心内注射给药: 自胸外向心内注射药物已不再作为常规首选途径, 近年主张在开胸内挤压的可视条件下直接注入室内。心内注射给药时应注意选择大小适宜的心内注射针头, 如果针头长度达不到心室腔可导致穿刺失败。最好选择右心室穿刺, 因该处心室壁较薄、血管较少, 穿刺时不易损伤血管。自胸外向心内注射给药时应停止人工呼吸, 以防刺伤肺组织形成气胸, 进针后抽得大量回血, 方可将药液注入, 切忌把药液注入心肌内, 以免引起心肌坏死或心律失常。心内操作要迅速, 尽量缩短心脏按压时间。

(3)常用药物:应尽快遵医嘱给予下列复苏药物。

1) 肾上腺素: 是治疗心搏骤停的首选药物。它是 α 受体和 β 受体的兴奋剂, 可以加速心率, 加强心肌收缩, 升高主动脉舒张压, 但不增加冠状动脉和脑血管阻力, 可改善冠状动脉灌注和脑血流量, 有利于心肺脑复苏。它可使心室纤颤由细颤转为粗颤, 提高电除颤成功率。用法: 首次剂量 1mg 静脉注射, 给药后再推注 20mL 液体, 促进药物更快达到中心循环, 每 3~5min 重复一次。如需气管内给药, 初始剂量应为 2~2.5mg, 溶于注射用水或生理盐水 5~10mL 中注入气管。

2) 胺碘酮: 在心肺复苏中, 如给予 2 或 3 次电除颤和血管加压药物仍无效时, 立即用胺碘酮 300mg(或 5mg/kg) 溶于 20~30mL 液体中快速静脉推注, 然后再次除颤; 如仍无效, 可于 10~15min 后重复追加胺碘酮 150mg 静脉注射。心室颤动转复后, 以胺碘酮 0.5mg/min 维持滴注。

3) 利多卡因: 针对心室颤动、无脉性心动过速导致的心搏骤停, 恢复自主循环后, 可以考虑立即给予利多卡因。利多卡因是治疗急性心肌梗死并发多发性室性期前收缩的首选药物, 可以提高心室颤动阈值, 降低心肌的应激性, 预防和终止心室颤动。用法: 1 ~ 1.5mg/kg 静脉注射, 5 ~ 10min 后重复用 0.5mg/kg, 总剂量不超过 3mg/kg。

4) 阿托品: 具有阻断 M 胆碱能受体的作用, 从而避免迷走神经对心肌的抑制, 增加窦房结和房室结的自律性与传导性, 尤其适用于迷走神经反射所致的心搏骤停。阿托品还能抑制腺体分泌, 缓解支气管痉挛, 兴奋呼吸中枢, 这对保持呼吸道通畅和促进肺通气有利。用法: 心脏停搏和无脉性电活动者, 使用剂量为 0.5mg 静脉注射; 若持续性心脏停搏, 在 3~5min 内重复给药; 如仍为缓慢性心律失常, 每 3~5min 注射 0.5~1mg, 至总剂量为 3mg。

5)碳酸氢钠：心搏骤停发生后，在缺血、缺氧的情况下，身体极易出现水、电解质和酸碱失衡，其中以酸中毒为主。在心肺复苏早期即心搏骤停的 10min 以内，纠正酸中毒的措施应该以改善通气为主，最佳措施是气管插管和人工呼吸。只有在较长时间心搏骤停或严重代谢性酸中毒时，才考虑应用碳酸氢钠。另外，对高钾血症所致心搏骤停及危及生命的高血钾时，可考虑使用碳酸氢钠；对三环类抗抑郁药导致的心脏毒性，使用碳酸氢钠可预防心脏停搏。

考点提示:常用的复苏药物。

(三)持续生命支持

持续生命支持是复苏后对生命持续的维护,重点是脑保护、脑复苏及复苏后疾病的防治,即除了积极进行脑复苏，还应严密监测心、肺、肝、肾、凝血及消化器官的功能，一旦发现异常，立即采取有针对性的治疗。

心搏骤停时因缺血、缺氧，最易受损的是中枢神经系统。复苏成功与否，在很大程度上与中枢神经系统功能是否恢复密切相关，所以心肺复苏后脑保护决定复苏后存活质量。

1. 脑复苏

(1) 维持血压: 循环停止后, 脑血流的自主调节功能丧失, 而依赖于脑灌注压, 故应维持血压于正常或稍高于正常水平, 以恢复脑循环和改善周身组织灌注, 同时应防止血压过高而加重脑水肿, 防止血压过低而加重脑及其他脏器组织缺血、缺氧。因此, 复苏后应连续进行心电监测, 以观察心率快慢、有无心律失常等; 同时还要进行血流动力学监测, 包括血压、中心静脉压、心排血量、肺小动脉楔压、心排血指数、外周血管阻力和尿量等以指导治疗。为防止血压过低, 可用血管活性药物提高动脉压到正常水平, 以保证脑的灌注压, 降低血液黏稠度, 扩充血容量; 同时应防止血压过高加重脑水肿, 在复苏后, 输液量也应控制在 1500 ~ 2000mL/d, 但尿量须保持在 30mL/h 以上。

(2) 呼吸管理: 大脑缺氧既是脑水肿的重要根源, 又是阻碍呼吸恢复的重要因素, 所以在心搏骤停开始时应及早加压给氧, 以纠正低氧血症。应用呼吸机过度通气, 使 PaCO2 降低, 从而使脑小动脉平滑肌收缩, 脑血容量缩减, 有利于防止颅内压升高及“反跳”现象。一般采用中等程度控制过度换气。纠正低氧血症和过度换气, 有利于对缺氧性损伤的恢复, 保证脑组织充分供氧。

(3) 降温: 脑组织的代谢率决定脑局部血流的需求量。体温每升高 1∘ C, 脑代谢率约增加 8%。复苏后, 体温升高可导致脑组织氧供需关系的明显失衡, 从而影响脑的康复。对心搏骤停后恢复自主循环的昏迷成年患者应采用目标温度管理, 目标温度选定在 32～36∘ C, 并至少维持 24h。有研究表明, 轻度低温 ( 34∘ C) 对于减轻脑缺血性损伤有很好的疗效, 且损害作用较小。低温可降低脑代谢、减少 ATP 消耗, 减少酸代谢产物在体内堆积, 减轻脑水肿, 降低颅内压, 缓解脑充血。

1) 降温开始时间: 发生脑细胞损伤和脑水肿的关键时期是循环停止后的最初 5min。因此, 降温时间越早越好, 争取在抢救开始后 5min 内用冰帽降温。

2) 降温深度: 降温可保护缺氧的脑组织, 减少颅内充血(或出血)。脑部的温度每降低 1∘ C, 颅内压下降 5.5%。脑组织温度降至 28∘ C, 脑电活动明显呈保护性抑制状态, 但体温降至 28∘ C 易诱发心室颤动等严重心律失常, 所以不论患者体温正常或升高, 均应将体温(肛表或鼻腔温度) 降至亚冬眠水平 ( 35∘ C) 或冬眠水平 ( 32∘ C)。脑水肿患者要求在 30min 内将体温降至 37∘ C 以下, 在数小时内达到预期降温目的。

3) 降温持续时间: 根据病情决定, 一般需 2~3 天, 严重者可能要 1 周以上。为了防止复温后脑水肿反复和脑耗氧量增加而加重脑损害, 故降温持续至中枢神经系统皮质功能开始恢复, 即以听觉恢复为指标, 然后逐步停止降温, 使体温自动缓慢上升, 绝不能复温过快, 一般以 24h 体温提升 1~2℃ 为宜。

4) 降温方法: ①物理降温, 头部可用冰帽或冰枕降温, 体表大血管处可用冰袋降温。②药物降温, 应用冬眠药物进行冬眠疗法。通常需二者同时使用, 方能达到降温的目的和要求。

5) 护理要点: 及早降温, 深度降温, 持续降温, 平稳降温, 缓慢升温。①及早降温: 降温时间越早越好, 复苏早期就应严密监测脑功能并采取积极的复苏措施, 最好在复苏后 5~30min 内进行, 因此时是脑细胞损伤和脑水肿的关键时期。②深度降温: 头部温度要求降至 28℃, 肛温降至亚冬眠水平 (35℃)。③持续降温: 降温应持续到病情稳定、神经功能恢复、出现视觉反应为止。④平稳降温: 降温过程要平稳, 及时处理不良反应, 为防止寒战和控制抽搐, 可用小剂量镇静剂。⑤缓慢升温: 先自下而上撤冰袋, 保持每 24h 体温上升 1~2℃ 为宜。

(4)脑复苏药物的应用。

1) 冬眠药物: 主要目的在于消除低温引起的寒战, 解除低温时的血管痉挛, 改善循环血流灌注, 辅助物理降温。可选用冬眠 I 号(哌替啶 100mg、异丙嗪 50mg、氯丙嗪 50mg)。

2) 脱水剂: 为了防止脑水肿, 在降温和维持血压平稳的基础上, 宜及早应用脱水剂, 通常选用呋塞米(速尿)或20%甘露醇。20%甘露醇250mL, 静脉注射或快速静脉滴注, 30min滴完; 速尿20mg, 静脉注射, 视病情重复使用。也可选用20%甘露醇与50%葡萄糖交替使用。

3) 激素: 肾上腺皮质激素除能保持毛细血管和血－脑屏障的完整性、减轻脑水肿和降低颅内压外, 还有改善循环功能、增强溶酶体膜稳定性、防止细胞自溶和死亡的作用。最好选用作用强而潴钠潴水作用较小的皮质激素制剂, 地塞米松常为首选药物。

4) 促进脑细胞代谢药物: ATP 可供应脑细胞能量, 恢复钠泵功能, 有利于减轻脑水肿。葡萄糖为脑获得能量的主要来源, 辅酶 A、细胞色素 C、多种维生素等与脑代谢有关药物均可选用。

5) 巴比妥类药物: 巴比妥是镇静、安眠、止痉的药物, 对不全性脑缺血、缺氧的脑组织具有良好的保护作用。

6) 其他: 还可应用钙离子通道阻滞剂、氧自由基清除剂与铁离子螯合剂、兴奋性氨基酸受体拮抗剂等。

(5)高压氧的应用:高压氧(hyperbaric oxygen, HBO)能快速、大幅度地提高组织氧含量和储备,增加血氧弥散量及有效弥散距离,降低颅内压,改善脑电活动,减轻脑水肿。在复苏后期,由于 HBO 具有促进受损组织的修复和再生功能,促进侧支循环形成和重建,对神经细胞的恢复及脑循环的重建有治疗作用。

1) 应用时间: 心跳停止时间越短, 开展 HBO 治疗越早, 效果越好。

2) 应用要求: CPCR 患者心脏复跳后, 只要心率 >60 次/分, 血压用升压药能维持, 即使呼吸未恢复, 也应及时进行 HBO 治疗。最好在 24h 内进行, 即在脑水肿及感染高峰出现前进行, 可减轻神经损伤, 且有利于受损神经细胞的恢复。

3) 综合治疗: HBO 在复苏中能起到其他任何治疗不能代替的重要作用, 但不是唯一治疗方法, 应强调以 HBO 为重点的综合治疗。

(6)脑复苏的有效指征:①瞳孔对光反射恢复;②吞咽和角膜反应灵敏,出现痛觉反应;③头或四肢运动;④有听觉反射;⑤脑电图检查 α 波节律活动。当脑复苏出现以上指征,提示脑功能好转,自主呼吸恢复。

考点提示:脑保护和脑复苏的有效措施。

2. 维持循环功能 心搏恢复后,往往伴有血压不稳定或低血压状态,为判定有无低血容量及掌握好输液量和速度,宜行中心静脉压(CVP)监测,可将CVP、动脉压和尿量三者结合起来分析,以指导输液治疗。密切监测血压,避免低血压,一般血压低于90mmHg给予输液;为保证血压和全身灌注,亦可使用血管活性药、正性肌力药和增强心肌收缩药等,维持收缩压大于90mmHg。加强心电监护,注意监测脉搏、心率和心律,及时识别心律失常,选用相应的抗心律失常药防治心律失常。

3. 维持呼吸功能 心搏恢复后,自主呼吸未必恢复或即使恢复但不正常,故仍需加强呼吸管理,继续进行有效的人工通气,及时行血气监测,促进自主呼吸尽快恢复正常。自主呼吸出现的早晚提示脑功能损害程度的轻重,若长时间不恢复,应设法查出危及生命的潜在因素,给予相应的治疗,如解除脑水肿、改善脑缺氧等。注意防治肺部并发症,如肺炎、肺水肿导致的急性呼吸衰竭。除了加强抗感染治疗外,还应应用机械通气,合理选择通气参数和通气模式,在氧合良好的前提下,务必使平均气道压尽可能地低,以免阻碍静脉回流,加重脑水肿,或因胸膜腔内压增高而导致心排血量减少等。

4. 复苏后的监测与护理工作 如维持酸碱平衡,纠正酸中毒,防止肾衰竭,并做好原发病的治疗,防止继发性感染等一系列临床工作。

考点提示: 紧急救护常识——心肺复苏。

三、心脏电复律

心脏电复律是用除颤器产生高能脉冲电流,通过胸壁或直接作用于心脏,消除各类异位性快速心律失常,使心脏恢复为窦性心律的方法。心室颤动时的电复律治疗也常被称为电除颤。

心脏电复律

(一)电复律的分类及能量选择

1. 分类 根据脉冲发放与 R 波关系可分为同步电复律与非同步电复律, 根据放电形式可分为交流电复律与直流电复律, 根据电极安放位置又可分为胸内复律与胸外复律。

(1)非同步电复律:不启用同步触发装置,可在任何时间放电。适用于心室颤动、心室扑动等。

(2) 同步电复律: 为避开 T 波顶峰前 20 ~ 30ms 附近的心室易损期, 电复律脉冲的发放是利用心电图 R 波触发同步装置, 使电刺激落入 R 波降支或 R 波起始后 30ms 左右处, 相当于心室绝对不应期中, 称为同步电复律。适用于除心室颤动以外的快速型心律失常。

2. 能量选择 电复律中电能选择非常重要,能量及电流太低,电击不能终止心律失常;能量及电流太高,又可引起心肌损伤和心律失常。成人除颤时能量和体重之间并无明确的关联,婴幼儿除颤的能量则要比成人小。心室颤动时首次除颤推荐能量为 200J,第二次为 200~300J,第三次为 360J。如连续 3 次除颤失败,应继续做 CPR,并给予溴苄胺,加大肾上腺素剂量后再行电除颤,但单向波和双向波又有所不同(表 2-2)。

表 2-2 同步电复律和非同步电复律常规推荐能量对比

\r
考点提示:同步电复律与非同步电复律的区别。

知识链接

什么是单向波和双向波？

除颤分为单向波和双向波两种,也写作单相波和双相波。单向波是
单极发送电流,属于单相衰减正弦(monophasic damped sine, MDS)波形,其波形是半个正弦波,电脉冲强度是逐渐衰减的。双向波除颤主要以双相切角指数(biphasic truncated exponential, BTE)波形和双相方波形(rectilinear biphasic waveform, RBW)为代表。双向波的波形是一个完整的正弦波,双向波除颤时,除颤仪先后向心脏释放方向相反的双向电脉冲。

简单来讲，单向波是向一个方向发电，而双向波是先后向心脏释放方向相反的双向电脉冲。因此，单向波选择的能量较大，除颤电流峰值较高，对心肌功能可能造成较明显的损伤；与单向波相比，双向波的电流峰值较低，对心肌功能可能造成的损伤程度较轻。

(二)适应证和禁忌证

1. 适应证

(1) 非同步电复律: ①心室颤动、心室扑动; ②心脏停搏; ③心脏电机械分离。

(2)同步电复律:①心房颤动发病的时间在1年以内,药物治疗无效,无明显心脏扩大及出现生命体征改变者;②对心室率较快的心房扑动,应首先进行同步电复律;③药物和其他治疗无效,且出现明显血流动力学改变的室上性心动过速和室性心动过速者;④合并有预激综合征的异位性快速心律失常,在诊断和选择药物较困难的情况下,亦可用同步电复律治疗。

2. 禁忌证

(1)洋地黄中毒性心律失常和(或)低钾血症引起的快速型心律失常(室颤除外)者。

(2) 心房颤动或室上性心动过速伴高度或完全性房室传导阻滞者。

(3)病态窦房结综合征患者。

(4) 复律后不具备长期用药维持治疗,或药物维持治疗下反复发生心房颤动者。

(5)左心房扩大或二尖瓣有明显反流者。

(6)心脏扩大明显,心胸比例>60%,房颤病史>5年者。

(7)风湿性心脏病伴心房颤动,且风湿活动者。

(8)器质性心脏病心力衰竭未纠正者。

(三)电极板(贴)位置

1. 前 - 后位 一块电极板放在左/右背部肩胛下区, 另一块放在胸骨左缘第 3~4 肋间水平。

2. 同侧位(左-右位) 一块电极板放在胸骨右缘第2~3肋间(心底部),另一块放在左腋前或腋中线内第5肋间(心尖部区域)。

两电极之间的距离大于 10,cm ，电极之间的皮肤保持干燥（图 2-11）。

图2-11 电极板(贴)位置

考点提示:电极板放置的位置。

(四) 操作准备

1. 患者心理准备 操作前告知患者或家属电复律的目的和必要性、大致过程、可能出现的不适及并发症，以取得其合作。

2. 术前检查 电解质、心电图、心脏超声等。

3. 备齐物品 心脏电复律仪器(除颤器), 应接好地线与电源; 导连线、电极片、导电糊或生理盐水纱布等。

(五) 操作步骤

(1) 检查及调试除颤器。

(2) 将用物备齐, 按使用顺序置于护理车上, 推至患者床旁, 使患者平卧于硬板床上。

(3)评估患者的意识、病情,心电图或心电示波器是否有心室颤动波,确定除颤指征。

(4)暴露胸部，确定患者除颤部位无伤口，在电极板及患者胸部均匀涂抹导电糊。

(5) 打开除颤器电源, 设置到非同步位置“除颤”, 调节除颤器能量至所需读数, 开始充电。

(6) 选择同侧位或前－后位放置电极板，用较大压力(2~5kg
)使胸壁与电极板紧密接触。

(7) 充电至所需能量 360J(单向波)或 150~200J(双向波)后,再次观察心电图情况。确实需要除颤时,嘱无关人员离开患者和病床,两手拇指同时按压手柄放电按钮进行除颤。

(8)除颤后立即进行心肺复苏术(5个循环),并按医嘱给予复苏药物;再次评估,如无效可再次进行除颤。

(9) 放电完毕后, 观察心电监护仪, 评估患者, 心律转为窦性时, 除颤成功。

(10) 将患者身上的导电糊擦拭干净, 取舒适卧位, 整理床单位。

(11) 清洁电极板, 消毒后归位。整理用物, 洗手, 记录。

(六)注意事项

(1)除颤前确定患者除颤部位无潮湿、无敷料；如患者带有植入性起搏器，应注意避开起搏器部位至少2.5cm。

(2) 放电前确定周围人员无直接或间接与患者接触。

(3) 操作者身体不能与患者及金属类物品直接或间接接触。

(4) 动作迅速、准确。

(5)保持除颤器完好备用。

(6)对洋地黄过量所致心室颤动,应从低能量开始。

(7) 患者如为细颤,除颤前可给予肾上腺素,使之转为粗颤后再进行电除颤。

(七)术后护理与病情监测

1. 注意休息 卧床休息 24h, 并且要准备好各种抢救器材和药品。电复律早期患者应绝对卧床休息, 限制人员探视, 保持病室安静、整洁, 护士协助完成卧床期间的各项生活护理。予以氧气吸入以减轻心肌缺血、缺氧, 传导复极不均的状态。

2. 持续心电监护 心电图床边连续监护, 注意心率、心律变化, 观察神志、瞳孔、呼吸、血压、皮肤及肢体活动情况。

3. 并发症 电复律后电极板放置处皮肤有红斑或灼伤,术后当日加强巡视,及时发现并处理。

4. 注意饮食 清醒后 2h 内暂不进食, 之后要给予高热量、高维生素、易消化的饮食, 保持大便通畅。

5. 心理护理 操作结束,患者抢救成功后可能有濒死的恐惧感,出现焦虑、悲观的情绪,担心复发,高度的精神紧张可使心率加快,导致心律失常的再次发作。因此,护士应陪伴在患者床边,安慰鼓励患者,耐心做好病情解释,必要时给予镇静剂。

考点提示:心搏骤停患者的护理。

目标检测

1. 引起心搏骤停的最常见原因是( )。

A. 慢性阻塞性肺疾病

B. 糖尿病

C. 冠心病

D. 药物中毒

E. 颅脑外伤

2. 如果疑似患者发生心搏骤停, 判断心搏骤停的最重要指标是( )。

A. 意识丧失、一侧瞳孔散大

B. 意识丧失、牙关紧闭、抽搐

C. 意识丧失、没有呼吸或仅是喘息、颈动脉搏动消失

D. 意识淡漠、全身湿冷、触摸不到桡动脉搏动

E. 意识丧失、大小便失禁

3. 终止室颤最迅速、最有效的措施是( )。

A. 立即给予胸外心脏按压

B. 立即给予除颤

C. 尽快给予气管插管

D. 立即给予球囊面罩通气

E. 立即给予肾上腺素 1mg 静脉注射

4. 心搏骤停后,最先受到损害的器官是( )。

A. 心脏

B. 肝脏

C. 肺部组织

D. 脑组织

E. 肾脏

5. 关于成人胸外心脏按压的描述, 正确的是( )。

A. 按压频率为每分钟 100 ~ 120 次

B. 胸骨尽量下陷

C. 随时停止胸外心脏按压查看心电监护

D. 按压放松时, 手掌根部要倚靠在患者胸壁上

E. 双人心肺复苏时, 按压 - 通气比为 15:2

6. 下列不是判断心肺复苏有效的指标的是( )。

A. 瞳孔由大变小

B. 触及颈动脉搏动

C. 瞳孔散大

D. 出现对光反
射

E. 面色由发绀转为红润

7. 心肺复苏时首选给予的药物是( )。

A. 阿托品

B. 胺碘酮

C. 碳酸氢钠

D. 利多卡因

E. 肾上腺素

8. 脑复苏的主要措施是( )。

A. 维持血压和体温

B. 降低体温和血压

C. 防治脑缺氧, 提高颅内压

D. 防治脑水肿, 利尿, 目标体温管理

E. 维持血压, 防治缺氧, 目标体温管理

(王亚妮 杨萍 许天亮)`,rawHtml:`<p>学习目标</p>\r
<p>素质目标:具备认真、科学、严谨、求实的态度及高度的责任心,培养紧密协作的团队协作精神,树立“敬佑生命、救死扶伤、甘于奉献、大爱无疆”的急救理念。</p>\r
<p>知识目标: 掌握心搏骤停的原因、类型及诊断, 心肺脑复苏三阶段的生命支持、电除颤方法及监测要点; 掌握常见的气道通畅术、创伤急救技术, 简易呼吸器的使用方法, 正确识别呼吸机的常见模式、参数和报警原因; 掌握洗胃的方法、适应证和禁忌证; 掌握重症监护常用监测方法、监测指标的正常值和临床意义。熟悉心搏骤停不同类型波形、气道梗阻的原因、气管插管和气管切开的方法、清创的方法及配合、出血的判断、简易呼吸器和呼吸机的结构、呼吸机的并发症。了解 CPCR 发展史、简易呼吸器和呼吸机的分类、工作原理。</p>\r
<p>能力目标:具备敏感的急救意识和应急应变能力,能够对心搏骤停者迅速作出判断,并正确实施心肺脑复苏术;能够应用除颤仪、简易呼吸器对患者正确实施救护;能够熟练运用气道通畅术对气道梗阻患者进行急救;能够对常见外伤患者进行快速评估,并进行紧急处理;能够熟练运用洗胃技术对中毒患者进行规范催吐和洗胃;能够熟练运用各项重症监护技术对急危重症患者进行生命体征及系统功能监测。</p>\r
<p>案例导学</p>\r
<p>患者,女,56岁。昏倒在路边被路人发现,约10min救护车到达现场。患者意识丧失,呈临终呼吸状态。查体:双侧瞳孔散大,对光反应迟钝,颈动脉搏动、心音、呼吸音均消失。ECG显示QRS波群消失,代之以大小不等、形态各异的颤动波,频率为290次/分。在其包内发现有治疗哮喘的药物。</p>\r
<p>请思考：</p>\r
<p>1. 该患者出现了什么情况？</p>\r
<p>2. 如何开展急救护理工作？</p>\r
<p>心搏骤停为临床上最危重的急症，针对心搏骤停者的抢救性医疗措施称为心肺复苏（cardiopulmonary resuscitation, CPR），它挽救了众多心跳、呼吸骤停者的生命。据报道，10%~40%接受CPR且存活者遗留明显的永久性脑损害。这一事实引起了人们对脑保护及脑复苏的重视，推动了脑复苏的研究和实施，将CPR扩展为心肺脑复苏（cardio-pulm
onary-cerebral resuscitation, CPCR），即包括心、肺、脑复苏三个主要环节（图2-1）。</p>\r
<p style="text-align: center;">图2-1 心肺脑复苏流程</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-4-l.jpg" /><figcaption></figcaption></figure>\r
<p>一、心搏骤停</p>\r
<p>(一)心搏骤停的概念</p>\r
<p>心搏骤停(sudden cardiac arrest,SCA)是指心脏因急性原因突然丧失其有效的排血功能而导致循环和呼吸功能停止，全身血液循环停滞，组织缺血、缺氧。心搏骤停患者处于“临床死亡期”，如果能够得到及时、有效的救治，患者可以存活；反之，将迅速发生不可逆转的生物学死亡。心搏骤停常为心脏性猝死的直接原因。</p>\r
<p>心脏性猝死(sudden cardiac death, SCD)是指急性症状发作后1h内发生的以意识骤然丧失为特征、由心脏原因引起的生物学死亡。心搏骤停与心脏性猝死的区别在于前者通过紧急治疗有逆转的可能，而后者是生物学功能不可逆转的停止。因此，早期识别心搏骤停是实施CPR的前提条件，可减少生物学死亡的发生率。</p>\r
<p>(二)心搏骤停的原因</p>\r
<p>1. 心源性心搏骤停 因心脏本身的病变所致。冠心病是导致成人心搏骤停的最主要原因，其中急性冠脉综合征（如急性心肌梗死或不稳定型心绞痛等）常引发心室颤动或心室停搏，造成成人心搏骤停。其他病因还包括心肌受损、主动脉瓣狭窄、心肌炎、风湿性瓣膜病、严重心律失常等。</p>\r
<p>2. 非心源性心搏骤停 因其他疾患或因素影响心脏所致,如溺水、窒息、电击、中毒、麻醉或手术意外、严重的电解质与酸碱平衡失调等均可引起呼吸、心跳停止。</p>\r
<p>(三)心搏骤停的类型</p>\r
<p>根据心脏生物电活动情况及心电图表现,心搏骤停可表现为心室颤动、心脏停搏和心脏电机械分离。</p>\r
<p>1. 心室颤动 简称室颤。心室肌发生极不规则的、快速的、不协调的颤动；心电图表现为 QRS 波群消失，代之以大小不等、形态各异的颤动波，频率为 200～400 次/分。若颤动波波幅高并且频率快，则较容易复律；若波幅低并且频率慢，则复律的可能性小，多为心脏停搏的先兆(图 2-2)。</p>\r
<p style="text-align: center;">图2-2 心室颤动</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-5-l.jpg" /><figcaption></figcaption></figure>\r
<p>2. 心脏停搏 又称心搏停止。心房、心室肌完全失去电活动能力，心电图多呈一条直线，或偶见P波(图2-3)。</p>\r
<p style="text-align: center;">图2-3 心脏停搏</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-6-l.jpg" /><figcaption></figcaption></figure>\r
<p>3. 心脏电机械分离 又称无脉性电活动, 心肌存在生物电活动, 而无有效的机械收缩功能, 继续出现慢而极微弱且不完整的“收缩”情况。ECG 表现为间断出现宽而畸形、波幅较低的 QRS 波群, 频率多在 30 次/分以下(图 2-4)。</p>\r

<p style="text-align: center;">图2-4 心脏电机械分离</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-7-l.jpg" /><figcaption></figcap
tion></figure>\r
<p>以上三种类型虽在心电和心脏活动方面各有其特点,但共同的结果是心脏丧失有效收缩和排血功能,使血液循环停止而引起相同的临床表现,其中以室颤最为常见。室颤多发生于急性心肌梗死早期或严重心肌缺血时,是冠心病猝死的最常见原因,也见于外科心脏手术后,如果早期给予CPR、快速除颤,其复苏成功率较高。</p>\r
<p>(四)心搏骤停的临床表现与诊断</p>\r
<p>1. 心搏骤停的临床表现 心搏骤停后, 血流运行立即停止。由于脑组织对缺血、缺氧最敏感, 临床上以神经系统和循环系统的表现最为明显, 具体表现如下: ①意识突然丧失或伴有短暂性抽搐; ②脉搏无法扪及, 血压测不出; ③呼吸停止, 或先呈叹息样, 后即停止, 多发生在心搏骤停后 30s 内; ④心音消失; ⑤双侧瞳孔散大或固定; ⑥面色苍白且发绀。</p>\r
<p>2. 心搏骤停的诊断 意识丧失伴大动脉搏动消失是心搏骤停出现较早且最可靠的临床征象。大动脉搏动通常通过触摸颈动脉进行判断，亦可触摸股动脉搏动，时间不超过10s。不可因心脏听诊、测血压或描记心电图而延误时间。因为心搏骤停后，复苏术开始的迟早是抢救成功与否的关键，必须分秒必争。意识丧失和大动脉搏动消失这两个征象存在，即可诊断为心搏骤停，应立即进行心肺复苏。</p>\r
<p>依据 2020 年《美国心脏协会心肺复苏及心血管急救指南》，鉴于脉搏判断的难度，强调非专业人员不要求判断脉搏，一旦患者出现无意识、无呼吸或呼吸不正常，就可以立即进行心肺复苏。</p>\r
<p>考点提示:心搏骤停的类型及诊断依据。</p>\r
<p>二、心肺脑复苏</p>\r
<p>心肺复苏是针对心搏骤停的有效抢救措施,于二十世纪五六十年代逐步形成,其出现挽救了众多呼吸、心跳停止者的生命。</p>\r
<p>1956年，除颤器的应用首次被记载，电除颤重新转复心脏的正常节律掀开了医学史上崭新的篇章。1958年，Safar明确了口对口人工呼吸优于“压胸抬臂通气法”。1960年，William Kouwenhoven首次倡导“不开胸心脏按压术”，开创了以胸外心脏按压为基础的心肺复苏术。口对口人工呼吸法和胸外心脏按压的结合，配以体外电击除颤法等，构成了现代心肺复苏术的三大要素。此后，各国先后制订了内容大致相同的成人心肺复苏标准和指南。1966年，全美复苏会议对CPR技术加以标准化；美国心脏协会(American Heart Association, AHA)于1974年开始制订心肺复苏指南，并于1979年和1985年制订和完善了小儿心肺复苏术；1985年，第四届全美复苏会议对CPR标准进行了评价和修改，提出心肺复苏不仅可恢复患者的呼吸和心搏，还强调了脑的复苏，将CPR扩展到CPCR，并分别于1980年、1986年、1992年、2000年、2005年、2010年、2015年和2020年修订再版，不断修改和完善。其目的是把复苏理论和临床实践相结合，提高CPR的效果。重点关注如何改进、简化复苏培训程序和提高复苏成功率，强调胸外心脏按压和团队抢救的重要性。</p>\r
<p>知识链接</p>\r
<p>从 A—B—C 更改为 C—A—B</p>\r
<p>绝大多数心搏骤停发生在成人身上，而在各年龄段患者中，心搏骤停存活率最高的为有目击者的心搏骤停者，而且初始心律是心室颤动(VF)或无脉性室性心动过速(VT)。在这些患者中，基础生命支持的关键操作是胸外心脏按压和早期除颤。在A—B—C程序中，当施救者开放气道以进行口对口人工呼吸、寻找防护装置或者收集并装配通气设备的过程中，胸外心脏按压往往会被延误。更改为C—A—B程序，可以尽快开始胸外心脏按压，同时能尽量缩短通气延误时间(也就是说，只需进行第一轮30次胸外心脏按压的时间，大约为18s；如果有2名施救者为婴儿或儿童进行复苏，延误时间会更短)。</p>\r
<p>大多数院外心搏骤停患者没有由目击者进行心肺复苏,这可能是多种原因造成的,其中一个可能的原因是A—B—C程序。该程序的第一步是施救者认为最困难的步骤,即开放气道并进行人工呼吸。如果先进行胸外心脏按压,可能会鼓励更多施救者立即开始实施心肺复苏。因此,2010年AHA心血管急救指南将A—B—C改为C—A—B,并一直沿用至今。</p>\r
<p>完整的心肺脑复苏是指对心搏骤停患者采取的使其恢复自主循环和自主呼吸，并尽早施加脑保护措施的紧急医疗救治措施。CPCR包括基础生命支持(basic life support, BLS)、进一步生命支持(advanced life support, ACLS)和延续生命支持(prolonged life support, PLS)三部分。</p>\r
<p>心肺脑复苏的成功率与抢救是否及时、有效有关。
若能在心搏骤停4min内进行BLS,8min内进行心脏除颤,则存活率可达40%。抢救越早,复苏成功率越高。</p>\r
<p>(一) 基础生命支持</p>\r
<p>基础生命支持又称初期心肺复苏,是通过徒手操作,保持心脏有一定的输出量,供应重要脏器(特别是心脏和脑)已氧合的血液。初期心肺复苏被归纳为胸外心脏按压(circulation,C)、开放气道(airway,A)、人工呼吸(breathing,B)和除颤(defibrillation,D)四部分,常简称为“CABD”四步(图2-5)。BLS是心搏骤停后挽救生命的最关键措施,其目的是迅速恢复循环和呼吸,维持生命重要器官的供血、供氧,为进一步复苏争取有利时机。</p>\r
<p>1. 诊断 首先在安全环境下,快速识别和判断心脏停搏。</p>\r
<p>(1) 意识丧失: 轻拍患者肩部并向其耳部大声呼叫, 若无反应, 即可判断为意识丧失。</p>\r

<p>(2)心脏停搏:专业救护者触摸颈动脉搏动(检查时间不超过10s),如无搏动则为心脏停搏,即使在该时限内未触及脉搏,也应开始胸外心脏按压。检查方法:救护者站在患者一侧,一只手放在患者前额,另一只手的示指和中指并拢,先触摸到患者喉结,然后平喉结向靠近救护者近侧的颈部滑行2~3cm,至胸锁乳突肌内侧凹陷处,轻轻触摸颈动脉搏动。触摸时不可用力过猛,且两侧不能同时进行,以防阻断脑血流,影响脑供血。</p>\r
<p>(3)呼吸停止或喘息:依据2020年《美国心脏协会心肺复苏及心血管急救指南》,专业人员应在评估患者意识后同时评估患者呼吸和脉搏,如患者无反应且没有呼吸或仅仅是喘息,应尽早启动应急反应系统(请求支援),并立即进行现场心肺复苏。</p>\r
<p>2. 启动急救反应系统 在院外,如果患者无反应,应立即寻求帮助,请他人或通过手机拨打急救电话,启动急救反应系统,有条件时获取自动体外除颤器(automated external defibrillator, AED)。在院内,判断患者无反应、无呼吸、无大动脉搏动时,应立即呼叫医护团队或紧急快速反应小组,获取除颤器等急救设备与物品。</p>\r
<p>3. 体位安置 患者于复苏体位,仰卧于地面或硬板床上,若患者在软床上,应在其身下垫以木板或特制木垫。头、颈、躯干平卧无扭曲,呈一条直线,双手放于身体两侧。若患者俯卧、面部朝下且怀疑颈椎有损伤时，应注意头颈部保护，使头、颈、肩以及躯干于同一水平翻转，避免扭曲，防止进一步加剧脊柱损伤。救护者站或跪于患者肩颈侧旁，解开患者衣扣和腰带，暴露胸部，便于实施救护。</p>\r
<p style="text-align: center;">图2-5 现场复苏流程</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-11-l.jpg" /><figcaption></figcaption></figure>\r
<p>4. 胸外心脏按压(circulation, C) 又称人工循环, 是指通过按压推动血液在血管内流动, 使携有新鲜氧气的血液从肺部血管流向心脏, 再从心脏流经动脉到全身组织, 以维持重要脏器的供血、供氧。有效的胸外心脏按压可产生 60 ~ 80mmHg 收缩期动脉峰压。</p>\r
<p>(1) 按压部位: 成人按压部位在胸部正中, 胸骨的下半部, 相当于男性两乳头间连线之 CPR: 胸外间的胸骨处(图 2-6)。救护者也可用示指和中指确定患者一侧肋弓下缘, 然后沿肋弓下心脏按压缘向上滑行至两侧肋弓的会合点(即胸骨下切迹处), 将示指及中指两横指放在胸骨下切迹上方, 示指上方的胸骨正中区为按压区。</p>\r
<p style="text-align: center;">图2-6 按压部位</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-13-l.jpg" /><figcaption></figcaption></figure>\r
<p>(2) 按压方法与姿势: 救护者站或跪在患者一侧身旁, 将一只手掌的
根部置于胸骨两乳头连线处, 掌根部与患者胸骨纵轴方向一致, 另一只手掌根部重叠在该手背上, 十指交叉, 手指尽量向上翘起, 避免触及胸壁和肋骨。救护者身体稍前倾, 双肩在患者胸骨正上方, 腕、肘、肩关节伸直, 以髋关节为支点, 利用上半身重量垂直向下按压, 随后放松, 使胸廓自行复位, 但掌根不能离开胸壁, 以确保按压位置准确。按压应平稳、有规律地进行, 不能间断, 不能冲击式猛压(图 2-7)。</p>\r
<p style="text-align: center;">图2-7 按压姿势</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-14-l.jpg" /><figcaption></figcaption></figure>\r
<p>(3) 按压深度: 成年人至少 5cm (根据 2020 年《美国心脏协会心肺复苏及心血管急救指南》, 通常认为 5~6cm 较为合适)。</p>\r
<p>(4) 按压频率: 成年人 100 ~ 120 次/分 (15 ~ 18s 完成 30 次按压), 按压与放松时间相等, 连续按压 30 次后进行人工呼吸。</p>\r
<p>(5) 按压与呼吸比: 成功的胸外心脏按压应同时配合人工呼吸, 按压 - 通气比为 30:2。</p>\r
<p>(6)注意事项:①患者体位不正确,未躺在坚硬的平面上,则按压不能产生足够的心排血量。②按压时肘部不能弯曲,双肩位于双手正上方,放松时手掌不离开胸骨的按压部位,以防按压部位不准确,影响按压效果。救护者应避免在按压间隙倚靠在患者胸上,以便每次按压后胸廓能充分回弹。③按压力量不足,则按压深度达不到标准;冲击式按压、猛压会导致肋骨骨折、气胸、血胸或内脏损伤等并发症。</p>\r
<p>5. 开放气道(airway, A) 开放气道的操作应迅速有效, 以尽可能减少胸外心脏按压的中断。</p>\r
<p>(1) 清除呼吸道异物: 在开放气道之前, 首先检查患者口腔是否有异物(如呕吐物、血液、黏液、义齿等), 如有异物, 可用纱布将其清除。</p>\r
<p>(2) 常用手法: 开放气道的方法有仰头举颏法、仰头抬颈法、双手托颌法 3 种, 救护者可根据患者的伤情选择开放气道的方法。一般没有头或颈部创伤表现的患者, 应采用仰头举颏法开放气道; 如怀疑患者有颈部损伤, 可采用双手托颌法。</p>\r
<p>1) 仰头举颏法: 患者取仰卧位, 双手放于身体两侧, 头、颈、躯干在同一直线上。救护者在患者一侧,一手掌根放于患者前额处,用力下压使头部后仰,另一手示指与中指并拢置于下颏处,向上抬起下颏,使口微张,注意手指不要压迫颈前软组织,以免压迫气管(图2-8A)。此法为开放气道最常用的方法,但不适用于颈椎损伤患者。</p>\r

<p>2) 仰头抬颈法: 患者取仰卧位, 救护者在患者一侧, 一手掌根放于患者前额处, 用力下压使头部后仰, 另一手置于患者颈后向上用力, 双手一上一下用力配合, 使头后仰、口微张(图 2-8B)。</p>\r
<p>3) 双手托颌法: 患者体位同前, 救护者在患者头顶侧, 肘部支撑在患者躺的平面上, 用双手第 2~5 指从耳垂前抓住患者下颌骨向上提起, 使头部后仰, 同时, 拇指压在患者下唇处, 保持口微张。对怀疑有头、颈部损伤者, 此法更安全(图 2-8C)。</p>\r
<p style="text-align: center;">A. 仰头举颏法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-16-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">B. 仰头抬颈法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-17-l.jpg" /><figcaption></fi
gcaption></figure>\r
<p style="text-align: center;">C. 双手托颌法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-18-l.jpg" /><figcaption></figcaption></figure>\r
<p>图2-8 开放气道</p>\r
<p>6. 人工呼吸(breathing, B) 开放气道后,须立即施行人工呼吸,使气体被动进入和排出肺,以保障氧的供给和二氧化碳的排出。救护者吸气后呼出的气体含氧量可达18%,潮气量&gt;400mL,连续人工呼吸,可使患者肺中氧浓度接近正常水平。常用的人工呼吸方法有口对口人工呼吸、口对鼻人工呼吸、口对口鼻人工呼吸。</p>\r
<p>(1) 口对口人工呼吸: 救护者用开放气道时压住患者前额手的拇指、示指捏紧患者的鼻孔(防止吹气时气体从鼻孔逸出), 另一手将嘴唇分开, 救护者的嘴完全包住患者口部, 给予一次均匀吹气, 同时双眼斜视胸廓, 以胸廓抬起为有效标志; 然后, 松开患者口鼻, 使患者借胸廓和肺的弹性回缩被动地完成呼气(图 2-9)。连续吹气 2 次, 每次吹气时间要在 1s 以上, 保证足够的潮气量使胸廓抬起。为防止交叉感染, 有条件者可将单层纱布覆盖在患者口部进行人工呼吸。呼吸频率为 10~12 次/分, 每次吹气量为 500~600mL。</p>\r
<p style="text-align: center;">图2-9 口对口人工呼吸</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-20-l.jpg" /><figcaption></figcaption></figure>\r
<p>(2) 口对鼻人工呼吸: 适用于不能经口吹气的患者, 如牙关紧闭、口不能张开、口对口封闭困难、口腔周围严重外伤或其他原因不适宜口对口吹气者。口对鼻人工呼吸时, 救护者以一手的小鱼际侧压住患者前额, 使其头后仰, 另一手托起下颌, 使口完全闭合, 然后救护者用双唇包绕患者鼻部, 用力向患者鼻孔内吹气。若患者鼻出血或鼻阻塞时, 禁用口对鼻吹气, 防止把血或异物吹入气管深处。</p>\r
<p>(3) 口对口鼻人工呼吸: 适用于婴幼儿。患儿平卧, 头略后仰, 下颌轻轻向上抬起, 使患儿的口、鼻孔充分开放, 然后救护者深吸一口气, 用口包住患儿口、鼻进行吹气。吹气时注意观察患儿胸部起伏情况, 防止吹气过大、过猛损伤患儿肺部, 吹气适量的标志是患儿胸部抬起。</p>\r
<p>吹气后,救护者迅速移到患儿胸侧,确定按压部位,做连续30次的胸外心脏按压,胸外心脏按压与人工呼吸之比为30:2,如此反复进行,5个循环(大约2min)为一个周期。每5个循环应检查一次脉搏,但时间不应超过10s。如果有高级气道支持的情况下,医务人员每5~6s给予一次呼吸(10~12次/分),并以100~120次/分的频率同时进行持续胸部按压。</p>\r
<p>7. 早期除颤 除颤是借用体外除颤器向患者胸廓放电或直接作用于心脏，以达到有效抢救心搏骤停患者为目的的一种方法。由于心源性心搏骤停最常见的心电图表现是心室颤动，而治疗心室颤动最有效的方法就是电除颤。如不能及时进行电除颤，数分钟后就可能转为心脏停搏，因此，心搏骤停后要力争在3min内进行首次电除颤。CPR可以延长心室颤动，推迟心室骤停的发生，延长除颤的时间窗，所以CPR与除颤应联合使用。依据2020年《美国心脏协会心肺复苏及心血管急救指南》，当可以立即取得AED时，目击到成人心搏骤停，救护者应尽快使用AED；若成人在未受监控的情况下发生心搏骤停，或不能立即取得AED时，应在他人前往取得AED及准备AED时开始心肺复苏，当设备可以使用后，应尽快尝试除颤。</p>\r
<p>8. 复苏有效和终止指标</p>\r
<p>(1) 心肺复苏有效的表现: ①患者出现自主呼吸; ②可触及大动脉搏动; ③颜面、口唇转为红润; ④瞳孔缩小, 对光反射恢复; ⑤收缩压≥60mmHg。</p>\r
<p>(2)心肺复苏终止的指标:①心肺复苏成功;②心肺复苏抢救持续1h,仍无心搏和脉搏;③脑死亡。</p>\r
<p>考点提示:心肺复苏有效的判断标准。</p>\r
<p>知识链接</p>\r
<p>救助人该不该承担民事责任？</p>\r
<p>在院外,因见义勇为实施心肺复苏术造成患者损伤,救助者是否要承担法律责任?如果没有施救成功,家属要求赔偿怎么办?这些可能是我们
对需救助者施以援手时会一闪而过的想法。</p>\r

<p>2021 年 1 月 1 日《中华人民共和国民法典》的实施解决了大家的顾虑,其第一百八十四条规定:“因自愿实施紧急救助行为造成受助人损害的,救助人不承担民事责任。”</p>\r
<p>9. 婴儿和儿童心肺复苏术 与成人做法基本相同。成人、儿童和婴儿实施 CPR 的比较见表 2-1。</p>\r
<p>(1) 意识判定: 对无语言表达能力的婴幼儿, 可以弹足底、拍打足跟部或捏掐其合谷穴, 如无反应, 则为意识丧失。</p>\r
<p>(2) 脉搏判定: 因婴儿颈部短粗且一般较胖, 复苏时触摸颈动脉较困难, 可用触摸肱动脉或股动脉来判断心搏是否存在。方法是救护者将拇指放在患儿上臂外侧, 示指与中指轻轻压在上臂内侧肘和肩之间, 可触及肱动脉搏动。</p>\r
<p>(3)胸外心脏按压:婴儿的胸外心脏按压部位是两乳头连线中点与胸骨正中线交叉点下方一横指处,采用环抱法用单手按压或双手拇指重叠按压(图2-10)。对儿童则用一只手掌根做胸外心脏按压,部位为两乳头连线的胸骨处。按压深度,婴幼儿大约为4cm,儿童大约为5cm。</p>\r
<p>(4)除颤:儿童除颤的目的、操作方法和要求基本与成年人相同,但儿童除颤能量的选择第一次为2J/kg,以后按4J/kg计算。</p>\r
<p style="text-align: center;">表 2-1 成人、儿童和婴儿实施 CPR 比较</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-23-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">单手按压(1名救护者)</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-24-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">双手拇指重叠按压(2名以上救护者)</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-25-l.jpg" /><figcaption></figcaption></figure>\r
<p>图2-10 婴儿按压法</p>\r
<p>知识链接</p>\r
<p>自动体外电除颤</p>\r
<p>自动体外除颤器是一种便携、易于操作、配置在公共场所、专为心搏骤停患者现场急救设计的除颤设备，具有自动识别、鉴别和分析心电节律，自动充电、放电和自检功能。</p>\r
<p>操作者在使用 AED 时,首先将所附 2 个电极板按指示分别贴于患者右锁骨下及心尖处,打开开关后按照声音和屏幕文字提示完成简易操作。根据自动心电分析系统提示,确认为可电击的心律后,即可按下电击/放电 (shock) 键。此后系统立即进入心律再分析阶段,以决定是否再次除颤。常规采用双向波能量,成人常以 150J 为宜,小儿可按每千克体重 2J。2020 年《美国心脏协会心肺复苏及心血管急救指南》建议在发生有目击者心搏骤停概率相对较高的公共区域(如机场、体育场馆等)推广 AED 项目,以提高心搏骤停患者的存活率。</p>\r
<p>考点提示: BLS 的核心步骤。</p>\r
<p>(二) 进一步生命支持</p>\r
<p>进一步生命支持是在 BLS 基础上,应用辅助设备及特殊技术,建立和维持有效的通气和血液循环,识别及治疗心律失常,建立有效的静脉通路,改善并保持心肺功能及治疗原发疾病。它是心搏骤停后 5~10min 的第二个处理阶段,一般在医疗单位由专业人员进行,包括建立静脉输液通道、药物治疗、电除颤、心电监护、气管插管、机械呼吸等一系列维持和监测心肺功能的措施。ACLS 应尽可能早地开始,如 BLS 与 ACLS 同时进行,可
取得较高的疗效。</p>\r
<p>1. 明确诊断 尽可能迅速地进行心电监护和必要的血流动力学监测, 明确引起心搏骤停的病因和心律失常的类型, 以便及时采取相应的救治措施。</p>\r
<p>2. 呼吸支持 心肺复苏时,急救人员可采用口咽气道、鼻咽气道以及其他可选择的辅助气道保证人工呼吸。</p>\r
<p>(1) 口咽/鼻咽通气管: 可使舌与咽喉壁分开, 防止舌后坠, 为进一步生命支持创造条件。置入通气管后, 可通过通气管人工通气, 也可通过面罩给氧或经呼吸机加压给氧, 以提供呼吸支持。</p>\r
<p>(2) 球囊－面罩通气: 又称简易呼吸器, 其供氧效果较徒手人工呼吸效果更佳, 并节省人力, 尤其适用于有气管内插管和转运途中患者的呼吸支持(具体内容详见本章第四节)。</p>\r
<p>(3)气管插管及气管切开术:是控制气道最有效的方法,可及时清除气道分泌物和异物,增加肺泡有效通气量,减少气道阻力及无效腔,提高呼吸道气体交换效率,并可与简易呼吸器或呼吸机相接供氧。有条件时,应及早进行气管插管。气管切开术适用于需要较长时间控制气道者,如心肺复苏后仍然长期昏迷的患者。</p>\r
<p>(4) 呼吸机的应用: 应用呼吸机加压给氧是最有效的供氧方法, 可减少呼吸道无效腔, 保证足够供氧, 且呼吸参数易于控制。呼吸机供氧时, 可从给予纯氧开始, 以后根据血气分析结果调整吸入氧浓度, 满足患者对氧的需求(具体内容详见本章第四节)。</p>\r
<p>3. 药物治疗</p>\r
<p>(1)用药目的:①激发心脏复跳,增强心肌收缩力,防止心律失常;增加心肌血流灌注,增加脑血流量。②纠正水、电解质及酸碱平衡失调,使其他血管活性药物更能发挥效应。③提高室颤域,为除颤做好准备。</p>\r
<p>(2) 给药途径: 心搏骤停时, 在不中断 CPR 和快速除颤的前提下, 应迅速建立静脉、气管内、骨髓或心内注射给药途径。</p>\r

<p>1) 静脉给药(IV): 常选择经肘静脉插管到中心静脉给药, 效果可靠, 作用迅速。因锁骨下静脉或颈静脉插管对CPR操作有一定影响，故不常用。因外周静脉给药效果相对较差，故尽量避免使用。</p>\r
<p>2)气管内给药(ET):建立静脉通道有困难时,可通过气管内给药,肾上腺素、利多卡因、阿托品、纳洛酮等都可经气管内给药。其剂量应为静脉给药的2~2.5倍,使用5~10mL生理盐水或蒸馏水稀释后,由气管导管远端匀速推注,并接通正压通气,使药物迅速弥散到两侧支气管。气管内给药的吸收速度与静脉给药的吸收速度基本相似,而作用维持时间为静脉给药的2~5倍。但因药物被气管内分泌物稀释或因气管黏膜血液循环不佳而减慢吸收,用药剂量相对较大,而作为选择给药的第二途径。</p>\r
<p>3) 骨髓给药(IO): 由于骨髓腔内有不会塌陷的血管丛, 是可供选择的另外一种给药途径, 其给药效果相当于中心静脉通道。如果无法建立静脉通路, 可建立骨髓通路进行液体复苏、给药和采集血液标本。</p>\r
<p>4) 心内注射给药: 自胸外向心内注射药物已不再作为常规首选途径, 近年主张在开胸内挤压的可视条件下直接注入室内。心内注射给药时应注意选择大小适宜的心内注射针头, 如果针头长度达不到心室腔可导致穿刺失败。最好选择右心室穿刺, 因该处心室壁较薄、血管较少, 穿刺时不易损伤血管。自胸外向心内注射给药时应停止人工呼吸, 以防刺伤肺组织形成气胸, 进针后抽得大量回血, 方可将药液注入, 切忌把药液注入心肌内, 以免引起心肌坏死或心律失常。心内操作要迅速, 尽量缩短心脏按压时间。</p>\r
<p>(3)常用药物:应尽快遵医嘱给予下列复苏药物。</p>\r
<p>1) 肾上腺素: 是治疗心搏骤停的首选药物。它是 α 受体和 β 受体的兴奋剂, 可以加速心率, 加强心肌收缩, 升高主动脉舒张压, 但不增加冠状动脉和脑血管阻力, 可改善冠状动脉灌注和脑血流量, 有利于心肺脑复苏。它可使心室纤颤由细颤转为粗颤, 提高电除颤成功率。用法: 首次剂量 1mg 静脉注射, 给药后再推注 20mL 液体, 促进药物更快达到中心循环, 每 3~5min 重复一次。如需气管内给药, 初始剂量应为 2~2.5mg, 溶于注射用水或生理盐水 5~10mL 中注入气管。</p>\r
<p>
2) 胺碘酮: 在心肺复苏中, 如给予 2 或 3 次电除颤和血管加压药物仍无效时, 立即用胺碘酮 300mg(或 5mg/kg) 溶于 20~30mL 液体中快速静脉推注, 然后再次除颤; 如仍无效, 可于 10~15min 后重复追加胺碘酮 150mg 静脉注射。心室颤动转复后, 以胺碘酮 0.5mg/min 维持滴注。</p>\r
<p>3) 利多卡因: 针对心室颤动、无脉性心动过速导致的心搏骤停, 恢复自主循环后, 可以考虑立即给予利多卡因。利多卡因是治疗急性心肌梗死并发多发性室性期前收缩的首选药物, 可以提高心室颤动阈值, 降低心肌的应激性, 预防和终止心室颤动。用法: 1 ~ 1.5mg/kg 静脉注射, 5 ~ 10min 后重复用 0.5mg/kg, 总剂量不超过 3mg/kg。</p>\r
<p>4) 阿托品: 具有阻断 M 胆碱能受体的作用, 从而避免迷走神经对心肌的抑制, 增加窦房结和房室结的自律性与传导性, 尤其适用于迷走神经反射所致的心搏骤停。阿托品还能抑制腺体分泌, 缓解支气管痉挛, 兴奋呼吸中枢, 这对保持呼吸道通畅和促进肺通气有利。用法: 心脏停搏和无脉性电活动者, 使用剂量为 0.5mg 静脉注射; 若持续性心脏停搏, 在 3~5min 内重复给药; 如仍为缓慢性心律失常, 每 3~5min 注射 0.5~1mg, 至总剂量为 3mg。</p>\r
<p>5)碳酸氢钠：心搏骤停发生后，在缺血、缺氧的情况下，身体极易出现水、电解质和酸碱失衡，其中以酸中毒为主。在心肺复苏早期即心搏骤停的 10min 以内，纠正酸中毒的措施应该以改善通气为主，最佳措施是气管插管和人工呼吸。只有在较长时间心搏骤停或严重代谢性酸中毒时，才考虑应用碳酸氢钠。另外，对高钾血症所致心搏骤停及危及生命的高血钾时，可考虑使用碳酸氢钠；对三环类抗抑郁药导致的心脏毒性，使用碳酸氢钠可预防心脏停搏。</p>\r
<p>考点提示:常用的复苏药物。</p>\r
<p>(三)持续生命支持</p>\r
<p>持续生命支持是复苏后对生命持续的维护,重点是脑保护、脑复苏及复苏后疾病的防治,即除了积极进行脑复苏，还应严密监测心、肺、肝、肾、凝血及消化器官的功能，一旦发现异常，立即采取有针对性的治疗。</p>\r
<p>心搏骤停时因缺血、缺氧，最易受损的是中枢神经系统。复苏成功与否，在很大程度上与中枢神经系统功能是否恢复密切相关，所以心肺复苏后脑保护决定复苏后存活质量。</p>\r
<p>1. 脑复苏</p>\r
<p>(1) 维持血压: 循环停止后, 脑血流的自主调节功能丧失, 而依赖于脑灌注压, 故应维持血压于正常或稍高于正常水平, 以恢复脑循环和改善周身组织灌注, 同时应防止血压过高而加重脑水肿, 防止血压过低而加重脑及其他脏器组织缺血、缺氧。因此, 复苏后应连续进行心电监测, 以观察心率快慢、有无心律失常等; 同时还要进行血流动力学监测, 包括血压、中心静脉压、心排血量、肺小动脉楔压、心排血指数、外周血管阻力和尿量等以指导治疗。为防止血压过低, 可用血管活性药物提高动脉压到正常水平, 以保证脑的灌注压, 降低血液黏稠度, 扩充血容量; 同时应防止血压过高加重脑水肿, 在复苏后, 输液量也应控制在 1500 ~ 2000mL/d, 但尿量须保持在 30mL/h 以上。</p>\r
<p>(2) 呼吸管理: 大脑缺氧既是脑水肿的重要根源, 又是阻碍呼吸恢复的重要因素, 所以在心搏骤停开始时应及早加压给氧, 以纠正低氧血症。应用呼吸机过度通气, 使 PaCO<sub>2</sub> 降低, 从而使脑小动脉平滑肌收缩, 脑血容量缩减, 有利于防止颅内压升高及“反跳”现象。一般采用中等程度控制过度换气。纠正低氧血症和过度换气, 有利于对缺氧性损伤的恢复, 保证脑组织充分供氧。</p>\r

<p>(3) 降温: 脑组织的代谢率决定脑局部血流的需求量。体温每升高 1<sup>∘</sup> C, 脑代谢率约增加 8%。复苏后, 体温升高可导致脑组织氧供需关系的明显失衡, 从而影响脑的康复。对心搏骤停后恢复自主循环的昏迷成年患者应采用目标温度管理, 目标温度选定在 32～36<sup>∘</sup> C, 并至少维持 24h。有研究表明, 轻度低温 ( 34<sup>∘</sup
> C) 对于减轻脑缺血性损伤有很好的疗效, 且损害作用较小。低温可降低脑代谢、减少 ATP 消耗, 减少酸代谢产物在体内堆积, 减轻脑水肿, 降低颅内压, 缓解脑充血。</p>\r
<p>1) 降温开始时间: 发生脑细胞损伤和脑水肿的关键时期是循环停止后的最初 5min。因此, 降温时间越早越好, 争取在抢救开始后 5min 内用冰帽降温。</p>\r
<p>2) 降温深度: 降温可保护缺氧的脑组织, 减少颅内充血(或出血)。脑部的温度每降低 1<sup>∘</sup> C, 颅内压下降 5.5%。脑组织温度降至 28<sup>∘</sup> C, 脑电活动明显呈保护性抑制状态, 但体温降至 28<sup>∘</sup> C 易诱发心室颤动等严重心律失常, 所以不论患者体温正常或升高, 均应将体温(肛表或鼻腔温度) 降至亚冬眠水平 ( 35<sup>∘</sup> C) 或冬眠水平 ( 32<sup>∘</sup> C)。脑水肿患者要求在 30min 内将体温降至 37<sup>∘</sup> C 以下, 在数小时内达到预期降温目的。</p>\r
<p>3) 降温持续时间: 根据病情决定, 一般需 2~3 天, 严重者可能要 1 周以上。为了防止复温后脑水肿反复和脑耗氧量增加而加重脑损害, 故降温持续至中枢神经系统皮质功能开始恢复, 即以听觉恢复为指标, 然后逐步停止降温, 使体温自动缓慢上升, 绝不能复温过快, 一般以 24h 体温提升 1~2℃ 为宜。</p>\r
<p>4) 降温方法: ①物理降温, 头部可用冰帽或冰枕降温, 体表大血管处可用冰袋降温。②药物降温, 应用冬眠药物进行冬眠疗法。通常需二者同时使用, 方能达到降温的目的和要求。</p>\r
<p>5) 护理要点: 及早降温, 深度降温, 持续降温, 平稳降温, 缓慢升温。①及早降温: 降温时间越早越好, 复苏早期就应严密监测脑功能并采取积极的复苏措施, 最好在复苏后 5~30min 内进行, 因此时是脑细胞损伤和脑水肿的关键时期。②深度降温: 头部温度要求降至 28℃, 肛温降至亚冬眠水平 (35℃)。③持续降温: 降温应持续到病情稳定、神经功能恢复、出现视觉反应为止。④平稳降温: 降温过程要平稳, 及时处理不良反应, 为防止寒战和控制抽搐, 可用小剂量镇静剂。⑤缓慢升温: 先自下而上撤冰袋, 保持每 24h 体温上升 1~2℃ 为宜。</p>\r
<p>(4)脑复苏药物的应用。</p>\r
<p>1) 冬眠药物: 主要目的在于消除低温引起的寒战, 解除低温时的血管痉挛, 改善循环血流灌注, 辅助物理降温。可选用冬眠 I 号(哌替啶 100mg、异丙嗪 50mg、氯丙嗪 50mg)。</p>\r
<p>2) 脱水剂: 为了防止脑水肿, 在降温和维持血压平稳的基础上, 宜及早应用脱水剂, 通常选用呋塞米(速尿)或20%甘露醇。20%甘露醇250mL, 静脉注射或快速静脉滴注, 30min滴完; 速尿20mg, 静脉注射, 视病情重复使用。也可选用20%甘露醇与50%葡萄糖交替使用。</p>\r
<p>3) 激素: 肾上腺皮质激素除能保持毛细血管和血－脑屏障的完整性、减轻脑水肿和降低颅内压外, 还有改善循环功能、增强溶酶体膜稳定性、防止细胞自溶和死亡的作用。最好选用作用强而潴钠潴水作用较小的皮质激素制剂, 地塞米松常为首选药物。</p>\r
<p>4) 促进脑细胞代谢药物: ATP 可供应脑细胞能量, 恢复钠泵功能, 有利于减轻脑水肿。葡萄糖为脑获得能量的主要来源, 辅酶 A、细胞色素 C、多种维生素等与脑代谢有关药物均可选用。</p>\r
<p>5) 巴比妥类药物: 巴比妥是镇静、安眠、止痉的药物, 对不全性脑缺血、缺氧的脑组织具有良好的保护作用。</p>\r
<p>6) 其他: 还可应用钙离子通道阻滞剂、氧自由基清除剂与铁离子螯合剂、兴奋性氨基酸受体拮抗剂等。</p>\r
<p>(5)高压氧的应用:高压氧(hyperbaric oxygen, HBO)能快速、大幅度地提高组织氧含量和储备,增加血氧弥散量及有效弥散距离,降低颅内压,改善脑电活动,减轻脑水肿。在复苏后期,由于 HBO 具有促进受损组织的修复和再生功能,促进侧支循环形成和重建,对神经细胞的恢复及脑循环的重建有治疗作用。</p>\r
<p>1) 应用时间: 心跳停止时间越短, 开展 HBO 治疗越早, 效果越好。</p>\r
<p>2) 应用要求: CPCR 患者心脏复跳后, 只要心率 &gt;60 次/分, 血压用升压药能维持, 即使呼吸未恢复, 也应及时进行 HBO 治疗。最好在 24h 内进行, 即在脑水肿及感染高峰出现前进行, 可减轻神经损伤, 且有利于受损神经细胞的恢复。</p>
\r
<p>3) 综合治疗: HBO 在复苏中能起到其他任何治疗不能代替的重要作用, 但不是唯一治疗方法, 应强调以 HBO 为重点的综合治疗。</p>\r
<p>(6)脑复苏的有效指征:①瞳孔对光反射恢复;②吞咽和角膜反应灵敏,出现痛觉反应;③头或四肢运动;④有听觉反射;⑤脑电图检查 α 波节律活动。当脑复苏出现以上指征,提示脑功能好转,自主呼吸恢复。</p>\r
<p>考点提示:脑保护和脑复苏的有效措施。</p>\r
<p>2. 维持循环功能 心搏恢复后,往往伴有血压不稳定或低血压状态,为判定有无低血容量及掌握好输液量和速度,宜行中心静脉压(CVP)监测,可将CVP、动脉压和尿量三者结合起来分析,以指导输液治疗。密切监测血压,避免低血压,一般血压低于90mmHg给予输液;为保证血压和全身灌注,亦可使用血管活性药、正性肌力药和增强心肌收缩药等,维持收缩压大于90mmHg。加强心电监护,注意监测脉搏、心率和心律,及时识别心律失常,选用相应的抗心律失常药防治心律失常。</p>\r

<p>3. 维持呼吸功能 心搏恢复后,自主呼吸未必恢复或即使恢复但不正常,故仍需加强呼吸管理,继续进行有效的人工通气,及时行血气监测,促进自主呼吸尽快恢复正常。自主呼吸出现的早晚提示脑功能损害程度的轻重,若长时间不恢复,应设法查出危及生命的潜在因素,给予相应的治疗,如解除脑水肿、改善脑缺氧等。注意防治肺部并发症,如肺炎、肺水肿导致的急性呼吸衰竭。除了加强抗感染治疗外,还应应用机械通气,合理选择通气参数和通气模式,在氧合良好的前提下,务必使平均气道压尽可能地低,以免阻碍静脉回流,加重脑水肿,或因胸膜腔内压增高而导致心排血量减少等。</p>\r
<p>4. 复苏后的监测与护理工作 如维持酸碱平衡,纠正酸中毒,防止肾衰竭,并做好原发病的治疗,防止继发性感染等一系列临床工作。</p>\r
<p>考点提示: 紧急救护常识——心肺复苏。</p>\r
<p>三、心脏电复律</p>\r
<p>心脏电复律是用除颤器产生高能脉冲电流,通过胸壁或直接作用于心脏,消除各类异位性快速心律失常,使心脏恢复为窦性心律的方法。心室颤动时的电复律治疗也常被称为电除颤。</p>\r
<p>心脏电复律</p>\r
<p>(一)电复律的分类及能量选择</p>\r
<p>1. 分类 根据脉冲发放与 R 波关系可分为同步电复律与非同步电复律, 根据放电形式可分为交流电复律与直流电复律, 根据电极安放位置又可分为胸内复律与胸外复律。</p>\r
<p>(1)非同步电复律:不启用同步触发装置,可在任何时间放电。适用于心室颤动、心室扑动等。</p>\r
<p>(2) 同步电复律: 为避开 T 波顶峰前 20 ~ 30ms 附近的心室易损期, 电复律脉冲的发放是利用心电图 R 波触发同步装置, 使电刺激落入 R 波降支或 R 波起始后 30ms 左右处, 相当于心室绝对不应期中, 称为同步电复律。适用于除心室颤动以外的快速型心律失常。</p>\r
<p>2. 能量选择 电复律中电能选择非常重要,能量及电流太低,电击不能终止心律失常;能量及电流太高,又可引起心肌损伤和心律失常。成人除颤时能量和体重之间并无明确的关联,婴幼儿除颤的能量则要比成人小。心室颤动时首次除颤推荐能量为 200J,第二次为 200~300J,第三次为 360J。如连续 3 次除颤失败,应继续做 CPR,并给予溴苄胺,加大肾上腺素剂量后再行电除颤,但单向波和双向波又有所不同(表 2-2)。</p>\r
<p style="text-align: center;">表 2-2 同步电复律和非同步电复律常规推荐能量对比</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-28-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">考点提示:同步电复律与非同步电复律的区别。</p>\r
<p>知识链接</p>\r
<p>什么是单向波和双向波？</p>\r
<p>除颤分为单向波和双向波两种,也写作单相波和双相波。单向波是
单极发送电流,属于单相衰减正弦(monophasic damped sine, MDS)波形,其波形是半个正弦波,电脉冲强度是逐渐衰减的。双向波除颤主要以双相切角指数(biphasic truncated exponential, BTE)波形和双相方波形(rectilinear biphasic waveform, RBW)为代表。双向波的波形是一个完整的正弦波,双向波除颤时,除颤仪先后向心脏释放方向相反的双向电脉冲。</p>\r
<p>简单来讲，单向波是向一个方向发电，而双向波是先后向心脏释放方向相反的双向电脉冲。因此，单向波选择的能量较大，除颤电流峰值较高，对心肌功能可能造成较明显的损伤；与单向波相比，双向波的电流峰值较低，对心肌功能可能造成的损伤程度较轻。</p>\r
<p>(二)适应证和禁忌证</p>\r
<p>1. 适应证</p>\r
<p>(1) 非同步电复律: ①心室颤动、心室扑动; ②心脏停搏; ③心脏电机械分离。</p>\r
<p>(2)同步电复律:①心房颤动发病的时间在1年以内,药物治疗无效,无明显心脏扩大及出现生命体征改变者;②对心室率较快的心房扑动,应首先进行同步电复律;③药物和其他治疗无效,且出现明显血流动力学改变的室上性心动过速和室性心动过速者;④合并有预激综合征的异位性快速心律失常,在诊断和选择药物较困难的情况下,亦可用同步电复律治疗。</p>\r
<p>2. 禁忌证</p>\r
<p>(1)洋地黄中毒性心律失常和(或)低钾血症引起的快速型心律失常(室颤除外)者。</p>\r
<p>(2) 心房颤动或室上性心动过速伴高度或完全性房室传导阻滞者。</p>\r
<p>(3)病态窦房结综合征患者。</p>\r
<p>(4) 复律后不具备长期用药维持治疗,或药物维持治疗下反复发生心房颤动者。</p>\r
<p>(5)左心房扩大或二尖瓣有明显反流者。</p>\r
<p>(6)心脏扩大明显,心胸比例&gt;60%,房颤病史&gt;5年者。</p>\r
<p>(7)风湿性心脏病伴心房颤动,且风湿活动者。</p>\r
<p>(8)器质性心脏病心力衰竭未纠正者。</p>\r
<p>(三)电极板(贴)位置</p>\r
<p>1. 前 - 后位 一块电极板放在左/右背部肩胛下区, 另一块放在胸骨左缘第 3~4 肋间水平。</p>\r
<p>2. 同侧位(左-右位) 一块电极板放在胸骨右缘第2~3肋间(心底部),另一块放在左腋前或腋中线内第5肋间(心尖部区域)。</p>\r
<p>两电极之间的距离大于 10,cm ，电极之间的皮肤保持干燥（图 2-11）。</p>\r
<p style="text-align: center;">图2-11 电极板(贴)位置</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540007-30-l.jpg" /><figcaption></figcaption></figure>\r

<p>考点提示:电极板放置的位置。</p>\r
<p>(四) 操作准备</p>\r
<p>1. 患者心理准备 操作前告知患者或家属电复律的目的和必要性、大致过程、可能出现的不适及并发症，以取得其合作。</p>\r
<p>2. 术前检查 电解质、心电图、心脏超声等。</p>\r
<p>3. 备齐物品 心脏电复律仪器(除颤器), 应接好地线与电源; 导连线、电极片、导电糊或生理盐水纱布等。</p>\r
<p>(五) 操作步骤</p>\r
<p>(1) 检查及调试除颤器。</p>\r
<p>(2) 将用物备齐, 按使用顺序置于护理车上, 推至患者床旁, 使患者平卧于硬板床上。</p>\r
<p>(3)评估患者的意识、病情,心电图或心电示波器是否有心室颤动波,确定除颤指征。</p>\r
<p>(4)暴露胸部，确定患者除颤部位无伤口，在电极板及患者胸部均匀涂抹导电糊。</p>\r
<p>(5) 打开除颤器电源, 设置到非同步位置“除颤”, 调节除颤器能量至所需读数, 开始充电。</p>\r
<p>(6) 选择同侧位或前－后位放置电极板，用较大压力(2~5kg
)使胸壁与电极板紧密接触。</p>\r
<p>(7) 充电至所需能量 360J(单向波)或 150~200J(双向波)后,再次观察心电图情况。确实需要除颤时,嘱无关人员离开患者和病床,两手拇指同时按压手柄放电按钮进行除颤。</p>\r
<p>(8)除颤后立即进行心肺复苏术(5个循环),并按医嘱给予复苏药物;再次评估,如无效可再次进行除颤。</p>\r
<p>(9) 放电完毕后, 观察心电监护仪, 评估患者, 心律转为窦性时, 除颤成功。</p>\r
<p>(10) 将患者身上的导电糊擦拭干净, 取舒适卧位, 整理床单位。</p>\r
<p>(11) 清洁电极板, 消毒后归位。整理用物, 洗手, 记录。</p>\r
<p>(六)注意事项</p>\r
<p>(1)除颤前确定患者除颤部位无潮湿、无敷料；如患者带有植入性起搏器，应注意避开起搏器部位至少2.5cm。</p>\r
<p>(2) 放电前确定周围人员无直接或间接与患者接触。</p>\r
<p>(3) 操作者身体不能与患者及金属类物品直接或间接接触。</p>\r
<p>(4) 动作迅速、准确。</p>\r
<p>(5)保持除颤器完好备用。</p>\r
<p>(6)对洋地黄过量所致心室颤动,应从低能量开始。</p>\r
<p>(7) 患者如为细颤,除颤前可给予肾上腺素,使之转为粗颤后再进行电除颤。</p>\r
<p>(七)术后护理与病情监测</p>\r
<p>1. 注意休息 卧床休息 24h, 并且要准备好各种抢救器材和药品。电复律早期患者应绝对卧床休息, 限制人员探视, 保持病室安静、整洁, 护士协助完成卧床期间的各项生活护理。予以氧气吸入以减轻心肌缺血、缺氧, 传导复极不均的状态。</p>\r
<p>2. 持续心电监护 心电图床边连续监护, 注意心率、心律变化, 观察神志、瞳孔、呼吸、血压、皮肤及肢体活动情况。</p>\r
<p>3. 并发症 电复律后电极板放置处皮肤有红斑或灼伤,术后当日加强巡视,及时发现并处理。</p>\r
<p>4. 注意饮食 清醒后 2h 内暂不进食, 之后要给予高热量、高维生素、易消化的饮食, 保持大便通畅。</p>\r
<p>5. 心理护理 操作结束,患者抢救成功后可能有濒死的恐惧感,出现焦虑、悲观的情绪,担心复发,高度的精神紧张可使心率加快,导致心律失常的再次发作。因此,护士应陪伴在患者床边,安慰鼓励患者,耐心做好病情解释,必要时给予镇静剂。</p>\r
<p>考点提示:心搏骤停患者的护理。</p>\r
<p>目标检测</p>\r
<p>1. 引起心搏骤停的最常见原因是( )。</p>\r
<p>A. 慢性阻塞性肺疾病</p>\r
<p>B. 糖尿病</p>\r
<p>C. 冠心病</p>\r
<p>D. 药物中毒</p>\r
<p>E. 颅脑外伤</p>\r
<p>2. 如果疑似患者发生心搏骤停, 判断心搏骤停的最重要指标是( )。</p>\r
<p>A. 意识丧失、一侧瞳孔散大</p>\r
<p>B. 意识丧失、牙关紧闭、抽搐</p>\r
<p>C. 意识丧失、没有呼吸或仅是喘息、颈动脉搏动消失</p>\r
<p>D. 意识淡漠、全身湿冷、触摸不到桡动脉搏动</p>\r
<p>E. 意识丧失、大小便失禁</p>\r
<p>3. 终止室颤最迅速、最有效的措施是( )。</p>\r
<p>A. 立即给予胸外心脏按压</p>\r
<p>B. 立即给予除颤</p>\r
<p>C. 尽快给予气管插管</p>\r
<p>D. 立即给予球囊面罩通气</p>\r
<p>E. 立即给予肾上腺素 1mg 静脉注射</p>\r
<p>4. 心搏骤停后,最先受到损害的器官是( )。</p>\r
<p>A. 心脏</p>\r
<p>B. 肝脏</p>\r
<p>C. 肺部组织</p>\r
<p>D. 脑组织</p>\r
<p>E. 肾脏</p>\r
<p>5. 关于成人胸外心脏按压的描述, 正确的是( )。</p>\r
<p>A. 按压频率为每分钟 100 ~ 120 次</p>\r
<p>B. 胸骨尽量下陷</p>\r
<p>C. 随时停止胸外心脏按压查看心电监护</p>\r
<p>D. 按压放松时, 手掌根部要倚靠在患者胸壁上</p>\r
<p>E. 双人心肺复苏时, 按压 - 通气比为 15:2</p>\r
<p>6. 下列不是判断心肺复苏有效的指标的是( )。</p>\r
<p>A. 瞳孔由大变小</p>\r
<p>B. 触及颈动脉搏动</p>\r
<p>C. 瞳孔散大</p>\r
<p>D. 出现对光反
射</p>\r
<p>E. 面色由发绀转为红润</p>\r
<p>7. 心肺复苏时首选给予的药物是( )。</p>\r
<p>A. 阿托品</p>\r
<p>B. 胺碘酮</p>\r
<p>C. 碳酸氢钠</p>\r
<p>D. 利多卡因</p>\r
<p>E. 肾上腺素</p>\r
<p>8. 脑复苏的主要措施是( )。</p>\r
<p>A. 维持血压和体温</p>\r
<p>B. 降低体温和血压</p>\r
<p>C. 防治脑缺氧, 提高颅内压</p>\r
<p>D. 防治脑水肿, 利尿, 目标体温管理</p>\r
<p>E. 维持血压, 防治缺氧, 目标体温管理</p>\r
<p>(王亚妮 杨萍 许天亮)</p>\r
`},{id:"module3-task2",title:"第二节 通畅气道术",order:2,rawContent:`案例导学

张某,男,12岁。在吃饭过程中突然发生剧烈咳嗽,家属立即给予安抚和拍背,过程中发现患者出现呼吸困难、面色青紫、大汗淋漓、意识模糊等症状。患者既往无其他病史。

请思考：

1. 该患者发生了什么情况？

2. 发现后第一时间应该如何进行施救？

通畅气道术是指当患者由于各种原因出现气道梗阻时，为保证患者呼吸道通畅，确保氧气顺利进入患者肺部而采取的抢救措施。气道梗阻是临床危重症患者死亡的原因之一，因此，及时有效地开放气道、保持呼吸道通畅是抢救患者的基本条件。导致气道梗阻的常见原因包括呼吸道异物阻塞、舌后坠、气道黏膜肿胀和痉挛等，护士需及时发现气道梗阻现象，并能针对气道梗阻的原因进行有效的畅通气道术。

一、海姆立克急救法

海姆立克急救法(Heimlich maneuver)是解除呼吸道异物梗阻的主要方法,它的作用原理是冲击腹部膈肌下软组织,产生突然向上的压力,压迫两肺下部,从而驱使肺部残留空气形成一股气流,将堵塞患者气管、咽喉部的异物驱除,使患者获救(图2-12)。

\r
图2-12 海姆立克急救法示意图

素质拓展

生命的拥抱:海姆立克急救法

海姆立克急救法由亨利·海姆立克教授发明。海姆立克是一位多年从事外科的医生，在临床实践中，他被大量的食物、异物造成呼吸道梗阻致死的病例震惊了，而在急诊中，医生常常采用拍打患者背部，或将手指伸进患者口腔、咽喉去取的方法排出异物，结果不仅无效反而使异物更深入呼吸道。这个发现，使他陷入了深深的思考。经过反复研究和多次动物实验，他终于发明了利用肺部残留气体形成气流冲出异物的急救方法。1974年，他做了关于腹部冲击法解除气管异物的首次报告。1975年10月，美国医学会以他的名字命名了这个急救方法，并经该学会推荐，在报刊、电视等媒体广为宣传。

随着海姆立克急救法的普及推广,这项急救技术已成功挽救数以万计呼吸道异物梗阻患者,人们也亲切地把它称为“生命的拥抱”。

(一)一般患者的海姆立克急救法

1. 自救腹部冲击法 适用于气道不完全梗阻且意识清醒的患者,患者自身具有一定救护知识、技能,并且当时无他人在场相助、打电话困难、不能说话报告的情况(图 2-13)。患者一手握空心拳,拳眼(拇指侧)置于腹部脐上两横指处,另一手紧握住此拳,双手同时快速向内、向上冲击5次;也可将上腹部压在坚硬物体上,如桌边、椅背和栏杆处,连续向内、向上冲击5次。重复操作若干次,直到异物排出。

\r
\r
\r
图2-13 自救腹部冲击法

2. 腹部冲击法 适用于不完全或完全气道梗阻患者。对意识清醒患者, 可用立位腹部冲击法; 意识不清者, 采用仰卧式腹部冲击法救治。

(1) 立位腹部冲击法: 救护者站在患者的背后, 双臂环绕患者腰部, 一手握空心拳, 拳眼置于腹部脐上方两横指处, 另一手紧握此拳, 快速向内、向上冲击 5 次。患者应配合救护者, 弯腰, 头部前倾, 低头张口, 以便异物排出(图 2-14A)。

(2) 仰卧位腹部冲击法: 将患者置于仰卧位, 救护者骑跨于患者髋部两侧, 一手掌根置于患者腹部脐上方两横指处, 不要触及剑突, 另一手直接放在第一只手背上, 两手掌根重叠, 快速向内、向上冲击腹部, 连续 5 次, 重复操作直至异物排出(图 2-14B)。操作后应检查口腔, 如异物被冲出, 迅速用手将异物取出。如呼吸、心跳停止, 应立即实施心肺复苏。

A. 立位腹部冲击法

\r
B. 仰卧位腹部冲击法

\r
图2-14 腹部冲击法

(二)特殊患者的海姆立克急救法

1. 肥胖者和孕妇 对于发生呼吸道异物阻塞的肥胖者和孕妇,不宜采用腹部冲击法,应当采用胸部冲击法。施救时,姿势与腹部冲击法相同,双手置于患者胸骨中下部即可,注意不要偏离胸骨,以免造成肋骨骨折。

2. 婴儿 当婴儿发生呼吸道异物梗阻后, 可采取背部叩击(图 2-15A)联合胸部冲击性按压(图 2-15B), 具体做法如下: 救护者一手手指张开托住患儿下颌并固定头部, 保持头低位, 另一手掌根部在患儿的背部肩胛之间用力叩击 5 次。用叩击婴儿背部的手掌托住婴儿的枕部, 两前臂固定婴儿, 小心将婴儿翻转至面部朝上, 使患儿仰卧于救护者前臂上, 保持头部低于躯干, 救护者前臂放在自身大腿上, 另一手的两指在婴儿胸骨上两乳头连线下一横指处快速向下冲击性按压 5 次。其间检查婴儿口腔, 如异物排出, 采用下颌抬举法手钩异物小心将其取出; 如果异物仍未排出, 则重复胸部冲击性按压, 可配合背部叩击交替进行, 直到异物排出。

A. 背部叩击

\r
B. 胸部冲击性按压

\r
图2-15 婴儿呼吸道梗阻急救法

考点提示: 海姆立克急救法的操作要领; 小儿气道异物的处理。

二、口咽通气管的使用

口咽通气管是一种由塑料或橡胶材质制成的人工气道，为弯曲形的中空扁管，弯曲度大致与口咽部相似，将其置入后可防止昏迷患者舌后坠造成气道阻塞(图2-16)。

(一)适应证

(1)舌后坠致呼吸道阻塞的昏迷患者。

(2)麻醉后意识未清醒的患者。

(3)缺乏咳嗽或咽反射的昏迷患者。

\r
图2-16 口咽通气管

(二)禁忌证

(1)清醒或半清醒患者。

(2) 口腔及上、下颌骨创伤患者。

(3) 咽部占位性病变患者。

(4)频繁呕吐患者。

(三) 操作方法

1. 用物准备 选择型号合适的口咽通气管,测量患者门齿到耳垂的距离即为合适的置入长度。

2. 患者准备 患者取平卧位,头后仰,用左手或开口器打开患者口腔,清除口腔分泌物。

3. 操作步骤 手持口咽通气管的凹面面向腭部插入口腔, 当其内口接近患者口咽后壁时(即已通过悬雍垂), 将口咽通气管旋转 180∘ 后继续插入直至咽部。如遇插入困难, 可双手托起患者下颌, 使舌离开咽后壁(图 2-17)。选择的导管不可过长, 避免通气管抵达会厌, 引起完全性喉梗阻。不恰当地安置通气管, 反而会将舌根推至咽腔而加重阻塞, 或引起喉痉挛。

图2-17 口咽通气管插管法

\r
三、喉罩的使用

喉罩(laryngeal mask airway, LMA)由通气管和罩体组成,罩体呈椭圆形,置入后可覆盖患者喉部,气囊充气后在喉周形成密封圈，通气管既可以实现自主呼吸，也可以连接呼吸机或氧气装置，实现通气支持。喉罩因其具有操作简单、维持通气等优点，被广泛应用于急救(图2-18)。

图2-18 不同型号的喉罩

\r
(一)适应证

(1)外科手术呼吸支持者。

(2)呼吸困难气管插管者。

(二)禁忌证

(1)喉部及喉部以下气道梗阻者。

(2)气道阻力增高者。

(3) 咽部占位性病变者。

(4)频繁呕吐患者。

(5) 张口困难患者。

(三) 操作方法

1. 用物准备 选择合适型号的喉罩、注射器、固定胶带、吸引装置。

2. 患者准备 患者禁食,取平卧位,头后仰,清除口腔及气道分泌物。

3. 操作步骤 患者头部伸展,将罩口朝向下颌放入口腔,用示指压住喉罩使其紧贴硬腭,并推动喉罩使其沿咽部生理解剖弧度向下进入患者下咽,直至感到阻力时停止,固定喉罩导管并用注射器给气囊充气。

四、气管插管

气管插管是指将一特制的管道经口腔或鼻腔，经声门插入气管的技术。气管插管是畅通气道的最有效方法之一，也是建
立人工气道的可靠途径，它不仅便于清除呼吸道分泌物，维持气道通畅，还为给氧、人工通气、气管内给药等提供条件，因此，在危重患者的治疗和抢救中具有极其重要的作用。目前，经口明视插管法是临床应用最广泛的一种气管插管方法。该法简单、方便，能迅速建立有效人工气道。

(一)适应证

(1)气道梗阻、窒息或呼吸、心跳停止需行人工通气者。

(2) 各种原因引起的呼吸衰竭需行机械通气者。

(3)上呼吸道分泌物过多,且不能自行咳出,需行气管内吸引者。

(4) 各种全麻或静脉复合麻醉者。

(5)需经气管插管进行呼吸道疾病的诊断和治疗者。

(二)禁忌证

(1) 喉头水肿、呼吸道急性炎症者。

(2)咽喉部血肿或脓肿。

(3) 主动脉瘤压迫气管, 插管时易导致主动脉瘤破裂者。

(4)下呼吸道分泌物潴留所致的呼吸困难,一般情况下很难从插管内清除过多的分泌物,应行气管切开者。

(5) 口腔、颌面部损伤或颈椎骨折脱位者。

(三) 操作配合

1. 用物准备

(1) 喉镜: 有成人、儿童和幼儿 3 种规格。喉镜片有弯、直两种类型, 弯喉镜多用于成人及年长儿, 直喉镜多用于新生儿或幼儿(图 2-19)。

(2)气管导管:一般为带气囊的硅胶管,应根据患者的具体情况选择合适的型号。操作前检查其通畅情况,气囊膨胀是否均匀、导管末端是否居中,导管末端不居中时不能使用(图2-20)。

(3) 导管管芯: 铜质或铝质的细金属条, 长度以插入导管后其远端距离导管开口 0.5～1,cm 为宜。

(4)其他:包括开口器、压舌板、牙垫、喉头喷雾器(内装1%地卡因)、插管钳、注射器、血管钳、胶布、吸痰管、听诊器、负压吸引器、给氧装置、呼吸机和气管切开包等用物。

图2-19 喉镜片

\r
图2-20 气管导管

\r
2. 患者准备 患者仰卧, 垫小枕使头后仰并抬高 10cm, 保持口、咽、气管位于一条轴线(图 2-21)。

3. 操作配合

(1) 清除患者口鼻腔及咽部的分泌物。

(2) 使用简易呼吸气囊给予患者辅助通气 1~2min, 迅速提高患者组织器官含氧量。

(3)在医生插管过程中,协助固定患者头部,密切观察患者生命体征、心电图、血氧饱和度有无异常。

(4)待医生将气管插管通过声门后,双手退出导管管芯,放置牙垫(图 2-22)。

(5)当医生确定插管成功后,使用注射器给气囊充气(气囊压力为 25～30,cmH2O )。

(6) 使用胶布妥善固定导管和牙垫。

(7) 使用吸痰管充分吸引气道分泌物, 维持气道通畅。

(8) 处理用物, 洗手, 记录痰液颜色、性质和量, 患者生命体征及呼吸状态。

图2-21 抬高头部(10cm)

\r
图2-22 退出导管管芯

\r
(四) 护理

1. 病情观察 严密监测患者的生命体征、血氧饱和度等。重点观察患者呼吸状况，了解胸廓起伏是否一致、听诊呼吸音是否对称，以判断导管是否移位。

2. 妥善固定导管,防止导管脱出

(1) 记录: 插管成功, 记录导管外口至切牙的距离并做好交接班。

(2) 固定: 注意观察导管固定情况, 如有滑脱、扭曲及松动应及时处理。

(3) 约束: 约束昏迷、烦躁患者的肢体, 防止患者意外拔管。

3. 维持呼吸道通畅

(1) 严格无菌操作: 为防止肺部感染, 吸痰时一定要严格无菌操作。操作前洗手、戴口罩, 备无菌吸痰盘, 吸痰管每次更换, 吸痰用物 24h 更换一次。吸痰时负压不可太大, 动作要轻柔, 避免损伤气道黏膜。

(2)加强湿化,保持呼吸道湿润:若患者分泌物黏稠,可先向导管内注入2~4mL生理盐水,继续通气待分泌物充分稀释后,迅速进行负压吸引,如果一次不能吸引干净,应间隔一定时间再重复进行,如此反复多次,至吸干净为止。

(3)翻身、拍背:在患者生命体征稳定时,定时翻身、拍背,有利于彻底排痰。

(4) 观察: 注意观察痰液的性质、颜色和量, 必要时定期进行痰液培养。

4. 加强口腔护理 应定时进行口腔护理, 至少每 6~8h 一次, 尤其对于经口腔插管的患者, 宜使用含有 0.1% 氯己定的消毒剂漱口、清洁口腔黏膜, 进行牙齿擦拭或冲洗。用液状石蜡涂于口唇及鼻前庭, 防止干燥。

5. 检查气囊是否有故障 可通过“一听”有无漏气声，“二看”口鼻有无气体排出，“三查”套管位置有无改变，“四试”气囊放气量与充气量是否相等来判断。

6.并发症护理

(1) 窒息: 脱管、导管堵塞、呼吸机功能障碍等是引起窒息的常见原因。应加强护理和观察, 出现问题及时处理。

(2) 肺不张: 多因导管插入过深导致一侧肺通气、呼吸道分泌物阻塞细小支气管、肺功能残气量减少等原因所致。护理人员要随时清除呼吸道分泌物, 减少分泌物潴留; 监控气管导管, 防止下滑或插入过深。

(3)气道黏膜损伤:长期气管插管,插管套囊压迫气管黏膜使其缺血引起溃疡或坏死性损伤。应定时为导管套囊放气,一般4h放气一次,休息5~10min后再充气,充气时可触摸导管体外气囊,保持适宜的张力。正常情况下放气量与充气量一致,放气期间要防止导管脱出。同时,留置导管时间不要超过72h,对长期留置者应考虑行气管切开。

(4) 继发肺部感染: 由抵抗力下降、肺不张、呼吸道分泌物潴留、吸痰时不注意无菌操作等原因所致。要积极预防, 严密观察患者的全身表现和呼吸道表现, 出现症状及时报告医生, 配合处理。

(5)插管术后喉炎:表现为拔管后声嘶和刺激性咳嗽,严重时出现吸气性呼吸困难。其发生与插管时间呈正相关。处理方法可用1%肾上腺素1mL和地塞米松5mg加入生理盐水10mL内做超声雾化吸入,每日3或4次。有呼吸困难者可再做气管插管或气管切开。

7. 拔管护理

(1) 拔管前应进行咳嗽、深呼吸训练, 防止拔管后不能自行清理呼吸道, 出现呼吸障碍。

(2) 充分清理鼻腔、口咽部及气管内分泌物, 松开气囊, 以纯氧过度通气 10min。

(3
) 嘱患者深呼吸, 在患者呼气末拔除导管。立即进行鼻导管给氧、口腔护理, 必要时吸痰。

(4) 观察患者有无声嘶、呼吸困难、喉头哮鸣，能否咳嗽。必要时立即插管。

(5)拔管后禁食4~6h,防止呛咳。

考点提示:气管插管的配合要点和护理。

五、气管切开

气管切开是指切开颈段气管前壁,置入气管切开套管,建立新的通气道,以解除患者喉源性呼吸困难或下呼吸道分泌物阻塞等,维持呼吸道通畅的一种手术方式。气管切开分传统手术气管切开、紧急气管切开、经皮气管切开,由于经皮气管切开具有操作简便、手术创伤小等优点,已成为临床常用的气管切开方式。

(一)适应证

(1)需要长时间应用呼吸机辅助呼吸者。

(2) 各种原因引起的严重喉阻塞或下呼吸道分泌物阻塞者。

(3)预防性气管切开:某些口腔、鼻咽、颌面、咽、喉部大手术,为便于麻醉和防止血液流入下呼吸道,可行气管切开术。

(4)气管插管72h后,病情尚未缓解,应考虑行气管切开。

(5)气管异物不能经喉取出者。

(二)禁忌证

严重出血性疾病或气管切开部位以下占位性病变引起呼吸道梗阻者。

(三) 操作配合(以经皮气管切开为例)

1. 用物准备 一次性气管切开包(包括手术刀、穿刺套管针、注射器、导丝、旋转扩张器、插入引导器)、型号合适的气切套管(成人男性7.5~9.5mm, 成人女性7~9mm)、负压吸引、吸痰管等。

2. 患者准备 患者取仰卧位,肩背垫高,头后仰,下颌对准胸骨切迹,保持正中位使气管向前突出,暴露视野(图 2-23)。

3. 操作配合

(1) 充分清除患者口、鼻腔及气道内分泌物。

(2)如果患者有气管插管,松开气管插管固定带、牙垫和固定胶带;用手固定气管插管以防滑脱。

(3) 将气囊完全放气, 缓慢退出气管插管 4 ~ 5cm, 待医生完成手术操作并将气切套管置入气道后, 再将气管插管完全拔出并清除口、鼻腔分泌物。

(4) 使用注射器给气切套管气囊充气, 维持气囊压力在 25～30,cmH2O 。

(5)妥善固定气切套管。

(6) 处理用物, 抬高床头至 30∘～45∘ 。

图2-23 气管切开位置

\r
(四) 护理

1. 密切观察患者生命体征 尤其是呼吸频率、幅度的变化,发现异常立即报告医生并及时给予处理。

2. 妥善固定气切套管,防止套管滑脱 气切套管固定带与颈部皮肤之间空隙以可容纳一指为宜,过松套管易脱出,过紧则压迫皮肤,影响血液循环,必要时可在固定带和皮肤之间使用泡沫敷料保护,防止压力性损伤。

3. 加强气道管理 及时给予经套管吸痰,保持气道通畅。若患者未使用呼吸机辅助呼吸,可使用气切面罩连接加温加湿器进行气道湿化;若患者无须吸氧,可在气切套管口用1或2层湿润的无菌盐水纱布覆盖,既可保持湿润,也可防止异物进入。

4. 防止切口感染 保持气管切开伤口周围皮肤的清洁、干燥,每日至少消毒切口并更换伤口敷料一次。密切观察切口有无红、肿、热、痛、分泌物增多等感染征象,必要时酌情应用抗生素。

5. 金属内套管护理 若患者使用金属气切套管,金属内套管需定期更换、消毒。内套管取出不超过 30min,以免因分泌物干稠结痂而阻塞套管腔。

6.并发症的观察与护理

(1) 皮下气肿: 为术后最常见的并发症, 多于数日后自行吸收, 无须特殊处理。

(2)气胸:轻度气胸可自行吸收,气胸明显影响呼吸时,应行胸腔闭式引流,将积气引流出体外。

(3) 伤口出血: 术后少量出血, 可用碘附纱布条压迫或使用止血药物止血; 若出血量大, 应充分检查伤口, 结扎出血点。\r
7. 拔管护理 病情好转后,遵医嘱给予拔管,拔管前应先试行堵管1~3日,堵管应逐步由半堵至全堵。堵管时要严密观察患者的呼吸,若患者呼吸平稳、发音正常,即可拔管。拔管后,消毒切口周围皮肤,用蝶形胶布拉拢黏合,其上盖以无菌纱布,数日后多可自行愈合。

考点提示: 气管切开的配合要点和护理; 喹食、异物卡喉的应对; 气管异物的护理。

目标检测

1. 下列属于经口气管插管禁忌证的是( )。

A. 急性咽喉炎 B. 气道急性炎症 C. 喉头水肿

D. 气管黏膜下血肿 E. 以上都是

2. 为舌后坠致呼吸道阻塞的昏迷患者通畅气道可优先采用( )。

A. 海姆立克急救法 B. 口咽通气管 C. 喉罩

D. 气管插管 E. 仰头举颏法

3. 气管插管通常留置( )。

A. 3 天

B. 4 天

C. 5 天

D. 6 天

E. 7 天

4. 需要长时间使用呼吸机辅助呼吸者, 可采用的畅通气道的方法为( )。

A. 海姆立克急救法 B. 口咽通气管 C. 喉罩

D. 气管插管 E. 气管切开

5. 海姆立克急救法适用于( )。

A. 脑梗死患者

B. 急性心肌梗死患者

C. 呼吸道异物阻塞者

D. 鱼刺卡喉者

E. 心搏骤停患者

(宋克春 范文慧 秦抗洪)`,rawHtml:`<p>案例导学</p>\r
<p>张某,男,12岁。在吃饭过程中突然发生剧烈咳嗽,家属立即给予安抚和拍背,过程中发现患者出现呼吸困难、面色青紫、大汗淋漓、意识模糊等症状。患者既往无其他病史。</p>\r
<p>请思考：</p>\r
<p>1. 该患者发生了什么情况？</p>\r
<p>2. 发现后第一时间应该如何进行施救？</p>\r
<p>通畅气道术是指当患者由于各种原因出现气道梗阻时，为保证患者呼吸道通畅，确保氧气顺利进入患者肺部而采取的抢救措施。气道梗阻是临床危重症患者死亡的原因之一，因此，及时有效地开放气道、保持呼吸道通畅是抢救患者的基本条件。导致气道梗阻的常见原因包括呼吸道异物阻塞、舌后坠、气道黏膜肿胀和痉挛等，护士需及时发现气道梗阻现象，并能针对气道梗阻的原因进行有效的畅通气道术。</p>\r
<p>一、海姆立克急救法</p>\r
<p>海姆立克急救法(Heimlich maneuver)是解除呼吸道异物梗阻的主要方法,它的作用原理是冲击腹部膈肌下软组织,产生突然向上的压力,压迫两肺下部,从而驱使肺部残留空气形成一股气流,将堵塞患者气管、咽喉部的异物驱除,使患者获救(图2-12)。</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-1-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-12 海姆立克急救法示意图</p>\r
<p style="text-align: center;">素质拓展</p>\r
<p>生命的拥抱:海姆立克急救法</p>\r
<p>海姆立克急救法由亨利·海姆立克教授发明。海姆立克是一位多年从事外科的医生，在临床实践中，他被大量的食物、异物造成呼吸道梗阻致死的病例震惊了，而在急诊中，医生常常采用拍打患者背部，或将手指伸进患者口腔、咽喉去取的方法排出异物，结果不仅无效反而使异物更深入呼吸道。这个发现，使他陷入了深深的思考。经过反复研究和多次动物实验，他终于发明了利用肺部残留气体形成气流冲出异物的急救方法。1974年，他做了关于腹部冲击法解除气管异物的首次报告。1975年10月，美国医学会以他的名字命名了这个急救方法，并经该学会推荐，在报刊、电视等媒体广为宣传。</p>\r
<p>随着海姆立克急救法的普及推广,这项急救技术已成功挽救数以万计呼吸道异物梗阻患者,人们也亲切地把它称为“生命的拥抱”。</p>\r
<p>(一)一般患者的海姆立克急救法</p>\r
<p>1. 自救腹部冲击法 适用于气道不完全梗阻且意识清醒的患者,患者自身具有一定救护知识、技能,并且当时无他人在场相助、打电话困难、不能说话报告的情况(图 2-13)。患者一手握空心拳,拳眼(拇指侧)置于腹部脐上两横指处,另一手紧握住此拳,双手同时快速向内、向上冲击5次;也可将上腹部压在坚硬物体上,如桌边、椅背和栏杆处,连续向内、向上冲击5次。重复操作若干次,直到异物排出。</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-3-l.jpg" /><figcaption></figcaption></figure>\r
<f
igure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-4-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-5-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-13 自救腹部冲击法</p>\r
<p>2. 腹部冲击法 适用于不完全或完全气道梗阻患者。对意识清醒患者, 可用立位腹部冲击法; 意识不清者, 采用仰卧式腹部冲击法救治。</p>\r
<p>(1) 立位腹部冲击法: 救护者站在患者的背后, 双臂环绕患者腰部, 一手握空心拳, 拳眼置于腹部脐上方两横指处, 另一手紧握此拳, 快速向内、向上冲击 5 次。患者应配合救护者, 弯腰, 头部前倾, 低头张口, 以便异物排出(图 2-14A)。</p>\r
<p>(2) 仰卧位腹部冲击法: 将患者置于仰卧位, 救护者骑跨于患者髋部两侧, 一手掌根置于患者腹部脐上方两横指处, 不要触及剑突, 另一手直接放在第一只手背上, 两手掌根重叠, 快速向内、向上冲击腹部, 连续 5 次, 重复操作直至异物排出(图 2-14B)。操作后应检查口腔, 如异物被冲出, 迅速用手将异物取出。如呼吸、心跳停止, 应立即实施心肺复苏。</p>\r
<p style="text-align: center;">A. 立位腹部冲击法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-6-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">B. 仰卧位腹部冲击法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-7-l.jpg" /><figcaption></figcaption></figure>\r
<p>图2-14 腹部冲击法</p>\r
<p>(二)特殊患者的海姆立克急救法</p>\r
<p>1. 肥胖者和孕妇 对于发生呼吸道异物阻塞的肥胖者和孕妇,不宜采用腹部冲击法,应当采用胸部冲击法。施救时,姿势与腹部冲击法相同,双手置于患者胸骨中下部即可,注意不要偏离胸骨,以免造成肋骨骨折。</p>\r

<p>2. 婴儿 当婴儿发生呼吸道异物梗阻后, 可采取背部叩击(图 2-15A)联合胸部冲击性按压(图 2-15B), 具体做法如下: 救护者一手手指张开托住患儿下颌并固定头部, 保持头低位, 另一手掌根部在患儿的背部肩胛之间用力叩击 5 次。用叩击婴儿背部的手掌托住婴儿的枕部, 两前臂固定婴儿, 小心将婴儿翻转至面部朝上, 使患儿仰卧于救护者前臂上, 保持头部低于躯干, 救护者前臂放在自身大腿上, 另一手的两指在婴儿胸骨上两乳头连线下一横指处快速向下冲击性按压 5 次。其间检查婴儿口腔, 如异物排出, 采用下颌抬举法手钩异物小心将其取出; 如果异物仍未排出, 则重复胸部冲击性按压, 可配合背部叩击交替进行, 直到异物排出。</p>\r
<p style="text-align: center;">A. 背部叩击</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-8-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">B. 胸部冲击性按压</p>\r
<figure class="image"><img alt=
"" src="bookpicture/ds066854/ds0668540008-9-l.jpg" /><figcaption></figcaption></figure>\r
<p>图2-15 婴儿呼吸道梗阻急救法</p>\r
<p>考点提示: 海姆立克急救法的操作要领; 小儿气道异物的处理。</p>\r
<p>二、口咽通气管的使用</p>\r
<p>口咽通气管是一种由塑料或橡胶材质制成的人工气道，为弯曲形的中空扁管，弯曲度大致与口咽部相似，将其置入后可防止昏迷患者舌后坠造成气道阻塞(图2-16)。</p>\r
<p>(一)适应证</p>\r
<p>(1)舌后坠致呼吸道阻塞的昏迷患者。</p>\r
<p>(2)麻醉后意识未清醒的患者。</p>\r
<p>(3)缺乏咳嗽或咽反射的昏迷患者。</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-10-l.jpg" /><figcaption></figcaption></figure>\r
<p>图2-16 口咽通气管</p>\r
<p>(二)禁忌证</p>\r
<p>(1)清醒或半清醒患者。</p>\r
<p>(2) 口腔及上、下颌骨创伤患者。</p>\r
<p>(3) 咽部占位性病变患者。</p>\r
<p>(4)频繁呕吐患者。</p>\r
<p>(三) 操作方法</p>\r
<p>1. 用物准备 选择型号合适的口咽通气管,测量患者门齿到耳垂的距离即为合适的置入长度。</p>\r
<p>2. 患者准备 患者取平卧位,头后仰,用左手或开口器打开患者口腔,清除口腔分泌物。</p>\r
<p>3. 操作步骤 手持口咽通气管的凹面面向腭部插入口腔, 当其内口接近患者口咽后壁时(即已通过悬雍垂), 将口咽通气管旋转 180<sup>∘</sup> 后继续插入直至咽部。如遇插入困难, 可双手托起患者下颌, 使舌离开咽后壁(图 2-17)。选择的导管不可过长, 避免通气管抵达会厌, 引起完全性喉梗阻。不恰当地安置通气管, 反而会将舌根推至咽腔而加重阻塞, 或引起喉痉挛。</p>\r
<p style="text-align: center;">图2-17 口咽通气管插管法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-11-l.jpg" /><figcaption></figcaption></figure>\r
<p>三、喉罩的使用</p>\r
<p>喉罩(laryngeal mask airway, LMA)由通气管和罩体组成,罩体呈椭圆形,置入后可覆盖患者喉部,气囊充气后在喉周形成密封圈，通气管既可以实现自主呼吸，也可以连接呼吸机或氧气装置，实现通气支持。喉罩因其具有操作简单、维持通气等优点，被广泛应用于急救(图2-18)。</p>\r
<p style="text-align: center;">图2-18 不同型号的喉罩</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-13-l.jpg" /><figcaption></figcaption></figure>\r
<p>(一)适应证</p>\r
<p>(1)外科手术呼吸支持者。</p>\r
<p>(2)呼吸困难气管插管者。</p>\r
<p>(二)禁忌证</p>\r
<p>(1)喉部及喉部以下气道梗阻者。</p>\r
<p>(2)气道阻力增高者。</p>\r
<p>(3) 咽部占位性病变者。</p>\r
<p>(4)频繁呕吐患者。</p>\r
<p>(5) 张口困难患者。</p>\r
<p>(三) 操作方法</p>\r
<p>1. 用物准备 选择合适型号的喉罩、注射器、固定胶带、吸引装置。</p>\r
<p>2. 患者准备 患者禁食,取平卧位,头后仰,清除口腔及气道分泌物。</p>\r
<p>3. 操作步骤 患者头部伸展,将罩口朝向下颌放入口腔,用示指压住喉罩使其紧贴硬腭,并推动喉罩使其沿咽部生理解剖弧度向下进入患者下咽,直至感到阻力时停止,固定喉罩导管并用注射器给气囊充气。</p>\r
<p>四、气管插管</p>\r
<p>气管插管是指将一特制的管道经口腔或鼻腔，经声门插入气管的技术。气管插管是畅通气道的最有效方法之一，也是建
立人工气道的可靠途径，它不仅便于清除呼吸道分泌物，维持气道通畅，还为给氧、人工通气、气管内给药等提供条件，因此，在危重患者的治疗和抢救中具有极其重要的作用。目前，经口明视插管法是临床应用最广泛的一种气管插管方法。该法简单、方便，能迅速建立有效人工气道。</p>\r

<p>(一)适应证</p>\r
<p>(1)气道梗阻、窒息或呼吸、心跳停止需行人工通气者。</p>\r
<p>(2) 各种原因引起的呼吸衰竭需行机械通气者。</p>\r
<p>(3)上呼吸道分泌物过多,且不能自行咳出,需行气管内吸引者。</p>\r
<p>(4) 各种全麻或静脉复合麻醉者。</p>\r
<p>(5)需经气管插管进行呼吸道疾病的诊断和治疗者。</p>\r
<p>(二)禁忌证</p>\r
<p>(1) 喉头水肿、呼吸道急性炎症者。</p>\r
<p>(2)咽喉部血肿或脓肿。</p>\r
<p>(3) 主动脉瘤压迫气管, 插管时易导致主动脉瘤破裂者。</p>\r
<p>(4)下呼吸道分泌物潴留所致的呼吸困难,一般情况下很难从插管内清除过多的分泌物,应行气管切开者。</p>\r
<p>(5) 口腔、颌面部损伤或颈椎骨折脱位者。</p>\r
<p>(三) 操作配合</p>\r
<p>1. 用物准备</p>\r
<p>(1) 喉镜: 有成人、儿童和幼儿 3 种规格。喉镜片有弯、直两种类型, 弯喉镜多用于成人及年长儿, 直喉镜多用于新生儿或幼儿(图 2-19)。</p>\r
<p>(2)气管导管:一般为带气囊的硅胶管,应根据患者的具体情况选择合适的型号。操作前检查其通畅情况,气囊膨胀是否均匀、导管末端是否居中,导管末端不居中时不能使用(图2-20)。</p>\r
<p>(3) 导管管芯: 铜质或铝质的细金属条, 长度以插入导管后其远端距离导管开口 0.5～1,cm 为宜。</p>\r
<p>(4)其他:包括开口器、压舌板、牙垫、喉头喷雾器(内装1%地卡因)、插管钳、注射器、血管钳、胶布、吸痰管、听诊器、负压吸引器、给氧装置、呼吸机和气管切开包等用物。</p>\r
<p style="text-align: center;">图2-19 喉镜片</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-15-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-20 气管导管</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-16-l.jpg" /><figcaption></figcaption></figure>\r
<p>2. 患者准备 患者仰卧, 垫小枕使头后仰并抬高 10cm, 保持口、咽、气管位于一条轴线(图 2-21)。</p>\r
<p>3. 操作配合</p>\r
<p>(1) 清除患者口鼻腔及咽部的分泌物。</p>\r
<p>(2) 使用简易呼吸气囊给予患者辅助通气 1~2min, 迅速提高患者组织器官含氧量。</p>\r
<p>(3)在医生插管过程中,协助固定患者头部,密切观察患者生命体征、心电图、血氧饱和度有无异常。</p>\r
<p>(4)待医生将气管插管通过声门后,双手退出导管管芯,放置牙垫(图 2-22)。</p>\r
<p>(5)当医生确定插管成功后,使用注射器给气囊充气(气囊压力为 25～30,cmH<sub>2</sub>O )。</p>\r
<p>(6) 使用胶布妥善固定导管和牙垫。</p>\r
<p>(7) 使用吸痰管充分吸引气道分泌物, 维持气道通畅。</p>\r
<p>(8) 处理用物, 洗手, 记录痰液颜色、性质和量, 患者生命体征及呼吸状态。</p>\r
<p style="text-align: center;">图2-21 抬高头部(10cm)</p>\r
<figure class="image"><im
g alt="" src="bookpicture/ds066854/ds0668540008-17-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-22 退出导管管芯</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-18-l.jpg" /><figcaption></figcaption></figure>\r
<p>(四) 护理</p>\r
<p>1. 病情观察 严密监测患者的生命体征、血氧饱和度等。重点观察患者呼吸状况，了解胸廓起伏是否一致、听诊呼吸音是否对称，以判断导管是否移位。</p>\r
<p>2. 妥善固定导管,防止导管脱出</p>\r
<p>(1) 记录: 插管成功, 记录导管外口至切牙的距离并做好交接班。</p>\r
<p>(2) 固定: 注意观察导管固定情况, 如有滑脱、扭曲及松动应及时处理。</p>\r
<p>(3) 约束: 约束昏迷、烦躁患者的肢体, 防止患者意外拔管。</p>\r
<p>3. 维持呼吸道通畅</p>\r
<p>(1) 严格无菌操作: 为防止肺部感染, 吸痰时一定要严格无菌操作。操作前洗手、戴口罩, 备无菌吸痰盘, 吸痰管每次更换, 吸痰用物 24h 更换一次。吸痰时负压不可太大, 动作要轻柔, 避免损伤气道黏膜。</p>\r
<p>(2)加强湿化,保持呼吸道湿润:若患者分泌物黏稠,可先向导管内注入2~4mL生理盐水,继续通气待分泌物充分稀释后,迅速进行负压吸引,如果一次不能吸引干净,应间隔一定时间再重复进行,如此反复多次,至吸干净为止。</p>\r
<p>(3)翻身、拍背:在患者生命体征稳定时,定时翻身、拍背,有利于彻底排痰。</p>\r
<p>(4) 观察: 注意观察痰液的性质、颜色和量, 必要时定期进行痰液培养。</p>\r
<p>4. 加强口腔护理 应定时进行口腔护理, 至少每 6~8h 一次, 尤其对于经口腔插管的患者, 宜使用含有 0.1% 氯己定的消毒剂漱口、清洁口腔黏膜, 进行牙齿擦拭或冲洗。用液状石蜡涂于口唇及鼻前庭, 防止干燥。</p>\r

<p>5. 检查气囊是否有故障 可通过“一听”有无漏气声，“二看”口鼻有无气体排出，“三查”套管位置有无改变，“四试”气囊放气量与充气量是否相等来判断。</p>\r
<p>6.并发症护理</p>\r
<p>(1) 窒息: 脱管、导管堵塞、呼吸机功能障碍等是引起窒息的常见原因。应加强护理和观察, 出现问题及时处理。</p>\r
<p>(2) 肺不张: 多因导管插入过深导致一侧肺通气、呼吸道分泌物阻塞细小支气管、肺功能残气量减少等原因所致。护理人员要随时清除呼吸道分泌物, 减少分泌物潴留; 监控气管导管, 防止下滑或插入过深。</p>\r
<p>(3)气道黏膜损伤:长期气管插管,插管套囊压迫气管黏膜使其缺血引起溃疡或坏死性损伤。应定时为导管套囊放气,一般4h放气一次,休息5~10min后再充气,充气时可触摸导管体外气囊,保持适宜的张力。正常情况下放气量与充气量一致,放气期间要防止导管脱出。同时,留置导管时间不要超过72h,对长期留置者应考虑行气管切开。</p>\r
<p>(4) 继发肺部感染: 由抵抗力下降、肺不张、呼吸道分泌物潴留、吸痰时不注意无菌操作等原因所致。要积极预防, 严密观察患者的全身表现和呼吸道表现, 出现症状及时报告医生, 配合处理。</p>\r
<p>(5)插管术后喉炎:表现为拔管后声嘶和刺激性咳嗽,严重时出现吸气性呼吸困难。其发生与插管时间呈正相关。处理方法可用1%肾上腺素1mL和地塞米松5mg加入生理盐水10mL内做超声雾化吸入,每日3或4次。有呼吸困难者可再做气管插管或气管切开。</p>\r
<p>7. 拔管护理</p>\r
<p>(1) 拔管前应进行咳嗽、深呼吸训练, 防止拔管后不能自行清理呼吸道, 出现呼吸障碍。</p>\r
<p>(2) 充分清理鼻腔、口咽部及气管内分泌物, 松开气囊, 以纯氧过度通气 10min。</p>\r
<p>(3
) 嘱患者深呼吸, 在患者呼气末拔除导管。立即进行鼻导管给氧、口腔护理, 必要时吸痰。</p>\r
<p>(4) 观察患者有无声嘶、呼吸困难、喉头哮鸣，能否咳嗽。必要时立即插管。</p>\r
<p>(5)拔管后禁食4~6h,防止呛咳。</p>\r
<p>考点提示:气管插管的配合要点和护理。</p>\r
<p>五、气管切开</p>\r
<p>气管切开是指切开颈段气管前壁,置入气管切开套管,建立新的通气道,以解除患者喉源性呼吸困难或下呼吸道分泌物阻塞等,维持呼吸道通畅的一种手术方式。气管切开分传统手术气管切开、紧急气管切开、经皮气管切开,由于经皮气管切开具有操作简便、手术创伤小等优点,已成为临床常用的气管切开方式。</p>\r
<p>(一)适应证</p>\r
<p>(1)需要长时间应用呼吸机辅助呼吸者。</p>\r
<p>(2) 各种原因引起的严重喉阻塞或下呼吸道分泌物阻塞者。</p>\r
<p>(3)预防性气管切开:某些口腔、鼻咽、颌面、咽、喉部大手术,为便于麻醉和防止血液流入下呼吸道,可行气管切开术。</p>\r
<p>(4)气管插管72h后,病情尚未缓解,应考虑行气管切开。</p>\r
<p>(5)气管异物不能经喉取出者。</p>\r
<p>(二)禁忌证</p>\r
<p>严重出血性疾病或气管切开部位以下占位性病变引起呼吸道梗阻者。</p>\r
<p>(三) 操作配合(以经皮气管切开为例)</p>\r
<p>1. 用物准备 一次性气管切开包(包括手术刀、穿刺套管针、注射器、导丝、旋转扩张器、插入引导器)、型号合适的气切套管(成人男性7.5~9.5mm, 成人女性7~9mm)、负压吸引、吸痰管等。</p>\r
<p>2. 患者准备 患者取仰卧位,肩背垫高,头后仰,下颌对准胸骨切迹,保持正中位使气管向前突出,暴露视野(图 2-23)。</p>\r
<p>3. 操作配合</p>\r
<p>(1) 充分清除患者口、鼻腔及气道内分泌物。</p>\r
<p>(2)如果患者有气管插管,松开气管插管固定带、牙垫和固定胶带;用手固定气管插管以防滑脱。</p>\r
<p>(3) 将气囊完全放气, 缓慢退出气管插管 4 ~ 5cm, 待医生完成手术操作并将气切套管置入气道后, 再将气管插管完全拔出并清除口、鼻腔分泌物。</p>\r
<p>(4) 使用注射器给气切套管气囊充气, 维持气囊压力在 25～30,cmH<sub>2</sub>O 。</p>\r
<p>(5)妥善固定气切套管。</p>\r
<p>(6) 处理用物, 抬高床头至 30<sup>∘</sup>～45<sup>∘</sup> 。</p>\r
<p style="text-align: center;">图2-23 气管切开位置</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540008-19-l.jpg" /><figcaption></figcaption></figure>\r
<p>(四) 护理</p>\r
<p>1. 密切观察患者生命体征 尤其是呼吸频率、幅度的变化,发现异常立即报告医生并及时给予处理。</p>\r
<p>2. 妥善固定气切套管,防止套管滑脱 气切套管固定带与颈部皮肤之间空隙以可容纳一指为宜,过松套管易脱出,过紧则压迫皮肤,影响血液循环,必要时可在固定带和皮肤之间使用泡沫敷料保护,防止压力性损伤。</p>\r
<p>3. 加强气道管理 及时给予经套管吸痰,保持气道通畅。若患者未使用呼吸机辅助呼吸,可使用气切面罩连接加温加湿器进行气道湿化;若患者无须吸氧,可在气切套管口用1或2层湿润的无菌盐水纱布覆盖,既可保持湿润,也可防止异物进入。</p>\r
<p>4. 防止切口感染 保持气管切开伤口周围皮肤的清洁、干燥,每日至少消毒切口并更换伤口敷料一次。密切观察切口有无红、肿、热、痛、分泌物增多等感染征象,必要时酌情应用抗生素。</p>\r
<p>5. 金属内套管护理 若患者使用金属气切套管,金属内套管需定期更换、消毒。内套管取出不超过 30min,以免因分泌物干稠结痂而阻塞套管腔。</p>\r
<p>6.并发症的观察与护理</p>\r
<p>(1) 皮下气肿: 为术后最常见的并发症, 多于数日后自行吸收, 无须特殊处理。</p>\r
<p>(2)气胸:轻度气胸可自行吸收,气胸明显影响呼吸时,应行胸腔闭式引流,将积气引流出体外。</p>\r
<p>(3) 伤口出血: 术后少量出血, 可用碘附纱布条压迫或使用止血药物止血; 若出血量大, 应充分检查伤口, 结扎出血点。<
/p>\r
<p>7. 拔管护理 病情好转后,遵医嘱给予拔管,拔管前应先试行堵管1~3日,堵管应逐步由半堵至全堵。堵管时要严密观察患者的呼吸,若患者呼吸平稳、发音正常,即可拔管。拔管后,消毒切口周围皮肤,用蝶形胶布拉拢黏合,其上盖以无菌纱布,数日后多可自行愈合。</p>\r
<p>考点提示: 气管切开的配合要点和护理; 喹食、异物卡喉的应对; 气管异物的护理。</p>\r
<p>目标检测</p>\r
<p>1. 下列属于经口气管插管禁忌证的是( )。</p>\r
<p>A. 急性咽喉炎 B. 气道急性炎症 C. 喉头水肿</p>\r
<p>D. 气管黏膜下血肿 E. 以上都是</p>\r
<p>2. 为舌后坠致呼吸道阻塞的昏迷患者通畅气道可优先采用( )。</p>\r
<p>A. 海姆立克急救法 B. 口咽通气管 C. 喉罩</p>\r
<p>D. 气管插管 E. 仰头举颏法</p>\r
<p>3. 气管插管通常留置( )。</p>\r
<p>A. 3 天</p>\r
<p>B. 4 天</p>\r
<p>C. 5 天</p>\r
<p>D. 6 天</p>\r
<p>E. 7 天</p>\r
<p>4. 需要长时间使用呼吸机辅助呼吸者, 可采用的畅通气道的方法为( )。</p>\r
<p>A. 海姆立克急救法 B. 口咽通气管 C. 喉罩</p>\r
<p>D. 气管插管 E. 气管切开</p>\r
<p>5. 海姆立克急救法适用于( )。</p>\r
<p>A. 脑梗死患者</p>\r
<p>B. 急性心肌梗死患者</p>\r
<p>C. 呼吸道异物阻塞者</p>\r
<p>D. 鱼刺卡喉者</p>\r
<p>E. 心搏骤停患者</p>\r
<p>(宋克春 范文慧 秦抗洪)</p>\r
`},{id:"module3-task3",title:"第三节 创伤急救技术",order:3,rawContent:`案例导学

2024年6月25日，在某高速公路距一收费站约 500m 处因车祸致一人受伤。救护者赶到现场后检查发现，伤者神志清楚，呼吸、脉搏正常，口咽部未见明显异物及出血。主诉：心慌，左上肢疼痛难忍。其左前臂可见喷射性出血；左小腿畸形，前面见 6cm 左右创面，可见渗血，疼痛明显。伤者病情复杂，其左前臂、左小腿在现场不能排除骨折。

请思考：

1. 该伤者发生了什么情况？如何评估？

2. 作为救护者,该如何进行急救?

创伤(trauma)是常见的意外伤害,救护者首先应迅速了解伤员生命体征及机体各部位伤情。在施行有效心肺复苏的同时及时应用清创、止血、包扎、固定和搬运等技术。这些技术若能得到及时、正确、有效的应用,往往在挽救伤员生命、防止病情恶化、减少伤员痛苦及预防并发症等方面均有良好的效果。因此,清创、止血、包扎、固定、搬运等技术是每一位院前急救人员必须熟练掌握的技术,也是公众应当普及的急救常识。

一、清创术

清创术(debridement)是用外科手术的方法,清除开放伤口内的异物,切除坏死、失活或严重污染的组织、缝合伤口,使之尽量减少污染,甚至变成清洁伤口,达到一期愈合,有利受伤部位的功能和形态的恢复。开放伤口一般分为清洁、污染、感染伤口三类。清洁伤口一般系指手术切口,手术完毕时直接缝合即可;污染伤口指受伤后6~8h以内,伤口有细菌污染而尚未发展成感染,但伤口内存在细菌、失活组织物等,不利于伤口愈合;感染伤口指伤口已感染甚至化脓,包括延迟处理的开放伤口和继发感染的手术伤口,经换药处理方能愈合。一般伤口的清创宜在伤后6~8h内进行。血运丰富、污染轻、失活组织少的伤口,只要伤口的污染未发展为感染,均可行清创处理。清创术是一种外科基本手术操作。伤口初期处理的好坏，对伤口愈合、受伤部位组织功能和形态恢复的好坏起决定性作用，应予以重视。

(一)术前准备

1. 用物准备 清创缝合包、麻醉剂、无菌注射器及针头、皮肤消毒液、伤口冲洗液、刀片、缝合针、无菌手套等。

2. 患者准备

(1)防止休克,待休克好转后争取时间进行清创。

(2)有活动性大出血时,在抗休克的同时紧急行清创、止血。\r
(3) 如颅脑、胸、腹部有严重损伤，应先给予紧急处理。如四肢有开放性损伤，应注意是否同时合并骨折，可进行 X 线检查协助诊断。

(4)应用止痛和术前镇痛药物。

(5)如伤口较大、污染严重,应预防性应用抗生素。在术前1h、术中、术后分别应用一定量的抗生素。注射破伤风抗毒素,轻者用1500U,重者用3000U。

(二) 操作步骤

根据伤口部位、大小等,选择适当的体位和麻醉。

1. 清洗消毒 创口局部毛发较多时,先剃去毛发,以无菌敷料盖住伤口,根据伤口周围皮肤情况,采用擦洗、刷洗、冲洗等方法清洁伤口周围皮肤。揭去伤口上的敷料,以适量无菌生理盐水和刺激性小的无色消毒液反复冲洗伤口,冲走伤口内游离的异物、血块、失活组织。对较大伤口的清创,术者须常规外科手消毒后穿无菌手术衣、戴无菌手套,创口周围皮肤常规消毒、铺巾后再进行伤口清理。

2. 清理伤口 由浅入深仔细检查伤口,创腔大创口小时需适当扩大创口后再检查,彻底去除伤口内异物及血块,切除失活组织,尚未失活但血液循环差、污染严重的不重要组织亦应适当切除,创缘皮肤不规则、不整齐且考虑缝合时,张力不大者可适当修剪使之整齐,创腔内进行可靠止血。清理伤口时随时注意用刺激小的无色消毒液冲洗创口。经以上处理,使伤口尽量类似于无菌手术伤口,对简单伤口即可逐层缝合;对复杂伤口则需做组织修复,做组织修复前应重新消毒、铺巾、更换手套和器械。

3. 组织修复 配合医生对骨、血管、肌腱、关节囊等部位进行处理，对创口内明显出血的非重要血管，在清创时均应结扎或缝扎止血。所有操作严格遵循无菌技术操作原则。

4. 伤口缝合 彻底清创、修复重要组织后，创口按组织层次做一期缝合。缝合时皮肤有较大张力者应做减张缝合，估计减张缝合仍难缝合皮肤者，则应做皮肤移植。考虑缝合后伤口内仍有渗液可能时，可留置乳胶片或乳胶管做预防性引流。估计清创后伤口仍有感染可能者，可只缝合深层组织，2～4日后无感染发生再缝合皮下组织和皮肤。

(三) 护理

(1) 清创前注意收集病史, 做好护理检查, 充分了解全身和局部的伤情。

(2) 伤情严重时主动配合医生做好患者抢救工作。

(3)全身伤情严重、局部因创伤而导致形态和功能明显受损,患者因此而焦虑、恐惧时,应做好解释、安慰工作,争取患者术中的配合。

(4) 清创时做到认真、仔细、正确、快捷，严格执行无菌操作，尽可能保证创伤局部形态和功能的完整。

(5)清创后注意适当固定和抬高患肢,并注意其血运情况。

(6)术后遵医嘱给予抗生素预防感染，并做破伤风预防的常规处理。

(7) 密切观察伤口愈合情况, 清创后的伤口仍发生感染者及时按感染伤口进行处理, 伤口引流条, 一般应根据引流物情况, 在术后 24~48h 内拔除。

考点提示: 清创术前、后护理措施。

二、止血术

血液是维持生命的重要物质,一般成人全身血量占体重的7%~8%,当失血量小于全身血量的10%(约400mL)时,可有轻度头晕、交感神经兴奋症状或无任何反应;当失血量超过全身血量的20%(800~1000mL)时,会出现休克症状,如头晕、脉搏加快、血压下降、出冷汗、肤色苍白、少尿等;当失血量达全身血量的40%时,短时间内就会危及生命。因此,在保证呼吸畅通的同时,应快速准确地进行止血。快速止血是危重患者抢救时重要的急救技术之一。

(一) 出血的判断

各种创伤一般都会伴有出血，出血一般分为内出血和外出血。内出血指血液流向体腔或间隙，需要专业设备、器械止血，一般为院内救治。外出血指血液自伤口流出，是现场急救重点。此外，救护者还应判断出血的部位、性质，以便采取正确有效的止血方法。

1. 动脉出血 血色鲜红,量多,速度快,呈喷射状,血管有搏动,与脉搏节律相同,危险性大。

2. 静脉出血 血色暗红, 流速较为缓慢, 呈持续状, 不断流出, 
危险性较动脉出血小。

3. 毛细血管出血 血色鲜红,血液从整个伤口创面渗出,一般不容易找到出血点,常可以自动凝固而止血,危险性小。如果伴有较大伤口或创面时,也可引起出血性休克,应及时止血。

(二) 止血的方法

出血部位、性质不同,应选择的止血方法也有区别,救护者应快速选择合适的止血方法,以达到最快、最有效、最安全止血的目的。

1. 指压止血法 是无须任何器械、简便、有效的止血方法。根据动脉的走向，在出血伤口的近心端，通过用手指压迫血管使血管闭合而达到临时止血的目的，然后再选择其他的止血方法止血。指压止血法适用于头、颈部和四肢的动脉出血。对不同的出血部位，采用不同的压迫点(图2-24)。

图2-24 全身主要动脉的压迫点

\r
(1)头、颈、面部出血指压法:头、面部主要动脉见图2-25。

图2-25 头、面部主要动脉

\r
1) 头顶部出血: 一侧头顶部出血, 用拇指或示指压迫同侧颞浅动脉(耳屏前方颧弓根部) 止血(图 2-26A)。

2)颜面部出血:一侧颜面部出血,用拇指或示指压迫同侧面动脉(下颌骨下缘下颌角前3cm处搏动点)止血。由于面动脉在颜面部有许多小支相互吻合,所以必须压迫双侧(图2-26B)。

3) 头后区出血: 一只手固定伤员头部, 用拇指将耳后枕动脉(耳乳突下凹陷处搏动点)压向乳突, 阻断耳后动脉血流(图 2-26C)。

4) 头颈部出血: 用拇指或四指将颈总动脉(气管与胸锁乳突肌之间相当于甲状软骨平面处的搏动点)压向颈椎横突止血, 一般用于头面部大出血, 但不可以双侧压迫止血, 以免引起脑部缺氧(图 2-26D)。

图2-26 头、颈、面部动脉血管出血的指压部位

A. 指压颞浅动脉

\r
B. 指压面动脉

\r
C. 指压枕动脉

\r
D. 指压颈总动脉

\r
知识链接

婴幼儿鼻出血的救护

婴幼儿鼻出血通常是由于鼻腔内的血管破裂所致,以下救护措施可供参考。

1. 指压法 方便且高效，以平时常见的少量出血最为适用。具体做法：嘱患儿取坐位，用拇指和示指紧紧压住其两侧鼻翼，压向鼻中隔部，这个位置就是血管相对丰富的“黎氏区”。嘱患儿尽量配合，张开嘴巴进行呼吸，一般压迫5～10min出
血即可停止。如果有条件可以配合冷敷，效果更佳。如指压的同时或指压后为了预防再次出血，可在婴幼儿前额部用冷毛巾或冰块冷敷。

2. 压迫填塞法 如果出血量大,用指压法不能止血时,可采用压迫填塞法止血。具体做法:将脱脂棉卷成如鼻孔粗细的条状,向鼻腔充填,也可使用消毒棉球填塞出血侧鼻孔,起到降低局部血液流速、促进止血的作用。需要注意填塞不要过松,否则达不到止血的目的。

若患儿经常鼻出血,或者出血量大,应立即带患儿入院做详细检查。

(2) 上肢出血指压法: 上肢主要动脉出血的指压部位见图 2-27。

A. 指压锁骨下动脉；B. 指压腋动脉；C. 指压肱动脉；D. 指压尺动脉、桡动脉。图2-27 上肢动脉出血的指压部位

1) 肩部、腋部出血: 拇指将锁骨下动脉(锁骨上窝中部的搏动点)压向第一肋, 其余四指放在患者颈后。

2) 上臂出血: 上肢外展 90∘ , 在腋窝中点用拇指将腋动脉压向肱骨头。

3) 前臂出血: 用四指将肱动脉(肱二头肌内侧沟中部的搏动点)压向肱骨干(图 2-28)。

图2-28 指压肱动脉

\r
4) 手部出血: 双手拇指将尺动脉、桡动脉(手腕横纹稍上处的内、外侧搏动点) 向尺骨和桡骨方向压迫止血(图 2-29)。

图2-29 指压尺动脉、桡动脉

\r
(3)下肢出血指压法:下肢主要动脉出血压迫部位见图2-30。

A. 指压股动脉; B. 指压腘动脉; C. 指压胫前动脉、胫后动脉。图2-30 下肢动脉出血的压迫部位

\r
1)大腿出血:用拇指或拳头将股动脉在腹股沟中点稍向下部的强搏动点压向耻骨(图2-31)。

图2-31 指压股动脉

\r
2) 小腿出血: 在腘窝中部压迫腘动脉。

3) 足部出血: 压迫足背中部近脚腕处的胫前动脉和足跟内侧与内踝之间的胫后动脉(图 2-32)。

图2-32 指压胫前、胫后动脉

\r
考点提示:压迫止血法的压迫部位及操作方法。

2. 加压包扎法 是急救中最常用的止血方法之一,适用于体表和
四肢伤的小动脉、静脉及毛细血管出血。伤口处用消毒纱布或干净的手帕、毛巾、衣物等敷料覆盖,再用三角巾或绷带加压包扎。注意包扎压力适当,范围要大,同时抬高患肢以避免因静脉回流受阻而增加出血。伤口骨折处有碎骨时禁止用此法。

3. 填塞止血法 适用于广泛而深层次的软组织损伤出血,如腹股沟、腋窝、子宫等出血,用无菌敷料填入伤口内压紧,外加敷料加压包扎。此法仅用于紧急止血,在清创时有可能再次大出血,应尽快行手术止血。

4. 加垫屈曲关节止血法 多用于肘或膝关节以下出血。在无骨关节损伤时，在肘窝或腘窝处放一绷带卷，然后强屈关节，用绷带、三角巾包扎控制出血（图2-33），须立即送医院进一步治疗。此法可能压迫到神经、血管，且不便于患者搬动，不宜首选。

图2-33 加垫屈曲关节止血法

\r
5. 止血带止血法 适用于四肢大出血，当其他止血法不能止血而危及患者生命时。使用止血带止血得当，止血效果较好。可选用专用止血带（如橡皮止血带、气压止血袋），在紧急情况下也可用三角巾、手帕、毛巾或布条折成带状进行止血。

(1) 常用方法: 具体如下。

1) 橡皮止血带止血法: 在肢体伤口的近心端, 用棉垫、纱布或衣服、毛巾等物作为衬垫后再缠上止血带。以左手的拇指、示指、中指持止血带的头端, 将长的尾端绕肢体一圈后压住头端, 再绕肢体一圈, 然后用左手示指、中指夹住尾端后将尾端从止血带下拉出, 使之成为一个活结。如需放松止血带, 只需将尾端拉出即可(图 2-34)。

图2-34 橡皮止血带止血法

\r
2) 充气止血带止血法: 充气止血带根据血压计原理设计, 有压力表指示压力的大小, 压力均匀, 效果较好。将袖带绑在伤口的近心端, 充气后起到止血的作用。

3) 勒紧止血法: 先将伤口上部用绷带或带状布料或将三角巾折成带状, 环绕肢体两圈, 在第二圈时适当勒紧(图 2-35)。

图2-35 勒紧止血法

4)绞紧止血法:在伤口的近心端处垫好衬垫,将三角巾、手帕、毛巾叠成带状,平整地绕伤肢一圈,两端向前拉紧打活结,并在一头留出一小套,以小木棒、笔杆或筷子等作为绞棒,插在带圈内,提起绞棒绞紧,再将木棒一头插入小套内,并拉紧小套固定(图2-36)。

图2-36 绞紧止血法

\r
(2) 注意事项: 具体如下。

1) 松紧适宜: 止血带是止血的应急措施, 但此法过紧会压迫损害神经或软组织, 严重者可导致伤者失去肢体; 过松则起不到止血作用, 反而增加出血; 过久(超过 5h) 会引起肌肉坏死、厌氧菌感染, 甚至危及生命。因此, 对加压包扎后不能控制的大、中动脉出血, 才可暂时使用止血带止血。

2)部位准确:止血带应扎在伤口的近心端,尽量靠近伤口。上肢外伤大出血应将止血带扎在上臂的上 1/3 处,不能扎在上臂的中下 1/3 处,因该处桡神经走行贴近肱骨,易被损伤。下肢外伤出血应将止血带扎在股骨中上部。对于毁损严重的肢体,也可以把止血带扎到靠近伤口的近心端部位,有利于最大限度地保存肢体。

3) 压力适当: 止血带的标准压力, 上肢为 250 ~ 300mmHg, 下肢为 300 ~ 500mmHg。无压力表时以刚好使出血停止、远端动脉搏动消失为宜。

4) 衬垫垫平: 止血带不能直接扎在皮肤上, 应先用棉垫、三角巾、毛巾或衣服等平整地垫好, 避免止血带勒伤皮肤。切忌将绳索或铁丝直接扎在皮肤上。

5) 控制时间: 使用止血带的时间不能超过 5h(冬天时间可适当延长), 原则上每隔 0.5 ~ 1h 放松一次, 放松时可用手压迫出血点上部血管临时止血, 每次松开 2 ~ 3min, 再在稍高的平面扎止血带, 不可在同一平面反复缚扎。

6) 标记明显: 使用止血带的伤员要在手腕或胸前衣服上做明显标记, 注明扎止血带的时间, 以便后续救护者继续处理。

考点提示: 止血带止血法的适应证、操作方法和注意事项。

三、包扎术

伤口包扎的目的是保护伤口免受污染，固定敷料、药品和骨折位置，压迫止血及减轻疼痛。原则上，包扎之前要覆盖创面，包扎松紧要适度，使肢体处于功能位，打结时注意避开伤口。常用的包扎物品有绷带、三角巾、四头带和多头带等，紧急情况下可用毛巾、衣服或被单等代替。

(一) 常用包扎法

1. 绷带包扎法

(1) 环形包扎法: 在包扎部位做环形的重叠缠绕(不少于 2 周), 再用胶布将带尾固定, 或将带尾中间剪开分成两头, 两布条先打一结, 然后避开伤区打结固定(图 2-37)。该法适用于绷带包扎开始与结束时, 固定带端及颈、腕、胸、腹等周径相近部位的小伤口。

图2-37 环形包扎法

\r
(2)蛇形包扎法:先将绷带以环形包扎法包扎2周,然后以绷带宽度为间隔,斜行上缠互不遮盖,最后再次将绷带以环形包扎法包扎2周后固定。该法适用于夹板固定,也可用于从一处迅速延伸到另一处做简单固定。

(3)螺旋形包扎法:先将绷带以环形包扎法包扎2周,然后稍微倾斜螺旋向上缠绕,后一周遮盖上一周绷带的1/3~1/2,最后再次将绷带以环形包扎法包扎2周后固定(图2-38)。该法适用于包扎周径基本相同的部位,如上臂、手指、躯干、大腿等。

图2-38 螺旋形包扎法

\r
(4)螺旋反折包扎法:先将绷带以环形包扎法包扎2周,

然后稍微倾斜螺旋向上缠绕,每周均将绷带向下反折一定角度,并遮盖其上一周绷带的 1/3～1/2 , 反折部位应相同,使之呈一条直线,最后再次将绷带以环形包扎法包扎2周后固定(图2-39)。注意不可在伤口或骨隆突处反折。该法适用于粗细大小不等的部位,如前臂、小腿等。

图2-39 螺旋反折包扎法

\r
(5)“8”字形包扎法:先屈曲关节,然后将绷带以环形包扎法在关节的远心端处包扎2周,随后将绷带从右下越过关节向左上包扎,绕过后面,再从右上(近心端)越过关节向左下包扎,使其呈“8”字形,每一周覆盖上一周绷带的1/3~1/2,最后环形包扎2周固定(图2-40)。该法适用于屈曲的关节,如肘、肩、髋、膝等部位。

图2-40 “8”字形包扎法

\r
(6) 回返包扎法: 先环形包扎数圈, 再将绷带向上反折与环形包扎垂直, 先覆盖残端中央, 再交替覆盖左右两边, 由助手固定住反折部分, 每周覆盖上一周绷带的 1/3 ~ 1/2, 最后将绷带反折部分环形包扎 2 周固定(图 2-41)。该法适用于包扎有顶端的部位, 如指端、头部或截肢残端。

图2-41 回返包扎法

\r
考点提示:绷带包扎的方法和适用对象。

2. 三角巾包扎法 三角巾制作简单,应用方便,两底角打结时应为外科结(方结),外科结会比较牢固,解开时将某一侧边和其底角拉直,即可迅速解开。三角巾的用途较多,可折叠成带状作为悬吊带或用作肢体创伤及头、眼、下颌、膝、肘、手部较小伤口的包扎;可展开或折成燕尾式,用于包扎躯干或四肢的大面积创伤;也可将两块三角巾连接成双燕尾式或蝴蝶式(两块三角巾顶角连接在一起)进行包扎(图2-42)。常见部位的三角巾包扎法有以下几种。

(1) 头面部包扎法: 具体如下。

1) 头顶部包扎法: 三角巾底边反折, 正中放于伤员前额, 顶角经头顶垂于枕后, 然后将两底角经耳上向后扎紧, 压住顶角, 在枕部交叉再经耳上绕到前额打结固定, 最后将顶角向上反折嵌入底边内(图2-43)。该法适用于头顶部外伤的包扎。

图2-42 常用三角巾包扎法

\r
图2-43 头顶部包扎法

\r
2) 风帽式包扎法: 将三角巾顶角和底边中央各打一结, 即呈风帽状。将顶角结放于额前中央, 底边结放于枕骨最高处下方包住头部, 两底角向面部拉紧, 向外反折包绕下颌, 然后拉到枕后, 打结固定 (图2-44)。常用于头枕部、耳郭等处伤口的包扎。

图2-44 风帽式包扎法

\r
3) 面部面具式包扎法: 将三角巾顶角打一结, 放于下颌, 罩于面部(可在鼻孔、眼、口处各剪一小口), 然后将左、右两角拉到枕后交叉, 再绕到下颌打结(图 2-45)。该法适用于面部烧伤或有广泛软组织损伤的包扎。

4) 眼部包扎法: ①单眼包扎法, 是将三角巾折成 4 指宽带状, 斜放于伤眼部, 下侧较长一端经枕后绕至前额压住较短一端, 再环绕头部至颞侧与翻下的另一端打结 (图 2-46A)。②双眼包扎法, 是将带状巾覆盖左侧伤眼, 下端从耳下绕枕后, 经左侧耳上至眉间上方压住上端继续绕头一圈至左耳前, 将上端反折斜向下, 盖住右眼, 再从耳下绕至右耳侧与下端打结 (图 2-46B)。

图2-45 面部面具式包扎法

\r
\r
图2-46 眼部包扎法

A. 单眼包扎法

\r
\r
B. 双眼包扎法

(2) 肩、胸、背部包扎法: 展开式三角巾胸部包扎法是将三角巾顶角越过伤侧肩部, 使三角巾底部中央位于伤侧下部, 将底边两端围绕躯干至背后, 再用顶角上的带子将顶角与底角连接在一起 (图 2-47)。三角巾背部包扎法与胸部包扎法相同, 只是位置相反, 于胸前打结。

图2-47 展开式三角巾胸部包扎法

\r
(3)腹部及臀部包扎法:具体如下。

1) 一般包扎法: 三角巾顶角朝下, 底边横放于脐部, 拉紧两底角至
腰部打结, 顶角经会阴拉至臀上方, 同底角余头打结。该法适用于腹部或一侧臀部伤口的包扎(图 2-48)。

图2-48 臀部一般包扎法

\r
2) 双侧臀部包扎法: 用两块三角巾连接成蝴蝶式包扎, 将打结部放在腰骶部, 底边的一端在腹部打结后, 另一端则由大腿后方绕向前, 与其底边打结。

(4) 四肢包扎法: 具体如下。

1) 前臂包扎法: 将三角巾底边的一端置于健侧肩部, 屈曲伤侧肘部 80∘ 左右, 将前臂放于三角巾上后, 把三角巾向上反折, 使底边另一端拉至伤侧肢体肩上, 随后拉紧两底角在背后打结, 最后将三角巾顶角折平固定(图 2-49)。

2) 手部包扎法: 将伤者手指对着三角巾顶角放于三角巾中央, 底边位于腕部, 把顶角放于手背上, 两底角在手背部交叉绕回腕部, 在掌侧或背侧打结(图 2-50)。

图2-49 上肢包扎法

\r
\r
图2-50 手部包扎法

\r
3) 小腿和足部包扎法: 将足放于三角巾一端, 足趾对向三角巾底边, 提起较长的一底角包绕小腿并与顶角打结, 再用较短的底角包绕足部, 于足踝处打结固定(图 2-51)。

图2-51 小腿和足部包扎法

\r
(二)注意事项

(1) 包扎伤口前, 应简单清创并盖上消毒纱布, 然后进行包扎。注意不要用手触摸伤口, 不要将异物取出, 不要将内脏脱出物送回体腔。应动作轻巧, 包扎稳妥, 尽可能遵守无菌原则。

(2) 包扎时松紧要适宜, 过紧会影响局部血液循环, 过松易致敷料脱落或移动。使用腹带、胸带时应注意呼吸活动度, 鼓励伤员做深呼吸及咳嗽。

(3) 包扎时要使伤员保持舒适体位, 在皮肤皱褶如腋下、乳下、腹股沟等处, 应用棉垫或纱布衬隔, 在肢体骨隆突处也应用棉垫保护。需要抬高肢体时, 应给予适当的扶托物, 包扎的肢体必须保持功能位置。包扎肢端时应将指(趾)端外露，便于观察末梢血液的循环情况。

(4)包扎方向应从左向右,从远心端向近心端,以利于静脉血液的回流。

(5)包扎结束应在肢体的外侧面打结,避免在伤口处、骨隆突处或易于受压的部位打结。

考点提示:三角巾的包扎方法和要领。

素质拓展

杏林春暖美名扬

董奉，字君异，东汉时期著名医家，与华佗、张仲景并称为“建安三神医”。据说，董奉医术高明，他在为人治病时并不收取金钱，而是要求病愈的人在他的住所附近种植杏树。轻病愈者种1株，重病愈者种5株。数年之后，这些杏树形成了一片郁郁葱葱的杏林。这片杏林不仅成了他医术的象征，也是他无私奉献精神的体现。故后世以“杏林”来喻指中医界，以“杏林春暖”来形容
医生的仁心仁术。此外，董奉还有很多善举，如曾无偿分发自家粮仓中的粮食，帮助周边村庄度过了一场严重的饥荒。他的这些行为体现了他对百姓的关爱。董奉的故事和精神一直激励着后世医家，也成为了中医药文化的重要组成部分。

四、固定

固定骨折部位可以防止骨折断端移位而损伤血管、神经，减轻伤员的痛苦，有利于对伤员的搬运。常用的固定材料有木制或金属夹板、可塑性或充气性塑料夹板，紧急时也可就地取材，如竹板、树枝、木棒等，也可直接借助伤员的健康肢体或躯干进行临时固定。

(一) 常见的固定方法

1. 锁骨骨折固定法 用毛巾或敷料垫于两腋前上方,然后将三角巾折叠成带状,两端分别绕两肩呈“8”字形,拉紧三角巾的两角在背后打结,尽量使两肩后张(图2-52);也可于背后放“T”字形夹板,然后在两肩及腰部各用绷带包扎固定。如仅一侧锁骨骨折,用三角巾将伤侧手臂悬吊在胸前,限制上肢活动即可。

图2-52 锁骨骨折固定法

\r
2. 上臂骨折固定法 用长、短两块夹板，长夹板放于上臂的后外侧，短夹板置于前内侧，然后在骨折部位上、下两端固定，最后用三角巾将上肢悬吊在肘关节屈曲 90∘ 位置（图 2-53）。

图2-53 上臂骨折固定法

\r
3. 前臂骨折固定法 协助伤员屈肘 90∘, 拇指向上, 取两块合适的夹板, 其长度超过肘关节至腕关节的长度; 然后将夹板分别置于前臂的内、外两侧, 用绷带将两端固定, 最后用三角巾将前臂悬吊于胸前, 呈功能位 (图 2-54)。

图2-54 前臂骨折固定法

A

\r
B

\r
4. 大腿骨折固定法 将两块夹板分别置于下肢内、外侧或仅在下肢外侧放一块夹板，外侧夹板应从腋下至足跟下3cm，内侧夹板应从腹股沟至足跟下3cm，关节空隙处加棉垫，然后用绷带分段将夹板固定。协助伤员平卧，踝关节保持在背屈90°位置(图2-55)。

图2-55 大腿骨折固定法

\r
5. 小腿骨折固定法 先用两块夹板分别置于下肢内、外侧，长度从足跟至大腿，接着用绷带分段将夹板固定。紧急情况下无夹板时，可借助伤员健肢，将其与伤肢分段包扎固定，注意在关节和两小腿之间的空隙处加纱布或其他软织物，以防包扎后骨折部位弯曲（图 2-56）。\r
图2-56 小腿骨折固定法

\r
6. 颈椎骨折固定法 协助伤员取仰卧位,枕后垫一软枕,头的两侧各垫一软枕进行固定,头部用绷带固定在担架上,限制头部前后或左右晃动(图 2-57);也可用颈托固定,以利于其安全转运。

图2-57 颈椎骨折固定法

\r
7. 胸、腰椎骨折固定法 协助伤员俯卧于硬质担架或木板上,伤处垫软垫,使伤员感到舒适,并预防压疮;再用绷带将伤员固定，使伤员躯体不得转动。

(二)注意事项

(1)若有伤口和出血,应先止血、包扎,再进行骨折部位的固定。如有休克,先进行抗休克处理。

(2)选择夹板的宽度和长度要与骨折的肢体相适应,其长度必须超过骨折的上、下关节。固定时,除骨折两端外,还需固定骨折两端的上、下关节。

(3) 夹板不可与皮肤直接接触, 应垫以棉花等物品, 尤其在夹板的两端。骨隆突部位应加厚衬垫, 以防止其受压。

(4) 固定应松紧适度、牢固可靠，以免影响血液循环。肢体骨折固定时须将指（趾）端露出，以便观察血液循环情况。如发现指端苍白、发冷、麻木、疼痛、水肿或青紫时，说明血液循环不良，应松开检查并重新固定。

(5)固定中避免不必要的搬动,防止骨折断端损伤血管、神经。

考点提示: 常见骨折固定的方法和注意事项。

五、搬运

搬运是院前救护的重要组成部分。及时、安全、迅速地将伤员搬运至安全地带，可减少伤员的痛苦，防止再次损伤，改善预后，使伤员获得最佳治疗时机。搬运方法有徒手搬运和器械搬运两种。搬运伤员时，要根据具体伤情选择合适的搬运方法和搬运工具。

(一)常用的搬运方法

1. 单人搬运法 适用于病情轻、路程近的伤员搬运。

(1) 扶持法: 适用于伤势较轻的伤员。救护者站在伤员一侧, 嘱伤员揽着自己的头颈, 然后救护者用外侧的手牵着伤员的手腕, 另一只手扶持伤员的腰部, 使其身体略靠向救护者, 援扶伤员行走。

(2) 抱持法: 救护者一手托伤员背部, 另一手托其大腿, 将其抱起行进。如伤员有知觉, 可嘱其抱住救护者的颈部。

(3) 背负法: 救护者站在伤员前面, 呈同一方向, 微弯背部, 将伤员背起, 胸部创伤者不宜采用此法。当伤员卧于地上, 不能站立时, 则救护者可躺在伤员一侧, 一手紧握伤员肩部, 另一手抱其腿部, 随后用力翻身, 使其顺势负于救护者背上, 然后慢慢站起背负伤员。

2. 双人搬运法

(1) 轿式搬运法: 两救护者右手紧握自己的左手手腕, 左手紧握另一救护者的右手手腕, 以形成 “口” 字形。协助伤员坐上, 并伸开双臂搂住两救护者的颈部, 即可行走(图 2-58)。此法适用于神志清醒的伤员。

图2-58 轿式搬运法

\r
(2) 椅托式搬运法: 两救护者在伤员两侧对立,
 各以一手伸入伤员大腿下方呈“十”字交叉紧握, 另一手彼此交替支持伤员背部。这种握手方法因类似于椅状而命名(图 2-59)。此法适用于神志不清、无法合作者。

图2-59 椅托式搬运法

\r
(3) 拉车式搬运法: 一救护者站在伤员头端, 两手从伤员腋下抬起, 将其头背抱在自己怀内, 另一救护者蹲在伤员两腿中间, 同时用两手夹住伤员的两腿外面向前, 然后两救护者步调一致地慢慢将伤员抬起(图 2-60)。

图2-60 拉车式搬运法

\r
3. 多人搬运法 可三人并排,其中甲救护者托持伤员颈肩部,乙救护者托住其臀部和腰部,丙救护者托住其双下肢,然后三人同时将伤员抱起后齐步前进。此法常用于疑有胸、腰椎骨折伤员的搬运(图2-61A)。六人搬运时,可面对面站立,同时将伤员抱起(图2-61B)。此法常用于救护者众多且脊柱受伤伤员的搬运。

图2-61 多人搬运法

A. 三人搬运法

\r
B. 六人搬运法

\r
4. 担架搬运法 担架因结构简单、轻便耐用,故成为最常用的搬运工具,适用于病情重和运送距离远的伤员。

(1) 担架种类: 现在常用的有四轮担架、帆布担架、铲式担架、板式担架、绳索担架和被服担架等。

(2) 搬运方法: 由 2~4 人合成一组, 将伤员移上担架, 使伤员头在后、脚在前, 以便于后面抬担架人员观察伤员的情况。抬担架人员的脚步、行动要一致; 向低处行进时(下楼), 前面的人要抬高, 后面的人要放低, 使患者保持在水平状态, 上台阶时则与之相反。

5. 特殊伤员的搬运

(1) 腹部内脏脱出者: 伤员双腿屈曲, 使腹肌放松, 以防止内脏继续脱出。脱出的内脏严禁送回腹腔, 以防止加重感染, 可用大小适当的碗扣住内脏或用腰带做成略大于脱出内脏的环, 围住脱出的脏器, 然后用三角巾包扎固定。包扎后协助伤员取仰卧位, 屈曲下肢, 并注意腹部保暖, 防止肠管过度胀气。

(2)昏迷者:使伤员侧卧或俯卧于担架上,头偏向一侧,以利于呼吸道引流。

(3)骨盆损伤者:将骨盆用三角巾或大的绷带做环行包扎。运送时,让伤员卧于门板或硬质担架上,膝微曲,并在膝下加垫(图2-62)。

图2-62 骨盆损伤者的搬运

(4)颈椎和腰椎损伤者:应严防颈部和躯干前屈或扭转,应使脊柱保持伸直,依据病情将伤员固定于担架上,防止搬运时造成再次损伤(图2-63)。

图2-63 颈椎和腰椎损伤者的搬运

\r
考点提示:搬运的方法和动作要领。

(二)注意事项

(1) 搬运过程中动作要轻巧, 协调一致, 避免颠簸, 以减少伤员的痛苦。若遇脊柱损伤者, 则应固定在硬质担架上再搬运。

(2) 搬运时, 伤员应头在后、脚在前, 便于后面抬担架人员随时观察病情变化。

(3) 抬担架人员的脚步、行动要一致, 平稳前进。上台阶、上桥时, 前面的人要放低, 后面的人要抬高, 使伤员保持水平状态, 下台阶、下桥时则与之相反。

(4) 搬运中要随时了解伤员的生命体征, 长途搬运时须防止压疮的发生。

考点提示: 紧急救护常识——应急处理“固定”、应急处理“搬运”。

孙思邈

孙思邈是唐代著名的医药学家，被后人尊称为“药王”。他医德高尚，提倡并践行以“大医精诚”之医德对待患者，不论贫富老幼、怨亲善友，都一视同仁。无论风雨寒暑、饥渴疲劳，他都求之必应，一心赴救，深得群众崇敬。

孙思邈提出的“胆欲大而心欲小，智欲圆而行欲方”是其对医者修养的高度概括。具体来说，“胆欲大”意指医者在面对疾病和治疗时需要有足够的勇气与自信，勇于挑战困难和不确定性。“心欲小”强调了医者在进行诊治时必须小心谨慎，细致入微地观察病情，做到缜密周到，如履薄冰般地审慎行事。“智欲圆”要求医者具备灵活机智的思维能力，能够从多方面审视问题，善于根据实际情况进行变通，以达到最佳的治疗效果。“行欲方”指的是医者的行为要端正不阿，坚持医疗伦理和道德规范，不贪图名利，始终以患者的健康和利益为重。总的来说，这4个方面是相互关联、相辅相成的。医者在临床实践中需将它们融会贯通，既要有勇于决断的胆识，又不失关注细节的细心；既能够机智应对各种复杂病症，又能坚守医德医风，确保行为合法合规。

目标检测

1. 对于外伤出血的急救处理,以下错误的是( )。

A. 用干净的纱布或绷带进行包扎

B. 将伤口抬高以减少出血

C. 尽量保持伤口清洁

D. 用热水冲洗伤口以止血

E. 以上均错误

2. 在止血包扎时,以下方法正确的是( )。

A. 用一根绷带从头到脚紧紧包扎

B. 在伤口处打结

C. 在伤口两侧用力拉紧绷带

D. 在伤口上方靠近心脏的位置用力拉紧绷带

E. 以上均正确

3. 使用止血带止血时, 放松止血带的间隔时间是( )。

A. 5 ~ 10min

B. 10 ~ 20min

C. 20 ~ 30min

D. 30 ~ 60min

E. 1 ~ 2h

4. 清创最好在伤后( )内进行。

A. 2 ~ 4h

B. 4 ~ 6h

C. 6 ~ 8h

D. 10 ~ 12h

E. 12 ~ 24h

5. 对于骨折患者的搬运,以下方法正确的是( )。

A. 让患者自己行走

B. 用一人抬腿、一人抬上身的方法搬运

C. 用担架搬运,且在骨折部位加垫固定

D. 用背的方式搬运患者

E. 以上均错误

6. 关于止血包扎的注意事项,以下错误的是( )。

A. 包扎时要遵循从远心端向近心端的原则

B. 包扎时要保持伤口清洁

C. 包扎时要避免过紧,以免影响血液循环

D. 包扎时可以使用橡皮筋代替绷带

E. 以上均错误

7. 关于搬运昏迷患者的方法,以下正确的是( )。

A. 让患者侧卧, 以防止呕吐物堵塞气道

B. 让患者仰卧, 头部抬高

C. 让患者俯卧, 以便排出体内毒素

D. 让患者坐起, 以便呼吸顺畅

E. 以上均正确

8. 在处理外伤出血时,以下处理方法最危险的是( )。

A. 用冰块冷敷伤口

B. 用热毛巾热敷伤口

C. 用纱布或绷带进行包扎

D. 用止血药止血

E. 以上都很安全

9. 在处理伤口时,以下方法错误的是( )。

A. 用干净的纱布或绷带进行包扎

B. 将伤口抬高以减缓出血

C. 尽量保持伤口清洁

D. 用热水冲洗伤口以止血

E. 以上均错误

(范文慧 宋克春 赵姜楠)`,rawHtml:`<p>案例导学</p>\r
<p>2024年6月25日，在某高速公路距一收费站约 500m 处因车祸致一人受伤。救护者赶到现场后检查发现，伤者神志清楚，呼吸、脉搏正常，口咽部未见明显异物及出血。主诉：心慌，左上肢疼痛难忍。其左前臂可见喷射性出血；左小腿畸形，前面见 6cm 左右创面，可见渗血，疼痛明显。伤者病情复杂，其左前臂、左小腿在现场不能排除骨折。</p>\r
<p>请思考：</p>\r
<p>1. 该伤者发生了什么情况？如何评估？</p>\r
<p>2. 作为救护者,该如何进行急救?</p>\r
<p>创伤(trauma)是常见的意外伤害,救护者首先应迅速了解伤员生命体征及机体各部位伤情。在施行有效心肺复苏的同时及时应用清创、止血、包扎、固定和搬运等技术。这些技术若能得到及时、正确、有效的应用,往往在挽救伤员生命、防止病情恶化、减少伤员痛苦及预防并发症等方面均有良好的效果。因此,清创、止血、包扎、固定、搬运等技术是每一位院前急救人员必须熟练掌握的技术,也是公众应当普及的急救常识。</p>\r
<p>一、清创术</p>\r
<p>清创术(debridement)是用外科手术的方法,清除开放伤口内的异物,切除坏死、失活或严重污染的组织、缝合伤口,使之尽量减少污染,甚至变成清洁伤口,达到一期愈合,有利受伤部位的功能和形态的恢复。开放伤口一般分为清洁、污染、感染伤口三类。清洁伤口一般系指手术切口,手术完毕时直接缝合即可;污染伤口指受伤后6~8h以内,伤口有细菌污染而尚未发展成感染,但伤口内存在细菌、失活组织物等,不利于伤口愈合;感染伤口指伤口已感染甚至化脓,包括延迟处理的开放伤口和继发感染的手术伤口,经换药处理方能愈合。一般伤口的清创宜在伤后6~8h内进行。血运丰富、污染轻、失活组织少的伤口,只要伤口的污染未发展为感染,均可行清创处理。清创术是一种外科基本手术操作。伤口初期处理的好坏，对伤口愈合、受伤部位组织功能和形态恢复的好坏起决定性作用，应予以重视。</p>\r
<p>(一)术前准备</p>\r
<p>1. 用物准备 清创缝合包、麻醉剂、无菌注射器及针头、皮肤消毒液、伤口冲洗液、刀片、缝合针、无菌手套等。</p>\r
<p>2. 患者准备</p>\r
<p>(1)防止休克,待休克好转后争取时间进行清创。</p>\r
<p>(2)有活动性大出血时,在抗休克的同时紧急行清创、止血。</
p>\r
<p>(3) 如颅脑、胸、腹部有严重损伤，应先给予紧急处理。如四肢有开放性损伤，应注意是否同时合并骨折，可进行 X 线检查协助诊断。</p>\r
<p>(4)应用止痛和术前镇痛药物。</p>\r
<p>(5)如伤口较大、污染严重,应预防性应用抗生素。在术前1h、术中、术后分别应用一定量的抗生素。注射破伤风抗毒素,轻者用1500U,重者用3000U。</p>\r
<p>(二) 操作步骤</p>\r
<p>根据伤口部位、大小等,选择适当的体位和麻醉。</p>\r
<p>1. 清洗消毒 创口局部毛发较多时,先剃去毛发,以无菌敷料盖住伤口,根据伤口周围皮肤情况,采用擦洗、刷洗、冲洗等方法清洁伤口周围皮肤。揭去伤口上的敷料,以适量无菌生理盐水和刺激性小的无色消毒液反复冲洗伤口,冲走伤口内游离的异物、血块、失活组织。对较大伤口的清创,术者须常规外科手消毒后穿无菌手术衣、戴无菌手套,创口周围皮肤常规消毒、铺巾后再进行伤口清理。</p>\r
<p>2. 清理伤口 由浅入深仔细检查伤口,创腔大创口小时需适当扩大创口后再检查,彻底去除伤口内异物及血块,切除失活组织,尚未失活但血液循环差、污染严重的不重要组织亦应适当切除,创缘皮肤不规则、不整齐且考虑缝合时,张力不大者可适当修剪使之整齐,创腔内进行可靠止血。清理伤口时随时注意用刺激小的无色消毒液冲洗创口。经以上处理,使伤口尽量类似于无菌手术伤口,对简单伤口即可逐层缝合;对复杂伤口则需做组织修复,做组织修复前应重新消毒、铺巾、更换手套和器械。</p>\r
<p>3. 组织修复 配合医生对骨、血管、肌腱、关节囊等部位进行处理，对创口内明显出血的非重要血管，在清创时均应结扎或缝扎止血。所有操作严格遵循无菌技术操作原则。</p>\r
<p>4. 伤口缝合 彻底清创、修复重要组织后，创口按组织层次做一期缝合。缝合时皮肤有较大张力者应做减张缝合，估计减张缝合仍难缝合皮肤者，则应做皮肤移植。考虑缝合后伤口内仍有渗液可能时，可留置乳胶片或乳胶管做预防性引流。估计清创后伤口仍有感染可能者，可只缝合深层组织，2～4日后无感染发生再缝合皮下组织和皮肤。</p>\r
<p>(三) 护理</p>\r
<p>(1) 清创前注意收集病史, 做好护理检查, 充分了解全身和局部的伤情。</p>\r
<p>(2) 伤情严重时主动配合医生做好患者抢救工作。</p>\r
<p>(3)全身伤情严重、局部因创伤而导致形态和功能明显受损,患者因此而焦虑、恐惧时,应做好解释、安慰工作,争取患者术中的配合。</p>\r
<p>(4) 清创时做到认真、仔细、正确、快捷，严格执行无菌操作，尽可能保证创伤局部形态和功能的完整。</p>\r
<p>(5)清创后注意适当固定和抬高患肢,并注意其血运情况。</p>\r
<p>(6)术后遵医嘱给予抗生素预防感染，并做破伤风预防的常规处理。</p>\r
<p>(7) 密切观察伤口愈合情况, 清创后的伤口仍发生感染者及时按感染伤口进行处理, 伤口引流条, 一般应根据引流物情况, 在术后 24~48h 内拔除。</p>\r
<p>考点提示: 清创术前、后护理措施。</p>\r
<p>二、止血术</p>\r
<p>血液是维持生命的重要物质,一般成人全身血量占体重的7%~8%,当失血量小于全身血量的10%(约400mL)时,可有轻度头晕、交感神经兴奋症状或无任何反应;当失血量超过全身血量的20%(800~1000mL)时,会出现休克症状,如头晕、脉搏加快、血压下降、出冷汗、肤色苍白、少尿等;当失血量达全身血量的40%时,短时间内就会危及生命。因此,在保证呼吸畅通的同时,应快速准确地进行止血。快速止血是危重患者抢救时重要的急救技术之一。</p>\r

<p>(一) 出血的判断</p>\r
<p>各种创伤一般都会伴有出血，出血一般分为内出血和外出血。内出血指血液流向体腔或间隙，需要专业设备、器械止血，一般为院内救治。外出血指血液自伤口流出，是现场急救重点。此外，救护者还应判断出血的部位、性质，以便采取正确有效的止血方法。</p>\r
<p>1. 动脉出血 血色鲜红,量多,速度快,呈喷射状,血管有搏动,与脉搏节律相同,危险性大。</p>\r
<p>2. 静脉出血 血色暗红, 流速较为缓慢, 呈持续状, 不断流出, 
危险性较动脉出血小。</p>\r
<p>3. 毛细血管出血 血色鲜红,血液从整个伤口创面渗出,一般不容易找到出血点,常可以自动凝固而止血,危险性小。如果伴有较大伤口或创面时,也可引起出血性休克,应及时止血。</p>\r
<p>(二) 止血的方法</p>\r
<p>出血部位、性质不同,应选择的止血方法也有区别,救护者应快速选择合适的止血方法,以达到最快、最有效、最安全止血的目的。</p>\r
<p>1. 指压止血法 是无须任何器械、简便、有效的止血方法。根据动脉的走向，在出血伤口的近心端，通过用手指压迫血管使血管闭合而达到临时止血的目的，然后再选择其他的止血方法止血。指压止血法适用于头、颈部和四肢的动脉出血。对不同的出血部位，采用不同的压迫点(图2-24)。</p>\r
<p>图2-24 全身主要动脉的压迫点</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-2-l.jpg" /><figcaption>​</figcaption></figure>\r
<p>(1)头、颈、面部出血指压法:头、面部主要动脉见图2-25。</p>\r
<p>图2-25 头、面部主要动脉</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-3-l.jpg" /><figcaption>​</figcaption></figure>\r
<p>1) 头顶部出血: 一侧头顶部出血, 用拇指或示指压迫同侧颞浅动脉(耳屏前方颧弓根部) 止血(图 2-26A)。</p>\r
<p>2)颜面部出血:一侧颜面部出血,用拇指或示指压迫同侧面动脉(下颌骨下缘下颌角前3cm处搏动点)止血。由于面动脉在颜面部有许多小支相互吻合,所以必须压迫双侧(图2-26B)。</p>\r
<p>3) 头后区出血: 一只手固定伤员头部, 用拇指将耳后枕动脉(耳乳突下凹陷处搏动点)压向乳突, 阻断耳后动脉血流(图 2-26C)。</p>\r
<p>4) 头颈部出血: 用拇指或四指将颈总动脉(气管与胸锁乳突肌之间相当于甲状软骨平面处的搏动点)压向颈椎横突止血, 一般用于头面部大出血, 但不可以双侧压迫止血, 以免引起脑部缺氧(图 2-26D)。</p>\r
<p>图2-26 头、颈、面部动脉血管出血的指压部位</p>\r
<p style="text-align: center;">A. 指压颞浅动脉</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-4-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">B. 指压面动脉</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-5-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">C. 指压枕动脉</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-6-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">D. 指压颈总动脉</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-7-l.jpg" /><figcaption></figcaption></figure>\r
<p>知识链接</p>\r
<p>婴幼儿鼻出血的救护</p>\r
<p>婴幼儿鼻出血通常是由于鼻腔内的血管破裂所致,以下救护措施可供参考。</p>\r
<p>1. 指压法 方便且高效，以平时常见的少量出血最为适用。具体做法：嘱患儿取坐位，用拇指和示指紧紧压住其两侧鼻翼，压向鼻中隔部，这个位置就是血管相对丰富的“黎氏区”。嘱患儿尽量配合，张开嘴巴进行呼吸，一般压迫5～10min出
血即可停止。如果有条件可以配合冷敷，效果更佳。如指压的同时或指压后为了预防再次出血，可在婴幼儿前额部用冷毛巾或冰块冷敷。</p>\r
<p>2. 压迫填塞法 如果出血量大,用指压法不能止血时,可采用压迫填塞法止血。具体做法:将脱脂棉卷成如鼻孔粗细的条状,向鼻腔充填,也可使用消毒棉球填塞出血侧鼻孔,起到降低局部血液流速、促进止血的作用。需要注意填塞不要过松,否则达不到止血的目的。</p>\r
<p>若患儿经常鼻出血,或者出血量大,应立即带患儿入院做详细检查。</p>\r
<p>(2) 上肢出血指压法: 上肢主要动脉出血的指压部位见图 2-27。</p>\r
<p>A. 指压锁骨下动脉；B. 指压腋动脉；C. 指压肱动脉；D. 指压尺动脉、桡动脉。图2-27 上肢动脉出血的指压部位</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-9-l.jpg" /><figcaption>​</figcaption></figure>\r

<p>1) 肩部、腋部出血: 拇指将锁骨下动脉(锁骨上窝中部的搏动点)压向第一肋, 其余四指放在患者颈后。</p>\r
<p>2) 上臂出血: 上肢外展 90<sup>∘</sup> , 在腋窝中点用拇指将腋动脉压向肱骨头。</p>\r
<p>3) 前臂出血: 用四指将肱动脉(肱二头肌内侧沟中部的搏动点)压向肱骨干(图 2-28)。</p>\r
<p>图2-28 指压肱动脉</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-10-l.jpg" /><figcaption>​</figcaption></figure>\r
<p>4) 手部出血: 双手拇指将尺动脉、桡动脉(手腕横纹稍上处的内、外侧搏动点) 向尺骨和桡骨方向压迫止血(图 2-29)。</p>\r
<p>图2-29 指压尺动脉、桡动脉</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-11-l.jpg" /><figcaption></figcaption></figure>\r
<p>(3)下肢出血指压法:下肢主要动脉出血压迫部位见图2-30。</p>\r
<p>A. 指压股动脉; B. 指压腘动脉; C. 指压胫前动脉、胫后动脉。图2-30 下肢动脉出血的压迫部位</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-12-l.jpg" /><figcaption>​</figcaption></figure>\r
<p>1)大腿出血:用拇指或拳头将股动脉在腹股沟中点稍向下部的强搏动点压向耻骨(图2-31)。</p>\r
<p>图2-31 指压股动脉</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-13-l.jpg" /><figcaption>​</figcaption></figure>\r
<p>2) 小腿出血: 在腘窝中部压迫腘动脉。</p>\r
<p>3) 足部出血: 压迫足背中部近脚腕处的胫前动脉和足跟内侧与内踝之间的胫后动脉(图 2-32)。</p>\r
<p>图2-32 指压胫前、胫后动脉</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-14-l.jpg" /><figcaption></figcaption></figure>\r
<p>考点提示:压迫止血法的压迫部位及操作方法。</p>\r
<p>2. 加压包扎法 是急救中最常用的止血方法之一,适用于体表和
四肢伤的小动脉、静脉及毛细血管出血。伤口处用消毒纱布或干净的手帕、毛巾、衣物等敷料覆盖,再用三角巾或绷带加压包扎。注意包扎压力适当,范围要大,同时抬高患肢以避免因静脉回流受阻而增加出血。伤口骨折处有碎骨时禁止用此法。</p>\r
<p>3. 填塞止血法 适用于广泛而深层次的软组织损伤出血,如腹股沟、腋窝、子宫等出血,用无菌敷料填入伤口内压紧,外加敷料加压包扎。此法仅用于紧急止血,在清创时有可能再次大出血,应尽快行手术止血。</p>\r
<p>4. 加垫屈曲关节止血法 多用于肘或膝关节以下出血。在无骨关节损伤时，在肘窝或腘窝处放一绷带卷，然后强屈关节，用绷带、三角巾包扎控制出血（图2-33），须立即送医院进一步治疗。此法可能压迫到神经、血管，且不便于患者搬动，不宜首选。</p>\r
<p>图2-33 加垫屈曲关节止血法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-15-l.jpg" /><figcaption></figcaption></figure>\r
<p>5. 止血带止血法 适用于四肢大出血，当其他止血法不能止血而危及患者生命时。使用止血带止血得当，止血效果较好。可选用专用止血带（如橡皮止血带、气压止血袋），在紧急情况下也可用三角巾、手帕、毛巾或布条折成带状进行止血。</p>\r
<p>(1) 常用方法: 具体如下。</p>\r
<p>1) 橡皮止血带止血法: 在肢体伤口的近心端, 用棉垫、纱布或衣服、毛巾等物作为衬垫后再缠上止血带。以左手的拇指、示指、中指持止血带的头端, 将长的尾端绕肢体一圈后压住头端, 再绕肢体一圈, 然后用左手示指、中指夹住尾端后将尾端从止血带下拉出, 使之成为一个活结。如需放松止血带, 只需将尾端拉出即可(图 2-34)。</p>\r
<p>图2-34 橡皮止血带止血法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-17-l.jpg" /><figcaption>​</figcaption></figure>\r
<p>2) 充气止血带止血法: 充气止血带根据血压计原理设计, 有压力表指示压力的大小, 压力均匀, 效果较好。将袖带绑在伤口的近心端, 充气后起到止血的作用。</p>\r
<p>3) 勒紧止血法: 先将伤口上部用绷带或带状布料或将三角巾折成带状, 环绕肢体两圈, 在第二圈时适当勒紧(图 2-35)。</p>\r
<p>图2-35 勒紧止血法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-18-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-19-l.jpg" /><figcaption></figcaption></figure>\r

<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-20-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">4)绞紧止血法:在伤口的近心端处垫好衬垫,将三角巾、手帕、毛巾叠成带状,平整地绕伤肢一圈,两端向前拉紧打活结,并在一头留出一小套,以小木棒、笔杆或筷子等作为绞棒,插在带圈内,提起绞棒绞紧,再将木棒一头插入小套内,并拉紧小套固定(图2-36)。</p>\r
<p style="text-align: center;">图2-36 绞紧止血法</p>\r
<figure class="image"><img alt="" src="bo
okpicture/ds066854/ds0668540009-21-l.jpg" /><figcaption></figcaption></figure>\r
<p>(2) 注意事项: 具体如下。</p>\r
<p>1) 松紧适宜: 止血带是止血的应急措施, 但此法过紧会压迫损害神经或软组织, 严重者可导致伤者失去肢体; 过松则起不到止血作用, 反而增加出血; 过久(超过 5h) 会引起肌肉坏死、厌氧菌感染, 甚至危及生命。因此, 对加压包扎后不能控制的大、中动脉出血, 才可暂时使用止血带止血。</p>\r
<p>2)部位准确:止血带应扎在伤口的近心端,尽量靠近伤口。上肢外伤大出血应将止血带扎在上臂的上 1/3 处,不能扎在上臂的中下 1/3 处,因该处桡神经走行贴近肱骨,易被损伤。下肢外伤出血应将止血带扎在股骨中上部。对于毁损严重的肢体,也可以把止血带扎到靠近伤口的近心端部位,有利于最大限度地保存肢体。</p>\r
<p>3) 压力适当: 止血带的标准压力, 上肢为 250 ~ 300mmHg, 下肢为 300 ~ 500mmHg。无压力表时以刚好使出血停止、远端动脉搏动消失为宜。</p>\r
<p>4) 衬垫垫平: 止血带不能直接扎在皮肤上, 应先用棉垫、三角巾、毛巾或衣服等平整地垫好, 避免止血带勒伤皮肤。切忌将绳索或铁丝直接扎在皮肤上。</p>\r
<p>5) 控制时间: 使用止血带的时间不能超过 5h(冬天时间可适当延长), 原则上每隔 0.5 ~ 1h 放松一次, 放松时可用手压迫出血点上部血管临时止血, 每次松开 2 ~ 3min, 再在稍高的平面扎止血带, 不可在同一平面反复缚扎。</p>\r
<p>6) 标记明显: 使用止血带的伤员要在手腕或胸前衣服上做明显标记, 注明扎止血带的时间, 以便后续救护者继续处理。</p>\r
<p>考点提示: 止血带止血法的适应证、操作方法和注意事项。</p>\r
<p>三、包扎术</p>\r
<p>伤口包扎的目的是保护伤口免受污染，固定敷料、药品和骨折位置，压迫止血及减轻疼痛。原则上，包扎之前要覆盖创面，包扎松紧要适度，使肢体处于功能位，打结时注意避开伤口。常用的包扎物品有绷带、三角巾、四头带和多头带等，紧急情况下可用毛巾、衣服或被单等代替。</p>\r
<p>(一) 常用包扎法</p>\r
<p>1. 绷带包扎法</p>\r
<p>(1) 环形包扎法: 在包扎部位做环形的重叠缠绕(不少于 2 周), 再用胶布将带尾固定, 或将带尾中间剪开分成两头, 两布条先打一结, 然后避开伤区打结固定(图 2-37)。该法适用于绷带包扎开始与结束时, 固定带端及颈、腕、胸、腹等周径相近部位的小伤口。</p>\r
<p style="text-align: center;">图2-37 环形包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-22-l.jpg" /><figcaption></figcaption></figure>\r
<p>(2)蛇形包扎法:先将绷带以环形包扎法包扎2周,然后以绷带宽度为间隔,斜行上缠互不遮盖,最后再次将绷带以环形包扎法包扎2周后固定。该法适用于夹板固定,也可用于从一处迅速延伸到另一处做简单固定。</p>\r
<p>(3)螺旋形包扎法:先将绷带以环形包扎法包扎2周,然后稍微倾斜螺旋向上缠绕,后一周遮盖上一周绷带的1/3~1/2,最后再次将绷带以环形包扎法包扎2周后固定(图2-38)。该法适用于包扎周径基本相同的部位,如上臂、手指、躯干、大腿等。</p>\r
<p style="text-align: center;">图2-38 螺旋形包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-23-l.jpg" /><figcaption></figcaption></figure>\r
<p>(4)螺旋反折包扎法:先将绷带以环形包扎法包扎2周,</p>\r
<p>然后稍微倾斜螺旋向上缠绕,每周均将绷带向下反折一定角度,并遮盖其上一周绷带的 1/3～1/2 , 反折部位应相同,使之呈一条直线,最后再次将绷带以环形包扎法包扎2周后固定(图2-39)。注意不可在伤口或骨隆突处反折。该法适用于粗细大小不等的部位,如前臂、小腿等。</p>\r
<p style="text-align: center;">图2-39 螺旋反折包扎法</p>\r

<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-25-l.jpg" /><figcaption></figcaption></figure>\r
<p>(5)“8”字形包扎法:先屈曲关节,然后将绷带以环形包扎法在关节的远心端处包扎2周,随后将绷带从右下越过关节向左上包扎,绕过后面,再从右上(近心端)越过关节向左下包扎,使其呈“8”字形,每一周覆盖上一周绷带的1/3~1/2,最后环形包扎2周固定(图2-40)。该法适用于屈曲的关节,如肘、肩、髋、膝等部位。</p>\r

<p style="text-align: center;">图2-40 “8”字形包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-26-l.jpg" /><figcaption></figcaption></figure>\r
<p>(6) 回返包扎法: 先环形包扎数圈, 再将绷带向上反折与环形包扎垂直, 先覆盖残端中央, 再交替覆盖左右两边, 由助手固定住反折部分, 每周覆盖上一周绷带的 1/3 ~ 1/2, 最后将绷带反折部分环形包扎 2 周固定(图 2-41)。该法适用于包扎有顶端的部位, 如指端、头部或截肢残端。</p>\r
<p style="text-align: center;">图2-41 回返包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-27-l.jpg" /><figcaption></figcaption></figure>\r
<p>考点提示:绷带包扎的方法和适用对象。</p>\r
<p>2. 三角巾包扎法 三角巾制作简单,应用方便,两底角打结时应为外科结(方结),外科结会比较牢固,解开时将某一侧边和其底角拉直,即可迅速解开。三角巾的用途较多,可折叠成带状作为悬吊带或用作肢体创伤及头、眼、下颌、膝、肘、手部较小伤口的包扎;可展开或折成燕尾式,用于包扎躯干或四肢的大面积创伤;也可将两块三角巾连接成双燕尾式或蝴蝶式(两块三角巾顶角连接在一起)进行包扎(图2-42)。常见部位的三角巾包扎法有以下几种。</p>\r
<p>(1) 头面部包扎法: 具体如下。</p>\r
<p>1) 头顶部包扎法: 三角巾底边反折, 正中放于伤员前额, 顶角经头顶垂于枕后, 然后将两底角经耳上向后扎紧, 压住顶角, 在枕部交叉再经耳上绕到前额打结固定, 最后将顶角向上反折嵌入底边内(图2-43)。该法适用于头顶部外伤的包扎。</p>\r
<p style="text-align: center;">图2-42 常用三角巾包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-28-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-43 头顶部包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-29-l.jpg" /><figcaption></figcaption></figure>\r
<p>2) 风帽式包扎法: 将三角巾顶角和底边中央各打一结, 即呈风帽状。将顶角结放于额前中央, 底边结放于枕骨最高处下方包住头部, 两底角向面部拉紧, 向外反折包绕下颌, 然后拉到枕后, 打结固定 (图2-44)。常用于头枕部、耳郭等处伤口的包扎。</p>\r
<p style="text-align: center;">图2-44 风帽式包扎法</p>\r
<figure class="image"><img 
alt="" src="bookpicture/ds066854/ds0668540009-30-l.jpg" /><figcaption></figcaption></figure>\r
<p>3) 面部面具式包扎法: 将三角巾顶角打一结, 放于下颌, 罩于面部(可在鼻孔、眼、口处各剪一小口), 然后将左、右两角拉到枕后交叉, 再绕到下颌打结(图 2-45)。该法适用于面部烧伤或有广泛软组织损伤的包扎。</p>\r
<p>4) 眼部包扎法: ①单眼包扎法, 是将三角巾折成 4 指宽带状, 斜放于伤眼部, 下侧较长一端经枕后绕至前额压住较短一端, 再环绕头部至颞侧与翻下的另一端打结 (图 2-46A)。②双眼包扎法, 是将带状巾覆盖左侧伤眼, 下端从耳下绕枕后, 经左侧耳上至眉间上方压住上端继续绕头一圈至左耳前, 将上端反折斜向下, 盖住右眼, 再从耳下绕至右耳侧与下端打结 (图 2-46B)。</p>\r
<p>图2-45 面部面具式包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-32-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-33-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-46 眼部包扎法</p>\r
<p style="text-align: center;">A. 单眼包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-34-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-35-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">B. 双眼包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-36-l.jpg" /><figcaption></figcaption></figure>\r

<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-37-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">(2) 肩、胸、背部包扎法: 展开式三角巾胸部包扎法是将三角巾顶角越过伤侧肩部, 使三角巾底部中央位于伤侧下部, 将底边两端围绕躯干至背后, 再用顶角上的带子将顶角与底角连接在一起 (图 2-47)。三角巾背部包扎法与胸部包扎法相同, 只是位置相反, 于胸前打结。</p>\r
<p style="text-align: center;">图2-47 展开式三角巾胸部包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-38-l.jpg" /><figcaption></figcaption></figure>\r
<p>(3)腹部及臀部包扎法:具体如下。</p>\r
<p>1) 一般包扎法: 三角巾顶角朝下, 底边横放于脐部, 拉紧两底角至
腰部打结, 顶角经会阴拉至臀上方, 同底角余头打结。该法适用于腹部或一侧臀部伤口的包扎(图 2-48)。</p>\r
<p style="text-align: center;">图2-48 臀部一般包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-39-l.jpg" /><figcaption></figcaption></figure>\r
<p>2) 双侧臀部包扎法: 用两块三角巾连接成蝴蝶式包扎, 将打结部放在腰骶部, 底边的一端在腹部打结后, 另一端则由大腿后方绕向前, 与其底边打结。</p>\r
<p>(4) 四肢包扎法: 具体如下。</p>\r
<p>1) 前臂包扎法: 将三角巾底边的一端置于健侧肩部, 屈曲伤侧肘部 80<sup>∘</sup> 左右, 将前臂放于三角巾上后, 把三角巾向上反折, 使底边另一端拉至伤侧肢体肩上, 随后拉紧两底角在背后打结, 最后将三角巾顶角折平固定(图 2-49)。</p>\r
<p>2) 手部包扎法: 将伤者手指对着三角巾顶角放于三角巾中央, 底边位于腕部, 把顶角放于手背上, 两底角在手背部交叉绕回腕部, 在掌侧或背侧打结(图 2-50)。</p>\r
<p>图2-49 上肢包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-40-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-41-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-50 手部包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-42-l.jpg" /><figcaption></figcaption></figure>\r
<p>3) 小腿和足部包扎法: 将足放于三角巾一端, 足趾对向三角巾底边, 提起较长的一底角包绕小腿并与顶角打结, 再用较短的底角包绕足部, 于足踝处打结固定(图 2-51)。</p>\r
<p style="text-align: center;">图2-51 小腿和足部包扎法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-43-l.jpg" /><figcaption></figcaption></figure>\r
<p>(二)注意事项</p>\r
<p>(1) 包扎伤口前, 应简单清创并盖上消毒纱布, 然后进行包扎。注意不要用手触摸伤口, 不要将异物取出, 不要将内脏脱出物送回体腔。应动作轻巧, 包扎稳妥, 尽可能遵守无菌原则。</p>\r
<p>(2) 包扎时松紧要适宜, 过紧会影响局部血液循环, 过松易致敷料脱落或移动。使用腹带、胸带时应注意呼吸活动度, 鼓励伤员做深呼吸及咳嗽。</p>\r
<p>(3) 包扎时要使伤员保持舒适体位, 在皮肤皱褶如腋下、乳下、腹股沟等处, 应用棉垫或纱布衬隔, 在肢体骨隆突处也应用棉垫保护。需要抬高肢体时, 应给予适当的扶托物, 包扎的肢体必须保持功能位置。包扎肢端时应将指(趾)端外露，便于观察末梢血液的循环情况。</p>\r
<p>(4)包扎方向应从左向右,从远心端向近心端,以利于静脉血液的回流。</p>\r
<p>(5)包扎结束应在肢体的外侧面打结,避免在伤口处、骨隆突处或易于受压的部位打结。</p>\r
<p>考点提示:三角巾的包扎方法和要领。</p>\r
<p>素质拓展</p>\r
<p>杏林春暖美名扬</p>\r
<p>董奉，字君异，东汉时期著名医家，与华佗、张仲景并称为“建安三神医”。据说，董奉医术高明，他在为人治病时并不收取金钱，而是要求病愈的人在他的住所附近种植杏树。轻病愈者种1株，重病愈者种5株。数年之后，这些杏树形成了一片郁郁葱葱的杏林。这片杏林不仅成了他医术的象征，也是他无私奉献精神的体现。故后世以“杏林”来喻指中医界，以“杏林春暖”来形容
医生的仁心仁术。此外，董奉还有很多善举，如曾无偿分发自家粮仓中的粮食，帮助周边村庄度过了一场严重的饥荒。他的这些行为体现了他对百姓的关爱。董奉的故事和精神一直激励着后世医家，也成为了中医药文化的重要组成部分。</p>\r

<p>四、固定</p>\r
<p>固定骨折部位可以防止骨折断端移位而损伤血管、神经，减轻伤员的痛苦，有利于对伤员的搬运。常用的固定材料有木制或金属夹板、可塑性或充气性塑料夹板，紧急时也可就地取材，如竹板、树枝、木棒等，也可直接借助伤员的健康肢体或躯干进行临时固定。</p>\r
<p>(一) 常见的固定方法</p>\r
<p>1. 锁骨骨折固定法 用毛巾或敷料垫于两腋前上方,然后将三角巾折叠成带状,两端分别绕两肩呈“8”字形,拉紧三角巾的两角在背后打结,尽量使两肩后张(图2-52);也可于背后放“T”字形夹板,然后在两肩及腰部各用绷带包扎固定。如仅一侧锁骨骨折,用三角巾将伤侧手臂悬吊在胸前,限制上肢活动即可。</p>\r
<p style="text-align: center;">图2-52 锁骨骨折固定法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-46-l.jpg" /><figcaption></figcaption></figure>\r
<p>2. 上臂骨折固定法 用长、短两块夹板，长夹板放于上臂的后外侧，短夹板置于前内侧，然后在骨折部位上、下两端固定，最后用三角巾将上肢悬吊在肘关节屈曲 90<sup>∘</sup> 位置（图 2-53）。</p>\r
<p>图2-53 上臂骨折固定法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-49-l.jpg" /><figcaption>​</figcaption></figure>\r
<p>3. 前臂骨折固定法 协助伤员屈肘 90<sup>∘</sup>, 拇指向上, 取两块合适的夹板, 其长度超过肘关节至腕关节的长度; 然后将夹板分别置于前臂的内、外两侧, 用绷带将两端固定, 最后用三角巾将前臂悬吊于胸前, 呈功能位 (图 2-54)。</p>\r
<p>图2-54 前臂骨折固定法</p>\r
<p>A</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-50-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">B</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-51-l.jpg" /><figcaption></figcaption></figure>\r
<p>4. 大腿骨折固定法 将两块夹板分别置于下肢内、外侧或仅在下肢外侧放一块夹板，外侧夹板应从腋下至足跟下3cm，内侧夹板应从腹股沟至足跟下3cm，关节空隙处加棉垫，然后用绷带分段将夹板固定。协助伤员平卧，踝关节保持在背屈90°位置(图2-55)。</p>\r
<p style="text-align: center;">图2-55 大腿骨折固定法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-52-l.jpg" /><figcaption></figcaption></figure>\r
<p>5. 小腿骨折固定法 先用两块夹板分别置于下肢内、外侧，长度从足跟至大腿，接着用绷带分段将夹板固定。紧急情况下无夹板时，可借助伤员健肢，将其与伤肢分段包扎固定，注意在关节和两小腿之间的空隙处加纱布或其他软织物，以防包扎后骨折部位弯曲（图 2-56）。</p
>\r
<p style="text-align: center;">图2-56 小腿骨折固定法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-53-l.jpg" /><figcaption></figcaption></figure>\r
<p>6. 颈椎骨折固定法 协助伤员取仰卧位,枕后垫一软枕,头的两侧各垫一软枕进行固定,头部用绷带固定在担架上,限制头部前后或左右晃动(图 2-57);也可用颈托固定,以利于其安全转运。</p>\r
<p style="text-align: center;">图2-57 颈椎骨折固定法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-54-l.jpg" /><figcaption></figcaption></figure>\r
<p>7. 胸、腰椎骨折固定法 协助伤员俯卧于硬质担架或木板上,伤处垫软垫,使伤员感到舒适,并预防压疮;再用绷带将伤员固定，使伤员躯体不得转动。</p>\r
<p>(二)注意事项</p>\r
<p>(1)若有伤口和出血,应先止血、包扎,再进行骨折部位的固定。如有休克,先进行抗休克处理。</p>\r
<p>(2)选择夹板的宽度和长度要与骨折的肢体相适应,其长度必须超过骨折的上、下关节。固定时,除骨折两端外,还需固定骨折两端的上、下关节。</p>\r
<p>(3) 夹板不可与皮肤直接接触, 应垫以棉花等物品, 尤其在夹板的两端。骨隆突部位应加厚衬垫, 以防止其受压。</p>\r
<p>(4) 固定应松紧适度、牢固可靠，以免影响血液循环。肢体骨折固定时须将指（趾）端露出，以便观察血液循环情况。如发现指端苍白、发冷、麻木、疼痛、水肿或青紫时，说明血液循环不良，应松开检查并重新固定。</p>\r
<p>(5)固定中避免不必要的搬动,防止骨折断端损伤血管、神经。</p>\r
<p>考点提示: 常见骨折固定的方法和注意事项。</p>\r

<p>五、搬运</p>\r
<p>搬运是院前救护的重要组成部分。及时、安全、迅速地将伤员搬运至安全地带，可减少伤员的痛苦，防止再次损伤，改善预后，使伤员获得最佳治疗时机。搬运方法有徒手搬运和器械搬运两种。搬运伤员时，要根据具体伤情选择合适的搬运方法和搬运工具。</p>\r
<p>(一)常用的搬运方法</p>\r
<p>1. 单人搬运法 适用于病情轻、路程近的伤员搬运。</p>\r
<p>(1) 扶持法: 适用于伤势较轻的伤员。救护者站在伤员一侧, 嘱伤员揽着自己的头颈, 然后救护者用外侧的手牵着伤员的手腕, 另一只手扶持伤员的腰部, 使其身体略靠向救护者, 援扶伤员行走。</p>\r
<p>(2) 抱持法: 救护者一手托伤员背部, 另一手托其大腿, 将其抱起行进。如伤员有知觉, 可嘱其抱住救护者的颈部。</p>\r
<p>(3) 背负法: 救护者站在伤员前面, 呈同一方向, 微弯背部, 将伤员背起, 胸部创伤者不宜采用此法。当伤员卧于地上, 不能站立时, 则救护者可躺在伤员一侧, 一手紧握伤员肩部, 另一手抱其腿部, 随后用力翻身, 使其顺势负于救护者背上, 然后慢慢站起背负伤员。</p>\r
<p>2. 双人搬运法</p>\r
<p>(1) 轿式搬运法: 两救护者右手紧握自己的左手手腕, 左手紧握另一救护者的右手手腕, 以形成 “口” 字形。协助伤员坐上, 并伸开双臂搂住两救护者的颈部, 即可行走(图 2-58)。此法适用于神志清醒的伤员。</p>\r
<p style="text-align: center;">图2-58 轿式搬运法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-56-l.jpg" /><figcaption></figcaption></figure>\r
<p>(2) 椅托式搬运法: 两救护者在伤员两侧对立,
 各以一手伸入伤员大腿下方呈“十”字交叉紧握, 另一手彼此交替支持伤员背部。这种握手方法因类似于椅状而命名(图 2-59)。此法适用于神志不清、无法合作者。</p>\r
<p style="text-align: center;">图2-59 椅托式搬运法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-58-l.jpg" /><figcaption></figcaption></figure>\r
<p>(3) 拉车式搬运法: 一救护者站在伤员头端, 两手从伤员腋下抬起, 将其头背抱在自己怀内, 另一救护者蹲在伤员两腿中间, 同时用两手夹住伤员的两腿外面向前, 然后两救护者步调一致地慢慢将伤员抬起(图 2-60)。</p>\r
<p style="text-align: center;">图2-60 拉车式搬运法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-59-l.jpg" /><figcaption></figcaption></figure>\r
<p>3. 多人搬运法 可三人并排,其中甲救护者托持伤员颈肩部,乙救护者托住其臀部和腰部,丙救护者托住其双下肢,然后三人同时将伤员抱起后齐步前进。此法常用于疑有胸、腰椎骨折伤员的搬运(图2-61A)。六人搬运时,可面对面站立,同时将伤员抱起(图2-61B)。此法常用于救护者众多且脊柱受伤伤员的搬运。</p>\r
<p>图2-61 多人搬运法</p>\r
<p style="text-align: center;">A. 三人搬运法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-60-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">B. 六人搬运法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-61-l.jpg" /><figcaption></figcaption></figure>\r
<p>4. 担架搬运法 担架因结构简单、轻便耐用,故成为最常用的搬运工具,适用于病情重和运送距离远的伤员。</p>\r
<p>(1) 担架种类: 现在常用的有四轮担架、帆布担架、铲式担架、板式担架、绳索担架和被服担架等。</p>\r
<p>(2) 搬运方法: 由 2~4 人合成一组, 将伤员移上担架, 使伤员头在后、脚在前, 以便于后面抬担架人员观察伤员的情况。抬担架人员的脚步、行动要一致; 向低处行进时(下楼), 前面的人要抬高, 后面的人要放低, 使患者保持在水平状态, 上台阶时则与之相反。</p>\r
<p>5. 特殊伤员的搬运</p>\r
<p>(1) 腹部内脏脱出者: 伤员双腿屈曲, 使腹肌放松, 以防止内脏继续脱出。脱出的内脏严禁送回腹腔, 以防止加重感染, 可用大小适当的碗扣住内脏或用腰带做成略大于脱出内脏的环, 围住脱出的脏器, 然后用三角巾包扎固定。包扎后协助伤员取仰卧位, 屈曲下肢, 并注意腹部保暖, 防止肠管过度胀气。</p>\r
<p>(2)昏迷者:使伤员侧卧或俯卧于担架上,头偏向一侧,以利于呼吸道引流。</p>\r
<p>(3)骨盆损伤者:将骨盆用三角巾或大的绷带做环行包扎。运送时,让伤员卧于门板或硬质担架上,膝微曲,并在膝下加垫(图2-62)。</p>\r
<p style="text-align: center;">图2-62 骨盆损伤者的搬运</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-63-l.jpg" /><figcaption></figcaption></figure>\r

<p>(4)颈椎和腰椎损伤者:应严防颈部和躯干前屈或扭转,应使脊柱保持伸直,依据病情将伤员固定于担架上,防止搬运时造成再次损伤(图2-63)。</p>\r
<p style="text-align: center;">图2-63 颈椎和腰椎损伤者的搬运</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540009-64-l.jpg" /><figcaption></figcaption></figure>\r
<p>考点提示:搬运的方法和动作要领。</p>\r
<p>(二)注意事项</p>\r
<p>(1) 搬运过程中动作要轻巧, 协调一致, 避免颠簸, 以减少伤员的痛苦。若遇脊柱损伤者, 则应固定在硬质担架上再搬运。</p>\r
<p>(2) 搬运时, 伤员应头在后、脚在前, 便于后面抬担架人员随时观察病情变化。</p>\r
<p>(3) 抬担架人员的脚步、行动要一致, 平稳前进。上台阶、上桥时, 前面的人要放低, 后面的人要抬高, 使伤员保持水平状态, 下台阶、下桥时则与之相反。</p>\r
<p>(4) 搬运中要随时了解伤员的生命体征, 长途搬运时须防止压疮的发生。</p>\r
<p>考点提示: 紧急救护常识——应急处理“固定”、应急处理“搬运”。</p>\r
<p>孙思邈</p>\r
<p>孙思邈是唐代著名的医药学家，被后人尊称为“药王”。他医德高尚，提倡并践行以“大医精诚”之医德对待患者，不论贫富老幼、怨亲善友，都一视同仁。无论风雨寒暑、饥渴疲劳，他都求之必应，一心赴救，深得群众崇敬。</p>\r
<p>孙思邈提出的“胆欲大而心欲小，智欲圆而行欲方”是其对医者修养的高度概括。具体来说，“胆欲大”意指医者在面对疾病和治疗时需要有足够的勇气与自信，勇于挑战困难和不确定性。“心欲小”强调了医者在进行诊治时必须小心谨慎，细致入微地观察病情，做到缜密周到，如履薄冰般地审慎行事。“智欲圆”要求医者具备灵活机智的思维能力，能够从多方面审视问题，善于根据实际情况进行变通，以达到最佳的治疗效果。“行欲方”指的是医者的行为要端正不阿，坚持医疗伦理和道德规范，不贪图名利，始终以患者的健康和利益为重。总的来说，这4个方面是相互关联、相辅相成的。医者在临床实践中需将它们融会贯通，既要有勇于决断的胆识，又不失关注细节的细心；既能够机智应对各种复杂病症，又能坚守医德医风，确保行为合法合规。</p>\r
<p>目标检测</p>\r
<p>1. 对于外伤出血的急救处理,以下错误的是( )。</p>\r
<p>A. 用干净的纱布或绷带进行包扎</p>\r
<p>B. 将伤口抬高以减少出血</p>\r
<p>C. 尽量保持伤口清洁</p>\r
<p>D. 用热水冲洗伤口以止血</p>\r
<p>E. 以上均错误</p>\r
<p>2. 在止血包扎时,以下方法正确的是( )。</p>\r
<p>A. 用一根绷带从头到脚紧紧包扎</p>\r
<p>B. 在伤口处打结</p>\r
<p>C. 在伤口两侧用力拉紧绷带</p>\r
<p>D. 在伤口上方靠近心脏的位置用力拉紧绷带</p>\r
<p>E. 以上均正确</p>\r
<p>3. 使用止血带止血时, 放松止血带的间隔时间是( )。</p>\r
<p>A. 5 ~ 10min</p>\r
<p>B. 10 ~ 20min</p>\r
<p>C. 20 ~ 30min</p>\r
<p>D. 30 ~ 60min</p>\r
<p>E. 1 ~ 2h</p>\r
<p>4. 清创最好在伤后( )内进行。</p>\r
<p>A. 2 ~ 4h</p>\r
<p>B. 4 ~ 6h</p>\r
<p>C. 6 ~ 8h</p>\r
<p>D. 10 ~ 12h</p>\r
<p>E. 12 ~ 24h</p>\r
<p>5. 对于骨折患者的搬运,以下方法正确的是( )。</p>\r
<p>A. 让患者自己行走</p>\r
<p>B. 用一人抬腿、一人抬上身的方法搬运</p>\r
<p>C. 用担架搬运,且在骨折部位加垫固定</p>\r
<p>D. 用背的方式搬运患者</p>\r
<p>E. 以上均错误</p>\r
<p>6. 关于止血包扎的注意事项,以下错误的是( )。</p>\r
<p>A. 包扎时要遵循从远心端向近心端的原则</p>\r
<p>B. 包扎时要保持伤口清洁</p>\r

<p>C. 包扎时要避免过紧,以免影响血液循环</p>\r
<p>D. 包扎时可以使用橡皮筋代替绷带</p>\r
<p>E. 以上均错误</p>\r
<p>7. 关于搬运昏迷患者的方法,以下正确的是( )。</p>\r
<p>A. 让患者侧卧, 以防止呕吐物堵塞气道</p>\r
<p>B. 让患者仰卧, 头部抬高</p>\r
<p>C. 让患者俯卧, 以便排出体内毒素</p>\r
<p>D. 让患者坐起, 以便呼吸顺畅</p>\r
<p>E. 以上均正确</p>\r
<p>8. 在处理外伤出血时,以下处理方法最危险的是( )。</p>\r
<p>A. 用冰块冷敷伤口</p>\r
<p>B. 用热毛巾热敷伤口</p>\r
<p>C. 用纱布或绷带进行包扎</p>\r
<p>D. 用止血药止血</p>\r
<p>E. 以上都很安全</p>\r
<p>9. 在处理伤口时,以下方法错误的是( )。</p>\r
<p>A. 用干净的纱布或绷带进行包扎</p>\r
<p>B. 将伤口抬高以减缓出血</p>\r
<p>C. 尽量保持伤口清洁</p>\r
<p>D. 用热水冲洗伤口以止血</p>\r
<p>E. 以上均错误</p>\r
<p>(范文慧 宋克春 赵姜楠)</p>\r
`},{id:"module3-task4",title:"第四节 呼吸支持技术",order:4,rawContent:`案例导学

王某，女，56岁，某日早上晕倒在路边，路人发现后拨打了“120”急救电话。约10min后，救护车到达现场，救护者初步评估：患者意识丧失，张口呼吸且费力，呼吸忽快忽慢、极不规律。体格检查：双瞳孔扩大，对光迟钝，颈动脉搏动、心音均消失。心电图显示QRS波群消失，代之以大小不等、形态各异的颤动波，频率为230次/分。当班医护人员立即准备简易呼吸器、除颤仪等，准备为王某实施心肺复苏术。

请思考：

1. 该患者处于什么状态？

2. 什么是简易呼吸器？应如何使用？

呼吸支持技术是指一系列改善、维持、替代自主呼吸作用的技术手段的总称，主要包括氧疗、气道维护、机械通气和体外生命支持等技术。本节主要介绍简易呼吸器的使用和呼吸机的应用。

一、简易呼吸器的使用

简易呼吸器又称人工呼吸气囊、加压给氧气囊，是进行人工通气的常用工具之一。简易呼吸器可使气体有节律地进入和排出肺脏，供给足够的氧气，排出二氧化碳，维持正常的肺通气功能，是一种简单、有效的紧急供氧、呼吸复苏的装置。

素质拓展

简易呼吸器之父 Henning Ruben 医生: 科技创新融入医学

1964年，美国医学协会(American Medical Association)宣布，Ruben医生发明的自充气球囊是麻醉学界过去25年来最重要的发明。哥本哈根大学麻醉学教授Henning Ruben被称为简易呼吸器之父。这项简单的发明离不开Ruben医生的奇思妙想，当他看到修理师在维修自行车时，请其将自行车的轮辐拆下来，凭借自己的好奇组装成了历史上第一个呼吸球囊。这个球囊能够在按压松开后自动恢复原状。Ruben医生将这个球囊和自己之前发明的无再吸入呼吸阀相互结合，实现手动给患者通气。1953年，Ruben医生又结识了Ambu公司的创始人Holger Hesse。后来，在医生与工程师的共同努力下使得简易呼吸器被广泛用于院前急救和转运患者的过程中，Ambu公司也几乎成了呼吸球囊的代名词——Ambubag。

(一)简易呼吸器的结构、工作原理及分类

1. 简易呼吸器的结构 简易呼吸器主要由球囊(球形气囊)、单向阀(鸭嘴阀)、呼气阀、安全阀、储气阀、储氧袋(储气袋)、氧气连接管等部件组成(图2-64)，常用于连接通气面罩，被称为“球囊面罩”，紧急时刻也可连接人工气道。部分简易呼吸器还配有毒气过滤器、开口器、口咽通气道等。其中，氧气储气阀、储氧袋需要与外接氧气管路组合，如未接氧气时应将两项组件取下。开口器适用于出现口腔紧闭、口咽通气道不能进入口腔内的情况时使用。

图2-64 简易呼吸器的结构\r
\r
2. 简易呼吸器的工作原理

(1) 吸气流程: 挤压气囊时, 气囊产生正压, 鸭嘴阀 F 开放, 进气阀 E 关闭, 此时鸭嘴阀向下移动堵住呼气阀 G, 气体可顺利进入呼吸道(图 2-65)。

(2) 呼气流程: 松开气囊时, 气囊内产生负压, 此时鸭嘴阀 F 关闭, 同时上移, 呼气阀打开, 气体呼出, 进气阀 E 开放, 气体进入气囊(图 2-66)。

3. 简易呼吸器的分类 简易呼吸器分两类,一种是不可拆卸简易呼吸器,仅供单一患者使用,不能拆卸清洗;另一种是可拆卸简易呼吸器,可拆卸清洗。医院常用的多为可拆卸简易呼吸器。

(二)适应证和禁忌证

使用简易呼吸器可增加或辅助患者进行通气、改善患者气体交换功能，从而纠正其低氧血症，缓解组织缺氧状态，为临床抢救争取时间。

图2-65 简易呼吸器吸气示意图

\r
图2-66 简易呼吸器呼气示意图

\r
1. 适应证

(1)用于现场心肺复苏或急需人工呼吸急救时。

(2)用于途中转运或临时替代呼吸机的人工通气,如窒息、呼吸困难或需要提高供氧量时。

2. 相对禁忌证 简易呼吸器没有绝对的禁忌证,但发现患者肺部有活动性出血、大量胸腔积液、颌面部有外伤或严重骨折等则不宜使用简易呼吸器。

(三)简易呼吸器的使用方法

1. 操作准备

(1) 物品准备: 选择大小合适的面罩, 并检查其性能是否良好, 球囊、面罩、储氧袋等连接正确, 安全阀处于开启状态, 能有效送氧。如果是充气面罩, 面罩压力应适中, 如有氧气条件连接氧气(氧流量为 10 ~ 15L/min), 使储氧袋处于充满氧气状态。

(2) 患者准备: 松解衣领, 去枕后仰, 保持气道开放。清除口腔内义齿与异物, 必要时插入口咽通气管, 防止舌咬伤和舌后坠。使用面罩连接方式通气时, 操作者应位于患者头顶侧, 使头后仰, 并紧托下颌使其朝上畅通气道。如果患者已经建立人工气道, 实施球囊与人工气道的连接操作时可以站在患者的两侧。

2. 操作步骤

(1) 固定面罩: 单人操作时, 操作者位于患者头顶一侧, 将面罩扣在患者口鼻处, 用一手拇指和示指呈“C”形按压面罩, 中指和环指放在下颌骨下缘, 小指在下颌角后面, 呈“E”形保持气道开放。两组手指用力将面罩紧密置于患者面部, 称“E-C 手法”或“C-E 手法”(图 2-67)。双人操作时则由一人双手使用“E-C 手法”固定面罩, 即双手拇指和示指呈“C”形按压面罩, 中指、环指和小指呈“E”形紧托下颌骨下缘并使其朝上开放气道(图 2-68)。

图2-67 单手使用简易呼吸器

\r
图2-68 单手和双手“E-C手法”

\r
(2) 挤压球囊: 单人操作时, 另一手规律、均匀地挤压球囊送气; 双人操作时, 由另一人挤压球囊, 通气量以见到胸廓起伏即可, 成人气体量为 400 ~ 600mL。在复苏过程中若患者无脉搏且无高级气道的建立, 按照 30:2 的比例进行按压与通气; 若有脉搏、无呼吸, 按照 10 ~ 12 次/分的频率送气; 若患者有微弱的自主呼吸, 则在吸气时挤压气囊, 与患者呼吸同步。如果患者建立了高级气道, 急救人员不再需要胸外心脏按压与人工通气交替实施, 人工通气频率为 10 次/分, 按压频率为 100 ~ 120 次/分。

(3) 观察: 操作时应注意患者是否有如下情形, 以确认患者处于正常的换气。①注视患者胸部的上升与下降(是否随着压缩球体而起伏); ②经面罩透明部分观察患者嘴唇与面部颜色的变化; ③观察单向阀的运用是否适当; ④在呼气中, 观察面罩内是否呈雾气状; ⑤血氧饱和度的改变。

考点提示:简易呼吸器的使用方法。

3. 使用后处理

(1) 清洗: 首先将简易呼吸器上的可移动部分(如阀门)拆下来, 按照说明书推荐的方法进行清洗。如果没有特定的指导, 可以使用温水和中性肥皂或洗衣液轻轻清洗, 然后用清水冲洗干净。避免使用过热的水或强酸碱清洗剂, 以免损坏呼吸器气囊。

(2) 消毒: 根据呼吸器类型和制造商的建议, 选择适当的消毒方法。①酒精消毒: 将呼吸器浸泡在 70% 以上的医用酒精中, 或使用酒精喷雾器对呼吸器进行喷洒, 确保所有表面都被彻底湿润, 然后让其风干或根据制造商的指导进行处理。②含氯消毒剂消毒: 使用 5% 次氯酸钠溶液, 将呼吸器浸泡在溶液中约 30min, 用清水彻底冲洗, 最后让其风干。注意, 消毒前应先清洗呼吸器以去除污垢和残留物; 储氧袋禁止用消毒液浸泡, 以防损坏。不同类型的呼吸器可能需要不同的处理方法, 应根据具体情况选择。

二、呼吸机的使用

随着危重症医学的发展,呼吸机已成为临床上常用的急救与生命支持设备。呼吸机作为一种辅助呼吸治疗手段,可维持呼吸道通畅、改善通气、纠正缺氧和防止一氧化碳在体内蓄积,为抢救患者生命提供了有力的支持,被广泛应用于重症监护、急救复苏麻醉过程、手术等。熟练掌握呼吸机的应用技术,对充分发挥呼吸机的临床治疗效能及提高危重病抢救的成功率具有重要的临床意义。

(一)呼吸机的基本知识

1. 呼吸机的主要结构 呼吸机一般由三部分组成, 即气源部分、主机部分和管道系统(图 2-69)。

(1) 气源部分: 气体来源有 2 种。①纯氧: 可来自中心供氧或氧气罐装氧。②压缩空气: 呼吸机的工作压力通常为 (3.5±0.7) kg/cm 2 。

(2) 主机部分: 由气路与电路构成。①气路: 包括进气端、出气端。②电路: 主要是控制部分和电源线 1~3 根, 其中控制部分包括监测、记录及打印等装置。

(3) 管道系统: ① 主管道, 包括进气管道和出气管道。② 信号管道, 包括进、出气管压力传感装置。③ 附件, 包括加温器与温度指示计、加热湿化器、雾化器及连接雾化管道、集水杯、管道支撑架、管道固定夹、模拟肺、连接可屈伸接头或人工鼻等装置。

图2-69 呼吸机的主要结构

\r
使用呼吸机时需提前安装连接好电源、气源、加热湿化器及管道系统,具体见呼吸机连接示意图(图2-70)。

图2-70 呼吸机连接示意图

\r
2. 呼吸机的工作原理 在正常生理状态下,机体的气体交换是通过吸气和呼气的节律性交替进行的。吸气时，肋间肌收缩，膈肌下移，胸廓容积增大，产生胸膜腔负压，使肺膨胀，形成肺泡内负压，外界气体在压力差的作用下进入肺泡内，进行气体交换；呼气时，肺和胸廓的弹性回缩力将肺内交换后的气体排出。这种通气方式是主动进行的，被称为负压通气。呼吸机是借助机械力量产生或增强患者的呼吸动作和呼吸功能。吸气时，呼吸机能够将空气、氧气或空气－氧气混合气体正压送入患者的气管、支气管和肺内，产生或辅助肺间歇性地膨胀；呼气时，可以利用肺和胸廓的弹性回缩，使肺或肺泡自动萎陷，排出气体，进行呼气，也可在呼吸机的帮助下排出气体，进行呼气。呼吸机正是在人工装置的辅助和控制下，使肺间歇性地膨胀和回缩，以维持和改善肺泡的通气与换气，减轻或纠正缺氧与二氧化碳潴留，起到维持呼吸功能的作用。

3. 呼吸机的分类 现代呼吸机按驱动方式分为气动呼吸机和电动呼吸机；按应用对象分为成人呼吸机、小儿呼吸机和成人、小儿兼用呼吸机；按呼吸机复杂程度分为简易呼吸器、多功能呼吸机、麻醉用呼吸机和电脑控制智能呼吸机；按通气频率高低分为常频呼吸机、高频喷射呼吸机和高频振荡呼吸机；按吸气向呼气方向转化的方式分为定压型呼吸机、定容型呼吸机、定时型呼吸机和混合型呼吸机(表2-3)。

表 2-3 按吸气向呼气方向转化方式的呼吸机分类及特点

\r
现代呼吸机已由单纯的气动型、电动型发展为气动电控制型，切换方式也由定压型、定容型、定时型发展成为多功能型，可以根据病情调节空气的容量、压力、时间和氧浓度，附有加温、加湿和雾化给药部件。其性能完善，功能齐全，根据临床的需要、患者的具体呼吸状况或调试者的要求来设置、自动切换和调节，应用时安全方便。

(二)呼吸机与机械通气

机械通气(mechanical ventilation, MV)是指使用呼吸机辅助或替代危重患者的呼吸,使患者恢复有效通气并改善氧合的技术。吸气时,呼吸机将空气、氧气或空气-氧气混合气体压入气管、支气管和肺内,产生或辅助肺间歇性膨胀;呼气时,则利用肺和胸廓的弹性回缩,使肺或肺泡自动萎缩,排出气体,进行呼气。正压机械通气技术是目前临床使用的呼吸支持技术,包括有创正压通气和无创正压通气。

1. 有创正压通气(invasive positive-pressure ventilation, IPPV) 通常是经气管插管、喉罩、气管切开导管等连接机械通气进行正压通气。这种通气方式主要用于改善患者的氧合功能和通气状况，继而缓解患者呼吸耗能，有助于支持呼吸和循环系统。

2. 无创正压通气(noninvasive positive - pressure ventilation, NIPPV 或 NPPV) 是无创机械通气机连接口鼻面罩、鼻罩、口含管等进行无创正压通气。与有创正压通气不同，无创正压通气不需建立人工气道，避免了人工气道的不良反应和并发症，故也不具备人工气道的一些作用，如良好的气管引流、气管密封性等。

知识链接

呼吸机的历史演变

16 世纪, Andreas Vesalius 第一次提出了一种可以被认为是人工通气的方法: 他在动物的气管里插入一个气管, 通过气管向动物的肺里鼓风, 借此来维持动物的生命。

1864 年,美国人 Alfred Jones 发明了世界上第一台呼吸机。这是一种“负压呼吸机”,是让患者坐进一个密闭的箱子里,头部裸露在外面,然后在患者身体的周围制造高低气压,来填补本该由膈肌引起的呼吸运动。

1928 年, Drinker 和 Shaw 发明了“铁肺”, 成功抢救了罹患脊髓灰质炎的 8 岁小女孩, 开创了“机械通气”历史上的里程碑, 使负压呼吸机真正流行了起来。

1934 年, Frenkner 研制出了第一台气动限压呼吸机“Spiropulsator”, 它的气源来自钢筒, 气体经两只减压阀产生 50cm 水柱的压力。呼气时通过平衡器取得足够的气流, 吸气时间由开关控制, 气流经吸入管入肺, 当内压力升至预计要求时, 阀门关闭, 呼吸停止。

1940 年, Frenkner 和 Crafoord 合作, 在“Spiropulsator”的基础上进行了改进, 使之能与环丙烷同时使用, 成为第一台麻醉呼吸机。

1964 年, Emerson 改良的术后呼吸机是一台电动控制呼吸机。呼吸时间能随意调节, 是一台电子线路的呼吸机, 配备压缩空气泵, 各种功能均由电子调节, 使呼吸机从简单机械运动的时代跨入了精密的电子时代。

20世纪80年代以来，计算机技术的迅猛发展使新一代多功能电脑型呼吸机具备了以往不可能实现的功能，如监测、报警、记录等。进入20世纪90年代，呼吸机不断向智能化发展，计算机技术的应用使呼吸机的性能更加完善。

(三)呼吸机的功能和使用目的

1. 呼吸机的功能

(1) 主要产生呼吸机驱动力, 调节吸气时间及吸入气量, 完成吸气向呼气的转化; 调节呼气时间、气流和压力, 完成呼气向吸气的转化。

(2) 调节吸入气体中的氧浓度( FiO2 ), 对吸入气体进行加湿、加温; 安装减压阀, 防止气压过大导致气压伤。

2. 呼吸机的使用目的是纠正各种原因引起的缺氧和(或)二氧化碳潴留。

(1) 维持代谢所需的肺泡通气: 是治疗的基本目的, 应用气管插管或气管切开保持呼吸道通畅, 加上正压通气以维持足够的潮气量, 保证患者代谢所需的肺泡通气。

(2) 纠正低氧血症和改善氧运输: 呼吸机的应用可改善换气功能, 特别是呼气末正压等呼吸参数的应用, 可使肺内气体分布均匀, 纠正通气血流比例失调, 减少肺内分流, 从而提高氧分压。

(3)降低呼吸肌做功:呼吸机可不依赖神经、肌肉而产生呼吸动作,用呼吸机代替呼吸肌做功,可减少呼吸肌的负荷,降低其耗氧量,有利于呼吸肌疲劳的恢复,从而有利于改善缺氧,同时减轻心脏的负荷。

(四)适应证和禁忌证

1. 适应证 任何原因引起的缺氧和(或)二氧化碳潴留均是使用呼吸机进行机械通气的适应证。IPPV 适用于严重的呼吸困难、危及生命的低氧血症、辅助肌参与呼吸并出现胸腹矛盾呼吸、有意识障碍或严重心血管并发症等。患者(成年)呼吸具备下列特征之一,即可选择机械通气治疗:①呼吸频率>30 次/分或 <8 次/分, 呼吸节律异常, 自主呼吸微弱或消失; ②潮气量低于正常的 1/3; ③肺泡生理无效腔量/潮气量 >60%; ④肺活量 <15mL/kg; ⑤最大吸气压 <25cmH₂O; ⑥氧分压 <60mmHg (面罩吸入纯氧时); ⑦二氧化碳分压 >55mmHg (急性呼吸衰竭时)。

NPPV 目前尚无统一的临床应用指征,根据文献可用于多种疾病引起的呼吸衰竭(如 COPD 呼吸衰竭)、重症哮喘、神经肌肉疾病、中枢性低通气、阻塞性呼吸睡眠暂停综合征、辅助有创通气脱机等。应用 NPPV 时,患者须有较好的意识状态、血流动力学稳定,具有咳痰能力、自主呼吸能力和良好的配合 NPPV 的能力。

2. 禁忌证 呼吸机的使用无绝对的禁忌证,只是在某些特殊情况下需先进行必要的处理再行呼吸机治疗,可视为相对禁忌证,常见于以下情况。

(1)已发生气压伤,如气胸、血气胸、纵隔气肿。因正压通气治疗可导致张力性气胸而危及生命,故应先进行胸腔闭式引流,再行机械通气。

(2)肺大疱或多次发生自发性气胸,正压通气可诱发严重的气压伤,一般不宜应用。但如果患者伴有严重的缺氧和二氧化碳潴留而其他方法不能纠正时,应慎用。

(3)大量咯血、重症结核等出现播散时,应慎重应用。有支气管胸膜瘘时可用高频通气。

(4) 存在严重低血容量或休克时, 原则上应先给予纠正后才可应用, 但若病情危急, 也可同时进行。

(5)急性心肌梗死时因增加心脏负荷而不宜使用呼吸机,但当并发急性肺水肿、患者严重缺氧时,应用正压通气并加用呼气末正压通气可使肺内渗出减少,通气/血流比值改善,从而提高氧合,改善心肌缺血情况。

(五) 机械通气模式

机械通气模式通常分为定容型通气模式和定压型通气模式两大类。定容型通气模式的优点是确保每次呼吸均可达到预设潮气量，缺点是对气道阻力增加的患者往往会造成明显的气体分布不均，使用此类通气模式注意观察气道压，避免气压伤。定压型通气模式的优点是提供可控制的压力，尤其是气道峰压和呼吸道平均压，以利于肺组织的扩张，改善通气和氧合，但是当呼吸系统顺应性改变时，会引起不可预见的潮气量波动。

呼吸机的通气模式有数十种,以下主要介绍呼吸机基本的和常用的通气模式。

1. 控制通气(control mechanical ventilation, CMV 或 CV) 该模式支持力度大, 在患者无自主呼吸时, CMV 是最基本、最常用的通气方式。

(1)容积控制通气模式(volume control ventilation, VCV): VCV 的潮气量和呼吸频率完全由呼吸机产生。呼吸机送气达预定潮气量后停止送气, 依靠肺的弹性回缩力被动呼气。VCV 的优点是能保证潮气量的恒定, 缺点是当肺顺应性较差或气道阻力增加时, 会导致压力创伤。

(2) 压力控制通气(pressure control ventilation, PCV): 呼吸机以预设气道吸气相压力来管理通气，即呼吸机送气达预设压力时，吸气便会中止并开始呼气。PCV 的优点是气道压力不会超过预设水平，所以不会导致压力创伤，缺点是容易造成通气不足，适用于术后肺顺应性差、急性呼吸窘迫综合征（ARDS）等情况。该模式气道压低，没有峰压，出现气压伤少；其吸气流速依据肺顺应性和气道阻力的大小而改变，有利于不易充盈的肺泡充气，改善通气/血流比值，有助于气体交换；还可与多种通气模式联合应用。

2. 辅助通气(assist mechanical ventilation, AMV 或 AV) 是指患者存在自主呼吸的状态下, 吸气负压或吸气气流可触发呼吸机做功, 从而引发呼吸机同步送气进行辅助呼吸, 多用于自主呼吸规则但较弱的患者。患者的呼吸受自主呼吸和呼吸机设置参数的双重影响。AV 可保持呼吸机与患者的自主呼吸同步, 有利于撤离呼吸机。缺点: ①当患者吸气强弱不等时, 传感器的灵敏度调节困难, 易发生过度通气或通气不足。②由于同步装置的限制,呼吸机要比患者开始吸气时间滞后20ms。因此,患者的呼吸频率越快,AV的通气效果越差。

3. 辅助/控制通气(assist-control ventilation, A/C) 是辅助通气和控制通气两种模式的结合, 是目前最常用的通气模式之一。当患者自主呼吸频率低于预置频率或患者努力吸气不能触发呼吸机送气时, 呼吸机即以预置的潮气量及通气频率进行正压通气, 即 CV 模式; 当患者的吸气能触发呼吸机时, 以高于预置频率进行通气, 即 AV 模式。

4. 同步间歇强制通气 (synchronized intermittent mandatory ventilation, SIMV) 是间歇指令通气 (intermittent mandatory ventilation, IMV) 的改良方式。IMV 是自发呼吸和控制呼吸的结合, 即在自发呼吸的基础上给患者有规律的间歇指令通气, 将气体强制送入肺内, 保证每分通气量。由于 IMV 与自主呼吸不同步时可出现人机对抗, 故 IMV 已不常用。

SIMV的特点是能与患者的触发同步，减少患者与呼吸机的对抗。患者可以在SIMV触发窗或自主呼吸触发窗内进行触发并启动通气。SIMV的供气由患者的自主吸气触发，可以根据自主呼吸的潮气量及呼吸频率调节合适的呼吸机支持水平；如患者在呼吸机默认的触发窗内无自主呼吸或自主呼吸较弱不能触发，呼吸机自动提供一次
指令通气。SIMV的优点是既保证了其与患者自主呼吸同步，又不干扰患者的自主呼吸，有利于呼吸肌群的锻炼(图2-71)。此模式已成为术后短期呼吸支持首选的呼吸模式，也是撤离呼吸机最常用的方式之一。

\r
图2-71 IMV与SIMV压力示意图对比

5. 压力支持通气(pressure support ventilation, PSV) 属于部分通气支持模式, 即在自主呼吸的前提下, 呼吸机给予一定的压力辅助(图 2-72)。在自主呼吸的前提下, 其可提高患者每分通气量、潮气量, 呼吸频率、吸气与呼气时间由患者自己调节, 符合呼吸生理, 是目前最常用的通气模式之一。每次吸气都接受一定水平的压力支持, 以辅助和增强患者的吸气能力, 增加患者的吸气幅度和吸入气量。PSV 能较好地与患者吸气流速需求相配合(较好的人机协调), 减少呼吸做功, 有利于呼吸肌疲劳的恢复, 利于呼吸机的撤离。其适用于自主呼吸能力不足, 但神经调节明显异常的患者, 当设定水平适当时, 很少发生人机对抗。PSV 可与多种通气模式合并使用。部分呼吸机使用其他名称, 如 Assisted spontaneous breath(ASB)。

6. 持续气道正压通气(continuous positive airway pressure, CPAP) 是指患者在有自主呼吸的状态下, 整个呼吸周期内(吸气及呼气期间)均由呼吸机以一定的正压持续供给气流, 且供给的气流大于吸入的气流, 故患者感到吸气省力, 呼吸做功减少。CPAP 属于自主通气模式, 主要用于脱机前的过渡阶段或需借助此通气模式观察患者自主呼吸的情况, 如吸气相压力、潮气量、每分通气量等, 可用于无创通气, 也可与多种通气模式合用。

7. 双水平气道正压通气(bilevel positive airway pressure, BPAP) 为一种定压呼吸模式, 是指给予两种不同水平的气道正压, 在高压力水平( Phigh ) 和低压力水平( Plow ) 之间定时切换(图 2-73), 且高压力时间、低压力时间、高压力水平、低压力水平可各自可调, 从 Phigh 转换至 Plow 时, 增加呼出气量, 改善肺泡通气, 因而是一种更灵活、应用更广泛的通气模式。该模式在两个压力水平上均允许患者有自主呼吸存在, 可与 PSV 合用以减少患者呼吸功。BPAP 的主要特点是通气时气道压力周期性地在高压力水平和低压力水平之间转换,每个压力水平、压力时间均可独立调节,可转化为反比 BPAP 或气道压力释放通气;呼气相压力可为肺泡的开放提供有效压力,确保萎陷肺泡的开放,改善氧合状态和换气功能,增加肺的顺应性,减少呼吸功;患者的自主呼吸较少受干扰,当高压力时间持续较长时,增加平均气道压,明显改善氧合;可由控制通气向自主呼吸过渡,不用变更通气模式直至呼吸机撤离。同时由于呼吸机提供一个持续的气流,允许患者在呼吸周期的任何阶段都可以进行自主呼吸,可避免人机对抗。在目前临床使用的各种通气方式中,BPAP 对气道损伤较小,并可模拟出多种通气模式,临床应用范围广泛。

\r
\r
图2-72 PSV通气模式

\r
\r
图2-73 CPAP、PCV与BPAP压力示意图对比

\r
（六）呼吸机常见参数设置

机械通气参数的设置非常复杂,患者情况不同,所谓的“正常值”也不同。要正确灵活地使用呼吸机,一定要从原理上理解不同参数的定义,并结合呼吸波形进行综合分析。以下介绍呼吸机常见的参数(图2-74)。

图2-74 呼吸机的界面及主要参数

\r
1. 潮气量(VT) 指平静呼吸时每次吸入或呼出量,在机械通气时,指患者通过呼吸机每次吸入或呼出的气量。潮气量设置是机械通气时首先考虑的问题。成人潮气量一般为 5～15,mL/kg , 集合呼吸系统顺应性和阻力调节, 注意气道平台压不超过 30～35,cmH2O , 最终还应根据血气分析指标进行相应调整。

2. 通气频率(f) 指每分钟内机械通气的次数。通气频率反映呼吸周期的长短。成人机械通气频率一般设置为 12 ~ 20 次/分。急、慢性限制性肺疾病时也可根据每分通气量和目标动脉血氧分压水平设置为超过 20 次/分。

3. 每分通气量(MV) 与潮气量、机械通气频率成正比, 机械通气频率与潮气量成反比。在直接设定每分通气量的呼吸机, 对潮气量的改变是通过改变每分通气量或机械通气频率而实现的。在直接设定潮气量的呼吸机, 对每分通气量的改变是通过改变潮气量或机械通气频率而实现的。每分通气量(MV) = 潮气量(VT) × 机械通气频率(f)。一般按照 10 ~ 12mL/kg 调节, 准确设置还需依据血气分析指标对潮气量、机械通气频率进行相应调整。

4. 吸气时间与呼气时间比(I:E) 简称吸/呼或吸呼比, 指吸气、呼气时间各占呼吸周期的比例, 是重要的机械通气参数。吸/呼的设置应考虑患者自主呼吸水平、氧合状态及血流动力学, 适当的设置可保持良好的人机同步。有些呼吸机没有吸气停顿时间(又称吸气平台时间), 因在吸气停顿时间内呼气尚未开始, 吸气气体停留在患者体内, 故吸气停顿时间仍是吸气时间的一部分, 吸气停顿时间通常占呼吸周期的 10% 。呼吸周期 =60(s)÷ 呼吸频率(次/分), 每个呼吸周期 。吸/呼可以通过调节吸气流速或吸气时间获得。通常设置吸气时间为 0.8～1.2s, 或吸/呼为 1:(1.5～2.0), 特殊情况下可设置为 4:1～2:1, 称之为反比呼吸, 是一种特殊机械通气技术。\r
5. 触发灵敏度 在使用辅助通气模式时,依靠患者自主吸气的初始动作使吸气管路中产生负压,被呼吸机中特定的传感器感知而同步协调的气动呼吸机行机械通气,这种感知域称为触发灵敏度。通常有两种触发,即压力触发和流量触发。成人呼吸机的压力触发常为 -2～-0.5,cmH2O , 流量触发常为 1～5,L/min 。触发灵敏度只用于辅助通气和自主呼吸。当触发灵敏度过高时,会导致通气过度;当触发灵敏度过低时,会增加吸气负荷,消耗额外呼吸功。

6. 吸氧浓度( FiO2 ) 现代呼吸机均配有空气-氧混合器,保持吸氧浓度设置范围在21%~100%,以保证临床应用安全。 FiO2 的设置一般取决于 PaO2 目标水平、呼气末正压(PEEP)水平、平均气道压及患者血流动力学状态。机械通气初始阶段可给予高 FiO2 (100%)以迅速纠正缺氧,以后再依据 PaO2 目标水平、 SaO2 水平（>90%）、PEEP 水平、平均气道压及患者血流动力学状态，酌情降低 FiO2 至 50% 以下。

7. 气道压力(pressure, P 或 airway pressure, Paw) 气道压力的高低由胸肺顺应性、气道阻力、潮气量和吸气流速等决定。气道压力包括气道平均压( Pmean )、气道峰压( Ppeak )、气道平台压( Pplat )、PEEP 等。PEEP 指在呼气终末借助于装在呼气端的限制气流活瓣等装置，使气道压力高于大气压。气道本身病变使呼气末气道压力高于大气压称内源性呼气末气道正压( PEEPi )。PEEP 的作用是使萎陷的肺泡复张、增加气道平均压、改善氧合，PEEP 适用于肺顺应性减退、功能残气量减少和肺毛细血管膜通透性增加的疾患，如肺水肿及 ARDS 等。

吸气相压力越高,则越易产生气压伤,对循环功能影响越大。容量切换型呼吸机应设置一个最高压力,当压力超过此范围,安全阀开放。压力切换型呼吸机应设置一个适当吸气压来决定潮气量。在保证正常肺泡通气及血气的情况下,尽量使用最小吸气压及最短吸气时间。吸气末压又称屏气压,屏气压是为了改善气体分布而改善通气/血液比值,但过长的屏气会加重心脏负担,一般不应超过呼吸周期的20%。

考点提示:呼吸机的常见模式及参数含义。

(七)呼吸机报警原因的识别及处理

呼吸机故障包括机器自身功能性故障和机器以外原因造成的非功能性故障,若出现功能性故障,机器不能继续使用,应由专业技术人员检查维修(表2-4)。

表 2-4 呼吸机报警原因及处理办法

\r
\r
考点提示:呼吸机报警原因的分析及处理。

(八)呼吸机使用期间的护理

1. 严密观察、密切监测 确保所有呼吸机的报警处于打开状态，以保证患者安全；密切观察患者生命体征变化，监测患者意识状态、吞咽、咳嗽反射、瞳孔的变化以判断参数设定是否合理；观察湿化液的温度及湿化罐内的水位线；定期监测动脉血气，根据血气分析结果调整呼吸机参数。

2. 加强气道管理 做好患者气道及口、鼻、咽腔的护理, 及时清除呼吸道分泌物, 保持气道通畅。机械通气时应实施气道湿化, 促进气道分泌物的稀释以利于气道分泌物的排出。及时清除环路内的积水, 并使集水阀处于管路的最低点, 防止积液回流至呼吸机或患者气道。密切观察插管位置及管腔通畅程度。对气管切开患者, 观察套管是否固定完好, 松紧是否合适, 气管切开处的纱布垫是否干燥、清洁, 切口有无感染等。

3. 熟悉常见的报警 如压力报警(高压力/低压力)、容量报警(高容量/低容量)、窒息报警、氧浓度报警、湿化报警、气源和电源报警的原因与处理方法。

4. 识别和处理常见并发症

(1)呼吸机相关性肺炎(ventilation associated pneumonia, VAP): 是使用呼吸机过程中最常见的并发症, 临床表现与肺炎相同, 如呼吸道分泌物增多、发热、外周血白细胞计数升高等, 胸片和分泌物病原学检查是诊断 VAP 的主要依据。导致 VAP 发生的诱发因素: ①接受呼吸机治疗的时间是导致 VAP 最重要的诱发因素, 时间越长, 发生率越高, 3~7 天是最佳时间窗, 故尽可能缩短呼吸机治疗时间; ②患者本身因素, 如咳嗽和排痰能力差、存在胃肠反流及误吸、机体抵抗力下降和大量应用广谱抗生素及激素均是 VAP 发生的诱发因素; ③医源性因素, 如医护人员的手和各种医疗器械、物品的清洗、消毒不严格引起感染, 人工气道的护理不当等。为预防 VAP, 尽量避免上述诱发因素或将其降至最低限度, 并注意重要环节的控制, 如加强气道护理、保持呼吸道通畅、适当借助药物提高机体免疫能力、避免长时间应用广谱抗生素等。如果病情允许, 尽早脱机, 缩短呼吸机使用时间。

(2) 导管或套管堵塞、滑脱: 导管或套管滑脱易发生在气管切开的患者。通常有两种形式, 一是导管或套管完全从气管内滑出, 多见于气管插管位置过浅、导管或套管固定不良, 随体位变动或烦躁、挣扎等; 二是气管切开位置太低或患者过于肥胖、颈部较短时, 套管很容易在体位变动时滑出。导管堵塞可因气管分泌物干涸结痂、导管套囊脱落所致。因此, 要加强患者气道及口、鼻、咽腔的护理, 及时清除呼吸道分泌物, 保持气道通畅。

(3)气压伤:导致气压伤的原因主要为张力性气胸和皮下、纵隔气肿,其中张力性气胸相对严重,如不紧急处理,可能危及患者生命。若为气胸所致,需及时建立胸腔闭式引流;若为气管切后的气囊漏气和皮肤切口缝合过紧,则需更换气囊管,避免气体由气道内外逸;若为气管切开口过低所致,一般没有更好的处理方法,需等气体自行吸收和消散,或避免气体继续进入纵隔组织内;若为气管黏膜压迫、坏死所致的穿孔,应更换较长一点的导管或套管,使管腔的尖端超出穿孔处。

(4)肺不张:导致肺不张的常见原因如下。①通气量严重不足;②气管插管过深,插入一侧支气管,导致另外一侧肺无通气发生萎陷;③气道分泌物潴留,咳嗽反射减弱或消失;④肺部原有感染或继发感染;⑤吸入纯氧时间过长,导致吸收性肺不张;⑥并发气胸,致使患侧肺出现压迫性肺不张。患者的体征和胸部X线检查是诊断肺不张的主要依据,尤其是治疗前后胸部X线检查的比较。一旦明确有肺不张,应立即采取处理措施,如及时行气管切开,保证充分的气道湿化和吸引;借助纤维支气管镜对肺不张的部位进行充分吸引;借助物理作用,如背部叩击等,促进分泌物的排出。倘若导管位置不正确,应及时调整,直至两肺的呼吸音相等。

(5) 人机对抗: 指患者呼吸肌用力和呼吸机送气方式的不协调, 即患者呼吸与呼吸机不同步。导致人机对抗的原因: ①机械通气早期, 患者不适应; ②呼吸机参数调节不当, 通气量不足; ③痰液潴留堵塞气道或管道漏气; ④患者咳嗽、疼痛或体位不当; ⑤气管插管滑入右主支气管、气胸、支气管痉挛及病情恶化等。针对不同情况, 应对因处理。

(6)过度通气或通气不足:具体如下。

1)过度通气:指由二氧化碳排出过多而引起的呼吸性碱中毒,多与患者本身因素和呼吸机参数设置不当有关。前者包括缺氧、疼痛、精神紧张、代谢性酸中毒等刺激或代偿,引起呼吸频率加快和过度通气;后者多与VT或MV设置过高有关。依据血气分析,无论何种原因,只要 PaCO2<30～35mmHg ,均意味着存在不同程度的过度通气,应分析或找出原因并去除。

2) 通气不足: 指二氧化碳排出不足, 引起二氧化碳潴留, 多与气道不通畅有关。引起气道不通畅的原因很多, 如分泌物过多、黏稠、排出不畅等。气道湿化不够或吸引不充分, 导致导管、套管完全或不完全性堵塞, 也是引起通气不足的主要原因。处理时, 首先应分析或找出原因并去除; 其次应调节呼吸机参数, 主要以调整 I:E、延长呼气时间为主; 最后, 必要时需借助病因和缓解痉挛治疗, 以保持呼吸道通畅。\r
考点提示:应用呼吸机的常见并发症。

(九)呼吸机的清洁消毒

1. 做好日常消毒工作 通常是每日清洁呼吸机表面一次。不提倡常规频繁更换呼吸机管道，一旦污染则应及时更换。呼吸机主机空气过滤网需每日清洗，以防灰尘堆积，影响机器内部散热。

2. 做好终末消毒处理 患者停用呼吸机后的消毒,需要将呼吸机所有管路系统小心拆下,彻底消毒后,再按原结构重新安装、调试,以备下次应用。

3. 清洁消毒的程序

(1) 拆卸: 拆卸呼吸机管道前, 应认真阅读呼吸机说明书, 了解其结构, 按照说明书要求拆卸, 严禁违规操作,避免损坏部件及管道。

(2) 清洁: 具体如下。

1) 管路清洁: 仔细检查管道内有无痰痂、血渍、污垢及其他残留, 若不冲洗干净则难以达到彻底消毒的目的。

2) 传感器清洗: 传感器如流量、压力等为呼吸机的特殊电子零件, 不能用水冲洗, 也不能用消毒液浸泡, 只能用 75% 酒精棉球小心轻擦干净, 有的传感器只能轻轻浸放在清水中, 即刻取出, 自然晾干, 切忌用力甩干或烘干。

3) 空气过滤网清洁: 空气过滤网包括空气压缩泵和有些呼吸机主机中的可清洗空气过滤网。具体清洁方法: 将空气过滤网从机器中取出, 用清水洗净表面污垢后, 再用力甩干或烘干; 或者用吸尘器吸尽灰尘, 每 48 ~ 72h 清洁一次。

4) 内部主机清洁: 呼吸机内部不可拆卸电子组件, 其表面的灰尘可用小功率吸尘器轻轻吸除, 不能用消毒液浸泡, 需由工程师定期保养。

5) 机器面板外壳清洁: 呼吸机的主机外壳和压缩泵的外壳用清洁柔软的湿抹布擦净即可, 每日2次或隔日1次, 必要时用消毒液如含氧制剂消毒液浸泡过的软抹布擦洗。湿化器电器加热部分和温控传感器探头金属部分用清洁柔软湿布轻轻擦净, 不能用消毒剂浸泡。

(3) 消毒方法: 凡连接患者与呼吸机之间的螺纹管、连接管接头、湿化器、雾化器和呼气瓣等, 均应彻底消毒。管路常用的消毒方法有药物浸泡消毒法、高压蒸汽消毒法、气体熏蒸消毒法等。

1) 药物浸泡消毒法: 为最常用的方法, 简单方便。消毒时注意严格掌握消毒液浓度及消毒时间; 消毒部件要完全浸泡在消毒液中, 不能有残留气体; 消毒液容器应为密闭容器, 以免消毒液挥发。消毒完毕后, 须用蒸馏水冲洗干净。常用的消毒液有 0.5% 过氧乙酸、2% 巴氏消毒液、2% 戊二醛碱溶液等。

2) 高压蒸汽消毒法: 呼吸机需消毒部件的金属部分和耐高温部件, 可根据具体情况送供应室进行高压蒸汽消毒。

3) 气体熏蒸消毒法: 应用环氧乙烷可杀死真菌、孢子及较大病毒, 是最有效的气体消毒法。将消毒用品密封包装好, 放入特制环氧乙烷熏箱内消毒, 消毒有效期为 1 年。消毒后不能立即使用, 需经 1 周时间, 待环氧乙烷挥发后才能使用。

4) 特殊感染物品处理: 特殊感染患者用物应该按照医用垃圾特殊处理。也可使用 2% 戊二醛中性溶液浸泡 10min 杀死细菌、真菌、病毒和结核分枝杆菌, 杀死孢子需 10h, 再用蒸馏水冲洗晾干, 最后进行熏蒸消毒。

目标检测

1. 简易呼吸器的( )，又称鸭嘴阀。

A. 单向阀 B. 呼气阀 C. 安全阀

D. 储气阀 E. 进气阀

2. 简易呼吸器不可用于( )。

A. 现场心肺复苏或急需人工呼吸急救的患者

B. 窒息患者

C. 呼吸困难者

D.途中转运需要提高供氧量的患者E.颌面部骨折患者

3. 下图中患者预选择的通气模式是( )。

\r
A. 压力支持通气 B. 控制通气 C. 持续气道正压通气 D. 同步间隙指令通气 E. 呼气末正压通气

4. 呼吸机气道高压报警常见的原因不包括( )。

A. 呼吸道分泌物增加或分泌物阻塞人工气道

B. 气管插管或气管切开导管移位

C. 呼吸机管路不畅, 如管路打折、积水过多

D. 患者呼吸过快

E. 叹息通气时

5. 下列表示呼气末正压的是( )。

A. Pmean B. Ppeak C. Pplat

D. PEEP E. VAP

6. 患者在有自主呼吸的状态下, 整个呼吸周期内(吸气及呼气期间)均由呼吸机以一定的正压持续供给气流, 是指 ( ) 模式。

A. PSV B. SIMV C. CPAP

D. BPAP E. CMV

7.平静呼吸时每次吸入或呼出气量是指( )。

A. f B. VT C. MV

D. I: E E. FiO2

8.是诊断 VAP 的主要依据。

A. 呼吸道分泌物增多

B. 发热

C. 外周血白细胞计数升高

D. 安全阀使用时间

E. 胸片和分泌物病原学检查

9. 导致人机对抗的原因不包括( )。

A. 机械通气早期, 患者不适应

B. 呼吸机参数调节不当, 通气量不足

C. 痰液潴留堵塞气道或管道漏气

D. 患者咳嗽、疼痛或体位不当

E. 使用呼吸机时间过久

（许天亮 赵美楠 秦抗洪）`,rawHtml:`<p>案例导学</p>\r
<p>王某，女，56岁，某日早上晕倒在路边，路人发现后拨打了“120”急救电话。约10min后，救护车到达现场，救护者初步评估：患者意识丧失，张口呼吸且费力，呼吸忽快忽慢、极不规律。体格检查：双瞳孔扩大，对光迟钝，颈动脉搏动、心音均消失。心电图显示QRS波群消失，代之以大小不等、形态各异的颤动波，频率为230次/分。当班医护人员立即准备简易呼吸器、除颤仪等，准备为王某实施心肺复苏术。</p>\r
<p>请思考：</p>\r
<p>1. 该患者处于什么状态？</p>\r
<p>2. 什么是简易呼吸器？应如何使用？</p>\r
<p>呼吸支持技术是指一系列改善、维持、替代自主呼吸作用的技术手段的总称，主要包括氧疗、气道维护、机械通气和体外生命支持等技术。本节主要介绍简易呼吸器的使用和呼吸机的应用。</p>\r
<p>一、简易呼吸器的使用</p>\r
<p>简易呼吸器又称人工呼吸气囊、加压给氧气囊，是进行人工通气的常用工具之一。简易呼吸器可使气体有节律地进入和排出肺脏，供给足够的氧气，排出二氧化碳，维持正常的肺通气功能，是一种简单、有效的紧急供氧、呼吸复苏的装置。</p>\r
<p>素质拓展</p>\r
<p>简易呼吸器之父 Henning Ruben 医生: 科技创新融入医学</p>\r
<p>1964年，美国医学协会(American Medical Association)宣布，Ruben医生发明的自充气球囊是麻醉学界过去25年来最重要的发明。哥本哈根大学麻醉学教授Henning Ruben被称为简易呼吸器之父。这项简单的发明离不开Ruben医生的奇思妙想，当他看到修理师在维修自行车时，请其将自行车的轮辐拆下来，凭借自己的好奇组装成了历史上第一个呼吸球囊。这个球囊能够在按压松开后自动恢复原状。Ruben医生将这个球囊和自己之前发明的无再吸入呼吸阀相互结合，实现手动给患者通气。1953年，Ruben医生又结识了Ambu公司的创始人Holger Hesse。后来，在医生与工程师的共同努力下使得简易呼吸器被广泛用于院前急救和转运患者的过程中，Ambu公司也几乎成了呼吸球囊的代名词——Ambubag。</p>\r
<p>(一)简易呼吸器的结构、工作原理及分类</p>\r
<p>1. 简易呼吸器的结构 简易呼吸器主要由球囊(球形气囊)、单向阀(鸭嘴阀)、呼气阀、安全阀、储气阀、储氧袋(储气袋)、氧气连接管等部件组成(图2-64)，常用于连接通气面罩，被称为“球囊面罩”，紧急时刻也可连接人工气道。部分简易呼吸器还配有毒气过滤器、开口器、口咽通气道等。其中，氧气储气阀、储氧袋需要与外接氧气管路组合，如未接氧气时应将两项组件取下。开口器适用于出现口腔紧闭、口咽通气道不能进入口腔内的情况时使用。</p>\r
<p style="text-align: center;">图2-64 简易呼吸器的结构</
p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-4-l.jpg" /><figcaption></figcaption></figure>\r
<p>2. 简易呼吸器的工作原理</p>\r
<p>(1) 吸气流程: 挤压气囊时, 气囊产生正压, 鸭嘴阀 F 开放, 进气阀 E 关闭, 此时鸭嘴阀向下移动堵住呼气阀 G, 气体可顺利进入呼吸道(图 2-65)。</p>\r
<p>(2) 呼气流程: 松开气囊时, 气囊内产生负压, 此时鸭嘴阀 F 关闭, 同时上移, 呼气阀打开, 气体呼出, 进气阀 E 开放, 气体进入气囊(图 2-66)。</p>\r
<p>3. 简易呼吸器的分类 简易呼吸器分两类,一种是不可拆卸简易呼吸器,仅供单一患者使用,不能拆卸清洗;另一种是可拆卸简易呼吸器,可拆卸清洗。医院常用的多为可拆卸简易呼吸器。</p>\r
<p>(二)适应证和禁忌证</p>\r
<p>使用简易呼吸器可增加或辅助患者进行通气、改善患者气体交换功能，从而纠正其低氧血症，缓解组织缺氧状态，为临床抢救争取时间。</p>\r
<p style="text-align: center;">图2-65 简易呼吸器吸气示意图</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-5-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-66 简易呼吸器呼气示意图</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-6-l.jpg" /><figcaption></figcaption></figure>\r
<p>1. 适应证</p>\r
<p>(1)用于现场心肺复苏或急需人工呼吸急救时。</p>\r
<p>(2)用于途中转运或临时替代呼吸机的人工通气,如窒息、呼吸困难或需要提高供氧量时。</p>\r
<p>2. 相对禁忌证 简易呼吸器没有绝对的禁忌证,但发现患者肺部有活动性出血、大量胸腔积液、颌面部有外伤或严重骨折等则不宜使用简易呼吸器。</p>\r
<p>(三)简易呼吸器的使用方法</p>\r
<p>1. 操作准备</p>\r
<p>(1) 物品准备: 选择大小合适的面罩, 并检查其性能是否良好, 球囊、面罩、储氧袋等连接正确, 安全阀处于开启状态, 能有效送氧。如果是充气面罩, 面罩压力应适中, 如有氧气条件连接氧气(氧流量为 10 ~ 15L/min), 使储氧袋处于充满氧气状态。</p>\r
<p>(2) 患者准备: 松解衣领, 去枕后仰, 保持气道开放。清除口腔内义齿与异物, 必要时插入口咽通气管, 防止舌咬伤和舌后坠。使用面罩连接方式通气时, 操作者应位于患者头顶侧, 使头后仰, 并紧托下颌使其朝上畅通气道。如果患者已经建立人工气道, 实施球囊与人工气道的连接操作时可以站在患者的两侧。</p>\r

<p>2. 操作步骤</p>\r
<p>(1) 固定面罩: 单人操作时, 操作者位于患者头顶一侧, 将面罩扣在患者口鼻处, 用一手拇指和示指呈“C”形按压面罩, 中指和环指放在下颌骨下缘, 小指在下颌角后面, 呈“E”形保持气道开放。两组手指用力将面罩紧密置于患者面部, 称“E-C 手法”或“C-E 手法”(图 2-67)。双人操作时则由一人双手使用“E-C 手法”固定面罩, 即双手拇指和示指呈“C”形按压面罩, 中指、环指和小指呈“E”形紧托下颌骨下缘并使其朝上开放气道(图 2-68)。</p>\r
<p style="text-align: center;">图2-67 单手使用简易呼吸器</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds06
68540010-7-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-68 单手和双手“E-C手法”</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-8-l.jpg" /><figcaption></figcaption></figure>\r
<p>(2) 挤压球囊: 单人操作时, 另一手规律、均匀地挤压球囊送气; 双人操作时, 由另一人挤压球囊, 通气量以见到胸廓起伏即可, 成人气体量为 400 ~ 600mL。在复苏过程中若患者无脉搏且无高级气道的建立, 按照 30:2 的比例进行按压与通气; 若有脉搏、无呼吸, 按照 10 ~ 12 次/分的频率送气; 若患者有微弱的自主呼吸, 则在吸气时挤压气囊, 与患者呼吸同步。如果患者建立了高级气道, 急救人员不再需要胸外心脏按压与人工通气交替实施, 人工通气频率为 10 次/分, 按压频率为 100 ~ 120 次/分。</p>\r
<p>(3) 观察: 操作时应注意患者是否有如下情形, 以确认患者处于正常的换气。①注视患者胸部的上升与下降(是否随着压缩球体而起伏); ②经面罩透明部分观察患者嘴唇与面部颜色的变化; ③观察单向阀的运用是否适当; ④在呼气中, 观察面罩内是否呈雾气状; ⑤血氧饱和度的改变。</p>\r
<p>考点提示:简易呼吸器的使用方法。</p>\r
<p>3. 使用后处理</p>\r
<p>(1) 清洗: 首先将简易呼吸器上的可移动部分(如阀门)拆下来, 按照说明书推荐的方法进行清洗。如果没有特定的指导, 可以使用温水和中性肥皂或洗衣液轻轻清洗, 然后用清水冲洗干净。避免使用过热的水或强酸碱清洗剂, 以免损坏呼吸器气囊。</p>\r
<p>(2) 消毒: 根据呼吸器类型和制造商的建议, 选择适当的消毒方法。①酒精消毒: 将呼吸器浸泡在 70% 以上的医用酒精中, 或使用酒精喷雾器对呼吸器进行喷洒, 确保所有表面都被彻底湿润, 然后让其风干或根据制造商的指导进行处理。②含氯消毒剂消毒: 使用 5% 次氯酸钠溶液, 将呼吸器浸泡在溶液中约 30min, 用清水彻底冲洗, 最后让其风干。注意, 消毒前应先清洗呼吸器以去除污垢和残留物; 储氧袋禁止用消毒液浸泡, 以防损坏。不同类型的呼吸器可能需要不同的处理方法, 应根据具体情况选择。</p>\r
<p>二、呼吸机的使用</p>\r
<p>随着危重症医学的发展,呼吸机已成为临床上常用的急救与生命支持设备。呼吸机作为一种辅助呼吸治疗手段,可维持呼吸道通畅、改善通气、纠正缺氧和防止一氧化碳在体内蓄积,为抢救患者生命提供了有力的支持,被广泛应用于重症监护、急救复苏麻醉过程、手术等。熟练掌握呼吸机的应用技术,对充分发挥呼吸机的临床治疗效能及提高危重病抢救的成功率具有重要的临床意义。</p>\r
<p>(一)呼吸机的基本知识</p>\r
<p>1. 呼吸机的主要结构 呼吸机一般由三部分组成, 即气源部分、主机部分和管道系统(图 2-69)。</p>\r
<p>(1) 气源部分: 气体来源有 2 种。①纯氧: 可来自中心供氧或氧气罐装氧。②压缩空气: 呼吸机的工作压力通常为 (3.5±0.7) kg/cm <sup>2</sup> 。</p>\r
<p>(2) 主机部分: 由气路与电路构成。①气路: 包括进气端、出气端。②电路: 主要是控制部分和电源线 1~3 根, 其中控制部分包括监测、记录及打印等装置。</p>\r
<p>(3) 管道系统: ① 主管道, 包括进气管道和出气管道。② 信号管道, 包括进、出气管压力传感装置。③ 附件, 包括加温器与温度指示计、加热湿化器、雾化器及连接雾化管道、集水杯、管道支撑架、管道固定夹、模拟肺、连接可屈伸接头或人工鼻等装置。</p>\r
<p style="text-align: center;">图2-69 呼吸机的主要结构</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-10-l.jpg" /><figcaption></figcaption></figure>\r
<p>使用呼吸机时需提前安装连接好电源、气源、加热湿化器及管道系统,具体见呼吸机连接示意图(图2-70)。</p>\r
<p style="text-align: center;">图2-70 呼吸机连接示意图</p>
\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-11-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">2. 呼吸机的工作原理 在正常生理状态下,机体的气体交换是通过吸气和呼气的节律性交替进行的。吸气时，肋间肌收缩，膈肌下移，胸廓容积增大，产生胸膜腔负压，使肺膨胀，形成肺泡内负压，外界气体在压力差的作用下进入肺泡内，进行气体交换；呼气时，肺和胸廓的弹性回缩力将肺内交换后的气体排出。这种通气方式是主动进行的，被称为负压通气。呼吸机是借助机械力量产生或增强患者的呼吸动作和呼吸功能。吸气时，呼吸机能够将空气、氧气或空气－氧气混合气体正压送入患者的气管、支气管和肺内，产生或辅助肺间歇性地膨胀；呼气时，可以利用肺和胸廓的弹性回缩，使肺或肺泡自动萎陷，排出气体，进行呼气，也可在呼吸机的帮助下排出气体，进行呼气。呼吸机正是在人工装置的辅助和控制下，使肺间歇性地膨胀和回缩，以维持和改善肺泡的通气与换气，减轻或纠正缺氧与二氧化碳潴留，起到维持呼吸功能的作用。</p>\r

<p style="text-align: center;">3. 呼吸机的分类 现代呼吸机按驱动方式分为气动呼吸机和电动呼吸机；按应用对象分为成人呼吸机、小儿呼吸机和成人、小儿兼用呼吸机；按呼吸机复杂程度分为简易呼吸器、多功能呼吸机、麻醉用呼吸机和电脑控制智能呼吸机；按通气频率高低分为常频呼吸机、高频喷射呼吸机和高频振荡呼吸机；按吸气向呼气方向转化的方式分为定压型呼吸机、定容型呼吸机、定时型呼吸机和混合型呼吸机(表2-3)。</p>\r
<p style="text-align: center;">表 2-3 按吸气向呼气方向转化方式的呼吸机分类及特点</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-28-l.jpg" /><figcaption>标题</figcaption></figure>\r
<p>现代呼吸机已由单纯的气动型、电动型发展为气动电控制型，切换方式也由定压型、定容型、定时型发展成为多功能型，可以根据病情调节空气的容量、压力、时间和氧浓度，附有加温、加湿和雾化给药部件。其性能完善，功能齐全，根据临床的需要、患者的具体呼吸状况或调试者的要求来设置、自动切换和调节，应用时安全方便。</p>\r
<p>(二)呼吸机与机械通气</p>\r
<p>机械通气(mechanical ventilation, MV)是指使用呼吸机辅助或替代危重患者的呼吸,使患者恢复有效通气并改善氧合的技术。吸气时,呼吸机将空气、氧气或空气-氧气混合气体压入气管、支气管和肺内,产生或辅助肺间歇性膨胀;呼气时,则利用肺和胸廓的弹性回缩,使肺或肺泡自动萎缩,排出气体,进行呼气。正压机械通气技术是目前临床使用的呼吸支持技术,包括有创正压通气和无创正压通气。</p>\r
<p>1. 有创正压通气(invasive positive-pressure ventilation, IPPV) 通常是经气管插管、喉罩、气管切开导管等连接机械通气进行正压通气。这种通气方式主要用于改善患者的氧合功能和通气状况，继而缓解患者呼吸耗能，有助于支持呼吸和循环系统。</p>\r
<p>2. 无创正压通气(noninvasive positive - pressure ventilation, NIPPV 或 NPPV) 是无创机械通气机连接口鼻面罩、鼻罩、口含管等进行无创正压通气。与有创正压通气不同，无创正压通气不需建立人工气道，避免了人工气道的不良反应和并发症，故也不具备人工气道的一些作用，如良好的气管引流、气管密封性等。</p>\r
<p>知识链接</p>\r
<p>呼吸机的历史演变</p>\r
<p>16 世纪, Andreas Vesalius 第一次提出了一种可以被认为是人工通气的方法: 他在动物的气管里插入一个气管, 通过气管向动物的肺里鼓风, 借此来维持动物的生命。</p>\r

<p>1864 年,美国人 Alfred Jones 发明了世界上第一台呼吸机。这是一种“负压呼吸机”,是让患者坐进一个密闭的箱子里,头部裸露在外面,然后在患者身体的周围制造高低气压,来填补本该由膈肌引起的呼吸运动。</p>\r
<p>1928 年, Drinker 和 Shaw 发明了“铁肺”, 成功抢救了罹患脊髓灰质炎的 8 岁小女孩, 开创了“机械通气”历史上的里程碑, 使负压呼吸机真正流行了起来。</p>\r
<p>1934 年, Frenkner 研制出了第一台气动限压呼吸机“Spiropulsator”, 它的气源来自钢筒, 气体经两只减压阀产生 50cm 水柱的压力。呼气时通过平衡器取得足够的气流, 吸气时间由开关控制, 气流经吸入管入肺, 当内压力升至预计要求时, 阀门关闭, 呼吸停止。</p>\r
<p>1940 年, Frenkner 和 Crafoord 合作, 在“Spiropulsator”的基础上进行了改进, 使之能与环丙烷同时使用, 成为第一台麻醉呼吸机。</p>\r
<p>1964 年, Emerson 改良的术后呼吸机是一台电动控制呼吸机。呼吸时间能随意调节, 是一台电子线路的呼吸机, 配备压缩空气泵, 各种功能均由电子调节, 使呼吸机从简单机械运动的时代跨入了精密的电子时代。</p>\r
<p>20世纪80年代以来，计算机技术的迅猛发展使新一代多功能电脑型呼吸机具备了以往不可能实现的功能，如监测、报警、记录等。进入20世纪90年代，呼吸机不断向智能化发展，计算机技术的应用使呼吸机的性能更加完善。</p>\r
<p>(三)呼吸机的功能和使用目的</p>\r
<p>1. 呼吸机的功能</p>\r
<p>(1) 主要产生呼吸机驱动力, 调节吸气时间及吸入气量, 完成吸气向呼气的转化; 调节呼气时间、气流和压力, 完成呼气向吸气的转化。</p>\r
<p>(2) 调节吸入气体中的氧浓度( FiO<sub>2</sub> ), 对吸入气体进行加湿、加温; 安装减压阀, 防止气压过大导致气压伤。</p>\r
<p>2. 呼吸机的使用目的是纠正各种原因引起的缺氧和(或)二氧化碳潴留。</p>\r
<p>(1) 维持代谢所需的肺泡通气: 是治疗的基本目的, 应用气管插管或气管切开保持呼吸道通畅, 加上正压通气以维持足够的潮气量, 保证患者代谢所需的肺泡通气。</p>\r
<p>(2) 纠正低氧血症和改善氧运输: 呼吸机的应用可改善换气功能, 特别是呼气末正压等呼吸参数的应用, 可使肺内气体分布均匀, 纠正通气血流比例失调, 减少肺内分流, 从而提高氧分压。</p>\r
<p>(3)降低呼吸肌做功:呼吸机可不依赖神经、肌肉而产生呼吸动作,用呼吸机代替呼吸肌做功,可减少呼吸肌的负荷,降低其耗氧量,有利于呼吸肌疲劳的恢复,从而有利于改善缺氧,同时减轻心脏的负荷。</p>\r
<p>(四)适应证和禁忌证</p>\r
<p>1. 适应证 任何原因引起的缺氧和(或)二氧化碳潴留均是使用呼吸机进行机械通气的适应证。IPPV 适用于严重的呼吸困难、危及生命的低氧血症、辅助肌参与呼吸并出现胸腹矛盾呼吸、有意识障碍或严重心血管并发症等。患者(成年)呼吸具备下列特征之一,即可选择机械通气治疗:①呼吸频率&gt;30 次/分或 &lt;8 次/分, 呼吸节律异常, 自主呼吸微弱或消失; ②潮气量低于正常的 1/3; ③肺泡生理无效腔量/潮气量 &gt;60%; ④肺活量 &lt;15mL/kg; ⑤最大吸气压 &lt;25cmH₂O; ⑥氧分压 &lt;60mmHg (面罩吸入纯氧时); ⑦二氧化碳分压 &gt;55mmHg (急性呼吸衰竭时)。</p>\r

<p>NPPV 目前尚无统一的临床应用指征,根据文献可用于多种疾病引起的呼吸衰竭(如 COPD 呼吸衰竭)、重症哮喘、神经肌肉疾病、中枢性低通气、阻塞性呼吸睡眠暂停综合征、辅助有创通气脱机等。应用 NPPV 时,患者须有较好的意识状态、血流动力学稳定,具有咳痰能力、自主呼吸能力和良好的配合 NPPV 的能力。</p>\r
<p>2. 禁忌证 呼吸机的使用无绝对的禁忌证,只是在某些特殊情况下需先进行必要的处理再行呼吸机治疗,可视为相对禁忌证,常见于以下情况。</p>\r
<p>
(1)已发生气压伤,如气胸、血气胸、纵隔气肿。因正压通气治疗可导致张力性气胸而危及生命,故应先进行胸腔闭式引流,再行机械通气。</p>\r
<p>(2)肺大疱或多次发生自发性气胸,正压通气可诱发严重的气压伤,一般不宜应用。但如果患者伴有严重的缺氧和二氧化碳潴留而其他方法不能纠正时,应慎用。</p>\r
<p>(3)大量咯血、重症结核等出现播散时,应慎重应用。有支气管胸膜瘘时可用高频通气。</p>\r
<p>(4) 存在严重低血容量或休克时, 原则上应先给予纠正后才可应用, 但若病情危急, 也可同时进行。</p>\r
<p>(5)急性心肌梗死时因增加心脏负荷而不宜使用呼吸机,但当并发急性肺水肿、患者严重缺氧时,应用正压通气并加用呼气末正压通气可使肺内渗出减少,通气/血流比值改善,从而提高氧合,改善心肌缺血情况。</p>\r
<p>(五) 机械通气模式</p>\r
<p>机械通气模式通常分为定容型通气模式和定压型通气模式两大类。定容型通气模式的优点是确保每次呼吸均可达到预设潮气量，缺点是对气道阻力增加的患者往往会造成明显的气体分布不均，使用此类通气模式注意观察气道压，避免气压伤。定压型通气模式的优点是提供可控制的压力，尤其是气道峰压和呼吸道平均压，以利于肺组织的扩张，改善通气和氧合，但是当呼吸系统顺应性改变时，会引起不可预见的潮气量波动。</p>\r
<p>呼吸机的通气模式有数十种,以下主要介绍呼吸机基本的和常用的通气模式。</p>\r
<p>1. 控制通气(control mechanical ventilation, CMV 或 CV) 该模式支持力度大, 在患者无自主呼吸时, CMV 是最基本、最常用的通气方式。</p>\r
<p>(1)容积控制通气模式(volume control ventilation, VCV): VCV 的潮气量和呼吸频率完全由呼吸机产生。呼吸机送气达预定潮气量后停止送气, 依靠肺的弹性回缩力被动呼气。VCV 的优点是能保证潮气量的恒定, 缺点是当肺顺应性较差或气道阻力增加时, 会导致压力创伤。</p>\r
<p>(2) 压力控制通气(pressure control ventilation, PCV): 呼吸机以预设气道吸气相压力来管理通气，即呼吸机送气达预设压力时，吸气便会中止并开始呼气。PCV 的优点是气道压力不会超过预设水平，所以不会导致压力创伤，缺点是容易造成通气不足，适用于术后肺顺应性差、急性呼吸窘迫综合征（ARDS）等情况。该模式气道压低，没有峰压，出现气压伤少；其吸气流速依据肺顺应性和气道阻力的大小而改变，有利于不易充盈的肺泡充气，改善通气/血流比值，有助于气体交换；还可与多种通气模式联合应用。</p>\r
<p>2. 辅助通气(assist mechanical ventilation, AMV 或 AV) 是指患者存在自主呼吸的状态下, 吸气负压或吸气气流可触发呼吸机做功, 从而引发呼吸机同步送气进行辅助呼吸, 多用于自主呼吸规则但较弱的患者。患者的呼吸受自主呼吸和呼吸机设置参数的双重影响。AV 可保持呼吸机与患者的自主呼吸同步, 有利于撤离呼吸机。缺点: ①当患者吸气强弱不等时, 传感器的灵敏度调节困难, 易发生过度通气或通气不足。②由于同步装置的限制,呼吸机要比患者开始吸气时间滞后20ms。因此,患者的呼吸频率越快,AV的通气效果越差。</p>\r
<p>3. 辅助/控制通气(assist-control ventilation, A/C) 是辅助通气和控制通气两种模式的结合, 是目前最常用的通气模式之一。当患者自主呼吸频率低于预置频率或患者努力吸气不能触发呼吸机送气时, 呼吸机即以预置的潮气量及通气频率进行正压通气, 即 CV 模式; 当患者的吸气能触发呼吸机时, 以高于预置频率进行通气, 即 AV 模式。</p>\r
<p>4. 同步间歇强制通气 (synchronized intermittent mandatory ventilation, SIMV) 是间歇指令通气 (intermittent mandatory ventilation, IMV) 的改良方式。IMV 是自发呼吸和控制呼吸的结合, 即在自发呼吸的基础上给患者有规律的间歇指令通气, 将气体强制送入肺内, 保证每分通气量。由于 IMV 与自主呼吸不同步时可出现人机对抗, 故 IMV 已不常用。</p>\r
<p>SIMV的特点是能与患者的触发同步，减少患者与呼吸机的对抗。患者可以在SIMV触发窗或自主呼吸触发窗内进行触发并启动通气。SIMV的供气由患者的自主吸气触发，可以根据自主呼吸的潮气量及呼吸频率调节合适的呼吸机支持水平；如患者在呼吸机默认的触发窗内无自主呼吸或自主呼吸较弱不能触发，呼吸机自动提供一次
指令通气。SIMV的优点是既保证了其与患者自主呼吸同步，又不干扰患者的自主呼吸，有利于呼吸肌群的锻炼(图2-71)。此模式已成为术后短期呼吸支持首选的呼吸模式，也是撤离呼吸机最常用的方式之一。</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-14-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-71 IMV与SIMV压力示意图对比</p>\r

<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-15-l.jpg" /><figcaption></figcaption></figure>\r
<p>5. 压力支持通气(pressure support ventilation, PSV) 属于部分通气支持模式, 即在自主呼吸的前提下, 呼吸机给予一定的压力辅助(图 2-72)。在自主呼吸的前提下, 其可提高患者每分通气量、潮气量, 呼吸频率、吸气与呼气时间由患者自己调节, 符合呼吸生理, 是目前最常用的通气模式之一。每次吸气都接受一定水平的压力支持, 以辅助和增强患者的吸气能力, 增加患者的吸气幅度和吸入气量。PSV 能较好地与患者吸气流速需求相配合(较好的人机协调), 减少呼吸做功, 有利于呼吸肌疲劳的恢复, 利于呼吸机的撤离。其适用于自主呼吸能力不足, 但神经调节明显异常的患者, 当设定水平适当时, 很少发生人机对抗。PSV 可与多种通气模式合并使用。部分呼吸机使用其他名称, 如 Assisted spontaneous breath(ASB)。</p>\r
<p>6. 持续气道正压通气(continuous positive airway pressure, CPAP) 是指患者在有自主呼吸的状态下, 整个呼吸周期内(吸气及呼气期间)均由呼吸机以一定的正压持续供给气流, 且供给的气流大于吸入的气流, 故患者感到吸气省力, 呼吸做功减少。CPAP 属于自主通气模式, 主要用于脱机前的过渡阶段或需借助此通气模式观察患者自主呼吸的情况, 如吸气相压力、潮气量、每分通气量等, 可用于无创通气, 也可与多种通气模式合用。</p>\r
<p>7. 双水平气道正压通气(bilevel positive airway pressure, BPAP) 为一种定压呼吸模式, 是指给予两种不同水平的气道正压, 在高压力水平( P<sub>high</sub> ) 和低压力水平( P<sub>low</sub> ) 之间定时切换(图 2-73), 且高压力时间、低压力时间、高压力水平、低压力水平可各自可调, 从 P<sub>high</sub> 转换至 P<sub>low</sub> 时, 增加呼出气量, 改善肺泡通气, 因而是一种更灵活、应用更广泛的通气模式。该模式在两个压力水平上均允许患者有自主呼吸存在, 可与 PSV 合用以减少患者呼吸功。BPAP 的主要特点是通气时气道压力周期性地在高压力水平和低压力水平之间转换,每个压力水平、压力时间均可独立调节,可转化为反比 BPAP 或气道压力释放通气;呼气相压力可为肺泡的开放提供有效压力,确保萎陷肺泡的开放,改善氧合状态和换气功能,增加肺的顺应性,减少呼吸功;患者的自主呼吸较少受干扰,当高压力时间持续较长时,增加平均气道压,明显改善氧合;可由控制通气向自主呼吸过渡,不用变更通气模式直至呼吸机撤离。同时由于呼吸机提供一个持续的气流,允许患者在呼吸周期的任何阶段都可以进行自主呼吸,可避免人机对抗。在目前临床使用的各种通气方式中,BPAP 对气道损伤较小,并可模拟出多种通气模式,临床应用范围广泛。</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-16-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-17-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-72 PSV通气模式</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-18-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-19-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图2-73 CPAP、PCV与BPAP压力示意图对比</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-20-l.jpg" /><figcaption></figcaption></figure>\r
<p>（六）呼吸机常见参数设置</p>\r
<p>机械通气参数的设置非常复杂,患者情况不同,所谓的“正常值”也不同。要正确灵活地使用呼吸机,一定要从原理上理解不同参数的定义,并结合呼吸波形进行综合分析。以下介绍呼吸机常见的参数(图2-74)。</p>\r
<p style="text-align: center;">图2-74 呼吸机的界面及主要参数</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-21-l.jpg" /><figcaption></figcaption></figure>\r
<p>1. 潮气量(VT) 指平静呼吸时每次吸入或呼出量,在机械通气时,指患者通过呼吸机每次吸入或呼出的气量。潮气量设置是机械通气时首先考虑的问题。成人潮气量一般为 5～15,mL/kg , 集合呼吸系统顺应性和阻力调节, 注意气道平台压不超过 30～35,cmH<sub>2</sub>O , 最终还应根据血气分析指标进行相应调整。</p>\r

<p>2. 通气频率(f) 指每分钟内机械通气的次数。通气频率反映呼吸周期的长短。成人机械通气频率一般设置为 12 ~ 20 次/分。急、慢性限制性肺疾病时也可根据每分通气量和目标动脉血氧分压水平设置为超过 20 次/分。</p>\r
<p>3. 每分通气量(MV) 与潮气量、机械通气频率成正比, 机械通气频率与潮气量成反比。在直接设定每分通气量的呼吸机, 对潮气量的改变是通过改变每分通气量或机械通气频率而实现的。在直接设定潮气量的呼吸机, 对每分通气量的改变是通过改变潮气量或机械通气频率而实现的。每分通气量(MV) = 潮气量(VT) × 机械通气频率(f)。一般按照 10 ~ 12mL/kg 调节, 准确设置还需依据血气分析指标对潮气量、机械通气频率进行相应调整。</p>\r
<p>4. 吸气时间与呼气时间比(I:E) 简称吸/呼或吸呼比, 指吸气、呼气时间各占呼吸周期的比例, 是重要的机械通气参数。吸/呼的设置应考虑患者自主呼吸水平、氧合状态及血流动力学, 适当的设置可保持良好的人机同步。有些呼吸机没有吸气停顿时间(又称吸气平台时间), 因在吸气停顿时间内呼气尚未开始, 吸气气体停留在患者体内, 故吸气停顿时间仍是吸气时间的一部分, 吸气停顿时间通常占呼吸周期的 10% 。呼吸周期 =60(s)÷ 呼吸频率(次/分), 每个呼吸周期 。吸/呼可以通过调节吸气流速或吸气时间获得。通常设置吸气时间为 0.8～1.2s, 或吸/呼为 1:(1.5～2.0), 特殊情况下可设置为 4:1～2:1, 称之为反比呼吸, 是一种特殊机械通气技术。<
/p>\r
<p>5. 触发灵敏度 在使用辅助通气模式时,依靠患者自主吸气的初始动作使吸气管路中产生负压,被呼吸机中特定的传感器感知而同步协调的气动呼吸机行机械通气,这种感知域称为触发灵敏度。通常有两种触发,即压力触发和流量触发。成人呼吸机的压力触发常为 -2～-0.5,cmH<sub>2</sub>O , 流量触发常为 1～5,L/min 。触发灵敏度只用于辅助通气和自主呼吸。当触发灵敏度过高时,会导致通气过度;当触发灵敏度过低时,会增加吸气负荷,消耗额外呼吸功。</p>\r
<p>6. 吸氧浓度( FiO<sub>2</sub> ) 现代呼吸机均配有空气-氧混合器,保持吸氧浓度设置范围在21%~100%,以保证临床应用安全。 FiO<sub>2</sub> 的设置一般取决于 PaO<sub>2</sub> 目标水平、呼气末正压(PEEP)水平、平均气道压及患者血流动力学状态。机械通气初始阶段可给予高 FiO<sub>2</sub> (100%)以迅速纠正缺氧,以后再依据 PaO<sub>2</sub> 目标水平、 SaO<sub>2</sub> 水平（&gt;90%）、PEEP 水平、平均气道压及患者血流动力学状态，酌情降低 FiO<sub>2</sub> 至 50% 以下。</p>\r
<p>7. 气道压力(pressure, P 或 airway pressure, Paw) 气道压力的高低由胸肺顺应性、气道阻力、潮气量和吸气流速等决定。气道压力包括气道平均压( P<sub>mean</sub> )、气道峰压( P<sub>peak</sub> )、气道平台压( P<sub>plat</sub> )、PEEP 等。PEEP 指在呼气终末借助于装在呼气端的限制气流活瓣等装置，使气道压力高于大气压。气道本身病变使呼气末气道压力高于大气压称内源性呼气末气道正压( PEEP<sub>i</sub> )。PEEP 的作用是使萎陷的肺泡复张、增加气道平均压、改善氧合，PEEP 适用于肺顺应性减退、功能残气量减少和肺毛细血管膜通透性增加的疾患，如肺水肿及 ARDS 等。</p>\r
<p>吸气相压力越高,则越易产生气压伤,对循环功能影响越大。容量切换型呼吸机应设置一个最高压力,当压力超过此范围,安全阀开放。压力切换型呼吸机应设置一个适当吸气压来决定潮气量。在保证正常肺泡通气及血气的情况下,尽量使用最小吸气压及最短吸气时间。吸气末压又称屏气压,屏气压是为了改善气体分布而改善通气/血液比值,但过长的屏气会加重心脏负担,一般不应超过呼吸周期的20%。</p>\r
<p>考点提示:呼吸机的常见模式及参数含义。</p>\r
<p>(七)呼吸机报警原因的识别及处理</p>\r
<p>呼吸机故障包括机器自身功能性故障和机器以外原因造成的非功能性故障,若出现功能性故障,机器不能继续使用,应由专业技术人员检查维修(表2-4)。</p>\r
<p>表 2-4 呼吸机报警原因及处理办法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-29-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-30-l.jpg" /><figcaption></figcaption></figure>\r
<p>考点提示:呼吸机报警原因的分析及处理。</p>\r
<p>(八)呼吸机使用期间的护理</p>\r
<p>1. 严密观察、密切监测 确保所有呼吸机的报警处于打开状态，以保证患者安全；密切观察患者生命体征变化，监测患者意识状态、吞咽、咳嗽反射、瞳孔的变化以判断参数设定是否合理；观察湿化液的温度及湿化罐内的水位线；定期监测动脉血气，根据血气分析结果调整呼吸机参数。</p>\r
<p>2. 加强气道管理 做好患者气道及口、鼻、咽腔的护理, 及时清除呼吸道分泌物, 保持气道通畅。机械通气时应实施气道湿化, 促进气道分泌物的稀释以利于气道分泌物的排出。及时清除环路内的积水, 并使集水阀处于管路的最低点, 防止积液回流至呼吸机或患者气道。密切观察插管位置及管腔通畅程度。对气管切开患者, 观察套管是否固定完好, 松紧是否合适, 气管切开处的纱布垫是否干燥、清洁, 切口有无感染等。</p>\r

<p>3. 熟悉常见的报警 如压力报警(高压力/低压力)、容量报警(高容量/低容量)、窒息报警、氧浓度报警、湿化报警、气源和电源报警的原因与处理方法。</p>\r
<p>4. 识别和处理常见并发症</p>\r
<p>(1)呼吸机相关性肺炎(ventilation associated pneumonia, VAP): 是使用呼吸机过程中最常见的并发症, 临床表现与肺炎相同, 如呼吸道分泌物增多、发热、外周血白细胞计数升高等, 胸片和分泌物病原学检查是诊断 VAP 的主要依据。导致 VAP 发生的诱发因素: ①接受呼吸机治疗的时间是导致 VAP 最重要的诱发因素, 时间越长, 发生率越高, 3~7 天是最佳时间窗, 故尽可能缩短呼吸机治疗时间; ②患者本身因素, 如咳嗽和排痰能力差、存在胃肠反流及误吸、机体抵抗力下降和大量应用广谱抗生素及激素均是 VAP 发生的诱发因素; ③医源性因素, 如医护人员的手和各种医疗器械、物品的清洗、消毒不严格引起感染, 人工气道的护理不当等。为预防 VAP, 尽量避免上述诱发因素或将其降至最低限度, 并注意重要环节的控制, 如加强气道护理、保持呼吸道通畅、适当借助药物提高机体免疫能力、避免长时间应用广谱抗生素等。如果病情允许, 尽早脱机, 缩短呼吸机使用时间。</p>\r
<p>(2) 导管或套管堵塞、滑脱: 导管或套管滑脱易发生在气管切开的患者。通常有两种形式, 一是导管或套管完全从气管内滑出, 多见于气管插管位置过浅、导管或套管固定不良, 随体位变动或烦躁、挣扎等; 二是气管切开位置太低或患者过于肥胖、颈部较短时, 套管很容易在体位变动时滑出。导管堵塞可因气管分泌物干涸结痂、导管套囊脱落所致。因此, 要加强患者气道及口、鼻、咽腔的护理, 及时清除呼吸道分泌物, 保持气道通畅。</p>\r
<p>(3)气压伤:导致气压伤的原因主要为张力性气胸和皮下、纵隔气肿,其中张力性气胸相对严重,如不紧急处理,可能危及患者生命。若为气胸所致,需及时建立胸腔闭式引流;若为气管切后的气囊漏气和皮肤切口缝合过紧,则需更换气囊管,避免气体由气道内外逸;若为气管切开口过低所致,一般没有更好的处理方法,需等气体自行吸收和消散,或避免气体继续进入纵隔组织内;若为气管黏膜压迫、坏死所致的穿孔,应更换较长一点的导管或套管,使管腔的尖端超出穿孔处。</p>\r
<p>(4)肺不张:导致肺不张的常见原因如下。①通气量严重不足;②气管插管过深,插入一侧支气管,导致另外一侧肺无通气发生萎陷;③气道分泌物潴留,咳嗽反射减弱或消失;④肺部原有感染或继发感染;⑤吸入纯氧时间过长,导致吸收性肺不张;⑥并发气胸,致使患侧肺出现压迫性肺不张。患者的体征和胸部X线检查是诊断肺不张的主要依据,尤其是治疗前后胸部X线检查的比较。一旦明确有肺不张,应立即采取处理措施,如及时行气管切开,保证充分的气道湿化和吸引;借助纤维支气管镜对肺不张的部位进行充分吸引;借助物理作用,如背部叩击等,促进分泌物的排出。倘若导管位置不正确,应及时调整,直至两肺的呼吸音相等。</p>\r
<p>(5) 人机对抗: 指患者呼吸肌用力和呼吸机送气方式的不协调, 即患者呼吸与呼吸机不同步。导致人机对抗的原因: ①机械通气早期, 患者不适应; ②呼吸机参数调节不当, 通气量不足; ③痰液潴留堵塞气道或管道漏气; ④患者咳嗽、疼痛或体位不当; ⑤气管插管滑入右主支气管、气胸、支气管痉挛及病情恶化等。针对不同情况, 应对因处理。</p>\r
<p>(6)过度通气或通气不足:具体如下。</p>\r
<p>1)过度通气:指由二氧化碳排出过多而引起的呼吸性碱中毒,多与患者本身因素和呼吸机参数设置不当有关。前者包括缺氧、疼痛、精神紧张、代谢性酸中毒等刺激或代偿,引起呼吸频率加快和过度通气;后者多与VT或MV设置过高有关。依据血气分析,无论何种原因,只要 PaCO<sub>2</sub>&lt;30～35mmHg ,均意味着存在不同程度的过度通气,应分析或找出原因并去除。</p>\r
<p>2) 通气不足: 指二氧化碳排出不足, 引起二氧化碳潴留, 多与气道不通畅有关。引起气道不通畅的原因很多, 如分泌物过多、黏稠、排出不畅等。气道湿化不够或吸引不充分, 导致导管、套管完全或不完全性堵塞, 也是引起通气不足的主要原因。处理时, 首先应分析或找出原因并去除; 其次应调节呼吸机参数, 主要以调整 I:E、延长呼气时间为主; 最后, 必要时需借助病因和缓解痉挛治疗, 以保持呼吸道通畅。<
/p>\r
<p>考点提示:应用呼吸机的常见并发症。</p>\r
<p>(九)呼吸机的清洁消毒</p>\r
<p>1. 做好日常消毒工作 通常是每日清洁呼吸机表面一次。不提倡常规频繁更换呼吸机管道，一旦污染则应及时更换。呼吸机主机空气过滤网需每日清洗，以防灰尘堆积，影响机器内部散热。</p>\r
<p>2. 做好终末消毒处理 患者停用呼吸机后的消毒,需要将呼吸机所有管路系统小心拆下,彻底消毒后,再按原结构重新安装、调试,以备下次应用。</p>\r
<p>3. 清洁消毒的程序</p>\r
<p>(1) 拆卸: 拆卸呼吸机管道前, 应认真阅读呼吸机说明书, 了解其结构, 按照说明书要求拆卸, 严禁违规操作,避免损坏部件及管道。</p>\r
<p>(2) 清洁: 具体如下。</p>\r
<p>1) 管路清洁: 仔细检查管道内有无痰痂、血渍、污垢及其他残留, 若不冲洗干净则难以达到彻底消毒的目的。</p>\r
<p>2) 传感器清洗: 传感器如流量、压力等为呼吸机的特殊电子零件, 不能用水冲洗, 也不能用消毒液浸泡, 只能用 75% 酒精棉球小心轻擦干净, 有的传感器只能轻轻浸放在清水中, 即刻取出, 自然晾干, 切忌用力甩干或烘干。</p>\r
<p>3) 空气过滤网清洁: 空气过滤网包括空气压缩泵和有些呼吸机主机中的可清洗空气过滤网。具体清洁方法: 将空气过滤网从机器中取出, 用清水洗净表面污垢后, 再用力甩干或烘干; 或者用吸尘器吸尽灰尘, 每 48 ~ 72h 清洁一次。</p>\r

<p>4) 内部主机清洁: 呼吸机内部不可拆卸电子组件, 其表面的灰尘可用小功率吸尘器轻轻吸除, 不能用消毒液浸泡, 需由工程师定期保养。</p>\r
<p>5) 机器面板外壳清洁: 呼吸机的主机外壳和压缩泵的外壳用清洁柔软的湿抹布擦净即可, 每日2次或隔日1次, 必要时用消毒液如含氧制剂消毒液浸泡过的软抹布擦洗。湿化器电器加热部分和温控传感器探头金属部分用清洁柔软湿布轻轻擦净, 不能用消毒剂浸泡。</p>\r
<p>(3) 消毒方法: 凡连接患者与呼吸机之间的螺纹管、连接管接头、湿化器、雾化器和呼气瓣等, 均应彻底消毒。管路常用的消毒方法有药物浸泡消毒法、高压蒸汽消毒法、气体熏蒸消毒法等。</p>\r
<p>1) 药物浸泡消毒法: 为最常用的方法, 简单方便。消毒时注意严格掌握消毒液浓度及消毒时间; 消毒部件要完全浸泡在消毒液中, 不能有残留气体; 消毒液容器应为密闭容器, 以免消毒液挥发。消毒完毕后, 须用蒸馏水冲洗干净。常用的消毒液有 0.5% 过氧乙酸、2% 巴氏消毒液、2% 戊二醛碱溶液等。</p>\r
<p>2) 高压蒸汽消毒法: 呼吸机需消毒部件的金属部分和耐高温部件, 可根据具体情况送供应室进行高压蒸汽消毒。</p>\r
<p>3) 气体熏蒸消毒法: 应用环氧乙烷可杀死真菌、孢子及较大病毒, 是最有效的气体消毒法。将消毒用品密封包装好, 放入特制环氧乙烷熏箱内消毒, 消毒有效期为 1 年。消毒后不能立即使用, 需经 1 周时间, 待环氧乙烷挥发后才能使用。</p>\r
<p>4) 特殊感染物品处理: 特殊感染患者用物应该按照医用垃圾特殊处理。也可使用 2% 戊二醛中性溶液浸泡 10min 杀死细菌、真菌、病毒和结核分枝杆菌, 杀死孢子需 10h, 再用蒸馏水冲洗晾干, 最后进行熏蒸消毒。</p>\r
<p>目标检测</p>\r
<p>1. 简易呼吸器的( )，又称鸭嘴阀。</p>\r
<p>A. 单向阀 B. 呼气阀 C. 安全阀</p>\r
<p>D. 储气阀 E. 进气阀</p>\r
<p>2. 简易呼吸器不可用于( )。</p>\r
<p>A. 现场心肺复苏或急需人工呼吸急救的患者</p>\r
<p>B. 窒息患者</p>\r
<p>C. 呼吸困难者</p>\r
<p>D.途中转运需要提高供氧量的患者E.颌面部骨折患者</p>\r
<p>3. 下图中患者预选择的通气模式是( )。</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540010-25-l.jpg" /><figcaption>
</figcaption></figure>\r
<p>A. 压力支持通气 B. 控制通气 C. 持续气道正压通气 D. 同步间隙指令通气 E. 呼气末正压通气</p>\r
<p>4. 呼吸机气道高压报警常见的原因不包括( )。</p>\r
<p>A. 呼吸道分泌物增加或分泌物阻塞人工气道</p>\r
<p>B. 气管插管或气管切开导管移位</p>\r
<p>C. 呼吸机管路不畅, 如管路打折、积水过多</p>\r
<p>D. 患者呼吸过快</p>\r
<p>E. 叹息通气时</p>\r
<p>5. 下列表示呼气末正压的是( )。</p>\r
<p>A. P<sub>mean</sub> B. P<sub>peak</sub> C. P<sub>plat</sub></p>\r
<p>D. PEEP E. VAP</p>\r
<p>6. 患者在有自主呼吸的状态下, 整个呼吸周期内(吸气及呼气期间)均由呼吸机以一定的正压持续供给气流, 是指 ( ) 模式。</p>\r
<p>A. PSV B. SIMV C. CPAP</p>\r
<p>D. BPAP E. CMV</p>\r
<p>7.平静呼吸时每次吸入或呼出气量是指( )。</p>\r
<p>A. f B. VT C. MV</p>\r
<p>D. I: E E. FiO<sub>2</sub></p>\r
<p>8.是诊断 VAP 的主要依据。</p>\r
<p>A. 呼吸道分泌物增多</p>\r
<p>B. 发热</p>\r
<p>C. 外周血白细胞计数升高</p>\r
<p>D. 安全阀使用时间</p>\r
<p>E. 胸片和分泌物病原学检查</p>\r
<p>9. 导致人机对抗的原因不包括( )。</p>\r
<p>A. 机械通气早期, 患者不适应</p>\r
<p>B. 呼吸机参数调节不当, 通气量不足</p>\r
<p>C. 痰液潴留堵塞气道或管道漏气</p>\r
<p>D. 患者咳嗽、疼痛或体位不当</p>\r
<p>E. 使用呼吸机时间过久</p>\r
<p>（许天亮 赵美楠 秦抗洪）</p>\r
`},{id:"module3-task5",title:"第五节 洗胃术",order:5,rawContent:`案例导学

王某，男，46岁，因服用不明液体、呕吐半小时被家人送入急诊。入院时神志不清，浅昏迷，可闻及刺鼻的农药味，皮肤湿冷。查体：双侧瞳孔缩小，双肺闻及湿啰音，有明显肌颤，医嘱立即给予。

请思考：

1. 何谓？

2. 应达到什么效果？

术是将胃管插入患者胃内,反复注入和吸出一定量的溶液,以冲洗并排出胃内容物,减轻或避免吸收中毒的胃灌洗方法。

一、概述

(一) 目的

(1) 清除胃内未吸收的毒物,适用于口服药物、毒物中毒等。一般在误服毒物后 6h 内的效果最好,而且时间越短,抢救效果越好。但对于某些毒性比较强烈且缺乏特效解毒药的毒物中毒,即使超过 6h 也可以酌情给予。

(2)减轻胃黏膜水肿和炎症。

(3)清除胃内容物,便于胃镜检查或手术,有助于观察胃内情况。

(4) 留取胃液样本送检。

(二)适应证

(1) 清除胃内容物或各种毒物。

(2) 治疗完全或不完全性幽门梗阻。

(3) 治疗急、慢性胃扩张。

(4)为某些手术或检查的患者做准备,如胃肠道手术前。

(三)禁忌证

(1) 抽搐、惊厥剧烈尚未控制。

(2)服用强腐蚀剂,如强酸、强碱。因为强酸、强碱可使胃黏膜灼伤及深层组织坏死,时易致穿孔,应给予牛奶、蛋清等保护胃黏膜。

(3)原有食管胃底静脉曲张或上消化道大出血、消化道溃疡及食管阻塞病史。

(4)昏迷、严重心肺疾患。

考点提示: 术的适应证和禁忌证。

(四) 常用的溶液

1. 生理盐水或清水 对不明毒物的急性中毒
或无特异性拮抗剂的毒物中毒,均可用生理盐水或清水。

2. 2%~4% 碳酸氢钠溶液 用于有机磷农药、拟除虫菊酯类药物、香蕉水及某些重金属(如汞、苯)中毒。敌百虫、强酸中毒者禁用。

3. 1:5000 高锰酸钾 用于镇静催眠药,如巴比妥类、阿片类、苯二氮草类、有机磷农药、氰化物等

4. 蛋清水、牛奶、植物油 用于腐蚀性毒物中毒。

5. 10% 活性炭悬液 用于河豚毒素、生物碱及其他多种毒物。

6. 5%~10% 硫代硫酸钠 用于氰化物、汞、砷等中毒。

二、常用的法

常用的法主要是指胃管法，传统做法是用管连接注射器(注射器法)或漏斗(漏斗胃管法)进行，根据现有条件也可连接电动吸引器(电动吸引器法)和机(自动机法)进行。特殊情况下还可以切开，但目前已较少使用。有部分文献将催吐法也归为法，此法不使用胃管，简单有效。以下主要介绍催吐法和自动机法。

(一) 催吐法

催吐法又称口服催吐法，指患者口服催吐溶液或溶液，再自行呕出的方法。其适用于清醒、能主动配合的患者。

1. 用物准备 治疗盘、压舌板、毛巾、量杯、塑料围裙、水温计、水桶；根据需要准备溶液 10000～20000mL （温度 25～38∘C）。

2. 操作步骤

(1) 备齐用物携至患者床旁, 核对患者, 解释操作目的及配合方法, 以取得患者合作。

(2) 患者取坐位, 围好塑料围裙, 污水桶置于患者座位前。

(3) 嘱患者每次饮入液体量 300 ~ 500mL(成人), 用压舌板刺激咽部催吐, 如此反复进行, 直至吐出液澄清无味为止。

(4) 协助患者漱口、洗脸, 嘱患者卧床休息。

(5) 整理床单位, 清理用物。

(6) 记录液名称及液量, 洗出液的量、颜色、性质、气味, 患者的一般情况, 必要时送检标本。

(二) 自动机法

自动机是利用电磁泵为动力源,通过自控电路的控制,电磁阀自动转换动作,完成向胃内注入冲洗药液,再从胃内吸出内容物的过程。此种法能自动、迅速、彻底地清除胃内容物。

1. 用物准备 手消毒液, 溶液, 自动机及附件, 内铺清洁治疗巾的治疗盘, 包(治疗碗、弯盘、镊子、止血钳、纱布数块、治疗巾、压舌板、液体石蜡棉球), 棉签, 胶布, 一次性中单, 手套, 适合型号的胃管、连接管数条, 牙垫, 听诊器, 治疗碗和吸管各1个(内盛温开水漱口, 昏迷患者除外), 带刻度盛水桶2个, 盛污物容器, 按要求备化验单、标本容器。必要时清洁治疗盘内放压舌板、手电筒。

2. 操作步骤

(1) 备齐用物携至患者床旁, 核对床号、姓名、液名称, 解释操作目的及配合方法, 以取得患者合作。

(2) 连接机, 接通电源, 检查自动机的性能。

(3) 连接管道, 将已经配好的液放入桶内, 将连接管分别与机器上的药管、胃管、排污管的管口连接; 将药管的另一端放入液桶内, 管口应浸在液面下, 排污管的另一端放入污物桶内, 胃管的另一端将与管相连接, 调节灌洗量流速, 试运行机。

(4)协助患者取左侧卧位,昏迷患者取平卧位,头偏向一侧。

(5) 打开包, 颌下、胸前铺好一次性中单及治疗巾, 将弯盘、纱布放于口角旁, 戴手套。口腔插管者检查并取出活动义齿, 放入牙垫并固定。

(6)测量胃管插管长度,润滑胃管前段,插入胃管,证实胃管在胃内后,用胶布固定,并与自动机的胃管相连,调节机参数,每次灌入量以300~500mL为宜。

(7)带有“手吸”“手冲”键的机器,先按“手吸”键,吸出胃内容物,遵医嘱留取毒物标本送检。再按“自动”键,开始进行自动冲洗。反复冲洗至吸出的液体澄清无味后,按“停机”键,机器停止工作。

(8) 过程中, 如发现管道堵塞, 
水流减慢、不流或发生故障, 可交替按“手冲”和“手吸”两键, 重复冲吸数次, 直到管路通畅; 然后按“手吸”键先吸出胃内存留液体, 再按“自动”键, 使自动继续进行。

(9) 过程中密切观察患者的生命体征, 液出入量的平衡情况, 以及洗出液的性质、颜色、气味。

(10) 完毕, 将胃管拔出, 拔管时先将胃管反折或夹住胃管末端, 以免管内液体误入气管。整理床单位及清理用物, 协助患者清洁口腔及面部, 取舒适卧位, 做好记录。

考点提示:催吐和自动机的方法。

知识链接

漏斗胃管法和电动吸引器法

1. 漏斗胃管法 将漏斗胃管经过鼻腔或者口腔直接插入胃中, 利用虹吸原理将溶液灌入胃内, 再将溶液吸引出来, 起到清部的作用。此法是最为传统和简单的方法。

2. 电动吸引器法 利用负压吸引原理,用电动吸引器连接胃管吸出胃内容物的方法。此法能迅速有效地清除胃内毒物,较节省人力,且能准确计算灌洗液量。

三、术的护理要点

(1) 时一般应选择口径相对较大(能够插入不致损伤)、硬度适宜的胃管。如果口径过小, 胃内容物容易堵塞胃管, 此时必须拔除胃管, 通畅后再行插管, 结果是延长时间, 增加毒物的吸收; 如果选择材质较软的胃管, 在回抽胃液时负压可使管壁塌陷, 导致引流不畅。

(2) 液温度宜控制在 35～38∘C 。如果水温过高，可引起消化道黏膜下血管扩张，加速毒物吸收；如果水温过低，又可刺激胃肠蠕动将毒物推向远端。因此，护士在配置液时，应把握好水温，以免增加不良反应。

(3) 当中毒物质不明时, 应抽取胃内容物及时送检。液可先选用生理盐水或清水, 待确定毒物性质后, 再选用拮抗剂的液。

(4) 时宜取左侧卧位, 保持呼吸道通畅, 清醒合作者可取坐位, 昏迷患者应将头偏向一侧, 以免发生吸入性肺炎。

(5)要注意每次灌入量与吸出量的基本平衡,每次灌入量不宜超过500mL。成人每次灌洗量宜控制在300~500mL,小儿需根据年龄而定,每次为50~200mL。如果量少,冲洗速度较慢,冲洗不彻底;量多,则可导致胃扩张或促使毒物进入肠内。经过反复冲洗,直至液澄清无味为止。

(6) 过程中, 应密切观察患者生命体征、洗出液的变化, 发现流出血性液体、腹痛及虚脱等表现, 立即停止操作, 及时通知医生进行处理。

(7)吞服强酸或强碱等腐蚀性毒物、近期有上消化道出血、主动脉瘤者均禁止。

(8)幽门梗阻患者时,宜在饭后4~6h进行,并需记录胃内潴留量。

(9) 使用自动机, 使用前应检查机器各管道衔接是否正确、紧密, 运转是否正常。勿使水流至按键开关内, 以免造成机器损坏, 用毕及时清洗, 避免污物堵塞管道。

1. 清醒的口服毒物中毒者, 首选的方法是( )。

A. 口服催吐法 B. 漏斗胃管法 C. 注洗器胃管法

D. 自动机法 E. 灌肠法

2. 清除肠内毒物最佳的时限是( )。

A. 食物中毒 3h 内

B. 食物中毒 4h 内

C. 食物中毒 6h 内

D. 食物中毒 8h 内

E. 食物中毒 10h 内

3. 下列关于幽门梗阻操作的描述, 不正确的是( )。

A. 饭后 4 ~ 6h 进行 B. 首先吸净胃内容物 C. 液温度为 25 ~ 30℃

D. 每次灌入 800mL 左右 E. 洗毕记录胃内潴留量

4.误服硫酸时,可选择( )。

A. 立即催吐 B. 服用牛奶、蛋清等保护胃黏膜 C. 生理盐水

D. 1:5000 高锰酸钾 E. 2% 碳酸氢钠溶液

5. 液的温度宜控制在( )。

A. 25～30∘C B. 30～35∘C C. 35～38∘C

D. 38～40∘C E. 40～42∘C

(禹 西 张 静)`,rawHtml:`<p>案例导学</p>\r
<p>王某，男，46岁，因服用不明液体、呕吐半小时被家人送入急诊。入院时神志不清，浅昏迷，可闻及刺鼻的农药味，皮肤湿冷。查体：双侧瞳孔缩小，双肺闻及湿啰音，有明显肌颤，医嘱立即给予。</p>\r
<p>请思考：</p>\r
<p>1. 何谓？</p>\r
<p>2. 应达到什么效果？</p>\r
<p>术是将胃管插入患者胃内,反复注入和吸出一定量的溶液,以冲洗并排出胃内容物,减轻或避免吸收中毒的胃灌洗方法。</p>\r
<p>一、概述</p>\r
<p>(一) 目的</p>\r
<p>(1) 清除胃内未吸收的毒物,适用于口服药物、毒物中毒等。一般在误服毒物后 6h 内的效果最好,而且时间越短,抢救效果越好。但对于某些毒性比较强烈且缺乏特效解毒药的毒物中毒,即使超过 6h 也可以酌情给予。</p>\r
<p>(2)减轻胃黏膜水肿和炎症。</p>\r
<p>(3)清除胃内容物,便于胃镜检查或手术,有助于观察胃内情况。</p>\r
<p>(4) 留取胃液样本送检。</p>\r
<p>(二)适应证</p>\r
<p>(1) 清除胃内容物或各种毒物。</p>\r
<p>(2) 治疗完全或不完全性幽门梗阻。</p>\r
<p>(3) 治疗急、慢性胃扩张。</p>\r
<p>(4)为某些手术或检查的患者做准备,如胃肠道手术前。</p>\r
<p>(三)禁忌证</p>\r
<p>(1) 抽搐、惊厥剧烈尚未控制。</p>\r
<p>(2)服用强腐蚀剂,如强酸、强碱。因为强酸、强碱可使胃黏膜灼伤及深层组织坏死,时易致穿孔,应给予牛奶、蛋清等保护胃黏膜。</p>\r
<p>(3)原有食管胃底静脉曲张或上消化道大出血、消化道溃疡及食管阻塞病史。</p>\r
<p>(4)昏迷、严重心肺疾患。</p>\r
<p>考点提示: 术的适应证和禁忌证。</p>\r
<p>(四) 常用的溶液</p>\r
<p>1. 生理盐水或清水 对不明毒物的急性中毒
或无特异性拮抗剂的毒物中毒,均可用生理盐水或清水。</p>\r
<p>2. 2%~4% 碳酸氢钠溶液 用于有机磷农药、拟除虫菊酯类药物、香蕉水及某些重金属(如汞、苯)中毒。敌百虫、强酸中毒者禁用。</p>\r
<p>3. 1:5000 高锰酸钾 用于镇静催眠药,如巴比妥类、阿片类、苯二氮草类、有机磷农药、氰化物等</p>\r
<p>4. 蛋清水、牛奶、植物油 用于腐蚀性毒物中毒。</p>\r
<p>5. 10% 活性炭悬液 用于河豚毒素、生物碱及其他多种毒物。</p>\r
<p>6. 5%~10% 硫代硫酸钠 用于氰化物、汞、砷等中毒。</p>\r
<p>二、常用的法</p>\r
<p>常用的法主要是指胃管法，传统做法是用管连接注射器(注射器法)或漏斗(漏斗胃管法)进行，根据现有条件也可连接电动吸引器(电动吸引器法)和机(自动机法)进行。特殊情况下还可以切开，但目前已较少使用。有部分文献将催吐法也归为法，此法不使用胃管，简单有效。以下主要介绍催吐法和自动机法。</p>\r
<p>(一) 催吐法</p>\r
<p>催吐法又称口服催吐法，指患者口服催吐溶液或溶液，再自行呕出的方法。其适用于清醒、能主动配合的患者。</p>\r
<p>1. 用物准备 治疗盘、压舌板、毛巾、量杯、塑料围裙、水温计、水桶；根据需要准备溶液 10000～20000mL （温度 25～38<sup>∘</sup>C）。</p>\r
<p>2. 操作步骤</p>\r
<p>(1) 备齐用物携至患者床旁, 核对患者, 解释操作目的及配合方法, 以取得患者合作。</p>\r
<p>(2) 患者取坐位, 围好塑料围裙, 污水桶置于患者座位前。</p>\r
<p>(3) 嘱患者每次饮入液体量 300 ~ 500mL(成人), 用压舌板刺激咽部催吐, 如此反复进行, 直至吐出液澄清无味为止。</p>\r
<p>(4) 协助患者漱口、洗脸, 嘱患者卧床休息。</p>\r
<p>(5) 整理床单位, 清理用物。</p>\r
<p>(6) 记录液名称及液量, 洗出液的量、颜色、性质、气味, 患者的一般情况, 必要时送检标本。</p>\r
<p>(二) 自动机法</p>\r
<p>自动机是利用电磁泵为动力源,通过自控电路的控制,电磁阀自动转换动作,完成向胃内注入冲洗药液,再从胃内吸出内容物的过程。此种法能自动、迅速、彻底地清除胃内容物。</p>\r
<p>1. 用物准备 手消毒液, 溶液, 自动机及附件, 内铺清洁治疗巾的治疗盘, 包(治疗碗、弯盘、镊子、止血钳、纱布数块、治疗巾、压舌板、液体石蜡棉球), 棉签, 胶布, 一次性中单, 手套, 适合型号的胃管、连接管数条, 牙垫, 听诊器, 治疗碗和吸管各1个(内盛温开水漱口, 昏迷患者除外), 带刻度盛水桶2个, 盛污物容器, 按要求备化验单、标本容器。必要时清洁治疗盘内放压舌板、手电筒。</p>\r
<p>2. 操作步骤</p>\r
<p>(1) 备齐用物携至患者床旁, 核对床号、姓名、液名称, 解释操作目的及配合方法, 以取得患者合作。</p>\r
<p>(2) 连接机, 接通电源, 检查自动机的性能。</p>\r
<p>(3) 连接管道, 将已经配好的液放入桶内, 将连接管分别与机器上的药管、胃管、排污管的管口连接; 将药管的另一端放入液桶内, 管口应浸在液面下, 排污管的另一端放入污物桶内, 胃管的另一端将与管相连接, 调节灌洗量流速, 试运行机。</p>\r
<p>(4)协助患者取左侧卧位,昏迷患者取平卧位,头偏向一侧。</p>\r
<p>(5) 打开包, 颌下、胸前铺好一次性中单及治疗巾, 将弯盘、纱布放于口角旁, 戴手套。口腔插管者检查并取出活动义齿, 放入牙垫并固定。</p>\r
<p>(6)测量胃管插管长度,润滑胃管前段,插入胃管,证实胃管在胃内后,用胶布固定,并与自动机的胃管相连,调节机参数,每次灌入量以300~500mL为宜。</p>\r
<p>(7)带有“手吸”“手冲”键的机器,先按“手吸”键,吸出胃内容物,遵医嘱留取毒物标本送检。再按“自动”键,开始进行自动冲洗。反复冲洗至吸出的液体澄清无味后,按“停机”键,机器停止工作。</p>\r

<p>(8) 过程中, 如发现管道堵塞, 
水流减慢、不流或发生故障, 可交替按“手冲”和“手吸”两键, 重复冲吸数次, 直到管路通畅; 然后按“手吸”键先吸出胃内存留液体, 再按“自动”键, 使自动继续进行。</p>\r
<p>(9) 过程中密切观察患者的生命体征, 液出入量的平衡情况, 以及洗出液的性质、颜色、气味。</p>\r
<p>(10) 完毕, 将胃管拔出, 拔管时先将胃管反折或夹住胃管末端, 以免管内液体误入气管。整理床单位及清理用物, 协助患者清洁口腔及面部, 取舒适卧位, 做好记录。</p>\r
<p>考点提示:催吐和自动机的方法。</p>\r
<p>知识链接</p>\r
<p>漏斗胃管法和电动吸引器法</p>\r
<p>1. 漏斗胃管法 将漏斗胃管经过鼻腔或者口腔直接插入胃中, 利用虹吸原理将溶液灌入胃内, 再将溶液吸引出来, 起到清部的作用。此法是最为传统和简单的方法。</p>\r
<p>2. 电动吸引器法 利用负压吸引原理,用电动吸引器连接胃管吸出胃内容物的方法。此法能迅速有效地清除胃内毒物,较节省人力,且能准确计算灌洗液量。</p>\r
<p>三、术的护理要点</p>\r
<p>(1) 时一般应选择口径相对较大(能够插入不致损伤)、硬度适宜的胃管。如果口径过小, 胃内容物容易堵塞胃管, 此时必须拔除胃管, 通畅后再行插管, 结果是延长时间, 增加毒物的吸收; 如果选择材质较软的胃管, 在回抽胃液时负压可使管壁塌陷, 导致引流不畅。</p>\r
<p>(2) 液温度宜控制在 35～38<sup>∘</sup>C 。如果水温过高，可引起消化道黏膜下血管扩张，加速毒物吸收；如果水温过低，又可刺激胃肠蠕动将毒物推向远端。因此，护士在配置液时，应把握好水温，以免增加不良反应。</p>\r
<p>(3) 当中毒物质不明时, 应抽取胃内容物及时送检。液可先选用生理盐水或清水, 待确定毒物性质后, 再选用拮抗剂的液。</p>\r
<p>(4) 时宜取左侧卧位, 保持呼吸道通畅, 清醒合作者可取坐位, 昏迷患者应将头偏向一侧, 以免发生吸入性肺炎。</p>\r
<p>(5)要注意每次灌入量与吸出量的基本平衡,每次灌入量不宜超过500mL。成人每次灌洗量宜控制在300~500mL,小儿需根据年龄而定,每次为50~200mL。如果量少,冲洗速度较慢,冲洗不彻底;量多,则可导致胃扩张或促使毒物进入肠内。经过反复冲洗,直至液澄清无味为止。</p>\r
<p>(6) 过程中, 应密切观察患者生命体征、洗出液的变化, 发现流出血性液体、腹痛及虚脱等表现, 立即停止操作, 及时通知医生进行处理。</p>\r
<p>(7)吞服强酸或强碱等腐蚀性毒物、近期有上消化道出血、主动脉瘤者均禁止。</p>\r
<p>(8)幽门梗阻患者时,宜在饭后4~6h进行,并需记录胃内潴留量。</p>\r
<p>(9) 使用自动机, 使用前应检查机器各管道衔接是否正确、紧密, 运转是否正常。勿使水流至按键开关内, 以免造成机器损坏, 用毕及时清洗, 避免污物堵塞管道。</p>\r
<p>1. 清醒的口服毒物中毒者, 首选的方法是( )。</p>\r
<p>A. 口服催吐法 B. 漏斗胃管法 C. 注洗器胃管法</p>\r
<p>D. 自动机法 E. 灌肠法</p>\r
<p>2. 清除肠内毒物最佳的时限是( )。</p>\r
<p>A. 食物中毒 3h 内</p>\r
<p>B. 食物中毒 4h 内</p>\r
<p>C. 食物中毒 6h 内</p>\r
<p>D. 食物中毒 8h 内</p>\r
<p>E. 食物中毒 10h 内</p>\r
<p>3. 下列关于幽门梗阻操作的描述, 不正确的是( )。</p>\r
<p>A. 饭后 4 ~ 6h 进行 B. 首先吸净胃内容物 C. 液温度为 25 ~ 30℃</p>\r
<p>D. 每次灌入 800mL 左右 E. 洗毕记录胃内潴留量</p>\r
<p>4.误服硫酸时,可选择( )。</p>\r
<p>A. 立即催吐 B. 服用牛奶、蛋清等保护胃黏膜 C. 生理盐水</p>\r
<p>D. 1:5000 高锰酸钾 E. 2% 碳酸氢钠溶液</p>\r
<p>5. 液的温度宜控制在( )。</p>\r
<p>A. 25～30<sup>∘</sup>C B. 30～35<sup>∘</sup>C C. 35～38<sup>∘</sup>C</p>\r
<p>D. 38～40<sup>∘</sup>C E. 40～42<sup>∘</sup>C</p>\r
<p>(禹 西 张 静)</p>\r
`},{id:"module3-task6",title:"第六节 常用的重症监护技术",order:6,rawContent:`案例导学

陈某，男，37岁，半小时前因车祸当场不省人事，伤后无呕吐、无大小便失禁、无抽搐发作，由120救护车送入急诊室。颅脑CT显示：蛛网膜下腔出血，额顶部头皮血肿。体温37.7℃，脉搏26次/分，呼吸27次/分，血压148/92mmHg，双侧瞳孔不等，左侧3mm，右侧5mm，对光反射迟钝，四肢肌张力增高，两肺呼吸音粗，可闻及痰鸣音。以脑外伤、蛛网膜下腔出血收入ICU。

请思考：

1. 作为 ICU 护士,请说出急危重症患者需要进行病情观察和监护的内容。

2. 该颅脑外伤患者需要重点监护哪些指标？

ICU 是对危重症患者进行集中全面的动态监测、强化治疗和护理的特殊医疗场所。重症监护室医护人员对患者将进行系统及不间断的监护，对危重症患者的生命体征及反映各系统功能的各项参数进行动态监测，及时判断病情变化，以便及时采取相应的治疗护理措施，抢救患者生命。危重症患者的监测主要包括心血管系统功能监测、呼吸系统功能监测、消化系统功能监测、神经系统功能监测、泌尿系统功能监测及体液平衡监测。

一、心血管系统功能监测

心血管系统功能监测反映心血管系统的功能状况,包括心脏、血管、血液、组织氧的供应与消耗,以及心脏电生理等方面的功能指标,为临床危重患者的病情观察、救治与护理工作提供重要依据。

（一）心率监测

1. 监测方法 心率(heart rate, HR)监测一般采用触摸桡动脉搏动、心前区听诊、生命体征监测仪、心电图等方法监测,其中心电图监测较为准确,若对用其他方法测定的心率结果持怀疑态度时应积极行心电图监测。

2. 正常值 正常成人安静时心率为 60～100 次/分；小儿心率稍快，一般不超过 120 次/分即为正常；老年人心率较慢，有时可低于 60 次/分。

3.心率监测的意义

(1) 心率和心排血量: 心排血量(CO) = 每搏输出量 × 心率(SV × HR)。在一定范围内, 随着心率的增加, 心排血量也会增加。当患者处于低血容量状态或高代谢状态时, 机体只能通过加快心率来提高心排血量。但当心率超过 160 次/分时, 由于心室舒张期明显缩短, 心室充盈不足, 每搏输出量减少, 从而使心排血量减少。当心率低于 50 次/分时, 由于心率减慢引起的心排血量减少, 直接影响全身各脏器的血供。进行性心率减慢是心脏停搏的前奏, 因此在重症监护过程中, 若发现患者心率超过 160 次/分或低于 50 次/分时, 应立即通知医生给予干预治疗。

(2) 心率和休克指数 (shock index, SI): 失血性休克时, 心率改变最为敏感, 故应密切监测心率的动态变化, 以及早发现失血性休克。休克指数 (SI) = 心率/收缩压 (HR/SBP), 其正常值约为 0.5。发生失血性休克时, 休克指数会增高; 当休克指数等于 1 时, 提示失血量占血容量的 20%~30%; 当休克指数大于 1 时, 提示失血量占血容量的 30%~50%。对于失血性休克患者来说, 及时发现出血和迅速判断失血量非常重要。

(3) 心率和心肌耗氧(myocardial volume of oxygen consumption, ): 心肌耗氧与心率的关系极为密切, 心率快慢与心肌耗氧呈正相关。心率与收缩压的乘积(RPP) = 心率×收缩压(HR × SBP), 反映了心肌耗氧量。心率越快, 心肌做功越多, 心肌耗氧越多。正常人 RPP < 12000, 若 RPP > 12000 则提示心肌耗氧增加和心肌缺血。

(二)心电监测

心电监测是各种危重患者的常规监测手段。普通心电图(electrocardiogram, ECG)只能简单观察描记心电图当时短暂的心电活动情况,而动态心电图检查和心电监测则是通过显示屏连续观察监测心脏电活动情况的一种无创监测方法,可适时观察病情,提供可靠的有价值的心电活动指标,并指导实时处理
,因此,对于有心电活动异常的患者,如急性心肌梗死、各种心律失常等有重要使用价值。

1. 心电监测的意义

(1)持续监测心率、心律变化,监测有无心律失常。

(2) 观察心电波形变化, 诊断心肌损害、心肌缺血及电解质紊乱。

(3) 监测药物对心脏的影响,并作为指导用药的依据。

(4) 判断起搏器的功能。

2. 心电监测的分类

(1)12 导联或 18 导联心电图: 是用心电图机进行描记而获得的即时心电图, 12 导联心电图包括 3 个标准肢体导联, 即 I、II 和 III 导联; 3 个加压肢体导联, 即 aVF、aVR 和 aVL 导联; 6 个胸导联, 即 V1 、 V2 、 V3 、 V4 、 V5 、 V6 导联。18 导联心电图是在 12 导联心电图基础上增加了 6 个胸导联, 即 V3R 、 V4R 、 V5R 、 V7 、 V8 、 V9 导联。

(2) 动态心电图: 可进行 24 ~ 48h 的动态心电监测, 常用于心律失常及心肌缺血患者, 尤其是无症状性心肌缺血的诊断与评估。但由于心电异常只能通过回顾性分析, 不能反映即时的心电图变化, 因此, 不能用于需要连续、实时心电监测的危重症患者。

(3) 心电示波监测: 通过心电监护仪连续、动态反映心电图的变化, 对及时发现心电图异常起着重要作用, 是 ICU 最常用的心电监测方法。由多台床旁心电监护仪、计算机、打印机及心电图分析仪等构成心电监护系统。

3. 标准心电导联电极位置

(1) 标准肢体导联: 属于双电极导联, I 导联为左上肢(+)、右上肢(-), II 导联为左下肢(+)、右上肢(-), III 导联为左下肢(+)、左上肢(-)。

(2) 加压肢体导联: 属于单极导联, aVR、aVL 与 aVF 导联探查电极分别置于右腕部、左腕部及左足部。

(3)胸导联:属于单极导联, V1 电极位于胸骨右缘第4肋间, V2 电极位于胸骨左缘第4肋间, V4 电极位于左侧锁骨中线与第5肋间相交处, V3 电极位于 V2 与 V4 的中点, V5 电极位于左侧腋前线与 V4 同一水平, V6 电极位于左腋中线与 V4 、 V5 电极同一水平, V7 电极位于左腋后线与第5肋间相交处, V8 电极位于左肩胛线与第5肋间相交处, V9 电极位于第5肋间同脊柱左缘水平, V4R 电极位于右锁骨中线与第5肋间相交处, V3R 电极在 V1 与 V4R 的中点, V5R 电极位于右腋后线与第5肋间相交处。

4. 常用心电监护仪导联电极位置 相对于标准心电图导联而言, 监护导联是一种模拟的、综合的导联形式。心电监护常用的连接方式有 3 个和 5 个电极。

(1)3 导联心电监护:有 3 个电极导联线,具体位置如下。①右上(RA)在胸骨右缘锁骨中线第 1 肋间;②左上(LA)在胸骨左缘锁骨中线第 1 肋间;③左下(LL)在左锁骨中线剑突水平处和(或)左下腹的位置。由于电极有限,只能获得综合 I、II、III 导联心电图。

(2)5 导联心电监护: 是目前较为常用的方法, 5 导联心电导线可
以获得 I、II、III、AVR、AVF、AVL、V 导联等心电图。导联电极具体位置: ① 右上 (RA) 位于右锁骨中线第 2 肋间; ② 左上 (LA) 位于左锁骨中线第 2 肋间; ③ 右下 (RL) 位于右腋前线肋缘处; ④ 左下 (LL) 位于左腋前线肋缘处; ⑤ 探查电极 (C) 或胸导联 (V), 通常位于胸骨第 4 肋间 (图 2-75)。

图2-75 5导联心电监护电极位置

\r
5. 操作流程 具体见图 2-76。

(三)血压监测

血压是血管内血液对单位面积血管壁产生的侧压力,可以反映心排血量和外周血管阻力,是衡量循环系统功能的重要指标。动脉血压与器官血流呈正相关,主要受心功能、外周血管阻力、有效循环血容量等因素的影响。成人安静时血压的正常范围是收缩压90~140mmHg,舒张压60~90mmHg,脉压30~40mmHg。

1. 测量方法

(1) 无创血压监测: 在危重患者监护中, 振荡加压法是目前应用最广泛的自动无创动脉血压监测方法。即上臂缚上袖套, 测压仪设置时间后可定时自动使袖套充气或放气, 通过压力换能器将肱动脉压力转换为电信号, 测压仪能够自动显示收缩压、舒张压、平均动脉压和脉率。

该仪器的特点是可根据不同年龄选择不同型号的袖套,应用对机体组织没有机械损伤的方法,间接取得有关心血管功能的各项参数,并发症少。但其局限性是易受外界因素的影响,如患者活动、患者血压过低或过高、心律失常等因素影响其准确性。

图2-76 心电监测操作流程

\r
1) 无创血压监测的优点: ①无创伤性, 适用范围广, 可重复测量; ②操作简便, 容易掌握; ③可按需定时测压, 省时省力; ④与实际动脉血压有良好的相关性, 测平均动脉压尤为准确。

2) 无创血压监测的缺点: ①不能连续监测; ②不能反映每一心动周期的血压变化; ③不能显示动脉波形; ④易受肢体活动和袖带影响, 长时间绑扎袖带可出现上肢缺血、麻木等并发症。

(2)有创血压监测:经体表动脉穿刺插入导管与监测探头到心脏和(或)血管腔内,利用监测仪直接测出血压的方法,是最准确的血压测量方法,它可以反映每一心动周期内的收缩压、舒张压和平均动脉压(图2-77)。

图2-77 有创血压监测示意图

2. 血肌酐(serum creatinine, Scr) 测定血肌酐的浓度可作为肾小球滤过功能受损的指标。血肌酐主要由肾小球滤过排出体外，在外源性肌酐摄入量稳定时，血肌酐的浓度取决于肾小球滤过能力。

(1) 正常值: 正常男性血肌酐为 0.6～1.2,mg/dL , 正常女性血肌酐为 0.5～1.1,mg/dL 。

(2) 临床意义: 各种原因所致的肾小球滤过功能减退常伴有血肌酐增高, 血肌酐增高提示肾功能受损, 如急、慢性肾小球肾炎。

3. 血尿素氮(bloo
d urea nitrogen, BUN) 监测血尿素氮的浓度可以判断肾小球滤过功能。尿素氮是体内蛋白质代谢的产物, 血尿素氮主要经过肾小球滤过而随尿排出。当肾实质损害时, 肾小球滤过功能下降, 致使血尿素氮浓度升高。

(1) 正常值: 成人为 9～20,mg/dL , 儿童为 5～18,mg/dL 。

(2)临床意义:血尿素氮增高常见于以下情况。

1) 体内蛋白质分解过度: 如大面积烧伤、急性传染病、上消化道出血等。

2) 肾前或肾后因素引起的尿量显著减少、无尿: 常见的肾前性因素有脱水、水肿、腹水、循环系统衰竭等; 常见的肾后性因素有尿路结石或前列腺增生引起的尿路梗阻等。

3) 肾脏疾病: 如慢性肾炎、肾动脉硬化症、严重肾盂肾炎、肾结核和肾肿瘤晚期等。应当注意的是, 肾功能损害较轻时, 血尿素氮可无变化。因此, 血尿素氮不能作为肾脏疾病的早期功能测定指标, 但对尿毒症的诊断有重要价值。

4. 肾脏浓缩和稀释功能试验 是监测肾小管重吸收功能的重要指标。

(1) 监测方法: 在试验的 24h 内, 患者保持日常的饮食和生活习惯, 当日早晨 8 时排尿后, 测定昼尿量(晨8时至晚8时的尿量总和)、夜尿量(晚8时至次日晨8时的尿量总和)及其比重。

(2) 正常值: 昼尿量与夜尿量之比为 (3～4):1 ，且夜尿量 <750mL。至少有一次尿比重 >1.020（多为夜尿），有一次尿比重 <1.003，最高尿比重与最低尿比重之差应大于 0.009。

(3)临床意义:具体如下。

1) 夜尿增多常提示肾功能不全。

2) 昼、夜尿量接近且尿比重降低, 常提示肾脏浓缩功能不全。

3) 尿比重固定在 1.010 左右, 常提示肾功能严重损害, 见于慢性肾炎、原发性高血压等。

4) 尿量少而尿比重增高常提示肾前性少尿。

5)24h 尿量 >4L, 且尿比重均 <1.006, 常见于尿崩症。

考点提示:泌尿系统功能监测的要点和意义。

六、体液平衡监测

体液平衡的监测指标通常包括电解质和酸碱平衡两部分。

(一)电解质监测

1. 血清钠监测 正常值为 135～145,mmol/L 。

(1) 低钠血症: 血清钠 < 135 mmol/L 为低钠血症。

1) 临床意义: 低钠血症常见于大量消化液丢失、大面积创面渗液及使用排钠利尿药等所致的低渗性缺水; 血钠浓度越低, 病情越重。根据缺钠程度的不同, 分为轻度低钠血症、中度低钠血症和重度低钠血症。血清钠浓度在 130 ~ 135 mmol/L 为轻度低钠血症; 血清钠浓度在 120 ~ 129 mmol/L 为中度低钠血症; 血清钠浓度 < 120 mmol/L 为重度低钠血症。低钠血症临床表现为疲乏、头晕、手足麻木、恶心呕吐、低血压、尿量少、尿中钠和氯的含量下降、神志不清等一系列神经症状, 其症状严重程度与血钠值和血钠降低速度有关。重度低钠血症会出现严重症状, 甚至死亡。

2) 补液原则: 低钠血症伴血容量过低者, 可静脉输注生理盐水或高渗盐水以纠正低钠血症, 同时补充血容量; 重度低钠血症有生命危险者, 必须补充高渗盐水, 如 3%~5% 氯化钠溶液; 轻度低钠血症伴充血性心力衰竭者, 应限制液体输入量 (1000mL/d 左右); 低钠血症伴血容量过多者, 应在限液前提下给予呋塞米或依他尼酸, 必要时给予高渗盐水。

(2) 高钠血症: 血清钠 > 145 mmol/L 为高钠血症。

1) 临床意义: 高钠血症常见于摄入水分不足或丧失水分过多而导致的高渗性缺水。临床表现以神经系统症状为主, 患者可有口渴、烦躁、嗜睡及震颤、肌张力增高等, 初期症状的轻重与渗透压高低和血钠增高速度有关; 血钠值达 165 ~ 170mmol/L, 血浆渗透压高于 350mmol/L 时, 患者可出现抽搐、惊厥、昏迷等严重表现。

2) 补液原则: 能口服者给予饮水; 无法口服者可静脉滴注 5% 葡萄糖溶液或 0.45% 氯化钠溶液, 补充丧失的液体量。所需补充液体量可根据临床表现估计失水量占体重的百分比, 再按每丧失体重的 1% 补液 400~500mL 计算, 分两天补给, 补液
过程中应加上每天 2000mL 的生理需要量。注意事项: 应严密监测全身情况及血钠浓度, 以便医护人员掌握病情和疗效, 并为次日调整补给量提供依据。通常情况下, 高钠血症患者缺水多于缺钠, 但实际上也存在缺钠, 因而补水的同时还应补钠, 否则会引起低钠血症; 补液速度不宜过快, 以防引起脑水肿, 一般应在尿量 >40mL/h 后补钾, 经上述补液治疗后若存在酸中毒, 可酌情补给 5% 碳酸氢钠溶液。补液速度应先快后慢, 每 8~12h 根据临床表现及检测结果, 包括血 Na+ 与 Cl- 浓度、动脉血气分析和中心静脉压等, 随时调整输液计划。

2. 血清钾监测 正常血清钾浓度为 3.5 ~ 5.5 mmol/L。

(1) 低钾血症: 血清钾 <3.5 mmol/L 为低钾血症。

1) 临床意义: 常见于钾离子向细胞内转移、钾摄入不足或丢失所致。当缺水被纠正后, 易出现低钾血症, 低钾血症可致代谢性碱中毒。

2) 补钾原则: 积极处理病因, 采取分次补钾方法。能口服者尽量口服补钾; 无法口服钾剂者, 经静脉补给。补钾量可参考低钾血症严重程度, 每天补钾 40 ~ 80mmol 不等。静脉补钾注意事项: 输液中 K+ 浓度应 ⩽ 40mmol/L (相当于氯化钾 3g/L); 补钾速度应 <20mmol/h, 且见尿补钾。

(2)高钾血症:血清钾>5.5mmol/L为高钾血症。

1) 临床意义: 常见于酸中毒所致的钾离子细胞外转移及肾脏排泄功能受损、大量输血等情况。高钾血症可导致患者心搏骤停, 一经诊断, 应立即积极治疗。

2) 处理原则: 应立即停用一切含钾的药物或溶液; 通过静脉输注碳酸氢钠溶液、葡萄糖溶液及胰岛素等促使 K+ 转入细胞内; 口服阳离子交换树脂、透析疗法等降低血钾浓度; 静脉注射 10% 葡萄糖酸钙溶液 20mL 或氯化钙 10mL, 以缓解 K+ 对心肌的毒性作用。

3. 血清镁监测 正常值为 0.8～1.2,mmol/L 。

临床意义: 血清镁 <0.8 mmol/L 为低镁血症, 可见于饥饿、吸收障碍综合征及长期胃肠消化液丢失, 如肠瘘患者; 血清镁 >1.2 mmol/L 为高镁血症, 主要见于肾功能不全患者。

4. 血清钙监测 正常值为 2.1 ~ 2.55 mmol/L。

临床意义: 血清钙 <2.1 mmol/L 为低钙血症, 常见于重症急性胰腺炎、肾功能障碍及甲状旁腺受损等情况; 血清钙 >2.55 mmol/L 为高钙血症, 常见于小肠吸收增多、维生素 D 摄入过量、骨破坏增多、甲状旁腺功能亢进等。

(二)酸碱平衡监测

1. 酸碱平衡常用监测指标

(1)酸碱度:正常值为7.35~7.45,平均值为7.40。pH<7.35为酸中毒,pH>7.45为碱中毒。酸碱度是一个综合性指标,既受代谢因素影响,又受呼吸因素影响。

(2) 动脉血二氧化碳分压( PaCO2 ): 指血液中物理溶解的二氧化碳分子所产生的压力, 主要受呼吸性因素影响, 是酸碱平衡中反映呼吸因素的指标, 正常值为 35～45mmHg 。临床上以 PaCO2⩾50mmHg 作为诊断Ⅱ型呼吸衰竭的实验室依据。

(3) 动脉血氧分压( PaO2 ): 指血液中物理溶解的氧分子所产生的压力, 正常值为 80 ~ 100mmHg。用于判断缺氧及其程度。①轻度缺氧: PaO2 为 60 ~ 80mmHg; ②中度缺氧: PaO2 为 40 ~ 60mmHg; ③重度缺氧: PaO2<40mmHg 。临床上以 PaO2<60mmHg 作为诊断呼吸衰竭的标准。

(4) 动脉碳酸氢根离子浓度: 用标准碳酸氢盐 (SB) 和实际碳酸氢盐 (AB) 表示。SB 是血液温度在 37∘C 、血红蛋白充分被氧饱和的条件下, 用 PaCO2 为 40mmHg 的气体平衡后所测得的 HCO3- 浓度, 排除了呼吸因素对它的影响, 是判断代谢性酸碱平衡失调的定量指标。AB 是指未经气体平衡处理的人体血浆中 HCO3- 的真实含量 (血气报告中的 HCO3- 即指 AB), 是血浆中 HCO3- 的真实浓度, 与 SB 相比, AB 包括呼吸因素的影响。正常人两者的数值是一致的, 即 AB 应等于或接近于 SB, 正常值为 22～27mmol/L 。当两者均升高, 且 AB > SB 时, 见于代谢性碱中毒或呼吸性酸中毒代偿; 当两者均降低, 且 AB < SB 时, 见于代谢性酸中毒或呼吸性碱中毒代偿。

(5)动脉血氧饱和度( SaO2 ):指单位血红蛋白含氧百分数,正常值约为97%。

(6) 碱剩余(BE): 指在标准条件下, 即血液温度 37∘C 、 PaCO2 40mmHg、 SaO2 100% 的情况下, 将 1000mL 血浆或全血用酸或碱滴定至 pH 值为 7.4 时所需的酸或碱量。正常值为 ±3mmol/L 。

考点提示:酸碱平衡常用监测指标及其含义。

2. 判断酸碱失衡的步骤 在血液酸碱平衡监测中, pH 值、 PaCO2 、 HCO3- 浓度或 BE 是反映机体酸碱平衡的三大基本要素。pH 值是判断血液酸碱度的指标; PaCO2 反映呼吸性因素, 是判断呼吸性酸碱失衡的指标； HCO3- 浓度反映代谢性因素， HCO3- 浓度或 BE 是判断代谢性酸碱失衡的指标。三者在对酸碱失衡的分析过程中具有重要意义。

第一步:根据 pH 值来判断有无酸中毒或碱中毒。再根据 PaCO2 与 HCO3- 浓度(或 BE)两个指标的变化关系,判断是呼吸性因素还是代谢性因素,进而结合 pH 值判断机体的代偿情况,同时应将酸碱紊乱的时间因素考虑在内。

当 PaCO2 与 HCO3- 浓度(或 BE)呈反向变化, 即一个指标值增高, 另一个指标值降低时, 应诊断为复合型酸碱失衡(相加型)。当 PaCO2 与 HCO3- 浓度(或 BE)呈同向变化, 即两个指标同时增高或同时降低时, 可能会有两种情况: 一种是单纯性的酸碱失衡, 其中一个指标值的变化是原发性改变, 而另一指标值的变化是继发的代偿性改变, 原发的失衡决定了 pH 值是偏酸还是偏碱。另一种是复合型酸碱失衡(相消型), 即两种变化均为原发性改变。单纯性的酸碱失衡和复合型酸碱失衡的鉴别需要根据代偿的时间、代偿的限度等进行综合分析。

第二步:判断酸碱失衡应根据病因、病情、电解质、血气分析、治疗措施、结果及临床表现等进行动态的综合分析。在以上判断的基础上应结合临床情况进一步验证判断的准确性,必要时应反复多次进行测定或动态持续监测作出最可靠的判断。

考点提示: 水钠代谢紊乱、钾代谢异常、酸碱平衡失调。

目标检测

1. 下列疾病不属于 ICU 收治对象的是( )。

A. 
MODS B. 严重心肌梗死 C. 严重低钾血症

D. 甲状腺危象 E. 肺癌晚期

2. ICU 收治病种不包括( )。

A. 恶性肿瘤晚期

B. 多器官功能衰竭

C. 急性中毒、毒蛇咬伤

D. 大面积烧伤

E. 各类休克

3. ICU 病房的温度应保持在( )。

A. 16～20∘C B. 18～22∘C C. 20～25∘C

D. 25～28∘C E. 26～30∘C

4. ICU 中比较合理的护士与床位数之比为( )。

A. 1:2

B. 1:1

C. (1~2):1

D. (2~3):1

E. (3~4):1

5. 综合性医院 ICU 床位占总床位数的( )较为合适。

A. 0.5%~1%

B. 2%~8%

C. 1%~2%

D. 3%~5%

E. 5%~10%

6. 血容量正常时, 休克指数为( )。

A. 0.3 B. 0.4 C. 0.5

D. 0.6 E. 1

7. 下列关于酸碱平衡监测的描述, 错误的是( )。

A. pH 反映血液的酸碱度, 正常值为 7.35 ~ 7.45

B. 标准碳酸氢盐用 SB 表示

C. 实际碳酸氢盐用 AB 表示

D. 正常人的 AB 高于 SB 的数值

E. 正常人的 AB 与 SB 的数值一致

8. 正常人昼、夜尿量比为( )。

A. (1～2):1 B. (2～3):1 C. (3～4):1 D. (4～5):1 E.以上都不对

9. 最高尿比重低于( )，表示肾脏浓缩功能不全。

A. 1.006 B. 1.008 C. 1.010

D. 1.012 E. 1.018

10. 下列不属于中心静脉置管常见并发症的是( )。

A. 损伤胸导管致乳糜胸 B. 气胸 C. 空气栓塞

D. 局部血肿 E. 心律失常

(张 静 禹 西 王丹凤)

1)有创血压监测的优点:①除监测血压外,还可通过动脉压的波形初步判断心脏功能,评估右心室收缩能力;②经穿刺导管抽取动脉血标本,监测机体电解质、酸碱度变化;③通过动脉波形描记可了解心脏情况,判断是否有心律失常;④在体外循环转流时,动脉搏动消失,无创方法不能测到血压时,但有创血压监测仍能连续监测动脉压。

2)有创血压监测的缺点:相对无创血压监测,有创血压监测发生并发症的概率大。最常见的并发症是血栓形成,严重时会导致肢体缺血,甚至坏死。此外,还可发生出血、感染、动静脉瘘等并发症。

3)并发症的防治措施:①穿刺针不宜太粗,尽可能地减少动脉损伤;②严格无菌操作;③留置期间应定时用肝素稀释液加压冲洗测压管道系统;④置管时间不宜太长,一般不超过7天。

2. 临床意义

(1) 收缩压: 主要由心肌收缩力和心排血量决定, 其重要性在于克服各脏器的临界关闭压, 保证脏器的供血。如肾的临界关闭压为 70,mmHg , 当收缩压低于此值时, 肾小球缺血、滤过率减小, 发生少尿。

(2)舒张压:主要由外周血管阻力决定,其重要性在于维持冠状动脉灌注压。

(3) 脉压: 收缩压与舒张压之差, 与心脏每搏输出量和血容量有关。
大量心包积液或血容量不足时, 脉压减小。

(4) 平均动脉压: 心动周期每一瞬间动脉血压的平均值。平均动脉压 = 舒张压 + 1/3 脉压。平均动脉压与心排血量和体循环血管阻力有关, 是反映脏器组织灌注良好与否的指标之一。

考点提示:有创动脉压和无创动脉压的区别。

(四) 中心静脉压监测

中心静脉压(central venous pressure, CVP)是指胸腔内上、下腔静脉内的压力,主要反映右心前负荷和血容量,以此判断右心功能和血容量的多少。

1. 适应证

(1) 需要持续测定中心静脉压用于评估右心功能或血容量, 如大中型手术、休克、脱水、失血、容量不足、右心功能不全等。

(2)为大量静脉输血、输液或需要完全胃肠外营养支持的患者提供静脉通道和监测。

2. 正常值 5～12,cmH2O(0.49～1.18,kPa) 。

3. 临床意义 CVP 能反映循环血量和右心功能之间的关系,对指导治疗具有重要的参考价值。小于 5,cmH2O 提示右心房充盈不良或血容量不足;大于 20,cmH2O 提示右心功能不全或血容量超负荷。CVP 监测对指导临床输液输血的量及速度、防止心脏过度负荷及指导应用利尿药等具有重要的参考意义(表 2-5)。

表 2-5 中心静脉压与血压综合判断的临床意义及处理原则

\r
注: 补液试验是指取等渗盐水 250mL, 在 5~10min 内静脉滴入。若血压升高而 CVP 不变, 提示血容量不足; 若血压不变而 CVP 升高 3~5cmH₂O, 提示心功能不全。

4. 测量方法 临床通常有开放式测压(通过标尺计压)和密闭式测压(通过换能器计压)两种。密闭式测压可连续监测,但物品准备较为复杂,该内容需要到临床进一步学习。手动监测虽然传统,但原理清晰,用物准备简单,以下主要讲述手动开放式测压方法。

(1) 患者准备: 测压前患者需做好中心静脉置管, 根据情况选择中心静脉导管 (CVC) 置管或经外周置入的中心静脉导管 (PICC) 置管。

图2-78 中心静脉压简易测压示意图

\r
(2)测压装置:包括测压管、输液管、三通开关、标尺等(图2-78)。

1) 零点调节: 患者取平卧位, 将测压管刻度零点调至与第 4 肋间腋中线右心房水平处, 确保管道通畅。

2) 测压准备: 初次测压患者, 注意三通开关的状态, 保证测压管液面略高于正常 CVP 值, 但不能从顶端管口流出。

3) 开始测压: 调节三通开关, 待测压管液面静止时观察测压管高度, 此时刻度所指为患者 CVP 值。

4) 测压结束: 调节三通开关, 输液管和静脉导管相通, 开放输液通路后选择继续输液或封管。

(3)测压时应注意:①标尺应保持竖直,否则计压可大于实际压力;②标尺零点应与患者右心房中点(第4肋间腋中线位置)处于同一水平;③测压管道内应保持通畅,避免气泡或血栓形成。对于怀疑有右心病变的患者,可采用换能器计压,通过CVP波形变化反映右心功能。

5. 监测要点

(1) 中心静脉压测量的时间间隔应视病情而定, 病情不稳定时, 须每隔 30 ~ 60min 监测 1 次; 一般情况下, 每 2h 监测 1 次并做好记录, 直至患者病情平稳。

(2) 患者体位改变时, 测压前应重新调节零点, 以保持测压管零点始终与右心房在同一水平线上。

(3) 测压时, 应先排尽测压管中的气泡, 防止气体进入静脉内造成
空气栓塞并影响中心静脉压值的准确性。

(4) 每次测压后及时将三通管转向肝素盐水输入通路做持续点滴, 防止血凝块堵塞静脉。应用监护仪连续测定中心静脉压时, 要采用持续冲洗装置, 以保持测压管道的通畅。

(5)需利用测压的静脉通路输液时,可通过连接另一个三通管进行。一般情况下,不宜在此输液瓶内加入血管活性药物、钾溶液及其他急救药物,防止测压时中断上述药物的输入或测压后药物随溶液快速输入体内而引起血压或心律的变化,甚至危及生命。

(6) 中心静脉压测量应在患者平静的状态下进行, 对机械通气治疗时应用呼气末正压通气 (PEEP) 者, 若病情许可, 应暂时停用 PEEP。患者咳嗽、腹胀、烦躁时, 应予以处理, 待其安静 10 ~ 15min 后再行测压。

(7)随时观察测压管内的液平面能否随患者的呼吸而微微地上下波动,以判断测压管是否通畅。若管内液面无波动或液面过低,可能为静脉内导管堵塞、受压、漏液或导管尖端顶于血管壁等原因所致,应及时处理。

(8)防止污染,每天消毒静脉穿刺部位并更换敷料1次,定时更换测压管道,严格无菌操作,尽量减少抽血、静脉注射的机会。

6.并发症及防治

(1) 出血和血肿: 颈内静脉穿刺时, 穿刺点或进针方向偏内时, 易穿破颈动脉, 进针太深可能穿破椎动脉和锁骨下动脉, 在颈部形成血肿, 肝素化后或凝血机制不好的患者更易发生。因此, 穿刺前应熟悉局部解剖, 掌握穿刺要点, 一旦误穿入动脉, 应做局部压迫。对于肝素化患者, 更应延长局部压迫时间。

(2) 心律失常: 导管插入过深时, 其顶端会进入右心房或右心室, 对心肌造成机械性刺激而诱发心律失常。预防方法: 在操作过程中要确保导管前端位于距右心房入口 2cm 处。

(3) 感染: 中心静脉置管感染率为 2%~10%, 因此, 在操作过程中应严格遵循无菌操作技术; 加强置管护理, 导管每天用肝素溶液冲洗, 穿刺点每天消毒并更换无菌敷贴。

(4)其他:包括气胸、血胸、气栓、血栓、神经和淋巴管损伤等。虽然发病率很低,但后果严重。因此,必须加强预防措施,熟悉局部解剖,认真操作,一旦出现并发症,应立即采取积极处理措施。

考点提示: CVP 监测的方法和意义。

(五)肺动脉楔压监测

肺动脉楔压(PAWP)是指漂浮导管在肺小动脉楔入部位所测得的压力。

1. 正常值 6~12mmHg。

2. 适应证 ①急性呼吸窘迫综合征(acute respiratory distress syndrome, ARDS)并发左心衰；②循环功能不稳定时；③区分心源性肺水肿和非心源性肺水肿。

3. 临床意义 用于评估左心前负荷和右心后负荷,有助于判定左心室功能,反映血容量是否充足。PAWP > 12mmHg 提示左心功能不全、急性肺水肿;PAWP < 6mmHg 提示体循环血量不足。PAWP 是诊断急性肺损伤和 ARDS 的重要指标。

二、呼吸系统功能监测

呼吸系统功能监测的主要目的是对患者的呼吸运动、通气功能、气体交换功能及动脉血气分析等方面进行评估,了解危重患者呼吸与气体交换功能的动态变化,便于观察病情和调整治疗方案,以及对呼吸治疗方法的有效性作出合理的评估等。

(一)呼吸运动监测

1. 呼吸频率(respiratory rate, RR) 指每分钟的呼吸次数, 反映患者通气功能及呼吸中枢的兴奋性, 是呼吸功能监测中最简单、最基本的监测项目。RR 可用简单的目测计数, 也可用仪器测定。正常成人呼吸频率为 10 ~ 18 次/分, 小儿呼吸频率随年龄变小而增快。如成人呼吸频率 <6 次/分或 >35 次/分均提示呼吸功能障碍。

2. 呼吸节律 指呼吸的规律性,正常呼吸应该是节律自然而均匀。观察呼吸节律的变化,能够及时发现异常呼吸类型,提示病变部位,如伴有喘鸣和呼气延长的呼吸状态多由慢性阻塞性
肺疾病所致;呼吸频率快、潮气量小、无气道狭窄和阻塞却有呼吸急促表现的,可见于肺或胸廓限制性通气障碍、急性呼吸窘迫综合征、心脏疾病和其他心肺以外疾病。

3. 呼吸周期的吸呼比 指一个呼吸周期中吸气时间与呼气时间之比。正常吸呼比为 1: (1.5 ~ 2)，吸呼比的变化反映肺的通气与换气功能。可通过直接目测或使用人工呼吸机(非控制呼吸时)呼吸活瓣的运动情况进行评估，精确测量时需通过呼吸功能检测。

4. 胸、腹式呼吸运动的监测 胸式呼吸是指以胸廓活动为主的呼吸,腹式呼吸是指以膈肌运动为主的呼吸。一般男性及儿童以腹式呼吸为主,女性以胸式呼吸为主,但实际上两种呼吸方式很少单独存在或截然分开。其主要监测胸、腹式呼吸是否同步及双侧是否对称、有无异常呼吸体征等。胸式呼吸减弱或消失,可能为两侧胸部皆有疾患或高位截瘫,也可见于骨骼肌松弛药(肌松药)完全降解前存在一定残留的肌松作用;吸气三凹征提示上呼吸道梗阻;呼气性呼吸困难提示下呼吸道梗阻。

(二)通气功能监测

1. 潮气量(tidal volume, VT) 指在平静呼吸时,一次吸入或呼出的气体量。VT 可用肺功能监测仪或肺量仪直接测定。由于测定方便,VT 已成为呼吸容量中最常用的测定项目之一。VT 正常值为 8 ~ 12mL/kg,平均约为 10mL/kg,男性略大于女性。VT 反映人体静息状态下的通气功能,在使用人工呼吸机时还可以通过测定吸气与呼气 VT 的差值来反映呼吸管道的漏气情况。

2. 每分通气量(minute ventilation, MV 或 VE) 指在静息状态下每分钟呼出或吸入的气体量, 是肺通气功能最常用的监测指标之一。MV = VT × RR。正常值为 6 ~ 8L/min, 成人 MV > 10L/min 则提示通气过度, MV < 4L/min 则提示通气不足。

3. 生理无效容积(volume of physiological dead space, VD) 指解剖无效腔与肺泡无效腔的容积之和。解剖无效腔指从口、鼻、气管到细支气管之间的呼吸道所占的空间，肺泡无效腔指肺泡中未参与气体交换的空间。健康人平卧时解剖无效腔与生理无效腔容积近似相等，疾病时生理无效腔容积可增大。VD/VT 的值反映通气的效率，正常值为 0.2 ~ 0.35，主要用于评价无效腔对患者通气功能的影响，有助于寻找无效腔增加的原因。

4. 肺泡通气量(alveolar ventilation, VA) 指在静息状态下每分钟吸入气量中到达肺泡进行气体交换的有效通气量。 VA=(VT-VD)×RR 。正常值为 4.2L/min，它反映了真正的气体交换量。

5. 呼气末二氧化碳 (end-tidal carbon dioxide, )  监测包括呼气末二氧化碳分压 (pressure end-tidal carbon dioxide, )、呼出二氧化碳浓度、呼出二氧化碳波形及其趋势图监测, 属于无创监测, 可反映肺通气功能状态和计算二氧化碳的生产量, 同时也可反映循环功能、肺血流量情况等。  监测现已成为临床常用的监测方法, 在手术室、ICU 和急诊科均应用广泛, 可监测气管插管的位置是否正确、自主呼吸是否恢复、机械通气参数设定是否合理及心肺复苏是否有效等。

(1) PETCO2 监测的原理: 可根据红外线光谱原理、食谱原理或分光原理测定呼气末部分气体中的 CO2 分压,
 其中红外线光谱法的应用最为广泛, 主要利用 CO2 能吸收波长为 4.3μm 的红外线这一特征, 使红外线光数量衰减, 其衰减程度与 CO2 浓度成正比。

(2) PETCO 2 监测的临床意义: 具体如下。

1) 判断通气功能: PETCO2 的正常值是 35～55mmHg 。对于无明显心、肺疾病的患者, 常根据 PETCO2 与 PaCO2 的监测结果来判断患者的通气功能状况, 并可据此调节通气量, 以避免通气过度或不足。

2) 反映循环功能: PETCO2 在一定程度上也反映了循环系统功能。低血压、低血容量、休克及心力衰竭时, 随肺血流量减少, PETCO2 也降低, 呼吸、心跳停止时, PETCO2 迅速降为零。

3) 判断人工气道的位置与通畅情况: 通过 PETCO2 监测有助于判断气管插管是否在气管内及判断气管－食管导管的正确位置。气管插管移位误入食管时, PETCO2 会突然降低接近于零: 气管－食管导管的导管双腔中随呼吸有明显 PETCO2 变化的腔应为气管插管开口。另外, 通过 PETCO2 监测可了解气管与气管内导管的通畅情况, 当发生阻塞时, PETCO2 和气道压均升高。

(三)脉搏血氧饱和度

脉搏血氧饱和度(pulse oxygen saturation, SpO2 ) 是通过动脉脉搏分析来测定血液在一定氧分压下氧合血红蛋白占全部血红蛋白的百分比。

1. SpO2 监测的方法 临床上 SpO2 通常是用脉搏血氧饱和度测定仪来监测获得的，脉搏血氧饱和度测定仪是一种对周围组织中动脉血的氧饱和度进行持续非创伤性监测的仪器。成人多用指夹法，如果患者指甲较厚或末梢循环较差时选用耳朵法，小儿监测时多采用耳朵法。

2. SpO2 监测的原理 血红蛋白具有光吸引的特性,但氧合血红蛋白与游离血红蛋白吸收不同波长的光线,利用光线分度计比色原理,可以监测得到随动脉搏动血液中氧合血红蛋白对不同波长的吸收光谱,而间接了解患者血氧分压的高低,判断氧供情况。

3.  监测的临床意义  的正常值为 96%～100% 。临床上  与  有显著的相关性，  在临床重症监护方面应用广泛，常用于监测呼吸暂停、发绀和缺氧的严重程度。  时常提示有低氧血症。但一氧化碳中毒时由于碳氧血红蛋白与氧合血红蛋白的吸收光谱非常近似，严重的低氧血症可能被正常监测结果掩盖。因此，一氧化碳中毒时不能以  监测结果来判断是否存在低氧血症。

考点提示: SpO2 的监测方法及临床意义。

(四) 动脉血气分析监测

血气分析是危重患者监测中必不可少的项目,通过血气分析可以监测患者的氧合状况及酸碱平衡情况,为危重患者的诊断与治疗提供可靠依据。目前临床上常用的血气分析为有创血气分析。

1. 监测项目和指标 血 pH 值、 PaCO2 、 PaO2 、 HCO3- 、 SaO2 等。

2. 血气分析标本的留取 一般选择较易扪及或较暴露部位的动脉进行穿刺采取血样。在抽取动脉血气标本时，必须先用肝素稀释液湿润注射器或使用特殊血气分析注射器，在抽取动脉血样前推净注射器内的液体和气泡。选择在动脉搏动最明显处进针采血 2mL。采血后应立即拔出针，并将针头插入准备好的胶塞内密封，使之与空气隔绝。这时将注射器轻摇，使血液和肝素充分混匀，防止凝血。

3. 影响血气分析结果的因素

(1) 心理因素: 患者在抽血样时恐惧、烦躁不安、精神紧张而诱发快速呼吸, 则可导致 PaCO2 降低; 若患者因害怕疼痛而屏气, 则可发生通气不足导致 PaCO2 升高。烦躁、精神紧张患者需休息 30min, 必要时可使用镇静剂。

(2)采血量及肝素浓度:肝素浓度是保证血气分析结果准确的核心,肝素用量过多可造成稀释性误差,使pH值与 PaO2 值偏低、 PaCO2 值偏高,出现假性低碳酸血症。但肝素用量过少,便起不到抗凝的作用。国际生化联合会(IFCC)推荐血气标本中肝素的最终浓度为50U/mL。

(3)采血部位与进针角度:动脉采血部位应选择侧支循环丰富、外周浅表易扪及、大小合适、进针时疼痛少的动脉。桡动脉为最适合的穿刺部位。桡动脉无法穿刺时可选择足背动脉、肱动脉、股动脉。

(4) 血标本有气泡: 气泡会影响血气的 pH 值、 PaCO2 、 PaO2 检测结果, 特别是 PaO2 值。理想的血气标本, 其空气气泡应低于 5%。

(5)采血时机:要适合,患者在吸氧情况下会明显影响动脉血气分析结果。要正确了解患者是否出现了呼吸衰竭,病情许可的情况下可停止吸氧30min,可在机械通气设置参数30min后采血进行血气分析。

(6)标本送检时间:标本应及时送检。 PaCO2 、 PaO2 和乳酸的检测必须在 15min 内完成,其余项目如 pH 值、电解质、BUN、血红蛋白、血细胞比容和血糖的检测,要求在 60min 内完成。乳酸标本在检测前必须将其保存在冰箱(冰水)中。其他检测项目的标本可在室温或冰水中保存,应不超过 1h。

三、消化系统功能监测

胃肠与肝脏功能障碍时会引起机体内环境与全身功能状态的改变。因此，危重症患者消化系统功能状态的监测与维护对改善危重症患者的预后至关重要。消化系统功能监测主要包括肝功能监测、胃肠功能监测和腹内压监测。

(一) 肝功能监测

肝脏是人体重要的代谢器官和消化器官,同时具有强大的解毒功能和储存功能,因此,监测重症患者的肝功能具有重要意义。肝功能监测是通过各种生化试验方法监测与肝脏代谢有关的各项指标,以观察肝功能的基本情况。

1. 精神症状与意识状态监测 肝功能失代偿易诱发肝性脑病,患者常会出现精神症状及意识障碍的表现。监测患者精神症状与意识状态的表现是监测肝功能的一项简便内容。

2. 病原学监测 我国肝炎患者主要是乙型肝炎,近年来丙型肝炎患者也在不断增加,且乙型肝炎和丙型肝炎是肝炎后引起肝硬化的主要原因,也是肝功能衰竭的主要原因。可通过病原学监测患者的甲、乙、丙、戊型肝炎病毒来判断患者有无肝炎及肝炎的类型。

3. 血清蛋白监测 血清总蛋白(total protein, TP)是血清白蛋白(serum albumin, ALB)与血清球蛋白(serum globulin, GLB)的总称。血清总蛋白的正常值是60~80g/L；血清白蛋白的正常值是40~50g/L；血清球蛋白的正常值是20~30g/L；血清白蛋白/球蛋白(A/G)为(1.5~2.5):1。白蛋白的含量与肝细胞的数量成正比，白蛋白逐渐下降
时预后多不佳。白蛋白少于25g/L易出现腹水。A/G倒置提示肝功能严重损伤。

4. 血清酶学监测 肝脏含有大量参与机体代谢及解毒的酶, 当肝细胞膜受损或细胞坏死时, 丙氨酸转氨酶(ALT)、天冬氨酸转氨酶(AST)、胆碱酯酶等入血增多。测定各种酶的变化, 对了解和评估肝脏功能具有重要的临床意义。

5. 血氨监测 体内蛋白质产生具有毒性的氨,肝脏能够将氨合成为尿素,经肾脏排泄。血氨正常值为 18～72μmol/L 。肝功能严重受损时血氨升高,易导致肝性脑病。

6. 凝血功能监测 肝功能受损时检查凝血功能异常的常用指标有凝血酶原时间(prothrombin time, PT)、活化部分凝血酶原时间(activated artial troboplatin time, APTT)、凝血酶凝固时间及肝促凝血酶原激酶试验等。

7. 黄疸监测 黄疸可分为溶血性黄疸、肝细胞性黄疸和梗阻性黄疸。黄疸的出现是肝功能障碍的重要表现之一，生化检验主要表现为血清胆红素升高。血清总胆红素(serum total bilirubin, STB)的正常值是3.4~17.1μmol/L，其中直接胆红素(direct bilirubin, DBIL)的正常值为0~7.32μmol/L，间接胆红素(indirect bilirubin, IBIL)的正常值为0~13.68μmol/L。各种类型的黄疸都会出现STB的升高：肝细胞性黄疸表现为直接胆红素和间接胆红素均升高；梗阻性黄疸以直接胆红素升高为主；溶血性黄疸主要表现为间接胆红素升高。

(二) 胃肠功能监测

胃肠道是对严重创伤、休克、严重感染、大面积烧伤、严重颅脑损伤等反应比较强烈的部位。胃肠道黏膜又是全身代谢最活跃的器官之一，更是体内最大的细菌库，胃肠道黏膜屏障能阻止胃肠道内细菌及其分解产物经肠壁移至机体内。胃肠功能，特别是胃肠道黏膜屏障功能，已成为判断危重症患者预后的一个重要条件。目前临床常用的胃肠道功能监测方法有胃液监测、胃潴留监测、胃肠黏膜内pH值监测等。

1. 胃液监测 胃液是胃黏膜不同腺体细胞分泌的混合液体,除含水(91%~97%)外,还含有盐酸、酶(如胃蛋白酶)、黏液、内因子、电解质等,其分泌量受食物影响最大。正常空腹胃液量为30~50mL,清晰无色或因含有黏液而呈稍混浊的灰白色液体,pH值为0.9~1.8。严重创伤、感染、休克等应激状态可引起胃液分泌增加,易出现以胃黏膜糜烂、溃疡和出血为特征的急性胃黏膜病变。胃内酸性环境可促进胃内细菌的生长繁殖,引起细菌移位,成为内源性院内感染的重要因素之一,因此,对重症患者进行胃液pH值监测具有重要意义。

(1) 目的: 胃液检查可了解胃的分泌功能和胃液中有无病理性成分, 辅助诊断胃、十二指肠病和其他影响胃分泌功能的疾病, 也可用于探索某些疾病的发病机制和病理生理。

(2) 测量方法: 患者在空腹状态下插入胃管, 顶端置于胃腔的最低位。抽尽空腹胃液, 然后收集

60min 的基础胃液。随即肌内注射五肽胃泌素(6μg/kg)或磷酸组胺(40μg/kg)，每15min收集1份胃液，共4份。各份胃液标本分别做以下检查：①记录胃液量、颜色、气味，有无食物残渣；②测定胃液的酸碱度，定量检测胃液的总酸分泌量；③需要时在显微镜下观察空腹胃液有无红细胞、白细胞及结核分枝杆菌，以协助诊断。

(3)临床意义:①在未进食情况下胃液量明显增多( ⩾ 100mL),提示胃分泌量过高或胃蠕动能力减慢。②胃液呈咖啡色或为血性液,提示上消化道出血;胃液呈黄色或草绿色,提示胆汁反流。③正常人的基础胃酸排出量为0~5mmol/h,经五肽胃泌素或磷酸组胺刺激后的最大胃酸排出量为10~30mmol/h。萎缩性胃炎、胃癌、恶性贫血、胃大部切除或迷走神经切断术后等患者的胃酸分泌常减少;而十二指肠溃疡、胃泌素瘤等患者的胃酸分泌常增加。

2. 胃潴留监测 胃潴留是指因胃排空障碍使胃内容物不能顺利排入十二指肠而潴留在胃内。其常见原因有消化不良、胃动力减弱、急性胃扩张、幽门梗阻等。主要症状为上腹饱胀或疼痛不适，常由
进食引起或餐后加重，同时有恶心、呕吐、食欲缺乏等。出现下列表现之一的患者应考虑有胃潴留：①饭后4h仍有300mL液体储存于胃内；②口服硫酸钡4h后仍有60%以上在胃内潴留；③禁食过夜后仍有200mL以上胃内容物残留。

3. 胃肠道黏膜内 pH 值监测 胃肠道缺血引起的胃肠黏膜屏障受损,造成细菌和内毒素移位,常是脓毒症和 MODS 重要的启动因素。胃肠黏膜内 pH(intramucosal pH, pHi) 值可反映器官局部的氧合状态,也可间接反映全身的缺氧情况。此监测对危重患者的复苏效果评价及预后评估具有高敏感性、特异性,且因安全、经济等优点不断得以推广应用。

(1) 监测方法: 有直接法和间接法两种。直接法是采用 pH 值微电极直接进行监测, 这是一种有创性的精确监测方法, 但操作过程复杂, 在临床应用较少。间接法: ① 生理盐水张力法, 是通过置入特殊的葡萄糖生理盐水导管至胃腔, 向其前端半透膜囊内注入一定量的生理盐水, 30 ~ 90min 后抽出囊内生理盐水, 弃去前 1.5mL 无效腔内液体, 保留余下的 2.5mL 做血气分析, 同时抽取动脉血进行血气分析, 利用亨德森-哈塞尔巴尔赫方程 (Henderson-Hasselbalch 公式): pHi = 6.1 + log(HCO₃⁻/PaCO₂ × 0.03 × k), 可以计算出 pHi 值。公式中, 0.03 为 CO₂ 解离常数, k 为不同平衡时间对应的校正系数。② 空气张力法, 是将胃黏膜 CO₂ 张力计插入胃腔并连接胃张力监测仪, 通过对胃张力监测仪气囊内空气进行自动采样, 可直接测出 PaCO₂, 同样要求抽取动脉血进行血气分析, 利用 Henderson-Hasselbalch 公式计算出 pHi 值。

(2)临床意义:如下。

1) pHi 值的正常范围: 7.35 ~ 7.45。

2) 休克患者器官灌注状态评估: 机体在维持其内环境稳态和行使功能时所需要的能量直接来源于 ATP 的分解, 当机体遭受创伤、失血及感染等因素发生休克后, 组织细胞氧供应不足, ATP 的合成小于其分解而产生大量的 H+,H+ 主要存在于胃黏膜内, 引起 pHi 值下降, 组织细胞缺氧程度越严重, pHi 值下降越明显。因此, pHi 监测提供了部分器官组织氧合充分与否的判定依据。胃肠道是休克时缺血发生最早、最明显的脏器, 同时也是复苏后逆转最晚的脏器。休克早期单纯从临床表现与全身性输送指标等常难以发现局部或隐藏的器官低灌注状态, 通过 pHi 监测能够早期预警、指导治疗、纠正缺血缺氧状态、预防 MODS。

3)危重症患者预后评估:在评估危重症患者预后方面,pHi 监测被认为较其他监测方法更为敏感和可靠,已成为临床早期评估预后的重要指标之一。全身监测指标已完全恢复正常,而 pHi 值仍低的状态称为“隐性代偿性休克”,隐性代偿性休克是导致胃肠黏膜屏障受损害、细菌和内毒素移位,进而诱发严重的脓毒症和 MODS 的主要原因。通过对循环衰竭危重症患者的研究表明,pHi 值低者较 pHi 值正常者病死率明显升高。纠正低 pHi 值可以改善复苏的预后,因此,对于复苏患者监测 pHi 值的变化,并及时纠正低 pHi 状态具有重要的临床价值。

（三）腹内压监测

1. 适应证 腹内压(intra-abdominal pressure, IAP)是指腹腔内压力,其稳定、平衡对维持生理状态下机体各脏器的正常功能至关重要。

IAP 监测适用于创伤后或腹部手术后,如腹腔感染、术后腹腔内出血、复杂的腹腔血管手术(如肝脏移植)、严重的腹腔外伤伴随脏器肿胀、腹腔内或腹膜后血肿形成、使用腹腔内填塞物止血、急性胰腺炎等。有腹内高压倾向的患者应将 IAP 监测作为常规监测项目,有膀胱外伤的患者是膀胱压监测的绝对禁忌证。

2. 监测方法

(1) 直接测压法: 通过腹腔引流管或穿刺针连接水压计或压力传感器直接测定 IAP。该方法测量结果直接准确, 但属于有创性监测, 容易给患者造成感染、出血等伤害, 临
床上一般不作为常规监测方法。

(2)间接测压法:本节主要介绍以胃内压、膀胱内压等来间接反映IAP的方法。

1) 胃内压: 腹内压可通过测量胃内压来进行估计, 从鼻胃管或胃造口管向胃内缓慢注射 50 ~ 100mL 盐水, 或应用胃内气囊, 近端提起与地面垂直, 通过连接的水压计或压力传感器进行测压, 以腋中线为零点测量, 液面高度即为胃内压。研究表明, 当腹内压低于 20mmHg 时, 胃内压与膀胱内压有一定的相关性; 当腹内压突然升高超过 20mmHg 时, 胃内压与膀胱内压则显示不一致。

2) 膀胱内压: 是临床上使用最广泛的方法。在 0 ~ 70mmHg 的腹内压范围内, 膀胱内压与腹内压直接测量值高度相关, 被认为是临床间接测量腹内压的“金标准”。但在膀胱挛缩、神经源性膀胱或腹腔粘连等情况下, 用膀胱内压估计腹内压较粗略。①间断测定膀胱内压法: 患者取仰卧位, 保持腹肌松弛, 留置 Foley 尿管, 排空膀胱, 接三通管; 向膀胱内注入温度为 37.0℃ 的无菌 0.9% NaCl 125mL (当灌注量为 125mL 时, 膀胱内压和腹内压相关性最好), 注入时间 >1min, 通过三通管连接水压计, 以腋中线为零点, 等水柱波动平稳时, 于呼气末测定, 水柱高度即为 IAP (所测数字单位为 cmH₂O)。②持续测定膀胱内压法: 在三腔尿管上加一个三通开关, 除一腔道用于持续导尿外, 另一腔道用生理盐水 (4mL/h) 持续注入膀胱, 第三个腔道连接在传感器及床旁监护仪上, 调零点同间断测定膀胱内压法, 可记录全部数值。此法省时、省力, 可更好地监测病情, 尽早发现间断测定膀胱内压法数小时间隔中的 IAP 变化。

3. IAP 监测的影响因素

(1) 患者处于病态肥胖、怀孕等状态, 可能会合并慢性 IAP 升高。

(2)危重症患者的 IAP 通常会高于正常基线水平(5~7mmHg)。

(3)近期腹部手术史、机械通气、体位改变等也可伴IAP升高。

(4)外界因素,患者使用胸腹带、棉被过重压在腹部和未采取平卧位等都会使腹内压增高。

(5) 患者烦躁不安、频繁咳嗽和咳痰、呼吸困难等因素都会不同程度地影响 IAP 的监测。

(6)膀胱本身因素会影响IAP监测,如既往有膀胱手术史、膀胱肿瘤、膀胱炎、神经性膀胱等。

(7)原有腹部手术史,如腹膜粘连会引起腹腔局限性高压,此类患者即使膀胱测压正常,也不能排除腹内高压的存在,而应结合临床和其他检查才能明确诊断。

(8)注入膀胱的生理盐水适宜温度为 37～40∘C ，过冷、过热及灌注速度过快可使膀胱内压增高。为减少人为误差，可重复测量2或3次取平均值。

(9) 小型膀胱、神经源性膀胱、腹腔粘连、膀胱创伤、排尿异常、张力性盆腔血肿等情况，膀胱内压监测可靠性不高，可使用经胃测压法。

考点提示: 消化系统功能的监测指标和意义。

四、神经系统功能监测

脑为机体的重要器官,其结构和功能十分复杂,与全身各脏器、各部位密切相关。中枢神经系统功能监测包括意识监测、瞳孔监测、颅内压监测和脑电监测。

(一) 意识监测

意识状态是中枢神经系统是否受损的客观标志。意识障碍是机体对自己和周围环境的感知与理解能力减退或消失。护理人员应当能够区分患者有无脑功能受损及受损程度，并给予相应的监测及护理。

1. 意识障碍分类

(1) 嗜睡: 是最轻的意识障碍, 为病理性, 表现为持续睡眠状态, 但易唤醒, 醒后有一定的语言和运动反应, 并能正确回答问题, 刺激解除后又很快入睡。

(2) 意识模糊: 是意识水平轻度下降的一种意识状态, 比嗜睡意识障碍深, 能保持简单的精神活动, 但对时间、地点、人物、定向力部分或完全发生障碍。

(3) 昏睡: 是接近不省人事的意识状态。患者受到强刺激可被唤醒, 但很快又入睡, 醒时回答问题模糊或答非所问。

(4)昏迷:是意识障碍的重要表现,是大脑皮质和脑干网状结构受到高度抑制的状态,表现为意识丧失、自主运动消失、对外界无反应。根据其反应程度,可将昏迷分为浅、中、深三种类型。

2. 意识障碍程度评估 可通过与患者交流,了解其思维、反应、情感活动、定向力等状况,必要时做痛觉试验、瞳孔对光反射试验、角膜反射
试验、膝腱反射试验等,协助判断意识障碍的程度。临床上也常用格拉斯哥(Glasgow)昏迷评分法(GCS)进行评估。Glasgow昏迷评分法是从睁眼、言语和运动3个方面分别评分,以三者的积分表示意识障碍的程度。GCS评分最高分为15分,表示意识清楚;8分以下为昏迷;3分为最低值(表2-6)。

表 2-6 Glasgow 昏迷评分法

注：*指疼痛刺激时肢体的运动反应。

(二)瞳孔监测

正常瞳孔为双侧瞳孔等大、等圆，在自然光下直径为2~5mm，对光反射灵敏。瞳孔的评估结果是对颅脑损伤后判断脑疝存在及脑干功能损害程度的重要指标。临床上常见以下几种瞳孔异常情况。

1. 双侧瞳孔缩小 双侧瞳孔直径 <2mm。常见于有机磷、吗啡、氯丙嗪中毒，脑桥出血使瞳孔呈针尖样（瞳孔直径 <1mm）。

2. 患侧瞳孔缩小 患侧瞳孔直径 <2mm。常见于小脑幕切迹疝早期, 患者瞳孔先短暂缩小后逐渐散大, 意识障碍进行性加重, 病灶对侧肢体肌力下降。若一侧瞳孔缩小伴眼睑下垂, 常见于霍纳 (Horner) 综合征。

3. 双侧瞳孔扩大 双侧瞳孔直径 >5mm。常见于中枢神经损害、青光眼、滴入扩瞳药等。

4. 患侧瞳孔散大 患侧瞳孔直径 >5mm。常见于动眼神经麻痹。

5. 双侧瞳孔大小不等 常见于颅内病变,如脑肿瘤、颅内出血等。

6. 双侧瞳孔散大及对光反射障碍 常见于病情急剧变化或临终表现,如脑震荡、中脑病变、深昏迷、濒死状态。

颅内压(intracranial pressure, ICP)是指颅腔内容物对颅腔壁所产生的压力。颅脑损伤患者常伴有颅内压的改变,因此,颅内压监测是观察颅脑危重症患者病情的一项重要内容。

1. 监测方法

颅内压监测

(1) 无创颅内压监测: 通过观察患者临床表现可获得其是否存在颅内压增高的主观资料。颅内压增高患者常见的临床表现为头痛、呕吐、视盘水肿、意识障碍、生命体征变化等。

1) 影像学监测: 通过影像学监测可获得患者是否存在颅内压增高的可定位及定性的客观资料。颅内压增高时, 影像学检查可见脑水肿、脑积水、脑沟变浅或消失、脑室移位受压、中线移位等现象。

2) 经颅多普勒: 通过超声多普勒效应观察脑血流速度的降低或增高, 由此可推测局部脑血流量的相应改变, 从而反映颅内压的变化。它是检测颅内脑底主要动脉的血流动力学及生理参数的无创性脑血管疾病的检查方法。

3) 视觉诱发电位: 通过闪光视觉诱发电位活动可以反映从视网膜到枕叶皮质视通路的完整性。当颅内压升高时, 神经元及纤维缺血、缺氧, 引起代谢障碍如脑脊液 pH 值下降、乳酸浓度增高、神经传导阻滞、颅内电信号传导速度减慢, 闪光视觉诱发电位波峰潜伏期延长时间与颅内压成正比, 从而可反映颅内压的改变。此方法适合重症患者, 特别是昏迷患者。

4) 脑电双频指数(BIS): 通过测定脑电图线性成分, 即频率和功率分析成分波之间的非线性关系 (即位相和谐波), 将代表不同镇静水平的脑电信号识别出来, 进行标准化和数字化处理, 转化为一种简单的量化指标。用于评估患者的镇静程度、脑损伤程度及预后。

(2)有创颅内压监测:具体如下。

1) 脑室内测压: 通过在颅缝与瞳孔中线交点处行颅骨钻孔并行脑室穿刺, 或在手术中置入细硅胶导管并与测压装置相连接, 从而测得颅内压。优点: 此法测得颅内压值最准确, 同时可通过引流脑脊液控制颅内压。缺点
: 有损伤脑组织的风险; 当脑严重受压使脑室移位或压扁时, 不易插管成功; 导管易因受压或梗阻而影响测压的准确性; 此法最严重的并发症是颅内感染, 预防感染的护理要点是始终保持管道的绝对无菌, 并防止液体反流。

2) 硬膜下测压: 通过将带有压力传感器的测压装置放于硬脑膜下、软脑膜表面测得颅内压。优点: 可避免脑穿刺引起的脑组织损伤。缺点: 准确性较脑室内测压差, 仍有感染的风险。

3) 硬膜外测压: 通过将测压装置放在内板与硬膜之间测得颅内压。优点: 无颅内感染风险。缺点: 准确性最差。

4) 腰椎穿刺测压: 通过导管针刺入患者第 3~4 腰椎棘突间隙并连接测压管测得颅内压。应特别注意, 急性颅内压升高尤其是做减压术的患者不宜采用此法测压, 因有诱发脑疝的可能。

2. 监测的意义 成年人正常颅内压为 0.7～2.0,kPa(5～15,mmHg) ，儿童正常颅内压为 0.4～1.0,kPa(3～8,mmHg) 。颅内压超过 2.0,kPa(15,mmHg) 称为颅内压增高，颅内压在 2.0～2.7,kPa(15～20,mmHg) 为轻度增高，颅内压在 2.7～5.3,kPa(20～40,mmHg) 为中度增高，颅内压大于 5.3,kPa(>40,mmHg) 为重度增高。颅内压增高的患者常有头痛、呕吐和视盘水肿的典型表现。早期患者出现代偿性血压升高，脉压增大，脉搏慢而有力，呼吸深而慢，称为库欣 (Cushing) 综合征，急性期常有进行性意识障碍，慢性患者可出现神志淡漠、反应迟钝和呆滞。

通过监测颅内压可以指导降压治疗，如脱水药、利尿药、巴比妥类药物的应用等，评价治疗效果；及时发现颅内继发性损害，便于早期处理；协助诊断颅内占位性病变，颅内占位性病变往往伴随颅内压增高现象，有助于发现及诊断颅内占位性病变；有助于判断预后，如患者颅内压持续升高，昏迷程度深,神经损害症状重者,多预后不良;通过置入测压导管测压的同时,可以引流一定量的脑脊液,降低颅内压。

3. 影响颅内压的因素

(1) : 脑血管对  的反应很敏感, 这并非  的直接影响, 而是通过改变脑血管周围细胞外液的 pH 值而引起的。  下降时, pH 值上升, 脑血流量和脑血容量减少, 颅内压下降;  增高时, pH 值下降, 脑血流量和脑血容量增加, 颅内压升高。

(2)  : 在 60～300mmHg 内变动时, 脑血流量和颅内压基本不变。当  低于 50mmHg 时, 脑血流量明显增加, 颅内压升高。低氧血症持续时间过长, 脑水肿已形成, 即使  改善, 颅内压也未必恢复。如缺氧合并  升高, 则直接损害血-脑屏障, 更易导致脑水肿, 颅
内压往往持续升高, 病情更加凶险。

(3) 血压: 平均动脉压在 50～150,mmHg 波动时, 依靠脑血管的自动调节机制, 颅内压不改变, 超出这一限度, 颅内压将随血压的升高或降低而呈平行改变。

(4) 中心静脉压(central venous pressure, CVP): 胸膜腔内压及中心静脉压对颅内压有直接影响。中心静脉压升高, 静脉回流障碍, 颅内压升高。因此, 呛咳憋气、正压机械通气、腹内压升高等都可以使颅内压升高, 反之, 中心静脉压降低, 颅内压降低。

(5)其他:使脑血流量增加的药物可导致颅内压升高。静脉麻醉药如硫喷妥钠、依托咪酯、丙泊酚（异丙酚）、地西泮和麻醉性镇痛药都可使脑血流量减少、脑代谢降低，从而使颅内压下降。甘露醇等渗透性利尿药使脑细胞脱水，成为降颅压的主要用药。体温每下降1℃，颅内压降低5.5%~6.79%。

(四) 脑电监测

持续脑电监测可观察病变的不同阶段,有助于早期脑缺血的诊断和治疗,有助于昏迷患者的诊断和预后判断,还有助于指导严重外伤患者的针对性治疗。

1. 脑电图 显示脑细胞群自发而有节律的生物电活动, 是皮质锥体细胞群及其树突突触后电位的总和。

2. 诱发电位 当神经系统受到外在刺激时产生冲动,该冲动经特殊的神经通路逐级上传到皮质,中枢神经系统在感受到这种刺激过程中产生的生物电活动变化称为诱发电位。

通过观察和分析诱发电位的变化,可了解各感觉通路和皮质各代表区甚至整个皮质的功能。根据刺激形式的不同,临床上常用的诱发电位有体感诱发电位、听觉诱发电位、视觉诱发电位和运动诱发电位。通过监测诱发电位,可及时了解神经组织损伤及损伤程度,为治疗提供依据。

考点提示: 神经系统功能监测的要点和意义。

五、泌尿系统功能监测

在 ICU 监护的患者常存在肾功能异常,包括排泄含氮废物、毒物及药物的能力受损,维持水、电解质和酸碱平衡能力受损,促红细胞生成素不足等。临床上主要通过尿液监测及肾功能生化指标监测来反映患者的病情状态与病程进展情况。

(一) 尿液监测

1. 尿量 正常成人 24h 尿量为 1000 ~ 2000mL。尿量是直接反映肾滤过率的重要指标, 是肾功能监测早期的敏感指标。肾功能的变化也常有尿量的异常改变。

(1) 监测方法: 测定患者 24h 尿量, 当天早晨 8 时嘱患者排空尿液后, 连续收集至第 2 天早晨 8 时最后一次的尿液, 记录 24h 尿量。注意应根据不同检查目的加入防腐剂, 以确保检查结果的准确性。

(2)临床意义:具体如下。

1) 每日尿量 > 2500 mL 为多尿, 常见于急性肾衰竭多尿期、尿崩症、慢性肾小球肾炎、糖尿病所引起的肾小管功能不全。

2) 每日尿量 <400mL 或每小时尿量 <17mL 称为少尿, 多见于急、慢性肾衰竭。

3) 每日尿量 <100mL 为无尿, 多见于肾血管栓塞、梗阻性急性肾衰竭、双侧肾皮质坏死。

2. 尿比重 指在 4∘ C 时, 同体积尿和纯水的重量比。成人正常值为 1.015～1.025 。

(1) 监测方法: 可用比重计法、折射仪法及尿试纸条等方法进行监测。临床常用尿试纸条进行筛检。测量时, 应注意不同测量方法所需尿液量不同, 比重计法需要取晨尿 100mL, 折射仪法只需要一滴, 尿液分析仪需要取尿液 10mL。

(2)临床意义:具体如下。

1) 尿比重降低 (<1.015): 常见于慢性肾衰竭、尿崩症、急性肾衰竭少尿期及多尿期等。

2) 尿比重增高(晨尿 >1.020): 常见于血容量不足的肾前性少尿, 如高热、脱水、出汗过多、周围循环衰竭等; 尿量多而比重高见于糖尿病。

(二) 肾功能生化指标监测

1. 内生肌酐清除率(endogenous creatinine clearance rate) 指肾在单位时间内,把若干毫升血浆中的内生肌酐全部清除的能力。正常成年人内生肌酐清除率的平均值为 80 ~ 100mL/min。内生肌酐清除率是判断肾小球滤过功能的简便有效方法。

(1) 监测方法: 嘱患者连续 3 天低蛋白饮食(每日蛋白质摄入量 <40g), 禁食鱼、肉
, 禁饮咖啡、茶等, 避免剧烈运动, 于第 4 天早晨 8 时让患者排尽余尿后, 收集并记录 24h 尿量, 并加入 4~5mL 甲苯防腐。此外, 在同一天的任意时间采血 5~7mL 与 24h 尿液同时送检, 测定尿液和血液中的肌酐浓度。

(2) 临床意义: 内生肌酐清除率能较早反映肾小球滤过功能损害并估计其损害程度。判断标准: 滤过功能减退, 即内生肌酐清除率低于正常值的 80%; 轻度损害, 即内生肌酐清除率为 51~70mL/min; 中度损害, 即内生肌酐清除率为 31~50mL/min; 重度损害, 即内生肌酐清除率 <30mL/min。内生肌酐清除率降低常见于各种进展性肾病造成肾小球损伤引起的肾功能损害。健康人随着年龄增长, 肾实质体积缩小, 内生肌酐清除率可有所降低。`,rawHtml:`<p>案例导学</p>\r
<p>陈某，男，37岁，半小时前因车祸当场不省人事，伤后无呕吐、无大小便失禁、无抽搐发作，由120救护车送入急诊室。颅脑CT显示：蛛网膜下腔出血，额顶部头皮血肿。体温37.7℃，脉搏26次/分，呼吸27次/分，血压148/92mmHg，双侧瞳孔不等，左侧3mm，右侧5mm，对光反射迟钝，四肢肌张力增高，两肺呼吸音粗，可闻及痰鸣音。以脑外伤、蛛网膜下腔出血收入ICU。</p>\r
<p>请思考：</p>\r
<p>1. 作为 ICU 护士,请说出急危重症患者需要进行病情观察和监护的内容。</p>\r
<p>2. 该颅脑外伤患者需要重点监护哪些指标？</p>\r
<p>ICU 是对危重症患者进行集中全面的动态监测、强化治疗和护理的特殊医疗场所。重症监护室医护人员对患者将进行系统及不间断的监护，对危重症患者的生命体征及反映各系统功能的各项参数进行动态监测，及时判断病情变化，以便及时采取相应的治疗护理措施，抢救患者生命。危重症患者的监测主要包括心血管系统功能监测、呼吸系统功能监测、消化系统功能监测、神经系统功能监测、泌尿系统功能监测及体液平衡监测。</p>\r
<p>一、心血管系统功能监测</p>\r
<p>心血管系统功能监测反映心血管系统的功能状况,包括心脏、血管、血液、组织氧的供应与消耗,以及心脏电生理等方面的功能指标,为临床危重患者的病情观察、救治与护理工作提供重要依据。</p>\r
<p>（一）心率监测</p>\r
<p>1. 监测方法 心率(heart rate, HR)监测一般采用触摸桡动脉搏动、心前区听诊、生命体征监测仪、心电图等方法监测,其中心电图监测较为准确,若对用其他方法测定的心率结果持怀疑态度时应积极行心电图监测。</p>\r
<p>2. 正常值 正常成人安静时心率为 60～100 次/分；小儿心率稍快，一般不超过 120 次/分即为正常；老年人心率较慢，有时可低于 60 次/分。</p>\r
<p>3.心率监测的意义</p>\r
<p>(1) 心率和心排血量: 心排血量(CO) = 每搏输出量 × 心率(SV × HR)。在一定范围内, 随着心率的增加, 心排血量也会增加。当患者处于低血容量状态或高代谢状态时, 机体只能通过加快心率来提高心排血量。但当心率超过 160 次/分时, 由于心室舒张期明显缩短, 心室充盈不足, 每搏输出量减少, 从而使心排血量减少。当心率低于 50 次/分时, 由于心率减慢引起的心排血量减少, 直接影响全身各脏器的血供。进行性心率减慢是心脏停搏的前奏, 因此在重症监护过程中, 若发现患者心率超过 160 次/分或低于 50 次/分时, 应立即通知医生给予干预治疗。</p>\r
<p>(2) 心率和休克指数 (shock index, SI): 失血性休克时, 心率改变最为敏感, 故应密切监测心率的动态变化, 以及早发现失血性休克。休克指数 (SI) = 心率/收缩压 (HR/SBP), 其正常值约为 0.5。发生失血性休克时, 休克指数会增高; 当休克指数等于 1 时, 提示失血量占血容量的 20%~30%; 当休克指数大于 1 时, 提示失血量占血容量的 30%~50%。对于失血性休克患者来说, 及时发现出血和迅速判断失血量非常重要。</p>\r
<p>(3) 心率和心肌耗氧(myocardial volume of oxygen consumption, <img alt="" src="bookpicture/ds066854/ds0668540012-1-l.jpg" />): 心肌耗氧与心率的关系极为密切, 心率快慢与心肌耗氧呈正相关。心率与收缩压的乘积(RPP) = 心率×收缩压(HR × SBP), 反映了心肌耗氧量。心率越快, 心肌做功越多, 心肌耗氧越多。正常人 RPP &lt; 12000, 若 RPP &gt; 12000 则提示心肌耗氧增加和心肌缺血。</p>\r
<p>(二)心电监测</p>\r
<p>心电监测是各种危重患者的常规监测手段。普通心电图(electrocardiogram, ECG)只能简单观察描记心电图当时短暂的心电活动情况,而动态心电图检查和心电监测则是通过显示屏连续观察监测心脏电活动情况的一种无创监测方法,可适时观察病情,提供可靠的有价值的心电活动指标,并指导实时处理
,因此,对于有心电活动异常的患者,如急性心肌梗死、各种心律失常等有重要使用价值。</p>\r
<p>1. 心电监测的意义</p>\r
<p>(1)持续监测心率、心律变化,监测有无心律失常。</p>\r
<p>(2) 观察心电波形变化, 诊断心肌损害、心肌缺血及电解质紊乱。</p>\r
<p>(3) 监测药物对心脏的影响,并作为指导用药的依据。</p>\r
<p>(4) 判断起搏器的功能。</p>\r
<p>2. 心电监测的分类</p>\r
<p>(1)12 导联或 18 导联心电图: 是用心电图机进行描记而获得的即时心电图, 12 导联心电图包括 3 个标准肢体导联, 即 I、II 和 III 导联; 3 个加压肢体导联, 即 aVF、aVR 和 aVL 导联; 6 个胸导联, 即 V<sub>1</sub> 、 V<sub>2</sub> 、 V<sub>3</sub> 、 V<sub>4</sub> 、 V<sub>5</sub> 、 V<sub>6</sub> 导联。18 导联心电图是在 12 导联心电图基础上增加了 6 个胸导联, 即 V<sub>3</sub>R 、 V<sub>4</sub>R 、 V<sub>5</sub>R 、 V<sub>7</sub> 、 V<sub>8</sub> 、 V<sub>9</sub> 导联。</p>\r
<p>(2) 动态心电图: 可进行 24 ~ 48h 的动态心电监测, 常用于心律失常及心肌缺血患者, 尤其是无症状性心肌缺血的诊断与评估。但由于心电异常只能通过回顾性分析, 不能反映即时的心电图变化, 因此, 不能用于需要连续、实时心电监测的危重症患者。</p>\r

<p>(3) 心电示波监测: 通过心电监护仪连续、动态反映心电图的变化, 对及时发现心电图异常起着重要作用, 是 ICU 最常用的心电监测方法。由多台床旁心电监护仪、计算机、打印机及心电图分析仪等构成心电监护系统。</p>\r
<p>3. 标准心电导联电极位置</p>\r
<p>(1) 标准肢体导联: 属于双电极导联, I 导联为左上肢(+)、右上肢(-), II 导联为左下肢(+)、右上肢(-), III 导联为左下肢(+)、左上肢(-)。</p>\r
<p>(2) 加压肢体导联: 属于单极导联, aVR、aVL 与 aVF 导联探查电极分别置于右腕部、左腕部及左足部。</p>\r
<p>(3)胸导联:属于单极导联, V<sub>1</sub> 电极位于胸骨右缘第4肋间, V<sub>2</sub> 电极位于胸骨左缘第4肋间, V<sub>4</sub> 电极位于左侧锁骨中线与第5肋间相交处, V<sub>3</sub> 电极位于 V<sub>2</sub> 与 V<sub>4</sub> 的中点, V<sub>5</sub> 电极位于左侧腋前线与 V<sub>4</sub> 同一水平, V<sub>6</sub> 电极位于左腋中线与 V<sub>4</sub> 、 V<sub>5</sub> 电极同一水平, V<sub>7</sub> 电极位于左腋后线与第5肋间相交处, V<sub>8</sub> 电极位于左肩胛线与第5肋间相交处, V<sub>9</sub> 电极位于第5肋间同脊柱左缘水平, V<sub>4</sub>R 电极位于右锁骨中线与第5肋间相交处, V<sub>3</sub>R 电极在 V<sub>1</sub> 与 V<sub>4</sub>R 的中点, V<sub>5</sub>R 电极位于右腋后线与第5肋间相交处。</p>\r
<p>4. 常用心电监护仪导联电极位置 相对于标准心电图导联而言, 监护导联是一种模拟的、综合的导联形式。心电监护常用的连接方式有 3 个和 5 个电极。</p>\r
<p>(1)3 导联心电监护:有 3 个电极导联线,具体位置如下。①右上(RA)在胸骨右缘锁骨中线第 1 肋间;②左上(LA)在胸骨左缘锁骨中线第 1 肋间;③左下(LL)在左锁骨中线剑突水平处和(或)左下腹的位置。由于电极有限,只能获得综合 I、II、III 导联心电图。</p>\r
<p>(2)5 导联心电监护: 是目前较为常用的方法, 5 导联心电导线可
以获得 I、II、III、AVR、AVF、AVL、V 导联等心电图。导联电极具体位置: ① 右上 (RA) 位于右锁骨中线第 2 肋间; ② 左上 (LA) 位于左锁骨中线第 2 肋间; ③ 右下 (RL) 位于右腋前线肋缘处; ④ 左下 (LL) 位于左腋前线肋缘处; ⑤ 探查电极 (C) 或胸导联 (V), 通常位于胸骨第 4 肋间 (图 2-75)。</p>\r
<p style="text-align: center;">图2-75 5导联心电监护电极位置</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540012-3-l.jpg" /><figcaption></figcaption></figure>\r
<p>5. 操作流程 具体见图 2-76。</p>\r
<p>(三)血压监测</p>\r
<p>血压是血管内血液对单位面积血管壁产生的侧压力,可以反映心排血量和外周血管阻力,是衡量循环系统功能的重要指标。动脉血压与器官血流呈正相关,主要受心功能、外周血管阻力、有效循环血容量等因素的影响。成人安静时血压的正常范围是收缩压90~140mmHg,舒张压60~90mmHg,脉压30~40mmHg。</p>\r
<p>1. 测量方法</p>\r
<p>(1) 无创血压监测: 在危重患者监护中, 振荡加压法是目前应用最广泛的自动无创动脉血压监测方法。即上臂缚上袖套, 测压仪设置时间后可定时自动使袖套充气或放气, 通过压力换能器将肱动脉压力转换为电信号, 测压仪能够自动显示收缩压、舒张压、平均动脉压和脉率。</p>\r
<p>该仪器的特点是可根据不同年龄选择不同型号的袖套,应用对机体组织没有机械损伤的方法,间接取得有关心血管功能的各项参数,并发症少。但其局限性是易受外界因素的影响,如患者活动、患者血压过低或过高、心律失常等因素影响其准确性。</p>\r
<p style="text-align: center;">图2-76 心电监测操作流程</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540012-5-l.jpg" /><figcaption></figcaption></figure>\r
<p>1) 无创血压监测的优点: ①无创伤性, 适用范围广, 可重复测量; ②操作简便, 容易掌握; ③可按需定时测压, 省时省力; ④与实际动脉血压有良好的相关性, 测平均动脉压尤为准确。</p>\r
<p>2) 无创血压监测的缺点: ①不能连续监测; ②不能反映每一心动周期的血压变化; ③不能显示动脉波形; ④易受肢体活动和袖带影响, 长时间绑扎袖带可出现上肢缺血、麻木等并发症。</p>\r
<p>(2)有创血压监测:经体表动脉穿刺插入导管与监测探头到心脏和(或)血管腔内,利用监测仪直接测出血压的方法,是最准确的血压测量方法,它可以反映每一心动周期内的收缩压、舒张压和平均动脉压(图2-77)。</p>\r
<p style="text-align: center;">图2-77 有创血压监测示意图</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540012-6-l.jpg" /><figcaption></figcaption></figure>\r

<p>2. 血肌酐(serum creatinine, Scr) 测定血肌酐的浓度可作为肾小球滤过功能受损的指标。血肌酐主要由肾小球滤过排出体外，在外源性肌酐摄入量稳定时，血肌酐的浓度取决于肾小球滤过能力。</p>\r
<p>(1) 正常值: 正常男性血肌酐为 0.6～1.2,mg/dL , 正常女性血肌酐为 0.5～1.1,mg/dL 。</p>\r
<p>(2) 临床意义: 各种原因所致的肾小球滤过功能减退常伴有血肌酐增高, 血肌酐增高提示肾功能受损, 如急、慢性肾小球肾炎。</p>\r
<p>3. 血尿素氮(bloo
d urea nitrogen, BUN) 监测血尿素氮的浓度可以判断肾小球滤过功能。尿素氮是体内蛋白质代谢的产物, 血尿素氮主要经过肾小球滤过而随尿排出。当肾实质损害时, 肾小球滤过功能下降, 致使血尿素氮浓度升高。</p>\r
<p>(1) 正常值: 成人为 9～20,mg/dL , 儿童为 5～18,mg/dL 。</p>\r
<p>(2)临床意义:血尿素氮增高常见于以下情况。</p>\r
<p>1) 体内蛋白质分解过度: 如大面积烧伤、急性传染病、上消化道出血等。</p>\r
<p>2) 肾前或肾后因素引起的尿量显著减少、无尿: 常见的肾前性因素有脱水、水肿、腹水、循环系统衰竭等; 常见的肾后性因素有尿路结石或前列腺增生引起的尿路梗阻等。</p>\r
<p>3) 肾脏疾病: 如慢性肾炎、肾动脉硬化症、严重肾盂肾炎、肾结核和肾肿瘤晚期等。应当注意的是, 肾功能损害较轻时, 血尿素氮可无变化。因此, 血尿素氮不能作为肾脏疾病的早期功能测定指标, 但对尿毒症的诊断有重要价值。</p>\r
<p>4. 肾脏浓缩和稀释功能试验 是监测肾小管重吸收功能的重要指标。</p>\r
<p>(1) 监测方法: 在试验的 24h 内, 患者保持日常的饮食和生活习惯, 当日早晨 8 时排尿后, 测定昼尿量(晨8时至晚8时的尿量总和)、夜尿量(晚8时至次日晨8时的尿量总和)及其比重。</p>\r
<p>(2) 正常值: 昼尿量与夜尿量之比为 (3～4):1 ，且夜尿量 &lt;750mL。至少有一次尿比重 &gt;1.020（多为夜尿），有一次尿比重 &lt;1.003，最高尿比重与最低尿比重之差应大于 0.009。</p>\r
<p>(3)临床意义:具体如下。</p>\r
<p>1) 夜尿增多常提示肾功能不全。</p>\r
<p>2) 昼、夜尿量接近且尿比重降低, 常提示肾脏浓缩功能不全。</p>\r
<p>3) 尿比重固定在 1.010 左右, 常提示肾功能严重损害, 见于慢性肾炎、原发性高血压等。</p>\r
<p>4) 尿量少而尿比重增高常提示肾前性少尿。</p>\r
<p>5)24h 尿量 &gt;4L, 且尿比重均 &lt;1.006, 常见于尿崩症。</p>\r
<p>考点提示:泌尿系统功能监测的要点和意义。</p>\r
<p>六、体液平衡监测</p>\r
<p>体液平衡的监测指标通常包括电解质和酸碱平衡两部分。</p>\r
<p>(一)电解质监测</p>\r
<p>1. 血清钠监测 正常值为 135～145,mmol/L 。</p>\r
<p>(1) 低钠血症: 血清钠 &lt; 135 mmol/L 为低钠血症。</p>\r
<p>1) 临床意义: 低钠血症常见于大量消化液丢失、大面积创面渗液及使用排钠利尿药等所致的低渗性缺水; 血钠浓度越低, 病情越重。根据缺钠程度的不同, 分为轻度低钠血症、中度低钠血症和重度低钠血症。血清钠浓度在 130 ~ 135 mmol/L 为轻度低钠血症; 血清钠浓度在 120 ~ 129 mmol/L 为中度低钠血症; 血清钠浓度 &lt; 120 mmol/L 为重度低钠血症。低钠血症临床表现为疲乏、头晕、手足麻木、恶心呕吐、低血压、尿量少、尿中钠和氯的含量下降、神志不清等一系列神经症状, 其症状严重程度与血钠值和血钠降低速度有关。重度低钠血症会出现严重症状, 甚至死亡。</p>\r
<p>2) 补液原则: 低钠血症伴血容量过低者, 可静脉输注生理盐水或高渗盐水以纠正低钠血症, 同时补充血容量; 重度低钠血症有生命危险者, 必须补充高渗盐水, 如 3%~5% 氯化钠溶液; 轻度低钠血症伴充血性心力衰竭者, 应限制液体输入量 (1000mL/d 左右); 低钠血症伴血容量过多者, 应在限液前提下给予呋塞米或依他尼酸, 必要时给予高渗盐水。</p>\r
<p>(2) 高钠血症: 血清钠 &gt; 145 mmol/L 为高钠血症。</p>\r
<p>1) 临床意义: 高钠血症常见于摄入水分不足或丧失水分过多而导致的高渗性缺水。临床表现以神经系统症状为主, 患者可有口渴、烦躁、嗜睡及震颤、肌张力增高等, 初期症状的轻重与渗透压高低和血钠增高速度有关; 血钠值达 165 ~ 170mmol/L, 血浆渗透压高于 350mmol/L 时, 患者可出现抽搐、惊厥、昏迷等严重表现。</p>\r
<p>2) 补液原则: 能口服者给予饮水; 无法口服者可静脉滴注 5% 葡萄糖溶液或 0.45% 氯化钠溶液, 补充丧失的液体量。所需补充液体量可根据临床表现估计失水量占体重的百分比, 再按每丧失体重的 1% 补液 400~500mL 计算, 分两天补给, 补液
过程中应加上每天 2000mL 的生理需要量。注意事项: 应严密监测全身情况及血钠浓度, 以便医护人员掌握病情和疗效, 并为次日调整补给量提供依据。通常情况下, 高钠血症患者缺水多于缺钠, 但实际上也存在缺钠, 因而补水的同时还应补钠, 否则会引起低钠血症; 补液速度不宜过快, 以防引起脑水肿, 一般应在尿量 &gt;40mL/h 后补钾, 经上述补液治疗后若存在酸中毒, 可酌情补给 5% 碳酸氢钠溶液。补液速度应先快后慢, 每 8~12h 根据临床表现及检测结果, 包括血 Na<sup>+</sup> 与 Cl<sup>-</sup> 浓度、动脉血气分析和中心静脉压等, 随时调整输液计划。</p>\r

<p>2. 血清钾监测 正常血清钾浓度为 3.5 ~ 5.5 mmol/L。</p>\r
<p>(1) 低钾血症: 血清钾 &lt;3.5 mmol/L 为低钾血症。</p>\r
<p>1) 临床意义: 常见于钾离子向细胞内转移、钾摄入不足或丢失所致。当缺水被纠正后, 易出现低钾血症, 低钾血症可致代谢性碱中毒。</p>\r
<p>2) 补钾原则: 积极处理病因, 采取分次补钾方法。能口服者尽量口服补钾; 无法口服钾剂者, 经静脉补给。补钾量可参考低钾血症严重程度, 每天补钾 40 ~ 80mmol 不等。静脉补钾注意事项: 输液中 K<sup>+</sup> 浓度应 ⩽ 40mmol/L (相当于氯化钾 3g/L); 补钾速度应 &lt;20mmol/h, 且见尿补钾。</p>\r
<p>(2)高钾血症:血清钾&gt;5.5mmol/L为高钾血症。</p>\r
<p>1) 临床意义: 常见于酸中毒所致的钾离子细胞外转移及肾脏排泄功能受损、大量输血等情况。高钾血症可导致患者心搏骤停, 一经诊断, 应立即积极治疗。</p>\r
<p>2) 处理原则: 应立即停用一切含钾的药物或溶液; 通过静脉输注碳酸氢钠溶液、葡萄糖溶液及胰岛素等促使 K<sup>+</sup> 转入细胞内; 口服阳离子交换树脂、透析疗法等降低血钾浓度; 静脉注射 10% 葡萄糖酸钙溶液 20mL 或氯化钙 10mL, 以缓解 K<sup>+</sup> 对心肌的毒性作用。</p>\r
<p>3. 血清镁监测 正常值为 0.8～1.2,mmol/L 。</p>\r
<p>临床意义: 血清镁 &lt;0.8 mmol/L 为低镁血症, 可见于饥饿、吸收障碍综合征及长期胃肠消化液丢失, 如肠瘘患者; 血清镁 &gt;1.2 mmol/L 为高镁血症, 主要见于肾功能不全患者。</p>\r
<p>4. 血清钙监测 正常值为 2.1 ~ 2.55 mmol/L。</p>\r
<p>临床意义: 血清钙 &lt;2.1 mmol/L 为低钙血症, 常见于重症急性胰腺炎、肾功能障碍及甲状旁腺受损等情况; 血清钙 &gt;2.55 mmol/L 为高钙血症, 常见于小肠吸收增多、维生素 D 摄入过量、骨破坏增多、甲状旁腺功能亢进等。</p>\r
<p>(二)酸碱平衡监测</p>\r
<p>1. 酸碱平衡常用监测指标</p>\r
<p>(1)酸碱度:正常值为7.35~7.45,平均值为7.40。pH&lt;7.35为酸中毒,pH&gt;7.45为碱中毒。酸碱度是一个综合性指标,既受代谢因素影响,又受呼吸因素影响。</p>\r
<p>(2) 动脉血二氧化碳分压( PaCO<sub>2</sub> ): 指血液中物理溶解的二氧化碳分子所产生的压力, 主要受呼吸性因素影响, 是酸碱平衡中反映呼吸因素的指标, 正常值为 35～45mmHg 。临床上以 PaCO<sub>2</sub>⩾50mmHg 作为诊断Ⅱ型呼吸衰竭的实验室依据。</p>\r
<p>(3) 动脉血氧分压( PaO<sub>2</sub> ): 指血液中物理溶解的氧分子所产生的压力, 正常值为 80 ~ 100mmHg。用于判断缺氧及其程度。①轻度缺氧: PaO<sub>2</sub> 为 60 ~ 80mmHg; ②中度缺氧: PaO<sub>2</sub> 为 40 ~ 60mmHg; ③重度缺氧: PaO<sub>2</sub>&lt;40mmHg 。临床上以 PaO<sub>2<
/sub>&lt;60mmHg 作为诊断呼吸衰竭的标准。</p>\r
<p>(4) 动脉碳酸氢根离子浓度: 用标准碳酸氢盐 (SB) 和实际碳酸氢盐 (AB) 表示。SB 是血液温度在 37<sup>∘</sup>C 、血红蛋白充分被氧饱和的条件下, 用 PaCO<sub>2</sub> 为 40mmHg 的气体平衡后所测得的 HCO<sub>3</sub><sup>-</sup> 浓度, 排除了呼吸因素对它的影响, 是判断代谢性酸碱平衡失调的定量指标。AB 是指未经气体平衡处理的人体血浆中 HCO<sub>3</sub><sup>-</sup> 的真实含量 (血气报告中的 HCO<sub>3</sub><sup>-</sup> 即指 AB), 是血浆中 HCO<sub>3</sub><sup>-</sup> 的真实浓度, 与 SB 相比, AB 包括呼吸因素的影响。正常人两者的数值是一致的, 即 AB 应等于或接近于 SB, 正常值为 22～27mmol/L 。当两者均升高, 且 AB &gt; SB 时, 见于代谢性碱中毒或呼吸性酸中毒代偿; 当两者均降低, 且 AB &lt; SB 时, 见于代谢性酸中毒或呼吸性碱中毒代偿。</p>\r
<p>(5)动脉血氧饱和度( SaO<sub>2</sub> ):指单位血红蛋白含氧百分数,正常值约为97%。</p>\r
<p>(6) 碱剩余(BE): 指在标准条件下, 即血液温度 37<sup>∘</sup>C 、 PaCO<sub>2</sub> 40mmHg、 SaO<sub>2</sub> 100% 的情况下, 将 1000mL 血浆或全血用酸或碱滴定至 pH 值为 7.4 时所需的酸或碱量。正常值为 ±3mmol/L 。</p>\r
<p>考点提示:酸碱平衡常用监测指标及其含义。</p>\r
<p>2. 判断酸碱失衡的步骤 在血液酸碱平衡监测中, pH 值、 PaCO<sub>2</sub> 、 HCO<sub>3</sub><sup>-</sup> 浓度或 BE 是反映机体酸碱平衡的三大基本要素。pH 值是判断血液酸碱度的指标; PaCO<sub>2</sub> 反映呼吸性因素, 是判断呼吸性酸碱失衡的指标； HCO<sub>3</sub><sup>-</sup> 浓度反映代谢性因素， HCO<sub>3</sub><sup>-</sup> 浓度或 BE 是判断代谢性酸碱失衡的指标。三者在对酸碱失衡的分析过程中具有重要意义。</p>\r

<p>第一步:根据 pH 值来判断有无酸中毒或碱中毒。再根据 PaCO<sub>2</sub> 与 HCO<sub>3</sub><sup>-</sup> 浓度(或 BE)两个指标的变化关系,判断是呼吸性因素还是代谢性因素,进而结合 pH 值判断机体的代偿情况,同时应将酸碱紊乱的时间因素考虑在内。</p>\r
<p>当 PaCO<sub>2</sub> 与 HCO<sub>3</sub><sup>-</sup> 浓度(或 BE)呈反向变化, 即一个指标值增高, 另一个指标值降低时, 应诊断为复合型酸碱失衡(相加型)。当 PaCO<sub>2</sub> 与 HCO<sub>3</sub><sup>-</sup> 浓度(或 BE)呈同向变化, 即两个指标同时增高或同时降低时, 可能会有两种情况: 一种是单纯性的酸碱失衡, 其中一个指标值的变化是原发性改变, 而另一指标值的变化是继发的代偿性改变, 原发的失衡决定了 pH 值是偏酸还是偏碱。另一种是复合型酸碱失衡(相消型), 即两种变化均为原发性改变。单纯性的酸碱失衡和复合型酸碱失衡的鉴别需要根据代偿的时间、代偿的限度等进行综合分析。</p>\r
<p>第二步:判断酸碱失衡应根据病因、病情、电解质、血气分析、治疗措施、结果及临床表现等进行动态的综合分析。在以上判断的基础上应结合临床情况进一步验证判断的准确性,必要时应反复多次进行测定或动态持续监测作出最可靠的判断。</p>\r
<p>考点提示: 水钠代谢紊乱、钾代谢异常、酸碱平衡失调。</p>\r
<p>目标检测</p>\r
<p>1. 下列疾病不属于 ICU 收治对象的是( )。</p>\r
<p>A. 
MODS B. 严重心肌梗死 C. 严重低钾血症</p>\r
<p>D. 甲状腺危象 E. 肺癌晚期</p>\r
<p>2. ICU 收治病种不包括( )。</p>\r
<p>A. 恶性肿瘤晚期</p>\r
<p>B. 多器官功能衰竭</p>\r
<p>C. 急性中毒、毒蛇咬伤</p>\r
<p>D. 大面积烧伤</p>\r
<p>E. 各类休克</p>\r
<p>3. ICU 病房的温度应保持在( )。</p>\r
<p>A. 16～20<sup>∘</sup>C B. 18～22<sup>∘</sup>C C. 20～25<sup>∘</sup>C</p>\r
<p>D. 25～28<sup>∘</sup>C E. 26～30<sup>∘</sup>C</p>\r
<p>4. ICU 中比较合理的护士与床位数之比为( )。</p>\r
<p>A. 1:2</p>\r
<p>B. 1:1</p>\r
<p>C. (1~2):1</p>\r
<p>D. (2~3):1</p>\r
<p>E. (3~4):1</p>\r
<p>5. 综合性医院 ICU 床位占总床位数的( )较为合适。</p>\r
<p>A. 0.5%~1%</p>\r
<p>B. 2%~8%</p>\r
<p>C. 1%~2%</p>\r
<p>D. 3%~5%</p>\r
<p>E. 5%~10%</p>\r
<p>6. 血容量正常时, 休克指数为( )。</p>\r
<p>A. 0.3 B. 0.4 C. 0.5</p>\r
<p>D. 0.6 E. 1</p>\r
<p>7. 下列关于酸碱平衡监测的描述, 错误的是( )。</p>\r
<p>A. pH 反映血液的酸碱度, 正常值为 7.35 ~ 7.45</p>\r
<p>B. 标准碳酸氢盐用 SB 表示</p>\r
<p>C. 实际碳酸氢盐用 AB 表示</p>\r
<p>D. 正常人的 AB 高于 SB 的数值</p>\r
<p>E. 正常人的 AB 与 SB 的数值一致</p>\r
<p>8. 正常人昼、夜尿量比为( )。</p>\r
<p>A. (1～2):1 B. (2～3):1 C. (3～4):1 D. (4～5):1 E.以上都不对</p>\r
<p>9. 最高尿比重低于( )，表示肾脏浓缩功能不全。</p>\r
<p>A. 1.006 B. 1.008 C. 1.010</p>\r
<p>D. 1.012 E. 1.018</p>\r
<p>10. 下列不属于中心静脉置管常见并发症的是( )。</p>\r
<p>A. 损伤胸导管致乳糜胸 B. 气胸 C. 空气栓塞</p>\r
<p>D. 局部血肿 E. 心律失常</p>\r
<p>(张 静 禹 西 王丹凤)</p>\r

<p>1)有创血压监测的优点:①除监测血压外,还可通过动脉压的波形初步判断心脏功能,评估右心室收缩能力;②经穿刺导管抽取动脉血标本,监测机体电解质、酸碱度变化;③通过动脉波形描记可了解心脏情况,判断是否有心律失常;④在体外循环转流时,动脉搏动消失,无创方法不能测到血压时,但有创血压监测仍能连续监测动脉压。</p>\r
<p>2)有创血压监测的缺点:相对无创血压监测,有创血压监测发生并发症的概率大。最常见的并发症是血栓形成,严重时会导致肢体缺血,甚至坏死。此外,还可发生出血、感染、动静脉瘘等并发症。</p>\r
<p>3)并发症的防治措施:①穿刺针不宜太粗,尽可能地减少动脉损伤;②严格无菌操作;③留置期间应定时用肝素稀释液加压冲洗测压管道系统;④置管时间不宜太长,一般不超过7天。</p>\r
<p>2. 临床意义</p>\r
<p>(1) 收缩压: 主要由心肌收缩力和心排血量决定, 其重要性在于克服各脏器的临界关闭压, 保证脏器的供血。如肾的临界关闭压为 70,mmHg , 当收缩压低于此值时, 肾小球缺血、滤过率减小, 发生少尿。</p>\r
<p>(2)舒张压:主要由外周血管阻力决定,其重要性在于维持冠状动脉灌注压。</p>\r
<p>(3) 脉压: 收缩压与舒张压之差, 与心脏每搏输出量和血容量有关。
大量心包积液或血容量不足时, 脉压减小。</p>\r
<p>(4) 平均动脉压: 心动周期每一瞬间动脉血压的平均值。平均动脉压 = 舒张压 + 1/3 脉压。平均动脉压与心排血量和体循环血管阻力有关, 是反映脏器组织灌注良好与否的指标之一。</p>\r
<p>考点提示:有创动脉压和无创动脉压的区别。</p>\r
<p>(四) 中心静脉压监测</p>\r
<p>中心静脉压(central venous pressure, CVP)是指胸腔内上、下腔静脉内的压力,主要反映右心前负荷和血容量,以此判断右心功能和血容量的多少。</p>\r
<p>1. 适应证</p>\r
<p>(1) 需要持续测定中心静脉压用于评估右心功能或血容量, 如大中型手术、休克、脱水、失血、容量不足、右心功能不全等。</p>\r
<p>(2)为大量静脉输血、输液或需要完全胃肠外营养支持的患者提供静脉通道和监测。</p>\r
<p>2. 正常值 5～12,cmH<sub>2</sub>O(0.49～1.18,kPa) 。</p>\r
<p>3. 临床意义 CVP 能反映循环血量和右心功能之间的关系,对指导治疗具有重要的参考价值。小于 5,cmH<sub>2</sub>O 提示右心房充盈不良或血容量不足;大于 20,cmH<sub>2</sub>O 提示右心功能不全或血容量超负荷。CVP 监测对指导临床输液输血的量及速度、防止心脏过度负荷及指导应用利尿药等具有重要的参考意义(表 2-5)。</p>\r
<p style="text-align: center;">表 2-5 中心静脉压与血压综合判断的临床意义及处理原则</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540012-8-l.jpg" /><figcaption></figcaption></figure>\r
<p>注: 补液试验是指取等渗盐水 250mL, 在 5~10min 内静脉滴入。若血压升高而 CVP 不变, 提示血容量不足; 若血压不变而 CVP 升高 3~5cmH₂O, 提示心功能不全。</p>\r
<p>4. 测量方法 临床通常有开放式测压(通过标尺计压)和密闭式测压(通过换能器计压)两种。密闭式测压可连续监测,但物品准备较为复杂,该内容需要到临床进一步学习。手动监测虽然传统,但原理清晰,用物准备简单,以下主要讲述手动开放式测压方法。</p>\r
<p>(1) 患者准备: 测压前患者需做好中心静脉置管, 根据情况选择中心静脉导管 (CVC) 置管或经外周置入的中心静脉导管 (PICC) 置管。</p>\r
<p style="text-align: center;">图2-78 中心静脉压简易测压示意图</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540012-9-l.jpg" /><figcaption></figcaption></figure>\r
<p>(2)测压装置:包括测压管、输液管、三通开关、标尺等(图2-78)。</p>\r
<p>1) 零点调节: 患者取平卧位, 将测压管刻度零点调至与第 4 肋间腋中线右心房水平处, 确保管道通畅。</p>\r
<p>2) 测压准备: 初次测压患者, 注意三通开关的状态, 保证测压管液面略高于正常 CVP 值, 但不能从顶端管口流出。</p>\r
<p>3) 开始测压: 调节三通开关, 待测压管液面静止时观察测压管高度, 此时刻度所指为患者 CVP 值。</p>\r
<p>4) 测压结束: 调节三通开关, 输液管和静脉导管相通, 开放输液通路后选择继续输液或封管。</p>\r
<p>(3)测压时应注意:①标尺应保持竖直,否则计压可大于实际压力;②标尺零点应与患者右心房中点(第4肋间腋中线位置)处于同一水平;③测压管道内应保持通畅,避免气泡或血栓形成。对于怀疑有右心病变的患者,可采用换能器计压,通过CVP波形变化反映右心功能。</p>\r
<p>5. 监测要点</p>\r
<p>(1) 中心静脉压测量的时间间隔应视病情而定, 病情不稳定时, 须每隔 30 ~ 60min 监测 1 次; 一般情况下, 每 2h 监测 1 次并做好记录, 直至患者病情平稳。</p>\r
<p>(2) 患者体位改变时, 测压前应重新调节零点, 以保持测压管零点始终与右心房在同一水平线上。</p>\r
<p>(3) 测压时, 应先排尽测压管中的气泡, 防止气体进入静脉内造成
空气栓塞并影响中心静脉压值的准确性。</p>\r

<p>(4) 每次测压后及时将三通管转向肝素盐水输入通路做持续点滴, 防止血凝块堵塞静脉。应用监护仪连续测定中心静脉压时, 要采用持续冲洗装置, 以保持测压管道的通畅。</p>\r
<p>(5)需利用测压的静脉通路输液时,可通过连接另一个三通管进行。一般情况下,不宜在此输液瓶内加入血管活性药物、钾溶液及其他急救药物,防止测压时中断上述药物的输入或测压后药物随溶液快速输入体内而引起血压或心律的变化,甚至危及生命。</p>\r
<p>(6) 中心静脉压测量应在患者平静的状态下进行, 对机械通气治疗时应用呼气末正压通气 (PEEP) 者, 若病情许可, 应暂时停用 PEEP。患者咳嗽、腹胀、烦躁时, 应予以处理, 待其安静 10 ~ 15min 后再行测压。</p>\r
<p>(7)随时观察测压管内的液平面能否随患者的呼吸而微微地上下波动,以判断测压管是否通畅。若管内液面无波动或液面过低,可能为静脉内导管堵塞、受压、漏液或导管尖端顶于血管壁等原因所致,应及时处理。</p>\r
<p>(8)防止污染,每天消毒静脉穿刺部位并更换敷料1次,定时更换测压管道,严格无菌操作,尽量减少抽血、静脉注射的机会。</p>\r
<p>6.并发症及防治</p>\r
<p>(1) 出血和血肿: 颈内静脉穿刺时, 穿刺点或进针方向偏内时, 易穿破颈动脉, 进针太深可能穿破椎动脉和锁骨下动脉, 在颈部形成血肿, 肝素化后或凝血机制不好的患者更易发生。因此, 穿刺前应熟悉局部解剖, 掌握穿刺要点, 一旦误穿入动脉, 应做局部压迫。对于肝素化患者, 更应延长局部压迫时间。</p>\r
<p>(2) 心律失常: 导管插入过深时, 其顶端会进入右心房或右心室, 对心肌造成机械性刺激而诱发心律失常。预防方法: 在操作过程中要确保导管前端位于距右心房入口 2cm 处。</p>\r
<p>(3) 感染: 中心静脉置管感染率为 2%~10%, 因此, 在操作过程中应严格遵循无菌操作技术; 加强置管护理, 导管每天用肝素溶液冲洗, 穿刺点每天消毒并更换无菌敷贴。</p>\r
<p>(4)其他:包括气胸、血胸、气栓、血栓、神经和淋巴管损伤等。虽然发病率很低,但后果严重。因此,必须加强预防措施,熟悉局部解剖,认真操作,一旦出现并发症,应立即采取积极处理措施。</p>\r
<p>考点提示: CVP 监测的方法和意义。</p>\r
<p>(五)肺动脉楔压监测</p>\r
<p>肺动脉楔压(PAWP)是指漂浮导管在肺小动脉楔入部位所测得的压力。</p>\r
<p>1. 正常值 6~12mmHg。</p>\r
<p>2. 适应证 ①急性呼吸窘迫综合征(acute respiratory distress syndrome, ARDS)并发左心衰；②循环功能不稳定时；③区分心源性肺水肿和非心源性肺水肿。</p>\r
<p>3. 临床意义 用于评估左心前负荷和右心后负荷,有助于判定左心室功能,反映血容量是否充足。PAWP &gt; 12mmHg 提示左心功能不全、急性肺水肿;PAWP &lt; 6mmHg 提示体循环血量不足。PAWP 是诊断急性肺损伤和 ARDS 的重要指标。</p>\r
<p>二、呼吸系统功能监测</p>\r
<p>呼吸系统功能监测的主要目的是对患者的呼吸运动、通气功能、气体交换功能及动脉血气分析等方面进行评估,了解危重患者呼吸与气体交换功能的动态变化,便于观察病情和调整治疗方案,以及对呼吸治疗方法的有效性作出合理的评估等。</p>\r
<p>(一)呼吸运动监测</p>\r
<p>1. 呼吸频率(respiratory rate, RR) 指每分钟的呼吸次数, 反映患者通气功能及呼吸中枢的兴奋性, 是呼吸功能监测中最简单、最基本的监测项目。RR 可用简单的目测计数, 也可用仪器测定。正常成人呼吸频率为 10 ~ 18 次/分, 小儿呼吸频率随年龄变小而增快。如成人呼吸频率 &lt;6 次/分或 &gt;35 次/分均提示呼吸功能障碍。</p>\r
<p>2. 呼吸节律 指呼吸的规律性,正常呼吸应该是节律自然而均匀。观察呼吸节律的变化,能够及时发现异常呼吸类型,提示病变部位,如伴有喘鸣和呼气延长的呼吸状态多由慢性阻塞性
肺疾病所致;呼吸频率快、潮气量小、无气道狭窄和阻塞却有呼吸急促表现的,可见于肺或胸廓限制性通气障碍、急性呼吸窘迫综合征、心脏疾病和其他心肺以外疾病。</p>\r
<p>3. 呼吸周期的吸呼比 指一个呼吸周期中吸气时间与呼气时间之比。正常吸呼比为 1: (1.5 ~ 2)，吸呼比的变化反映肺的通气与换气功能。可通过直接目测或使用人工呼吸机(非控制呼吸时)呼吸活瓣的运动情况进行评估，精确测量时需通过呼吸功能检测。</p>\r
<p>4. 胸、腹式呼吸运动的监测 胸式呼吸是指以胸廓活动为主的呼吸,腹式呼吸是指以膈肌运动为主的呼吸。一般男性及儿童以腹式呼吸为主,女性以胸式呼吸为主,但实际上两种呼吸方式很少单独存在或截然分开。其主要监测胸、腹式呼吸是否同步及双侧是否对称、有无异常呼吸体征等。胸式呼吸减弱或消失,可能为两侧胸部皆有疾患或高位截瘫,也可见于骨骼肌松弛药(肌松药)完全降解前存在一定残留的肌松作用;吸气三凹征提示上呼吸道梗阻;呼气性呼吸困难提示下呼吸道梗阻。</p>\r
<p>(二)通气功能监测</p>\r
<p>1. 潮气量(tidal volume, VT) 指在平静呼吸时,一次吸入或呼出的气体量。VT 可用肺功能监测仪或肺量仪直接测定。由于测定方便,VT 已成为呼吸容量中最常用的测定项目之一。VT 正常值为 8 ~ 12mL/kg,平均约为 10mL/kg,男性略大于女性。VT 反映人体静息状态下的通气功能,在使用人工呼吸机时还可以通过测定吸气与呼气 VT 的差值来反映呼吸管道的漏气情况。</p>\r
<p>2. 每分通气量(minute ventilation, MV 或 VE) 指在静息状态下每分钟呼出或吸入的气体量, 是肺通气功能最常用的监测指标之一。MV = VT × RR。正常值为 6 ~ 8L/min, 成人 MV &gt; 10L/min 则提示通气过度, MV &lt; 4L/min 则提示通气不足。</p>\r

<p>3. 生理无效容积(volume of physiological dead space, VD) 指解剖无效腔与肺泡无效腔的容积之和。解剖无效腔指从口、鼻、气管到细支气管之间的呼吸道所占的空间，肺泡无效腔指肺泡中未参与气体交换的空间。健康人平卧时解剖无效腔与生理无效腔容积近似相等，疾病时生理无效腔容积可增大。VD/VT 的值反映通气的效率，正常值为 0.2 ~ 0.35，主要用于评价无效腔对患者通气功能的影响，有助于寻找无效腔增加的原因。</p>\r
<p>4. 肺泡通气量(alveolar ventilation, VA) 指在静息状态下每分钟吸入气量中到达肺泡进行气体交换的有效通气量。 VA=(VT-VD)×RR 。正常值为 4.2L/min，它反映了真正的气体交换量。</p>\r
<p>5. 呼气末二氧化碳 (end-tidal carbon dioxide, <img alt="" src="bookpicture/ds066854/ds0668540012-11-l.jpg" />) <img alt="" src="bookpicture/ds066854/ds0668540012-12-l.jpg" /> 监测包括呼气末二氧化碳分压 (pressure end-tidal carbon dioxide, <img alt="" src="bookpicture/ds066854/ds0668540012-13-l.jpg" />)、呼出二氧化碳浓度、呼出二氧化碳波形及其趋势图监测, 属于无创监测, 可反映肺通气功能状态和计算二氧化碳的生产量, 同时也可反映循环功能、肺血流量情况等。 <img alt="" src="bookpicture/ds066854/ds0668540012-14-l.jpg" /> 监测现已成为临床常用的监测方法, 在手术室、ICU 和急诊科均应用广泛, 可监测气管插管的位置是否正确、自主呼吸是否恢复、机械通气参数设定是否合理及心肺复苏是否有效等。</p>\r
<p>(1) PETCO<sub>2</sub> 监测的原理: 可根据红外线光谱原理、食谱原理或分光原理测定呼气末部分气体中的 CO<sub>2</sub> 分压,
 其中红外线光谱法的应用最为广泛, 主要利用 CO<sub>2</sub> 能吸收波长为 4.3μm 的红外线这一特征, 使红外线光数量衰减, 其衰减程度与 CO<sub>2</sub> 浓度成正比。</p>\r
<p>(2) PETCO <sub>2</sub> 监测的临床意义: 具体如下。</p>\r
<p>1) 判断通气功能: PETCO<sub>2</sub> 的正常值是 35～55mmHg 。对于无明显心、肺疾病的患者, 常根据 PETCO<sub>2</sub> 与 PaCO<sub>2</sub> 的监测结果来判断患者的通气功能状况, 并可据此调节通气量, 以避免通气过度或不足。</p>\r
<p>2) 反映循环功能: PETCO<sub>2</sub> 在一定程度上也反映了循环系统功能。低血压、低血容量、休克及心力衰竭时, 随肺血流量减少, PETCO<sub>2</sub> 也降低, 呼吸、心跳停止时, PETCO<sub>2</sub> 迅速降为零。</p>\r
<p>3) 判断人工气道的位置与通畅情况: 通过 PETCO<sub>2</sub> 监测有助于判断气管插管是否在气管内及判断气管－食管导管的正确位置。气管插管移位误入食管时, PETCO<sub>2</sub> 会突然降低接近于零: 气管－食管导管的导管双腔中随呼吸有明显 PETCO<sub>2</sub> 变化的腔应为气管插管开口。另外, 通过 PETCO<sub>2</sub> 监测可了解气管与气管内导管的通畅情况, 当发生阻塞时, PETCO<sub>2</sub> 和气道压均升高。</p>\r
<p>(三)脉搏血氧饱和度</p>\r
<p>脉搏血氧饱和度(pulse oxygen saturation, SpO<sub>2</sub> ) 是通过动脉脉搏分析来测定血液在一定氧分压下氧合血红蛋白占全部血红蛋白的百分比。</p>\r
<p>1. SpO<sub>2</sub> 监测的方法 临床上 SpO<sub>2</sub> 通常是用脉搏血氧饱和度测定仪来监测获得的，脉搏血氧饱和度测定仪是一种对周围组织中动脉血的氧饱和度进行持续非创伤性监测的仪器。成人多用指夹法，如果患者指甲较厚或末梢循环较差时选用耳朵法，小儿监测时多采用耳朵法。</p>\r
<p>2. SpO<sub>2</sub> 监测的原理 血红蛋白具有光吸引的特性,但氧合血红蛋白与游离血红蛋白吸收不同波长的光线,利用光线分度计比色原理,可以监测得到随动脉搏动血液中氧合血红蛋白对不同波长的吸收光谱,而间接了解患者血氧分压的高低,判断氧供情况。</p>\r
<p>3. <img alt="" src="bookpicture/ds066854/ds0668540012-15-l.jpg" /> 监测的临床意义 <img alt="" src="bookpicture/ds066854/ds0668540012-16-l.jpg" /> 的正常值为 96%～100% 。临床上 <img alt="" src="bookpicture/ds066854/ds0668540012-17-l.jpg" /> 与 <img alt="" src="bookpicture/ds066854/ds0668540012-18-l.jpg" /> 有显著的相关性， <img alt="" src="bookpicture/ds066854/ds0668540012-19-l.jpg" /> 在临床重症监护方面应用广泛，常用于监测呼吸暂停、发绀和缺氧的严重程度。 <img alt="" src="bookpicture/ds066854/ds0668540012-20-l.jpg" /> 时常提示有低氧血症。但一氧化碳中毒时由于碳氧血红蛋白与氧合血红蛋白的吸收光谱非常近似，严重的低氧血症可能被正常监测结果掩盖。因此，一氧化碳中毒时不能以 <img alt="" src="bookpicture/ds066854/ds0668540012-21-l.jpg" /> 监测结果来判断是否存在低氧血症。</p>\r

<p>
考点提示: SpO<sub>2</sub> 的监测方法及临床意义。</p>\r
<p>(四) 动脉血气分析监测</p>\r
<p>血气分析是危重患者监测中必不可少的项目,通过血气分析可以监测患者的氧合状况及酸碱平衡情况,为危重患者的诊断与治疗提供可靠依据。目前临床上常用的血气分析为有创血气分析。</p>\r
<p>1. 监测项目和指标 血 pH 值、 PaCO<sub>2</sub> 、 PaO<sub>2</sub> 、 HCO<sub>3</sub><sup>-</sup> 、 SaO<sub>2</sub> 等。</p>\r
<p>2. 血气分析标本的留取 一般选择较易扪及或较暴露部位的动脉进行穿刺采取血样。在抽取动脉血气标本时，必须先用肝素稀释液湿润注射器或使用特殊血气分析注射器，在抽取动脉血样前推净注射器内的液体和气泡。选择在动脉搏动最明显处进针采血 2mL。采血后应立即拔出针，并将针头插入准备好的胶塞内密封，使之与空气隔绝。这时将注射器轻摇，使血液和肝素充分混匀，防止凝血。</p>\r
<p>3. 影响血气分析结果的因素</p>\r
<p>(1) 心理因素: 患者在抽血样时恐惧、烦躁不安、精神紧张而诱发快速呼吸, 则可导致 PaCO<sub>2</sub> 降低; 若患者因害怕疼痛而屏气, 则可发生通气不足导致 PaCO<sub>2</sub> 升高。烦躁、精神紧张患者需休息 30min, 必要时可使用镇静剂。</p>\r
<p>(2)采血量及肝素浓度:肝素浓度是保证血气分析结果准确的核心,肝素用量过多可造成稀释性误差,使pH值与 PaO<sub>2</sub> 值偏低、 PaCO<sub>2</sub> 值偏高,出现假性低碳酸血症。但肝素用量过少,便起不到抗凝的作用。国际生化联合会(IFCC)推荐血气标本中肝素的最终浓度为50U/mL。</p>\r
<p>(3)采血部位与进针角度:动脉采血部位应选择侧支循环丰富、外周浅表易扪及、大小合适、进针时疼痛少的动脉。桡动脉为最适合的穿刺部位。桡动脉无法穿刺时可选择足背动脉、肱动脉、股动脉。</p>\r
<p>(4) 血标本有气泡: 气泡会影响血气的 pH 值、 PaCO<sub>2</sub> 、 PaO<sub>2</sub> 检测结果, 特别是 PaO<sub>2</sub> 值。理想的血气标本, 其空气气泡应低于 5%。</p>\r
<p>(5)采血时机:要适合,患者在吸氧情况下会明显影响动脉血气分析结果。要正确了解患者是否出现了呼吸衰竭,病情许可的情况下可停止吸氧30min,可在机械通气设置参数30min后采血进行血气分析。</p>\r
<p>(6)标本送检时间:标本应及时送检。 PaCO<sub>2</sub> 、 PaO<sub>2</sub> 和乳酸的检测必须在 15min 内完成,其余项目如 pH 值、电解质、BUN、血红蛋白、血细胞比容和血糖的检测,要求在 60min 内完成。乳酸标本在检测前必须将其保存在冰箱(冰水)中。其他检测项目的标本可在室温或冰水中保存,应不超过 1h。</p>\r
<p>三、消化系统功能监测</p>\r
<p>胃肠与肝脏功能障碍时会引起机体内环境与全身功能状态的改变。因此，危重症患者消化系统功能状态的监测与维护对改善危重症患者的预后至关重要。消化系统功能监测主要包括肝功能监测、胃肠功能监测和腹内压监测。</p>\r
<p>(一) 肝功能监测</p>\r
<p>肝脏是人体重要的代谢器官和消化器官,同时具有强大的解毒功能和储存功能,因此,监测重症患者的肝功能具有重要意义。肝功能监测是通过各种生化试验方法监测与肝脏代谢有关的各项指标,以观察肝功能的基本情况。</p>\r
<p>1. 精神症状与意识状态监测 肝功能失代偿易诱发肝性脑病,患者常会出现精神症状及意识障碍的表现。监测患者精神症状与意识状态的表现是监测肝功能的一项简便内容。</p>\r
<p>2. 病原学监测 我国肝炎患者主要是乙型肝炎,近年来丙型肝炎患者也在不断增加,且乙型肝炎和丙型肝炎是肝炎后引起肝硬化的主要原因,也是肝功能衰竭的主要原因。可通过病原学监测患者的甲、乙、丙、戊型肝炎病毒来判断患者有无肝炎及肝炎的类型。</p>\r
<p>3. 血清蛋白监测 血清总蛋白(total protein, TP)是血清白蛋白(serum albumin, ALB)与血清球蛋白(serum globulin, GLB)的总称。血清总蛋白的正常值是60~80g/L；血清白蛋白的正常值是40~50g/L；血清球蛋白的正常值是20~30g/L；血清白蛋白/球蛋白(A/G)为(1.5~2.5):1。白蛋白的含量与肝细胞的数量成正比，白蛋白逐渐下降
时预后多不佳。白蛋白少于25g/L易出现腹水。A/G倒置提示肝功能严重损伤。</p>\r
<p>4. 血清酶学监测 肝脏含有大量参与机体代谢及解毒的酶, 当肝细胞膜受损或细胞坏死时, 丙氨酸转氨酶(ALT)、天冬氨酸转氨酶(AST)、胆碱酯酶等入血增多。测定各种酶的变化, 对了解和评估肝脏功能具有重要的临床意义。</p>\r
<p>5. 血氨监测 体内蛋白质产生具有毒性的氨,肝脏能够将氨合成为尿素,经肾脏排泄。血氨正常值为 18～72μmol/L 。肝功能严重受损时血氨升高,易导致肝性脑病。</p>\r
<p>6. 凝血功能监测 肝功能受损时检查凝血功能异常的常用指标有凝血酶原时间(prothrombin time, PT)、活化部分凝血酶原时间(activated artial troboplatin time, APTT)、凝血酶凝固时间及肝促凝血酶原激酶试验等。</p>\r
<p>7. 黄疸监测 黄疸可分为溶血性黄疸、肝细胞性黄疸和梗阻性黄疸。黄疸的出现是肝功能障碍的重要表现之一，生化检验主要表现为血清胆红素升高。血清总胆红素(serum total bilirubin, STB)的正常值是3.4~17.1μmol/L，其中直接胆红素(direct bilirubin, DBIL)的正常值为0~7.32μmol/L，间接胆红素(indirect bilirubin, IBIL)的正常值为0~13.68μmol/L。各种类型的黄疸都会出现STB的升高：肝细胞性黄疸表现为直接胆红素和间接胆红素均升高；梗阻性黄疸以直接胆红素升高为主；溶血性黄疸主要表现为间接胆红素升高。</p>\r

<p>(二) 胃肠功能监测</p>\r
<p>胃肠道是对严重创伤、休克、严重感染、大面积烧伤、严重颅脑损伤等反应比较强烈的部位。胃肠道黏膜又是全身代谢最活跃的器官之一，更是体内最大的细菌库，胃肠道黏膜屏障能阻止胃肠道内细菌及其分解产物经肠壁移至机体内。胃肠功能，特别是胃肠道黏膜屏障功能，已成为判断危重症患者预后的一个重要条件。目前临床常用的胃肠道功能监测方法有胃液监测、胃潴留监测、胃肠黏膜内pH值监测等。</p>\r
<p>1. 胃液监测 胃液是胃黏膜不同腺体细胞分泌的混合液体,除含水(91%~97%)外,还含有盐酸、酶(如胃蛋白酶)、黏液、内因子、电解质等,其分泌量受食物影响最大。正常空腹胃液量为30~50mL,清晰无色或因含有黏液而呈稍混浊的灰白色液体,pH值为0.9~1.8。严重创伤、感染、休克等应激状态可引起胃液分泌增加,易出现以胃黏膜糜烂、溃疡和出血为特征的急性胃黏膜病变。胃内酸性环境可促进胃内细菌的生长繁殖,引起细菌移位,成为内源性院内感染的重要因素之一,因此,对重症患者进行胃液pH值监测具有重要意义。</p>\r
<p>(1) 目的: 胃液检查可了解胃的分泌功能和胃液中有无病理性成分, 辅助诊断胃、十二指肠病和其他影响胃分泌功能的疾病, 也可用于探索某些疾病的发病机制和病理生理。</p>\r
<p>(2) 测量方法: 患者在空腹状态下插入胃管, 顶端置于胃腔的最低位。抽尽空腹胃液, 然后收集</p>\r
<p>60min 的基础胃液。随即肌内注射五肽胃泌素(6μg/kg)或磷酸组胺(40μg/kg)，每15min收集1份胃液，共4份。各份胃液标本分别做以下检查：①记录胃液量、颜色、气味，有无食物残渣；②测定胃液的酸碱度，定量检测胃液的总酸分泌量；③需要时在显微镜下观察空腹胃液有无红细胞、白细胞及结核分枝杆菌，以协助诊断。</p>\r
<p>(3)临床意义:①在未进食情况下胃液量明显增多( ⩾ 100mL),提示胃分泌量过高或胃蠕动能力减慢。②胃液呈咖啡色或为血性液,提示上消化道出血;胃液呈黄色或草绿色,提示胆汁反流。③正常人的基础胃酸排出量为0~5mmol/h,经五肽胃泌素或磷酸组胺刺激后的最大胃酸排出量为10~30mmol/h。萎缩性胃炎、胃癌、恶性贫血、胃大部切除或迷走神经切断术后等患者的胃酸分泌常减少;而十二指肠溃疡、胃泌素瘤等患者的胃酸分泌常增加。</p>\r
<p>2. 胃潴留监测 胃潴留是指因胃排空障碍使胃内容物不能顺利排入十二指肠而潴留在胃内。其常见原因有消化不良、胃动力减弱、急性胃扩张、幽门梗阻等。主要症状为上腹饱胀或疼痛不适，常由
进食引起或餐后加重，同时有恶心、呕吐、食欲缺乏等。出现下列表现之一的患者应考虑有胃潴留：①饭后4h仍有300mL液体储存于胃内；②口服硫酸钡4h后仍有60%以上在胃内潴留；③禁食过夜后仍有200mL以上胃内容物残留。</p>\r
<p>3. 胃肠道黏膜内 pH 值监测 胃肠道缺血引起的胃肠黏膜屏障受损,造成细菌和内毒素移位,常是脓毒症和 MODS 重要的启动因素。胃肠黏膜内 pH(intramucosal pH, pHi) 值可反映器官局部的氧合状态,也可间接反映全身的缺氧情况。此监测对危重患者的复苏效果评价及预后评估具有高敏感性、特异性,且因安全、经济等优点不断得以推广应用。</p>\r
<p>(1) 监测方法: 有直接法和间接法两种。直接法是采用 pH 值微电极直接进行监测, 这是一种有创性的精确监测方法, 但操作过程复杂, 在临床应用较少。间接法: ① 生理盐水张力法, 是通过置入特殊的葡萄糖生理盐水导管至胃腔, 向其前端半透膜囊内注入一定量的生理盐水, 30 ~ 90min 后抽出囊内生理盐水, 弃去前 1.5mL 无效腔内液体, 保留余下的 2.5mL 做血气分析, 同时抽取动脉血进行血气分析, 利用亨德森-哈塞尔巴尔赫方程 (Henderson-Hasselbalch 公式): pHi = 6.1 + log(HCO₃⁻/PaCO₂ × 0.03 × k), 可以计算出 pHi 值。公式中, 0.03 为 CO₂ 解离常数, k 为不同平衡时间对应的校正系数。② 空气张力法, 是将胃黏膜 CO₂ 张力计插入胃腔并连接胃张力监测仪, 通过对胃张力监测仪气囊内空气进行自动采样, 可直接测出 PaCO₂, 同样要求抽取动脉血进行血气分析, 利用 Henderson-Hasselbalch 公式计算出 pHi 值。</p>\r
<p>(2)临床意义:如下。</p>\r
<p>1) pHi 值的正常范围: 7.35 ~ 7.45。</p>\r
<p>2) 休克患者器官灌注状态评估: 机体在维持其内环境稳态和行使功能时所需要的能量直接来源于 ATP 的分解, 当机体遭受创伤、失血及感染等因素发生休克后, 组织细胞氧供应不足, ATP 的合成小于其分解而产生大量的 H<sup>+</sup>,H<sup>+</sup> 主要存在于胃黏膜内, 引起 pHi 值下降, 组织细胞缺氧程度越严重, pHi 值下降越明显。因此, pHi 监测提供了部分器官组织氧合充分与否的判定依据。胃肠道是休克时缺血发生最早、最明显的脏器, 同时也是复苏后逆转最晚的脏器。休克早期单纯从临床表现与全身性输送指标等常难以发现局部或隐藏的器官低灌注状态, 通过 pHi 监测能够早期预警、指导治疗、纠正缺血缺氧状态、预防 MODS。</p>\r
<p>3)危重症患者预后评估:在评估危重症患者预后方面,pHi 监测被认为较其他监测方法更为敏感和可靠,已成为临床早期评估预后的重要指标之一。全身监测指标已完全恢复正常,而 pHi 值仍低的状态称为“隐性代偿性休克”,隐性代偿性休克是导致胃肠黏膜屏障受损害、细菌和内毒素移位,进而诱发严重的脓毒症和 MODS 的主要原因。通过对循环衰竭危重症患者的研究表明,pHi 值低者较 pHi 值正常者病死率明显升高。纠正低 pHi 值可以改善复苏的预后,因此,对于复苏患者监测 pHi 值的变化,并及时纠正低 pHi 状态具有重要的临床价值。</p>\r

<p>（三）腹内压监测</p>\r
<p>1. 适应证 腹内压(intra-abdominal pressure, IAP)是指腹腔内压力,其稳定、平衡对维持生理状态下机体各脏器的正常功能至关重要。</p>\r
<p>IAP 监测适用于创伤后或腹部手术后,如腹腔感染、术后腹腔内出血、复杂的腹腔血管手术(如肝脏移植)、严重的腹腔外伤伴随脏器肿胀、腹腔内或腹膜后血肿形成、使用腹腔内填塞物止血、急性胰腺炎等。有腹内高压倾向的患者应将 IAP 监测作为常规监测项目,有膀胱外伤的患者是膀胱压监测的绝对禁忌证。</p>\r
<p>2. 监测方法</p>\r
<p>(1) 直接测压法: 通过腹腔引流管或穿刺针连接水压计或压力传感器直接测定 IAP。该方法测量结果直接准确, 但属于有创性监测, 容易给患者造成感染、出血等伤害, 临
床上一般不作为常规监测方法。</p>\r
<p>(2)间接测压法:本节主要介绍以胃内压、膀胱内压等来间接反映IAP的方法。</p>\r
<p>1) 胃内压: 腹内压可通过测量胃内压来进行估计, 从鼻胃管或胃造口管向胃内缓慢注射 50 ~ 100mL 盐水, 或应用胃内气囊, 近端提起与地面垂直, 通过连接的水压计或压力传感器进行测压, 以腋中线为零点测量, 液面高度即为胃内压。研究表明, 当腹内压低于 20mmHg 时, 胃内压与膀胱内压有一定的相关性; 当腹内压突然升高超过 20mmHg 时, 胃内压与膀胱内压则显示不一致。</p>\r
<p>2) 膀胱内压: 是临床上使用最广泛的方法。在 0 ~ 70mmHg 的腹内压范围内, 膀胱内压与腹内压直接测量值高度相关, 被认为是临床间接测量腹内压的“金标准”。但在膀胱挛缩、神经源性膀胱或腹腔粘连等情况下, 用膀胱内压估计腹内压较粗略。①间断测定膀胱内压法: 患者取仰卧位, 保持腹肌松弛, 留置 Foley 尿管, 排空膀胱, 接三通管; 向膀胱内注入温度为 37.0℃ 的无菌 0.9% NaCl 125mL (当灌注量为 125mL 时, 膀胱内压和腹内压相关性最好), 注入时间 &gt;1min, 通过三通管连接水压计, 以腋中线为零点, 等水柱波动平稳时, 于呼气末测定, 水柱高度即为 IAP (所测数字单位为 cmH₂O)。②持续测定膀胱内压法: 在三腔尿管上加一个三通开关, 除一腔道用于持续导尿外, 另一腔道用生理盐水 (4mL/h) 持续注入膀胱, 第三个腔道连接在传感器及床旁监护仪上, 调零点同间断测定膀胱内压法, 可记录全部数值。此法省时、省力, 可更好地监测病情, 尽早发现间断测定膀胱内压法数小时间隔中的 IAP 变化。</p>\r
<p>3. IAP 监测的影响因素</p>\r
<p>(1) 患者处于病态肥胖、怀孕等状态, 可能会合并慢性 IAP 升高。</p>\r
<p>(2)危重症患者的 IAP 通常会高于正常基线水平(5~7mmHg)。</p>\r
<p>(3)近期腹部手术史、机械通气、体位改变等也可伴IAP升高。</p>\r
<p>(4)外界因素,患者使用胸腹带、棉被过重压在腹部和未采取平卧位等都会使腹内压增高。</p>\r
<p>(5) 患者烦躁不安、频繁咳嗽和咳痰、呼吸困难等因素都会不同程度地影响 IAP 的监测。</p>\r
<p>(6)膀胱本身因素会影响IAP监测,如既往有膀胱手术史、膀胱肿瘤、膀胱炎、神经性膀胱等。</p>\r
<p>(7)原有腹部手术史,如腹膜粘连会引起腹腔局限性高压,此类患者即使膀胱测压正常,也不能排除腹内高压的存在,而应结合临床和其他检查才能明确诊断。</p>\r
<p>(8)注入膀胱的生理盐水适宜温度为 37～40<sup>∘</sup>C ，过冷、过热及灌注速度过快可使膀胱内压增高。为减少人为误差，可重复测量2或3次取平均值。</p>\r
<p>(9) 小型膀胱、神经源性膀胱、腹腔粘连、膀胱创伤、排尿异常、张力性盆腔血肿等情况，膀胱内压监测可靠性不高，可使用经胃测压法。</p>\r
<p>考点提示: 消化系统功能的监测指标和意义。</p>\r
<p>四、神经系统功能监测</p>\r
<p>脑为机体的重要器官,其结构和功能十分复杂,与全身各脏器、各部位密切相关。中枢神经系统功能监测包括意识监测、瞳孔监测、颅内压监测和脑电监测。</p>\r
<p>(一) 意识监测</p>\r
<p>意识状态是中枢神经系统是否受损的客观标志。意识障碍是机体对自己和周围环境的感知与理解能力减退或消失。护理人员应当能够区分患者有无脑功能受损及受损程度，并给予相应的监测及护理。</p>\r
<p>1. 意识障碍分类</p>\r
<p>(1) 嗜睡: 是最轻的意识障碍, 为病理性, 表现为持续睡眠状态, 但易唤醒, 醒后有一定的语言和运动反应, 并能正确回答问题, 刺激解除后又很快入睡。</p>\r
<p>(2) 意识模糊: 是意识水平轻度下降的一种意识状态, 比嗜睡意识障碍深, 能保持简单的精神活动, 但对时间、地点、人物、定向力部分或完全发生障碍。</p>\r
<p>(3) 昏睡: 是接近不省人事的意识状态。患者受到强刺激可被唤醒, 但很快又入睡, 醒时回答问题模糊或答非所问。</p>\r
<p>(4)昏迷:是意识障碍的重要表现,是大脑皮质和脑干网状结构受到高度抑制的状态,表现为意识丧失、自主运动消失、对外界无反应。根据其反应程度,可将昏迷分为浅、中、深三种类型。</p>\r
<p>2. 意识障碍程度评估 可通过与患者交流,了解其思维、反应、情感活动、定向力等状况,必要时做痛觉试验、瞳孔对光反射试验、角膜反射
试验、膝腱反射试验等,协助判断意识障碍的程度。临床上也常用格拉斯哥(Glasgow)昏迷评分法(GCS)进行评估。Glasgow昏迷评分法是从睁眼、言语和运动3个方面分别评分,以三者的积分表示意识障碍的程度。GCS评分最高分为15分,表示意识清楚;8分以下为昏迷;3分为最低值(表2-6)。</p>\r
<p style="text-align: center;">表 2-6 Glasgow 昏迷评分法</p>\r

<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540012-22-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">注：*指疼痛刺激时肢体的运动反应。</p>\r
<p>(二)瞳孔监测</p>\r
<p>正常瞳孔为双侧瞳孔等大、等圆，在自然光下直径为2~5mm，对光反射灵敏。瞳孔的评估结果是对颅脑损伤后判断脑疝存在及脑干功能损害程度的重要指标。临床上常见以下几种瞳孔异常情况。</p>\r
<p>1. 双侧瞳孔缩小 双侧瞳孔直径 &lt;2mm。常见于有机磷、吗啡、氯丙嗪中毒，脑桥出血使瞳孔呈针尖样（瞳孔直径 &lt;1mm）。</p>\r
<p>2. 患侧瞳孔缩小 患侧瞳孔直径 &lt;2mm。常见于小脑幕切迹疝早期, 患者瞳孔先短暂缩小后逐渐散大, 意识障碍进行性加重, 病灶对侧肢体肌力下降。若一侧瞳孔缩小伴眼睑下垂, 常见于霍纳 (Horner) 综合征。</p>\r
<p>3. 双侧瞳孔扩大 双侧瞳孔直径 &gt;5mm。常见于中枢神经损害、青光眼、滴入扩瞳药等。</p>\r
<p>4. 患侧瞳孔散大 患侧瞳孔直径 &gt;5mm。常见于动眼神经麻痹。</p>\r
<p>5. 双侧瞳孔大小不等 常见于颅内病变,如脑肿瘤、颅内出血等。</p>\r
<p>6. 双侧瞳孔散大及对光反射障碍 常见于病情急剧变化或临终表现,如脑震荡、中脑病变、深昏迷、濒死状态。</p>\r
<p>颅内压(intracranial pressure, ICP)是指颅腔内容物对颅腔壁所产生的压力。颅脑损伤患者常伴有颅内压的改变,因此,颅内压监测是观察颅脑危重症患者病情的一项重要内容。</p>\r
<p>1. 监测方法</p>\r
<p>颅内压监测</p>\r
<p>(1) 无创颅内压监测: 通过观察患者临床表现可获得其是否存在颅内压增高的主观资料。颅内压增高患者常见的临床表现为头痛、呕吐、视盘水肿、意识障碍、生命体征变化等。</p>\r
<p>1) 影像学监测: 通过影像学监测可获得患者是否存在颅内压增高的可定位及定性的客观资料。颅内压增高时, 影像学检查可见脑水肿、脑积水、脑沟变浅或消失、脑室移位受压、中线移位等现象。</p>\r
<p>2) 经颅多普勒: 通过超声多普勒效应观察脑血流速度的降低或增高, 由此可推测局部脑血流量的相应改变, 从而反映颅内压的变化。它是检测颅内脑底主要动脉的血流动力学及生理参数的无创性脑血管疾病的检查方法。</p>\r
<p>3) 视觉诱发电位: 通过闪光视觉诱发电位活动可以反映从视网膜到枕叶皮质视通路的完整性。当颅内压升高时, 神经元及纤维缺血、缺氧, 引起代谢障碍如脑脊液 pH 值下降、乳酸浓度增高、神经传导阻滞、颅内电信号传导速度减慢, 闪光视觉诱发电位波峰潜伏期延长时间与颅内压成正比, 从而可反映颅内压的改变。此方法适合重症患者, 特别是昏迷患者。</p>\r
<p>4) 脑电双频指数(BIS): 通过测定脑电图线性成分, 即频率和功率分析成分波之间的非线性关系 (即位相和谐波), 将代表不同镇静水平的脑电信号识别出来, 进行标准化和数字化处理, 转化为一种简单的量化指标。用于评估患者的镇静程度、脑损伤程度及预后。</p>\r
<p>(2)有创颅内压监测:具体如下。</p>\r
<p>1) 脑室内测压: 通过在颅缝与瞳孔中线交点处行颅骨钻孔并行脑室穿刺, 或在手术中置入细硅胶导管并与测压装置相连接, 从而测得颅内压。优点: 此法测得颅内压值最准确, 同时可通过引流脑脊液控制颅内压。缺点
: 有损伤脑组织的风险; 当脑严重受压使脑室移位或压扁时, 不易插管成功; 导管易因受压或梗阻而影响测压的准确性; 此法最严重的并发症是颅内感染, 预防感染的护理要点是始终保持管道的绝对无菌, 并防止液体反流。</p>\r
<p>2) 硬膜下测压: 通过将带有压力传感器的测压装置放于硬脑膜下、软脑膜表面测得颅内压。优点: 可避免脑穿刺引起的脑组织损伤。缺点: 准确性较脑室内测压差, 仍有感染的风险。</p>\r
<p>3) 硬膜外测压: 通过将测压装置放在内板与硬膜之间测得颅内压。优点: 无颅内感染风险。缺点: 准确性最差。</p>\r
<p>4) 腰椎穿刺测压: 通过导管针刺入患者第 3~4 腰椎棘突间隙并连接测压管测得颅内压。应特别注意, 急性颅内压升高尤其是做减压术的患者不宜采用此法测压, 因有诱发脑疝的可能。</p>\r
<p>2. 监测的意义 成年人正常颅内压为 0.7～2.0,kPa(5～15,mmHg) ，儿童正常颅内压为 0.4～1.0,kPa(3～8,mmHg) 。颅内压超过 2.0,kPa(15,mmHg) 称为颅内压增高，颅内压在 2.0～2.7,kPa(15～20,mmHg) 为轻度增高，颅内压在 2.7～5.3,kPa(20～40,mmHg) 为中度增高，颅内压大于 5.3,kPa(&gt;40,mmHg) 为重度增高。颅内压增高的患者常有头痛、呕吐和视盘水肿的典型表现。早期患者出现代偿性血压升高，脉压增大，脉搏慢而有力，呼吸深而慢，称为库欣 (Cushing) 综合征，急性期常有进行性意识障碍，慢性患者可出现神志淡漠、反应迟钝和呆滞。</p>\r
<p>通过监测颅内压可以指导降压治疗，如脱水药、利尿药、巴比妥类药物的应用等，评价治疗效果；及时发现颅内继发性损害，便于早期处理；协助诊断颅内占位性病变，颅内占位性病变往往伴随颅内压增高现象，有助于发现及诊断颅内占位性病变；有助于判断预后，如患者颅内压持续升高，昏迷程度深,神经损害症状重者,多预后不良;通过置入测压导管测压的同时,可以引流一定量的脑脊液,降低颅内压。</p>\r
<p>3. 影响颅内压的因素</p>\r
<p>(1) <img alt="" src="bookpicture/ds066854/ds0668540012-23-l.jpg" />: 脑血管对 <img alt="" src="bookpicture/ds066854/ds0668540012-24-l.jpg" /> 的反应很敏感, 这并非 <img alt="" src="bookpicture/ds066854/ds0668540012-25-l.jpg" /> 的直接影响, 而是通过改变脑血管周围细胞外液的 pH 值而引起的。 <img alt="" src="bookpicture/ds066854/ds0668540012-26-l.jpg" /> 下降时, pH 值上升, 脑血流量和脑血容量减少, 颅内压下降; <img alt="" src="bookpicture/ds066854/ds0668540012-27-l.jpg" /> 增高时, pH 值下降, 脑血流量和脑血容量增加, 颅内压升高。</p>\r

<p>(2) <img alt="" src="bookpicture/ds066854/ds0668540012-28-l.jpg" /> : 在 60～300mmHg 内变动时, 脑血流量和颅内压基本不变。当 <img alt="" src="bookpicture/ds066854/ds0668540012-29-l.jpg" /> 低于 50mmHg 时, 脑血流量明显增加, 颅内压升高。低氧血症持续时间过长, 脑水肿已形成, 即使 <img alt="" src="bookpicture/ds066854/ds0668540012-30-l.jpg" /> 改善, 颅内压也未必恢复。如缺氧合并 <img alt="" src="bookpicture/ds066854/ds0668540012-31-l.jpg" /> 升高, 则直接损害血-脑屏障, 更易导致脑水肿, 颅
内压往往持续升高, 病情更加凶险。</p>\r
<p>(3) 血压: 平均动脉压在 50～150,mmHg 波动时, 依靠脑血管的自动调节机制, 颅内压不改变, 超出这一限度, 颅内压将随血压的升高或降低而呈平行改变。</p>\r
<p>(4) 中心静脉压(central venous pressure, CVP): 胸膜腔内压及中心静脉压对颅内压有直接影响。中心静脉压升高, 静脉回流障碍, 颅内压升高。因此, 呛咳憋气、正压机械通气、腹内压升高等都可以使颅内压升高, 反之, 中心静脉压降低, 颅内压降低。</p>\r
<p>(5)其他:使脑血流量增加的药物可导致颅内压升高。静脉麻醉药如硫喷妥钠、依托咪酯、丙泊酚（异丙酚）、地西泮和麻醉性镇痛药都可使脑血流量减少、脑代谢降低，从而使颅内压下降。甘露醇等渗透性利尿药使脑细胞脱水，成为降颅压的主要用药。体温每下降1℃，颅内压降低5.5%~6.79%。</p>\r
<p>(四) 脑电监测</p>\r
<p>持续脑电监测可观察病变的不同阶段,有助于早期脑缺血的诊断和治疗,有助于昏迷患者的诊断和预后判断,还有助于指导严重外伤患者的针对性治疗。</p>\r
<p>1. 脑电图 显示脑细胞群自发而有节律的生物电活动, 是皮质锥体细胞群及其树突突触后电位的总和。</p>\r
<p>2. 诱发电位 当神经系统受到外在刺激时产生冲动,该冲动经特殊的神经通路逐级上传到皮质,中枢神经系统在感受到这种刺激过程中产生的生物电活动变化称为诱发电位。</p>\r
<p>通过观察和分析诱发电位的变化,可了解各感觉通路和皮质各代表区甚至整个皮质的功能。根据刺激形式的不同,临床上常用的诱发电位有体感诱发电位、听觉诱发电位、视觉诱发电位和运动诱发电位。通过监测诱发电位,可及时了解神经组织损伤及损伤程度,为治疗提供依据。</p>\r
<p>考点提示: 神经系统功能监测的要点和意义。</p>\r
<p>五、泌尿系统功能监测</p>\r
<p>在 ICU 监护的患者常存在肾功能异常,包括排泄含氮废物、毒物及药物的能力受损,维持水、电解质和酸碱平衡能力受损,促红细胞生成素不足等。临床上主要通过尿液监测及肾功能生化指标监测来反映患者的病情状态与病程进展情况。</p>\r
<p>(一) 尿液监测</p>\r
<p>1. 尿量 正常成人 24h 尿量为 1000 ~ 2000mL。尿量是直接反映肾滤过率的重要指标, 是肾功能监测早期的敏感指标。肾功能的变化也常有尿量的异常改变。</p>\r
<p>(1) 监测方法: 测定患者 24h 尿量, 当天早晨 8 时嘱患者排空尿液后, 连续收集至第 2 天早晨 8 时最后一次的尿液, 记录 24h 尿量。注意应根据不同检查目的加入防腐剂, 以确保检查结果的准确性。</p>\r
<p>(2)临床意义:具体如下。</p>\r
<p>1) 每日尿量 &gt; 2500 mL 为多尿, 常见于急性肾衰竭多尿期、尿崩症、慢性肾小球肾炎、糖尿病所引起的肾小管功能不全。</p>\r
<p>2) 每日尿量 &lt;400mL 或每小时尿量 &lt;17mL 称为少尿, 多见于急、慢性肾衰竭。</p>\r
<p>3) 每日尿量 &lt;100mL 为无尿, 多见于肾血管栓塞、梗阻性急性肾衰竭、双侧肾皮质坏死。</p>\r
<p>2. 尿比重 指在 4<sup>∘</sup> C 时, 同体积尿和纯水的重量比。成人正常值为 1.015～1.025 。</p>\r
<p>(1) 监测方法: 可用比重计法、折射仪法及尿试纸条等方法进行监测。临床常用尿试纸条进行筛检。测量时, 应注意不同测量方法所需尿液量不同, 比重计法需要取晨尿 100mL, 折射仪法只需要一滴, 尿液分析仪需要取尿液 10mL。</p>\r
<p>(2)临床意义:具体如下。</p>\r
<p>1) 尿比重降低 (&lt;1.015): 常见于慢性肾衰竭、尿崩症、急性肾衰竭少尿期及多尿期等。</p>\r
<p>2) 尿比重增高(晨尿 &gt;1.020): 常见于血容量不足的肾前性少尿, 如高热、脱水、出汗过多、周围循环衰竭等; 尿量多而比重高见于糖尿病。</p>\r
<p>(二) 肾功能生化指标监测</p>\r
<p>1. 内生肌酐清除率(endogenous creatinine clearance rate) 指肾在单位时间内,把若干毫升血浆中的内生肌酐全部清除的能力。正常成年人内生肌酐清除率的平均值为 80 ~ 100mL/min。内生肌酐清除率是判断肾小球滤过功能的简便有效方法。</p>\r
<p>(1) 监测方法: 嘱患者连续 3 天低蛋白饮食(每日蛋白质摄入量 &lt;40g), 禁食鱼、肉
, 禁饮咖啡、茶等, 避免剧烈运动, 于第 4 天早晨 8 时让患者排尽余尿后, 收集并记录 24h 尿量, 并加入 4~5mL 甲苯防腐。此外, 在同一天的任意时间采血 5~7mL 与 24h 尿液同时送检, 测定尿液和血液中的肌酐浓度。</p>\r
<p>(2) 临床意义: 内生肌酐清除率能较早反映肾小球滤过功能损害并估计其损害程度。判断标准: 滤过功能减退, 即内生肌酐清除率低于正常值的 80%; 轻度损害, 即内生肌酐清除率为 51~70mL/min; 中度损害, 即内生肌酐清除率为 31~50mL/min; 重度损害, 即内生肌酐清除率 &lt;30mL/min。内生肌酐清除率降低常见于各种进展性肾病造成肾小球损伤引起的肾功能损害。健康人随着年龄增长, 肾实质体积缩小, 内生肌酐清除率可有所降低。</p>\r
`}]},{id:"module4",title:"第三章 常见急危重症患者的救护",summary:"该模块系统阐述常见急危重症的救护原则，涵盖急性中毒的洗胃解毒、环境损伤的降温处理、常见急症的心梗急救。以有机磷中毒阿托品应用为例，未涉及创伤性休克液体复苏。",tasks:[{id:"module4-task1",title:"第一节 急性中毒患者的救护",order:1,rawContent:`学习目标

素质目标:具备认真、科学、严谨、求实的态度及高度的责任心,培养紧密协作的团队协作精神,树立“敬佑生命、救死扶伤、甘于奉献、大爱无疆”的急救理念。

知识目标: 掌握常见急性中毒、环境及理化因素损伤和常见急症患者的护理评估与救护措施; 掌握急性中毒救护原则。熟悉常见急性中毒、常见急症和环境及理化因素损伤患者的机制和病因。了解常见急性中毒、常见急症和环境及理化因素损伤患者的护理计划与评估内容。

能力目标:能运用所学知识对常见急性中毒、常见急症和环境及理化因素损伤患者进行快速评估,并进行紧急处理。

案例导学

赵某，女，40岁。1h前与丈夫吵架后自服一瓶约100mL的农药，随后出现恶心、呕吐、口吐白沫、大汗，意识逐渐模糊，家人呼之不应，来医院急诊。体格检查：体温37℃，脉搏110次/分，呼吸18次/分，血压90/60mmHg，皮肤湿冷，口腔有大蒜味，口流涎，两侧瞳孔缩小，对光反射迟钝。双肺闻及散在湿啰音，心率110次/分，律齐，无杂音。腹软，肝、脾未触及。四肢肌肉震颤，腱反射减弱。实验室检查：全血胆碱酯酶活力25%。

请思考：

1. 该患者中毒的可能原因是什么？

2. 如果你是急诊科护士,应如何抢救?

一、急性中毒概况

在一定条件下,某些物质接触或进入人体后与体液相互作用,损害组织,破坏神经和体液调节功能,使其正常的生理功能发生障碍,引起一系列症状和体征,称为中毒。引起中毒的化学物质称为毒物。根据毒物来源和用途可以分为:①工业性毒物;②药物;③农药;④有毒动植物。根据暴露毒物的毒性、剂量和时间通常将中毒分为急性中毒和慢性中毒两类。急性中毒是机体一次接触大量毒物或24h内多次暴露于某种或者某些毒物所致的中毒；慢性中毒是指长时间暴露，毒物进入机体蓄积中毒而出现的临床表现。

(一) 护理评估

1. 中毒原因

(1) 生活中毒: 误食、用药过量、自杀、谋杀或意外接触有毒物质等, 导致过量毒物进入人体而发生中毒。

(2) 职业中毒: 人们在生产、运输、保管或使用等工作过程中, 未注意劳动防护或未遵守安全防护制度, 与有毒的生产原料、辅料、中间产物或成品密切接触而发生中毒。

2. 中毒机制

(1) 腐蚀作用: 强酸、强碱可吸收组织中的水分, 并与蛋白质或脂肪相结合, 使细胞变性、坏死。

(2) 组织和器官缺氧: 如一氧化碳与血红蛋白结合形成不易解离的碳氧血红蛋白, 使血红蛋白丧失携氧功能, 导致组织缺氧。

(3) 抑制酶的活性: 如有机磷农药抑制胆碱酯酶, 氰化物抑制细胞色素氧化酶, 重金属抑制含巯基的酶等。

(4)麻醉作用:亲脂性强的毒物(如有机溶剂和吸入性麻醉药)可通过血-脑屏障,抑制中枢神经系统的功能。

(5) 干扰细胞膜或细胞器功能: 如四氯化碳经酶催化形成三氯甲烷及自由基, 自由基作用于肝细胞膜中不饱和脂肪酸, 发生脂质过氧化, 使线粒体、内质网变性, 肝细胞坏死。

(6) 相关受体的竞争: 如阿托品过量时通过
竞争性阻断毒蕈碱受体而产生毒性作用。

3. 毒物进入人体和吸收的途径 在生产和生活环境中,毒物主要经呼吸道、皮肤黏膜和消化道侵入人体。毒物吸收后,通过血液循环分布到全身各组织或器官(图 3-1)。由于毒物本身理化特性及各组织的生化、生理特点,进而破坏了人体的正常生理功能,导致中毒。

图3-1 毒物在体内的过程

\r
4. 病情评估

(1)中毒情况:重点评估患者的健康史和中毒史等。及时了解中毒物质的种类、名称、剂量、途径和接触时间。评估患者生命体征的变化,注意皮肤黏膜颜色、温度、湿度及有无腐蚀征象。了解患者的精神状态,收集患者身边可能盛放毒物的容器、瓶子、纸袋和剩余毒物等,必要时深入现场,寻找毒物的来源。对不明原因的中毒询问时应注意以下几点。

1) 怀疑食物中毒者: 应详细询问进食的种类、来源和同餐人员的发病情况。

2)怀疑自杀者:应询问患者近期精神状况、有无家庭矛盾和社会矛盾及中毒发生前后的情绪与举止异常情况等。

3)怀疑服药过量者:应询问患者的服药史、服药种类、服药剂量等。

4)怀疑气体中毒者:应询问中毒现场空气是否流通,是否有毒气产生或泄漏等。

5)怀疑职业性中毒者:应询问患者的职业史,包括工种、工龄、接触毒物的种类及接触时间、防护条件等。

(2)临床表现:具体如下。

1)呼吸系统:①刺激症状,各种刺激性及腐蚀性气体,如强酸雾、甲醛溶液等,可直接引起呼吸道黏膜的严重刺激症状,表现为咳嗽、胸痛、呼吸困难,重者可出现严重发绀、呼吸急促、呼吸困难甚至呼吸衰竭等。②呼吸气味,评估呼出的气体是否有特殊气味,如有机磷农药中毒呼出气有大蒜味,氰化物中毒呼出气有苦杏仁味,酒精中毒呼出气有酒味。③呼吸频率、节律异常,亚硝酸盐、一氧化碳中毒致呼吸加快,安眠药、吗啡中毒致呼吸减慢。

2) 神经系统: 观察患者意识、神态及神经反射, 评估有无神经系统改变。昏迷见于镇静催眠药、麻醉药、有机溶剂、窒息性毒物、致高铁血红蛋白毒物及农药中毒。谵妄见于阿托品、乙醇或抗组胺药物中毒。精神失常见于一氧化碳、阿托品、酒精、二硫化碳、有机溶剂、抗组胺药物中毒或药物依赖戒断综合征等。

3) 皮肤黏膜: ①皮肤及口腔黏膜灼伤, 见于强酸、强碱等引起的腐蚀性损害, 如硫酸灼伤呈黑色, 硝酸灼伤呈黄色, 盐酸灼伤呈棕色, 过氧乙酸灼伤呈无色等。②发绀, 见于亚硝酸盐、磺胺、非那西丁、麻醉药等中毒。③樱桃红色, 见于一氧化碳、氰化物中毒。④毒蕈、四氯化碳或鱼胆中毒导致肝脏损害可出现黄疸。

4) 眼部: 瞳孔缩小见于有机磷农药、毒扁豆碱、吗啡等中毒; 瞳孔扩大见于阿托品、毒蕈、曼陀罗等中毒; 视力障碍见于甲醇、有机磷、苯丙胺等中毒。

5) 循环系统: 心律失常见于洋地黄、阿托品等中毒; 休克见于三氧化二砷、强酸、强碱及严重巴比妥中毒; 心搏骤停见于洋地黄、奎尼丁、锑剂、河豚等中毒。

6)泌尿系统:中毒后肾损伤可出现肾小管坏死(见于汞、四氯化碳、氨基糖苷类抗生素、毒蕈等中毒)、肾缺血、肾小管阻塞(砷化氢中毒可引起血管内溶血,游离血红蛋白自尿中排出时可阻塞肾小管),这些中毒均可造成肾损伤,最终导致急性肾衰竭,出现少尿甚至无尿。

7) 血液系统: 溶血性贫血见于砷化氢、苯胺、硝基苯等中毒; 白细胞减少和再生障碍性贫血见于氯霉素、抗肿瘤药、苯等中毒; 出血见于阿司匹林、氯霉素、氢氯噻嗪、抗肿瘤药物等中毒。

8) 发热: 见于抗胆碱药、二硝基酚、棉酚等中毒。

(3) 实验室检查: 急性中毒时, 应常规留取剩余的毒物或可能含毒的标本,
 如呕吐物、胃内容物及尿、粪和血标本等。必要时可以进行毒物分析和细菌培养。

(二)急性中毒救护原则和措施

1. 急性中毒救护原则

(1)立即终止接触毒物。

(2) 清除尚未吸收的毒物。

(3)促进已吸收毒物的排出。

(4) 应用特殊解毒剂。

(5)紧急复苏和对症支持治疗。

2. 急救护理措施

(1) 立即终止接触毒物: 立即将患者脱离中毒现场, 转到空气新鲜的地方; 立即除去患者污染衣物, 用温水或肥皂水清洗皮肤和毛发上的毒物; 用清水彻底冲洗、清除眼内毒物; 清除伤口处的毒物。

(2) 清除尚未吸收的毒物: 根据毒物进入人体的途径采取不同的急救措施。针对吸入性的中毒, 应将患者搬离有毒的环境, 保持呼吸道畅通, 呼吸新鲜空气, 有条件的尽快给予氧气吸入。针对皮肤接触性中毒, 可用大量清水冲洗毒物接触过的皮肤、毛发、指甲等。针对强腐蚀性毒物, 清水冲洗 15~30min 后, 可选用肥皂水、碳酸氢钠和醋酸等中和剂或特殊解毒剂进行冲洗。针对食入性中毒, 常用催吐、洗胃、导泻、灌肠和使用吸附剂等方法清除肠道尚未吸收的毒物。

1) 催吐: 对于神志清醒且配合的患者, 可优先选择催吐法(详见第二章第五节)。

2) 洗胃: 洗胃时可配合吸附剂进行解毒, 吸附剂除具有吸附功能外, 还可以起到氧化、中和、沉淀毒物等作用。目前使用较多的吸附剂有活性炭和万能解毒剂(活性炭: 鞣酸: 氧化镁通常为2:1:1)(详见第二章第五节)。

3) 导泻: 主要用于清除进入肠道还未吸收的毒物。神志清醒配合者可选择口服, 其他患者则可在洗胃完毕后, 经胃管向胃内灌入泻药以清除肠道内毒物。导泻常用的药物有番泻叶、聚乙二醇、硫酸钠或硫酸镁, 其中硫酸镁在肠道内可因镁离子吸收过多引起高镁血症, 对中枢神经和心肌起抑制作用, 因此, 昏迷患者或中毒者心、肾功能不全时不宜用硫酸镁进行导泻。

4) 灌肠: 除腐蚀性中毒外, 口服中毒 6h 以上、导泻无效或抑制肠蠕动毒物中毒者(如巴比妥类、颠茄类或阿片类药物)应及时灌肠, 可选择温盐水、清水、1% 肥皂水等连续多次灌肠。

(3)促进已吸收毒物的排出:常用的方法有利尿、吸氧和血液净化等。

1) 利尿: 通过强化利尿和改变尿液酸碱度来促进毒物的排出。可以在输液的同时使用利尿剂, 如快速大量静脉输注 5%~10% 葡萄糖溶液或者 5% 葡萄糖氯化钠溶液, 每小时 500~1000mL, 同时静脉注射呋塞米 20~80mg。也可根据毒物溶解后酸碱度不同, 选用相应能增强毒物排出的液体改变尿液酸碱度, 弱酸性毒物中毒时常用 5% 碳酸氢钠溶液来碱化尿液, 碱性毒物中毒时静脉输注维生素 C 或氯化铵溶液来酸化尿液。

2) 吸氧: 气体中毒时, 尽早给予吸氧。如一氧化碳中毒时, 吸氧可使碳氧血红蛋白分离, 加速一氧化碳排出。

3) 血液净化: 方法有血液透析、腹膜透析、血液滤过、血浆置换、血液灌流等。

知识链接

不同血液的净化方法

(1) 血液透析: 通过将患者的血液引出体外, 利用人工肾替代肾脏的功能, 清除体内废物和多余的水分。该技术利用半透膜两侧压力差原理, 实现溶质的清除; 适用于急性肾衰竭、慢性肾衰竭等引起的尿毒症患者。

(2) 腹膜透析: 是将透析液引入患者腹腔内, 在腹膜表面形成一层薄膜, 使毒素透过薄膜进入透析液中被排出体外的一种方式。该技术利用腹膜作为生物膜所具有的选择性通透特性以及其面积大、接触时间长等特点来达到清除毒素的目的, 可部分替代肾脏功能, 用于急性和慢性肾衰竭。

(3) 血液滤过: 是在密闭系统中使用弥散原理清除水分及小分子物质的过程。该技术借助于高通量透析器提高清除效率, 并且不需要常规调整酸碱平衡, 适用于多种原因导致的液体潴留状态。

(4) 血浆置换: 是将患者的血液分离出来, 去除致病因子后, 再将其重新输入体内。该技术能够快速有效地清除特定蛋白质类药物或其他异源蛋白成分, 对于免疫介导性疾病(如重症肌无力)有效。

(5)血液灌流:是将患者的血液引流出体外,通过吸附材料清除其中的有害物质后再回输至体内。该技术利用吸附剂对某些内源性或外源性毒素具有高度亲和力的特点来进行有效清除,可用于治疗药物中毒等情况。

(4)应用特殊解毒剂:特殊解毒剂是一类用于治疗特定中毒的药物,它们根据中毒物质的类型和严重程度选择使用,以最大限度地减少毒物的吸收和减轻中毒症状。这些解毒剂包括金属解毒剂、高铁血红蛋白解毒剂、氰化物解毒剂和有机磷农药解毒剂等(表3-1)。

表3-1 常见毒物的特殊解毒剂

\r
(5)紧急复苏和对症支持治疗:急性中毒昏迷患者,应保持呼吸道通畅,维持呼吸和循环功能,及时观察生命体征变化情况。严重中毒者出现心搏骤停、休克、循环衰竭、呼吸衰竭、肾衰竭、水电解质和酸碱平衡紊乱时,应立即采取有效急救复苏措施稳定生命体征。惊厥时选用抗惊厥药,如苯巴比妥钠、异戊巴比妥、地西泮等;脑水肿时,可应用甘露醇、地塞米松等。

考点提示:急性中毒的救护原则、救护措施及常见的解毒剂。

(三) 常规护理和健康教育

1. 常规护理

(1)休息与饮食:中毒者急性期应绝对卧床休息、保暖。病情允许时,鼓励患者多食高蛋白、高碳水化合物、高维生素的无渣饮食。口服中毒者不宜过早进食,待病情稳定后给予低脂、流质或半流质饮食,以防胆道系统收缩,毒物再次进入胃内被吸收,导致中毒症状加重。

(2) 口腔护理: 口服中毒者, 易出现口腔糜烂、溃疡。为了提高患者的生存质量, 增加患者营养, 口腔护理尤为重要。

(3) 对症护理: 保持呼吸道通畅, 高热时物理降温, 尿潴留时导尿, 抗惊厥等。

(4)心理护理:对于服毒自杀者,清醒时,不可让其独居一室,室内的锐利器械均需严格保管,以防患者再次自杀。同时了解患者社会文化背景,给予针对性指导,如指导患者阅读相关书籍,学习应对压力和矛盾的方法等,并为其提供情感支持。另外,做好家属及相关人员的思想工作,取得他们的支持,以帮助患者重新树立信心,适应社会生活。

2. 健康教育和指导 加强防毒宣传,不吃有毒、变质食品,加强毒物管理。做好患者的思想工作,解除患者的思想顾虑,向患者宣教预防中毒及自救的防护知识。

(1)看护好婴幼儿,防止其误食毒物和药物。

(2)青少年可发生自伤性服毒,要重视青少年的身心健康问题。

(3)加强宣传,普及植物、药物等相关防毒知识。

(4)医疗机构应加强、完善药物及毒物的管理,建设中毒控制中心,提高我国中毒治疗和预防水平,加强科学研究,探索建立中毒一体化检查平台,为中毒的诊断和治疗提供科学研究平台,加强科研与临床结合。

二、有机磷农药中毒患者的救护

有机磷农药是指含磷元素的有机化合物,主要用于防治植物病、虫、草害,又称为有机磷农药,在农业生产中的广泛使用,导致其在农作物中会发生不同程度的残留。有机磷农药对人体的危害以急性中毒为主，多发生于大剂量或反复接触之后，毒性越高，往往病情越重。有机磷农药属于有机磷酸酯或硫代磷酸酯类化合物，此类农药大多为油状液体，呈淡黄色至棕色，稍有挥发性，有大蒜臭味，且因品种不同而挥发性差异较大。甲拌磷和敌敌畏等挥发性较大，易通过呼吸道吸入中毒，一般难溶于水，易溶于有机溶剂，乐果、敌百虫等在水中的溶解度较大，大部分有机磷农药在酸性环境中稳定，而在碱性环境中则易分解失效，但个别农药遇碱后毒性更强。

知识链接

半数致死量

半数致死量(median lethal dose, LD50)表示在规定时间内,通过指定感染途径,使一定体重或年龄的某种动物半数死亡所需的最小细菌数或毒素量。在毒理学中,LD50是描述有毒物质或辐射毒性的常用指标。有机磷农药种类很多,根据其毒性强弱(口服半数致死量)分为高毒、中毒、低毒等。中华人民共和国农业农村部明令禁止不得在蔬菜、果树、茶叶、中草药材上使用高毒农药产品,如甲胺磷、对硫磷
、甲基对硫磷、久效磷和磷胺等。

(一) 护理评估

1. 中毒原因及机制

(1)中毒原因:具体如下。

1) 生产及使用中毒: 生产中毒原因主要是在生产、包装、保管、运输、销售、配制、喷洒有机磷农药的过程中, 手套破损或者衣服和口罩污染, 也可因为生产设备密闭不严, 有机磷农药“跑、冒、滴、漏”或污染手、皮肤及吸入引起中毒。在药物使用过程中, 施药人员喷洒时, 药液污染皮肤或者湿透衣服而又被皮肤吸收或者是吸入有机磷农药均可导致中毒, 配药时手沾染原液也可引起中毒。

2) 生活中毒: 服毒自杀、误服农药或摄入被农药污染的水、食品等, 可经胃肠道吸收而中毒; 使用有机磷农药杀蚊虫、治疗皮肤病或内服驱虫药应用不当, 也可发生中毒。

(2)中毒机制:有机磷农药的中毒机制主要是抑制体内胆碱酯酶的活性。正常情况下,胆碱能神经兴奋所释放的递质——乙酰胆碱被胆碱酯酶水解为乙酸及胆碱而失去活性。有机磷农药进入人体后与体内胆碱酯酶迅速结合形成磷酰化胆碱酯酶,后者比较稳定,且无分解乙酰胆碱的能力,从而使乙酰胆碱积聚,引起胆碱能神经先兴奋后抑制的一系列症状,严重者可导致昏迷,甚至因呼吸衰竭而死亡(图3-2)。

图3-2 有机磷农药的中毒机制

\r
2. 毒物在体内的吸收与代谢过程 有机磷农药可经消化道、呼吸道、皮肤黏膜吸收。吸收后迅速分布于全身各脏器，尤其以肝脏浓度最高，其次为肾、肺、脾等，肌肉和脑组织最少。有机磷在肝脏主要经历分解和氧化等生物转化过程，一般通过氧化后毒性会增强，分解后产物毒性降低，如对硫磷氧化后形成对氧磷，对酶的抑制作用要比前者强300倍。有机磷农药排泄较快，吸收后6~12h血中浓度达到高峰，24h内排泄，48h后完全排出体外，体内聚集作用不明显。有机磷农药大部分由肾脏排出，小部分由粪便排出，也有极少部分随汗腺分泌的汗液或通过呼吸排出体外。

3. 病情评估

(1) 毒物接触史: 生产及使用性中毒, 毒物接触史比较明确。非生产性中毒, 有误服、故意吞服、间接接触摄入等, 应注意询问陪伴人员有机磷农药的种类、服毒量、服毒时间, 有无呕吐及呕吐物气味, 患者近来情绪、生活及工作情况等。

(2) 身体状况: 急性中毒发病时间及症状与毒物种类、剂量、侵入途径密切相关。经皮肤吸收中毒, 一般在 2~6h 内发病; 口服中毒后 10min 至 2h 发病; 吸入性中毒约 30min 发病。一旦出现中毒症状, 病情发展迅速, 可出现急性胆碱能危象, 主要表现为以下方面。

1) 毒蕈碱样症状: 又称 M 样症状, 此症状出现最早, 主要由副交感神经末梢过度兴奋所致, 主要表现为平滑肌痉挛和腺体分泌增加。平滑肌痉挛表现为瞳孔缩小、腹痛、腹泻、大小便失禁等; 腺体分泌增加表现为大汗、流泪、流涕和流涎; 气道分泌物增多表现为咳嗽、呼吸困难、气促、双肺干性或湿性啰音, 严重者出现肺水肿。

2) 烟碱样症状: 又称 N 样症状, 是由于乙酰胆碱在横纹肌神经肌肉接头处过度蓄积和刺激, 使面部、眼睑、舌、四肢及全身横纹肌发生肌纤维颤动, 甚至全身肌肉发生强直性痉挛。患者表现为肌束颤动、牙关紧闭、抽搐、惊厥、全身紧束压迫感, 四肢出现不规则颤动, 而后发生肌力减退和瘫痪, 呼吸肌麻痹可引起呼吸衰竭或停止。交感神经节后纤维末梢释放儿茶酚胺, 表现为血压升高和心律失常。

3) 中枢神经系统症状: 中枢神经系统受乙酰胆碱刺激后出现头晕、头痛、疲乏、共济失调、烦躁不安, 严重者可出现谵妄、抽搐、昏迷、中枢性呼吸衰竭。

4) 局部损伤: 有些有机磷农药接触皮肤后可发生过敏性皮炎、皮肤水疱或剥脱性皮炎; 污染眼部
时会出现结膜充血和瞳孔缩小。

(3)其他特殊表现:具体如下。

1) 中毒后反跳现象: 有机磷农药中毒经急救后临床症状好转, 可在 2 天至 1 周内突然急剧恶化, 重新出现有机磷农药急性中毒的症状, 如面色苍白、大汗、肌颤、瞳孔缩小、胸闷、血压升高、心率减慢、肺部出现湿啰音、昏迷等, 甚至发生肺水肿或突然死亡, 此为中毒后反跳现象。

2) 中间型综合征: 少数病例在急性症状缓解后和迟发性神经病变发生前, 在急性中毒后1~4天突然发生以呼吸肌麻痹为主的症状群, 如肢体近端肌肉、脑神经支配的肌肉及呼吸肌麻痹, 若不及时救治可迅速导致死亡, 称为“中间型综合征”。其发病机制为胆碱酯酶长期受抑制, 影响了神经肌肉接头处突触后功能。

3)迟发性神经病变:个别急性中毒患者在重度中毒症状消失后2~3周可发生迟发性多发性周围神经病变,表现为感觉、运动型多发性神经病变,主要累及肢体末端,且可发生下肢瘫痪、四肢肌肉萎缩等,称为迟发性神经病。目前认为这种病变可能是由于有机磷农药抑制神经靶酯酶并使其老化所致。

考点提示:毒蕈碱样症状、烟碱样症状。

(4) 实验室检查及其他检查: 具体如下。

1) 全血胆碱酯酶(ChE)活力测定: 是诊断有机磷农药中毒的特异性实验指标, 对中毒程度、疗效判断和预后估计均极为重要。以正常人血胆碱酯酶活力值作为 100%, 急性有机磷农药中毒时, ChE 降至正常人均值 70% 以下即有意义。

2) 毒物检测: 将呕吐物、首次洗胃液、血、尿、粪便等送检, 有助于有机磷农药中毒的诊断。对硫磷和甲基对硫磷在体内氧化分解生成对硝基酚, 敌百虫在体内生成三氯乙醇, 均由尿排出, 因此, 尿中测出对硝基酚或三氯乙醇有助于诊断上述毒物中毒。

(5)病情判断:具体如下。

1) 轻度中毒: 仅有毒蕈碱样症状, 血胆碱酯酶活力为 50%~70%。

2) 中度中毒: 毒蕈碱样症状加重, 出现烟碱样症状, 血胆碱酯酶活力为 30%~50%。

3) 重度中毒: 除毒蕈碱样症状和烟碱样症状外, 还有中枢神经系统受累和呼吸衰竭表现, 少数患者有脑水肿, 血胆碱酯酶活力降到 30% 以下。

素质拓展

急诊科医护人员的职业素养

急诊科医护人员应具有献身医学、热爱祖国、忠于人民、恪守医德、尊师守纪、刻苦钻研、孜孜不倦、救死扶伤、执着追求、精益求精的奉献精神。健康所系，生命相托，急诊科医护人员应为祖国医药卫生事业的开展和人类的身心健康奋斗终生。

(二)急救和护理

1. 急救措施

(1) 迅速清除毒物: 立即将患者脱离中毒现场, 脱去污染衣物。用生理盐水或肥皂水彻底清洗污染的皮肤、毛发和指甲, 然后用温水冲洗干净, 不能用热水洗, 以免增加吸收。眼部污染时, 可用大量生理盐水彻底冲洗。口服中毒者用清水、2% 碳酸氢钠溶液(美曲磷脂中毒者忌用)或1:5000高锰酸钾溶液(对硫磷中毒者忌用)反复洗胃,直至洗清为止,然后用硫酸钠导泻。

(2) 解毒剂的应用: 应用原则为早期、足量、联合、重复用药。

1) 阿托品: 抗胆碱药, 为解救中毒的关键性药物, 能阻断乙酰胆碱对副交感神经和中枢神经的 M 受体作用, 解除平滑肌痉挛, 抑制腺体分泌, 防止肺水肿, 消除毒蕈碱样症状; 兴奋呼吸中枢, 消除或减轻中枢神经系统症状, 但对烟碱样症状和恢复胆碱酯酶活力无效。

阿托品的使用原则为早期、足量、重复给药。阿托品使用剂量可以根据病情而定，每10～30min或1～2h给药一次，直至症状明显好转或患者出现阿托品化表现。阿托品化的表现包括：①瞳孔较前扩大；②颜面潮红；③皮肤干燥、腺体分泌物减少、无汗、口干、肺部啰音减少；④心率增快。阿托品化后，应减少阿托品的剂量或停用。如出现瞳孔明显扩大、神志模糊、烦躁不安、抽搐、昏迷和尿潴留等为阿托品中毒，应立即停用阿托品进行观察，必要时予以大量补液，或使用毛果芸香碱进行拮抗。阿托品化和阿托品中毒的鉴别如下(表3-2)。

表 3-2 阿托品化和阿托品中毒的鉴别

\r
考点提示:阿托品化和阿托品中毒的鉴别。

2) 盐酸戊乙奎醚(长托宁): 属于抗胆碱药, 有较强的中枢和外周抗胆碱作用, 使用简便、安全、长效, 疗效确切。作用时间长及毒副作用小, 与胆碱酯酶复能剂合用, 对重度中毒患者有显著效果。

3) 胆碱酯酶复能剂: 常用药物有碘解磷定、氯解磷定、双复磷等, 能使被抑制的胆碱酯酶恢复活性。胆碱酯酶复能剂对解除烟碱样症状作用明显, 但对毒蕈碱样症状作用较差, 也不能对抗呼吸中枢的抑制, 所以胆碱酯酶复能剂与阿托品合用, 可取得协同效果。

有机磷农药中毒的治疗最理想的是胆碱酯酶复能剂与阿托品合用。轻度中毒可单独使用胆碱酯酶复能剂；中、重度中毒两种解毒药合用时，阿托品的剂量应减少，以免发生阿托品中毒。

4) 解磷注射液: 为含有抗胆碱药和胆碱酯酶复能剂的复方注射液, 适用于现场急救, 对毒蕈碱样、烟碱样和中枢神经系统症状均有较好的对抗作用, 对中毒的胆碱酯酶也有较好的复活作用, 起效快, 作用时间较长, 目前临床上已广泛使用。

(3) 对症治疗: 有机磷农药中毒主要的死因是肺水肿、脑水肿、呼吸衰竭。休克、急性脑水肿、心肌损害及心搏骤停等也是重要死因, 因此应加强对重要脏器的监护, 发现病情变化及时处理。如肺水肿时应用阿托品; 休克时应用升压药; 脑水肿时应用脱水剂和肾上腺糖皮质激素; 心律失常时及时应用抗心律失常药物。

2. 常规护理措施

(1)体位护理:根据患者的病情选择合理的体位,休克者取中凹卧位,中毒较重者取左侧卧位。

(2)饮食护理:吸入性或皮肤黏膜侵入性中毒者,应鼓励患者早期进食,宜选择清淡、少渣的流质或半流质饮食,逐渐恢复普食;口服中毒者,待病情稳定、神志清醒后,可给予米糊、米汤、面糊、藕粉、蛋清等温流质饮食,禁食刺激性、高脂食物,以免引起胆道系统和胃黏膜皱襞的毒物再次进入血液;昏迷者应给予鼻饲。

(3) 对症护理: 保持呼吸道通畅, 及时清除呼吸道分泌物, 缺氧者根据呼吸困难程度调节氧流量; 昏迷患者要加强口腔护理和皮肤护理, 防止坠积性肺炎和压疮的发生; 留置导尿管者要保持尿道口清洁, 保持引流管的通畅, 定时更换储尿袋, 防止泌尿系统的逆行感染; 惊厥者要注意安全, 防止发生意外。

(4) 心理护理: 了解患者中毒的原因, 根据不同的心理特点予以心理疏导, 以诚恳的态度为患者提供情感上的支持, 并认真做好家属的思想工作。

3. 健康教育和指导

(1)加强预防有机磷农药中毒知识宣传:如在喷洒农药时应遵守操作规程,加强个人防护,穿长袖衣裤及鞋袜,戴口罩、帽子及手套,污染衣物及时洗净。

(2)加强有机磷农药的管理:农药盛具要专用,标记要清楚,防止误食。

(3) 生活指导: 蔬菜、水果在食用之前要清洗干净, 避免残留农药引起中毒。怀疑为有机磷农药毒死的家禽时, 不可食用。

考点提示:有机磷农药中毒患者的护理。

三、急性一氧化碳中毒患者的救护

一氧化碳(CO)为无色、无味、无刺激性的气体,比重为0.967,几乎不溶于水,易溶于氨水。在空气中燃烧呈蓝色火焰。在空气中浓度达12.5%时,有爆炸的危险。吸入过量一氧化碳引起的中毒称急性一氧化碳中毒,俗称煤气中毒,是常见的生活中毒和职业中毒。

(一) 护理评估

1. 中毒原因及机制

(1)中毒原因:患者一般均有一氧化碳吸入史。仔细观察发病现场情况,详细询问中毒的原因,了解中毒时所处的环境、停留时间以及同室他人有无同样症状、有无突发昏迷等情况。

1) 工业中毒: 炼钢、炼焦、烧窑等工业生产中, 高炉煤气与煤气发生炉中含 CO 30%~35%, 水煤气含 CO 30%~40%, 如炉门、窑门关闭不严、管道泄漏及煤矿瓦斯爆炸时都有大量 CO 产生, 会导致吸入性中毒。

2) 生活
中毒: 煤炉产生的气体中 CO 的含量高达 6%~30%。室内门窗紧闭, 火炉无烟囱或烟囱堵塞、漏气、倒风以及在通风不良的浴室内使用燃气加热器淋浴, 密闭空调车内滞留时间过长等都可发生 CO 中毒。失火现场空气中 CO 浓度高达 10% 时,也可发生中毒。每日吸烟一包,可使血液碳氧血红蛋白(COHb)浓度升高至 5%~6%,连续大量吸烟也可导致一氧化碳中毒。

(2)中毒机制:主要是引起组织缺氧。CO 吸入机体后,其中 85% 与血液中红细胞的血红蛋白(Hb)结合,形成稳定的 COHb。CO 与血红蛋白的亲和力比氧与血红蛋白的亲和力大 240 倍,而碳氧血红蛋白的解离速度是氧合血红蛋白(HbO₂)解离速度的 1/3600,故易造成碳氧血红蛋白在体内蓄积。COHb 不仅不能携带氧,而且还影响氧合血红蛋白正常解离,即氧不易释放到组织中,从而导致组织和细胞缺氧。此外,CO 还可抑制细胞色素氧化酶,直接抑制组织细胞内呼吸。这些因素使组织、细胞缺氧更严重。中枢神经系统对缺氧最为敏感,故最先受累。严重者有脑水肿,少数患者可发生迟发性脑病。

素质拓展

培养“五术”医学人才

2020 年 10 月,高等教育司司长吴岩解读《关于加快医学教育创新发展的指导意见》时提出,应培养新时代“五术”医学人才,即“救死扶伤的道术、心中有爱的仁术、知识扎实的学术、本领过硬的技术、方法科学的艺术”。无论是作为一名医学生还是一名行医者,除了精湛的医术,更要有高尚的品德修养,要有一颗“见彼苦恼,若己有之”的心和良好的医德医风,自觉树立“全心全意为患者服务”的意识和“患者高于一切”的信念。

2. 病情评估

(1) 临床表现和分级: 急性一氧化碳中毒的症状与血液中 COHb 浓度密切相关, 同时也与患者中毒前的健康状况, 如有无心脑血管疾病及中毒时体力活动等情况有关。按中毒程度, 急性 CO 中毒可分为轻、中、重三级。

1) 轻度中毒: 血液 COHb 浓度为 10%~20%。患者表现为头痛、头晕、乏力、恶心、呕吐、心悸、四肢无力, 甚至出现短暂性晕厥等。原有冠心病患者可出现心绞痛。患者如能及时脱离中毒环境, 吸入新鲜空气或氧疗, 症状很快就可消失。

2) 中度中毒: 血液 COHb 浓度为 30%~40%。除上述症状外, 可出现皮肤黏膜呈樱桃红色、神志不清、呼吸困难、烦躁、谵妄、昏迷, 对疼痛刺激可有反应, 脉快, 多汗, 瞳孔对光反射、角膜反射可迟钝, 腱反射减弱等。患者经积极治疗可以恢复正常, 且无明显并发症和后遗症。

3) 重度中毒: 血液 COHb 浓度大于 50%。患者迅速出现昏迷, 各种反射消失, 可呈去大脑皮质状态。患者可以睁眼, 但无意识, 不语、不动、不主动进食, 呼之不应、推之不动, 并有肌张力增强, 可发生脑水肿伴惊厥、呼吸抑制、休克、心律失常、上消化道出血等。患者死亡率高, 存活者多有不同程度的后遗症。

4)急性一氧化碳中毒迟发性脑病(神经、精神后遗症):急性一氧化碳中毒患者在意识障碍恢复后,经过2~60天的“假愈期”,可出现下列临床表现之一。①精神意识障碍:呈痴呆、木僵、谵妄或去大脑皮质状态。②锥体外系神经损害:出现震颤麻痹综合征。③锥体系神经损害:如偏瘫、病理反射阳性或大小便失禁等。④大脑皮质局灶性功能障碍:如失语、失明或继发性癫痫等。⑤脑神经及周围神经损害:如视神经萎缩、听神经损害及周围神经病变等。

考点提示: CO 中毒的临床表现和分级。

(2) 实验室检查及其他检查: 具体如下。

1) 血液 COHb 测定: 是诊断一氧化碳中毒的特异性指标, 可明确诊断且有助于分型和估计预后。

2) 脑电图检查: 可见弥漫性不规则性慢波、双额低幅慢波及平坦波。

3) 头部 CT 检查: 可发现大脑皮质下白质, 半卵圆形中心与脑室周围白质密度降低或苍白球对称性密度降低。

知识链接

血液 COHb 测定常用的方法

1. 加碱法 取患者血
液 1 或 2 滴, 用蒸馏水 3~4mL 稀释后, 加 10% 氢氧化钠溶液 1 或 2 滴, 混匀。正常血液呈棕绿色, 血液中 COHb 增多时, 加入氢氧化钠溶液后血液仍保持淡红色不变。

2. 煮沸法 取蒸馏水 10mL, 加入患者血液 3~5 滴, 血中如有 COHb, 煮沸后仍为红色。以上两种均为血液 COHb 定性测定方法。

3. 分光镜检查法 为定量测定方法,取血液数滴,加入蒸馏水 10mL,用分光镜检查可见特殊吸收带。

(二)急救与护理

1. 急救措施

(1) 终止一氧化碳吸入: 迅速将患者转移到空气新鲜处, 让其卧床休息、保暖、保持呼吸道畅通。

(2) 氧疗: 一氧化碳中毒最有效的治疗方法。轻、中度中毒患者可采用面罩或鼻导管高流量给氧（流量应保持在 8～10L/min）; 严重中毒患者给予高压氧舱治疗, 可加速碳氧血红蛋白解离, 促进一氧化碳排出, 从而减少神经、精神后遗症和降低病死率。

(3)防治脑水肿,促进脑细胞代谢:严重中毒后2~4h即可出现脑水肿,24~48h达高峰。在积极纠正缺氧的同时给予脱水治疗,可快速静脉滴注20%甘露醇,也可用呋塞米、肾上腺皮质激素等药物,降低颅内压,减轻脑水肿。可适量补充能量合剂、细胞色素c、胞磷胆碱等药物,以促进脑细胞代谢。

(4) 对症治疗: 昏迷者应保持呼吸道通畅, 必要时行气管插管或气管切开防止继发感染。高热抽搐者, 可采用头部降温、亚低温疗法及止痉挛药物等对症治疗。

考点提示:CO 中毒的急救措施。

2. 常规护理措施

(1) 病情观察: ①定时测量生命体征, 观察神志变化, 记录出、入液量, 做好重病记录。②观察患者有无头痛、喷射性呕吐等脑水肿征象。③了解碳氧血红蛋白测定结果。

(2) 氧气吸入的护理: 患者脱离现场后应立即给氧, 采用面罩或鼻导管高流量给氧(流量应保持在 8 ~ 10L/min)。给氧时间一般不应超过 24h, 以防发生氧中毒和二氧化碳潴留。呼吸深快的患者亦可吸入含二氧化碳的氧气, 可改善呼吸性碱中毒。重症患者及早采用高压氧治疗。

知识链接

高压氧治疗一氧化碳中毒的原理

高压氧治疗是指在高于一个标准大气压的环境下吸入高浓度的氧，主要用于一些缺血、缺氧的疾病，或者与缺血、缺氧相关的疾病的治疗。急性一氧化碳中毒或者有害气体中毒可以通过及时的高压氧治疗，将有害气体置换出去。对于一些急性脑血管疾病如脑外伤、颅脑肿瘤术后的脑组织损伤患者，可以积极地改善脑组织的缺血、缺氧状态及减轻脑水肿、改善循环，及时进行神经的修复。高压氧治疗一氧化碳中毒的原理：提高机体氧含量，使组织得到足够的溶解氧，迅速纠正低氧血症；加速COHb的解离，促进CO的清除，使血红蛋白恢复携氧功能；提高SOD活性，减少自由基的损害；高压氧使颅内血管收缩，打破脑缺氧与脑水肿之间的恶性循环。此外，高压氧舱在防治迟发性脑病、恢复细胞呼吸酶活性、改善中枢神经细胞呼吸障碍等方面有很大优势。

(3)饮食护理:神志清醒者,给予清淡、易消化的流质或半流质饮食,宜选用高热量、高蛋白、高维生素、少刺激、少油腻的食物;神志不清者，可予以鼻饲营养。

(4) 对症护理: 呼吸停止时, 使用呼吸兴奋剂并及早进行人工呼吸或用人工呼吸机呼吸; 昏迷高热、频繁抽搐者采用物理降温, 必要时可采用冬眠疗法, 防止自伤或坠伤; 昏迷超过 24h 者需应用抗生素预防感染。

(5)预防感染:加强口腔、皮肤护理,督促患者刷牙、漱口;患者不能自理时,可给予口腔护理,每日2次。

(6)心理护理:护理人员应有高度的同情心和责任心,多与患者交谈,建立良好的护患关系,增加患者的信任感和安全感,消除患者的不良情绪,增强康复信心,以便其更好地配合护理和功能锻炼。

3. 健康教育和指导

(1)加强预防 CO 中毒的宣传:居室内的火炉、煤炉要安装烟囱或排风扇。烟囱的室内
结构要严密,应定期开窗通风。厂矿使用煤气或产生煤气的车间、厂房要加强通风,加强对 CO 的监测。进入高浓度 CO 环境中执行紧急任务时,要戴好特制的 CO 防毒面具。

(2)出院指导:出院时留有后遗症者应鼓励患者树立继续治疗的信心,如痴呆或智力障碍者应嘱其家属悉心照顾,并教会家属对患者进行语言和肢体锻炼的方法。遵医嘱继续给予脑细胞复能剂治疗,如 B 族维生素、脑康复、脑活素、ATP、细胞色素 c、辅酶 A、胞磷胆碱等药物,不可随意停药。注意劳逸结合,根据身体状况做一些有氧运动,加强康复功能锻炼。如出现智力、记忆力下降及运动、感觉功能异常等迟发性脑病的表现,应及时就诊。

考点提示:一氧化碳中毒患者的护理。

四、急性酒精中毒患者的救护

乙醇俗称酒精，是无色、易燃、易挥发的液体，具有醇香气味，能与水和大多数有机溶剂混溶。一次饮入过量酒精或酒类饮料引起的中枢神经系统由兴奋转为抑制的状态称为急性酒精中毒，严重者可出现昏迷、呼吸抑制及休克。

(一) 护理评估

1. 中毒原因及机制

(1)中毒原因:有过量饮酒史,应询问饮酒的种类和饮用量、平素酒量、饮酒的具体时间、有无服用其他药物等。大量饮用含乙醇高的烈性酒易引起中毒。成人饮用酒精的中毒剂量存在个体差异,一般为纯酒精70~80g,而致死剂量为250~500g。

(2)中毒机制:乙醇对中枢神经系统的抑制作用随剂量增加而增加,由大脑皮质向下通过边缘系统、小脑、网状结构到延髓。小剂量可抑制 γ- 氨基丁酸(GABA)对脑的抑制作用,产生兴奋效应。血中乙醇浓度增高,作用于小脑,可引起共济失调;作用于网状结构,可引起昏睡和昏迷。极高浓度的乙醇抑制延髓中枢,可引起呼吸、循环功能衰竭。酒精中毒时,还可发生乳酸增多、酮体蓄积导致的代谢性酸中毒及糖异生受阻引起的低血糖。

2. 病情评估

(1) 临床表现与分级: 一次大量饮酒中毒会引起中枢神经系统抑制, 症状与饮酒量、血中乙醇浓度及个人耐受性有关, 临床上大致分为三期, 各期界限不是很明确。

1) 兴奋期: 血中乙醇浓度达 50mg/dL 时, 即感头痛、欣快、兴奋; 血中乙醇浓度超过 75mg/dL 时,出现健谈、情绪不稳定、自负、饶舌、易激怒，可有粗鲁行为或攻击行为，也可沉默、孤僻；血中乙醇浓度达100mg/dL时，驾车易发生车祸。

知识链接

酒驾的认定标准

国家标准《车辆驾驶人员血液、呼气酒精含量阈值与检验》(GB 19522-2024)规定，车辆驾驶人员血液中的酒精含量大于或等于 20mg/100mL，小于 80mg/100mL 的驾驶行为即为饮酒驾车，车辆驾驶人员血液中的酒精含量大于或等于 80mg/100mL 的驾驶行为即为醉酒驾车。

2) 共济失调期: 血中乙醇浓度达 150mg/dL 时, 即可出现共济失调, 表现为肌肉运动不协调、行动笨拙、眼球震颤、视力模糊、步态蹒跚、语无伦次且言语含糊不清。血中乙醇浓度达 200mg/dL 时, 可出现恶心、呕吐、困倦。

3) 昏睡期: 血中乙醇浓度达 250mg/dL 以上时, 患者进入昏迷期, 可出现昏睡、瞳孔散大、体温降低; 血中乙醇浓度超过 400mg/dL 时, 患者陷入深昏迷, 心率增快, 血压下降, 呼吸缓慢, 伴有鼾声, 可出现呼吸、循环麻痹而危及生命。

考点提示:急性酒精中毒的临床表现。

(2) 实验室检查及其他检查: 具体如下。

1) 血清乙醇检测: 呼出气体中乙醇浓度与血清乙醇浓度相当。

2) 动脉血气分析: 可有轻度代谢性酸中毒。

3) 血清电解质: 可有低血钾、低血镁、低血钙。

4) 血清葡萄糖检测: 可有低血糖。

5) 肝功能检测: 慢性酒精中毒性肝病时可有明显肝功能异常。

6) 心电图检查: 酒精中毒性心肌病可见心律失常和心肌损害。

(二)急救与护理

1. 现场急救 轻度中毒无须特殊治疗, 注意卧床休息, 适当保暖以防受凉。对于兴奋躁动的患者, 必要时加以约束。对于重症患者, 应迅速采取下述措施。

(1) 保持呼吸道通畅: 患者取平卧位, 头偏向一侧, 及时清除呕吐物及呼吸道分泌物, 以防止窒息。呼吸抑制者给予呼吸兴奋剂, 必要时行气管插管
、人工呼吸及辅助呼吸。

(2) 清除毒物: 神志清醒者可直接刺激咽部进行催吐。乙醇吸收快, 一般洗胃意义不大, 如 2h 内的中毒患者, 可考虑应用 1% 碳酸氢钠或 0.5% 活性炭混悬液、生理盐水洗胃。对昏迷时间长的严重患者, 应尽早行血液透析或腹膜透析治疗。

(3)应用纳洛酮:纳洛酮是阿片受体拮抗剂,对昏迷、呼吸抑制的患者有兴奋呼吸和催醒的作用。

(4)促进乙醇氧化代谢:50%葡萄糖溶液100mL静脉滴注,同时肌内注射维生素 B1 、维生素 B6 和烟酸各100mg,以加速乙醇在体内的氧化代谢。

(5) 对症治疗: 维持呼吸功能, 给予吸氧; 使用脱水剂和糖皮质激素, 防治脑水肿; 纠正低血糖; 慎用镇静剂; 躁动不安、过度兴奋者可用安定或氯丙嗪肌内注射; 禁用吗啡及巴比妥类药物。

2. 常规护理措施

(1) 严密观察病情: 观察生命体征、意识及瞳孔的变化, 并做好记录; 观察呕吐物的颜色、性状和量, 分辨有无胃黏膜损伤; 注意保持呼吸道通畅及观察有无尿潴留。

(2) 安全防护: 患者多数表现为烦躁、兴奋多语、四肢躁动, 应加强巡视, 使用床栏, 必要时给予适当约束, 防止意外发生。

(3) 对症护理: 昏迷者应定时翻身、按摩, 预防压疮的发生; 呼吸困难者给予吸氧, 及时清除呼吸道分泌物, 维持正常呼吸功能。

(4) 心理护理: 大多数患者清醒后常因饮酒入院有损颜面或入院致经济损失, 表现为后悔、怕家人埋怨, 护理人员应根据患者不同的心理状况及时与患者陪护人员进行思想交流。

3. 健康教育和指导

(1) 开展酗酒危害的宣传教育, 酒精及代谢产物乙醛可直接损伤肝细胞。

(2)不要空腹饮酒,饮酒要适量,切勿以酒来解除烦愁、寂寞、沮丧和工作压力等。

(3)饮酒过量时,可用催吐法尽快排出胃内乙醇,减少乙醇的吸收,减轻中毒。

考点提示:急性酒精中毒患者的护理。

五、镇静催眠药中毒患者的救护

镇静催眠药是中枢神经系统抑制药，具有镇静和催眠的作用，小剂量应用可使人处于安静或嗜睡状态，大剂量可麻醉全身，包括延髓。一次服用大剂量镇静催眠药可引起急性中毒，突然停药或减量可引起戒断综合征，长期滥用可引起耐药性和依赖性而导致慢性中毒。常用的镇静催眠药分类如下(表3-3)。

表 3-3 常用的镇静催眠药分类

\r
(一) 护理评估

1. 中毒原因及机制

(1)中毒原因:多发生于蓄意自杀者,偶可见于儿童误服或药物滥用者的意外中毒。中毒途径大多数是口服,少数通过静脉注射或肌内注射。评估毒物接触史时,是否有应用镇静催眠药史,了解用药种类、剂量及服用时间,是否经常服用该药,服药前后是否有饮酒史,病前有无情绪激动等。

(2)中毒机制:镇静催眠药均具有脂溶性,脂溶性强的药物易通过血-脑屏障,作用于中枢神经系统,起效快,作用时间短,为短效药。

1) 苯二氮䓬类药物: 目前研究认为, 苯二氮䓬类药物的中枢神经抑制作用与增强 GABA 能神经的功能有关。苯二氮䓬类药物与苯二氮䓬受体结合后, 可加强 GABA 与 GABA 受体结合的亲和力, 增强 GABA 对突触后的抑制功能。

2) 巴比妥类药物: 对 GABA 能神经有与苯二氮䓬类药物相似的作用, 苯二氮䓬类药物主要选择性作用于边缘系统, 影响情绪和记忆力。巴比妥类药物主要作用于网状结构上行激活系统而引起意识障碍。巴比妥
类药物对中枢神经系统的抑制有剂量 - 效应关系。随着剂量的增加, 由镇静、催眠到麻醉, 以致延髓中枢麻痹, 甚至死亡。

3)非巴比妥非苯二氮草类药物:其毒理作用与巴比妥类药物相似。

4) 吩噻嗪类药物: 主要作用于网状结构, 抑制中枢神经系统多巴胺受体, 以减轻焦虑、紧张、幻觉、妄想和病理性思维等精神症状。

2. 临床表现

(1)不同类型药物的表现:具体如下。

1) 巴比妥类药物中毒: 一次服用大剂量巴比妥类药物可引起中枢神经系统抑制, 症状与剂量有关。①轻度中毒: 嗜睡、情绪不稳定、注意力不集中、记忆力减退、共济失调、言语不清、步态不稳、眼球震颤、各种反射存在、生命体征平稳。②中度中毒: 昏睡, 强烈刺激能唤醒, 但不能言语, 很快又陷入昏睡状态, 呼吸浅慢, 血压正常, 腱反射消失, 角膜反射、咽反射仍存在。③重度中毒: 进行性中枢神经系统抑制, 由嗜睡到深昏迷。呼吸抑制由呼吸浅慢到呼吸停止, 脉搏细速, 血压下降, 肌张力下降, 腱反射消失。胃肠蠕动减慢, 皮肤可起大疱。长期昏迷患者可并发肺水肿、脑水肿、肾衰竭而危及生命。

2) 苯二氮䓬类药物中毒: 中枢神经系统抑制较轻, 主要症状是嗜睡、头晕、言语含糊不清、意识模糊、共济失调。很少出现严重症状, 如长时间深度昏迷和呼吸抑制等; 如果出现, 应考虑同时服用了其他镇静催眠药或饮酒等。

3) 非巴比妥非苯二氮䓬类药物中毒: 症状与巴比妥类药物中毒相似, 但也各有其特点。①水合氯醛中毒: 心、肝、肾损害, 可有心律失常等。②格鲁米特中毒: 意识障碍有周期性波动、瞳孔散大等。③甲喹酮中毒: 有明显的呼吸抑制, 可出现锥体束征, 如肌张力增强、腱反射亢进、抽搐等。④甲丙氨酯中毒: 常有血压下降。

4) 吩噻嗪类药物中毒: 最常见的为锥体外系反应, 临床表现有以下三类。①震颤麻痹综合征; ②不能静坐; ③急性肌张力障碍反应, 如斜颈、吞咽困难、牙关紧闭等。

5) 戒断综合征: 长期服用大剂量镇静催眠药的患者突然停药或迅速减少药量时, 可发生戒断综合征。其主要表现为自主神经兴奋性增高和轻、重症神经精神异常。

(2) 实验室及其他检查: 血液、尿液、胃液中药物浓度的测定对诊断有参考意义。血液生化检查包括血糖、尿素氮、肌酐、电解质等, 必要时行动脉血气分析。

考点提示:不同类型镇静催眠药急性中毒的临床表现。

(二)急救与护理

1. 现场急救

(1)迅速清除毒物:具体如下。

1) 洗胃: 口服中毒者早期用 1:5000 高锰酸钾溶液、清水或淡盐水洗胃, 服药量大、超过 6h 者仍需洗胃。

2) 活性炭及导泻剂的应用: 首次活性炭剂量为 50 ~ 100g, 用 2 倍的水制成混悬液口服或胃管内注入。应用活性炭时常给予硫酸钠 250mg/kg 导泻, 一般不用硫酸镁, 因为镁离子能抑制中枢神经系统。

3) 碱化尿液、利尿: 应用 5% 碳酸氢钠碱化尿液, 呋塞米利尿只对长效巴比妥类药物中毒有效, 对吩噻嗪类药物中毒无效。

4) 血液净化: 血液透析、血液灌流对苯巴比妥有效, 危重患者可考虑应用, 对苯二氮䓬类作用有限。

(2) 应用特效解毒剂: 巴比妥类和吩噻嗪类药物中毒无特效解毒药。氟马西尼是苯二氮䓬类拮抗剂, 能通过竞争性抑制苯二氮䓬类受体而阻断苯二氮䓬类药物的中枢神经系统作用。

(3)应用中枢神经系统兴奋剂:深度中枢抑制者可适量应用贝美格,对稳定呼吸、循环及维持生理反射有一定益处;纳洛酮是解救药物中毒引起呼吸抑制的有效药,具有兴奋呼吸、催醒的作用;呼吸中枢衰竭者可静脉给予尼可刹米、洛贝林。

(4) 对症治疗: 肝功能损害出现黄疸者, 予以保肝和皮质激素治疗。震颤麻痹综合征可选用盐酸苯海索(安坦)。若有肌肉痉挛及肌张力障碍, 可用苯海拉明。

2. 常规护理措施

(1) 严密观察病情: 观察患者意识状态和生命体征, 出现瞳孔散大、血压下降、呼吸变浅或不规则, 常提示病情恶化, 应及时向医生报告, 采取紧急处理措施。

(2) 保持呼吸道通畅、给氧: 仰卧位时头偏向一侧, 可防止呕吐物或痰液阻塞气道而引起窒息。及时用吸痰器吸出痰液, 持续给予氧气吸入, 防止脑组织缺氧引起脑水肿, 加重意识障碍。

(3) 饮食护理: 昏迷时间超过 3~5 天, 患者营养不易维持者, 可由鼻饲补充营养及水分, 一般给予高热量、高蛋白、易消化的流质饮食。

(4) 心理护理: 对服药自杀者, 注意心理疏导, 尽量使其配合治疗。

3. 健康教育和指导

(1) 向失眠者宣教导致睡眠紊乱的原因及避免失眠的方法, 可遵医嘱使用镇静催眠药, 但不能长期使用。

(2) 对服药自杀者, 不宜让其单独留在病房内, 以防止其再度自杀。

(3)加强药品管理,镇静药、催眠药处方的使用、保管应严加管理,特别是对有情绪不稳定或精神异常者,避免服药过量自杀。

考点提示:镇静催眠药中毒患者的护理。

素质拓展

关注青少年心理健康,预防自杀自残

世界卫生组织(WHO)统计数据显示,全球每年有近80万人死于自杀,每40s就有一个人选择结束自己的生命。自杀是15~34岁青壮年主要的致死原因之一。学校和家庭应该积极开展思想教育,引导其树立正确的人生观,学会自我情绪的调控,预防青少年自杀自残。

目标检测

1. 一氧化碳、氰化物中毒, 皮肤黏膜呈( )。

A. 黄色 B. 棕色 C. 樱桃红色

D. 黑色 E. 铁锈色

2. 下列毒物中毒后能使患者瞳孔扩大的是( )。

A. 吗啡 B. 有机磷 C. 阿托品

D. 安定 E. 毒蕈

3. 口服毒物已超过6h,也应彻底洗胃,其原因是( )。

A. 毒物作用引起肠蠕动加快

B. 毒物作用引起胃蠕动加快

C. 毒物作用引起幽门梗阻

D. 胃排空减慢,毒物仍可滞留在胃内

E. 口服中毒者,洗胃是唯一的治疗方法

4. 一氧化碳中度中毒, 血液 COHb 浓度为( )。

A. 10%~20% B. 30%~40% C. 40%~50%

D. 40%~60% E. 60%~80%

5. 有机磷中毒引起的毒蕈碱样症状是( )。

A. 肌束震颤 B. 流涎 C. 血压升高

D. 呼吸肌麻痹 E. 休克

6. 患者突然昏迷、抽搐、瞳孔缩小、皮肤湿冷、多汗、呼吸困难,应考虑( )的可能性大。

A. CO 中毒

B. 巴比妥类药物中毒

C. 中暑

D. 阿托品中毒

E. 有机磷农药中毒

7. 患者,男,36 岁,农民。为果树喷洒有机磷农药时不慎中毒,继而昏迷。下列处理措施不正确的是( )。

A. 立即脱去污染的衣物

B. 立即用热水清洗皮肤

C. 应用阿托品

D. 应用碘解磷定

E. 密切观察生命体征

8. 患者, 女, 60 岁。诊断为“有机磷农药中毒”, 已经给予洗胃等处理, 遵医嘱给予阿托品药物治疗。当患者出现 ( ) 时, 应及时通知医师给予停药。

A. 脸面涨红 B. 皮肤干燥、口干 C. 体温 37.2∘ C

D. 心率 100 次/分 E. 烦躁不安、抽搐

9. 急性酒精中毒青年男性患者, 在急诊科出现烦躁不安、过度兴奋, 可用( )。

A. 吗啡 B. 氯丙嗪 C. 地西泮

D. 苯巴比妥类镇静药 E. 乙醇

10. 急性酒精中毒最常见的死亡原因是( )。

A. 昏迷

B. 抽搐

C. 误吸和窒息

D. 休克

E. 呼吸麻痹

11. 患者, 女, 29 岁。口服安定 100 片, 被家人发现时呼之不应, 意识昏迷, 急诊入院, 错误的护理措施是( )。

A. 立即洗胃 B. 立即催吐 C. 硫酸镁导泻

D. 0.9% 生理盐水洗胃 E. 测量生命体征

12. 下列不是巴比妥类药物中毒特点的是( )。

A. 症状严重程度与剂量有关

B. 轻度中毒表现为嗜睡、情绪不稳定

C. 重度中毒可出现急性肌张力障碍反应

D. 可出现低血压和休克

E. 呼吸抑制,从浅慢到停止

(任冬 刘向东)`,rawHtml:`<p>学习目标</p>\r
<p>素质目标:具备认真、科学、严谨、求实的态度及高度的责任心,培养紧密协作的团队协作精神,树立“敬佑生命、救死扶伤、甘于奉献、大爱无疆”的急救理念。</p>\r
<p>知识目标: 掌握常见急性中毒、环境及理化因素损伤和常见急症患者的护理评估与救护措施; 掌握急性中毒救护原则。熟悉常见急性中毒、常见急症和环境及理化因素损伤患者的机制和病因。了解常见急性中毒、常见急症和环境及理化因素损伤患者的护理计划与评估内容。</p>\r
<p>能力目标:能运用所学知识对常见急性中毒、常见急症和环境及理化因素损伤患者进行快速评估,并进行紧急处理。</p>\r
<p>案例导学</p>\r
<p>赵某，女，40岁。1h前与丈夫吵架后自服一瓶约100mL的农药，随后出现恶心、呕吐、口吐白沫、大汗，意识逐渐模糊，家人呼之不应，来医院急诊。体格检查：体温37℃，脉搏110次/分，呼吸18次/分，血压90/60mmHg，皮肤湿冷，口腔有大蒜味，口流涎，两侧瞳孔缩小，对光反射迟钝。双肺闻及散在湿啰音，心率110次/分，律齐，无杂音。腹软，肝、脾未触及。四肢肌肉震颤，腱反射减弱。实验室检查：全血胆碱酯酶活力25%。</p>\r
<p>请思考：</p>\r
<p>1. 该患者中毒的可能原因是什么？</p>\r
<p>2. 如果你是急诊科护士,应如何抢救?</p>\r
<p>一、急性中毒概况</p>\r
<p>在一定条件下,某些物质接触或进入人体后与体液相互作用,损害组织,破坏神经和体液调节功能,使其正常的生理功能发生障碍,引起一系列症状和体征,称为中毒。引起中毒的化学物质称为毒物。根据毒物来源和用途可以分为:①工业性毒物;②药物;③农药;④有毒动植物。根据暴露毒物的毒性、剂量和时间通常将中毒分为急性中毒和慢性中毒两类。急性中毒是机体一次接触大量毒物或24h内多次暴露于某种或者某些毒物所致的中毒；慢性中毒是指长时间暴露，毒物进入机体蓄积中毒而出现的临床表现。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 中毒原因</p>\r
<p>(1) 生活中毒: 误食、用药过量、自杀、谋杀或意外接触有毒物质等, 导致过量毒物进入人体而发生中毒。</p>\r
<p>(2) 职业中毒: 人们在生产、运输、保管或使用等工作过程中, 未注意劳动防护或未遵守安全防护制度, 与有毒的生产原料、辅料、中间产物或成品密切接触而发生中毒。</p>\r
<p>2. 中毒机制</p>\r
<p>(1) 腐蚀作用: 强酸、强碱可吸收组织中的水分, 并与蛋白质或脂肪相结合, 使细胞变性、坏死。</p>\r
<p>(2) 组织和器官缺氧: 如一氧化碳与血红蛋白结合形成不易解离的碳氧血红蛋白, 使血红蛋白丧失携氧功能, 导致组织缺氧。</p>\r
<p>(3) 抑制酶的活性: 如有机磷农药抑制胆碱酯酶, 氰化物抑制细胞色素氧化酶, 重金属抑制含巯基的酶等。</p>\r
<p>(4)麻醉作用:亲脂性强的毒物(如有机溶剂和吸入性麻醉药)可通过血-脑屏障,抑制中枢神经系统的功能。</p>\r
<p>(5) 干扰细胞膜或细胞器功能: 如四氯化碳经酶催化形成三氯甲烷及自由基, 自由基作用于肝细胞膜中不饱和脂肪酸, 发生脂质过氧化, 使线粒体、内质网变性, 肝细胞坏死。</p>\r
<p>(6) 相关受体的竞争: 如阿托品过量时通过
竞争性阻断毒蕈碱受体而产生毒性作用。</p>\r
<p>3. 毒物进入人体和吸收的途径 在生产和生活环境中,毒物主要经呼吸道、皮肤黏膜和消化道侵入人体。毒物吸收后,通过血液循环分布到全身各组织或器官(图 3-1)。由于毒物本身理化特性及各组织的生化、生理特点,进而破坏了人体的正常生理功能,导致中毒。</p>\r
<p style="text-align: center;">图3-1 毒物在体内的过程</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540013-7-l.jpg" /><figcaption></figcaption></figure>\r
<p>4. 病情评估</p>\r
<p>(1)中毒情况:重点评估患者的健康史和中毒史等。及时了解中毒物质的种类、名称、剂量、途径和接触时间。评估患者生命体征的变化,注意皮肤黏膜颜色、温度、湿度及有无腐蚀征象。了解患者的精神状态,收集患者身边可能盛放毒物的容器、瓶子、纸袋和剩余毒物等,必要时深入现场,寻找毒物的来源。对不明原因的中毒询问时应注意以下几点。</p>\r
<p>1) 怀疑食物中毒者: 应详细询问进食的种类、来源和同餐人员的发病情况。</p>\r
<p>2)怀疑自杀者:应询问患者近期精神状况、有无家庭矛盾和社会矛盾及中毒发生前后的情绪与举止异常情况等。</p>\r
<p>3)怀疑服药过量者:应询问患者的服药史、服药种类、服药剂量等。</p>\r
<p>4)怀疑气体中毒者:应询问中毒现场空气是否流通,是否有毒气产生或泄漏等。</p>\r
<p>5)怀疑职业性中毒者:应询问患者的职业史,包括工种、工龄、接触毒物的种类及接触时间、防护条件等。</p>\r
<p>(2)临床表现:具体如下。</p>\r
<p>1)呼吸系统:①刺激症状,各种刺激性及腐蚀性气体,如强酸雾、甲醛溶液等,可直接引起呼吸道黏膜的严重刺激症状,表现为咳嗽、胸痛、呼吸困难,重者可出现严重发绀、呼吸急促、呼吸困难甚至呼吸衰竭等。②呼吸气味,评估呼出的气体是否有特殊气味,如有机磷农药中毒呼出气有大蒜味,氰化物中毒呼出气有苦杏仁味,酒精中毒呼出气有酒味。③呼吸频率、节律异常,亚硝酸盐、一氧化碳中毒致呼吸加快,安眠药、吗啡中毒致呼吸减慢。</p>\r
<p>2) 神经系统: 观察患者意识、神态及神经反射, 评估有无神经系统改变。昏迷见于镇静催眠药、麻醉药、有机溶剂、窒息性毒物、致高铁血红蛋白毒物及农药中毒。谵妄见于阿托品、乙醇或抗组胺药物中毒。精神失常见于一氧化碳、阿托品、酒精、二硫化碳、有机溶剂、抗组胺药物中毒或药物依赖戒断综合征等。</p>\r

<p>3) 皮肤黏膜: ①皮肤及口腔黏膜灼伤, 见于强酸、强碱等引起的腐蚀性损害, 如硫酸灼伤呈黑色, 硝酸灼伤呈黄色, 盐酸灼伤呈棕色, 过氧乙酸灼伤呈无色等。②发绀, 见于亚硝酸盐、磺胺、非那西丁、麻醉药等中毒。③樱桃红色, 见于一氧化碳、氰化物中毒。④毒蕈、四氯化碳或鱼胆中毒导致肝脏损害可出现黄疸。</p>\r
<p>4) 眼部: 瞳孔缩小见于有机磷农药、毒扁豆碱、吗啡等中毒; 瞳孔扩大见于阿托品、毒蕈、曼陀罗等中毒; 视力障碍见于甲醇、有机磷、苯丙胺等中毒。</p>\r
<p>5) 循环系统: 心律失常见于洋地黄、阿托品等中毒; 休克见于三氧化二砷、强酸、强碱及严重巴比妥中毒; 心搏骤停见于洋地黄、奎尼丁、锑剂、河豚等中毒。</p>\r
<p>6)泌尿系统:中毒后肾损伤可出现肾小管坏死(见于汞、四氯化碳、氨基糖苷类抗生素、毒蕈等中毒)、肾缺血、肾小管阻塞(砷化氢中毒可引起血管内溶血,游离血红蛋白自尿中排出时可阻塞肾小管),这些中毒均可造成肾损伤,最终导致急性肾衰竭,出现少尿甚至无尿。</p>\r
<p>7) 血液系统: 溶血性贫血见于砷化氢、苯胺、硝基苯等中毒; 白细胞减少和再生障碍性贫血见于氯霉素、抗肿瘤药、苯等中毒; 出血见于阿司匹林、氯霉素、氢氯噻嗪、抗肿瘤药物等中毒。</p>\r
<p>8) 发热: 见于抗胆碱药、二硝基酚、棉酚等中毒。</p>\r
<p>(3) 实验室检查: 急性中毒时, 应常规留取剩余的毒物或可能含毒的标本,
 如呕吐物、胃内容物及尿、粪和血标本等。必要时可以进行毒物分析和细菌培养。</p>\r
<p>(二)急性中毒救护原则和措施</p>\r
<p>1. 急性中毒救护原则</p>\r
<p>(1)立即终止接触毒物。</p>\r
<p>(2) 清除尚未吸收的毒物。</p>\r
<p>(3)促进已吸收毒物的排出。</p>\r
<p>(4) 应用特殊解毒剂。</p>\r
<p>(5)紧急复苏和对症支持治疗。</p>\r
<p>2. 急救护理措施</p>\r
<p>(1) 立即终止接触毒物: 立即将患者脱离中毒现场, 转到空气新鲜的地方; 立即除去患者污染衣物, 用温水或肥皂水清洗皮肤和毛发上的毒物; 用清水彻底冲洗、清除眼内毒物; 清除伤口处的毒物。</p>\r
<p>(2) 清除尚未吸收的毒物: 根据毒物进入人体的途径采取不同的急救措施。针对吸入性的中毒, 应将患者搬离有毒的环境, 保持呼吸道畅通, 呼吸新鲜空气, 有条件的尽快给予氧气吸入。针对皮肤接触性中毒, 可用大量清水冲洗毒物接触过的皮肤、毛发、指甲等。针对强腐蚀性毒物, 清水冲洗 15~30min 后, 可选用肥皂水、碳酸氢钠和醋酸等中和剂或特殊解毒剂进行冲洗。针对食入性中毒, 常用催吐、洗胃、导泻、灌肠和使用吸附剂等方法清除肠道尚未吸收的毒物。</p>\r
<p>1) 催吐: 对于神志清醒且配合的患者, 可优先选择催吐法(详见第二章第五节)。</p>\r
<p>2) 洗胃: 洗胃时可配合吸附剂进行解毒, 吸附剂除具有吸附功能外, 还可以起到氧化、中和、沉淀毒物等作用。目前使用较多的吸附剂有活性炭和万能解毒剂(活性炭: 鞣酸: 氧化镁通常为2:1:1)(详见第二章第五节)。</p>\r
<p>3) 导泻: 主要用于清除进入肠道还未吸收的毒物。神志清醒配合者可选择口服, 其他患者则可在洗胃完毕后, 经胃管向胃内灌入泻药以清除肠道内毒物。导泻常用的药物有番泻叶、聚乙二醇、硫酸钠或硫酸镁, 其中硫酸镁在肠道内可因镁离子吸收过多引起高镁血症, 对中枢神经和心肌起抑制作用, 因此, 昏迷患者或中毒者心、肾功能不全时不宜用硫酸镁进行导泻。</p>\r
<p>4) 灌肠: 除腐蚀性中毒外, 口服中毒 6h 以上、导泻无效或抑制肠蠕动毒物中毒者(如巴比妥类、颠茄类或阿片类药物)应及时灌肠, 可选择温盐水、清水、1% 肥皂水等连续多次灌肠。</p>\r
<p>(3)促进已吸收毒物的排出:常用的方法有利尿、吸氧和血液净化等。</p>\r
<p>1) 利尿: 通过强化利尿和改变尿液酸碱度来促进毒物的排出。可以在输液的同时使用利尿剂, 如快速大量静脉输注 5%~10% 葡萄糖溶液或者 5% 葡萄糖氯化钠溶液, 每小时 500~1000mL, 同时静脉注射呋塞米 20~80mg。也可根据毒物溶解后酸碱度不同, 选用相应能增强毒物排出的液体改变尿液酸碱度, 弱酸性毒物中毒时常用 5% 碳酸氢钠溶液来碱化尿液, 碱性毒物中毒时静脉输注维生素 C 或氯化铵溶液来酸化尿液。</p>\r
<p>2) 吸氧: 气体中毒时, 尽早给予吸氧。如一氧化碳中毒时, 吸氧可使碳氧血红蛋白分离, 加速一氧化碳排出。</p>\r
<p>3) 血液净化: 方法有血液透析、腹膜透析、血液滤过、血浆置换、血液灌流等。</p>\r
<p>知识链接</p>\r
<p>不同血液的净化方法</p>\r
<p>(1) 血液透析: 通过将患者的血液引出体外, 利用人工肾替代肾脏的功能, 清除体内废物和多余的水分。该技术利用半透膜两侧压力差原理, 实现溶质的清除; 适用于急性肾衰竭、慢性肾衰竭等引起的尿毒症患者。</p>\r
<p>(2) 腹膜透析: 是将透析液引入患者腹腔内, 在腹膜表面形成一层薄膜, 使毒素透过薄膜进入透析液中被排出体外的一种方式。该技术利用腹膜作为生物膜所具有的选择性通透特性以及其面积大、接触时间长等特点来达到清除毒素的目的, 可部分替代肾脏功能, 用于急性和慢性肾衰竭。</p>\r
<p>(3) 血液滤过: 是在密闭系统中使用弥散原理清除水分及小分子物质的过程。该技术借助于高通量透析器提高清除效率, 并且不需要常规调整酸碱平衡, 适用于多种原因导致的液体潴留状态。</p>\r
<p>(4) 血浆置换: 是将患者的血液分离出来, 去除致病因子后, 再将其重新输入体内。该技术能够快速有效地清除特定蛋白质类药物或其他异源蛋白成分, 对于免疫介导性疾病(如重症肌无力)有效。</p>\r
<p>(5)血液灌流:是将患者的血液引流出体外,通过吸附材料清除其中的有害物质后再回输至体内。该技术利用吸附剂对某些内源性或外源性毒素具有高度亲和力的特点来进行有效清除,可用于治疗药物中毒等情况。</p>\r

<p>(4)应用特殊解毒剂:特殊解毒剂是一类用于治疗特定中毒的药物,它们根据中毒物质的类型和严重程度选择使用,以最大限度地减少毒物的吸收和减轻中毒症状。这些解毒剂包括金属解毒剂、高铁血红蛋白解毒剂、氰化物解毒剂和有机磷农药解毒剂等(表3-1)。</p>\r
<p>表3-1 常见毒物的特殊解毒剂</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540013-10-l.jpg" /><figcaption>​</figcaption></figure>\r
<p>(5)紧急复苏和对症支持治疗:急性中毒昏迷患者,应保持呼吸道通畅,维持呼吸和循环功能,及时观察生命体征变化情况。严重中毒者出现心搏骤停、休克、循环衰竭、呼吸衰竭、肾衰竭、水电解质和酸碱平衡紊乱时,应立即采取有效急救复苏措施稳定生命体征。惊厥时选用抗惊厥药,如苯巴比妥钠、异戊巴比妥、地西泮等;脑水肿时,可应用甘露醇、地塞米松等。</p>\r
<p>考点提示:急性中毒的救护原则、救护措施及常见的解毒剂。</p>\r
<p>(三) 常规护理和健康教育</p>\r
<p>1. 常规护理</p>\r
<p>(1)休息与饮食:中毒者急性期应绝对卧床休息、保暖。病情允许时,鼓励患者多食高蛋白、高碳水化合物、高维生素的无渣饮食。口服中毒者不宜过早进食,待病情稳定后给予低脂、流质或半流质饮食,以防胆道系统收缩,毒物再次进入胃内被吸收,导致中毒症状加重。</p>\r
<p>(2) 口腔护理: 口服中毒者, 易出现口腔糜烂、溃疡。为了提高患者的生存质量, 增加患者营养, 口腔护理尤为重要。</p>\r
<p>(3) 对症护理: 保持呼吸道通畅, 高热时物理降温, 尿潴留时导尿, 抗惊厥等。</p>\r
<p>(4)心理护理:对于服毒自杀者,清醒时,不可让其独居一室,室内的锐利器械均需严格保管,以防患者再次自杀。同时了解患者社会文化背景,给予针对性指导,如指导患者阅读相关书籍,学习应对压力和矛盾的方法等,并为其提供情感支持。另外,做好家属及相关人员的思想工作,取得他们的支持,以帮助患者重新树立信心,适应社会生活。</p>\r
<p>2. 健康教育和指导 加强防毒宣传,不吃有毒、变质食品,加强毒物管理。做好患者的思想工作,解除患者的思想顾虑,向患者宣教预防中毒及自救的防护知识。</p>\r
<p>(1)看护好婴幼儿,防止其误食毒物和药物。</p>\r
<p>(2)青少年可发生自伤性服毒,要重视青少年的身心健康问题。</p>\r
<p>(3)加强宣传,普及植物、药物等相关防毒知识。</p>\r
<p>(4)医疗机构应加强、完善药物及毒物的管理,建设中毒控制中心,提高我国中毒治疗和预防水平,加强科学研究,探索建立中毒一体化检查平台,为中毒的诊断和治疗提供科学研究平台,加强科研与临床结合。</p>\r
<p>二、有机磷农药中毒患者的救护</p>\r
<p>有机磷农药是指含磷元素的有机化合物,主要用于防治植物病、虫、草害,又称为有机磷农药,在农业生产中的广泛使用,导致其在农作物中会发生不同程度的残留。有机磷农药对人体的危害以急性中毒为主，多发生于大剂量或反复接触之后，毒性越高，往往病情越重。有机磷农药属于有机磷酸酯或硫代磷酸酯类化合物，此类农药大多为油状液体，呈淡黄色至棕色，稍有挥发性，有大蒜臭味，且因品种不同而挥发性差异较大。甲拌磷和敌敌畏等挥发性较大，易通过呼吸道吸入中毒，一般难溶于水，易溶于有机溶剂，乐果、敌百虫等在水中的溶解度较大，大部分有机磷农药在酸性环境中稳定，而在碱性环境中则易分解失效，但个别农药遇碱后毒性更强。</p>\r
<p>知识链接</p>\r
<p>半数致死量</p>\r
<p>半数致死量(median lethal dose, LD50)表示在规定时间内,通过指定感染途径,使一定体重或年龄的某种动物半数死亡所需的最小细菌数或毒素量。在毒理学中,LD50是描述有毒物质或辐射毒性的常用指标。有机磷农药种类很多,根据其毒性强弱(口服半数致死量)分为高毒、中毒、低毒等。中华人民共和国农业农村部明令禁止不得在蔬菜、果树、茶叶、中草药材上使用高毒农药产品,如甲胺磷、对硫磷
、甲基对硫磷、久效磷和磷胺等。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 中毒原因及机制</p>\r
<p>(1)中毒原因:具体如下。</p>\r
<p>1) 生产及使用中毒: 生产中毒原因主要是在生产、包装、保管、运输、销售、配制、喷洒有机磷农药的过程中, 手套破损或者衣服和口罩污染, 也可因为生产设备密闭不严, 有机磷农药“跑、冒、滴、漏”或污染手、皮肤及吸入引起中毒。在药物使用过程中, 施药人员喷洒时, 药液污染皮肤或者湿透衣服而又被皮肤吸收或者是吸入有机磷农药均可导致中毒, 配药时手沾染原液也可引起中毒。</p>\r
<p>2) 生活中毒: 服毒自杀、误服农药或摄入被农药污染的水、食品等, 可经胃肠道吸收而中毒; 使用有机磷农药杀蚊虫、治疗皮肤病或内服驱虫药应用不当, 也可发生中毒。</p>\r
<p>(2)中毒机制:有机磷农药的中毒机制主要是抑制体内胆碱酯酶的活性。正常情况下,胆碱能神经兴奋所释放的递质——乙酰胆碱被胆碱酯酶水解为乙酸及胆碱而失去活性。有机磷农药进入人体后与体内胆碱酯酶迅速结合形成磷酰化胆碱酯酶,后者比较稳定,且无分解乙酰胆碱的能力,从而使乙酰胆碱积聚,引起胆碱能神经先兴奋后抑制的一系列症状,严重者可导致昏迷,甚至因呼吸衰竭而死亡(图3-2)。</p>\r
<p style="text-align: center;">图3-2 有机磷农药的中毒机制</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540013-14-l.jpg" /><figcaption></figcaption></figure>\r
<p>2. 毒物在体内的吸收与代谢过程 有机磷农药可经消化道、呼吸道、皮肤黏膜吸收。吸收后迅速分布于全身各脏器，尤其以肝脏浓度最高，其次为肾、肺、脾等，肌肉和脑组织最少。有机磷在肝脏主要经历分解和氧化等生物转化过程，一般通过氧化后毒性会增强，分解后产物毒性降低，如对硫磷氧化后形成对氧磷，对酶的抑制作用要比前者强300倍。有机磷农药排泄较快，吸收后6~12h血中浓度达到高峰，24h内排泄，48h后完全排出体外，体内聚集作用不明显。有机磷农药大部分由肾脏排出，小部分由粪便排出，也有极少部分随汗腺分泌的汗液或通过呼吸排出体外。</p>\r

<p>3. 病情评估</p>\r
<p>(1) 毒物接触史: 生产及使用性中毒, 毒物接触史比较明确。非生产性中毒, 有误服、故意吞服、间接接触摄入等, 应注意询问陪伴人员有机磷农药的种类、服毒量、服毒时间, 有无呕吐及呕吐物气味, 患者近来情绪、生活及工作情况等。</p>\r
<p>(2) 身体状况: 急性中毒发病时间及症状与毒物种类、剂量、侵入途径密切相关。经皮肤吸收中毒, 一般在 2~6h 内发病; 口服中毒后 10min 至 2h 发病; 吸入性中毒约 30min 发病。一旦出现中毒症状, 病情发展迅速, 可出现急性胆碱能危象, 主要表现为以下方面。</p>\r
<p>1) 毒蕈碱样症状: 又称 M 样症状, 此症状出现最早, 主要由副交感神经末梢过度兴奋所致, 主要表现为平滑肌痉挛和腺体分泌增加。平滑肌痉挛表现为瞳孔缩小、腹痛、腹泻、大小便失禁等; 腺体分泌增加表现为大汗、流泪、流涕和流涎; 气道分泌物增多表现为咳嗽、呼吸困难、气促、双肺干性或湿性啰音, 严重者出现肺水肿。</p>\r
<p>2) 烟碱样症状: 又称 N 样症状, 是由于乙酰胆碱在横纹肌神经肌肉接头处过度蓄积和刺激, 使面部、眼睑、舌、四肢及全身横纹肌发生肌纤维颤动, 甚至全身肌肉发生强直性痉挛。患者表现为肌束颤动、牙关紧闭、抽搐、惊厥、全身紧束压迫感, 四肢出现不规则颤动, 而后发生肌力减退和瘫痪, 呼吸肌麻痹可引起呼吸衰竭或停止。交感神经节后纤维末梢释放儿茶酚胺, 表现为血压升高和心律失常。</p>\r
<p>3) 中枢神经系统症状: 中枢神经系统受乙酰胆碱刺激后出现头晕、头痛、疲乏、共济失调、烦躁不安, 严重者可出现谵妄、抽搐、昏迷、中枢性呼吸衰竭。</p>\r
<p>4) 局部损伤: 有些有机磷农药接触皮肤后可发生过敏性皮炎、皮肤水疱或剥脱性皮炎; 污染眼部
时会出现结膜充血和瞳孔缩小。</p>\r
<p>(3)其他特殊表现:具体如下。</p>\r
<p>1) 中毒后反跳现象: 有机磷农药中毒经急救后临床症状好转, 可在 2 天至 1 周内突然急剧恶化, 重新出现有机磷农药急性中毒的症状, 如面色苍白、大汗、肌颤、瞳孔缩小、胸闷、血压升高、心率减慢、肺部出现湿啰音、昏迷等, 甚至发生肺水肿或突然死亡, 此为中毒后反跳现象。</p>\r
<p>2) 中间型综合征: 少数病例在急性症状缓解后和迟发性神经病变发生前, 在急性中毒后1~4天突然发生以呼吸肌麻痹为主的症状群, 如肢体近端肌肉、脑神经支配的肌肉及呼吸肌麻痹, 若不及时救治可迅速导致死亡, 称为“中间型综合征”。其发病机制为胆碱酯酶长期受抑制, 影响了神经肌肉接头处突触后功能。</p>\r
<p>3)迟发性神经病变:个别急性中毒患者在重度中毒症状消失后2~3周可发生迟发性多发性周围神经病变,表现为感觉、运动型多发性神经病变,主要累及肢体末端,且可发生下肢瘫痪、四肢肌肉萎缩等,称为迟发性神经病。目前认为这种病变可能是由于有机磷农药抑制神经靶酯酶并使其老化所致。</p>\r
<p>考点提示:毒蕈碱样症状、烟碱样症状。</p>\r
<p>(4) 实验室检查及其他检查: 具体如下。</p>\r
<p>1) 全血胆碱酯酶(ChE)活力测定: 是诊断有机磷农药中毒的特异性实验指标, 对中毒程度、疗效判断和预后估计均极为重要。以正常人血胆碱酯酶活力值作为 100%, 急性有机磷农药中毒时, ChE 降至正常人均值 70% 以下即有意义。</p>\r
<p>2) 毒物检测: 将呕吐物、首次洗胃液、血、尿、粪便等送检, 有助于有机磷农药中毒的诊断。对硫磷和甲基对硫磷在体内氧化分解生成对硝基酚, 敌百虫在体内生成三氯乙醇, 均由尿排出, 因此, 尿中测出对硝基酚或三氯乙醇有助于诊断上述毒物中毒。</p>\r
<p>(5)病情判断:具体如下。</p>\r
<p>1) 轻度中毒: 仅有毒蕈碱样症状, 血胆碱酯酶活力为 50%~70%。</p>\r
<p>2) 中度中毒: 毒蕈碱样症状加重, 出现烟碱样症状, 血胆碱酯酶活力为 30%~50%。</p>\r
<p>3) 重度中毒: 除毒蕈碱样症状和烟碱样症状外, 还有中枢神经系统受累和呼吸衰竭表现, 少数患者有脑水肿, 血胆碱酯酶活力降到 30% 以下。</p>\r
<p>素质拓展</p>\r
<p>急诊科医护人员的职业素养</p>\r
<p>急诊科医护人员应具有献身医学、热爱祖国、忠于人民、恪守医德、尊师守纪、刻苦钻研、孜孜不倦、救死扶伤、执着追求、精益求精的奉献精神。健康所系，生命相托，急诊科医护人员应为祖国医药卫生事业的开展和人类的身心健康奋斗终生。</p>\r
<p>(二)急救和护理</p>\r
<p>1. 急救措施</p>\r
<p>(1) 迅速清除毒物: 立即将患者脱离中毒现场, 脱去污染衣物。用生理盐水或肥皂水彻底清洗污染的皮肤、毛发和指甲, 然后用温水冲洗干净, 不能用热水洗, 以免增加吸收。眼部污染时, 可用大量生理盐水彻底冲洗。口服中毒者用清水、2% 碳酸氢钠溶液(美曲磷脂中毒者忌用)或1:5000高锰酸钾溶液(对硫磷中毒者忌用)反复洗胃,直至洗清为止,然后用硫酸钠导泻。</p>\r
<p>(2) 解毒剂的应用: 应用原则为早期、足量、联合、重复用药。</p>\r
<p>1) 阿托品: 抗胆碱药, 为解救中毒的关键性药物, 能阻断乙酰胆碱对副交感神经和中枢神经的 M 受体作用, 解除平滑肌痉挛, 抑制腺体分泌, 防止肺水肿, 消除毒蕈碱样症状; 兴奋呼吸中枢, 消除或减轻中枢神经系统症状, 但对烟碱样症状和恢复胆碱酯酶活力无效。</p>\r
<p>阿托品的使用原则为早期、足量、重复给药。阿托品使用剂量可以根据病情而定，每10～30min或1～2h给药一次，直至症状明显好转或患者出现阿托品化表现。阿托品化的表现包括：①瞳孔较前扩大；②颜面潮红；③皮肤干燥、腺体分泌物减少、无汗、口干、肺部啰音减少；④心率增快。阿托品化后，应减少阿托品的剂量或停用。如出现瞳孔明显扩大、神志模糊、烦躁不安、抽搐、昏迷和尿潴留等为阿托品中毒，应立即停用阿托品进行观察，必要时予以大量补液，或使用毛果芸香碱进行拮抗。阿托品化和阿托品中毒的鉴别如下(表3-2)。</p>\r

<p style="text-align: center;">表 3-2 阿托品化和阿托品中毒的鉴别</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540013-17-l.jpg" /><figcaption></figcaption></figure>\r
<p>考点提示:阿托品化和阿托品中毒的鉴别。</p>\r
<p>2) 盐酸戊乙奎醚(长托宁): 属于抗胆碱药, 有较强的中枢和外周抗胆碱作用, 使用简便、安全、长效, 疗效确切。作用时间长及毒副作用小, 与胆碱酯酶复能剂合用, 对重度中毒患者有显著效果。</p>\r
<p>3) 胆碱酯酶复能剂: 常用药物有碘解磷定、氯解磷定、双复磷等, 能使被抑制的胆碱酯酶恢复活性。胆碱酯酶复能剂对解除烟碱样症状作用明显, 但对毒蕈碱样症状作用较差, 也不能对抗呼吸中枢的抑制, 所以胆碱酯酶复能剂与阿托品合用, 可取得协同效果。</p>\r
<p>有机磷农药中毒的治疗最理想的是胆碱酯酶复能剂与阿托品合用。轻度中毒可单独使用胆碱酯酶复能剂；中、重度中毒两种解毒药合用时，阿托品的剂量应减少，以免发生阿托品中毒。</p>\r
<p>4) 解磷注射液: 为含有抗胆碱药和胆碱酯酶复能剂的复方注射液, 适用于现场急救, 对毒蕈碱样、烟碱样和中枢神经系统症状均有较好的对抗作用, 对中毒的胆碱酯酶也有较好的复活作用, 起效快, 作用时间较长, 目前临床上已广泛使用。</p>\r
<p>(3) 对症治疗: 有机磷农药中毒主要的死因是肺水肿、脑水肿、呼吸衰竭。休克、急性脑水肿、心肌损害及心搏骤停等也是重要死因, 因此应加强对重要脏器的监护, 发现病情变化及时处理。如肺水肿时应用阿托品; 休克时应用升压药; 脑水肿时应用脱水剂和肾上腺糖皮质激素; 心律失常时及时应用抗心律失常药物。</p>\r
<p>2. 常规护理措施</p>\r
<p>(1)体位护理:根据患者的病情选择合理的体位,休克者取中凹卧位,中毒较重者取左侧卧位。</p>\r
<p>(2)饮食护理:吸入性或皮肤黏膜侵入性中毒者,应鼓励患者早期进食,宜选择清淡、少渣的流质或半流质饮食,逐渐恢复普食;口服中毒者,待病情稳定、神志清醒后,可给予米糊、米汤、面糊、藕粉、蛋清等温流质饮食,禁食刺激性、高脂食物,以免引起胆道系统和胃黏膜皱襞的毒物再次进入血液;昏迷者应给予鼻饲。</p>\r
<p>(3) 对症护理: 保持呼吸道通畅, 及时清除呼吸道分泌物, 缺氧者根据呼吸困难程度调节氧流量; 昏迷患者要加强口腔护理和皮肤护理, 防止坠积性肺炎和压疮的发生; 留置导尿管者要保持尿道口清洁, 保持引流管的通畅, 定时更换储尿袋, 防止泌尿系统的逆行感染; 惊厥者要注意安全, 防止发生意外。</p>\r
<p>(4) 心理护理: 了解患者中毒的原因, 根据不同的心理特点予以心理疏导, 以诚恳的态度为患者提供情感上的支持, 并认真做好家属的思想工作。</p>\r
<p>3. 健康教育和指导</p>\r
<p>(1)加强预防有机磷农药中毒知识宣传:如在喷洒农药时应遵守操作规程,加强个人防护,穿长袖衣裤及鞋袜,戴口罩、帽子及手套,污染衣物及时洗净。</p>\r
<p>(2)加强有机磷农药的管理:农药盛具要专用,标记要清楚,防止误食。</p>\r
<p>(3) 生活指导: 蔬菜、水果在食用之前要清洗干净, 避免残留农药引起中毒。怀疑为有机磷农药毒死的家禽时, 不可食用。</p>\r
<p>考点提示:有机磷农药中毒患者的护理。</p>\r
<p>三、急性一氧化碳中毒患者的救护</p>\r
<p>一氧化碳(CO)为无色、无味、无刺激性的气体,比重为0.967,几乎不溶于水,易溶于氨水。在空气中燃烧呈蓝色火焰。在空气中浓度达12.5%时,有爆炸的危险。吸入过量一氧化碳引起的中毒称急性一氧化碳中毒,俗称煤气中毒,是常见的生活中毒和职业中毒。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 中毒原因及机制</p>\r
<p>(1)中毒原因:患者一般均有一氧化碳吸入史。仔细观察发病现场情况,详细询问中毒的原因,了解中毒时所处的环境、停留时间以及同室他人有无同样症状、有无突发昏迷等情况。</p>\r
<p>1) 工业中毒: 炼钢、炼焦、烧窑等工业生产中, 高炉煤气与煤气发生炉中含 CO 30%~35%, 水煤气含 CO 30%~40%, 如炉门、窑门关闭不严、管道泄漏及煤矿瓦斯爆炸时都有大量 CO 产生, 会导致吸入性中毒。</p>\r
<p>2) 生活
中毒: 煤炉产生的气体中 CO 的含量高达 6%~30%。室内门窗紧闭, 火炉无烟囱或烟囱堵塞、漏气、倒风以及在通风不良的浴室内使用燃气加热器淋浴, 密闭空调车内滞留时间过长等都可发生 CO 中毒。失火现场空气中 CO 浓度高达 10% 时,也可发生中毒。每日吸烟一包,可使血液碳氧血红蛋白(COHb)浓度升高至 5%~6%,连续大量吸烟也可导致一氧化碳中毒。</p>\r
<p>(2)中毒机制:主要是引起组织缺氧。CO 吸入机体后,其中 85% 与血液中红细胞的血红蛋白(Hb)结合,形成稳定的 COHb。CO 与血红蛋白的亲和力比氧与血红蛋白的亲和力大 240 倍,而碳氧血红蛋白的解离速度是氧合血红蛋白(HbO₂)解离速度的 1/3600,故易造成碳氧血红蛋白在体内蓄积。COHb 不仅不能携带氧,而且还影响氧合血红蛋白正常解离,即氧不易释放到组织中,从而导致组织和细胞缺氧。此外,CO 还可抑制细胞色素氧化酶,直接抑制组织细胞内呼吸。这些因素使组织、细胞缺氧更严重。中枢神经系统对缺氧最为敏感,故最先受累。严重者有脑水肿,少数患者可发生迟发性脑病。</p>\r
<p>素质拓展</p>\r
<p>培养“五术”医学人才</p>\r
<p>2020 年 10 月,高等教育司司长吴岩解读《关于加快医学教育创新发展的指导意见》时提出,应培养新时代“五术”医学人才,即“救死扶伤的道术、心中有爱的仁术、知识扎实的学术、本领过硬的技术、方法科学的艺术”。无论是作为一名医学生还是一名行医者,除了精湛的医术,更要有高尚的品德修养,要有一颗“见彼苦恼,若己有之”的心和良好的医德医风,自觉树立“全心全意为患者服务”的意识和“患者高于一切”的信念。</p>\r

<p>2. 病情评估</p>\r
<p>(1) 临床表现和分级: 急性一氧化碳中毒的症状与血液中 COHb 浓度密切相关, 同时也与患者中毒前的健康状况, 如有无心脑血管疾病及中毒时体力活动等情况有关。按中毒程度, 急性 CO 中毒可分为轻、中、重三级。</p>\r
<p>1) 轻度中毒: 血液 COHb 浓度为 10%~20%。患者表现为头痛、头晕、乏力、恶心、呕吐、心悸、四肢无力, 甚至出现短暂性晕厥等。原有冠心病患者可出现心绞痛。患者如能及时脱离中毒环境, 吸入新鲜空气或氧疗, 症状很快就可消失。</p>\r
<p>2) 中度中毒: 血液 COHb 浓度为 30%~40%。除上述症状外, 可出现皮肤黏膜呈樱桃红色、神志不清、呼吸困难、烦躁、谵妄、昏迷, 对疼痛刺激可有反应, 脉快, 多汗, 瞳孔对光反射、角膜反射可迟钝, 腱反射减弱等。患者经积极治疗可以恢复正常, 且无明显并发症和后遗症。</p>\r
<p>3) 重度中毒: 血液 COHb 浓度大于 50%。患者迅速出现昏迷, 各种反射消失, 可呈去大脑皮质状态。患者可以睁眼, 但无意识, 不语、不动、不主动进食, 呼之不应、推之不动, 并有肌张力增强, 可发生脑水肿伴惊厥、呼吸抑制、休克、心律失常、上消化道出血等。患者死亡率高, 存活者多有不同程度的后遗症。</p>\r
<p>4)急性一氧化碳中毒迟发性脑病(神经、精神后遗症):急性一氧化碳中毒患者在意识障碍恢复后,经过2~60天的“假愈期”,可出现下列临床表现之一。①精神意识障碍:呈痴呆、木僵、谵妄或去大脑皮质状态。②锥体外系神经损害:出现震颤麻痹综合征。③锥体系神经损害:如偏瘫、病理反射阳性或大小便失禁等。④大脑皮质局灶性功能障碍:如失语、失明或继发性癫痫等。⑤脑神经及周围神经损害:如视神经萎缩、听神经损害及周围神经病变等。</p>\r
<p>考点提示: CO 中毒的临床表现和分级。</p>\r
<p>(2) 实验室检查及其他检查: 具体如下。</p>\r
<p>1) 血液 COHb 测定: 是诊断一氧化碳中毒的特异性指标, 可明确诊断且有助于分型和估计预后。</p>\r
<p>2) 脑电图检查: 可见弥漫性不规则性慢波、双额低幅慢波及平坦波。</p>\r
<p>3) 头部 CT 检查: 可发现大脑皮质下白质, 半卵圆形中心与脑室周围白质密度降低或苍白球对称性密度降低。</p>\r
<p>知识链接</p>\r
<p>血液 COHb 测定常用的方法</p>\r
<p>1. 加碱法 取患者血
液 1 或 2 滴, 用蒸馏水 3~4mL 稀释后, 加 10% 氢氧化钠溶液 1 或 2 滴, 混匀。正常血液呈棕绿色, 血液中 COHb 增多时, 加入氢氧化钠溶液后血液仍保持淡红色不变。</p>\r
<p>2. 煮沸法 取蒸馏水 10mL, 加入患者血液 3~5 滴, 血中如有 COHb, 煮沸后仍为红色。以上两种均为血液 COHb 定性测定方法。</p>\r
<p>3. 分光镜检查法 为定量测定方法,取血液数滴,加入蒸馏水 10mL,用分光镜检查可见特殊吸收带。</p>\r
<p>(二)急救与护理</p>\r
<p>1. 急救措施</p>\r
<p>(1) 终止一氧化碳吸入: 迅速将患者转移到空气新鲜处, 让其卧床休息、保暖、保持呼吸道畅通。</p>\r
<p>(2) 氧疗: 一氧化碳中毒最有效的治疗方法。轻、中度中毒患者可采用面罩或鼻导管高流量给氧（流量应保持在 8～10L/min）; 严重中毒患者给予高压氧舱治疗, 可加速碳氧血红蛋白解离, 促进一氧化碳排出, 从而减少神经、精神后遗症和降低病死率。</p>\r
<p>(3)防治脑水肿,促进脑细胞代谢:严重中毒后2~4h即可出现脑水肿,24~48h达高峰。在积极纠正缺氧的同时给予脱水治疗,可快速静脉滴注20%甘露醇,也可用呋塞米、肾上腺皮质激素等药物,降低颅内压,减轻脑水肿。可适量补充能量合剂、细胞色素c、胞磷胆碱等药物,以促进脑细胞代谢。</p>\r
<p>(4) 对症治疗: 昏迷者应保持呼吸道通畅, 必要时行气管插管或气管切开防止继发感染。高热抽搐者, 可采用头部降温、亚低温疗法及止痉挛药物等对症治疗。</p>\r
<p>考点提示:CO 中毒的急救措施。</p>\r
<p>2. 常规护理措施</p>\r
<p>(1) 病情观察: ①定时测量生命体征, 观察神志变化, 记录出、入液量, 做好重病记录。②观察患者有无头痛、喷射性呕吐等脑水肿征象。③了解碳氧血红蛋白测定结果。</p>\r
<p>(2) 氧气吸入的护理: 患者脱离现场后应立即给氧, 采用面罩或鼻导管高流量给氧(流量应保持在 8 ~ 10L/min)。给氧时间一般不应超过 24h, 以防发生氧中毒和二氧化碳潴留。呼吸深快的患者亦可吸入含二氧化碳的氧气, 可改善呼吸性碱中毒。重症患者及早采用高压氧治疗。</p>\r
<p>知识链接</p>\r
<p>高压氧治疗一氧化碳中毒的原理</p>\r
<p>高压氧治疗是指在高于一个标准大气压的环境下吸入高浓度的氧，主要用于一些缺血、缺氧的疾病，或者与缺血、缺氧相关的疾病的治疗。急性一氧化碳中毒或者有害气体中毒可以通过及时的高压氧治疗，将有害气体置换出去。对于一些急性脑血管疾病如脑外伤、颅脑肿瘤术后的脑组织损伤患者，可以积极地改善脑组织的缺血、缺氧状态及减轻脑水肿、改善循环，及时进行神经的修复。高压氧治疗一氧化碳中毒的原理：提高机体氧含量，使组织得到足够的溶解氧，迅速纠正低氧血症；加速COHb的解离，促进CO的清除，使血红蛋白恢复携氧功能；提高SOD活性，减少自由基的损害；高压氧使颅内血管收缩，打破脑缺氧与脑水肿之间的恶性循环。此外，高压氧舱在防治迟发性脑病、恢复细胞呼吸酶活性、改善中枢神经细胞呼吸障碍等方面有很大优势。</p>\r
<p>(3)饮食护理:神志清醒者,给予清淡、易消化的流质或半流质饮食,宜选用高热量、高蛋白、高维生素、少刺激、少油腻的食物;神志不清者，可予以鼻饲营养。</p>\r
<p>(4) 对症护理: 呼吸停止时, 使用呼吸兴奋剂并及早进行人工呼吸或用人工呼吸机呼吸; 昏迷高热、频繁抽搐者采用物理降温, 必要时可采用冬眠疗法, 防止自伤或坠伤; 昏迷超过 24h 者需应用抗生素预防感染。</p>\r

<p>(5)预防感染:加强口腔、皮肤护理,督促患者刷牙、漱口;患者不能自理时,可给予口腔护理,每日2次。</p>\r
<p>(6)心理护理:护理人员应有高度的同情心和责任心,多与患者交谈,建立良好的护患关系,增加患者的信任感和安全感,消除患者的不良情绪,增强康复信心,以便其更好地配合护理和功能锻炼。</p>\r
<p>3. 健康教育和指导</p>\r
<p>(1)加强预防 CO 中毒的宣传:居室内的火炉、煤炉要安装烟囱或排风扇。烟囱的室内
结构要严密,应定期开窗通风。厂矿使用煤气或产生煤气的车间、厂房要加强通风,加强对 CO 的监测。进入高浓度 CO 环境中执行紧急任务时,要戴好特制的 CO 防毒面具。</p>\r
<p>(2)出院指导:出院时留有后遗症者应鼓励患者树立继续治疗的信心,如痴呆或智力障碍者应嘱其家属悉心照顾,并教会家属对患者进行语言和肢体锻炼的方法。遵医嘱继续给予脑细胞复能剂治疗,如 B 族维生素、脑康复、脑活素、ATP、细胞色素 c、辅酶 A、胞磷胆碱等药物,不可随意停药。注意劳逸结合,根据身体状况做一些有氧运动,加强康复功能锻炼。如出现智力、记忆力下降及运动、感觉功能异常等迟发性脑病的表现,应及时就诊。</p>\r
<p>考点提示:一氧化碳中毒患者的护理。</p>\r
<p>四、急性酒精中毒患者的救护</p>\r
<p>乙醇俗称酒精，是无色、易燃、易挥发的液体，具有醇香气味，能与水和大多数有机溶剂混溶。一次饮入过量酒精或酒类饮料引起的中枢神经系统由兴奋转为抑制的状态称为急性酒精中毒，严重者可出现昏迷、呼吸抑制及休克。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 中毒原因及机制</p>\r
<p>(1)中毒原因:有过量饮酒史,应询问饮酒的种类和饮用量、平素酒量、饮酒的具体时间、有无服用其他药物等。大量饮用含乙醇高的烈性酒易引起中毒。成人饮用酒精的中毒剂量存在个体差异,一般为纯酒精70~80g,而致死剂量为250~500g。</p>\r
<p>(2)中毒机制:乙醇对中枢神经系统的抑制作用随剂量增加而增加,由大脑皮质向下通过边缘系统、小脑、网状结构到延髓。小剂量可抑制 γ- 氨基丁酸(GABA)对脑的抑制作用,产生兴奋效应。血中乙醇浓度增高,作用于小脑,可引起共济失调;作用于网状结构,可引起昏睡和昏迷。极高浓度的乙醇抑制延髓中枢,可引起呼吸、循环功能衰竭。酒精中毒时,还可发生乳酸增多、酮体蓄积导致的代谢性酸中毒及糖异生受阻引起的低血糖。</p>\r
<p>2. 病情评估</p>\r
<p>(1) 临床表现与分级: 一次大量饮酒中毒会引起中枢神经系统抑制, 症状与饮酒量、血中乙醇浓度及个人耐受性有关, 临床上大致分为三期, 各期界限不是很明确。</p>\r
<p>1) 兴奋期: 血中乙醇浓度达 50mg/dL 时, 即感头痛、欣快、兴奋; 血中乙醇浓度超过 75mg/dL 时,出现健谈、情绪不稳定、自负、饶舌、易激怒，可有粗鲁行为或攻击行为，也可沉默、孤僻；血中乙醇浓度达100mg/dL时，驾车易发生车祸。</p>\r
<p>知识链接</p>\r
<p>酒驾的认定标准</p>\r
<p>国家标准《车辆驾驶人员血液、呼气酒精含量阈值与检验》(GB 19522-2024)规定，车辆驾驶人员血液中的酒精含量大于或等于 20mg/100mL，小于 80mg/100mL 的驾驶行为即为饮酒驾车，车辆驾驶人员血液中的酒精含量大于或等于 80mg/100mL 的驾驶行为即为醉酒驾车。</p>\r
<p>2) 共济失调期: 血中乙醇浓度达 150mg/dL 时, 即可出现共济失调, 表现为肌肉运动不协调、行动笨拙、眼球震颤、视力模糊、步态蹒跚、语无伦次且言语含糊不清。血中乙醇浓度达 200mg/dL 时, 可出现恶心、呕吐、困倦。</p>\r
<p>3) 昏睡期: 血中乙醇浓度达 250mg/dL 以上时, 患者进入昏迷期, 可出现昏睡、瞳孔散大、体温降低; 血中乙醇浓度超过 400mg/dL 时, 患者陷入深昏迷, 心率增快, 血压下降, 呼吸缓慢, 伴有鼾声, 可出现呼吸、循环麻痹而危及生命。</p>\r
<p>考点提示:急性酒精中毒的临床表现。</p>\r
<p>(2) 实验室检查及其他检查: 具体如下。</p>\r
<p>1) 血清乙醇检测: 呼出气体中乙醇浓度与血清乙醇浓度相当。</p>\r
<p>2) 动脉血气分析: 可有轻度代谢性酸中毒。</p>\r
<p>3) 血清电解质: 可有低血钾、低血镁、低血钙。</p>\r
<p>4) 血清葡萄糖检测: 可有低血糖。</p>\r
<p>5) 肝功能检测: 慢性酒精中毒性肝病时可有明显肝功能异常。</p>\r
<p>6) 心电图检查: 酒精中毒性心肌病可见心律失常和心肌损害。</p>\r
<p>(二)急救与护理</p>\r
<p>1. 现场急救 轻度中毒无须特殊治疗, 注意卧床休息, 适当保暖以防受凉。对于兴奋躁动的患者, 必要时加以约束。对于重症患者, 应迅速采取下述措施。</p>\r
<p>(1) 保持呼吸道通畅: 患者取平卧位, 头偏向一侧, 及时清除呕吐物及呼吸道分泌物, 以防止窒息。呼吸抑制者给予呼吸兴奋剂, 必要时行气管插管
、人工呼吸及辅助呼吸。</p>\r
<p>(2) 清除毒物: 神志清醒者可直接刺激咽部进行催吐。乙醇吸收快, 一般洗胃意义不大, 如 2h 内的中毒患者, 可考虑应用 1% 碳酸氢钠或 0.5% 活性炭混悬液、生理盐水洗胃。对昏迷时间长的严重患者, 应尽早行血液透析或腹膜透析治疗。</p>\r
<p>(3)应用纳洛酮:纳洛酮是阿片受体拮抗剂,对昏迷、呼吸抑制的患者有兴奋呼吸和催醒的作用。</p>\r
<p>(4)促进乙醇氧化代谢:50%葡萄糖溶液100mL静脉滴注,同时肌内注射维生素 B<sub>1</sub> 、维生素 B<sub>6</sub> 和烟酸各100mg,以加速乙醇在体内的氧化代谢。</p>\r
<p>(5) 对症治疗: 维持呼吸功能, 给予吸氧; 使用脱水剂和糖皮质激素, 防治脑水肿; 纠正低血糖; 慎用镇静剂; 躁动不安、过度兴奋者可用安定或氯丙嗪肌内注射; 禁用吗啡及巴比妥类药物。</p>\r

<p>2. 常规护理措施</p>\r
<p>(1) 严密观察病情: 观察生命体征、意识及瞳孔的变化, 并做好记录; 观察呕吐物的颜色、性状和量, 分辨有无胃黏膜损伤; 注意保持呼吸道通畅及观察有无尿潴留。</p>\r
<p>(2) 安全防护: 患者多数表现为烦躁、兴奋多语、四肢躁动, 应加强巡视, 使用床栏, 必要时给予适当约束, 防止意外发生。</p>\r
<p>(3) 对症护理: 昏迷者应定时翻身、按摩, 预防压疮的发生; 呼吸困难者给予吸氧, 及时清除呼吸道分泌物, 维持正常呼吸功能。</p>\r
<p>(4) 心理护理: 大多数患者清醒后常因饮酒入院有损颜面或入院致经济损失, 表现为后悔、怕家人埋怨, 护理人员应根据患者不同的心理状况及时与患者陪护人员进行思想交流。</p>\r
<p>3. 健康教育和指导</p>\r
<p>(1) 开展酗酒危害的宣传教育, 酒精及代谢产物乙醛可直接损伤肝细胞。</p>\r
<p>(2)不要空腹饮酒,饮酒要适量,切勿以酒来解除烦愁、寂寞、沮丧和工作压力等。</p>\r
<p>(3)饮酒过量时,可用催吐法尽快排出胃内乙醇,减少乙醇的吸收,减轻中毒。</p>\r
<p>考点提示:急性酒精中毒患者的护理。</p>\r
<p>五、镇静催眠药中毒患者的救护</p>\r
<p>镇静催眠药是中枢神经系统抑制药，具有镇静和催眠的作用，小剂量应用可使人处于安静或嗜睡状态，大剂量可麻醉全身，包括延髓。一次服用大剂量镇静催眠药可引起急性中毒，突然停药或减量可引起戒断综合征，长期滥用可引起耐药性和依赖性而导致慢性中毒。常用的镇静催眠药分类如下(表3-3)。</p>\r
<p style="text-align: center;">表 3-3 常用的镇静催眠药分类</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540013-28-l.jpg" /><figcaption></figcaption></figure>\r
<p>(一) 护理评估</p>\r
<p>1. 中毒原因及机制</p>\r
<p>(1)中毒原因:多发生于蓄意自杀者,偶可见于儿童误服或药物滥用者的意外中毒。中毒途径大多数是口服,少数通过静脉注射或肌内注射。评估毒物接触史时,是否有应用镇静催眠药史,了解用药种类、剂量及服用时间,是否经常服用该药,服药前后是否有饮酒史,病前有无情绪激动等。</p>\r
<p>(2)中毒机制:镇静催眠药均具有脂溶性,脂溶性强的药物易通过血-脑屏障,作用于中枢神经系统,起效快,作用时间短,为短效药。</p>\r
<p>1) 苯二氮䓬类药物: 目前研究认为, 苯二氮䓬类药物的中枢神经抑制作用与增强 GABA 能神经的功能有关。苯二氮䓬类药物与苯二氮䓬受体结合后, 可加强 GABA 与 GABA 受体结合的亲和力, 增强 GABA 对突触后的抑制功能。</p>\r
<p>2) 巴比妥类药物: 对 GABA 能神经有与苯二氮䓬类药物相似的作用, 苯二氮䓬类药物主要选择性作用于边缘系统, 影响情绪和记忆力。巴比妥类药物主要作用于网状结构上行激活系统而引起意识障碍。巴比妥
类药物对中枢神经系统的抑制有剂量 - 效应关系。随着剂量的增加, 由镇静、催眠到麻醉, 以致延髓中枢麻痹, 甚至死亡。</p>\r
<p>3)非巴比妥非苯二氮草类药物:其毒理作用与巴比妥类药物相似。</p>\r
<p>4) 吩噻嗪类药物: 主要作用于网状结构, 抑制中枢神经系统多巴胺受体, 以减轻焦虑、紧张、幻觉、妄想和病理性思维等精神症状。</p>\r
<p>2. 临床表现</p>\r
<p>(1)不同类型药物的表现:具体如下。</p>\r
<p>1) 巴比妥类药物中毒: 一次服用大剂量巴比妥类药物可引起中枢神经系统抑制, 症状与剂量有关。①轻度中毒: 嗜睡、情绪不稳定、注意力不集中、记忆力减退、共济失调、言语不清、步态不稳、眼球震颤、各种反射存在、生命体征平稳。②中度中毒: 昏睡, 强烈刺激能唤醒, 但不能言语, 很快又陷入昏睡状态, 呼吸浅慢, 血压正常, 腱反射消失, 角膜反射、咽反射仍存在。③重度中毒: 进行性中枢神经系统抑制, 由嗜睡到深昏迷。呼吸抑制由呼吸浅慢到呼吸停止, 脉搏细速, 血压下降, 肌张力下降, 腱反射消失。胃肠蠕动减慢, 皮肤可起大疱。长期昏迷患者可并发肺水肿、脑水肿、肾衰竭而危及生命。</p>\r
<p>2) 苯二氮䓬类药物中毒: 中枢神经系统抑制较轻, 主要症状是嗜睡、头晕、言语含糊不清、意识模糊、共济失调。很少出现严重症状, 如长时间深度昏迷和呼吸抑制等; 如果出现, 应考虑同时服用了其他镇静催眠药或饮酒等。</p>\r
<p>3) 非巴比妥非苯二氮䓬类药物中毒: 症状与巴比妥类药物中毒相似, 但也各有其特点。①水合氯醛中毒: 心、肝、肾损害, 可有心律失常等。②格鲁米特中毒: 意识障碍有周期性波动、瞳孔散大等。③甲喹酮中毒: 有明显的呼吸抑制, 可出现锥体束征, 如肌张力增强、腱反射亢进、抽搐等。④甲丙氨酯中毒: 常有血压下降。</p>\r
<p>4) 吩噻嗪类药物中毒: 最常见的为锥体外系反应, 临床表现有以下三类。①震颤麻痹综合征; ②不能静坐; ③急性肌张力障碍反应, 如斜颈、吞咽困难、牙关紧闭等。</p>\r
<p>5) 戒断综合征: 长期服用大剂量镇静催眠药的患者突然停药或迅速减少药量时, 可发生戒断综合征。其主要表现为自主神经兴奋性增高和轻、重症神经精神异常。</p>\r
<p>(2) 实验室及其他检查: 血液、尿液、胃液中药物浓度的测定对诊断有参考意义。血液生化检查包括血糖、尿素氮、肌酐、电解质等, 必要时行动脉血气分析。</p>\r
<p>考点提示:不同类型镇静催眠药急性中毒的临床表现。</p>\r
<p>(二)急救与护理</p>\r
<p>1. 现场急救</p>\r
<p>(1)迅速清除毒物:具体如下。</p>\r
<p>1) 洗胃: 口服中毒者早期用 1:5000 高锰酸钾溶液、清水或淡盐水洗胃, 服药量大、超过 6h 者仍需洗胃。</p>\r

<p>2) 活性炭及导泻剂的应用: 首次活性炭剂量为 50 ~ 100g, 用 2 倍的水制成混悬液口服或胃管内注入。应用活性炭时常给予硫酸钠 250mg/kg 导泻, 一般不用硫酸镁, 因为镁离子能抑制中枢神经系统。</p>\r
<p>3) 碱化尿液、利尿: 应用 5% 碳酸氢钠碱化尿液, 呋塞米利尿只对长效巴比妥类药物中毒有效, 对吩噻嗪类药物中毒无效。</p>\r
<p>4) 血液净化: 血液透析、血液灌流对苯巴比妥有效, 危重患者可考虑应用, 对苯二氮䓬类作用有限。</p>\r
<p>(2) 应用特效解毒剂: 巴比妥类和吩噻嗪类药物中毒无特效解毒药。氟马西尼是苯二氮䓬类拮抗剂, 能通过竞争性抑制苯二氮䓬类受体而阻断苯二氮䓬类药物的中枢神经系统作用。</p>\r
<p>(3)应用中枢神经系统兴奋剂:深度中枢抑制者可适量应用贝美格,对稳定呼吸、循环及维持生理反射有一定益处;纳洛酮是解救药物中毒引起呼吸抑制的有效药,具有兴奋呼吸、催醒的作用;呼吸中枢衰竭者可静脉给予尼可刹米、洛贝林。</p>\r
<p>(4) 对症治疗: 肝功能损害出现黄疸者, 予以保肝和皮质激素治疗。震颤麻痹综合征可选用盐酸苯海索(安坦)。若有肌肉痉挛及肌张力障碍, 可用苯海拉明。</p>\r
<p>2. 常规护理措施</p>\r
<p
>(1) 严密观察病情: 观察患者意识状态和生命体征, 出现瞳孔散大、血压下降、呼吸变浅或不规则, 常提示病情恶化, 应及时向医生报告, 采取紧急处理措施。</p>\r
<p>(2) 保持呼吸道通畅、给氧: 仰卧位时头偏向一侧, 可防止呕吐物或痰液阻塞气道而引起窒息。及时用吸痰器吸出痰液, 持续给予氧气吸入, 防止脑组织缺氧引起脑水肿, 加重意识障碍。</p>\r
<p>(3) 饮食护理: 昏迷时间超过 3~5 天, 患者营养不易维持者, 可由鼻饲补充营养及水分, 一般给予高热量、高蛋白、易消化的流质饮食。</p>\r
<p>(4) 心理护理: 对服药自杀者, 注意心理疏导, 尽量使其配合治疗。</p>\r
<p>3. 健康教育和指导</p>\r
<p>(1) 向失眠者宣教导致睡眠紊乱的原因及避免失眠的方法, 可遵医嘱使用镇静催眠药, 但不能长期使用。</p>\r
<p>(2) 对服药自杀者, 不宜让其单独留在病房内, 以防止其再度自杀。</p>\r
<p>(3)加强药品管理,镇静药、催眠药处方的使用、保管应严加管理,特别是对有情绪不稳定或精神异常者,避免服药过量自杀。</p>\r
<p>考点提示:镇静催眠药中毒患者的护理。</p>\r
<p>素质拓展</p>\r
<p>关注青少年心理健康,预防自杀自残</p>\r
<p>世界卫生组织(WHO)统计数据显示,全球每年有近80万人死于自杀,每40s就有一个人选择结束自己的生命。自杀是15~34岁青壮年主要的致死原因之一。学校和家庭应该积极开展思想教育,引导其树立正确的人生观,学会自我情绪的调控,预防青少年自杀自残。</p>\r
<p>目标检测</p>\r
<p>1. 一氧化碳、氰化物中毒, 皮肤黏膜呈( )。</p>\r
<p>A. 黄色 B. 棕色 C. 樱桃红色</p>\r
<p>D. 黑色 E. 铁锈色</p>\r
<p>2. 下列毒物中毒后能使患者瞳孔扩大的是( )。</p>\r
<p>A. 吗啡 B. 有机磷 C. 阿托品</p>\r
<p>D. 安定 E. 毒蕈</p>\r
<p>3. 口服毒物已超过6h,也应彻底洗胃,其原因是( )。</p>\r
<p>A. 毒物作用引起肠蠕动加快</p>\r
<p>B. 毒物作用引起胃蠕动加快</p>\r
<p>C. 毒物作用引起幽门梗阻</p>\r
<p>D. 胃排空减慢,毒物仍可滞留在胃内</p>\r
<p>E. 口服中毒者,洗胃是唯一的治疗方法</p>\r
<p>4. 一氧化碳中度中毒, 血液 COHb 浓度为( )。</p>\r
<p>A. 10%~20% B. 30%~40% C. 40%~50%</p>\r
<p>D. 40%~60% E. 60%~80%</p>\r
<p>5. 有机磷中毒引起的毒蕈碱样症状是( )。</p>\r
<p>A. 肌束震颤 B. 流涎 C. 血压升高</p>\r
<p>D. 呼吸肌麻痹 E. 休克</p>\r
<p>6. 患者突然昏迷、抽搐、瞳孔缩小、皮肤湿冷、多汗、呼吸困难,应考虑( )的可能性大。</p>\r
<p>A. CO 中毒</p>\r
<p>B. 巴比妥类药物中毒</p>\r
<p>C. 中暑</p>\r
<p>D. 阿托品中毒</p>\r
<p>E. 有机磷农药中毒</p>\r
<p>7. 患者,男,36 岁,农民。为果树喷洒有机磷农药时不慎中毒,继而昏迷。下列处理措施不正确的是( )。</p>\r
<p>A. 立即脱去污染的衣物</p>\r
<p>B. 立即用热水清洗皮肤</p>\r
<p>C. 应用阿托品</p>\r
<p>D. 应用碘解磷定</p>\r
<p>E. 密切观察生命体征</p>\r
<p>8. 患者, 女, 60 岁。诊断为“有机磷农药中毒”, 已经给予洗胃等处理, 遵医嘱给予阿托品药物治疗。当患者出现 ( ) 时, 应及时通知医师给予停药。</p>\r
<p>A. 脸面涨红 B. 皮肤干燥、口干 C. 体温 37.2<sup>∘</sup> C</p>\r
<p>D. 心率 100 次/分 E. 烦躁不安、抽搐</p>\r
<p>9. 急性酒精中毒青年男性患者, 在急诊科出现烦躁不安、过度兴奋, 可用( )。</p>\r
<p>A. 吗啡 B. 氯丙嗪 C. 地西泮</p>\r
<p>D. 苯巴比妥类镇静药 E. 乙醇</p>\r
<p>10. 急性酒精中毒最常见的死亡原因是( )。</p>\r
<p>A. 昏迷</p>\r
<p>B. 抽搐</p>\r
<p>C. 误吸和窒息</p>\r
<p>D. 休克
</p>\r
<p>E. 呼吸麻痹</p>\r
<p>11. 患者, 女, 29 岁。口服安定 100 片, 被家人发现时呼之不应, 意识昏迷, 急诊入院, 错误的护理措施是( )。</p>\r
<p>A. 立即洗胃 B. 立即催吐 C. 硫酸镁导泻</p>\r
<p>D. 0.9% 生理盐水洗胃 E. 测量生命体征</p>\r
<p>12. 下列不是巴比妥类药物中毒特点的是( )。</p>\r
<p>A. 症状严重程度与剂量有关</p>\r
<p>B. 轻度中毒表现为嗜睡、情绪不稳定</p>\r
<p>C. 重度中毒可出现急性肌张力障碍反应</p>\r
<p>D. 可出现低血压和休克</p>\r
<p>E. 呼吸抑制,从浅慢到停止</p>\r
<p>(任冬 刘向东)</p>\r
`},{id:"module4-task2",title:"第二节 环境及理化因素损伤患者的救护",order:2,rawContent:`案例导学

李某，男，39岁。在高温环境中劳动4h后突然出现发热、头晕、意识模糊，伴四肢肌肉痉挛，急诊入院。查体：体温42℃，呼吸42次/分，心率130～150次/分，律齐，无杂音。神志不清，血压90/60mmHg，双侧瞳孔缩小，直径均为2mm，对光反射消失，双肺底可闻及湿啰音，四肢肌张力高，伴阵发性痉挛。血气分析结果：pH值为7.19， PaO2 47.5mmHg, PaCO2 32.7mmHg。胸片示双肺多处斑片状阴影。血钾2.5mmol/L，血钠133mmol/L，血氯97mmol/L。

请思考：

1. 该患者发生了什么情况？属于哪种类型？

2. 该患者的主要护理诊断有哪些？

3. 假如你在现场，应如何进行救护？

在日常生活中,中暑、淹溺和触电是3种常见的物理性损伤,其发病的共同特点是致病因子与外界环境密切相关,既往健康的人遭遇此类损伤也会很快出现危及生命的病理生理变化,因此,这3种损伤属于常见的环境性急诊。此外,随着交通工具的便捷和人们生活水平的提高,越来越多的人有机会前往高原地区旅游或工作。然而,急性高原病成了一个不容忽视的问题。这种疾病主要发生在快速上升到高海拔地区的人群中,是高原地区独有的常见病。

一、中暑患者的救护

中暑(heat illness)是指高温或热辐射等环境引起机体体温调节中枢功能障碍,导致机体热平衡失调、水电解质代谢紊乱及神经系统和心血管系统功能障碍的一组临床综合征,又称急性热致疾患(acute heat illness),是热平衡功能紊乱而导致的一种急症。

思维导图

(一) 护理评估

1. 病因 高温高湿气候极易发生中暑,其发病原因可概括为机体产热增加、散热障碍和热适应能力下降等。

(1) 机体产热增加: 高温环境从事重体力劳动者, 如建筑工人、参加竞技体育比赛的运动员等, 发热、甲状腺功能亢进症和应用某些药物(如苯丙胺)等。

(2) 散热障碍: 如湿度较大( >60% )、过度肥胖或穿透气不良的衣服、汗腺功能障碍(如系统性硬化病、广泛皮肤烧伤后瘢痕形成或先天性汗腺缺乏症)患者等。

(3) 热适应能力下降: 热负荷增加时, 机体会产生应激反应, 通过神经、内分泌的各种反射调节来适应环境的变化, 从而维持正常的生命活动。当机体这种调节能力下降时, 对热的适应能力也随之下降, 机体则更容易发生代谢紊乱导致中暑。如糖尿病患者、心血管疾病患者、老年人、孕妇等。

2. 中暑表现在高温或湿热的环境下,一定时间内,人体会出现出汗、口渴、头晕、眼花、耳鸣、四肢无力、胸闷、心悸、恶心、注意力不集中等表现,这是中暑的先兆,又称为先兆中暑,但此时体温保持正常或略升高,一般不高于38℃,若及时散热,短时间可恢复正常。若不及时散热,病情则会继续发展为轻症中暑甚至重症中暑。

(1)轻症中暑:除先兆中暑症状外,此时患者的主要表现如下。①体温多在38℃以上;②面色潮红或苍白、胸闷、心悸;③大汗、呕吐、皮肤湿冷、血压下降、脉搏增快等早期循环
衰竭的表现。此类中暑患者如能得到休息并及时散热,多在3~4h内恢复正常。

(2)重症中暑:除轻症中暑表现外,常伴有高热、脱水、痉挛、昏厥甚至昏迷等特殊表现。根据表现通常将重症中暑分为热痉挛、热衰竭和热射病3种类型,这3种类型可按顺序发展,也可交叉重叠,在日常生活中常混合出现。

1) 热痉挛: 又称中暑痉挛, 患者在高温环境下进行剧烈运动时大量出汗, 活动期间或停止后常发生肌肉痉挛, 呈对称性或阵发性疼痛, 主要累及骨骼肌如四肢肌肉、咀嚼肌、腹直肌等, 最多见于腓肠肌, 也可发生在肠道平滑肌引起急腹痛。痉挛持续数分钟后缓解, 此时体温无明显升高。肌肉痉挛可能与高温环境出汗较多、钠盐严重缺失(大量出汗和饮用低张液体)和过度通气有关。热痉挛为热射病的早期表现之一, 多见于健康青壮年。

2) 热衰竭: 又称中暑衰竭, 严重热应激时, 由于体液和钠离子丢失过多引起循环容量不足所致。其表现为多汗、疲乏、无力、头晕、头痛、恶心、呕吐和肌肉痉挛, 可有心动过速、直立性低血压或晕厥, 有明显脱水征。此类型中暑体温轻度升高, 无明显中枢神经系统损伤的表现。根据病情轻重不同, 检查可见血细胞比容增高、高钠血症、轻度氮质血症和肝功能异常。热衰竭可以是热痉挛和热射病的中介过程, 若治疗不及时, 可发展为热射病, 多见于老年人、儿童和慢性疾病患者。

3) 热射病: 又称中暑高热, 主要表现为高热(直肠温度≥41℃) 和神志障碍。起病前往往有头痛、眩晕和乏力，早期受影响的器官依次为脑、肝、肾和心脏。热射病是一种致命性急症，病死率较高。根据发病时患者所处的状态和发病机制，临床上常分为两种类型：劳力性和非劳力性(或典型性)热射病（表3-4）。劳力性热射病主要是在高温环境下内源性产热过多；非劳力性热射病主要是在高温环境下体温调节功能障碍引起散热减少。

劳力性热射病多在高温、湿度大和无风天气进行重体力劳动或剧烈体育运动时发生。患者多为平素健康的年轻人，在从事重体力劳动或剧烈运动数小时后发病，约50%的患者大量出汗，心率可达160～180次/分，脉压增大。患者可发生横纹肌溶解、急性肾衰竭、肝衰竭、弥散性血管内凝血（DIC）或多器官功能衰竭，病死率较高。

非劳力性热射病在高温环境下多见于居住拥挤和通风不良的城市老年体衰居民。其他高危人群包括精神分裂症、帕金森病、慢性酒精中毒及偏瘫或截瘫患者。表现为皮肤干热和发红，84%~100%的患者无汗，直肠温度约41℃，甚至高达43℃以上。病初表现为行为异常或癫痫发作，继而出现谵妄、昏迷和瞳孔对称性缩小，严重者可出现低血压、休克、心律失常、心力衰竭、肺水肿或脑水肿。约5%的患者发生急性肾衰竭，可有轻、中度DIC，常在发病后24h左右死亡。

表 3-4 两种类型热射病的对比

\r
考点提示:重症中暑的分类和表现。

3. 实验室检查 中暑时,应行紧急血生化检查和动脉血气分析。严重病例常出现肝、肾、胰和横纹肌损伤的实验室参数改变。住院后,应检查 AST、ALT、乳酸脱氢酶(LDH)、CK 及有关止、凝血功能等的参数,以尽早发现重要器官功能障碍的证据。怀疑有颅内出血或感染时,应行脑 CT 和脑脊液检查。

4. 其他 患者和家属的心理反应、配合及对疾病的认知程度等。

(二)急救与护理

应使患者迅速脱离高温环境,将其转移到阴凉通风处休息,尽快给予降温、吸氧和补充液体等措施,积极纠正水、电解质紊乱和酸碱失衡,防治脑水肿、抽搐、休克等严重并发症。

1. 轻症中暑的救护

(1) 尽快脱离高温环境: 可将患者安置在阴凉通风处或 20～25∘C 的房间内, 脱去外衣, 使
其取平卧位休息。

(2) 降温: 轻症患者可反复用冷水擦拭全身, 直至体温降至 38∘ C 左右, 体温持续升高者可给予水杨酸类解热药物, 如阿司匹林、吲哚美辛等。

(3) 补充液体: 让患者多饮水, 可给予淡盐水以补充盐和水分的丢失, 同时密切观察, 疑有循环衰竭者, 酌情给予葡萄糖生理盐水静脉滴注。

(4)其他适用于轻症中暑的方法:如刮痧疗法,用光滑平整的汤匙或刮痧板蘸取食用油或清水,刮脊背两侧、颈部、胸肋间隙、肩臂及腘窝等处,刮至皮肤出现紫红色为度。皮肤感染或有出血倾向者禁用此法。

素质拓展

《随园诗话》中的医家轶史:医者责任心

一日，清代医学家赵黎村拜访诗人袁枚，恰逢袁枚生病。赵黎村经过详细询问，发现袁枚吃了某位郎中开具的药物，病情不仅没有得到好转，反而呕吐不止、头晕目眩、气血上涌，十分危急。赵黎村给袁枚把完脉、仔细检查后诊断为中暑，便急忙为其开具药方并告知其家人如何熬制。袁枚喝完汤药不久额头便开始冒汗，气血也不再上涌，病情大有好转。但赵黎村不放心，守在床前，直到袁枚开始能够喝水才离开。第二天，赵黎村又来看袁枚，看到袁枚比前一日更好，才又放心离开。原来袁枚是因中暑引起的阳明经证，而之前医生误将其当成太阳经证给予治疗，用了升麻、羌活二味药，使得气血妄行而上，赵黎村使用白虎汤（石膏粉）及时救治，病情才得以扭转，否则后果不堪设想。

医者责任心需要代代相传。无论是老一辈的医学家还是当代医学生，都应该继承和发扬这种精神，加强专业知识学习，提高专业技能水平，积极参与社会实践，为医疗事业的发展贡献自己的力量。

2. 重症中暑的救护 重症中暑的类型和病因不同,但基本救治措施大致相同,需要迅速给予物理或药物降温,纠正水、电解质紊乱等对症治疗。可采用“四早一支持”的治疗原则:①早期快速降温,除使用一般物理和化学降温方法外,还可使用冰毯、冰帽、酒精擦浴结合冬眠降温,使体温尽快降至正常。②早期快速扩溶,以晶体液为主,结合血浆、蛋白,尽快补足血容量,纠正低钾、低钠等电解质紊乱。有研究显示,低钠血症如处理不当,病死率可高达50%~80%。③早期抗凝,使用低分子肝素钠5000U,皮下注射,每12h注射1次,连续7日。④早期改善微循环。⑤积极支持脏器功能。

根据不同重症中暑类型的表现和辅助检查,其救护措施又有所不同。

(1) 热痉挛: 通常是受热、过度劳累之后, 胳膊、腿和腹部等处的肌肉发生痉挛, 一般是由于排汗过多, 身体盐分缺乏所引起, 此时患者体温升高并不明显, 口服补充淡盐水或静脉滴注葡萄糖生理盐水即可缓解。严重者可同时缓慢静脉推注 10% 葡萄糖酸钙 10 ~ 20mL。如意识丧失、痉挛剧烈, 应让患者取侧卧位, 头向后仰, 保持呼吸道畅通, 严禁用阿托品及催眠、镇静等药物, 同时快速通知急救中心。

(2) 热衰竭: 指主要发生在高温环境劳动过程中出现的血液循环功能衰竭。此时应及时将患者移到阴凉的地方, 取平卧位或中凹卧位, 给予降温; 由于失水过多, 应及时补充血容量, 防止血压下降。注意必要时需监测中心静脉压指导补液, 防止补液不足或过度。

(3) 热射病: 患者体温可高达 40∘ C 以上, 因此降温是抢救的关键。降温速度决定患者预后。通常应在 1h 内使直肠温度降至 38∘ C 左右。降温措施包括物理降温和药物降温。此外, 热射病患者预后差, 病死率高, 幸存者可能留下永久性脑损伤, 故需积极抢救。应及时迅速降温, 纠正水、电解质及酸碱平衡失调, 防治循环衰竭、休克及肾衰竭。

1)体表降温:旨在迅速降低深部体温。脱去患者衣物,吹送凉风或以凉湿床单包裹全身。头部降温,可选用冰帽、冰袋,以降低进入颅内血液的温度。躯干和四肢降温可选择冰水或乙醇擦浴,用25%~35%乙醇或冰水擦拭全身皮肤,边擦拭边按摩皮肤使其血管扩张、血液循环加快、皮肤散热加速而降温。也可选择冰水浴,将患者浸浴于4℃冰水中,并不断按摩四肢皮肤,使血管扩张,促进散热。浸浴10~15min测肛温一次,肛温降至38℃时,停止冰水浴,体温回升到39℃以上时,可再行浸浴。需要注意的是,采用冰水浸浴治疗因发生低血压和寒战的并发症较多已不再推荐,但如其他方法无法降温时,亦可考虑此方法,但此时需要监测深部体温,一旦低于38.5℃时需停止冰水降温,以防体温过低。目前有条件的医院可选择医用冰毯全身降温仪(简称冰毯机)(图3-3),但也应注意严密监测体温,以防降温过快。

图3-3 医用冰毯机

\r
知识链接

医用冰毯机

低温疗法是一种以物理方法将患者的体温降至预期水平而达到治疗疾病目的的方法。临床深低温治疗的应用和研究由来已久，并取得了良好的脑保护作用，但体温低于28℃时，常诱发心律失常、凝血功能障碍等严重并发症。冰毯机降温法是利用半导体制冷原理，将水箱内蒸馏水冷却，然后通过主机工作与冰毯内的水停止循环交换，促使毯面接触皮肤停止散热，达到降温目的。其主要用于全身降温，广泛应用于颅脑疾病术前、术后的亚低温及各种类型的顽固性高热不退患者。冰毯机降温法分单纯降温法及亚低温治疗法两种，单纯降温法适用于高热及其他降温效果欠佳的患者，亚低温治疗法适用于重型颅脑损伤。

2)体内降温:体外降温无效者,用冰盐水进行胃或直肠灌洗,也可用无菌生理盐水进行腹膜腔灌洗或血液透析,或将自体血液体外冷却后回输体内降温。还可用4℃葡萄糖盐水200mL加氨基比林0.5g溶解后保留灌肠。有抽搐症状者可加10%水合氯醛15mL,以控制痉挛发作。

3) 药物降温: 选择有调节体温中枢、扩张血管、松弛肌肉和降低氧耗作用的药物。常用药物有氯丙嗪、地塞米松、冬眠合剂等。将氯丙嗪 25 ~ 50mg 稀释在 4℃ 葡萄糖盐水内, 快速滴注, 要求 2h 内滴完。地塞米松 10 ~ 20mg 静脉注射。人工冬眠合剂由氯丙嗪、哌替啶、异丙嗪按照一定比例配制而成 (氯丙嗪 8mg、哌替啶 25mg、异丙嗪 8mg)。用药时除观察体温外还应注意观察呼吸、血压的变化。

4) 补液: 清醒者可口服糖盐水, 有周围循环衰竭者应静脉补给生理盐水、葡萄糖溶液和氯化钾。

5) 吸氧: 保持呼吸道通畅, 密切观察患者的神志状况, 因为此类患者多数有不同程度的意识障碍, 如头痛、烦躁不安, 甚至惊厥和昏迷。应及时查找原因, 一旦发现脑水肿应给予脱水药, 如甘露醇、地塞米松等。

6) 对症处理: 纠正水、电解质紊乱, 热痉挛可静脉推注 10% 葡萄糖酸钙 10 ~ 20mL。此外, 还应注意防治急性肾衰竭、感染、DIC 等并发症。

考点提示:重症中暑患者的救护措施。

3. 护理要点

(1)保持有效降温:降温速度将决定患者的预后,准确执行各项降温措施,在物理降温和药物降温过程中,严密观察患者的生命体征、神志及尿量变化,每10~30min测量肛温一次,肛温下降至38℃左右时暂停降温,如患者存在昏迷、呼吸抑制、血压下降明显(收缩压低于80mmHg),停止降温。

(2)保持呼吸道通畅:帮助休克或昏迷患者采取平卧位,头偏向一侧,及时吸出口、鼻、咽部的分泌物。

(3) 加强基础护理: 饮食以清淡为主, 补充易消化、高热量、高纤维素、高蛋白、低脂饮食, 同时注意做好口腔及皮肤护理等。

(4)严密观察病情:观察各项生命体征的变化，出现并发症时及时向医生报告。

(5) 健康教育: 高温季节应加强防暑、降温知识的宣传; 工业及农业生产场所应加强通风、降温和防暑措施; 合理调整夏季作息时间, 增加休息时间。

(三) 护理评价

(1) 患者的体温是否恢复正常。

(2) 水、电解质及酸碱平衡是否恢复。

(3)患者有无并发症发生,如心力衰竭、肺水肿、肾衰竭、DIC等。

(4) 患者的大脑功能是否恢复正常,有无遗留大脑功能障碍。

(5) 判断患者及其家属对中暑的认知程度。

考点提示: 中暑患者的护理。

二、淹溺患者的救护

淹溺又称溺水,是
指人淹没于水或者其他液体中,由于呼吸道被水、污泥、杂草等阻塞,或引起反射性喉痉挛而导致换气障碍、缺氧和窒息的危急状态。严重者如抢救不及时可导致呼吸、心跳停止而死亡,淹溺是意外死亡的常见原因之一。

(一) 护理评估

1. 病因 淹溺常发生于水上运动(如游泳、划船时意外落水)、跳水、潜水时突发癫痫、心脏病、低血糖发作引起神志丧失者,下水前饮酒或服用损害脑功能的药物及长时间水中运动而过度疲劳者;也可发生于水灾、交通意外或投水自杀者等。

2. 机制 人溺水后数秒内会本能地屏气, 引起潜水反射, 此时呼吸暂停、心动过缓、外周血管剧烈收缩, 目的是保证心脏和大脑血液供应; 继而引起高碳酸血症和低氧血症, 刺激呼吸中枢进入非自发性吸气期, 随着吸气运动, 水进入呼吸道和肺泡, 充塞气道, 导致严重缺氧、高碳酸血症和代谢性酸中毒。

(1)根据是否有液体进入肺内,淹溺可分为湿性淹溺和干性淹溺。

1) 湿性淹溺: 喉部肌肉松弛, 吸入大量水分 (22mL/kg) 充塞呼吸道和肺泡引起窒息, 数秒钟后即发生神志丧失, 最终导致呼吸、心跳停止。

2) 干性淹溺: 主要由喉痉挛导致窒息, 此时呼吸道和肺泡很少或无水进入。湿性淹溺约占淹溺的 90%, 干性淹溺约占淹溺的 10%。

(2)根据浸没的介质不同,淹溺又分为淡水淹溺和海水淹溺。

1) 淡水淹溺: 淡水较血浆或其他体液渗透压低。浸没后, 通过呼吸道或胃肠道进入体内的淡水迅速吸收入血, 使血容量增加, 严重时引起溶血, 继而出现高钾血症和血红蛋白尿。淡水吸入最重要的临床意义是引起肺损伤, 肺泡表面活性物质灭活, 肺顺应性下降, 肺泡塌陷、萎缩, 呼吸膜被破坏, 肺泡容积急剧减小, 发生通气血流比例失调。即使迅速复苏, 仍不能终止急性肺损伤过程, 出现广泛肺水肿或微小肺不张。此外, 肺泡内液体也影响正常的气体交换, 发生氧合作用障碍。

2) 海水淹溺: 海水含钠量是血浆的 3 倍以上。因此, 吸入的海水较淡水在肺泡内停留时间更长, 并能使血液中的水分进入肺泡腔, 产生肺水肿、肺内分流, 减少气体交换, 引发低氧血症。此外, 由于海水对肺泡上皮及肺毛细血管内皮细胞的化学损伤作用, 更易发生肺水肿。

人体吸入淡水或海水后，虽然血容量、血浆电解质浓度和心血管功能等的变化不同，但均可引起肺顺应性降低、肺水肿、肺内分流、低氧血症和混合性酸中毒。发生严重脑缺氧时还可引起神经源性肺水肿。大多数淹溺者猝死的原因为严重的心律失常。冰水淹没迅速致死的原因常为寒冷刺激迷走神经，引起心动过缓或心搏骤停和神志丧失。淡水淹溺和海水淹溺的特征对比见表3-5。

表3-5 淡水淹溺与海水淹溺特征对比

\r
考点提示:淡水淹溺和海水淹溺的区别。

3. 临床表现 多数淹溺者表现为神志丧失、呼吸停止、大动脉搏动消失，处于临床死亡状态。近乎淹溺者临床表现个体差异较大，与溺水持续时间、吸入水量、吸入介质的性质和器官损伤严重程度有关。

(1) 症状: 近乎淹溺者可有头痛或视觉障碍、剧烈咳嗽、胸痛、呼吸困难和咳粉红色泡沫样痰。海水淹溺者, 口渴感明显, 最初数小时可有寒战和发热。

(2)体征:淹溺者口腔和鼻腔内充满泡沫或泥污,皮肤发绀、颜面肿胀、球结膜充血、肌张力增加;烦躁不安、抽搐、昏睡或昏迷;呼吸表浅、急促或停止,肺部可闻及干、湿啰音;心律失常、心音微弱或心跳停止;腹部膨隆,四肢厥冷。高空跳水或潜水者发生淹溺可伴有头部或颈椎损伤。

4. 实验室检查及其他检查

(1) 血和尿液检查: 外周血白细胞轻度增高。淡水淹溺者, 血钾升高, 血和尿液中能检出游离血红蛋白。海水淹溺者, 有轻度高
钠血症或高氯血症。淹溺者极少发生致命性电解质平衡紊乱。严重者出现凝血功能异常(如 DIC)。

(2) 动脉血气分析: 约 75% 的淹溺者有严重的混合性酸中毒, 几乎所有淹溺者都有不同程度的低氧血症。

(3) X 线检查: 胸片常显示斑片状浸润影, 有时出现典型的肺水肿征象。

(二)急救与护理

1. 现场急救 将淹溺者迅速从水中救出并恢复有效通气,对呼吸、心跳停止者尽快给予心肺复苏。

(1) 将淹溺者迅速从水中救出: 方法如下。

1) 自救方法: 时间紧急, 自救对于淹溺者至关重要。①不会游泳者: 落水后保持冷静, 待身体浮出水面, 保持仰面, 口鼻向上进行短暂呼吸换气。注意呼气要浅, 吸气宜深, 这样可使身体浮力增大, 从而延长等待救援的时间。②会游泳者: 落水后, 一般因四肢肌肉(常见于小腿腓肠肌) 痉挛而致溺水。小腿肌肉痉挛时, 可仰浮在水面上, 用对侧手握住痉挛侧脚趾, 并将其向身体方向拉, 同时用另一手掌压在痉挛侧膝盖上, 帮助小腿伸直, 促进痉挛缓解; 大腿肌肉痉挛时, 应仰浮并立即举起痉挛侧腿, 使其与身体形成直角, 然后双手抱住小腿, 用力屈膝, 使大腿贴近胸部, 再以手按揉大腿痉挛的肌肉, 并将腿慢慢向前伸直, 痉挛即可缓解。

2)互救方法:施救者必须具备一定水性才能下水施救。①施救者应尽可能脱去衣裤,尤其要脱去鞋、靴,快速游到淹溺者身旁。②对筋疲力尽的淹溺者,施救者可从其头侧接近。③对神志清醒的淹溺者,施救者应从背后接近,用一只手从背后抱住淹溺者的头颈,另一只手抓住淹溺者的手臂,游向岸边。④施救者最好携带救生圈、木板或用小船进行救援,或投下绳索、竹竿等,令淹溺者握住再将其拖带上岸。⑤救援时,要注意防止被淹溺者紧抱缠身而双双发生危险。如被抱住,不要相互拖拽,应放手自沉,促使淹溺者手松开,再进行救护。

(2)保持呼吸道通畅:迅速清除淹溺者口腔及鼻腔中的污水、污物、分泌物及其他异物,以保持气道通畅。对疑有异物堵塞气道者,可用海姆立克急救法或借助器械取(排)出异物;如有条件,及时给予吸氧。

(3) 倒水处理: 可采取下列方法迅速倒出淹溺者呼吸道及胃内积水。

1) 膝顶法: 施救者取半蹲位, 一腿跪地, 另一腿屈膝, 将淹溺者腹部置于屈膝侧大腿上, 使头部下垂, 随即按压其背部, 迫使呼吸道和胃内的水排出(图 3-4)。

2) 肩顶法: 施救者将淹溺者扛在肩上, 淹溺者腹部与施救者肩部接触(身体呈弓形, 保持其头、胸下垂), 施救者抖动肩部, 使积水排出(图 3-5)。此法主要适用于儿童或体型偏瘦的淹溺者。

3) 抱腹法: 使淹溺者俯卧于地面上, 施救者双手抱其腹部, 保证其腹部高于头、胸, 同时摇晃淹溺者, 将积水排出(图 3-6)。

以上三种方法操作时间不宜过长(1min 即可)，应尽量避免因倒水时间过久影响实施心肺复苏。

图3-4 膝顶法

\r
图3-5 肩顶法

图3-6 抱腹法

\r
(4) 心肺复苏: 对于呼吸、心跳停止者, 应立即施行心肺复苏。复苏期间常发生呕吐, 应注意防止呕吐物误吸。

考点提示:淹溺的急救措施。

素质拓展

与时间赛跑、与生命竞速

发现淹溺者时,施救人员应立即进行抢救。与时间赛跑,与生命竞速,争分夺秒全力抢救淹溺者。运用心肺复苏、倒水、吸氧等方法实施急救,挽救患者生命。

作为医学生,我们应秉承“生命至上、救死扶伤”的服务理念,不断提升医疗技术水平和医疗服务能力,为患者提供更精准、更优质、更全面的医疗服务,全力守护患者的生命健康。

2. 院内急救和护理 淹溺者进入医院后,应给予进一步生命支持,通常应送至 ICU 观察、监护 24~48h,预防发生急性呼吸窘迫综合征(ARDS)。

(1) 对症处理: 主要包括吸氧、维持体温、脑保护及饮食护理。

1) 吸氧: 吸入高浓度氧或采用高压氧治疗, 根据病情可使用机械通气。

2) 复温及保温: 对体温过低者, 可采用体外或体内复温措施。

3) 心电监护: 淹溺者容易发生心律失常, 故心电监护不可或缺。

4) 脑复苏措施: 缺氧可对大脑产生损害, 故实施脑保护措施也十分重要。颅内压升高者应适当过度通气, 维持 PaCO2 在 25 ~ 30mmHg, 同时应静脉输注甘露醇降低颅内压, 缓解脑水肿。

5)并发症处理:对合并惊厥、低血压、心律失常、肺水肿、ARDS、应激性溃疡伴出血、电解质和酸碱平衡紊乱者,给予相应紧急处理。

(2) 护理要点: 具体如下。

1) 维持呼吸功能: 继续进行有效人工通气及血气监测, 对人工呼吸无效者应行气管插管并给予正压给氧, 必要时行气管切开, 采用呼吸机辅助通气, 同时给予呼吸兴奋剂, 支气管痉挛时使用氨茶碱。

2) 纠正低血容量: 对淡水淹溺者, 可给予 3% 氯化钠溶液 500mL 静脉滴注, 必要时可重复; 对海水淹溺者, 可给予 5% 葡萄糖溶液或低分子右旋糖酐溶液。

3) 防治肺部感染: 由于淹溺时污物吸入气管, 故易引发肺部感染, 应及时给予抗生素预防或治疗, 严重时尽快实施支气管镜下灌洗。

4) 饮食护理: 对能进食者应给予高营养的半流质饮食。

5) 健康教育: 加强游泳安全教育, 在夏秋季节开展多种形式的防溺水宣传, 避免淹溺的发生。

(三) 护理评价

(1) 患者的意识是否清醒, 情绪是否稳定。

(2) 患者有无肺部感染, 呼吸功能是否恢复正常。

(3) 患者的生命体征是否平稳。

(4) 患者及其家属对淹溺后果的认知程度。

考点提示:淹溺患者的护理。

三、触电患者的救护

触电可引发电击伤。电击伤通常指人体直接触及电源,或高压电经过空气或其他导电介质传递通过人体时引起的组织损伤和功能障碍,严重者发生心搏骤停。

(一) 护理评估

1. 病因 引起电击伤的原因很多,主要源于缺乏安全用电知识,如安装、维修电器或电线操作不规范,在电线上晾晒衣物等。此外,高温、潮湿和出汗使皮肤表面电阻降低,电线意外折断击中人体,雷雨时在大树下躲雨或使用铁柄伞而被闪电击中等,都可引起电击伤。

2. 影响因素 直流电对血液有分解作用,交流电则破坏神经系统。通常情况下直流电的危害性小于交流电。

(1)电流大小和通电时间:流经人体的电流量越大,危害性越大。一般电流在20mA以下时相对安全;当超过50mA时,触电者会发生呼吸困难、肌肉瘫痪,甚至严重休克;当超过100mA时,将严重损坏心脏,引起心室颤动,继而发生血液循环障碍,最终导致死亡。电流大小与通电时间对人体的影响见表3-6。

表 3-6 电流大小与通电时间对人体的影响

\r
(2) 电流通过人体的路径: 电流通过头部, 可导致昏迷; 电流通过心脏, 可引起心室颤动; 电流通过中枢神经系统, 可引起呼吸停止、四肢瘫痪等。由此可见, 电流通过人体要害部位会造成严重伤害。

(3)电压的高低:触电电压越高,对人体的危害越大。根据欧姆定律,电阻不变时电压越高,电流越大。因此,人体触及带电体的电压越高,通过人体的电流越大,受到的危害就越严重。设备对地电压在250V以上的为高压电气设备,设备对地电压在250V及以下的为低压电气设备,而36V及以下的电压为安全电压(一般情况下对人无害)。

(4)人的身体状况:电对人体的危害程度与人的身体状况有关,如性别、年龄和健康状况等因素与触电后受损伤的程度有很大关系。一般来说,女性较男性对电流的刺激更为敏感,但摆脱电流的能力要低于男性。

(5)人体电阻:人体对电流有一定的阻碍作用,这种阻碍作用表现为人体电阻,而人体电阻主要来自皮肤表层。起皱和干燥的皮肤有较高的电阻,但是皮肤潮湿或接触点的皮肤遭到破坏时,电阻则大幅减小。另外,人体电阻随接触电压的升高而迅速下降。一般情况下,人体电阻可按1000~2000Ω考虑;在安全程度要求较高时,人体电阻应以不受外界因素影响的体内电阻500Ω计算。

3. 临床表现

(1)电性昏迷:患者触电后常发生短暂昏迷(占20%~50%),意识多能恢复。若头部有撞击伤,除短暂昏迷外还可出现神志恍惚或兴奋。CT检查可发现局部脑水肿,继之脑软化。发生在非功能区时无定位体征出现,经治疗后可恢复,一般无后遗症。

(2)电击损伤:当人体接触电流时,轻者立刻出现惊慌、呆滞、面色苍白及接触部位肌肉收缩,且有头晕、心动过速和全身乏力;重者出现昏迷、持续抽搐、心室颤动、心跳和呼吸停止。部分患者在遭遇严重电击后症状不重,但在1h后突然恶化。部分患者触电后,心跳和呼吸极其微弱,甚至暂时停止,因此要认真鉴别,不可轻易放弃对触电者的抢救。

(3)电灼伤:电流在皮肤入口处灼伤程度比出口处重。灼伤皮肤呈灰黄色焦皮,中心部位低陷,周围无肿、痛等炎症反应。电流通路上软组织的灼伤常较为严重,肢体软组织被电灼伤后,其远端组织常出现缺血和坏死。血浆肌球蛋白增高和红细胞膜损伤引起的血浆游离血红蛋白增高可导致急性肾小管坏死。

(4)并发症和后遗症:①大量组织损伤和溶血,可导致高钾血症。②肌肉强烈收缩和抽搐,可导致四肢关节脱位和骨折;脊柱旁肌肉强烈收缩,可导致脊柱压缩性骨折。③神经系统后遗症包括失明、耳聋、周围神经病变、上升性或横断性脊髓病变和肌萎缩侧索硬化(ALS),亦可发生肢体单瘫或偏瘫。少数受高压电损伤的患者可发生胃肠道功能紊乱、肠穿孔、胆囊局部坏死、胰腺灶性坏死、肝脏损害、凝血功能障碍、白内障和性格改变。

(二)急救与护理

1. 迅速脱离电源 现场救治应争分夺秒,首要任务是切断电源。常用方法包括以下几项。

(1) 关闭电源: 若在家中或电源开关附近发生触电, 迅速关闭电源、拉开电源总闸是最简单、安全而有效的方法。

(2) 挑开电线: 用干燥木棒、竹竿等绝缘体将电线从触电者身上挑开, 并将此电线固定好, 避免他人触电。

(3) 斩断电路: 若在野外或远离电源开关处发生触电, 尤其是雨天, 不便接近触电者以挑开电源线时, 可在距现场 20m 以外处用绝缘钳或干燥木柄的铁锹、斧头、刀等将电线斩断。

(4)“拉开”触电者:若触电者全身趴在铁壳机器上,施救者可在自己脚下垫一块干燥木板或塑料板,用干燥绝缘的布条、绳子或用衣服绕成绳条状套在触电者身上,将其拉离电源。

在使触电者脱离电源的整个过程中,施救者必须防止自身触电,因此应注意以下3点:①必须严格保持自身与触电者绝缘,不直接接触触电者,选用的器材必须有绝缘性能。②下雨天于野外抢救触电者时,一切有绝缘性能的器材都可能被淋湿,失去绝缘性能,因此更需注意。③当遇到野外高压电线触电的情况时,为了避免跨步电压的
危险,最佳的做法是选择在20m以外的安全距离切断电源。确实需要进出危险地带,需保证以单脚着地的跨跳步进出,切不可双脚同时着地。

2. 保持呼吸道通畅 对有缺氧指征者,应尽快给予吸氧。

3. 心肺复苏 对心搏骤停者即刻予以心肺复苏; 对心室颤动者, 有条件时应立即给予电除颤。

4. 维持有效循环血量,保护体表电灼伤创面 对危重患者应迅速建立静脉通道,对体表电灼伤创面周围皮肤用碘伏处理,加盖无菌敷料包扎,以减少污染。

5. 对症处理 积极防治脑水肿、急性肾衰竭等并发症；纠正水、电解质和酸碱平衡紊乱；有骨折者应给予适当固定；应用抗生素防治感染；检查是否存在其他合并外伤。

(三) 护理评价

(1) 患者的生命体征是否恢复正常。

(2) 患者的意识是否清楚。

(3) 患者的皮肤损伤是否恢复正常。

(4) 患者的体液是否得到及时补充。

四、急性高原病患者的救护

高原病(mountain sickness)又称高山病,是指由平原进入高原,或由低海拔地区进入海拔更高的地区时,由于对低氧环境的适应能力不足而发生的以缺氧为主要表现的综合征。高原通常指海拔在3000m以上,能对机体产生明显生物效应的地区。我国是一个多山国家,海拔3000m以上地区约占全国总面积的1/6。由平原移居或短期逗留高原的人均可发生高原病。

根据起病的急缓,高原病一般分为急性高原病和慢性高原病两大类。急性高原病指初入高原时出现的急性缺氧反应或疾病,依其严重程度分为急性高原反应、脑型急性高原病(又称高原昏迷或高原脑水肿)、肺型急性高原病(又称高原肺水肿)、混合型(即肺型和脑型的综合表现)。其中急性高原反应为急性轻症高原病,高原脑水肿和高原肺水肿属于急性重症高原病。慢性高原病指抵达高原半年以上方发病或原有急性高原病症状迁延不愈,少数高原世居者也可发病。本节主要介绍急性高原病。

(一) 护理评估

1. 病因 高原的特点是空气稀薄, 大气压及氧分压低。海平面温度为 0∘ C 时, 大气压为 101.2 kPa (760 mmHg), 大气氧分压为 21.2 kPa (159 mmHg), 正常人肺泡气氧分压为 14 kPa (105 mmHg), 动脉血氧分压 ( PaO2 ) 为 13.3 kPa (100 mmHg)。当海拔增至 3000 m 时, 大气压降至 77.3 kPa (526 mmHg), 大气氧分压为 14.7,kPa(110,mmHg) ，肺泡氧分压降至 8.26,kPa(62,mmHg) 。人因 PaO2 和动脉血氧饱和度明显下降而发生缺氧。

2. 病理生理

(1) 神经系统: 大脑皮质对缺氧的耐受性最低, 这是由于大脑代谢旺盛、耗氧量大。急性缺氧初期, 脑血管扩张、血流量增加、颅内压升高、大脑皮质兴奋性增强, 患者出现头痛、多言、失眠、步态不稳等症状; 之后呼吸加深、加快, 心率加快, 心排血量增加。后者是机体对缺氧的一种代偿性反应。缺氧持续或加重时, 脑细胞无氧代谢加强, ATP 生成减少, 引起细胞膜钠泵功能障碍, 细胞内钠水潴留, 发生脑水肿, 患者出现嗜睡、昏迷、惊厥, 甚至呼吸中枢麻痹。

(2) 呼吸系统: 动脉血氧分压降低, 刺激颈动脉窦和主动脉体化学感受器引起反射性呼吸加深、加快, 从而增加通气量, 肺泡和动脉血氧分压升高。过度换气使 CO2 呼出过多, 导致呼吸性碱中毒。急性缺氧可使肺小动脉痉挛, 导致肺循环阻力增加, 肺毛细血管静脉压明显升高, 毛细血管通透性增加, 血浆渗出, 引起肺水肿。此外, 肺泡壁和肺毛细血管损伤、肺泡表面活性物质不足、血管活性物质释放都可加重肺水肿。

(3) 心血管系统: 心率加快是进入高原后心脏最早出现的改变之一, 是由缺氧刺激颈动脉窦和主动脉体化学感受器引起。急性缺氧时, 体内血液重新分布
, 心、脑血管扩张, 血流量增加; 皮肤、腹腔器官特别是肾血管收缩, 血流减少。血液重新分布有利于保证生命器官的血液供应, 具有代偿意义。缺氧时, 冠状动脉扩张的代偿作用有一定限度, 严重和持久缺氧将造成心肌损伤。长期移居高原者, 肺动脉阻力持续增加, 可导致肺动脉高压。肺动脉压持续增高可使右心负荷加重而引起肺源性心脏病。同时, 缺氧导致红细胞增多, 可使血液黏稠度增高而加重心脏负荷。

(4)造血系统:进入高原后,红细胞和血红蛋白增多,这是机体对缺氧的适应性反应。其机制为急性缺氧刺激外周化学感受器,反射性地引起交感神经兴奋,使储血器官释放红细胞。同时,糖无氧酵解增强,乳酸增多,血pH值下降,氧解离曲线右移,还原型血红蛋白增多,促使2,3-二磷酸甘油酯(2,3-DPG)合成增加,降低血红蛋白与氧的亲和力,促使氧释放。低氧血症使红细胞生成素增多,进而促进骨髓红细胞系统增生,以增加红细胞数量和红细胞内的血红蛋白量,从而提高血液的携氧能力;但红细胞过度增生(如红细胞压积大于60%)时,血液黏稠度增高将使血流缓慢,可引起循环障碍。

3. 临床表现在到达高原后数小时或1~2天内出现缺氧症状,症状轻重因人而异。一般经1周左右症状逐渐消失,亦有持续较久或迁延成慢性高原病者。

(1)急性高原反应:出现在初入海拔3000m以上地区的人群中,快速登山者更易发病,表现为进入高原数小时后,发生头痛、头晕、胸闷、气短、心悸、食欲减退,恶心、呕吐,记忆力和思维能力减退,可伴有失眠、多梦,部分患者有口唇发绀,少数患者血压暂时升高。一般在第1~2天症状明显,之后减轻,1周左右症状消失,但也有少数患者症状急剧加重,发展为高原肺水肿或高原脑水肿。

(2)高原肺水肿:出现在由平原迅速登上海拔3000m以上,特别是4000m以上地区的人群中,常在1~3天内发病,劳累、寒冷、上呼吸道感染常为诱因。初入高原者,剧烈活动可诱发肺水肿,长期居住者短期到海拔较低地区,再回到高原地区也可发病。通常先出现急性高原反应症状,如头痛、乏力、呼吸困难、咳嗽,症状逐渐加重,出现发绀、胸痛、咳白色或粉红色痰、端坐呼吸,肺部可闻及痰鸣音和湿啰音,心率加快;胸部X线检查见肺野有不对称絮状、片状模糊阴影,有些患者可同时并发脑水肿。

(3)高原脑水肿:是罕见但最为严重的急性高原病。大多数病例为进入海拔3600m以上地区1~3d后发病。表现为剧烈头痛、头晕、频繁恶心呕吐、精神错乱、共济失调、幻听、幻视、言语障碍、定向力障碍,以后发展为步态不稳、木僵或昏迷。

考点提示:急性高原病的临床表现。

4. 诊断与鉴别诊断 诊断高原病应具备的条件: ①由平原进入高原, 或由低海拔地区进入海拔更高的地区后发病; ②急性高原病症状随海拔增高而加重, 进入海拔较低的地区后缓解, 氧疗有效。不同类型的高原病应与下列疾病相鉴别。

(1) 晕车: 患者在进入高原前有晕车史, 多无缺氧症状, 由高原返回低海拔地区后症状并未减轻, 停止乘车后症状好转。

(2) 左心衰竭引起的肺水肿: 无高原反应的前驱症状。有原发性心脏病病史、体征及心力衰竭的诱因, 氧疗效果差。

(3)其他可致昏迷的疾病:体检发现偏瘫时,应高度怀疑脑血管意外;头部受伤者,首先考虑颅脑外伤;发热者,首先考虑感染性疾病;发病前有毒物接触史者,首先考虑中毒;既往有糖尿病、高血压、癫痫病史者,应考虑相关疾病。实验室检查可辅助诊断。

(二)急救与护理

对危重患者应就地抢救,给予高流量鼻导管吸氧或面罩吸氧。经处理症状不缓解或发病地点确无医疗条件时,应及时将患者转往低海拔地区治疗。慢性高原病患者如病情许可,应逐步锻炼以适应低氧环境;若疗效不佳,可转往低海拔地区治疗。

1. 急性高原反应 轻症患者一般经休息和氧疗后可自愈。对重症患者应及时给予对症治疗，如头痛者可服用阿司匹林、布洛芬等解热镇痛药；病情严重时可用利尿药，如呋塞米或乙酰唑胺，剂量遵医嘱。

2. 高原肺水肿 患者应绝对静卧休息,给予高浓度、高流量吸氧,并注意保暖,配合药物治疗。常用的药物有:地塞米松 10 ~ 20mg,稀释后缓慢静脉注射,每日 1 或 2 次,可减少肺毛细血管渗出;氨茶碱 0.25mg 加入 50% 葡萄糖溶液 20mL,缓慢静脉注射,可缓解支气管痉挛和降低肺动脉压;如无低血压,可舌下含化硝苯地平 5 ~ 10mg,以降低肺动脉压;如出现右心衰竭,可用洋地黄制剂及利尿剂。

3. 高原脑水肿 加大吸氧量,给予地塞米松、高浓度葡萄糖溶液及利尿药等
。当合并肺水肿、心力衰竭和红细胞增多时,不宜用甘露醇脱水疗法。

4. 护理措施 ①患者应绝对卧床休息,取斜坡卧位。②吸氧是治疗和抢救急性高原病的主要措施,病情严重时应采用高浓度加压给氧。③预防和控制呼吸道感染,发病时注意饮食、环境卫生,一旦出现呼吸道感染,及时应用抗生素进行有效治疗。④对过度烦躁者应做好心理护理,必要时给予镇静剂。⑤对合并心力衰竭、休克、昏迷者应给予相应对症处理。

(三) 护理评价

(1) 患者的生命体征是否恢复正常。

(2) 患者的心脏功能是否恢复正常。

(3) 患者有无肺部感染, 呼吸功能是否恢复正常。

(4) 患者及其家属对高原病的认知程度。

五、常见动物致伤患者的救护

自然界中能够攻击人类造成损伤的动物有数万种，它们利用其牙、爪、角、刺等袭击人类，这些伤害不仅会引起局部症状，如疼痛、肿胀和感染，还可能导致全身性的严重后果，包括感染、中毒甚至死亡。本节重点介绍猫、犬抓咬伤和毒蛇咬伤。

(一)猫、犬抓咬伤

随着家养宠物数量的增多，动物抓咬伤的发生率也相应增加。许多野生动物都可传播狂犬病，生活中狂犬病的主要传染源是犬，其次是猫。人被携带狂犬病毒的动物抓伤或咬伤后很可能导致感染。因此，被猫、犬抓伤或咬伤后的处理非常重要。

1. 病因和发病机制 狂犬病毒主要存在于病畜的脑组织及脊髓中,其涎腺和涎液中也含有大量病毒,并随涎液排出。人被带有病毒的猫、犬咬抓后,病毒可经唾液-伤口途径进入人体导致感染。狂犬病毒对神经组织具有强大的亲和力,在伤口及其周围组织细胞内可停留1~2周并生长繁殖,若未被迅速灭活,病毒会沿周围传入神经上行至中枢神经系统,引发狂犬病。

2. 病情评估

(1)有被猫、犬抓伤或咬伤的病史:感染病毒后是否发病与潜伏期的长短、咬伤的部位、入侵病毒的数量和毒力及机体抵抗力有关。潜伏期短者约10d,多数为1~2个月。伤口越深、越接近头面部,潜伏期越短,发病率越高。

(2)症状及体征:发病初期,伤口周围麻木、疼痛,逐渐扩散到整个肢体;继而出现发热、烦躁、乏力、恐水、怕风、咽肌痉挛;最后患者因肌肉瘫痪、昏迷、循环衰竭而死亡。伤处可见利齿造成的深而窄的伤口及出血,伤口周围组织水肿。

3. 救护措施

(1) 冲洗伤口: 立即挤压伤口周围皮肤, 尽力挤出血液, 之后立即用肥皂水或清水冲洗伤口至少 15 ~ 30min; 伤口较深时需立即彻底清创, 并用大量生理盐水、3% 过氧化氢溶液反复冲洗, 伤口不予缝合或包扎, 以利引流。

(2) 局部消毒: 冲洗干净后, 用 75% 酒精或碘伏对伤口进行消毒, 然后用干净的纱布覆盖在伤口上, 注意不可包扎。

(3) 注射疫苗: 被猫、犬抓伤或咬伤后, 应尽早注射狂犬病疫苗, 首次暴露者应于伤后第 0、3、7、14、30 天各注射 1 剂疫苗。

(4)院内对症处理:对患者应行接触隔离,院内救护以预防和控制痉挛、保持呼吸道通畅、补液、营养支持、伤口护理等对症治疗为主。

考点提示:猫、犬抓咬伤患者的护理。

(二)毒蛇咬伤

毒蛇多分布在长江以南，毒蛇咬伤多发生于夏、秋两季。对人畜危害较大的有眼镜蛇、银环蛇、金环蛇、小头海蛇、环纹海蛇、蝮蛇、吻蝮（五步蛇）、竹叶青蛇等。蛇毒是一种复杂的蛋白质混合物，含有多种毒性蛋白。新鲜蛇毒为黏稠液体，呈弱酸性，透明或淡蓝色，加热至65℃以上时易被破坏。被毒蛇咬伤后，蛇毒一般经3～5min进入淋巴和血液循环，可引起严重的全身中毒症状而危及生命，必须立即实施急救。

1. 护理评估

(1)病因:蛇毒中含有多种毒性蛋白、多肽及酶类。按其性质及对机体的作用可分为神经毒素、血液毒素及混合毒素。神经毒素对中枢神经系统和神经肌肉节点有选择性毒性作用,可引起肌肉麻痹和呼吸麻痹;血液毒素对血细胞、血管内皮细胞及组织有破坏
作用,可引起出血、溶血、休克或心力衰竭等;混合毒素兼有神经毒素、血液毒素的特点。

(2)临床表现:包括局部表现和全身表现。

1) 局部表现: 被毒蛇咬伤后, 伤处一般留有大而深的齿痕, 是判断毒蛇咬伤的重要依据; 无毒蛇咬伤的齿痕小, 排列整齐。被分泌神经毒素的毒蛇咬伤后, 局部红肿不明显, 无渗液、剧痛、麻木, 易被忽视, 但所属区域的淋巴结肿大、有触痛。被分泌血液毒素的毒蛇咬伤后, 局部损伤严重, 伤口剧痛, 出血不止, 肿胀明显并迅速向近侧扩散, 皮肤有紫斑或血性水疱, 邻近淋巴结肿痛, 部分伤口短期内坏死, 形成溃疡。被分泌混合毒素的毒蛇咬伤后, 疼痛逐渐加重, 伴有麻木感, 伤口周围皮肤迅速红肿, 可发展至整个肢体, 常有水疱, 严重者伤口迅速变黑坏死, 形成溃疡, 有相应的淋巴结肿大和触痛。

2) 全身表现: ①神经毒性症状, 主要表现为神经系统受损, 多在咬伤后 1~6h 出现症状。轻者有头晕、出汗、胸闷、四肢无力、步态不稳、眼睑下垂等；严重者出现瞳孔散大、视物模糊、言语不清、流涎、发绀、复视、牙关紧闭、吞咽困难、昏迷、呼吸减弱或停止、血压下降甚至休克，若抢救不及时，患者可因呼吸循环衰竭而迅速死亡。伤后的第1~2天为危险期，若能安全度过则很快痊愈，很少留下后遗症。②血液毒性症状，主要表现为血液循环系统受损，患者出现寒战、发热、头晕、嗜睡、胸闷、全身肌肉酸痛、皮下或内脏出血（呕血、便血、尿血），继而出现贫血、黄疸等；严重者可出现休克、循环衰竭。③混合毒性症状，主要表现为神经和血液循环系统同时受损，患者的死亡原因以神经损害为主。

(3) 辅助检查: 凝血功能检查可见血小板减少、凝血因子 I 减少、凝血酶原时间延长。肾功能检查可见血肌酐和血尿素氮增高等改变。

2. 现场急救

(1)防止毒液扩散和吸收:伤者应立即减少活动,保持静止,就地取材,于伤口近心端缚扎,以阻止静脉血及淋巴回流(图3-7)。缚扎可持续8~10h,每隔15~30min放松1~2min,以免静脉过度瘀血使肢体受损。有条件者,在缚扎的同时用冰块敷于伤肢,可减轻疼痛并使血管及淋巴管收缩,减慢蛇毒的吸收速度。咬伤超过12h,不宜缚扎。

图3-7 局部缚扎

\r
(2) 冲洗伤口: 立即用清水、肥皂水或 1:5000 高锰酸钾溶液冲洗伤口及周围皮肤, 以洗掉伤口外表毒液, 切忌用嘴吸吮伤口。

(3) 排出毒液: 以齿痕为中心纵形切开, 长 1.5cm, 深至皮下 (此法禁用于血液毒素中毒), 然后用手从肢体的近心端向远心端及伤口周围反复挤压, 促使毒液从切开的伤口排出体外, 边挤压边用清水冲洗伤口, 冲洗及挤压排毒须持续 20 ~ 30min。如果随身携带茶杯可对伤口做拔火罐处理, 局部高温可使蛇毒蛋白凝固而丧失毒性。

考点提示:毒蛇咬伤的急救措施。

3. 护理措施

(1) 急救护理: 患者应卧床休息, 患肢制动, 尽可能放低伤口部位。缚扎伤肢每隔 15 ~ 30min 放松 1 ~ 2min, 一般在伤口排毒和服药后 1 ~ 3h 解除缚扎。积极配合医生进行伤口冲洗和排毒。

(2) 病情观察: 包括以下三方面。

1) 密切观察病情变化, 包括监测生命体征、神志、肝功能、肾功能、凝血功能等。

2) 观察缚扎肢体远端色泽、温度、动脉搏动等。

3) 观察伤口局部情况及皮肤黏膜有无出血点等。

(3)伤口护理:进行伤口湿敷时,要保持纱布湿润,血污较多时及时更换敷料。伤口周围红肿减退,伤口处流出的血液由暗红色转为鲜红色时,提示局部情况好转。

(4) 全身护理: 具体如下。

1) 应用利尿剂: 应用利尿剂时, 注意预防水、电解质及酸碱平衡紊乱, 快速输液时应注意监测心、肺功能。

2) 应用抗蛇毒血清: 通常采用静脉注射, 注射前必须做皮肤过敏试验。方法: 取 0.1mL 抗蛇毒血清加 1.9mL 生理盐水(稀释 20 倍)。在前臂掌侧皮内注射 0.1mL, 经 20 ~ 30min, 注射皮丘直径在 2cm 以内且皮丘周围无红晕及伪足者为阴性反应。若注射部位出现皮丘增大、红肿、伪足或有痒感者, 为阳性反应, 应采用脱敏注射法。方法: 取生理盐水将抗蛇毒血清稀释 20 倍, 分数次做皮下注射, 每次观察 10 ~ 20min。第 1 次注射后, 如无反应, 可酌情增量注射。注射并观察 3 次以上, 无异常反应者, 即可做静脉注射、肌内注射或皮下注射。注射前将制品置于 37℃ 水浴中加温数分钟。注射时速度宜慢, 开始时不超过 1mL/min, 之后亦不宜超过 4mL/min。注射时如有异常反应, 应立即停止注射。

3) 对症及支持疗法护理: 鼓励患者多饮水, 对不能进食者给予静脉补液以利排毒, 并纠正水、电解质和酸碱平衡紊乱。合理选用抗生素预防感染, 并注射破伤风抗毒素以预防破伤风。同时积极预防休克及脏器功能衰竭。

4) 心理护理: 大部分毒蛇咬伤患者有恐惧心理, 精神紧张, 担心自己有生命危险。对这类患者, 应做好解释和安抚工作, 使患者放松心情, 保持镇静, 树立战胜疾病的信心, 积极配合治疗。

5) 健康教育: 野外或丛林作业者, 应随身携带抗蛇毒药物, 尽可能穿高筒靴、戴手套。在丛林密集处行走, 可先用木杆等拨开枝叶, 夜间带好手电筒等照明工具。

4. 护理评价

(1) 患者的情绪是否稳定, 是否有恐惧心理。

(2) 患者的伤口是否愈合。

(3) 患者是否出现并发症或已出现的并发症是否治愈。

考点提示:毒蛇咬伤患者的护理。

知识链接

蜂蜇伤

蜂蜇伤指被蜂尾蜇伤，毒液注入人体，或伴毒刺留皮内，以局部出现红肿、刺痛，甚至头晕、恶心等为主要表现的中毒性疾病。被少量蜂蜇伤一般无全身症状，被大量蜂蜇伤可导致大面积肿胀，偶可引起组织坏死，严重者甚至出现过敏性休克或急性肾衰竭。因此，需要根据蜂蜇伤的严重程度来进行治疗。

蜂毒主要成分为蚁酸、盐酸、组胺及神经毒素，可导致局部及全身症状。蜇伤部位红肿，中央可见的救护小黑点，多为刺伤点或毒刺存留部位，周围可有丹毒或荨麻疹样改变。全身症状一般不甚明显，但被群蜂蜇伤时症状较重，可出现头晕、头痛、寒战、发热、气喘、心率加快、血压下降甚至休克、昏迷等。

蜂蜇伤后的应急措施:小心拔除毒刺,如果伤口位于四肢,可以用绳子在伤口近心端扎紧,防止毒液经血液循环扩散,然后用手或其他器具挤压伤口周围,挤出部分血液后松开绳子。如果为蜜蜂蜇伤,可用浓肥皂水或碱水涂抹伤口,或用氨水、小苏打水清洗伤口,使酸性毒液被碱性液体中和,从而减轻症状。若为胡蜂蜇伤,则需要用食醋等酸性溶液清洗,其他紧急处理方法与蜜蜂蜇伤基本一致。简单处理之后若症状得不到缓解,应及时前往医院进一步治疗。

对有全身症状者，医护人员应根据病情予以对症处理。症状较轻者，给予对症治疗，如10%葡萄糖酸钙溶液静脉注射；有过敏反应时，应迅速给予肾上腺皮质激素、抗组胺药等；发生血红蛋白尿时，应用碱性药物碱化尿液，适当补液以增加尿量，并可用20%甘露醇利尿；发生少尿或无尿时，则按急性肾衰竭处理，对休克者要积极抢救；群蜂蜇伤或伤口感染时，应加用抗菌药物。

目标检测

1. 炼钢工人在工作中突然出现阵发性腹痛、双下肢肌肉痉挛, 最可能的诊断是( )。

A. 急性胰腺炎 B. 先兆中暑 C. 低血糖症

D.中暑痉挛 E.甲亢危象

2. 某患者烈日下工作 2h 后, 出现头晕、头痛、口渴、多汗、全身疲乏、心
悸、注意力不集中、动作不协调等症状, 血压 90/60mmHg。此时最佳的处理措施为( )。

A. 立即将患者搬离高温环境, 转移到通风阴凉处休息

B. 冰水浸浴 30min

C. 口服大量清凉饮料

D. 静脉滴注生理盐水

E. 快速送至医院

3. 对中暑患者进行体内降温时, 静脉快速输入液体的适宜温度为( )。

A. 4～10∘C B. 10～15∘C C. 15～20∘C

D. 20～25∘C E. 25～37∘C

4. 热痉挛最突出的表现为( )。

A. 腓肠肌痉挛、疼痛

B. 胸大肌痉挛、疼痛

C. 呼吸肌痉挛、疼痛

D. 肠道平滑肌痉挛、疼痛

E. 呕吐

5. 已适应高温环境的青壮年, 在剧烈体力劳动后大量排汗而自觉口渴, 大量饮水而盐分补充不足时发生腓肠肌痉挛性疼痛, 称为( )。

A. 热痉挛 B. 热衰竭 C. 中暑高热

D. 热射病 E. 中暑衰竭

6. 毒蛇咬伤的首要治疗原则是( )。

A. 尽快排出毒素

B. 迅速阻止蛇毒的吸收和扩散

C. 抗蛇毒治疗

D. 加强对症及支持治疗

E. 吸氧

7. 被咬伤后,蛇毒会在( )min 内迅速进入人体。

A. 3 ~ 5

B. 5 ~ 7

C. 7 ~ 9

D. 9 ~ 11

E. 11 ~ 13

8. 毒蛇咬伤后, 神经毒素发作的临床表现不包括( )。

A. 四肢无力

B. 言语不清

C. 吞咽困难

D. 伤口流血不止

E. 牙关紧闭

9. 下列关于海水淹溺特点的描述, 错误的是( )。

A. 血容量减少 B. 红细胞损害很小 C. 极少发生心室颤动

D. 血液浓缩 E. 低钠血症

10. 下列变化属于淡水淹溺的是( )。

A. 血液浓缩 B. 高钠血症 C. 高镁血症

D. 高钾血症 E. 高氯血症

11. 刘某, 男, 22 岁。在海中游泳时不慎溺水, 被救至岸边。查体: 神志不清, 口流海水, 呼吸微弱, 心率 45 次/分, 血压 90/60 mmHg。正确的处理措施是( )。

A. 立即呼叫 120

B. 立即头偏向一侧, 清除口腔异物, 吸氧

C. 立即进行心外按压

D. 立即监测生命体征

E. 以上均不正确

12. 下列关于淹溺院内救护的描述, 不正确的是( )

A. 检测有无低血容量 B. 给予低流量吸氧 C. 纠正酸碱失衡

D. 防治低体温 E. 对症处理

13. 下列不属于淡水淹溺表现的是( )。

A. 血容量增加

B. 红细胞损害减少

C. 血液稀释

D. 红细胞损害增加

E. 心室颤动

14. 高原环境、长期缺氧等都可造成( )明显增多,血液黏稠度升高。

A. 白细胞 B. 红细胞 C. 血小板

D. 血液中的二氧化碳 E. 血红蛋白

15. 下列不属于高原反应的是( )。

A. 心慌 B. 胸闷 C. 呼吸困难

D. 头痛 E. 行走困难

(刘向东 张云萍)`,rawHtml:`<p>案例导学</p>\r
<p>李某，男，39岁。在高温环境中劳动4h后突然出现发热、头晕、意识模糊，伴四肢肌肉痉挛，急诊入院。查体：体温42℃，呼吸42次/分，心率130～150次/分，律齐，无杂音。神志不清，血压90/60mmHg，双侧瞳孔缩小，直径均为2mm，对光反射消失，双肺底可闻及湿啰音，四肢肌张力高，伴阵发性痉挛。血气分析结果：pH值为7.19， PaO<sub>2</sub>&nbsp;47.5mmHg, PaCO<sub>2</sub>&nbsp;32.7mmHg。胸片示双肺多处斑片状阴影。血钾2.5mmol/L，血钠133mmol/L，血氯97mmol/L。</p>\r
<p>请思考：</p>\r
<p>1. 该患者发生了什么情况？属于哪种类型？</p>\r
<p>2. 该患者的主要护理诊断有哪些？</p>\r
<p>3. 假如你在现场，应如何进行救护？</p>\r
<p>在日常生活中,中暑、淹溺和触电是3种常见的物理性损伤,其发病的共同特点是致病因子与外界环境密切相关,既往健康的人遭遇此类损伤也会很快出现危及生命的病理生理变化,因此,这3种损伤属于常见的环境性急诊。此外,随着交通工具的便捷和人们生活水平的提高,越来越多的人有机会前往高原地区旅游或工作。然而,急性高原病成了一个不容忽视的问题。这种疾病主要发生在快速上升到高海拔地区的人群中,是高原地区独有的常见病。</p>\r
<p>一、中暑患者的救护</p>\r
<p>中暑(heat illness)是指高温或热辐射等环境引起机体体温调节中枢功能障碍,导致机体热平衡失调、水电解质代谢紊乱及神经系统和心血管系统功能障碍的一组临床综合征,又称急性热致疾患(acute heat illness),是热平衡功能紊乱而导致的一种急症。</p>\r
<p>思维导图</p>\r
<p>(一) 护理评估</p>\r
<p>1. 病因 高温高湿气候极易发生中暑,其发病原因可概括为机体产热增加、散热障碍和热适应能力下降等。</p>\r
<p>(1) 机体产热增加: 高温环境从事重体力劳动者, 如建筑工人、参加竞技体育比赛的运动员等, 发热、甲状腺功能亢进症和应用某些药物(如苯丙胺)等。</p>\r
<p>(2) 散热障碍: 如湿度较大( &gt;60% )、过度肥胖或穿透气不良的衣服、汗腺功能障碍(如系统性硬化病、广泛皮肤烧伤后瘢痕形成或先天性汗腺缺乏症)患者等。</p>\r
<p>(3) 热适应能力下降: 热负荷增加时, 机体会产生应激反应, 通过神经、内分泌的各种反射调节来适应环境的变化, 从而维持正常的生命活动。当机体这种调节能力下降时, 对热的适应能力也随之下降, 机体则更容易发生代谢紊乱导致中暑。如糖尿病患者、心血管疾病患者、老年人、孕妇等。</p>\r
<p>2. 中暑表现在高温或湿热的环境下,一定时间内,人体会出现出汗、口渴、头晕、眼花、耳鸣、四肢无力、胸闷、心悸、恶心、注意力不集中等表现,这是中暑的先兆,又称为先兆中暑,但此时体温保持正常或略升高,一般不高于38℃,若及时散热,短时间可恢复正常。若不及时散热,病情则会继续发展为轻症中暑甚至重症中暑。</p>\r
<p>(1)轻症中暑:除先兆中暑症状外,此时患者的主要表现如下。①体温多在38℃以上;②面色潮红或苍白、胸闷、心悸;③大汗、呕吐、皮肤湿冷、血压下降、脉搏增快等早期循环
衰竭的表现。此类中暑患者如能得到休息并及时散热,多在3~4h内恢复正常。</p>\r
<p>(2)重症中暑:除轻症中暑表现外,常伴有高热、脱水、痉挛、昏厥甚至昏迷等特殊表现。根据表现通常将重症中暑分为热痉挛、热衰竭和热射病3种类型,这3种类型可按顺序发展,也可交叉重叠,在日常生活中常混合出现。</p>\r
<p>1) 热痉挛: 又称中暑痉挛, 患者在高温环境下进行剧烈运动时大量出汗, 活动期间或停止后常发生肌肉痉挛, 呈对称性或阵发性疼痛, 主要累及骨骼肌如四肢肌肉、咀嚼肌、腹直肌等, 最多见于腓肠肌, 也可发生在肠道平滑肌引起急腹痛。痉挛持续数分钟后缓解, 此时体温无明显升高。肌肉痉挛可能与高温环境出汗较多、钠盐严重缺失(大量出汗和饮用低张液体)和过度通气有关。热痉挛为热射病的早期表现之一, 多见于健康青壮年。</p>\r
<p>2) 热衰竭: 又称中暑衰竭, 严重热应激时, 由于体液和钠离子丢失过多引起循环容量不足所致。其表现为多汗、疲乏、无力、头晕、头痛、恶心、呕吐和肌肉痉挛, 可有心动过速、直立性低血压或晕厥, 有明显脱水征。此类型中暑体温轻度升高, 无明显中枢神经系统损伤的表现。根据病情轻重不同, 检查可见血细胞比容增高、高钠血症、轻度氮质血症和肝功能异常。热衰竭可以是热痉挛和热射病的中介过程, 若治疗不及时, 可发展为热射病, 多见于老年人、儿童和慢性疾病患者。</p>\r
<p>3) 热射病: 又称中暑高热, 主要表现为高热(直肠温度≥41℃) 和神志障碍。起病前往往有头痛、眩晕和乏力，早期受影响的器官依次为脑、肝、肾和心脏。热射病是一种致命性急症，病死率较高。根据发病时患者所处的状态和发病机制，临床上常分为两种类型：劳力性和非劳力性(或典型性)热射病（表3-4）。劳力性热射病主要是在高温环境下内源性产热过多；非劳力性热射病主要是在高温环境下体温调节功能障碍引起散热减少。</p>\r
<p>劳力性热射病多在高温、湿度大和无风天气进行重体力劳动或剧烈体育运动时发生。患者多为平素健康的年轻人，在从事重体力劳动或剧烈运动数小时后发病，约50%的患者大量出汗，心率可达160～180次/分，脉压增大。患者可发生横纹肌溶解、急性肾衰竭、肝衰竭、弥散性血管内凝血（DIC）或多器官功能衰竭，病死率较高。</p>\r
<p>非劳力性热射病在高温环境下多见于居住拥挤和通风不良的城市老年体衰居民。其他高危人群包括精神分裂症、帕金森病、慢性酒精中毒及偏瘫或截瘫患者。表现为皮肤干热和发红，84%~100%的患者无汗，直肠温度约41℃，甚至高达43℃以上。病初表现为行为异常或癫痫发作，继而出现谵妄、昏迷和瞳孔对称性缩小，严重者可出现低血压、休克、心律失常、心力衰竭、肺水肿或脑水肿。约5%的患者发生急性肾衰竭，可有轻、中度DIC，常在发病后24h左右死亡。</p>\r

<p style="text-align: center;">表 3-4 两种类型热射病的对比</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540014-3-l.jpg" /><figcaption></figcaption></figure>\r
<p>考点提示:重症中暑的分类和表现。</p>\r
<p>3. 实验室检查 中暑时,应行紧急血生化检查和动脉血气分析。严重病例常出现肝、肾、胰和横纹肌损伤的实验室参数改变。住院后,应检查 AST、ALT、乳酸脱氢酶(LDH)、CK 及有关止、凝血功能等的参数,以尽早发现重要器官功能障碍的证据。怀疑有颅内出血或感染时,应行脑 CT 和脑脊液检查。</p>\r
<p>4. 其他 患者和家属的心理反应、配合及对疾病的认知程度等。</p>\r
<p>(二)急救与护理</p>\r
<p>应使患者迅速脱离高温环境,将其转移到阴凉通风处休息,尽快给予降温、吸氧和补充液体等措施,积极纠正水、电解质紊乱和酸碱失衡,防治脑水肿、抽搐、休克等严重并发症。</p>\r
<p>1. 轻症中暑的救护</p>\r
<p>(1) 尽快脱离高温环境: 可将患者安置在阴凉通风处或 20～25<sup>∘</sup>C 的房间内, 脱去外衣, 使
其取平卧位休息。</p>\r
<p>(2) 降温: 轻症患者可反复用冷水擦拭全身, 直至体温降至 38<sup>∘</sup> C 左右, 体温持续升高者可给予水杨酸类解热药物, 如阿司匹林、吲哚美辛等。</p>\r
<p>(3) 补充液体: 让患者多饮水, 可给予淡盐水以补充盐和水分的丢失, 同时密切观察, 疑有循环衰竭者, 酌情给予葡萄糖生理盐水静脉滴注。</p>\r
<p>(4)其他适用于轻症中暑的方法:如刮痧疗法,用光滑平整的汤匙或刮痧板蘸取食用油或清水,刮脊背两侧、颈部、胸肋间隙、肩臂及腘窝等处,刮至皮肤出现紫红色为度。皮肤感染或有出血倾向者禁用此法。</p>\r
<p>素质拓展</p>\r
<p>《随园诗话》中的医家轶史:医者责任心</p>\r
<p>一日，清代医学家赵黎村拜访诗人袁枚，恰逢袁枚生病。赵黎村经过详细询问，发现袁枚吃了某位郎中开具的药物，病情不仅没有得到好转，反而呕吐不止、头晕目眩、气血上涌，十分危急。赵黎村给袁枚把完脉、仔细检查后诊断为中暑，便急忙为其开具药方并告知其家人如何熬制。袁枚喝完汤药不久额头便开始冒汗，气血也不再上涌，病情大有好转。但赵黎村不放心，守在床前，直到袁枚开始能够喝水才离开。第二天，赵黎村又来看袁枚，看到袁枚比前一日更好，才又放心离开。原来袁枚是因中暑引起的阳明经证，而之前医生误将其当成太阳经证给予治疗，用了升麻、羌活二味药，使得气血妄行而上，赵黎村使用白虎汤（石膏粉）及时救治，病情才得以扭转，否则后果不堪设想。</p>\r
<p>医者责任心需要代代相传。无论是老一辈的医学家还是当代医学生，都应该继承和发扬这种精神，加强专业知识学习，提高专业技能水平，积极参与社会实践，为医疗事业的发展贡献自己的力量。</p>\r
<p>2. 重症中暑的救护 重症中暑的类型和病因不同,但基本救治措施大致相同,需要迅速给予物理或药物降温,纠正水、电解质紊乱等对症治疗。可采用“四早一支持”的治疗原则:①早期快速降温,除使用一般物理和化学降温方法外,还可使用冰毯、冰帽、酒精擦浴结合冬眠降温,使体温尽快降至正常。②早期快速扩溶,以晶体液为主,结合血浆、蛋白,尽快补足血容量,纠正低钾、低钠等电解质紊乱。有研究显示,低钠血症如处理不当,病死率可高达50%~80%。③早期抗凝,使用低分子肝素钠5000U,皮下注射,每12h注射1次,连续7日。④早期改善微循环。⑤积极支持脏器功能。</p>\r
<p>根据不同重症中暑类型的表现和辅助检查,其救护措施又有所不同。</p>\r
<p>(1) 热痉挛: 通常是受热、过度劳累之后, 胳膊、腿和腹部等处的肌肉发生痉挛, 一般是由于排汗过多, 身体盐分缺乏所引起, 此时患者体温升高并不明显, 口服补充淡盐水或静脉滴注葡萄糖生理盐水即可缓解。严重者可同时缓慢静脉推注 10% 葡萄糖酸钙 10 ~ 20mL。如意识丧失、痉挛剧烈, 应让患者取侧卧位, 头向后仰, 保持呼吸道畅通, 严禁用阿托品及催眠、镇静等药物, 同时快速通知急救中心。</p>\r
<p>(2) 热衰竭: 指主要发生在高温环境劳动过程中出现的血液循环功能衰竭。此时应及时将患者移到阴凉的地方, 取平卧位或中凹卧位, 给予降温; 由于失水过多, 应及时补充血容量, 防止血压下降。注意必要时需监测中心静脉压指导补液, 防止补液不足或过度。</p>\r
<p>(3) 热射病: 患者体温可高达 40<sup>∘</sup> C 以上, 因此降温是抢救的关键。降温速度决定患者预后。通常应在 1h 内使直肠温度降至 38<sup>∘</sup> C 左右。降温措施包括物理降温和药物降温。此外, 热射病患者预后差, 病死率高, 幸存者可能留下永久性脑损伤, 故需积极抢救。应及时迅速降温, 纠正水、电解质及酸碱平衡失调, 防治循环衰竭、休克及肾衰竭。</p>\r
<p>1)体表降温:旨在迅速降低深部体温。脱去患者衣物,吹送凉风或以凉湿床单包裹全身。头部降温,可选用冰帽、冰袋,以降低进入颅内血液的温度。躯干和四肢降温可选择冰水或乙醇擦浴,用25%~35%乙醇或冰水擦拭全身皮肤,边擦拭边按摩皮肤使其血管扩张、血液循环加快、皮肤散热加速而降温。也可选择冰水浴,将患者浸浴于4℃冰水中,并不断按摩四肢皮肤,使血管扩张,促进散热。浸浴10~15min测肛温一次,肛温降至38℃时,停止冰水浴,体温回升到39℃以上时,可再行浸浴。需要注意的是,采用冰水浸浴治疗因发生低血压和寒战的并发症较多已不再推荐,但如其他方法无法降温时,亦可考虑此方法,但此时需要监测深部体温,一旦低于38.5℃时需停止冰水降温,以防体温过低。目前有条件的医院可选择医用冰毯全身降温仪(简称冰毯机)(图3-3),但也应注意严密监测体温,以防降温过快。</p>\r

<p style="text-align: center;">图3-3 医用冰毯机</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540014-6-l.jpg" /><figcaption></figcaption></figure>\r
<p>知识链接</p>\r
<p>医用冰毯机</p>\r
<p>低温疗法是一种以物理方法将患者的体温降至预期水平而达到治疗疾病目的的方法。临床深低温治疗的应用和研究由来已久，并取得了良好的脑保护作用，但体温低于28℃时，常诱发心律失常、凝血功能障碍等严重并发症。冰毯机降温法是利用半导体制冷原理，将水箱内蒸馏水冷却，然后通过主机工作与冰毯内的水停止循环交换，促使毯面接触皮肤停止散热，达到降温目的。其主要用于全身降温，广泛应用于颅脑疾病术前、术后的亚低温及各种类型的顽固性高热不退患者。冰毯机降温法分单纯降温法及亚低温治疗法两种，单纯降温法适用于高热及其他降温效果欠佳的患者，亚低温治疗法适用于重型颅脑损伤。</p>\r
<p>2)体内降温:体外降温无效者,用冰盐水进行胃或直肠灌洗,也可用无菌生理盐水进行腹膜腔灌洗或血液透析,或将自体血液体外冷却后回输体内降温。还可用4℃葡萄糖盐水200mL加氨基比林0.5g溶解后保留灌肠。有抽搐症状者可加10%水合氯醛15mL,以控制痉挛发作。</p>\r
<p>3) 药物降温: 选择有调节体温中枢、扩张血管、松弛肌肉和降低氧耗作用的药物。常用药物有氯丙嗪、地塞米松、冬眠合剂等。将氯丙嗪 25 ~ 50mg 稀释在 4℃ 葡萄糖盐水内, 快速滴注, 要求 2h 内滴完。地塞米松 10 ~ 20mg 静脉注射。人工冬眠合剂由氯丙嗪、哌替啶、异丙嗪按照一定比例配制而成 (氯丙嗪 8mg、哌替啶 25mg、异丙嗪 8mg)。用药时除观察体温外还应注意观察呼吸、血压的变化。</p>\r
<p>4) 补液: 清醒者可口服糖盐水, 有周围循环衰竭者应静脉补给生理盐水、葡萄糖溶液和氯化钾。</p>\r
<p>5) 吸氧: 保持呼吸道通畅, 密切观察患者的神志状况, 因为此类患者多数有不同程度的意识障碍, 如头痛、烦躁不安, 甚至惊厥和昏迷。应及时查找原因, 一旦发现脑水肿应给予脱水药, 如甘露醇、地塞米松等。</p>\r
<p>6) 对症处理: 纠正水、电解质紊乱, 热痉挛可静脉推注 10% 葡萄糖酸钙 10 ~ 20mL。此外, 还应注意防治急性肾衰竭、感染、DIC 等并发症。</p>\r
<p>考点提示:重症中暑患者的救护措施。</p>\r
<p>3. 护理要点</p>\r
<p>(1)保持有效降温:降温速度将决定患者的预后,准确执行各项降温措施,在物理降温和药物降温过程中,严密观察患者的生命体征、神志及尿量变化,每10~30min测量肛温一次,肛温下降至38℃左右时暂停降温,如患者存在昏迷、呼吸抑制、血压下降明显(收缩压低于80mmHg),停止降温。</p>\r
<p>(2)保持呼吸道通畅:帮助休克或昏迷患者采取平卧位,头偏向一侧,及时吸出口、鼻、咽部的分泌物。</p>\r
<p>(3) 加强基础护理: 饮食以清淡为主, 补充易消化、高热量、高纤维素、高蛋白、低脂饮食, 同时注意做好口腔及皮肤护理等。</p>\r
<p>(4)严密观察病情:观察各项生命体征的变化，出现并发症时及时向医生报告。</p>\r
<p>(5) 健康教育: 高温季节应加强防暑、降温知识的宣传; 工业及农业生产场所应加强通风、降温和防暑措施; 合理调整夏季作息时间, 增加休息时间。</p>\r
<p>(三) 护理评价</p>\r
<p>(1) 患者的体温是否恢复正常。</p>\r
<p>(2) 水、电解质及酸碱平衡是否恢复。</p>\r
<p>(3)患者有无并发症发生,如心力衰竭、肺水肿、肾衰竭、DIC等。</p>\r
<p>(4) 患者的大脑功能是否恢复正常,有无遗留大脑功能障碍。</p>\r
<p>(5) 判断患者及其家属对中暑的认知程度。</p>\r
<p>考点提示: 中暑患者的护理。</p>\r
<p>二、淹溺患者的救护</p>\r
<p>淹溺又称溺水,是
指人淹没于水或者其他液体中,由于呼吸道被水、污泥、杂草等阻塞,或引起反射性喉痉挛而导致换气障碍、缺氧和窒息的危急状态。严重者如抢救不及时可导致呼吸、心跳停止而死亡,淹溺是意外死亡的常见原因之一。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 病因 淹溺常发生于水上运动(如游泳、划船时意外落水)、跳水、潜水时突发癫痫、心脏病、低血糖发作引起神志丧失者,下水前饮酒或服用损害脑功能的药物及长时间水中运动而过度疲劳者;也可发生于水灾、交通意外或投水自杀者等。</p>\r
<p>2. 机制 人溺水后数秒内会本能地屏气, 引起潜水反射, 此时呼吸暂停、心动过缓、外周血管剧烈收缩, 目的是保证心脏和大脑血液供应; 继而引起高碳酸血症和低氧血症, 刺激呼吸中枢进入非自发性吸气期, 随着吸气运动, 水进入呼吸道和肺泡, 充塞气道, 导致严重缺氧、高碳酸血症和代谢性酸中毒。</p>\r
<p>(1)根据是否有液体进入肺内,淹溺可分为湿性淹溺和干性淹溺。</p>\r
<p>1) 湿性淹溺: 喉部肌肉松弛, 吸入大量水分 (22mL/kg) 充塞呼吸道和肺泡引起窒息, 数秒钟后即发生神志丧失, 最终导致呼吸、心跳停止。</p>\r
<p>2) 干性淹溺: 主要由喉痉挛导致窒息, 此时呼吸道和肺泡很少或无水进入。湿性淹溺约占淹溺的 90%, 干性淹溺约占淹溺的 10%。</p>\r
<p>(2)根据浸没的介质不同,淹溺又分为淡水淹溺和海水淹溺。</p>\r
<p>1) 淡水淹溺: 淡水较血浆或其他体液渗透压低。浸没后, 通过呼吸道或胃肠道进入体内的淡水迅速吸收入血, 使血容量增加, 严重时引起溶血, 继而出现高钾血症和血红蛋白尿。淡水吸入最重要的临床意义是引起肺损伤, 肺泡表面活性物质灭活, 肺顺应性下降, 肺泡塌陷、萎缩, 呼吸膜被破坏, 肺泡容积急剧减小, 发生通气血流比例失调。即使迅速复苏, 仍不能终止急性肺损伤过程, 出现广泛肺水肿或微小肺不张。此外, 肺泡内液体也影响正常的气体交换, 发生氧合作用障碍。</p>\r

<p>2) 海水淹溺: 海水含钠量是血浆的 3 倍以上。因此, 吸入的海水较淡水在肺泡内停留时间更长, 并能使血液中的水分进入肺泡腔, 产生肺水肿、肺内分流, 减少气体交换, 引发低氧血症。此外, 由于海水对肺泡上皮及肺毛细血管内皮细胞的化学损伤作用, 更易发生肺水肿。</p>\r
<p>人体吸入淡水或海水后，虽然血容量、血浆电解质浓度和心血管功能等的变化不同，但均可引起肺顺应性降低、肺水肿、肺内分流、低氧血症和混合性酸中毒。发生严重脑缺氧时还可引起神经源性肺水肿。大多数淹溺者猝死的原因为严重的心律失常。冰水淹没迅速致死的原因常为寒冷刺激迷走神经，引起心动过缓或心搏骤停和神志丧失。淡水淹溺和海水淹溺的特征对比见表3-5。</p>\r
<p>表3-5 淡水淹溺与海水淹溺特征对比</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540014-9-l.jpg" /><figcaption></figcaption></figure>\r
<p>考点提示:淡水淹溺和海水淹溺的区别。</p>\r
<p>3. 临床表现 多数淹溺者表现为神志丧失、呼吸停止、大动脉搏动消失，处于临床死亡状态。近乎淹溺者临床表现个体差异较大，与溺水持续时间、吸入水量、吸入介质的性质和器官损伤严重程度有关。</p>\r
<p>(1) 症状: 近乎淹溺者可有头痛或视觉障碍、剧烈咳嗽、胸痛、呼吸困难和咳粉红色泡沫样痰。海水淹溺者, 口渴感明显, 最初数小时可有寒战和发热。</p>\r
<p>(2)体征:淹溺者口腔和鼻腔内充满泡沫或泥污,皮肤发绀、颜面肿胀、球结膜充血、肌张力增加;烦躁不安、抽搐、昏睡或昏迷;呼吸表浅、急促或停止,肺部可闻及干、湿啰音;心律失常、心音微弱或心跳停止;腹部膨隆,四肢厥冷。高空跳水或潜水者发生淹溺可伴有头部或颈椎损伤。</p>\r
<p>4. 实验室检查及其他检查</p>\r
<p>(1) 血和尿液检查: 外周血白细胞轻度增高。淡水淹溺者, 血钾升高, 血和尿液中能检出游离血红蛋白。海水淹溺者, 有轻度高
钠血症或高氯血症。淹溺者极少发生致命性电解质平衡紊乱。严重者出现凝血功能异常(如 DIC)。</p>\r
<p>(2) 动脉血气分析: 约 75% 的淹溺者有严重的混合性酸中毒, 几乎所有淹溺者都有不同程度的低氧血症。</p>\r
<p>(3) X 线检查: 胸片常显示斑片状浸润影, 有时出现典型的肺水肿征象。</p>\r
<p>(二)急救与护理</p>\r
<p>1. 现场急救 将淹溺者迅速从水中救出并恢复有效通气,对呼吸、心跳停止者尽快给予心肺复苏。</p>\r
<p>(1) 将淹溺者迅速从水中救出: 方法如下。</p>\r
<p>1) 自救方法: 时间紧急, 自救对于淹溺者至关重要。①不会游泳者: 落水后保持冷静, 待身体浮出水面, 保持仰面, 口鼻向上进行短暂呼吸换气。注意呼气要浅, 吸气宜深, 这样可使身体浮力增大, 从而延长等待救援的时间。②会游泳者: 落水后, 一般因四肢肌肉(常见于小腿腓肠肌) 痉挛而致溺水。小腿肌肉痉挛时, 可仰浮在水面上, 用对侧手握住痉挛侧脚趾, 并将其向身体方向拉, 同时用另一手掌压在痉挛侧膝盖上, 帮助小腿伸直, 促进痉挛缓解; 大腿肌肉痉挛时, 应仰浮并立即举起痉挛侧腿, 使其与身体形成直角, 然后双手抱住小腿, 用力屈膝, 使大腿贴近胸部, 再以手按揉大腿痉挛的肌肉, 并将腿慢慢向前伸直, 痉挛即可缓解。</p>\r
<p>2)互救方法:施救者必须具备一定水性才能下水施救。①施救者应尽可能脱去衣裤,尤其要脱去鞋、靴,快速游到淹溺者身旁。②对筋疲力尽的淹溺者,施救者可从其头侧接近。③对神志清醒的淹溺者,施救者应从背后接近,用一只手从背后抱住淹溺者的头颈,另一只手抓住淹溺者的手臂,游向岸边。④施救者最好携带救生圈、木板或用小船进行救援,或投下绳索、竹竿等,令淹溺者握住再将其拖带上岸。⑤救援时,要注意防止被淹溺者紧抱缠身而双双发生危险。如被抱住,不要相互拖拽,应放手自沉,促使淹溺者手松开,再进行救护。</p>\r
<p>(2)保持呼吸道通畅:迅速清除淹溺者口腔及鼻腔中的污水、污物、分泌物及其他异物,以保持气道通畅。对疑有异物堵塞气道者,可用海姆立克急救法或借助器械取(排)出异物;如有条件,及时给予吸氧。</p>\r
<p>(3) 倒水处理: 可采取下列方法迅速倒出淹溺者呼吸道及胃内积水。</p>\r
<p>1) 膝顶法: 施救者取半蹲位, 一腿跪地, 另一腿屈膝, 将淹溺者腹部置于屈膝侧大腿上, 使头部下垂, 随即按压其背部, 迫使呼吸道和胃内的水排出(图 3-4)。</p>\r
<p>2) 肩顶法: 施救者将淹溺者扛在肩上, 淹溺者腹部与施救者肩部接触(身体呈弓形, 保持其头、胸下垂), 施救者抖动肩部, 使积水排出(图 3-5)。此法主要适用于儿童或体型偏瘦的淹溺者。</p>\r
<p>3) 抱腹法: 使淹溺者俯卧于地面上, 施救者双手抱其腹部, 保证其腹部高于头、胸, 同时摇晃淹溺者, 将积水排出(图 3-6)。</p>\r
<p>以上三种方法操作时间不宜过长(1min 即可)，应尽量避免因倒水时间过久影响实施心肺复苏。</p>\r
<p style="text-align: center;">图3-4 膝顶法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540014-12-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">图3-5 肩顶法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540014-13-l.jpg" /><figcaption></figcaption></figure>\r

<p style="text-align: center;">图3-6 抱腹法</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/d
s0668540014-14-l.jpg" /><figcaption></figcaption></figure>\r
<p>(4) 心肺复苏: 对于呼吸、心跳停止者, 应立即施行心肺复苏。复苏期间常发生呕吐, 应注意防止呕吐物误吸。</p>\r
<p>考点提示:淹溺的急救措施。</p>\r
<p>素质拓展</p>\r
<p>与时间赛跑、与生命竞速</p>\r
<p>发现淹溺者时,施救人员应立即进行抢救。与时间赛跑,与生命竞速,争分夺秒全力抢救淹溺者。运用心肺复苏、倒水、吸氧等方法实施急救,挽救患者生命。</p>\r
<p>作为医学生,我们应秉承“生命至上、救死扶伤”的服务理念,不断提升医疗技术水平和医疗服务能力,为患者提供更精准、更优质、更全面的医疗服务,全力守护患者的生命健康。</p>\r
<p>2. 院内急救和护理 淹溺者进入医院后,应给予进一步生命支持,通常应送至 ICU 观察、监护 24~48h,预防发生急性呼吸窘迫综合征(ARDS)。</p>\r
<p>(1) 对症处理: 主要包括吸氧、维持体温、脑保护及饮食护理。</p>\r
<p>1) 吸氧: 吸入高浓度氧或采用高压氧治疗, 根据病情可使用机械通气。</p>\r
<p>2) 复温及保温: 对体温过低者, 可采用体外或体内复温措施。</p>\r
<p>3) 心电监护: 淹溺者容易发生心律失常, 故心电监护不可或缺。</p>\r
<p>4) 脑复苏措施: 缺氧可对大脑产生损害, 故实施脑保护措施也十分重要。颅内压升高者应适当过度通气, 维持 PaCO<sub>2</sub> 在 25 ~ 30mmHg, 同时应静脉输注甘露醇降低颅内压, 缓解脑水肿。</p>\r
<p>5)并发症处理:对合并惊厥、低血压、心律失常、肺水肿、ARDS、应激性溃疡伴出血、电解质和酸碱平衡紊乱者,给予相应紧急处理。</p>\r
<p>(2) 护理要点: 具体如下。</p>\r
<p>1) 维持呼吸功能: 继续进行有效人工通气及血气监测, 对人工呼吸无效者应行气管插管并给予正压给氧, 必要时行气管切开, 采用呼吸机辅助通气, 同时给予呼吸兴奋剂, 支气管痉挛时使用氨茶碱。</p>\r
<p>2) 纠正低血容量: 对淡水淹溺者, 可给予 3% 氯化钠溶液 500mL 静脉滴注, 必要时可重复; 对海水淹溺者, 可给予 5% 葡萄糖溶液或低分子右旋糖酐溶液。</p>\r
<p>3) 防治肺部感染: 由于淹溺时污物吸入气管, 故易引发肺部感染, 应及时给予抗生素预防或治疗, 严重时尽快实施支气管镜下灌洗。</p>\r
<p>4) 饮食护理: 对能进食者应给予高营养的半流质饮食。</p>\r
<p>5) 健康教育: 加强游泳安全教育, 在夏秋季节开展多种形式的防溺水宣传, 避免淹溺的发生。</p>\r
<p>(三) 护理评价</p>\r
<p>(1) 患者的意识是否清醒, 情绪是否稳定。</p>\r
<p>(2) 患者有无肺部感染, 呼吸功能是否恢复正常。</p>\r
<p>(3) 患者的生命体征是否平稳。</p>\r
<p>(4) 患者及其家属对淹溺后果的认知程度。</p>\r
<p>考点提示:淹溺患者的护理。</p>\r
<p>三、触电患者的救护</p>\r
<p>触电可引发电击伤。电击伤通常指人体直接触及电源,或高压电经过空气或其他导电介质传递通过人体时引起的组织损伤和功能障碍,严重者发生心搏骤停。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 病因 引起电击伤的原因很多,主要源于缺乏安全用电知识,如安装、维修电器或电线操作不规范,在电线上晾晒衣物等。此外,高温、潮湿和出汗使皮肤表面电阻降低,电线意外折断击中人体,雷雨时在大树下躲雨或使用铁柄伞而被闪电击中等,都可引起电击伤。</p>\r
<p>2. 影响因素 直流电对血液有分解作用,交流电则破坏神经系统。通常情况下直流电的危害性小于交流电。</p>\r
<p>(1)电流大小和通电时间:流经人体的电流量越大,危害性越大。一般电流在20mA以下时相对安全;当超过50mA时,触电者会发生呼吸困难、肌肉瘫痪,甚至严重休克;当超过100mA时,将严重损坏心脏,引起心室颤动,继而发生血液循环障碍,最终导致死亡。电流大小与通电时间对人体的影响见表3-6。</p>\r
<p style="text-align: center;">表 3-6 电流大小与通电时间对人体的影响</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540014-17-l.jpg" /><figcaption></figcaption></figure>\r
<p>(2) 电流通过人体的路径: 电流通过头部, 可导致昏迷; 电流通过心脏, 可引起心室颤动; 电流通过中枢神经系统, 可引起呼吸停止、四肢瘫痪等。由此可见, 电流通过人体要害部位会造成严重伤害。</p>\r
<p>(3)电压的高低:触电电压越高,对人体的危害越大。根据欧姆定律,电阻不变时电压越高,电流越大。因此,人体触及带电体的电压越高,通过人体的电流越大,受到的危害就越严重。设备对地电压在250V以上的为高压电气设备,设备对地电压在250V及以下的为低压电气设备,而36V及以下的电压为安全电压(一般情况下对人无害)。</p>\r
<p>(4)人的身体状况:电对人体的危害程度与人的身体状况有关,如性别、年龄和健康状况等因素与触电后受损伤的程度有很大关系。一般来说,女性较男性对电流的刺激更为敏感,但摆脱电流的能力要低于男性。</p>\r
<p>(5)人体电阻:人体对电流有一定的阻碍作用,这种阻碍作用表现为人体电阻,而人体电阻主要来自皮肤表层。起皱和干燥的皮肤有较高的电阻,但是皮肤潮湿或接触点的皮肤遭到破坏时,电阻则大幅减小。另外,人体电阻随接触电压的升高而迅速下降。一般情况下,人体电阻可按1000~2000Ω考虑;在安全程度要求较高时,人体电阻应以不受外界因素影响的体内电阻500Ω计算。</p>\r

<p>3. 临床表现</p>\r
<p>(1)电性昏迷:患者触电后常发生短暂昏迷(占20%~50%),意识多能恢复。若头部有撞击伤,除短暂昏迷外还可出现神志恍惚或兴奋。CT检查可发现局部脑水肿,继之脑软化。发生在非功能区时无定位体征出现,经治疗后可恢复,一般无后遗症。</p>\r
<p>(2)电击损伤:当人体接触电流时,轻者立刻出现惊慌、呆滞、面色苍白及接触部位肌肉收缩,且有头晕、心动过速和全身乏力;重者出现昏迷、持续抽搐、心室颤动、心跳和呼吸停止。部分患者在遭遇严重电击后症状不重,但在1h后突然恶化。部分患者触电后,心跳和呼吸极其微弱,甚至暂时停止,因此要认真鉴别,不可轻易放弃对触电者的抢救。</p>\r
<p>(3)电灼伤:电流在皮肤入口处灼伤程度比出口处重。灼伤皮肤呈灰黄色焦皮,中心部位低陷,周围无肿、痛等炎症反应。电流通路上软组织的灼伤常较为严重,肢体软组织被电灼伤后,其远端组织常出现缺血和坏死。血浆肌球蛋白增高和红细胞膜损伤引起的血浆游离血红蛋白增高可导致急性肾小管坏死。</p>\r
<p>(4)并发症和后遗症:①大量组织损伤和溶血,可导致高钾血症。②肌肉强烈收缩和抽搐,可导致四肢关节脱位和骨折;脊柱旁肌肉强烈收缩,可导致脊柱压缩性骨折。③神经系统后遗症包括失明、耳聋、周围神经病变、上升性或横断性脊髓病变和肌萎缩侧索硬化(ALS),亦可发生肢体单瘫或偏瘫。少数受高压电损伤的患者可发生胃肠道功能紊乱、肠穿孔、胆囊局部坏死、胰腺灶性坏死、肝脏损害、凝血功能障碍、白内障和性格改变。</p>\r
<p>(二)急救与护理</p>\r
<p>1. 迅速脱离电源 现场救治应争分夺秒,首要任务是切断电源。常用方法包括以下几项。</p>\r
<p>(1) 关闭电源: 若在家中或电源开关附近发生触电, 迅速关闭电源、拉开电源总闸是最简单、安全而有效的方法。</p>\r
<p>(2) 挑开电线: 用干燥木棒、竹竿等绝缘体将电线从触电者身上挑开, 并将此电线固定好, 避免他人触电。</p>\r
<p>(3) 斩断电路: 若在野外或远离电源开关处发生触电, 尤其是雨天, 不便接近触电者以挑开电源线时, 可在距现场 20m 以外处用绝缘钳或干燥木柄的铁锹、斧头、刀等将电线斩断。</p>\r
<p>(4)“拉开”触电者:若触电者全身趴在铁壳机器上,施救者可在自己脚下垫一块干燥木板或塑料板,用干燥绝缘的布条、绳子或用衣服绕成绳条状套在触电者身上,将其拉离电源。</p>\r
<p>在使触电者脱离电源的整个过程中,施救者必须防止自身触电,因此应注意以下3点:①必须严格保持自身与触电者绝缘,不直接接触触电者,选用的器材必须有绝缘性能。②下雨天于野外抢救触电者时,一切有绝缘性能的器材都可能被淋湿,失去绝缘性能,因此更需注意。③当遇到野外高压电线触电的情况时,为了避免跨步电压的
危险,最佳的做法是选择在20m以外的安全距离切断电源。确实需要进出危险地带,需保证以单脚着地的跨跳步进出,切不可双脚同时着地。</p>\r
<p>2. 保持呼吸道通畅 对有缺氧指征者,应尽快给予吸氧。</p>\r
<p>3. 心肺复苏 对心搏骤停者即刻予以心肺复苏; 对心室颤动者, 有条件时应立即给予电除颤。</p>\r
<p>4. 维持有效循环血量,保护体表电灼伤创面 对危重患者应迅速建立静脉通道,对体表电灼伤创面周围皮肤用碘伏处理,加盖无菌敷料包扎,以减少污染。</p>\r
<p>5. 对症处理 积极防治脑水肿、急性肾衰竭等并发症；纠正水、电解质和酸碱平衡紊乱；有骨折者应给予适当固定；应用抗生素防治感染；检查是否存在其他合并外伤。</p>\r
<p>(三) 护理评价</p>\r
<p>(1) 患者的生命体征是否恢复正常。</p>\r
<p>(2) 患者的意识是否清楚。</p>\r
<p>(3) 患者的皮肤损伤是否恢复正常。</p>\r
<p>(4) 患者的体液是否得到及时补充。</p>\r
<p>四、急性高原病患者的救护</p>\r
<p>高原病(mountain sickness)又称高山病,是指由平原进入高原,或由低海拔地区进入海拔更高的地区时,由于对低氧环境的适应能力不足而发生的以缺氧为主要表现的综合征。高原通常指海拔在3000m以上,能对机体产生明显生物效应的地区。我国是一个多山国家,海拔3000m以上地区约占全国总面积的1/6。由平原移居或短期逗留高原的人均可发生高原病。</p>\r
<p>根据起病的急缓,高原病一般分为急性高原病和慢性高原病两大类。急性高原病指初入高原时出现的急性缺氧反应或疾病,依其严重程度分为急性高原反应、脑型急性高原病(又称高原昏迷或高原脑水肿)、肺型急性高原病(又称高原肺水肿)、混合型(即肺型和脑型的综合表现)。其中急性高原反应为急性轻症高原病,高原脑水肿和高原肺水肿属于急性重症高原病。慢性高原病指抵达高原半年以上方发病或原有急性高原病症状迁延不愈,少数高原世居者也可发病。本节主要介绍急性高原病。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 病因 高原的特点是空气稀薄, 大气压及氧分压低。海平面温度为 0<sup>∘</sup> C 时, 大气压为 101.2 kPa (760 mmHg), 大气氧分压为 21.2 kPa (159 mmHg), 正常人肺泡气氧分压为 14 kPa (105 mmHg), 动脉血氧分压 ( PaO<sub>2</sub> ) 为 13.3 kPa (100 mmHg)。当海拔增至 3000 m 时, 大气压降至 77.3 kPa (526 mmHg), 大气氧分压为 14.7,kPa(110,mmHg) ，肺泡氧分压降至 8.26,kPa(62,mmHg) 。人因 PaO<sub>2</sub> 和动脉血氧饱和度明显下降而发生缺氧。</p>\r
<p>2. 病理生理</p>\r
<p>(1) 神经系统: 大脑皮质对缺氧的耐受性最低, 这是由于大脑代谢旺盛、耗氧量大。急性缺氧初期, 脑血管扩张、血流量增加、颅内压升高、大脑皮质兴奋性增强, 患者出现头痛、多言、失眠、步态不稳等症状; 之后呼吸加深、加快, 心率加快, 心排血量增加。后者是机体对缺氧的一种代偿性反应。缺氧持续或加重时, 脑细胞无氧代谢加强, ATP 生成减少, 引起细胞膜钠泵功能障碍, 细胞内钠水潴留, 发生脑水肿, 患者出现嗜睡、昏迷、惊厥, 甚至呼吸中枢麻痹。</p>\r

<p>(2) 呼吸系统: 动脉血氧分压降低, 刺激颈动脉窦和主动脉体化学感受器引起反射性呼吸加深、加快, 从而增加通气量, 肺泡和动脉血氧分压升高。过度换气使 CO<sub>2</sub> 呼出过多, 导致呼吸性碱中毒。急性缺氧可使肺小动脉痉挛, 导致肺循环阻力增加, 肺毛细血管静脉压明显升高, 毛细血管通透性增加, 血浆渗出, 引起肺水肿。此外, 肺泡壁和肺毛细血管损伤、肺泡表面活性物质不足、血管活性物质释放都可加重肺水肿。</p>\r
<p>(3) 心血管系统: 心率加快是进入高原后心脏最早出现的改变之一, 是由缺氧刺激颈动脉窦和主动脉体化学感受器引起。急性缺氧时, 体内血液重新分布
, 心、脑血管扩张, 血流量增加; 皮肤、腹腔器官特别是肾血管收缩, 血流减少。血液重新分布有利于保证生命器官的血液供应, 具有代偿意义。缺氧时, 冠状动脉扩张的代偿作用有一定限度, 严重和持久缺氧将造成心肌损伤。长期移居高原者, 肺动脉阻力持续增加, 可导致肺动脉高压。肺动脉压持续增高可使右心负荷加重而引起肺源性心脏病。同时, 缺氧导致红细胞增多, 可使血液黏稠度增高而加重心脏负荷。</p>\r
<p>(4)造血系统:进入高原后,红细胞和血红蛋白增多,这是机体对缺氧的适应性反应。其机制为急性缺氧刺激外周化学感受器,反射性地引起交感神经兴奋,使储血器官释放红细胞。同时,糖无氧酵解增强,乳酸增多,血pH值下降,氧解离曲线右移,还原型血红蛋白增多,促使2,3-二磷酸甘油酯(2,3-DPG)合成增加,降低血红蛋白与氧的亲和力,促使氧释放。低氧血症使红细胞生成素增多,进而促进骨髓红细胞系统增生,以增加红细胞数量和红细胞内的血红蛋白量,从而提高血液的携氧能力;但红细胞过度增生(如红细胞压积大于60%)时,血液黏稠度增高将使血流缓慢,可引起循环障碍。</p>\r
<p>3. 临床表现在到达高原后数小时或1~2天内出现缺氧症状,症状轻重因人而异。一般经1周左右症状逐渐消失,亦有持续较久或迁延成慢性高原病者。</p>\r
<p>(1)急性高原反应:出现在初入海拔3000m以上地区的人群中,快速登山者更易发病,表现为进入高原数小时后,发生头痛、头晕、胸闷、气短、心悸、食欲减退,恶心、呕吐,记忆力和思维能力减退,可伴有失眠、多梦,部分患者有口唇发绀,少数患者血压暂时升高。一般在第1~2天症状明显,之后减轻,1周左右症状消失,但也有少数患者症状急剧加重,发展为高原肺水肿或高原脑水肿。</p>\r
<p>(2)高原肺水肿:出现在由平原迅速登上海拔3000m以上,特别是4000m以上地区的人群中,常在1~3天内发病,劳累、寒冷、上呼吸道感染常为诱因。初入高原者,剧烈活动可诱发肺水肿,长期居住者短期到海拔较低地区,再回到高原地区也可发病。通常先出现急性高原反应症状,如头痛、乏力、呼吸困难、咳嗽,症状逐渐加重,出现发绀、胸痛、咳白色或粉红色痰、端坐呼吸,肺部可闻及痰鸣音和湿啰音,心率加快;胸部X线检查见肺野有不对称絮状、片状模糊阴影,有些患者可同时并发脑水肿。</p>\r
<p>(3)高原脑水肿:是罕见但最为严重的急性高原病。大多数病例为进入海拔3600m以上地区1~3d后发病。表现为剧烈头痛、头晕、频繁恶心呕吐、精神错乱、共济失调、幻听、幻视、言语障碍、定向力障碍,以后发展为步态不稳、木僵或昏迷。</p>\r
<p>考点提示:急性高原病的临床表现。</p>\r
<p>4. 诊断与鉴别诊断 诊断高原病应具备的条件: ①由平原进入高原, 或由低海拔地区进入海拔更高的地区后发病; ②急性高原病症状随海拔增高而加重, 进入海拔较低的地区后缓解, 氧疗有效。不同类型的高原病应与下列疾病相鉴别。</p>\r
<p>(1) 晕车: 患者在进入高原前有晕车史, 多无缺氧症状, 由高原返回低海拔地区后症状并未减轻, 停止乘车后症状好转。</p>\r
<p>(2) 左心衰竭引起的肺水肿: 无高原反应的前驱症状。有原发性心脏病病史、体征及心力衰竭的诱因, 氧疗效果差。</p>\r
<p>(3)其他可致昏迷的疾病:体检发现偏瘫时,应高度怀疑脑血管意外;头部受伤者,首先考虑颅脑外伤;发热者,首先考虑感染性疾病;发病前有毒物接触史者,首先考虑中毒;既往有糖尿病、高血压、癫痫病史者,应考虑相关疾病。实验室检查可辅助诊断。</p>\r
<p>(二)急救与护理</p>\r
<p>对危重患者应就地抢救,给予高流量鼻导管吸氧或面罩吸氧。经处理症状不缓解或发病地点确无医疗条件时,应及时将患者转往低海拔地区治疗。慢性高原病患者如病情许可,应逐步锻炼以适应低氧环境;若疗效不佳,可转往低海拔地区治疗。</p>\r
<p>1. 急性高原反应 轻症患者一般经休息和氧疗后可自愈。对重症患者应及时给予对症治疗，如头痛者可服用阿司匹林、布洛芬等解热镇痛药；病情严重时可用利尿药，如呋塞米或乙酰唑胺，剂量遵医嘱。</p>\r
<p>2. 高原肺水肿 患者应绝对静卧休息,给予高浓度、高流量吸氧,并注意保暖,配合药物治疗。常用的药物有:地塞米松 10 ~ 20mg,稀释后缓慢静脉注射,每日 1 或 2 次,可减少肺毛细血管渗出;氨茶碱 0.25mg 加入 50% 葡萄糖溶液 20mL,缓慢静脉注射,可缓解支气管痉挛和降低肺动脉压;如无低血压,可舌下含化硝苯地平 5 ~ 10mg,以降低肺动脉压;如出现右心衰竭,可用洋地黄制剂及利尿剂。</p>\r
<p>3. 高原脑水肿 加大吸氧量,给予地塞米松、高浓度葡萄糖溶液及利尿药等
。当合并肺水肿、心力衰竭和红细胞增多时,不宜用甘露醇脱水疗法。</p>\r
<p>4. 护理措施 ①患者应绝对卧床休息,取斜坡卧位。②吸氧是治疗和抢救急性高原病的主要措施,病情严重时应采用高浓度加压给氧。③预防和控制呼吸道感染,发病时注意饮食、环境卫生,一旦出现呼吸道感染,及时应用抗生素进行有效治疗。④对过度烦躁者应做好心理护理,必要时给予镇静剂。⑤对合并心力衰竭、休克、昏迷者应给予相应对症处理。</p>\r
<p>(三) 护理评价</p>\r

<p>(1) 患者的生命体征是否恢复正常。</p>\r
<p>(2) 患者的心脏功能是否恢复正常。</p>\r
<p>(3) 患者有无肺部感染, 呼吸功能是否恢复正常。</p>\r
<p>(4) 患者及其家属对高原病的认知程度。</p>\r
<p>五、常见动物致伤患者的救护</p>\r
<p>自然界中能够攻击人类造成损伤的动物有数万种，它们利用其牙、爪、角、刺等袭击人类，这些伤害不仅会引起局部症状，如疼痛、肿胀和感染，还可能导致全身性的严重后果，包括感染、中毒甚至死亡。本节重点介绍猫、犬抓咬伤和毒蛇咬伤。</p>\r
<p>(一)猫、犬抓咬伤</p>\r
<p>随着家养宠物数量的增多，动物抓咬伤的发生率也相应增加。许多野生动物都可传播狂犬病，生活中狂犬病的主要传染源是犬，其次是猫。人被携带狂犬病毒的动物抓伤或咬伤后很可能导致感染。因此，被猫、犬抓伤或咬伤后的处理非常重要。</p>\r
<p>1. 病因和发病机制 狂犬病毒主要存在于病畜的脑组织及脊髓中,其涎腺和涎液中也含有大量病毒,并随涎液排出。人被带有病毒的猫、犬咬抓后,病毒可经唾液-伤口途径进入人体导致感染。狂犬病毒对神经组织具有强大的亲和力,在伤口及其周围组织细胞内可停留1~2周并生长繁殖,若未被迅速灭活,病毒会沿周围传入神经上行至中枢神经系统,引发狂犬病。</p>\r
<p>2. 病情评估</p>\r
<p>(1)有被猫、犬抓伤或咬伤的病史:感染病毒后是否发病与潜伏期的长短、咬伤的部位、入侵病毒的数量和毒力及机体抵抗力有关。潜伏期短者约10d,多数为1~2个月。伤口越深、越接近头面部,潜伏期越短,发病率越高。</p>\r
<p>(2)症状及体征:发病初期,伤口周围麻木、疼痛,逐渐扩散到整个肢体;继而出现发热、烦躁、乏力、恐水、怕风、咽肌痉挛;最后患者因肌肉瘫痪、昏迷、循环衰竭而死亡。伤处可见利齿造成的深而窄的伤口及出血,伤口周围组织水肿。</p>\r
<p>3. 救护措施</p>\r
<p>(1) 冲洗伤口: 立即挤压伤口周围皮肤, 尽力挤出血液, 之后立即用肥皂水或清水冲洗伤口至少 15 ~ 30min; 伤口较深时需立即彻底清创, 并用大量生理盐水、3% 过氧化氢溶液反复冲洗, 伤口不予缝合或包扎, 以利引流。</p>\r
<p>(2) 局部消毒: 冲洗干净后, 用 75% 酒精或碘伏对伤口进行消毒, 然后用干净的纱布覆盖在伤口上, 注意不可包扎。</p>\r
<p>(3) 注射疫苗: 被猫、犬抓伤或咬伤后, 应尽早注射狂犬病疫苗, 首次暴露者应于伤后第 0、3、7、14、30 天各注射 1 剂疫苗。</p>\r
<p>(4)院内对症处理:对患者应行接触隔离,院内救护以预防和控制痉挛、保持呼吸道通畅、补液、营养支持、伤口护理等对症治疗为主。</p>\r
<p>考点提示:猫、犬抓咬伤患者的护理。</p>\r
<p>(二)毒蛇咬伤</p>\r
<p>毒蛇多分布在长江以南，毒蛇咬伤多发生于夏、秋两季。对人畜危害较大的有眼镜蛇、银环蛇、金环蛇、小头海蛇、环纹海蛇、蝮蛇、吻蝮（五步蛇）、竹叶青蛇等。蛇毒是一种复杂的蛋白质混合物，含有多种毒性蛋白。新鲜蛇毒为黏稠液体，呈弱酸性，透明或淡蓝色，加热至65℃以上时易被破坏。被毒蛇咬伤后，蛇毒一般经3～5min进入淋巴和血液循环，可引起严重的全身中毒症状而危及生命，必须立即实施急救。</p>\r
<p>1. 护理评估</p>\r
<p>(1)病因:蛇毒中含有多种毒性蛋白、多肽及酶类。按其性质及对机体的作用可分为神经毒素、血液毒素及混合毒素。神经毒素对中枢神经系统和神经肌肉节点有选择性毒性作用,可引起肌肉麻痹和呼吸麻痹;血液毒素对血细胞、血管内皮细胞及组织有破坏
作用,可引起出血、溶血、休克或心力衰竭等;混合毒素兼有神经毒素、血液毒素的特点。</p>\r
<p>(2)临床表现:包括局部表现和全身表现。</p>\r
<p>1) 局部表现: 被毒蛇咬伤后, 伤处一般留有大而深的齿痕, 是判断毒蛇咬伤的重要依据; 无毒蛇咬伤的齿痕小, 排列整齐。被分泌神经毒素的毒蛇咬伤后, 局部红肿不明显, 无渗液、剧痛、麻木, 易被忽视, 但所属区域的淋巴结肿大、有触痛。被分泌血液毒素的毒蛇咬伤后, 局部损伤严重, 伤口剧痛, 出血不止, 肿胀明显并迅速向近侧扩散, 皮肤有紫斑或血性水疱, 邻近淋巴结肿痛, 部分伤口短期内坏死, 形成溃疡。被分泌混合毒素的毒蛇咬伤后, 疼痛逐渐加重, 伴有麻木感, 伤口周围皮肤迅速红肿, 可发展至整个肢体, 常有水疱, 严重者伤口迅速变黑坏死, 形成溃疡, 有相应的淋巴结肿大和触痛。</p>\r
<p>2) 全身表现: ①神经毒性症状, 主要表现为神经系统受损, 多在咬伤后 1~6h 出现症状。轻者有头晕、出汗、胸闷、四肢无力、步态不稳、眼睑下垂等；严重者出现瞳孔散大、视物模糊、言语不清、流涎、发绀、复视、牙关紧闭、吞咽困难、昏迷、呼吸减弱或停止、血压下降甚至休克，若抢救不及时，患者可因呼吸循环衰竭而迅速死亡。伤后的第1~2天为危险期，若能安全度过则很快痊愈，很少留下后遗症。②血液毒性症状，主要表现为血液循环系统受损，患者出现寒战、发热、头晕、嗜睡、胸闷、全身肌肉酸痛、皮下或内脏出血（呕血、便血、尿血），继而出现贫血、黄疸等；严重者可出现休克、循环衰竭。③混合毒性症状，主要表现为神经和血液循环系统同时受损，患者的死亡原因以神经损害为主。</p>\r
<p>(3) 辅助检查: 凝血功能检查可见血小板减少、凝血因子 I 减少、凝血酶原时间延长。肾功能检查可见血肌酐和血尿素氮增高等改变。</p>\r
<p>2. 现场急救</p>\r
<p>(1)防止毒液扩散和吸收:伤者应立即减少活动,保持静止,就地取材,于伤口近心端缚扎,以阻止静脉血及淋巴回流(图3-7)。缚扎可持续8~10h,每隔15~30min放松1~2min,以免静脉过度瘀血使肢体受损。有条件者,在缚扎的同时用冰块敷于伤肢,可减轻疼痛并使血管及淋巴管收缩,减慢蛇毒的吸收速度。咬伤超过12h,不宜缚扎。</p>\r

<p style="text-align: center;">图3-7 局部缚扎</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540014-20-l.jpg" /><figcaption></figcaption></figure>\r
<p>(2) 冲洗伤口: 立即用清水、肥皂水或 1:5000 高锰酸钾溶液冲洗伤口及周围皮肤, 以洗掉伤口外表毒液, 切忌用嘴吸吮伤口。</p>\r
<p>(3) 排出毒液: 以齿痕为中心纵形切开, 长 1.5cm, 深至皮下 (此法禁用于血液毒素中毒), 然后用手从肢体的近心端向远心端及伤口周围反复挤压, 促使毒液从切开的伤口排出体外, 边挤压边用清水冲洗伤口, 冲洗及挤压排毒须持续 20 ~ 30min。如果随身携带茶杯可对伤口做拔火罐处理, 局部高温可使蛇毒蛋白凝固而丧失毒性。</p>\r
<p>考点提示:毒蛇咬伤的急救措施。</p>\r
<p>3. 护理措施</p>\r
<p>(1) 急救护理: 患者应卧床休息, 患肢制动, 尽可能放低伤口部位。缚扎伤肢每隔 15 ~ 30min 放松 1 ~ 2min, 一般在伤口排毒和服药后 1 ~ 3h 解除缚扎。积极配合医生进行伤口冲洗和排毒。</p>\r
<p>(2) 病情观察: 包括以下三方面。</p>\r
<p>1) 密切观察病情变化, 包括监测生命体征、神志、肝功能、肾功能、凝血功能等。</p>\r
<p>2) 观察缚扎肢体远端色泽、温度、动脉搏动等。</p>\r
<p>3) 观察伤口局部情况及皮肤黏膜有无出血点等。</p>\r
<p>(3)伤口护理:进行伤口湿敷时,要保持纱布湿润,血污较多时及时更换敷料。伤口周围红肿减退,伤口处流出的血液由暗红色转为鲜红色时,提示局部情况好转。</p>
\r
<p>(4) 全身护理: 具体如下。</p>\r
<p>1) 应用利尿剂: 应用利尿剂时, 注意预防水、电解质及酸碱平衡紊乱, 快速输液时应注意监测心、肺功能。</p>\r
<p>2) 应用抗蛇毒血清: 通常采用静脉注射, 注射前必须做皮肤过敏试验。方法: 取 0.1mL 抗蛇毒血清加 1.9mL 生理盐水(稀释 20 倍)。在前臂掌侧皮内注射 0.1mL, 经 20 ~ 30min, 注射皮丘直径在 2cm 以内且皮丘周围无红晕及伪足者为阴性反应。若注射部位出现皮丘增大、红肿、伪足或有痒感者, 为阳性反应, 应采用脱敏注射法。方法: 取生理盐水将抗蛇毒血清稀释 20 倍, 分数次做皮下注射, 每次观察 10 ~ 20min。第 1 次注射后, 如无反应, 可酌情增量注射。注射并观察 3 次以上, 无异常反应者, 即可做静脉注射、肌内注射或皮下注射。注射前将制品置于 37℃ 水浴中加温数分钟。注射时速度宜慢, 开始时不超过 1mL/min, 之后亦不宜超过 4mL/min。注射时如有异常反应, 应立即停止注射。</p>\r
<p>3) 对症及支持疗法护理: 鼓励患者多饮水, 对不能进食者给予静脉补液以利排毒, 并纠正水、电解质和酸碱平衡紊乱。合理选用抗生素预防感染, 并注射破伤风抗毒素以预防破伤风。同时积极预防休克及脏器功能衰竭。</p>\r
<p>4) 心理护理: 大部分毒蛇咬伤患者有恐惧心理, 精神紧张, 担心自己有生命危险。对这类患者, 应做好解释和安抚工作, 使患者放松心情, 保持镇静, 树立战胜疾病的信心, 积极配合治疗。</p>\r
<p>5) 健康教育: 野外或丛林作业者, 应随身携带抗蛇毒药物, 尽可能穿高筒靴、戴手套。在丛林密集处行走, 可先用木杆等拨开枝叶, 夜间带好手电筒等照明工具。</p>\r
<p>4. 护理评价</p>\r
<p>(1) 患者的情绪是否稳定, 是否有恐惧心理。</p>\r
<p>(2) 患者的伤口是否愈合。</p>\r
<p>(3) 患者是否出现并发症或已出现的并发症是否治愈。</p>\r
<p>考点提示:毒蛇咬伤患者的护理。</p>\r
<p>知识链接</p>\r
<p>蜂蜇伤</p>\r
<p>蜂蜇伤指被蜂尾蜇伤，毒液注入人体，或伴毒刺留皮内，以局部出现红肿、刺痛，甚至头晕、恶心等为主要表现的中毒性疾病。被少量蜂蜇伤一般无全身症状，被大量蜂蜇伤可导致大面积肿胀，偶可引起组织坏死，严重者甚至出现过敏性休克或急性肾衰竭。因此，需要根据蜂蜇伤的严重程度来进行治疗。</p>\r
<p>蜂毒主要成分为蚁酸、盐酸、组胺及神经毒素，可导致局部及全身症状。蜇伤部位红肿，中央可见的救护小黑点，多为刺伤点或毒刺存留部位，周围可有丹毒或荨麻疹样改变。全身症状一般不甚明显，但被群蜂蜇伤时症状较重，可出现头晕、头痛、寒战、发热、气喘、心率加快、血压下降甚至休克、昏迷等。</p>\r
<p>蜂蜇伤后的应急措施:小心拔除毒刺,如果伤口位于四肢,可以用绳子在伤口近心端扎紧,防止毒液经血液循环扩散,然后用手或其他器具挤压伤口周围,挤出部分血液后松开绳子。如果为蜜蜂蜇伤,可用浓肥皂水或碱水涂抹伤口,或用氨水、小苏打水清洗伤口,使酸性毒液被碱性液体中和,从而减轻症状。若为胡蜂蜇伤,则需要用食醋等酸性溶液清洗,其他紧急处理方法与蜜蜂蜇伤基本一致。简单处理之后若症状得不到缓解,应及时前往医院进一步治疗。</p>\r
<p>对有全身症状者，医护人员应根据病情予以对症处理。症状较轻者，给予对症治疗，如10%葡萄糖酸钙溶液静脉注射；有过敏反应时，应迅速给予肾上腺皮质激素、抗组胺药等；发生血红蛋白尿时，应用碱性药物碱化尿液，适当补液以增加尿量，并可用20%甘露醇利尿；发生少尿或无尿时，则按急性肾衰竭处理，对休克者要积极抢救；群蜂蜇伤或伤口感染时，应加用抗菌药物。</p>\r
<p>目标检测</p>\r
<p>1. 炼钢工人在工作中突然出现阵发性腹痛、双下肢肌肉痉挛, 最可能的诊断是( )。</p>\r
<p>A. 急性胰腺炎 B. 先兆中暑 C. 低血糖症</p>\r
<p>D.中暑痉挛 E.甲亢危象</p>\r

<p>2. 某患者烈日下工作 2h 后, 出现头晕、头痛、口渴、多汗、全身疲乏、心
悸、注意力不集中、动作不协调等症状, 血压 90/60mmHg。此时最佳的处理措施为( )。</p>\r
<p>A. 立即将患者搬离高温环境, 转移到通风阴凉处休息</p>\r
<p>B. 冰水浸浴 30min</p>\r
<p>C. 口服大量清凉饮料</p>\r
<p>D. 静脉滴注生理盐水</p>\r
<p>E. 快速送至医院</p>\r
<p>3. 对中暑患者进行体内降温时, 静脉快速输入液体的适宜温度为( )。</p>\r
<p>A. 4～10<sup>∘</sup>C B. 10～15<sup>∘</sup>C C. 15～20<sup>∘</sup>C</p>\r
<p>D. 20～25<sup>∘</sup>C E. 25～37<sup>∘</sup>C</p>\r
<p>4. 热痉挛最突出的表现为( )。</p>\r
<p>A. 腓肠肌痉挛、疼痛</p>\r
<p>B. 胸大肌痉挛、疼痛</p>\r
<p>C. 呼吸肌痉挛、疼痛</p>\r
<p>D. 肠道平滑肌痉挛、疼痛</p>\r
<p>E. 呕吐</p>\r
<p>5. 已适应高温环境的青壮年, 在剧烈体力劳动后大量排汗而自觉口渴, 大量饮水而盐分补充不足时发生腓肠肌痉挛性疼痛, 称为( )。</p>\r
<p>A. 热痉挛 B. 热衰竭 C. 中暑高热</p>\r
<p>D. 热射病 E. 中暑衰竭</p>\r
<p>6. 毒蛇咬伤的首要治疗原则是( )。</p>\r
<p>A. 尽快排出毒素</p>\r
<p>B. 迅速阻止蛇毒的吸收和扩散</p>\r
<p>C. 抗蛇毒治疗</p>\r
<p>D. 加强对症及支持治疗</p>\r
<p>E. 吸氧</p>\r
<p>7. 被咬伤后,蛇毒会在( )min 内迅速进入人体。</p>\r
<p>A. 3 ~ 5</p>\r
<p>B. 5 ~ 7</p>\r
<p>C. 7 ~ 9</p>\r
<p>D. 9 ~ 11</p>\r
<p>E. 11 ~ 13</p>\r
<p>8. 毒蛇咬伤后, 神经毒素发作的临床表现不包括( )。</p>\r
<p>A. 四肢无力</p>\r
<p>B. 言语不清</p>\r
<p>C. 吞咽困难</p>\r
<p>D. 伤口流血不止</p>\r
<p>E. 牙关紧闭</p>\r
<p>9. 下列关于海水淹溺特点的描述, 错误的是( )。</p>\r
<p>A. 血容量减少 B. 红细胞损害很小 C. 极少发生心室颤动</p>\r
<p>D. 血液浓缩 E. 低钠血症</p>\r
<p>10. 下列变化属于淡水淹溺的是( )。</p>\r
<p>A. 血液浓缩 B. 高钠血症 C. 高镁血症</p>\r
<p>D. 高钾血症 E. 高氯血症</p>\r
<p>11. 刘某, 男, 22 岁。在海中游泳时不慎溺水, 被救至岸边。查体: 神志不清, 口流海水, 呼吸微弱, 心率 45 次/分, 血压 90/60 mmHg。正确的处理措施是( )。</p>\r
<p>A. 立即呼叫 120</p>\r
<p>B. 立即头偏向一侧, 清除口腔异物, 吸氧</p>\r
<p>C. 立即进行心外按压</p>\r
<p>D. 立即监测生命体征</p>\r
<p>E. 以上均不正确</p>\r
<p>12. 下列关于淹溺院内救护的描述, 不正确的是( )</p>\r
<p>A. 检测有无低血容量 B. 给予低流量吸氧 C. 纠正酸碱失衡</p>\r
<p>D. 防治低体温 E. 对症处理</p>\r
<p>13. 下列不属于淡水淹溺表现的是( )。</p>\r
<p>A. 血容量增加</p>\r
<p>B. 红细胞损害减少</p>\r
<p>C. 血液稀释</p>\r
<p>D. 红细胞损害增加</p>\r
<p>E. 心室颤动</p>\r
<p>14. 高原环境、长期缺氧等都可造成( )明显增多,血液黏稠度升高。</p>\r
<p>A. 白细胞 B. 红细胞 C. 血小板</p>\r
<p>D. 血液中的二氧化碳 E. 血红蛋白</p>\r
<p>15. 下列不属于高原反应的是( )。</p>\r
<p>A. 心慌 B. 胸闷 C. 呼吸困难</p>\r
<p>D. 头痛 E. 行走困难</p>\r
<p>(刘向东 张云萍)</p>\r
`},{id:"module4-task3",title:"第三节 常见急症患者的救护",order:3,rawContent:`案例导学

王某，男，50岁。因头痛、头晕5年，加重2天入院。既往有高血压病史5年，一直服用“硝苯地平、卡托普利”治疗，但经常忘记服药。近日因工作繁忙，每天吸烟20余支，饮酒300~500mL，睡眠不足。昨日因情绪激动突感剧烈头痛、烦躁、眩晕、恶心、呕吐、胸闷、气急及视力模糊，于今日入院。查体：体温36.2℃，脉搏110次/分，呼吸30次/分，血压180/130mmHg。神志清，颈软，双肺呼吸音正常，心尖搏动位于左侧第6肋间锁骨中线外1cm，心率110次/分，律齐，主动脉瓣区第二心音亢进，可闻及收缩期杂音。腹软，双下肢无水肿。神经系统检查无异常。

请思考：

1. 该患者可能的诊断是什么？

2. 针对该患者应如何进行紧急救护？

一、意识障碍患者的救护

意识障碍(disturbance of consciousness)是多种原因引起的机体对自身和外界环境刺激的反应能力减弱或丧失,包括意识水平受损和意识内容的改变,是大脑功能紊乱所产生

思维导图

的严重症状之一。导致意识障碍的原因很多,患者病情变化快且临床表现复杂,因此需迅速作出判断并给予相应的抢救措施,以维持生命体征。同时进行重点问诊、体格检查、辅助检查,以明确病因,再针对病因进一步治疗和护理。

(一) 护理评估

1. 病因

(1)颅内疾病:具体如下。

1) 感染性疾病: 如细菌性脑膜炎(如流行性脑脊髓膜炎)、病毒性脑炎(如流行性乙型脑炎)、脑型疟疾等。

2) 脑血管疾病: 如脑出血、蛛网膜下腔出血、脑梗死等。

3) 颅内占位性疾病: 如脑肿瘤、脑寄生虫、脑内肉芽肿等。

4) 颅脑外伤: 如脑挫伤、颅内血肿、硬膜外血肿等。

5)其他:如高血压脑病、癫痫等。

(2)全身性疾病:具体如下。

1) 急性重症感染: 如败血症、中毒性菌痢、肺炎、伤寒等。

2) 内分泌及代谢障碍性疾病: 如糖尿病酮症酸中毒、自发性低血糖、慢性肾衰竭、肝性脑病、肺性脑病、甲状腺危象等。

3) 水、电解质平衡紊乱: 如低氯性碱中毒、高氯性酸中毒、稀释性低钠血症等。

4)中毒:如安眠药、酒精、有机磷、氰化物、一氧化碳、吗啡中毒等。

5) 物理性损害与缺氧性损害: 如急性中暑、溺水、触电等。

2. 临床表现

(1)生命体征:具体如下。

1) 体温: 体温升高提示有感染性或炎症性疾病。体温过高常见于中暑、脑干损害等。体温过低常见于休克、甲状腺功能减退、低血糖、冻伤或镇静药过量等。

2) 脉搏: 脉律不齐常见于心脏病变。脉搏微弱无力常见于休克或内出血等。脉率过快常见于休克、心力衰竭、高热、甲亢危象；脉率过缓常见于颅内压增高及阿－斯综合征。

3) 呼吸: 深而快的规律性呼吸常见于糖尿病酮症酸中毒; 浅而快的规律性呼吸见于休克、心肺疾患或安眠药中毒引起的呼吸衰竭。大脑半球广泛损害常引起潮式呼吸, 脑桥上部损害常引起长吸式呼吸等。

4) 血压: 血压过高常见于颅内压增高、高血压脑病或脑出血。血压过低常见于烧伤、脱水、休克、晕厥、安眠药中毒或深昏迷状态等。

(2)神经系统表现:具体如下。

1) 瞳孔: 双侧瞳孔散大可见于颠茄类、酒精、氰化物中毒; 双侧瞳孔缩小可见于吗啡、巴比妥类、有机磷农药中毒; 双侧瞳孔不等大可见于脑疝。

2) 肢体感觉、运动功能: 瘫痪可见于脑出血、脑梗死或颅内占位性病变; 肢体可随意运动, 对疼痛有躲避反应提示皮质脊髓束大致完整; 出现舞蹈样动作提示锥体束受损。

3) 神经反射和脑膜刺激征: 昏迷者出现病理征阳性, 提示锥体束受损; 脑膜刺激征可见于脑膜炎、蛛网膜下腔出血等。

(3) 意识障碍的程度: 目前常用以下方法评估。

1) 临床分类法: 主要根据患者对言语和各种刺激的反应
情况加以判断, 按其深浅程度或特殊表现分为轻度昏迷、中度昏迷、深度昏迷(表 3-7)。

表 3-7 意识障碍程度的鉴别

\r
2) 格拉斯哥昏迷评分法: 总分 3~15 分, 分数越高, 意识状态越好, 8 分以下为昏迷(详见第二章相关内容)。

考点提示: 意识障碍程度的判断。

3. 相关检查 一般先做常规检查,如血常规、尿常规、粪常规、血糖、电解质、心电图等,对诊断帮助较大。必要时检查血气分析、肝功能、肾功能、血氨、血清酶、脑脊液、B超、X线、头颅CT等。

4. 其他 患者及其家属的心理反应、配合程度和对疾病的认知状况等。

（二）急救与护理

1. 现场紧急救护 昏迷患者的急救原则主要是维持基本生命体征,避免脏器功能进一步损害,然后再采集病史和完成各种检查,尽早明确昏迷的原因,进行病因治疗。

(1)体位:迅速松解衣领,将患者置于平卧位,同时使头偏向一侧,防止舌后坠,必要时用舌钳将舌拉出,以防阻塞气道。

(2)保持气道通畅:昏迷患者因咳嗽和吞咽反射障碍,故呼吸道分泌物、呕吐物及其他异物极易阻塞呼吸道。可用压舌板或吸引器清理口腔内阻塞物,必要时可用喉镜取出咽喉部异物。对严重舌后坠的患者可去枕并垫高肩部使颈部伸展,使患者头部充分后仰,下颌前移,保持气道通畅。使用口咽通气管可有效防止牙齿和舌阻塞呼吸道。对呼吸道阻塞严重而以上方法不能奏效者可实施气管插管,必要时可行气管切开,以利于痰液的清除和呼吸机的使用,同时密切观察病情。对呼吸困难或缺氧者给予氧气吸入,纠正脑缺氧;对呼吸抑制者可用呼吸兴奋剂;对呼吸停止者可采用人工呼吸或机械通气。

(3)迅速建立静脉通道:以便给予各种抢救药物,保证脑部的血液供应并保持患者的血容量、血压处于正常水平。对休克、心律失常等其他循环障碍要及时予以纠正,对心搏骤停者要立即予以心肺复苏。

(4) 处理脑水肿: 阻止或减轻脑水肿的发生是昏迷患者抢救成功的关键。使用脱水剂时, 需保证患者有正常的循环功能和肾功能, 同时要注意水、电解质平衡。常用 20% 甘露醇 250mL 快速静脉滴注, 合并心脏病、肾功能不全的患者可选用呋塞米。发生脑外伤或炎症引起的脑水肿时, 可给予地塞米松等激素类药物静脉滴注。

(5) 控制抽搐和高热、预防感染: 持续抽搐会造成呼吸暂停, 加重脑缺氧, 应立即给予紧急处理。常用药物为地西泮(安定)10~20mg 静脉注射, 抽搐停止后再静脉滴注苯妥英钠 0.5~1g, 可在4~6h 内重复应用。对高热患者采用温水擦浴、冰袋、冰帽等物理降温措施, 将体温控制在 37℃ 左右。加强基础护理, 在进行各项护理操作时, 要严格遵守无菌技术操作规程, 避免不必要的感染。

2. 护理要点

(1) 病情观察: 详细记录并观察体温、脉搏、血压、呼吸、意识、瞳孔等指标变化。如患者出现呼吸不规则、脉搏减慢变弱、血压明显波动、体温骤然升高、瞳孔散大、对光反射消失等, 提示病情恶化, 须立即向医生汇报, 并迅速配合医生进行抢救。

(2)防止呼吸道阻塞及窒息:昏迷时,咽肌痉挛、舌根向后移位、颈肌或呼吸肌强直或痉挛、唾液分泌增多、胃内容物逆行均可引起呼吸运动受限及呼吸道阻塞,甚至窒息。因此,护士应积极做好呼吸道护理,如协助昏迷者取平卧位,头偏向一侧,防止呕吐物误吸造成窒息;帮助患者垫高肩部,使颈部舒展,防止舌后坠阻塞呼吸道;立即检查口腔、咽喉部及气管有无梗阻,及时清除口、鼻内分泌物;痰液黏稠时给予雾化吸入,用鼻导管或面罩吸氧;必要时需插入气管插管,采用机械通气。

(3)加强基础护理:具体如下。

1) 预防感染: 
每 2 ~ 3h 翻身、拍背一次, 并刺激患者咳嗽, 及时吸痰; 口腔护理每天 3 或 4 次, 为防止口、鼻干燥, 可用 0.9% 氯化钠溶液浸湿纱布覆盖口、鼻; 患者眼睑不能闭合时, 涂抗生素眼膏或用眼罩给予遮盖; 做好会阴护理, 通常昏迷患者需要留置导尿管, 应严格遵守无菌技术操作规程, 每日定时消毒尿道口, 并冲洗膀胱, 减少泌尿系统感染。

2) 预防压疮: 昏迷患者由于不能自主调整体位, 肢体长期受压容易发生压疮。护理人员应加强皮肤护理, 协助患者被动活动肢体, 定时翻身, 保持肢体功能位等。

(4)防止意外伤害:采取相应措施(如应用约束带保护、专人陪护等)防止由于躁动不安引起的摔跌、唇舌咬伤、颞颌关节脱臼及骨折等意外伤害;对抽搐患者及时使用牙垫,以防咬伤。

(5) 健康指导: 向患者及其家属宣传疾病的相关知识, 尽量避免原发病复发, 指导患者及其家属学会观察病情, 如出现恶化征象, 及时就诊。

考点提示: 意识障碍患者的护理。

(三) 护理评价

(1) 患者的意识障碍是否减轻。

(2) 患者的生命体征是否恢复正常。

(3) 患者有无出现长期卧床引起的并发症。

(4) 患者有无受到意外伤害。

(5) 判断患者及其家属对原发病的认知程度。

知识链接

特殊类型的意识障碍——去皮质综合征

意识障碍按严重程度可分为嗜睡、昏睡、昏迷。昏迷分为浅昏迷、中昏迷、深昏迷。特殊类型的意识障碍还包括去皮质综合征、无动性缄默症、持续性植物状态。

去皮质综合征是一种特殊类型的意识障碍。它与昏迷不同，是大脑皮质受到严重、广泛损害，功能丧失，而大脑皮质下及脑干功能仍然保存的一种特殊状态。患者有觉醒和睡眠周期。觉醒时睁开眼睛，各种生理反射（如瞳孔对光反射、角膜反射、吞咽反射、咳嗽反射）存在，喂之能吃，貌似清醒，但缺乏意识活动，故有“瞪目昏迷”“醒状昏迷”之称。这类患者可长期存活，常见于各种急性缺氧、缺血性脑病、癫痫大发作持续状态、各种脑炎、严重颅脑外伤后。

二、高热患者的救护

发热是许多疾病所共有的病理过程。人体体温可以通过腋窝温度、口腔温度、直肠温度表示，正常情况下(成人)腋窝温度为36.1~37℃，口腔温度为36.3~37.2℃，直肠温度比口腔温度高 0.3～0.5∘C ，直肠温度最接近体核温度。以口腔温度为标准，发热可分为低热（37.3～38℃）、中度发热（38.1～39℃）、高热（39.1～41℃）和超高热（41℃以上）。由于引起高热的原因复杂，病情变化快，故护士需全面评估、仔细分析。

(一) 护理评估

1. 病因 根据致热原的性质和来源不同,可分为感染性发热和非感染性发热。

(1) 感染性发热: 是临床上最常见的发热病因, 以细菌感染占多数, 病毒次之。

1) 细菌感染: 如细菌性脓肿、感染性心内膜炎、牙源性感染、肾盂肾炎、肺外结核、李斯特菌病、布鲁氏菌病、军团菌病、伤寒、非结核分枝杆菌感染等。

2) 病毒感染: 如病毒性肝炎、流行性乙型脑炎、流行性出血热、流行性感冒、麻疹、脊髓灰质炎等。

3) 真菌感染: 如曲霉病、念珠菌病、隐球菌病、肺孢子菌肺炎等。

4) 寄生虫感染: 如阿米巴病、弓形虫病、疟疾、包虫病等。

5)其他:如支原体肺炎、立克次体病、钩端螺旋体病等。

(2)非感染性发热:为非病原体引起的发热。

1) 自身免疫性疾病: 如系统性红斑狼疮、颞动脉炎、风湿性多肌痛、皮肌炎、多肌炎、白塞综合征、强直性脊柱炎、自身免疫性肝炎、混合性结缔组织病、风湿热等。

2) 自身炎症性疾病: 如克罗恩病、溃疡性结肠炎、斯蒂尔病、噬血细胞综合征、痛风等。

3) 肿瘤性疾病: 如急性髓系白血
病、淋巴瘤、多发性骨髓瘤、骨髓增生异常综合征、浆细胞瘤等, 以及乳腺癌、结肠癌、肝癌、肾细胞癌、胰腺癌、中枢神经系统肿瘤等。

4) 其他: 如药物热、亚急性甲状腺炎、急性播散性脑脊髓炎、过敏性肺炎、亚急性坏死性淋巴结炎等。

2. 临床表现

(1)发热分期:一般包括3个时期。

1) 体温上升期: 常有畏寒、寒战、乏力、皮肤干燥、肌肉酸痛等。体温上升表现为以下两种方式: ①骤升, 指体温在数小时内达到 39∘ C 或以上, 多伴有寒战, 见于肺炎球菌性肺炎、疟疾、急性肾盂肾炎等; ②缓升, 指体温在数日内缓缓上升达高峰, 不伴有寒战, 见于伤寒、结核病、布鲁氏菌病等。

2) 高热持续期: 体温上升至高峰后, 在较高水平保持一定的时间, 此期可持续数小时(如疟疾)、数日(如肺炎球菌性肺炎、流感)或数周(如伤寒), 患者可有皮肤潮红、灼热, 呼吸、心率加快, 出汗等症状。

3) 体温下降期: 病因消除后, 致热原的作用减弱或消失, 体温中枢的体温调定点逐渐降至正常水平, 体温恢复正常。体温下降表现为以下两种方式: ①骤降, 指体温在数小时内迅速降至正常水平, 有时甚至略低于正常, 常伴大汗, 见于急性肾盂肾炎、疟疾、肺炎球菌性肺炎等; ②渐降, 指体温在数日内逐渐下降至正常, 如伤寒、风湿热等。

考点提示:发热的3个时期。

(2) 热型: 包括以下 6 种类型。

1) 稽留热: 体温可达 39～40∘C , 持续数天或数周, 24h 内体温波动范围不超过 1∘C 。该热型常见于肺炎球菌性肺炎、斑疹伤寒和伤寒的高热期。

2) 弛张热: 体温达 39∘ C 以上, 24h 内体温波动范围超过 2∘ C。该热型常见于化脓性炎症、重症肺结核等。

3) 间歇热: 体温骤升达高峰后持续数小时, 又迅速降至正常水平, 无热期可持续 1 天至数天, 如此反复交替出现。该热型常见于疟疾、急性肾盂肾炎等。

4) 波状热: 体温逐渐升高达 39∘ C 或以上, 持续数天后逐渐下降至正常水平, 数天后再度逐渐升高, 如此周而复始反复多次。该热型常见于布鲁氏菌病。

5) 回归热: 体温骤升至 39∘ C 或以上, 持续数天后又逐渐下降至正常水平, 数天后再逐渐升高, 如此反复多次。该热型常见于回归热、霍奇金病、周期热等。

6) 不规则热: 发热无任何规律。该热型常见于结核病、风湿热、渗出性胸膜炎、支气管肺炎等。

考点提示:发热常见的热型。

(3)伴随症状:具体如下。

1) 寒战: 可见于肺炎球菌性肺炎、急性胆囊炎、急性肾盂肾炎等。

2) 结膜充血: 可见于麻疹、流行性出血热、咽结膜热、斑疹伤寒等。

3) 单纯疱疹: 可见于肺炎球菌性肺炎、流行性脑脊髓膜炎、间日疟、流行性感冒等。

4) 淋巴结肿大: 可见于传染性单核细胞增多症、风疹、淋巴结结核、白血病、淋巴瘤等。

5) 肝脾大: 可见于病毒性肝炎、肝及胆道感染、布鲁氏菌病等。

6) 皮肤黏膜出血: 可见于流行性出血热、急性白血病、重症再生障碍性贫血等。

7) 关节肿痛: 可见于猩红热、风湿热、痛风等。

8) 皮疹: 可见于麻疹、水痘、斑疹伤寒、药物热等。

9)昏迷:可见于流行性乙型脑炎、流行性脑脊髓膜炎、中毒性菌痢、中暑等。

3. 相关检查 常规检查如血常规、尿常规、粪常规、血清电解质、血清酶、红细胞沉降率,必要时做胸腔积液、腹水、心包积液、脑脊液、关节腔积液检查及免疫学检查等；还可行咽喉部、尿道、肛门、阴道、子宫颈及血液等标本的细菌或病毒培养；其他检查包括 X 线、CT、MRI、超声、内镜等。

4. 其他 患者及其家属的心理反应、配合程度和对疾病的认知状况等。

(二)急救与护理

1. 急救处理

(1) 降温: 迅速而有效地将体温降至 38.5∘ C 是抢救高热和超高热患者的关键措施。

1) 物理降温: 为首选降温措施
, 适用于高热且循环良好的患者。具体方法有: ①冰敷, 超高热危象可在头部、腋下、腹股沟等大动脉处放置冰袋或使用冰帽。②32~34℃温水擦浴, 对寒战、患者的救护四肢厥冷者, 应防止寒冷刺激而加重血管收缩。③冰水擦浴或盆浴, 对中暑和某些麻醉药所致的恶性高热患者, 可用冰水擦浴, 或将患者放在冰水浴盆中, 同时按摩四肢以促进血液循环, 以利于散热。④用25%~35%、30℃左右的酒精进行擦浴。⑤用4℃的生理盐水1000~1500mL快速静脉滴注或用冰盐水灌肠、洗胃等。

注意事项:①擦浴时自上而下,由患者耳后颈部开始,直至患者皮肤发红,体温降至38.5℃左右。②在短时间内勿将体温降得过低,以防患者发生虚脱。③酒精擦浴以轻拍的方式进行,勿用摩擦的方式(摩擦易产热)。④在患者腋窝、肘窝、腹股沟等血管丰富处应适当延长擦浴时间,以利于散热。⑤禁拭患者颈后、心前区、腹部和足底。⑥伴皮肤感染或有出血倾向者,不宜擦浴。⑦注意通风,夏季应降低室温。⑧遵循热者冷降,冷者温降的原则。

2) 药物降温: 应谨慎使用, 只有物理降温效果不理想时, 才考虑在物理降温的同时使用药物降温。常见药物及方法有以下几种。①吲哚美辛(消炎痛): 采用口服、鼻饲或栓剂肛内留置, 对某些不易控制的长期发热和癌症发热有效。②肾上腺皮质激素: 有扩张血管、稳定体温调节中枢、控制炎症反应、抑制致热原、降低颅内压、防治脑水肿的作用, 常用的药物有地塞米松、氢化可的松。③冬眠疗法: 对烦躁、惊厥的患者, 可在物理降温的基础上尽早使用冬眠疗法。常用的药物有异丙嗪、氯丙嗪、哌替啶。使用时要密切观察患者生命体征的变化, 每隔 30min 评估一次患者的神志、瞳孔大小、对光反射、肢体运动和各种反射, 以了解冬眠的深度。

(2)镇静解痉:为防止身体继续大量产热,减轻脏器功能受损,常选用镇静解痉药物(如地西泮)静脉注射。

(3)纠正水、电解质与酸碱平衡紊乱:鼓励患者多饮水或静脉补充水分和电解质,以保证组织器官充足的血液灌注,加快散热,同时应注意纠正酸中毒、低血钾、低血钙等。

(4)病因治疗:①对细菌感染性疾病者应早期、足量应用敏感抗生素,对颅内疾病所致发热者应加强抗脑水肿的治疗,对甲亢危象导致发热者应迅速给予抗甲状腺药物。②对高度怀疑的疾病可做诊断性治疗,注意诊断性治疗用药要有目的、有步骤、按计划进行,做到“用药有指征,停药有依据”,切忌盲目滥用。③对原因不明的发热者应进一步观察和检查,若体温稳定不超过38.5℃,可不必再做退热处理,以便细致观察热型并进一步做其他检查,明确病因。

2. 护理要点

(1) 密切观察病情: 保持呼吸道通畅, 吸氧(氧流量为 2~4L/min)。注意患者的神志、体温、脉搏、呼吸、血压、末梢循环的变化, 尤其是体温的变化。注意患者伴随症状的变化, 如面色、神志, 有无寒战、大汗等, 发现异常及时告知医生, 以协助诊断和治疗。准确记录出入量, 特别是大汗的患者, 以防发生脱水。

(2) 卧床休息: 高热时新陈代谢加快, 进食减少, 消耗增加, 卧床休息能减少能量消耗, 有利于机体恢复。护士应为患者提供温度适宜、安静舒适、通风良好的室内环境。

(3) 营养支持: 鼓励患者多饮水, 进食高热量、高蛋白、高维生素、易消化的流质或半流质饮食; 对不能进食者给予静脉输液或鼻饲，以补充水分、电解质和营养物质。

(4) 基础护理: 及时更换衣服、被褥, 保持皮肤清洁、干燥。卧床患者要定时翻身, 防止发生压疮。防止口唇干裂和口腔黏膜溃烂, 做好口腔护理。

(5)心理护理:及时疏导,减轻患者焦虑、恐惧情绪,以配合治疗。

考点提示:高热患者的急救与护理。

(三) 护理评价

(1) 患者的体温是否恢复正常。

(2) 水、电解质及酸碱平衡是否恢复。

(3) 患者有无伴随症状, 如关节肿痛、皮疹、昏迷等。

(4) 判断患者及其家属对高热的认知程度。

三、急性胸痛患者的救护\r
胸痛是指各种因素刺激胸部感觉神经纤维,产生痛觉冲动,传至大脑皮质痛觉中枢而引起的胸前区不适。急性胸痛是临床上最常见的症状之一,是一些致命性疾病的主要临床表现。因此,及时、准确诊断胸痛是非常紧急和重要的。

思维导图

(一) 护理评估

1. 病因 胸痛的病因涉及多个器官及系统,主要原因为胸部疾病。紧急的致命性疾病如急性冠状动脉综合征、主动脉夹层、心脏压塞、急性肺栓塞、张力性气胸、食管撕裂等。非致命性疾病如肥厚型心肌病、稳定型心绞痛、急性心包炎、心肌炎、二尖瓣脱垂、带状疱疹、肋间神经炎、肺炎、胸膜炎、纵隔炎、纵隔肿瘤等。

2. 临床表现

(1)胸痛:具体如下。

1) 疼痛部位: 内脏痛和躯体痛不论疼痛源自什么部位, 最终均由躯体神经或内脏神经受到刺激产生疼痛。躯体神经分布于皮肤和壁层胸膜, 疼痛剧烈, 疼痛常可准确定位; 内脏神经往往对疼痛感觉模糊, 疼痛不易定位, 并且经常牵涉邻近部位。①胸壁病变: 疼痛固定于病变部位, 如带状疱疹、肋骨骨折等。②胸膜病变: 疼痛位于病变胸侧。③肺尖部肺癌: 疼痛位于肩部及腋下, 向上肢内侧放射。④心绞痛和心肌梗死: 疼痛位于胸骨体上段或中段之后, 向左肩和左臂内侧放射。⑤食管和纵隔疾病: 疼痛位于胸骨后。

2) 胸痛的特征: 胸痛的程度可呈轻微痛、隐痛或剧痛。①带状疱疹: 呈刀割样、烧灼样或触电样剧痛。②胸膜炎: 呈隐痛、钝痛或刺痛, 呼吸、咳嗽时加剧, 屏气时减轻。③自发性气胸: 屏气或剧烈咳嗽时突然发生撕裂样剧烈疼痛, 伴气急、发绀。④心绞痛: 劳累和精神紧张时诱发, 呈压迫性不适或紧缩感、压榨感, 休息或含服硝酸甘油后缓解。

考点提示:胸痛的特征。

(2)呼吸困难:具体如下。

1) 症状: 引起呼吸困难的原发病不同, 其主要症状和伴随症状也不同。当患者出现不能解释的呼吸困难、胸痛、咳嗽, 同时存在深静脉血栓等高危因素时, 应高度怀疑急性肺栓塞的可能。急性起病, 呼吸急促和(或)呼吸窘迫, 顽固性低氧血症, 常规给氧方式不能缓解, 出现非心源性肺水肿时, 可判断为 ARDS; 呼吸困难伴有突发一侧胸痛, 呈针刺样或刀割样疼痛, 有时向患侧肩部放射时, 常提示气胸。

2) 体征: 通过观察胸廓外形、呼吸肌活动情况、有无“三凹征”和颈静脉充盈、触摸脉率及胸部叩诊、听诊来评估患者的体征。肺栓塞患者可有颈静脉充盈, 肺部可闻及局部湿啰音和哮鸣音, 肺动脉瓣区第二心音亢进或分裂，严重时血压下降甚至休克。患侧胸廓饱满、叩诊呈鼓音、听诊呼吸音减弱或消失时应考虑气胸。

(3)伴随症状或体征:具体如下。

1) 咳嗽、咳痰或咯血: 多提示肺部疾病, 如肺栓塞、肺结核、肺癌等。

2) 吞咽困难: 多提示食管疾病, 如食管癌、反流性食管炎等。

3) 面色苍白、血压下降及休克表现: 多见于急性冠脉综合征、主动脉夹层、主动脉窦瘤破裂、肺栓塞等。

3. 相关检查 ①常规检查: 如心电图检查、超声心动图等。②血液生化检查: 如心肌酶、D-二聚体、红细胞沉降率等。③影像学检查: 如 X 线、CT、MRI、超声、内镜等检查。

4. 其他 患者及其家属的心理反应、配合程度和对疾病的认知状况等。

(二)急救与护理

1. 急性胸痛的救护 通过病情评估来分析急性胸痛的严重程度,迅速识别致命性胸痛,根据不同病因进行针对性救治(图 3-8)。

2. 呼吸困难的救护

(1)体位:协助患者取合适体位,减轻呼吸困难。如急性左心衰竭、严重哮喘、肺气肿患者取坐位或半卧位;肋骨骨折患者取健侧卧位;胸腔积液患者取患侧卧位;急性呼吸窘迫综合征患者取平卧位。

(2)保持呼吸道通畅:有效清除气道分泌物,增加肺泡通气量,可协助患者咳嗽、咳痰,给予翻身、拍背,指导患者做深呼吸和有效的咳痰动作;进行雾化吸入,以湿润呼吸道、稀释痰液;必要时
建立人工气道,给予机械通气进行辅助呼吸。

(3) 吸氧: 一般经鼻导管或面罩吸氧。吸氧浓度根据呼吸困难(缺氧)程度进行调整, 使动脉血氧分压 >60mmHg, 或动脉血氧饱和度 >90%。有效的吸氧可改善机体缺氧状态, 增加患者活动的耐受性和治疗的信心, 帮助患者保持镇静, 消除紧张、恐惧情绪。

(4)应用呼吸兴奋剂:呼吸兴奋剂能改善通气,但同时可增加耗氧量及二氧化碳的产生量。静脉滴注时速度不宜过快,同时注意观察患者的治疗反应,如出现心悸、烦躁、面色潮红、肌肉颤动、惊厥等药物过量表现时,应立即减慢滴速或停药并通知医生。

3. 护理要点

(1)一般护理:嘱患者减少活动,卧床休息,采取舒适体位,如侧卧位、半坐卧位、坐位等以减轻疼痛或防止疼痛加重;选择清淡易消化的饮食,少食多餐。若为心源性胸痛,应绝对卧床休息,禁吸烟、饮酒,低盐饮食,保持大便通畅。

(2) 病情观察: 观察胸痛的部位、特征、程度、加重和缓解因素; 注意观察生命体征、心电图、血氧饱和度等情况。如出现呼吸困难、血压降低, 应立即建立静脉通路, 并报告医生, 采取相应的抢救措施。

(3)缓解疼痛:应针对病因采取不同措施,如对胸部活动引起剧烈疼痛者,可用15cm宽胶布固定患侧胸部,减小呼吸幅度;或在咳嗽、深呼吸、活动时用手按压疼痛部位制动,以缓解疼痛。当剧烈疼痛或持续性疼痛影响休息时,按医嘱给予镇痛剂和镇静剂。对心血管疾病引起的胸痛患者,病情较重时立即给予吸氧,按医嘱给予硝酸酯类、吗啡、溶栓剂、 β 受体阻滞剂、钙拮抗剂等,以改善心肌供血,缓解疼痛。

(4)用药护理:遵医嘱准确给药,给药前应明确药物的剂量、给药途径、适应证、禁忌证等,观察药物的疗效、不良反应和有无依赖性。

(5)心理护理:关心、爱护患者,向患者及其家属解释胸痛的原因及缓解疼痛的方法;若为致命性胸痛,在急救过程中注意患者的情绪反应,安慰、鼓励患者,以取得配合。

\r
注：ACS为急性冠状动脉综合征，STEMI为ST段抬高型心肌梗死，NSTEMI为非ST段抬高型心肌梗死，AAD为急性主动脉夹层，APE为急性肺栓塞，ECMO为体外膜氧合器。

图3-8 急性胸痛诊疗流程图

(三) 护理评价

(1) 患者的胸痛症状是否缓解。

(2) 患者能否完成指定的身体活动。

(3) 患者有无并发症发生。

(4) 判断患者及其家属对胸痛的认知程度。

知识链接

胸痛中心建设

胸痛中心是整合医院内外多学科医疗资源、采用标准化诊治流程、强调以患者为中心的胸痛救治平台。通过信息共享、多学科协作诊疗(multidisciplinary team, MDT)等多种模式，胸痛中心的建设将保障急性胸痛患者到达医院后获得早期评估、危险分层、正确分流与合理救治，避免高危患者漏诊，使其得到及时诊断、及时治疗，并尽可能减少低危患者住院检查和治疗的医疗费用。

1981年，美国巴尔地摩St.Angle医院建立了全球第一家胸痛中心。目前全球多个国家的医院都已设立胸痛中心。2010年，《胸痛中心建设中国专家共识》的正式发布，标志着我国“胸痛中心”建设正式起步。2011年3月，广州军区广州总医院(现中国人民解放军南部战区总医院)宣布我国首个区域军民协同远程胸痛急救网正式投入运营。2013年9月，“中国胸痛中心认证标准”发布，成为继美国、德国之后第3个拥有“胸痛中心”建设标准的国家。

四、急性腹痛患者的救护

急性腹痛是指各种原因引起的腹部突发性疼痛,是临床上常见的急性症状之一,具有起病急、发展快、病情重、变化多和病因复杂等特点。若延误诊治则极易发生严重后果,危及患者生命。

(一) 护理评估

1. 病因 引起急性腹痛的病因复杂多样,原发病变多位于腹部,其他部位的疾病和全身性疾病亦可引起急性腹痛。

(1)腹部病变:具体如下。

1) 急性炎症: 如急性胃肠炎、急性阑尾炎、
急性胆囊炎、急性胰腺炎、急性腹膜炎等。

2) 胃肠穿孔或瘘: 如消化道溃疡穿孔及胃癌术后吻合口瘘, 可造成胃肠液、胆汁、胰液外漏, 进而引起急性化学性和(或)细菌性腹膜炎。

3) 脏器阻塞或扭转: 常见于急性肠梗阻、肠扭转、胆管结石、胆道蛔虫病、泌尿道结石、卵巢囊肿蒂扭转等。

4) 脏器破裂出血: 如外伤致肝破裂、脾破裂、异位妊娠破裂等, 以失血表现为主, 可有不同程度的腹膜刺激征。

5) 脏器肿瘤: 如肝癌、胃癌、肠癌等, 肿瘤生长侵及感觉神经, 可引起腹痛。

6) 血管病变: 较少见, 见于肠系膜动脉栓塞、门静脉栓塞、脾梗死、肾梗死等, 引起的腹痛相当剧烈。

7) 腹壁疾病: 如腹壁挫伤、脓肿等。

(2)腹外脏器病变及全身性疾病:具体如下。

1) 胸部疾病: 如急性心肌梗死、急性心包炎等。胸膜炎、大叶性肺炎、气胸等可引起上腹部牵涉痛。

2) 中毒、代谢性疾病及电解质紊乱: 如铅、汞中毒, 糖尿病酮症酸中毒, 尿毒症, 低钾血症, 低钠血症等, 可引起痉挛性腹痛。

3) 神经源性疾病: 可引起功能性腹痛, 如脊柱结核、末梢神经炎、腹型癫痫、带状疱疹等。

2. 临床表现

(1)腹痛发生方式:腹痛开始时较轻,以后逐渐加重,多提示炎症性病变;腹痛突然发生,迅速加重，多见于脏器梗阻、扭转、穿孔、破裂等。

(2)腹痛部位:具体如下。

1) 腹部病变: 最初疼痛部位多位于原发病灶, 如肝、胆病变所致疼痛多在右上腹; 异位妊娠破裂及盆腔炎、痛经等疼痛位于下腹部; 急性阑尾炎常表现为转移性右下腹痛; 弥漫性或部位不定的疼痛见于急性弥漫性腹膜炎、机械性肠梗阻、急性出血性坏死性肠炎、肠穿孔等。

2) 腹外脏器病变: 胸部脏器病变引起的腹痛, 多以上腹部为主; 全身性病变所致腹痛则多以脐周或弥漫性腹痛为主。

(3)腹痛性质:腹痛的性质常反映病变的类型,且腹痛性质的变化可提示病变发展情况。

1) 持续性胀痛或隐痛: 一般提示炎症性或出血性病变, 如阑尾炎、胰腺炎、脾破裂出血等。

2) 阵发性绞痛: 由平滑肌痉挛所致, 见于空腔脏器发生痉挛或梗阻性病变时, 如机械性肠梗阻、胆囊结石、输尿管结石等, 其特点是突然发作, 疼痛剧烈, 呈阵发性, 有缓解期。

3) 持续性疼痛伴阵发性加重: 常提示炎症与梗阻并存, 如胆囊结石合并胆道感染等; 开始为阵发性绞痛, 之后转为持续性胀痛, 则提示空腔脏器的梗阻已并发炎症或已发生血运障碍。

4) 放射痛: 某些急性腹痛常有特定部位的放射痛, 如胆管疾病、右膈下脓肿等引起的腹痛可放射至右肩部; 急性胰腺炎时, 腹痛多向腰背部或左肩放射; 肾绞痛可放射至同侧下腹部、外生殖器及大腿内侧。

(4) 腹痛程度: 腹痛的程度与患者的敏感度、病变性质及刺激物种类有关。①胃肠道穿孔所致的腹痛最剧烈, 呈持续性刀割样。②梗阻性疾病引起的腹痛也较剧烈且呈阵发性加重, 如肠扭转、卵巢囊肿蒂扭转等。③老年人对疼痛敏感性降低, 同样疾病所致的腹痛较青年人轻或无痛。④癔症性腹痛、腹型癫痫, 尽管没有或仅有轻度病理改变, 引起的腹痛却很剧烈。

(5)伴随症状:腹痛时常伴有恶心、呕吐、食欲缺乏、腹胀、腹泻、便秘等症状。如伴呕吐及腹泻,提示可能存在肠道感染;伴呕吐而无排便和排气,提示可能存在肠梗阻;伴黄疸,提示可能存在胆道系统病变、急性溶血等;伴尿频、尿急、血尿,提示可能存在泌尿系统疾病;伴寒战、高热,提示可能存在炎症,多见于急性化脓性胆囊炎、急性阑尾炎、肝脓肿、膈下脓肿,也可见于腹腔外感染性疾病(如肺炎等);伴休克,提示可能存在腹腔内出血和感染等。

(6)体格检查:具体如下。

1) 视诊: 注意观察腹部形态及腹式呼吸运动, 如急性胃穿孔者常呈舟状腹, 腹式呼吸消失; 肠扭转者腹部可不对称; 肠梗阻者
可见肠型或异常蠕动波。

2) 听诊: 肠鸣音亢进、有气过水声常提示机械性肠梗阻; 急性腹膜炎时, 肠鸣音减弱或消失; 上腹部振水音提示幽门梗阻或胃扩张。

3) 叩诊: 胃肠道穿孔时肝浊音界缩小或消失; 腹膜炎渗出或腹腔内出血较多时可有移动性浊音。

4) 触诊: 腹部压痛明显处常是原发病灶所在处。若有腹膜刺激征, 应了解其部位、范围及程度; 触及腹部包块时, 注意其部位、大小、形状、质地、活动度等。

考点提示:急性腹痛的评估内容。

3. 相关检查

(1)实验室检查:包括以下4项。①血常规:白细胞总数和中性粒细胞增高多见于各种感染性疾病,血红蛋白和红细胞计数降低见于出血性疾病。②尿常规:尿中大量红细胞提示泌尿系统疾病。③粪常规:血便提示存在消化道出血;糊状或水样便,含少量红细胞、白细胞提示可能为细菌性食物中毒;黏液脓血便提示可能为痢疾。④生化检查:人绒毛膜促性腺激素测定有利于异位妊娠的诊断,血、尿或腹水淀粉酶增高常提示急性胰腺炎。

(2) 影像学检查: ①X 线检查, 腹部立位平片见膈下游离气体, 提示胃肠穿孔; 若肠管内存在多个气液平面,提示机械性肠梗阻。②B超、CT检查可显示肝、胆、胰腺、子宫及附件和膀胱等脏器的形态,对腹水、结石、占位性病变、异位妊娠等也有诊断价值。

(3) 内镜检查: 对胃、十二指肠、胆及胰腺等脏器病变有较好的诊断价值。

(4)诊断性腹腔穿刺:对急性腹痛的诊断具有重要意义,是外科急腹症常用的检查手段。根据穿刺液的性质可判断病变的部位和性质。

4. 其他 急性腹痛往往给患者及其家属造成极大的恐惧或焦虑,应注意患者及其家属的心理反应、配合程度及对疾病的认知状况。

(二)急救与护理

1. 腹痛的救治 引起急性腹痛的病因虽然不同,但救治原则基本相似,即挽救生命、减轻痛苦、积极对因治疗和预防并发症。

(1) 非手术治疗: 指征与措施如下。

1) 指征: ①就诊时腹膜炎已经局限, 且患者全身情况良好。②诊断不明确, 且无紧急手术指征。③出血性疾病, 经过输血治疗, 患者血压回升, 病情稳定, 无再出血征象。④诊断明确, 非手术治疗疗效明显。⑤患者病情危重, 全身情况极差或合并重要器官功能不全, 不能耐受手术。

2) 措施: ①禁饮食, 必要时给予有效胃肠减压。②抗休克。③维持水、电解质及酸碱平衡, 补充营养。④控制感染。⑤对症处理, 高热时采用物理降温或使用解热镇痛剂, 疼痛剧烈时给予解痉药; 若为急性胰腺炎, 应使用抑制胰腺分泌的药物。⑥对危重患者进行重症监护。

(2) 手术治疗: 是急性腹痛重要的治疗手段。有手术指征时, 如存在肠梗阻、急性化脓性阑尾炎等, 应及时手术治疗。

(3) 剖腹探查: 适用于不能确诊的急腹症患者。适应证包括: ①突发剧烈腹痛持续数小时, 非手术治疗无效或病情进行性加重。②腹膜刺激征明显而范围继续扩大, 病因不明。③腹腔内不明原因的活动性出血, 进行性加重。④空腔脏器穿孔严重, 腹膜炎弥散。⑤存在绞窄性肠梗阻、肠坏死。⑥并发急性梗阻性化脓性胆管炎等。

2. 护理要点

(1)紧急护理措施:应首先处理威胁生命的情况。①对腹痛伴休克者,应及时配合医生进行抢救,如迅速建立静脉通路,及时补液等。②对急腹症伴呕吐者,应将其头偏向一侧,以防误吸。③对病因未明者,遵医嘱积极做好术前准备。

(2)饮食管理及胃肠减压:①病情较轻且无禁忌证者,可给予少量流质或半流质饮食。②对病因未明或病情较重者,应立即禁饮食。③对于胃肠道穿孔及急性肠梗阻者,应禁食并给予胃肠减压。④对于病情严重,预计较长时间不能进食者,应给予肠外营养。

(3) 病情观察: 急性腹痛病情发展快、变化多。护士应密切观察病情, 发现患者出现病情恶化, 如腹痛加重、腹膜炎范围扩大等情况, 应及时通知医生处理。

(4) 疼痛护理: 对诊断明确的单纯性胆
绞痛、肾绞痛患者可给予解痉药物; 对诊断不明或治疗方案未确定者应禁用吗啡、哌替啶类麻醉性镇痛药, 以免掩盖病情。可采取适当措施帮助患者缓解疼痛, 如安慰患者、安置舒适体位、指导患者转移注意力等。

(5) 卧床休息: 指导患者采取舒适体位卧床休息。病情允许时取半卧位, 以降低腹壁张力, 减轻疼痛, 利于腹腔液体引流至盆腔, 减少毒素的吸收及发生膈下积液的机会等。

(6)遵循“四禁”原则:未确诊病因的急腹症患者,在非手术治疗期间需遵循“四禁”原则,即禁饮食、禁灌肠、禁导泻、禁镇痛。在此期间应密切观察患者病情变化,积极配合医生做好相应的护理工作。

(7)术前准备:遵医嘱积极治疗原发病,并做好必要的术前准备。

(8) 基础护理: 对伴有高热者, 可用药物降温或物理降温, 以减轻患者的不适; 对神志不清或躁动者, 做好保护性约束。

(9) 健康指导: 适当向患者及其家属介绍急性腹痛的原因、病情转归和目前的治疗及护理计划, 解释有关检查的目的、方法和注意事项, 说明饮食管理、胃肠减压、疼痛护理的原则和必要性, 以获得患者及其家属的理解与配合。

考点提示:急性腹痛患者的护理。

(三) 护理评价

(1) 患者的疼痛是否减轻。

(2) 水、电解质及酸碱平衡是否恢复。

(3) 患者有无并发症发生。

(4) 患者的营养状况是否良好。

(5) 判断患者及其家属对腹痛的认知程度。

五、高血压危象患者的救护

高血压危象(hypertensive crisis)指原发性高血压和继发性高血压的发展过程中,在某些诱因的作用下使外周小动脉发生暂时性强烈痉挛而引起血压急剧升高、病情急剧恶化及由高血压引起的心脏、脑、肾等主要靶器官功能严重受损的并发症。

(一) 护理评估

1. 病因和诱因 其病因尚不明确,可能有多种复杂的神经、体液及内分泌因素参与其中,这些因素引起的不同病理生理改变在疾病的进展过程中相互促进,形成恶性循环。其基本机制为由于肾素-血管紧张素系统、压力性利钠等综合因素的作用,导致终末器官灌注减少和功能损伤,最终诱发靶器官功能损伤。在应激(如情绪激动、精神创伤)等诱因的作用下,交感神经兴奋,缩血管活性物质激活、释放增加,导致短期内血压急剧升高。

导致血压急剧升高的常见原因包括:①停用或未按医嘱服用降压药。②服用影响降压药代谢的药物(如非甾体抗炎药、止痛药等)。③服用拟交感毒性药物(如可卡因、麦角酸二乙基酰胺等)。④严重外伤、手术。⑤急性感染。⑥急、慢性疼痛。⑦急性尿潴留。⑧情绪激动、精神紧张。⑨对伴随的危险因素(如吸烟、肥胖导致的高胆固醇血症等)控制不佳。

2. 临床表现

(1) 主要表现: 短时间内血压急剧升高, 伴有明显的头晕、头痛、眩晕、视物模糊与视力障碍、烦躁、胸痛、呼吸困难等表现。此外, 还可能出现一些不典型的临床表现, 如胃肠道症状 (如腹痛、恶心、厌食) 等。

(2)高血压相关靶器官功能损害表现:具体如下。

1) 高血压脑病: 精神状态改变(如嗜睡、意识模糊、昏迷)、严重头痛、癫痫发作、呕吐和视觉障碍。

2) 急性冠状动脉综合征: 急性胸痛、胸闷、放射性肩背痛、咽部紧缩感、烦躁、大汗、心悸; 部分患者的心电图有缺血表现; 心肌梗死患者可出现心肌损伤标志物阳性。

3) 主动脉夹层: 撕裂样胸背部疼痛, 双侧上肢血压测量值不一致。因波及的血管范围不同, 故临床表现也不同。

4) 急性心力衰竭: 呼吸困难、发绀、咳粉红色泡沫样痰; 肺部可闻及啰音, 心界扩大, 心率增快并出现奔马律等。

5)脑卒中:包括脑梗死、脑出血、蛛网膜下腔出血。①脑梗死:表现为失语、面舌瘫、偏身感觉障碍、肢体瘫痪、意识障碍、癫痫发作。②脑出血：表现为头痛、喷射性呕吐、不同程度的意识障碍、偏瘫、失语等，起病后有进行性加重表现。③蛛网膜下腔出血：表现为剧烈头痛、恶心、呕吐；颈背部疼痛、意识障碍、抽搐、偏瘫、失语及脑膜刺激征阳性。

6) 急性肾功能不全: 可出现少尿或无尿、蛋白尿、血尿、管型尿; 血浆尿素氮及肌酐显著升高。

考点提示:高血压相关靶器官功能损害的表现。

3. 相关检查 高血压危象发作时, 血尿素氮、肌酐、肾上腺素、去甲肾上腺素含
量均增高, 血糖也可升高, 尿中出现少量红细胞和蛋白。

4. 其他 因病情严重,患者常出现焦虑、恐惧心理,担心疾病会影响日后的生活、工作,而这些心理负担又会使血压产生波动,从而影响治疗效果。

(二)急救与护理

遵循“先救命后治病”的原则,对高血压危象患者应给予紧急降压治疗,以减少对高血压相关靶器官功能的损害。

1. 紧急降压 高血压危象相关靶器官损害的降压原则与药物选择见表 3-8。

表 3-8 高血压危象相关靶器官损害的降压原则与药物选择

\r
注：MAP 为平均动脉压，ACEI 为血管紧张素转换酶抑制药，ARB 为血管紧张素Ⅱ受体阻滞药。2. 一般护理 在维持生命体征稳定的前提下,积极给予吸氧,嘱患者安静休息。监测生命体征,维持水、电解质平衡,防治并发症,酌情使用有效镇静剂。

3. 护理要点

(1) 病情观察: 有条件者应立即转入重症监护病房, 严密监测血压、心率、呼吸、神志、瞳孔及心、肾功能的变化。

(2)休息与体位:保持环境安静,患者应绝对卧床休息,抬高床头 30∘ ,以利于降低血压。

(3) 对症护理: 对缺氧者及早给予吸氧; 对抽搐、躁动者加强保护, 防止坠床, 遵医嘱给予地西泮、巴比妥类镇静药物; 对高血压脑病者迅速给予甘露醇、山梨醇或呋塞米等, 以减轻脑水肿, 降低颅内压。

(4)饮食指导:意识不清、抽搐者应禁食,以防窒息及吸入性肺炎,待病情稳定后可给予鼻饲。饮食上以低盐、低脂、低胆固醇,富含维生素、钾、镁的饮食为主。

(5) 心理护理: 焦虑、恐惧不利于血压的稳定, 甚至可能加重病情, 护士应注意保持患者情绪稳定, 加强心理支持, 使患者积极配合治疗, 将血压控制在安全范围内。

(三) 护理评价

(1) 患者的血压是否降低。

(2)患者的大脑功能是否恢复正常,有无遗留大脑功能障碍。

(3)有无并发症发生,如急性肺水肿、急性冠状动脉综合征、急性肾衰竭等。

(4) 患者的营养状态是否良好。

(5) 判断患者及其家属对高血压危象的认知程度。

素质拓展

医学家孙思邈:对待患者一视同仁

孙思邈在长期的实践中，形成了一整套高标准的医德规范。其中很重要的一条就是“皆如至亲之想”，意思是说，对待患者要像对待亲人一样。他说：“若有疾厄来求救者，不得问其贵贱贫富，长幼妍蚩，怨亲善友，华夷愚智，普同一等，皆如至亲之想。”孙思邈声望很高，每到一处，患者就蜂拥而至，不论在乡村，还是在闹市，都是如此。他以高度的同情心和责任感，对患者一视同仁，不顾饥渴疲劳，莫不一一救治，他这种高尚的医德，得到了人民的赞颂。

目标检测

1. 深度昏迷与中度昏迷最有价值的鉴别点是( )。

A. 各种刺激无反应 B. 不能唤醒 C. 无自主运动

D. 深浅反射均消失 E. 以上均不对

2. 下列不属于非感染性发热的是( )。

A. 心力衰竭 B. 恶性肿瘤 C. 风湿热

D. 支气管肺炎 E. 脑出血

3.昏迷伤员在搬运途中应取( )。

A. 仰卧位, 下肢屈曲

B. 中凹卧位

C. 平卧位, 头偏向一侧

D. 仰卧位\r
E. 半坐卧位

4. 患者,男,58岁。因胸闷、气短3天后出现心前区疼痛,以“心绞痛”收入院,问诊时应重点注意( )。

A. 疼痛的性质和部位 B. 有无发热 C. 用药史

D. 既往健康状况 E. 家族健康史

5. 患者, 女, 45 岁。反复发作上腹痛 7 年, 晚上饱餐后, 突发上腹剧痛, 腹肌紧张, 出冷汗, 休克, 首先应考虑( )。

A. 大出血

B. 消化性溃疡急性穿孔

C. 急性胰腺炎

D. 幽门梗阻

E. 急性阑尾炎

6. 高血压危象的典型表现不包括( )。

A. 头晕

B. 头痛

C. 视物模糊与视力障碍

D. 恶心、呕吐

E. 烦躁、胸痛、呼吸困难

7. 急性腹痛应遵循“四禁”原则。“四禁”不包括( )。

A.禁饮食 B.禁灌肠 C.禁导泻 D.禁镇痛 E.禁活动

8.急性左心衰竭、严重哮喘、肺气肿患者应取( )。

A. 平卧位

B. 坐位或半卧位

C. 健侧卧位

D. 患侧卧位

E. 俯卧位

9. 胸腔积液患者应取( )。

A. 平卧位

B. 坐位或半卧位

C. 健侧卧位

D. 患侧卧位

E. 俯卧位

10. 肋骨骨折患者应取( )。

A. 平卧位

B. 坐位或半卧位

C. 健侧卧位

D. 患侧卧位

E. 俯卧位

(任冬 张云萍)`,rawHtml:`<p>案例导学</p>\r
<p>王某，男，50岁。因头痛、头晕5年，加重2天入院。既往有高血压病史5年，一直服用“硝苯地平、卡托普利”治疗，但经常忘记服药。近日因工作繁忙，每天吸烟20余支，饮酒300~500mL，睡眠不足。昨日因情绪激动突感剧烈头痛、烦躁、眩晕、恶心、呕吐、胸闷、气急及视力模糊，于今日入院。查体：体温36.2℃，脉搏110次/分，呼吸30次/分，血压180/130mmHg。神志清，颈软，双肺呼吸音正常，心尖搏动位于左侧第6肋间锁骨中线外1cm，心率110次/分，律齐，主动脉瓣区第二心音亢进，可闻及收缩期杂音。腹软，双下肢无水肿。神经系统检查无异常。</p>\r
<p>请思考：</p>\r
<p>1. 该患者可能的诊断是什么？</p>\r
<p>2. 针对该患者应如何进行紧急救护？</p>\r
<p>一、意识障碍患者的救护</p>\r
<p>意识障碍(disturbance of consciousness)是多种原因引起的机体对自身和外界环境刺激的反应能力减弱或丧失,包括意识水平受损和意识内容的改变,是大脑功能紊乱所产生</p>\r
<p>思维导图</p>\r
<p>的严重症状之一。导致意识障碍的原因很多,患者病情变化快且临床表现复杂,因此需迅速作出判断并给予相应的抢救措施,以维持生命体征。同时进行重点问诊、体格检查、辅助检查,以明确病因,再针对病因进一步治疗和护理。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 病因</p>\r
<p>(1)颅内疾病:具体如下。</p>\r
<p>1) 感染性疾病: 如细菌性脑膜炎(如流行性脑脊髓膜炎)、病毒性脑炎(如流行性乙型脑炎)、脑型疟疾等。</p>\r
<p>2) 脑血管疾病: 如脑出血、蛛网膜下腔出血、脑梗死等。</p>\r
<p>3) 颅内占位性疾病: 如脑肿瘤、脑寄生虫、脑内肉芽肿等。</p>\r
<p>4) 颅脑外伤: 如脑挫伤、颅内血肿、硬膜外血肿等。</p>\r
<p>5)其他:如高血压脑病、癫痫等。</p>\r
<p>(2)全身性疾病:具体如下。</p>\r
<p>1) 急性重症感染: 如败血症、中毒性菌痢、肺炎、伤寒等。</p>\r
<p>2) 内分泌及代谢障碍性疾病: 如糖尿病酮症酸中毒、自发性低血糖、慢性肾衰竭、肝性脑病、肺性脑病、甲状腺危象等。</p>\r
<p>3) 水、电解质平衡紊乱: 如低氯性碱中毒、高氯性酸中毒、稀释性低钠血症等。</p>\r
<p>4)中毒:如安眠药、酒精、有机磷、氰化物、一氧化碳、吗啡中毒等。</p>\r
<p>5) 物理性损害与缺氧性损害: 如急性中暑、溺水、触电等。</p>\r
<p>2. 临床表现</p>\r
<p>(1)生命体征:具体如下。</p>\r
<p>1) 体温: 体温升高提示有感染性或炎症性疾病。体温过高常见于中暑、脑干损害等。体温过低常见于休克、甲状腺功能减退、低血糖、冻伤或镇静药过量等。</p>\r
<p>2) 脉搏: 脉律不齐常见于心脏病变。脉搏微弱无力常见于休克或内出血等。脉率过快常见于休克、心力衰竭、高热、甲亢危象；脉率过缓常见于颅内压增高及阿－斯综合征。</p>\r
<p>3) 呼吸: 深而快的规律性呼吸常见于糖尿病酮症酸中毒; 浅而快的规律性呼吸见于休克、心肺疾患或安眠药中毒引起的呼吸衰竭。大脑半球广泛损害常引起潮式呼吸, 脑桥上部损害常引起长吸式呼吸等。</p>\r
<p>4) 血压: 血压过高常见于颅内压增高、高血压脑病或脑出血。血压过低常见于烧伤、脱水、休克、晕厥、安眠药中毒或深昏迷状态等。</p>\r
<p>(2)神经系统表现:具体如下。</p>\r
<p>1) 瞳孔: 双侧瞳孔散大可见于颠茄类、酒精、氰化物中毒; 双侧瞳孔缩小可见于吗啡、巴比妥类、有机磷农药中毒; 双侧瞳孔不等大可见于脑疝。</p>\r
<p>2) 肢体感觉、运动功能: 瘫痪可见于脑出血、脑梗死或颅内占位性病变; 肢体可随意运动, 对疼痛有躲避反应提示皮质脊髓束大致完整; 出现舞蹈样动作提示锥体束受损。</p>\r
<p>3) 神经反射和脑膜刺激征: 昏迷者出现病理征阳性, 提示锥体束受损; 脑膜刺激征可见于脑膜炎、蛛网膜下腔出血等。</p>\r
<p>(3) 意识障碍的程度: 目前常用以下方法评估。</p>\r
<p>1) 临床分类法: 主要根据患者对言语和各种刺激的反应
情况加以判断, 按其深浅程度或特殊表现分为轻度昏迷、中度昏迷、深度昏迷(表 3-7)。</p>\r
<p style="text-align: center;">表 3-7 意识障碍程度的鉴别</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540015-1-l.jpg" /><figcaption></figcaption></figure>\r
<p>2) 格拉斯哥昏迷评分法: 总分 3~15 分, 分数越高, 意识状态越好, 8 分以下为昏迷(详见第二章相关内容)。</p>\r
<p>考点提示: 意识障碍程度的判断。</p>\r
<p>3. 相关检查 一般先做常规检查,如血常规、尿常规、粪常规、血糖、电解质、心电图等,对诊断帮助较大。必要时检查血气分析、肝功能、肾功能、血氨、血清酶、脑脊液、B超、X线、头颅CT等。</p>\r
<p>4. 其他 患者及其家属的心理反应、配合程度和对疾病的认知状况等。</p>\r
<p>（二）急救与护理</p>\r
<p>1. 现场紧急救护 昏迷患者的急救原则主要是维持基本生命体征,避免脏器功能进一步损害,然后再采集病史和完成各种检查,尽早明确昏迷的原因,进行病因治疗。</p>\r
<p>(1)体位:迅速松解衣领,将患者置于平卧位,同时使头偏向一侧,防止舌后坠,必要时用舌钳将舌拉出,以防阻塞气道。</p>\r
<p>(2)保持气道通畅:昏迷患者因咳嗽和吞咽反射障碍,故呼吸道分泌物、呕吐物及其他异物极易阻塞呼吸道。可用压舌板或吸引器清理口腔内阻塞物,必要时可用喉镜取出咽喉部异物。对严重舌后坠的患者可去枕并垫高肩部使颈部伸展,使患者头部充分后仰,下颌前移,保持气道通畅。使用口咽通气管可有效防止牙齿和舌阻塞呼吸道。对呼吸道阻塞严重而以上方法不能奏效者可实施气管插管,必要时可行气管切开,以利于痰液的清除和呼吸机的使用,同时密切观察病情。对呼吸困难或缺氧者给予氧气吸入,纠正脑缺氧;对呼吸抑制者可用呼吸兴奋剂;对呼吸停止者可采用人工呼吸或机械通气。</p>\r

<p>(3)迅速建立静脉通道:以便给予各种抢救药物,保证脑部的血液供应并保持患者的血容量、血压处于正常水平。对休克、心律失常等其他循环障碍要及时予以纠正,对心搏骤停者要立即予以心肺复苏。</p>\r
<p>(4) 处理脑水肿: 阻止或减轻脑水肿的发生是昏迷患者抢救成功的关键。使用脱水剂时, 需保证患者有正常的循环功能和肾功能, 同时要注意水、电解质平衡。常用 20% 甘露醇 250mL 快速静脉滴注, 合并心脏病、肾功能不全的患者可选用呋塞米。发生脑外伤或炎症引起的脑水肿时, 可给予地塞米松等激素类药物静脉滴注。</p>\r
<p>(5) 控制抽搐和高热、预防感染: 持续抽搐会造成呼吸暂停, 加重脑缺氧, 应立即给予紧急处理。常用药物为地西泮(安定)10~20mg 静脉注射, 抽搐停止后再静脉滴注苯妥英钠 0.5~1g, 可在4~6h 内重复应用。对高热患者采用温水擦浴、冰袋、冰帽等物理降温措施, 将体温控制在 37℃ 左右。加强基础护理, 在进行各项护理操作时, 要严格遵守无菌技术操作规程, 避免不必要的感染。</p>\r
<p>2. 护理要点</p>\r
<p>(1) 病情观察: 详细记录并观察体温、脉搏、血压、呼吸、意识、瞳孔等指标变化。如患者出现呼吸不规则、脉搏减慢变弱、血压明显波动、体温骤然升高、瞳孔散大、对光反射消失等, 提示病情恶化, 须立即向医生汇报, 并迅速配合医生进行抢救。</p>\r
<p>(2)防止呼吸道阻塞及窒息:昏迷时,咽肌痉挛、舌根向后移位、颈肌或呼吸肌强直或痉挛、唾液分泌增多、胃内容物逆行均可引起呼吸运动受限及呼吸道阻塞,甚至窒息。因此,护士应积极做好呼吸道护理,如协助昏迷者取平卧位,头偏向一侧,防止呕吐物误吸造成窒息;帮助患者垫高肩部,使颈部舒展,防止舌后坠阻塞呼吸道;立即检查口腔、咽喉部及气管有无梗阻,及时清除口、鼻内分泌物;痰液黏稠时给予雾化吸入,用鼻导管或面罩吸氧;必要时需插入气管插管,采用机械通气。</p>\r
<p>(3)加强基础护理:具体如下。</p>\r
<p>1) 预防感染: 
每 2 ~ 3h 翻身、拍背一次, 并刺激患者咳嗽, 及时吸痰; 口腔护理每天 3 或 4 次, 为防止口、鼻干燥, 可用 0.9% 氯化钠溶液浸湿纱布覆盖口、鼻; 患者眼睑不能闭合时, 涂抗生素眼膏或用眼罩给予遮盖; 做好会阴护理, 通常昏迷患者需要留置导尿管, 应严格遵守无菌技术操作规程, 每日定时消毒尿道口, 并冲洗膀胱, 减少泌尿系统感染。</p>\r
<p>2) 预防压疮: 昏迷患者由于不能自主调整体位, 肢体长期受压容易发生压疮。护理人员应加强皮肤护理, 协助患者被动活动肢体, 定时翻身, 保持肢体功能位等。</p>\r
<p>(4)防止意外伤害:采取相应措施(如应用约束带保护、专人陪护等)防止由于躁动不安引起的摔跌、唇舌咬伤、颞颌关节脱臼及骨折等意外伤害;对抽搐患者及时使用牙垫,以防咬伤。</p>\r
<p>(5) 健康指导: 向患者及其家属宣传疾病的相关知识, 尽量避免原发病复发, 指导患者及其家属学会观察病情, 如出现恶化征象, 及时就诊。</p>\r
<p>考点提示: 意识障碍患者的护理。</p>\r
<p>(三) 护理评价</p>\r
<p>(1) 患者的意识障碍是否减轻。</p>\r
<p>(2) 患者的生命体征是否恢复正常。</p>\r
<p>(3) 患者有无出现长期卧床引起的并发症。</p>\r
<p>(4) 患者有无受到意外伤害。</p>\r
<p>(5) 判断患者及其家属对原发病的认知程度。</p>\r
<p>知识链接</p>\r
<p>特殊类型的意识障碍——去皮质综合征</p>\r
<p>意识障碍按严重程度可分为嗜睡、昏睡、昏迷。昏迷分为浅昏迷、中昏迷、深昏迷。特殊类型的意识障碍还包括去皮质综合征、无动性缄默症、持续性植物状态。</p>\r
<p>去皮质综合征是一种特殊类型的意识障碍。它与昏迷不同，是大脑皮质受到严重、广泛损害，功能丧失，而大脑皮质下及脑干功能仍然保存的一种特殊状态。患者有觉醒和睡眠周期。觉醒时睁开眼睛，各种生理反射（如瞳孔对光反射、角膜反射、吞咽反射、咳嗽反射）存在，喂之能吃，貌似清醒，但缺乏意识活动，故有“瞪目昏迷”“醒状昏迷”之称。这类患者可长期存活，常见于各种急性缺氧、缺血性脑病、癫痫大发作持续状态、各种脑炎、严重颅脑外伤后。</p>\r
<p>二、高热患者的救护</p>\r
<p>发热是许多疾病所共有的病理过程。人体体温可以通过腋窝温度、口腔温度、直肠温度表示，正常情况下(成人)腋窝温度为36.1~37℃，口腔温度为36.3~37.2℃，直肠温度比口腔温度高 0.3～0.5<sup>∘</sup>C ，直肠温度最接近体核温度。以口腔温度为标准，发热可分为低热（37.3～38℃）、中度发热（38.1～39℃）、高热（39.1～41℃）和超高热（41℃以上）。由于引起高热的原因复杂，病情变化快，故护士需全面评估、仔细分析。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 病因 根据致热原的性质和来源不同,可分为感染性发热和非感染性发热。</p>\r
<p>(1) 感染性发热: 是临床上最常见的发热病因, 以细菌感染占多数, 病毒次之。</p>\r
<p>1) 细菌感染: 如细菌性脓肿、感染性心内膜炎、牙源性感染、肾盂肾炎、肺外结核、李斯特菌病、布鲁氏菌病、军团菌病、伤寒、非结核分枝杆菌感染等。</p>\r
<p>2) 病毒感染: 如病毒性肝炎、流行性乙型脑炎、流行性出血热、流行性感冒、麻疹、脊髓灰质炎等。</p>\r
<p>3) 真菌感染: 如曲霉病、念珠菌病、隐球菌病、肺孢子菌肺炎等。</p>\r
<p>4) 寄生虫感染: 如阿米巴病、弓形虫病、疟疾、包虫病等。</p>\r
<p>5)其他:如支原体肺炎、立克次体病、钩端螺旋体病等。</p>\r
<p>(2)非感染性发热:为非病原体引起的发热。</p>\r
<p>1) 自身免疫性疾病: 如系统性红斑狼疮、颞动脉炎、风湿性多肌痛、皮肌炎、多肌炎、白塞综合征、强直性脊柱炎、自身免疫性肝炎、混合性结缔组织病、风湿热等。</p>\r

<p>2) 自身炎症性疾病: 如克罗恩病、溃疡性结肠炎、斯蒂尔病、噬血细胞综合征、痛风等。</p>\r
<p>3) 肿瘤性疾病: 如急性髓系白血
病、淋巴瘤、多发性骨髓瘤、骨髓增生异常综合征、浆细胞瘤等, 以及乳腺癌、结肠癌、肝癌、肾细胞癌、胰腺癌、中枢神经系统肿瘤等。</p>\r
<p>4) 其他: 如药物热、亚急性甲状腺炎、急性播散性脑脊髓炎、过敏性肺炎、亚急性坏死性淋巴结炎等。</p>\r
<p>2. 临床表现</p>\r
<p>(1)发热分期:一般包括3个时期。</p>\r
<p>1) 体温上升期: 常有畏寒、寒战、乏力、皮肤干燥、肌肉酸痛等。体温上升表现为以下两种方式: ①骤升, 指体温在数小时内达到 39<sup>∘</sup> C 或以上, 多伴有寒战, 见于肺炎球菌性肺炎、疟疾、急性肾盂肾炎等; ②缓升, 指体温在数日内缓缓上升达高峰, 不伴有寒战, 见于伤寒、结核病、布鲁氏菌病等。</p>\r
<p>2) 高热持续期: 体温上升至高峰后, 在较高水平保持一定的时间, 此期可持续数小时(如疟疾)、数日(如肺炎球菌性肺炎、流感)或数周(如伤寒), 患者可有皮肤潮红、灼热, 呼吸、心率加快, 出汗等症状。</p>\r
<p>3) 体温下降期: 病因消除后, 致热原的作用减弱或消失, 体温中枢的体温调定点逐渐降至正常水平, 体温恢复正常。体温下降表现为以下两种方式: ①骤降, 指体温在数小时内迅速降至正常水平, 有时甚至略低于正常, 常伴大汗, 见于急性肾盂肾炎、疟疾、肺炎球菌性肺炎等; ②渐降, 指体温在数日内逐渐下降至正常, 如伤寒、风湿热等。</p>\r
<p>考点提示:发热的3个时期。</p>\r
<p>(2) 热型: 包括以下 6 种类型。</p>\r
<p>1) 稽留热: 体温可达 39～40<sup>∘</sup>C , 持续数天或数周, 24h 内体温波动范围不超过 1<sup>∘</sup>C 。该热型常见于肺炎球菌性肺炎、斑疹伤寒和伤寒的高热期。</p>\r
<p>2) 弛张热: 体温达 39<sup>∘</sup> C 以上, 24h 内体温波动范围超过 2<sup>∘</sup> C。该热型常见于化脓性炎症、重症肺结核等。</p>\r
<p>3) 间歇热: 体温骤升达高峰后持续数小时, 又迅速降至正常水平, 无热期可持续 1 天至数天, 如此反复交替出现。该热型常见于疟疾、急性肾盂肾炎等。</p>\r
<p>4) 波状热: 体温逐渐升高达 39<sup>∘</sup> C 或以上, 持续数天后逐渐下降至正常水平, 数天后再度逐渐升高, 如此周而复始反复多次。该热型常见于布鲁氏菌病。</p>\r
<p>5) 回归热: 体温骤升至 39<sup>∘</sup> C 或以上, 持续数天后又逐渐下降至正常水平, 数天后再逐渐升高, 如此反复多次。该热型常见于回归热、霍奇金病、周期热等。</p>\r
<p>6) 不规则热: 发热无任何规律。该热型常见于结核病、风湿热、渗出性胸膜炎、支气管肺炎等。</p>\r
<p>考点提示:发热常见的热型。</p>\r
<p>(3)伴随症状:具体如下。</p>\r
<p>1) 寒战: 可见于肺炎球菌性肺炎、急性胆囊炎、急性肾盂肾炎等。</p>\r
<p>2) 结膜充血: 可见于麻疹、流行性出血热、咽结膜热、斑疹伤寒等。</p>\r
<p>3) 单纯疱疹: 可见于肺炎球菌性肺炎、流行性脑脊髓膜炎、间日疟、流行性感冒等。</p>\r
<p>4) 淋巴结肿大: 可见于传染性单核细胞增多症、风疹、淋巴结结核、白血病、淋巴瘤等。</p>\r
<p>5) 肝脾大: 可见于病毒性肝炎、肝及胆道感染、布鲁氏菌病等。</p>\r
<p>6) 皮肤黏膜出血: 可见于流行性出血热、急性白血病、重症再生障碍性贫血等。</p>\r
<p>7) 关节肿痛: 可见于猩红热、风湿热、痛风等。</p>\r
<p>8) 皮疹: 可见于麻疹、水痘、斑疹伤寒、药物热等。</p>\r
<p>9)昏迷:可见于流行性乙型脑炎、流行性脑脊髓膜炎、中毒性菌痢、中暑等。</p>\r
<p>3. 相关检查 常规检查如血常规、尿常规、粪常规、血清电解质、血清酶、红细胞沉降率,必要时做胸腔积液、腹水、心包积液、脑脊液、关节腔积液检查及免疫学检查等；还可行咽喉部、尿道、肛门、阴道、子宫颈及血液等标本的细菌或病毒培养；其他检查包括 X 线、CT、MRI、超声、内镜等。</p>\r
<p>4. 其他 患者及其家属的心理反应、配合程度和对疾病的认知状况等。</p>\r
<p>(二)急救与护理</p>\r
<p>1. 急救处理</p>\r
<p>(1) 降温: 迅速而有效地将体温降至 38.5<sup>∘</sup> C 是抢救高热和超高热患者的关键措施。</p>\r
<p>1) 物理降温: 为首选降温措施
, 适用于高热且循环良好的患者。具体方法有: ①冰敷, 超高热危象可在头部、腋下、腹股沟等大动脉处放置冰袋或使用冰帽。②32~34℃温水擦浴, 对寒战、患者的救护四肢厥冷者, 应防止寒冷刺激而加重血管收缩。③冰水擦浴或盆浴, 对中暑和某些麻醉药所致的恶性高热患者, 可用冰水擦浴, 或将患者放在冰水浴盆中, 同时按摩四肢以促进血液循环, 以利于散热。④用25%~35%、30℃左右的酒精进行擦浴。⑤用4℃的生理盐水1000~1500mL快速静脉滴注或用冰盐水灌肠、洗胃等。</p>\r
<p>注意事项:①擦浴时自上而下,由患者耳后颈部开始,直至患者皮肤发红,体温降至38.5℃左右。②在短时间内勿将体温降得过低,以防患者发生虚脱。③酒精擦浴以轻拍的方式进行,勿用摩擦的方式(摩擦易产热)。④在患者腋窝、肘窝、腹股沟等血管丰富处应适当延长擦浴时间,以利于散热。⑤禁拭患者颈后、心前区、腹部和足底。⑥伴皮肤感染或有出血倾向者,不宜擦浴。⑦注意通风,夏季应降低室温。⑧遵循热者冷降,冷者温降的原则。</p>\r
<p>2) 药物降温: 应谨慎使用, 只有物理降温效果不理想时, 才考虑在物理降温的同时使用药物降温。常见药物及方法有以下几种。①吲哚美辛(消炎痛): 采用口服、鼻饲或栓剂肛内留置, 对某些不易控制的长期发热和癌症发热有效。②肾上腺皮质激素: 有扩张血管、稳定体温调节中枢、控制炎症反应、抑制致热原、降低颅内压、防治脑水肿的作用, 常用的药物有地塞米松、氢化可的松。③冬眠疗法: 对烦躁、惊厥的患者, 可在物理降温的基础上尽早使用冬眠疗法。常用的药物有异丙嗪、氯丙嗪、哌替啶。使用时要密切观察患者生命体征的变化, 每隔 30min 评估一次患者的神志、瞳孔大小、对光反射、肢体运动和各种反射, 以了解冬眠的深度。</p>\r

<p>(2)镇静解痉:为防止身体继续大量产热,减轻脏器功能受损,常选用镇静解痉药物(如地西泮)静脉注射。</p>\r
<p>(3)纠正水、电解质与酸碱平衡紊乱:鼓励患者多饮水或静脉补充水分和电解质,以保证组织器官充足的血液灌注,加快散热,同时应注意纠正酸中毒、低血钾、低血钙等。</p>\r
<p>(4)病因治疗:①对细菌感染性疾病者应早期、足量应用敏感抗生素,对颅内疾病所致发热者应加强抗脑水肿的治疗,对甲亢危象导致发热者应迅速给予抗甲状腺药物。②对高度怀疑的疾病可做诊断性治疗,注意诊断性治疗用药要有目的、有步骤、按计划进行,做到“用药有指征,停药有依据”,切忌盲目滥用。③对原因不明的发热者应进一步观察和检查,若体温稳定不超过38.5℃,可不必再做退热处理,以便细致观察热型并进一步做其他检查,明确病因。</p>\r
<p>2. 护理要点</p>\r
<p>(1) 密切观察病情: 保持呼吸道通畅, 吸氧(氧流量为 2~4L/min)。注意患者的神志、体温、脉搏、呼吸、血压、末梢循环的变化, 尤其是体温的变化。注意患者伴随症状的变化, 如面色、神志, 有无寒战、大汗等, 发现异常及时告知医生, 以协助诊断和治疗。准确记录出入量, 特别是大汗的患者, 以防发生脱水。</p>\r
<p>(2) 卧床休息: 高热时新陈代谢加快, 进食减少, 消耗增加, 卧床休息能减少能量消耗, 有利于机体恢复。护士应为患者提供温度适宜、安静舒适、通风良好的室内环境。</p>\r
<p>(3) 营养支持: 鼓励患者多饮水, 进食高热量、高蛋白、高维生素、易消化的流质或半流质饮食; 对不能进食者给予静脉输液或鼻饲，以补充水分、电解质和营养物质。</p>\r
<p>(4) 基础护理: 及时更换衣服、被褥, 保持皮肤清洁、干燥。卧床患者要定时翻身, 防止发生压疮。防止口唇干裂和口腔黏膜溃烂, 做好口腔护理。</p>\r
<p>(5)心理护理:及时疏导,减轻患者焦虑、恐惧情绪,以配合治疗。</p>\r
<p>考点提示:高热患者的急救与护理。</p>\r
<p>(三) 护理评价</p>\r
<p>(1) 患者的体温是否恢复正常。</p>\r
<p>(2) 水、电解质及酸碱平衡是否恢复。</p>\r
<p>(3) 患者有无伴随症状, 如关节肿痛、皮疹、昏迷等。</p>\r
<p>(4) 判断患者及其家属对高热的认知程度。</p>\r
<p>三、急性胸痛患者的救护<
/p>\r
<p>胸痛是指各种因素刺激胸部感觉神经纤维,产生痛觉冲动,传至大脑皮质痛觉中枢而引起的胸前区不适。急性胸痛是临床上最常见的症状之一,是一些致命性疾病的主要临床表现。因此,及时、准确诊断胸痛是非常紧急和重要的。</p>\r
<p>思维导图</p>\r
<p>(一) 护理评估</p>\r
<p>1. 病因 胸痛的病因涉及多个器官及系统,主要原因为胸部疾病。紧急的致命性疾病如急性冠状动脉综合征、主动脉夹层、心脏压塞、急性肺栓塞、张力性气胸、食管撕裂等。非致命性疾病如肥厚型心肌病、稳定型心绞痛、急性心包炎、心肌炎、二尖瓣脱垂、带状疱疹、肋间神经炎、肺炎、胸膜炎、纵隔炎、纵隔肿瘤等。</p>\r
<p>2. 临床表现</p>\r
<p>(1)胸痛:具体如下。</p>\r
<p>1) 疼痛部位: 内脏痛和躯体痛不论疼痛源自什么部位, 最终均由躯体神经或内脏神经受到刺激产生疼痛。躯体神经分布于皮肤和壁层胸膜, 疼痛剧烈, 疼痛常可准确定位; 内脏神经往往对疼痛感觉模糊, 疼痛不易定位, 并且经常牵涉邻近部位。①胸壁病变: 疼痛固定于病变部位, 如带状疱疹、肋骨骨折等。②胸膜病变: 疼痛位于病变胸侧。③肺尖部肺癌: 疼痛位于肩部及腋下, 向上肢内侧放射。④心绞痛和心肌梗死: 疼痛位于胸骨体上段或中段之后, 向左肩和左臂内侧放射。⑤食管和纵隔疾病: 疼痛位于胸骨后。</p>\r
<p>2) 胸痛的特征: 胸痛的程度可呈轻微痛、隐痛或剧痛。①带状疱疹: 呈刀割样、烧灼样或触电样剧痛。②胸膜炎: 呈隐痛、钝痛或刺痛, 呼吸、咳嗽时加剧, 屏气时减轻。③自发性气胸: 屏气或剧烈咳嗽时突然发生撕裂样剧烈疼痛, 伴气急、发绀。④心绞痛: 劳累和精神紧张时诱发, 呈压迫性不适或紧缩感、压榨感, 休息或含服硝酸甘油后缓解。</p>\r
<p>考点提示:胸痛的特征。</p>\r
<p>(2)呼吸困难:具体如下。</p>\r
<p>1) 症状: 引起呼吸困难的原发病不同, 其主要症状和伴随症状也不同。当患者出现不能解释的呼吸困难、胸痛、咳嗽, 同时存在深静脉血栓等高危因素时, 应高度怀疑急性肺栓塞的可能。急性起病, 呼吸急促和(或)呼吸窘迫, 顽固性低氧血症, 常规给氧方式不能缓解, 出现非心源性肺水肿时, 可判断为 ARDS; 呼吸困难伴有突发一侧胸痛, 呈针刺样或刀割样疼痛, 有时向患侧肩部放射时, 常提示气胸。</p>\r
<p>2) 体征: 通过观察胸廓外形、呼吸肌活动情况、有无“三凹征”和颈静脉充盈、触摸脉率及胸部叩诊、听诊来评估患者的体征。肺栓塞患者可有颈静脉充盈, 肺部可闻及局部湿啰音和哮鸣音, 肺动脉瓣区第二心音亢进或分裂，严重时血压下降甚至休克。患侧胸廓饱满、叩诊呈鼓音、听诊呼吸音减弱或消失时应考虑气胸。</p>\r
<p>(3)伴随症状或体征:具体如下。</p>\r
<p>1) 咳嗽、咳痰或咯血: 多提示肺部疾病, 如肺栓塞、肺结核、肺癌等。</p>\r
<p>2) 吞咽困难: 多提示食管疾病, 如食管癌、反流性食管炎等。</p>\r
<p>3) 面色苍白、血压下降及休克表现: 多见于急性冠脉综合征、主动脉夹层、主动脉窦瘤破裂、肺栓塞等。</p>\r
<p>3. 相关检查 ①常规检查: 如心电图检查、超声心动图等。②血液生化检查: 如心肌酶、D-二聚体、红细胞沉降率等。③影像学检查: 如 X 线、CT、MRI、超声、内镜等检查。</p>\r
<p>4. 其他 患者及其家属的心理反应、配合程度和对疾病的认知状况等。</p>\r
<p>(二)急救与护理</p>\r

<p>1. 急性胸痛的救护 通过病情评估来分析急性胸痛的严重程度,迅速识别致命性胸痛,根据不同病因进行针对性救治(图 3-8)。</p>\r
<p>2. 呼吸困难的救护</p>\r
<p>(1)体位:协助患者取合适体位,减轻呼吸困难。如急性左心衰竭、严重哮喘、肺气肿患者取坐位或半卧位;肋骨骨折患者取健侧卧位;胸腔积液患者取患侧卧位;急性呼吸窘迫综合征患者取平卧位。</p>\r
<p>(2)保持呼吸道通畅:有效清除气道分泌物,增加肺泡通气量,可协助患者咳嗽、咳痰,给予翻身、拍背,指导患者做深呼吸和有效的咳痰动作;进行雾化吸入,以湿润呼吸道、稀释痰液;必要时
建立人工气道,给予机械通气进行辅助呼吸。</p>\r
<p>(3) 吸氧: 一般经鼻导管或面罩吸氧。吸氧浓度根据呼吸困难(缺氧)程度进行调整, 使动脉血氧分压 &gt;60mmHg, 或动脉血氧饱和度 &gt;90%。有效的吸氧可改善机体缺氧状态, 增加患者活动的耐受性和治疗的信心, 帮助患者保持镇静, 消除紧张、恐惧情绪。</p>\r
<p>(4)应用呼吸兴奋剂:呼吸兴奋剂能改善通气,但同时可增加耗氧量及二氧化碳的产生量。静脉滴注时速度不宜过快,同时注意观察患者的治疗反应,如出现心悸、烦躁、面色潮红、肌肉颤动、惊厥等药物过量表现时,应立即减慢滴速或停药并通知医生。</p>\r
<p>3. 护理要点</p>\r
<p>(1)一般护理:嘱患者减少活动,卧床休息,采取舒适体位,如侧卧位、半坐卧位、坐位等以减轻疼痛或防止疼痛加重;选择清淡易消化的饮食,少食多餐。若为心源性胸痛,应绝对卧床休息,禁吸烟、饮酒,低盐饮食,保持大便通畅。</p>\r
<p>(2) 病情观察: 观察胸痛的部位、特征、程度、加重和缓解因素; 注意观察生命体征、心电图、血氧饱和度等情况。如出现呼吸困难、血压降低, 应立即建立静脉通路, 并报告医生, 采取相应的抢救措施。</p>\r
<p>(3)缓解疼痛:应针对病因采取不同措施,如对胸部活动引起剧烈疼痛者,可用15cm宽胶布固定患侧胸部,减小呼吸幅度;或在咳嗽、深呼吸、活动时用手按压疼痛部位制动,以缓解疼痛。当剧烈疼痛或持续性疼痛影响休息时,按医嘱给予镇痛剂和镇静剂。对心血管疾病引起的胸痛患者,病情较重时立即给予吸氧,按医嘱给予硝酸酯类、吗啡、溶栓剂、 β 受体阻滞剂、钙拮抗剂等,以改善心肌供血,缓解疼痛。</p>\r
<p>(4)用药护理:遵医嘱准确给药,给药前应明确药物的剂量、给药途径、适应证、禁忌证等,观察药物的疗效、不良反应和有无依赖性。</p>\r
<p>(5)心理护理:关心、爱护患者,向患者及其家属解释胸痛的原因及缓解疼痛的方法;若为致命性胸痛,在急救过程中注意患者的情绪反应,安慰、鼓励患者,以取得配合。</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540015-6-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">注：ACS为急性冠状动脉综合征，STEMI为ST段抬高型心肌梗死，NSTEMI为非ST段抬高型心肌梗死，AAD为急性主动脉夹层，APE为急性肺栓塞，ECMO为体外膜氧合器。</p>\r
<p>图3-8 急性胸痛诊疗流程图</p>\r
<p>(三) 护理评价</p>\r
<p>(1) 患者的胸痛症状是否缓解。</p>\r
<p>(2) 患者能否完成指定的身体活动。</p>\r
<p>(3) 患者有无并发症发生。</p>\r
<p>(4) 判断患者及其家属对胸痛的认知程度。</p>\r
<p>知识链接</p>\r
<p>胸痛中心建设</p>\r
<p>胸痛中心是整合医院内外多学科医疗资源、采用标准化诊治流程、强调以患者为中心的胸痛救治平台。通过信息共享、多学科协作诊疗(multidisciplinary team, MDT)等多种模式，胸痛中心的建设将保障急性胸痛患者到达医院后获得早期评估、危险分层、正确分流与合理救治，避免高危患者漏诊，使其得到及时诊断、及时治疗，并尽可能减少低危患者住院检查和治疗的医疗费用。</p>\r
<p>1981年，美国巴尔地摩St.Angle医院建立了全球第一家胸痛中心。目前全球多个国家的医院都已设立胸痛中心。2010年，《胸痛中心建设中国专家共识》的正式发布，标志着我国“胸痛中心”建设正式起步。2011年3月，广州军区广州总医院(现中国人民解放军南部战区总医院)宣布我国首个区域军民协同远程胸痛急救网正式投入运营。2013年9月，“中国胸痛中心认证标准”发布，成为继美国、德国之后第3个拥有“胸痛中心”建设标准的国家。</p>\r
<p>四、急性腹痛患者的救护</p>\r
<p>急性腹痛是指各种原因引起的腹部突发性疼痛,是临床上常见的急性症状之一,具有起病急、发展快、病情重、变化多和病因复杂等特点。若延误诊治则极易发生严重后果,危及患者生命。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 病因 引起急性腹痛的病因复杂多样,原发病变多位于腹部,其他部位的疾病和全身性疾病亦可引起急性腹痛。</p>\r
<p>(1)腹部病变:具体如下。</p>\r
<p>1) 急性炎症: 如急性胃肠炎、急性阑尾炎、
急性胆囊炎、急性胰腺炎、急性腹膜炎等。</p>\r
<p>2) 胃肠穿孔或瘘: 如消化道溃疡穿孔及胃癌术后吻合口瘘, 可造成胃肠液、胆汁、胰液外漏, 进而引起急性化学性和(或)细菌性腹膜炎。</p>\r
<p>3) 脏器阻塞或扭转: 常见于急性肠梗阻、肠扭转、胆管结石、胆道蛔虫病、泌尿道结石、卵巢囊肿蒂扭转等。</p>\r
<p>4) 脏器破裂出血: 如外伤致肝破裂、脾破裂、异位妊娠破裂等, 以失血表现为主, 可有不同程度的腹膜刺激征。</p>\r
<p>5) 脏器肿瘤: 如肝癌、胃癌、肠癌等, 肿瘤生长侵及感觉神经, 可引起腹痛。</p>\r
<p>6) 血管病变: 较少见, 见于肠系膜动脉栓塞、门静脉栓塞、脾梗死、肾梗死等, 引起的腹痛相当剧烈。</p>\r

<p>7) 腹壁疾病: 如腹壁挫伤、脓肿等。</p>\r
<p>(2)腹外脏器病变及全身性疾病:具体如下。</p>\r
<p>1) 胸部疾病: 如急性心肌梗死、急性心包炎等。胸膜炎、大叶性肺炎、气胸等可引起上腹部牵涉痛。</p>\r
<p>2) 中毒、代谢性疾病及电解质紊乱: 如铅、汞中毒, 糖尿病酮症酸中毒, 尿毒症, 低钾血症, 低钠血症等, 可引起痉挛性腹痛。</p>\r
<p>3) 神经源性疾病: 可引起功能性腹痛, 如脊柱结核、末梢神经炎、腹型癫痫、带状疱疹等。</p>\r
<p>2. 临床表现</p>\r
<p>(1)腹痛发生方式:腹痛开始时较轻,以后逐渐加重,多提示炎症性病变;腹痛突然发生,迅速加重，多见于脏器梗阻、扭转、穿孔、破裂等。</p>\r
<p>(2)腹痛部位:具体如下。</p>\r
<p>1) 腹部病变: 最初疼痛部位多位于原发病灶, 如肝、胆病变所致疼痛多在右上腹; 异位妊娠破裂及盆腔炎、痛经等疼痛位于下腹部; 急性阑尾炎常表现为转移性右下腹痛; 弥漫性或部位不定的疼痛见于急性弥漫性腹膜炎、机械性肠梗阻、急性出血性坏死性肠炎、肠穿孔等。</p>\r
<p>2) 腹外脏器病变: 胸部脏器病变引起的腹痛, 多以上腹部为主; 全身性病变所致腹痛则多以脐周或弥漫性腹痛为主。</p>\r
<p>(3)腹痛性质:腹痛的性质常反映病变的类型,且腹痛性质的变化可提示病变发展情况。</p>\r
<p>1) 持续性胀痛或隐痛: 一般提示炎症性或出血性病变, 如阑尾炎、胰腺炎、脾破裂出血等。</p>\r
<p>2) 阵发性绞痛: 由平滑肌痉挛所致, 见于空腔脏器发生痉挛或梗阻性病变时, 如机械性肠梗阻、胆囊结石、输尿管结石等, 其特点是突然发作, 疼痛剧烈, 呈阵发性, 有缓解期。</p>\r
<p>3) 持续性疼痛伴阵发性加重: 常提示炎症与梗阻并存, 如胆囊结石合并胆道感染等; 开始为阵发性绞痛, 之后转为持续性胀痛, 则提示空腔脏器的梗阻已并发炎症或已发生血运障碍。</p>\r
<p>4) 放射痛: 某些急性腹痛常有特定部位的放射痛, 如胆管疾病、右膈下脓肿等引起的腹痛可放射至右肩部; 急性胰腺炎时, 腹痛多向腰背部或左肩放射; 肾绞痛可放射至同侧下腹部、外生殖器及大腿内侧。</p>\r
<p>(4) 腹痛程度: 腹痛的程度与患者的敏感度、病变性质及刺激物种类有关。①胃肠道穿孔所致的腹痛最剧烈, 呈持续性刀割样。②梗阻性疾病引起的腹痛也较剧烈且呈阵发性加重, 如肠扭转、卵巢囊肿蒂扭转等。③老年人对疼痛敏感性降低, 同样疾病所致的腹痛较青年人轻或无痛。④癔症性腹痛、腹型癫痫, 尽管没有或仅有轻度病理改变, 引起的腹痛却很剧烈。</p>\r
<p>(5)伴随症状:腹痛时常伴有恶心、呕吐、食欲缺乏、腹胀、腹泻、便秘等症状。如伴呕吐及腹泻,提示可能存在肠道感染;伴呕吐而无排便和排气,提示可能存在肠梗阻;伴黄疸,提示可能存在胆道系统病变、急性溶血等;伴尿频、尿急、血尿,提示可能存在泌尿系统疾病;伴寒战、高热,提示可能存在炎症,多见于急性化脓性胆囊炎、急性阑尾炎、肝脓肿、膈下脓肿,也可见于腹腔外感染性疾病(如肺炎等);伴休克,提示可能存在腹腔内出血和感染等。</p>\r
<p>(6)体格检查:具体如下。</p>\r
<p>1) 视诊: 注意观察腹部形态及腹式呼吸运动, 如急性胃穿孔者常呈舟状腹, 腹式呼吸消失; 肠扭转者腹部可不对称; 肠梗阻者
可见肠型或异常蠕动波。</p>\r
<p>2) 听诊: 肠鸣音亢进、有气过水声常提示机械性肠梗阻; 急性腹膜炎时, 肠鸣音减弱或消失; 上腹部振水音提示幽门梗阻或胃扩张。</p>\r
<p>3) 叩诊: 胃肠道穿孔时肝浊音界缩小或消失; 腹膜炎渗出或腹腔内出血较多时可有移动性浊音。</p>\r
<p>4) 触诊: 腹部压痛明显处常是原发病灶所在处。若有腹膜刺激征, 应了解其部位、范围及程度; 触及腹部包块时, 注意其部位、大小、形状、质地、活动度等。</p>\r
<p>考点提示:急性腹痛的评估内容。</p>\r
<p>3. 相关检查</p>\r
<p>(1)实验室检查:包括以下4项。①血常规:白细胞总数和中性粒细胞增高多见于各种感染性疾病,血红蛋白和红细胞计数降低见于出血性疾病。②尿常规:尿中大量红细胞提示泌尿系统疾病。③粪常规:血便提示存在消化道出血;糊状或水样便,含少量红细胞、白细胞提示可能为细菌性食物中毒;黏液脓血便提示可能为痢疾。④生化检查:人绒毛膜促性腺激素测定有利于异位妊娠的诊断,血、尿或腹水淀粉酶增高常提示急性胰腺炎。</p>\r
<p>(2) 影像学检查: ①X 线检查, 腹部立位平片见膈下游离气体, 提示胃肠穿孔; 若肠管内存在多个气液平面,提示机械性肠梗阻。②B超、CT检查可显示肝、胆、胰腺、子宫及附件和膀胱等脏器的形态,对腹水、结石、占位性病变、异位妊娠等也有诊断价值。</p>\r
<p>(3) 内镜检查: 对胃、十二指肠、胆及胰腺等脏器病变有较好的诊断价值。</p>\r
<p>(4)诊断性腹腔穿刺:对急性腹痛的诊断具有重要意义,是外科急腹症常用的检查手段。根据穿刺液的性质可判断病变的部位和性质。</p>\r
<p>4. 其他 急性腹痛往往给患者及其家属造成极大的恐惧或焦虑,应注意患者及其家属的心理反应、配合程度及对疾病的认知状况。</p>\r
<p>(二)急救与护理</p>\r
<p>1. 腹痛的救治 引起急性腹痛的病因虽然不同,但救治原则基本相似,即挽救生命、减轻痛苦、积极对因治疗和预防并发症。</p>\r
<p>(1) 非手术治疗: 指征与措施如下。</p>\r
<p>1) 指征: ①就诊时腹膜炎已经局限, 且患者全身情况良好。②诊断不明确, 且无紧急手术指征。③出血性疾病, 经过输血治疗, 患者血压回升, 病情稳定, 无再出血征象。④诊断明确, 非手术治疗疗效明显。⑤患者病情危重, 全身情况极差或合并重要器官功能不全, 不能耐受手术。</p>\r
<p>2) 措施: ①禁饮食, 必要时给予有效胃肠减压。②抗休克。③维持水、电解质及酸碱平衡, 补充营养。④控制感染。⑤对症处理, 高热时采用物理降温或使用解热镇痛剂, 疼痛剧烈时给予解痉药; 若为急性胰腺炎, 应使用抑制胰腺分泌的药物。⑥对危重患者进行重症监护。</p>\r

<p>(2) 手术治疗: 是急性腹痛重要的治疗手段。有手术指征时, 如存在肠梗阻、急性化脓性阑尾炎等, 应及时手术治疗。</p>\r
<p>(3) 剖腹探查: 适用于不能确诊的急腹症患者。适应证包括: ①突发剧烈腹痛持续数小时, 非手术治疗无效或病情进行性加重。②腹膜刺激征明显而范围继续扩大, 病因不明。③腹腔内不明原因的活动性出血, 进行性加重。④空腔脏器穿孔严重, 腹膜炎弥散。⑤存在绞窄性肠梗阻、肠坏死。⑥并发急性梗阻性化脓性胆管炎等。</p>\r
<p>2. 护理要点</p>\r
<p>(1)紧急护理措施:应首先处理威胁生命的情况。①对腹痛伴休克者,应及时配合医生进行抢救,如迅速建立静脉通路,及时补液等。②对急腹症伴呕吐者,应将其头偏向一侧,以防误吸。③对病因未明者,遵医嘱积极做好术前准备。</p>\r
<p>(2)饮食管理及胃肠减压:①病情较轻且无禁忌证者,可给予少量流质或半流质饮食。②对病因未明或病情较重者,应立即禁饮食。③对于胃肠道穿孔及急性肠梗阻者,应禁食并给予胃肠减压。④对于病情严重,预计较长时间不能进食者,应给予肠外营养。</p>\r
<p>(3) 病情观察: 急性腹痛病情发展快、变化多。护士应密切观察病情, 发现患者出现病情恶化, 如腹痛加重、腹膜炎范围扩大等情况, 应及时通知医生处理。</p>\r
<p>(4) 疼痛护理: 对诊断明确的单纯性胆
绞痛、肾绞痛患者可给予解痉药物; 对诊断不明或治疗方案未确定者应禁用吗啡、哌替啶类麻醉性镇痛药, 以免掩盖病情。可采取适当措施帮助患者缓解疼痛, 如安慰患者、安置舒适体位、指导患者转移注意力等。</p>\r
<p>(5) 卧床休息: 指导患者采取舒适体位卧床休息。病情允许时取半卧位, 以降低腹壁张力, 减轻疼痛, 利于腹腔液体引流至盆腔, 减少毒素的吸收及发生膈下积液的机会等。</p>\r
<p>(6)遵循“四禁”原则:未确诊病因的急腹症患者,在非手术治疗期间需遵循“四禁”原则,即禁饮食、禁灌肠、禁导泻、禁镇痛。在此期间应密切观察患者病情变化,积极配合医生做好相应的护理工作。</p>\r
<p>(7)术前准备:遵医嘱积极治疗原发病,并做好必要的术前准备。</p>\r
<p>(8) 基础护理: 对伴有高热者, 可用药物降温或物理降温, 以减轻患者的不适; 对神志不清或躁动者, 做好保护性约束。</p>\r
<p>(9) 健康指导: 适当向患者及其家属介绍急性腹痛的原因、病情转归和目前的治疗及护理计划, 解释有关检查的目的、方法和注意事项, 说明饮食管理、胃肠减压、疼痛护理的原则和必要性, 以获得患者及其家属的理解与配合。</p>\r
<p>考点提示:急性腹痛患者的护理。</p>\r
<p>(三) 护理评价</p>\r
<p>(1) 患者的疼痛是否减轻。</p>\r
<p>(2) 水、电解质及酸碱平衡是否恢复。</p>\r
<p>(3) 患者有无并发症发生。</p>\r
<p>(4) 患者的营养状况是否良好。</p>\r
<p>(5) 判断患者及其家属对腹痛的认知程度。</p>\r
<p>五、高血压危象患者的救护</p>\r
<p>高血压危象(hypertensive crisis)指原发性高血压和继发性高血压的发展过程中,在某些诱因的作用下使外周小动脉发生暂时性强烈痉挛而引起血压急剧升高、病情急剧恶化及由高血压引起的心脏、脑、肾等主要靶器官功能严重受损的并发症。</p>\r
<p>(一) 护理评估</p>\r
<p>1. 病因和诱因 其病因尚不明确,可能有多种复杂的神经、体液及内分泌因素参与其中,这些因素引起的不同病理生理改变在疾病的进展过程中相互促进,形成恶性循环。其基本机制为由于肾素-血管紧张素系统、压力性利钠等综合因素的作用,导致终末器官灌注减少和功能损伤,最终诱发靶器官功能损伤。在应激(如情绪激动、精神创伤)等诱因的作用下,交感神经兴奋,缩血管活性物质激活、释放增加,导致短期内血压急剧升高。</p>\r
<p>导致血压急剧升高的常见原因包括:①停用或未按医嘱服用降压药。②服用影响降压药代谢的药物(如非甾体抗炎药、止痛药等)。③服用拟交感毒性药物(如可卡因、麦角酸二乙基酰胺等)。④严重外伤、手术。⑤急性感染。⑥急、慢性疼痛。⑦急性尿潴留。⑧情绪激动、精神紧张。⑨对伴随的危险因素(如吸烟、肥胖导致的高胆固醇血症等)控制不佳。</p>\r
<p>2. 临床表现</p>\r
<p>(1) 主要表现: 短时间内血压急剧升高, 伴有明显的头晕、头痛、眩晕、视物模糊与视力障碍、烦躁、胸痛、呼吸困难等表现。此外, 还可能出现一些不典型的临床表现, 如胃肠道症状 (如腹痛、恶心、厌食) 等。</p>\r
<p>(2)高血压相关靶器官功能损害表现:具体如下。</p>\r
<p>1) 高血压脑病: 精神状态改变(如嗜睡、意识模糊、昏迷)、严重头痛、癫痫发作、呕吐和视觉障碍。</p>\r
<p>2) 急性冠状动脉综合征: 急性胸痛、胸闷、放射性肩背痛、咽部紧缩感、烦躁、大汗、心悸; 部分患者的心电图有缺血表现; 心肌梗死患者可出现心肌损伤标志物阳性。</p>\r
<p>3) 主动脉夹层: 撕裂样胸背部疼痛, 双侧上肢血压测量值不一致。因波及的血管范围不同, 故临床表现也不同。</p>\r
<p>4) 急性心力衰竭: 呼吸困难、发绀、咳粉红色泡沫样痰; 肺部可闻及啰音, 心界扩大, 心率增快并出现奔马律等。</p>\r
<p>5)脑卒中:包括脑梗死、脑出血、蛛网膜下腔出血。①脑梗死:表现为失语、面舌瘫、偏身感觉障碍、肢体瘫痪、意识障碍、癫痫发作。②脑出血：表现为头痛、喷射性呕吐、不同程度的意识障碍、偏瘫、失语等，起病后有进行性加重表现。③蛛网膜下腔出血：表现为剧烈头痛、恶心、呕吐；颈背部疼痛、意识障碍、抽搐、偏瘫、失语及脑膜刺激征阳性。</p>\r
<p>6) 急性肾功能不全: 可出现少尿或无尿、蛋白尿、血尿、管型尿; 血浆尿素氮及肌酐显著升高。</p>\r
<p>考点提示:高血压相关靶器官功能损害的表现。</p>\r
<p>3. 相关检查 高血压危象发作时, 血尿素氮、肌酐、肾上腺素、去甲肾上腺素含
量均增高, 血糖也可升高, 尿中出现少量红细胞和蛋白。</p>\r

<p>4. 其他 因病情严重,患者常出现焦虑、恐惧心理,担心疾病会影响日后的生活、工作,而这些心理负担又会使血压产生波动,从而影响治疗效果。</p>\r
<p>(二)急救与护理</p>\r
<p>遵循“先救命后治病”的原则,对高血压危象患者应给予紧急降压治疗,以减少对高血压相关靶器官功能的损害。</p>\r
<p>1. 紧急降压 高血压危象相关靶器官损害的降压原则与药物选择见表 3-8。</p>\r
<p style="text-align: center;">表 3-8 高血压危象相关靶器官损害的降压原则与药物选择</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540015-11-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">注：MAP 为平均动脉压，ACEI 为血管紧张素转换酶抑制药，ARB 为血管紧张素Ⅱ受体阻滞药。2. 一般护理 在维持生命体征稳定的前提下,积极给予吸氧,嘱患者安静休息。监测生命体征,维持水、电解质平衡,防治并发症,酌情使用有效镇静剂。</p>\r
<p>3. 护理要点</p>\r
<p>(1) 病情观察: 有条件者应立即转入重症监护病房, 严密监测血压、心率、呼吸、神志、瞳孔及心、肾功能的变化。</p>\r
<p>(2)休息与体位:保持环境安静,患者应绝对卧床休息,抬高床头 30<sup>∘</sup> ,以利于降低血压。</p>\r
<p>(3) 对症护理: 对缺氧者及早给予吸氧; 对抽搐、躁动者加强保护, 防止坠床, 遵医嘱给予地西泮、巴比妥类镇静药物; 对高血压脑病者迅速给予甘露醇、山梨醇或呋塞米等, 以减轻脑水肿, 降低颅内压。</p>\r
<p>(4)饮食指导:意识不清、抽搐者应禁食,以防窒息及吸入性肺炎,待病情稳定后可给予鼻饲。饮食上以低盐、低脂、低胆固醇,富含维生素、钾、镁的饮食为主。</p>\r
<p>(5) 心理护理: 焦虑、恐惧不利于血压的稳定, 甚至可能加重病情, 护士应注意保持患者情绪稳定, 加强心理支持, 使患者积极配合治疗, 将血压控制在安全范围内。</p>\r
<p>(三) 护理评价</p>\r
<p>(1) 患者的血压是否降低。</p>\r
<p>(2)患者的大脑功能是否恢复正常,有无遗留大脑功能障碍。</p>\r
<p>(3)有无并发症发生,如急性肺水肿、急性冠状动脉综合征、急性肾衰竭等。</p>\r
<p>(4) 患者的营养状态是否良好。</p>\r
<p>(5) 判断患者及其家属对高血压危象的认知程度。</p>\r
<p>素质拓展</p>\r
<p>医学家孙思邈:对待患者一视同仁</p>\r
<p>孙思邈在长期的实践中，形成了一整套高标准的医德规范。其中很重要的一条就是“皆如至亲之想”，意思是说，对待患者要像对待亲人一样。他说：“若有疾厄来求救者，不得问其贵贱贫富，长幼妍蚩，怨亲善友，华夷愚智，普同一等，皆如至亲之想。”孙思邈声望很高，每到一处，患者就蜂拥而至，不论在乡村，还是在闹市，都是如此。他以高度的同情心和责任感，对患者一视同仁，不顾饥渴疲劳，莫不一一救治，他这种高尚的医德，得到了人民的赞颂。</p>\r
<p>目标检测</p>\r
<p>1. 深度昏迷与中度昏迷最有价值的鉴别点是( )。</p>\r
<p>A. 各种刺激无反应 B. 不能唤醒 C. 无自主运动</p>\r
<p>D. 深浅反射均消失 E. 以上均不对</p>\r
<p>2. 下列不属于非感染性发热的是( )。</p>\r
<p>A. 心力衰竭 B. 恶性肿瘤 C. 风湿热</p>\r
<p>D. 支气管肺炎 E. 脑出血</p>\r
<p>3.昏迷伤员在搬运途中应取( )。</p>\r
<p>A. 仰卧位, 下肢屈曲</p>\r
<p>B. 中凹卧位</p>\r
<p>C. 平卧位, 头偏向一侧</p>\r
<p>D. 仰卧位<
/p>\r
<p>E. 半坐卧位</p>\r
<p>4. 患者,男,58岁。因胸闷、气短3天后出现心前区疼痛,以“心绞痛”收入院,问诊时应重点注意( )。</p>\r
<p>A. 疼痛的性质和部位 B. 有无发热 C. 用药史</p>\r
<p>D. 既往健康状况 E. 家族健康史</p>\r
<p>5. 患者, 女, 45 岁。反复发作上腹痛 7 年, 晚上饱餐后, 突发上腹剧痛, 腹肌紧张, 出冷汗, 休克, 首先应考虑( )。</p>\r
<p>A. 大出血</p>\r
<p>B. 消化性溃疡急性穿孔</p>\r
<p>C. 急性胰腺炎</p>\r
<p>D. 幽门梗阻</p>\r
<p>E. 急性阑尾炎</p>\r
<p>6. 高血压危象的典型表现不包括( )。</p>\r
<p>A. 头晕</p>\r
<p>B. 头痛</p>\r
<p>C. 视物模糊与视力障碍</p>\r
<p>D. 恶心、呕吐</p>\r
<p>E. 烦躁、胸痛、呼吸困难</p>\r
<p>7. 急性腹痛应遵循“四禁”原则。“四禁”不包括( )。</p>\r
<p>A.禁饮食 B.禁灌肠 C.禁导泻 D.禁镇痛 E.禁活动</p>\r
<p>8.急性左心衰竭、严重哮喘、肺气肿患者应取( )。</p>\r
<p>A. 平卧位</p>\r
<p>B. 坐位或半卧位</p>\r
<p>C. 健侧卧位</p>\r
<p>D. 患侧卧位</p>\r
<p>E. 俯卧位</p>\r
<p>9. 胸腔积液患者应取( )。</p>\r
<p>A. 平卧位</p>\r
<p>B. 坐位或半卧位</p>\r
<p>C. 健侧卧位</p>\r
<p>D. 患侧卧位</p>\r
<p>E. 俯卧位</p>\r
<p>10. 肋骨骨折患者应取( )。</p>\r
<p>A. 平卧位</p>\r
<p>B. 坐位或半卧位</p>\r
<p>C. 健侧卧位</p>\r
<p>D. 患侧卧位</p>\r
<p>E. 俯卧位</p>\r
<p>(任冬 张云萍)</p>\r
`}]},{id:"module5",title:"第四章 灾害事故的现场救护",summary:"灾害现场救护的核心是快速检伤分类与精准施救。关键要点：评估环境安全、按红黄绿黑分级、优先处理窒息大出血。代表性例子：地震伤员先固定脊柱再搬运。未涉及：灾害心理危机干预。",tasks:[{id:"module5-task1",title:"第一节 概述",order:1,rawContent:`学习目标

素质目标:具备认真、科学、严谨、求实的态度及高度的责任心,培养紧密协作的团队协作精神,树立“敬佑生命、救死扶伤、甘于奉献、大爱无疆”的急救理念。

知识目标: 掌握常见灾害事故现场的评估、分类方法、检伤分类的标志及救护措施。熟悉灾害事故发生的原因、事故现场的特点。了解灾害的定义和分类、灾害医疗救援的准备。

能力目标:能够运用所学知识对常见灾害事故伤员进行快速评估,并进行紧急处理。

案例导学

患者,男,56岁,因地震房屋倒塌被掩埋在废墟中,搜救人员将其救出。医护人员为其体检时发现存在右侧开放性气胸,左下肢开放性骨折。

请思考：

假如你是救援护士,在现场应采取哪些救护措施?

近年来，世界范围内各种类型的灾害频繁发生，造成人员伤亡、财产损失、生态环境破坏以及严重的社会危害。灾害发生后，如何使伤员得到及时救助和治疗，减少死亡率和伤残率，已成为亟待解决的严峻而复杂的问题。护士作为灾害医学救援队伍中的主力军之一，掌握灾害事故现场救援的知识和技术，对于减少灾害所致人员伤亡、提高受灾人群的健康水平具有重要意义。

一、灾害的定义与分类

(一) 定义

灾害(disaster)是指自然或人为因素导致环境突然发生巨变,进而造成人员伤亡、财产损失和生态破坏的现象。世界卫生组织(WHO)将灾害定义为一种对一个社区或社会功能的严重破坏,包括人员、物资、经济及环境的损失和影响,这些影响超过了受灾社区或社会应用本身资源应对的能力。当自然事件或者人为事件影响一个社区或国家,而这个社区或国家的应对能力有限,需要外部援助时,该事件称为灾害事件。

(二) 分类

1. 按发生原因分类

(1)自然灾害:如地震、火山活动、滑坡、海啸、飓风、龙卷风、台风、洪水、森林火灾、干旱、沙尘暴等。

(2)人为灾害:如火灾、爆炸、交通事故、工伤事故、卫生灾害、矿难、科技事故,以及战争和恐怖袭击等。

2. 按发生顺序分类 许多灾害,特别是等级高、强度大的自然灾害发生后,常会引发一系列的其他灾害接连发生,这种现象称为灾害链。

(1) 原生灾害: 灾害链中最早发生的起主导作用的灾害, 如地震、火山爆发等。

(2) 次生灾害: 由原生灾害所引发的灾害, 如地震引起的泥石流、有毒气体泄漏等。

(3) 衍生灾害: 灾害发生之后, 破坏人类生存的和谐条件, 由此引发一系列其他灾害。如地震后发生的停产、通信及交通破坏、社会恐慌等。

3. 按发生方式分类

(1)突发灾害:突然发生、难以预测,造成巨大危害的灾害,如地震、火山爆发等。

(2) 渐变灾害: 发生缓慢, 但影响时间长、范围大, 且具有一定隐蔽性, 其危害在致灾因素长期作用下才能逐渐显现, 如土地沙漠化、水土流失等。

二、灾害事故现场救护的特点

不同的灾害,其危害特点和规律也不同,对医疗救援的要求也不尽相同,但是不管何种原因造成的灾害事故,现场救护都具备以下特点。

1. 紧迫性 灾害事故发生突然,要求医护人员迅速反应,尽快到达灾区实施救护,体现时间就是生命。

2. 艰难性 灾后气象、气候复杂,通讯及交通不便,现场水、电、食物、医疗物资等匮乏,使救援工作更为艰难。因此,医护人员只有熟练掌握急救技术,才能适应复杂条件下的救援。

3. 繁重性 现场伤员多、伤情复杂,医护人员少且面临次生灾害的威胁,对医疗救援提出了更高的要求。

4. 涉及部门广 现场指挥、搜救、通信联络、救护等,需要多部门协作,紧密配合,共同完成救援任务。

三、灾害医疗救援准备

1. 国家灾害医疗救援的组织体系 目前,我国灾害医疗救援的发展正逐步走向正规化、日常化,国家灾害医疗救援的组织体系也逐步完善。国家灾害医疗救援组织体系主要由医疗卫生救援领导小组、医疗卫生救援专家组、医疗卫生救援机构及现场医疗卫生救援指挥部组成。

2. 灾害医疗救援人员的职业安全防护

(1)免疫预防:主动免疫主要用于常规预防传染病,疫苗接种是预防传染病最有效的方法。被动免疫主要用于治疗或紧急预防感染,如伤后立即注射抗毒素、免疫球蛋白等。

(2) 标准预防: 包括正确使用防护物品, 如手套、口罩、面罩、工作服、护目镜等进行隔离防护; 注意手卫生; 严格执行消毒、隔离措施; 预防医疗锐器损伤等。

(3) 职业暴露应急处理措施: ①局部处理, 完整的皮肤、黏膜被污染后, 应立即用肥皂清洗、流动水冲洗、消毒; 皮肤伤口被污染后, 要先尽可能挤出损伤处血液, 再用肥皂清洗、流动水冲洗、消毒。②全身防疫, 发生损伤性职业暴露时, 应留取伤员的血液标本进行检验, 判断其是否患有经血液传播的疾病。一旦暴露于乙肝病毒及艾滋病病毒时, 应尽快应用药物预防并及时随诊观察。③及时报告, 发生职业暴露后, 应立即进行紧急处置并主动上报。`,rawHtml:`<p>学习目标</p>\r
<p>素质目标:具备认真、科学、严谨、求实的态度及高度的责任心,培养紧密协作的团队协作精神,树立“敬佑生命、救死扶伤、甘于奉献、大爱无疆”的急救理念。</p>\r
<p>知识目标: 掌握常见灾害事故现场的评估、分类方法、检伤分类的标志及救护措施。熟悉灾害事故发生的原因、事故现场的特点。了解灾害的定义和分类、灾害医疗救援的准备。</p>\r
<p>能力目标:能够运用所学知识对常见灾害事故伤员进行快速评估,并进行紧急处理。</p>\r
<p>案例导学</p>\r
<p>患者,男,56岁,因地震房屋倒塌被掩埋在废墟中,搜救人员将其救出。医护人员为其体检时发现存在右侧开放性气胸,左下肢开放性骨折。</p>\r
<p>请思考：</p>\r
<p>假如你是救援护士,在现场应采取哪些救护措施?</p>\r
<p>近年来，世界范围内各种类型的灾害频繁发生，造成人员伤亡、财产损失、生态环境破坏以及严重的社会危害。灾害发生后，如何使伤员得到及时救助和治疗，减少死亡率和伤残率，已成为亟待解决的严峻而复杂的问题。护士作为灾害医学救援队伍中的主力军之一，掌握灾害事故现场救援的知识和技术，对于减少灾害所致人员伤亡、提高受灾人群的健康水平具有重要意义。</p>\r
<p>一、灾害的定义与分类</p>\r
<p>(一) 定义</p>\r
<p>灾害(disaster)是指自然或人为因素导致环境突然发生巨变,进而造成人员伤亡、财产损失和生态破坏的现象。世界卫生组织(WHO)将灾害定义为一种对一个社区或社会功能的严重破坏,包括人员、物资、经济及环境的损失和影响,这些影响超过了受灾社区或社会应用本身资源应对的能力。当自然事件或者人为事件影响一个社区或国家,而这个社区或国家的应对能力有限,需要外部援助时,该事件称为灾害事件。</p>\r
<p>(二) 分类</p>\r
<p>1. 按发生原因分类</p>\r
<p>(1)自然灾害:如地震、火山活动、滑坡、海啸、飓风、龙卷风、台风、洪水、森林火灾、干旱、沙尘暴等。</p>\r
<p>(2)人为灾害:如火灾、爆炸、交通事故、工伤事故、卫生灾害、矿难、科技事故,以及战争和恐怖袭击等。</p>\r
<p>2. 按发生顺序分类 许多灾害,特别是等级高、强度大的自然灾害发生后,常会引发一系列的其他灾害接连发生,这种现象称为灾害链。</p>\r
<p>(1) 原生灾害: 灾害链中最早发生的起主导作用的灾害, 如地震、火山爆发等。</p>\r
<p>(2) 次生灾害: 由原生灾害所引发的灾害, 如地震引起的泥石流、有毒气体泄漏等。</p>\r
<p>(3) 衍生灾害: 灾害发生之后, 破坏人类生存的和谐条件, 由此引发一系列其他灾害。如地震后发生的停产、通信及交通破坏、社会恐慌等。</p>\r
<p>3. 按发生方式分类</p>\r
<p>(1)突发灾害:突然发生、难以预测,造成巨大危害的灾害,如地震、火山爆发等。</p>\r
<p>(2) 渐变灾害: 发生缓慢, 但影响时间长、范围大, 且具有一定隐蔽性, 其危害在致灾因素长期作用下才能逐渐显现, 如土地沙漠化、水土流失等。</p>\r
<p>二、灾害事故现场救护的特点</p>\r
<p>不同的灾害,其危害特点和规律也不同,对医疗救援的要求也不尽相同,但是不管何种原因造成的灾害事故,现场救护都具备以下特点。</p>\r
<p>1. 紧迫性 灾害事故发生突然,要求医护人员迅速反应,尽快到达灾区实施救护,体现时间就是生命。</p>\r
<p>2. 艰难性 灾后气象、气候复杂,通讯及交通不便,现场水、电、食物、医疗物资等匮乏,使救援工作更为艰难。因此,医护人员只有熟练掌握急救技术,才能适应复杂条件下的救援。</p>\r
<p>3. 繁重性 现场伤员多、伤情复杂,医护人员少且面临次生灾害的威胁,对医疗救援提出了更高的要求。</p>\r
<p>4. 涉及部门广 现场指挥、搜救、通信联络、救护等,需要多部门协作,紧密配合,共同完成救援任务。</p>\r
<p>三、灾害医疗救援准备</p>\r
<p>1. 国家灾害医疗救援的组织体系 目前,我国灾害医疗救援的发展正逐步走向正规化、日常化,国家灾害医疗救援的组织体系也逐步完善。国家灾害医疗救援组织体系主要由医疗卫生救援领导小组、医疗卫生救援专家组、医疗卫生救援机构及现场医疗卫生救援指挥部组成。</p>\r
<p>2. 灾害医疗救援人员的职业安全防护</p>\r
<p>(1)免疫预防:主动免疫主要用于常规预防传染病,疫苗接种是预防传染病最有效的方法。被动免疫主要用于治疗或紧急预防感染,如伤后立即注射抗毒素、免疫球蛋白等。</p>\r
<p>(2) 标准预防: 包括正确使用防护物品, 如手套、口罩、面罩、工作服、护目镜等进行隔离防护; 注意手卫生; 严格执行消毒、隔离措施; 预防医疗锐器损伤等。</p>\r
<p>(3) 职业暴露应急处理措施: ①局部处理, 完整的皮肤、黏膜被污染后, 应立即用肥皂清洗、流动水冲洗、消毒; 皮肤伤口被污染后, 要先尽可能挤出损伤处血液, 再用肥皂清洗、流动水冲洗、消毒。②全身防疫, 发生损伤性职业暴露时, 应留取伤员的血液标本进行检验, 判断其是否患有经血液传播的疾病。一旦暴露于乙肝病毒及艾滋病病毒时, 应尽快应用药物预防并及时随诊观察。③及时报告, 发生职业暴露后, 应立即进行紧急处置并主动上报。</p>\r
`},{id:"module5-task2",title:"第二节 灾害现场检伤分类",order:2,rawContent:`案例导学

2019 年 8 月 4 日,四川某山区发生山体滑坡及泥石流,一村寨受泥石流侵袭。当地政府得到消息后,迅速派消防队和医疗队前往灾区救援。应急指挥组组长李某接到通知后,不到半小时便带领应急救援队到达现场。

请思考：

假如你在现场,如何参与救援?

灾害现场医疗救援是指在现场、临时医疗场所等医院之外的环境中，针对灾害所致人员伤害实施的救援，包括现场搜救、检伤分类、现场急救、伤员转运及恢复过程中的防疫等医学救援技术。灾害现场检伤分类是做好现场救援的关键环节，快速有效的检伤分类是救援成功的第一步。

一、原则

1. 简单快速原则 平均每名伤员检伤分类时间不超过 1 分钟。

2. 分类分级原则 灵活掌握分类标准, 先重后轻, 合理
调配。

3. 救命优先原则 灾害现场检伤分类一般不包括伤员的治疗,但当出现气道梗阻等危及生命的情况且简单手法即可缓解时,可先抢救后分类或边抢救边分类。

4. 自主决策原则 检伤人员有权根据现场需要和可利用的资源,自主决定伤员流向和医学处置类型。

5. 重复检伤原则 医护人员应对伤员伤情进行动态评估,每隔一定时间应再次检伤。

6. 公平有效原则 以尽可能挽救更多伤员为原则,灾害现场检伤应兼顾公平性和有效性。

二、类型

1. 收容分类 是接收伤员的第一步,目的是快速识别需要优先抢救的伤员,同时帮助其脱离危险环境,安排前往相应区域接受进一步检查和治疗。

2. 救治分类 是决定救治顺序的伤情分类。主要是将轻、中、重伤员分开，以便确定救治优先顺序。应首先评估伤员的伤情严重程度，确定相应的救护措施，结合伤员数量和可利用的救护资源决定救治顺序。

3. 后送分类 是确定将伤员尽快转运到确定性医疗机构顺序的分类。应根据伤员伤情的紧迫性和耐受性、需采取的救护措施、可选择的后送工具等情况，决定伤员的后送顺序、后送工具及目的地。

三、常用方法

1. START 最为常用,是基于呼吸、心跳及意识状况的检伤分类方法。该方法将伤员分为4组,分别标识为红、黄、绿、黑4种颜色(详见第一章第三节相关内容)。在分类过程中,医护人员仅为伤员提供必须的急救措施,如开放气道、止血等,强调用于每位伤员的评估和处置时间不超过30s。START的具体评估流程见图4-1。

2. Jump START 是对 START 进行修正后,用于受伤儿童(1~8岁)检伤分类的方法。分组方法和分类依据与 START 相似,但基于儿童的生理特点对分类依据做了调整(图 4-2)。

3. SALT 是融检伤分类、紧急救治、后续处置与转运为一体的，适用于大规模伤亡事件的预检分诊系统，包括分类（sort）、评估（assessment）、挽救生命（life-saving intervention）及处置/转运（treatment/transport）（图4-3）。

图4-1 START分类流程

\r
\r
A 表示“清醒”, V 表示“对声音刺激有反应”,P 表示“对疼痛刺激有反应”, U 表示“对任何刺激无反应”。

图4-2 Jump START分类流程

图4-3 SALT大规模伤亡事件检伤分类流程

\r
四、灾害现场的救护

(一)伤员的安置

伤员在检伤分类区经伤情评估和分类后,可被安置于伤员治疗区(一般设在相对安全的建筑物或帐篷内)。如果伤员人数不多,治疗区可与检伤区合并,以减少对伤员的搬动。如果人数较多,则应独立设置治疗区,以免互相干扰;需将治疗区细分为轻、重和危重区,以提高抢救效率。

(二)伤员的转运和暂缓转运指征

1. 转运指征 符合以下条件之一者可转运: ①伤情需要, 现场处理后出现并发症或现场救援能力有限。②伤员或家属要求, 转运前需仔细评估、确认伤员不会因搬动或转运而使伤情恶化, 甚至危及生命。

2. 暂缓转运指征 符合以下情况之一者应暂缓转运: ①休克未纠正、血流动力学不稳定者。②存在颅脑外伤,疑有颅内高压,可能发生脑疝者。③颈髓
损伤,有呼吸功能障碍者。④存在心脏等脏器衰竭者。⑤胸、腹部损伤后伤情不稳定,随时有生命危险者。⑥伤员或家属依从性差者。`,rawHtml:`<p>案例导学</p>\r
<p>2019 年 8 月 4 日,四川某山区发生山体滑坡及泥石流,一村寨受泥石流侵袭。当地政府得到消息后,迅速派消防队和医疗队前往灾区救援。应急指挥组组长李某接到通知后,不到半小时便带领应急救援队到达现场。</p>\r
<p>请思考：</p>\r
<p>假如你在现场,如何参与救援?</p>\r
<p>灾害现场医疗救援是指在现场、临时医疗场所等医院之外的环境中，针对灾害所致人员伤害实施的救援，包括现场搜救、检伤分类、现场急救、伤员转运及恢复过程中的防疫等医学救援技术。灾害现场检伤分类是做好现场救援的关键环节，快速有效的检伤分类是救援成功的第一步。</p>\r
<p>一、原则</p>\r
<p>1. 简单快速原则 平均每名伤员检伤分类时间不超过 1 分钟。</p>\r
<p>2. 分类分级原则 灵活掌握分类标准, 先重后轻, 合理
调配。</p>\r
<p>3. 救命优先原则 灾害现场检伤分类一般不包括伤员的治疗,但当出现气道梗阻等危及生命的情况且简单手法即可缓解时,可先抢救后分类或边抢救边分类。</p>\r
<p>4. 自主决策原则 检伤人员有权根据现场需要和可利用的资源,自主决定伤员流向和医学处置类型。</p>\r
<p>5. 重复检伤原则 医护人员应对伤员伤情进行动态评估,每隔一定时间应再次检伤。</p>\r
<p>6. 公平有效原则 以尽可能挽救更多伤员为原则,灾害现场检伤应兼顾公平性和有效性。</p>\r
<p>二、类型</p>\r
<p>1. 收容分类 是接收伤员的第一步,目的是快速识别需要优先抢救的伤员,同时帮助其脱离危险环境,安排前往相应区域接受进一步检查和治疗。</p>\r
<p>2. 救治分类 是决定救治顺序的伤情分类。主要是将轻、中、重伤员分开，以便确定救治优先顺序。应首先评估伤员的伤情严重程度，确定相应的救护措施，结合伤员数量和可利用的救护资源决定救治顺序。</p>\r
<p>3. 后送分类 是确定将伤员尽快转运到确定性医疗机构顺序的分类。应根据伤员伤情的紧迫性和耐受性、需采取的救护措施、可选择的后送工具等情况，决定伤员的后送顺序、后送工具及目的地。</p>\r
<p>三、常用方法</p>\r
<p>1. START 最为常用,是基于呼吸、心跳及意识状况的检伤分类方法。该方法将伤员分为4组,分别标识为红、黄、绿、黑4种颜色(详见第一章第三节相关内容)。在分类过程中,医护人员仅为伤员提供必须的急救措施,如开放气道、止血等,强调用于每位伤员的评估和处置时间不超过30s。START的具体评估流程见图4-1。</p>\r
<p>2. Jump START 是对 START 进行修正后,用于受伤儿童(1~8岁)检伤分类的方法。分组方法和分类依据与 START 相似,但基于儿童的生理特点对分类依据做了调整(图 4-2)。</p>\r
<p>3. SALT 是融检伤分类、紧急救治、后续处置与转运为一体的，适用于大规模伤亡事件的预检分诊系统，包括分类（sort）、评估（assessment）、挽救生命（life-saving intervention）及处置/转运（treatment/transport）（图4-3）。</p>\r
<p style="text-align: center;">图4-1 START分类流程</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540017-2-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540017-3-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">A 表示“清醒”, V 表示“对声音刺激有反应”,P 表示“对疼痛刺激有反应”, U 表示“对任何刺激无反应”。</p>\r
<p>图4-2 Jump START分类流程</p>\r
<p style="text-align: center;">图4-3 SALT大规模伤亡事件检伤分类流程</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540017-4-l.jpg" /><figcaption></figcaption></figure>\r
<p>四、灾害现场的救护</p>\r
<p>(一)伤员的安置</p>\r
<p>伤员在检伤分类区经伤情评估和分类后,可被安置于伤员治疗区(一般设在相对安全的建筑物或帐篷内)。如果伤员人数不多,治疗区可与检伤区合并,以减少对伤员的搬动。如果人数较多,则应独立设置治疗区,以免互相干扰;需将治疗区细分为轻、重和危重区,以提高抢救效率。</p>\r
<p>(二)伤员的转运和暂缓转运指征</p>\r
<p>1. 转运指征 符合以下条件之一者可转运: ①伤情需要, 现场处理后出现并发症或现场救援能力有限。②伤员或家属要求, 转运前需仔细评估、确认伤员不会因搬动或转运而使伤情恶化, 甚至危及生命。</p>\r
<p>2. 暂缓转运指征 符合以下情况之一者应暂缓转运: ①休克未纠正、血流动力学不稳定者。②存在颅脑外伤,疑有颅内高压,可能发生脑疝者。③颈髓
损伤,有呼吸功能障碍者。④存在心脏等脏器衰竭者。⑤胸、腹部损伤后伤情不稳定,随时有生命危险者。⑥伤员或家属依从性差者。</p>\r
`},{id:"module5-task3",title:"第三节 常见灾害事故的现场救护",order:3,rawContent:`案例导学

某高速公路上两辆汽车相撞致20人受伤，120调度中心接到报警电话后派出急救团队到现场急救。急救人员在现场发现：1人股骨开放性骨折，1人疑有颈椎损伤，1人开放性气胸，1人左手掌离断伤，1人肠外溢，14人皮肤擦伤及裂伤，1人死亡。

请思考：

1. 作为一名参与该交通事故现场急救的护士,应如何对这些伤员进行检伤分类?

2. 应如何对这些伤员实施现场救护？

一、地震伤员的救护

地震可瞬间造成建筑物坍塌、公共设施破坏，导致人员伤亡、财产损失，以及环境和社会功能的破坏。地震具有突发性、不可预测性、频度较高的特点，引起的次生灾害严重。因此，掌握地震发生时的脱险方法、震后自救及对伤员实施有效救治是至关重要的。

(一)主要伤情

1. 机械性损伤 坍塌的建筑物、家具等砸压和掩埋人体可致机械性损伤，以四肢远端骨折和软组织损伤最为常见，占60%~70%，其次为脊柱损伤及胸、腹部损伤。

2. 坠落伤 多因受灾人员在地震发生时由高处坠落所致。

3. 完全性饥饿 受灾人员长时间被困于废墟中,断食断饮,体内储存的营养物质耗竭,导致代谢紊乱、虚脱而濒临死亡。

4. 挤压综合征 受灾人员长时间受坍塌重物挤压,引起肌肉组织缺血性坏死并释放大量有害物质入血,可导致休克和肾衰竭。

5. 其他 地震不仅可造成严重的原生灾害,还可引发许多次生灾害,如火灾、水灾、毒气泄漏等,这些次生灾害可导致烧伤、淹溺、中毒等伤害。

(二) 救援要点

1. 检伤分类 由经验丰富的医护人员负责检伤,由其迅速按照程序对所有伤员进行检伤,根据分类结果将伤员安置到不同区域以便快速处置,注意对伤员进行动态评估和再次检伤。

2. 现场救护

(1)迅速使伤员脱离险境,遵循先近后远,先易后难,先挖后救,先救命后治伤,先救幸存者后处置遗体的原则。

(2)保持伤员呼吸道通畅,防止持续性污染物的吸入,给予氧气吸入。

(3) 就地取材, 对骨折部位进行固定, 固定前后注意评估神经、血管的情况。

(4) 对出血部位进行止血、包扎。

(5) 对脱水伤员尽早进行补液。

(6)对存在挤压伤的伤员应注意监测血压、尿量和受压局部的情况。

地震灾区大规模救援和转运通常采用军队作战模式,主要后送方式有飞机后送、卫生列车后送和普通客车后送三种。具体转运技术和注意事项可参阅第一章第三节相关内容。

二、火灾伤员的救护

火灾是日常生活中常见的一种灾害。火灾现场烟雾蔓延的速度是火的4～6倍，火灾中因吸入浓烟而致死者是被火烧死者的数倍。浓烟致死的主要原因是一氧化碳中毒。另外，橡胶、尼龙、羊毛、丝绸等物品燃烧时能产生对人体有害的剧毒气体。应根据伤员伤情采取相应的救护措施。

1. 火焰、热力引起的吸入性损伤 指热力和(或)烟雾引起的呼吸道甚至肺实质的损伤。热力引起的损伤为物理性损伤,常因吸入蒸汽、高热空气等引起。烟雾引起的损伤主要为化学性损伤,其危害重于热力,损害也不仅限于呼吸道,可能导致全身中毒。患者可出现肺炎、肺水肿、气道梗阻等一系列并发症,严重时导致呼吸衰竭,危及生命。

(1) 损伤判断: 具体如下。

1) 轻度吸入性损伤: 指声门以上, 包括鼻、咽和声门的损伤, 表现为黏膜充血、肿胀、形成水疱、黏膜糜烂, 尤以声门以上区域肿胀明显。伤员常出现喘息、声音嘶哑、吞咽困难、口鼻渗液增多等呼吸道阻塞症状, 小儿症状会更为明显, 可引起窒息而导致死亡。

2) 中度吸入性损伤: 指气管隆嵴水平以上, 包括喉和气管的损伤, 伤员常出现喘息及支气管痉挛。

3) 重度吸入性损伤: 指支气管和肺泡水平以上的损伤。伤员立即或短期内出现严重的呼吸困难，并很快因呼吸衰竭而死亡。

(2) 现场救护: 具体如下。

1) 观察伤员的生命体征。

2) 发生呼吸、心跳停止时, 现场进行心肺复苏。

3) 脱去燃烧和污染的外衣, 松解腰带, 尽量脱离现场, 吸入新鲜空气, 鼓励其咳嗽及深呼吸, 为其翻身、拍背。

4) 立即给予氧气吸入。

5) 给予地塞米松 20mg 静脉注射。

6)有支气管痉挛者,常用氨茶碱0.25g加入0.9%氯化钠溶液20mL中静脉滴注。

7) 在 0.9% 氯化钠溶液 20mL 中加入地塞米松 10mg、沐舒坦 4mL、庆大霉素 8 万 U，进行雾化，以湿化气道，有利于分泌物排出。

8) 现场救护者应在技术条件允许的情况下,为伤员行气管内插管。

9) 将重伤伤员迅速转入就近医院治疗, 必要时尽快行气管切开。

2. 烧伤 火灾常导致人员烧伤。同时，若在火场中大声呼喊、奔跑，除加重烧伤外，亦可造成吸入性损伤。因此，当遭遇火焰烧伤时，应立即离开火场，脱去燃烧的衣物，如不能及时脱去，应立即在地上打滚，或用湿布覆盖，或用水灭火，灭火后用干净床单或衣物简单包扎，保护创面，之后将伤员转送至医院。

(1) 现场判断: 烧伤可造成局部组织损伤, 轻者损伤皮肤, 出现肿胀、水疱; 重者皮肤烧焦, 甚至血管、神经、肌腱等同时受损。烧伤引起的剧痛和皮肤渗出等可导致休克。

1) 烧伤面积: 比较通用的是以烧伤皮肤面积占全身体表面积的百分数来计算, 即新九分法。在体表总面积中, 头颈部占 9%; 双上肢占 18%; 躯干前后(含会阴)占 27%; 双下肢(含臀部)占 46%。还有一种简便的计算方法, 以伤者本人手掌(包括手指)面积为体表总面积的 1%, 以此计算小面积烧伤。

2) 烧伤性休克: 指伤员因烧伤出现烦渴、烦躁不安、尿少、脉快而细、血压下降、四肢厥冷、发绀、苍白、呼吸增快等休克表现。

考点提示：计算烧伤面积的新九分法。

(2) 现场救护: 具体如下。

1) 迅速脱离热源,除去燃烧的衣物,用冷水冲洗或浸泡伤处,降低表面温度,同时紧急呼救,启动EMSS。

2) 迅速评估患者有无致命性损伤, 如心搏骤停、复合伤、窒息、大出血、开放性气胸、严重中毒等。若有心搏骤停应立即实施心肺复苏。

3) 保护创面, 去除衣物时, 应注意避免二次伤害, 表皮有水疱时不要刺破。对创面可用干净的敷料简单包扎予以保护, 避免受压、污染。禁用任何有色物涂抹, 以免影响对烧伤程度的判断。

4)严重口渴者可口服少量淡盐水或淡盐茶。条件许可时,可服用烧伤饮料。

5)保持呼吸道通畅,将合并一氧化碳中毒者尽快转移至通风处,有条件者可给予氧气吸入。

6) 遇有大面积烧伤或休克者, 应立即建立静脉通道, 进行快速有效地补液, 以及早纠正休克。

7) 应尽快将伤员转运至有救治条件的医院进行治疗。

3. 伤员的分类和转运 做好火灾现场伤员的分类和转运,使伤员得到最佳治疗,可明显降低死亡率。对于少数重度烧伤伤员,在现场救护处置完毕后应尽快将其送至医院进行救治;而对于大量伤员,必须在现场对伤员进行评估、快速分类及合理分流,使尽可能多的伤员得到及时、有效的救治。现场评估的分类原则如下。

(1) 对呼吸、心跳停止者，应在现场立即实施心肺复苏并建立静脉通道，待呼吸、心跳恢复后由专人护送。未能恢复呼吸、心跳者，使患者平卧于救护车上，给予持续心肺复苏，并及时与后方医院联系，尽可能缩短转运的距离和时间。

(2) 对中重度烧伤者, 应在现场进行液体复苏或在距现场最近的医疗机构进行液体复苏后再行转运。

(3) 对呼吸、循环功能不稳定, 随时有生命危险者
(包括复苏成功或正在进行心肺复苏者, 严重颅脑外伤和胸、腹部外伤者, 特重度烧伤及严重吸入性损伤伴窒息者, 需立即进行抢救性手术和改善通气者), 应标以红色标识, 实行“紧急先送”。

(4) 对生命体征平稳、中重度烧伤、一般性骨折、胸部损伤、腹部损伤、切割伤者，应标以黄色标识，实行“优先后送”。伤员数量较多时，应尽量分送至多家医院，避免将伤员集中送至一家医院。

(5)一般的轻伤者可以标以绿色标识,实行“暂缓后送”。

(6)护送前要向接收医院通报患者的数量、伤情、预计抵达时间,以便医院进行应对和快速救治。

三、水灾伤员的救护

水灾是指江河洪水泛滥、城乡暴雨积水和土壤水分过多，致使人类社会蒙受重大损失的自然灾害。洪水灾害常伴随狂风、暴雨等恶劣天气，水流湍急，往往导致人们被困、失踪甚至死亡。特别是在山区、河谷等地理环境复杂的地区，洪水可能引发泥石流、山体滑坡等次生灾害，进一步加剧人员伤亡。洪水过后，灾区容易滋生各种疾病，如痢疾、霍乱等。受淹的水源、食物等易受到污染，增加了疾病传播风险。同时，洪水还可能导致蚊蝇等害虫大量繁殖，进一步加剧卫生问题。洪水灾害还会给受灾人员带来极大的心理压力，产生恐惧、焦虑、悲伤等不良情绪。这些负面情绪可能导致心理疾病的发生，如抑郁症、创伤后应激障碍等。

(一)主要伤情

1. 淹溺 伤员可因溺水引起窒息, 淹溺的进程很快, 若抢救不及时, 4~6min 即可引起呼吸、心跳停止而导致死亡。研究显示, 溺水 6~9min 死亡率可达 65%, 超过 25min 可引起严重的后遗症, 甚至导致死亡。但若在 1~2min 内得到正确救护, 抢救成功率几乎接近 100%, 因此, 对淹溺者的急救必须分秒必争。

2. 机械性损伤 受洪水冲刷而倒塌的建筑物及山石、树木均可导致人体损伤。

3. 触电 洪水毁坏输电设备或建筑物内的电气设备, 可致人触电。

4. 虫、蛇咬伤 受灾人员为躲避洪水可能暂避于野外, 易受虫、蛇袭击而致伤, 咬伤处可出现瘙痒、肿胀、疼痛或出血, 严重时可危及生命。

5. 传染性疾病 水灾后人畜尸体腐烂、水源污染严重、蚊蝇滋生，可导致传染性疾病的暴发流行，且疫情比较复杂。

(二) 救援要点

1. 检伤分类 由经验丰富的医护人员在较宽阔的场所进行伤情评估,快速识别需紧急救治的伤员,如窒息、创伤性大出血等,注意对潜在的传染病患者进行防护与隔离。

2. 其他相关的现场救护

(1) 淹溺: 详见第三章第二节。

(2)触电:详见第三章第二节。

(3)毒蛇咬伤:详见第三章第二节。

(4)传染病:从管理传染源、切断传播途径及保护易感人群等环节进行救护。

四、道路交通事故伤员的救护

道路交通事故是指车辆在道路上因过错或意外造成的人身伤亡或财产损失的事件。随着社会的发展和进步、旅客和货物的运输量增多，特别是随着机动车拥有量的扩大，道路交通事故日益增多。

(一) 伤情特点

道路交通事故通常瞬间发生，严重时现场往往车毁人亡。伤亡人员可以是单个，也可见成批人员伤亡，而且损伤因素多，伤情轻重不一。现场也常出现爆炸和火灾，伤员常被困在狭小空间内，救援难度大，尤其是特大交通事故。

1. 损伤机制不同,伤情不一 道路交通事故可造成多种损伤,如撞击伤、碾压伤、切割伤、跌落伤、撕裂伤、挥鞭样损伤、骨折等,以头面部及四肢损伤的比例最高,其次为胸、腹部和脊柱伤。

2. 伤情严重,死亡率高 道路交通事故往往造成多发性创伤、复合伤,伤员伤情复杂,易出现休克,死亡率高。

3. 现场判断难,救护矛盾多 道路交通事故伤员可同时存在闭合性损伤和开放性损伤,也可能存在多部位、多系统损伤。伤员往往成批出现,伤情重,现场难以快速、正确判断,从而给现场医护人员的工作造成一定的困难。

(二) 救援要点

道路交通事故发生的原因各不相同，在处置不同的事故现场时，要保持冷静，仔细分析，综合判断，实施科学救援。发生道路交通事故后，要迅速报警，现场应统一指挥，救护者可结合现场询问实施救援，遵循“边抢边救，先重后轻”的原则。

1. 基本步骤

(1)迅速报警:急救电话为120;综合救援电话为119;事故处置电话为122;刑事案件报警电话为110。在实施多功能合一的区域,拨打报警电话“110”即可。

(2) 统一指挥: 当发生重大道路交通事故时, 现场应统一指挥, 迅速组织人员进行抢救。如交通不便或难以开展救护, 应立即请求综合救援。

(3) 现场询问: 事故发生后, 应迅速了解车辆的种类、伤员的基本情况等。迅速判断伤员有无呼吸、心跳停止, 胸腹部脏器出血, 颅脑损伤, 脊髓损伤及严重的多器官损伤。

(4) 确定救护手段: 事故发生后, 应将失事车辆引擎关闭并制动。如伤者被压于车轮或其他物体下, 禁止拖拉硬拽, 以免加重损伤, 应在人员充足或设备齐全时采取推、抬或用设备吊、移等措施。现场禁止人为点火发动车辆, 以防发生火灾及爆炸。人员被挤夹在车内时, 应仔细观察, 确定人员的具体位置。救护者应遵循“边抢边救, 以救为主”的原则, 对伤员实施辅助通气、止血、包扎、固定、搬运及维持生命体征的急救措施。

(5) 检伤分类: 主要目的是区分伤员伤情的轻重缓急, 以便进行科学救护。

(6)“先重后轻”原则:现场检伤分类后,识别危重伤员是医疗救护的主要任务,应按下列顺序对伤员实施救护。①危重伤员,如严重颅脑损伤、颈椎损伤、昏迷、各类休克、呼吸道烧伤、严重挤压伤、大出血、内脏损伤、张力性气胸、颌面外伤、大面积烧伤(30%以上)伤员,应优先救护。②中重伤员,主要指开放性骨折、小面积烧伤(30%以下)、长骨闭合性骨折伤员。这类伤员损伤较重,如不及时采取急救措施可能发展为危重伤,应实施紧急救护。③轻伤伤员,这类伤员损伤较轻,不需要在现场进行特殊处理。

2. 现场救护和转运 详见第一章第三节。

五、矿难伤员的救护

矿难是指在采矿过程中发生的事故,常见的矿难有瓦斯爆炸、煤尘爆炸、透水事故、矿井失火、板顶坍塌等。全球每年至少有数千人死于矿难,特别是一些技术落后、设备简陋的中小型矿井,问题更为突出。

(一)主要伤情

1. 爆炸伤、烧伤 瓦斯爆炸时的瞬间温度可达 1850～2650∘C ，压力可达初压的 9 倍，爆炸源附近气体以每秒百米以上的速度向外冲击。发生矿难后，若人员未及时脱离，均有可能被炸伤或烧伤。

2. 窒息、中毒 爆炸后氧浓度急剧降低，并产生大量的一氧化碳、硫化氢、二氧化碳等气体，有导致窒息和中毒的危险。此外，顶板坍塌后人员被埋压易引起口鼻阻塞，亦可导致窒息。

3. 淹溺 矿井区的水源有大气降水、地表水、含水层水、断层水及采空区积水等,矿难发生后积水涌入,可导致人员淹溺。

4. 机械性损伤 主要包括挫伤、骨折、切割伤、挤压伤、坠落伤等。

(二) 救援要点

1. 检伤与分类 按检伤分类原则对伤员进行快速评估与分类处置。

2. 现场救护

(1) 爆炸伤、烧伤: 保持呼吸道通畅, 给予充分吸氧、止血、保护创面、固定骨折部位, 以及镇痛、补液、抗休克和抗感染治疗。

(2) 窒息、中毒: 立即将患者转运至通风良好处, 保持呼吸道通畅, 给予吸氧; 根据中毒情况采取相应救护措施。

(3) 淹溺、机械性损伤: 按照相应医疗救援程序实施救护。

六、突发公共卫生事件救护

突发公共卫生事件是造成或者可能造成社会公众健康严重损害的重大传染病疫情、群体不明原因的疾病、重大食物中毒和职业中毒，以及其他严重影响公众健康的突发事件。

(一)危害特点

1. 突发性 事件多为突然发生,难以预测,无法立即做出相应的应对措施。

2. 成因的多样性 许多突发公共卫生事件与自然灾害有关,如地震、洪水过后常引发大的疫情。

部分突发公共卫生事件与环境污染、生态破坏有关。社会安全事件也是引发突发公共卫生事件的一个重要原因。

3. 分布的差异性 某些突发公共卫生事件在时间分布上有差异性,如不同
季节传染病的发病率不同。

4. 传播的广泛性 传染病一旦具备传染源、传播途径及易感人群, 就可能在世界范围内广泛传播。

5. 复杂性及多样性 突发公共卫生事件不仅对人的健康有影响,对环境、经济都有一定影响。引起突发公共卫生事件的因素是多样的,如生物因素、自然灾害、食品药品安全事件等。

6. 新发事件增多 近年来,突发公共卫生事件的发生越来越频繁,这与忽视生态保护、有毒有害物质滥用、公共卫生事业建设投入不足有关。如 SARS 疫情、禽流感疫情、手足口病疫情等,都威胁着人类的健康。

(二)急救原则

1. 建立突发公共卫生事件应急处理指挥部 事件发生后,应由有关部门成立突发公共卫生事件应急处理指挥部,实行统一领导、统一指挥。

2. 做好应急预案 包括对突发公共卫生事件的监测和预警;建立突发公共卫生事件信息的收集、分析、报告与通报制度;制订事件的分级和应急工作方案;做好现场控制及应急设施、设备、药品及医疗器械的储备和调度。

3. 积极上报 发生突发公共卫生事件时,必须及时向上级有关部门汇报。

4. 现场处理原则 突发公共卫生事件情况紧急,应立即将受害者送往有条件的专科医院,必要时立即隔离。对传染病患者和疑似传染病患者,应采取就地隔离、就地观察、就地治疗的措施,减少病原体的扩散。

目标检测

1. 下列关于灾害现场检伤分类的描述, 正确的是( )。

A. 分类时无须做紧急处理

B. 红色代表中重伤, 应在 4~6h 内得到有效治疗

C. 黄色代表危重伤, 应在 1h 内转运

D. 应每隔一段时间再次对伤员进行伤情评估

E. 黑色代表致命伤, 需立即进行基础生命支持

2. 下列需要优先实施现场救护的伤情是( )。

A. 肾挫伤 B. 尿道损伤 C. 下颌骨骨折

D. 皮肤擦伤 E. 窒息

3.下列伤员应立即转运的是( )。

A. 窒息

B. 休克

C. 张力性气胸

D. 呼吸、心跳停止

E. 肠膨出, 已行腹部包扎

4. 地震后建筑破坏引起的火灾属于( )。

A. 人为灾害 B. 原生灾害 C. 次生灾害

D. 衍生灾害 E. 渐变灾害

5. 关于职业暴露应急处理措施,说法错误的是( )。

A. 完整的皮肤、黏膜受污染时,可以不用冲洗、消毒

B. 皮肤伤口受污染时,先挤压伤口,尽可能挤出损伤处血液,再用肥皂清洗、流动水冲洗、消毒

C. 受伤的手应戴双层手套操作

D. 发生损伤性职业暴露, 应留取伤员的血液标本检验

E. 发生职业暴露后, 应立即进行紧急处置并主动上报

6. 下列不属于灾难现场检伤分类原则的是( )。

A. 简单快速原则 B. 分类分级原则 C. 救命优先原则

D. 不重复检伤原则 E. 自主决策原则

7. 对于生命体征稳定的严重损伤,有潜在生命危险者用( )色标识。

A. 红 B. 黄 C. 绿

D. 黑 E. 蓝

(冯 静 牛辉妮 张云萍)`,rawHtml:`<p>案例导学</p>\r
<p>某高速公路上两辆汽车相撞致20人受伤，120调度中心接到报警电话后派出急救团队到现场急救。急救人员在现场发现：1人股骨开放性骨折，1人疑有颈椎损伤，1人开放性气胸，1人左手掌离断伤，1人肠外溢，14人皮肤擦伤及裂伤，1人死亡。</p>\r
<p>请思考：</p>\r
<p>1. 作为一名参与该交通事故现场急救的护士,应如何对这些伤员进行检伤分类?</p>\r
<p>2. 应如何对这些伤员实施现场救护？</p>\r
<p>一、地震伤员的救护</p>\r
<p>地震可瞬间造成建筑物坍塌、公共设施破坏，导致人员伤亡、财产损失，以及环境和社会功能的破坏。地震具有突发性、不可预测性、频度较高的特点，引起的次生灾害严重。因此，掌握地震发生时的脱险方法、震后自救及对伤员实施有效救治是至关重要的。</p>\r
<p>(一)主要伤情</p>\r
<p>1. 机械性损伤 坍塌的建筑物、家具等砸压和掩埋人体可致机械性损伤，以四肢远端骨折和软组织损伤最为常见，占60%~70%，其次为脊柱损伤及胸、腹部损伤。</p>\r
<p>2. 坠落伤 多因受灾人员在地震发生时由高处坠落所致。</p>\r
<p>3. 完全性饥饿 受灾人员长时间被困于废墟中,断食断饮,体内储存的营养物质耗竭,导致代谢紊乱、虚脱而濒临死亡。</p>\r
<p>4. 挤压综合征 受灾人员长时间受坍塌重物挤压,引起肌肉组织缺血性坏死并释放大量有害物质入血,可导致休克和肾衰竭。</p>\r
<p>5. 其他 地震不仅可造成严重的原生灾害,还可引发许多次生灾害,如火灾、水灾、毒气泄漏等,这些次生灾害可导致烧伤、淹溺、中毒等伤害。</p>\r
<p>(二) 救援要点</p>\r
<p>1. 检伤分类 由经验丰富的医护人员负责检伤,由其迅速按照程序对所有伤员进行检伤,根据分类结果将伤员安置到不同区域以便快速处置,注意对伤员进行动态评估和再次检伤。</p>\r
<p>2. 现场救护</p>\r
<p>(1)迅速使伤员脱离险境,遵循先近后远,先易后难,先挖后救,先救命后治伤,先救幸存者后处置遗体的原则。</p>\r
<p>(2)保持伤员呼吸道通畅,防止持续性污染物的吸入,给予氧气吸入。</p>\r
<p>(3) 就地取材, 对骨折部位进行固定, 固定前后注意评估神经、血管的情况。</p>\r
<p>(4) 对出血部位进行止血、包扎。</p>\r
<p>(5) 对脱水伤员尽早进行补液。</p>\r
<p>(6)对存在挤压伤的伤员应注意监测血压、尿量和受压局部的情况。</p>\r
<p>地震灾区大规模救援和转运通常采用军队作战模式,主要后送方式有飞机后送、卫生列车后送和普通客车后送三种。具体转运技术和注意事项可参阅第一章第三节相关内容。</p>\r
<p>二、火灾伤员的救护</p>\r
<p>火灾是日常生活中常见的一种灾害。火灾现场烟雾蔓延的速度是火的4～6倍，火灾中因吸入浓烟而致死者是被火烧死者的数倍。浓烟致死的主要原因是一氧化碳中毒。另外，橡胶、尼龙、羊毛、丝绸等物品燃烧时能产生对人体有害的剧毒气体。应根据伤员伤情采取相应的救护措施。</p>\r
<p>1. 火焰、热力引起的吸入性损伤 指热力和(或)烟雾引起的呼吸道甚至肺实质的损伤。热力引起的损伤为物理性损伤,常因吸入蒸汽、高热空气等引起。烟雾引起的损伤主要为化学性损伤,其危害重于热力,损害也不仅限于呼吸道,可能导致全身中毒。患者可出现肺炎、肺水肿、气道梗阻等一系列并发症,严重时导致呼吸衰竭,危及生命。</p>\r
<p>(1) 损伤判断: 具体如下。</p>\r
<p>1) 轻度吸入性损伤: 指声门以上, 包括鼻、咽和声门的损伤, 表现为黏膜充血、肿胀、形成水疱、黏膜糜烂, 尤以声门以上区域肿胀明显。伤员常出现喘息、声音嘶哑、吞咽困难、口鼻渗液增多等呼吸道阻塞症状, 小儿症状会更为明显, 可引起窒息而导致死亡。</p>\r
<p>2) 中度吸入性损伤: 指气管隆嵴水平以上, 包括喉和气管的损伤, 伤员常出现喘息及支气管痉挛。</p>\r
<p>
3) 重度吸入性损伤: 指支气管和肺泡水平以上的损伤。伤员立即或短期内出现严重的呼吸困难，并很快因呼吸衰竭而死亡。</p>\r
<p>(2) 现场救护: 具体如下。</p>\r
<p>1) 观察伤员的生命体征。</p>\r
<p>2) 发生呼吸、心跳停止时, 现场进行心肺复苏。</p>\r
<p>3) 脱去燃烧和污染的外衣, 松解腰带, 尽量脱离现场, 吸入新鲜空气, 鼓励其咳嗽及深呼吸, 为其翻身、拍背。</p>\r
<p>4) 立即给予氧气吸入。</p>\r
<p>5) 给予地塞米松 20mg 静脉注射。</p>\r
<p>6)有支气管痉挛者,常用氨茶碱0.25g加入0.9%氯化钠溶液20mL中静脉滴注。</p>\r
<p>7) 在 0.9% 氯化钠溶液 20mL 中加入地塞米松 10mg、沐舒坦 4mL、庆大霉素 8 万 U，进行雾化，以湿化气道，有利于分泌物排出。</p>\r
<p>8) 现场救护者应在技术条件允许的情况下,为伤员行气管内插管。</p>\r
<p>9) 将重伤伤员迅速转入就近医院治疗, 必要时尽快行气管切开。</p>\r
<p>2. 烧伤 火灾常导致人员烧伤。同时，若在火场中大声呼喊、奔跑，除加重烧伤外，亦可造成吸入性损伤。因此，当遭遇火焰烧伤时，应立即离开火场，脱去燃烧的衣物，如不能及时脱去，应立即在地上打滚，或用湿布覆盖，或用水灭火，灭火后用干净床单或衣物简单包扎，保护创面，之后将伤员转送至医院。</p>\r
<p>(1) 现场判断: 烧伤可造成局部组织损伤, 轻者损伤皮肤, 出现肿胀、水疱; 重者皮肤烧焦, 甚至血管、神经、肌腱等同时受损。烧伤引起的剧痛和皮肤渗出等可导致休克。</p>\r
<p>1) 烧伤面积: 比较通用的是以烧伤皮肤面积占全身体表面积的百分数来计算, 即新九分法。在体表总面积中, 头颈部占 9%; 双上肢占 18%; 躯干前后(含会阴)占 27%; 双下肢(含臀部)占 46%。还有一种简便的计算方法, 以伤者本人手掌(包括手指)面积为体表总面积的 1%, 以此计算小面积烧伤。</p>\r

<p>2) 烧伤性休克: 指伤员因烧伤出现烦渴、烦躁不安、尿少、脉快而细、血压下降、四肢厥冷、发绀、苍白、呼吸增快等休克表现。</p>\r
<p>考点提示：计算烧伤面积的新九分法。</p>\r
<p>(2) 现场救护: 具体如下。</p>\r
<p>1) 迅速脱离热源,除去燃烧的衣物,用冷水冲洗或浸泡伤处,降低表面温度,同时紧急呼救,启动EMSS。</p>\r
<p>2) 迅速评估患者有无致命性损伤, 如心搏骤停、复合伤、窒息、大出血、开放性气胸、严重中毒等。若有心搏骤停应立即实施心肺复苏。</p>\r
<p>3) 保护创面, 去除衣物时, 应注意避免二次伤害, 表皮有水疱时不要刺破。对创面可用干净的敷料简单包扎予以保护, 避免受压、污染。禁用任何有色物涂抹, 以免影响对烧伤程度的判断。</p>\r
<p>4)严重口渴者可口服少量淡盐水或淡盐茶。条件许可时,可服用烧伤饮料。</p>\r
<p>5)保持呼吸道通畅,将合并一氧化碳中毒者尽快转移至通风处,有条件者可给予氧气吸入。</p>\r
<p>6) 遇有大面积烧伤或休克者, 应立即建立静脉通道, 进行快速有效地补液, 以及早纠正休克。</p>\r
<p>7) 应尽快将伤员转运至有救治条件的医院进行治疗。</p>\r
<p>3. 伤员的分类和转运 做好火灾现场伤员的分类和转运,使伤员得到最佳治疗,可明显降低死亡率。对于少数重度烧伤伤员,在现场救护处置完毕后应尽快将其送至医院进行救治;而对于大量伤员,必须在现场对伤员进行评估、快速分类及合理分流,使尽可能多的伤员得到及时、有效的救治。现场评估的分类原则如下。</p>\r
<p>(1) 对呼吸、心跳停止者，应在现场立即实施心肺复苏并建立静脉通道，待呼吸、心跳恢复后由专人护送。未能恢复呼吸、心跳者，使患者平卧于救护车上，给予持续心肺复苏，并及时与后方医院联系，尽可能缩短转运的距离和时间。</p>\r
<p>(2) 对中重度烧伤者, 应在现场进行液体复苏或在距现场最近的医疗机构进行液体复苏后再行转运。</p>\r
<p>(3) 对呼吸、循环功能不稳定, 随时有生命危险者
(包括复苏成功或正在进行心肺复苏者, 严重颅脑外伤和胸、腹部外伤者, 特重度烧伤及严重吸入性损伤伴窒息者, 需立即进行抢救性手术和改善通气者), 应标以红色标识, 实行“紧急先送”。</p>\r
<p>(4) 对生命体征平稳、中重度烧伤、一般性骨折、胸部损伤、腹部损伤、切割伤者，应标以黄色标识，实行“优先后送”。伤员数量较多时，应尽量分送至多家医院，避免将伤员集中送至一家医院。</p>\r
<p>(5)一般的轻伤者可以标以绿色标识,实行“暂缓后送”。</p>\r
<p>(6)护送前要向接收医院通报患者的数量、伤情、预计抵达时间,以便医院进行应对和快速救治。</p>\r
<p>三、水灾伤员的救护</p>\r
<p>水灾是指江河洪水泛滥、城乡暴雨积水和土壤水分过多，致使人类社会蒙受重大损失的自然灾害。洪水灾害常伴随狂风、暴雨等恶劣天气，水流湍急，往往导致人们被困、失踪甚至死亡。特别是在山区、河谷等地理环境复杂的地区，洪水可能引发泥石流、山体滑坡等次生灾害，进一步加剧人员伤亡。洪水过后，灾区容易滋生各种疾病，如痢疾、霍乱等。受淹的水源、食物等易受到污染，增加了疾病传播风险。同时，洪水还可能导致蚊蝇等害虫大量繁殖，进一步加剧卫生问题。洪水灾害还会给受灾人员带来极大的心理压力，产生恐惧、焦虑、悲伤等不良情绪。这些负面情绪可能导致心理疾病的发生，如抑郁症、创伤后应激障碍等。</p>\r
<p>(一)主要伤情</p>\r
<p>1. 淹溺 伤员可因溺水引起窒息, 淹溺的进程很快, 若抢救不及时, 4~6min 即可引起呼吸、心跳停止而导致死亡。研究显示, 溺水 6~9min 死亡率可达 65%, 超过 25min 可引起严重的后遗症, 甚至导致死亡。但若在 1~2min 内得到正确救护, 抢救成功率几乎接近 100%, 因此, 对淹溺者的急救必须分秒必争。</p>\r
<p>2. 机械性损伤 受洪水冲刷而倒塌的建筑物及山石、树木均可导致人体损伤。</p>\r
<p>3. 触电 洪水毁坏输电设备或建筑物内的电气设备, 可致人触电。</p>\r
<p>4. 虫、蛇咬伤 受灾人员为躲避洪水可能暂避于野外, 易受虫、蛇袭击而致伤, 咬伤处可出现瘙痒、肿胀、疼痛或出血, 严重时可危及生命。</p>\r
<p>5. 传染性疾病 水灾后人畜尸体腐烂、水源污染严重、蚊蝇滋生，可导致传染性疾病的暴发流行，且疫情比较复杂。</p>\r
<p>(二) 救援要点</p>\r
<p>1. 检伤分类 由经验丰富的医护人员在较宽阔的场所进行伤情评估,快速识别需紧急救治的伤员,如窒息、创伤性大出血等,注意对潜在的传染病患者进行防护与隔离。</p>\r
<p>2. 其他相关的现场救护</p>\r
<p>(1) 淹溺: 详见第三章第二节。</p>\r
<p>(2)触电:详见第三章第二节。</p>\r
<p>(3)毒蛇咬伤:详见第三章第二节。</p>\r
<p>(4)传染病:从管理传染源、切断传播途径及保护易感人群等环节进行救护。</p>\r
<p>四、道路交通事故伤员的救护</p>\r
<p>道路交通事故是指车辆在道路上因过错或意外造成的人身伤亡或财产损失的事件。随着社会的发展和进步、旅客和货物的运输量增多，特别是随着机动车拥有量的扩大，道路交通事故日益增多。</p>\r
<p>(一) 伤情特点</p>\r
<p>道路交通事故通常瞬间发生，严重时现场往往车毁人亡。伤亡人员可以是单个，也可见成批人员伤亡，而且损伤因素多，伤情轻重不一。现场也常出现爆炸和火灾，伤员常被困在狭小空间内，救援难度大，尤其是特大交通事故。</p>\r
<p>1. 损伤机制不同,伤情不一 道路交通事故可造成多种损伤,如撞击伤、碾压伤、切割伤、跌落伤、撕裂伤、挥鞭样损伤、骨折等,以头面部及四肢损伤的比例最高,其次为胸、腹部和脊柱伤。</p>\r
<p>2. 伤情严重,死亡率高 道路交通事故往往造成多发性创伤、复合伤,伤员伤情复杂,易出现休克,死亡率高。</p>\r

<p>3. 现场判断难,救护矛盾多 道路交通事故伤员可同时存在闭合性损伤和开放性损伤,也可能存在多部位、多系统损伤。伤员往往成批出现,伤情重,现场难以快速、正确判断,从而给现场医护人员的工作造成一定的困难。</p>\r
<p>(二) 救援要点</p>\r
<p>道路交通事故发生的原因各不相同，在处置不同的事故现场时，要保持冷静，仔细分析，综合判断，实施科学救援。发生道路交通事故后，要迅速报警，现场应统一指挥，救护者可结合现场询问实施救援，遵循“边抢边救，先重后轻”的原则。</p>\r
<p>1. 基本步骤</p>\r
<p>(1)迅速报警:急救电话为120;综合救援电话为119;事故处置电话为122;刑事案件报警电话为110。在实施多功能合一的区域,拨打报警电话“110”即可。</p>\r
<p>(2) 统一指挥: 当发生重大道路交通事故时, 现场应统一指挥, 迅速组织人员进行抢救。如交通不便或难以开展救护, 应立即请求综合救援。</p>\r
<p>(3) 现场询问: 事故发生后, 应迅速了解车辆的种类、伤员的基本情况等。迅速判断伤员有无呼吸、心跳停止, 胸腹部脏器出血, 颅脑损伤, 脊髓损伤及严重的多器官损伤。</p>\r
<p>(4) 确定救护手段: 事故发生后, 应将失事车辆引擎关闭并制动。如伤者被压于车轮或其他物体下, 禁止拖拉硬拽, 以免加重损伤, 应在人员充足或设备齐全时采取推、抬或用设备吊、移等措施。现场禁止人为点火发动车辆, 以防发生火灾及爆炸。人员被挤夹在车内时, 应仔细观察, 确定人员的具体位置。救护者应遵循“边抢边救, 以救为主”的原则, 对伤员实施辅助通气、止血、包扎、固定、搬运及维持生命体征的急救措施。</p>\r
<p>(5) 检伤分类: 主要目的是区分伤员伤情的轻重缓急, 以便进行科学救护。</p>\r
<p>(6)“先重后轻”原则:现场检伤分类后,识别危重伤员是医疗救护的主要任务,应按下列顺序对伤员实施救护。①危重伤员,如严重颅脑损伤、颈椎损伤、昏迷、各类休克、呼吸道烧伤、严重挤压伤、大出血、内脏损伤、张力性气胸、颌面外伤、大面积烧伤(30%以上)伤员,应优先救护。②中重伤员,主要指开放性骨折、小面积烧伤(30%以下)、长骨闭合性骨折伤员。这类伤员损伤较重,如不及时采取急救措施可能发展为危重伤,应实施紧急救护。③轻伤伤员,这类伤员损伤较轻,不需要在现场进行特殊处理。</p>\r
<p>2. 现场救护和转运 详见第一章第三节。</p>\r
<p>五、矿难伤员的救护</p>\r
<p>矿难是指在采矿过程中发生的事故,常见的矿难有瓦斯爆炸、煤尘爆炸、透水事故、矿井失火、板顶坍塌等。全球每年至少有数千人死于矿难,特别是一些技术落后、设备简陋的中小型矿井,问题更为突出。</p>\r
<p>(一)主要伤情</p>\r
<p>1. 爆炸伤、烧伤 瓦斯爆炸时的瞬间温度可达 1850～2650<sup>∘</sup>C ，压力可达初压的 9 倍，爆炸源附近气体以每秒百米以上的速度向外冲击。发生矿难后，若人员未及时脱离，均有可能被炸伤或烧伤。</p>\r
<p>2. 窒息、中毒 爆炸后氧浓度急剧降低，并产生大量的一氧化碳、硫化氢、二氧化碳等气体，有导致窒息和中毒的危险。此外，顶板坍塌后人员被埋压易引起口鼻阻塞，亦可导致窒息。</p>\r
<p>3. 淹溺 矿井区的水源有大气降水、地表水、含水层水、断层水及采空区积水等,矿难发生后积水涌入,可导致人员淹溺。</p>\r
<p>4. 机械性损伤 主要包括挫伤、骨折、切割伤、挤压伤、坠落伤等。</p>\r
<p>(二) 救援要点</p>\r
<p>1. 检伤与分类 按检伤分类原则对伤员进行快速评估与分类处置。</p>\r
<p>2. 现场救护</p>\r
<p>(1) 爆炸伤、烧伤: 保持呼吸道通畅, 给予充分吸氧、止血、保护创面、固定骨折部位, 以及镇痛、补液、抗休克和抗感染治疗。</p>\r
<p>(2) 窒息、中毒: 立即将患者转运至通风良好处, 保持呼吸道通畅, 给予吸氧; 根据中毒情况采取相应救护措施。</p>\r
<p>(3) 淹溺、机械性损伤: 按照相应医疗救援程序实施救护。</p>\r
<p>六、突发公共卫生事件救护</p>\r
<p>突发公共卫生事件是造成或者可能造成社会公众健康严重损害的重大传染病疫情、群体不明原因的疾病、重大食物中毒和职业中毒，以及其他严重影响公众健康的突发事件。</p>\r
<p>(一)危害特点</p>\r
<p>1. 突发性 事件多为突然发生,难以预测,无法立即做出相应的应对措施。</p>\r
<p>2. 成因的多样性 许多突发公共卫生事件与自然灾害有关,如地震、洪水过后常引发大的疫情。</p>\r
<p>部分突发公共卫生事件与环境污染、生态破坏有关。社会安全事件也是引发突发公共卫生事件的一个重要原因。</p>\r
<p>3. 分布的差异性 某些突发公共卫生事件在时间分布上有差异性,如不同
季节传染病的发病率不同。</p>\r
<p>4. 传播的广泛性 传染病一旦具备传染源、传播途径及易感人群, 就可能在世界范围内广泛传播。</p>\r
<p>5. 复杂性及多样性 突发公共卫生事件不仅对人的健康有影响,对环境、经济都有一定影响。引起突发公共卫生事件的因素是多样的,如生物因素、自然灾害、食品药品安全事件等。</p>\r
<p>6. 新发事件增多 近年来,突发公共卫生事件的发生越来越频繁,这与忽视生态保护、有毒有害物质滥用、公共卫生事业建设投入不足有关。如 SARS 疫情、禽流感疫情、手足口病疫情等,都威胁着人类的健康。</p>\r
<p>(二)急救原则</p>\r
<p>1. 建立突发公共卫生事件应急处理指挥部 事件发生后,应由有关部门成立突发公共卫生事件应急处理指挥部,实行统一领导、统一指挥。</p>\r
<p>2. 做好应急预案 包括对突发公共卫生事件的监测和预警;建立突发公共卫生事件信息的收集、分析、报告与通报制度;制订事件的分级和应急工作方案;做好现场控制及应急设施、设备、药品及医疗器械的储备和调度。</p>\r

<p>3. 积极上报 发生突发公共卫生事件时,必须及时向上级有关部门汇报。</p>\r
<p>4. 现场处理原则 突发公共卫生事件情况紧急,应立即将受害者送往有条件的专科医院,必要时立即隔离。对传染病患者和疑似传染病患者,应采取就地隔离、就地观察、就地治疗的措施,减少病原体的扩散。</p>\r
<p>目标检测</p>\r
<p>1. 下列关于灾害现场检伤分类的描述, 正确的是( )。</p>\r
<p>A. 分类时无须做紧急处理</p>\r
<p>B. 红色代表中重伤, 应在 4~6h 内得到有效治疗</p>\r
<p>C. 黄色代表危重伤, 应在 1h 内转运</p>\r
<p>D. 应每隔一段时间再次对伤员进行伤情评估</p>\r
<p>E. 黑色代表致命伤, 需立即进行基础生命支持</p>\r
<p>2. 下列需要优先实施现场救护的伤情是( )。</p>\r
<p>A. 肾挫伤 B. 尿道损伤 C. 下颌骨骨折</p>\r
<p>D. 皮肤擦伤 E. 窒息</p>\r
<p>3.下列伤员应立即转运的是( )。</p>\r
<p>A. 窒息</p>\r
<p>B. 休克</p>\r
<p>C. 张力性气胸</p>\r
<p>D. 呼吸、心跳停止</p>\r
<p>E. 肠膨出, 已行腹部包扎</p>\r
<p>4. 地震后建筑破坏引起的火灾属于( )。</p>\r
<p>A. 人为灾害 B. 原生灾害 C. 次生灾害</p>\r
<p>D. 衍生灾害 E. 渐变灾害</p>\r
<p>5. 关于职业暴露应急处理措施,说法错误的是( )。</p>\r
<p>A. 完整的皮肤、黏膜受污染时,可以不用冲洗、消毒</p>\r
<p>B. 皮肤伤口受污染时,先挤压伤口,尽可能挤出损伤处血液,再用肥皂清洗、流动水冲洗、消毒</p>\r
<p>C. 受伤的手应戴双层手套操作</p>\r
<p>D. 发生损伤性职业暴露, 应留取伤员的血液标本检验</p>\r
<p>E. 发生职业暴露后, 应立即进行紧急处置并主动上报</p>\r
<p>6. 下列不属于灾难现场检伤分类原则的是( )。</p>\r
<p>A. 简单快速原则 B. 分类分级原则 C. 救命优先原则</p>\r
<p>D. 不重复检伤原则 E. 自主决策原则</p>\r
<p>7. 对于生命体征稳定的严重损伤,有潜在生命危险者用( )色标识。</p>\r
<p>A. 红 B. 黄 C. 绿</p>\r
<p>D. 黑 E. 蓝</p>\r
<p>(冯 静 牛辉妮 张云萍)</p>\r
`}]},{id:"module6",title:"附录一 实训操作项目",summary:"实训操作项目是课程实践核心环节，涵盖典型任务、技能训练与评估标准。例如电路焊接实训。未涉及项目选择依据。",tasks:[{id:"module6-task1",title:"附录一 实训操作项目",order:1,rawContent:`实训项目一 单人徒手心肺复苏
(成人)

\r
实训项目二 简易呼吸器的使用

\r
\r
实训项目三 心电监护

\r
实训项目四 包 扎

\r
\r
\r
实训项目五 固 定

\r
实训项目六 洗胃术

\r
实训项目七 气管插管的配合

\r
实训项目八 气管切开置管的护理(气道湿化、翻身、拍背和吸痰)`,rawHtml:`<p>实训项目一 单人徒手心肺复苏
(成人)</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-1-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">实训项目二 简易呼吸器的使用</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-2-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-3-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">实训项目三 心电监护</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-4-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">实训项目四 包 扎</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-5-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-6-l.jpg" /><figcaption></figcaption></figure>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-7-l.jpg" /><figcaption></figcaption></figure>\r
<p>实训项目五 固 定</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-8-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">实训项目六 洗胃术</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-9-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">实训项目七 气管插管的配合</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-10-l.jpg" /><figcaption></figcaption></figure>\r
<p style="text-align: center;">实训项目八 气管切开置管的护理(气道湿化、翻身、拍背和吸痰)</p>\r
<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540019-11-l.jpg" /><figcaption></figcaption></figure>\r
`}]},{id:"module7",title:"附录二 护士执业资格/1+X职业技能等级证书考试相关考点",summary:"本模块聚焦护士执业资格及1+X证书考点，核心为考试高频知识整合。要点包括护理评估、无菌操作、药物管理。例如七步洗手法。未涉及临床实习评价。",tasks:[{id:"module7-task1",title:"附录二 护士执业资格/1+X职业技能等级证书考试相关考点",order:1,rawContent:"",rawHtml:`<figure class="image"><img alt="" src="bookpicture/ds066854/ds0668540020-1-l.jpg" /><figcaption></figcaption></figure>\r
`}]},{id:"module8",title:"参考文献",summary:"参考文献是学术写作的基础，通过规范引用保障知识溯源与诚信。要点包括：标注来源避免剽窃，格式遵循统一标准（如APA），著录信息完整可供查证。例如论文中引用期刊文章需注明作者、年份、标题、刊名、卷期页码。本模块未涉及参考文献管理软件的使用。",tasks:[{id:"module8-task1",title:"参考文献",order:1,rawContent:`[1] . 急危重症护理学 [M]. 3 版. 西安: 第四军医大学出版社, 2014.

[2] . 临床急诊护理学 [M]. 天津: 天津科学技术出版社, 2009.

[3] . 急危重症护理学 [M]. 2 版. 北京: 人民卫生出版社, 2009.

[4] . 急危重症护理学 [M]. 2 版. 北京: 人民卫生出版社, 2013.

[5] . 急危重症护理 [M]. 北京: 北京出版社, 2011.

[6] , . 急危重症护理学 [M]. 2 版. 西安: 第四军医大学出版社, 2011.

[7] 张继娜, 李涛. 急危重症护理学 [M]. 3 版. 上海: 同济大学出版社, 2019.

[8] 方芳. 危重症监护 [M]. 北京: 人民卫生出版社, 2012.

[9] 王慧珍. 急危重症护理学[M]. 3 版. 北京: 人民卫生出版社, 2014.

[10] 张波, 桂莉. 急危重症护理学 [M]. 4 版. 北京: 人民卫生出版社, 2017.

[11] 胡爱招, 王明弘. 急危重症护理学 [M]. 4 版. 北京: 人民卫生出版社, 2018.

[12] 齐腾飞, 景军. 中国 1996—2015 年城市院前急救反应时间分析 [J]. 中国公共卫生, 2017, 33(10): 1466-1468.

[13] 王力红, 赵霞, 张京利. 《重症监护病房医院感染预防与控制规范》解读 [J]. 中华医院感染学杂志, 2017, 27(15): 3361-3365, 3391.

[14] 李艳兵, 张建军. 《2019 美国心脏协会心肺复苏与心血管急救指南: 高级心血管生命支持重点更新》解读 [J]. 中国临床医生杂志, 2021, 49(1): 21-24.

[15]《2020年美国心脏协会心肺复苏及心血管急救指南》十大亮点[J].实用心脑肺血管病杂志，2020,28(12):4.

[16] 何亚荣, 郑玥, 周法庭, 等. 2020 年美国心脏协会心肺复苏和心血管急救指南解读——成人基础/高级生命支持 [J]. 华西医学, 2020, 35(11): 1311-1323.

[17] 于学忠, 周荣斌. 中华医学百科全书(临床医学·急诊医学)[M]. 北京: 中国协和医科大学出版社, 2018.

[18] 中华人民共和国中央人民政府. 国家突发公共事件医疗卫生救援应急预案 [EB/OL]. (2006-2-26) [2024-6-12]. https://www.gov.cn/zhuanti/2006-02/26/content_2615973.htm.`,rawHtml:`<p>[1] . 急危重症护理学 [M]. 3 版. 西安: 第四军医大学出版社, 2014.</p>\r
<p>[2] . 临床急诊护理学 [M]. 天津: 天津科学技术出版社, 2009.</p>\r
<p>[3] . 急危重症护理学 [M]. 2 版. 北京: 人民卫生出版社, 2009.</p>\r
<p>[4] . 急危重症护理学 [M]. 2 版. 北京: 人民卫生出版社, 2013.</p>\r
<p>[5] . 急危重症护理 [M]. 北京: 北京出版社, 2011.</p>\r
<p>[6] , . 急危重症护理学 [M]. 2 版. 西安: 第四军医大学出版社, 2011.</p>\r
<p>[7] 张继娜, 李涛. 急危重症护理学 [M]. 3 版. 上海: 同济大学出版社, 2019.</p>\r
<p>[8] 方芳. 危重症监护 [M]. 北京: 人民卫生出版社, 2012.</p>\r
<p>[9] 王慧珍. 急危重症护理学[M]. 3 版. 北京: 人民卫生出版社, 2014.</p>\r
<p>[10] 张波, 桂莉. 急危重症护理学 [M]. 4 版. 北京: 人民卫生出版社, 2017.</p>\r
<p>[11] 胡爱招, 王明弘. 急危重症护理学 [M]. 4 版. 北京: 人民卫生出版社, 2018.</p>\r
<p>[12] 齐腾飞, 景军. 中国 1996—2015 年城市院前急救反应时间分析 [J]. 中国公共卫生, 2017, 33(10): 1466-1468.</p>\r
<p>[13] 王力红, 赵霞, 张京利. 《重症监护病房医院感染预防与控制规范》解读 [J]. 中华医院感染学杂志, 2017, 27(15): 3361-3365, 3391.</p>\r
<p>[14] 李艳兵, 张建军. 《2019 美国心脏协会心肺复苏与心血管急救指南: 高级心血管生命支持重点更新》解读 [J]. 中国临床医生杂志, 2021, 49(1): 21-24.</p>\r
<p>[15]《2020年美国心脏协会心肺复苏及心血管急救指南》十大亮点[J].实用心脑肺血管病杂志，2020,28(12):4.</p>\r
<p>[16] 何亚荣, 郑玥, 周法庭, 等. 2020 年美国心脏协会心肺复苏和心血管急救指南解读——成人基础/高级生命支持 [J]. 华西医学, 2020, 35(11): 1311-1323.</p>\r
<p>[17] 于学忠, 周荣斌. 中华医学百科全书(临床医学·急诊医学)[M]. 北京: 中国协和医科大学出版社, 2018.</p>\r
<p>[18] 中华人民共和国中央人民政府. 国家突发公共事件医疗卫生救援应急预案 [EB/OL]. (2006-2-26) [2024-6-12]. https://www.gov.cn/zhuanti/2006-02/26/content_2615973.htm.</p>\r
`}]}]},yf=Object.freeze(Object.defineProperty({__proto__:null,default:Ms,sourceParsed:Ms},Symbol.toStringTag,{value:"Module"}));export{nf as A,ef as B,pf as C,of as H,cf as L,sf as M,af as N,Wu as T,uf as V,ff as _,tf as a,rf as b,se as c,lf as d,gf as e,df as f,hf as g,mf as h,yf as i,Yu as j,Zu as k,Rs as l,Ts as m,Qu as n,Gu as o,Ku as p,kr as r,Ms as s,Ju as v};
