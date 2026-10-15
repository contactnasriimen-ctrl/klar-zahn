(()=>{var on=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},vr=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],o=n[t++],c=n[t++],a=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(a>>10)),e[r++]=String.fromCharCode(56320+(a&1023))}else{let s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},an={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],o=i+1<n.length,c=o?n[i+1]:0,a=i+2<n.length,u=a?n[i+2]:0,h=s>>2,g=(s&3)<<4|c>>4,d=(c&15)<<2|u>>6,_=u&63;a||(_=64,o||(d=64)),r.push(t[h],t[g],t[d],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(on(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):vr(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let u=i<n.length?t[n.charAt(i)]:64;++i;let g=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||u==null||g==null)throw new Ge;let d=s<<2|c>>4;if(r.push(d),u!==64){let _=c<<4&240|u>>2;if(r.push(_),g!==64){let v=u<<6&192|g;r.push(v)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Ge=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Er=function(n){let e=on(n);return an.encodeByteArray(e,!0)},ee=function(n){return Er(n).replace(/\./g,"")},Tr=function(n){try{return an.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Ar(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var Ir=()=>Ar().__FIREBASE_DEFAULTS__,Sr=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Rr=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(t){return}let e=n&&Tr(n[1]);return e&&JSON.parse(e)},cn=()=>{try{return Ir()||Sr()||Rr()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Pr=n=>{var e,t;return(t=(e=cn())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},un=n=>{let e=Pr(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ze=()=>{var n;return(n=cn())===null||n===void 0?void 0:n.config};var ve=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function ln(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ee(JSON.stringify(t)),ee(JSON.stringify(o)),""].join(".")}function hn(){try{return typeof indexedDB=="object"}catch(n){return!1}}function dn(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Dr="FirebaseError",O=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Dr,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,te.prototype.create)}},te=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Vr(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new O(i,c,r)}};function Vr(n,e){return n.replace(kr,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var kr=/\{\$([^}]+)}/g;function ne(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],o=e[i];if(sn(s)&&sn(o)){if(!ne(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function sn(n){return n!==null&&typeof n=="object"}var Ps=4*60*60*1e3;function H(n){return n&&n._delegate?n._delegate:n}var C=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var z="[DEFAULT]";var Qe=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new ve;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch(i){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Or(e))try{this.getOrInitializeService({instanceIdentifier:z})}catch(t){}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch(s){}}}}clearInstance(e=z){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=z){return this.instances.has(e)}getOptions(e=z){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,o]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch(s){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:xr(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(i){}return r||null}normalizeInstanceIdentifier(e=z){return this.component?this.component.multipleInstances?e:z:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function xr(n){return n===z?void 0:n}function Or(n){return n.instantiationMode==="EAGER"}var Ee=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Qe(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Cr=[],m;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(m||(m={}));var Nr={debug:m.DEBUG,verbose:m.VERBOSE,info:m.INFO,warn:m.WARN,error:m.ERROR,silent:m.SILENT},Fr=m.INFO,Lr={[m.DEBUG]:"log",[m.VERBOSE]:"log",[m.INFO]:"info",[m.WARN]:"warn",[m.ERROR]:"error"},Br=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=Lr[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},W=class{constructor(e){this.name=e,this._logLevel=Fr,this._logHandler=Br,this._userLogHandler=null,Cr.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in m))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Nr[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,m.DEBUG,...e),this._logHandler(this,m.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,m.VERBOSE,...e),this._logHandler(this,m.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,m.INFO,...e),this._logHandler(this,m.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,m.WARN,...e),this._logHandler(this,m.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,m.ERROR,...e),this._logHandler(this,m.ERROR,...e)}};var Mr=(n,e)=>e.some(t=>n instanceof t),fn,pn;function qr(){return fn||(fn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $r(){return pn||(pn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var mn=new WeakMap,Je=new WeakMap,gn=new WeakMap,Ye=new WeakMap,et=new WeakMap;function zr(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(k(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&mn.set(t,n)}).catch(()=>{}),et.set(e,n),e}function Ur(n){if(Je.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Je.set(n,e)}var Xe={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Je.get(n);if(e==="objectStoreNames")return n.objectStoreNames||gn.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return k(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function _n(n){Xe=n(Xe)}function jr(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Te(this),e,...t);return gn.set(r,e.sort?e.sort():[e]),k(r)}:$r().includes(n)?function(...e){return n.apply(Te(this),e),k(mn.get(this))}:function(...e){return k(n.apply(Te(this),e))}}function Hr(n){return typeof n=="function"?jr(n):(n instanceof IDBTransaction&&Ur(n),Mr(n,qr())?new Proxy(n,Xe):n)}function k(n){if(n instanceof IDBRequest)return zr(n);if(Ye.has(n))return Ye.get(n);let e=Hr(n);return e!==n&&(Ye.set(n,e),et.set(e,n)),e}var Te=n=>et.get(n);function wn(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(n,e),c=k(o);return r&&o.addEventListener("upgradeneeded",a=>{r(k(o.result),a.oldVersion,a.newVersion,k(o.transaction),a)}),t&&o.addEventListener("blocked",a=>t(a.oldVersion,a.newVersion,a)),c.then(a=>{s&&a.addEventListener("close",()=>s()),i&&a.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}var Wr=["get","getKey","getAll","getAllKeys","count"],Kr=["put","add","delete","clear"],tt=new Map;function yn(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(tt.get(e))return tt.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Kr.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Wr.includes(t)))return;let s=async function(o,...c){let a=this.transaction(o,i?"readwrite":"readonly"),u=a.store;return r&&(u=u.index(c.shift())),(await Promise.all([u[t](...c),i&&a.done]))[0]};return tt.set(e,s),s}_n(n=>({...n,get:(e,t,r)=>yn(e,t)||n.get(e,t,r),has:(e,t)=>!!yn(e,t)||n.has(e,t)}));var rt=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Gr(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function Gr(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var it="@firebase/app",bn="0.10.13";var N=new W("@firebase/app"),Zr="@firebase/app-compat",Qr="@firebase/analytics-compat",Yr="@firebase/analytics",Jr="@firebase/app-check-compat",Xr="@firebase/app-check",ei="@firebase/auth",ti="@firebase/auth-compat",ni="@firebase/database",ri="@firebase/data-connect",ii="@firebase/database-compat",si="@firebase/functions",oi="@firebase/functions-compat",ai="@firebase/installations",ci="@firebase/installations-compat",ui="@firebase/messaging",li="@firebase/messaging-compat",hi="@firebase/performance",di="@firebase/performance-compat",fi="@firebase/remote-config",pi="@firebase/remote-config-compat",mi="@firebase/storage",gi="@firebase/storage-compat",_i="@firebase/firestore",yi="@firebase/vertexai-preview",wi="@firebase/firestore-compat",bi="firebase",vi="10.14.1";var st="[DEFAULT]",Ei={[it]:"fire-core",[Zr]:"fire-core-compat",[Yr]:"fire-analytics",[Qr]:"fire-analytics-compat",[Xr]:"fire-app-check",[Jr]:"fire-app-check-compat",[ei]:"fire-auth",[ti]:"fire-auth-compat",[ni]:"fire-rtdb",[ri]:"fire-data-connect",[ii]:"fire-rtdb-compat",[si]:"fire-fn",[oi]:"fire-fn-compat",[ai]:"fire-iid",[ci]:"fire-iid-compat",[ui]:"fire-fcm",[li]:"fire-fcm-compat",[hi]:"fire-perf",[di]:"fire-perf-compat",[fi]:"fire-rc",[pi]:"fire-rc-compat",[mi]:"fire-gcs",[gi]:"fire-gcs-compat",[_i]:"fire-fst",[wi]:"fire-fst-compat",[yi]:"fire-vertex","fire-js":"fire-js",[bi]:"fire-js-all"};var Ae=new Map,Ti=new Map,ot=new Map;function vn(n,e){try{n.container.addComponent(e)}catch(t){N.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function re(n){let e=n.name;if(ot.has(e))return N.debug(`There were multiple attempts to register component ${e}.`),!1;ot.set(e,n);for(let t of Ae.values())vn(t,n);for(let t of Ti.values())vn(t,n);return!0}function In(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}var Ai={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},L=new te("app","Firebase",Ai);var at=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new C("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw L.create("app-deleted",{appName:this._name})}};var Sn=vi;function lt(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:st,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw L.create("bad-app-name",{appName:String(i)});if(t||(t=Ze()),!t)throw L.create("no-options");let s=Ae.get(i);if(s){if(ne(t,s.options)&&ne(r,s.config))return s;throw L.create("duplicate-app",{appName:i})}let o=new Ee(i);for(let a of ot.values())o.addComponent(a);let c=new at(t,r,o);return Ae.set(i,c),c}function Rn(n=st){let e=Ae.get(n);if(!e&&n===st&&Ze())return lt();if(!e)throw L.create("no-app",{appName:n});return e}function B(n,e,t){var r;let i=(r=Ei[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),N.warn(c.join(" "));return}re(new C(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var Ii="firebase-heartbeat-database",Si=1,ie="firebase-heartbeat-store",nt=null;function Pn(){return nt||(nt=wn(Ii,Si,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ie)}catch(t){console.warn(t)}}}}).catch(n=>{throw L.create("idb-open",{originalErrorMessage:n.message})})),nt}async function Ri(n){try{let t=(await Pn()).transaction(ie),r=await t.objectStore(ie).get(Dn(n));return await t.done,r}catch(e){if(e instanceof O)N.warn(e.message);else{let t=L.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});N.warn(t.message)}}}async function En(n,e){try{let r=(await Pn()).transaction(ie,"readwrite");await r.objectStore(ie).put(e,Dn(n)),await r.done}catch(t){if(t instanceof O)N.warn(t.message);else{let r=L.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});N.warn(r.message)}}}function Dn(n){return`${n.name}!${n.options.appId}`}var Pi=1024,Di=30*24*60*60*1e3,ct=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new ut(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Tn();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let c=new Date(o.date).valueOf();return Date.now()-c<=Di}),this._storage.overwrite(this._heartbeatsCache))}catch(r){N.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Tn(),{heartbeatsToSend:r,unsentEntries:i}=Vi(this._heartbeatsCache.heartbeats),s=ee(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return N.warn(t),""}}};function Tn(){return new Date().toISOString().substring(0,10)}function Vi(n,e=Pi){let t=[],r=n.slice();for(let i of n){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),An(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),An(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var ut=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return hn()?dn().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Ri(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return En(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return En(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function An(n){return ee(JSON.stringify({version:2,heartbeats:n})).length}function ki(n){re(new C("platform-logger",e=>new rt(e),"PRIVATE")),re(new C("heartbeat",e=>new ct(e),"PRIVATE")),B(it,bn,n),B(it,bn,"esm2017"),B("fire-js","")}ki("");var xi="firebase",Oi="10.14.1";B(xi,Oi,"app");var T=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};T.UNAUTHENTICATED=new T(null),T.GOOGLE_CREDENTIALS=new T("google-credentials-uid"),T.FIRST_PARTY=new T("first-party-uid"),T.MOCK_USER=new T("mock-user");var X="10.14.0";var Z=new W("@firebase/firestore");function Re(n,...e){if(Z.logLevel<=m.DEBUG){let t=e.map(Wt);Z.debug(`Firestore (${X}): ${n}`,...t)}}function Ht(n,...e){if(Z.logLevel<=m.ERROR){let t=e.map(Wt);Z.error(`Firestore (${X}): ${n}`,...t)}}function Hn(n,...e){if(Z.logLevel<=m.WARN){let t=e.map(Wt);Z.warn(`Firestore (${X}): ${n}`,...t)}}function Wt(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch(e){return n}}function w(n="Unexpected state"){let e=`FIRESTORE (${X}) INTERNAL ASSERTION FAILED: `+n;throw Ht(e),new Error(e)}function R(n,e){n||w()}function He(n,e){return n}var Vn="ok",Ci="cancelled",se="unknown",f="invalid-argument",Ni="deadline-exceeded",Fi="not-found";var Li="permission-denied",dt="unauthenticated",Bi="resource-exhausted",Q="failed-precondition",Mi="aborted",qi="out-of-range",Wn="unimplemented",$i="internal",zi="unavailable";var l=class extends O{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Pe=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},ft=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(T.UNAUTHENTICATED))}shutdown(){}},pt=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},mt=class{constructor(e){this.auth=null,e.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(R(typeof e.accessToken=="string"),new Pe(e.accessToken,new T(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}},gt=class{constructor(e,t,r){this.t=e,this.i=t,this.o=r,this.type="FirstParty",this.user=T.FIRST_PARTY,this.u=new Map}l(){return this.o?this.o():null}get headers(){this.u.set("X-Goog-AuthUser",this.t);let e=this.l();return e&&this.u.set("Authorization",e),this.i&&this.u.set("X-Goog-Iam-Authorization-Token",this.i),this.u}},_t=class{constructor(e,t,r){this.t=e,this.i=t,this.o=r}getToken(){return Promise.resolve(new gt(this.t,this.i,this.o))}start(e,t){e.enqueueRetryable(()=>t(T.FIRST_PARTY))}shutdown(){}invalidateToken(){}},yt=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},wt=class{constructor(e){this.h=e,this.appCheck=null,e.onInit(t=>{this.appCheck=t})}getToken(){return this.appCheck?this.appCheck.getToken().then(e=>e?(R(typeof e.token=="string"),new yt(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}};var bt=class{constructor(e,t,r,i,s,o,c,a,u){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=a,this.useFetchStreams=u}},De=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}},Ve=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&w(),r===void 0?r=e.length-t:r>e.length-t&&w(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},E=class n extends Ve{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new l(f,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},Ui=/^[_a-zA-Z][_a-zA-Z0-9]*$/,M=class n extends Ve{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return Ui.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new l(f,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new l(f,"Path has trailing escape character: "+e);let a=e[i+1];if(a!=="\\"&&a!=="."&&a!=="`")throw new l(f,"Path has invalid escape sequence: "+e);r+=a,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new l(f,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var S=class n{constructor(e){this.path=e}static fromPath(e){return new n(E.fromString(e))}static fromName(e){return new n(E.fromString(e).popFirst(5))}static empty(){return new n(E.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&E.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return E.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new E(e.slice()))}};function Kn(n,e,t){if(!t)throw new l(f,`Function ${n}() cannot be called with an empty ${e}.`)}function kn(n){if(!S.isDocumentKey(n))throw new l(f,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function xn(n){if(S.isDocumentKey(n))throw new l(f,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function We(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":w()}function Kt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new l(f,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=We(n);throw new l(f,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Gn(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Ie=null;function ji(){return Ie===null?Ie=function(){return 268435456+Math.round(2147483648*Math.random())}():Ie++,"0x"+Ie.toString(16)}function Hi(n){return n==null}function ke(n){return n===0&&1/n==-1/0}var Wi={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var On,p;function Cn(n){if(n===void 0)return Ht("RPC_ERROR","HTTP error has no status"),se;switch(n){case 200:return Vn;case 400:return Q;case 401:return dt;case 403:return Li;case 404:return Fi;case 409:return Mi;case 416:return qi;case 429:return Bi;case 499:return Ci;case 500:return se;case 501:return Wn;case 503:return zi;case 504:return Ni;default:return n>=200&&n<300?Vn:n>=400&&n<500?Q:n>=500&&n<600?$i:se}}(p=On||(On={}))[p.OK=0]="OK",p[p.CANCELLED=1]="CANCELLED",p[p.UNKNOWN=2]="UNKNOWN",p[p.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",p[p.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",p[p.NOT_FOUND=5]="NOT_FOUND",p[p.ALREADY_EXISTS=6]="ALREADY_EXISTS",p[p.PERMISSION_DENIED=7]="PERMISSION_DENIED",p[p.UNAUTHENTICATED=16]="UNAUTHENTICATED",p[p.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",p[p.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",p[p.ABORTED=10]="ABORTED",p[p.OUT_OF_RANGE=11]="OUT_OF_RANGE",p[p.UNIMPLEMENTED=12]="UNIMPLEMENTED",p[p.INTERNAL=13]="INTERNAL",p[p.UNAVAILABLE=14]="UNAVAILABLE",p[p.DATA_LOSS=15]="DATA_LOSS";var vt=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.m=r+"://"+t.host,this.A=`projects/${i}/databases/${s}`,this.T=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get R(){return!1}P(t,r,i,s,o){let c=ji(),a=this.V(t,r.toUriEncodedString());Re("RestConnection",`Sending RPC '${t}' ${c}:`,a,i);let u={"google-cloud-resource-prefix":this.A,"x-goog-request-params":this.T};return this.I(u,s,o),this.p(t,a,u,i).then(h=>(Re("RestConnection",`Received RPC '${t}' ${c}: `,h),h),h=>{throw Hn("RestConnection",`RPC '${t}' ${c} failed with error: `,h,"url: ",a,"request:",i),h})}g(t,r,i,s,o,c){return this.P(t,r,i,s,o)}I(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+X}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}V(t,r){let i=Wi[t];return`${this.m}/v1/${r}:${i}`}terminate(){}}{constructor(e,t){super(e),this.F=t}v(e,t){throw new Error("Not supported by FetchConnection")}async p(e,t,r,i){var s;let o=JSON.stringify(i),c;try{c=await this.F(t,{method:"POST",headers:r,body:o})}catch(a){let u=a;throw new l(Cn(u.status),"Request failed with error: "+u.statusText)}if(!c.ok){let a=await c.json();Array.isArray(a)&&(a=a[0]);let u=(s=a==null?void 0:a.error)===null||s===void 0?void 0:s.message;throw new l(Cn(c.status),`Request failed with error: ${u!=null?u:c.statusText}`)}return c.json()}};function Ki(n){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var Et=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=Ki(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function b(n,e){return n<e?-1:n>e?1:0}function Gi(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function Nn(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ke(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}var Tt=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var $=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new Tt("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return b(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};$.EMPTY_BYTE_STRING=new $("");var Zi=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function U(n){if(R(!!n),typeof n=="string"){let e=0,t=Zi.exec(n);if(R(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:y(n.seconds),nanos:y(n.nanos)}}function y(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ue(n){return typeof n=="string"?$.fromBase64String(n):$.fromUint8Array(n)}var D=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new l(f,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new l(f,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new l(f,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new l(f,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?b(this.nanoseconds,e.nanoseconds):b(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};function Zn(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Qn(n){let e=n.mapValue.fields.__previous_value__;return Zn(e)?Qn(e):e}function le(n){let e=U(n.mapValue.fields.__local_write_time__.timestampValue);return new D(e.seconds,e.nanos)}var Se={fields:{__type__:{stringValue:"__max__"}}};function j(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Zn(n)?4:function(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}(n)?9007199254740991:function(t){var r,i;return((i=(((r=t==null?void 0:t.mapValue)===null||r===void 0?void 0:r.fields)||{}).__type__)===null||i===void 0?void 0:i.stringValue)==="__vector__"}(n)?10:11:w()}function xe(n,e){if(n===e)return!0;let t=j(n);if(t!==j(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return le(n).isEqual(le(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=U(i.timestampValue),c=U(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return ue(i.bytesValue).isEqual(ue(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return y(i.geoPointValue.latitude)===y(s.geoPointValue.latitude)&&y(i.geoPointValue.longitude)===y(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return y(i.integerValue)===y(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=y(i.doubleValue),c=y(s.doubleValue);return o===c?ke(o)===ke(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return Gi(n.arrayValue.values||[],e.arrayValue.values||[],xe);case 10:case 11:return function(i,s){let o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Nn(o)!==Nn(c))return!1;for(let a in o)if(o.hasOwnProperty(a)&&(c[a]===void 0||!xe(o[a],c[a])))return!1;return!0}(n,e);default:return w()}}function he(n,e){return(n.values||[]).find(t=>xe(t,e))!==void 0}function Oe(n,e){if(n===e)return 0;let t=j(n),r=j(e);if(t!==r)return b(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return b(n.booleanValue,e.booleanValue);case 2:return function(s,o){let c=y(s.integerValue||s.doubleValue),a=y(o.integerValue||o.doubleValue);return c<a?-1:c>a?1:c===a?0:isNaN(c)?isNaN(a)?0:-1:1}(n,e);case 3:return Fn(n.timestampValue,e.timestampValue);case 4:return Fn(le(n),le(e));case 5:return b(n.stringValue,e.stringValue);case 6:return function(s,o){let c=ue(s),a=ue(o);return c.compareTo(a)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){let c=s.split("/"),a=o.split("/");for(let u=0;u<c.length&&u<a.length;u++){let h=b(c[u],a[u]);if(h!==0)return h}return b(c.length,a.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){let c=b(y(s.latitude),y(o.latitude));return c!==0?c:b(y(s.longitude),y(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ln(n.arrayValue,e.arrayValue);case 10:return function(s,o){var c,a,u,h;let g=s.fields||{},d=o.fields||{},_=(c=g.value)===null||c===void 0?void 0:c.arrayValue,v=(a=d.value)===null||a===void 0?void 0:a.arrayValue,rn=b(((u=_==null?void 0:_.values)===null||u===void 0?void 0:u.length)||0,((h=v==null?void 0:v.values)===null||h===void 0?void 0:h.length)||0);return rn!==0?rn:Ln(_,v)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===Se&&o===Se)return 0;if(s===Se)return 1;if(o===Se)return-1;let c=s.fields||{},a=Object.keys(c),u=o.fields||{},h=Object.keys(u);a.sort(),h.sort();for(let g=0;g<a.length&&g<h.length;++g){let d=b(a[g],h[g]);if(d!==0)return d;let _=Oe(c[a[g]],u[h[g]]);if(_!==0)return _}return b(a.length,h.length)}(n.mapValue,e.mapValue);default:throw w()}}function Fn(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return b(n,e);let t=U(n),r=U(e),i=b(t.seconds,r.seconds);return i!==0?i:b(t.nanos,r.nanos)}function Ln(n,e){let t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){let s=Oe(t[i],r[i]);if(s)return s}return b(t.length,r.length)}function Bn(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Yn(n){return!!n&&"arrayValue"in n}function Mn(n){return!!n&&"nullValue"in n}function qn(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ht(n){return!!n&&"mapValue"in n}function oe(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return Ke(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=oe(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=oe(n.arrayValue.values[t]);return e}return Object.assign({},n)}var Ce=class{constructor(e,t){this.position=e,this.inclusive=t}};var Ne=class{},V=class n extends Ne{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new At(e,t,r):t==="array-contains"?new Rt(e,r):t==="in"?new Pt(e,r):t==="not-in"?new Dt(e,r):t==="array-contains-any"?new Vt(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new It(e,r):new St(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Oe(t,this.value)):t!==null&&j(this.value)===j(t)&&this.matchesComparison(Oe(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return w()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},de=class n extends Ne{constructor(e,t){super(),this.filters=e,this.op=t,this.D=null}static create(e,t){return new n(e,t)}matches(e){return function(r){return r.op==="and"}(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.D!==null||(this.D=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.D}getFilters(){return Object.assign([],this.filters)}};var At=class extends V{constructor(e,t,r){super(e,t,r),this.key=S.fromName(r.referenceValue)}matches(e){let t=S.comparator(e.key,this.key);return this.matchesComparison(t)}},It=class extends V{constructor(e,t){super(e,"in",t),this.keys=Jn("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},St=class extends V{constructor(e,t){super(e,"not-in",t),this.keys=Jn("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Jn(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>S.fromName(r.referenceValue))}var Rt=class extends V{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return Yn(t)&&he(t.arrayValue,this.value)}},Pt=class extends V{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&he(this.value.arrayValue,t)}},Dt=class extends V{constructor(e,t){super(e,"not-in",t)}matches(e){if(he(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!he(this.value.arrayValue,t)}},Vt=class extends V{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!Yn(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>he(this.value.arrayValue,r))}};var fe=class{constructor(e,t="asc"){this.field=e,this.dir=t}};var I=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new D(0,0))}static max(){return new n(new D(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var kt=class n{constructor(e,t){this.comparator=e,this.root=t||x.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,x.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,x.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new G(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new G(this.root,e,this.comparator,!1)}getReverseIterator(){return new G(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new G(this.root,e,this.comparator,!0)}},G=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},x=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:n.EMPTY,this.right=s!=null?s:n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw w();let e=this.left.check();if(e!==this.right.check())throw w();return e+(this.isRed()?0:1)}};x.EMPTY=null,x.RED=!0,x.BLACK=!1;x.EMPTY=new class{constructor(){this.size=0}get key(){throw w()}get value(){throw w()}get color(){throw w()}get left(){throw w()}get right(){throw w()}copy(e,t,r,i,s){return this}insert(e,t,r){return new x(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var xt=class n{constructor(e){this.comparator=e,this.data=new kt(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Fe(this.data.getIterator())}getIteratorFrom(e){return new Fe(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Fe=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var F=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ht(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=oe(t)}setAll(e){let t=M.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){let a=this.getFieldsMap(t);this.applyChanges(a,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=oe(o):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());ht(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return xe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ht(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Ke(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(oe(this.value))}};var pe=class n{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new n(e,0,I.min(),I.min(),I.min(),F.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,I.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,I.min(),I.min(),F.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,I.min(),I.min(),F.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(I.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=F.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=F.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=I.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Ot=class{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.C=null}};function $n(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Ot(n,e,t,r,i,s,o)}var Le=class{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=a,this.S=null,this.N=null,this.O=null,this.startAt,this.endAt}};function Qi(n){return n.collectionGroup!==null}function Yi(n){let e=He(n);if(e.S===null){e.S=[];let t=new Set;for(let s of e.explicitOrderBy)e.S.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new xt(M.comparator);return o.filters.forEach(a=>{a.getFlattenedFilters().forEach(u=>{u.isInequality()&&(c=c.add(u.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.S.push(new fe(s,r))}),t.has(M.keyField().canonicalString())||e.S.push(new fe(M.keyField(),r))}return e.S}function Ji(n){let e=He(n);return e.N||(e.N=Xi(e,Yi(n))),e.N}function Xi(n,e){if(n.limitType==="F")return $n(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new fe(i.field,s)});let t=n.endAt?new Ce(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ce(n.startAt.position,n.startAt.inclusive):null;return $n(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Ct(n,e){let t=n.filters.concat([e]);return new Le(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Xn(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ke(e)?"-0":e}}function es(n,e){return function(r){return typeof r=="number"&&Number.isInteger(r)&&!ke(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}(e)?function(r){return{integerValue:""+r}}(e):Xn(n,e)}var ts={asc:"ASCENDING",desc:"DESCENDING"},ns={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},rs={and:"AND",or:"OR"},Nt=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function zn(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function is(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ae(n){return R(!!n),I.fromTimestamp(function(t){let r=U(t);return new D(r.seconds,r.nanos)}(n))}function Gt(n,e){return Ft(n,e).canonicalString()}function Ft(n,e){let t=function(i){return new E(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function ss(n,e){return Gt(n.databaseId,e.path)}function Lt(n,e){let t=function(i){let s=E.fromString(i);return R(tr(s)),s}(e);if(t.get(1)!==n.databaseId.projectId)throw new l(f,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new l(f,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new S(function(i){return R(i.length>4&&i.get(4)==="documents"),i.popFirst(5)}(t))}function os(n,e){return"found"in e?function(r,i){R(!!i.found),i.found.name,i.found.updateTime;let s=Lt(r,i.found.name),o=ae(i.found.updateTime),c=i.found.createTime?ae(i.found.createTime):I.min(),a=new F({mapValue:{fields:i.found.fields}});return pe.newFoundDocument(s,o,c,a)}(n,e):"missing"in e?function(r,i){R(!!i.missing),R(!!i.readTime);let s=Lt(r,i.missing),o=ae(i.readTime);return pe.newNoDocument(s,o)}(n,e):w()}function as(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=function(u,h){return Gt(u.databaseId,h)}(n,i);let s=function(u){if(u.length!==0)return er(de.create(u,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let o=function(u){if(u.length!==0)return u.map(h=>function(d){return{field:K(d.field),direction:cs(d.dir)}}(h))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let c=function(u,h){return u.useProto3Json||Hi(h)?h:{value:h}}(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{B:t,parent:i}}function cs(n){return ts[n]}function us(n){return ns[n]}function ls(n){return rs[n]}function K(n){return{fieldPath:n.canonicalString()}}function er(n){return n instanceof V?function(t){if(t.op==="=="){if(qn(t.value))return{unaryFilter:{field:K(t.field),op:"IS_NAN"}};if(Mn(t.value))return{unaryFilter:{field:K(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(qn(t.value))return{unaryFilter:{field:K(t.field),op:"IS_NOT_NAN"}};if(Mn(t.value))return{unaryFilter:{field:K(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:K(t.field),op:us(t.op),value:t.value}}}(n):n instanceof de?function(t){let r=t.getFilters().map(i=>er(i));return r.length===1?r[0]:{compositeFilter:{op:ls(t.op),filters:r}}}(n):w()}function tr(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Zt(n){return new Nt(n,!0)}var Bt=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.Y=!1}Z(){if(this.Y)throw new l(Q,"The client has already been terminated.")}P(e,t,r,i){return this.Z(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.P(e,Ft(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===dt&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new l(se,s.toString())})}g(e,t,r,i,s){return this.Z(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.g(e,Ft(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===dt&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new l(se,o.toString())})}terminate(){this.Y=!0,this.connection.terminate()}};async function hs(n,e){let t=He(n),r={documents:e.map(c=>ss(t.serializer,c))},i=await t.g("BatchGetDocuments",t.serializer.databaseId,E.emptyPath(),r,e.length),s=new Map;i.forEach(c=>{let a=os(t.serializer,c);s.set(a.key.toString(),a)});let o=[];return e.forEach(c=>{let a=s.get(c.toString());R(!!a),o.push(a)}),o}async function ds(n,e){let t=He(n),{B:r,parent:i}=as(t.serializer,Ji(e));return(await t.g("RunQuery",t.serializer.databaseId,i,{structuredQuery:r.structuredQuery})).filter(s=>!!s.document).map(s=>function(c,a,u){let h=Lt(c,a.name),g=ae(a.updateTime),d=a.createTime?ae(a.createTime):I.min(),_=new F({mapValue:{fields:a.fields}}),v=pe.newFoundDocument(h,g,d,_);return u&&v.setHasCommittedMutations(),u?v.setHasCommittedMutations():v}(t.serializer,s.document,void 0))}var ce=new Map;function nr(n){if(n._terminated)throw new l(Q,"The client has already been terminated.");if(!ce.has(n)){Re("ComponentProvider","Initializing Datastore");let e=function(s){return new vt(s,fetch.bind(null))}(function(s,o,c,a){return new bt(s,o,c,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,Gn(a.experimentalLongPollingOptions),a.useFetchStreams)}(n._databaseId,n.app.options.appId||"",n._persistenceKey,n._freezeSettings())),t=Zt(n._databaseId),r=function(s,o,c,a){return new Bt(s,o,c,a)}(n._authCredentials,n._appCheckCredentials,e,t);ce.set(n,r)}return ce.get(n)}var Be=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new l(f,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new l(f,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(s,o,c,a){if(o===!0&&a===!0)throw new l(f,`${s} and ${c} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Gn((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new l(f,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new l(f,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new l(f,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Y=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Be({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new l(Q,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new l(Q,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Be(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ft;switch(r.type){case"firstParty":return new _t(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new l(f,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=ce.get(t);r&&(Re("ComponentProvider","Removing Datastore"),ce.delete(t),r.terminate())}(this),Promise.resolve()}};function rr(n,e){let t=typeof n=="object"?n:Rn(),r=typeof n=="string"?n:e||"(default)",i=In(t,"firestore/lite").getImmediate({identifier:r});if(!i._initialized){let s=un("firestore");s&&fs(i,...s)}return i}function fs(n,e,t,r={}){var i;let s=(n=Kt(n,Y))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&Hn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let c,a;if(typeof r.mockUserToken=="string")c=r.mockUserToken,a=T.MOCK_USER;else{c=ln(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let u=r.mockUserToken.sub||r.mockUserToken.user_id;if(!u)throw new l(f,"mockUserToken must contain 'sub' or 'user_id' field!");a=new T(u)}n._authCredentials=new pt(new Pe(c,a))}}var J=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},P=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new q(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},q=class n extends J{constructor(e,t,r){super(e,t,function(s){return new Le(s)}(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new P(this.firestore,null,new S(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function ir(n,e,...t){if(n=H(n),Kn("collection","path",e),n instanceof Y){let r=E.fromString(e,...t);return xn(r),new q(n,null,r)}{if(!(n instanceof P||n instanceof q))throw new l(f,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(E.fromString(e,...t));return xn(r),new q(n.firestore,null,r)}}function Qt(n,e,...t){if(n=H(n),arguments.length===1&&(e=Et.newId()),Kn("doc","path",e),n instanceof Y){let r=E.fromString(e,...t);return kn(r),new P(n,null,new S(r))}{if(!(n instanceof P||n instanceof q))throw new l(f,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(E.fromString(e,...t));return kn(r),new P(n.firestore,n instanceof q?n.converter:null,new S(r))}}var me=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n($.fromBase64String(e))}catch(t){throw new l(f,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n($.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var Me=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new l(f,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new M(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var qe=class{constructor(e){this._methodName=e}};var ge=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new l(f,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new l(f,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return b(this._lat,e._lat)||b(this._long,e._long)}};var _e=class{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}};var ps=/^__.*__$/;function sr(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw w()}}var Mt=class n{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.tt(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get et(){return this.settings.et}rt(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}nt(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.rt({path:r,it:!1});return i.st(e),i}ot(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.rt({path:r,it:!1});return i.tt(),i}ut(e){return this.rt({path:void 0,it:!0})}_t(e){return $t(e,this.settings.methodName,this.settings.ct||!1,this.path,this.settings.lt)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}tt(){if(this.path)for(let e=0;e<this.path.length;e++)this.st(this.path.get(e))}st(e){if(e.length===0)throw this._t("Document fields must not be empty");if(sr(this.et)&&ps.test(e))throw this._t('Document fields cannot begin and end with "__"')}},qt=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Zt(e)}ht(e,t,r,i=!1){return new Mt({et:e,methodName:t,lt:r,path:M.emptyPath(),it:!1,ct:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function ms(n){let e=n._freezeSettings(),t=Zt(n._databaseId);return new qt(n._databaseId,!!e.ignoreUndefinedProperties,t)}function gs(n,e,t,r=!1){return Yt(t,n.ht(r?4:3,e))}function Yt(n,e){if(or(n=H(n)))return ys("Unsupported field value:",e,n),_s(n,e);if(n instanceof qe)return function(r,i){if(!sr(i.et))throw i._t(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i._t(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.it&&e.et!==4)throw e._t("Nested arrays are not supported");return function(r,i){let s=[],o=0;for(let c of r){let a=Yt(c,i.ut(o));a==null&&(a={nullValue:"NULL_VALUE"}),s.push(a),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=H(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return es(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=D.fromDate(r);return{timestampValue:zn(i.serializer,s)}}if(r instanceof D){let s=new D(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:zn(i.serializer,s)}}if(r instanceof ge)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof me)return{bytesValue:is(i.serializer,r._byteString)};if(r instanceof P){let s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i._t(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Gt(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof _e)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(a=>{if(typeof a!="number")throw c._t("VectorValues must only contain numeric values.");return Xn(c.serializer,a)})}}}}}}(r,i);throw i._t(`Unsupported field value: ${We(r)}`)}(n,e)}function _s(n,e){let t={};return function(i){for(let s in i)if(Object.prototype.hasOwnProperty.call(i,s))return!1;return!0}(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ke(n,(r,i)=>{let s=Yt(i,e.nt(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function or(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof D||n instanceof ge||n instanceof me||n instanceof P||n instanceof qe||n instanceof _e)}function ys(n,e,t){if(!or(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=We(t);throw r==="an object"?e._t(n+" a custom object"):e._t(n+" "+r)}}var ws=new RegExp("[~\\*/\\[\\]]");function bs(n,e,t){if(e.search(ws)>=0)throw $t(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Me(...e.split("."))._internalPath}catch(r){throw $t(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function $t(n,e,t,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let a="";return(s||o)&&(a+=" (found",s&&(a+=` in field ${r}`),o&&(a+=` in document ${i}`),a+=")"),new l(f,c+n+a)}var $e=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new P(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new ze(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(ar("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},ze=class extends $e{data(){return super.data()}},zt=class{constructor(e,t){this._docs=t,this.query=e}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(e,t){this._docs.forEach(e,t)}};function ar(n,e){return typeof e=="string"?bs(n,e):e instanceof Me?e._internalPath:e._delegate._internalPath}var ye=class{},Ut=class extends ye{};function cr(n,e,...t){let r=[];e instanceof ye&&r.push(e),r=r.concat(t),function(s){let o=s.filter(a=>a instanceof jt).length,c=s.filter(a=>a instanceof Ue).length;if(o>1||o>0&&c>0)throw new l(f,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var Ue=class n extends Ut{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return lr(e._query,t),new J(e.firestore,e.converter,Ct(e._query,t))}_parse(e){let t=ms(e.firestore);return function(s,o,c,a,u,h,g){let d;if(u.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new l(f,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){jn(g,h);let _=[];for(let v of g)_.push(Un(a,s,v));d={arrayValue:{values:_}}}else d=Un(a,s,g)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||jn(g,h),d=gs(c,o,g,h==="in"||h==="not-in");return V.create(u,h,d)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function ur(n,e,t){let r=e,i=ar("where",n);return Ue._create(i,r,t)}var jt=class n extends ye{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:de.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i,c=s.getFlattenedFilters();for(let a of c)lr(o,a),o=Ct(o,a)}(e._query,t),new J(e.firestore,e.converter,Ct(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};function Un(n,e,t){if(typeof(t=H(t))=="string"){if(t==="")throw new l(f,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Qi(e)&&t.indexOf("/")!==-1)throw new l(f,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(E.fromString(t));if(!S.isDocumentKey(r))throw new l(f,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Bn(n,new S(r))}if(t instanceof P)return Bn(n,t._key);throw new l(f,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${We(t)}.`)}function jn(n,e){if(!Array.isArray(n)||n.length===0)throw new l(f,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function lr(n,e){let t=function(i,s){for(let o of i)for(let c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new l(f,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new l(f,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var je=class extends class{convertValue(t,r="none"){switch(j(t)){case 0:return null;case 1:return t.booleanValue;case 2:return y(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,r);case 5:return t.stringValue;case 6:return this.convertBytes(ue(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,r);case 11:return this.convertObject(t.mapValue,r);case 10:return this.convertVectorValue(t.mapValue);default:throw w()}}convertObject(t,r){return this.convertObjectMap(t.fields,r)}convertObjectMap(t,r="none"){let i={};return Ke(t,(s,o)=>{i[s]=this.convertValue(o,r)}),i}convertVectorValue(t){var r,i,s;let o=(s=(i=(r=t.fields)===null||r===void 0?void 0:r.value.arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(c=>y(c.doubleValue));return new _e(o)}convertGeoPoint(t){return new ge(y(t.latitude),y(t.longitude))}convertArray(t,r){return(t.values||[]).map(i=>this.convertValue(i,r))}convertServerTimestamp(t,r){switch(r){case"previous":let i=Qn(t);return i==null?null:this.convertValue(i,r);case"estimate":return this.convertTimestamp(le(t));default:return null}}convertTimestamp(t){let r=U(t);return new D(r.seconds,r.nanos)}convertDocumentKey(t,r){let i=E.fromString(t);R(tr(i));let s=new De(i.get(1),i.get(3)),o=new S(i.popFirst(5));return s.isEqual(r)||Ht(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${r.projectId}/${r.database}) instead.`),o}}{constructor(e){super(),this.firestore=e}convertBytes(e){return new me(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new P(this.firestore,null,t)}};function Jt(n){let e=nr((n=Kt(n,P)).firestore),t=new je(n.firestore);return hs(e,[n._key]).then(r=>{R(r.length===1);let i=r[0];return new $e(n.firestore,t,n._key,i.isFoundDocument()?i:null,n.converter)})}function hr(n){(function(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new l(Wn,"limitToLast() queries require specifying at least one orderBy() clause")})((n=Kt(n,J))._query);let e=nr(n.firestore),t=new je(n.firestore);return ds(e,n._query).then(r=>{let i=r.map(s=>new ze(n.firestore,t,s.key,s,n.converter));return n._query.limitType==="L"&&i.reverse(),new zt(n,i)})}(function(){(function(t){X=t})(`${Sn}_lite`),re(new C("firestore/lite",(e,{instanceIdentifier:t,options:r})=>{let i=e.getProvider("app").getImmediate(),s=new Y(new mt(e.getProvider("auth-internal")),new wt(e.getProvider("app-check-internal")),function(c,a){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new l(f,'"projectId" not provided in firebase.initializeApp.');return new De(c.options.projectId,a)}(i,t),i);return r&&s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),B("firestore-lite","4.7.3",""),B("firestore-lite","4.7.3","esm2017")})();var we=window.KZ_FIREBASE||{},be=!!we.apiKey&&we.apiKey!=="REPLACE_ME"&&!!we.projectId&&we.projectId!=="REPLACE_ME",vs=be?lt(we):null,Xt=be?rr(vs):null,dr="articles",Es="articleBodies";async function fr(){return(await hr(cr(ir(Xt,dr),ur("status","==","published")))).docs.map(function(e){return Object.assign({id:e.id},e.data())}).sort(function(e,t){return(t.publishedAt||0)-(e.publishedAt||0)})}async function pr(n){try{let e=await Jt(Qt(Xt,dr,n));if(!e.exists())return null;let t=await Jt(Qt(Xt,Es,n));return Object.assign({id:n},e.data(),t.exists()?t.data():{})}catch(e){return null}}var en=[{id:"professionelle-zahnreinigung",title:"Professionelle Zahnreinigung: Was passiert dabei und wie oft ist sie sinnvoll?",category:"Vorsorge",excerpt:"Z\xE4hneputzen allein erreicht nicht alle Stellen. So l\xE4uft eine professionelle Zahnreinigung ab und darum beugt sie Karies und Parodontitis vor.",cover:"assets/img/3d/aesthetic.webp",coverFit:"contain",tone:"mint",publishedAt:Date.UTC(2026,9,1,9),author:"Praxis Klar Zahn",html:"<p>Auch wer gr\xFCndlich putzt, erreicht mit Zahnb\xFCrste und Zahnseide nicht jede Stelle. In den Zahnzwischenr\xE4umen, am Zahnfleischrand und an den hinteren Backenz\xE4hnen bleiben Bel\xE4ge zur\xFCck. Mit der Zeit verh\xE4rten sie zu Zahnstein, an dem sich Bakterien besonders gut festsetzen.</p><h2>So l\xE4uft die Reinigung ab</h2><ul><li>Zuerst sehen wir uns Z\xE4hne und Zahnfleisch genau an.</li><li>Weiche und harte Bel\xE4ge entfernen wir mit feinen Instrumenten und Ultraschall, auch zwischen den Z\xE4hnen.</li><li>Verf\xE4rbungen, zum Beispiel durch Kaffee, Tee oder Rauchen, l\xF6sen wir schonend mit einem Pulverstrahl.</li><li>Danach polieren wir die Zahnoberfl\xE4chen glatt, damit neue Bel\xE4ge schlechter haften.</li><li>Zum Schluss sch\xFCtzt ein Fluoridlack den Zahnschmelz.</li></ul><h2>Wie oft ist eine PZR sinnvoll?</h2><p>F\xFCr die meisten Menschen sind ein bis zwei Termine im Jahr empfehlenswert. Wer zu Zahnfleischentz\xFCndungen neigt, Implantate oder viel Zahnersatz hat, profitiert oft von k\xFCrzeren Abst\xE4nden. Wie oft es bei Ihnen sinnvoll ist, besprechen wir gemeinsam bei der Kontrolluntersuchung.</p><blockquote>Tipp: Fragen Sie bei Ihrer Reinigung nach der passenden Gr\xF6\xDFe f\xFCr Zahnzwischenraumb\xFCrstchen. Damit reinigen Sie die Zwischenr\xE4ume im Alltag besonders gr\xFCndlich.</blockquote>"},{id:"angstfrei-im-daemmerschlaf",title:"Angst vor dem Zahnarzt? So hilft die Behandlung im D\xE4mmerschlaf",category:"Angstfrei",excerpt:"Viele Menschen schieben Zahnarztbesuche aus Angst auf. D\xE4mmerschlaf oder Vollnarkose k\xF6nnen helfen, wieder entspannt zur Behandlung zu kommen.",cover:"assets/img/3d/moon.webp",coverFit:"contain",tone:"night",publishedAt:Date.UTC(2026,8,18,9),author:"Praxis Klar Zahn",html:"<p>Zahnarztangst ist weit verbreitet und nichts, wof\xFCr man sich sch\xE4men muss. Schwierig wird es, wenn Termine immer wieder verschoben werden und kleine Probleme dadurch gr\xF6\xDFer werden. Es gibt Wege, die Behandlung deutlich angenehmer zu machen.</p><h2>Der erste Schritt: dar\xFCber sprechen</h2><p>Sagen Sie uns schon bei der Terminvereinbarung, dass Sie Angst haben. Wir planen dann mehr Zeit ein, erkl\xE4ren jeden Schritt in Ruhe und vereinbaren ein Handzeichen, mit dem Sie jederzeit eine Pause einlegen k\xF6nnen.</p><h2>D\xE4mmerschlaf und Vollnarkose</h2><p>Im D\xE4mmerschlaf sind Sie tief entspannt und nehmen die Behandlung kaum wahr, atmen aber selbstst\xE4ndig. In Vollnarkose schlafen Sie w\xE4hrend der gesamten Behandlung. Welches Verfahren f\xFCr Sie geeignet ist, h\xE4ngt von Ihrer Gesundheit und vom geplanten Eingriff ab.</p><ul><li>Vorher f\xFChren wir ein ausf\xFChrliches Aufkl\xE4rungsgespr\xE4ch mit Ihnen.</li><li>Am Behandlungstag kommen Sie n\xFCchtern und lassen sich abholen.</li><li>F\xFCr den Rest des Tages d\xFCrfen Sie nicht selbst Auto fahren.</li></ul><p>Oft lassen sich mehrere Behandlungen in einer Sitzung zusammenfassen. So sparen Sie Termine und k\xF6nnen sich danach in Ruhe erholen.</p>"},{id:"implantat-oder-bruecke",title:"Implantat oder Br\xFCcke? Die wichtigsten Unterschiede",category:"Zahnersatz",excerpt:"Fehlt ein Zahn, gibt es mehrere Wege, die L\xFCcke zu schlie\xDFen. Ein \xDCberblick \xFCber Implantat und Br\xFCcke und worauf es bei der Entscheidung ankommt.",cover:"assets/img/3d/implant.webp",coverFit:"contain",tone:"night",publishedAt:Date.UTC(2026,8,3,9),author:"Praxis Klar Zahn",html:"<p>Eine Zahnl\xFCcke ist nicht nur eine Frage der Optik. Benachbarte Z\xE4hne k\xF6nnen mit der Zeit in die L\xFCcke kippen, und der Kieferknochen bildet sich an dieser Stelle zur\xFCck. Deshalb lohnt es sich, eine L\xFCcke rechtzeitig zu versorgen.</p><h2>Die Br\xFCcke</h2><p>Bei einer Br\xFCcke werden die Nachbarz\xE4hne beschliffen und tragen den Ersatzzahn wie zwei Pfeiler. Das ist eine bew\xE4hrte L\xF6sung, besonders wenn die Nachbarz\xE4hne ohnehin Kronen oder gro\xDFe F\xFCllungen brauchen.</p><h2>Das Implantat</h2><p>Ein Implantat ist eine k\xFCnstliche Zahnwurzel, meist aus Titan, die in den Kieferknochen eingesetzt wird. Nach der Einheilzeit tr\xE4gt es eine Krone. Die Nachbarz\xE4hne bleiben unber\xFChrt, und der Knochen wird beim Kauen weiter belastet.</p><h2>Was passt zu Ihnen?</h2><ul><li>Wie gesund sind die Nachbarz\xE4hne?</li><li>Ist gen\xFCgend Kieferknochen vorhanden?</li><li>Wie viel Zeit m\xF6chten Sie f\xFCr die Behandlung einplanen?</li><li>Welche Kosten kommen auf Sie zu?</li></ul><p>Diese Fragen kl\xE4ren wir gemeinsam in einem Beratungsgespr\xE4ch. Kronen und Br\xFCcken fertigen wir in unserem eigenen Meisterlabor, so k\xF6nnen wir Form und Farbe direkt mit Ihnen abstimmen.</p>"}];var mr={P:[],H2:[],H3:[],STRONG:[],EM:[],U:[],UL:[],OL:[],LI:[],BLOCKQUOTE:[],A:["href"],IMG:["src","alt"],BR:[],FIGURE:[],FIGCAPTION:[]},gr={DIV:"P",H1:"H2",H4:"H3",H5:"H3",H6:"H3",B:"STRONG",I:"EM"},Ts={SCRIPT:1,STYLE:1,IFRAME:1,OBJECT:1,EMBED:1,FORM:1,INPUT:1,BUTTON:1,META:1,LINK:1,SVG:1,VIDEO:1,AUDIO:1};function _r(n){let e=new DOMParser().parseFromString("<div>"+(n||"")+"</div>","text/html"),t=e.body.firstChild;return function r(i){Array.prototype.slice.call(i.childNodes).forEach(function(s){if(s.nodeType===3)return;if(s.nodeType!==1){s.remove();return}let o=s,c=o.tagName;if(Ts[c]){o.remove();return}if(gr[c]){let a=e.createElement(gr[c]);for(;o.firstChild;)a.appendChild(o.firstChild);o.replaceWith(a),o=a}if(!mr[o.tagName]){for(r(o);o.firstChild;)i.insertBefore(o.firstChild,o);o.remove();return}if(Array.prototype.slice.call(o.attributes).forEach(function(a){mr[o.tagName].indexOf(a.name)===-1&&o.removeAttribute(a.name)}),o.tagName==="A"){let a=o.getAttribute("href")||"";/^(https?:|mailto:|tel:|#|[a-z0-9_-]+\.html)/i.test(a)?/^https?:/i.test(a)&&(o.setAttribute("target","_blank"),o.setAttribute("rel","noopener")):o.removeAttribute("href")}if(o.tagName==="IMG"){let a=o.getAttribute("src")||"";if(!/^(data:image\/(png|jpe?g|webp|gif);base64,|assets\/|https:\/\/)/i.test(a)){o.remove();return}o.setAttribute("loading","lazy"),o.getAttribute("alt")||o.setAttribute("alt","")}r(o)})}(t),Array.prototype.slice.call(t.querySelectorAll("p")).forEach(function(r){!r.textContent.trim()&&!r.querySelector("img")&&r.remove()}),t.innerHTML}function A(n){return String(n==null?"":n).replace(/[&<>"']/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[e]})}function tn(n){if(!n)return"";try{return new Intl.DateTimeFormat("de-DE",{day:"numeric",month:"long",year:"numeric"}).format(new Date(n))}catch(e){return new Date(n).toLocaleDateString()}}function yr(n){let t=String(n||"").replace(/<[^>]+>/g," ").split(/\s+/).filter(Boolean).length;return Math.max(1,Math.round(t/200))}function As(n){return"ratgeber.html?artikel="+encodeURIComponent(n)}function nn(n){let e=n.coverThumb||n.cover||"",t=n.coverFit==="contain"?"fit-contain":"fit-cover";return'<article class="post-card" data-tilt><a class="post-link" href="'+As(n.id)+'"><div class="post-cover tone-'+A(n.tone||"night")+'">'+(e?'<img class="'+t+'" src="'+A(e)+'" alt="" loading="lazy">':"")+'<span class="post-glare" aria-hidden="true"></span></div><div class="post-body"><div class="post-meta"><span class="post-cat">'+A(n.category||"Ratgeber")+"</span><time>"+A(tn(n.publishedAt))+"</time></div><h3>"+A(n.title)+"</h3><p>"+A(n.excerpt||"")+'</p><span class="post-more">Weiterlesen<svg class="ico"><use href="#i-arrow"/></svg></span></div></a></article>'}function wr(n){window.KZ&&window.KZ.bindTilt&&n.querySelectorAll("[data-tilt]").forEach(window.KZ.bindTilt)}async function br(){if(!be)return en.slice();try{return await fr()}catch(n){return console.warn("Ratgeber konnte nicht geladen werden",n),null}}async function Is(n){return be?pr(n):en.filter(function(e){return e.id===n})[0]||null}async function Ss(){let n=document.querySelector("[data-latest-posts]");if(!n)return;let e=await br(),t=n.closest("section");if(!e||!e.length){t&&(t.hidden=!0),document.querySelectorAll('a[href="#ratgeber"]').forEach(function(r){r.setAttribute("href","ratgeber.html")});return}n.innerHTML=e.slice(0,3).map(nn).join(""),n.setAttribute("aria-busy","false"),wr(n)}async function Rs(){let n=document.querySelector("[data-blog]");if(!n)return;let e=n.querySelector("[data-blog-list]"),t=n.querySelector("[data-blog-article]"),r=n.querySelector("[data-blog-grid]"),i=n.querySelector("[data-blog-filters]"),s=n.querySelector("[data-blog-empty]"),c=new URLSearchParams(location.search).get("artikel");if(c){e.hidden=!0,t.hidden=!1;let d=await Is(c);if(!d){t.innerHTML='<div class="post-missing"><h1>Artikel nicht gefunden</h1><p>Dieser Artikel ist nicht (mehr) verf\xFCgbar.</p><a class="btn btn-glow" href="ratgeber.html">Zur \xDCbersicht</a></div>';return}document.title=d.title+" | Ratgeber | Klar Zahn";let _=_r(d.html||""),v=d.cover||d.coverThumb||"";t.innerHTML='<a class="post-back" href="ratgeber.html"><svg class="ico"><use href="#i-arrow"/></svg>Alle Artikel</a><header class="post-head"><div class="post-meta"><span class="post-cat">'+A(d.category||"Ratgeber")+"</span><time>"+A(tn(d.publishedAt))+"</time><span>"+yr(_)+" Min. Lesezeit</span></div><h1>"+A(d.title)+"</h1>"+(d.excerpt?'<p class="post-lead">'+A(d.excerpt)+"</p>":"")+"</header>"+(v?'<div class="post-hero tone-'+A(d.tone||"night")+'"><img class="'+(d.coverFit==="contain"?"fit-contain":"fit-cover")+'" src="'+A(v)+'" alt=""></div>':"")+'<div class="prose">'+_+'</div><aside class="post-cta"><div><strong>Fragen zu diesem Thema?</strong><span>Wir beraten Sie gerne pers\xF6nlich in unserer Praxis.</span></div><a class="btn btn-glow" href="tel:+49610523604"><svg class="ico"><use href="#i-phone"/></svg>06105 / 23604</a></aside><p class="post-author">Ver\xF6ffentlicht von '+A(d.author||"Praxis Klar Zahn")+"</p>";return}let a=await br();if(r.setAttribute("aria-busy","false"),!a||!a.length){r.innerHTML="",s.hidden=!1;return}let u=[];a.forEach(function(d){d.category&&u.indexOf(d.category)===-1&&u.push(d.category)});let h="Alle";function g(){let d=h==="Alle"?a:a.filter(function(_){return _.category===h});r.innerHTML=d.map(nn).join(""),wr(r)}i&&u.length>1&&(i.innerHTML=["Alle"].concat(u).map(function(d){return'<button type="button" class="chip-filter'+(d===h?" is-active":"")+'" data-cat="'+A(d)+'">'+A(d)+"</button>"}).join(""),i.addEventListener("click",function(d){let _=d.target.closest("[data-cat]");_&&(h=_.getAttribute("data-cat"),i.querySelectorAll("[data-cat]").forEach(function(v){v.classList.toggle("is-active",v===_)}),g())})),g()}Ss();Rs();})();
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
*/
