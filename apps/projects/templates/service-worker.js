if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise(async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()})),s.then(()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]})},s=(s,r)=>{Promise.all(s.map(e)).then(e=>r(1===e.length?e[0]:e))},r={require:Promise.resolve(s)};self.define=(s,t,c)=>{r[s]||(r[s]=Promise.resolve().then(()=>{let r={};const i={uri:location.origin+s.slice(1)};return Promise.all(t.map(s=>{switch(s){case"exports":return r;case"module":return i;default:return e(s)}})).then(e=>{const s=c(...e);return r.default||(r.default=s),r})}))}}define("./service-worker.js",["./workbox-69b5a3b7"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"/static/projects/../../templates/projects/index.html",revision:"4e6f75497fc853797d491b8f90e3c568"},{url:"/static/projects/css/main.2a8ce2dc.css",revision:"7807281c12834625c144d4b4d75e5a20"},{url:"/static/projects/img/static/favicon.ico",revision:"95077bba29ab66c5c1c6041132a6bfc3"},{url:"/static/projects/js/1.c89aefb4.js",revision:"ef8534800d8ea448ab74ddba4196618d"},{url:"/static/projects/js/main.2a8ce2dc.js",revision:"7f16987cbf94fce4d4e0ea439fd7bb34"}],{})}));
