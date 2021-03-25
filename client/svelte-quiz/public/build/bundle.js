var app=function(){"use strict";function e(){}function t(e,t){for(const i in t)e[i]=t[i];return e}function i(e){return e()}function s(){return Object.create(null)}function n(e){e.forEach(i)}function o(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function a(t,...i){if(null==t)return e;const s=t.subscribe(...i);return s.unsubscribe?()=>s.unsubscribe():s}function l(e,t,i){e.$$.on_destroy.push(a(t,i))}function c(e,t,i,s){if(e){const n=d(e,t,i,s);return e[0](n)}}function d(e,i,s,n){return e[1]&&n?t(s.ctx.slice(),e[1](n(i))):s.ctx}function h(e,t,i,s,n,o,r){const a=function(e,t,i,s){if(e[2]&&s){const n=e[2](s(i));if(void 0===t.dirty)return n;if("object"==typeof n){const e=[],i=Math.max(t.dirty.length,n.length);for(let s=0;s<i;s+=1)e[s]=t.dirty[s]|n[s];return e}return t.dirty|n}return t.dirty}(t,s,n,o);if(a){const n=d(t,i,s,r);e.p(n,a)}}function p(e){const t={};for(const i in e)"$"!==i[0]&&(t[i]=e[i]);return t}function u(e,t){const i={};t=new Set(t);for(const s in e)t.has(s)||"$"===s[0]||(i[s]=e[s]);return i}function f(e,t){e.appendChild(t)}function g(e,t,i){e.insertBefore(t,i||null)}function y(e){e.parentNode.removeChild(e)}function v(e){return document.createElement(e)}function b(e){return document.createTextNode(e)}function m(){return b(" ")}function w(){return b("")}function x(e,t,i,s){return e.addEventListener(t,i,s),()=>e.removeEventListener(t,i,s)}function k(e,t,i){null==i?e.removeAttribute(t):e.getAttribute(t)!==i&&e.setAttribute(t,i)}function $(e,t){const i=Object.getOwnPropertyDescriptors(e.__proto__);for(const s in t)null==t[s]?e.removeAttribute(s):"style"===s?e.style.cssText=t[s]:"__value"===s?e.value=e[s]=t[s]:i[s]&&i[s].set?e[s]=t[s]:k(e,s,t[s])}function S(e,t,i){t in e?e[t]=i:k(e,t,i)}function R(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function O(e,t,i,s){e.style.setProperty(t,i,s?"important":"")}let z;function _(e){z=e}function C(){if(!z)throw new Error("Function called outside component initialization");return z}function M(e){C().$$.on_mount.push(e)}function P(){const e=C();return(t,i)=>{const s=e.$$.callbacks[t];if(s){const n=function(e,t){const i=document.createEvent("CustomEvent");return i.initCustomEvent(e,!1,!1,t),i}(t,i);s.slice().forEach((t=>{t.call(e,n)}))}}}function j(e,t){C().$$.context.set(e,t)}function N(e){return C().$$.context.get(e)}const E=[],A=[],D=[],I=[],T=Promise.resolve();let L=!1;function B(e){D.push(e)}let H=!1;const V=new Set;function q(){if(!H){H=!0;do{for(let e=0;e<E.length;e+=1){const t=E[e];_(t),U(t.$$)}for(_(null),E.length=0;A.length;)A.pop()();for(let e=0;e<D.length;e+=1){const t=D[e];V.has(t)||(V.add(t),t())}D.length=0}while(E.length);for(;I.length;)I.pop()();L=!1,H=!1,V.clear()}}function U(e){if(null!==e.fragment){e.update(),n(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(B)}}const F=new Set;let W;function Y(){W={r:0,c:[],p:W}}function J(){W.r||n(W.c),W=W.p}function K(e,t){e&&e.i&&(F.delete(e),e.i(t))}function G(e,t,i,s){if(e&&e.o){if(F.has(e))return;F.add(e),W.c.push((()=>{F.delete(e),s&&(i&&e.d(1),s())})),e.o(t)}}function Q(e,t){const i={},s={},n={$$scope:1};let o=e.length;for(;o--;){const r=e[o],a=t[o];if(a){for(const e in r)e in a||(s[e]=1);for(const e in a)n[e]||(i[e]=a[e],n[e]=1);e[o]=a}else for(const e in r)n[e]=1}for(const e in s)e in i||(i[e]=void 0);return i}function X(e){return"object"==typeof e&&null!==e?e:{}}function Z(e){e&&e.c()}function ee(e,t,s,r){const{fragment:a,on_mount:l,on_destroy:c,after_update:d}=e.$$;a&&a.m(t,s),r||B((()=>{const t=l.map(i).filter(o);c?c.push(...t):n(t),e.$$.on_mount=[]})),d.forEach(B)}function te(e,t){const i=e.$$;null!==i.fragment&&(n(i.on_destroy),i.fragment&&i.fragment.d(t),i.on_destroy=i.fragment=null,i.ctx=[])}function ie(e,t){-1===e.$$.dirty[0]&&(E.push(e),L||(L=!0,T.then(q)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function se(t,i,o,r,a,l,c=[-1]){const d=z;_(t);const h=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:a,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:s(),dirty:c,skip_bound:!1};let p=!1;if(h.ctx=o?o(t,i.props||{},((e,i,...s)=>{const n=s.length?s[0]:i;return h.ctx&&a(h.ctx[e],h.ctx[e]=n)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](n),p&&ie(t,e)),i})):[],h.update(),p=!0,n(h.before_update),h.fragment=!!r&&r(h.ctx),i.target){if(i.hydrate){const e=function(e){return Array.from(e.childNodes)}(i.target);h.fragment&&h.fragment.l(e),e.forEach(y)}else h.fragment&&h.fragment.c();i.intro&&K(t.$$.fragment),ee(t,i.target,i.anchor,i.customElement),q()}_(d)}class ne{$destroy(){te(this,1),this.$destroy=e}$on(e,t){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(t),()=>{const e=i.indexOf(t);-1!==e&&i.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const oe=[];function re(t,i=e){let s;const n=[];function o(e){if(r(t,e)&&(t=e,s)){const e=!oe.length;for(let e=0;e<n.length;e+=1){const i=n[e];i[1](),oe.push(i,t)}if(e){for(let e=0;e<oe.length;e+=2)oe[e][0](oe[e+1]);oe.length=0}}}return{set:o,update:function(e){o(e(t))},subscribe:function(r,a=e){const l=[r,a];return n.push(l),1===n.length&&(s=i(o)||e),r(t),()=>{const e=n.indexOf(l);-1!==e&&n.splice(e,1),0===n.length&&(s(),s=null)}}}}function ae(t,i,s){const r=!Array.isArray(t),l=r?[t]:t,c=i.length<2;return{subscribe:re(s,(t=>{let s=!1;const d=[];let h=0,p=e;const u=()=>{if(h)return;p();const s=i(r?d[0]:d,t);c?t(s):p=o(s)?s:e},f=l.map(((e,t)=>a(e,(e=>{d[t]=e,h&=~(1<<t),s&&u()}),(()=>{h|=1<<t}))));return s=!0,u(),function(){n(f),p()}})).subscribe}}const le={},ce={};function de(e){return{...e.location,state:e.history.state,key:e.history.state&&e.history.state.key||"initial"}}const he=function(e,t){const i=[];let s=de(e);return{get location(){return s},listen(t){i.push(t);const n=()=>{s=de(e),t({location:s,action:"POP"})};return e.addEventListener("popstate",n),()=>{e.removeEventListener("popstate",n);const s=i.indexOf(t);i.splice(s,1)}},navigate(t,{state:n,replace:o=!1}={}){n={...n,key:Date.now()+""};try{o?e.history.replaceState(n,null,t):e.history.pushState(n,null,t)}catch(i){e.location[o?"replace":"assign"](t)}s=de(e),i.forEach((e=>e({location:s,action:"PUSH"})))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(e="/"){let t=0;const i=[{pathname:e,search:""}],s=[];return{get location(){return i[t]},addEventListener(e,t){},removeEventListener(e,t){},history:{get entries(){return i},get index(){return t},get state(){return s[t]},pushState(e,n,o){const[r,a=""]=o.split("?");t++,i.push({pathname:r,search:a}),s.push(e)},replaceState(e,n,o){const[r,a=""]=o.split("?");i[t]={pathname:r,search:a},s[t]=e}}}}()),{navigate:pe}=he,ue=/^:(.+)/;function fe(e,t){return e.substr(0,t.length)===t}function ge(e){return"*"===e[0]}function ye(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function ve(e){return e.replace(/(^\/+|\/+$)/g,"")}function be(e,t){return{route:e,score:e.default?0:ye(e.path).reduce(((e,t)=>(e+=4,!function(e){return""===e}(t)?!function(e){return ue.test(e)}(t)?ge(t)?e-=5:e+=3:e+=2:e+=1,e)),0),index:t}}function me(e,t){let i,s;const[n]=t.split("?"),o=ye(n),r=""===o[0],a=function(e){return e.map(be).sort(((e,t)=>e.score<t.score?1:e.score>t.score?-1:e.index-t.index))}(e);for(let e=0,n=a.length;e<n;e++){const n=a[e].route;let l=!1;if(n.default){s={route:n,params:{},uri:t};continue}const c=ye(n.path),d={},h=Math.max(o.length,c.length);let p=0;for(;p<h;p++){const e=c[p],t=o[p];if(void 0!==e&&ge(e)){d["*"===e?"*":e.slice(1)]=o.slice(p).map(decodeURIComponent).join("/");break}if(void 0===t){l=!0;break}let i=ue.exec(e);if(i&&!r){const e=decodeURIComponent(t);d[i[1]]=e}else if(e!==t){l=!0;break}}if(!l){i={route:n,params:d,uri:"/"+o.slice(0,p).join("/")};break}}return i||s||null}function we(e,t){return e+(t?`?${t}`:"")}function xe(e,t){return`${ve("/"===t?e:`${ve(e)}/${ve(t)}`)}/`}function ke(e){let t;const i=e[9].default,s=c(i,e,e[8],null);return{c(){s&&s.c()},m(e,i){s&&s.m(e,i),t=!0},p(e,[t]){s&&s.p&&256&t&&h(s,i,e,e[8],t,null,null)},i(e){t||(K(s,e),t=!0)},o(e){G(s,e),t=!1},d(e){s&&s.d(e)}}}function $e(e,t,i){let s,n,o,{$$slots:r={},$$scope:a}=t,{basepath:c="/"}=t,{url:d=null}=t;const h=N(le),p=N(ce),u=re([]);l(e,u,(e=>i(7,o=e)));const f=re(null);let g=!1;const y=h||re(d?{pathname:d}:he.location);l(e,y,(e=>i(6,n=e)));const v=p?p.routerBase:re({path:c,uri:c});l(e,v,(e=>i(5,s=e)));const b=ae([v,f],(([e,t])=>{if(null===t)return e;const{path:i}=e,{route:s,uri:n}=t;return{path:s.default?i:s.path.replace(/\*.*$/,""),uri:n}}));return h||(M((()=>he.listen((e=>{y.set(e.location)})))),j(le,y)),j(ce,{activeRoute:f,base:v,routerBase:b,registerRoute:function(e){const{path:t}=s;let{path:i}=e;if(e._path=i,e.path=xe(t,i),"undefined"==typeof window){if(g)return;const t=function(e,t){return me([e],t)}(e,n.pathname);t&&(f.set(t),g=!0)}else u.update((t=>(t.push(e),t)))},unregisterRoute:function(e){u.update((t=>{const i=t.indexOf(e);return t.splice(i,1),t}))}}),e.$$set=e=>{"basepath"in e&&i(3,c=e.basepath),"url"in e&&i(4,d=e.url),"$$scope"in e&&i(8,a=e.$$scope)},e.$$.update=()=>{if(32&e.$$.dirty){const{path:e}=s;u.update((t=>(t.forEach((t=>t.path=xe(e,t._path))),t)))}if(192&e.$$.dirty){const e=me(o,n.pathname);f.set(e)}},[u,y,v,c,d,s,n,o,a,r]}class Se extends ne{constructor(e){super(),se(this,e,$e,ke,r,{basepath:3,url:4})}}const Re=e=>({params:4&e,location:16&e}),Oe=e=>({params:e[2],location:e[4]});function ze(e){let t,i,s,n;const o=[Ce,_e],r=[];function a(e,t){return null!==e[0]?0:1}return t=a(e),i=r[t]=o[t](e),{c(){i.c(),s=w()},m(e,i){r[t].m(e,i),g(e,s,i),n=!0},p(e,n){let l=t;t=a(e),t===l?r[t].p(e,n):(Y(),G(r[l],1,1,(()=>{r[l]=null})),J(),i=r[t],i?i.p(e,n):(i=r[t]=o[t](e),i.c()),K(i,1),i.m(s.parentNode,s))},i(e){n||(K(i),n=!0)},o(e){G(i),n=!1},d(e){r[t].d(e),e&&y(s)}}}function _e(e){let t;const i=e[10].default,s=c(i,e,e[9],Oe);return{c(){s&&s.c()},m(e,i){s&&s.m(e,i),t=!0},p(e,t){s&&s.p&&532&t&&h(s,i,e,e[9],t,Re,Oe)},i(e){t||(K(s,e),t=!0)},o(e){G(s,e),t=!1},d(e){s&&s.d(e)}}}function Ce(e){let i,s,n;const o=[{location:e[4]},e[2],e[3]];var r=e[0];function a(e){let i={};for(let e=0;e<o.length;e+=1)i=t(i,o[e]);return{props:i}}return r&&(i=new r(a())),{c(){i&&Z(i.$$.fragment),s=w()},m(e,t){i&&ee(i,e,t),g(e,s,t),n=!0},p(e,t){const n=28&t?Q(o,[16&t&&{location:e[4]},4&t&&X(e[2]),8&t&&X(e[3])]):{};if(r!==(r=e[0])){if(i){Y();const e=i;G(e.$$.fragment,1,0,(()=>{te(e,1)})),J()}r?(i=new r(a()),Z(i.$$.fragment),K(i.$$.fragment,1),ee(i,s.parentNode,s)):i=null}else r&&i.$set(n)},i(e){n||(i&&K(i.$$.fragment,e),n=!0)},o(e){i&&G(i.$$.fragment,e),n=!1},d(e){e&&y(s),i&&te(i,e)}}}function Me(e){let t,i,s=null!==e[1]&&e[1].route===e[7]&&ze(e);return{c(){s&&s.c(),t=w()},m(e,n){s&&s.m(e,n),g(e,t,n),i=!0},p(e,[i]){null!==e[1]&&e[1].route===e[7]?s?(s.p(e,i),2&i&&K(s,1)):(s=ze(e),s.c(),K(s,1),s.m(t.parentNode,t)):s&&(Y(),G(s,1,1,(()=>{s=null})),J())},i(e){i||(K(s),i=!0)},o(e){G(s),i=!1},d(e){s&&s.d(e),e&&y(t)}}}function Pe(e,i,s){let n,o,{$$slots:r={},$$scope:a}=i,{path:c=""}=i,{component:d=null}=i;const{registerRoute:h,unregisterRoute:u,activeRoute:f}=N(ce);l(e,f,(e=>s(1,n=e)));const g=N(le);l(e,g,(e=>s(4,o=e)));const y={path:c,default:""===c};let v={},b={};var m;return h(y),"undefined"!=typeof window&&(m=()=>{u(y)},C().$$.on_destroy.push(m)),e.$$set=e=>{s(13,i=t(t({},i),p(e))),"path"in e&&s(8,c=e.path),"component"in e&&s(0,d=e.component),"$$scope"in e&&s(9,a=e.$$scope)},e.$$.update=()=>{2&e.$$.dirty&&n&&n.route===y&&s(2,v=n.params);{const{path:e,component:t,...n}=i;s(3,b=n)}},i=p(i),[d,n,v,b,o,f,g,y,c,a,r]}class je extends ne{constructor(e){super(),se(this,e,Pe,Me,r,{path:8,component:0})}}function Ne(e){let i,s,n,o;const r=e[16].default,a=c(r,e,e[15],null);let l=[{href:e[0]},{"aria-current":e[2]},e[1],e[6]],d={};for(let e=0;e<l.length;e+=1)d=t(d,l[e]);return{c(){i=v("a"),a&&a.c(),$(i,d)},m(t,r){g(t,i,r),a&&a.m(i,null),s=!0,n||(o=x(i,"click",e[5]),n=!0)},p(e,[t]){a&&a.p&&32768&t&&h(a,r,e,e[15],t,null,null),$(i,d=Q(l,[(!s||1&t)&&{href:e[0]},(!s||4&t)&&{"aria-current":e[2]},2&t&&e[1],64&t&&e[6]]))},i(e){s||(K(a,e),s=!0)},o(e){G(a,e),s=!1},d(e){e&&y(i),a&&a.d(e),n=!1,o()}}}function Ee(e,i,s){let n;const o=["to","replace","state","getProps"];let r,a,c=u(i,o),{$$slots:d={},$$scope:h}=i,{to:f="#"}=i,{replace:g=!1}=i,{state:y={}}=i,{getProps:v=(()=>({}))}=i;const{base:b}=N(ce);l(e,b,(e=>s(13,r=e)));const m=N(le);l(e,m,(e=>s(14,a=e)));const w=P();let x,k,$,S;return e.$$set=e=>{i=t(t({},i),p(e)),s(6,c=u(i,o)),"to"in e&&s(7,f=e.to),"replace"in e&&s(8,g=e.replace),"state"in e&&s(9,y=e.state),"getProps"in e&&s(10,v=e.getProps),"$$scope"in e&&s(15,h=e.$$scope)},e.$$.update=()=>{8320&e.$$.dirty&&s(0,x="/"===f?r.uri:function(e,t){if(fe(e,"/"))return e;const[i,s]=e.split("?"),[n]=t.split("?"),o=ye(i),r=ye(n);if(""===o[0])return we(n,s);if(!fe(o[0],"."))return we(("/"===n?"":"/")+r.concat(o).join("/"),s);const a=r.concat(o),l=[];return a.forEach((e=>{".."===e?l.pop():"."!==e&&l.push(e)})),we("/"+l.join("/"),s)}(f,r.uri)),16385&e.$$.dirty&&s(11,k=fe(a.pathname,x)),16385&e.$$.dirty&&s(12,$=x===a.pathname),4096&e.$$.dirty&&s(2,n=$?"page":void 0),23553&e.$$.dirty&&s(1,S=v({location:a,href:x,isPartiallyCurrent:k,isCurrent:$}))},[x,S,n,b,m,function(e){if(w("click",e),function(e){return!e.defaultPrevented&&0===e.button&&!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)){e.preventDefault();const t=a.pathname===x||g;pe(x,{state:y,replace:t})}},c,f,g,y,v,k,$,r,a,h,d]}class Ae extends ne{constructor(e){super(),se(this,e,Ee,Ne,r,{to:7,replace:8,state:9,getProps:10})}}function De(e){let t;return{c(){t=v("div"),t.textContent="My apologies, but your name can't be empty...",k(t,"class","error-text svelte-io095k")},m(e,i){g(e,t,i)},d(e){e&&y(t)}}}function Ie(t){let i,s,n,o,r,a,l,c,d,h,p,u,b,w,$=t[1]&&t[2].length<=0&&De();return{c(){i=v("div"),s=v("div"),n=v("div"),n.innerHTML='<wired-card elevation="5" class="wired svelte-io095k"><h1 class="svelte-io095k">Three Wise Monkeys</h1></wired-card>',o=m(),r=v("div"),a=v("div"),l=v("wired-input"),c=m(),d=v("wired-button"),d.textContent="START",h=m(),$&&$.c(),p=m(),u=v("div"),u.innerHTML='<div style="margin-bottom: 4px; width: 100%; text-align: center;">Dear Young Traveler,</div> \n      <div>Please tell me your name before we start the quest...</div>',k(n,"class","container-nowrap-center svelte-io095k"),S(l,"type","text"),S(l,"placeholder","Your Name"),S(l,"class","name svelte-io095k"),S(d,"class","button"),k(a,"class","container-wrap-center svelte-io095k"),k(r,"class","container-wrap-center svelte-io095k"),O(r,"margin-bottom","16px"),k(u,"class","container-wrap-center text svelte-io095k"),k(s,"class","container svelte-io095k"),k(i,"class","page svelte-io095k")},m(e,y){g(e,i,y),f(i,s),f(s,n),f(s,o),f(s,r),f(r,a),f(a,l),t[4](l),f(a,c),f(a,d),f(r,h),$&&$.m(r,null),f(s,p),f(s,u),b||(w=x(d,"click",t[3]),b=!0)},p(e,[t]){e[1]&&e[2].length<=0?$||($=De(),$.c(),$.m(r,null)):$&&($.d(1),$=null)},i:e,o:e,d(e){e&&y(i),t[4](null),$&&$.d(),b=!1,w()}}}function Te(e,t,i){let s,n=!1,o=s?s.value:"";return[s,n,o,()=>{i(1,n=!0),i(2,o=s.value),o.length>0&&(localStorage.setItem("name",o),pe("/quiz"))},function(e){A[e?"unshift":"push"]((()=>{s=e,i(0,s)}))}]}class Le extends ne{constructor(e){super(),se(this,e,Te,Ie,r,{})}}const Be=re(0),He=re([!1,!1,!1]),Ve=["Mizaru 🙈","Kikazaru 🙉","Iwazaru 🙊"],qe=["see","hear","speak"];function Ue(t){let i,s,o,r,a,l,c,d,h,p,u,w,$,O,z,_,C,M,P,j,N,E,A=Ve[t[1]]+"",D=qe[t[1]]+"",I=(t[0].length>0?t[0][t[1]].question:"")+"";return{c(){i=v("div"),s=v("wired-card"),o=v("h1"),o.textContent=`Hi, ${t[2]}`,r=m(),a=v("div"),l=b("My name is "),c=b(A),d=b(" and I don't "),h=b(D),p=b(" no evil. Please assist me in collecting wisdom of the human world by answering the question."),u=m(),w=v("div"),$=v("wired-card"),O=v("h2"),z=b(I),_=m(),C=v("div"),M=v("wired-button"),M.innerHTML='<h2 class="svelte-d1tegk">FALSE</h2>',P=m(),j=v("wired-button"),j.innerHTML='<h2 class="svelte-d1tegk">TRUE</h2>',k(o,"class","svelte-d1tegk"),k(a,"class","text svelte-d1tegk"),S(s,"elevation","5"),S(s,"class","wired svelte-d1tegk"),k(O,"class","svelte-d1tegk"),S($,"elevation","3"),S($,"class","wired svelte-d1tegk"),k(w,"class","container-nowrap-center svelte-d1tegk"),S(M,"class","button svelte-d1tegk"),S(j,"class","button svelte-d1tegk"),k(C,"class","container-nowrap-center svelte-d1tegk")},m(e,n){g(e,i,n),f(i,s),f(s,o),f(s,r),f(s,a),f(a,l),f(a,c),f(a,d),f(a,h),f(a,p),f(i,u),f(i,w),f(w,$),f($,O),f(O,z),f(i,_),f(i,C),f(C,M),f(C,P),f(C,j),N||(E=[x(M,"click",t[4]),x(j,"click",t[5])],N=!0)},p(e,[t]){2&t&&A!==(A=Ve[e[1]]+"")&&R(c,A),2&t&&D!==(D=qe[e[1]]+"")&&R(h,D),3&t&&I!==(I=(e[0].length>0?e[0][e[1]].question:"")+"")&&R(z,I)},i:e,o:e,d(e){e&&y(i),N=!1,n(E)}}}function Fe(e,t,i){let s,n;l(e,Be,(e=>i(1,s=e))),l(e,He,(e=>i(6,n=e)));let{quizes:o}=t;const r=localStorage.getItem("name")||"Young Traveller",a=e=>{if(s>=o.length-1&&pe("/end"),o[s].correct_answer.toLowerCase()===e){let e=[...n];e[s]=!0,He.update((t=>e))}Be.update((e=>e+1))};return e.$$set=e=>{"quizes"in e&&i(0,o=e.quizes)},[o,s,r,a,()=>a("false"),()=>a("true")]}class We extends ne{constructor(e){super(),se(this,e,Fe,Ue,r,{quizes:0})}}function Ye(t){let i;return{c(){i=v("div"),i.textContent="ERROR !",O(i,"text-align","center")},m(e,t){g(e,i,t)},p:e,i:e,o:e,d(e){e&&y(i)}}}function Je(e){let i,s;const n=[e[2]];let o={};for(let e=0;e<n.length;e+=1)o=t(o,n[e]);return i=new We({props:o}),{c(){Z(i.$$.fragment)},m(e,t){ee(i,e,t),s=!0},p(e,t){const s=4&t?Q(n,[X(e[2])]):{};i.$set(s)},i(e){s||(K(i.$$.fragment,e),s=!0)},o(e){G(i.$$.fragment,e),s=!1},d(e){te(i,e)}}}function Ke(t){let i;return{c(){i=v("div"),i.innerHTML='<wired-spinner class="spinner" spinning="true" duration="1000"></wired-spinner> \n        <div>Loading...</div>'},m(e,t){g(e,i,t)},p:e,i:e,o:e,d(e){e&&y(i)}}}function Ge(e){let t,i,s,n,o;const r=[Ke,Je,Ye],a=[];function l(e,t){return e[1]&&e[0].length<=0?0:!e[1]&&e[0].length>0?1:!e[1]&&e[0].length<=0?2:-1}return~(s=l(e))&&(n=a[s]=r[s](e)),{c(){t=v("div"),i=v("div"),n&&n.c(),k(i,"class","container svelte-1qyr70z"),k(t,"class","page svelte-1qyr70z")},m(e,n){g(e,t,n),f(t,i),~s&&a[s].m(i,null),o=!0},p(e,[t]){let o=s;s=l(e),s===o?~s&&a[s].p(e,t):(n&&(Y(),G(a[o],1,1,(()=>{a[o]=null})),J()),~s?(n=a[s],n?n.p(e,t):(n=a[s]=r[s](e),n.c()),K(n,1),n.m(i,null)):n=null)},i(e){o||(K(n),o=!0)},o(e){G(n),o=!1},d(e){e&&y(t),~s&&a[s].d()}}}function Qe(e,t,i){let s=[],n=!1;const o={quizes:s};return M((()=>(i(1,n=!0),void setTimeout((async()=>{const e=await fetch("https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=boolean").then((e=>e.json()));i(0,s=await e.results),i(2,o.quizes=s,o),s.length>0&&i(1,n=!1)}),1e3)))),[s,n,o]}class Xe extends ne{constructor(e){super(),se(this,e,Qe,Ge,r,{})}}function Ze(e,t,i){const s=e.slice();return s[1]=t[i],s}function et(e){let t;return{c(){t=v("div"),t.textContent="❌ "},m(e,i){g(e,t,i)},d(e){e&&y(t)}}}function tt(e){let t;return{c(){t=v("div"),t.textContent="⭕ "},m(e,i){g(e,t,i)},d(e){e&&y(t)}}}function it(e){let t;function i(e,t){return e[1]?tt:et}let s=i(e),n=s(e);return{c(){n.c(),t=w()},m(e,i){n.m(e,i),g(e,t,i)},p(e,o){s!==(s=i(e))&&(n.d(1),n=s(e),n&&(n.c(),n.m(t.parentNode,t)))},d(e){n.d(e),e&&y(t)}}}function st(t){let i,s,n,o,r,a,l,c,d,h=t[0],p=[];for(let e=0;e<h.length;e+=1)p[e]=it(Ze(t,h,e));return{c(){i=v("div"),s=v("div"),n=v("div"),o=v("wired-card"),r=v("div"),r.textContent="🙈 🙉 🙊",a=m(),l=v("div");for(let e=0;e<p.length;e+=1)p[e].c();c=m(),d=v("h1"),d.textContent="Thank You",k(r,"class","container-nowrap-center svelte-k6kqzt"),k(l,"class","container-nowrap-center svelte-k6kqzt"),k(d,"class","svelte-k6kqzt"),S(o,"elevation","5"),S(o,"class","wired"),k(n,"class","container-nowrap-center svelte-k6kqzt"),k(s,"class","container svelte-k6kqzt"),k(i,"class","page svelte-k6kqzt")},m(e,t){g(e,i,t),f(i,s),f(s,n),f(n,o),f(o,r),f(o,a),f(o,l);for(let e=0;e<p.length;e+=1)p[e].m(l,null);f(o,c),f(o,d)},p(e,[t]){if(1&t){let i;for(h=e[0],i=0;i<h.length;i+=1){const s=Ze(e,h,i);p[i]?p[i].p(s,t):(p[i]=it(s),p[i].c(),p[i].m(l,null))}for(;i<p.length;i+=1)p[i].d(1);p.length=h.length}},i:e,o:e,d(e){e&&y(i),function(e,t){for(let i=0;i<e.length;i+=1)e[i]&&e[i].d(t)}(p,e)}}}function nt(e,t,i){let s;return l(e,He,(e=>i(0,s=e))),[s]}class ot extends ne{constructor(e){super(),se(this,e,nt,st,r,{})}}function rt(t){let i;return{c(){i=v("div"),i.innerHTML='<div class="container svelte-k6kqzt"><div class="container-nowrap-center svelte-k6kqzt"><wired-card elevation="5" class="wired"><h1 class="svelte-k6kqzt">ERROR #404</h1> \n        <h1 class="svelte-k6kqzt">Page not found...</h1></wired-card></div></div>',k(i,"class","page svelte-k6kqzt")},m(e,t){g(e,i,t)},p:e,i:e,o:e,d(e){e&&y(i)}}}class at extends ne{constructor(e){super(),se(this,e,null,rt,r,{})}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const lt="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,ct=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},dt=`{{lit-${String(Math.random()).slice(2)}}}`,ht=`\x3c!--${dt}--\x3e`,pt=new RegExp(`${dt}|${ht}`),ut="$lit$";class ft{constructor(e,t){this.parts=[],this.element=t;const i=[],s=[],n=document.createTreeWalker(t.content,133,null,!1);let o=0,r=-1,a=0;const{strings:l,values:{length:c}}=e;for(;a<c;){const e=n.nextNode();if(null!==e){if(r++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)gt(t[e].name,ut)&&s++;for(;s-- >0;){const t=l[a],i=bt.exec(t)[2],s=i.toLowerCase()+ut,n=e.getAttribute(s);e.removeAttribute(s);const o=n.split(pt);this.parts.push({type:"attribute",index:r,name:i,strings:o}),a+=o.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(dt)>=0){const s=e.parentNode,n=t.split(pt),o=n.length-1;for(let t=0;t<o;t++){let i,o=n[t];if(""===o)i=vt();else{const e=bt.exec(o);null!==e&&gt(e[2],ut)&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-ut.length)+e[3]),i=document.createTextNode(o)}s.insertBefore(i,e),this.parts.push({type:"node",index:++r})}""===n[o]?(s.insertBefore(vt(),e),i.push(e)):e.data=n[o],a+=o}}else if(8===e.nodeType)if(e.data===dt){const t=e.parentNode;null!==e.previousSibling&&r!==o||(r++,t.insertBefore(vt(),e)),o=r,this.parts.push({type:"node",index:r}),null===e.nextSibling?e.data="":(i.push(e),r--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(dt,t+1));)this.parts.push({type:"node",index:-1}),a++}}else n.currentNode=s.pop()}for(const e of i)e.parentNode.removeChild(e)}}const gt=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},yt=e=>-1!==e.index,vt=()=>document.createComment(""),bt=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function mt(e,t){const{element:{content:i},parts:s}=e,n=document.createTreeWalker(i,133,null,!1);let o=xt(s),r=s[o],a=-1,l=0;const c=[];let d=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-l,o=xt(s,o),r=s[o]}c.forEach((e=>e.parentNode.removeChild(e)))}const wt=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},xt=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(yt(t))return i}return-1};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const kt=new WeakMap,$t=e=>"function"==typeof e&&kt.has(e),St={},Rt={};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class Ot{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=lt?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let n,o=0,r=0,a=s.nextNode();for(;o<i.length;)if(n=i[o],yt(n)){for(;r<n.index;)r++,"TEMPLATE"===a.nodeName&&(t.push(a),s.currentNode=a.content),null===(a=s.nextNode())&&(s.currentNode=t.pop(),a=s.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return lt&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const zt=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),_t=` ${dt} `;class Ct{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let s=0;s<e;s++){const e=this.strings[s],n=e.lastIndexOf("\x3c!--");i=(n>-1||i)&&-1===e.indexOf("--\x3e",n+1);const o=bt.exec(e);t+=null===o?e+(i?_t:ht):e.substr(0,o.index)+o[1]+o[2]+ut+o[3]+dt}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==zt&&(t=zt.createHTML(t)),e.innerHTML=t,e}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const Mt=e=>null===e||!("object"==typeof e||"function"==typeof e),Pt=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class jt{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new Nt(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!Pt(e))return e}let s="";for(let n=0;n<t;n++){s+=e[n];const t=i[n];if(void 0!==t){const e=t.value;if(Mt(e)||!Pt(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class Nt{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===St||Mt(e)&&e===this.value||(this.value=e,$t(e)||(this.committer.dirty=!0))}commit(){for(;$t(this.value);){const e=this.value;this.value=St,e(this)}this.value!==St&&this.committer.commit()}}class Et{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(vt()),this.endNode=e.appendChild(vt())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=vt()),e.__insert(this.endNode=vt())}insertAfterPart(e){e.__insert(this.startNode=vt()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;$t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=St,e(this)}const e=this.__pendingValue;e!==St&&(Mt(e)?e!==this.value&&this.__commitText(e):e instanceof Ct?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):Pt(e)?this.__commitIterable(e):e===Rt?(this.value=Rt,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof Ot&&this.value.template===t)this.value.update(e.values);else{const i=new Ot(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const n of e)i=t[s],void 0===i&&(i=new Et(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(n),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){ct(this.startNode.parentNode,e.nextSibling,this.endNode)}}class At{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;$t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=St,e(this)}if(this.__pendingValue===St)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=St}}class Dt extends jt{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new It(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class It extends Nt{}let Tt=!1;(()=>{try{const e={get capture(){return Tt=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class Lt{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;$t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=St,e(this)}if(this.__pendingValue===St)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=Bt(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=St}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const Bt=e=>e&&(Tt?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */;function Ht(e){let t=Vt.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},Vt.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(dt);return i=t.keyString.get(s),void 0===i&&(i=new ft(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const Vt=new Map,qt=new WeakMap;
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const Ut=new
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class{handleAttributeExpressions(e,t,i,s){const n=t[0];if("."===n){return new Dt(e,t.slice(1),i).parts}if("@"===n)return[new Lt(e,t.slice(1),s.eventContext)];if("?"===n)return[new At(e,t.slice(1),i)];return new jt(e,t,i).parts}handleTextExpression(e){return new Et(e)}};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const Ft=(e,...t)=>new Ct(e,t,"html",Ut)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */,Wt=(e,t)=>`${e}--${t}`;let Yt=!0;void 0===window.ShadyCSS?Yt=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Yt=!1);const Jt=e=>t=>{const i=Wt(t.type,e);let s=Vt.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},Vt.set(i,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const o=t.strings.join(dt);if(n=s.keyString.get(o),void 0===n){const i=t.getTemplateElement();Yt&&window.ShadyCSS.prepareTemplateDom(i,e),n=new ft(t,i),s.keyString.set(o,n)}return s.stringsArray.set(t.strings,n),n},Kt=["html","svg"],Gt=new Set,Qt=(e,t,i)=>{Gt.add(e);const s=i?i.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,e);const r=document.createElement("style");for(let e=0;e<o;e++){const t=n[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{Kt.forEach((t=>{const i=Vt.get(Wt(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),mt(e,i)}))}))})(e);const a=s.content;i?function(e,t,i=null){const{element:{content:s},parts:n}=e;if(null==i)return void s.appendChild(t);const o=document.createTreeWalker(s,133,null,!1);let r=xt(n),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=wt(t),i.parentNode.insertBefore(t,i));-1!==r&&n[r].index===l;){if(a>0){for(;-1!==r;)n[r].index+=a,r=xt(n,r);return}r=xt(n,r)}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(r,a.firstChild);const e=new Set;e.add(r),mt(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const Xt={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},Zt=(e,t)=>t!==e&&(t==t||e==e),ei={attribute:!0,type:String,converter:Xt,reflect:!1,hasChanged:Zt},ti="finalized";class ii extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=ei){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const n=this[e];this[t]=s,this.requestUpdateInternal(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||ei}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(ti)||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=Zt){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||Xt,n="function"==typeof s?s:s.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||Xt.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=ei){const s=this.constructor,n=s._attributeNameForProperty(e,i);if(void 0!==n){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const n=this.constructor;i=i||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}ii.finalized=!0;
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const si=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),ni=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function oi(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):ni(e,t)}function ri(e,t){return(i,s)=>{const n={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof s?Symbol():`__${s}`;n.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==s?ai(n,i,s):li(n,i)}}const ai=(e,t,i)=>{Object.defineProperty(t,i,e)},li=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e})
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */,ci=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,di=Symbol();class hi{constructor(e,t){if(t!==di)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(ci?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const pi=(e,...t)=>{const i=t.reduce(((t,i,s)=>t+(e=>{if(e instanceof hi)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1]),e[0]);return new hi(i,di)};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ui={};class fi extends ii{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),s=[];i.forEach((e=>s.unshift(e))),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!ci){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new hi(String(t),di)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ci?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ui&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return ui}}fi.finalized=!0,fi.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,n=qt.has(t),o=Yt&&11===t.nodeType&&!!t.host,r=o&&!Gt.has(s),a=r?document.createDocumentFragment():t;if(((e,t,i)=>{let s=qt.get(t);void 0===s&&(ct(t,t.firstChild),qt.set(t,s=new Et(Object.assign({templateFactory:Ht},i))),s.appendInto(t)),s.setValue(e),s.commit()})(e,a,Object.assign({templateFactory:Jt(s)},i)),r){const e=qt.get(a);qt.delete(a);const i=e.value instanceof Ot?e.value.template:void 0;Qt(s,a,i),ct(t,t.firstChild),t.appendChild(a),qt.set(t,e)}!n&&o&&window.ShadyCSS.styleElement(t.host)};var gi=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},yi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const vi=pi`
:host {
  opacity: 0;
}
:host(.wired-rendered) {
  opacity: 1;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
svg {
  display: block;
}
path {
  stroke: currentColor;
  stroke-width: 0.7;
  fill: transparent;
}
.hidden {
  display: none !important;
}
`;class bi extends fi{constructor(){super(...arguments),this.lastSize=[0,0],this.seed=Math.floor(Math.random()*2**31)}updated(e){this.wiredRender()}wiredRender(e=!1){if(this.svg){const t=this.canvasSize();if(!e&&t[0]===this.lastSize[0]&&t[1]===this.lastSize[1])return;for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);this.svg.setAttribute("width",`${t[0]}`),this.svg.setAttribute("height",`${t[1]}`),this.draw(this.svg,t),this.lastSize=t,this.classList.add("wired-rendered")}}}function mi(e,t,i,s=!0,n=!0){if(t){const o={bubbles:"boolean"!=typeof s||s,composed:"boolean"!=typeof n||n};i&&(o.detail=i),e.dispatchEvent(new CustomEvent(t,o))}}function wi(){return Math.floor(Math.random()*2**31)}function xi(e,t,i){if(e&&e.length){const[s,n]=t,o=Math.PI/180*i,r=Math.cos(o),a=Math.sin(o);e.forEach((e=>{const[t,i]=e;e[0]=(t-s)*r-(i-n)*a+s,e[1]=(t-s)*a+(i-n)*r+n}))}}function ki(e){const t=e[0],i=e[1];return Math.sqrt(Math.pow(t[0]-i[0],2)+Math.pow(t[1]-i[1],2))}function $i(e,t,i,s){const n=t[1]-e[1],o=e[0]-t[0],r=n*e[0]+o*e[1],a=s[1]-i[1],l=i[0]-s[0],c=a*i[0]+l*i[1],d=n*l-a*o;return d?[(l*r-o*c)/d,(n*c-a*r)/d]:null}function Si(e,t,i){const s=e.length;if(s<3)return!1;const n=[Number.MAX_SAFE_INTEGER,i],o=[t,i];let r=0;for(let t=0;t<s;t++){const i=e[t],a=e[(t+1)%s];if(zi(i,a,o,n)){if(0===Oi(i,o,a))return Ri(i,o,a);r++}}return r%2==1}function Ri(e,t,i){return t[0]<=Math.max(e[0],i[0])&&t[0]>=Math.min(e[0],i[0])&&t[1]<=Math.max(e[1],i[1])&&t[1]>=Math.min(e[1],i[1])}function Oi(e,t,i){const s=(t[1]-e[1])*(i[0]-t[0])-(t[0]-e[0])*(i[1]-t[1]);return 0===s?0:s>0?1:2}function zi(e,t,i,s){const n=Oi(e,t,i),o=Oi(e,t,s),r=Oi(i,s,e),a=Oi(i,s,t);return n!==o&&r!==a||!(0!==n||!Ri(e,i,t))||!(0!==o||!Ri(e,s,t))||!(0!==r||!Ri(i,e,s))||!(0!==a||!Ri(i,t,s))}function _i(e,t){const i=[0,0],s=Math.round(t.hachureAngle+90);s&&xi(e,i,s);const n=function(e,t){const i=[...e];i[0].join(",")!==i[i.length-1].join(",")&&i.push([i[0][0],i[0][1]]);const s=[];if(i&&i.length>2){let e=t.hachureGap;e<0&&(e=4*t.strokeWidth),e=Math.max(e,.1);const n=[];for(let e=0;e<i.length-1;e++){const t=i[e],s=i[e+1];if(t[1]!==s[1]){const e=Math.min(t[1],s[1]);n.push({ymin:e,ymax:Math.max(t[1],s[1]),x:e===t[1]?t[0]:s[0],islope:(s[0]-t[0])/(s[1]-t[1])})}}if(n.sort(((e,t)=>e.ymin<t.ymin?-1:e.ymin>t.ymin?1:e.x<t.x?-1:e.x>t.x?1:e.ymax===t.ymax?0:(e.ymax-t.ymax)/Math.abs(e.ymax-t.ymax))),!n.length)return s;let o=[],r=n[0].ymin;for(;o.length||n.length;){if(n.length){let e=-1;for(let t=0;t<n.length&&!(n[t].ymin>r);t++)e=t;n.splice(0,e+1).forEach((e=>{o.push({s:r,edge:e})}))}if(o=o.filter((e=>!(e.edge.ymax<=r))),o.sort(((e,t)=>e.edge.x===t.edge.x?0:(e.edge.x-t.edge.x)/Math.abs(e.edge.x-t.edge.x))),o.length>1)for(let e=0;e<o.length;e+=2){const t=e+1;if(t>=o.length)break;const i=o[e].edge,n=o[t].edge;s.push([[Math.round(i.x),r],[Math.round(n.x),r]])}r+=e,o.forEach((t=>{t.edge.x=t.edge.x+e*t.edge.islope}))}}return s}(e,t);return s&&(xi(e,i,-s),function(e,t,i){const s=[];e.forEach((e=>s.push(...e))),xi(s,t,i)}(n,i,-s)),n}gi([ri("svg"),yi("design:type",SVGSVGElement)],bi.prototype,"svg",void 0);class Ci extends class{constructor(e){this.helper=e}fillPolygon(e,t){return this._fillPolygon(e,t)}_fillPolygon(e,t,i=!1){let s=_i(e,t);if(i){const t=this.connectingLines(e,s);s=s.concat(t)}return{type:"fillSketch",ops:this.renderLines(s,t)}}renderLines(e,t){const i=[];for(const s of e)i.push(...this.helper.doubleLineOps(s[0][0],s[0][1],s[1][0],s[1][1],t));return i}connectingLines(e,t){const i=[];if(t.length>1)for(let s=1;s<t.length;s++){const n=t[s-1];if(ki(n)<3)continue;const o=[t[s][0],n[1]];if(ki(o)>3){const t=this.splitOnIntersections(e,o);i.push(...t)}}return i}midPointInPolygon(e,t){return Si(e,(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2)}splitOnIntersections(e,t){const i=Math.max(5,.1*ki(t)),s=[];for(let n=0;n<e.length;n++){const o=e[n],r=e[(n+1)%e.length];if(zi(o,r,...t)){const e=$i(o,r,t[0],t[1]);if(e){const n=ki([e,t[0]]),o=ki([e,t[1]]);n>i&&o>i&&s.push({point:e,distance:n})}}}if(s.length>1){const i=s.sort(((e,t)=>e.distance-t.distance)).map((e=>e.point));if(Si(e,...t[0])||i.shift(),Si(e,...t[1])||i.pop(),i.length<=1)return this.midPointInPolygon(e,t)?[t]:[];const n=[t[0],...i,t[1]],o=[];for(let t=0;t<n.length-1;t+=2){const i=[n[t],n[t+1]];this.midPointInPolygon(e,i)&&o.push(i)}return o}return this.midPointInPolygon(e,t)?[t]:[]}}{fillPolygon(e,t){return this._fillPolygon(e,t,!0)}}class Mi{constructor(e){this.seed=e}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function Pi(e,t,i,s,n){return{type:"path",ops:Ti(e,t,i,s,n)}}function ji(e,t){return function(e,t,i){const s=(e||[]).length;if(s>2){const t=[];for(let n=0;n<s-1;n++)t.push(...Ti(e[n][0],e[n][1],e[n+1][0],e[n+1][1],i));return t.push(...Ti(e[s-1][0],e[s-1][1],e[0][0],e[0][1],i)),{type:"path",ops:t}}return 2===s?Pi(e[0][0],e[0][1],e[1][0],e[1][1],i):{type:"path",ops:[]}}(e,0,t)}function Ni(e,t,i,s,n){return function(e,t,i,s){const[n,o]=Hi(s.increment,e,t,s.rx,s.ry,1,s.increment*Di(.1,Di(.4,1,i),i),i);let r=Bi(n,null,i);if(!i.disableMultiStroke){const[n]=Hi(s.increment,e,t,s.rx,s.ry,1.5,0,i),o=Bi(n,null,i);r=r.concat(o)}return{estimatedPoints:o,opset:{type:"path",ops:r}}}(e,t,n,Ei(i,s,n)).opset}function Ei(e,t,i){const s=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(e/2,2)+Math.pow(t/2,2))/2)),n=Math.max(i.curveStepCount,i.curveStepCount/Math.sqrt(200)*s),o=2*Math.PI/n;let r=Math.abs(e/2),a=Math.abs(t/2);const l=1-i.curveFitting;return r+=Ii(r*l,i),a+=Ii(a*l,i),{increment:o,rx:r,ry:a}}function Ai(e){return e.randomizer||(e.randomizer=new Mi(e.seed||0)),e.randomizer.next()}function Di(e,t,i,s=1){return i.roughness*s*(Ai(i)*(t-e)+e)}function Ii(e,t,i=1){return Di(-e,e,t,i)}function Ti(e,t,i,s,n,o=!1){const r=o?n.disableMultiStrokeFill:n.disableMultiStroke,a=Li(e,t,i,s,n,!0,!1);if(r)return a;const l=Li(e,t,i,s,n,!0,!0);return a.concat(l)}function Li(e,t,i,s,n,o,r){const a=Math.pow(e-i,2)+Math.pow(t-s,2),l=Math.sqrt(a);let c=1;c=l<200?1:l>500?.4:-.0016668*l+1.233334;let d=n.maxRandomnessOffset||0;d*d*100>a&&(d=l/10);const h=d/2,p=.2+.2*Ai(n);let u=n.bowing*n.maxRandomnessOffset*(s-t)/200,f=n.bowing*n.maxRandomnessOffset*(e-i)/200;u=Ii(u,n,c),f=Ii(f,n,c);const g=[],y=()=>Ii(h,n,c),v=()=>Ii(d,n,c);return o&&(r?g.push({op:"move",data:[e+y(),t+y()]}):g.push({op:"move",data:[e+Ii(d,n,c),t+Ii(d,n,c)]})),r?g.push({op:"bcurveTo",data:[u+e+(i-e)*p+y(),f+t+(s-t)*p+y(),u+e+2*(i-e)*p+y(),f+t+2*(s-t)*p+y(),i+y(),s+y()]}):g.push({op:"bcurveTo",data:[u+e+(i-e)*p+v(),f+t+(s-t)*p+v(),u+e+2*(i-e)*p+v(),f+t+2*(s-t)*p+v(),i+v(),s+v()]}),g}function Bi(e,t,i){const s=e.length,n=[];if(s>3){const o=[],r=1-i.curveTightness;n.push({op:"move",data:[e[1][0],e[1][1]]});for(let t=1;t+2<s;t++){const i=e[t];o[0]=[i[0],i[1]],o[1]=[i[0]+(r*e[t+1][0]-r*e[t-1][0])/6,i[1]+(r*e[t+1][1]-r*e[t-1][1])/6],o[2]=[e[t+1][0]+(r*e[t][0]-r*e[t+2][0])/6,e[t+1][1]+(r*e[t][1]-r*e[t+2][1])/6],o[3]=[e[t+1][0],e[t+1][1]],n.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]})}if(t&&2===t.length){const e=i.maxRandomnessOffset;n.push({op:"lineTo",data:[t[0]+Ii(e,i),t[1]+Ii(e,i)]})}}else 3===s?(n.push({op:"move",data:[e[1][0],e[1][1]]}),n.push({op:"bcurveTo",data:[e[1][0],e[1][1],e[2][0],e[2][1],e[2][0],e[2][1]]})):2===s&&n.push(...Ti(e[0][0],e[0][1],e[1][0],e[1][1],i));return n}function Hi(e,t,i,s,n,o,r,a){const l=[],c=[],d=Ii(.5,a)-Math.PI/2;c.push([Ii(o,a)+t+.9*s*Math.cos(d-e),Ii(o,a)+i+.9*n*Math.sin(d-e)]);for(let r=d;r<2*Math.PI+d-.01;r+=e){const e=[Ii(o,a)+t+s*Math.cos(r),Ii(o,a)+i+n*Math.sin(r)];l.push(e),c.push(e)}return c.push([Ii(o,a)+t+s*Math.cos(d+2*Math.PI+.5*r),Ii(o,a)+i+n*Math.sin(d+2*Math.PI+.5*r)]),c.push([Ii(o,a)+t+.98*s*Math.cos(d+r),Ii(o,a)+i+.98*n*Math.sin(d+r)]),c.push([Ii(o,a)+t+.9*s*Math.cos(d+.5*r),Ii(o,a)+i+.9*n*Math.sin(d+.5*r)]),[c,l]}const Vi={randOffset:(e,t)=>e,randOffsetWithRange:(e,t,i)=>(e+t)/2,ellipse:(e,t,i,s,n)=>Ni(e,t,i,s,n),doubleLineOps:(e,t,i,s,n)=>function(e,t,i,s,n){return Ti(e,t,i,s,n,!0)}(e,t,i,s,n)};function qi(e){return{maxRandomnessOffset:2,roughness:1,bowing:.85,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:3.5,hachureAngle:-41,hachureGap:5,dashOffset:-1,dashGap:-1,zigzagOffset:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1,seed:e}}function Ui(e,t){let i="";for(const s of e.ops){const e=s.data;switch(s.op){case"move":if(t&&i)break;i+=`M${e[0]} ${e[1]} `;break;case"bcurveTo":i+=`C${e[0]} ${e[1]}, ${e[2]} ${e[3]}, ${e[4]} ${e[5]} `;break;case"lineTo":i+=`L${e[0]} ${e[1]} `}}return i.trim()}function Fi(e,t){const i=document.createElementNS("http://www.w3.org/2000/svg",e);if(t)for(const e in t)i.setAttributeNS(null,e,t[e]);return i}function Wi(e,t,i=!1){const s=Fi("path",{d:Ui(e,i)});return t&&t.appendChild(s),s}function Yi(e,t,i,s,n,o){return Wi(function(e,t,i,s,n){return ji([[e,t],[e+i,t],[e+i,t+s],[e,t+s]],n)}(t+2,i+2,s-4,n-4,qi(o)),e)}function Ji(e,t,i,s,n,o){return Wi(Pi(t,i,s,n,qi(o)),e)}function Ki(e,t,i,s,n,o){return Wi(Ni(t,i,s=Math.max(s>10?s-4:s-1,1),n=Math.max(n>10?n-4:n-1,1),qi(o)),e)}function Gi(e,t){return Wi(new Ci(Vi).fillPolygon(e,qi(t)),null)}function Qi(e,t,i,s,n){const o=Ei(i,s,qi(n)),r=[];let a=0;for(;a<=2*Math.PI;)r.push([e+o.rx*Math.cos(a),t+o.ry*Math.sin(a)]),a+=o.increment;return Gi(r,n)}var Xi=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Zi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let es=class extends bi{constructor(){super(),this.elevation=1,this.disabled=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender(!0)})))}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
      `]}render(){return Ft`
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `}focus(){this.button?this.button.focus():super.focus()}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}return this.lastSize}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s={width:t[0]-2*(i-1),height:t[1]-2*(i-1)};Yi(e,0,0,s.width,s.height,this.seed);for(let t=1;t<i;t++)Ji(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t,this.seed).style.opacity=""+(75-10*t)/100,Ji(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t,this.seed).style.opacity=""+(75-10*t)/100,Ji(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t,this.seed).style.opacity=""+(75-10*t)/100,Ji(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t,this.seed).style.opacity=""+(75-10*t)/100}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.button&&this.resizeObserver&&this.resizeObserver.observe&&this.resizeObserver.observe(this.button)}detachResizeListener(){this.button&&this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this.button)}};Xi([oi({type:Number}),Zi("design:type",Object)],es.prototype,"elevation",void 0),Xi([oi({type:Boolean,reflect:!0}),Zi("design:type",Object)],es.prototype,"disabled",void 0),Xi([ri("button"),Zi("design:type",HTMLButtonElement)],es.prototype,"button",void 0),es=Xi([si("wired-button"),Zi("design:paramtypes",[])],es);var ts=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},is=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const ss=864e5;let ns=class extends fi{constructor(){super(...arguments),this.elevation=3,this.disabled=!1,this.initials=!1,this.format=e=>this.months_short[e.getMonth()]+" "+e.getDate()+", "+e.getFullYear(),this.weekdays_short=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],this.months=["January","February","March","April","May","June","July","August","September","October","November","December"],this.months_short=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],this.firstOfMonthDate=new Date,this.fDate=void 0,this.lDate=void 0,this.calendarRefSize={width:0,height:0},this.tblColWidth=0,this.tblRowHeight=0,this.tblHeadHeight=0,this.monthYear="",this.weeks=[[]],this.seed=wi()}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.resized.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler,{passive:!0})),this.localizeCalendarHeaders(),this.setInitialConditions(),this.computeCalendar(),this.refreshSelection(),setTimeout((()=>this.updated()))}disconnectedCallback(){super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}static get styles(){return pi`
    :host {
      display: inline-block;
      font-family: inherit;
      position: relative;
      outline: none;
      opacity: 0;
    }

    :host(.wired-disabled) {
      opacity: 0.5 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.02);
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    svg {
      display: block;
    }

    .calendar path {
      stroke: var(--wired-calendar-color, black);
      stroke-width: 0.7;
      fill: transparent;
    }

    .selected path {
      stroke: var(--wired-calendar-selected-color, red);
      stroke-width: 2.5;
      fill: transparent;
      transition: transform 0.05s ease;
    }

    table {
      position: relative;
      background: var(--wired-calendar-bg, white);
      border-collapse: collapse;
      font-size: inherit;
      text-transform: capitalize;
      line-height: unset;
      cursor: default;
      overflow: hidden;
    }

    table:focus {
      outline: none !important;
    }

    td,
    th {
      border-radius: 4px;
      text-align: center;
    }

    td.disabled {
      color: var(--wired-calendar-disabled-color, lightgray);
      cursor: not-allowed;
    }

    td.dimmed {
      color: var(--wired-calendar-dimmed-color, gray);
    }

    td.selected {
      position: absolute;
    }

    td:not(.disabled):not(.selected):hover {
      background-color: #d0d0d0;
      cursor: pointer;
    }

    .pointer {
      cursor: pointer;
    }

    `}render(){return Ft`
    <table style="width:${this.calendarRefSize.width}px;height:${this.calendarRefSize.height}px;border:${8}px solid transparent"
            @mousedown="${this.onItemClick}"
            @touchstart="${this.onItemClick}">
      ${""}
      <tr class="top-header" style="height:${this.tblHeadHeight}px;">
        <th id="prevCal" class="pointer" @click="${this.onPrevClick}">&lt;&lt;</th>
        <th colSpan="5">${this.monthYear}</th>
        <th id="nextCal" class="pointer" @click="${this.onNextClick}">&gt;&gt;</th>
      </tr>
      ${""}
      <tr class="header" style="height:${this.tblHeadHeight}px;">
        ${this.weekdays_short.map((e=>Ft`<th style="width: ${this.tblColWidth};">${this.initials?e[0]:e}</th>
            `))}
      </tr>
      ${""}
      ${this.weeks.map((e=>Ft`<tr style="height:${this.tblRowHeight}px;">
              ${""}
              ${e.map((e=>Ft`${e.selected?Ft`
                            <td class="selected" value="${e.value}">
                            <div style="width: ${this.tblColWidth}px; line-height:${this.tblRowHeight}px;">${e.text}</div>
                            <div class="overlay">
                              <svg id="svgTD" class="selected"></svg>
                            </div></td>
                        `:Ft`
                            <td .className="${e.disabled?"disabled":e.dimmed?"dimmed":""}"
                                value="${e.disabled?"":e.value}">${e.text}</td>
                        `}
                    `))}${""}
            </tr>`))}${""}
    </table>
    <div class="overlay">
      <svg id="svg" class="calendar"></svg>
    </div>
    `}firstUpdated(){this.setAttribute("role","dialog")}updated(e){e&&e instanceof Map&&(e.has("disabled")&&this.refreshDisabledState(),e.has("selected")&&this.refreshSelection());const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=this.getCalendarSize(),s=Math.min(Math.max(1,this.elevation),5),n=i.width+2*(s-1),o=i.height+2*(s-1);t.setAttribute("width",`${n}`),t.setAttribute("height",`${o}`),Yi(t,2,2,i.width-4,i.height-4,this.seed);for(let e=1;e<s;e++)Ji(t,2*e,i.height-4+2*e,i.width-4+2*e,i.height-4+2*e,this.seed).style.opacity=""+(85-10*e)/100,Ji(t,i.width-4+2*e,i.height-4+2*e,i.width-4+2*e,2*e,this.seed).style.opacity=""+(85-10*e)/100,Ji(t,2*e,i.height-4+2*e,i.width-4+2*e,i.height-4+2*e,this.seed).style.opacity=""+(85-10*e)/100,Ji(t,i.width-4+2*e,i.height-4+2*e,i.width-4+2*e,2*e,this.seed).style.opacity=""+(85-10*e)/100;const r=this.shadowRoot.getElementById("svgTD");if(r){for(;r.hasChildNodes();)r.removeChild(r.lastChild);const e=Math.max(1*this.tblColWidth,20),t=Math.max(.9*this.tblRowHeight,18),i=Ki(r,this.tblColWidth/2,this.tblRowHeight/2,e,t,this.seed);r.appendChild(i)}this.classList.add("wired-rendered")}setSelectedDate(e){if(this.selected=e,this.selected){const e=new Date(this.selected);this.firstOfMonthDate=new Date(e.getFullYear(),e.getMonth(),1),this.computeCalendar(),this.requestUpdate(),this.fireSelected()}}localizeCalendarHeaders(){if(!this.locale){const e=navigator;e.hasOwnProperty("systemLanguage")?this.locale=e.systemLanguage:e.hasOwnProperty("browserLanguage")?this.locale=e.browserLanguage:this.locale=(navigator.languages||["en"])[0]}const e=(this.locale||"").toLowerCase();if("en-us"!==e&&"en"!==e){const e=new Date,t=e.getUTCDay(),i=new Date(e.getTime()-ss*t);for(let e=0;e<7;e++){const t=new Date(i);t.setDate(i.getDate()+e),this.weekdays_short[e]=t.toLocaleString(this.locale,{weekday:"short"})}e.setDate(1);for(let t=0;t<12;t++)e.setMonth(t),this.months[t]=e.toLocaleString(this.locale,{month:"long"})}}setInitialConditions(){let e;this.calendarRefSize=this.getCalendarSize(),this.selected?(e=new Date(this.selected),this.value={date:new Date(this.selected),text:this.selected}):e=new Date,this.firstOfMonthDate=new Date(e.getFullYear(),e.getMonth(),1),this.firstdate&&(this.fDate=new Date(this.firstdate)),this.lastdate&&(this.lDate=new Date(this.lastdate))}refreshSelection(){this.weeks.forEach((e=>e.forEach((e=>{e.selected=this.selected&&e.value===this.selected||!1})))),this.requestUpdate()}resized(){this.calendarRefSize=this.getCalendarSize(),this.computeCalendar(),this.refreshSelection()}getCalendarSize(){const e=this.getBoundingClientRect();return{width:e.width>180?e.width:320,height:e.height>180?e.height:320}}computeCellsizes(e,t){this.tblColWidth=e.width/7-2,this.tblHeadHeight=.25*e.height/2-2,this.tblRowHeight=.75*e.height/t-2}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}onItemClick(e){e.stopPropagation();const t=e.target;t&&t.hasAttribute("value")&&""!==t.getAttribute("value")&&(this.selected=t.getAttribute("value")||void 0,this.refreshSelection(),this.fireSelected())}fireSelected(){this.selected&&(this.value={date:new Date(this.selected),text:this.selected},mi(this,"selected",{selected:this.selected}))}computeCalendar(){this.monthYear=this.months[this.firstOfMonthDate.getMonth()]+" "+this.firstOfMonthDate.getFullYear();const e=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth(),1);let t=0-e.getDay();const i=Math.ceil((new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,0).getDate()-t)/7);this.weeks=[];for(let s=0;s<i;s++){this.weeks[s]=[];for(let i=0;i<7;i++){const n=new Date(e.getTime()+ss*t),o=this.format(n);this.weeks[s][i]={value:o,text:n.getDate().toString(),selected:o===this.selected,dimmed:n.getMonth()!==e.getMonth(),disabled:this.isDateOutOfRange(n)},t++}}this.computeCellsizes(this.calendarRefSize,i)}onPrevClick(){void 0!==this.fDate&&new Date(this.fDate.getFullYear(),this.fDate.getMonth()-1,1).getMonth()===new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()-1,1).getMonth()||(this.firstOfMonthDate=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()-1,1),this.computeCalendar(),this.refreshSelection())}onNextClick(){void 0!==this.lDate&&new Date(this.lDate.getFullYear(),this.lDate.getMonth()+1,1).getMonth()===new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,1).getMonth()||(this.firstOfMonthDate=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,1),this.computeCalendar(),this.refreshSelection())}isDateOutOfRange(e){return this.fDate&&this.lDate?e<this.fDate||this.lDate<e:this.fDate?e<this.fDate:!!this.lDate&&this.lDate<e}debounce(e,t,i,s){let n=0;return()=>{const o=arguments,r=i&&!n;clearTimeout(n),n=window.setTimeout((()=>{n=0,i||e.apply(s,o)}),t),r&&e.apply(s,o)}}};ts([oi({type:Number}),is("design:type",Object)],ns.prototype,"elevation",void 0),ts([oi({type:String}),is("design:type",String)],ns.prototype,"selected",void 0),ts([oi({type:String}),is("design:type",String)],ns.prototype,"firstdate",void 0),ts([oi({type:String}),is("design:type",String)],ns.prototype,"lastdate",void 0),ts([oi({type:String}),is("design:type",String)],ns.prototype,"locale",void 0),ts([oi({type:Boolean,reflect:!0}),is("design:type",Object)],ns.prototype,"disabled",void 0),ts([oi({type:Boolean,reflect:!0}),is("design:type",Object)],ns.prototype,"initials",void 0),ts([oi({type:Object}),is("design:type",Object)],ns.prototype,"value",void 0),ts([oi({type:Function}),is("design:type",Function)],ns.prototype,"format",void 0),ns=ts([si("wired-calendar")],ns);var os=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},rs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let as=class extends bi{constructor(){super(),this.elevation=1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender()})))}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
        path.cardFill {
          stroke-width: 3.5;
          stroke: var(--wired-card-background-fill);
        }
        path {
          stroke: var(--wired-card-background-fill, currentColor);
        }
      `]}render(){return Ft`
    <div id="overlay"><svg></svg></div>
    <div style="position: relative;">
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    `}updated(e){const t=e.has("fill");this.wiredRender(t),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s=t[0]-2*(i-1),n=t[1]-2*(i-1);if(this.fill&&this.fill.trim()){const t=Gi([[2,2],[s-4,2],[s-2,n-4],[2,n-4]],this.seed);t.classList.add("cardFill"),e.style.setProperty("--wired-card-background-fill",this.fill.trim()),e.appendChild(t)}Yi(e,2,2,s-4,n-4,this.seed);for(let t=1;t<i;t++)Ji(e,2*t,n-4+2*t,s-4+2*t,n-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ji(e,s-4+2*t,n-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100,Ji(e,2*t,n-4+2*t,s-4+2*t,n-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ji(e,s-4+2*t,n-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100}};os([oi({type:Number}),rs("design:type",Object)],as.prototype,"elevation",void 0),os([oi({type:String}),rs("design:type",String)],as.prototype,"fill",void 0),as=os([si("wired-card"),rs("design:paramtypes",[])],as);var ls=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},cs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ds=class extends bi{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[vi,pi`
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-checkbox-icon-color, currentColor);
        stroke-width: var(--wired-checkbox-default-swidth, 0.7);
      }
      g path {
        stroke-width: 2.5;
      }
      #container.focused {
        --wired-checkbox-default-swidth: 1.5;
      }
      `]}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshCheckVisibility()}render(){return Ft`
    <label id="container" class="${this.focused?"focused":""}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${()=>this.focused=!0}"
        @blur="${()=>this.focused=!1}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),mi(this,"change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){Yi(e,0,0,t[0],t[1],this.seed),this.svgCheck=Fi("g"),e.appendChild(this.svgCheck),Ji(this.svgCheck,.3*t[0],.4*t[1],.5*t[0],.7*t[1],this.seed),Ji(this.svgCheck,.5*t[0],.7*t[1],t[0]+5,-5,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}};ls([oi({type:Boolean}),cs("design:type",Object)],ds.prototype,"checked",void 0),ls([oi({type:Boolean,reflect:!0}),cs("design:type",Object)],ds.prototype,"disabled",void 0),ls([oi(),cs("design:type",Object)],ds.prototype,"focused",void 0),ls([ri("input"),cs("design:type",HTMLInputElement)],ds.prototype,"input",void 0),ds=ls([si("wired-checkbox")],ds);var hs=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},ps=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let us=class extends fi{constructor(){super(...arguments),this.disabled=!1,this.seed=wi(),this.cardShowing=!1,this.itemNodes=[]}static get styles(){return pi`
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        outline: none;
        opacity: 0;
      }
    
      :host(.wired-disabled) {
        opacity: 0.5 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.02);
      }
      
      :host(.wired-rendered) {
        opacity: 1;
      }
  
      :host(:focus) path {
        stroke-width: 1.5;
      }
    
      #container {
        white-space: nowrap;
        position: relative;
      }
    
      .inline {
        display: inline-block;
        vertical-align: top
      }
    
      #textPanel {
        min-width: 90px;
        min-height: 18px;
        padding: 8px;
      }
    
      #dropPanel {
        width: 34px;
        cursor: pointer;
      }
    
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    
      svg {
        display: block;
      }
    
      path {
        stroke: currentColor;
        stroke-width: 0.7;
        fill: transparent;
      }
    
      #card {
        display: block;
        position: absolute;
        background: var(--wired-combo-popup-bg, white);
        z-index: 1;
        box-shadow: 1px 5px 15px -6px rgba(0, 0, 0, 0.8);
        padding: 8px;
      }
  
      ::slotted(wired-item) {
        display: block;
      }
    `}render(){return Ft`
    <div id="container" @click="${this.onCombo}">
      <div id="textPanel" class="inline">
        <span>${this.value&&this.value.text}</span>
      </div>
      <div id="dropPanel" class="inline"></div>
      <div class="overlay">
        <svg></svg>
      </div>
    </div>
    <wired-card id="card" tabindex="-1" role="listbox" @mousedown="${this.onItemClick}" @touchstart="${this.onItemClick}" style="display: none;">
      <slot id="slot"></slot>
    </wired-card>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",(()=>{this.cardShowing&&this.setCardShowing(!1)})),this.addEventListener("keydown",(e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext();break;case 27:e.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:e.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:e.preventDefault(),this.cardShowing||this.setCardShowing(!0)}}))}updated(e){e.has("disabled")&&this.refreshDisabledState();const t=this.svg;for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=this.shadowRoot.getElementById("container").getBoundingClientRect();t.setAttribute("width",`${i.width}`),t.setAttribute("height",`${i.height}`);const s=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=s.height+"px",Yi(t,0,0,s.width,s.height,this.seed);const n=s.width-4;Yi(t,n,0,34,s.height,this.seed);const o=Math.max(0,Math.abs((s.height-24)/2)),r=function(e,t,i){return Wi(ji(t,qi(i)),e,!0)}(t,[[n+8,5+o],[n+26,5+o],[n+17,o+Math.min(s.height,18)]],this.seed);if(r.style.fill="currentColor",r.style.pointerEvents=this.disabled?"none":"auto",r.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",`${this.cardShowing}`),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||s.getAttribute("value")||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}setCardShowing(e){this.card&&(this.cardShowing=e,this.card.style.display=e?"":"none",e&&setTimeout((()=>{this.shadowRoot.getElementById("slot").assignedNodes().filter((e=>e.nodeType===Node.ELEMENT_NODE)).forEach((e=>{const t=e;t.requestUpdate&&t.requestUpdate()}))}),10),this.setAttribute("aria-expanded",`${this.cardShowing}`))}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected(),setTimeout((()=>{this.setCardShowing(!1)}))}fireSelected(){mi(this,"selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(e){e.stopPropagation(),this.setCardShowing(!this.cardShowing)}};hs([oi({type:Object}),ps("design:type",Object)],us.prototype,"value",void 0),hs([oi({type:String,reflect:!0}),ps("design:type",String)],us.prototype,"selected",void 0),hs([oi({type:Boolean,reflect:!0}),ps("design:type",Object)],us.prototype,"disabled",void 0),hs([ri("svg"),ps("design:type",SVGSVGElement)],us.prototype,"svg",void 0),hs([ri("#card"),ps("design:type",HTMLDivElement)],us.prototype,"card",void 0),us=hs([si("wired-combo")],us);var fs=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},gs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ys=class extends fi{constructor(){super(...arguments),this.elevation=5,this.open=!1}static get styles(){return pi`
      #container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: var(--wired-dialog-z-index, 100);
      }
      #container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      #overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transform: translateY(150px);
        transition: transform 0.5s ease, opacity 0.5s ease;
      }
      .layout.vertical {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      }
      .flex {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      }
      wired-card {
        display: inline-block;
        background: white;
        text-align: left;
      }

      :host([open]) #container {
        pointer-events: auto;
      }
      :host([open]) #container::before {
        opacity: 1;
      }
      :host([open]) #overlay {
        opacity: 1;
        transform: none;
      }
    `}render(){return Ft`
    <div id="container">
      <div id="overlay" class="vertical layout">
        <div class="flex"></div>
        <div style="text-align: center; padding: 5px;">
          <wired-card .elevation="${this.elevation}"><slot></slot></wired-card>
        </div>
        <div class="flex"></div>
      </div>
    </div>
    `}updated(){this.card&&this.card.wiredRender(!0)}};fs([oi({type:Number}),gs("design:type",Object)],ys.prototype,"elevation",void 0),fs([oi({type:Boolean,reflect:!0}),gs("design:type",Object)],ys.prototype,"open",void 0),fs([ri("wired-card"),gs("design:type",as)],ys.prototype,"card",void 0),ys=fs([si("wired-dialog")],ys);var vs=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},bs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ms=class extends bi{constructor(){super(...arguments),this.elevation=1}static get styles(){return[vi,pi`
        :host {
          display: block;
          position: relative;
        }
      `]}render(){return Ft`<svg></svg>`}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width,6*t]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5);for(let s=0;s<i;s++)Ji(e,0,6*s+3,t[0],6*s+3,this.seed)}};vs([oi({type:Number}),bs("design:type",Object)],ms.prototype,"elevation",void 0),ms=vs([si("wired-divider")],ms);var ws=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},xs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ks=class extends bi{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          font-size: 14px;
          color: #fff;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 16px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
          transition: transform 0.2s ease, opacity 0.2s ease;
          opacity: 0.85;
        }
        path {
          stroke: var(--wired-fab-bg-color, #018786);
          stroke-width: 3;
          fill: transparent;
        }

        button:focus ::slotted(*) {
          opacity: 1;
        }
        button:active ::slotted(*) {
          opacity: 1;
          transform: scale(1.15);
        }
      `]}render(){return Ft`
    <button ?disabled="${this.disabled}">
      <div id="overlay">
        <svg></svg>
      </div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </button>
    `}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){const i=Math.min(t[0],t[1]),s=Qi(i/2,i/2,i,i,this.seed);e.appendChild(s)}};ws([oi({type:Boolean,reflect:!0}),xs("design:type",Object)],ks.prototype,"disabled",void 0),ws([ri("button"),xs("design:type",HTMLButtonElement)],ks.prototype,"button",void 0),ks=ws([si("wired-fab")],ks);var $s=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Ss=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Rs=class extends bi{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
        }
      `]}render(){return Ft`
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){const i=Math.min(t[0],t[1]);e.setAttribute("width",`${i}`),e.setAttribute("height",`${i}`),Ki(e,i/2,i/2,i,i,this.seed)}};$s([oi({type:Boolean,reflect:!0}),Ss("design:type",Object)],Rs.prototype,"disabled",void 0),$s([ri("button"),Ss("design:type",HTMLButtonElement)],Rs.prototype,"button",void 0),Rs=$s([si("wired-icon-button")],Rs);var Os=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},zs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let _s=class extends bi{constructor(){super(),this.elevation=1,this.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender()})))}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px;
        }
        img {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
      `]}render(){return Ft`
    <img src="${this.src}">
    <div id="overlay"><svg></svg></div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s=t[0]-2*(i-1),n=t[1]-2*(i-1);Yi(e,2,2,s-4,n-4,this.seed);for(let t=1;t<i;t++)Ji(e,2*t,n-4+2*t,s-4+2*t,n-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ji(e,s-4+2*t,n-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100,Ji(e,2*t,n-4+2*t,s-4+2*t,n-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ji(e,s-4+2*t,n-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100}};Os([oi({type:Number}),zs("design:type",Object)],_s.prototype,"elevation",void 0),Os([oi({type:String}),zs("design:type",String)],_s.prototype,"src",void 0),_s=Os([si("wired-image"),zs("design:paramtypes",[])],_s);var Cs=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Ms=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ps=class extends bi{constructor(){super(),this.disabled=!1,this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.required=!1,this.autofocus=!1,this.readonly=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender(!0)})))}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          position: relative;
          padding: 5px;
          font-family: sans-serif;
          width: 150px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        input:focus + div path {
          stroke-width: 1.5;
        }
      `]}render(){return Ft`
    <input name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
      maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
      size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    `}get input(){return this.textInput}get value(){const e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.input;if(t)return void(t.value=e)}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Yi(e,2,2,t[0]-2,t[1]-2,this.seed)}refire(e){e.stopPropagation(),mi(this,e.type,{sourceEvent:e})}focus(){this.textInput?this.textInput.focus():super.focus()}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.textInput&&this.resizeObserver&&this.resizeObserver.observe&&this.resizeObserver.observe(this.textInput)}detachResizeListener(){this.textInput&&this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this.textInput)}};Cs([oi({type:Boolean,reflect:!0}),Ms("design:type",Object)],Ps.prototype,"disabled",void 0),Cs([oi({type:String}),Ms("design:type",Object)],Ps.prototype,"placeholder",void 0),Cs([oi({type:String}),Ms("design:type",String)],Ps.prototype,"name",void 0),Cs([oi({type:String}),Ms("design:type",String)],Ps.prototype,"min",void 0),Cs([oi({type:String}),Ms("design:type",String)],Ps.prototype,"max",void 0),Cs([oi({type:String}),Ms("design:type",String)],Ps.prototype,"step",void 0),Cs([oi({type:String}),Ms("design:type",Object)],Ps.prototype,"type",void 0),Cs([oi({type:String}),Ms("design:type",Object)],Ps.prototype,"autocomplete",void 0),Cs([oi({type:String}),Ms("design:type",Object)],Ps.prototype,"autocapitalize",void 0),Cs([oi({type:String}),Ms("design:type",Object)],Ps.prototype,"autocorrect",void 0),Cs([oi({type:Boolean}),Ms("design:type",Object)],Ps.prototype,"required",void 0),Cs([oi({type:Boolean}),Ms("design:type",Object)],Ps.prototype,"autofocus",void 0),Cs([oi({type:Boolean}),Ms("design:type",Object)],Ps.prototype,"readonly",void 0),Cs([oi({type:Number}),Ms("design:type",Number)],Ps.prototype,"minlength",void 0),Cs([oi({type:Number}),Ms("design:type",Number)],Ps.prototype,"maxlength",void 0),Cs([oi({type:Number}),Ms("design:type",Number)],Ps.prototype,"size",void 0),Cs([ri("input"),Ms("design:type",HTMLInputElement)],Ps.prototype,"textInput",void 0),Ps=Cs([si("wired-input"),Ms("design:paramtypes",[])],Ps);var js=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Ns=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Es=class extends bi{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}static get styles(){return[vi,pi`
      :host {
        display: inline-block;
        font-size: 14px;
        text-align: left;
      }
      button {
        cursor: pointer;
        outline: none;
        overflow: hidden;
        color: inherit;
        user-select: none;
        position: relative;
        font-family: inherit;
        text-align: inherit;
        font-size: inherit;
        letter-spacing: 1.25px;
        padding: 1px 10px;
        min-height: 36px;
        text-transform: inherit;
        background: none;
        border: none;
        transition: background-color 0.3s ease, color 0.3s ease;
        width: 100%;
        box-sizing: border-box;
        white-space: nowrap;
      }
      button.selected {
        color: var(--wired-item-selected-color, #fff);
      }
      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        opacity: 0;
      }
      button span {
        display: inline-block;
        transition: transform 0.2s ease;
        position: relative;
      }
      button:active span {
        transform: scale(1.02);
      }
      #overlay {
        display: none;
      }
      button.selected #overlay {
        display: block;
      }
      svg path {
        stroke: var(--wired-item-selected-bg, #000);
        stroke-width: 2.75;
        fill: transparent;
        transition: transform 0.05s ease;
      }
      @media (hover: hover) {
        button:hover::before {
          opacity: 0.05;
        }
      }
      `]}render(){return Ft`
    <button class="${this.selected?"selected":""}">
      <div id="overlay"><svg></svg></div>
      <span><slot></slot></span>
    </button>`}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){const i=Gi([[0,0],[t[0],0],[t[0],t[1]],[0,t[1]]],this.seed);e.appendChild(i)}};js([oi(),Ns("design:type",Object)],Es.prototype,"value",void 0),js([oi(),Ns("design:type",Object)],Es.prototype,"name",void 0),js([oi({type:Boolean}),Ns("design:type",Object)],Es.prototype,"selected",void 0),Es=js([si("wired-item")],Es);var As=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Ds=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Is=class extends bi{constructor(){super(...arguments),this.elevation=1}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          position: relative;
        }
        a, a:hover, a:visited {
          color: inherit;
          outline: none;
          display: inline-block;
          white-space: nowrap;
          text-decoration: none;
          border: none;
        }
        path {
          stroke: var(--wired-link-decoration-color, blue);
          stroke-opacity: 0.45;
        }
        a:focus path {
          stroke-opacity: 1;
        }
      `]}render(){return Ft`
    <a href="${this.href}" target="${this.target||""}">
      <slot></slot>
      <div id="overlay"><svg></svg></div>
    </a>
    `}focus(){this.anchor?this.anchor.focus():super.focus()}canvasSize(){if(this.anchor){const e=this.anchor.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width,e.height+2*(t-1)]}return this.lastSize}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s={width:t[0],height:t[1]-2*(i-1)};for(let t=0;t<i;t++)Ji(e,0,s.height+2*t-2,s.width,s.height+2*t-2,this.seed),Ji(e,0,s.height+2*t-2,s.width,s.height+2*t-2,this.seed)}};As([oi({type:Number}),Ds("design:type",Object)],Is.prototype,"elevation",void 0),As([oi({type:String}),Ds("design:type",String)],Is.prototype,"href",void 0),As([oi({type:String}),Ds("design:type",String)],Is.prototype,"target",void 0),As([ri("a"),Ds("design:type",HTMLAnchorElement)],Is.prototype,"anchor",void 0),Is=As([si("wired-link")],Is);var Ts=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Ls=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Bs=class extends bi{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}static get styles(){return[vi,pi`
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        padding: 5px;
        outline: none;
      }
      :host(:focus) path {
        stroke-width: 1.5;
      }
      ::slotted(wired-item) {
        display: block;
      }
      :host(.wired-horizontal) ::slotted(wired-item) {
        display: inline-block;
      }
      `]}render(){return Ft`
    <slot id="slot" @slotchange="${()=>this.requestUpdate()}"></slot>
    <div id="overlay">
      <svg id="svg"></svg>
    </div>
    `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",(e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}}))}updated(){if(super.updated(),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}fireSelected(){mi(this,"selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Yi(e,0,0,t[0],t[1],this.seed)}};Ts([oi({type:Object}),Ls("design:type",Object)],Bs.prototype,"value",void 0),Ts([oi({type:String}),Ls("design:type",String)],Bs.prototype,"selected",void 0),Ts([oi({type:Boolean}),Ls("design:type",Object)],Bs.prototype,"horizontal",void 0),Bs=Ts([si("wired-listbox")],Bs);var Hs=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Vs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let qs=class extends bi{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}static get styles(){return[vi,pi`
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        height: 42px;
        font-family: sans-serif;
      }
      .labelContainer {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .progressLabel {
        color: var(--wired-progress-label-color, #000);
        font-size: var(--wired-progress-font-size, 14px);
        background: var(--wired-progress-label-background, rgba(255,255,255,0.9));
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 1.25px;
      }
      path.progbox {
        stroke: var(--wired-progress-color, rgba(0, 0, 200, 0.8));
        stroke-width: 2.75;
        fill: none;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
      `]}render(){return Ft`
    <div id="overlay" class="overlay">
      <svg></svg>
    </div>
    <div class="overlay labelContainer">
      <div class="progressLabel">${this.getProgressLabel()}</div>
    </div>
    `}getProgressLabel(){if(this.percentage){if(this.max===this.min)return"%";return Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%"}return""+this.value}wiredRender(e=!1){super.wiredRender(e),this.refreshProgressFill()}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Yi(e,2,2,t[0]-2,t[1]-2,this.seed)}refreshProgressFill(){if(this.progBox&&(this.progBox.parentElement&&this.progBox.parentElement.removeChild(this.progBox),this.progBox=void 0),this.svg){let e=0;const t=this.getBoundingClientRect();if(this.max>this.min){e=(this.value-this.min)/(this.max-this.min);const i=t.width*Math.max(0,Math.min(e,100));this.progBox=Gi([[0,0],[i,0],[i,t.height],[0,t.height]],this.seed),this.svg.appendChild(this.progBox),this.progBox.classList.add("progbox")}}}};Hs([oi({type:Number}),Vs("design:type",Object)],qs.prototype,"value",void 0),Hs([oi({type:Number}),Vs("design:type",Object)],qs.prototype,"min",void 0),Hs([oi({type:Number}),Vs("design:type",Object)],qs.prototype,"max",void 0),Hs([oi({type:Boolean}),Vs("design:type",Object)],qs.prototype,"percentage",void 0),qs=Hs([si("wired-progress")],qs);var Us=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Fs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ws=class extends bi{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[vi,pi`
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-radio-icon-color, currentColor);
        stroke-width: var(--wired-radio-default-swidth, 0.7);
      }
      g path {
        stroke-width: 0;
        fill: var(--wired-radio-icon-color, currentColor);
      }
      #container.focused {
        --wired-radio-default-swidth: 1.5;
      }
      `]}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshCheckVisibility()}render(){return Ft`
    <label id="container" class="${this.focused?"focused":""}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${()=>this.focused=!0}"
        @blur="${()=>this.focused=!1}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),mi(this,"change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){Ki(e,t[0]/2,t[1]/2,t[0],t[1],this.seed),this.svgCheck=Fi("g"),e.appendChild(this.svgCheck);const i=Math.max(.6*t[0],5),s=Math.max(.6*t[1],5);Ki(this.svgCheck,t[0]/2,t[1]/2,i,s,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}};Us([oi({type:Boolean}),Fs("design:type",Object)],Ws.prototype,"checked",void 0),Us([oi({type:Boolean,reflect:!0}),Fs("design:type",Object)],Ws.prototype,"disabled",void 0),Us([oi({type:String}),Fs("design:type",String)],Ws.prototype,"name",void 0),Us([oi(),Fs("design:type",Object)],Ws.prototype,"focused",void 0),Us([ri("input"),Fs("design:type",HTMLInputElement)],Ws.prototype,"input",void 0),Ws=Us([si("wired-radio")],Ws);var Ys=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Js=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ks=class extends fi{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return pi`
      :host {
        display: inline-block;
        font-family: inherit;
        outline: none;
      }
      :host ::slotted(*) {
        padding: var(--wired-radio-group-item-padding, 5px);
      }
    `}render(){return Ft`<slot id="slot" @slotchange="${this.slotChange}"></slot>`}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",this.checkListener)}handleChecked(e){const t=e.detail.checked,i=e.target,s=i.name||"";t?(this.selected=t&&s||"",this.fireSelected()):i.checked=!0}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",(e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}}))}updated(){const e=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];if("WIRED-RADIO"===i.tagName){this.radioNodes.push(i);const e=i.name||"";this.selected&&e===this.selected?i.checked=!0:i.checked=!1}}}selectPrevious(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++){if(e[t].name===this.selected){i=t;break}}i<0?t=e[0]:(i--,i<0&&(i=e.length-1),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}selectNext(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++){if(e[t].name===this.selected){i=t;break}}i<0?t=e[0]:(i++,i>=e.length&&(i=0),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}fireSelected(){mi(this,"selected",{selected:this.selected})}};Ys([oi({type:String}),Js("design:type",String)],Ks.prototype,"selected",void 0),Ks=Ys([si("wired-radio-group")],Ks);var Gs=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},Qs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Xs=class extends bi{constructor(){super(...arguments),this.disabled=!1,this.placeholder="",this.autocomplete="",this.autocorrect="",this.autofocus=!1}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px 40px 10px 5px;
          font-family: sans-serif;
          width: 180px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        
        input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
        input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; }
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
          display: none;
        }

        .thicker path {
          stroke-width: 1.5;
        }

        button {
          position: absolute;
          top: 0;
          right: 2px;
          width: 32px;
          height: 100%;
          box-sizing: border-box;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
          opacity: 0;
        }
      `]}render(){return Ft`
    <input type="search" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" 
      autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    <button @click="${()=>this.value=""}"></button>
    `}get input(){return this.textInput}get value(){const e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.input;t&&(t.value=e),this.refreshIconState()}else this.pendingValue=e}wiredRender(e=!1){super.wiredRender(e),this.refreshIconState()}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Yi(e,2,2,t[0]-2,t[1]-2,this.seed),this.searchIcon=Fi("g"),this.searchIcon.classList.add("thicker"),e.appendChild(this.searchIcon),Ki(this.searchIcon,t[0]-30,(t[1]-30)/2+10,20,20,this.seed),Ji(this.searchIcon,t[0]-10,(t[1]-30)/2+30,t[0]-25,(t[1]-30)/2+15,this.seed),this.closeIcon=Fi("g"),this.closeIcon.classList.add("thicker"),e.appendChild(this.closeIcon),Ji(this.closeIcon,t[0]-33,(t[1]-30)/2+2,t[0]-7,(t[1]-30)/2+28,this.seed),Ji(this.closeIcon,t[0]-7,(t[1]-30)/2+2,t[0]-33,(t[1]-30)/2+28,this.seed)}refreshIconState(){this.searchIcon&&this.closeIcon&&(this.searchIcon.style.display=this.value.trim()?"none":"",this.closeIcon.style.display=this.value.trim()?"":"none")}refire(e){this.refreshIconState(),e.stopPropagation(),mi(this,e.type,{sourceEvent:e})}};Gs([oi({type:Boolean,reflect:!0}),Qs("design:type",Object)],Xs.prototype,"disabled",void 0),Gs([oi({type:String}),Qs("design:type",Object)],Xs.prototype,"placeholder",void 0),Gs([oi({type:String}),Qs("design:type",Object)],Xs.prototype,"autocomplete",void 0),Gs([oi({type:String}),Qs("design:type",Object)],Xs.prototype,"autocorrect",void 0),Gs([oi({type:Boolean}),Qs("design:type",Object)],Xs.prototype,"autofocus",void 0),Gs([ri("input"),Qs("design:type",HTMLInputElement)],Xs.prototype,"textInput",void 0),Xs=Gs([si("wired-search-input")],Xs);var Zs=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},en=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let tn=class extends bi{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.disabled=!1,this.canvasWidth=300}static get styles(){return[vi,pi`
      :host {
        display: inline-block;
        position: relative;
        width: 300px;
        box-sizing: border-box;
      }
      :host([disabled]) {
        opacity: 0.45 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.07);
        border-radius: 5px;
      }
      input[type=range] {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin: 0;
        -webkit-appearance: none;
        background: transparent;
        outline: none;
        position: relative;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }
      input[type=range]::-moz-focus-outer {
        outline: none;
        border: 0;
      }
      input[type=range]::-moz-range-thumb {
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        margin: 0;
        height: 20px;
        width: 20px;
        line-height: 1;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        height: 20px;
        width: 20px;
        margin: 0;
        line-height: 1;
      }
      .knob{
        fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
        stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
      }
      .bar {
        stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
      }
      input:focus + div svg .knob {
        stroke: var(--wired-slider-knob-outline-color, #000);
        fill-opacity: 0.8;
      }
      `]}get value(){return this.input?+this.input.value:this.min}set value(e){this.input?this.input.value=`${e}`:this.pendingValue=e,this.updateThumbPosition()}firstUpdated(){this.value=this.pendingValue||+(this.getAttribute("value")||this.value||this.min),delete this.pendingValue}render(){return Ft`
    <div id="container">
      <input type="range" 
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        ?disabled="${this.disabled}"
        @input="${this.onInput}">
      <div id="overlay">
        <svg></svg>
      </div>
    </div>
    `}focus(){this.input?this.input.focus():super.focus()}onInput(e){e.stopPropagation(),this.updateThumbPosition(),this.input&&mi(this,"change",{value:+this.input.value})}wiredRender(e=!1){super.wiredRender(e),this.updateThumbPosition()}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){this.canvasWidth=t[0];const i=Math.round(t[1]/2);Ji(e,0,i,t[0],i,this.seed).classList.add("bar"),this.knob=Ki(e,10,i,20,20,this.seed),this.knob.classList.add("knob")}updateThumbPosition(){if(this.input){const e=+this.input.value,t=Math.max(this.step,this.max-this.min),i=(e-this.min)/t;this.knob&&(this.knob.style.transform=`translateX(${i*(this.canvasWidth-20)}px)`)}}};Zs([oi({type:Number}),en("design:type",Object)],tn.prototype,"min",void 0),Zs([oi({type:Number}),en("design:type",Object)],tn.prototype,"max",void 0),Zs([oi({type:Number}),en("design:type",Object)],tn.prototype,"step",void 0),Zs([oi({type:Boolean,reflect:!0}),en("design:type",Object)],tn.prototype,"disabled",void 0),Zs([ri("input"),en("design:type",HTMLInputElement)],tn.prototype,"input",void 0),tn=Zs([si("wired-slider")],tn);var sn=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},nn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let on=class extends bi{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          position: relative;
        }
        path {
          stroke: currentColor;
          stroke-opacity: 0.65;
          stroke-width: 1.5;
          fill: none;
        }
        .knob {
          stroke-width: 2.8 !important;
          stroke-opacity: 1;
        }
      `]}render(){return Ft`<svg></svg>`}canvasSize(){return[76,76]}draw(e,t){Ki(e,t[0]/2,t[1]/2,Math.floor(.8*t[0]),Math.floor(.8*t[1]),this.seed),this.knob=Qi(0,0,20,20,this.seed),this.knob.classList.add("knob"),e.appendChild(this.knob),this.updateCursor()}updateCursor(){if(this.knob){const e=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${e[0]}px, ${e[1]}px, 0) rotateZ(${Math.round(360*this.value*2)}deg)`}}updated(){super.updated(),this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame((e=>this.tick(e)))}tick(e){this.spinning?(this.timerstart||(this.timerstart=e),this.value=Math.min(1,(e-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}};sn([oi({type:Boolean}),nn("design:type",Object)],on.prototype,"spinning",void 0),sn([oi({type:Number}),nn("design:type",Object)],on.prototype,"duration",void 0),on=sn([si("wired-spinner")],on);var rn=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},an=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ln=class extends bi{constructor(){super(),this.name="",this.label="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender()})))}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
      `]}render(){return Ft`
    <div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    <div id="overlay"><svg></svg></div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Yi(e,2,2,t[0]-4,t[1]-4,this.seed)}};rn([oi({type:String}),an("design:type",Object)],ln.prototype,"name",void 0),rn([oi({type:String}),an("design:type",Object)],ln.prototype,"label",void 0),ln=rn([si("wired-tab"),an("design:paramtypes",[])],ln);var cn=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},dn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let hn=class extends fi{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return[vi,pi`
        :host {
          display: block;
          opacity: 1;
        }
        ::slotted(.hidden) {
          display: none !important;
        }
    
        :host ::slotted(.hidden) {
          display: none !important;
        }
        #bar {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
        }
      `]}render(){return Ft`
    <div id="bar">
      ${this.pages.map((e=>Ft`
      <wired-item role="tab" .value="${e.name}" .selected="${e.name===this.selected}" ?aria-selected="${e.name===this.selected}"
        @click="${()=>this.selected=e.name}">${e.label||e.name}</wired-item>
      `))}
    </div>
    <div>
      <slot @slotchange="${this.mapPages}"></slot>
    </div>
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){const e=this.slotElement.assignedNodes();if(e&&e.length){for(let t=0;t<e.length;t++){const i=e[t];if(i.nodeType===Node.ELEMENT_NODE&&"wired-tab"===i.tagName.toLowerCase()){const e=i;this.pages.push(e);const t=e.getAttribute("name")||"";t&&t.trim().split(" ").forEach((t=>{t&&this.pageMap.set(t,e)}))}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",(e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}}))}updated(){const e=this.getElement();for(let t=0;t<this.pages.length;t++){const i=this.pages[t];i===e?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=e||void 0,this.current&&this.current.wiredRender&&requestAnimationFrame((()=>requestAnimationFrame((()=>this.current.wiredRender()))))}getElement(){let e;return this.selected&&(e=this.pageMap.get(this.selected)),e||(e=this.pages[0]),e||null}selectPrevious(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].name||""}}selectNext(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].name||""}}};cn([oi({type:String}),dn("design:type",String)],hn.prototype,"selected",void 0),cn([ri("slot"),dn("design:type",HTMLSlotElement)],hn.prototype,"slotElement",void 0),hn=cn([si("wired-tabs")],hn);var pn=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},un=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let fn=class extends bi{constructor(){super(...arguments),this.disabled=!1,this.rows=2,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          position: relative;
          font-family: sans-serif;
          width: 400px;
          outline: none;
          padding: 4px;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        textarea {
          position: relative;
          outline: none;
          border: none;
          resize: none;
          background: inherit;
          color: inherit;
          width: 100%;
          font-size: inherit;
          font-family: inherit;
          line-height: inherit;
          text-align: inherit;
          padding: 10px;
          box-sizing: border-box;
        }
      `]}render(){return Ft`
    <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
      placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
      rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}"
      @change="${this.refire}" @input="${this.refire}"></textarea>
    <div id="overlay">
      <svg></svg>
    </div>
    `}get textarea(){return this.textareaInput}get value(){const e=this.textarea;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.textarea;if(t)return void(t.value=e)}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Yi(e,4,4,t[0]-4,t[1]-4,this.seed)}refire(e){e.stopPropagation(),mi(this,e.type,{sourceEvent:e})}};pn([oi({type:Boolean,reflect:!0}),un("design:type",Object)],fn.prototype,"disabled",void 0),pn([oi({type:Number}),un("design:type",Object)],fn.prototype,"rows",void 0),pn([oi({type:Number}),un("design:type",Object)],fn.prototype,"maxrows",void 0),pn([oi({type:String}),un("design:type",Object)],fn.prototype,"autocomplete",void 0),pn([oi({type:Boolean}),un("design:type",Object)],fn.prototype,"autofocus",void 0),pn([oi({type:String}),un("design:type",Object)],fn.prototype,"inputmode",void 0),pn([oi({type:String}),un("design:type",Object)],fn.prototype,"placeholder",void 0),pn([oi({type:Boolean}),un("design:type",Object)],fn.prototype,"required",void 0),pn([oi({type:Boolean}),un("design:type",Object)],fn.prototype,"readonly",void 0),pn([oi({type:Number}),un("design:type",Number)],fn.prototype,"minlength",void 0),pn([oi({type:Number}),un("design:type",Number)],fn.prototype,"maxlength",void 0),pn([ri("textarea"),un("design:type",HTMLTextAreaElement)],fn.prototype,"textareaInput",void 0),fn=pn([si("wired-textarea")],fn);var gn=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},yn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let vn=class extends bi{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return[vi,pi`
      :host {
        display: inline-block;
        cursor: pointer;
        position: relative;
        outline: none;
      }
      :host([disabled]) {
        opacity: 0.4 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        opacity: 0;
      }
      .knob {
        transition: transform 0.3s ease;
      }
      .knob path {
        stroke-width: 0.7;
      }
      .knob.checked {
        transform: translateX(48px);
      }
      path.knobfill {
        stroke-width: 3 !important;
        fill: transparent;
      }
      .knob.unchecked path.knobfill {
        stroke: var(--wired-toggle-off-color, gray);
      }
      .knob.checked path.knobfill {
        stroke: var(--wired-toggle-on-color, rgb(63, 81, 181));
      }
      `]}render(){return Ft`
    <div style="position: relative;">
      <svg></svg>
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}"  @change="${this.onChange}">
    </div>
    `}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshKnob()}onChange(){this.checked=this.input.checked,this.refreshKnob(),mi(this,"change",{checked:this.checked})}canvasSize(){return[80,34]}draw(e,t){Yi(e,16,8,t[0]-32,18,this.seed).classList.add("toggle-bar"),this.knob=Fi("g"),this.knob.classList.add("knob"),e.appendChild(this.knob);const i=Qi(16,16,32,32,this.seed);i.classList.add("knobfill"),this.knob.appendChild(i),Ki(this.knob,16,16,32,32,this.seed)}refreshKnob(){if(this.knob){const e=this.knob.classList;this.checked?(e.remove("unchecked"),e.add("checked")):(e.remove("checked"),e.add("unchecked"))}}};gn([oi({type:Boolean}),yn("design:type",Object)],vn.prototype,"checked",void 0),gn([oi({type:Boolean,reflect:!0}),yn("design:type",Object)],vn.prototype,"disabled",void 0),gn([ri("input"),yn("design:type",HTMLInputElement)],vn.prototype,"input",void 0),vn=gn([si("wired-toggle")],vn);var bn=function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},mn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let wn=class extends bi{constructor(){super(),this.src="",this.autoplay=!1,this.loop=!1,this.muted=!1,this.playsinline=!1,this.playing=!1,this.timeDisplay="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender()})))}static get styles(){return[vi,pi`
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px 3px 68px;
          --wired-progress-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
          --wired-slider-knob-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
        }
        video {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
        #controls {
          position: absolute;
          pointer-events: auto;
          left: 0;
          bottom: 0;
          width: 100%;
          box-sizing: border-box;
          height: 70px;
        }
        .layout.horizontal {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          padding: 5px 10px;
        }
        .flex {
          -ms-flex: 1 1 0.000000001px;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;
          flex-basis: 0.000000001px;
        }
        wired-progress {
          display: block;
          width: 100%;
          box-sizing: border-box;
          height: 20px;
          --wired-progress-label-color: transparent;
          --wired-progress-label-background: transparent;
        }
        wired-icon-button span {
          font-size: 16px;
          line-height: 16px;
          width: 16px;
          height: 16px;
          padding: 0px;
          font-family: sans-serif;
          display: inline-block;
        }
        #timeDisplay {
          padding: 0 20px 0 8px;
          font-size: 13px;
        }
        wired-slider {
          display: block;
          max-width: 200px;
          margin: 0 6px 0 auto;
        }
      `]}render(){return Ft`
    <video 
      .autoplay="${this.autoplay}"
      .loop="${this.loop}"
      .muted="${this.muted}"
      .playsinline="${this.playsinline}"
      src="${this.src}"
      @play="${()=>this.playing=!0}"
      @pause="${()=>this.playing=!1}"
      @canplay="${this.canPlay}"
      @timeupdate="${this.updateTime}">
    </video>
    <div id="overlay">
      <svg></svg>
    </div>
    <div id="controls">
      <wired-progress></wired-progress>
      <div class="horizontal layout center">
        <wired-icon-button @click="${this.togglePause}">
          <span>${this.playing?"||":"▶"}</span>
        </wired-icon-button>
        <div id="timeDisplay">${this.timeDisplay}</div>
        <div class="flex">
          <wired-slider @change="${this.volumeChange}"></wired-slider>
        </div>
        <div style="width: 24px; height: 24px;">
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path style="stroke: none; fill: currentColor;" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g></svg>
        </div>
      </div>
    </div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}wiredRender(){super.wiredRender(),this.progressBar&&this.progressBar.wiredRender(!0)}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Yi(e,2,2,t[0]-4,t[1]-4,this.seed)}updateTime(){this.video&&this.progressBar&&(this.progressBar.value=this.video.duration?Math.round(this.video.currentTime/this.video.duration*100):0,this.timeDisplay=`${this.getTimeDisplay(this.video.currentTime)} / ${this.getTimeDisplay(this.video.duration)}`)}getTimeDisplay(e){const t=Math.floor(e/60);return`${t}:${Math.round(e-60*t)}`}togglePause(){this.video&&(this.playing?this.video.pause():this.video.play())}volumeChange(){this.video&&this.slider&&(this.video.volume=this.slider.value/100)}canPlay(){this.slider&&this.video&&(this.slider.value=100*this.video.volume)}};function xn(e){let t;return{c(){t=b("Home")},m(e,i){g(e,t,i)},d(e){e&&y(t)}}}function kn(e){let t;return{c(){t=b("Quiz")},m(e,i){g(e,t,i)},d(e){e&&y(t)}}}function $n(e){let t;return{c(){t=b("End")},m(e,i){g(e,t,i)},d(e){e&&y(t)}}}function Sn(e){let t,i,s,n,o,r,a,l,c,d,h,p,u,b,w,x;return i=new Ae({props:{to:"/",$$slots:{default:[xn]},$$scope:{ctx:e}}}),n=new Ae({props:{to:"/quiz",$$slots:{default:[kn]},$$scope:{ctx:e}}}),r=new Ae({props:{to:"/end",$$slots:{default:[$n]},$$scope:{ctx:e}}}),c=new je({props:{path:"/",component:Le}}),h=new je({props:{path:"/quiz",component:Xe}}),u=new je({props:{path:"/end",component:ot}}),w=new je({props:{path:"*",component:at}}),{c(){t=v("nav"),Z(i.$$.fragment),s=m(),Z(n.$$.fragment),o=m(),Z(r.$$.fragment),a=m(),l=v("div"),Z(c.$$.fragment),d=m(),Z(h.$$.fragment),p=m(),Z(u.$$.fragment),b=m(),Z(w.$$.fragment)},m(e,y){g(e,t,y),ee(i,t,null),f(t,s),ee(n,t,null),f(t,o),ee(r,t,null),g(e,a,y),g(e,l,y),ee(c,l,null),f(l,d),ee(h,l,null),f(l,p),ee(u,l,null),f(l,b),ee(w,l,null),x=!0},p(e,t){const s={};2&t&&(s.$$scope={dirty:t,ctx:e}),i.$set(s);const o={};2&t&&(o.$$scope={dirty:t,ctx:e}),n.$set(o);const a={};2&t&&(a.$$scope={dirty:t,ctx:e}),r.$set(a)},i(e){x||(K(i.$$.fragment,e),K(n.$$.fragment,e),K(r.$$.fragment,e),K(c.$$.fragment,e),K(h.$$.fragment,e),K(u.$$.fragment,e),K(w.$$.fragment,e),x=!0)},o(e){G(i.$$.fragment,e),G(n.$$.fragment,e),G(r.$$.fragment,e),G(c.$$.fragment,e),G(h.$$.fragment,e),G(u.$$.fragment,e),G(w.$$.fragment,e),x=!1},d(e){e&&y(t),te(i),te(n),te(r),e&&y(a),e&&y(l),te(c),te(h),te(u),te(w)}}}function Rn(e){let t,i;return t=new Se({props:{url:e[0],$$slots:{default:[Sn]},$$scope:{ctx:e}}}),{c(){Z(t.$$.fragment)},m(e,s){ee(t,e,s),i=!0},p(e,[i]){const s={};1&i&&(s.url=e[0]),2&i&&(s.$$scope={dirty:i,ctx:e}),t.$set(s)},i(e){i||(K(t.$$.fragment,e),i=!0)},o(e){G(t.$$.fragment,e),i=!1},d(e){te(t,e)}}}function On(e,t,i){let{url:s=""}=t;return e.$$set=e=>{"url"in e&&i(0,s=e.url)},[s]}bn([oi({type:String}),mn("design:type",Object)],wn.prototype,"src",void 0),bn([oi({type:Boolean}),mn("design:type",Object)],wn.prototype,"autoplay",void 0),bn([oi({type:Boolean}),mn("design:type",Object)],wn.prototype,"loop",void 0),bn([oi({type:Boolean}),mn("design:type",Object)],wn.prototype,"muted",void 0),bn([oi({type:Boolean}),mn("design:type",Object)],wn.prototype,"playsinline",void 0),bn([oi(),mn("design:type",Object)],wn.prototype,"playing",void 0),bn([oi(),mn("design:type",Object)],wn.prototype,"timeDisplay",void 0),bn([ri("wired-progress"),mn("design:type",qs)],wn.prototype,"progressBar",void 0),bn([ri("wired-slider"),mn("design:type",tn)],wn.prototype,"slider",void 0),bn([ri("video"),mn("design:type",HTMLVideoElement)],wn.prototype,"video",void 0),wn=bn([si("wired-video"),mn("design:paramtypes",[])],wn);return new class extends ne{constructor(e){super(),se(this,e,On,Rn,r,{url:0})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
