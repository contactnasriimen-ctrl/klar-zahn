(()=>{var fs=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Ta=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ps={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,u=c?n[i+2]:0,d=s>>2,g=(s&3)<<4|a>>4,_=(a&15)<<2|u>>6,b=u&63;c||(b=64,o||(_=64)),r.push(t[d],t[g],t[_],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(fs(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ta(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;let u=i<n.length?t[n.charAt(i)]:64;++i;let g=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||u==null||g==null)throw new cr;let _=s<<2|a>>4;if(r.push(_),u!==64){let b=a<<4&240|u>>2;if(r.push(b),g!==64){let T=u<<6&192|g;r.push(T)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},cr=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Aa=function(n){let e=fs(n);return ps.encodeByteArray(e,!0)},rt=function(n){return Aa(n).replace(/\./g,"")},lr=function(n){try{return ps.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Sa(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var Ra=()=>Sa().__FIREBASE_DEFAULTS__,Pa=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ka=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(t){return}let e=n&&lr(n[1]);return e&&JSON.parse(e)},dr=()=>{try{return Ra()||Pa()||ka()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},hr=n=>{var e,t;return(t=(e=dr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},ms=n=>{let e=hr(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},fr=()=>{var n;return(n=dr())===null||n===void 0?void 0:n.config},pr=n=>{var e;return(e=dr())===null||e===void 0?void 0:e[`_${n}`]};var $t=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function gs(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[rt(JSON.stringify(t)),rt(JSON.stringify(o)),""].join(".")}function C(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _s(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(C())}function vs(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function ys(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function ws(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Is(){let n=C();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Es(){try{return typeof indexedDB=="object"}catch(n){return!1}}function bs(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Oa="FirebaseError",F=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Oa,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,se.prototype.create)}},se=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Na(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new F(i,a,r)}};function Na(n,e){return n.replace(Ca,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var Ca=/\{\$([^}]+)}/g;function Ts(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ae(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],o=e[i];if(hs(s)&&hs(o)){if(!Ae(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function hs(n){return n!==null&&typeof n=="object"}function Be(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function qe(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function je(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function As(n,e){let t=new ur(n,e);return t.subscribe.bind(t)}var ur=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Da(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ar),i.error===void 0&&(i.error=ar),i.complete===void 0&&(i.complete=ar);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch(o){}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Da(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ar(){}var Pd=4*60*60*1e3;function S(n){return n&&n._delegate?n._delegate:n}var q=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Se="[DEFAULT]";var mr=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new $t;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch(i){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Va(e))try{this.getOrInitializeService({instanceIdentifier:Se})}catch(t){}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch(s){}}}}clearInstance(e=Se){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Se){return this.instances.has(e)}getOptions(e=Se){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch(s){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:La(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(i){}return r||null}normalizeInstanceIdentifier(e=Se){return this.component?this.component.multipleInstances?e:Se:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function La(n){return n===Se?void 0:n}function Va(n){return n.instantiationMode==="EAGER"}var Ht=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new mr(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var xa=[],E;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(E||(E={}));var Ma={debug:E.DEBUG,verbose:E.VERBOSE,info:E.INFO,warn:E.WARN,error:E.ERROR,silent:E.SILENT},Ua=E.INFO,Fa={[E.DEBUG]:"log",[E.VERBOSE]:"log",[E.INFO]:"info",[E.WARN]:"warn",[E.ERROR]:"error"},Ba=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=Fa[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},le=class{constructor(e){this.name=e,this._logLevel=Ua,this._logHandler=Ba,this._userLogHandler=null,xa.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in E))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ma[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,E.DEBUG,...e),this._logHandler(this,E.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,E.VERBOSE,...e),this._logHandler(this,E.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,E.INFO,...e),this._logHandler(this,E.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,E.WARN,...e),this._logHandler(this,E.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,E.ERROR,...e),this._logHandler(this,E.ERROR,...e)}};var qa=(n,e)=>e.some(t=>n instanceof t),Ss,Rs;function ja(){return Ss||(Ss=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function za(){return Rs||(Rs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Ps=new WeakMap,_r=new WeakMap,ks=new WeakMap,gr=new WeakMap,yr=new WeakMap;function $a(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Y(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Ps.set(t,n)}).catch(()=>{}),yr.set(e,n),e}function Ha(n){if(_r.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});_r.set(n,e)}var vr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return _r.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ks.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Y(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Os(n){vr=n(vr)}function Wa(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Wt(this),e,...t);return ks.set(r,e.sort?e.sort():[e]),Y(r)}:za().includes(n)?function(...e){return n.apply(Wt(this),e),Y(Ps.get(this))}:function(...e){return Y(n.apply(Wt(this),e))}}function Ga(n){return typeof n=="function"?Wa(n):(n instanceof IDBTransaction&&Ha(n),qa(n,ja())?new Proxy(n,vr):n)}function Y(n){if(n instanceof IDBRequest)return $a(n);if(gr.has(n))return gr.get(n);let e=Ga(n);return e!==n&&(gr.set(n,e),yr.set(e,n)),e}var Wt=n=>yr.get(n);function Cs(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(n,e),a=Y(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Y(o.result),c.oldVersion,c.newVersion,Y(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}var Ka=["get","getKey","getAll","getAllKeys","count"],Ya=["put","add","delete","clear"],wr=new Map;function Ns(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(wr.get(e))return wr.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Ya.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Ka.includes(t)))return;let s=async function(o,...a){let c=this.transaction(o,i?"readwrite":"readonly"),u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[t](...a),i&&c.done]))[0]};return wr.set(e,s),s}Os(n=>({...n,get:(e,t,r)=>Ns(e,t)||n.get(e,t,r),has:(e,t)=>!!Ns(e,t)||n.has(e,t)}));var Er=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ja(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function Ja(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var br="@firebase/app",Ds="0.10.13";var oe=new le("@firebase/app"),Qa="@firebase/app-compat",Za="@firebase/analytics-compat",Xa="@firebase/analytics",ec="@firebase/app-check-compat",tc="@firebase/app-check",nc="@firebase/auth",rc="@firebase/auth-compat",ic="@firebase/database",sc="@firebase/data-connect",oc="@firebase/database-compat",ac="@firebase/functions",cc="@firebase/functions-compat",uc="@firebase/installations",lc="@firebase/installations-compat",dc="@firebase/messaging",hc="@firebase/messaging-compat",fc="@firebase/performance",pc="@firebase/performance-compat",mc="@firebase/remote-config",gc="@firebase/remote-config-compat",_c="@firebase/storage",vc="@firebase/storage-compat",yc="@firebase/firestore",wc="@firebase/vertexai-preview",Ic="@firebase/firestore-compat",Ec="firebase",bc="10.14.1";var Tr="[DEFAULT]",Tc={[br]:"fire-core",[Qa]:"fire-core-compat",[Xa]:"fire-analytics",[Za]:"fire-analytics-compat",[tc]:"fire-app-check",[ec]:"fire-app-check-compat",[nc]:"fire-auth",[rc]:"fire-auth-compat",[ic]:"fire-rtdb",[sc]:"fire-data-connect",[oc]:"fire-rtdb-compat",[ac]:"fire-fn",[cc]:"fire-fn-compat",[uc]:"fire-iid",[lc]:"fire-iid-compat",[dc]:"fire-fcm",[hc]:"fire-fcm-compat",[fc]:"fire-perf",[pc]:"fire-perf-compat",[mc]:"fire-rc",[gc]:"fire-rc-compat",[_c]:"fire-gcs",[vc]:"fire-gcs-compat",[yc]:"fire-fst",[Ic]:"fire-fst-compat",[wc]:"fire-vertex","fire-js":"fire-js",[Ec]:"fire-js-all"};var Gt=new Map,Ac=new Map,Ar=new Map;function Ls(n,e){try{n.container.addComponent(e)}catch(t){oe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function he(n){let e=n.name;if(Ar.has(e))return oe.debug(`There were multiple attempts to register component ${e}.`),!1;Ar.set(e,n);for(let t of Gt.values())Ls(t,n);for(let t of Ac.values())Ls(t,n);return!0}function st(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function J(n){return n.settings!==void 0}var Sc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},de=new se("app","Firebase",Sc);var Sr=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new q("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw de.create("app-deleted",{appName:this._name})}};var fe=bc;function kr(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:Tr,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw de.create("bad-app-name",{appName:String(i)});if(t||(t=fr()),!t)throw de.create("no-options");let s=Gt.get(i);if(s){if(Ae(t,s.options)&&Ae(r,s.config))return s;throw de.create("duplicate-app",{appName:i})}let o=new Ht(i);for(let c of Ar.values())o.addComponent(c);let a=new Sr(t,r,o);return Gt.set(i,a),a}function Kt(n=Tr){let e=Gt.get(n);if(!e&&n===Tr&&fr())return kr();if(!e)throw de.create("no-app",{appName:n});return e}function H(n,e,t){var r;let i=(r=Tc[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),oe.warn(a.join(" "));return}he(new q(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var Rc="firebase-heartbeat-database",Pc=1,it="firebase-heartbeat-store",Ir=null;function Us(){return Ir||(Ir=Cs(Rc,Pc,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(it)}catch(t){console.warn(t)}}}}).catch(n=>{throw de.create("idb-open",{originalErrorMessage:n.message})})),Ir}async function kc(n){try{let t=(await Us()).transaction(it),r=await t.objectStore(it).get(Fs(n));return await t.done,r}catch(e){if(e instanceof F)oe.warn(e.message);else{let t=de.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});oe.warn(t.message)}}}async function Vs(n,e){try{let r=(await Us()).transaction(it,"readwrite");await r.objectStore(it).put(e,Fs(n)),await r.done}catch(t){if(t instanceof F)oe.warn(t.message);else{let r=de.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});oe.warn(r.message)}}}function Fs(n){return`${n.name}!${n.options.appId}`}var Oc=1024,Nc=30*24*60*60*1e3,Rr=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Pr(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=xs();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let a=new Date(o.date).valueOf();return Date.now()-a<=Nc}),this._storage.overwrite(this._heartbeatsCache))}catch(r){oe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=xs(),{heartbeatsToSend:r,unsentEntries:i}=Cc(this._heartbeatsCache.heartbeats),s=rt(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return oe.warn(t),""}}};function xs(){return new Date().toISOString().substring(0,10)}function Cc(n,e=Oc){let t=[],r=n.slice();for(let i of n){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Ms(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Ms(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Pr=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Es()?bs().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await kc(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Vs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Vs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function Ms(n){return rt(JSON.stringify({version:2,heartbeats:n})).length}function Dc(n){he(new q("platform-logger",e=>new Er(e),"PRIVATE")),he(new q("heartbeat",e=>new Rr(e),"PRIVATE")),H(br,Ds,n),H(br,Ds,"esm2017"),H("fire-js","")}Dc("");function Yt(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function no(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var ro=no,io=new se("auth","Firebase",no());var tn=new le("@firebase/auth");function Lc(n,...e){tn.logLevel<=E.WARN&&tn.warn(`Auth (${fe}): ${n}`,...e)}function Qt(n,...e){tn.logLevel<=E.ERROR&&tn.error(`Auth (${fe}): ${n}`,...e)}function W(n,...e){throw Qr(n,...e)}function Z(n,...e){return Qr(n,...e)}function so(n,e,t){let r=Object.assign(Object.assign({},ro()),{[e]:t});return new se("auth","Firebase",r).create(e,{appName:n.name})}function me(n){return so(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Qr(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return io.create(n,...e)}function f(n,e,...t){if(!n)throw Qr(e,...t)}function Q(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Qt(e),new Error(e)}function ce(n,e){n||Q(e)}function Cr(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Vc(){return Bs()==="http:"||Bs()==="https:"}function Bs(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function xc(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Vc()||ys()||"connection"in navigator)?navigator.onLine:!0}function Mc(){if(typeof navigator=="undefined")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Re=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,ce(t>e,"Short delay should be less than long delay!"),this.isMobile=_s()||ws()}get(){return xc()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Zr(n,e){ce(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var nn=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;Q("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;Q("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;Q("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Uc={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Fc=new Re(3e4,6e4);function P(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function O(n,e,t,r,i={}){return oo(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});let a=Be(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);let u=Object.assign({method:e,headers:c},s);return vs()||(u.referrerPolicy="no-referrer"),nn.fetch()(ao(n,n.config.apiHost,t,a),u)})}async function oo(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},Uc),e);try{let i=new Dr(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw ot(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let a=s.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ot(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ot(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw ot(n,"user-disabled",o);let d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw so(n,d,u);W(n,d)}}catch(i){if(i instanceof F)throw i;W(n,"network-request-failed",{message:String(i)})}}async function De(n,e,t,r,i={}){let s=await O(n,e,t,r,i);return"mfaPendingCredential"in s&&W(n,"multi-factor-auth-required",{_serverResponse:s}),s}function ao(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?Zr(n.config,i):`${n.config.apiScheme}://${i}`}function Bc(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var Dr=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Z(this.auth,"network-request-failed")),Fc.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function ot(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=Z(n,e,r);return i.customData._tokenResponse=t,i}function qs(n){return n!==void 0&&n.enterprise!==void 0}var Lr=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Bc(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function qc(n,e){return O(n,"GET","/v2/recaptchaConfig",P(n,e))}async function jc(n,e){return O(n,"POST","/v1/accounts:delete",e)}async function co(n,e){return O(n,"POST","/v1/accounts:lookup",e)}function at(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch(e){}}async function uo(n,e=!1){let t=S(n),r=await t.getIdToken(e),i=Xr(r);f(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:at(Or(i.auth_time)),issuedAtTime:at(Or(i.iat)),expirationTime:at(Or(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Or(n){return Number(n)*1e3}function Xr(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Qt("JWT malformed, contained fewer than 3 sections"),null;try{let i=lr(t);return i?JSON.parse(i):(Qt("Failed to decode base64 JWT payload"),null)}catch(i){return Qt("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function js(n){let e=Xr(n);return f(e,"internal-error"),f(typeof e.exp!="undefined","internal-error"),f(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}async function ut(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof F&&zc(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function zc({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Vr=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var lt=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=at(this.lastLoginAt),this.creationTime=at(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function rn(n){var e;let t=n.auth,r=await n.getIdToken(),i=await ut(n,co(t,{idToken:r}));f(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ho(s.providerUserInfo):[],a=$c(n.providerData,o),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=c?u:!1,g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new lt(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,g)}async function lo(n){let e=S(n);await rn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $c(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ho(n){return n.map(e=>{var{providerId:t}=e,r=Yt(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function Hc(n,e){let t=await oo(n,{},async()=>{let r=Be({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=ao(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",nn.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Wc(n,e){return O(n,"POST","/v2/accounts:revokeToken",P(n,e))}var ct=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){f(e.idToken,"internal-error"),f(typeof e.idToken!="undefined","internal-error"),f(typeof e.refreshToken!="undefined","internal-error");let t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):js(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){f(e.length!==0,"internal-error");let t=js(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(f(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await Hc(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new n;return r&&(f(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(f(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(f(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Q("not implemented")}};function pe(n,e){f(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}var $e=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Yt(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Vr(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new lt(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await ut(this,this.stsTokenManager.getToken(this.auth,e));return f(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return uo(this,e)}reload(){return lo(this)}_assign(e){this!==e&&(f(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){f(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await rn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(J(this.auth.app))return Promise.reject(me(this.auth));let e=await this.getIdToken();return await ut(this,jc(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,c,u,d;let g=(r=t.displayName)!==null&&r!==void 0?r:void 0,_=(i=t.email)!==null&&i!==void 0?i:void 0,b=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,T=(o=t.photoURL)!==null&&o!==void 0?o:void 0,re=(a=t.tenantId)!==null&&a!==void 0?a:void 0,ie=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,ye=(u=t.createdAt)!==null&&u!==void 0?u:void 0,ue=(d=t.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:we,emailVerified:Ie,isAnonymous:Ee,providerData:be,stsTokenManager:jt}=t;f(we&&jt,e,"internal-error");let Te=ct.fromJSON(this.name,jt);f(typeof we=="string",e,"internal-error"),pe(g,e.name),pe(_,e.name),f(typeof Ie=="boolean",e,"internal-error"),f(typeof Ee=="boolean",e,"internal-error"),pe(b,e.name),pe(T,e.name),pe(re,e.name),pe(ie,e.name),pe(ye,e.name),pe(ue,e.name);let Fe=new n({uid:we,auth:e,email:_,emailVerified:Ie,displayName:g,isAnonymous:Ee,photoURL:T,phoneNumber:b,tenantId:re,stsTokenManager:Te,createdAt:ye,lastLoginAt:ue});return be&&Array.isArray(be)&&(Fe.providerData=be.map(nr=>Object.assign({},nr))),ie&&(Fe._redirectEventId=ie),Fe}static async _fromIdTokenResponse(e,t,r=!1){let i=new ct;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await rn(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];f(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?ho(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new ct;a.updateFromIdToken(r);let c=new n({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new lt(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,u),c}};var zs=new Map;function ae(n){ce(n instanceof Function,"Expected a class definition");let e=zs.get(n);return e?(ce(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,zs.set(n,e),e)}var sn=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};sn.type="NONE";var xr=sn;function Zt(n,e,t){return`firebase:${n}:${e}:${t}`}var on=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=Zt(this.userKey,i.apiKey,s),this.fullPersistenceKey=Zt("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?$e._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(ae(xr),e,r);let i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u),s=i[0]||ae(xr),o=Zt(r,e.config.apiKey,e.name),a=null;for(let u of t)try{let d=await u._get(o);if(d){let g=$e._fromJSON(e,d);u!==s&&(a=g),s=u;break}}catch(d){}let c=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new n(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch(d){}})),new n(s,e,r))}};function $s(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(go(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(fo(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(vo(e))return"Blackberry";if(yo(e))return"Webos";if(po(e))return"Safari";if((e.includes("chrome/")||mo(e))&&!e.includes("edge/"))return"Chrome";if(_o(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function fo(n=C()){return/firefox\//i.test(n)}function po(n=C()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function mo(n=C()){return/crios\//i.test(n)}function go(n=C()){return/iemobile/i.test(n)}function _o(n=C()){return/android/i.test(n)}function vo(n=C()){return/blackberry/i.test(n)}function yo(n=C()){return/webos/i.test(n)}function ei(n=C()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Gc(n=C()){var e;return ei(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Kc(){return Is()&&document.documentMode===10}function wo(n=C()){return ei(n)||_o(n)||yo(n)||vo(n)||/windows phone/i.test(n)||go(n)}function Io(n,e=[]){let t;switch(n){case"Browser":t=$s(C());break;case"Worker":t=`${$s(C())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${fe}/${r}`}var Mr=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((o,a)=>{try{let c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch(s){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}};async function Yc(n,e={}){return O(n,"GET","/v2/passwordPolicy",P(n,e))}var Jc=6,Ur=class{constructor(e){var t,r,i,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Jc,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,a;let c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Fr=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new an(this),this.idTokenSubscription=new an(this),this.beforeStateQueue=new Mr(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=io,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ae(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await on.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(s){}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await co(this,{idToken:e}),r=await $e._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(J(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return f(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(r){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await rn(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Mc()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(J(this.app))return Promise.reject(me(this));let t=e?S(e):null;return t&&f(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&f(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return J(this.app)?Promise.reject(me(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return J(this.app)?Promise.reject(me(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ae(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Yc(this),t=new Ur(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new se("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Wc(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ae(e)||this._popupRedirectResolver;f(t,this,"argument-error"),this.redirectPersistenceManager=await on.create(this,[ae(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(f(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let c=e.addObserver(t,r,i);return()=>{o=!0,c()}}else{let c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return f(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Io(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Lc(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}};function ge(n){return S(n)}var an=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=As(t=>this.observer=t)}get next(){return f(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Tn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Qc(n){Tn=n}function Eo(n){return Tn.loadJS(n)}function Zc(){return Tn.recaptchaEnterpriseScript}function Xc(){return Tn.gapiScript}function bo(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var eu="recaptcha-enterprise",tu="NO_RECAPTCHA",Br=class{constructor(e){this.type=eu,this.auth=ge(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{qc(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{let u=new Lr(c);return s.tenantId==null?s._agentRecaptchaConfig=u:s._tenantRecaptchaConfigs[s.tenantId]=u,o(u.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){let c=window.grecaptcha;qs(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(u=>{o(u)}).catch(()=>{o(tu)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&qs(window.grecaptcha))i(a,s,o);else{if(typeof window=="undefined"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Zc();c.length!==0&&(c+=a),Eo(c).then(()=>{i(a,s,o)}).catch(u=>{o(u)})}}).catch(a=>{o(a)})})}};async function Hs(n,e,t,r=!1){let i=new Br(n),s;try{s=await i.verify(t)}catch(a){s=await i.verify(t,!0)}let o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function qr(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await Hs(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let o=await Hs(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}function To(n,e){let t=st(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(Ae(s,e!=null?e:{}))return i;W(i,"already-initialized")}return t.initialize({options:e})}function nu(n,e){let t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ae);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ao(n,e,t){let r=ge(n);f(r._canInitEmulator,r,"emulator-config-failed"),f(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!(t!=null&&t.disableWarnings),s=So(e),{host:o,port:a}=ru(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||iu()}function So(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ru(n){let e=So(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:Ws(r.substr(s.length+1))}}else{let[s,o]=r.split(":");return{host:s,port:Ws(o)}}}function Ws(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function iu(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Pe=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Q("not implemented")}_getIdTokenResponse(e){return Q("not implemented")}_linkToIdToken(e,t){return Q("not implemented")}_getReauthenticationResolver(e){return Q("not implemented")}};async function su(n,e){return O(n,"POST","/v1/accounts:signUp",e)}async function ou(n,e){return De(n,"POST","/v1/accounts:signInWithPassword",P(n,e))}async function au(n,e){return O(n,"POST","/v1/accounts:sendOobCode",P(n,e))}async function cu(n,e){return au(n,e)}async function uu(n,e){return De(n,"POST","/v1/accounts:signInWithEmailLink",P(n,e))}async function lu(n,e){return De(n,"POST","/v1/accounts:signInWithEmailLink",P(n,e))}var dt=class n extends Pe{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return qr(e,t,"signInWithPassword",ou);case"emailLink":return uu(e,{email:this._email,oobCode:this._password});default:W(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return qr(e,r,"signUpPassword",su);case"emailLink":return lu(e,{idToken:t,email:this._email,oobCode:this._password});default:W(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function ze(n,e){return De(n,"POST","/v1/accounts:signInWithIdp",P(n,e))}var du="http://localhost",ke=class n extends Pe{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):W("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Yt(t,["providerId","signInMethod"]);if(!r||!i)return null;let o=new n(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return ze(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,ze(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,ze(e,t)}buildRequest(){let e={requestUri:du,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Be(t)}return e}};async function hu(n,e){return O(n,"POST","/v1/accounts:sendVerificationCode",P(n,e))}async function fu(n,e){return De(n,"POST","/v1/accounts:signInWithPhoneNumber",P(n,e))}async function pu(n,e){let t=await De(n,"POST","/v1/accounts:signInWithPhoneNumber",P(n,e));if(t.temporaryProof)throw ot(n,"account-exists-with-different-credential",t);return t}var mu={USER_NOT_FOUND:"user-not-found"};async function gu(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return De(n,"POST","/v1/accounts:signInWithPhoneNumber",P(n,t),mu)}var ht=class n extends Pe{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return fu(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return pu(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return gu(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function _u(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function vu(n){let e=qe(je(n)).link,t=e?qe(je(e)).deep_link_id:null,r=qe(je(n)).deep_link_id;return(r?qe(je(r)).link:null)||r||t||e||n}var cn=class n{constructor(e){var t,r,i,s,o,a;let c=qe(je(e)),u=(t=c.apiKey)!==null&&t!==void 0?t:null,d=(r=c.oobCode)!==null&&r!==void 0?r:null,g=_u((i=c.mode)!==null&&i!==void 0?i:null);f(u&&d&&g,"argument-error"),this.apiKey=u,this.operation=g,this.code=d,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){let t=vu(e);try{return new n(t)}catch(r){return null}}};var Oe=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return dt._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=cn.parseLink(t);return f(r,"argument-error"),dt._fromEmailAndCode(e,r.code,r.tenantId)}};Oe.PROVIDER_ID="password";Oe.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Oe.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var un=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var Ne=class extends un{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var ft=class n extends Ne{constructor(){super("facebook.com")}static credential(e){return ke._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch(t){return null}}};ft.FACEBOOK_SIGN_IN_METHOD="facebook.com";ft.PROVIDER_ID="facebook.com";var pt=class n extends Ne{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ke._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch(i){return null}}};pt.GOOGLE_SIGN_IN_METHOD="google.com";pt.PROVIDER_ID="google.com";var mt=class n extends Ne{constructor(){super("github.com")}static credential(e){return ke._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch(t){return null}}};mt.GITHUB_SIGN_IN_METHOD="github.com";mt.PROVIDER_ID="github.com";var gt=class n extends Ne{constructor(){super("twitter.com")}static credential(e,t){return ke._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch(i){return null}}};gt.TWITTER_SIGN_IN_METHOD="twitter.com";gt.PROVIDER_ID="twitter.com";var _t=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await $e._fromIdTokenResponse(e,r,i),o=Gs(r);return new n({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=Gs(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function Gs(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var jr=class n extends F{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function Ro(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?jr._fromErrorAndOperation(n,s,e,r):s})}async function yu(n,e,t=!1){let r=await ut(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return _t._forOperation(n,"link",r)}async function wu(n,e,t=!1){let{auth:r}=n;if(J(r.app))return Promise.reject(me(r));let i="reauthenticate";try{let s=await ut(n,Ro(r,i,e,n),t);f(s.idToken,r,"internal-error");let o=Xr(s.idToken);f(o,r,"internal-error");let{sub:a}=o;return f(n.uid===a,r,"user-mismatch"),_t._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&W(r,"user-mismatch"),s}}async function Po(n,e,t=!1){if(J(n.app))return Promise.reject(me(n));let r="signIn",i=await Ro(n,r,e),s=await _t._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function ko(n,e){return Po(ge(n),e)}function Iu(n,e,t){var r;f(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),f(typeof t.dynamicLinkDomain=="undefined"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(f(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(f(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}async function Eu(n){let e=ge(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function ti(n,e,t){let r=ge(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Iu(r,i,t),await qr(r,i,"getOobCode",cu)}function ni(n,e,t){return J(n.app)?Promise.reject(me(n)):ko(S(n),Oe.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Eu(n),r})}function Oo(n,e,t,r){return S(n).onIdTokenChanged(e,t,r)}function No(n,e,t){return S(n).beforeAuthStateChanged(e,t)}function ri(n,e,t,r){return S(n).onAuthStateChanged(e,t,r)}function ii(n){return S(n).signOut()}function bu(n,e){return O(n,"POST","/v2/accounts/mfaEnrollment:start",P(n,e))}function Tu(n,e){return O(n,"POST","/v2/accounts/mfaEnrollment:finalize",P(n,e))}function Au(n,e){return O(n,"POST","/v2/accounts/mfaEnrollment:start",P(n,e))}function Su(n,e){return O(n,"POST","/v2/accounts/mfaEnrollment:finalize",P(n,e))}var ln="__sak";var dn=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ln,"1"),this.storage.removeItem(ln),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Ru=1e3,Pu=10,hn=class extends dn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=wo(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}let r=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Kc()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Pu):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Ru)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};hn.type="LOCAL";var Co=hn;var fn=class extends dn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};fn.type="SESSION";var si=fn;function ku(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var pn=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let a=Array.from(o).map(async u=>u(t.origin,s)),c=await ku(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};pn.receivers=[];function oi(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var zr=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{let u=oi("",20);i.port1.start();let d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(g){let _=g;if(_.data.eventId===u)switch(_.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(_.data.response);break;default:clearTimeout(d),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function X(){return window}function Ou(n){X().location.href=n}function Do(){return typeof X().WorkerGlobalScope!="undefined"&&typeof X().importScripts=="function"}async function Nu(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(n){return null}}function Cu(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Du(){return Do()?self:null}var Lo="firebaseLocalStorageDb",Lu=1,mn="firebaseLocalStorage",Vo="fbase_key",Ce=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function An(n,e){return n.transaction([mn],e?"readwrite":"readonly").objectStore(mn)}function Vu(){let n=indexedDB.deleteDatabase(Lo);return new Ce(n).toPromise()}function $r(){let n=indexedDB.open(Lo,Lu);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(mn,{keyPath:Vo})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(mn)?e(r):(r.close(),await Vu(),e(await $r()))})})}async function Ks(n,e,t){let r=An(n,!0).put({[Vo]:e,value:t});return new Ce(r).toPromise()}async function xu(n,e){let t=An(n,!1).get(e),r=await new Ce(t).toPromise();return r===void 0?null:r.value}function Ys(n,e){let t=An(n,!0).delete(e);return new Ce(t).toPromise()}var Mu=800,Uu=3,gn=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $r(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>Uu)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Do()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=pn._getInstance(Du()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Nu(),!this.activeServiceWorker)return;this.sender=new zr(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Cu()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await $r();return await Ks(e,ln,"1"),await Ys(e,ln),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ks(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>xu(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ys(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=An(i,!1).getAll();return new Ce(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Mu)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};gn.type="LOCAL";var xo=gn;function Fu(n,e){return O(n,"POST","/v2/accounts/mfaSignIn:start",P(n,e))}function Bu(n,e){return O(n,"POST","/v2/accounts/mfaSignIn:finalize",P(n,e))}function qu(n,e){return O(n,"POST","/v2/accounts/mfaSignIn:finalize",P(n,e))}var Xd=bo("rcb"),eh=new Re(3e4,6e4);var ju="recaptcha";async function zu(n,e,t){var r;let i=await t.verify();try{f(typeof i=="string",n,"argument-error"),f(t.type===ju,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let o=s.session;if("phoneNumber"in s)return f(o.type==="enroll",n,"internal-error"),(await bu(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{f(o.type==="signin",n,"internal-error");let a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return f(a,n,"missing-multi-factor-info"),(await Fu(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await hu(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}var vt=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=ge(e)}verifyPhoneNumber(e,t){return zu(this.auth,e,S(t))}static credential(e,t){return ht._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?ht._fromTokenResponse(t,r):null}};vt.PROVIDER_ID="phone";vt.PHONE_SIGN_IN_METHOD="phone";function $u(n,e){return e?ae(e):(f(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var yt=class extends Pe{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ze(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ze(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ze(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Hu(n){return Po(n.auth,new yt(n),n.bypassAuthState)}function Wu(n){let{auth:e,user:t}=n;return f(t,e,"internal-error"),wu(t,new yt(n),n.bypassAuthState)}async function Gu(n){let{auth:e,user:t}=n;return f(t,e,"internal-error"),yu(t,new yt(n),n.bypassAuthState)}var _n=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}let c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Hu;case"linkViaPopup":case"linkViaRedirect":return Gu;case"reauthViaPopup":case"reauthViaRedirect":return Wu;default:W(this.auth,"internal-error")}}resolve(e){ce(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ce(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var Ku=new Re(2e3,1e4);var Hr=class n extends _n{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return f(e,this.auth,"internal-error"),e}async onExecution(){ce(this.filter.length===1,"Popup operations only handle one event");let e=oi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Z(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Z(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Z(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ku.get())};e()}};Hr.currentPopupAction=null;var Yu="pendingRedirect",Xt=new Map,Wr=class extends _n{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Xt.get(this.auth._key());if(!e){try{let r=await Ju(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Xt.set(this.auth._key(),e)}return this.bypassAuthState||Xt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Ju(n,e){let t=Xu(e),r=Zu(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function Qu(n,e){Xt.set(n._key(),e)}function Zu(n){return ae(n._redirectPersistence)}function Xu(n){return Zt(Yu,n.config.apiKey,n.name)}async function el(n,e,t=!1){if(J(n.app))return Promise.reject(me(n));let r=ge(n),i=$u(r,e),o=await new Wr(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var tl=10*60*1e3,Gr=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!nl(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Mo(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Z(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=tl&&this.cachedEventUids.clear(),this.cachedEventUids.has(Js(e))}saveEventToCache(e){this.cachedEventUids.add(Js(e)),this.lastProcessedEventTime=Date.now()}};function Js(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Mo({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function nl(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mo(n);default:return!1}}async function rl(n,e={}){return O(n,"GET","/v1/projects",e)}var il=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,sl=/^https?/;async function ol(n){if(n.config.emulator)return;let{authorizedDomains:e}=await rl(n);for(let t of e)try{if(al(t))return}catch(r){}W(n,"unauthorized-domain")}function al(n){let e=Cr(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!sl.test(t))return!1;if(il.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var cl=new Re(3e4,6e4);function Qs(){let n=X().___jsl;if(n!=null&&n.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ul(n){return new Promise((e,t)=>{var r,i,s;function o(){Qs(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Qs(),t(Z(n,"network-request-failed"))},timeout:cl.get()})}if(!((i=(r=X().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=X().gapi)===null||s===void 0)&&s.load)o();else{let a=bo("iframefcb");return X()[a]=()=>{gapi.load?o():t(Z(n,"network-request-failed"))},Eo(`${Xc()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw en=null,e})}var en=null;function ll(n){return en=en||ul(n),en}var dl=new Re(5e3,15e3),hl="__/auth/iframe",fl="emulator/auth/iframe",pl={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ml=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function gl(n){let e=n.config;f(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Zr(e,fl):`https://${n.config.authDomain}/${hl}`,r={apiKey:e.apiKey,appName:n.name,v:fe},i=ml.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Be(r).slice(1)}`}async function _l(n){let e=await ll(n),t=X().gapi;return f(t,n,"internal-error"),e.open({where:document.body,url:gl(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pl,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let o=Z(n,"network-request-failed"),a=X().setTimeout(()=>{s(o)},dl.get());function c(){X().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}var vl={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},yl=500,wl=600,Il="_blank",El="http://localhost",vn=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}};function bl(n,e,t,r=yl,i=wl){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),a="",c=Object.assign(Object.assign({},vl),{width:r.toString(),height:i.toString(),top:s,left:o}),u=C().toLowerCase();t&&(a=mo(u)?Il:t),fo(u)&&(e=e||El,c.scrollbars="yes");let d=Object.entries(c).reduce((_,[b,T])=>`${_}${b}=${T},`,"");if(Gc(u)&&a!=="_self")return Tl(e||"",a),new vn(null);let g=window.open(e||"",a,d);f(g,n,"popup-blocked");try{g.focus()}catch(_){}return new vn(g)}function Tl(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var Al="__/auth/handler",Sl="emulator/auth/handler",Rl=encodeURIComponent("fac");async function Zs(n,e,t,r,i,s){f(n.config.authDomain,n,"auth-domain-config-required"),f(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:fe,eventId:i};if(e instanceof un){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Ts(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[d,g]of Object.entries(s||{}))o[d]=g}if(e instanceof Ne){let d=e.getScopes().filter(g=>g!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);let a=o;for(let d of Object.keys(a))a[d]===void 0&&delete a[d];let c=await n._getAppCheckToken(),u=c?`#${Rl}=${encodeURIComponent(c)}`:"";return`${Pl(n)}?${Be(a).slice(1)}${u}`}function Pl({config:n}){return n.emulator?Zr(n,Sl):`https://${n.authDomain}/${Al}`}var Nr="webStorageSupport",Kr=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=si,this._completeRedirectFn=el,this._overrideRedirectResult=Qu}async _openPopup(e,t,r,i){var s;ce((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await Zs(e,t,r,Cr(),i);return bl(e,o,oi())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await Zs(e,t,r,Cr(),i);return Ou(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(ce(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await _l(e),r=new Gr(e);return t.register("authEvent",i=>(f(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Nr,{type:Nr},i=>{var s;let o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Nr];o!==void 0&&t(!!o),W(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ol(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return wo()||po()||ei()}},Uo=Kr,yn=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Q("unexpected MultiFactorSessionType")}}},Yr=class n extends yn{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return Tu(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Bu(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},wn=class{constructor(){}static assertion(e){return Yr._fromCredential(e)}};wn.FACTOR_ID="phone";var In=class{static assertionForEnrollment(e,t){return En._fromSecret(e,t)}static assertionForSignIn(e,t){return En._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;f(typeof((t=r.user)===null||t===void 0?void 0:t.auth)!="undefined","internal-error");let i=await Au(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return bn._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};In.FACTOR_ID="totp";var En=class n extends yn{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return f(typeof this.secret!="undefined",e,"argument-error"),Su(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){f(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return qu(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},bn=class n{constructor(e,t,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(Jt(e)||Jt(t))&&(i=!0),i&&(Jt(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),Jt(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Jt(n){return typeof n=="undefined"||(n==null?void 0:n.length)===0}var Xs="@firebase/auth",eo="1.7.9";var Jr=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){f(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function kl(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Ol(n){he(new q("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;f(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Io(n)},u=new Fr(r,i,s,c);return nu(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),he(new q("auth-internal",e=>{let t=ge(e.getProvider("auth").getImmediate());return(r=>new Jr(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),H(Xs,eo,kl(n)),H(Xs,eo,"esm2017")}var Nl=5*60,Cl=pr("authIdTokenMaxAge")||Nl,to=null,Dl=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Cl)return;let i=t==null?void 0:t.token;to!==i&&(to=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ai(n=Kt()){let e=st(n,"auth");if(e.isInitialized())return e.getImmediate();let t=To(n,{popupRedirectResolver:Uo,persistence:[xo,Co,si]}),r=pr("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let o=Dl(s.toString());No(t,o,()=>o(t.currentUser)),Oo(t,a=>o(a))}}let i=hr("auth");return i&&Ao(t,`http://${i}`),t}function Ll(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Qc({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=Z("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Ll().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Ol("Browser");var D=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};D.UNAUTHENTICATED=new D(null),D.GOOGLE_CREDENTIALS=new D("google-credentials-uid"),D.FIRST_PARTY=new D("first-party-uid"),D.MOCK_USER=new D("mock-user");var Ze="10.14.0";var Ge=new le("@firebase/firestore");function Pn(n,...e){if(Ge.logLevel<=E.DEBUG){let t=e.map(Yi);Ge.debug(`Firestore (${Ze}): ${n}`,...t)}}function Ki(n,...e){if(Ge.logLevel<=E.ERROR){let t=e.map(Yi);Ge.error(`Firestore (${Ze}): ${n}`,...t)}}function Qo(n,...e){if(Ge.logLevel<=E.WARN){let t=e.map(Yi);Ge.warn(`Firestore (${Ze}): ${n}`,...t)}}function Yi(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch(e){return n}}function A(n="Unexpected state"){let e=`FIRESTORE (${Ze}) INTERNAL ASSERTION FAILED: `+n;throw Ki(e),new Error(e)}function B(n,e){n||A()}function Vt(n,e){return n}var Fo="ok",Vl="cancelled",wt="unknown",w="invalid-argument",xl="deadline-exceeded",Ml="not-found";var Ul="permission-denied",li="unauthenticated",Fl="resource-exhausted",Le="failed-precondition",Bl="aborted",ql="out-of-range",Zo="unimplemented",jl="internal",zl="unavailable";var v=class extends F{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var kn=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},di=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(D.UNAUTHENTICATED))}shutdown(){}},hi=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},fi=class{constructor(e){this.auth=null,e.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(B(typeof e.accessToken=="string"),new kn(e.accessToken,new D(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}},pi=class{constructor(e,t,r){this.t=e,this.i=t,this.o=r,this.type="FirstParty",this.user=D.FIRST_PARTY,this.u=new Map}l(){return this.o?this.o():null}get headers(){this.u.set("X-Goog-AuthUser",this.t);let e=this.l();return e&&this.u.set("Authorization",e),this.i&&this.u.set("X-Goog-Iam-Authorization-Token",this.i),this.u}},mi=class{constructor(e,t,r){this.t=e,this.i=t,this.o=r}getToken(){return Promise.resolve(new pi(this.t,this.i,this.o))}start(e,t){e.enqueueRetryable(()=>t(D.FIRST_PARTY))}shutdown(){}invalidateToken(){}},gi=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},_i=class{constructor(e){this.h=e,this.appCheck=null,e.onInit(t=>{this.appCheck=t})}getToken(){return this.appCheck?this.appCheck.getToken().then(e=>e?(B(typeof e.token=="string"),new gi(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}};var vi=class{constructor(e,t,r,i,s,o,a,c,u){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=u}},On=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}},Nn=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&A(),r===void 0?r=e.length-t:r>e.length-t&&A(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},N=class n extends Nn{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new v(w,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},$l=/^[_a-zA-Z][_a-zA-Z0-9]*$/,ee=class n extends Nn{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return $l.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new v(w,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;i<e.length;){let a=e[i];if(a==="\\"){if(i+1===e.length)throw new v(w,"Path has trailing escape character: "+e);let c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new v(w,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new v(w,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var $=class n{constructor(e){this.path=e}static fromPath(e){return new n(N.fromString(e))}static fromName(e){return new n(N.fromString(e).popFirst(5))}static empty(){return new n(N.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&N.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return N.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new N(e.slice()))}};function Xo(n,e,t){if(!t)throw new v(w,`Function ${n}() cannot be called with an empty ${e}.`)}function Bo(n){if(!$.isDocumentKey(n))throw new v(w,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function qo(n){if($.isDocumentKey(n))throw new v(w,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ji(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":A()}function Qn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new v(w,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Ji(n);throw new v(w,`Expected type '${e.name}', but it was: ${t}`)}}return n}function ea(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Sn=null;function Hl(){return Sn===null?Sn=function(){return 268435456+Math.round(2147483648*Math.random())}():Sn++,"0x"+Sn.toString(16)}function Wl(n){return n==null}function Cn(n){return n===0&&1/n==-1/0}var Gl={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var jo,I;function zo(n){if(n===void 0)return Ki("RPC_ERROR","HTTP error has no status"),wt;switch(n){case 200:return Fo;case 400:return Le;case 401:return li;case 403:return Ul;case 404:return Ml;case 409:return Bl;case 416:return ql;case 429:return Fl;case 499:return Vl;case 500:return wt;case 501:return Zo;case 503:return zl;case 504:return xl;default:return n>=200&&n<300?Fo:n>=400&&n<500?Le:n>=500&&n<600?jl:wt}}(I=jo||(jo={}))[I.OK=0]="OK",I[I.CANCELLED=1]="CANCELLED",I[I.UNKNOWN=2]="UNKNOWN",I[I.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",I[I.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",I[I.NOT_FOUND=5]="NOT_FOUND",I[I.ALREADY_EXISTS=6]="ALREADY_EXISTS",I[I.PERMISSION_DENIED=7]="PERMISSION_DENIED",I[I.UNAUTHENTICATED=16]="UNAUTHENTICATED",I[I.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",I[I.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",I[I.ABORTED=10]="ABORTED",I[I.OUT_OF_RANGE=11]="OUT_OF_RANGE",I[I.UNIMPLEMENTED=12]="UNIMPLEMENTED",I[I.INTERNAL=13]="INTERNAL",I[I.UNAVAILABLE=14]="UNAVAILABLE",I[I.DATA_LOSS=15]="DATA_LOSS";var yi=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.m=r+"://"+t.host,this.A=`projects/${i}/databases/${s}`,this.T=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get R(){return!1}P(t,r,i,s,o){let a=Hl(),c=this.V(t,r.toUriEncodedString());Pn("RestConnection",`Sending RPC '${t}' ${a}:`,c,i);let u={"google-cloud-resource-prefix":this.A,"x-goog-request-params":this.T};return this.I(u,s,o),this.p(t,c,u,i).then(d=>(Pn("RestConnection",`Received RPC '${t}' ${a}: `,d),d),d=>{throw Qo("RestConnection",`RPC '${t}' ${a} failed with error: `,d,"url: ",c,"request:",i),d})}g(t,r,i,s,o,a){return this.P(t,r,i,s,o)}I(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ze}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}V(t,r){let i=Gl[t];return`${this.m}/v1/${r}:${i}`}terminate(){}}{constructor(e,t){super(e),this.F=t}v(e,t){throw new Error("Not supported by FetchConnection")}async p(e,t,r,i){var s;let o=JSON.stringify(i),a;try{a=await this.F(t,{method:"POST",headers:r,body:o})}catch(c){let u=c;throw new v(zo(u.status),"Request failed with error: "+u.statusText)}if(!a.ok){let c=await a.json();Array.isArray(c)&&(c=c[0]);let u=(s=c==null?void 0:c.error)===null||s===void 0?void 0:s.message;throw new v(zo(a.status),`Request failed with error: ${u!=null?u:a.statusText}`)}return a.json()}};function Kl(n){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var wi=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=Kl(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function k(n,e){return n<e?-1:n>e?1:0}function ta(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function $o(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function xt(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}var Ii=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var ve=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new Ii("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return k(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};ve.EMPTY_BYTE_STRING=new ve("");var Yl=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ve(n){if(B(!!n),typeof n=="string"){let e=0,t=Yl.exec(n);if(B(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:R(n.seconds),nanos:R(n.nanos)}}function R(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function At(n){return typeof n=="string"?ve.fromBase64String(n):ve.fromUint8Array(n)}var G=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new v(w,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new v(w,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new v(w,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new v(w,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?k(this.nanoseconds,e.nanoseconds):k(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};function na(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function ra(n){let e=n.mapValue.fields.__previous_value__;return na(e)?ra(e):e}function St(n){let e=Ve(n.mapValue.fields.__local_write_time__.timestampValue);return new G(e.seconds,e.nanos)}var Rn={fields:{__type__:{stringValue:"__max__"}}};function xe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?na(n)?4:function(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}(n)?9007199254740991:function(t){var r,i;return((i=(((r=t==null?void 0:t.mapValue)===null||r===void 0?void 0:r.fields)||{}).__type__)===null||i===void 0?void 0:i.stringValue)==="__vector__"}(n)?10:11:A()}function Dn(n,e){if(n===e)return!0;let t=xe(n);if(t!==xe(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return St(n).isEqual(St(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=Ve(i.timestampValue),a=Ve(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return At(i.bytesValue).isEqual(At(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return R(i.geoPointValue.latitude)===R(s.geoPointValue.latitude)&&R(i.geoPointValue.longitude)===R(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return R(i.integerValue)===R(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=R(i.doubleValue),a=R(s.doubleValue);return o===a?Cn(o)===Cn(a):isNaN(o)&&isNaN(a)}return!1}(n,e);case 9:return ta(n.arrayValue.values||[],e.arrayValue.values||[],Dn);case 10:case 11:return function(i,s){let o=i.mapValue.fields||{},a=s.mapValue.fields||{};if($o(o)!==$o(a))return!1;for(let c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!Dn(o[c],a[c])))return!1;return!0}(n,e);default:return A()}}function Rt(n,e){return(n.values||[]).find(t=>Dn(t,e))!==void 0}function Ln(n,e){if(n===e)return 0;let t=xe(n),r=xe(e);if(t!==r)return k(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return k(n.booleanValue,e.booleanValue);case 2:return function(s,o){let a=R(s.integerValue||s.doubleValue),c=R(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(n,e);case 3:return Ho(n.timestampValue,e.timestampValue);case 4:return Ho(St(n),St(e));case 5:return k(n.stringValue,e.stringValue);case 6:return function(s,o){let a=At(s),c=At(o);return a.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){let a=s.split("/"),c=o.split("/");for(let u=0;u<a.length&&u<c.length;u++){let d=k(a[u],c[u]);if(d!==0)return d}return k(a.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){let a=k(R(s.latitude),R(o.latitude));return a!==0?a:k(R(s.longitude),R(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Wo(n.arrayValue,e.arrayValue);case 10:return function(s,o){var a,c,u,d;let g=s.fields||{},_=o.fields||{},b=(a=g.value)===null||a===void 0?void 0:a.arrayValue,T=(c=_.value)===null||c===void 0?void 0:c.arrayValue,re=k(((u=b==null?void 0:b.values)===null||u===void 0?void 0:u.length)||0,((d=T==null?void 0:T.values)===null||d===void 0?void 0:d.length)||0);return re!==0?re:Wo(b,T)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===Rn&&o===Rn)return 0;if(s===Rn)return 1;if(o===Rn)return-1;let a=s.fields||{},c=Object.keys(a),u=o.fields||{},d=Object.keys(u);c.sort(),d.sort();for(let g=0;g<c.length&&g<d.length;++g){let _=k(c[g],d[g]);if(_!==0)return _;let b=Ln(a[c[g]],u[d[g]]);if(b!==0)return b}return k(c.length,d.length)}(n.mapValue,e.mapValue);default:throw A()}}function Ho(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return k(n,e);let t=Ve(n),r=Ve(e),i=k(t.seconds,r.seconds);return i!==0?i:k(t.nanos,r.nanos)}function Wo(n,e){let t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){let s=Ln(t[i],r[i]);if(s)return s}return k(t.length,r.length)}function ia(n){return!!n&&"arrayValue"in n}function Go(n){return!!n&&"nullValue"in n}function Ko(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ci(n){return!!n&&"mapValue"in n}function It(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return xt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=It(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=It(n.arrayValue.values[t]);return e}return Object.assign({},n)}var Vn=class{constructor(e,t){this.position=e,this.inclusive=t}};var xn=class{},ne=class n extends xn{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Ei(e,t,r):t==="array-contains"?new Ai(e,r):t==="in"?new Si(e,r):t==="not-in"?new Ri(e,r):t==="array-contains-any"?new Pi(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new bi(e,r):new Ti(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Ln(t,this.value)):t!==null&&xe(this.value)===xe(t)&&this.matchesComparison(Ln(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return A()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Mn=class n extends xn{constructor(e,t){super(),this.filters=e,this.op=t,this.D=null}static create(e,t){return new n(e,t)}matches(e){return function(r){return r.op==="and"}(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.D!==null||(this.D=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.D}getFilters(){return Object.assign([],this.filters)}};var Ei=class extends ne{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){let t=$.comparator(e.key,this.key);return this.matchesComparison(t)}},bi=class extends ne{constructor(e,t){super(e,"in",t),this.keys=sa("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Ti=class extends ne{constructor(e,t){super(e,"not-in",t),this.keys=sa("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function sa(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>$.fromName(r.referenceValue))}var Ai=class extends ne{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return ia(t)&&Rt(t.arrayValue,this.value)}},Si=class extends ne{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&Rt(this.value.arrayValue,t)}},Ri=class extends ne{constructor(e,t){super(e,"not-in",t)}matches(e){if(Rt(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!Rt(this.value.arrayValue,t)}},Pi=class extends ne{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!ia(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Rt(this.value.arrayValue,r))}};var Pt=class{constructor(e,t="asc"){this.field=e,this.dir=t}};var V=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new G(0,0))}static max(){return new n(new G(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var ki=class n{constructor(e,t){this.comparator=e,this.root=t||te.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,te.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,te.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new We(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new We(this.root,e,this.comparator,!1)}getReverseIterator(){return new We(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new We(this.root,e,this.comparator,!0)}},We=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},te=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:n.EMPTY,this.right=s!=null?s:n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw A();let e=this.left.check();if(e!==this.right.check())throw A();return e+(this.isRed()?0:1)}};te.EMPTY=null,te.RED=!0,te.BLACK=!1;te.EMPTY=new class{constructor(){this.size=0}get key(){throw A()}get value(){throw A()}get color(){throw A()}get left(){throw A()}get right(){throw A()}copy(e,t,r,i,s){return this}insert(e,t,r){return new te(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var Un=class n{constructor(e){this.comparator=e,this.data=new ki(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Fn(this.data.getIterator())}getIteratorFrom(e){return new Fn(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Fn=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var Ke=class n{constructor(e){this.fields=e,e.sort(ee.comparator)}static empty(){return new n([])}unionWith(e){let t=new Un(ee.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ta(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var j=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ci(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=It(t)}setAll(e){let t=ee.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){let c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=It(o):i.push(a.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());ci(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Dn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ci(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){xt(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(It(this.value))}};var kt=class n{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new n(e,0,V.min(),V.min(),V.min(),j.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,V.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,V.min(),V.min(),j.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,V.min(),V.min(),j.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(V.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=j.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=j.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=V.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Oi=class{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.C=null}};function Yo(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Oi(n,e,t,r,i,s,o)}var Ni=class{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.S=null,this.N=null,this.O=null,this.startAt,this.endAt}};function Jl(n){let e=Vt(n);if(e.S===null){e.S=[];let t=new Set;for(let s of e.explicitOrderBy)e.S.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Un(ee.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(u=>{u.isInequality()&&(a=a.add(u.field))})}),a})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.S.push(new Pt(s,r))}),t.has(ee.keyField().canonicalString())||e.S.push(new Pt(ee.keyField(),r))}return e.S}function Ql(n){let e=Vt(n);return e.N||(e.N=Zl(e,Jl(n))),e.N}function Zl(n,e){if(n.limitType==="F")return Yo(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new Pt(i.field,s)});let t=n.endAt?new Vn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Vn(n.startAt.position,n.startAt.inclusive):null;return Yo(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function oa(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Cn(e)?"-0":e}}function Xl(n,e){return function(r){return typeof r=="number"&&Number.isInteger(r)&&!Cn(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}(e)?function(r){return{integerValue:""+r}}(e):oa(n,e)}var Ye=class{constructor(){this._=void 0}},Ci=class extends Ye{},Di=class extends Ye{constructor(e){super(),this.elements=e}},Li=class extends Ye{constructor(e){super(),this.elements=e}},Vi=class extends Ye{constructor(e,t){super(),this.serializer=e,this.q=t}};var Et=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}},Je=class{},Bn=class extends Je{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Ot=class extends Je{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}},qn=class extends Je{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},xi=class extends Je{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var ed={asc:"ASCENDING",desc:"DESCENDING"},td={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nd={and:"AND",or:"OR"},Mi=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function Ui(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function rd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function id(n,e){return Ui(n,e.toTimestamp())}function bt(n){return B(!!n),V.fromTimestamp(function(t){let r=Ve(t);return new G(r.seconds,r.nanos)}(n))}function Qi(n,e){return Fi(n,e).canonicalString()}function Fi(n,e){let t=function(i){return new N(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function jn(n,e){return Qi(n.databaseId,e.path)}function Bi(n,e){let t=function(i){let s=N.fromString(i);return B(ca(s)),s}(e);if(t.get(1)!==n.databaseId.projectId)throw new v(w,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new v(w,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(function(i){return B(i.length>4&&i.get(4)==="documents"),i.popFirst(5)}(t))}function Jo(n,e,t){return{name:jn(n,e),fields:t.value.mapValue.fields}}function sd(n,e){return"found"in e?function(r,i){B(!!i.found),i.found.name,i.found.updateTime;let s=Bi(r,i.found.name),o=bt(i.found.updateTime),a=i.found.createTime?bt(i.found.createTime):V.min(),c=new j({mapValue:{fields:i.found.fields}});return kt.newFoundDocument(s,o,a,c)}(n,e):"missing"in e?function(r,i){B(!!i.missing),B(!!i.readTime);let s=Bi(r,i.missing),o=bt(i.readTime);return kt.newNoDocument(s,o)}(n,e):A()}function od(n,e){let t;if(e instanceof Bn)t={update:Jo(n,e.key,e.value)};else if(e instanceof qn)t={delete:jn(n,e.key)};else if(e instanceof Ot)t={update:Jo(n,e.key,e.data),updateMask:dd(e.fieldMask)};else{if(!(e instanceof xi))return A();t={verify:jn(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){let a=o.transform;if(a instanceof Ci)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Di)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Li)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Vi)return{fieldPath:o.field.canonicalString(),increment:a.q};throw A()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:id(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:A()}(n,e.precondition)),t}function ad(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=function(u,d){return Qi(u.databaseId,d)}(n,i);let s=function(u){if(u.length!==0)return aa(Mn.create(u,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let o=function(u){if(u.length!==0)return u.map(d=>function(_){return{field:He(_.field),direction:cd(_.dir)}}(d))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let a=function(u,d){return u.useProto3Json||Wl(d)?d:{value:d}}(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{B:t,parent:i}}function cd(n){return ed[n]}function ud(n){return td[n]}function ld(n){return nd[n]}function He(n){return{fieldPath:n.canonicalString()}}function aa(n){return n instanceof ne?function(t){if(t.op==="=="){if(Ko(t.value))return{unaryFilter:{field:He(t.field),op:"IS_NAN"}};if(Go(t.value))return{unaryFilter:{field:He(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ko(t.value))return{unaryFilter:{field:He(t.field),op:"IS_NOT_NAN"}};if(Go(t.value))return{unaryFilter:{field:He(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:He(t.field),op:ud(t.op),value:t.value}}}(n):n instanceof Mn?function(t){let r=t.getFilters().map(i=>aa(i));return r.length===1?r[0]:{compositeFilter:{op:ld(t.op),filters:r}}}(n):A()}function dd(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ca(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Zi(n){return new Mi(n,!0)}var qi=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.Y=!1}Z(){if(this.Y)throw new v(Le,"The client has already been terminated.")}P(e,t,r,i){return this.Z(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.P(e,Fi(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===li&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new v(wt,s.toString())})}g(e,t,r,i,s){return this.Z(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.g(e,Fi(t,r),i,o,a,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===li&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new v(wt,o.toString())})}terminate(){this.Y=!0,this.connection.terminate()}};async function hd(n,e){let t=Vt(n),r={writes:e.map(i=>od(t.serializer,i))};await t.P("Commit",t.serializer.databaseId,N.emptyPath(),r)}async function fd(n,e){let t=Vt(n),r={documents:e.map(a=>jn(t.serializer,a))},i=await t.g("BatchGetDocuments",t.serializer.databaseId,N.emptyPath(),r,e.length),s=new Map;i.forEach(a=>{let c=sd(t.serializer,a);s.set(c.key.toString(),c)});let o=[];return e.forEach(a=>{let c=s.get(a.toString());B(!!c),o.push(c)}),o}async function pd(n,e){let t=Vt(n),{B:r,parent:i}=ad(t.serializer,Ql(e));return(await t.g("RunQuery",t.serializer.databaseId,i,{structuredQuery:r.structuredQuery})).filter(s=>!!s.document).map(s=>function(a,c,u){let d=Bi(a,c.name),g=bt(c.updateTime),_=c.createTime?bt(c.createTime):V.min(),b=new j({mapValue:{fields:c.fields}}),T=kt.newFoundDocument(d,g,_,b);return u&&T.setHasCommittedMutations(),u?T.setHasCommittedMutations():T}(t.serializer,s.document,void 0))}var Tt=new Map;function Xi(n){if(n._terminated)throw new v(Le,"The client has already been terminated.");if(!Tt.has(n)){Pn("ComponentProvider","Initializing Datastore");let e=function(s){return new yi(s,fetch.bind(null))}(function(s,o,a,c){return new vi(s,o,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,ea(c.experimentalLongPollingOptions),c.useFetchStreams)}(n._databaseId,n.app.options.appId||"",n._persistenceKey,n._freezeSettings())),t=Zi(n._databaseId),r=function(s,o,a,c){return new qi(s,o,a,c)}(n._authCredentials,n._appCheckCredentials,e,t);Tt.set(n,r)}return Tt.get(n)}var zn=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new v(w,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new v(w,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(s,o,a,c){if(o===!0&&c===!0)throw new v(w,`${s} and ${a} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ea((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new v(w,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new v(w,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new v(w,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Me=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new zn({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new v(Le,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new v(Le,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new zn(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new di;switch(r.type){case"firstParty":return new mi(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new v(w,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Tt.get(t);r&&(Pn("ComponentProvider","Removing Datastore"),Tt.delete(t),r.terminate())}(this),Promise.resolve()}};function ua(n,e){let t=typeof n=="object"?n:Kt(),r=typeof n=="string"?n:e||"(default)",i=st(t,"firestore/lite").getImmediate({identifier:r});if(!i._initialized){let s=ms("firestore");s&&md(i,...s)}return i}function md(n,e,t,r={}){var i;let s=(n=Qn(n,Me))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&Qo("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=D.MOCK_USER;else{a=gs(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let u=r.mockUserToken.sub||r.mockUserToken.user_id;if(!u)throw new v(w,"mockUserToken must contain 'sub' or 'user_id' field!");c=new D(u)}n._authCredentials=new hi(new kn(a,c))}}var $n=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},z=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new _e(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},_e=class n extends $n{constructor(e,t,r){super(e,t,function(s){return new Ni(s)}(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new z(this.firestore,null,new $(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function es(n,e,...t){if(n=S(n),Xo("collection","path",e),n instanceof Me){let r=N.fromString(e,...t);return qo(r),new _e(n,null,r)}{if(!(n instanceof z||n instanceof _e))throw new v(w,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(N.fromString(e,...t));return qo(r),new _e(n.firestore,null,r)}}function K(n,e,...t){if(n=S(n),arguments.length===1&&(e=wi.newId()),Xo("doc","path",e),n instanceof Me){let r=N.fromString(e,...t);return Bo(r),new z(n,null,new $(r))}{if(!(n instanceof z||n instanceof _e))throw new v(w,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(N.fromString(e,...t));return Bo(r),new z(n.firestore,n instanceof _e?n.converter:null,new $(r))}}var Nt=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(ve.fromBase64String(e))}catch(t){throw new v(w,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(ve.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var Qe=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new v(w,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ee(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var Ct=class{constructor(e){this._methodName=e}};var Dt=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new v(w,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new v(w,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return k(this._lat,e._lat)||k(this._long,e._long)}};var Lt=class{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}};var gd=/^__.*__$/,ji=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ot(e,this.data,this.fieldMask,t,this.fieldTransforms):new Bn(e,this.data,t,this.fieldTransforms)}},Hn=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Ot(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function la(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw A()}}var zi=class n{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.tt(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get et(){return this.settings.et}rt(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}nt(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.rt({path:r,it:!1});return i.st(e),i}ot(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.rt({path:r,it:!1});return i.tt(),i}ut(e){return this.rt({path:void 0,it:!0})}_t(e){return Gn(e,this.settings.methodName,this.settings.ct||!1,this.path,this.settings.lt)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}tt(){if(this.path)for(let e=0;e<this.path.length;e++)this.st(this.path.get(e))}st(e){if(e.length===0)throw this._t("Document fields must not be empty");if(la(this.et)&&gd.test(e))throw this._t('Document fields cannot begin and end with "__"')}},$i=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Zi(e)}ht(e,t,r,i=!1){return new zi({et:e,methodName:t,lt:r,path:ee.emptyPath(),it:!1,ct:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function _d(n){let e=n._freezeSettings(),t=Zi(n._databaseId);return new $i(n._databaseId,!!e.ignoreUndefinedProperties,t)}function vd(n,e,t,r,i,s={}){let o=n.ht(s.merge||s.mergeFields?2:0,e,t,i);ts("Data must be an object, but it was:",o,r);let a=da(r,o),c,u;if(s.merge)c=new Ke(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){let d=[];for(let g of s.mergeFields){let _=Hi(e,g,t);if(!o.contains(_))throw new v(w,`Field '${_}' is specified in your field mask but missing from your input data.`);fa(d,_)||d.push(_)}c=new Ke(d),u=o.fieldTransforms.filter(g=>c.covers(g.field))}else c=null,u=o.fieldTransforms;return new ji(new j(a),c,u)}var Wn=class n extends Ct{_toFieldTransform(e){if(e.et!==2)throw e.et===1?e._t(`${this._methodName}() can only appear at the top level of your update data`):e._t(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};function yd(n,e,t,r){let i=n.ht(1,e,t);ts("Data must be an object, but it was:",i,r);let s=[],o=j.empty();xt(r,(c,u)=>{let d=ns(e,c,t);u=S(u);let g=i.ot(d);if(u instanceof Wn)s.push(d);else{let _=Zn(u,g);_!=null&&(s.push(d),o.set(d,_))}});let a=new Ke(s);return new Hn(o,a,i.fieldTransforms)}function wd(n,e,t,r,i,s){let o=n.ht(1,e,t),a=[Hi(e,r,t)],c=[i];if(s.length%2!=0)throw new v(w,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<s.length;_+=2)a.push(Hi(e,s[_])),c.push(s[_+1]);let u=[],d=j.empty();for(let _=a.length-1;_>=0;--_)if(!fa(u,a[_])){let b=a[_],T=c[_];T=S(T);let re=o.ot(b);if(T instanceof Wn)u.push(b);else{let ie=Zn(T,re);ie!=null&&(u.push(b),d.set(b,ie))}}let g=new Ke(u);return new Hn(d,g,o.fieldTransforms)}function Zn(n,e){if(ha(n=S(n)))return ts("Unsupported field value:",e,n),da(n,e);if(n instanceof Ct)return function(r,i){if(!la(i.et))throw i._t(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i._t(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.it&&e.et!==4)throw e._t("Nested arrays are not supported");return function(r,i){let s=[],o=0;for(let a of r){let c=Zn(a,i.ut(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=S(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Xl(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=G.fromDate(r);return{timestampValue:Ui(i.serializer,s)}}if(r instanceof G){let s=new G(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ui(i.serializer,s)}}if(r instanceof Dt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Nt)return{bytesValue:rd(i.serializer,r._byteString)};if(r instanceof z){let s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i._t(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Qi(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Lt)return function(o,a){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw a._t("VectorValues must only contain numeric values.");return oa(a.serializer,c)})}}}}}}(r,i);throw i._t(`Unsupported field value: ${Ji(r)}`)}(n,e)}function da(n,e){let t={};return function(i){for(let s in i)if(Object.prototype.hasOwnProperty.call(i,s))return!1;return!0}(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):xt(n,(r,i)=>{let s=Zn(i,e.nt(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function ha(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof G||n instanceof Dt||n instanceof Nt||n instanceof z||n instanceof Ct||n instanceof Lt)}function ts(n,e,t){if(!ha(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=Ji(t);throw r==="an object"?e._t(n+" a custom object"):e._t(n+" "+r)}}function Hi(n,e,t){if((e=S(e))instanceof Qe)return e._internalPath;if(typeof e=="string")return ns(n,e);throw Gn("Field path arguments must be of type string or ",n,!1,void 0,t)}var Id=new RegExp("[~\\*/\\[\\]]");function ns(n,e,t){if(e.search(Id)>=0)throw Gn(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Qe(...e.split("."))._internalPath}catch(r){throw Gn(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Gn(n,e,t,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new v(w,a+n+c)}function fa(n,e){return n.some(t=>t.isEqual(e))}var Kn=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new z(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Yn(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Ed("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Yn=class extends Kn{data(){return super.data()}},Wi=class{constructor(e,t){this._docs=t,this.query=e}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(e,t){this._docs.forEach(e,t)}};function Ed(n,e){return typeof e=="string"?ns(n,e):e instanceof Qe?e._internalPath:e._delegate._internalPath}function bd(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Jn=class extends class{convertValue(t,r="none"){switch(xe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return R(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,r);case 5:return t.stringValue;case 6:return this.convertBytes(At(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,r);case 11:return this.convertObject(t.mapValue,r);case 10:return this.convertVectorValue(t.mapValue);default:throw A()}}convertObject(t,r){return this.convertObjectMap(t.fields,r)}convertObjectMap(t,r="none"){let i={};return xt(t,(s,o)=>{i[s]=this.convertValue(o,r)}),i}convertVectorValue(t){var r,i,s;let o=(s=(i=(r=t.fields)===null||r===void 0?void 0:r.value.arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(a=>R(a.doubleValue));return new Lt(o)}convertGeoPoint(t){return new Dt(R(t.latitude),R(t.longitude))}convertArray(t,r){return(t.values||[]).map(i=>this.convertValue(i,r))}convertServerTimestamp(t,r){switch(r){case"previous":let i=ra(t);return i==null?null:this.convertValue(i,r);case"estimate":return this.convertTimestamp(St(t));default:return null}}convertTimestamp(t){let r=Ve(t);return new G(r.seconds,r.nanos)}convertDocumentKey(t,r){let i=N.fromString(t);B(ca(i));let s=new On(i.get(1),i.get(3)),o=new $(i.popFirst(5));return s.isEqual(r)||Ki(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${r.projectId}/${r.database}) instead.`),o}}{constructor(e){super(),this.firestore=e}convertBytes(e){return new Nt(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new z(this.firestore,null,t)}};function Mt(n){let e=Xi((n=Qn(n,z)).firestore),t=new Jn(n.firestore);return fd(e,[n._key]).then(r=>{B(r.length===1);let i=r[0];return new Kn(n.firestore,t,n._key,i.isFoundDocument()?i:null,n.converter)})}function rs(n){(function(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new v(Zo,"limitToLast() queries require specifying at least one orderBy() clause")})((n=Qn(n,$n))._query);let e=Xi(n.firestore),t=new Jn(n.firestore);return pd(e,n._query).then(r=>{let i=r.map(s=>new Yn(n.firestore,t,s.key,s,n.converter));return n._query.limitType==="L"&&i.reverse(),new Wi(n,i)})}var Gi=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=_d(e)}set(e,t,r){this._verifyNotCommitted();let i=ui(e,this._firestore),s=bd(i.converter,t,r),o=vd(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Et.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=ui(e,this._firestore),o;return o=typeof(t=S(t))=="string"||t instanceof Qe?wd(this._dataReader,"WriteBatch.update",s._key,t,r,i):yd(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Et.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=ui(e,this._firestore);return this._mutations=this._mutations.concat(new qn(t._key,Et.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new v(Le,"A write batch can no longer be used after commit() has been called.")}};function ui(n,e){if((n=S(n)).firestore!==e)throw new v(w,"Provided document reference is from a different Firestore instance.");return n}function Xn(n){let e=Xi(n=Qn(n,Me));return new Gi(n,t=>hd(e,t))}(function(){(function(t){Ze=t})(`${fe}_lite`),he(new q("firestore/lite",(e,{instanceIdentifier:t,options:r})=>{let i=e.getProvider("app").getImmediate(),s=new Me(new fi(e.getProvider("auth-internal")),new _i(e.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new v(w,'"projectId" not provided in firebase.initializeApp.');return new On(a.options.projectId,c)}(i,t),i);return r&&s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),H("firestore-lite","4.7.3",""),H("firestore-lite","4.7.3","esm2017")})();var Td="firebase",Ad="10.14.1";H(Td,Ad,"app");var Ut=window.KZ_FIREBASE||{},er=!!Ut.apiKey&&Ut.apiKey!=="REPLACE_ME"&&!!Ut.projectId&&Ut.projectId!=="REPLACE_ME",is=er?kr(Ut):null,M=er?ua(is):null,Xe="articles",Ft="articleBodies";var pa=[{id:"professionelle-zahnreinigung",title:"Professionelle Zahnreinigung: Was passiert dabei und wie oft ist sie sinnvoll?",category:"Vorsorge",excerpt:"Z\xE4hneputzen allein erreicht nicht alle Stellen. So l\xE4uft eine professionelle Zahnreinigung ab und darum beugt sie Karies und Parodontitis vor.",cover:"assets/img/3d/aesthetic.webp",coverFit:"contain",tone:"mint",publishedAt:Date.UTC(2026,9,1,9),author:"Praxis Klar Zahn",html:"<p>Auch wer gr\xFCndlich putzt, erreicht mit Zahnb\xFCrste und Zahnseide nicht jede Stelle. In den Zahnzwischenr\xE4umen, am Zahnfleischrand und an den hinteren Backenz\xE4hnen bleiben Bel\xE4ge zur\xFCck. Mit der Zeit verh\xE4rten sie zu Zahnstein, an dem sich Bakterien besonders gut festsetzen.</p><h2>So l\xE4uft die Reinigung ab</h2><ul><li>Zuerst sehen wir uns Z\xE4hne und Zahnfleisch genau an.</li><li>Weiche und harte Bel\xE4ge entfernen wir mit feinen Instrumenten und Ultraschall, auch zwischen den Z\xE4hnen.</li><li>Verf\xE4rbungen, zum Beispiel durch Kaffee, Tee oder Rauchen, l\xF6sen wir schonend mit einem Pulverstrahl.</li><li>Danach polieren wir die Zahnoberfl\xE4chen glatt, damit neue Bel\xE4ge schlechter haften.</li><li>Zum Schluss sch\xFCtzt ein Fluoridlack den Zahnschmelz.</li></ul><h2>Wie oft ist eine PZR sinnvoll?</h2><p>F\xFCr die meisten Menschen sind ein bis zwei Termine im Jahr empfehlenswert. Wer zu Zahnfleischentz\xFCndungen neigt, Implantate oder viel Zahnersatz hat, profitiert oft von k\xFCrzeren Abst\xE4nden. Wie oft es bei Ihnen sinnvoll ist, besprechen wir gemeinsam bei der Kontrolluntersuchung.</p><blockquote>Tipp: Fragen Sie bei Ihrer Reinigung nach der passenden Gr\xF6\xDFe f\xFCr Zahnzwischenraumb\xFCrstchen. Damit reinigen Sie die Zwischenr\xE4ume im Alltag besonders gr\xFCndlich.</blockquote>"},{id:"angstfrei-im-daemmerschlaf",title:"Angst vor dem Zahnarzt? So hilft die Behandlung im D\xE4mmerschlaf",category:"Angstfrei",excerpt:"Viele Menschen schieben Zahnarztbesuche aus Angst auf. D\xE4mmerschlaf oder Vollnarkose k\xF6nnen helfen, wieder entspannt zur Behandlung zu kommen.",cover:"assets/img/3d/moon.webp",coverFit:"contain",tone:"night",publishedAt:Date.UTC(2026,8,18,9),author:"Praxis Klar Zahn",html:"<p>Zahnarztangst ist weit verbreitet und nichts, wof\xFCr man sich sch\xE4men muss. Schwierig wird es, wenn Termine immer wieder verschoben werden und kleine Probleme dadurch gr\xF6\xDFer werden. Es gibt Wege, die Behandlung deutlich angenehmer zu machen.</p><h2>Der erste Schritt: dar\xFCber sprechen</h2><p>Sagen Sie uns schon bei der Terminvereinbarung, dass Sie Angst haben. Wir planen dann mehr Zeit ein, erkl\xE4ren jeden Schritt in Ruhe und vereinbaren ein Handzeichen, mit dem Sie jederzeit eine Pause einlegen k\xF6nnen.</p><h2>D\xE4mmerschlaf und Vollnarkose</h2><p>Im D\xE4mmerschlaf sind Sie tief entspannt und nehmen die Behandlung kaum wahr, atmen aber selbstst\xE4ndig. In Vollnarkose schlafen Sie w\xE4hrend der gesamten Behandlung. Welches Verfahren f\xFCr Sie geeignet ist, h\xE4ngt von Ihrer Gesundheit und vom geplanten Eingriff ab.</p><ul><li>Vorher f\xFChren wir ein ausf\xFChrliches Aufkl\xE4rungsgespr\xE4ch mit Ihnen.</li><li>Am Behandlungstag kommen Sie n\xFCchtern und lassen sich abholen.</li><li>F\xFCr den Rest des Tages d\xFCrfen Sie nicht selbst Auto fahren.</li></ul><p>Oft lassen sich mehrere Behandlungen in einer Sitzung zusammenfassen. So sparen Sie Termine und k\xF6nnen sich danach in Ruhe erholen.</p>"},{id:"implantat-oder-bruecke",title:"Implantat oder Br\xFCcke? Die wichtigsten Unterschiede",category:"Zahnersatz",excerpt:"Fehlt ein Zahn, gibt es mehrere Wege, die L\xFCcke zu schlie\xDFen. Ein \xDCberblick \xFCber Implantat und Br\xFCcke und worauf es bei der Entscheidung ankommt.",cover:"assets/img/3d/implant.webp",coverFit:"contain",tone:"night",publishedAt:Date.UTC(2026,8,3,9),author:"Praxis Klar Zahn",html:"<p>Eine Zahnl\xFCcke ist nicht nur eine Frage der Optik. Benachbarte Z\xE4hne k\xF6nnen mit der Zeit in die L\xFCcke kippen, und der Kieferknochen bildet sich an dieser Stelle zur\xFCck. Deshalb lohnt es sich, eine L\xFCcke rechtzeitig zu versorgen.</p><h2>Die Br\xFCcke</h2><p>Bei einer Br\xFCcke werden die Nachbarz\xE4hne beschliffen und tragen den Ersatzzahn wie zwei Pfeiler. Das ist eine bew\xE4hrte L\xF6sung, besonders wenn die Nachbarz\xE4hne ohnehin Kronen oder gro\xDFe F\xFCllungen brauchen.</p><h2>Das Implantat</h2><p>Ein Implantat ist eine k\xFCnstliche Zahnwurzel, meist aus Titan, die in den Kieferknochen eingesetzt wird. Nach der Einheilzeit tr\xE4gt es eine Krone. Die Nachbarz\xE4hne bleiben unber\xFChrt, und der Knochen wird beim Kauen weiter belastet.</p><h2>Was passt zu Ihnen?</h2><ul><li>Wie gesund sind die Nachbarz\xE4hne?</li><li>Ist gen\xFCgend Kieferknochen vorhanden?</li><li>Wie viel Zeit m\xF6chten Sie f\xFCr die Behandlung einplanen?</li><li>Welche Kosten kommen auf Sie zu?</li></ul><p>Diese Fragen kl\xE4ren wir gemeinsam in einem Beratungsgespr\xE4ch. Kronen und Br\xFCcken fertigen wir in unserem eigenen Meisterlabor, so k\xF6nnen wir Form und Farbe direkt mit Ihnen abstimmen.</p>"}];var ma={P:[],H2:[],H3:[],STRONG:[],EM:[],U:[],UL:[],OL:[],LI:[],BLOCKQUOTE:[],A:["href"],IMG:["src","alt"],BR:[],FIGURE:[],FIGCAPTION:[]},ga={DIV:"P",H1:"H2",H4:"H3",H5:"H3",H6:"H3",B:"STRONG",I:"EM"},Sd={SCRIPT:1,STYLE:1,IFRAME:1,OBJECT:1,EMBED:1,FORM:1,INPUT:1,BUTTON:1,META:1,LINK:1,SVG:1,VIDEO:1,AUDIO:1};function Bt(n){let e=new DOMParser().parseFromString("<div>"+(n||"")+"</div>","text/html"),t=e.body.firstChild;return function r(i){Array.prototype.slice.call(i.childNodes).forEach(function(s){if(s.nodeType===3)return;if(s.nodeType!==1){s.remove();return}let o=s,a=o.tagName;if(Sd[a]){o.remove();return}if(ga[a]){let c=e.createElement(ga[a]);for(;o.firstChild;)c.appendChild(o.firstChild);o.replaceWith(c),o=c}if(!ma[o.tagName]){for(r(o);o.firstChild;)i.insertBefore(o.firstChild,o);o.remove();return}if(Array.prototype.slice.call(o.attributes).forEach(function(c){ma[o.tagName].indexOf(c.name)===-1&&o.removeAttribute(c.name)}),o.tagName==="A"){let c=o.getAttribute("href")||"";/^(https?:|mailto:|tel:|#|[a-z0-9_-]+\.html)/i.test(c)?/^https?:/i.test(c)&&(o.setAttribute("target","_blank"),o.setAttribute("rel","noopener")):o.removeAttribute("href")}if(o.tagName==="IMG"){let c=o.getAttribute("src")||"";if(!/^(data:image\/(png|jpe?g|webp|gif);base64,|assets\/|https:\/\/)/i.test(c)){o.remove();return}o.setAttribute("loading","lazy"),o.getAttribute("alt")||o.setAttribute("alt","")}r(o)})}(t),Array.prototype.slice.call(t.querySelectorAll("p")).forEach(function(r){!r.textContent.trim()&&!r.querySelector("img")&&r.remove()}),t.innerHTML}function L(n){return String(n==null?"":n).replace(/[&<>"']/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[e]})}function tr(n){if(!n)return"";try{return new Intl.DateTimeFormat("de-DE",{day:"numeric",month:"long",year:"numeric"}).format(new Date(n))}catch(e){return new Date(n).toLocaleDateString()}}function ss(n){let t=String(n||"").replace(/<[^>]+>/g," ").split(/\s+/).filter(Boolean).length;return Math.max(1,Math.round(t/200))}function _a(n){return String(n||"").toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,70)||"artikel"}function os(n){return"ratgeber.html?artikel="+encodeURIComponent(n)}var as=["Vorsorge","Zahnersatz","Implantologie","Angstfrei","Kinder","\xC4sthetik","Praxis-News"];function cs(n){return new Promise(function(e,t){if(!n||!/^image\//.test(n.type)){t(new Error("Bitte eine Bilddatei w\xE4hlen (JPG, PNG oder WebP)."));return}let r=URL.createObjectURL(n),i=new Image;i.onload=function(){e(i)},i.onerror=function(){URL.revokeObjectURL(r),t(new Error("Das Bild konnte nicht gelesen werden."))},i.src=r})}function va(n,e){let t=n.toDataURL("image/webp",e);return t.indexOf("data:image/webp")!==0&&(t=n.toDataURL("image/jpeg",e)),t}function ya(n){let e=1.7777777777777777,t=n.naturalWidth,r=n.naturalHeight,i=0,s=0;if(t/r>e){let a=r*e;i=(t-a)/2,t=a}else{let a=t/e;s=(r-a)/2,r=a}function o(a,c){let u=document.createElement("canvas");u.width=Math.round(Math.min(a,t)),u.height=Math.round(u.width/e);let d=u.getContext("2d");return d.imageSmoothingQuality="high",d.drawImage(n,i,s,t,r,0,0,u.width,u.height),va(u,c)}return{cover:o(1600,.8),thumb:o(720,.74)}}function wa(n){let e=Math.min(1,1200/n.naturalWidth),t=document.createElement("canvas");t.width=Math.round(n.naturalWidth*e),t.height=Math.round(n.naturalHeight*e);let r=t.getContext("2d");return r.imageSmoothingQuality="high",r.drawImage(n,0,0,t.width,t.height),va(t,.78)}function us(n){return Math.round((n||"").length/1024)}var m=function(n,e){return(e||document).querySelector(n)},et=function(n,e){return Array.prototype.slice.call((e||document).querySelectorAll(n))},qt=920;function tt(n){et("[data-view]").forEach(function(e){e.hidden=e.getAttribute("data-view")!==n}),window.scrollTo(0,0)}var Ia;function U(n,e){let t=m("[data-toast]");t.textContent=n,t.className="adm-toast"+(e?" is-"+e:""),t.hidden=!1,clearTimeout(Ia),Ia=setTimeout(function(){t.hidden=!0},3600)}function Ue(n){let e=n&&n.code||"";return/invalid-credential|wrong-password|user-not-found|invalid-email/.test(e)?"E-Mail oder Passwort ist falsch.":/too-many-requests/.test(e)?"Zu viele Versuche. Bitte warten Sie einige Minuten.":/network-request-failed|unavailable/.test(e)?"Keine Verbindung. Bitte pr\xFCfen Sie Ihre Internetverbindung.":/permission-denied/.test(e)?"Keine Berechtigung. Ist Ihr Konto als Admin eingetragen?":n&&n.message||"Unbekannter Fehler."}er?Rd():tt("setup");function Rd(){let n=ai(is),e=[],t=null,r=!1,i={cover:"",thumb:"",fit:"cover"},s=m("[data-login-form]"),o=m("[data-login-error]");s.addEventListener("submit",async function(l){l.preventDefault(),o.hidden=!0;let h=m("button[type=submit]",s);h.disabled=!0;try{await ni(n,m("#login-email").value.trim(),m("#login-password").value)}catch(p){o.textContent=Ue(p),o.hidden=!1}finally{h.disabled=!1}}),m("[data-reset]").addEventListener("click",async function(){let l=m("#login-email").value.trim();if(o.hidden=!0,!l){o.textContent="Bitte zuerst Ihre E-Mail-Adresse eingeben.",o.hidden=!1;return}try{await ti(n,l),U("Wir haben Ihnen eine E-Mail zum Zur\xFCcksetzen des Passworts geschickt.","ok")}catch(h){o.textContent=Ue(h),o.hidden=!1}}),et("[data-logout]").forEach(function(l){l.addEventListener("click",function(){r&&!ir()||(r=!1,ii(n))})}),ri(n,async function(l){let h=m("[data-user]");if(!l){h.hidden=!0,tt("login");return}m("[data-user-email]").textContent=l.email||"",h.hidden=!1;let p=!1;try{p=(await Mt(K(M,"admins",l.uid))).exists()}catch(y){p=!1}if(!p){m("[data-uid]").textContent=l.uid,tt("noaccess");return}await a()});async function a(){tt("list");let l=m("[data-list]");l.innerHTML='<p class="adm-muted">Artikel werden geladen \u2026</p>';try{e=(await rs(es(M,Xe))).docs.map(function(p){return Object.assign({id:p.id},p.data())}).sort(function(p,y){return(y.updatedAt||0)-(p.updatedAt||0)})}catch(h){l.innerHTML='<p class="adm-error">'+L(Ue(h))+"</p>";return}c()}function c(){let l=m("[data-list]"),h=e.filter(function(p){return p.status==="published"}).length;m("[data-stat-pub]").textContent=h,m("[data-stat-draft]").textContent=e.length-h,m("[data-stat-last]").textContent=e[0]?tr(e[0].updatedAt):"\u2013",m("[data-empty]").hidden=e.length>0,l.hidden=e.length===0,l.innerHTML=e.map(function(p){let y=p.coverThumb||p.cover||"";return'<div class="adm-row" data-id="'+L(p.id)+'"><div class="adm-thumb tone-'+L(p.tone||"night")+'">'+(y?'<img class="'+(p.coverFit==="contain"?"fit-contain":"fit-cover")+'" src="'+L(y)+'" alt="">':"")+'</div><div class="adm-row-main"><strong>'+L(p.title||"Ohne Titel")+"</strong><span>"+L(p.category||"")+" \xB7 "+L(tr(p.publishedAt))+'</span></div><span class="adm-pill '+(p.status==="published"?"is-pub":"is-draft")+'">'+(p.status==="published"?"Ver\xF6ffentlicht":"Entwurf")+'</span><div class="adm-row-actions"><button class="adm-btn adm-btn-soft" type="button" data-edit>Bearbeiten</button>'+(p.status==="published"?'<a class="adm-btn adm-btn-ghost" href="'+os(p.id)+'" target="_blank" rel="noopener">Ansehen</a>':"")+'<button class="adm-btn adm-btn-ghost adm-danger" type="button" data-delete>L\xF6schen</button></div><div class="adm-confirm" hidden><span>Diesen Artikel endg\xFCltig l\xF6schen?</span><button class="adm-btn adm-btn-danger" type="button" data-delete-yes>Ja, l\xF6schen</button><button class="adm-btn adm-btn-ghost" type="button" data-delete-no>Abbrechen</button></div></div>'}).join("")}m("[data-list]").addEventListener("click",async function(l){let h=l.target.closest(".adm-row");if(!h)return;let p=h.getAttribute("data-id");if(l.target.closest("[data-edit]")){ie(e.filter(function(y){return y.id===p})[0]);return}if(l.target.closest("[data-delete]")){m(".adm-confirm",h).hidden=!1;return}if(l.target.closest("[data-delete-no]")){m(".adm-confirm",h).hidden=!0;return}if(l.target.closest("[data-delete-yes]"))try{let y=Xn(M);y.delete(K(M,Xe,p)),y.delete(K(M,Ft,p)),await y.commit(),e=e.filter(function(x){return x.id!==p}),c(),U("Artikel gel\xF6scht.","ok")}catch(y){U(Ue(y),"error")}}),et("[data-new]").forEach(function(l){l.addEventListener("click",function(){ie(null)})}),m("[data-import]").addEventListener("click",async function(){let l=this;l.disabled=!0;try{let h=Xn(M),p=Date.now();pa.forEach(function(y){h.set(K(M,Xe,y.id),{title:y.title,category:y.category,excerpt:y.excerpt,coverThumb:y.cover,coverFit:y.coverFit,tone:y.tone,status:"published",publishedAt:y.publishedAt,updatedAt:p,author:y.author}),h.set(K(M,Ft,y.id),{status:"published",html:y.html,cover:y.cover})}),await h.commit(),U("Beispielartikel \xFCbernommen. Sie k\xF6nnen sie jetzt bearbeiten.","ok"),await a()}catch(h){U(Ue(h),"error")}l.disabled=!1});let u=m("[data-editor]"),d=m("#post-title"),g=m("#post-excerpt"),_=m("#post-category"),b=m("#post-date"),T=m("#post-author");_.innerHTML=as.map(function(l){return"<option>"+L(l)+"</option>"}).join("");try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch(l){}function re(l){let h=new Date(l||Date.now());return h.getFullYear()+"-"+String(h.getMonth()+1).padStart(2,"0")+"-"+String(h.getDate()).padStart(2,"0")}async function ie(l){if(!(r&&!ir())){if(t=l?Object.assign({},l):null,d.value=l&&l.title||"",g.value=l&&l.excerpt||"",_.value=l&&l.category?l.category:as[0],b.value=re(l?l.publishedAt:Date.now()),T.value=l&&l.author?l.author:"Mikel Salloum",i={cover:"",thumb:l&&l.coverThumb||"",fit:l&&l.coverFit==="contain"?"contain":"cover"},u.innerHTML=l?"<p>Inhalt wird geladen \u2026</p>":"<p></p>",m("[data-editor-title]").textContent=l?"Artikel bearbeiten":"Neuer Artikel",tt("editor"),l)try{let h=await Mt(K(M,Ft,l.id)),p=h.exists()?h.data():{};u.innerHTML=Bt(p.html||"")||"<p></p>",i.cover=p.cover||""}catch(h){U(Ue(h),"error")}r=!1,ye()}}function ye(){let l=t?t.status:"new",h=m("[data-editor-status]");h.textContent=l==="published"?"Ver\xF6ffentlicht":l==="draft"?"Entwurf":"Noch nicht gespeichert",h.className="adm-pill "+(l==="published"?"is-pub":"is-draft"),m("[data-publish]").textContent=l==="published"?"\xC4nderungen ver\xF6ffentlichen":"Ver\xF6ffentlichen",m("[data-unpublish]").hidden=l!=="published",m("[data-view-live]").hidden=l!=="published",t&&(m("[data-view-live]").href=os(t.id));let p=m("[data-cover-preview]"),y=i.cover||i.thumb;p.innerHTML=y?'<img class="'+(i.fit==="contain"?"fit-contain":"fit-cover")+'" src="'+L(y)+'" alt="">':"<span>Noch kein Titelbild</span>",m("[data-cover-remove]").hidden=!y,m("[data-excerpt-count]").textContent=g.value.length+" / 220",ue()}function ue(){let l=us(u.innerHTML)+us(i.cover)+2,h=m("[data-size]");return h.querySelector("span").style.width=Math.min(100,l/qt*100)+"%",h.classList.toggle("is-full",l>qt),m("[data-size-label]").textContent=l+" KB von "+qt+" KB (Text und Bilder)",l}[d,g,_,b,T].forEach(function(l){l.addEventListener("input",function(){r=!0,l===g&&(m("[data-excerpt-count]").textContent=g.value.length+" / 220")})}),u.addEventListener("input",function(){r=!0,ue()});let we=null;function Ie(){let l=window.getSelection();l.rangeCount&&u.contains(l.anchorNode)&&(we=l.getRangeAt(0).cloneRange())}function Ee(){if(u.focus(),!we)return;let l=window.getSelection();l.removeAllRanges(),l.addRange(we)}u.addEventListener("keyup",Ie),u.addEventListener("mouseup",Ie),u.addEventListener("blur",Ie),m("[data-toolbar]").addEventListener("mousedown",function(l){l.target.closest("button")&&l.preventDefault()}),m("[data-toolbar]").addEventListener("click",function(l){let h=l.target.closest("button[data-cmd]");if(!h)return;let p=h.getAttribute("data-cmd"),y=h.getAttribute("data-val");if(Ee(),p==="link"){jt();return}if(p==="image"){m("#inline-image").click();return}p==="formatBlock"?document.execCommand("formatBlock",!1,y):document.execCommand(p,!1,null),r=!0,Ie()});let be=m("[data-linkbar]");function jt(){be.hidden=!1,m("#link-url").value="https://",m("#link-url").focus()}m("[data-link-apply]").addEventListener("click",function(){let l=m("#link-url").value.trim();be.hidden=!0,Ee(),l&&l!=="https://"&&(document.execCommand("createLink",!1,l),r=!0)}),m("[data-link-cancel]").addEventListener("click",function(){be.hidden=!0,Ee()}),m("#inline-image").addEventListener("change",async function(){let l=this.files[0];if(this.value="",!!l)try{let h=await cs(l),p=wa(h);Ee(),document.execCommand("insertHTML",!1,'<p><img src="'+p+'" alt=""></p>'),r=!0,ue()>qt&&U("Der Artikel ist jetzt zu gro\xDF. Bitte ein Bild entfernen oder kleinere Bilder verwenden.","error")}catch(h){U(h.message,"error")}}),u.addEventListener("paste",function(l){let h=l.clipboardData;if(!h)return;l.preventDefault();let p=h.getData("text/html");if(p)document.execCommand("insertHTML",!1,Bt(p));else{let x=h.getData("text/plain").split(/\n{2,}/).map(function(nt){return"<p>"+L(nt).replace(/\n/g,"<br>")+"</p>"});document.execCommand("insertHTML",!1,x.join(""))}r=!0,ue()});let Te=m("[data-cover-drop]");async function Fe(l){try{let h=await cs(l),p=ya(h);i={cover:p.cover,thumb:p.thumb,fit:"cover"},r=!0,ye()}catch(h){U(h.message,"error")}}m("#cover-file").addEventListener("change",function(){this.files[0]&&Fe(this.files[0]),this.value=""}),["dragenter","dragover"].forEach(function(l){Te.addEventListener(l,function(h){h.preventDefault(),Te.classList.add("is-over")})}),["dragleave","drop"].forEach(function(l){Te.addEventListener(l,function(h){h.preventDefault(),Te.classList.remove("is-over")})}),Te.addEventListener("drop",function(l){let h=l.dataTransfer.files[0];h&&Fe(h)}),m("[data-cover-remove]").addEventListener("click",function(){i={cover:"",thumb:"",fit:"cover"},r=!0,ye()});async function nr(l){let h=l,p=2;for(;(await Mt(K(M,Xe,h))).exists();)h=l+"-"+p,p++;return h}async function rr(l){let h=d.value.trim();if(!h){U("Bitte geben Sie einen Titel ein.","error"),d.focus();return}let p=Bt(u.innerHTML);if(!p.replace(/<[^>]+>/g,"").trim()&&p.indexOf("<img")===-1){U("Bitte schreiben Sie zuerst einen Text.","error"),u.focus();return}if(ue()>qt){U("Der Artikel ist zu gro\xDF. Bitte weniger oder kleinere Bilder verwenden.","error");return}let y=et("[data-publish], [data-save-draft], [data-unpublish]");y.forEach(function(x){x.disabled=!0});try{let x=t?t.id:await nr(_a(h)),nt=l==="publish"?"published":"draft",Ea=b.value?new Date(b.value+"T09:00:00").getTime():Date.now(),ls={title:h,category:_.value,excerpt:g.value.trim().slice(0,220),coverThumb:i.thumb||i.cover||"",coverFit:i.fit,tone:t&&t.tone?t.tone:"night",status:nt,publishedAt:Ea,updatedAt:Date.now(),author:T.value.trim()||"Mikel Salloum",readMinutes:ss(p)},sr=Xn(M);sr.set(K(M,Xe,x),ls),sr.set(K(M,Ft,x),{status:nt,html:p,cover:i.cover||i.thumb||""}),await sr.commit(),t=Object.assign({id:x},ls);let ds=e.findIndex(function(or){return or.id===x});ds>=0?e[ds]=t:e.unshift(t),e.sort(function(or,ba){return(ba.updatedAt||0)-(or.updatedAt||0)}),r=!1,ye(),U(nt==="published"?"Ver\xF6ffentlicht. Der Artikel ist jetzt auf der Website sichtbar.":"Als Entwurf gespeichert.","ok")}catch(x){U(Ue(x),"error")}y.forEach(function(x){x.disabled=!1})}m("[data-publish]").addEventListener("click",function(){rr("publish")}),m("[data-save-draft]").addEventListener("click",function(){rr("draft")}),m("[data-unpublish]").addEventListener("click",function(){rr("draft")});function ir(){return window.confirm("Ihre \xC4nderungen sind noch nicht gespeichert. Trotzdem verlassen?")}et("[data-back]").forEach(function(l){l.addEventListener("click",function(){r&&!ir()||(r=!1,c(),tt("list"))})}),window.addEventListener("beforeunload",function(l){r&&(l.preventDefault(),l.returnValue="")});let zt=m("[data-preview]");m("[data-preview-open]").addEventListener("click",function(){let l=Bt(u.innerHTML),h=i.cover||i.thumb;m("[data-preview-body]").innerHTML='<div class="post-meta"><span class="post-cat">'+L(_.value)+"</span><time>"+L(tr(b.value?new Date(b.value+"T09:00:00").getTime():Date.now()))+"</time><span>"+ss(l)+" Min. Lesezeit</span></div><h1>"+L(d.value||"Ohne Titel")+"</h1>"+(g.value?'<p class="post-lead">'+L(g.value)+"</p>":"")+(h?'<div class="post-hero tone-night"><img class="'+(i.fit==="contain"?"fit-contain":"fit-cover")+'" src="'+L(h)+'" alt=""></div>':"")+'<div class="prose">'+l+"</div>",zt.hidden=!1,document.documentElement.style.overflow="hidden"}),et("[data-preview-close]").forEach(function(l){l.addEventListener("click",function(){zt.hidden=!0,document.documentElement.style.overflow=""})}),document.addEventListener("keydown",function(l){l.key==="Escape"&&!zt.hidden&&(zt.hidden=!0,document.documentElement.style.overflow="")})}})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
